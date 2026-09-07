import type { Dispatch } from "react";
import { STRINGS, t } from "../i18n";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import { ONBOARDING_STEPS } from "../state/store";
import { ChoiceButton } from "../components/ChoiceButton";
import { Icon } from "../components/Icon";

export function Onboarding({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const O = S.onboarding;
  const step = ONBOARDING_STEPS[state.onboardingStep] || ONBOARDING_STEPS[0];
  const total = ONBOARDING_STEPS.length;
  const idx = state.onboardingStep;
  const draft = state.draft;

  let title = "";
  let sub = "";
  let body: React.ReactNode = null;

  if (step === "boravak") {
    title = O.boravak.title;
    sub = O.boravak.sub;
    body = (
      <>
        {O.boravak.options.map((o) => (
          <ChoiceButton
            key={o.key}
            label={o.label}
            icon={o.icon}
            selected={draft.permitType === o.key}
            onClick={() => dispatch({ type: "PICK_PERMIT_TYPE", value: o.key })}
          />
        ))}
        <div className="card" style={{ padding: "14px 16px", marginTop: 2 }}>
          <label className="field-label">{O.boravak.arrivalLabel}</label>
          <input
            type="date"
            value={draft.arrivalDate || ""}
            onChange={(e) => dispatch({ type: "SET_ARRIVAL_DATE", value: e.target.value })}
          />
          <div className="field-hint">{O.boravak.arrivalHint}</div>
        </div>
        <div className="card" style={{ padding: "14px 16px", marginTop: 2 }}>
          <label className="field-label">{O.boravak.expiryLabel}</label>
          <input
            type="date"
            value={draft.permitExpiryDate || ""}
            onChange={(e) => dispatch({ type: "SET_PERMIT_EXPIRY_DATE", value: e.target.value })}
          />
          <div className="field-hint">{O.boravak.expiryHint}</div>
        </div>
      </>
    );
  }

  if (step === "work") {
    title = O.work.title;
    sub = O.work.sub;
    body = (
      <>
        {O.work.options.map((o) => (
          <ChoiceButton
            key={o.key}
            label={o.label}
            icon={o.icon}
            selected={draft.work === o.key}
            onClick={() => dispatch({ type: "PICK_WORK", value: o.key })}
          />
        ))}
        {draft.work === "employed" && (
          <div className="card" style={{ padding: "14px 16px", marginTop: 2 }}>
            <label className="field-label">{O.work.incomeLabel}</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder={O.work.incomePlaceholder}
              value={draft.income ?? ""}
              onChange={(e) =>
                dispatch({ type: "SET_INCOME", value: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </div>
        )}
      </>
    );
  }

  if (step === "kids") {
    title = O.kids.title;
    sub = O.kids.sub;
    body = (
      <>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="choice"
            style={draft.kids === true ? { borderColor: "var(--primary)", borderWidth: 2 } : undefined}
            onClick={() => dispatch({ type: "PICK_KIDS", value: true })}
          >
            {O.kids.yes}
          </button>
          <button
            className="choice"
            style={draft.kids === false ? { borderColor: "var(--primary)", borderWidth: 2 } : undefined}
            onClick={() => dispatch({ type: "PICK_KIDS", value: false })}
          >
            {O.kids.no}
          </button>
        </div>
        {draft.kids && (
          <div
            className="card"
            style={{
              padding: 16,
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: 600 }}>{O.kids.kidsCountLabel}</span>
            <div className="stepper">
              <button className="stepbtn" onClick={() => dispatch({ type: "KIDS_COUNT", delta: -1 })}>
                –
              </button>
              <span className="mono" style={{ fontSize: 16, fontWeight: 600, minWidth: 18, textAlign: "center" }}>
                {draft.kidsCount || 1}
              </span>
              <button className="stepbtn" onClick={() => dispatch({ type: "KIDS_COUNT", delta: 1 })}>
                +
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (step === "housing") {
    title = O.housing.title;
    sub = O.housing.sub;
    body = (
      <>
        {O.housing.options.map((o) => (
          <ChoiceButton
            key={o.key}
            label={o.label}
            icon={o.icon}
            selected={draft.housing === o.key}
            onClick={() => dispatch({ type: "PICK_HOUSING", value: o.key })}
          />
        ))}
        {draft.housing === "renting" && (
          <div className="card" style={{ padding: "14px 16px", marginTop: 2 }}>
            <label className="field-label">{O.housing.rentLabel}</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder={O.housing.rentPlaceholder}
              value={draft.rent ?? ""}
              onChange={(e) =>
                dispatch({ type: "SET_RENT", value: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </div>
        )}
        <div className="card location-card" style={{ padding: "14px 16px", marginTop: 2 }}>
          <label className="field-label">{state.lang === "de" ? "Stadt — optional" : "City — optional"}</label>
          <input
            type="text"
            placeholder={state.lang === "de" ? "z. B. Hamburg" : "e.g. Hamburg"}
            value={draft.city ?? ""}
            onChange={(e) => dispatch({ type: "SET_CITY", value: e.target.value })}
          />
          <div className="field-hint">{state.lang === "de" ? "Hilft uns später, zuständige Behörden und lokale Informationen anzuzeigen." : "Helps us show relevant local authorities and information later."}</div>
        </div>
        <div className="card location-card" style={{ padding: "14px 16px", marginTop: 2 }}>
          <label className="field-label">{state.lang === "de" ? "Bundesland — optional" : "Federal state — optional"}</label>
          <input
            type="text"
            placeholder={state.lang === "de" ? "z. B. Hamburg" : "e.g. Hamburg"}
            value={draft.bundesland ?? ""}
            onChange={(e) => dispatch({ type: "SET_BUNDESLAND", value: e.target.value })}
          />
        </div>
      </>
    );
  }

  const canNext =
    (step === "boravak" && !!draft.permitType && !!draft.arrivalDate) ||
    (step === "work" && !!draft.work) ||
    (step === "kids" && draft.kids !== null) ||
    (step === "housing" && !!draft.housing);

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="iconbtn" onClick={() => dispatch({ type: "NAV", view: "kompas" })} aria-label="close">
          <Icon name="close" size={16} />
        </button>
        <div className="progress-row" style={{ flex: 1 }}>
          {ONBOARDING_STEPS.map((_, i) => (
            <div key={i} className={"progress-seg" + (i <= idx ? " done" : "")} />
          ))}
        </div>
      </div>
      <div
        className="mono"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "var(--primary)",
          textTransform: "uppercase",
        }}
      >
        {t(S.step, { n: idx + 1, total })}
      </div>
      <div className="disp" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25 }}>
        {title}
      </div>
      <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 4 }}>{sub}</div>
      {idx === 0 && <div className="privacy-note"><Icon name="lock" size={17}/><span>{state.lang === "de" ? "Deine Angaben bleiben in diesem Browser auf deinem Gerät gespeichert." : "Your answers stay stored in this browser on your device."}</span></div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>{body}</div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: "14px 0 28px", display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <button
          className="btn btn-primary"
          style={{ opacity: canNext ? 1 : 0.45 }}
          onClick={canNext ? () => dispatch({ type: "ONBOARD_NEXT" }) : undefined}
        >
          {idx === total - 1 ? S.finish : S.next}
        </button>
        {idx > 0 ? (
          <button className="btn-ghost" onClick={() => dispatch({ type: "ONBOARD_BACK" })}>
            {S.back}
          </button>
        ) : (
          <button className="btn-ghost" onClick={() => dispatch({ type: "SKIP_ONBOARDING" })}>
            {S.skip}
          </button>
        )}
      </div>
    </div>
  );
}
