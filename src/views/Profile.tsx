import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import { fmtDate, parseISO } from "../lib/dates";

const LABELS = {
  de: { title: "Mein Profil", intro: "Diese Angaben werden für deinen persönlichen Kompass verwendet.", edit: "Profil bearbeiten", residence: "Aufenthalt", arrival: "In Deutschland seit", expiry: "Aufenthalt gültig bis", work: "Arbeit", kids: "Kinder", housing: "Wohnen", income: "Nettoeinkommen", rent: "Warmmiete", location: "Ort", privacy: "Deine Angaben bleiben in diesem Browser auf deinem Gerät gespeichert.", missing: "Nicht angegeben" },
  en: { title: "My profile", intro: "These details are used for your personal compass.", edit: "Edit profile", residence: "Residence", arrival: "In Germany since", expiry: "Permit valid until", work: "Work", kids: "Children", housing: "Housing", income: "Net income", rent: "Warm rent", location: "Location", privacy: "Your details stay stored in this browser on your device.", missing: "Not provided" },
} as const;

export function ProfileView({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const L = state.lang === "de" ? LABELS.de : LABELS.en;
  if (!state.profile) {
    return <><div className="screen empty-state"><Icon name="passport" size={42}/><h1 className="disp">{L.title}</h1><p>{L.intro}</p><button className="btn btn-primary" onClick={() => dispatch({type:"NAV", view:"onboarding"})}>{S.kompas.startLabel}</button></div><NavBar active="profile" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
  }
  const p = state.profile;
  const permit = S.onboarding.boravak.options.find(o => o.key === p.boravak.permitType)?.label ?? L.missing;
  const work = S.onboarding.work.options.find(o => o.key === p.work)?.label ?? L.missing;
  const housing = S.onboarding.housing.options.find(o => o.key === p.housing)?.label ?? L.missing;
  const rows = [
    [L.residence, permit],
    [L.arrival, p.boravak.arrivalDate ? fmtDate(parseISO(p.boravak.arrivalDate), state.lang!) : L.missing],
    [L.expiry, p.boravak.permitExpiryDate ? fmtDate(parseISO(p.boravak.permitExpiryDate), state.lang!) : L.missing],
    [L.work, work],
    [L.income, p.income != null ? `${p.income.toLocaleString()} €` : L.missing],
    [L.kids, p.kids ? String(p.kidsCount || 1) : "0"],
    [L.housing, housing],
    [L.rent, p.rent != null ? `${p.rent.toLocaleString()} €` : L.missing],
    [L.location, [p.city, p.bundesland].filter(Boolean).join(", ") || L.missing],
  ];
  return <>
    <div className="screen">
      <div className="page-heading"><div><div className="eyebrow">Ausländerleben</div><h1 className="disp">{L.title}</h1><p>{L.intro}</p></div><button className="btn-small" onClick={()=>dispatch({type:"EDIT_PROFILE"})}>{L.edit}</button></div>
      <div className="card profile-card">{rows.map(([k,v]) => <div className="profile-row" key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>
      <div className="privacy-note"><Icon name="lock" size={18}/><span>{L.privacy}</span></div>
      <button className="btn btn-secondary" onClick={()=>dispatch({type:"EDIT_PROFILE"})}>{L.edit}</button>
    </div>
    <NavBar active="profile" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/>
  </>;
}
