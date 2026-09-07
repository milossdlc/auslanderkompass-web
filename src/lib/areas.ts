import type { AreaData, AreaObligation, AreaRight, Lang, Profile } from "../types";
import { STRINGS } from "../i18n";
import { computeBenefits } from "./benefits";
import { AREA_ITEMS, AREA_ORDER } from "./areaItems";

export function computeAreaData(profile: Profile, lang: Lang): AreaData[] {
  const S = STRINGS[lang];
  const benefits = computeBenefits(profile, lang);
  const byId = Object.fromEntries(benefits.map((b) => [b.id, b]));

  const coreByArea = {
    stanovanje: byId.wohngeld,
    rad: byId.burgergeld,
    porodica: byId.kindergeld,
  };

  const areas: Record<string, AreaData> = {};
  AREA_ORDER.forEach((id) => {
    areas[id] = { id, name: S.areas[id].name, rights: [], obligations: [] };
  });

  if (coreByArea.stanovanje) {
    const b = coreByArea.stanovanje;
    areas.stanovanje.rights.push({ kind: "benefit", id: b.id, name: b.name, icon: b.icon, status: b.status, tone: b.tone });
  }
  if (coreByArea.rad) {
    const b = coreByArea.rad;
    areas.rad.rights.push({ kind: "benefit", id: b.id, name: b.name, icon: b.icon, status: b.status, tone: b.tone });
  }
  if (coreByArea.porodica) {
    const b = coreByArea.porodica;
    areas.porodica.rights.push({ kind: "benefit", id: b.id, name: b.name, icon: b.icon, status: b.status, tone: b.tone });
  }

  AREA_ITEMS.forEach((def) => {
    if (!def.visible(profile)) return;
    const text = S.extra[def.id];
    if (!text) return;
    if (def.kind === "obligation") {
      const entry: AreaObligation = {
        kind: "item",
        id: def.id,
        name: text.name,
        icon: def.icon,
        tone: "info",
        deadline: def.deadline ? def.deadline(profile) : null,
      };
      areas[def.area].obligations.push(entry);
    } else {
      const entry: AreaRight = {
        kind: "item",
        id: def.id,
        name: text.name,
        icon: def.icon,
        tone: "info",
      };
      areas[def.area].rights.push(entry);
    }
  });

  return AREA_ORDER.map((id) => areas[id]);
}

export function nearestObligation(areas: AreaData[]): { areaId: string; deadline: Date } | null {
  let best: { areaId: string; deadline: Date } | null = null;
  const staleCutoff = new Date();
  staleCutoff.setHours(0, 0, 0, 0);
  staleCutoff.setDate(staleCutoff.getDate() - 120);

  areas.forEach((a) => {
    a.obligations.forEach((o) => {
      // Very old deadlines usually mean the stored profile is stale, not that the
      // user has an actionable deadline today. They are handled in the profile/
      // deadlines view instead of taking over the dashboard.
      if (o.deadline && o.deadline >= staleCutoff && (!best || o.deadline < best.deadline)) {
        best = { areaId: a.id, deadline: o.deadline };
      }
    });
  });
  return best;
}
