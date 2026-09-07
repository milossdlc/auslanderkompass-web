# Ausländerleben – implemented changes

## P0
- Replaced outdated Bürgergeld product label with Grundsicherungsgeld while retaining “früher: Bürgergeld” for orientation.
- Removed the fake default profile created by “Skip onboarding”.
- Removed the arbitrary Wohngeld rent/income 30% threshold.
- Benefit cards now recommend a check instead of claiming likely entitlement.

## UX / product
- New welcome page with clearer value proposition and local-device privacy message.
- New personalized “Heute” dashboard showing urgent deadlines, possible benefits and life areas.
- New profile view with edit flow.
- Added optional city and Bundesland profile inputs.
- New deadline hierarchy: Jetzt / Demnächst / Später.
- Added “Warum sehe ich das?” explanation to benefit details.
- Bottom navigation now includes Heute, Fristen, Wissen and Profil.

## Desktop / SEO
- Added responsive desktop layout with side navigation and wider content grid.
- Updated title, meta description, theme color and Open Graph metadata.

## Deployment note
The source code passed a standalone TypeScript source check in the provided environment. The sandbox dependency download repeatedly stalled before Vite packages finished installing, so a full `npm run build` could not be completed here. Cloudflare Pages should run `npm ci` and `npm run build` with output directory `dist`.

## Round 2 live polish
- Dashboard is now explicitly "Heute / Today" and focuses on the next actionable item.
- Deadlines older than 120 days no longer take over the dashboard; they trigger a profile-review notice instead.
- Deadline page separates stale profile dates from current deadlines.
- Desktop content uses more horizontal space and a two-column dashboard composition.
- Life-area cards expand to four columns on wide desktop screens.
- English navigation now uses "Knowledge" instead of "Explained".
- Reduced repetitive "Based on your answers" messaging and strengthened profile/personalization language.
