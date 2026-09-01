import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { AreaCard } from "../components/AreaCard";
import { STRINGS } from "../i18n";
import { computeAreaData, nearestObligation } from "../lib/areas";
import type { AppState, AreaId } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";

export function Kompas({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;

  const S = STRINGS[state.lang!];
  const areas = computeAreaData(state.profile, state.lang!);
  const urgent = nearestObligation(areas);
  const ctaTarget = urgent ? urgent.areaId : areas[0].id;

  return (
    <>
      <div className="screen">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", fontWeight: 500 }}>{S.kompas.profileSaved}</div>
            <div className="disp" style={{ fontSize: 20, fontWeight: 700 }}>
              {S.kompas.title}
            </div>
          </div>
          <button
            className="btn-ghost"
            style={{ border: "1px solid var(--line)", borderRadius: 10 }}
            onClick={() => dispatch({ type: "RESET_PROFILE" })}
          >
            {S.kompas.reset}
          </button>
        </div>

        <div
          style={{
            position: "relative",
            background: "var(--primary)",
            borderRadius: "6px 32px 6px 6px",
            padding: 20,
            overflow: "hidden",
            flex: "none",
          }}
        >
          <svg
            width="130"
            height="130"
            viewBox="0 0 150 150"
            style={{ position: "absolute", top: -25, insetInlineEnd: -25, opacity: 0.9 }}
            fill="none"
          >
            <circle cx="75" cy="75" r="58" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1.3" />
            <path d="M96 46L79 71L59 100L75 76L96 46Z" fill="var(--accent)" />
          </svg>
          <div style={{ position: "relative", maxWidth: 190 }}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "#C9BDFA",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {S.kompas.title}
            </div>
            <div className="disp" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.25, color: "#fff" }}>
              {S.kompas.heroText}
            </div>
          </div>
          <button
            className="btn"
            style={{
              position: "relative",
              marginTop: 16,
              width: "auto",
              padding: "10px 16px",
              fontSize: 13,
              background: "#FFFFFF",
              color: "var(--primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={() => dispatch({ type: "OPEN_AREA", id: ctaTarget as AreaId })}
          >
            {S.kompas.ctaNextSteps}
            <Icon name="chevron" size={14} />
          </button>
        </div>

        <div className="disp" style={{ fontSize: 15, fontWeight: 700 }}>
          {S.kompas.areasHeading}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {areas.map((a) => (
            <AreaCard
              key={a.id}
              area={a}
              lang={state.lang!}
              onOpen={(id) => dispatch({ type: "OPEN_AREA", id: id as AreaId })}
            />
          ))}
        </div>

        <div
          className="card"
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "var(--surface-2)",
            borderStyle: "dashed",
          }}
        >
          <span style={{ color: "var(--ink-faint)" }}>
            <Icon name="lock" size={20} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{S.kompas.proTitle}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{S.kompas.proSub}</div>
          </div>
        </div>
      </div>
      <NavBar active="kompas" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
