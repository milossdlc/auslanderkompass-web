import type { Benefit, Lang, Profile } from "../types";
import { STRINGS, t, pl } from "../i18n";

export function computeBenefits(profile: Profile, lang: Lang): Benefit[] {
  const S = STRINGS[lang];
  const B = S.benefits;
  const out: Benefit[] = [];

  const bgTone =
    profile.work === "unemployed"
      ? "good"
      : profile.work === "student" || profile.work === "parental_leave"
        ? "warn"
        : "muted";

  out.push({
    id: "burgergeld",
    name: "Bürgergeld",
    icon: "coin",
    status:
      bgTone === "good"
        ? B.burgergeld.statusGood
        : bgTone === "warn"
          ? B.burgergeld.statusWarn
          : B.burgergeld.statusMuted,
    tone: bgTone,
    note: bgTone === "good" ? B.burgergeld.noteGood : null,
  });

  if (bgTone === "good") {
    out.push({
      id: "wohngeld",
      name: "Wohngeld",
      icon: "house",
      status: B.wohngeld.linkedStatus,
      tone: "info",
      note: B.wohngeld.linkedNote,
      linked: true,
    });
  } else if (profile.housing === "renting") {
    const income = profile.income ?? 0;
    const rent = profile.rent ?? 0;
    if (income > 0 && rent > 0) {
      const ratio = rent / income;
      if (ratio > 0.3) {
        out.push({
          id: "wohngeld",
          name: "Wohngeld",
          icon: "house",
          status: B.wohngeld.warnStatus,
          tone: "warn",
          note: t(B.wohngeld.warnNoteRatio, { pct: Math.round(ratio * 100) }),
          linked: bgTone === "warn",
        });
      } else {
        out.push({
          id: "wohngeld",
          name: "Wohngeld",
          icon: "house",
          status: B.wohngeld.mutedStatus,
          tone: "muted",
          note: t(B.wohngeld.mutedNoteRatio, { pct: Math.round(ratio * 100) }),
          linked: false,
        });
      }
    } else {
      out.push({
        id: "wohngeld",
        name: "Wohngeld",
        icon: "house",
        status: B.wohngeld.warnStatus,
        tone: "warn",
        note: B.wohngeld.warnNoteMissing,
        linked: bgTone === "warn",
      });
    }
  } else {
    out.push({
      id: "wohngeld",
      name: "Wohngeld",
      icon: "house",
      status: B.wohngeld.mutedStatus,
      tone: "muted",
      note: null,
    });
  }

  if (profile.kids) {
    out.push({
      id: "kindergeld",
      name: "Kindergeld",
      icon: "heart",
      status: B.kindergeld.status,
      tone: "good",
      note: pl(lang, profile.kidsCount || 1, B.kindergeld.noteForms),
    });
  } else {
    out.push({
      id: "kindergeld",
      name: "Kindergeld",
      icon: "heart",
      status: B.kindergeld.noneStatus,
      tone: "muted",
      note: B.kindergeld.noneNote,
    });
  }

  return out;
}
