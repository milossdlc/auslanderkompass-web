import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import type { AppState } from "../types";
import type { Action } from "../state/store";

export function KompasHome({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const isDe = state.lang === "de";
  const hasDraft = !!(state.draft?.permitType || state.draft?.work || state.draft?.housing);
  return <>
    <div className="screen welcome-screen">
      <div className="brand-lockup"><div className="brand-mark"><Icon name="compass" size={29}/></div><div><strong className="disp">Ausländerleben</strong><span>{isDe ? "Dein persönlicher Deutschland-Kompass" : "Your personal guide to life in Germany"}</span></div></div>
      <div className="welcome-hero">
        <div className="eyebrow">{isDe ? "Einfach. Persönlich. Verständlich." : "Simple. Personal. Clear."}</div>
        <h1 className="disp">{isDe ? "Wisse, was in Deutschland für dich wichtig ist." : "Know what matters for you in Germany."}</h1>
        <p>{S.kompas.homeTagline}</p>
      </div>
      <div className="welcome-grid">
        <div className="welcome-feature"><Icon name="calendar" size={21}/><div><strong>{isDe ? "Fristen im Blick" : "Track deadlines"}</strong><span>{isDe ? "Aufenthalt, Anmeldung und weitere Termine." : "Residence, registration and other dates."}</span></div></div>
        <div className="welcome-feature"><Icon name="check" size={21}/><div><strong>{isDe ? "Nächste Schritte" : "Next steps"}</strong><span>{isDe ? "Sieh, was du jetzt prüfen oder erledigen kannst." : "See what to check or do next."}</span></div></div>
        <div className="welcome-feature"><Icon name="book" size={21}/><div><strong>{isDe ? "Einfach erklärt" : "Clearly explained"}</strong><span>{isDe ? "Behördenbegriffe ohne Amtsdeutsch." : "German bureaucracy in plain language."}</span></div></div>
      </div>
      <div className="privacy-note"><Icon name="lock" size={18}/><span>{isDe ? "Deine Angaben bleiben auf diesem Gerät und werden nur für deinen Kompass genutzt." : "Your answers stay on this device and are used only for your compass."}</span></div>
      <button className="btn btn-primary welcome-cta" onClick={()=>dispatch({type:"NAV",view:"onboarding"})}>{hasDraft ? S.kompas.continueLabel : (isDe ? "Kompass erstellen" : S.kompas.startLabel)}</button>
      <button className="btn-ghost" onClick={()=>dispatch({type:"NAV",view:"objasnjeno"})}>{isDe ? "Erst einmal Wissen entdecken" : "Explore information first"}</button>
    </div>
    <NavBar active="kompas" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/>
  </>;
}
