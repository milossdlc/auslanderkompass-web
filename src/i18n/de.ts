import type { LangStrings } from "./types";

export const de: LangStrings = {
  "name": "Deutsch",
  "dir": "ltr",
  "nav": {
    "kompas": "Kompass",
    "rokovi": "Fristen",
    "objasnjeno": "Erklärt"
  },
  "step": "Schritt {n} von {total}",
  "onboarding": {
    "boravak": {
      "title": "Wie ist dein Aufenthaltsstatus?",
      "sub": "Das bestimmt, welche Rechte und Pflichten für dich gelten — die Grundlage für alles andere.",
      "permitLabel": "Art deines Aufenthaltstitels",
      "options": [
        {
          "key": "work_permit",
          "label": "Arbeits-/Blue-Card-Visum",
          "icon": "passport"
        },
        {
          "key": "family_reunification",
          "label": "Familiennachzug",
          "icon": "heart"
        },
        {
          "key": "asylum",
          "label": "Asylverfahren / Duldung",
          "icon": "passport"
        },
        {
          "key": "student_visa",
          "label": "Studienvisum",
          "icon": "book"
        }
      ],
      "arrivalLabel": "Datum deiner Einreise/deines Umzugs",
      "arrivalHint": "Wird genutzt, um deine Anmeldefrist zu berechnen (14 Tage).",
      "expiryLabel": "Ablaufdatum deines Aufenthaltstitels",
      "expiryHint": "Wird benötigt, damit wir deine persönlichen Fristen und Erinnerungen berechnen können."
    },
    "work": {
      "title": "Wie ist dein Arbeitsstatus?",
      "sub": "Das nutzen wir nur, um zu berechnen, welche Leistungen wahrscheinlich auf dich zutreffen.",
      "options": [
        {
          "key": "employed",
          "label": "Berufstätig",
          "icon": "house"
        },
        {
          "key": "unemployed",
          "label": "Arbeitslos",
          "icon": "coin"
        },
        {
          "key": "student",
          "label": "Student/in",
          "icon": "book"
        },
        {
          "key": "parental_leave",
          "label": "Elternzeit",
          "icon": "heart"
        }
      ],
      "incomeLabel": "Ungefähres Netto pro Monat (€) — optional, für eine genauere Schätzung",
      "incomePlaceholder": "z. B. 1800"
    },
    "kids": {
      "title": "Hast du Kinder?",
      "sub": "Das bestimmt, ob Kindergeld für dich infrage kommt.",
      "yes": "Ja",
      "no": "Nein",
      "kidsCountLabel": "Anzahl der Kinder"
    },
    "housing": {
      "title": "Wie wohnst du?",
      "sub": "Das beeinflusst die Einschätzung für Wohngeld.",
      "options": [
        {
          "key": "renting",
          "label": "Ich miete eine Wohnung",
          "icon": "house"
        },
        {
          "key": "owned",
          "label": "Eigene Wohnung/Haus",
          "icon": "house"
        },
        {
          "key": "shared",
          "label": "Wohngemeinschaft",
          "icon": "house"
        }
      ],
      "rentLabel": "Monatliche Warmmiete (€) — optional",
      "rentPlaceholder": "z. B. 750"
    }
  },
  "next": "Weiter",
  "finish": "Meinen Kompass zeigen",
  "back": "Zurück",
  "skip": "Vorerst überspringen",
  "kompas": {
    "profileSaved": "Basierend auf deinen Angaben",
    "title": "Dein Kompass",
    "reset": "Von vorn beginnen",
    "estimateLabel": "Einschätzung",
    "estimateText": "{good} von {total} Leistungen treffen wahrscheinlich auf dich zu",
    "yourBenefits": "Deine Leistungen",
    "proTitle": "Genauer Betrag & Was-wäre-wenn-Simulator",
    "proSub": "Verfügbar in der Pro-Version — in Vorbereitung",
    "startLabel": "Starten",
    "continueLabel": "Weiter",
    "ctaNextSteps": "Nächste Schritte ansehen",
    "homeTagline": "Dein persönlicher Begleiter für das Leben in Deutschland: Rechte verstehen, Fristen im Blick behalten und nächste Schritte finden.",
    "areasHeading": "Deine Lebensbereiche",
    "heroText": "Sieh auf einen Blick, was jetzt wichtig ist und was du als Nächstes tun kannst.",
    "areaCounts": "{rights} Rechte · {obligations} Pflichten",
    "rightsHeading": "Deine Rechte",
    "obligationsHeading": "Deine Pflichten",
    "noObligations": "Für diesen Bereich sind aktuell keine Pflichten hinterlegt.",
    "noDateYet": "Noch kein Datum hinterlegt — ergänze es in deinem Profil für eine genaue Frist."
  },
  "benefits": {
    "burgergeld": {
      "statusGood": "Trifft wahrscheinlich zu",
      "statusWarn": "Bedingungen prüfen",
      "statusMuted": "Eher unwahrscheinlich",
      "noteGood": "Grundsicherung für Arbeitslose — schließt auch Wohnkosten ein."
    },
    "wohngeld": {
      "linkedStatus": "Über Grundsicherungsgeld abgedeckt",
      "linkedNote": "Wenn Grundsicherungsgeld zutrifft, werden die Wohnkosten meist darüber abgedeckt — ein separater Wohngeld-Antrag ist normalerweise nicht nötig.",
      "warnStatus": "Betrag prüfen",
      "warnNoteRatio": "Deine Miete beträgt {pct}% deines Einkommens — über der üblichen Prüfschwelle für Wohngeld.",
      "mutedStatus": "Eher unwahrscheinlich",
      "mutedNoteRatio": "Die Miete ({pct}% des Einkommens) liegt unter der üblichen Schwelle.",
      "warnNoteMissing": "Trage Einkommen und Miete in deinem Profil ein für eine genauere Schätzung."
    },
    "kindergeld": {
      "status": "Trifft wahrscheinlich zu",
      "noteForms": [
        "{n} Kind angemeldet",
        "{n} Kinder angemeldet"
      ],
      "noneStatus": "Trifft nicht zu",
      "noneNote": "Keine Kinder angegeben."
    }
  },
  "benefitInfo": {
    "burgergeld": "Grundsicherungsgeld ist die Geldleistung innerhalb der Grundsicherung für Arbeitsuchende nach dem SGB II. Ob ein Anspruch besteht, hängt unter anderem von Einkommen, Vermögen, Haushalt und Aufenthaltsstatus ab. Bis 30. Juni 2026 hieß die Leistung Grundsicherungsgeld.",
    "wohngeld": "Wohngeld ist ein staatlicher Zuschuss zu den Wohnkosten. Ob du Anspruch hast, hängt unter anderem von Haushaltsgröße, Einkommen, Miete und Wohnort ab.",
    "kindergeld": "Kindergeld unterstützt Familien monatlich. Ob du Anspruch hast, hängt unter anderem von deiner familiären Situation und bei ausländischen Staatsangehörigen auch vom Aufenthaltsstatus ab."
  },
  "benefit": {
    "disclaimer": "Dies ist eine allgemeine Information und keine Rechtsberatung.",
    "crosslink": "Auch {name} ansehen",
    "nextSteps": "Nächste Schritte",
    "docsTitle": "Was du normalerweise brauchst",
    "markApplied": "Als beantragt markieren",
    "appliedOn": "Beantragt am: {date}",
    "unmark": "Zurücksetzen",
    "openLink": "Offizielle Seite öffnen"
  },
  "benefitApply": {
    "burgergeld": "Der Antrag wird online oder persönlich beim zuständigen Jobcenter gestellt.",
    "wohngeld": "Der Antrag wird bei der zuständigen Wohngeldstelle gestellt, meist Teil der Stadt- oder Gemeindeverwaltung.",
    "kindergeld": "Der Antrag wird bei der zuständigen Familienkasse gestellt, meist bei der Agentur für Arbeit."
  },
  "benefitDocs": {
    "burgergeld": [
      "Personalausweis oder Aufenthaltstitel",
      "Nachweis über Arbeitslosigkeit oder unzureichendes Einkommen",
      "Kontonummer (IBAN)"
    ],
    "wohngeld": [
      "Personalausweis oder Aufenthaltstitel",
      "Mietvertrag mit Mietbetrag",
      "Einkommensnachweis aller Haushaltsmitglieder"
    ],
    "kindergeld": [
      "Personalausweis oder Aufenthaltstitel",
      "Geburtsurkunde des Kindes",
      "Steuer-ID von Kind und Elternteil"
    ]
  },
  "rokovi": {
    "title": "Fristen",
    "fromApplied": "basierend auf deinem Antragsdatum",
    "empty": "Basierend auf deinem Profil gibt es aktuell keine vorgeschlagenen Fristen.",
    "disclaimer": "Diese Termine sind ungefähr und aus einer allgemeinen Regel berechnet — sie ersetzen nicht das Datum in deinem tatsächlichen Bescheid.",
    "approx": "ca. ",
    "pill": "in {d} T.",
    "bgTitle": "Grundsicherungsgeld — Bewilligungszeitraum prüfen",
    "bgNote": "Das genaue Ende deines Bewilligungszeitraums steht in deinem Bescheid. Prüfe dieses Datum, bevor du einen Weiterbewilligungsantrag planst.",
    "wgTitle": "Wohngeld — voraussichtliche jährliche Erneuerung",
    "wgNote": "Wohngeld-Anträge werden meist einmal jährlich erneuert.",
    "needProfileTitle": "Schließe zuerst deinen Kompass ab",
    "needProfileText": "Um deine Fristen zu berechnen, brauchen wir zuerst dein Profil — dauert nur ein paar Schritte.",
    "anmeldungTitle": "Anmeldung des Wohnsitzes",
    "anmeldungNote": "Pflicht innerhalb von 14 Tagen nach Einzug — beim zuständigen Bürgeramt.",
    "permitTitle": "Verlängerung des Aufenthaltstitels",
    "permitNote": "Stelle den Verlängerungsantrag rechtzeitig vor Ablauf bei der Ausländerbehörde.",
    "tagObligation": "Pflicht",
    "tagRight": "Recht",
    "overdue": "überfällig"
  },
  "areas": {
    "boravak": {
      "name": "Aufenthalt"
    },
    "stanovanje": {
      "name": "Wohnen"
    },
    "rad": {
      "name": "Arbeit"
    },
    "porodica": {
      "name": "Familie"
    }
  },
  "extra": {
    "boravak_work": {
      "name": "Recht auf Arbeit",
      "desc": "Ob und in welchem Umfang du arbeiten darfst, hängt von deinem Aufenthaltstitel ab — bei einem Arbeits- oder Blue-Card-Visum in der Regel uneingeschränkt, bei anderen Titeln oft mit Einschränkungen oder einer zusätzlichen Erlaubnis."
    },
    "boravak_family": {
      "name": "Familiennachzug",
      "desc": "Unter bestimmten Voraussetzungen kannst du engste Familienangehörige (Ehepartner/in, minderjährige Kinder) nachholen. Die genauen Voraussetzungen hängen von deinem Aufenthaltstitel ab."
    },
    "boravak_anmeldung": {
      "name": "Wohnsitz anmelden",
      "desc": "Nach jedem Einzug musst du dich innerhalb von 14 Tagen beim Bürgeramt anmelden — ohne diese Anmeldung sind viele weitere Schritte (Bankkonto, Aufenthaltstitel) nicht möglich.",
      "consequence": "Eine verspätete Anmeldung kann ein Bußgeld nach sich ziehen und verzögert alles, was darauf aufbaut."
    },
    "boravak_permit": {
      "name": "Aufenthaltstitel verlängern",
      "desc": "Stelle den Verlängerungsantrag bei der zuständigen Ausländerbehörde rechtzeitig vor Ablauf deines aktuellen Titels.",
      "consequence": "Ein abgelaufener Aufenthaltstitel ohne rechtzeitigen Antrag kann deinen legalen Status gefährden."
    },
    "boravak_integration": {
      "name": "Integrationskurs",
      "desc": "Je nach Aufenthaltstitel kann die Teilnahme an einem Integrationskurs (Sprache + Orientierung) verpflichtend sein.",
      "consequence": "Bei Pflichtteilnahme kann ein Fernbleiben ohne triftigen Grund Konsequenzen für deinen Aufenthaltstitel haben."
    },
    "stanovanje_kuendigung": {
      "name": "Kündigungsschutz",
      "desc": "Als Mieter/in genießt du in Deutschland einen relativ starken gesetzlichen Kündigungsschutz — eine Kündigung durch den Vermieter braucht in der Regel einen anerkannten Grund."
    },
    "stanovanje_adresa": {
      "name": "Ummeldung bei Umzug",
      "desc": "Bei jedem Wohnungswechsel musst du dich innerhalb von 14 Tagen neu anmelden und Jobcenter bzw. Ausländerbehörde über die neue Adresse informieren.",
      "consequence": "Eine nicht gemeldete Adressänderung kann laufende Leistungen verzögern."
    },
    "rad_minwage": {
      "name": "Mindestlohn",
      "desc": "In Deutschland gilt ein gesetzlicher Mindestlohn pro Arbeitsstunde, unabhängig von Branche oder Staatsangehörigkeit."
    },
    "rad_leave": {
      "name": "Bezahlter Urlaub",
      "desc": "Bei einer 5-Tage-Woche stehen dir gesetzlich mindestens 20 bezahlte Urlaubstage pro Jahr zu."
    },
    "rad_dismissal": {
      "name": "Kündigungsschutz im Job",
      "desc": "Nach 6 Monaten im selben Betrieb (bei mehr als 10 Beschäftigten) greift der gesetzliche Kündigungsschutz — eine Kündigung braucht dann einen anerkannten Grund."
    },
    "rad_mitwirkung": {
      "name": "Mitwirkungspflicht",
      "desc": "Änderungen bei Einkommen, Job oder Adresse musst du selbst und unaufgefordert dem Jobcenter melden.",
      "consequence": "Nicht gemeldete Änderungen können zu Rückforderungen oder einer Kürzung der Leistung führen."
    },
    "porodica_elterngeld": {
      "name": "Elterngeld",
      "desc": "Elterngeld unterstützt Eltern, die nach der Geburt ihr Einkommen reduzieren, um sich um das Kind zu kümmern — unabhängig vom Grundsicherungsgeld."
    },
    "porodica_birth": {
      "name": "Geburt anzeigen",
      "desc": "Die Geburt eines Kindes muss beim zuständigen Standesamt angezeigt werden, meist innerhalb einer Woche.",
      "consequence": "Ohne Geburtsanzeige gibt es keine Geburtsurkunde — die wiederum für Kindergeld und andere Anträge nötig ist."
    },
    "porodica_taxid": {
      "name": "Steuer-ID für dein Kind",
      "desc": "Jedes Kind braucht eine eigene steuerliche Identifikationsnummer — wird meist automatisch nach der Geburtsanzeige zugeteilt und ist für den Kindergeld-Antrag nötig."
    }
  },
  "glossary": [
    {
      "term": "Bescheid",
      "area": null,
      "explain": "Die offizielle schriftliche Entscheidung einer Behörde über deinen Antrag — enthält die Entscheidung und, falls du nicht einverstanden bist, die Frist für einen Widerspruch.",
      "institution": "abhängig von der Behörde, die ihn schickt"
    },
    {
      "term": "Widerspruch",
      "area": null,
      "explain": "Der offizielle Einspruch gegen einen Bescheid, meist innerhalb eines Monats nach Erhalt.",
      "institution": "die Behörde, die den Bescheid ausgestellt hat"
    },
    {
      "term": "Anmeldung",
      "area": "boravak",
      "explain": "Die Meldung deines Wohnsitzes nach dem Einzug. Frist: 14 Tage — ohne sie sind viele weitere Schritte blockiert.",
      "institution": "Bürgeramt / Einwohnermeldeamt"
    },
    {
      "term": "Aufenthaltstitel",
      "area": "boravak",
      "explain": "Das Dokument, das deinen rechtmäßigen Aufenthalt in Deutschland regelt — Typ und Gültigkeitsdauer bestimmen, was du darfst (z. B. arbeiten) und was du tun musst.",
      "institution": "Ausländerbehörde"
    },
    {
      "term": "Mitwirkungspflicht",
      "area": "rad",
      "explain": "Deine Pflicht, Änderungen (Einkommen, Job, Adresse) selbst zu melden — das System erfährt es nicht automatisch.",
      "institution": "Jobcenter (bei Grundsicherungsgeld)"
    },
    {
      "term": "Jobcenter vs. Agentur für Arbeit",
      "area": "rad",
      "explain": "Das Jobcenter ist für die Grundsicherung für Arbeitsuchende zuständig; die Agentur für Arbeit unter anderem für Arbeitslosengeld aus der Arbeitslosenversicherung. Welche Stelle zuständig ist, hängt von deiner Situation ab.",
      "institution": "abhängig von deiner Erwerbsbiografie"
    }
  ],
  "glossaryPage": {
    "title": "Erklärt",
    "intro": "Deutsche Behördenbegriffe verstehen bedeutet nicht nur, die Sprache zu können — die Begriffe bekommen ihre Bedeutung erst durch Erfahrung mit dem System. Der deutsche Begriff bleibt unverändert (so steht er auch auf deinem Brief), die Erklärung ist in deiner Sprache.",
    "groupGeneral": "Allgemein"
  },
  "months": [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ]
};
