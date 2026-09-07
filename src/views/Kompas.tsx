import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { AreaCard } from "../components/AreaCard";
import { BenefitCard } from "../components/BenefitCard";
import { STRINGS } from "../i18n";
import { computeAreaData } from "../lib/areas";
import { computeBenefits } from "../lib/benefits";
import { daysUntil, fmtDate, parseISO } from "../lib/dates";
import { buildSmartDeadlines, daysSigned } from "../lib/deadlines";
import type { AppState, AreaId, BenefitId } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";

function isStaleProfile(state: AppState) {
  if (!state.profile) return false;
  const expiry = state.profile.boravak.permitExpiryDate;
  if (!expiry) return true;
  return daysUntil(parseISO(expiry)) < 0;
}

function deadlineLabel(kind: string, lang: AppState["lang"]) {
  if (kind === "recommended") {
    if (lang === "de") return "Planungshinweis";
    if (lang === "sr") return "Preporuka za planiranje";
    return "Planning reminder";
  }
  if (lang === "de") return "Gesetzlich relevant";
  if (lang === "sr") return "Zakonski relevantno";
  return "Legally relevant";
}

export function Kompas({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;
  const S = STRINGS[state.lang!];
  const de = state.lang === "de";
  const en = state.lang === "en";
  const sr = state.lang === "sr";
  const areas = computeAreaData(state.profile, state.lang!);
  const benefits = computeBenefits(state.profile, state.lang!);
  const smartDeadlines = buildSmartDeadlines(state.profile, state.lang!);
  const upcomingDeadlines = smartDeadlines.filter((item) => daysSigned(item.date) >= -30).slice(0, 3);
  const relevantBenefits = benefits.filter((b) => b.tone === "warn").slice(0, 2);
  const stale = isStaleProfile(state);

  return <>
    <div className="screen dashboard-screen">
      <div className="page-heading dashboard-heading">
        <div>
          <div className="eyebrow">Ausländerleben</div>
          <h1 className="disp">{de ? "Heute" : en ? "Today" : sr ? "Danas" : S.kompas.title}</h1>
          <p>{de ? "Das ist jetzt für dich wichtig – basierend auf deinem Profil." : en ? "What matters now, based on your profile." : sr ? "Ono što je sada važno za tebe, na osnovu tvog profila." : S.kompas.heroText}</p>
        </div>
        <button className="avatar-button" aria-label="Profile" onClick={() => dispatch({ type: "NAV", view: "profile" })}><Icon name="passport" size={20}/></button>
      </div>

      {stale && <button className="stale-profile-card" onClick={() => dispatch({ type: "NAV", view: "profile" })}>
        <div className="stale-icon"><Icon name="passport" size={20}/></div>
        <div><strong>{de ? "Profil vervollständigen" : en ? "Complete your profile" : sr ? "Dopuni profil" : S.kompas.profileSaved}</strong><span>{de ? "Ergänze oder prüfe wichtige Datumsangaben, damit persönliche Fristen aktuell bleiben." : en ? "Add or review important dates so personal deadlines stay current." : sr ? "Dodaj ili proveri važne datume kako bi lični rokovi ostali ažurni." : S.kompas.noDateYet}</span></div>
        <Icon name="chevron" size={18}/>
      </button>}

      <div className="dashboard-columns">
        <section className="dashboard-primary">
          <div className="section-title-row"><h2 className="disp">{de ? "Deine nächsten Schritte" : en ? "Your next steps" : sr ? "Tvoji sledeći koraci" : S.kompas.ctaNextSteps}</h2><button onClick={() => dispatch({ type: "NAV", view: "rokovi" })}>{de ? "Alle Fristen" : en ? "All deadlines" : sr ? "Svi rokovi" : S.nav.rokovi}</button></div>
          {upcomingDeadlines.length > 0 ? <div className="next-step-list">
            {upcomingDeadlines.map((item) => {
              const days = daysSigned(item.date);
              return <button className="attention-card" key={item.id} onClick={() => dispatch({ type: "NAV", view: "rokovi" })}>
                <div className="attention-icon"><Icon name="calendar" size={22}/></div>
                <div className="attention-copy">
                  <span className="eyebrow">{deadlineLabel(item.kind, state.lang!)}</span>
                  <strong>{days < 0 ? (de ? "Überfällig" : en ? "Overdue" : sr ? "Rok je prošao" : "Overdue") : days === 0 ? (de ? "Heute" : en ? "Today" : sr ? "Danas" : "Today") : de ? `Noch ${days} Tage` : en ? `${days} days left` : sr ? `Još ${days} dana` : fmtDate(item.date, state.lang!)}</strong>
                  <small>{item.title} · {fmtDate(item.date, state.lang!)}</small>
                </div><Icon name="chevron" size={18}/>
              </button>;
            })}
          </div> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Heute nichts Dringendes" : en ? "Nothing urgent today" : sr ? "Danas ništa hitno" : S.rokovi.empty}</strong><span>{de ? "Neue persönliche Fristen erscheinen hier automatisch, sobald sie aus deinem Profil ableitbar sind." : en ? "New personal deadlines will appear here automatically when your profile provides them." : sr ? "Novi lični rokovi pojaviće se automatski kada ih tvoj profil omogući." : S.kompas.noDateYet}</span></div></div>}

          <button className="guide-entry-card" onClick={() => dispatch({ type: "NAV", view: "objasnjeno" })}>
            <div className="guide-entry-icon"><Icon name="book" size={20}/></div>
            <div><span className="eyebrow">{de ? "Praktischer Wegweiser" : en ? "Practical guide" : sr ? "Praktični vodič" : "Guide"}</span><strong>{de ? "Was möchtest du erledigen?" : en ? "What do you want to do?" : sr ? "Šta želiš da uradiš?" : "What do you want to do?"}</strong><small>{de ? "Starte mit deiner Situation und arbeite dich Schritt für Schritt vor." : en ? "Start with your situation and work through the next steps." : sr ? "Počni od svoje situacije i idi korak po korak." : "Start with your situation and follow the next steps."}</small></div><Icon name="chevron" size={18}/>
          </button>
        </section>

        <section className="dashboard-secondary">
          <div className="section-title-row"><h2 className="disp">{de ? "Mögliche Unterstützung" : en ? "Support worth checking" : sr ? "Moguća prava i podrška" : S.kompas.yourBenefits}</h2></div>
          {relevantBenefits.length > 0 ? <div className="benefit-grid">{relevantBenefits.map((b) => <BenefitCard key={b.id} benefit={b} onOpen={(id) => dispatch({ type: "OPEN_BENEFIT", id: id as BenefitId })}/>)}</div> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Keine direkte Empfehlung" : en ? "No immediate recommendation" : sr ? "Nema direktne preporuke" : S.kompas.profileSaved}</strong><span>{de ? "Du kannst Leistungen trotzdem im Wissensbereich prüfen." : en ? "You can still explore benefits in Knowledge." : sr ? "Prava i podršku možeš i dalje proveriti u Vodiču." : S.benefit.disclaimer}</span></div></div>}
          <div className="why-note"><Icon name="book" size={16}/><span>{de ? "Orientierung zur Prüfung – keine automatische Aussage über einen Anspruch." : en ? "Guidance on what to check — not an automatic eligibility decision." : sr ? "Smernice za proveru — ne automatska odluka o tome da li imaš pravo." : S.benefit.disclaimer}</span></div>
        </section>
      </div>

      <section className="life-section"><div className="section-title-row"><h2 className="disp">{de ? "Deine Bereiche" : en ? "Your life in Germany" : sr ? "Tvoj život u Nemačkoj" : S.kompas.areasHeading}</h2></div><div className="areas-grid">{areas.map((a) => <AreaCard key={a.id} area={a} lang={state.lang!} onOpen={(id) => dispatch({ type: "OPEN_AREA", id: id as AreaId })}/>)}</div></section>
    </div>
    <NavBar active="kompas" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })}/>
  </>;
}
