import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { CloseBar } from "../components/CloseBar";
import { NavBar } from "../components/NavBar";
import { STRINGS, t } from "../i18n";
import { daysUntil, fmtDate, isOverdue } from "../lib/dates";
import { areaItemDef, INSTITUTION_URLS } from "../lib/areaItems";
import type { AppState, Lang } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";
import { Kompas } from "./Kompas";

const RESIDENCE_SOURCE = "https://www.gesetze-im-internet.de/aufenthg_2004/__81.html";

function permitGuide(lang: Lang) {
  if (lang === "de") return {
    label: "Schritt für Schritt", title: "Aufenthaltstitel verlängern",
    intro: "Wenn dein befristeter Aufenthaltstitel ausläuft, ist der entscheidende Punkt: Stelle den Antrag auf Verlängerung oder auf einen anderen Aufenthaltstitel vor dem Ablaufdatum.",
    legal: "Wichtig zum Fristdatum", legalText: "Nach § 81 Abs. 4 AufenthG gilt der bisherige Aufenthaltstitel grundsätzlich bis zur Entscheidung der Ausländerbehörde fort, wenn du die Verlängerung oder einen anderen Aufenthaltstitel vor Ablauf beantragst. Für Visa nach § 6 Abs. 1 gilt diese Regel nicht.",
    steps: ["Prüfe das Ablaufdatum auf deinem aktuellen Aufenthaltstitel.", "Prüfe die Website deiner zuständigen Ausländerbehörde: Antrag, Termin und Unterlagen unterscheiden sich lokal und nach Aufenthaltstitel.", "Bereite die für deinen Aufenthaltstitel verlangten Nachweise vor.", "Stelle den Antrag vor Ablauf deines aktuellen Aufenthaltstitels und bewahre den Nachweis der Antragstellung auf.", "Reagiere auf Nachforderungen der Behörde und nimm einen erforderlichen Termin wahr."],
    docs: "Typische Unterlagen", docsText: "Häufig werden gültiger Pass, aktueller Aufenthaltstitel, biometrisches Foto und Nachweise zum Aufenthaltszweck verlangt. Die genaue Liste hängt von deinem Titel und deiner Ausländerbehörde ab.",
    planning: "Planung, nicht Gesetz", planningText: "Ausländerleben erinnert dich 8 Wochen vorher als Vorbereitungshilfe. Das ist kein allgemeiner gesetzlicher 8-Wochen-Termin. Entscheidend ist, den Antrag vor Ablauf zu stellen.",
    source: "Gesetzliche Grundlage öffnen", checked: "Inhalt geprüft: September 2026",
  };
  if (lang === "sr") return {
    label: "Korak po korak", title: "Produženje boravišne dozvole",
    intro: "Ako ti ističe vremenski ograničena boravišna dozvola, ključna stvar je da zahtev za produženje ili drugi boravišni status podneseš pre datuma isteka.",
    legal: "Važno za rok", legalText: "Prema § 81 st. 4 AufenthG, ako pre isteka zatražiš produženje ili drugi boravišni status, postojeći status u načelu nastavlja da važi do odluke Ausländerbehörde. Ovo pravilo ne važi za vize iz § 6 st. 1.",
    steps: ["Proveri datum isteka na trenutnoj boravišnoj dozvoli.", "Proveri sajt svoje Ausländerbehörde: način prijave, termin i dokumenta zavise od mesta i vrste dozvole.", "Pripremi dokumenta koja se traže baš za tvoj tip boravka.", "Podnesi zahtev pre isteka trenutne dozvole i sačuvaj dokaz da je zahtev podnet.", "Odgovori na eventualne dodatne zahteve i pojavi se na terminu ako je potreban."],
    docs: "Tipična dokumenta", docsText: "Često se traže važeći pasoš, trenutna boravišna dozvola, biometrijska fotografija i dokazi vezani za svrhu boravka. Tačan spisak zavisi od dozvole i lokalne Ausländerbehörde.",
    planning: "Planiranje, ne zakonski rok", planningText: "Ausländerleben daje podsetnik 8 nedelja ranije kao pomoć za pripremu. To nije univerzalni zakonski rok od 8 nedelja. Ključno je da zahtev bude podnet pre isteka.",
    source: "Otvori zakonski izvor", checked: "Sadržaj proveren: septembar 2026",
  };
  return {
    label: "Step by step", title: "Renew your residence permit",
    intro: "If your temporary residence title is expiring, the key point is to submit the application for an extension or another residence title before the expiry date.",
    legal: "Important deadline rule", legalText: "Under Section 81(4) of the Residence Act, if you apply for an extension or another residence title before expiry, your existing title generally continues until the immigration authority decides. This rule does not apply to visas under Section 6(1).",
    steps: ["Check the expiry date on your current residence title.", "Check your local immigration authority's website: application method, appointment process and documents vary by location and residence title.", "Prepare the evidence required for your specific residence purpose.", "Submit the application before your current title expires and keep proof of submission.", "Respond to requests for additional documents and attend an appointment if required."],
    docs: "Typical documents", docsText: "A valid passport, current residence title, biometric photo and evidence related to your residence purpose are commonly requested. The exact list depends on your title and local immigration authority.",
    planning: "Planning, not a legal deadline", planningText: "Ausländerleben gives you an 8-week preparation reminder. This is not a universal statutory 8-week deadline. The key legal safeguard is applying before expiry.",
    source: "Open legal source", checked: "Content checked: September 2026",
  };
}

export function AreaItemDetail({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;

  const def = areaItemDef(state.selectedAreaItem);
  const text = def ? S.extra[def.id] : null;
  if (!def || !text) { dispatch({ type: "NAV", view: "kompas" }); return <Kompas state={state} dispatch={dispatch} />; }

  const deadline = def.kind === "obligation" && def.deadline ? def.deadline(state.profile) : null;
  let deadlineBlock: React.ReactNode = null;
  if (def.kind === "obligation") {
    if (deadline) {
      const overdue = isOverdue(deadline);
      deadlineBlock = <div className="card" style={{padding:16,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,...(overdue?{borderColor:"var(--accent)"}:{})}}><div><div className="mono" style={{fontSize:11,color:"var(--ink-faint)",textTransform:"uppercase",letterSpacing:"0.03em"}}>{S.rokovi.tagObligation}</div><div style={{fontWeight:600,fontSize:14,marginTop:2}}>{fmtDate(deadline,state.lang!)}</div></div><span className={"pill "+(overdue?"pill-warn":"pill-info")}>{overdue?S.rokovi.overdue:t(S.rokovi.pill,{d:daysUntil(deadline)})}</span></div>;
    } else deadlineBlock = <div className="card" style={{padding:16,fontSize:13,color:"var(--ink-soft)"}}>{S.kompas.noDateYet}</div>;
  }

  const url = INSTITUTION_URLS[def.id];
  const guide = def.id === "boravak_permit" ? permitGuide(state.lang!) : null;

  return <><div className="screen">
    <CloseBar onClose={() => dispatch({ type: "NAV", view: "objasnjeno" })} />
    <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:46,height:46,borderRadius:"6px 16px 6px 6px",background:"var(--primary-soft)",display:"flex",alignItems:"center",justifyContent:"center",flex:"none",color:"var(--primary)"}}><Icon name={def.icon} size={22}/></div><div><div className="disp" style={{fontSize:19,fontWeight:700}}>{guide?.title ?? text.name}</div><span className={"pill "+(def.kind==="obligation"?"pill-warn":"pill-info")} style={{marginTop:3}}>{guide?.label ?? (def.kind==="obligation"?S.rokovi.tagObligation:S.rokovi.tagRight)}</span></div></div>

    {guide ? <>
      <div className="card" style={{padding:16,fontSize:14,lineHeight:1.6}}>{guide.intro}</div>
      <div className="card" style={{padding:16,borderColor:"var(--primary)"}}><div className="eyebrow">{guide.legal}</div><p style={{fontSize:13.5,lineHeight:1.6,margin:"8px 0 0"}}>{guide.legalText}</p></div>
      <section><div className="eyebrow" style={{marginBottom:9}}>{guide.label}</div><div style={{display:"flex",flexDirection:"column",gap:9}}>{guide.steps.map((step,i)=><div className="card" key={step} style={{padding:14,display:"flex",gap:12,alignItems:"flex-start"}}><span className="pill pill-info" style={{flex:"none"}}>{i+1}</span><span style={{fontSize:13.5,lineHeight:1.5}}>{step}</span></div>)}</div></section>
      <div className="card" style={{padding:16}}><strong style={{fontSize:13.5}}>{guide.docs}</strong><p style={{fontSize:13,lineHeight:1.55,color:"var(--ink-soft)",margin:"6px 0 0"}}>{guide.docsText}</p></div>
      <div className="card" style={{padding:16,background:"var(--surface-2)"}}><strong style={{fontSize:13.5}}>{guide.planning}</strong><p style={{fontSize:13,lineHeight:1.55,color:"var(--ink-soft)",margin:"6px 0 0"}}>{guide.planningText}</p></div>
      <a href={RESIDENCE_SOURCE} target="_blank" rel="noopener noreferrer" className="card" style={{padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",textDecoration:"none",color:"inherit"}}><span style={{fontSize:13.5,fontWeight:600,color:"var(--primary)"}}>{guide.source}</span><Icon name="external" size={16}/></a>
      <div style={{fontSize:11.5,color:"var(--ink-faint)"}}>{guide.checked}</div>
    </> : <>
      <div className="card" style={{padding:16,fontSize:14,lineHeight:1.6,color:"var(--ink)"}}>{text.desc}</div>
      {text.consequence&&<div className="card" style={{padding:16,fontSize:13.5,lineHeight:1.6,color:"var(--ink-soft)"}}>{text.consequence}</div>}
      {deadlineBlock}
      {url&&<a href={url} target="_blank" rel="noopener noreferrer" className="card" style={{padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",textDecoration:"none",color:"inherit"}}><span style={{fontSize:13.5,fontWeight:600,color:"var(--primary)"}}>{S.benefit.openLink}</span><Icon name="external" size={16}/></a>}
    </>}
    <div style={{flex:1}}/><div style={{fontSize:11.5,color:"var(--ink-faint)",lineHeight:1.5,paddingBottom:28}}>{S.benefit.disclaimer}</div>
  </div><NavBar active={null} lang={state.lang!} onNav={(view)=>dispatch({type:"NAV",view})}/></>;
}
