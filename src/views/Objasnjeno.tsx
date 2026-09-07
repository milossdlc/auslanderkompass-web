import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import { AREA_ORDER } from "../lib/areaItems";
import type { AppState, AreaId, Lang } from "../types";
import type { Action } from "../state/store";

type Situation = { title: string; text: string; icon: string; areaItemId: string };

function situationCopy(lang: Lang): { eyebrow: string; title: string; intro: string; glossary: string; situations: Situation[] } {
  if (lang === "de") return {
    eyebrow: "Praktischer Wegweiser",
    title: "Was möchtest du erledigen?",
    intro: "Starte mit deiner Situation. Ausländerleben führt dich dann zum passenden Thema und den nächsten Schritten.",
    glossary: "Begriffe einfach erklärt",
    situations: [
      { title: "Mein Aufenthaltstitel läuft ab", text: "Verlängerung vorbereiten und wichtige Termine im Blick behalten.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "Ich ziehe um", text: "Anmeldung, Adresse und die wichtigsten Stellen nach dem Umzug.", icon: "home", areaItemId: "boravak_anmeldung" },
      { title: "Ich wechsle meinen Job", text: "Prüfe, was dein Aufenthaltstitel bei einem Arbeitgeberwechsel erlaubt.", icon: "briefcase", areaItemId: "rad_contract" },
      { title: "Ich habe meinen Job verloren", text: "Die ersten Schritte bei Arbeitslosigkeit und welche Stellen wichtig sind.", icon: "minus", areaItemId: "rad_unemployed" },
      { title: "Ich möchte dauerhaft bleiben", text: "Orientierung zur Niederlassungserlaubnis und zu typischen Voraussetzungen.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "Wir bekommen ein Kind", text: "Kindergeld, Behörden und wichtige organisatorische Schritte.", icon: "heart", areaItemId: "porodica_kindergeld" },
    ],
  };
  if (lang === "sr") return {
    eyebrow: "Praktični vodič",
    title: "Šta želiš da uradiš?",
    intro: "Počni od svoje situacije. Ausländerleben te vodi do relevantne teme i sledećih koraka.",
    glossary: "Nemački pojmovi jednostavno objašnjeni",
    situations: [
      { title: "Ističe mi boravišna dozvola", text: "Pripremi produženje i drži važne datume pod kontrolom.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "Selim se", text: "Anmeldung, promena adrese i najvažnije institucije nakon selidbe.", icon: "home", areaItemId: "boravak_anmeldung" },
      { title: "Menjam posao", text: "Proveri šta tvoja boravišna dozvola znači za promenu poslodavca.", icon: "briefcase", areaItemId: "rad_contract" },
      { title: "Izgubio/la sam posao", text: "Prvi koraci kod nezaposlenosti i koje institucije su važne.", icon: "minus", areaItemId: "rad_unemployed" },
      { title: "Želim trajno da ostanem", text: "Orijentacija za Niederlassungserlaubnis i tipične uslove.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "Dobijamo dete", text: "Kindergeld, institucije i važni organizacioni koraci.", icon: "heart", areaItemId: "porodica_kindergeld" },
    ],
  };
  return {
    eyebrow: "Practical guide",
    title: "What do you want to do?",
    intro: "Start with your situation. Ausländerleben takes you to the relevant topic and next steps.",
    glossary: "German terms, simply explained",
    situations: [
      { title: "My residence permit is expiring", text: "Prepare for renewal and keep the important dates in view.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "I'm moving", text: "Registration, address changes and the key offices after a move.", icon: "home", areaItemId: "boravak_anmeldung" },
      { title: "I'm changing jobs", text: "Check what your residence title means for changing employers.", icon: "briefcase", areaItemId: "rad_contract" },
      { title: "I lost my job", text: "First steps after unemployment and which offices matter.", icon: "minus", areaItemId: "rad_unemployed" },
      { title: "I want to stay permanently", text: "Orientation on permanent residence and common requirements.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "We're having a child", text: "Kindergeld, authorities and important organisational steps.", icon: "heart", areaItemId: "porodica_kindergeld" },
    ],
  };
}

export function Objasnjeno({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const C = situationCopy(state.lang!);
  const groups: (AreaId | null)[] = [null, ...AREA_ORDER];

  return (
    <>
      <div className="screen knowledge-screen">
        <header className="knowledge-heading">
          <div className="eyebrow">{C.eyebrow}</div>
          <h1 className="disp">{C.title}</h1>
          <p>{C.intro}</p>
        </header>

        <div className="situation-grid">
          {C.situations.map((item) => (
            <button key={item.title} className="situation-card" onClick={() => dispatch({ type: "OPEN_AREA_ITEM", id: item.areaItemId })}>
              <span className="situation-icon"><Icon name={item.icon as any} size={20} /></span>
              <span className="situation-copy"><strong>{item.title}</strong><small>{item.text}</small></span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </div>

        <section className="glossary-section">
          <div className="knowledge-subheading"><div className="eyebrow">{C.glossary}</div><p>{S.glossaryPage.intro}</p></div>
          {groups.map((areaId) => {
            const terms = S.glossary.filter((g) => g.area === areaId);
            if (!terms.length) return null;
            const label = areaId ? S.areas[areaId].name : S.glossaryPage.groupGeneral;
            return (
              <div key={areaId ?? "general"} className="glossary-group">
                <div className="mono glossary-group-title">{label}</div>
                <div className="glossary-grid">
                  {terms.map((g) => (
                    <div key={g.term} className="card glossary-card">
                      <div className="mono glossary-term">{g.term}</div>
                      <div className="glossary-explain">{g.explain}</div>
                      <div className="glossary-institution"><Icon name="building" size={13} /><span>{g.institution}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <NavBar active="objasnjeno" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
