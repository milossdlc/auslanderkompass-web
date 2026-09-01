import { useEffect, useReducer } from "react";
import type { Action } from "./store";
import { STORAGE_KEY, loadState, reducer, withInitialLang } from "./store";
import { saveLangPreference } from "../i18n";
import type { AppState, Lang } from "../types";

function init(): AppState {
  return withInitialLang(loadState());
}

export function useAppState(): [AppState, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode, quota) — app still works in-memory */
    }
  }, [state]);

  useEffect(() => {
    if (state.lang) saveLangPreference(state.lang as Lang);
  }, [state.lang]);

  return [state, dispatch];
}
