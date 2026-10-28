#!/usr/bin/env bash
# Harness senzor (Claude Code, PreToolUse/Bash) — isti fajl u svim Miloševim repoima.
# Pravila iz AGENTS.md/DEPLOY.md koja se sprovode mehanički. Exit 2 = komanda se blokira,
# a poruka na stderr ide agentu kao povratna informacija.
cmd=$(jq -r '.tool_input.command // ""')

block() { echo "BLOKIRANO (harness): $1" >&2; exit 2; }

# 1. Deploy ide isključivo preko git push na main (Cloudflare Git integracija / Workers Builds).
if echo "$cmd" | grep -Eq '(^|[^[:alnum:]_-])wrangler[[:space:]]+(deploy|publish|versions[[:space:]]+deploy|pages[[:space:]]+deploy)'; then
  block "lokalni wrangler deploy je zabranjen. Deploy = git push na main."
fi
if echo "$cmd" | grep -Eq '(npm|bun|pnpm|yarn)[[:space:]]+(run[[:space:]]+)?deploy|cloudflare[[:space:]]+deploy|nitro[[:space:]]+deploy'; then
  block "deploy skripte se ne pokreću ručno. Deploy = git push na main."
fi

# 2. Bez prepisivanja objavljene istorije.
if echo "$cmd" | grep -Eq 'git[[:space:]]+push.*(--force|--force-with-lease|[[:space:]]-f([[:space:]]|$)|[[:space:]]\+[[:alnum:]])'; then
  block "force push je zabranjen (prepisuje objavljenu istoriju)."
fi
if echo "$cmd" | grep -Eq 'git[[:space:]]+rebase'; then
  block "rebase je zabranjen (prepisuje istoriju). Koristi merge."
fi

# 3. Tajne se ne ispisuju.
if echo "$cmd" | grep -Eq '(echo|printf|cat|printenv|env)[^|;&]*(PORTFOLIO_OS_KEY|_SECRET|_TOKEN|SERVICE_ROLE)|^[[:space:]]*(printenv|env)[[:space:]]*$'; then
  block "tajne (ključevi, tokeni) se ne ispisuju."
fi

# 4. Pre push-a sve provere moraju da prođu („gotovo" = verify zelen).
if echo "$cmd" | grep -Eq 'git[[:space:]]+push'; then
  cd "$CLAUDE_PROJECT_DIR" || exit 0
  if [ -f scripts/verify.sh ]; then
    run="bash scripts/verify.sh"
  elif [ -f package.json ] && jq -e '.scripts.verify' package.json >/dev/null 2>&1; then
    if [ -f bun.lock ]; then run="bun run verify"; else run="npm run verify"; fi
  else
    exit 0
  fi
  if ! out=$($run 2>&1); then
    echo "BLOKIRANO (harness): '$run' nije prošao — popravi pre push-a." >&2
    echo "$out" | grep -Ev '^\s*$' | tail -40 >&2
    exit 2
  fi
fi

exit 0
