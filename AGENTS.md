**Before any change or deploy, read DEPLOY.md.**

## Harness — kada je posao gotov

- **Gotovo = `bash scripts/verify.sh` prolazi** (šta tačno proverava piše u tom fajlu). Ne javljaj „gotovo" i ne push-uj pre toga. Iste provere radi GitHub Actions na svaki push.
- Deploy je samo `git push` na `main`. Ručni deploy (`wrangler deploy`, deploy skripte), force push i rebase su zabranjeni; Claude Code ih blokira hook-om (`.claude/hooks/guard.sh`).
- Svaki popravljen bag dobija test koji bi ga uhvatio. Ako agent ponovi istu grešku, dodaj pravilo u ovaj fajl (kratko, jedan red).
- Harness je isti u svim projektima; šablon i uputstvo: `docs/harness-template/` u repou milossdlc/portfolio-os.

## Portfolio OS (obavezno na početku i na kraju svakog zadatka)

Status svih proizvoda vodi se u Portfolio OS-u (https://portfolio-os.milos-sdlc.workers.dev),
ne u dokumentima. Ovaj repo je proizvod: **Ausländerleben**.

Pozivi idu preko ove funkcije (ključ: u Claude cloud sesijama ga dodaje mrežna tajna okruženja i agent ga
ne vidi; u drugim alatima je u promenljivoj `PORTFOLIO_OS_KEY`):

```sh
pos() { curl -sS -X POST https://yhgvivzjwcqwmrvbbrfv.supabase.co/functions/v1/agent \
  ${PORTFOLIO_OS_KEY:+-H "Authorization: Bearer $PORTFOLIO_OS_KEY"} -H "content-type: application/json" -d "$1"; }
```

1. Pre rada pročitaj stanje proizvoda (sledeća aktivnost, otvoreni zadaci, spisak beleški):
   `pos '{"action":"product","product":"Ausländerleben"}'`
   Opšta pravila (marketing, promocija, objava, način rada…) žive u beleškama Portfolio OS-a, ne u repou.
   Iz `notes_index` pročitaj samo one koje se tiču zadatka: `pos '{"action":"note","note":"<naslov>"}'`
   (traženje: `pos '{"action":"notes","query":"marketing"}'`). Uvek važe beleške „Pravila“ i „Jedan način rada“.
2. Posle rada upiši jedan red u dnevnik: šta je urađeno, commit, otvoreni nalazi.
   `pos '{"action":"log","product":"Ausländerleben","text":"…"}'`
3. Ako se promenila faza ili sledeći korak: `update_product` (status, next_action,
   next_action_due); zadatak koji si završio: `update_task` sa `"status":"gotovo"`.

Ključ se nikad ne ispisuje, ne loguje i ne commit-uje. Ako API vrati grešku (nema mreže ili ključa),
na kraju odgovora napiši blok `Portfolio OS: <proizvod> — <šta je urađeno> — sledeće: <…>` da ga Milos prosledi.
Sve akcije: `docs/agent-api.md` u repou milossdlc/portfolio-os.
