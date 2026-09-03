import type { IconName } from "./components/Icon";

export type Lang = "de" | "en" | "sr" | "ar" | "tr" | "uk" | "ru" | "fa";
export type Dir = "ltr" | "rtl";
export type Tone = "good" | "warn" | "muted" | "info";
export type View =
  | "kompas"
  | "onboarding"
  | "rokovi"
  | "objasnjeno"
  | "benefit"
  | "area"
  | "areaItem";

export type AreaId = "boravak" | "stanovanje" | "rad" | "porodica";
export type PermitType =
  | "work_permit"
  | "family_reunification"
  | "asylum"
  | "student_visa";
export type WorkStatus = "employed" | "unemployed" | "student" | "parental_leave";
export type HousingStatus = "renting" | "owned" | "shared";
export type BenefitId = "burgergeld" | "wohngeld" | "kindergeld";

export interface BoravakProfile {
  permitType: PermitType | null;
  arrivalDate: string | null; // ISO yyyy-mm-dd
  permitExpiryDate: string | null;
}

export interface Profile {
  boravak: BoravakProfile;
  work: WorkStatus | null;
  kids: boolean;
  kidsCount: number;
  housing: HousingStatus | null;
  income: number | null;
  rent: number | null;
  applied: Record<string, string>;
}

export interface Draft {
  permitType: PermitType | null;
  arrivalDate: string | null;
  permitExpiryDate: string | null;
  work: WorkStatus | null;
  kids: boolean | null;
  kidsCount: number;
  housing: HousingStatus | null;
  income: number | null;
  rent: number | null;
}

export interface AppState {
  profile: Profile | null;
  onboardingStep: number;
  draft: Draft;
  view: View;
  selectedBenefit: BenefitId | null;
  selectedArea: AreaId | null;
  selectedAreaItem: string | null;
  lang: Lang | null;
}

export interface Benefit {
  id: BenefitId;
  name: string;
  icon: IconName;
  status: string;
  tone: Tone;
  note: string | null;
  linked?: boolean;
}

export interface AreaRight {
  kind: "benefit" | "item";
  id: string;
  name: string;
  icon: IconName;
  tone: Tone;
  status?: string;
}

export interface AreaObligation {
  kind: "item";
  id: string;
  name: string;
  icon: IconName;
  tone: Tone;
  deadline: Date | null;
}

export interface AreaData {
  id: AreaId;
  name: string;
  rights: AreaRight[];
  obligations: AreaObligation[];
}

export interface AreaItemDef {
  id: string;
  area: AreaId;
  kind: "right" | "obligation";
  icon: IconName;
  visible: (p: Profile) => boolean;
  deadline?: (p: Profile) => Date | null;
}

export interface GlossaryTerm {
  term: string;
  area: AreaId | null;
  explain: string;
  institution: string;
}
