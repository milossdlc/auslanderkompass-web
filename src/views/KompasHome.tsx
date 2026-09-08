import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import "../styles/welcomePolish.css";

export function KompasHome({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const isDe = state.lang === "de";
  const isSr = state.lang === "sr";
  const hasDraft = !!(state.draft?.permitType || state.draft?.work || state.draft?.housing);
  const startLabel = hasDraft
    ? S.kompas.continueLabel
    : isDe ? "Persönlichen Kompass erstellen" : isSr ? "Napravi lični vodič" : "Create my personal guide";
  return <>
    <div className="screen welcome-screen">
      <div className="brand-lockup"><div className="brand-mark"><Icon name="compass" size={29}/></div><div><strong className="disp">Ausländerleben</strong><span>{isDe ? "Dein persönlicher Wegweiser für Deutschland" : isSr ? "Tvoj lični vodič za život u Nemačkoj" : "Your personal guide to life in Germany"}</span></div></div>
      <div className="welcome-hero">
        <div className="eyebrow">{isDe ? "Einfach. Persönlich. Verständlich." : isSr ? "Jednostavno. Lično. Jasno." : "Simple. Personal. Clear."}</div>
        <h1 className="disp">{isDe ? "Wisse, was in Deutschland für dich wichtig ist." : isSr ? "Saznaj šta je važno baš za tebe u Nemačkoj." : "Know what matters for you in Germany."}</h1>
        <p>{isDe ? "Erhalte persönliche nächste Schritte, wichtige Fristen und verständliche Orientierung zu Aufenthalt, Arbeit, Familie und Wohnen." : isSr ? "Dobij lične sledeće korake, važne rokove i jasne smernice za boravak, posao, porodicu i stanovanje." : "Get personal next steps, important deadlines and clear guidance for residence, work, family and housing."}</p>
      </div>
      <div className="welcome-grid">
        <div className="welcome-feature"><Icon name="calendar" size={22}/><div><strong>{isDe ? "Fristen im Blick" : isSr ? "Prati važne rokove" : "Track important deadlines"}</strong><span>{isDe ? "Aufenthaltstitel und weitere persönliche Termine." : isSr ? "Boravišna dozvola i drugi lični datumi." : "Residence permits and other personal dates."}</span></div></div>
        <div className="welcome-feature"><Icon name="check" size={22}/><div><strong>{isDe ? "Klare nächste Schritte" : isSr ? "Jasni sledeći koraci" : "Clear next steps"}</strong><span>{isDe ? "Sieh, was für deine Situation jetzt relevant ist." : isSr ? "Vidi šta je sada relevantno za tvoju situaciju." : "See what is relevant to your situation now."}</span></div></div>
        <div className="welcome-feature"><Icon name="book" size={22}/><div><strong>{isDe ? "Bürokratie einfach erklärt" : isSr ? "Birokratija jednostavno objašnjena" : "Bureaucracy made clearer"}</strong><span>{isDe ? "Aufenthalt, Arbeit, Familie und Wohnen verständlich erklärt." : isSr ? "Boravak, posao, porodica i stanovanje jasnim jezikom." : "Residence, work, family and housing in plain language."}</span></div></div>
      </div>
      <div className="privacy-note"><Icon name="lock" size={18}/><span>{isDe ? "Deine Angaben bleiben auf diesem Gerät und werden nur für deine persönliche Orientierung genutzt." : isSr ? "Tvoji podaci ostaju na ovom uređaju i koriste se samo za tvoje lične smernice." : "Your answers stay on this device and are used only to personalize your guidance."}</span></div>
      <div className="welcome-actions">
        <button className="btn btn-primary welcome-cta" onClick={()=>dispatch({type:"NAV",view:"onboarding"})}>{startLabel} →</button>
        <button className="welcome-secondary" onClick={()=>dispatch({type:"NAV",view:"objasnjeno"})}>{isDe ? "Erst Wissen entdecken" : isSr ? "Prvo pogledaj vodiče" : "Explore guides first"}</button>
      </div>
      <div className="welcome-start-note"><strong>{isDe ? "Dauert nur wenige Minuten." : isSr ? "Potrebno je samo nekoliko minuta." : "Takes only a few minutes."}</strong> {isDe ? "Danach erhältst du deinen persönlichen Today-Bereich." : isSr ? "Posle toga dobijaš svoj lični Today pregled." : "Then you get your personal Today dashboard."}</div>
      <a className="welcome-public-guides" href="/guides">{isDe ? "Alle öffentlichen Guides ansehen" : isSr ? "Pogledaj sve javne vodiče" : "Browse all public guides"} →</a>
    </div>
    <NavBar active="kompas" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/>
  </>;
}
