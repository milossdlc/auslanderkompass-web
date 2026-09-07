"""
Sperrwarner prototype backend.

Why a backend at all, instead of a static page hitting the API straight
from the browser?
  1. The Autobahn API and Nominatim/OSRM don't send CORS headers for
     arbitrary origins, so a browser blocks the request. A tiny server-side
     proxy sidesteps that.
  2. Turning "Cologne -> Frankfurt" into "which closures matter" needs
     geocoding + routing + geometry matching, which is more than a page of
     client-side JS should own.

Run it with:
    pip install -r requirements.txt
    python app.py
Then open http://127.0.0.1:5000
"""
from __future__ import annotations

import logging
import os

from flask import Flask, jsonify, request, send_from_directory

import geo
import routes_store
import subscriptions_store
from autobahn_client import AutobahnClient, AutobahnApiError, EVENT_KINDS
from notifications import checker, email_sender

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

app = Flask(__name__, static_folder="static", static_url_path="")
client = AutobahnClient()

MATCH_RADIUS_KM = geo.DEFAULT_MATCH_RADIUS_KM


# ---- static frontend ------------------------------------------------------

@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


# ---- highways ---------------------------------------------------------

@app.get("/api/highways")
def list_highways():
    try:
        roads = client.list_roads()
    except AutobahnApiError as exc:
        return jsonify({"error": str(exc)}), 502
    return jsonify({"roads": sorted(set(r.strip() for r in roads))})


@app.get("/api/highway/<road_id>/events")
def highway_events(road_id: str):
    kinds = _parse_kinds(request.args.get("kinds"))
    try:
        events = client.events_for_road(road_id, kinds)
    except AutobahnApiError as exc:
        return jsonify({"error": str(exc)}), 502
    events.sort(key=lambda e: (e.future, e.kind))
    return jsonify({"roadId": road_id.upper(), "events": [e.to_dict() for e in events]})


# ---- origin -> destination route ---------------------------------------

@app.post("/api/route")
def find_route():
    body = request.get_json(silent=True) or {}
    origin_text = (body.get("origin") or "").strip()
    destination_text = (body.get("destination") or "").strip()
    if not origin_text or not destination_text:
        return jsonify({"error": "Both origin and destination are required."}), 400

    try:
        origin = geo.geocode(origin_text)
        destination = geo.geocode(destination_text)
        route = geo.route_between(origin, destination)
    except geo.GeoError as exc:
        return jsonify({"error": str(exc)}), 502

    highways = route.highways
    try:
        events_by_road = client.events_for_roads(highways) if highways else {}
    except AutobahnApiError as exc:
        return jsonify({"error": str(exc)}), 502

    matched = []
    for road_id, events in events_by_road.items():
        for e in events:
            if e.lat is None or e.lon is None:
                continue
            dist = geo.min_distance_to_polyline((e.lat, e.lon), route.geometry)
            if dist <= MATCH_RADIUS_KM:
                progress = geo.project_along_route((e.lat, e.lon), route.geometry)
                item = e.to_dict()
                item["distanceFromRouteKm"] = round(dist, 2)
                item["progressKm"] = round(progress, 1)
                matched.append(item)

    matched.sort(key=lambda e: e["progressKm"])

    return jsonify({
        "origin": {"query": origin.query, "displayName": origin.display_name, "lat": origin.lat, "lon": origin.lon},
        "destination": {"query": destination.query, "displayName": destination.display_name,
                         "lat": destination.lat, "lon": destination.lon},
        "distanceKm": route.distance_km,
        "durationMin": route.duration_min,
        "geometry": route.geometry,
        "highways": highways,
        "events": matched,
    })


# ---- saved routes ---------------------------------------------------------

@app.get("/api/saved-routes")
def get_saved_routes():
    routes = routes_store.list_routes()
    return jsonify({"routes": [vars(r) for r in routes]})


@app.post("/api/saved-routes")
def create_saved_route():
    body = request.get_json(silent=True) or {}
    try:
        route = routes_store.add_route(
            name=body.get("name", ""),
            mode=body.get("mode", ""),
            highways=body.get("highways"),
            origin=body.get("origin"),
            destination=body.get("destination"),
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    return jsonify(vars(route)), 201


@app.delete("/api/saved-routes/<route_id>")
def remove_saved_route(route_id: str):
    ok = routes_store.delete_route(route_id)
    if not ok:
        return jsonify({"error": "No saved route with that id."}), 404
    return "", 204


# ---- notifications: subscriptions + push --------------------------------
#
# No accounts/login (see project notes for why): a subscription is just an
# email address next to a highway list or route, activated by clicking a
# confirmation link, checked every few hours by an external cron job (see
# notifications/checker.py's docstring for why it's external, not a thread
# in this process). Push is best-effort on top of that email baseline --
# see notifications/push_sender.py.

@app.get("/api/push/vapid-public-key")
def vapid_public_key():
    return jsonify({"publicKey": os.environ.get("VAPID_PUBLIC_KEY", "")})


@app.post("/api/subscriptions")
def create_subscription():
    body = request.get_json(silent=True) or {}
    try:
        sub = subscriptions_store.add_subscription(
            email=body.get("email", ""),
            mode=body.get("mode", ""),
            name=body.get("name", ""),
            highways=body.get("highways"),
            origin=body.get("origin"),
            destination=body.get("destination"),
            push_subscription=body.get("pushSubscription"),
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400

    confirm_url = f"{_base_url()}/api/subscriptions/confirm/{sub.confirm_token}"
    html = (
        f"<p>Bitte bestätige deine Sperrwarner-Warnung für <strong>{sub.name}</strong>:</p>"
        f'<p><a href="{confirm_url}">Warnung bestätigen</a></p>'
        f"<p>Falls du diese Warnung nicht angefordert hast, kannst du diese E-Mail ignorieren. "
        f"Die Warnung wird erst nach Klick auf den Bestätigungslink aktiviert.</p>"
    )
    try:
        email_sender.send_email(sub.email, "Sperrwarner-Warnung bestätigen", html)
    except email_sender.EmailError as exc:
        log.warning("Could not send confirmation email for subscription %s: %s", sub.id, exc)

    return jsonify({"id": sub.id, "message": "Bitte E-Mail zur Bestätigung prüfen."}), 201


@app.get("/api/subscriptions/confirm/<token>")
def confirm_subscription_route(token: str):
    sub = subscriptions_store.confirm_subscription(token)
    if not sub:
        return _simple_page("Link ungültig", "Dieser Bestätigungslink ist ungültig oder wurde bereits verwendet."), 404
    return _simple_page(
        "Warnung aktiviert! ✅",
        f"Du erhältst eine E-Mail und – falls aktiviert – eine Push-Nachricht, wenn eine neue relevante Meldung "
        f"für <strong>{sub.name}</strong> auftaucht.",
    )


@app.get("/api/subscriptions/unsubscribe/<token>")
def unsubscribe_route(token: str):
    ok = subscriptions_store.delete_by_unsubscribe_token(token)
    if not ok:
        return _simple_page("Link ungültig", "Dieser Abmeldelink ist ungültig oder wurde bereits verwendet."), 404
    return _simple_page("Warnung deaktiviert", "Du erhältst für diese Strecke keine weiteren Warnungen. Du kannst sie jederzeit erneut aktivieren.")


@app.post("/api/notify/run")
def run_notify():
    """Triggered by an external scheduler (GitHub Actions cron), not by
    users. Protected by a shared secret rather than left open, since it both
    sends emails/pushes on demand and would otherwise let anyone spam the
    upstream Autobahn API through this app."""
    secret = os.environ.get("NOTIFY_CRON_SECRET")
    if secret and request.headers.get("X-Notify-Secret") != secret:
        return jsonify({"error": "Unauthorized"}), 401
    summary = checker.run_check(client, base_url=_base_url())
    return jsonify(summary)


def _base_url() -> str:
    configured = os.environ.get("PUBLIC_BASE_URL")
    if configured:
        return configured.rstrip("/")
    return request.url_root.rstrip("/")


def _simple_page(title: str, message_html: str) -> str:
    return f"""<!doctype html><html><head><meta charset="utf-8">
<title>{title} — Sperrwarner</title>
<style>body{{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 20px;color:#1a1a1a}}
h1{{font-size:22px}} a{{color:#d97706}}</style></head>
<body><h1>{title}</h1><p>{message_html}</p><p><a href="/">&larr; Zurück zu Sperrwarner</a></p></body></html>"""


def _parse_kinds(raw: str | None) -> tuple[str, ...]:
    if not raw:
        return EVENT_KINDS
    requested = tuple(k.strip() for k in raw.split(",") if k.strip() in EVENT_KINDS)
    return requested or EVENT_KINDS


if __name__ == "__main__":
    # Local development only. In production (Render, Fly.io, ...) gunicorn
    # imports `app` directly and this block never runs -- see Procfile /
    # render.yaml. FLASK_DEBUG defaults off so nobody accidentally ships the
    # interactive debugger to the public internet.
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=debug, port=port)
