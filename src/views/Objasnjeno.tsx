import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { STRINGS } from "../i18n";
import { AREA_ORDER } from "../lib/areaItems";
import type { AppState, AreaId, Lang } from "../types";
import type { Action } from "../state/store";
import "../styles/knowledgePolish.css";

type Situation = { title: string; text: string; icon: string; areaItemId: string };

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  hint: string;
  popular: string;
  popularIntro: string;
  all: string;
  allIntro: string;
  glossary: string;
  open: string;
  situations: Situation[];
};

function situationCopy(lang: Lang): Copy {
  if (lang === "de") return {
    eyebrow: "Praktischer Wegweiser",
    title: "Was hat sich in deinem Leben verändert?",
    intro: "Wähle deine Situation und finde die wichtigsten nächsten Schritte, Fristen und zuständigen Stellen.",
    hint: "Du musst keine deutschen Behördenbegriffe kennen.",
    popular: "Häufige Situationen",
    popularIntro: "Starte hier, wenn du schnell wissen möchtest, was als Nächstes zu tun ist.",
    all: "Weitere Situationen",
    allIntro: "Weitere Themen, die dir im Alltag in Deutschland helfen können.",
    glossary: "Begriffe einfach erklärt",
    open: "Leitfaden öffnen",
    situations: [
      { title: "Mein Aufenthaltstitel läuft ab", text: "Verlängerung vorbereiten und wichtige Termine im Blick behalten.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "Ich ziehe um", text: "Anmeldung, Adresse und die wichtigsten Stellen nach dem Umzug.", icon: "home", areaItemId: "boravak_anmeldung" },
      { title: "Ich wechsle meinen Job", text: "Prüfe, was dein Aufenthaltstitel bei einem Arbeitgeberwechsel erlaubt.", icon: "briefcase", areaItemId: "guide_job_change" },
      { title: "Ich habe meinen Job verloren", text: "Meldungen, Aufenthalt und die nächsten wichtigen Schritte.", icon: "minus", areaItemId: "guide_job_loss" },
      { title: "Ich möchte dauerhaft bleiben", text: "Niederlassungserlaubnis: Wege und typische Voraussetzungen.", icon: "passport", areaItemId: "guide_permanent" },
      { title: "Wir bekommen ein Kind", text: "Kindergeld, Behörden und wichtige organisatorische Schritte.", icon: "heart", areaItemId: "porodica_birth" },
    ],
  };

  if (lang === "sr") return {
    eyebrow: "Praktični vodič",
    title: "Šta se promenilo u tvom životu?",
    intro: "Izaberi situaciju i pronađi jasne sledeće korake, važne rokove i institucije kojima treba da se obratiš.",
    hint: "Ne moraš da znaš nemačke administrativne pojmove.",
    popular: "Najčešće situacije",
    popularIntro: "Počni ovde ako želiš brzo da saznaš šta je sledeći korak.",
    all: "Još situacija",
    allIntro: "Druge teme koje ti mogu pomoći u svakodnevnom životu u Nemačkoj.",
    glossary: "Nemački pojmovi jednostavno objašnjeni",
    open: "Otvori vodič",
    situations: [
      { title: "Ističe mi boravišna dozvola", text: "Pripremi produženje i drži važne datume pod kontrolom.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "Selim se", text: "Anmeldung, promena adrese i najvažnije institucije nakon selidbe.", icon: "home", areaItemId: "boravak_anmeldung" },
      { title: "Menjam posao", text: "Proveri šta tvoja boravišna dozvola znači za promenu poslodavca.", icon: "briefcase", areaItemId: "guide_job_change" },
      { title: "Izgubio/la sam posao", text: "Prijave, boravak i prvi sledeći koraci.", icon: "minus", areaItemId: "guide_job_loss" },
      { title: "Želim trajno da ostanem", text: "Niederlassungserlaubnis: putevi i tipični uslovi.", icon: "passport", areaItemId: "guide_permanent" },
      { title: "Dobijamo dete", text: "Kindergeld, institucije i važni organizacioni koraci.", icon: "heart", areaItemId: "porodica_birth" },
    ],
  };

  return {
    eyebrow: "Practical guide",
    title: "What changed in your life?",
    intro: "Choose your situation to find the clearest next steps, important deadlines and relevant offices.",
    hint: "You do not need to know German bureaucracy terms.",
    popular: "Common situations",
    popularIntro: "Start here if you want to quickly understand what to do next.",
    all: "More situations",
    allIntro: "Other topics that can help with everyday life in Germany.",
    glossary: "German terms, simply explained",
    open: "Open guide",
    situations: [
      { title: "My residence permit is expiring", text: "Prepare for renewal and keep important dates in view.", icon: "passport", areaItemId: "boravak_permit" },
      { title: "I'm moving", text: "Registration, address changes and key offices after a move.", icon: "home", areaItemId: "boravak_anmeldung" },
      { title: "I'm changing jobs", text: "Check what your residence title means for changing employers.", icon: "briefcase", areaItemId: "guide_job_change" },
      { title: "I lost my job", text: "Registrations, residence status and the next important steps.", icon: "minus", areaItemId: "guide_job_loss" },
      { title: "I want to stay permanently", text: "Permanent residence: routes and common requirements.", icon: "passport", areaItemId: "guide_permanent" },
      { title: "We're having a child", text: "Kindergeld, authorities and important organisational steps.", icon: "heart", areaItemId: "porodica_birth" },
    ],
  };
}

export function Objasnjeno({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const C = situationCopy(state.lang!);
  const groups: (AreaId | null)[] = [null, ...AREA_ORDER];
  const renderSituation = (item: Situation) => (
    <button type="button" key={item.title} className="situation-card" onClick={() => dispatch({ type: "OPEN_AREA_ITEM", id: item.areaItemId })}>
      <span className="situation-icon"><Icon name={item.icon as any} size={30} /></span>
      <span className="situation-copy">
        <strong>{item.title}</strong>
        <small>{item.text}</small>
        <span className="situation-action">{C.open}<Icon name="chevron" size={16} /></span>
      </span>
    </button>
  );

  return (
    <div className="screen knowledge-screen">
      <header className="knowledge-heading">
        <div className="eyebrow">{C.eyebrow}</div>
        <h1 className="disp">{C.title}</h1>
        <p>{C.intro}</p>
        <div className="knowledge-start"><Icon name="compass" size={20} /><span>{C.hint}</span></div>
      </header>

      <section className="knowledge-section knowledge-popular">
        <div className="knowledge-section-heading">
          <div><div className="eyebrow">{C.popular}</div><h2>{C.popular}</h2></div>
          <p>{C.popularIntro}</p>
        </div>
        <div className="situation-grid situation-grid-popular">{C.situations.slice(0, 3).map(renderSituation)}</div>
      </section>

      <section className="knowledge-section knowledge-more">
        <div className="knowledge-section-heading">
          <div><div className="eyebrow">{C.all}</div><h2>{C.all}</h2></div>
          <p>{C.allIntro}</p>
        </div>
        <div className="situation-grid situation-grid-secondary">{C.situations.slice(3).map(renderSituation)}</div>
      </section>

      <section className="glossary-section">
        <div className="knowledge-subheading"><div className="eyebrow">{C.glossary}</div><p>{S.glossaryPage.intro}</p></div>
        {groups.map(areaId => {
          const terms = S.glossary.filter(g => g.area === areaId);
          if (!terms.length) return null;
          const label = areaId ? S.areas[areaId].name : S.glossaryPage.groupGeneral;
          return <div key={areaId ?? "general"} className="glossary-group"><div className="mono glossary-group-title">{label}</div><div className="glossary-grid">{terms.map(g => <div key={g.term} className="card glossary-card"><div className="mono glossary-term">{g.term}</div><div className="glossary-explain">{g.explain}</div><div className="glossary-institution"><Icon name="building" size={16} /><span>{g.institution}</span></div></div>)}</div></div>;
        })}
      </section>
    </div>
  );
}
