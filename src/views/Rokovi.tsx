import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import { daysUntil, fmtDate, isOverdue, parseISO } from "../lib/dates";
import type { AppState } from "../types";
import type { Action } from "../state/store";

type Deadline = { title:string; note:string; date:Date; id:string };
export function Rokovi({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S=STRINGS[state.lang!], de=state.lang==="de", en=state.lang==="en";
  if(!state.profile) return <><div className="screen empty-state"><Icon name="calendar" size={42}/><h1 className="disp">{S.rokovi.needProfileTitle}</h1><p>{S.rokovi.needProfileText}</p><button className="btn btn-primary" onClick={()=>dispatch({type:"NAV",view:"onboarding"})}>{S.kompas.startLabel}</button></div><NavBar active="rokovi" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
  const p=state.profile; const items:Deadline[]=[];
  if(p.boravak.permitExpiryDate) items.push({title:S.rokovi.permitTitle,note:S.rokovi.permitNote,date:parseISO(p.boravak.permitExpiryDate),id:"boravak_permit"});
  items.sort((a,b)=>a.date.getTime()-b.date.getTime());
  const fresh=items.filter(i=>daysUntil(i.date)>=-120);
  const groups={now:fresh.filter(i=>isOverdue(i.date)||daysUntil(i.date)<=30),month:fresh.filter(i=>daysUntil(i.date)>30&&daysUntil(i.date)<=90),later:fresh.filter(i=>daysUntil(i.date)>90)};
  const render=(title:string,list:Deadline[])=>list.length?<section className="deadline-section"><div className="eyebrow">{title}</div>{list.map(it=>{const d=daysUntil(it.date),over=isOverdue(it.date);return <button className="deadline-card" key={it.id} onClick={()=>dispatch({type:"OPEN_AREA_ITEM",id:it.id})}><div className={"deadline-dot "+(over||d<=30?"urgent":"")}/><div className="deadline-main"><strong>{it.title}</strong><span>{it.note}</span><small>{fmtDate(it.date,state.lang!)}</small></div><div className={"pill "+(over||d<=30?"pill-warn":"pill-muted")}>{over?S.rokovi.overdue:(de?`${d} Tage`:en?`${d} days`:String(d))}</div></button>})}</section>:null;
  return <><div className="screen deadlines-screen"><div className="page-heading"><div><div className="eyebrow">Ausländerleben</div><h1 className="disp">{S.rokovi.title}</h1><p>{de?"Nur aktuelle persönliche Termine. Alte Angaben werden separat markiert.":en?"Only current personal dates. Older profile data is flagged separately.":S.rokovi.disclaimer}</p></div></div>

  {fresh.length? <>{render(de?"Jetzt":en?"Now":"Now",groups.now)}{render(de?"Demnächst":en?"Soon":"Soon",groups.month)}{render(de?"Später":en?"Later":"Later",groups.later)}</>:<div className="card calm-card"><Icon name="check" size={20}/><div><strong>{de?"Keine aktuellen Fristen":en?"No current deadlines":S.rokovi.empty}</strong><span>{de?"Aktualisiere dein Profil, wenn sich Aufenthalt oder Wohnsituation ändern.":en?"Update your profile when your residence or housing situation changes.":S.rokovi.empty}</span></div></div>}
  <div className="info-disclaimer"><Icon name="book" size={16}/><span>{S.rokovi.disclaimer}</span></div></div><NavBar active="rokovi" lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
}
