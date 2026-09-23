import { useState } from "react";
import { Icon } from "./Icon";
import { buildActionPlan } from "../lib/actionPlan";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import type { Dispatch } from "react";
import "../styles/actionPlan.css";

const STORAGE_KEY = "auslanderleben.completedActions";

export function ActionPlan({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const [done, setDone] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string") : [];
    } catch { return []; }
  });
  const items = buildActionPlan(state.profile!, state.lang!);
  const completed = items.filter(item => done.includes(item.id)).length;
  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter(x => x !== id) : [...done, id];
    setDone(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Keep working when storage is unavailable. */ }
  };
  const de = state.lang === "de", sr = state.lang === "sr";
  const doneLabel = de ? "Erledigt" : sr ? "Završeno" : "Done";
  const markLabel = de ? "Als erledigt markieren" : sr ? "Označi kao završeno" : "Mark as done";
  const progress = de ? `${completed} von ${items.length} erledigt` : sr ? `${completed} od ${items.length} završeno` : `${completed} of ${items.length} complete`;

  return <section className="action-plan card" aria-labelledby="action-plan-title">
    <div className="action-plan-heading">
      <div>
        <div className="eyebrow">{de ? "Deine nächsten Schritte" : sr ? "Tvoji sledeći koraci" : "Your next steps"}</div>
        <h2 className="disp" id="action-plan-title">{de ? "Ein Schritt nach dem anderen" : sr ? "Korak po korak" : "One step at a time"}</h2>
        <p className="action-plan-intro">{de ? "Starte mit dem ersten Punkt. Dein Fortschritt wird hier gespeichert." : sr ? "Počni od prvog koraka. Tvoj napredak ostaje sačuvan ovde." : "Start with the first step. Your progress is saved here."}</p>
      </div>
      <span className="action-progress-label" aria-live="polite">{progress}</span>
    </div>
    <progress className="action-progress" max={items.length || 1} value={completed} aria-label={progress} />
    <ol className="action-plan-list">
      {items.map((item, index) => {
        const isDone = done.includes(item.id);
        return <li className={`action-plan-item${isDone ? " is-complete" : ""}`} key={item.id}>
          <span className="action-step-number" aria-hidden="true">{isDone ? <Icon name="check" size={22} /> : String(index + 1).padStart(2, "0")}</span>
          <div className="action-plan-copy">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="action-plan-actions">
              <button type="button" className="action-primary" onClick={() => dispatch({ type: "NAV", view: item.hrefView })}>{item.actionLabel}<Icon name="chevron" size={16} /></button>
              <button type="button" className="action-done" aria-pressed={isDone} aria-label={`${markLabel}: ${item.title}`} onClick={() => toggle(item.id)}><Icon name="check" size={18} />{isDone ? doneLabel : markLabel}</button>
            </div>
          </div>
        </li>;
      })}
    </ol>
    {completed === items.length && <div className="action-plan-empty" role="status"><Icon name="check" size={20} /><span>{de ? "Alles erledigt. Gut gemacht!" : sr ? "Sve je završeno. Bravo!" : "All caught up. Nicely done!"}</span></div>}
  </section>;
}
