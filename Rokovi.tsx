import type { Dispatch } from "react";
import { Icon } from "../components/Icon";
import { NavBar } from "../components/NavBar";
import { STRINGS, t } from "../i18n";
import { addDays, addMonths, daysUntil, fmtDate, isOverdue, parseISO } from "../lib/dates";
import { computeBenefits } from "../lib/benefits";
import type { AppState, BenefitId } from "../types";
import type { Action } from "../state/store";

interface RokoviItem {
  title: string;
  note: string;
  date: Date;
  approx: boolean;
  fromApplied?: boolean;
  kind: "right" | "obligation";
  onClick: () => void;
}

export function Rokovi({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const S = STRINGS[state.lang!];

  if (!state.profile) {
    return (
      <>
        <div className="screen" style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ color: "var(--ink-faint)" }}>
            <Icon name="calendar" size={40} />
          </div>
          <div className="disp" style={{ fontSize: 19, fontWeight: 700 }}>
            {S.rokovi.needProfileTitle}
          </div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", maxWidth: 260 }}>{S.rokovi.needProfileText}</div>
          <button
            className="btn btn-primary"
            style={{ maxWidth: 220, marginTop: 10 }}
            onClick={() => dispatch({ type: "NAV", view: "onboarding" })}
          >
            {S.kompas.startLabel}
          </button>
        </div>
        <NavBar active="rokovi" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
      </>
    );
  }

  const profile = state.profile;
  const benefits = computeBenefits(profile, state.lang!);
  const today = new Date();
  const applied = profile.applied || {};
  const items: RokoviItem[] = [];

  const bg = benefits.find((b) => b.id === "burgergeld");
  if (bg && bg.tone === "good") {
    const bgBase = applied.burgergeld ? parseISO(applied.burgergeld) : today;
    items.push({
      title: S.rokovi.bgTitle,
      note: S.rokovi.bgNote,
      date: addMonths(bgBase, 6),
      approx: true,
      fromApplied: !!applied.burgergeld,
      kind: "right",
      onClick: () => dispatch({ type: "OPEN_BENEFIT", id: "burgergeld" }),
    });
  }

  const wg = benefits.find((b) => b.id === "wohngeld");
  if (wg && wg.tone === "warn" && !wg.linked) {
    const wgBase = applied.wohngeld ? parseISO(applied.wohngeld) : today;
    items.push({
      title: S.rokovi.wgTitle,
      note: S.rokovi.wgNote,
      date: addMonths(wgBase, 12),
      approx: true,
      fromApplied: !!applied.wohngeld,
      kind: "right",
      onClick: () => dispatch({ type: "OPEN_BENEFIT", id: "wohngeld" as BenefitId }),
    });
  }

  if (profile.boravak?.arrivalDate) {
    items.push({
      title: S.rokovi.anmeldungTitle,
      note: S.rokovi.anmeldungNote,
      date: addDays(parseISO(profile.boravak.arrivalDate), 14),
      approx: false,
      kind: "obligation",
      onClick: () => dispatch({ type: "OPEN_AREA_ITEM", id: "boravak_anmeldung" }),
    });
  }
  if (profile.boravak?.permitExpiryDate) {
    items.push({
      title: S.rokovi.permitTitle,
      note: S.rokovi.permitNote,
      date: parseISO(profile.boravak.permitExpiryDate),
      approx: false,
      kind: "obligation",
      onClick: () => dispatch({ type: "OPEN_AREA_ITEM", id: "boravak_permit" }),
    });
  }

  items.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <>
      <div className="screen">
        <div className="disp" style={{ fontSize: 20, fontWeight: 700 }}>
          {S.rokovi.title}
        </div>
        {items.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {items.map((it, i) => {
              const d = daysUntil(it.date);
              const overdue = isOverdue(it.date);
              const urgent = overdue || d <= 30 || it.kind === "obligation";
              return (
                <button
                  key={i}
                  className="card benefit-card"
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "start",
                    width: "100%",
                    cursor: "pointer",
                    ...(urgent ? { borderColor: "var(--warn)" } : {}),
                  }}
                  onClick={it.onClick}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "6px 12px 6px 6px",
                      background: urgent ? "var(--warn-soft)" : "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                      color: urgent ? "var(--warn)" : "var(--ink-soft)",
                    }}
                  >
                    <Icon name="compass" size={17} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 9.5,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: it.kind === "obligation" ? "var(--accent)" : "var(--primary)",
                        }}
                      >
                        {it.kind === "obligation" ? S.rokovi.tagObligation : S.rokovi.tagRight}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 2 }}>{it.title}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{it.note}</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 4 }}>
                      {it.approx ? S.rokovi.approx : ""}
                      {fmtDate(it.date, state.lang!)}
                    </div>
                    {it.fromApplied && (
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                        {S.rokovi.fromApplied}
                      </div>
                    )}
                  </div>
                  <div className={"pill " + (overdue || urgent ? "pill-warn" : "pill-muted")}>
                    {overdue ? S.rokovi.overdue : t(S.rokovi.pill, { d })}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{S.rokovi.empty}</div>
        )}
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.5 }}>{S.rokovi.disclaimer}</div>
      </div>
      <NavBar active="rokovi" lang={state.lang!} onNav={(view) => dispatch({ type: "NAV", view })} />
    </>
  );
}
