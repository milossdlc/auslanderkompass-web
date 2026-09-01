import { Icon } from "./Icon";
import type { View } from "../types";
import { STRINGS } from "../i18n";
import type { Lang } from "../types";

export function NavBar({
  active,
  lang,
  onNav,
}: {
  active: View | null;
  lang: Lang;
  onNav: (view: View) => void;
}) {
  const S = STRINGS[lang];
  const items: { id: View; label: string; icon: "compass" | "calendar" | "book" }[] = [
    { id: "kompas", label: S.nav.kompas, icon: "compass" },
    { id: "rokovi", label: S.nav.rokovi, icon: "calendar" },
    { id: "objasnjeno", label: S.nav.objasnjeno, icon: "book" },
  ];
  return (
    <div className="navbar">
      {items.map((it) => (
        <button
          key={it.id}
          className={"navitem" + (active === it.id ? " active" : "")}
          onClick={() => onNav(it.id)}
        >
          <Icon name={it.icon} size={21} />
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  );
}
