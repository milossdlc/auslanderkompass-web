import type { Lang } from "../types";
import type { LangStrings } from "./types";
import { de } from "./de";
import { en } from "./en";
import { sr } from "./sr";
import { ar } from "./ar";
import { tr } from "./tr";
import { uk } from "./uk";
import { ru } from "./ru";
import { fa } from "./fa";

export const LANG_ORDER: Lang[] = ["de", "en", "ar", "tr", "uk", "ru", "fa", "sr"];

export const STRINGS: Record<Lang, LangStrings> = { de, en, sr, ar, tr, uk, ru, fa };

const LANG_KEY = "rk_lang_v1";

/** Simple {placeholder} interpolation, mirrors the prototype's t() helper. */
export function t(str: string, vars?: Record<string, string | number | null | undefined>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k: string) => {
    const v = vars[k];
    return v !== undefined && v !== null ? String(v) : "";
  });
}

function pluralIndex(lang: Lang, n: number, formsLen: number): number {
  n = Math.abs(n);
  if (formsLen <= 1) return 0;
  if (lang === "sr" || lang === "ru" || lang === "uk") {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (formsLen >= 3) {
      if (mod10 === 1 && mod100 !== 11) return 0;
      if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 1;
      return 2;
    }
  }
  return n === 1 ? 0 : formsLen - 1;
}

/** Pluralized translation, mirrors the prototype's pl() helper. */
export function pl(lang: Lang, n: number, forms: string[]): string {
  const idx = pluralIndex(lang, n, forms.length);
  return t(forms[idx], { n });
}

export function detectDefaultLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && STRINGS[saved]) return saved;
  } catch {
    /* ignore */
  }
  const nav = ((navigator.language || "") + "").toLowerCase();
  const map: [RegExp, Lang][] = [
    [/^sr|^bs|^hr/, "sr"],
    [/^ar/, "ar"],
    [/^tr/, "tr"],
    [/^uk/, "uk"],
    [/^ru/, "ru"],
    [/^fa|^pes/, "fa"],
    [/^de/, "de"],
    [/^en/, "en"],
  ];
  for (const [re, lang] of map) {
    if (re.test(nav)) return lang;
  }
  return "de";
}

export function saveLangPreference(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
}
