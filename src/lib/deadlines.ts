import type { Lang, Profile } from "../types";
import { addDays, daysUntil, parseISO } from "./dates";

export type DeadlineKind = "legal" | "recommended";
export type DeadlineConfidence = "high" | "medium";

export interface SmartDeadline {
  id: string;
  areaItemId: string;
  title: string;
  description: string;
  date: Date;
  kind: DeadlineKind;
  confidence: DeadlineConfidence;
  sourceLabel: string;
  sourceUrl: string;
  verified: string;
}

const PERMIT_SOURCE = "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99010022020010/herausgeber/MV-113306652/region/130000000000";

function text(lang: Lang) {
  if (lang === "de") return {
    prepTitle: "Aufenthaltstitel: Vorbereitung starten",
    prepDesc: "Planungsdatum: Unterlagen prüfen und Verfahren deiner Ausländerbehörde klären. Das ist keine gesetzliche Frist.",
    expiryTitle: "Aufenthaltstitel läuft ab",
    expiryDesc: "Spätestens vor Ablauf muss ein Verlängerungs- oder anderer Aufenthaltstitel-Antrag rechtzeitig gestellt sein. Das örtliche Verfahren kann abweichen.",
    source: "Bundesportal",
  };
  if (lang === "sr") return {
    prepTitle: "Boravišna dozvola: započni pripremu",
    prepDesc: "Planirani datum: proveri dokumenta i postupak svoje Ausländerbehörde. Ovo nije zakonski rok.",
    expiryTitle: "Ističe boravišna dozvola",
    expiryDesc: "Zahtev za produženje ili drugi boravišni status treba podneti pravovremeno pre isteka. Lokalni postupak može da se razlikuje.",
    source: "Bundesportal",
  };
  return {
    prepTitle: "Residence permit: start preparing",
    prepDesc: "Planning date: check documents and your local immigration authority's process. This is not a legal deadline.",
    expiryTitle: "Residence permit expires",
    expiryDesc: "An extension or other residence-title application should be filed in good time before expiry. Local procedures can differ.",
    source: "Bundesportal",
  };
}

export function buildSmartDeadlines(profile: Profile, lang: Lang): SmartDeadline[] {
  const out: SmartDeadline[] = [];
  const expiryRaw = profile.boravak.permitExpiryDate;
  if (!expiryRaw) return out;

  const expiry = parseISO(expiryRaw);
  const copy = text(lang);
  const prep = addDays(expiry, -56); // 8 weeks: conservative planning reminder, explicitly not a legal deadline.

  out.push({
    id: "permit-prep",
    areaItemId: "boravak_permit",
    title: copy.prepTitle,
    description: copy.prepDesc,
    date: prep,
    kind: "recommended",
    confidence: "medium",
    sourceLabel: copy.source,
    sourceUrl: PERMIT_SOURCE,
    verified: "2026-09",
  });

  out.push({
    id: "permit-expiry",
    areaItemId: "boravak_permit",
    title: copy.expiryTitle,
    description: copy.expiryDesc,
    date: expiry,
    kind: "legal",
    confidence: "high",
    sourceLabel: copy.source,
    sourceUrl: PERMIT_SOURCE,
    verified: "2026-09",
  });

  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function deadlinePhase(d: Date): "overdue" | "now" | "soon" | "later" {
  const diff = Math.ceil((d.getTime() - Date.now()) / 86400000);
  if (diff < 0) return "overdue";
  if (diff <= 30) return "now";
  if (diff <= 90) return "soon";
  return "later";
}

export function calendarHref(item: SmartDeadline): string {
  const yyyy = item.date.getFullYear();
  const mm = String(item.date.getMonth() + 1).padStart(2, "0");
  const dd = String(item.date.getDate()).padStart(2, "0");
  const next = addDays(item.date, 1);
  const yyyy2 = next.getFullYear();
  const mm2 = String(next.getMonth() + 1).padStart(2, "0");
  const dd2 = String(next.getDate()).padStart(2, "0");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Auslaenderleben//Deadlines//EN",
    "BEGIN:VEVENT",
    `UID:${item.id}-${yyyy}${mm}${dd}@auslanderleben.de`,
    `DTSTART;VALUE=DATE:${yyyy}${mm}${dd}`,
    `DTEND;VALUE=DATE:${yyyy2}${mm2}${dd2}`,
    `SUMMARY:${item.title.replace(/[,;\\]/g, " ")}`,
    `DESCRIPTION:${item.description.replace(/\n/g, " ").replace(/[,;\\]/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function daysSigned(d: Date): number {
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}
