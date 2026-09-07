import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { AreaCard } from "../components/AreaCard";
import { BenefitCard } from "../components/BenefitCard";
import { STRINGS } from "../i18n";
import { computeAreaData, nearestObligation } from "../lib/areas";
import { computeBenefits } from "../lib/benefits";
import { daysUntil, fmtDate } from "../lib/dates";
import type { AppState, AreaId, BenefitId } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";

export function Kompas({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;
  const S = STRINGS[state.lang!];
  const de = state.lang === "de";
  const areas = computeAreaData(state.profile, state.lang!);
  const benefits = computeBenefits(state.profile, state.lang!);
  const urgent = nearestObligation(areas);
  const urgentDays = urgent ? daysUntil(urgent.deadline) : null;
  const relevantBenefits = benefits.filter(b => b.tone === "warn").slice(0, 2);

  return <>
    <div className="screen dashboard-screen">
      <div className="page-heading">
        <div><div className="eyebrow">{de ? "Dein persönlicher Kompass" : S.kompas.profileSaved}</div><h1 className="disp">{de ? "Hallo 👋" : S.kompas.title}</h1><p>{de ? "Das ist jetzt für dich wichtig." : S.kompas.heroText}</p></div>
        <button className="avatar-button" aria-label="Profile" onClick={()=>dispatch({type:"NAV",view:"profile"})}><Icon name="passport" size={20}/></button>
      </div>

      <section>
        <div className="section-title-row"><h2 className="disp">{de ? "Jetzt wichtig" : S.kompas.ctaNextSteps}</h2><button onClick={()=>dispatch({type:"NAV",view:"rokovi"})}>{de ? "Alle Fristen" : S.nav.rokovi}</button></div>
        {urgent ? <button className="attention-card" onClick={()=>dispatch({type:"OPEN_AREA",id:urgent.areaId as AreaId})}>
          <div className="attention-icon"><Icon name="calendar" size={22}/></div><div className="attention-copy"><span className="eyebrow">{urgentDays != null && urgentDays < 0 ? (de ? "Überfällig" : S.rokovi.overdue) : (de ? "Frist" : S.nav.rokovi)}</span><strong>{de ? (urgentDays != null && urgentDays >= 0 ? `Noch ${urgentDays} Tage` : "Jetzt prüfen") : fmtDate(urgent.deadline,state.lang!)}</strong><small>{de ? `Nächster Termin: ${fmtDate(urgent.deadline,state.lang!)}` : S.kompas.ctaNextSteps}</small></div><Icon name="chevron" size={18}/>
        </button> : <div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de ? "Keine dringende Frist erkannt" : S.rokovi.empty}</strong><span>{de ? "Ergänze dein Profil, wenn sich etwas ändert." : S.kompas.noDateYet}</span></div></div>}
      </section>

      {relevantBenefits.length > 0 && <section><div className="section-title-row"><h2 className="disp">{de ? "Mögliche Leistungen" : S.kompas.yourBenefits}</h2></div><div className="benefit-grid">{relevantBenefits.map(b=><BenefitCard key={b.id} benefit={b} onOpen={(id)=>dispatch({type:"OPEN_BENEFIT",id:id as BenefitId})}/>)}</div><div className="why-note"><Icon name="book" size={16}/><span>{de ? "Wir zeigen nur Hinweise zur Prüfung – keine automatische Anspruchsentscheidung." : S.benefit.disclaimer}</span></div></section>}

      <section><div className="section-title-row"><h2 className="disp">{de ? "Dein Leben in Deutschland" : S.kompas.areasHeading}</h2></div><div className="areas-grid">{areas.map(a=><AreaCard key={a.id} area={a} lang={state.lang!} onOpen={(id)=>dispatch({type:"OPEN_AREA",id:id as AreaId})}/>)}</div></section>

      <button className="profile-strip" onClick={()=>dispatch({type:"NAV",view:"profile"})}><div><span>{de ? "Dein Profil" : S.kompas.profileSaved}</span><strong>{[state.profile.city,state.profile.bundesland].filter(Boolean).join(", ") || (de ? "Angaben ansehen und ergänzen" : S.kompas.profileSaved)}</strong></div><Icon name="chevron" size={18}/></button>
    </div>
    <NavBar active="kompas" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/>
  </>;
}
