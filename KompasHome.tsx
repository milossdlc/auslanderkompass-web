import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import type { AppState } from "../types";
import type { Action } from "../state/store";

export function KompasHome({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const hasDraft = !!(state.draft && state.draft.work);
  return (
    <>
      <div className="screen" style={{ alignItems: "center", textAlign: "center" }}>
        <div style={{ flex: 1 }} />
        <div style={{ color: "var(--primary)" }}>
          <Icon name="compass" size={56} />
        </div>
        <div className="disp" style={{ fontSize: 26, fontWeight: 700 }}>
          Ausländerkompass
        </div>
        <div style={{ fontSize: 14, color: "var(--ink-soft)", maxWidth: 280, lineHeight: 1.55 }}>
          {S.kompas.homeTagline}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ paddingBottom: 28, width: "100%" }}>
          <button className="btn btn-primary" onClick={() => dispatch({ type: "NAV", view: "onboarding" })}>
            {hasDraft ? S.kompas.continueLabel : S.kompas.startLabel}
          </button>
        </div>
      </div>
      <NavBar active="kompas" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
