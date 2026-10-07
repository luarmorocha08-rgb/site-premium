import { useId } from "react";

/** "B" monogram with satin bow, inspired by the Bárbara Presentes logotype. */
export function Monogram({ className, ring = true }: { className?: string; ring?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3d899" />
          <stop offset="0.45" stopColor="#c99445" />
          <stop offset="0.75" stopColor="#8a5b32" />
          <stop offset="1" stopColor="#e4bb73" />
        </linearGradient>
      </defs>
      {ring && (
        <circle data-logo-ring cx="50" cy="50" r="46" fill="none" stroke={`url(#${id}g)`} strokeWidth="1.2" pathLength={1} />
      )}
      <text
        data-logo-letter
        x="50"
        y="63"
        textAnchor="middle"
        fontSize="52"
        fill={`url(#${id}g)`}
        style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
      >
        B
      </text>
      <g data-logo-bow fill="none" stroke={`url(#${id}g)`} strokeWidth="1.3" strokeLinecap="round">
        <path d="M50 74 C44 66 34 66 36 72 C37 77 46 76 50 74 Z" />
        <path d="M50 74 C56 66 66 66 64 72 C63 77 54 76 50 74 Z" />
        <path d="M49 75 L44 84 M51 75 L56 84" />
      </g>
    </svg>
  );
}

export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram className="h-10 w-10 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-script text-[1.65rem] leading-[0.9] text-champagne">Bárbara</span>
          <span className="mt-1 text-[0.5rem] font-medium tracking-[0.5em] text-gold">PRESENTES</span>
        </span>
      )}
    </span>
  );
}
