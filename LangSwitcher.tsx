import { LANG_ORDER, STRINGS } from "../i18n";
import type { Lang } from "../types";

export function LangSwitcher({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className="topbar">
      <select
        className="lang-select mono"
        aria-label="Language"
        value={lang}
        onChange={(e) => onChange(e.target.value as Lang)}
      >
        {LANG_ORDER.map((l) => (
          <option key={l} value={l}>
            {STRINGS[l].name}
          </option>
        ))}
      </select>
    </div>
  );
}
