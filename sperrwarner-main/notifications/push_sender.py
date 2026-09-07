"""
Sends browser Web Push notifications, authenticated with VAPID (RFC 8292) so
push services (Google's FCM, Mozilla's autopush, Apple's web push relay,
...) know these pushes really come from this app and can rate-limit/block it
specifically if it misbehaves -- rather than needing per-user API keys.

Configuration (environment variables, set in Render's dashboard):
  VAPID_PRIVATE_KEY_B64  -- base64 of the PEM private key. Base64-encoded so
                            a multi-line PEM survives being pasted into a
                            single-line env var field without escaping.
  VAPID_PUBLIC_KEY        -- the matching public key, URL-safe base64,
                            uncompressed EC point form -- exactly what
                            PushManager.subscribe() expects as
                            applicationServerKey in the browser. Not secret;
                            served to the frontend via GET /api/push/vapid-public-key.
  VAPID_CLAIM_EMAIL       -- contact address push services may use if this
                            app's pushes need to be throttled/blocked, e.g.
                            "mailto:you@example.com".

Both keys are generated once (see README "Setting up notifications") and
stay fixed for the app's lifetime -- rotating them would invalidate every
browser's existing push subscription.
"""
from __future__ import annotations

import base64
import json
import logging
import os
from typing import Optional

from pywebpush import WebPushException, webpush

log = logging.getLogger(__name__)


class PushError(RuntimeError):
    """Push failed for a reason that isn't 'this subscription no longer exists'."""


class PushGone(PushError):
    """The push service says this subscription is dead (410/404) -- the
    caller should delete it rather than keep retrying forever."""


def _private_key_pem() -> Optional[str]:
    b64 = os.environ.get("VAPID_PRIVATE_KEY_B64")
    if not b64:
        return None
    return base64.b64decode(b64).decode("utf-8")


def send_push(subscription_info: dict, payload: dict) -> None:
    """subscription_info is a browser PushSubscription.toJSON() dict
    ({endpoint, keys: {p256dh, auth}}). payload is JSON-serializable and
    becomes the `data` a service worker's 'push' event handler receives."""
    private_key = _private_key_pem()
    if not private_key:
        log.warning("VAPID keys not configured -- skipping push notification")
        return

    claim_email = os.environ.get("VAPID_CLAIM_EMAIL", "mailto:admin@example.com")
    try:
        webpush(
            subscription_info=subscription_info,
            data=json.dumps(payload),
            vapid_private_key=private_key,
            vapid_claims={"sub": claim_email},
        )
    except WebPushException as exc:
        status = getattr(exc.response, "status_code", None)
        if status in (404, 410):
            raise PushGone(str(exc)) from exc
        raise PushError(str(exc)) from exc
