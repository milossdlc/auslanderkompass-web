"""
Geocoding + routing + "is this event actually near my route" matching.

Two free, keyless services do the heavy lifting:

  * Nominatim (OpenStreetMap)  -> turn "Cologne" / "Frankfurt am Main" into
    coordinates.               https://nominatim.org/release-docs/latest/api/Search/
  * OSRM demo server           -> turn two coordinates into an actual driving
    route (a polyline).        http://project-osrm.org/docs/v5.24.0/api/#route-service

Both are public demo/community instances meant for light, non-commercial
use — fine for a prototype, NOT fine to hammer in production (see README
"Going to production" section). A real deployment should run its own OSRM
instance or use a licensed provider (e.g. GraphHopper, HERE, Google) and
should set a proper Nominatim User-Agent + respect its 1 req/sec policy.
"""
from __future__ import annotations

import math
import re
from dataclasses import dataclass, field
from typing import Optional

import requests

# Matches German Autobahn refs like "A3", "A 3", "A61" as they show up in
# OSRM step names/refs (e.g. "A 3" or "Kölner Ring / A3").
_AUTOBAHN_REF_RE = re.compile(r"\bA\s?(\d{1,3})\b")

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
OSRM_URL = "https://router.project-osrm.org/route/v1/driving"
REQUEST_TIMEOUT = 10

# Custom User-Agent is required by Nominatim's usage policy.
HEADERS = {"User-Agent": "sperrwarner-prototype/0.1 (personal project, not for production traffic)"}

# How close (in km) an event's location has to be to the route line to count
# as "on this trip". Autobahn interchanges are wide and the route line is a
# simplification, so a few hundred meters of slack avoids missing real hits.
DEFAULT_MATCH_RADIUS_KM = 2.0


class GeoError(RuntimeError):
    pass


@dataclass
class GeocodedPlace:
    query: str
    display_name: str
    lat: float
    lon: float


@dataclass
class Route:
    origin: GeocodedPlace
    destination: GeocodedPlace
    distance_km: float
    duration_min: float
    geometry: list[tuple[float, float]]  # list of (lat, lon) along the route
    highways: list[str] = field(default_factory=list)  # e.g. ["A3", "A61"], route order, de-duped


def geocode(place: str) -> GeocodedPlace:
    """Look up a place name (city, address, junction) and return coordinates."""
    if not place or not place.strip():
        raise GeoError("Empty place name")
    params = {"q": place, "format": "jsonv2", "limit": 1, "countrycodes": "de"}
    try:
        resp = requests.get(NOMINATIM_URL, params=params, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        results = resp.json()
    except requests.RequestException as exc:
        raise GeoError(f"Could not reach geocoding service: {exc}") from exc
    except ValueError as exc:
        raise GeoError(f"Geocoding service returned invalid JSON: {exc}") from exc

    if not results:
        raise GeoError(f'No match found for "{place}". Try a more specific city/town name.')

    top = results[0]
    return GeocodedPlace(
        query=place,
        display_name=top.get("display_name", place),
        lat=float(top["lat"]),
        lon=float(top["lon"]),
    )


def route_between(origin: GeocodedPlace, destination: GeocodedPlace) -> Route:
    """Ask OSRM for a driving route and return its polyline geometry."""
    coord_str = f"{origin.lon},{origin.lat};{destination.lon},{destination.lat}"
    url = f"{OSRM_URL}/{coord_str}"
    # steps=true so we can read the road refs (e.g. "A3") used along the way -
    # that's what lets us only query the handful of highways this trip
    # actually uses instead of every Autobahn in Germany.
    params = {"overview": "full", "geometries": "geojson", "steps": "true"}
    try:
        resp = requests.get(url, params=params, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as exc:
        raise GeoError(f"Could not reach routing service: {exc}") from exc
    except ValueError as exc:
        raise GeoError(f"Routing service returned invalid JSON: {exc}") from exc

    if data.get("code") != "Ok" or not data.get("routes"):
        raise GeoError(f"No route found between {origin.display_name} and {destination.display_name}.")

    best = data["routes"][0]
    coords = best["geometry"]["coordinates"]  # GeoJSON is [lon, lat]
    geometry = [(lat, lon) for lon, lat in coords]

    highways: list[str] = []
    for leg in best.get("legs", []):
        for step in leg.get("steps", []):
            for text in (step.get("ref", ""), step.get("name", "")):
                for match in _AUTOBAHN_REF_RE.finditer(text or ""):
                    ref = f"A{match.group(1)}"
                    if ref not in highways:
                        highways.append(ref)

    return Route(
        origin=origin,
        destination=destination,
        distance_km=round(best["distance"] / 1000, 1),
        duration_min=round(best["duration"] / 60),
        geometry=geometry,
        highways=highways,
    )


# ---- distance math -------------------------------------------------------

_EARTH_RADIUS_KM = 6371.0088


def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    return 2 * _EARTH_RADIUS_KM * math.asin(min(1, math.sqrt(a)))


def _point_to_segment_km(p: tuple[float, float], a: tuple[float, float], b: tuple[float, float]) -> float:
    """Approximate distance from point p to segment a-b, treating lat/lon as
    locally flat (fine at highway-corridor scale, i.e. tens of km)."""
    lat0 = math.radians((a[0] + b[0]) / 2)
    km_per_deg_lat = 111.32
    km_per_deg_lon = 111.32 * math.cos(lat0)

    def to_xy(pt):
        return (pt[1] * km_per_deg_lon, pt[0] * km_per_deg_lat)

    px, py = to_xy(p)
    ax, ay = to_xy(a)
    bx, by = to_xy(b)

    dx, dy = bx - ax, by - ay
    if dx == dy == 0:
        return _haversine_km(p[0], p[1], a[0], a[1])

    t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    cx, cy = ax + t * dx, ay + t * dy
    return math.hypot(px - cx, py - cy)


def min_distance_to_polyline(point: tuple[float, float], polyline: list[tuple[float, float]]) -> float:
    """Shortest distance in km from `point` (lat, lon) to any segment of `polyline`."""
    if not polyline:
        return math.inf
    if len(polyline) == 1:
        return _haversine_km(point[0], point[1], polyline[0][0], polyline[0][1])
    return min(
        _point_to_segment_km(point, polyline[i], polyline[i + 1])
        for i in range(len(polyline) - 1)
    )


def project_along_route(point: tuple[float, float], polyline: list[tuple[float, float]]) -> float:
    """Rough progress (km from route start) of the polyline point nearest to
    `point`. Used to sort events in the order you'll actually encounter them."""
    if len(polyline) < 2:
        return 0.0
    best_dist = math.inf
    best_progress = 0.0
    cumulative = 0.0
    for i in range(len(polyline) - 1):
        seg_len = _haversine_km(*polyline[i], *polyline[i + 1])
        d = _point_to_segment_km(point, polyline[i], polyline[i + 1])
        if d < best_dist:
            best_dist = d
            best_progress = cumulative
        cumulative += seg_len
    return best_progress
