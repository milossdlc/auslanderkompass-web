#!/usr/bin/env bash
# Harness memorija (Claude Code, SessionStart) — isti fajl u svim Miloševim repoima.
# Na početku sesije učita stanje proizvoda i spisak beleški (opšta pravila) iz Portfolio OS-a,
# da agent ne kreće „bez sećanja". Naziv proizvoda je u .claude/product. Izlaz ide agentu u kontekst.
# Ključ: u Claude cloud sesijama ga dodaje mrežna tajna okruženja (agent ga ne vidi); drugde PORTFOLIO_OS_KEY.
dir="${CLAUDE_PROJECT_DIR:-.}"
PRODUCT=$(head -1 "$dir/.claude/product" 2>/dev/null)
API="${PORTFOLIO_OS_API:-https://yhgvivzjwcqwmrvbbrfv.supabase.co/functions/v1/agent}"
[ -z "$PRODUCT" ] && { echo "Portfolio OS: nema .claude/product u ovom repou."; exit 0; }

body=$(jq -nc --arg p "$PRODUCT" '{action:"product",product:$p}')
res=$(curl -sS --max-time 10 -w '\n%{http_code}' -X POST "$API" \
  ${PORTFOLIO_OS_KEY:+-H "Authorization: Bearer $PORTFOLIO_OS_KEY"} \
  -H "content-type: application/json" -d "$body" 2>/dev/null)
code=$(printf '%s' "$res" | tail -n1)

if [ "$code" = "200" ]; then
  echo "Stanje proizvoda „$PRODUCT“ iz Portfolio OS-a. Pre rada pročitaj beleške koje se tiču zadatka"
  echo "(pos '{\"action\":\"note\",\"note\":\"<naslov>\"}'); na kraju upiši dnevnik po AGENTS.md:"
  # Zbijeno: proizvod, otvoreni zadaci, poslednjih 5 redova dnevnika i naslovi beleški.
  printf '%s' "$res" | sed '$d' | jq -c '{product, open_tasks, recent_log: (.recent_log[:5]),
    notes: [.notes_index[] | .title]}' 2>/dev/null | head -c 12000 \
    || printf '%s' "$res" | sed '$d' | head -c 8000
elif [ "$code" = "401" ]; then
  echo "Portfolio OS: nema važećeg ključa (ni mrežne tajne okruženja ni PORTFOLIO_OS_KEY) — stanje proizvoda „$PRODUCT“ nije učitano."
  echo "Na kraju rada napiši blok 'Portfolio OS: $PRODUCT — <urađeno> — sledeće: <…>' (vidi AGENTS.md)."
else
  echo "Portfolio OS API nije dostupan (HTTP ${code:-bez odgovora}) — na kraju rada napiši blok za ručni unos (vidi AGENTS.md)."
fi
exit 0
