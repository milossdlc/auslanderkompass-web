import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS } from "../i18n";
import { AREA_ORDER } from "../lib/areaItems";
import type { AppState, AreaId } from "../types";
import type { Action } from "../state/store";

export function Objasnjeno({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];
  const groups: (AreaId | null)[] = [null, ...AREA_ORDER];

  return (
    <>
      <div className="screen">
        <div className="disp" style={{ fontSize: 20, fontWeight: 700 }}>
          {S.glossaryPage.title}
        </div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>{S.glossaryPage.intro}</div>

        {groups.map((areaId) => {
          const terms = S.glossary.filter((g) => g.area === areaId);
          if (!terms.length) return null;
          const label = areaId ? S.areas[areaId].name : S.glossaryPage.groupGeneral;
          return (
            <div key={areaId ?? "general"}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "var(--ink-faint)",
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 8 }}>
                {terms.map((g) => (
                  <div key={g.term} className="card" style={{ padding: "15px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)" }}>
                      {g.term}
                    </div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ink)" }}>{g.explain}</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        paddingTop: 6,
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <span style={{ color: "var(--ink-faint)", flex: "none" }}>
                        <Icon name="building" size={13} />
                      </span>
                      <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{g.institution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <NavBar active="objasnjeno" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
