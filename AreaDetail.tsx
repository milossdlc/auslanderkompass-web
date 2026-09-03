import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { CloseBar } from "../components/CloseBar";
import { NavBar } from "../components/NavBar";
import { BenefitCard } from "../components/BenefitCard";
import { AreaItemCard } from "../components/AreaItemCard";
import { STRINGS } from "../i18n";
import { computeAreaData } from "../lib/areas";
import { AREA_ICONS } from "../lib/areaItems";
import type { AppState, AreaRight, BenefitId } from "../types";
import type { Action } from "../state/store";
import { KompasHome } from "./KompasHome";

export function AreaDetail({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  if (!state.profile) return <KompasHome state={state} dispatch={dispatch} />;

  const areas = computeAreaData(state.profile, state.lang!);
  const area = areas.find((a) => a.id === state.selectedArea);
  if (!area) {
    dispatch({ type: "NAV", view: "kompas" });
    return null;
  }

  const isBenefit = (r: AreaRight): r is AreaRight & { kind: "benefit" } => r.kind === "benefit";

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
            <Icon name={AREA_ICONS[area.id]} size={22} />
          </div>
          <div className="disp" style={{ fontSize: 20, fontWeight: 700 }}>
            {area.name}
          </div>
        </div>

        <div className="disp" style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)", marginTop: 4 }}>
          {S.kompas.rightsHeading}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {area.rights.map((r) =>
            isBenefit(r) ? (
              <BenefitCard
                key={r.id}
                benefit={{ id: r.id as BenefitId, name: r.name, icon: r.icon, status: r.status!, tone: r.tone, note: null }}
                onOpen={(id) => dispatch({ type: "OPEN_BENEFIT", id: id as BenefitId })}
              />
            ) : (
              <AreaItemCard
                key={r.id}
                item={r}
                kind="right"
                lang={state.lang!}
                onOpen={(id) => dispatch({ type: "OPEN_AREA_ITEM", id })}
              />
            ),
          )}
        </div>

        <div className="disp" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginTop: 8 }}>
          {S.kompas.obligationsHeading}
        </div>
        {area.obligations.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {area.obligations.map((o) => (
              <AreaItemCard
                key={o.id}
                item={o}
                kind="obligation"
                lang={state.lang!}
                onOpen={(id) => dispatch({ type: "OPEN_AREA_ITEM", id })}
              />
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{S.kompas.noObligations}</div>
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
