import type { IconName } from "../components/Icon";
import type {
  AreaId,
  BenefitId,
  Dir,
  GlossaryTerm,
  HousingStatus,
  PermitType,
  WorkStatus,
} from "../types";

export interface ChoiceOption<K extends string> {
  key: K;
  label: string;
  icon: IconName;
}

export interface ExtraItemText {
  name: string;
  desc: string;
  consequence?: string;
}

export interface LangStrings {
  name: string;
  dir: Dir;
  nav: { kompas: string; rokovi: string; objasnjeno: string };
  step: string;

  onboarding: {
    boravak: {
      title: string;
      sub: string;
      permitLabel: string;
      options: ChoiceOption<PermitType>[];
      arrivalLabel: string;
      arrivalHint: string;
      expiryLabel: string;
      expiryHint: string;
    };
    work: {
      title: string;
      sub: string;
      options: ChoiceOption<WorkStatus>[];
      incomeLabel: string;
      incomePlaceholder: string;
    };
    kids: {
      title: string;
      sub: string;
      yes: string;
      no: string;
      kidsCountLabel: string;
    };
    housing: {
      title: string;
      sub: string;
      options: ChoiceOption<HousingStatus>[];
      rentLabel: string;
      rentPlaceholder: string;
    };
  };

  next: string;
  finish: string;
  back: string;
  skip: string;

  kompas: {
    profileSaved: string;
    title: string;
    reset: string;
    estimateLabel: string;
    estimateText: string;
    yourBenefits: string;
    proTitle: string;
    proSub: string;
    startLabel: string;
    continueLabel: string;
    ctaNextSteps: string;
    homeTagline: string;
    areasHeading: string;
    heroText: string;
    areaCounts: string;
    rightsHeading: string;
    obligationsHeading: string;
    noObligations: string;
    noDateYet: string;
  };

  benefits: {
    burgergeld: {
      statusGood: string;
      statusWarn: string;
      statusMuted: string;
      noteGood: string;
    };
    wohngeld: {
      linkedStatus: string;
      linkedNote: string;
      warnStatus: string;
      warnNoteRatio: string;
      mutedStatus: string;
      mutedNoteRatio: string;
      warnNoteMissing: string;
    };
    kindergeld: {
      status: string;
      noteForms: string[];
      noneStatus: string;
      noneNote: string;
    };
  };

  benefitInfo: Record<BenefitId, string>;

  benefit: {
    disclaimer: string;
    crosslink: string;
    nextSteps: string;
    docsTitle: string;
    markApplied: string;
    appliedOn: string;
    unmark: string;
    openLink: string;
  };

  benefitApply: Record<BenefitId, string>;
  benefitDocs: Record<BenefitId, string[]>;

  rokovi: {
    title: string;
    fromApplied: string;
    empty: string;
    disclaimer: string;
    approx: string;
    pill: string;
    bgTitle: string;
    bgNote: string;
    wgTitle: string;
    wgNote: string;
    needProfileTitle: string;
    needProfileText: string;
    anmeldungTitle: string;
    anmeldungNote: string;
    permitTitle: string;
    permitNote: string;
    tagObligation: string;
    tagRight: string;
    overdue: string;
  };

  areas: Record<AreaId, { name: string }>;
  extra: Record<string, ExtraItemText>;
  glossary: GlossaryTerm[];
  glossaryPage: { title: string; intro: string; groupGeneral: string };

  months: string[];
}
