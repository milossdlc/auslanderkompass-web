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
# Vodiči za ugovore i osiguranja (04.11.2026): svaka stranica ima pun tekst, izvore i stoji u sitemap-u
for s in vertraege-kuendigen-wechseln internet-vertrag-wechseln handyvertrag-wechseln strom-gas-anbieter-wechseln kfz-versicherung-wechseln haftpflichtversicherung-deutschland girokonto-wechseln mietkaution-deutschland; do
  f="dist/guide/$s/index.html"
  test -f "$f" || { echo "✗ nema $f"; exit 1; }
  grep -q 'Offizielle Quellen' "$f" || { echo "✗ $s nema pun tekst sa izvorima"; exit 1; }
  grep -q "https://auslanderleben.de/guide/$s<" public/sitemap.xml || { echo "✗ $s nije u sitemap.xml"; exit 1; }
  grep -q "/guide/$s" dist/guides/index.html || { echo "✗ $s nije na /guides"; exit 1; }
done
echo "✓ SEO artefakti"

# Podrazumevani jezik je nemački, bez obzira na jezik browsera (Milos, 04.11.2026)
if grep -q 'navigator.language' src/i18n/index.ts; then echo "✗ jezik browsera ne sme da bira jezik"; exit 1; fi
echo "✓ podrazumevani jezik: de"
echo "✓ verify prošao"
