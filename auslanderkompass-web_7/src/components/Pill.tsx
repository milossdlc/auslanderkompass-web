import type { CSSProperties, ReactNode } from "react";

export function Pill({
  tone,
  children,
  style,
}: {
  tone: "good" | "warn" | "muted" | "info";
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span className={"pill pill-" + tone} style={style}>
      {children}
    </span>
  );
}
