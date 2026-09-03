import type { Lang } from "../types";
import { STRINGS } from "../i18n";

export function parseISO(str: string | null | undefined): Date {
  const parts = (str || "").split("-");
  if (parts.length !== 3) return new Date();
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

export function todayISO(): string {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export function daysUntil(d: Date): number {
  const ms = d.getTime() - Date.now();
  return Math.max(0, Math.round(ms / 86400000));
}

export function isOverdue(d: Date): boolean {
  return d.getTime() < Date.now();
}

export function fmtDate(d: Date, lang: Lang): string {
  const S = STRINGS[lang];
  return d.getDate() + ". " + S.months[d.getMonth()] + " " + d.getFullYear() + ".";
}
