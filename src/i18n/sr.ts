import type { LangStrings } from "./types";

export const sr: LangStrings = {
  "name": "Srpski / Bosanski / Hrvatski",
  "dir": "ltr",
  "nav": {
    "kompas": "Kompas",
    "rokovi": "Rokovi",
    "objasnjeno": "Objašnjeno"
  },
  "step": "Korak {n} od {total}",
  "onboarding": {
    "boravak": {
      "title": "Kakav je tvoj status boravka?",
      "sub": "Ovo određuje koja prava i obaveze važe za tebe — osnova za sve ostalo.",
      "permitLabel": "Vrsta tvoje dozvole boravka",
      "options": [
        {
          "key": "work_permit",
          "label": "Radna viza / Blue Card",
          "icon": "passport"
        },
        {
          "key": "family_reunification",
          "label": "Spajanje porodice",
          "icon": "heart"
        },
        {
          "key": "asylum",
          "label": "Postupak azila / Duldung",
          "icon": "passport"
        },
        {
          "key": "student_visa",
          "label": "Studentska viza",
          "icon": "book"
        }
      ],
      "arrivalLabel": "Datum tvog dolaska/preseljenja",
      "arrivalHint": "Koristi se za izračun roka za Anmeldung (14 dana).",
      "expiryLabel": "Datum isteka tvoje dozvole boravka",
      "expiryHint": "Potreban je da bismo izračunali tvoje lične rokove i podsetnike za pripremu."
    },
    "work": {
      "title": "Kakav je tvoj radni status?",
      "sub": "Ovo koristimo samo da izračunamo koja davanja verovatno važe za tebe.",
      "options": [
        {
          "key": "employed",
          "label": "Zaposlen/a",
          "icon": "house"
        },
        {
          "key": "unemployed",
          "label": "Nezaposlen/a",
          "icon": "coin"
        },
        {
          "key": "student",
          "label": "Student/kinja",
          "icon": "book"
        },
        {
          "key": "parental_leave",
          "label": "Roditeljsko odsustvo",
          "icon": "heart"
        }
      ],
      "incomeLabel": "Otprilike neto mesečno (€) — opciono, za precizniju procenu",
      "incomePlaceholder": "npr. 1800"
    },
    "kids": {
      "title": "Imaš li dece?",
      "sub": "Od ovoga zavisi da li ti pripada Kindergeld.",
      "yes": "Da",
      "no": "Ne",
      "kidsCountLabel": "Broj dece"
    },
    "housing": {
      "title": "Kako stanuješ?",
      "sub": "Ovo utiče na procenu za Wohngeld.",
      "options": [
        {
          "key": "renting",
          "label": "Iznajmljujem stan",
          "icon": "house"
        },
        {
          "key": "owned",
          "label": "Sopstveni stan/kuća",
          "icon": "house"
        },
        {
          "key": "shared",
          "label": "Delim stan sa drugima",
          "icon": "house"
        }
      ],
      "rentLabel": "Mesečna kirija sa troškovima (€) — opciono",
      "rentPlaceholder": "npr. 750"
    }
  },
  "next": "Dalje",
  "finish": "Prikaži moj Kompas",
  "back": "Nazad",
  "skip": "Preskoči za sada",
  "kompas": {
    "profileSaved": "Na osnovu tvojih odgovora",
    "title": "Tvoj kompas",
    "reset": "Počni ispočetka",
    "estimateLabel": "Procena",
    "estimateText": "{good} od {total} davanja verovatno važe za tebe",
    "yourBenefits": "Tvoja davanja",
    "proTitle": "Tačan iznos i simulator scenarija",
    "proSub": "Dostupno u Pro verziji — u pripremi",
    "startLabel": "Započni",
    "continueLabel": "Nastavi",
    "ctaNextSteps": "Pogledaj sledeće korake",
    "homeTagline": "Saznaj koja socijalna davanja u Nemačkoj verovatno važe za tebe — za samo tri kratka koraka.",
    "areasHeading": "Tvoje oblasti",
    "heroText": "Tvoja prava i obaveze, izračunati iz profila — po oblastima života.",
    "areaCounts": "{rights} prava · {obligations} obaveze",
    "rightsHeading": "Tvoja prava",
    "obligationsHeading": "Tvoje obaveze",
    "noObligations": "Za ovu oblast trenutno nema evidentiranih obaveza.",
    "noDateYet": "Datum još nije unet — dodaj ga u profilu za tačan rok."
  },
  "benefits": {
    "burgergeld": {
      "statusGood": "Verovatno važi",
      "statusWarn": "Proveri uslove",
      "statusMuted": "Malo verovatno",
      "noteGood": "Osnovna pomoć za nezaposlene — uključuje i troškove stanovanja."
    },
    "wohngeld": {
      "linkedStatus": "Pokriveno kroz Grundsicherungsgeld",
      "linkedNote": "Kad Grundsicherungsgeld važi, troškovi stana se obično pokrivaju kroz njega — poseban Wohngeld obično nije potreban.",
      "warnStatus": "Proveri iznos",
      "warnNoteRatio": "Kirija ti je {pct}% prihoda — preko uobičajenog praga za proveru Wohngeld-a.",
      "mutedStatus": "Malo verovatno",
      "mutedNoteRatio": "Kirija ({pct}% prihoda) je ispod uobičajenog praga.",
      "warnNoteMissing": "Unesi prihod i kiriju u profilu za precizniju procenu."
    },
    "kindergeld": {
      "status": "Verovatno važi",
      "noteForms": [
        "{n} dete prijavljeno",
        "{n} deteta prijavljena",
        "{n} dece prijavljeno"
      ],
      "noneStatus": "Ne važi",
      "noneNote": "Bez prijavljene dece."
    }
  },
  "benefitInfo": {
    "burgergeld": "Grundsicherungsgeld je osnovna socijalna pomoć u Nemačkoj za nezaposlene ili za one čiji prihodi nisu dovoljni za život, uključujući i podršku za troškove stanovanja.",
    "wohngeld": "Wohngeld je državna subvencija za troškove stanovanja namenjena domaćinstvima sa nižim prihodima koja ne primaju Grundsicherungsgeld.",
    "kindergeld": "Kindergeld je mesečna državna pomoć roditeljima za svako prijavljeno dete, nezavisno od visine prihoda."
  },
  "benefit": {
    "disclaimer": "Ovo je opšta informacija i ne predstavlja pravni savet.",
    "crosslink": "Pogledaj i {name}",
    "nextSteps": "Sledeći koraci",
    "docsTitle": "Šta ti obično treba",
    "markApplied": "Označi da si predao/la zahtev",
    "appliedOn": "Predato: {date}",
    "unmark": "Poništi",
    "openLink": "Otvori zvaničnu stranicu"
  },
  "benefitApply": {
    "burgergeld": "Zahtev se predaje online ili lično u nadležnom Jobcenteru.",
    "wohngeld": "Zahtev se predaje u nadležnoj Wohngeldstelle, obično deo gradske ili opštinske uprave.",
    "kindergeld": "Zahtev se predaje u nadležnoj Familienkasse, obično pri Agentur für Arbeit."
  },
  "benefitDocs": {
    "burgergeld": [
      "Lična karta ili boravišna dozvola",
      "Dokaz o nezaposlenosti ili nedovoljnim prihodima",
      "Broj bankovnog računa (IBAN)"
    ],
    "wohngeld": [
      "Lična karta ili boravišna dozvola",
      "Ugovor o zakupu sa iznosom kirije",
      "Potvrda o prihodima svih članova domaćinstva"
    ],
    "kindergeld": [
      "Lična karta ili boravišna dozvola",
      "Izvod iz matične knjige rođenih za dete",
      "Poreski identifikacioni broj deteta i roditelja"
    ]
  },
  "rokovi": {
    "title": "Rokovi",
    "fromApplied": "na osnovu datuma prijave",
    "empty": "Na osnovu tvog profila trenutno nema predloženih rokova.",
    "disclaimer": "Ovi datumi su okvirni, izračunati iz opšteg pravila — ne zamenjuju datum iz tvog stvarnog rešenja (Bescheid).",
    "approx": "okvirno · ",
    "pill": "za {d} d.",
    "bgTitle": "Grundsicherungsgeld — okvirna obnova odobrenja",
    "bgNote": "Obično 6–12 meseci — tačan datum vidi u svom rešenju (Bescheid).",
    "wgTitle": "Wohngeld — okvirna godišnja obnova",
    "wgNote": "Wohngeld zahtevi se obično obnavljaju jednom godišnje.",
    "needProfileTitle": "Prvo završi svoj Kompas",
    "needProfileText": "Da bismo izračunali tvoje rokove, prvo nam treba tvoj profil — traje samo par koraka.",
    "anmeldungTitle": "Prijava prebivališta (Anmeldung)",
    "anmeldungNote": "Obavezno u roku od 14 dana od useljenja — kod nadležnog Bürgeramt-a.",
    "permitTitle": "Obnova dozvole boravka",
    "permitNote": "Predaj zahtev za obnovu na vreme, pre isteka trenutne dozvole, kod Ausländerbehörde.",
    "tagObligation": "Obaveza",
    "tagRight": "Pravo",
    "overdue": "prekoračeno"
  },
  "areas": {
    "boravak": {
      "name": "Boravak"
    },
    "stanovanje": {
      "name": "Stanovanje"
    },
    "rad": {
      "name": "Rad"
    },
    "porodica": {
      "name": "Porodica"
    }
  },
  "extra": {
    "boravak_work": {
      "name": "Pravo na rad",
      "desc": "Da li i u kom obimu smeš da radiš zavisi od tipa tvoje dozvole boravka — kod radne vize ili Blue Card-a obično bez ograničenja, kod drugih dozvola često uz ograničenja ili posebnu dozvolu."
    },
    "boravak_family": {
      "name": "Spajanje porodice",
      "desc": "Pod određenim uslovima možeš da dovedeš najuže članove porodice (supružnika, maloletnu decu). Tačni uslovi zavise od tipa tvoje dozvole."
    },
    "boravak_anmeldung": {
      "name": "Prijavi prebivalište",
      "desc": "Posle svakog useljenja moraš da se prijaviš kod Bürgeramt-a u roku od 14 dana — bez toga mnogi sledeći koraci (bankovni račun, dozvola boravka) nisu mogući.",
      "consequence": "Zakasnela prijava može doneti novčanu kaznu i usporava sve što se na nju nadovezuje."
    },
    "boravak_permit": {
      "name": "Obnovi dozvolu boravka",
      "desc": "Predaj zahtev za obnovu kod nadležnog Ausländerbehörde na vreme, pre isteka trenutne dozvole.",
      "consequence": "Istekla dozvola boravka bez blagovremenog zahteva može ugroziti tvoj legalni status."
    },
    "boravak_integration": {
      "name": "Integracioni kurs",
      "desc": "U zavisnosti od tipa dozvole boravka, pohađanje integracionog kursa (jezik + orijentacija) može biti obavezno.",
      "consequence": "Kod obavezne pohađanja, izostanak bez opravdanog razloga može imati posledice po tvoju dozvolu boravka."
    },
    "stanovanje_kuendigung": {
      "name": "Zaštita od otkaza stana",
      "desc": "Kao zakupac u Nemačkoj uživaš relativno jaku zakonsku zaštitu od otkaza — otkaz od strane izdavaoca obično zahteva priznat razlog."
    },
    "stanovanje_adresa": {
      "name": "Prijava promene adrese",
      "desc": "Kod svakog preseljenja moraš ponovo da se prijaviš u roku od 14 dana i da obavestiš Jobcenter odnosno Ausländerbehörde o novoj adresi.",
      "consequence": "Neprijavljena promena adrese može usporiti tekuća davanja."
    },
    "rad_minwage": {
      "name": "Minimalna zarada",
      "desc": "U Nemačkoj važi zakonska minimalna zarada po satu rada, nezavisno od branše ili državljanstva."
    },
    "rad_leave": {
      "name": "Plaćeni odmor",
      "desc": "Kod petodnevne radne nedelje zakonski ti pripada najmanje 20 plaćenih dana odmora godišnje."
    },
    "rad_dismissal": {
      "name": "Zaštita od otkaza na poslu",
      "desc": "Posle 6 meseci u istoj firmi (sa više od 10 zaposlenih) važi zakonska zaštita od otkaza — otkaz tada zahteva priznat razlog."
    },
    "rad_mitwirkung": {
      "name": "Mitwirkungspflicht",
      "desc": "Promene prihoda, posla ili adrese moraš sam/a i bez podsećanja prijaviti Jobcenteru.",
      "consequence": "Neprijavljene promene mogu dovesti do povraćaja novca ili umanjenja davanja."
    },
    "porodica_elterngeld": {
      "name": "Elterngeld",
      "desc": "Elterngeld pomaže roditeljima koji posle rođenja deteta smanje svoj prihod da bi se brinuli o detetu — nezavisno od Grundsicherungsgeld-a."
    },
    "porodica_birth": {
      "name": "Prijavi rođenje",
      "desc": "Rođenje deteta mora da se prijavi kod nadležnog matičnog ureda (Standesamt), obično u roku od nedelju dana.",
      "consequence": "Bez prijave rođenja nema izvoda iz matične knjige rođenih — a on je potreban za Kindergeld i druge zahteve."
    },
    "porodica_taxid": {
      "name": "Poreski ID za dete",
      "desc": "Svako dete treba sopstveni poreski identifikacioni broj — obično se dodeljuje automatski posle prijave rođenja i potreban je za zahtev za Kindergeld."
    }
  },
  "glossary": [
    {
      "term": "Bescheid",
      "area": null,
      "explain": "Zvanično pismeno rešenje institucije o tvom zahtevu — sadrži odluku i, ako se ne slažeš, rok za žalbu (Widerspruch).",
      "institution": "zavisi od institucije koja ga šalje"
    },
    {
      "term": "Widerspruch",
      "area": null,
      "explain": "Zvanična žalba na Bescheid, obično u roku od mesec dana od prijema.",
      "institution": "institucija koja je izdala Bescheid"
    },
    {
      "term": "Anmeldung",
      "area": "boravak",
      "explain": "Prijava prebivališta posle preseljenja. Rok je 14 dana — bez ovoga ne možeš da otvoriš druge stvari (bankovni račun, dozvolu boravka).",
      "institution": "Bürgeramt / Einwohnermeldeamt"
    },
    {
      "term": "Aufenthaltstitel",
      "area": "boravak",
      "explain": "Dokument koji reguliše tvoj zakoniti boravak u Nemačkoj — tip i trajanje određuju šta smeš (npr. da radiš) i šta moraš da uradiš.",
      "institution": "Ausländerbehörde"
    },
    {
      "term": "Mitwirkungspflicht",
      "area": "rad",
      "explain": "Tvoja obaveza da sam prijaviš promene (prihod, posao, adresa) — sistem ne saznaje sam.",
      "institution": "Jobcenter (za Grundsicherungsgeld)"
    },
    {
      "term": "Jobcenter naspram Agentur für Arbeit",
      "area": "rad",
      "explain": "Jobcenter je za primaoce Grundsicherungsgeld-a; Agentur für Arbeit je za osiguranje za slučaj nezaposlenosti, ako si ranije radio i uplaćivao doprinose. Retko imaš posla sa obe.",
      "institution": "zavisi od tvoje radne istorije"
    }
  ],
  "glossaryPage": {
    "title": "Objašnjeno",
    "intro": "Razumevanje nemačkih birokratskih termina nije samo pitanje jezika — termini dobijaju značenje tek kroz iskustvo sa sistemom. Nemački termin ostaje neizmenjen (tako stoji i na tvom pismu), objašnjenje je na tvom jeziku.",
    "groupGeneral": "Opšte"
  },
  "months": [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "avg",
    "sep",
    "okt",
    "nov",
    "dec"
  ]
};
