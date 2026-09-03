import { Icon } from "./Icon";
import { toneClass, toneColor } from "../lib/tone";
import type { Benefit } from "../types";

export function BenefitCard({ benefit, onOpen }: { benefit: Benefit; onOpen: (id: string) => void }) {
  return (
    <button
      className="card benefit-card"
      style={{
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        textAlign: "start",
        width: "100%",
        cursor: "pointer",
        borderWidth: 1,
      }}
      onClick={() => onOpen(benefit.id)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
          <Icon name={benefit.icon} size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{benefit.name}</div>
          <span className={"pill " + toneClass(benefit.tone)} style={{ marginTop: 3 }}>
            {benefit.status}
          </span>
        </div>
        <span className="chevron-icon" style={{ color: "var(--ink-faint)", flex: "none" }}>
          <Icon name="chevron" size={16} />
        </span>
      </div>
      {benefit.note && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
            paddingTop: 8,
            borderTop: "1px solid var(--line)",
          }}
        >
          {benefit.linked && (
            <span style={{ color: toneColor(benefit.tone), flex: "none" }}>
              <Icon name="link" size={13} />
            </span>
          )}
          <span style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>{benefit.note}</span>
        </div>
      )}
    </button>
  );
}
