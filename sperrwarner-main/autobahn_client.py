"""
Thin client for the official "Autobahn App" API operated by Die Autobahn GmbH
des Bundes (the German federal motorway company).

Docs / source: https://autobahn.api.bund.dev  (mirrors https://verkehr.autobahn.de/o/autobahn)
No API key, no registration, free to use. Data is published under the
Datenlizenz Deutschland – Zero – Version 2.0 (dl-de/zero-2-0), so it can be
reused freely as long as a source note is kept (see README).

This module normalizes the three event types we care about (closures,
roadworks, warnings) into one flat "Event" shape the rest of the app can
treat uniformly, and adds a small in-memory TTL cache so a page load with
several highways selected doesn't hammer the upstream API.
"""
from __future__ import annotations

import time
import logging
from dataclasses import dataclass, field
from typing import Any, Optional

import requests

log = logging.getLogger(__name__)

BASE_URL = "https://verkehr.autobahn.de/o/autobahn"
REQUEST_TIMEOUT = 10  # seconds
CACHE_TTL_SECONDS = 120

# The three event categories the API exposes that matter for "is my road
# blocked / dug up right now" — webcams / parking / charging stations are
# out of scope for this prototype.
EVENT_KINDS = ("closure", "roadworks", "warning")


class AutobahnApiError(RuntimeError):
    """Raised when the upstream API can't be reached or returns something odd."""


@dataclass
class Event:
    """One normalized traffic event (closure, roadworks site, or warning)."""

    kind: str  # "closure" | "roadworks" | "warning"
    identifier: str
    road_id: str
    title: str
    subtitle: str
    description: list[str]
    lat: Optional[float]
    lon: Optional[float]
    extent: Optional[list[float]]  # [lat1, lon1, lat2, lon2]
    geometry: Optional[dict]  # GeoJSON-ish LineString, as returned by the API
    start_timestamp: Optional[str]
    is_blocked: bool
    future: bool
    direction: Optional[str] = None  # e.g. "Passau -> Nürnberg", derived from subtitle

    def to_dict(self) -> dict:
        return {
            "kind": self.kind,
            "identifier": self.identifier,
            "roadId": self.road_id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "lat": self.lat,
            "lon": self.lon,
            "extent": self.extent,
            "geometry": self.geometry,
            "startTimestamp": self.start_timestamp,
            "isBlocked": self.is_blocked,
            "future": self.future,
            "direction": self.direction,
        }


class _TTLCache:
    def __init__(self, ttl_seconds: int):
        self.ttl = ttl_seconds
        self._store: dict[str, tuple[float, Any]] = {}

    def get(self, key: str):
        hit = self._store.get(key)
        if not hit:
            return None
        expires_at, value = hit
        if time.time() > expires_at:
            self._store.pop(key, None)
            return None
        return value

    def set(self, key: str, value: Any):
        self._store[key] = (time.time() + self.ttl, value)


class AutobahnClient:
    def __init__(self, session: Optional[requests.Session] = None, cache_ttl: int = CACHE_TTL_SECONDS):
        self.session = session or requests.Session()
        self.session.headers.setdefault("Accept", "application/json")
        self._cache = _TTLCache(cache_ttl)

    def _get(self, path: str) -> dict:
        url = f"{BASE_URL}{path}"
        cached = self._cache.get(url)
        if cached is not None:
            return cached
        try:
            resp = self.session.get(url, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            data = resp.json()
        except requests.RequestException as exc:
            raise AutobahnApiError(f"Could not reach Autobahn API ({url}): {exc}") from exc
        except ValueError as exc:
            raise AutobahnApiError(f"Autobahn API returned non-JSON for {url}: {exc}") from exc
        self._cache.set(url, data)
        return data

    def list_roads(self) -> list[str]:
        """All highway IDs the API knows about, e.g. ['A1', 'A2', ..., 'A995']."""
        data = self._get("")
        return data.get("roads", [])

    def _events_for_kind(self, road_id: str, kind: str) -> list[Event]:
        path = f"/{road_id}/services/{kind}"
        data = self._get(path)
        raw_list = data.get(kind, [])
        return [self._normalize(road_id, kind, item) for item in raw_list]

    @staticmethod
    def _normalize(road_id: str, kind: str, item: dict) -> Event:
        coord = item.get("coordinate") or {}
        extent_raw = item.get("extent")
        extent = None
        if extent_raw:
            try:
                extent = [float(x) for x in extent_raw.split(",")]
            except (ValueError, AttributeError):
                extent = None

        subtitle = (item.get("subtitle") or "").strip()
        direction = subtitle if "->" in subtitle else None

        return Event(
            kind=kind,
            identifier=item.get("identifier", ""),
            road_id=road_id,
            title=item.get("title", ""),
            subtitle=subtitle,
            description=item.get("description", []) or [],
            lat=coord.get("lat"),
            lon=coord.get("long"),
            extent=extent,
            geometry=item.get("geometry"),
            start_timestamp=item.get("startTimestamp"),
            is_blocked=str(item.get("isBlocked", "false")).lower() == "true",
            future=bool(item.get("future", False)),
            direction=direction,
        )

    def events_for_road(self, road_id: str, kinds: tuple[str, ...] = EVENT_KINDS) -> list[Event]:
        """All events (closures/roadworks/warnings) currently posted for one highway."""
        road_id = road_id.strip().upper()
        events: list[Event] = []
        for kind in kinds:
            try:
                events.extend(self._events_for_kind(road_id, kind))
            except AutobahnApiError:
                # One category failing (e.g. a road with no active warnings might
                # 404 rather than return an empty list, depending on the road)
                # shouldn't blank out the others.
                log.warning("Failed to fetch %s for %s", kind, road_id, exc_info=True)
        return events

    def events_for_roads(self, road_ids: list[str], kinds: tuple[str, ...] = EVENT_KINDS) -> dict[str, list[Event]]:
        return {rid: self.events_for_road(rid, kinds) for rid in road_ids}
