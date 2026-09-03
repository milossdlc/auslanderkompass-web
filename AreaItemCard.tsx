import { Icon } from "./Icon";
import { STRINGS, t } from "../i18n";
import { daysUntil, isOverdue } from "../lib/dates";
import type { AreaObligation, AreaRight, Lang } from "../types";

export function AreaItemCard({
  item,
  kind,
  lang,
  onOpen,
}: {
  item: AreaRight | AreaObligation;
  kind: "right" | "obligation";
  lang: Lang;
  onOpen: (id: string) => void;
}) {
  const S = STRINGS[lang];
  let pill: React.ReactNode;

  if (kind === "obligation") {
    const deadline = (item as AreaObligation).deadline;
    if (deadline) {
      const overdue = isOverdue(deadline);
      pill = (
        <span className={"pill " + (overdue ? "pill-warn" : "pill-warn")}>
          {overdue ? S.rokovi.overdue : t(S.rokovi.pill, { d: daysUntil(deadline) })}
        </span>
      );
    } else {
      pill = <span className="pill pill-muted">{S.rokovi.tagObligation}</span>;
    }
  } else {
    pill = <span className="pill pill-info">{S.rokovi.tagRight}</span>;
  }

  return (
    <button
      className="card benefit-card"
      style={{
        padding: "13px 15px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "start",
        width: "100%",
        cursor: "pointer",
        borderWidth: 1,
      }}
      onClick={() => onOpen(item.id)}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "6px 12px 6px 6px",
          background: "var(--surface-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
          color: "var(--ink-soft)",
        }}
      >
        <Icon name={item.icon} size={17} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
      </div>
      {pill}
    </button>
  );
}
