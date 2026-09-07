"""
The background job: for every confirmed subscription, re-check its
highways/route against the Autobahn API and notify (push, then email as a
backup) if events have appeared that weren't there last time.

There's no in-process scheduler here on purpose. Render's free tier sleeps
the whole app after ~15 minutes idle, so a `while True: sleep(); check()`
thread would simply stop running the moment nobody's requested a page --
silently, with no error. Instead, an external scheduler (see
.github/workflows/check-subscriptions.yml, a free GitHub Actions cron job)
hits POST /api/notify/run every few hours. That single HTTP request both
wakes the sleeping dyno up AND triggers the check -- one mechanism solves
both problems.
"""
from __future__ import annotations

import logging
from typing import Optional

import geo
import subscriptions_store as store
from autobahn_client import AutobahnApiError, AutobahnClient
from notifications import email_sender, push_sender

log = logging.getLogger(__name__)

MATCH_RADIUS_KM = geo.DEFAULT_MATCH_RADIUS_KM


def _event_key(ev: dict) -> str:
    """A stable identifier for 'the same event as before'. The Autobahn API's
    own `identifier` field is already unique per event, but namespaced by
    kind here too in case an id were ever reused across closure/roadworks/
    warning categories."""
    return f"{ev.get('kind')}:{ev.get('identifier')}"


def _events_for_subscription(client: AutobahnClient, sub: store.Subscription) -> list[dict]:
    if sub.mode == "highways":
        events: list[dict] = []
        for road in sub.highways:
            try:
                events.extend(e.to_dict() for e in client.events_for_road(road))
            except AutobahnApiError:
                log.warning("Could not fetch events for %s (subscription %s)", road, sub.id, exc_info=True)
        return events

    # mode == "endpoints": re-resolve the route, then filter events near it --
    # same logic as POST /api/route in app.py.
    try:
        origin = geo.geocode(sub.origin)
        destination = geo.geocode(sub.destination)
        route = geo.route_between(origin, destination)
    except geo.GeoError:
        log.warning("Could not resolve route for subscription %s", sub.id, exc_info=True)
        return []

    if not route.highways:
        return []
    try:
        events_by_road = client.events_for_roads(route.highways)
    except AutobahnApiError:
        log.warning("Could not fetch events for subscription %s's route", sub.id, exc_info=True)
        return []

    matched = []
    for road_events in events_by_road.values():
        for e in road_events:
            if e.lat is None or e.lon is None:
                continue
            if geo.min_distance_to_polyline((e.lat, e.lon), route.geometry) <= MATCH_RADIUS_KM:
                matched.append(e.to_dict())
    return matched


def _esc(text: str) -> str:
    return (text or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _digest_html(name: str, new_events: list[dict], unsubscribe_url: str) -> str:
    rows = "".join(
        f"<li><strong>{_esc(e.get('title', ''))}</strong>"
        + (f"<br>{_esc(e.get('subtitle'))}" if e.get("subtitle") else "")
        + "</li>"
        for e in new_events
    )
    return (
        f"<p>Neue Verkehrsmeldung für <strong>{_esc(name)}</strong>:</p>"
        f"<ul>{rows}</ul>"
        f'<p style="color:#666;font-size:12px">Du erhältst diese Nachricht, weil du Warnungen bei Sperrwarner aktiviert hast. '
        f'<a href="{unsubscribe_url}">Warnungen deaktivieren</a></p>'
    )


def _notify(sub: store.Subscription, new_events: list[dict], base_url: str) -> None:
    unsubscribe_url = f"{base_url}/api/subscriptions/unsubscribe/{sub.unsubscribe_token}"

    if sub.push_subscription:
        try:
            push_sender.send_push(
                sub.push_subscription,
                {
                    "title": "Sperrwarner",
                    "body": f"{len(new_events)} neue Meldung(en) für {sub.name}",
                    "url": base_url or "/",
                },
            )
        except push_sender.PushGone:
            log.info("Push subscription for %s is gone -- dropping it, email keeps working", sub.id)
            store.clear_push_subscription(sub.id)
        except push_sender.PushError:
            log.warning("Push failed for subscription %s", sub.id, exc_info=True)

    html = _digest_html(sub.name, new_events, unsubscribe_url)
    try:
        email_sender.send_email(sub.email, f"Sperrwarner: {len(new_events)} neue Meldung(en) für {sub.name}", html)
    except email_sender.EmailError:
        log.warning("Email failed for subscription %s", sub.id, exc_info=True)


def run_check(client: Optional[AutobahnClient] = None, base_url: str = "") -> dict:
    """Check every confirmed subscription; notify about anything new since
    its last check. Returns a small summary (used by /api/notify/run and by
    tests) -- not meant for anything besides a sanity-check log line."""
    client = client or AutobahnClient()
    checked = 0
    notified = 0

    for sub in store.list_subscriptions():
        if not sub.confirmed:
            continue
        checked += 1

        events = _events_for_subscription(client, sub)
        current_keys = sorted({_event_key(e) for e in events})

        # First check right after confirming: snapshot what's already there
        # without notifying -- confirming a subscription shouldn't instantly
        # dump every pre-existing roadwork on you, only genuinely new ones.
        if sub.last_checked_at is None:
            store.update_seen_events(sub.id, current_keys)
            continue

        new_keys = set(current_keys) - set(sub.seen_event_keys)
        store.update_seen_events(sub.id, current_keys)
        if not new_keys:
            continue

        new_events = [e for e in events if _event_key(e) in new_keys]
        _notify(sub, new_events, base_url)
        notified += 1

    return {"checked": checked, "notified": notified}
