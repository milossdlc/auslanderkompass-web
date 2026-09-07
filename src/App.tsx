import { useEffect } from "react";
import { useAppState } from "./state/useAppState";
import { STRINGS } from "./i18n";
import { LangSwitcher } from "./components/LangSwitcher";
import { Kompas } from "./views/Kompas";
import { Onboarding } from "./views/Onboarding";
import { Rokovi } from "./views/Rokovi";
import { Objasnjeno } from "./views/Objasnjeno";
import { BenefitDetail } from "./views/BenefitDetail";
import { AreaDetail } from "./views/AreaDetail";
import { AreaItemDetail } from "./views/AreaItemDetail";
import { ProfileView } from "./views/Profile";
import { PublicGuide } from "./views/PublicGuide";
import type { Lang } from "./types";

export default function App() {
  const [state, dispatch] = useAppState();
  const lang = state.lang as Lang;
  const S = STRINGS[lang];
  const publicMatch = window.location.pathname.match(/^\/guide\/([^/]+)\/?$/);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", S.dir);
  }, [lang, S.dir]);

  if (publicMatch) {
    return <PublicGuide slug={publicMatch[1]} lang={lang} />;
  }

  let view;
  switch (state.view) {
    case "onboarding": view = <Onboarding state={state} dispatch={dispatch} />; break;
    case "rokovi": view = <Rokovi state={state} dispatch={dispatch} />; break;
    case "objasnjeno": view = <Objasnjeno state={state} dispatch={dispatch} />; break;
    case "profile": view = <ProfileView state={state} dispatch={dispatch} />; break;
    case "benefit": view = <BenefitDetail state={state} dispatch={dispatch} />; break;
    case "area": view = <AreaDetail state={state} dispatch={dispatch} />; break;
    case "areaItem": view = <AreaItemDetail state={state} dispatch={dispatch} />; break;
    default: view = <Kompas state={state} dispatch={dispatch} />;
  }

  return <div id="shell" className={S.dir === "rtl" ? "rtl-font" : ""}><LangSwitcher lang={lang} onChange={(l) => dispatch({ type: "SET_LANG", lang: l })} /><div id="app">{view}</div></div>;
}
