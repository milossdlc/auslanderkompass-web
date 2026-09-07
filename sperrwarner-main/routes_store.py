"""
Saved "trips" — the highways or origin/destination pairs the user checks
often (e.g. their regular weekend drive). Stored as plain JSON on disk.

This is intentionally the simplest possible persistence for a prototype:
single user, one file, no database, no auth. It exists so the "Saved
Routes" tab in the frontend has somewhere to read from/write to, and so a
later notifications feature has a natural place to find "which roads does
this person care about".
"""
from __future__ import annotations

import json
import threading
import uuid
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Optional

DATA_FILE = Path(__file__).parent / "data" / "saved_routes.json"

_lock = threading.Lock()


@dataclass
class SavedRoute:
    id: str
    name: str
    mode: str  # "highways" | "endpoints"
    highways: list[str] = field(default_factory=list)  # used when mode == "highways"
    origin: Optional[str] = None  # used when mode == "endpoints"
    destination: Optional[str] = None


def _ensure_file():
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text(json.dumps([]), encoding="utf-8")


def list_routes() -> list[SavedRoute]:
    _ensure_file()
    with _lock:
        raw = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    return [SavedRoute(**r) for r in raw]


def _save_all(routes: list[SavedRoute]):
    _ensure_file()
    with _lock:
        DATA_FILE.write_text(
            json.dumps([asdict(r) for r in routes], ensure_ascii=False, indent=2),
            encoding="utf-8",
        )


def add_route(name: str, mode: str, highways: Optional[list[str]] = None,
              origin: Optional[str] = None, destination: Optional[str] = None) -> SavedRoute:
    if mode not in ("highways", "endpoints"):
        raise ValueError('mode must be "highways" or "endpoints"')
    if mode == "highways" and not highways:
        raise ValueError("highways mode requires at least one highway id")
    if mode == "endpoints" and not (origin and destination):
        raise ValueError("endpoints mode requires both origin and destination")

    route = SavedRoute(
        id=uuid.uuid4().hex[:8],
        name=name.strip() or "Untitled route",
        mode=mode,
        highways=[h.strip().upper() for h in (highways or [])],
        origin=origin,
        destination=destination,
    )
    routes = list_routes()
    routes.append(route)
    _save_all(routes)
    return route


def delete_route(route_id: str) -> bool:
    routes = list_routes()
    remaining = [r for r in routes if r.id != route_id]
    if len(remaining) == len(routes):
        return False
    _save_all(remaining)
    return True
