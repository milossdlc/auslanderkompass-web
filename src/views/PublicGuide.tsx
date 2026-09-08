import { useEffect } from "react";
import { LANG_ORDER, STRINGS } from "../i18n";
import type { Lang } from "../types";
import "../styles/publicGuidePolish.css";

type Guide = { slug: string; deTitle: string; title: string; description: string; steps: string[]; source: string; url: string };
const GUIDES: Guide[] = [
  { slug: "aufenthaltstitel-verlaengern", deTitle: "Aufenthaltstitel verlängern in Deutschland", title: "Residence permit renewal in Germany", description: "Practical orientation for preparing a residence permit renewal: timing, documents and where to apply.", steps: ["Check your current residence title and expiry date.", "Prepare passport, current residence title and the documents relevant to your permit.", "Use the responsible authority's official online service where available.", "Keep proof of your application and follow any request for additional documents."], source: "Hamburg Service – Verlängerung Aufenthaltserlaubnis", url: "https://www.hamburg.de/service/info/111216647/" },
  { slug: "anmeldung-deutschland", deTitle: "Anmeldung in Deutschland", title: "Registering your address in Germany", description: "What to know about Anmeldung after moving into a home in Germany.", steps: ["Move into your new home.", "Obtain the Wohnungsgeberbestätigung from your housing provider.", "Register your address with the responsible registration authority within the statutory period.", "Keep your Meldebestätigung for later administrative procedures."], source: "Bundesportal – Anmeldung", url: "https://verwaltung.bund.de/" },
  { slug: "jobwechsel-aufenthaltstitel", deTitle: "Jobwechsel mit Aufenthaltstitel", title: "Changing jobs with a German residence permit", description: "Before changing employers, check the conditions and restrictions attached to your residence title.", steps: ["Read the employment conditions on your residence title and Zusatzblatt.", "Check whether your new job meets the conditions of your permit.", "If notification or approval is required, contact the responsible authority before the change.", "Keep the new employment contract and relevant proof."], source: "Gesetze im Internet – § 4a AufenthG", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__4a.html" },
  { slug: "arbeitslos-in-deutschland", deTitle: "Arbeitslos in Deutschland", title: "What to do after losing your job", description: "A practical starting point for registering as job-seeking and unemployed and checking the next steps.", steps: ["Register as job-seeking as soon as you know your employment will end.", "Register as unemployed no later than the first day without employment.", "Check which benefits and residence-related duties apply to your situation.", "Keep all employment and termination documents."], source: "Bundesagentur für Arbeit", url: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld" },
  { slug: "niederlassungserlaubnis-blue-card", deTitle: "Niederlassungserlaubnis mit Blue Card", title: "Permanent residence with an EU Blue Card", description: "Key orientation for Blue Card holders considering a Niederlassungserlaubnis.", steps: ["Check how long you have held a Blue Card and whether the required employment and pension conditions are met.", "Check the applicable German-language level and integration requirements.", "Prepare passport, biometric photo, housing and employment evidence and other requested documents.", "Use the official local application service and follow the authority's document requests."], source: "Hamburg Welcome Center – Blue Card", url: "https://www.hamburg.de/service/info/111204805/" },
];

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function PublicGuide({ slug, lang, onLangChange }: { slug: string; lang: Lang; onLangChange: (lang: Lang) => void }) {
  const guide = GUIDES.find((g) => g.slug === slug);
  const publicLang: "de" | "en" = lang === "de" ? "de" : "en";
  const de = publicLang === "de";
  const related = guide ? GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3) : GUIDES.slice(0, 3);

  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const jsonLdId = "auslanderleben-guide-jsonld";
    document.getElementById(jsonLdId)?.remove();

    if (!guide) {
      document.title = de ? "Guide nicht gefunden – Ausländerleben" : "Guide not found – Ausländerleben";
      setMeta('meta[name="description"]', "name", "description", de ? "Dieser Ausländerleben Guide wurde nicht gefunden." : "This Ausländerleben guide could not be found.");
      setMeta('meta[name="robots"]', "name", "robots", "noindex,nofollow");
      if (canonical) canonical.href = `${window.location.origin}/`;
      return;
    }

    const pageTitle = de ? `${guide.deTitle} | Ausländerleben` : `${guide.title} | Ausländerleben`;
    const pageDescription = de ? `${guide.deTitle}: klare nächste Schritte, praktische Orientierung und offizielle Quellen für Deutschland.` : guide.description;
    const pageUrl = `${window.location.origin}/guide/${guide.slug}`;

    document.title = pageTitle;
    if (canonical) canonical.href = pageUrl;
    setMeta('meta[name="description"]', "name", "description", pageDescription);
    setMeta('meta[name="robots"]', "name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", pageDescription);
    setMeta('meta[property="og:type"]', "property", "og:type", "article");
    setMeta('meta[property="og:url"]', "property", "og:url", pageUrl);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Ausländerleben");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", pageDescription);

    const script = document.createElement("script");
    script.id = jsonLdId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      inLanguage: publicLang,
      name: de ? guide.deTitle : guide.title,
      description: pageDescription,
      step: guide.steps.map((name) => ({ "@type": "HowToStep", name })),
      url: pageUrl,
      publisher: { "@type": "Organization", name: "Ausländerleben", url: window.location.origin },
    });
    document.head.appendChild(script);
    return () => document.getElementById(jsonLdId)?.remove();
  }, [de, guide, publicLang]);

  if (!guide) return <div className="public-guide-shell">
    <header className="public-guide-topbar"><a className="public-guide-brand" href="/">Ausländerleben</a><div className="public-guide-controls"><a className="public-home-btn" href="/">{de ? "Startseite" : "Home"}</a></div></header>
    <main className="public-guide"><header className="public-guide-hero"><div className="eyebrow">404</div><h1 className="disp">{de ? "Guide nicht gefunden" : "Guide not found"}</h1><p>{de ? "Dieser Guide existiert nicht oder wurde verschoben. Starte auf der Startseite oder öffne einen unserer verfügbaren Guides." : "This guide does not exist or may have moved. Start from the homepage or open one of our available guides."}</p></header><section className="public-related"><div className="eyebrow">{de ? "Verfügbare Guides" : "Available guides"}</div><div className="public-related-grid">{related.map((item)=><a key={item.slug} href={`/guide/${item.slug}`}><strong>{de ? item.deTitle : item.title}</strong><span>{de ? "Guide öffnen" : "Open guide"} →</span></a>)}</div></section></main>
  </div>;

  return <div className="public-guide-shell">
    <header className="public-guide-topbar">
      <a className="public-guide-brand" href="/" aria-label="Ausländerleben home">Ausländerleben</a>
      <div className="public-guide-controls">
        <a className="public-home-btn" href="/">{de ? "Startseite" : "Home"}</a>
        <select className="public-lang-select" aria-label="Language" value={publicLang} onChange={(e)=>onLangChange(e.target.value as Lang)}>
          {LANG_ORDER.filter((l)=>l === "de" || l === "en").map((l)=><option key={l} value={l}>{STRINGS[l].name}</option>)}
        </select>
      </div>
    </header>
    <main className="public-guide" id="top">
      <header className="public-guide-hero"><div className="eyebrow">Ausländerleben Guide</div><h1 className="disp">{de ? guide.deTitle : guide.title}</h1><p>{de ? "Praktische Orientierung für das Leben in Deutschland – mit klaren nächsten Schritten und offiziellen Quellen." : guide.description}</p><div className="public-guide-trust"><span>{de ? "Schritt für Schritt" : "Step by step"}</span><span>{de ? "Offizielle Quelle" : "Official source"}</span><span>{de ? "Kostenlos" : "Free"}</span></div></header>
      <section className="public-guide-card"><div className="eyebrow">{de ? "Was du jetzt tun kannst" : "What you can do now"}</div><ol>{guide.steps.map((step, i) => <li key={i}><span>{i + 1}</span><p>{step}</p></li>)}</ol><a className="btn btn-primary public-primary-cta" href={guide.url} target="_blank" rel="noopener noreferrer">{de ? "Offizielle Quelle prüfen" : "Check official source"} →</a><div className="public-guide-source">{de ? "Quelle: " : "Source: "}{guide.source}</div></section>
      <section className="public-guide-journey"><div><strong>{de ? "Möchtest du wissen, was für deine Situation als Nächstes wichtig ist?" : "Want to know what matters next for your situation?"}</strong><p>{de ? "Erstelle in wenigen Minuten deinen persönlichen Kompass mit Fristen und nächsten Schritten." : "Create your personal guide in a few minutes and see relevant deadlines and next steps."}</p></div><a href="/">{de ? "Persönlichen Kompass starten" : "Create my personal guide"} →</a></section>
      <section className="public-related"><div className="eyebrow">{de ? "Weitere Guides" : "Related guides"}</div><div className="public-related-grid">{related.map((item)=><a key={item.slug} href={`/guide/${item.slug}`}><strong>{de ? item.deTitle : item.title}</strong><span>{de ? "Guide öffnen" : "Open guide"} →</span></a>)}</div></section>
      <footer className="public-guide-footer">{de ? "Hinweis: Ausländerleben bietet allgemeine Orientierung und keine individuelle Rechtsberatung. Prüfe wichtige Entscheidungen immer bei der zuständigen offiziellen Stelle." : "Note: Ausländerleben provides general orientation, not individual legal advice. Always confirm important decisions with the responsible official authority."}</footer>
    </main>
    <button className="back-to-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>{de ? "Nach oben" : "Back to top"} ↑</button>
  </div>;
}
