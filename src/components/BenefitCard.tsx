import { Icon } from "./Icon";
import { toneClass, toneColor } from "../lib/tone";
import type { Benefit } from "../types";

export function BenefitCard({ benefit, onOpen }: { benefit: Benefit; onOpen: (id: string) => void }) {
  return (
    <button className="card benefit-card benefit-card-v2" onClick={() => onOpen(benefit.id)}>
      <div className="benefit-card-main">
        <div className="benefit-card-icon">
          <Icon name={benefit.icon} size={20} />
        </div>
        <div className="benefit-card-copy">
          <div className="benefit-card-title">{benefit.name}</div>
          <span className={"pill " + toneClass(benefit.tone)}>{benefit.status}</span>
        </div>
        <span className="chevron-icon benefit-card-chevron">
          <Icon name="chevron" size={16} />
        </span>
      </div>
      {benefit.note && (
        <div className="benefit-card-note">
          {benefit.linked && (
            <span style={{ color: toneColor(benefit.tone), flex: "none" }}>
              <Icon name="link" size={13} />
            </span>
          )}
          <span>{benefit.note}</span>
        </div>
      )}
    </button>
  );
}
