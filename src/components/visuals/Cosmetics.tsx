import { useId } from "react";
import { MetalStops } from "./Bottle";

const uid = (raw: string) => raw.replace(/[^a-zA-Z0-9]/g, "");

function Shadow({ id, cx, cy, rx }: { id: string; cx: number; cy: number; rx: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.85" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.1} fill={`url(#${id}sh)`} />
    </>
  );
}

export function Jar({ tone = ["#F3E6CF", "#C9A979"], className }: { tone?: [string, string]; className?: string }) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 240 210" className={className} role="img" aria-label="Pote de creme Bárbara Presentes" overflow="visible">
      <defs>
        <linearGradient id={`${id}m`} x1="0" x2="1">
          <MetalStops />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor={tone[1]} />
          <stop offset="0.3" stopColor={tone[0]} />
          <stop offset="0.55" stopColor="#fffaf0" />
          <stop offset="0.8" stopColor={tone[0]} />
          <stop offset="1" stopColor={tone[1]} />
        </linearGradient>
        <linearGradient id={`${id}v`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <Shadow id={id} cx={120} cy={196} rx={104} />
      <rect x="30" y="92" width="180" height="104" rx="16" fill={`url(#${id}b)`} />
      <rect x="30" y="92" width="180" height="104" rx="16" fill={`url(#${id}v)`} />
      <rect x="38" y="44" width="164" height="52" rx="6" fill={`url(#${id}m)`} />
      <rect x="38" y="44" width="164" height="6" rx="3" fill="#fff4d8" opacity="0.35" />
      <rect x="38" y="88" width="164" height="4" fill="#000" opacity="0.35" />
      <text x="120" y="152" textAnchor="middle" fontSize="30" fill="#3a2a1a" style={{ fontFamily: "var(--font-serif)" }}>
        B
      </text>
      <text x="120" y="172" textAnchor="middle" fontSize="6.5" letterSpacing="3" fill="#5c4630" style={{ fontFamily: "var(--font-sans)" }}>
        BÁRBARA
      </text>
    </svg>
  );
}

export function Serum({ liquid = ["#F5D898", "#B07A2A"], className }: { liquid?: [string, string]; className?: string }) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 160 370" className={className} role="img" aria-label="Sérum com conta-gotas" overflow="visible">
      <defs>
        <linearGradient id={`${id}m`} x1="0" x2="1">
          <MetalStops />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" x2="1">
          <stop offset="0" stopColor="#050505" />
          <stop offset="0.35" stopColor="#3a332c" />
          <stop offset="0.55" stopColor="#14110e" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={liquid[0]} stopOpacity="0.9" />
          <stop offset="1" stopColor={liquid[1]} />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <Shadow id={id} cx={80} cy={356} rx={70} />
      <path d="M62 64 C62 20 98 20 98 64 V108 H62 Z" fill={`url(#${id}r)`} />
      <rect x="54" y="106" width="52" height="46" rx="3" fill={`url(#${id}m)`} />
      <rect x="28" y="150" width="104" height="202" rx="14" fill={`url(#${id}l)`} />
      <rect x="28" y="150" width="104" height="202" rx="14" fill={`url(#${id}g)`} stroke="#fff3dd" strokeOpacity="0.3" />
      <rect x="76" y="152" width="8" height="160" rx="4" fill="#fff" opacity="0.18" />
      <rect x="36" y="162" width="8" height="180" rx="4" fill="#fff" opacity="0.28" />
      <rect x="44" y="232" width="72" height="62" fill="#0d0b09" opacity="0.88" />
      <rect x="48" y="236" width="64" height="54" fill="none" stroke="#c99445" strokeWidth="0.6" />
      <text x="80" y="262" textAnchor="middle" fontSize="18" fill="#e4bb73" style={{ fontFamily: "var(--font-serif)" }}>
        B
      </text>
      <text x="80" y="279" textAnchor="middle" fontSize="5" letterSpacing="2" fill="#e7d1ac" style={{ fontFamily: "var(--font-sans)" }}>
        SÉRUM
      </text>
    </svg>
  );
}

export function Lipstick({ tone = "#A4524A", className }: { tone?: string; className?: string }) {
  const id = uid(useId());
  return (
    <svg viewBox="0 0 120 350" className={className} role="img" aria-label="Batom em embalagem dourada" overflow="visible">
      <defs>
        <linearGradient id={`${id}m`} x1="0" x2="1">
          <MetalStops />
        </linearGradient>
        <linearGradient id={`${id}t`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <Shadow id={id} cx={60} cy={338} rx={50} />
      <path d="M36 122 V44 Q36 30 50 24 L84 10 V122 Z" fill={tone} />
      <path d="M36 122 V44 Q36 30 50 24 L84 10 V122 Z" fill={`url(#${id}t)`} />
      <rect x="30" y="118" width="60" height="62" rx="2" fill={`url(#${id}m)`} />
      <rect x="22" y="178" width="76" height="156" rx="3" fill="#0b0a09" />
      <rect x="22" y="178" width="76" height="156" rx="3" fill={`url(#${id}t)`} opacity="0.7" />
      <rect x="22" y="178" width="76" height="10" fill={`url(#${id}m)`} />
      <rect x="22" y="318" width="76" height="16" rx="2" fill={`url(#${id}m)`} />
      <text x="60" y="262" textAnchor="middle" fontSize="22" fill="#c99445" style={{ fontFamily: "var(--font-serif)" }}>
        B
      </text>
    </svg>
  );
}
