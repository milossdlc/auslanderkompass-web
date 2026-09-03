import type { AreaId, AreaItemDef, BenefitId } from "../types";
import { addDays, parseISO } from "./dates";

export const AREA_ORDER: AreaId[] = ["boravak", "stanovanje", "rad", "porodica"];

export const AREA_ICONS: Record<AreaId, "passport" | "house" | "coin" | "heart"> = {
  boravak: "passport",
  stanovanje: "house",
  rad: "coin",
  porodica: "heart",
};

export const INSTITUTION_URLS: Record<BenefitId | string, string> = {
  burgergeld: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
  wohngeld:
    "https://familienportal.de/familienportal/familienleistungen/weitere-leistungen/wohngeld",
  kindergeld: "https://www.arbeitsagentur.de/familie-und-kinder/infos-rund-um-kindergeld",
  boravak_anmeldung: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99115005104000",
  boravak_permit:
    "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99010023020000/herausgeber/HB-S1000030000009359/region/040000000000",
  boravak_integration:
    "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
};

/**
 * Extra rights & obligations per life area. Visibility + deadline rules live
 * here in code; the display text lives in STRINGS[lang].extra[id].
 */
export const AREA_ITEMS: AreaItemDef[] = [
  { id: "boravak_work", area: "boravak", kind: "right", icon: "passport", visible: () => true },
  { id: "boravak_family", area: "boravak", kind: "right", icon: "heart", visible: () => true },
  {
    id: "boravak_anmeldung",
    area: "boravak",
    kind: "obligation",
    icon: "passport",
    visible: () => true,
    deadline: (p) => (p.boravak?.arrivalDate ? addDays(parseISO(p.boravak.arrivalDate), 14) : null),
  },
  {
    id: "boravak_permit",
    area: "boravak",
    kind: "obligation",
    icon: "passport",
    visible: () => true,
    deadline: (p) => (p.boravak?.permitExpiryDate ? parseISO(p.boravak.permitExpiryDate) : null),
  },
  {
    id: "boravak_integration",
    area: "boravak",
    kind: "obligation",
    icon: "book",
    visible: (p) => !(p.boravak && p.boravak.permitType === "work_permit"),
  },

  {
    id: "stanovanje_kuendigung",
    area: "stanovanje",
    kind: "right",
    icon: "house",
    visible: (p) => p.housing === "renting",
  },
  {
    id: "stanovanje_adresa",
    area: "stanovanje",
    kind: "obligation",
    icon: "house",
    visible: () => true,
  },

  { id: "rad_minwage", area: "rad", kind: "right", icon: "coin", visible: () => true },
  { id: "rad_leave", area: "rad", kind: "right", icon: "coin", visible: (p) => p.work === "employed" },
  {
    id: "rad_dismissal",
    area: "rad",
    kind: "right",
    icon: "coin",
    visible: (p) => p.work === "employed",
  },
  {
    id: "rad_mitwirkung",
    area: "rad",
    kind: "obligation",
    icon: "coin",
    visible: (p) => p.work === "unemployed",
  },

  {
    id: "porodica_elterngeld",
    area: "porodica",
    kind: "right",
    icon: "heart",
    visible: (p) => !!p.kids,
  },
  {
    id: "porodica_birth",
    area: "porodica",
    kind: "obligation",
    icon: "heart",
    visible: (p) => !!p.kids,
  },
  {
    id: "porodica_taxid",
    area: "porodica",
    kind: "obligation",
    icon: "heart",
    visible: (p) => !!p.kids,
  },
];

export function areaItemDef(id: string | null): AreaItemDef | null {
  if (!id) return null;
  return AREA_ITEMS.find((d) => d.id === id) ?? null;
}
