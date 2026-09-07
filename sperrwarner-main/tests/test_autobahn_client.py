import json
from pathlib import Path

import pytest
import requests

from autobahn_client import AutobahnClient

FIXTURES = Path(__file__).parent / "fixtures"


class FakeResponse:
    def __init__(self, payload):
        self._payload = payload

    def raise_for_status(self):
        pass

    def json(self):
        return self._payload


class FakeSession:
    """Stands in for requests.Session, serving fixture JSON keyed by URL suffix."""

    def __init__(self, routes: dict[str, dict]):
        self.headers = {}
        self.routes = routes
        self.calls = []

    def get(self, url, timeout=None):
        self.calls.append(url)
        for suffix, payload in self.routes.items():
            if url.endswith(suffix):
                return FakeResponse(payload)
        # Simulate a real upstream failure (e.g. 404/connection error) for any
        # endpoint the test didn't register a fixture for.
        raise requests.ConnectionError(f"No fixture registered for {url}")


def load_fixture(name):
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


def test_events_for_road_normalizes_and_merges_all_kinds():
    session = FakeSession({
        "/A1/services/closure": {"closure": []},
        "/A1/services/roadworks": load_fixture("roadworks_A1.json"),
        "/A1/services/warning": load_fixture("warning_A1.json"),
    })
    client = AutobahnClient(session=session)

    events = client.events_for_road("a1")  # lowercase input should be upper-cased

    kinds = sorted(e.kind for e in events)
    assert kinds == ["roadworks", "warning"]
    assert all(e.road_id == "A1" for e in events)

    roadwork = next(e for e in events if e.kind == "roadworks")
    assert roadwork.title == "A1 | Saarbrücken - Eppelborn"
    assert roadwork.direction == "Saarbrücken -> Trier"
    assert roadwork.lat == pytest.approx(49.38191589297737)
    assert roadwork.geometry["type"] == "LineString"


def test_events_for_road_survives_one_kind_failing():
    session = FakeSession({
        "/A9/services/closure": {"closure": []},
        "/A9/services/roadworks": {"roadworks": []},
        # warning endpoint deliberately missing -> AutobahnApiError inside the client
    })
    client = AutobahnClient(session=session)
    events = client.events_for_road("A9")
    assert events == []  # no crash, just nothing found


def test_list_roads_dedupes_via_app_layer_not_client():
    # The API itself doesn't dedupe (e.g. contains "A60" and "A60 " with a
    # trailing space) -- that's handled in app.py's /api/highways route, not
    # here, so this just checks the raw passthrough.
    session = FakeSession({"": {"roads": ["A1", "A2", "A60", "A60 "]}})
    client = AutobahnClient(session=session)
    assert client.list_roads() == ["A1", "A2", "A60", "A60 "]


def test_closure_fixture_has_expected_shape():
    data = load_fixture("closure_A3.json")
    assert len(data["closure"]) == 3
    first = data["closure"][0]
    assert first["display_type"] == "CLOSURE"
    assert "geometry" in first
