# Sperrwarner — prototype

A small local web app that answers the question you asked for: *"which
Autobahn closures, roadworks or warnings are on the road(s) I'm about to
drive, right now?"* — without clicking through the closures maps highway by
highway.

Three ways to check:
1. **By highway** — pick one or more Autobahn numbers (A1, A7, A9, ...).
2. **By route** — type a start and destination city; the app finds a
   driving route, figures out which Autobahns it uses, and shows only the
   closures/roadworks/warnings that actually sit near that route (not the
   whole country's worth).
3. **Saved routes** — save either of the above under a name (e.g. "Weekend
   to the in-laws") and re-check it in one click next time.

**Alerts**: next to any saved route, "🔔 Notify me about this" subscribes
an email address (no account/login needed) to be told when something *new*
shows up on that highway/route, checked every few hours in the background.
Where the browser supports it, it also sets up a push notification
alongside the email. See "Setting up notifications" below for what needs
configuring before this actually sends anything.

## Data sources

| Purpose | Service | Notes |
|---|---|---|
| Closures / roadworks / warnings | [Autobahn API](https://autobahn.api.bund.dev) (`verkehr.autobahn.de`) — operated by Die Autobahn GmbH des Bundes | Free, no API key. Data under [Datenlizenz Deutschland – Zero – 2.0](https://www.govdata.de/dl-de/zero-2-0) — free reuse, attribution appreciated. |
| Geocoding (place name → coordinates) | [Nominatim](https://nominatim.org) (OpenStreetMap) | Free, keyless, but rate-limited (~1 req/sec) and asks for a descriptive User-Agent, which `geo.py` sets. Not for production volume — see below. |
| Routing (two coordinates → a driving route) | [OSRM public demo server](http://project-osrm.org) | Free, keyless demo instance, meant for light/non-commercial use only. |

## Why there's a backend at all

The Autobahn API, Nominatim and OSRM don't send CORS headers for arbitrary
web origins, so a browser blocks a page from calling them directly. `app.py`
is a thin Flask proxy that makes those calls server-side and hands the
browser normalized JSON. It also does the one piece of real logic a static
page can't: turning a route polyline + a pile of closure coordinates into
"which of these are actually on my way" (see `geo.min_distance_to_polyline`).

## Running it

```bash
cd sperrwarner
python3 -m venv .venv && source .venv/bin/activate   # optional but recommended
pip install -r requirements.txt
python app.py
```

Then open **http://127.0.0.1:5000** in your browser.

Saved trips are stored in `data/saved_routes.json` (created on first save).

## Project layout

```
sperrwarner/
  app.py                    Flask app: routes/API endpoints, ties everything together
  autobahn_client.py        Client for verkehr.autobahn.de + normalizes events, caches responses
  geo.py                    Geocoding (Nominatim), routing (OSRM), route-matching math
  routes_store.py           Saved-trips persistence (JSON file)
  subscriptions_store.py    Alert subscriptions persistence (JSON file)
  notifications/
    checker.py              The "did anything change" job -- see its docstring for why
                             it's triggered externally rather than run on a timer in-process
    email_sender.py         Sends email via Resend's HTTP API
    push_sender.py          Sends Web Push notifications via VAPID + pywebpush
  static/                   Frontend: index.html, app.js, style.css (vanilla JS + Leaflet map),
                             manifest.webmanifest + sw.js (PWA/push support), icons/
  .github/workflows/
    check-subscriptions.yml Cron (every 4h) that pings /api/notify/run
  tests/                    Fixture-based tests that don't require live network access
```

## Known limitations of this prototype

- **Highway matching for routes is name-based**: it reads the road refs
  (e.g. "A3") that OSRM's step data reports along the route. On complex
  interchanges this can occasionally miss a short shared stretch of a
  highway. Good enough to demo; worth hardening later by matching the
  route geometry directly against each candidate highway's own geometry.
- **Match radius** (`geo.DEFAULT_MATCH_RADIUS_KM`, currently 2 km) is a
  judgment call between "catches real closures on your route" and "doesn't
  pull in stuff on a nearby parallel road." Tune it once you've road-tested
  it a few weekends.
- **No auth / single user** — saved routes are one shared JSON file, fine
  for one person on their own machine, not fine for multiple users.
- **Public demo services**: Nominatim and OSRM's demo servers are for light
  personal use, not for a real userbase — see "Going to production" below.

## Deploying (Render + a domain at INWX)

This repo is ready for [Render](https://render.com)'s free tier — `render.yaml`
and `Procfile` tell it how to run `gunicorn app:app` instead of Flask's dev
server. Steps:

1. **Put this code on GitHub.** Create a free GitHub account if you don't
   have one, create a new empty repository, and push this folder to it
   (or use GitHub's "upload files" web UI if you'd rather not use git
   commands).
2. **Create a free Render account** at render.com and connect your GitHub
   account.
3. **New → Blueprint**, pick this repo. Render reads `render.yaml`
   automatically and preconfigures the service (free plan, correct build
   and start commands). Click **Apply** / **Deploy**.
4. After the build finishes you'll have a live URL like
   `https://sperrwarner.onrender.com`. That's the whole app, live.
5. **Point your domain at it, at INWX**: in the INWX control panel, add a
   `CNAME` record for the subdomain you want (e.g. `sperrwarner`) with the
   target set to the `onrender.com` hostname Render gave you. Using the
   bare/apex domain (no subdomain) needs INWX's ALIAS/ANAME-style record
   instead of CNAME, if they offer one — check their DNS record type list
   when you get there.
6. Render also gives you a free "Custom Domain" option in its dashboard —
   add the domain there too so Render knows to serve HTTPS for it.

Notes for this specific setup:
- Free-tier services sleep after 15 minutes idle and take ~1 min to wake on
  the next request — fine for "check before a weekend trip", not fine for
  "must respond instantly, always." Render's paid Starter tier (a few
  dollars/month) removes the sleep.
- The free tier's disk isn't guaranteed to persist across deploys, so
  `data/saved_routes.json` and `data/subscriptions.json` may reset when you
  redeploy. Harmless for a prototype; worth moving to a real database (see
  below) before this matters to real users.

## Setting up notifications

The alerts feature is fully built but ships unconfigured — without the
environment variables below, subscribing still works but no email or push
actually goes out (the app logs a warning and continues, rather than
crashing). All of these are set as environment variables on the Render
service (Dashboard → your service → **Environment**).

**Email (Resend)**
1. Create a free account at [resend.com](https://resend.com) (free tier is
   generous for personal use).
2. Add and verify `sperrwarner.de` as a sending domain there — Resend gives
   you a few DNS records (SPF/DKIM, typically `TXT` and `CNAME`) to add at
   INWX, the same way the site's own domain was pointed at Render.
3. Create an API key in Resend, then set on Render:
   - `RESEND_API_KEY` — the key from step 3.
   - `EMAIL_FROM` — e.g. `Sperrwarner <alerts@sperrwarner.de>` (must be on
     the verified domain from step 2).

**Push (Web Push / VAPID)** — needs a keypair, generated once and then fixed
for the app's lifetime (rotating it later would silently invalidate every
browser's existing subscription). Generate one with:

```bash
python3 -c "
from py_vapid import Vapid
from py_vapid.utils import b64urlencode
from cryptography.hazmat.primitives import serialization
import base64
v = Vapid(); v.generate_keys()
pub = v.public_key.public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)
print('VAPID_PUBLIC_KEY=', b64urlencode(pub))
print('VAPID_PRIVATE_KEY_B64=', base64.b64encode(v.private_pem()).decode())
"
```

Set the two printed values on Render as `VAPID_PUBLIC_KEY` and
`VAPID_PRIVATE_KEY_B64` (base64-encoded so the multi-line PEM survives being
pasted into a single-line env var field), plus:
   - `VAPID_CLAIM_EMAIL` = e.g. `mailto:you@example.com` (a contact address
     push services may use if this app's pushes ever need throttling)

Treat the private key like a password — anyone with it could send push
notifications as this app. It's an env var on Render only, never committed
to the repo. (A keypair was already generated for this project during
development and handed to you directly rather than through this file or
git history — set it from there, or generate a fresh one with the snippet
above if you'd rather.)

**The background check itself (GitHub Actions → Render)**
1. Pick a random secret string (e.g. `openssl rand -hex 24`).
2. Set it on Render as `NOTIFY_CRON_SECRET`.
3. Add the same value as a GitHub Actions secret named `NOTIFY_CRON_SECRET`
   at `github.com/milossdlc/sperrwarner/settings/secrets/actions` — this is
   what `.github/workflows/check-subscriptions.yml` sends to prove the
   request is really the scheduled job and not a stranger poking the
   endpoint. Without this secret set on both sides, `/api/notify/run` is
   open to the internet, which isn't dangerous exactly (worst case someone
   triggers a check early) but isn't great practice either.
4. Optionally set `PUBLIC_BASE_URL=https://sperrwarner.de` so links in
   emails and the cron job's wake-up target always point at the real domain
   even if Render's own request context ever disagrees (e.g. behind a proxy).

Once all of the above is set, redeploy (or just wait for Render to restart
with the new env vars), and subscribing from a saved route will actually
send a confirmation email end to end.

**Known limitation worth knowing about**: iOS Safari only supports web push
for a site that's been "Added to Home Screen" as a PWA (iOS 16.4+) — a
family member checking Sperrwarner from a normal Safari tab on an iPhone
won't get push notifications, only email, until they add it to their home
screen first. Desktop and Android Chrome/Firefox support push without that
step. This is exactly why email is the guaranteed baseline and push is a
bonus on top, not the other way round.

## Going to production (if this becomes more than a weekend tool)

- Swap the OSRM public demo for a self-hosted OSRM instance (Germany-only
  extract is small and cheap to run) or a licensed routing API.
- Add a real Nominatim setup or a geocoding API with a usage tier, and
  cache geocoded place names (they don't change).
- Move saved routes, subscriptions + (future) user accounts into a real
  database instead of JSON files.
- Respect and display the data license/source per the API's terms.

## Tests

```bash
pip install pytest
pytest tests/
```

The tests run against saved JSON fixtures under `tests/fixtures/` (real
sample responses from the API), not live network calls — this keeps them
fast and independent of the upstream service being up.
