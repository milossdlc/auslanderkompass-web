import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { buildActionPlan } from "../lib/actionPlan";
import type { AppState } from "../types";
import type { Action } from "../state/store";
import type { Dispatch } from "react";
import "../styles/actionPlan.css";

const STORAGE_KEY = "auslanderleben.completedActions";

export function ActionPlan({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); } catch { setDone([]); } }, []);
  const items = buildActionPlan(state.profile!, state.lang!);
  const visible = items.filter((item) => !done.includes(item.id));
  const toggle = (id: string) => { const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id]; setDone(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); };
  const de = state.lang === "de", sr = state.lang === "sr";
  return <section className="action-plan card">
    <div className="action-plan-heading"><div><div className="eyebrow">{de ? "Persönlicher Plan" : sr ? "Lični plan" : "Personal action plan"}</div><h2 className="disp">{de ? "Was du jetzt tun kannst" : sr ? "Šta sada možeš da uradiš" : "What you can do now"}</h2></div><span className="action-count">{visible.length}</span></div>
    {visible.length ? <div className="action-plan-list">{visible.map((item) => <div className="action-plan-item" key={item.id}><button className="action-check" aria-label="Mark complete" onClick={() => toggle(item.id)}><Icon name="check" size={16}/></button><div className="action-plan-copy"><strong>{item.title}</strong><p>{item.text}</p><button className="text-action" onClick={() => dispatch({ type: "NAV", view: item.hrefView })}>{item.actionLabel} →</button></div></div>)}</div> : <div className="action-plan-empty"><Icon name="check" size={20}/><span>{de ? "Deine aktuellen Aktionen sind erledigt." : sr ? "Tvoje trenutne akcije su završene." : "Your current actions are complete."}</span></div>}
  </section>;
}
