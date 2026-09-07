import pytest

import subscriptions_store as store


@pytest.fixture(autouse=True)
def isolated_data_file(tmp_path, monkeypatch):
    fake_file = tmp_path / "subscriptions.json"
    monkeypatch.setattr(store, "DATA_FILE", fake_file)
    yield fake_file


def test_add_subscription_defaults_and_tokens():
    sub = store.add_subscription(email="a@b.com", mode="highways", highways=["a3", "a9"])
    assert sub.highways == ["A3", "A9"]
    assert sub.name == "A3, A9"  # falls back to the highway list when no name given
    assert sub.confirmed is False
    assert sub.confirm_token and sub.unsubscribe_token
    assert sub.confirm_token != sub.unsubscribe_token


def test_add_subscription_endpoints_default_name():
    sub = store.add_subscription(email="a@b.com", mode="endpoints", origin="Köln", destination="Berlin")
    assert sub.name == "Köln → Berlin"


def test_add_subscription_rejects_bad_email():
    with pytest.raises(ValueError):
        store.add_subscription(email="not-an-email", mode="highways", highways=["A1"])


def test_add_subscription_requires_target_for_mode():
    with pytest.raises(ValueError):
        store.add_subscription(email="a@b.com", mode="highways", highways=[])
    with pytest.raises(ValueError):
        store.add_subscription(email="a@b.com", mode="endpoints", origin="Köln")


def test_confirm_subscription_activates_once():
    sub = store.add_subscription(email="a@b.com", mode="highways", highways=["A1"])
    confirmed = store.confirm_subscription(sub.confirm_token)
    assert confirmed is not None
    assert confirmed.confirmed is True
    assert confirmed.confirmed_at is not None

    # token is single-use: confirming again with the same token finds nothing
    assert store.confirm_subscription(sub.confirm_token) is None


def test_confirm_subscription_unknown_token_returns_none():
    assert store.confirm_subscription("does-not-exist") is None


def test_delete_by_unsubscribe_token():
    sub = store.add_subscription(email="a@b.com", mode="highways", highways=["A1"])
    assert store.delete_by_unsubscribe_token(sub.unsubscribe_token) is True
    assert store.list_subscriptions() == []
    assert store.delete_by_unsubscribe_token(sub.unsubscribe_token) is False


def test_update_seen_events_stamps_last_checked():
    sub = store.add_subscription(email="a@b.com", mode="highways", highways=["A1"])
    assert sub.last_checked_at is None
    store.update_seen_events(sub.id, ["closure:1", "closure:2"])
    reloaded = store.get_subscription(sub.id)
    assert reloaded.seen_event_keys == ["closure:1", "closure:2"]
    assert reloaded.last_checked_at is not None


def test_clear_push_subscription():
    sub = store.add_subscription(
        email="a@b.com", mode="highways", highways=["A1"],
        push_subscription={"endpoint": "https://push.example/x", "keys": {"p256dh": "x", "auth": "y"}},
    )
    store.clear_push_subscription(sub.id)
    reloaded = store.get_subscription(sub.id)
    assert reloaded.push_subscription is None
