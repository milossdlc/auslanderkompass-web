"""
Tests for the background notification checker. Everything that would touch
the network (Autobahn API, Resend, a real push service) is monkeypatched --
these tests are about the diffing/notify logic, not live integrations.
"""
import pytest

import subscriptions_store as store
from autobahn_client import Event
from notifications import checker, email_sender, push_sender


@pytest.fixture(autouse=True)
def isolated_data_file(tmp_path, monkeypatch):
    monkeypatch.setattr(store, "DATA_FILE", tmp_path / "subscriptions.json")
    yield


@pytest.fixture
def sent_emails(monkeypatch):
    sent = []
    monkeypatch.setattr(email_sender, "send_email", lambda to, subject, html: sent.append((to, subject, html)))
    return sent


@pytest.fixture
def sent_pushes(monkeypatch):
    sent = []
    monkeypatch.setattr(push_sender, "send_push", lambda sub_info, payload: sent.append((sub_info, payload)))
    return sent


def _event(identifier, kind="closure", title="Some closure"):
    return Event(
        kind=kind, identifier=identifier, road_id="A1", title=title, subtitle="X -> Y",
        description=[], lat=50.0, lon=8.0, extent=None, geometry=None,
        start_timestamp=None, is_blocked=True, future=False,
    )


class FakeClient:
    """Stands in for AutobahnClient: returns whatever event list is queued
    for a given call, in order, per road id."""

    def __init__(self, events_by_call):
        self._events_by_call = list(events_by_call)

    def events_for_road(self, road_id, kinds=None):
        return self._events_by_call.pop(0) if self._events_by_call else []


def test_unconfirmed_subscriptions_are_skipped(sent_emails):
    store.add_subscription(email="a@b.com", mode="highways", highways=["A1"])
    result = checker.run_check(FakeClient([[_event("1")]]))
    assert result == {"checked": 0, "notified": 0}
    assert sent_emails == []


def test_first_check_snapshots_without_notifying(sent_emails):
    sub = store.add_subscription(email="a@b.com", mode="highways", highways=["A1"])
    store.confirm_subscription(sub.confirm_token)

    result = checker.run_check(FakeClient([[_event("1"), _event("2")]]))

    assert result == {"checked": 1, "notified": 0}
    assert sent_emails == []
    reloaded = store.get_subscription(sub.id)
    assert set(reloaded.seen_event_keys) == {"closure:1", "closure:2"}
    assert reloaded.last_checked_at is not None


def test_new_event_after_first_check_triggers_notification(sent_emails, sent_pushes):
    sub = store.add_subscription(
        email="a@b.com", mode="highways", highways=["A1"],
        push_subscription={"endpoint": "https://push.example/x", "keys": {"p256dh": "x", "auth": "y"}},
    )
    store.confirm_subscription(sub.confirm_token)

    # First run: just the baseline event, nothing to notify about yet.
    checker.run_check(FakeClient([[_event("1")]]))
    assert sent_emails == []

    # Second run: a new event has appeared alongside the old one.
    result = checker.run_check(FakeClient([[_event("1"), _event("2", title="New roadworks")]]))

    assert result == {"checked": 1, "notified": 1}
    assert len(sent_emails) == 1
    to, subject, html = sent_emails[0]
    assert to == "a@b.com"
    assert "New roadworks" in html
    assert "1 new item(s)" in subject
    assert len(sent_pushes) == 1


def test_no_new_events_does_not_notify(sent_emails):
    sub = store.add_subscription(email="a@b.com", mode="highways", highways=["A1"])
    store.confirm_subscription(sub.confirm_token)

    checker.run_check(FakeClient([[_event("1")]]))
    result = checker.run_check(FakeClient([[_event("1")]]))  # same event again

    assert result == {"checked": 1, "notified": 0}
    assert sent_emails == []


def test_gone_push_subscription_is_dropped_but_email_still_sent(sent_emails, monkeypatch):
    sub = store.add_subscription(
        email="a@b.com", mode="highways", highways=["A1"],
        push_subscription={"endpoint": "https://push.example/dead", "keys": {"p256dh": "x", "auth": "y"}},
    )
    store.confirm_subscription(sub.confirm_token)
    checker.run_check(FakeClient([[_event("1")]]))

    def _dead_push(sub_info, payload):
        raise push_sender.PushGone("410")

    monkeypatch.setattr(push_sender, "send_push", _dead_push)

    result = checker.run_check(FakeClient([[_event("1"), _event("2")]]))

    assert result == {"checked": 1, "notified": 1}
    assert len(sent_emails) == 1  # email still went out despite the dead push subscription
    reloaded = store.get_subscription(sub.id)
    assert reloaded.push_subscription is None  # dead subscription was cleared
