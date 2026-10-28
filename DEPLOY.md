# Deploy rules (read before changing anything)

- **Production:** Cloudflare Pages → auslanderleben.de
- **Deploy = `git push` to `main`.** Cloudflare builds and deploys automatically (Git integration).
- **Never** run `wrangler deploy`, drag-and-drop uploads, or deploy from a copy in Downloads/zip files. A manual deploy from a stale copy rolled TippMatch back 17 days on 2026-09-29.
- Always `git pull` before editing. This GitHub repo is the only source of truth.
- Secrets live in Cloudflare (Worker settings → Variables and Secrets), never in this repo or in `wrangler.jsonc`.
- Status, plan and registry of all of Milos' projects: Portfolio OS (https://portfolio-os.milos-sdlc.workers.dev) — see AGENTS.md.
