"""
Sends transactional email via Resend's HTTP API (https://resend.com).

Kept to one plain `requests` POST instead of pulling in an SDK -- this app
only ever sends two kinds of email (a confirmation link, and a "something
new" digest), which doesn't need more than that.

Configuration (all via environment variables, set in Render's dashboard):
  RESEND_API_KEY   -- required to actually send anything. Missing key means
                       "log and skip" rather than crash, so local dev and
                       tests don't need a real account.
  EMAIL_FROM       -- e.g. "Sperrwarner <alerts@sperrwarner.de>". Defaults to
                       Resend's shared sandbox address, which only delivers
                       to the Resend account's own verified email -- fine to
                       develop against, not fine for real subscribers. See
                       README "Setting up notifications" for the DNS records
                       needed to send from your own domain.
"""
from __future__ import annotations

import logging
import os

import requests

log = logging.getLogger(__name__)

RESEND_API_URL = "https://api.resend.com/emails"
REQUEST_TIMEOUT = 10


class EmailError(RuntimeError):
    """Raised when the email API is configured but the send itself fails."""


def send_email(to: str, subject: str, html: str) -> None:
    api_key = os.environ.get("RESEND_API_KEY")
    from_address = os.environ.get("EMAIL_FROM", "Sperrwarner <onboarding@resend.dev>")

    if not api_key:
        log.warning("RESEND_API_KEY not set -- skipping email to %s (%r)", to, subject)
        return

    try:
        resp = requests.post(
            RESEND_API_URL,
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={"from": from_address, "to": [to], "subject": subject, "html": html},
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
    except requests.RequestException as exc:
        raise EmailError(f"Could not send email via Resend: {exc}") from exc
