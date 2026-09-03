import { Icon } from "./Icon";
import { AREA_ICONS } from "../lib/areaItems";
import { STRINGS, t } from "../i18n";
import type { AreaData, Lang } from "../types";

export function AreaCard({ area, lang, onOpen }: { area: AreaData; lang: Lang; onOpen: (id: string) => void }) {
  const S = STRINGS[lang];
  return (
    <button
      className="card benefit-card"
      style={{
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "start",
        width: "100%",
        cursor: "pointer",
        borderWidth: 1,
      }}
      onClick={() => onOpen(area.id)}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "6px 14px 6px 6px",
          background: "var(--primary-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
          color: "var(--primary)",
        }}
      >
        <Icon name={AREA_ICONS[area.id]} size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{area.name}</div>
        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 3 }}>
          {t(S.kompas.areaCounts, { rights: area.rights.length, obligations: area.obligations.length })}
        </div>
      </div>
      <span className="chevron-icon" style={{ color: "var(--ink-faint)", flex: "none" }}>
        <Icon name="chevron" size={16} />
      </span>
    </button>
  );
}
