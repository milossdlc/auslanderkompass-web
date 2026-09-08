import { useEffect } from "react";
import type { Lang } from "../types";
import { track, trackGuideCta } from "../lib/analytics";
import "../styles/publicGuidePolish.css";
import "../styles/guideHub.css";

type GuideCard = { slug:string; de:string; en:string; group:"aufenthalt"|"wohnen"|"arbeit"|"familie"|"alltag"; descDe:string; descEn:string };
const GUIDES:GuideCard[]=[
  {slug:"aufenthaltstitel-verlaengern",de:"Aufenthaltstitel verlängern",en:"Residence permit renewal",group:"aufenthalt",descDe:"Fristen, typische Unterlagen und rechtzeitiger Antrag.",descEn:"Timing, common documents and applying before expiry."},
  {slug:"fiktionsbescheinigung",de:"Fiktionsbescheinigung",en:"Fiktionsbescheinigung",group:"aufenthalt",descDe:"Was sie bedeutet und was nach einem Antrag weiter gilt.",descEn:"What it means and what continues after an application."},
  {slug:"niederlassungserlaubnis-blue-card",de:"Niederlassungserlaubnis mit Blue Card",en:"Permanent residence with EU Blue Card",group:"aufenthalt",descDe:"21 oder 27 Monate, Sprache und weitere Voraussetzungen.",descEn:"21 or 27 months, language and other requirements."},
  {slug:"anmeldung-deutschland",de:"Anmeldung in Deutschland",en:"Registering your address",group:"wohnen",descDe:"Zwei-Wochen-Frist, Ablauf und typische Fehler.",descEn:"Two-week rule, process and common mistakes."},
  {slug:"wohnungsgeberbestaetigung",de:"Wohnungsgeberbestätigung",en:"Wohnungsgeberbestätigung",group:"wohnen",descDe:"Wer sie ausstellt und was für die Anmeldung wichtig ist.",descEn:"Who issues it and why it matters for registration."},
  {slug:"jobwechsel-aufenthaltstitel",de:"Jobwechsel mit Aufenthaltstitel",en:"Changing jobs with a residence permit",group:"arbeit",descDe:"Beschäftigungsauflagen und Zusatzblatt vor dem Wechsel prüfen.",descEn:"Check employment restrictions before changing jobs."},
  {slug:"blue-card-jobwechsel",de:"Blue Card Jobwechsel",en:"EU Blue Card job change",group:"arbeit",descDe:"Was im ersten Beschäftigungsjahr zu beachten ist.",descEn:"What to know during the first year of employment."},
  {slug:"arbeitslos-in-deutschland",de:"Arbeitslos in Deutschland",en:"Unemployed in Germany",group:"arbeit",descDe:"Arbeitsuchend, arbeitslos und nächste Schritte.",descEn:"Job-seeker registration, unemployment registration and next steps."},
  {slug:"kindergeld-auslaender",de:"Kindergeld für Ausländer",en:"Kindergeld for foreign nationals",group:"familie",descDe:"Voraussetzungen, Antrag und Kindergeld 2026.",descEn:"Eligibility, application and Kindergeld in 2026."},
  {slug:"krankenversicherung-deutschland",de:"Krankenversicherung in Deutschland",en:"Health insurance in Germany",group:"alltag",descDe:"GKV, Versicherungspflicht und was du zuerst prüfen solltest.",descEn:"Public insurance, compulsory cover and what to check first."}
];

export function GuidesIndex({lang}:{lang:Lang}){
  const de=lang==="de";
  useEffect(()=>{
    const title=de?"Ausländerleben Guides – Leben in Deutschland einfach erklärt":"Ausländerleben Guides – life in Germany explained";
    const description=de?"Praktische Guides zu Aufenthalt, Anmeldung, Arbeit, Familie und Alltag in Deutschland – mit klaren nächsten Schritten und offiziellen Quellen.":"Practical guides for residence, registration, work, family and everyday life in Germany, with clear next steps and official sources.";
    document.title=title;
    const meta=document.querySelector('meta[name="description"]'); if(meta) meta.setAttribute("content",description);
    const canonical=document.querySelector('link[rel="canonical"]') as HTMLLinkElement|null; if(canonical) canonical.href=`${window.location.origin}/guides`;
    const robots=document.querySelector('meta[name="robots"]'); if(robots) robots.setAttribute("content","index,follow,max-image-preview:large,max-snippet:-1");
    const id="auslanderleben-guides-index-jsonld"; document.getElementById(id)?.remove();
    const script=document.createElement("script"); script.id=id; script.type="application/ld+json"; script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"ItemList",name:title,itemListElement:GUIDES.map((g,i)=>({"@type":"ListItem",position:i+1,name:de?g.de:g.en,url:`${window.location.origin}/guide/${g.slug}`}))}); document.head.appendChild(script);
    return()=>document.getElementById(id)?.remove();
  },[de]);
  const groups=[["aufenthalt",de?"Aufenthalt":"Residence"],["wohnen",de?"Anmeldung & Wohnen":"Registration & housing"],["arbeit",de?"Arbeit":"Work"],["familie",de?"Familie":"Family"],["alltag",de?"Alltag":"Everyday life"]] as const;
  return <div className="public-guide-shell">
    <header className="public-guide-topbar"><a className="public-guide-brand" href="/">Ausländerleben</a><div className="public-guide-controls"><a className="public-home-btn" href="/">{de?"Startseite":"Home"}</a></div></header>
    <main className="public-guide public-guides-index">
      <header className="public-guide-hero"><div className="eyebrow">Ausländerleben Guides</div><h1 className="disp">{de?"Deutschland verstehen – Schritt für Schritt":"Understand life in Germany – step by step"}</h1><p>{de?"Wähle ein Thema und erhalte eine klare Orientierung mit nächsten Schritten, typischen Unterlagen, häufigen Fehlern und offiziellen Quellen.":"Choose a topic and get clear orientation with next steps, common documents, common mistakes and official sources."}</p><div className="public-guide-trust"><span>10 {de?"Guides":"guides"}</span><span>{de?"Offizielle Quellen":"Official sources"}</span><span>{de?"Kostenlos":"Free"}</span></div></header>
      {groups.map(([key,label])=>{const items=GUIDES.filter(g=>g.group===key);return <section className="guide-hub-section" key={key}><div className="eyebrow">{label}</div><div className="guide-hub-grid">{items.map(g=><a key={g.slug} href={`/guide/${g.slug}`} className="guide-hub-card" onClick={()=>track({name:"guide_open",path:window.location.pathname,lang,source:"guides_hub",guide:g.slug})}><strong>{de?g.de:g.en}</strong><p>{de?g.descDe:g.descEn}</p><span>{de?"Guide öffnen":"Open guide"} →</span></a>)}</div></section>})}
      <section className="public-guide-journey"><div><strong>{de?"Du willst nicht selbst herausfinden, was für dich relevant ist?":"Don't want to figure out what applies to you on your own?"}</strong><p>{de?"Erstelle deinen persönlichen Kompass und erhalte priorisierte Fristen und nächste Schritte.":"Create your personal guide and get prioritized deadlines and next steps."}</p></div><a href="/" onClick={()=>trackGuideCta("guides-index",lang,"guides_hub")}>{de?"Persönlichen Kompass starten":"Create my personal guide"} →</a></section>
    </main>
  </div>;
}
