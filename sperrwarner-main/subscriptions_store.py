"""
Email/push notification subscriptions -- "let me know when something new
shows up on this highway/route." Same simple JSON-file persistence as
routes_store.py: single file, no database, no login. Fine for a prototype;
flagged (like saved routes) for replacement before multi-user.

A subscription starts unconfirmed. It only becomes active once its owner
clicks the link in a confirmation email -- that's what proves the email
address is real and that whoever typed it actually wants these emails,
without needing a password or account. Two secrets live on each record:

  confirm_token       -- single use, emailed once, activates the subscription.
  unsubscribe_token   -- stays valid forever, included in every digest email's
                          unsubscribe link so leaving is always one click.
"""
from __future__ import annotations

import json
import secrets
import threading
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

DATA_FILE = Path(__file__).parent / "data" / "subscriptions.json"

_lock = threading.Lock()


@dataclass
class Subscription:
    id: str
    email: str
    name: str
    mode: str  # "highways" | "endpoints"
    highways: list[str] = field(default_factory=list)  # used when mode == "highways"
    origin: Optional[str] = None  # used when mode == "endpoints"
    destination: Optional[str] = None  # used when mode == "endpoints"
    push_subscription: Optional[dict] = None  # browser PushSubscription.toJSON(), or None
    confirmed: bool = False
    confirm_token: str = ""
    unsubscribe_token: str = ""
    seen_event_keys: list[str] = field(default_factory=list)
    created_at: str = ""
    confirmed_at: Optional[str] = None
    last_checked_at: Optional[str] = None


def _ensure_file():
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text(json.dumps([]), encoding="utf-8")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def list_subscriptions() -> list[Subscription]:
    _ensure_file()
    with _lock:
        raw = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    return [Subscription(**r) for r in raw]


def _save_all(subs: list[Subscription]):
    _ensure_file()
    with _lock:
        DATA_FILE.write_text(
            json.dumps([asdict(s) for s in subs], ensure_ascii=False, indent=2),
            encoding="utf-8",
        )


def get_subscription(sub_id: str) -> Optional[Subscription]:
    return next((s for s in list_subscriptions() if s.id == sub_id), None)


def add_subscription(
    email: str,
    mode: str,
    name: str = "",
    highways: Optional[list[str]] = None,
    origin: Optional[str] = None,
    destination: Optional[str] = None,
    push_subscription: Optional[dict] = None,
) -> Subscription:
    email = (email or "").strip()
    if "@" not in email or len(email) < 5:
        raise ValueError("A valid email address is required.")
    if mode not in ("highways", "endpoints"):
        raise ValueError('mode must be "highways" or "endpoints"')
    if mode == "highways" and not highways:
        raise ValueError("highways mode requires at least one highway id")
    if mode == "endpoints" and not (origin and destination):
        raise ValueError("endpoints mode requires both origin and destination")

    highways_upper = [h.strip().upper() for h in (highways or [])]
    default_name = ", ".join(highways_upper) if mode == "highways" else f"{origin} → {destination}"

    sub = Subscription(
        id=secrets.token_hex(4),
        email=email,
        name=(name or "").strip() or default_name,
        mode=mode,
        highways=highways_upper,
        origin=origin,
        destination=destination,
        push_subscription=push_subscription,
        confirmed=False,
        confirm_token=secrets.token_urlsafe(24),
        unsubscribe_token=secrets.token_urlsafe(24),
        created_at=_now(),
    )
    subs = list_subscriptions()
    subs.append(sub)
    _save_all(subs)
    return sub


def confirm_subscription(token: str) -> Optional[Subscription]:
    """Activate the subscription owning this (single-use) confirm token.
    Returns None if the token doesn't match anything unconfirmed."""
    subs = list_subscriptions()
    match = next((s for s in subs if s.confirm_token == token and not s.confirmed), None)
    if not match:
        return None
    match.confirmed = True
    match.confirmed_at = _now()
    _save_all(subs)
    return match


def delete_by_unsubscribe_token(token: str) -> bool:
    subs = list_subscriptions()
    remaining = [s for s in subs if s.unsubscribe_token != token]
    if len(remaining) == len(subs):
        return False
    _save_all(remaining)
    return True


def delete_subscription(sub_id: str) -> bool:
    subs = list_subscriptions()
    remaining = [s for s in subs if s.id != sub_id]
    if len(remaining) == len(subs):
        return False
    _save_all(remaining)
    return True


def update_seen_events(sub_id: str, event_keys: list[str]) -> None:
    """Record the current full set of event keys for a subscription and stamp
    last_checked_at -- used by the background checker after every run, whether
    or not it found anything new, so 'first check' vs 'later check' is
    distinguishable (see notifications/checker.py)."""
    subs = list_subscriptions()
    for s in subs:
        if s.id == sub_id:
            s.seen_event_keys = event_keys
            s.last_checked_at = _now()
            break
    else:
        return
    _save_all(subs)


def clear_push_subscription(sub_id: str) -> None:
    """Drop a push subscription that the push service reports as gone
    (expired/unregistered) -- email keeps working regardless."""
    subs = list_subscriptions()
    for s in subs:
        if s.id == sub_id:
            s.push_subscription = None
            break
    else:
        return
    _save_all(subs)


def update_push_subscription(sub_id: str, push_subscription: Optional[dict]) -> Optional[Subscription]:
    subs = list_subscriptions()
    match = next((s for s in subs if s.id == sub_id), None)
    if not match:
        return None
    match.push_subscription = push_subscription
    _save_all(subs)
    return match
