import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { CloseBar } from "../components/CloseBar";
import { NavBar } from "../components/NavBar";
import { STRINGS, t } from "../i18n";
import { daysUntil, fmtDate, isOverdue } from "../lib/dates";
import { areaItemDef, INSTITUTION_URLS } from "../lib/areaItems";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";
import { Kompas } from "./Kompas";

export function AreaItemDetail({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;

  const def = areaItemDef(state.selectedAreaItem);
  const text = def ? S.extra[def.id] : null;
  if (!def || !text) {
    dispatch({ type: "NAV", view: "kompas" });
    return <Kompas state={state} dispatch={dispatch} />;
  }

  const deadline = def.kind === "obligation" && def.deadline ? def.deadline(state.profile) : null;
  let deadlineBlock: React.ReactNode = null;
  if (def.kind === "obligation") {
    if (deadline) {
      const overdue = isOverdue(deadline);
      deadlineBlock = (
        <div
          className="card"
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            ...(overdue ? { borderColor: "var(--accent)" } : {}),
          }}
        >
          <div>
            <div
              className="mono"
              style={{ fontSize: 11, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.03em" }}
            >
              {S.rokovi.tagObligation}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{fmtDate(deadline, state.lang!)}</div>
          </div>
          <span className={"pill " + (overdue ? "pill-warn" : "pill-info")}>
            {overdue ? S.rokovi.overdue : t(S.rokovi.pill, { d: daysUntil(deadline) })}
          </span>
        </div>
      );
    } else {
      deadlineBlock = (
        <div className="card" style={{ padding: 16, fontSize: 13, color: "var(--ink-soft)" }}>
          {S.kompas.noDateYet}
        </div>
      );
    }
  }

  const url = INSTITUTION_URLS[def.id];

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
            <Icon name={def.icon} size={22} />
          </div>
          <div>
            <div className="disp" style={{ fontSize: 19, fontWeight: 700 }}>
              {text.name}
            </div>
            <span
              className={"pill " + (def.kind === "obligation" ? "pill-warn" : "pill-info")}
              style={{ marginTop: 3 }}
            >
              {def.kind === "obligation" ? S.rokovi.tagObligation : S.rokovi.tagRight}
            </span>
          </div>
        </div>
        <div className="card" style={{ padding: 16, fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>
          {text.desc}
        </div>
        {text.consequence && (
          <div className="card" style={{ padding: 16, fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            {text.consequence}
          </div>
        )}
        {deadlineBlock}
        {url && (
          <a
            href={url}
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
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.5, paddingBottom: 28 }}>
          {S.benefit.disclaimer}
        </div>
      </div>
      <NavBar active={null} lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
