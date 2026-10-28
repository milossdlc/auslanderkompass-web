#!/usr/bin/env bash
# Harness: definicija „gotovo" za auslanderkompass-web. Pokreće se pre svakog push-a (Claude hook)
# i u GitHub Actions. Ovde su samo provere koje trenutno prolaze.
set -euo pipefail
cd "$(dirname "$0")/.."
step() { echo "▶ $*"; "$@"; }
step npm run lint
step npm run build

# SEO artefakti posle build-a (iste provere kao .github/workflows/build.yml)
test -f dist/guides/index.html
test -f dist/guide/anmeldung-deutschland/index.html
test -f dist/guide/steuer-id-deutschland/index.html
test -f dist/guide/rundfunkbeitrag-umzug/index.html
grep -q 'https://auslanderleben.de/guide/anmeldung-deutschland' dist/guide/anmeldung-deutschland/index.html
grep -q '<h1>' dist/guide/anmeldung-deutschland/index.html
grep -q '/guides' dist/index.html
grep -q '/guide/anmeldung-deutschland' dist/index.html
grep -q 'application/ld+json' dist/guide/anmeldung-deutschland/index.html
grep -q 'BreadcrumbList' dist/guide/anmeldung-deutschland/index.html
! grep -q 'pages.dev' dist/guide/anmeldung-deutschland/index.html
echo "✓ SEO artefakti"
echo "✓ verify prošao"
