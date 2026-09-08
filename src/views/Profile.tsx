import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import { fmtDate, parseISO } from "../lib/dates";
import "../styles/profilePolish.css";

const LABELS = {
  de: { title:"Mein Profil", intro:"Diese Angaben steuern deine persönlichen Fristen, nächsten Schritte und Empfehlungen.", edit:"Profil bearbeiten", residence:"Aufenthalt", arrival:"In Deutschland seit", expiry:"Aufenthalt gültig bis", workGroup:"Arbeit & Einkommen", work:"Beschäftigung", kidsGroup:"Familie & Wohnen", kids:"Kinder", housing:"Wohnen", income:"Nettoeinkommen", rent:"Warmmiete", location:"Ort", privacy:"Deine Angaben bleiben in diesem Browser auf deinem Gerät gespeichert.", missing:"Nicht angegeben", add:"Ergänzen", complete:"Profil vollständig", incomplete:"Profil ergänzen", completeText:"Deine wichtigsten Angaben sind vorhanden. Halte sie aktuell, damit persönliche Fristen korrekt bleiben.", incompleteText:"Einige Angaben fehlen noch. Ergänze sie, damit Ausländerleben Fristen und nächste Schritte besser priorisieren kann." },
  en: { title:"My profile", intro:"These details power your personal deadlines, next steps and recommendations.", edit:"Edit profile", residence:"Residence", arrival:"In Germany since", expiry:"Permit valid until", workGroup:"Work & income", work:"Work", kidsGroup:"Family & housing", kids:"Children", housing:"Housing", income:"Net income", rent:"Warm rent", location:"Location", privacy:"Your details stay stored in this browser on your device.", missing:"Not provided", add:"Add", complete:"Profile complete", incomplete:"Complete your profile", completeText:"Your key details are in place. Keep them current so personal deadlines stay accurate.", incompleteText:"Some important details are still missing. Add them so Ausländerleben can prioritize deadlines and next steps better." },
  sr: { title:"Moj profil", intro:"Ovi podaci određuju tvoje lične rokove, sledeće korake i preporuke.", edit:"Izmeni profil", residence:"Boravak", arrival:"U Nemačkoj od", expiry:"Dozvola važi do", workGroup:"Rad i prihodi", work:"Rad", kidsGroup:"Porodica i stanovanje", kids:"Deca", housing:"Stanovanje", income:"Neto prihod", rent:"Warmmiete", location:"Lokacija", privacy:"Tvoji podaci ostaju sačuvani samo u ovom pregledaču na tvom uređaju.", missing:"Nije uneto", add:"Dodaj", complete:"Profil je kompletan", incomplete:"Dopuni profil", completeText:"Najvažniji podaci su uneti. Održavaj ih ažurnim da bi lični rokovi ostali tačni.", incompleteText:"Neki važni podaci još nedostaju. Dodaj ih da bi Ausländerleben bolje odredio rokove i sledeće korake." },
} as const;

export function ProfileView({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S=STRINGS[state.lang!];
  const L=state.lang==="de"?LABELS.de:state.lang==="sr"?LABELS.sr:LABELS.en;
  if(!state.profile) return <><div className="screen empty-state"><Icon name="passport" size={42}/><h1 className="disp">{L.title}</h1><p>{L.intro}</p><button className="btn btn-primary" onClick={()=>dispatch({type:"NAV",view:"onboarding"})}>{S.kompas.startLabel}</button></div><NavBar active="profile" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
  const p=state.profile;
  const permit=S.onboarding.boravak.options.find(o=>o.key===p.boravak.permitType)?.label??L.missing;
  const work=S.onboarding.work.options.find(o=>o.key===p.work)?.label??L.missing;
  const housing=S.onboarding.housing.options.find(o=>o.key===p.housing)?.label??L.missing;
  const required = [p.boravak.permitType,p.boravak.arrivalDate,p.boravak.permitExpiryDate,p.work,p.housing,p.city,p.bundesland];
  const completed = required.filter(Boolean).length;
  const percent = Math.round((completed/required.length)*100);
  const complete = percent===100;
  const row=(label:string,value:string,missing=false)=><div className="profile-row" key={label}><span>{label}</span><strong className={missing?"profile-missing":""}>{value}{missing&&<em> · {L.add}</em>}</strong></div>;
  return <>
    <div className="screen profile-screen">
      <div className="page-heading"><div><div className="eyebrow">Ausländerleben</div><h1 className="disp">{L.title}</h1><p>{L.intro}</p></div></div>
      <div className="profile-summary"><div className="profile-summary-copy"><div className="eyebrow">{complete?L.complete:L.incomplete}</div><strong>{complete?L.complete:L.incomplete}</strong><span>{complete?L.completeText:L.incompleteText}</span></div><div className="profile-summary-badge">{percent}%</div></div>
      <div className="profile-groups">
        <section><h2 className="disp">{L.residence}</h2><div className="card profile-card">
          {row(L.residence,permit)}
          {row(L.arrival,p.boravak.arrivalDate?fmtDate(parseISO(p.boravak.arrivalDate),state.lang!):L.missing,!p.boravak.arrivalDate)}
          {row(L.expiry,p.boravak.permitExpiryDate?fmtDate(parseISO(p.boravak.permitExpiryDate),state.lang!):L.missing,!p.boravak.permitExpiryDate)}
          {row(L.location,[p.city,p.bundesland].filter(Boolean).join(", ")||L.missing,!p.city&&!p.bundesland)}
        </div></section>
        <section><h2 className="disp">{L.workGroup}</h2><div className="card profile-card">{row(L.work,work)}{row(L.income,p.income!=null?`${p.income.toLocaleString()} €`:L.missing,p.income==null)}</div></section>
        <section><h2 className="disp">{L.kidsGroup}</h2><div className="card profile-card">{row(L.kids,p.kids?String(p.kidsCount||1):"0")}{row(L.housing,housing)}{row(L.rent,p.rent!=null?`${p.rent.toLocaleString()} €`:L.missing,p.rent==null)}</div></section>
      </div>
      <div className="profile-actions"><div className="privacy-note"><Icon name="lock" size={18}/><span>{L.privacy}</span></div><button className="btn btn-secondary profile-edit-btn" onClick={()=>dispatch({type:"EDIT_PROFILE"})}>{L.edit} →</button></div>
    </div>
    <NavBar active="profile" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/>
  </>;
}
