import type { AppState, AreaId, BenefitId, Draft, HousingStatus, Lang, PermitType, Profile, View, WorkStatus } from "../types";
import { detectDefaultLang } from "../i18n";
import { todayISO } from "../lib/dates";

export const STORAGE_KEY = "rk_proto_state_v1";
export const ONBOARDING_STEPS = ["boravak", "work", "kids", "housing"] as const;

export const DEFAULT_DRAFT: Draft = {
  permitType: null,
  arrivalDate: null,
  permitExpiryDate: null,
  work: null,
  kids: null,
  kidsCount: 0,
  housing: null,
  income: null,
  rent: null,
  city: null,
  bundesland: null,
};

export const DEFAULT_STATE: AppState = {
  profile: null,
  onboardingStep: 0,
  draft: { ...DEFAULT_DRAFT },
  view: "kompas",
  selectedBenefit: null,
  selectedArea: null,
  selectedAreaItem: null,
  lang: null,
};

function normalizeProfile(profile?: Partial<Profile> | null): Profile | null {
  if (!profile) return null;
  return {
    boravak: {
      permitType: profile.boravak?.permitType ?? null,
      arrivalDate: profile.boravak?.arrivalDate ?? null,
      permitExpiryDate: profile.boravak?.permitExpiryDate ?? null,
    },
    work: profile.work ?? null,
    kids: !!profile.kids,
    kidsCount: profile.kidsCount ?? 0,
    housing: profile.housing ?? null,
    income: profile.income ?? null,
    rent: profile.rent ?? null,
    city: profile.city ?? null,
    bundesland: profile.bundesland ?? null,
    applied: profile.applied ?? {},
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      return {
        ...DEFAULT_STATE,
        ...parsed,
        profile: normalizeProfile(parsed.profile),
        draft: { ...DEFAULT_DRAFT, ...(parsed.draft ?? {}) },
      };
    }
  } catch { /* ignore corrupt storage */ }
  return { ...DEFAULT_STATE, draft: { ...DEFAULT_DRAFT } };
}

export function withInitialLang(state: AppState): AppState {
  if (!state.lang) return { ...state, lang: detectDefaultLang() };
  return state;
}

export type Action =
  | { type: "SET_LANG"; lang: Lang }
  | { type: "NAV"; view: View }
  | { type: "OPEN_BENEFIT"; id: BenefitId }
  | { type: "OPEN_AREA"; id: AreaId }
  | { type: "OPEN_AREA_ITEM"; id: string }
  | { type: "PICK_PERMIT_TYPE"; value: PermitType }
  | { type: "PICK_WORK"; value: WorkStatus }
  | { type: "PICK_HOUSING"; value: HousingStatus }
  | { type: "PICK_KIDS"; value: boolean }
  | { type: "KIDS_COUNT"; delta: number }
  | { type: "SET_INCOME"; value: number | null }
  | { type: "SET_RENT"; value: number | null }
  | { type: "SET_CITY"; value: string }
  | { type: "SET_BUNDESLAND"; value: string }
  | { type: "SET_ARRIVAL_DATE"; value: string | null }
  | { type: "SET_PERMIT_EXPIRY_DATE"; value: string | null }
  | { type: "ONBOARD_NEXT" }
  | { type: "ONBOARD_BACK" }
  | { type: "SKIP_ONBOARDING" }
  | { type: "EDIT_PROFILE" }
  | { type: "MARK_APPLIED"; id: BenefitId }
  | { type: "UNMARK_APPLIED"; id: BenefitId }
  | { type: "RESET_PROFILE" };

function buildProfileFromDraft(draft: Draft, previous?: Profile | null): Profile {
  return {
    boravak: { permitType: draft.permitType, arrivalDate: draft.arrivalDate, permitExpiryDate: draft.permitExpiryDate ?? null },
    work: draft.work,
    kids: !!draft.kids,
    kidsCount: draft.kidsCount || 0,
    housing: draft.housing,
    income: draft.income ?? null,
    rent: draft.rent ?? null,
    city: draft.city?.trim() || null,
    bundesland: draft.bundesland?.trim() || null,
    applied: previous?.applied ?? {},
  };
}

function draftFromProfile(profile: Profile): Draft {
  return {
    permitType: profile.boravak.permitType,
    arrivalDate: profile.boravak.arrivalDate,
    permitExpiryDate: profile.boravak.permitExpiryDate,
    work: profile.work,
    kids: profile.kids,
    kidsCount: profile.kidsCount,
    housing: profile.housing,
    income: profile.income,
    rent: profile.rent,
    city: profile.city,
    bundesland: profile.bundesland,
  };
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_LANG": return { ...state, lang: action.lang };
    case "NAV": return { ...state, view: action.view };
    case "OPEN_BENEFIT": return { ...state, selectedBenefit: action.id, view: "benefit" };
    case "OPEN_AREA": return { ...state, selectedArea: action.id, view: "area" };
    case "OPEN_AREA_ITEM": return { ...state, selectedAreaItem: action.id, view: "areaItem" };
    case "PICK_PERMIT_TYPE": return { ...state, draft: { ...state.draft, permitType: action.value } };
    case "PICK_WORK": return { ...state, draft: { ...state.draft, work: action.value } };
    case "PICK_HOUSING": return { ...state, draft: { ...state.draft, housing: action.value } };
    case "PICK_KIDS": {
      const draft = { ...state.draft, kids: action.value };
      if (action.value && !draft.kidsCount) draft.kidsCount = 1;
      if (!action.value) draft.kidsCount = 0;
      return { ...state, draft };
    }
    case "KIDS_COUNT": return { ...state, draft: { ...state.draft, kidsCount: Math.max(1, (state.draft.kidsCount || 1) + action.delta) } };
    case "SET_INCOME": return { ...state, draft: { ...state.draft, income: action.value } };
    case "SET_RENT": return { ...state, draft: { ...state.draft, rent: action.value } };
    case "SET_CITY": return { ...state, draft: { ...state.draft, city: action.value } };
    case "SET_BUNDESLAND": return { ...state, draft: { ...state.draft, bundesland: action.value } };
    case "SET_ARRIVAL_DATE": return { ...state, draft: { ...state.draft, arrivalDate: action.value || null } };
    case "SET_PERMIT_EXPIRY_DATE": return { ...state, draft: { ...state.draft, permitExpiryDate: action.value || null } };
    case "ONBOARD_NEXT": {
      if (state.onboardingStep < ONBOARDING_STEPS.length - 1) return { ...state, onboardingStep: state.onboardingStep + 1 };
      return { ...state, profile: buildProfileFromDraft(state.draft, state.profile), view: "kompas", onboardingStep: 0 };
    }
    case "ONBOARD_BACK": return state.onboardingStep > 0 ? { ...state, onboardingStep: state.onboardingStep - 1 } : state;
    case "SKIP_ONBOARDING": return { ...state, profile: null, view: "kompas", onboardingStep: 0 };
    case "EDIT_PROFILE": return state.profile ? { ...state, draft: draftFromProfile(state.profile), onboardingStep: 0, view: "onboarding" } : state;
    case "MARK_APPLIED": {
      if (!state.profile) return state;
      return { ...state, profile: { ...state.profile, applied: { ...state.profile.applied, [action.id]: todayISO() } } };
    }
    case "UNMARK_APPLIED": {
      if (!state.profile) return state;
      const applied = { ...state.profile.applied }; delete applied[action.id];
      return { ...state, profile: { ...state.profile, applied } };
    }
    case "RESET_PROFILE": return { ...DEFAULT_STATE, draft: { ...DEFAULT_DRAFT }, lang: state.lang };
    default: return state;
  }
}
