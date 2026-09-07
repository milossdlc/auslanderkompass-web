import json

import pytest

import routes_store


@pytest.fixture(autouse=True)
def isolated_data_file(tmp_path, monkeypatch):
    fake_file = tmp_path / "saved_routes.json"
    monkeypatch.setattr(routes_store, "DATA_FILE", fake_file)
    yield fake_file


def test_add_and_list_highways_route():
    route = routes_store.add_route(name="Weekend trip", mode="highways", highways=["a3", "a9"])
    assert route.highways == ["A3", "A9"]

    routes = routes_store.list_routes()
    assert len(routes) == 1
    assert routes[0].name == "Weekend trip"


def test_add_endpoints_route_requires_both_fields():
    with pytest.raises(ValueError):
        routes_store.add_route(name="x", mode="endpoints", origin="Köln")


def test_add_highways_route_requires_at_least_one():
    with pytest.raises(ValueError):
        routes_store.add_route(name="x", mode="highways", highways=[])


def test_delete_route():
    route = routes_store.add_route(name="Temp", mode="highways", highways=["A1"])
    assert routes_store.delete_route(route.id) is True
    assert routes_store.list_routes() == []
    assert routes_store.delete_route("does-not-exist") is False


def test_untitled_name_falls_back():
    route = routes_store.add_route(name="   ", mode="highways", highways=["A1"])
    assert route.name == "Untitled route"
