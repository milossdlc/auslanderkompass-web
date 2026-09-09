import { useEffect } from "react";
import { useAppState } from "./state/useAppState";
import { STRINGS } from "./i18n";
import { LangSwitcher } from "./components/LangSwitcher";
import { AppShell } from "./components/AppShell";
import { Kompas } from "./views/Kompas";
import { Onboarding } from "./views/Onboarding";
import { Rokovi } from "./views/Rokovi";
import { Objasnjeno } from "./views/Objasnjeno";
import { BenefitDetail } from "./views/BenefitDetail";
import { AreaDetail } from "./views/AreaDetail";
import { AreaItemDetail } from "./views/AreaItemDetail";
import { ProfileView } from "./views/Profile";
import { PublicGuide } from "./views/PublicGuide";
import { GrowthGuide, isGrowthGuide } from "./views/GrowthGuide";
import { GuidesIndex } from "./views/GuidesIndex";
import { track } from "./lib/analytics";
import type { Lang } from "./types";

function publicGuideSlug(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, "");
  if (!normalized.startsWith("/guide/")) return null;
  const slug = normalized.slice("/guide/".length).trim();
  return slug && !slug.includes("/") ? decodeURIComponent(slug) : null;
}

export default function App() {
  const [state, dispatch] = useAppState();
  const lang = (state.lang ?? "de") as Lang;
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const guideSlug = publicGuideSlug(pathname);
  const isGuidesIndex = pathname === "/guides";
  const S = STRINGS[lang];

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", S.dir);
    track({ name: guideSlug || isGuidesIndex ? "public_guide_view" : "app_view", path: window.location.pathname, lang, view: state.view });
  }, [lang, S.dir, state.view, guideSlug, isGuidesIndex]);

  const onLangChange = (l: Lang) => dispatch({ type: "SET_LANG", lang: l });

  if (isGuidesIndex) return <GuidesIndex lang={lang} />;

  if (guideSlug) {
    return isGrowthGuide(guideSlug)
      ? <GrowthGuide slug={guideSlug} lang={lang} onLangChange={onLangChange} />
      : <PublicGuide slug={guideSlug} lang={lang} onLangChange={onLangChange} />;
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

  return (
    <AppShell topbar={<LangSwitcher lang={lang} onChange={onLangChange} />}>
      {view}
    </AppShell>
  );
}
