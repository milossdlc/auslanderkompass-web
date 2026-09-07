# Ausländerleben

Personalized Germany-life compass built with React + TypeScript + Vite.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm ci
npm run build
```

The production files are generated in `dist/`.

## Cloudflare Pages

For a Git-connected Cloudflare Pages project use:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 22 or newer

If you use Cloudflare Pages Direct Upload, first run `npm ci && npm run build` locally and upload the generated `dist/` directory.

## 2026 product refresh

This version includes:

- New **Ausländerleben** positioning and welcome screen
- Personalized **Heute** dashboard
- Safer benefit suggestions without automatic entitlement claims
- **Grundsicherungsgeld** terminology (with former Bürgergeld reference)
- Removed fake profile creation when onboarding is skipped
- New **Mein Profil** view and profile editing
- Optional city and Bundesland fields
- Reworked deadline view, grouped by urgency
- “Warum sehe ich das?” explanation on benefit details
- Responsive desktop navigation/layout instead of a fixed 430 px phone shell
- Improved privacy messaging
- Updated title, description and Open Graph metadata

User profile data continues to be stored locally in the browser via `localStorage`.
