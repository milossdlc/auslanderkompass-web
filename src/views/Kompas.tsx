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
  // Arrival dates naturally become old and must never trigger a stale-profile warning.
  // A missing permit-expiry date is actionable because without it we cannot calculate
  // residence-related personal deadlines.
  if (!expiry) return true;
  return daysUntil(parseISO(expiry)) < 0;
}

export function Kompas({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;
  const S = STRINGS[state.lang!];
  const de = state.lang === "de";
  const en = state.lang === "en";
  const sr = state.lang === "sr";
  const areas = computeAreaData(state.profile, state.lang!);
  const benefits = computeBenefits(state.profile, state.lang!);
  // One deadline engine only: Today and Deadlines must derive personal dates
  // from the same Smart Deadline source. This prevents legacy area obligations
  // from relabelling a permit-expiry date as Anmeldung or another item.
  const smartDeadlines = buildSmartDeadlines(state.profile, state.lang!);
  const nextDeadline = smartDeadlines.find((item) => daysSigned(item.date) >= -30) ?? null;
  const nextDays = nextDeadline ? daysSigned(nextDeadline.date) : null;
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
          <div className="section-title-row"><h2 className="disp">{de ? "Als Nächstes" : en ? "Next up" : S.kompas.ctaNextSteps}</h2><button onClick={() => dispatch({ type: "NAV", view: "rokovi" })}>{de ? "Alle Fristen" : S.nav.rokovi}</button></div>
          {nextDeadline ? <button className="attention-card" onClick={() => dispatch({ type: "NAV", view: "rokovi" })}>
            <div className="attention-icon"><Icon name="calendar" size={22}/></div>
            <div className="attention-copy">
              <span className="eyebrow">{nextDeadline.kind === "recommended" ? (de ? "Planungshinweis" : en ? "Planning reminder" : sr ? "Preporuka za planiranje" : S.nav.rokovi) : (de ? "Gesetzlich relevant" : en ? "Legally relevant" : sr ? "Zakonski relevantno" : S.nav.rokovi)}</span>
              <strong>{de ? (nextDays != null && nextDays >= 0 ? `Noch ${nextDays} Tage` : "Jetzt prüfen") : en ? (nextDays != null && nextDays >= 0 ? `${nextDays} days left` : "Check now") : sr ? (nextDays != null && nextDays >= 0 ? `Još ${nextDays} dana` : "Proveri sada") : fmtDate(nextDeadline.date, state.lang!)}</strong>
              <small>{nextDeadline.title} · {fmtDate(nextDeadline.date, state.lang!)}</small>
            </div><Icon name="chevron" size={18}/>
          </button> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Heute nichts Dringendes" : en ? "Nothing urgent today" : S.rokovi.empty}</strong><span>{de ? "Neue persönliche Fristen erscheinen hier automatisch, sobald sie aus deinem Profil ableitbar sind." : en ? "New personal deadlines will appear here automatically when your profile provides them." : S.kompas.noDateYet}</span></div></div>}
        </section>

        <section className="dashboard-secondary">
          <div className="section-title-row"><h2 className="disp">{de ? "Mögliche Unterstützung" : en ? "Support worth checking" : sr ? "Moguća prava i podrška" : S.kompas.yourBenefits}</h2></div>
          {relevantBenefits.length > 0 ? <div className="benefit-grid">{relevantBenefits.map((b) => <BenefitCard key={b.id} benefit={b} onOpen={(id) => dispatch({ type: "OPEN_BENEFIT", id: id as BenefitId })}/>)}</div> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Keine direkte Empfehlung" : en ? "No immediate recommendation" : S.kompas.profileSaved}</strong><span>{de ? "Du kannst Leistungen trotzdem im Wissensbereich prüfen." : en ? "You can still explore benefits in Knowledge." : S.benefit.disclaimer}</span></div></div>}
          <div className="why-note"><Icon name="book" size={16}/><span>{de ? "Orientierung zur Prüfung – keine automatische Aussage über einen Anspruch." : en ? "Guidance on what to check — not an automatic eligibility decision." : sr ? "Smernice za proveru — ne automatska odluka o tome da li imaš pravo." : S.benefit.disclaimer}</span></div>
        </section>
      </div>

      <section className="life-section"><div className="section-title-row"><h2 className="disp">{de ? "Deine Bereiche" : en ? "Your life in Germany" : S.kompas.areasHeading}</h2></div><div className="areas-grid">{areas.map((a) => <AreaCard key={a.id} area={a} lang={state.lang!} onOpen={(id) => dispatch({ type: "OPEN_AREA", id: id as AreaId })}/>)}</div></section>


    </div>
    <NavBar active="kompas" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })}/>
  </>;
}
