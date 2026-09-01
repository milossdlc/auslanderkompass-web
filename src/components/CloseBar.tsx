import { Icon } from "./Icon";

export function CloseBar({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button className="iconbtn" onClick={onClose} aria-label="close">
        <Icon name="close" size={16} />
      </button>
      <div style={{ flex: 1 }} />
    </div>
  );
}
