#!/usr/bin/env bash
# Harness memorija (Claude Code, SessionStart) — isti fajl u svim Miloševim repoima.
# Na početku sesije učita stanje proizvoda i spisak beleški (opšta pravila) iz Portfolio OS-a,
# da agent ne kreće „bez sećanja". Naziv proizvoda je u .claude/product. Izlaz ide agentu u kontekst.
dir="${CLAUDE_PROJECT_DIR:-.}"
PRODUCT=$(head -1 "$dir/.claude/product" 2>/dev/null)
API="${PORTFOLIO_OS_API:-https://yhgvivzjwcqwmrvbbrfv.supabase.co/functions/v1/agent}"
[ -z "$PRODUCT" ] && { echo "Portfolio OS: nema .claude/product u ovom repou."; exit 0; }

if [ -z "$PORTFOLIO_OS_KEY" ]; then
  echo "Portfolio OS: nema PORTFOLIO_OS_KEY u okruženju — stanje proizvoda „$PRODUCT“ nije učitano."
  echo "Na kraju rada napiši blok 'Portfolio OS: $PRODUCT — <urađeno> — sledeće: <…>' (vidi AGENTS.md)."
  exit 0
fi

body=$(jq -nc --arg p "$PRODUCT" '{action:"product",product:$p}')
if res=$(curl -sS --max-time 10 -X POST "$API" \
  -H "Authorization: Bearer $PORTFOLIO_OS_KEY" -H "content-type: application/json" -d "$body" 2>/dev/null); then
  echo "Stanje proizvoda „$PRODUCT“ iz Portfolio OS-a. Pre rada pročitaj beleške koje se tiču zadatka"
  echo "({\"action\":\"note\",\"note\":\"<naslov>\"}); na kraju upiši dnevnik po AGENTS.md:"
  echo "$res" | head -c 8000
else
  echo "Portfolio OS API nije dostupan — na kraju rada napiši blok za ručni unos (vidi AGENTS.md)."
fi
exit 0
