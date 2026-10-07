import { useId } from "react";

/** Soft satin drape used as a backdrop for still-life compositions. */
export function Satin({ className = "", tone = "warm" }: { className?: string; tone?: "warm" | "rose" | "gold" }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const c =
    tone === "rose"
      ? ["#1a0f0e", "#4a2a26", "#8d5a50"]
      : tone === "gold"
        ? ["#140f09", "#4a3418", "#a8783a"]
        : ["#0d0b09", "#2c2117", "#6f4e2e"];
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}a`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="0.5" stopColor={c[1]} />
          <stop offset="1" stopColor={c[0]} />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor={c[0]} stopOpacity="0" />
          <stop offset="0.5" stopColor={c[2]} stopOpacity="0.55" />
          <stop offset="1" stopColor={c[0]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={c[0]} />
      <path d="M0 420 C160 340 260 470 420 400 C560 340 640 420 800 360 V600 H0 Z" fill={`url(#${id}a)`} />
      <path d="M0 470 C180 390 300 520 460 450 C600 390 680 470 800 420 V600 H0 Z" fill={`url(#${id}b)`} opacity="0.7" />
      <path d="M0 520 C200 460 320 560 500 500 C640 450 720 520 800 490 V600 H0 Z" fill={`url(#${id}a)`} opacity="0.9" />
      <path d="M-20 545 C210 500 330 590 520 530 C650 490 730 560 820 530" fill="none" stroke={c[2]} strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}
