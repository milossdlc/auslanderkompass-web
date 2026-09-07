import type { LangStrings } from "./types";

export const en: LangStrings = {
  "name": "English",
  "dir": "ltr",
  "nav": {
    "kompas": "Compass",
    "rokovi": "Deadlines",
    "objasnjeno": "Explained"
  },
  "step": "Step {n} of {total}",
  "onboarding": {
    "boravak": {
      "title": "What is your residence status?",
      "sub": "This determines which rights and obligations apply to you — the basis for everything else.",
      "permitLabel": "Type of your residence permit",
      "options": [
        {
          "key": "work_permit",
          "label": "Work visa / Blue Card",
          "icon": "passport"
        },
        {
          "key": "family_reunification",
          "label": "Family reunification",
          "icon": "heart"
        },
        {
          "key": "asylum",
          "label": "Asylum procedure / Duldung",
          "icon": "passport"
        },
        {
          "key": "student_visa",
          "label": "Student visa",
          "icon": "book"
        }
      ],
      "arrivalLabel": "Date of your arrival/move",
      "arrivalHint": "Used to calculate your Anmeldung deadline (14 days).",
      "expiryLabel": "Expiry date of your residence permit",
      "expiryHint": "Required so we can calculate your personal deadlines and preparation reminders."
    },
    "work": {
      "title": "What is your employment status?",
      "sub": "We use this only to calculate which benefits are likely to apply to you.",
      "options": [
        {
          "key": "employed",
          "label": "Employed",
          "icon": "house"
        },
        {
          "key": "unemployed",
          "label": "Unemployed",
          "icon": "coin"
        },
        {
          "key": "student",
          "label": "Student",
          "icon": "book"
        },
        {
          "key": "parental_leave",
          "label": "Parental leave",
          "icon": "heart"
        }
      ],
      "incomeLabel": "Approximate net income per month (€) — optional, for a more accurate estimate",
      "incomePlaceholder": "e.g. 1800"
    },
    "kids": {
      "title": "Do you have children?",
      "sub": "This determines whether Kindergeld applies to you.",
      "yes": "Yes",
      "no": "No",
      "kidsCountLabel": "Number of children"
    },
    "housing": {
      "title": "How do you live?",
      "sub": "This affects the Wohngeld estimate.",
      "options": [
        {
          "key": "renting",
          "label": "I rent an apartment",
          "icon": "house"
        },
        {
          "key": "owned",
          "label": "Own apartment/house",
          "icon": "house"
        },
        {
          "key": "shared",
          "label": "Shared apartment (WG)",
          "icon": "house"
        }
      ],
      "rentLabel": "Monthly rent incl. costs (€) — optional",
      "rentPlaceholder": "e.g. 750"
    }
  },
  "next": "Next",
  "finish": "Show my Compass",
  "back": "Back",
  "skip": "Skip for now",
  "kompas": {
    "profileSaved": "Based on your answers",
    "title": "Your Compass",
    "reset": "Start over",
    "estimateLabel": "Estimate",
    "estimateText": "{good} of {total} benefits likely apply to you",
    "yourBenefits": "Your benefits",
    "proTitle": "Exact amount & what-if simulator",
    "proSub": "Available in the Pro version — coming soon",
    "startLabel": "Start",
    "continueLabel": "Continue",
    "ctaNextSteps": "View next steps",
    "homeTagline": "Find out in three short steps which social benefits in Germany likely apply to you.",
    "areasHeading": "Your life areas",
    "heroText": "Your rights and obligations, calculated from your profile — by life area.",
    "areaCounts": "{rights} rights · {obligations} obligations",
    "rightsHeading": "Your rights",
    "obligationsHeading": "Your obligations",
    "noObligations": "There are currently no obligations recorded for this area.",
    "noDateYet": "No date entered yet — add it in your profile for an exact deadline."
  },
  "benefits": {
    "burgergeld": {
      "statusGood": "Likely applies",
      "statusWarn": "Check conditions",
      "statusMuted": "Rather unlikely",
      "noteGood": "Basic support for unemployed people — also covers housing costs."
    },
    "wohngeld": {
      "linkedStatus": "Covered through Grundsicherungsgeld",
      "linkedNote": "If Grundsicherungsgeld applies, housing costs are usually covered through it — a separate Wohngeld application usually isn't needed.",
      "warnStatus": "Check amount",
      "warnNoteRatio": "Your rent is {pct}% of your income — above the usual threshold for a Wohngeld review.",
      "mutedStatus": "Rather unlikely",
      "mutedNoteRatio": "The rent ({pct}% of income) is below the usual threshold.",
      "warnNoteMissing": "Enter your income and rent in your profile for a more accurate estimate."
    },
    "kindergeld": {
      "status": "Likely applies",
      "noteForms": [
        "{n} child registered",
        "{n} children registered"
      ],
      "noneStatus": "Doesn't apply",
      "noneNote": "No children specified."
    }
  },
  "benefitInfo": {
    "burgergeld": "Grundsicherungsgeld is Germany's basic social support for unemployed people or those with insufficient income, including support for housing costs.",
    "wohngeld": "Wohngeld is a state subsidy for housing costs for lower-income households that don't receive Grundsicherungsgeld.",
    "kindergeld": "Kindergeld is a monthly state benefit for parents for each registered child, regardless of income."
  },
  "benefit": {
    "disclaimer": "This is general information, not legal advice.",
    "crosslink": "Also see {name}",
    "nextSteps": "Next steps",
    "docsTitle": "What you usually need",
    "markApplied": "Mark as applied",
    "appliedOn": "Applied on: {date}",
    "unmark": "Undo",
    "openLink": "Open official page"
  },
  "benefitApply": {
    "burgergeld": "The application is submitted online or in person at the responsible Jobcenter.",
    "wohngeld": "The application is submitted at the responsible Wohngeldstelle, usually part of the city or municipal administration.",
    "kindergeld": "The application is submitted at the responsible Familienkasse, usually part of the Agentur für Arbeit."
  },
  "benefitDocs": {
    "burgergeld": [
      "ID card or residence permit",
      "Proof of unemployment or insufficient income",
      "Bank account number (IBAN)"
    ],
    "wohngeld": [
      "ID card or residence permit",
      "Rental agreement with rent amount",
      "Proof of income for all household members"
    ],
    "kindergeld": [
      "ID card or residence permit",
      "Child's birth certificate",
      "Tax ID of child and parent"
    ]
  },
  "rokovi": {
    "title": "Deadlines",
    "fromApplied": "based on your application date",
    "empty": "Based on your profile, there are currently no suggested deadlines.",
    "disclaimer": "These dates are approximate, calculated from a general rule — they don't replace the date in your actual official decision (Bescheid).",
    "approx": "approx. ",
    "pill": "in {d} d.",
    "bgTitle": "Grundsicherungsgeld — estimated approval renewal",
    "bgNote": "Usually 6–12 months — the exact date is in your Bescheid.",
    "wgTitle": "Wohngeld — estimated annual renewal",
    "wgNote": "Wohngeld applications are usually renewed once a year.",
    "needProfileTitle": "First complete your Compass",
    "needProfileText": "To calculate your deadlines, we first need your profile — it only takes a few steps.",
    "anmeldungTitle": "Registration of residence (Anmeldung)",
    "anmeldungNote": "Mandatory within 14 days of moving in — at the responsible Bürgeramt.",
    "permitTitle": "Renewal of residence permit",
    "permitNote": "Submit the renewal application in time before your current permit expires, at the Ausländerbehörde.",
    "tagObligation": "Obligation",
    "tagRight": "Right",
    "overdue": "overdue"
  },
  "areas": {
    "boravak": {
      "name": "Residence"
    },
    "stanovanje": {
      "name": "Housing"
    },
    "rad": {
      "name": "Work"
    },
    "porodica": {
      "name": "Family"
    }
  },
  "extra": {
    "boravak_work": {
      "name": "Right to work",
      "desc": "Whether and to what extent you're allowed to work depends on the type of your residence permit — usually unrestricted with a work visa or Blue Card, often with restrictions or an additional permit for other permit types."
    },
    "boravak_family": {
      "name": "Family reunification",
      "desc": "Under certain conditions you can bring your closest family members (spouse, minor children). The exact conditions depend on the type of your permit."
    },
    "boravak_anmeldung": {
      "name": "Register your residence",
      "desc": "After every move you must register at the Bürgeramt within 14 days — without this, many further steps (bank account, residence permit) aren't possible.",
      "consequence": "A late registration can result in a fine and delays everything that depends on it."
    },
    "boravak_permit": {
      "name": "Renew your residence permit",
      "desc": "Submit the renewal application at the responsible Ausländerbehörde in time, before your current permit expires.",
      "consequence": "An expired residence permit without a timely application can endanger your legal status."
    },
    "boravak_integration": {
      "name": "Integration course",
      "desc": "Depending on the type of residence permit, participation in an integration course (language + orientation) may be mandatory.",
      "consequence": "If participation is mandatory, absence without a valid reason can have consequences for your residence permit."
    },
    "stanovanje_kuendigung": {
      "name": "Protection against eviction",
      "desc": "As a tenant in Germany you enjoy relatively strong legal protection against termination — termination by the landlord usually requires a recognized reason."
    },
    "stanovanje_adresa": {
      "name": "Registering an address change",
      "desc": "With every change of residence you must re-register within 14 days and inform the Jobcenter or Ausländerbehörde of the new address.",
      "consequence": "An unreported address change can delay ongoing benefits."
    },
    "rad_minwage": {
      "name": "Minimum wage",
      "desc": "Germany has a statutory minimum wage per hour of work, regardless of industry or nationality."
    },
    "rad_leave": {
      "name": "Paid leave",
      "desc": "With a 5-day work week, you're legally entitled to at least 20 paid vacation days per year."
    },
    "rad_dismissal": {
      "name": "Protection against dismissal at work",
      "desc": "After 6 months at the same company (with more than 10 employees), statutory protection against dismissal applies — dismissal then requires a recognized reason."
    },
    "rad_mitwirkung": {
      "name": "Duty to cooperate (Mitwirkungspflicht)",
      "desc": "You must report changes in income, job, or address to the Jobcenter yourself, without being reminded.",
      "consequence": "Unreported changes can lead to repayment demands or a reduction in benefits."
    },
    "porodica_elterngeld": {
      "name": "Elterngeld",
      "desc": "Elterngeld supports parents who reduce their income after the birth to take care of the child — independent of Grundsicherungsgeld."
    },
    "porodica_birth": {
      "name": "Report the birth",
      "desc": "The birth of a child must be reported to the responsible registry office (Standesamt), usually within a week.",
      "consequence": "Without a birth report, no birth certificate is issued — which is required for Kindergeld and other applications."
    },
    "porodica_taxid": {
      "name": "Tax ID for your child",
      "desc": "Every child needs their own tax identification number — usually assigned automatically after the birth report and required for the Kindergeld application."
    }
  },
  "glossary": [
    {
      "term": "Bescheid",
      "area": null,
      "explain": "The official written decision of an authority on your application — contains the decision and, if you disagree, the deadline for an appeal (Widerspruch).",
      "institution": "depends on the authority that sent it"
    },
    {
      "term": "Widerspruch",
      "area": null,
      "explain": "The official appeal against a Bescheid, usually within one month of receipt.",
      "institution": "the authority that issued the Bescheid"
    },
    {
      "term": "Anmeldung",
      "area": "boravak",
      "explain": "Registering your residence after moving in. Deadline: 14 days — without it, many further steps are blocked.",
      "institution": "Bürgeramt / Einwohnermeldeamt"
    },
    {
      "term": "Aufenthaltstitel",
      "area": "boravak",
      "explain": "The document that regulates your legal residence in Germany — type and validity period determine what you're allowed to do (e.g. work) and what you must do.",
      "institution": "Ausländerbehörde"
    },
    {
      "term": "Mitwirkungspflicht",
      "area": "rad",
      "explain": "Your obligation to report changes (income, job, address) yourself — the system doesn't find out automatically.",
      "institution": "Jobcenter (for Grundsicherungsgeld)"
    },
    {
      "term": "Jobcenter vs. Agentur für Arbeit",
      "area": "rad",
      "explain": "The Jobcenter is responsible for Grundsicherungsgeld recipients; the Agentur für Arbeit for unemployment insurance, if you previously worked and paid contributions. You usually only deal with one of the two.",
      "institution": "depends on your employment history"
    }
  ],
  "glossaryPage": {
    "title": "Explained",
    "intro": "Understanding German bureaucratic terms isn't just a matter of language — the terms only gain their meaning through experience with the system. The German term stays unchanged (that's how it appears on your letter too), the explanation is in your language.",
    "groupGeneral": "General"
  },
  "months": [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
};
