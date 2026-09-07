import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { AreaCard } from "../components/AreaCard";
import { BenefitCard } from "../components/BenefitCard";
import { STRINGS } from "../i18n";
import { computeAreaData, nearestObligation } from "../lib/areas";
import { computeBenefits } from "../lib/benefits";
import { daysUntil, fmtDate, parseISO } from "../lib/dates";
import type { AppState, AreaId, BenefitId } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";

function isStaleProfile(state: AppState) {
  if (!state.profile) return false;
  const dates = [state.profile.boravak.arrivalDate, state.profile.boravak.permitExpiryDate].filter(Boolean) as string[];
  if (!dates.length) return false;
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - 120);
  return dates.some((d) => parseISO(d) < cutoff);
}

export function Kompas({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;
  const S = STRINGS[state.lang!];
  const de = state.lang === "de";
  const en = state.lang === "en";
  const areas = computeAreaData(state.profile, state.lang!);
  const benefits = computeBenefits(state.profile, state.lang!);
  const urgent = nearestObligation(areas);
  const urgentDays = urgent ? daysUntil(urgent.deadline) : null;
  const relevantBenefits = benefits.filter((b) => b.tone === "warn").slice(0, 2);
  const stale = isStaleProfile(state);

  return <>
    <div className="screen dashboard-screen">
      <div className="page-heading dashboard-heading">
        <div>
          <div className="eyebrow">Ausländerleben</div>
          <h1 className="disp">{de ? "Heute" : en ? "Today" : S.kompas.title}</h1>
          <p>{de ? "Das ist jetzt für dich wichtig – basierend auf deinem Profil." : en ? "What matters now, based on your profile." : S.kompas.heroText}</p>
        </div>
        <button className="avatar-button" aria-label="Profile" onClick={() => dispatch({ type: "NAV", view: "profile" })}><Icon name="passport" size={20}/></button>
      </div>

      {stale && <button className="stale-profile-card" onClick={() => dispatch({ type: "NAV", view: "profile" })}>
        <div className="stale-icon"><Icon name="passport" size={20}/></div>
        <div><strong>{de ? "Profil kurz aktualisieren" : en ? "Quick profile check" : S.kompas.profileSaved}</strong><span>{de ? "Einige gespeicherte Datumsangaben sind älter. Prüfe sie, damit Empfehlungen aktuell bleiben." : en ? "Some saved dates are old. Review them to keep recommendations current." : S.kompas.noDateYet}</span></div>
        <Icon name="chevron" size={18}/>
      </button>}

      <div className="dashboard-columns">
        <section className="dashboard-primary">
          <div className="section-title-row"><h2 className="disp">{de ? "Als Nächstes" : en ? "Next up" : S.kompas.ctaNextSteps}</h2><button onClick={() => dispatch({ type: "NAV", view: "rokovi" })}>{de ? "Alle Fristen" : S.nav.rokovi}</button></div>
          {urgent ? <button className="attention-card" onClick={() => dispatch({ type: "OPEN_AREA", id: urgent.areaId as AreaId })}>
            <div className="attention-icon"><Icon name="calendar" size={22}/></div>
            <div className="attention-copy">
              <span className="eyebrow">{urgentDays != null && urgentDays < 0 ? (de ? "Überfällig" : S.rokovi.overdue) : (de ? "Persönliche Frist" : en ? "Personal deadline" : S.nav.rokovi)}</span>
              <strong>{de ? (urgentDays != null && urgentDays >= 0 ? `Noch ${urgentDays} Tage` : "Jetzt prüfen") : en ? (urgentDays != null && urgentDays >= 0 ? `${urgentDays} days left` : "Check now") : fmtDate(urgent.deadline, state.lang!)}</strong>
              <small>{fmtDate(urgent.deadline, state.lang!)}</small>
            </div><Icon name="chevron" size={18}/>
          </button> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Heute nichts Dringendes" : en ? "Nothing urgent today" : S.rokovi.empty}</strong><span>{de ? "Neue persönliche Fristen erscheinen hier automatisch, sobald sie aus deinem Profil ableitbar sind." : en ? "New personal deadlines will appear here automatically when your profile provides them." : S.kompas.noDateYet}</span></div></div>}
        </section>

        <section className="dashboard-secondary">
          <div className="section-title-row"><h2 className="disp">{de ? "Mögliche Leistungen" : en ? "Benefits to check" : S.kompas.yourBenefits}</h2></div>
          {relevantBenefits.length > 0 ? <div className="benefit-grid">{relevantBenefits.map((b) => <BenefitCard key={b.id} benefit={b} onOpen={(id) => dispatch({ type: "OPEN_BENEFIT", id: id as BenefitId })}/>)}</div> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Keine direkte Empfehlung" : en ? "No immediate recommendation" : S.kompas.profileSaved}</strong><span>{de ? "Du kannst Leistungen trotzdem im Wissensbereich prüfen." : en ? "You can still explore benefits in Knowledge." : S.benefit.disclaimer}</span></div></div>}
          <div className="why-note"><Icon name="book" size={16}/><span>{de ? "Hinweise zur Prüfung, keine automatische Anspruchsentscheidung." : en ? "Suggestions to check, not an automatic eligibility decision." : S.benefit.disclaimer}</span></div>
        </section>
      </div>

      <section className="life-section"><div className="section-title-row"><h2 className="disp">{de ? "Deine Bereiche" : en ? "Your life in Germany" : S.kompas.areasHeading}</h2></div><div className="areas-grid">{areas.map((a) => <AreaCard key={a.id} area={a} lang={state.lang!} onOpen={(id) => dispatch({ type: "OPEN_AREA", id: id as AreaId })}/>)}</div></section>

      <button className="profile-strip" onClick={() => dispatch({ type: "NAV", view: "profile" })}><div><span>{de ? "Profil & Personalisierung" : en ? "Profile & personalization" : S.kompas.profileSaved}</span><strong>{[state.profile.city, state.profile.bundesland].filter(Boolean).join(", ") || (de ? "Angaben ansehen und ergänzen" : en ? "Review and complete your details" : S.kompas.profileSaved)}</strong></div><Icon name="chevron" size={18}/></button>
    </div>
    <NavBar active="kompas" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })}/>
  </>;
}
