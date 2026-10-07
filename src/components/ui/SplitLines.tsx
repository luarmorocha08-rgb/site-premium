import type { ReactNode } from "react";

/** Line-by-line mask reveal. Pair with data-reveal="lines" (or the hero timeline). */
export function SplitLines({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </span>
  );
}
