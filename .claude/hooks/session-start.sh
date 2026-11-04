#!/usr/bin/env bash
# Harness memorija (Claude Code, SessionStart) — isti fajl u svim Miloševim repoima.
# Na početku sesije učita stanje proizvoda i spisak beleški (opšta pravila) iz Portfolio OS-a,
# da agent ne kreće „bez sećanja". Naziv proizvoda je u .claude/product. Izlaz ide agentu u kontekst.
# Ključ: u Claude cloud sesijama ga dodaje mrežna tajna okruženja (agent ga ne vidi); drugde PORTFOLIO_OS_KEY.
dir="${CLAUDE_PROJECT_DIR:-.}"
PRODUCT=$(head -1 "$dir/.claude/product" 2>/dev/null)
API="${PORTFOLIO_OS_API:-https://yhgvivzjwcqwmrvbbrfv.supabase.co/functions/v1/agent}"
[ -z "$PRODUCT" ] && { echo "Portfolio OS: nema .claude/product u ovom repou."; exit 0; }

# Pravilo 6 („Jedan način rada“): crveno ima prednost. Ako je poslednji run bilo kog workflow-a
# na main crven, to je prvi zadatak ove sesije, pre nove funkcije. Bez gh ili mreže se preskače.
repo=$(git -C "$dir" remote get-url origin 2>/dev/null | sed -E 's#.*github\.com[:/]##; s#\.git$##; s#/$##')
if [ -n "$repo" ] && command -v gh >/dev/null 2>&1; then
  # Isključeni workflow-i (npr. pauziran proizvod) se ne broje.
  active=$(timeout 10 gh workflow list -R "$repo" --json name,state 2>/dev/null \
    | jq -c '[.[] | select(.state == "active") | .name]' 2>/dev/null)
  red=$(timeout 10 gh run list -R "$repo" -b main -L 30 \
    --json workflowName,status,conclusion,url,createdAt 2>/dev/null | jq -r --argjson active "${active:-null}" '
      [.[] | select(.status == "completed")
           | select($active == null or (.workflowName as $w | $active | index($w)))]
      | group_by(.workflowName)
      | map(max_by(.createdAt)) | .[]
      | select(.conclusion == "failure" or .conclusion == "timed_out" or .conclusion == "startup_failure")
      | "  - \(.workflowName): \(.conclusion) (\(.createdAt[:10])) \(.url)"' 2>/dev/null)
  if [ -n "$red" ]; then
    echo "⛔ CI na main je CRVEN — po pravilu 6 ovo je prvi zadatak sesije, pre bilo koje nove funkcije:"
    echo "$red"
    echo
  fi
fi

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
