"""
Smoke tests for the Flask wiring itself (routes exist, JSON in/out shapes
line up) using Flask's test client. These monkeypatch the Autobahn client
and geo functions so they don't depend on live network access -- the
sandbox this was built in doesn't have outbound access to
verkehr.autobahn.de/Nominatim/OSRM, and production usage shouldn't depend
on the test suite reaching them either.
"""
import json

import pytest

import app as app_module
from autobahn_client import Event


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setattr(app_module.routes_store, "DATA_FILE", tmp_path / "saved_routes.json")
    monkeypatch.setattr(app_module.subscriptions_store, "DATA_FILE", tmp_path / "subscriptions.json")
    monkeypatch.delenv("NOTIFY_CRON_SECRET", raising=False)
    app_module.app.config["TESTING"] = True
    with app_module.app.test_client() as c:
        yield c


def test_index_serves_frontend(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert b"Sperrwarner" in resp.data


def test_highways_endpoint(client, monkeypatch):
    monkeypatch.setattr(app_module.client, "list_roads", lambda: ["A3", "A1", "A3"])
    resp = client.get("/api/highways")
    assert resp.status_code == 200
    assert resp.get_json()["roads"] == ["A1", "A3"]  # deduped + sorted


def test_highway_events_endpoint(client, monkeypatch):
    fake_event = Event(
        kind="closure", identifier="x1", road_id="A3", title="A3 closed",
        subtitle="X -> Y", description=["test"], lat=50.0, lon=8.0,
        extent=None, geometry=None, start_timestamp=None, is_blocked=True, future=False,
    )
    monkeypatch.setattr(app_module.client, "events_for_road", lambda road, kinds=None: [fake_event])
    resp = client.get("/api/highway/a3/events")
    body = resp.get_json()
    assert resp.status_code == 200
    assert body["roadId"] == "A3"  # endpoint upper-cases the road id
    assert body["events"][0]["title"] == "A3 closed"


def test_saved_routes_crud(client):
    resp = client.post("/api/saved-routes", json={"name": "Test trip", "mode": "highways", "highways": ["a3"]})
    assert resp.status_code == 201
    route_id = resp.get_json()["id"]

    listing = client.get("/api/saved-routes").get_json()
    assert len(listing["routes"]) == 1

    delete_resp = client.delete(f"/api/saved-routes/{route_id}")
    assert delete_resp.status_code == 204
    assert client.get("/api/saved-routes").get_json()["routes"] == []


def test_saved_routes_rejects_bad_payload(client):
    resp = client.post("/api/saved-routes", json={"name": "bad", "mode": "highways", "highways": []})
    assert resp.status_code == 400


def test_route_endpoint_requires_both_fields(client):
    resp = client.post("/api/route", json={"origin": "Köln"})
    assert resp.status_code == 400


# ---- notifications ---------------------------------------------------------

def test_vapid_public_key_endpoint_returns_configured_value(client, monkeypatch):
    monkeypatch.setenv("VAPID_PUBLIC_KEY", "test-public-key")
    resp = client.get("/api/push/vapid-public-key")
    assert resp.status_code == 200
    assert resp.get_json()["publicKey"] == "test-public-key"


def test_subscribe_confirm_unsubscribe_flow(client, monkeypatch):
    sent = []
    monkeypatch.setattr(
        app_module.email_sender, "send_email", lambda to, subject, html: sent.append((to, subject, html))
    )

    resp = client.post(
        "/api/subscriptions",
        json={"email": "a@b.com", "mode": "highways", "highways": ["a1"]},
    )
    assert resp.status_code == 201
    assert len(sent) == 1  # confirmation email "sent"
    to, subject, html = sent[0]
    assert to == "a@b.com"
    assert "Confirm" in subject

    # pull the confirm token out of the confirmation email's link
    import re
    match = re.search(r"/api/subscriptions/confirm/([\w-]+)", html)
    assert match, "confirmation email should contain a confirm link"
    token = match.group(1)

    confirm_resp = client.get(f"/api/subscriptions/confirm/{token}")
    assert confirm_resp.status_code == 200
    assert b"subscribed" in confirm_resp.data.lower()

    # confirming again with the same (now-used) token fails
    assert client.get(f"/api/subscriptions/confirm/{token}").status_code == 404

    subs = app_module.subscriptions_store.list_subscriptions()
    assert len(subs) == 1 and subs[0].confirmed is True

    unsub_resp = client.get(f"/api/subscriptions/unsubscribe/{subs[0].unsubscribe_token}")
    assert unsub_resp.status_code == 200
    assert app_module.subscriptions_store.list_subscriptions() == []


def test_create_subscription_rejects_bad_payload(client):
    resp = client.post("/api/subscriptions", json={"email": "not-an-email", "mode": "highways", "highways": ["A1"]})
    assert resp.status_code == 400


def test_notify_run_requires_secret_when_configured(client, monkeypatch):
    monkeypatch.setenv("NOTIFY_CRON_SECRET", "shh")
    resp = client.post("/api/notify/run")
    assert resp.status_code == 401

    ok_resp = client.post("/api/notify/run", headers={"X-Notify-Secret": "shh"})
    assert ok_resp.status_code == 200
    assert ok_resp.get_json() == {"checked": 0, "notified": 0}


def test_notify_run_allowed_without_secret_when_unconfigured(client):
    resp = client.post("/api/notify/run")
    assert resp.status_code == 200
