import type { Tone } from "../types";

export function toneColor(tone: Tone): string {
  return (
    { good: "var(--good)", warn: "var(--warn)", muted: "var(--ink-faint)", info: "var(--primary)" }[
      tone
    ] || "var(--ink-faint)"
  );
}

export function toneClass(tone: Tone): string {
  return (
    { good: "pill-good", warn: "pill-warn", muted: "pill-muted", info: "pill-info" }[tone] ||
    "pill-muted"
  );
}
