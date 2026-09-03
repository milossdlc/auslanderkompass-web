import { Icon, type IconName } from "./Icon";

export function ChoiceButton({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: IconName;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className={"choice" + (selected ? " selected" : "")} onClick={onClick}>
      <span className="choice-icon" style={{ color: selected ? "#fff" : "var(--ink-soft)" }}>
        <Icon name={icon} size={17} />
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {selected && (
        <span style={{ color: "var(--primary)" }}>
          <Icon name="check" size={18} />
        </span>
      )}
    </button>
  );
}
