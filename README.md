# Ausländerkompass

Pravi razvojni projekat, napravljen prema HTML prototipu. React + TypeScript + Vite, potpuno na klijentskoj strani (bez servera) — svi podaci (profil, jezik) čuvaju se lokalno u browseru korisnika preko `localStorage`.

## Struktura projekta

```
src/
  types.ts            tipovi za profil, draft, oblasti, prava/obaveze...
  i18n/                prevodi za svih 7 jezika (de, sr, ar, tr, uk, ru, fa)
    types.ts           tip LangStrings — struktura koju svaki prevod mora ispuniti
    de.ts, sr.ts, ...   sadržaj po jeziku
    index.ts           STRINGS registry + t()/pl()/detectDefaultLang() pomoćne funkcije
  lib/
    dates.ts           parseISO, addDays, addMonths, daysUntil, isOverdue, fmtDate
    benefits.ts        computeBenefits() — logika za Bürgergeld/Wohngeld/Kindergeld
    areaItems.ts        AREA_ITEMS — dodatna prava/obaveze po oblasti (uslovi vidljivosti + rokovi)
    areas.ts           computeAreaData(), nearestObligation()
    tone.ts            boje/klase za statuse (good/warn/muted/info)
  state/
    store.ts           oblik stanja aplikacije + reducer (akcije poput onboarding koraka, izbora...)
    useAppState.ts      React hook koji povezuje reducer sa localStorage perzistencijom
  components/          Icon, NavBar, ChoiceButton, AreaCard, BenefitCard, AreaItemCard...
  views/                Kompas, Onboarding, Rokovi, Objasnjeno (pojmovnik), AreaDetail, AreaItemDetail, BenefitDetail
  styles/global.css     dizajn sistem (CSS custom properties), svetla/tamna tema
```

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Otvori link koji ispiše terminal (obično `http://localhost:5173`).

## Build za produkciju

```bash
npm run build
```

Rezultat ide u `dist/` — statički fajlovi spremni za deploy bilo gde (Vercel, Netlify, GitHub Pages, ili bilo koji statički hosting), pošto aplikacija nema server deo.

Za lokalnu proveru build-a:

```bash
npm run preview
```

## Šta je gotovo

- Kompas: 4 životne oblasti (Boravak, Stanovanje, Rad, Porodica) sa pravima i obavezama
- Onboarding: status boravka (tip dozvole, datum dolaska, datum isteka), status rada, deca, stanovanje
- Rokovi: Anmeldung (14 dana od dolaska), produženje dozvole boravka, orijentacioni rokovi za Bürgergeld/Wohngeld
- Objašnjeno: pojmovnik — nemački termin nepromenjen, objašnjenje na jeziku korisnika, nadležna institucija
- Svih 7 jezika: nemački, srpski/bosanski/hrvatski, arapski (RTL), turski, ukrajinski, ruski, farsi (RTL)
- Svetla i tamna tema (prati podešavanje sistema)

## Šta nedostaje za pravi proizvod

- Pravi izračun visine Bürgergeld/Wohngeld/Kindergeld iznosa (trenutno samo procena da li verovatno pripada)
- Nalozi/sinhronizacija između uređaja (trenutno je sve samo u localStorage jednog browsera)
- Prošireni pojmovnik (trenutno 6 opštih termina + par po oblasti — vredi dodati još, uz proveru izvornog govornika za svaki jezik)
- Pravni pregled sadržaja (svi tekstovi su opšta informacija, ne pravni savet — RDG disclaimer je već svuda prisutan)
