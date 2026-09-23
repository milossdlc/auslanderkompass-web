import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const origin = 'https://auslanderleben.de';
const pages = [
  { path: '/guides', title: 'Ausländerleben Guides – Leben in Deutschland einfach erklärt', description: 'Praktische Guides zu Aufenthalt, Anmeldung, Arbeit, Familie und Alltag in Deutschland – mit klaren nächsten Schritten und offiziellen Quellen.' },
  { path: '/guide/aufenthaltstitel-verlaengern', title: 'Aufenthaltstitel verlängern in Deutschland | Ausländerleben', description: 'Aufenthaltstitel verlängern: wann du anfangen solltest, welche Unterlagen häufig gebraucht werden und was bei einem rechtzeitigen Antrag wichtig ist.' },
  { path: '/guide/anmeldung-deutschland', title: 'Anmeldung in Deutschland: Frist, Unterlagen und Ablauf | Ausländerleben', description: 'Anmeldung nach dem Einzug: Zwei-Wochen-Frist, Wohnungsgeberbestätigung, Meldebehörde und typische Fehler einfach erklärt.' },
  { path: '/guide/jobwechsel-aufenthaltstitel', title: 'Jobwechsel mit Aufenthaltstitel: Was du vorher prüfen solltest | Ausländerleben', description: 'Jobwechsel mit Aufenthaltstitel: Beschäftigungsauflagen, Zusatzblatt, Arbeitgeberbindung und wichtige Schritte vor dem Wechsel.' },
  { path: '/guide/arbeitslos-in-deutschland', title: 'Arbeitslos in Deutschland: nächste Schritte | Ausländerleben', description: 'Was nach Jobverlust wichtig ist: arbeitsuchend melden, arbeitslos melden und aufenthaltsrechtliche Folgen prüfen.' },
  { path: '/guide/niederlassungserlaubnis-blue-card', title: 'Niederlassungserlaubnis mit Blue Card | Ausländerleben', description: 'Niederlassungserlaubnis mit EU Blue Card: 21 oder 27 Monate, Sprachkenntnisse und weitere Voraussetzungen im Überblick.' },
  { path: '/guide/fiktionsbescheinigung', title: 'Fiktionsbescheinigung: Bedeutung, Antrag und was weiter gilt | Ausländerleben', description: 'Was eine Fiktionsbescheinigung ist, wann sie relevant wird und warum ein rechtzeitig gestellter Aufenthaltstitel-Antrag wichtig ist.' },
  { path: '/guide/wohnungsgeberbestaetigung', title: 'Wohnungsgeberbestätigung: Was du für die Anmeldung brauchst | Ausländerleben', description: 'Wer die Wohnungsgeberbestätigung ausstellt, welche Angaben hineingehören und warum der Mietvertrag nicht dasselbe Dokument ist.' },
  { path: '/guide/blue-card-jobwechsel', title: 'Blue Card Jobwechsel: Was im ersten Jahr gilt | Ausländerleben', description: 'Arbeitgeberwechsel mit Blauer Karte EU: Mitteilung im ersten Beschäftigungsjahr und Prüfung der Blue-Card-Voraussetzungen.' },
  { path: '/guide/kindergeld-auslaender', title: 'Kindergeld für Ausländer in Deutschland 2026 | Ausländerleben', description: 'Kindergeld 2026: 259 Euro pro Kind und Monat. Was ausländische Familien zu Voraussetzungen, Aufenthalt und Antrag prüfen sollten.' },
  { path: '/guide/krankenversicherung-deutschland', title: 'Krankenversicherung in Deutschland | Ausländerleben', description: 'Gesetzliche oder private Krankenversicherung, Versicherungspflicht und Familienversicherung: Orientierung für Neuankömmlinge.' },
  { path: '/guide/steuer-id-deutschland', title: 'Steuer-ID in Deutschland: nach Anmeldung erhalten oder wiederfinden | Ausländerleben', description: 'Wann die Steuer-ID nach der ersten Anmeldung kommt, wo du sie findest und was du tun kannst, wenn der Brief ausbleibt.' },
  { path: '/guide/rundfunkbeitrag-umzug', title: 'Rundfunkbeitrag nach Umzug: anmelden, ändern oder abmelden | Ausländerleben', description: 'Was nach einem Umzug beim Rundfunkbeitrag zu tun ist, wie die Beitragsnummer funktioniert und was bei WG oder Zusammenzug wichtig ist.' }
];

const template = await readFile(join('dist', 'index.html'), 'utf8');

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function seoBody(page) {
  if (page.path === '/guides') {
    const links = pages
      .filter((p) => p.path.startsWith('/guide/'))
      .map((p) => `<li><a href="${p.path}">${escapeHtml(p.title.replace(' | Ausländerleben',''))}</a></li>`)
      .join('');
    return `<main aria-label="Ausländerleben Guides"><h1>Ausländerleben Guides</h1><p>${escapeHtml(page.description)}</p><ul>${links}</ul></main>`;
  }
  return `<main aria-label="Ausländerleben Guide"><p><a href="/guides">Ausländerleben Guides</a></p><h1>${escapeHtml(page.title.replace(' | Ausländerleben',''))}</h1><p>${escapeHtml(page.description)}</p></main>`;
}

function render(page) {
  const canonical = origin + page.path;
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace('<div id="root"></div>', `<div id="root">${seoBody(page)}</div>`);
}

for (const page of pages) {
  const out = join('dist', page.path.slice(1), 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, render(page), 'utf8');
}

const rootLinks = [
  '/guides',
  '/guide/anmeldung-deutschland',
  '/guide/aufenthaltstitel-verlaengern',
  '/guide/steuer-id-deutschland',
  '/guide/wohnungsgeberbestaetigung',
  '/guide/rundfunkbeitrag-umzug'
];
const rootBody = `<main aria-label="Ausländerleben"><h1>Ausländerleben – Dein persönlicher Wegweiser für Deutschland</h1><p>Praktische Orientierung zu Aufenthalt, Anmeldung, Arbeit, Familie und Alltag in Deutschland.</p><nav aria-label="Beliebte Guides"><ul>${rootLinks.map((path) => {
  const page = pages.find((p) => p.path === path);
  const label = path === '/guides' ? 'Alle Guides' : page?.title.replace(' | Ausländerleben','') || path;
  return `<li><a href="${path}">${escapeHtml(label)}</a></li>`;
}).join('')}</ul></nav></main>`;
const rootHtml = template.replace('<div id="root"></div>', `<div id="root">${rootBody}</div>`);
await writeFile(join('dist', 'index.html'), rootHtml, 'utf8');

console.log(`Prerendered ${pages.length} SEO route shells plus the home discovery shell.`);
