import type { Benefit, Lang, Profile } from "../types";
import { STRINGS, pl } from "../i18n";
import { daysUntil, parseISO } from "./dates";

const safeLabels: Record<Lang, { relevant: string; check: string; unlikely: string; housing: string; former: string }> = {
  de: { relevant: "Könnte relevant sein", check: "Prüfung empfohlen", unlikely: "Derzeit eher nicht relevant", housing: "Wohnkosten prüfen", former: "früher: Bürgergeld" },
  en: { relevant: "Could be relevant", check: "Check recommended", unlikely: "Probably not relevant right now", housing: "Check housing support", former: "formerly: Bürgergeld" },
  sr: { relevant: "Može biti relevantno", check: "Preporučena provera", unlikely: "Trenutno verovatno nije relevantno", housing: "Proveri pomoć za stanovanje", former: "ranije: Bürgergeld" },
  ar: { relevant: "قد يكون مناسبًا", check: "يُنصح بالتحقق", unlikely: "غالبًا غير مناسب حاليًا", housing: "تحقق من دعم السكن", former: "سابقًا: Bürgergeld" },
  tr: { relevant: "İlgili olabilir", check: "Kontrol önerilir", unlikely: "Şu anda pek ilgili görünmüyor", housing: "Konut desteğini kontrol et", former: "eski adı: Bürgergeld" },
  uk: { relevant: "Може бути актуальним", check: "Рекомендуємо перевірити", unlikely: "Ймовірно, зараз неактуально", housing: "Перевірити житлову допомогу", former: "раніше: Bürgergeld" },
  ru: { relevant: "Может быть актуально", check: "Рекомендуем проверить", unlikely: "Сейчас, вероятно, неактуально", housing: "Проверить жилищную помощь", former: "ранее: Bürgergeld" },
  fa: { relevant: "ممکن است مرتبط باشد", check: "بررسی توصیه می‌شود", unlikely: "احتمالاً در حال حاضر مرتبط نیست", housing: "کمک‌هزینه مسکن را بررسی کنید", former: "نام پیشین: Bürgergeld" },
};

function recommendationPriority(profile: Profile, id: Benefit["id"]): number {
  const expiry = profile.boravak.permitExpiryDate;
  const permitDays = expiry ? daysUntil(parseISO(expiry)) : null;

  // Urgent residence matters outrank financial-support suggestions on the dashboard.
  // This is prioritisation only; it does not decide legal entitlement.
  if (permitDays !== null && permitDays <= 90) {
    if (id === "kindergeld" && profile.kids) return 45;
    if (id === "wohngeld" && (profile.housing === "renting" || profile.housing === "shared")) return 40;
    if (id === "burgergeld" && (profile.work === "unemployed" || profile.work === "parental_leave")) return 35;
  }

  if (profile.work === "unemployed") {
    if (id === "burgergeld") return 100;
    if (id === "wohngeld") return 80;
    if (id === "kindergeld" && profile.kids) return 60;
  }
  if (profile.kids) {
    if (id === "kindergeld") return 100;
    if (id === "wohngeld" && (profile.housing === "renting" || profile.housing === "shared")) return 70;
  }
  if (profile.housing === "renting" || profile.housing === "shared") {
    if (id === "wohngeld") return 90;
  }
  return 10;
}

export function computeBenefits(profile: Profile, lang: Lang): Benefit[] {
  const S = STRINGS[lang];
  const L = safeLabels[lang];
  const out: Benefit[] = [];

  // We intentionally avoid an entitlement verdict here. Actual eligibility depends on
  // residence status, household, income/assets and other legal conditions.
  const basicRelevant = profile.work === "unemployed" || profile.work === "parental_leave";
  out.push({
    id: "burgergeld",
    name: "Grundsicherungsgeld",
    icon: "coin",
    status: basicRelevant ? L.check : L.unlikely,
    tone: basicRelevant ? "warn" : "muted",
    note: basicRelevant ? L.former : null,
  });

  if (profile.housing === "renting" || profile.housing === "shared") {
    out.push({
      id: "wohngeld",
      name: "Wohngeld",
      icon: "house",
      status: L.check,
      tone: "muted",
      note: profile.income == null || profile.rent == null ? S.benefits.wohngeld.warnNoteMissing : null,
      linked: basicRelevant,
    });
  } else {
    out.push({ id: "wohngeld", name: "Wohngeld", icon: "house", status: L.unlikely, tone: "muted", note: null });
  }

  if (profile.kids) {
    out.push({
      id: "kindergeld",
      name: "Kindergeld",
      icon: "heart",
      status: L.check,
      tone: "warn",
      note: pl(lang, profile.kidsCount || 1, S.benefits.kindergeld.noteForms),
    });
  } else {
    out.push({ id: "kindergeld", name: "Kindergeld", icon: "heart", status: L.unlikely, tone: "muted", note: S.benefits.kindergeld.noneNote });
  }

  return out.sort((a, b) => recommendationPriority(profile, b.id) - recommendationPriority(profile, a.id));
}
