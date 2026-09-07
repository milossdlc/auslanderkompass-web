import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import { fmtDate } from "../lib/dates";
import { buildSmartDeadlines, calendarHref, deadlinePhase, daysSigned, type SmartDeadline } from "../lib/deadlines";
import { getLocalAuthority } from "../lib/localAuthorities";
import type { AppState, Lang } from "../types";
import type { Action } from "../state/store";

function copy(lang: Lang) {
  if (lang === "de") return { intro: "Persönliche Termine aus deinem Profil – mit klarer Trennung zwischen gesetzlichem Datum und Planungshinweis.", now: "Jetzt", soon: "Demnächst", later: "Später", overdue: "Überfällig", legal: "Gesetzlich relevant", recommended: "Planungshinweis", days: (n:number) => n === 1 ? "1 Tag" : `${n} Tage`, overdueDays: (n:number) => n === 1 ? "seit 1 Tag" : `seit ${n} Tagen`, calendar: "Zum Kalender hinzufügen", details: "Details", source: "Offizielle Quelle", checked: "Geprüft", noDeadlines: "Noch keine persönlichen Fristen", noDeadlinesText: "Trage das Ablaufdatum deines Aufenthaltstitels im Profil ein. Dann kann Ausländerleben rechtzeitig Planungshinweise anzeigen.", addDate: "Ablaufdatum hinzufügen", ruleNote: "Planungshinweise sind bewusst von gesetzlichen Fristen getrennt. Lokale Verfahren können abweichen.", authority: "Zuständige Stelle" };
  if (lang === "sr") return { intro: "Lični rokovi iz tvog profila — uz jasno razdvajanje zakonskog datuma i preporuke za pripremu.", now: "Sada", soon: "Uskoro", later: "Kasnije", overdue: "Prošlo", legal: "Zakonski relevantno", recommended: "Preporuka za planiranje", days: (n:number) => `${n} dana`, overdueDays: (n:number) => `pre ${n} dana`, calendar: "Dodaj u kalendar", details: "Detalji", source: "Zvanični izvor", checked: "Provereno", noDeadlines: "Još nema ličnih rokova", noDeadlinesText: "Dodaj datum isteka boravišne dozvole u profil. Ausländerleben će zatim prikazati datum za pripremu i krajnji datum.", addDate: "Dodaj datum isteka", ruleNote: "Preporuke za planiranje su namerno odvojene od zakonskih rokova. Lokalni postupak može da se razlikuje.", authority: "Nadležna institucija" };
  return { intro: "Personal dates from your profile, clearly separating legal dates from planning reminders.", now: "Now", soon: "Soon", later: "Later", overdue: "Past", legal: "Legally relevant", recommended: "Planning reminder", days: (n:number) => n === 1 ? "1 day" : `${n} days`, overdueDays: (n:number) => n === 1 ? "1 day ago" : `${n} days ago`, calendar: "Add to calendar", details: "Details", source: "Official source", checked: "Checked", noDeadlines: "No personal deadlines yet", noDeadlinesText: "Add your residence permit expiry date to your profile. Ausländerleben can then show a preparation date and the actual expiry date.", addDate: "Add expiry date", ruleNote: "Planning reminders are deliberately separated from legal deadlines. Local procedures can differ.", authority: "Responsible authority" };
}

function DeadlineCard({ item, lang, dispatch, authority }: { item: SmartDeadline; lang: Lang; dispatch: Dispatch<Action>; authority: ReturnType<typeof getLocalAuthority> }) {
  const C = copy(lang); const signed = daysSigned(item.date); const phase = deadlinePhase(item.date); const urgent = phase === "overdue" || phase === "now";
  return <article className={`smart-deadline-card ${item.kind} ${urgent ? "urgent" : ""}`}>
    <div className="smart-deadline-top"><div className={`deadline-kind ${item.kind}`}><Icon name={item.kind === "legal" ? "flag" : "calendar"} size={14}/><span>{item.kind === "legal" ? C.legal : C.recommended}</span></div><span className={`pill ${urgent ? "pill-warn" : "pill-info"}`}>{signed < 0 ? C.overdueDays(Math.abs(signed)) : C.days(signed)}</span></div>
    <div className="smart-deadline-date disp">{fmtDate(item.date, lang)}</div><h3>{item.title}</h3><p>{item.description}</p>
    <div className="smart-authority"><div className="smart-authority-label"><Icon name="building" size={14}/><span>{C.authority}</span></div><strong>{authority.name}</strong><small>{authority.description}</small><a href={authority.url} target="_blank" rel="noopener noreferrer">{C.source} →</a></div>
    <div className="smart-deadline-meta"><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"><Icon name="external" size={14}/>{C.source}: {item.sourceLabel}</a><span>{C.checked}: {item.verified}</span></div>
    <div className="smart-deadline-actions"><a className="btn btn-secondary smart-calendar-btn" href={calendarHref(item)} download={`auslanderleben-${item.id}.ics`}><Icon name="calendar" size={16}/>{C.calendar}</a><button className="btn btn-ghost smart-detail-btn" onClick={()=>dispatch({type:"OPEN_AREA_ITEM",id:item.areaItemId})}>{C.details}</button></div>
  </article>;
}

export function Rokovi({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!]; const lang = state.lang!; const C = copy(lang);
  if (!state.profile) return <><div className="screen empty-state"><Icon name="calendar" size={42}/><h1 className="disp">{S.rokovi.needProfileTitle}</h1><p>{S.rokovi.needProfileText}</p><button className="btn btn-primary" onClick={()=>dispatch({type:"NAV",view:"onboarding"})}>{S.kompas.startLabel}</button></div><NavBar active="rokovi" lang={lang} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
  const items = buildSmartDeadlines(state.profile, lang); const active = items.filter(i => daysSigned(i.date) >= -30); const authority = getLocalAuthority(state.profile, lang);
  const groups = { overdue: active.filter(i => deadlinePhase(i.date) === "overdue"), now: active.filter(i => deadlinePhase(i.date) === "now"), soon: active.filter(i => deadlinePhase(i.date) === "soon"), later: active.filter(i => deadlinePhase(i.date) === "later") };
  const renderGroup = (title:string, list:SmartDeadline[]) => list.length ? <section className="smart-deadline-section"><div className="eyebrow">{title}</div><div className="smart-deadline-list">{list.map(item=><DeadlineCard key={item.id} item={item} lang={lang} dispatch={dispatch} authority={authority}/>)}</div></section> : null;
  return <><div className="screen deadlines-screen smart-deadlines-screen"><div className="page-heading smart-deadline-heading"><div><div className="eyebrow">Ausländerleben</div><h1 className="disp">{S.rokovi.title}</h1><p>{C.intro}</p></div></div>
    {active.length ? <>{renderGroup(C.overdue, groups.overdue)}{renderGroup(C.now, groups.now)}{renderGroup(C.soon, groups.soon)}{renderGroup(C.later, groups.later)}</> : <div className="card smart-empty-deadlines"><div className="smart-empty-icon"><Icon name="calendar" size={22}/></div><div><strong>{C.noDeadlines}</strong><span>{C.noDeadlinesText}</span><button className="text-action" onClick={()=>dispatch({type:"EDIT_PROFILE"})}>{C.addDate} →</button></div></div>}
    <div className="smart-rule-note"><Icon name="book" size={16}/><span>{C.ruleNote}</span></div>
  </div><NavBar active="rokovi" lang={lang} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
}
