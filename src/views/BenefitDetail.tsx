import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { CloseBar } from "../components/CloseBar";
import { NavBar } from "../components/NavBar";
import { STRINGS, t } from "../i18n";
import { fmtDate, parseISO } from "../lib/dates";
import { toneClass } from "../lib/tone";
import { computeBenefits } from "../lib/benefits";
import { INSTITUTION_URLS } from "../lib/areaItems";
import type { AppState, BenefitId } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";
import { Kompas } from "./Kompas";

export function BenefitDetail({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;

  const benefits = computeBenefits(state.profile, state.lang!);
  const b = benefits.find((x) => x.id === state.selectedBenefit);
  if (!b) {
    dispatch({ type: "NAV", view: "kompas" });
    return <Kompas state={state} dispatch={dispatch} />;
  }

  const docs = S.benefitDocs[b.id] || [];
  const appliedDate = state.profile.applied ? state.profile.applied[b.id] : null;

  return (
    <>
      <div className="screen">
        <CloseBar onClose={() => dispatch({ type: "NAV", view: "kompas" })} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "6px 16px 6px 6px",
              background: "var(--primary-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
              color: "var(--primary)",
            }}
          >
            <Icon name={b.icon} size={22} />
          </div>
          <div>
            <div className="disp" style={{ fontSize: 20, fontWeight: 700 }}>
              {b.name}
            </div>
            <span className={"pill " + toneClass(b.tone)} style={{ marginTop: 3 }}>
              {b.status}
            </span>
          </div>
        </div>
        <div className="card" style={{ padding: 16, fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>
          {S.benefitInfo[b.id]}
        </div>
        {b.note && (
          <div className="card" style={{ padding: 16, fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            {b.note}
          </div>
        )}
        <div className="why-note card" style={{ padding: 14 }}>
          <Icon name="book" size={16} />
          <span>{state.lang === "de" ? `Warum sehe ich das? Wir zeigen diesen Hinweis aufgrund deiner Profilangaben. Das ist keine automatische Anspruchsentscheidung.` : `Why am I seeing this? This suggestion is based on your profile and is not an automatic eligibility decision.`}</span>
        </div>
        {b.id === "wohngeld" && b.linked && (
          <button
            className="card"
            style={{
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              textAlign: "start",
              fontFamily: "inherit",
              color: "inherit",
            }}
            onClick={() => dispatch({ type: "OPEN_BENEFIT", id: "burgergeld" })}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--primary)" }}>
              {t(S.benefit.crosslink, { name: "Grundsicherungsgeld" })}
            </span>
            <span className="chevron-icon" style={{ color: "var(--primary)" }}>
              <Icon name="chevron" size={16} />
            </span>
          </button>
        )}

        <div className="disp" style={{ fontSize: 15, fontWeight: 700, marginTop: 6 }}>
          {S.benefit.nextSteps}
        </div>
        <div className="card" style={{ padding: 16, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink)" }}>
          {S.benefitApply[b.id]}
        </div>
        {INSTITUTION_URLS[b.id] && (
          <a
            href={INSTITUTION_URLS[b.id]}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--primary)" }}>{S.benefit.openLink}</span>
            <span style={{ color: "var(--primary)", flex: "none" }}>
              <Icon name="external" size={16} />
            </span>
          </a>
        )}
        <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--ink-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            {S.benefit.docsTitle}
          </div>
          {docs.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: "var(--good)", flex: "none", marginTop: 1 }}>
                <Icon name="check" size={15} />
              </span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)" }}>{d}</span>
            </div>
          ))}
        </div>

        {appliedDate ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span className="pill pill-good">
              {t(S.benefit.appliedOn, { date: fmtDate(parseISO(appliedDate), state.lang!) })}
            </span>
            <button className="btn-ghost" onClick={() => dispatch({ type: "UNMARK_APPLIED", id: b.id as BenefitId })}>
              {S.benefit.unmark}
            </button>
          </div>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => dispatch({ type: "MARK_APPLIED", id: b.id as BenefitId })}
          >
            {S.benefit.markApplied}
          </button>
        )}

        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.5, paddingBottom: 28 }}>
          {S.benefit.disclaimer}
        </div>
      </div>
      <NavBar active={null} lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
