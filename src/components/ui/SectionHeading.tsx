import type { ReactNode } from "react";
import { SplitLines } from "./SplitLines";

export function SectionHeading({
  eyebrow,
  lines,
  intro,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  lines: ReactNode[];
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow flex items-center gap-4 ${center ? "justify-center" : ""}`} data-reveal="fade">
          <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          {eyebrow}
          {center && <span className="h-px w-8 bg-gold/60" aria-hidden="true" />}
        </p>
      )}
      <Tag className="display mt-6 text-[clamp(2.6rem,6.2vw,5.6rem)] text-ivory" data-reveal="lines">
        <SplitLines lines={lines} />
      </Tag>
      {intro && (
        <p
          className={`mt-7 max-w-xl text-[0.95rem] leading-relaxed text-ivory/65 ${center ? "mx-auto" : ""}`}
          data-reveal="up"
          data-delay="0.15"
        >
          {intro}
        </p>
      )}
    </div>
  );
}
