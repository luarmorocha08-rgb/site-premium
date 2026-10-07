import { useId } from "react";
import { MetalStops } from "./Bottle";

/** Rigid gift box with satin ribbon and bow. */
export function GiftBox({ box = "black", className }: { box?: "black" | "champagne"; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const dark = box === "black";
  const face: [string, string, string] = dark ? ["#24201b", "#121010", "#060606"] : ["#f1e4cb", "#dcc59f", "#b39466"];
  const ink = dark ? "#c99445" : "#5c4630";

  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label="Caixa de presente com laço de cetim" overflow="visible">
      <defs>
        <linearGradient id={`${id}f`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={face[0]} />
          <stop offset="0.55" stopColor={face[1]} />
          <stop offset="1" stopColor={face[2]} />
        </linearGradient>
        <linearGradient id={`${id}lid`} x1="0" x2="1">
          <stop offset="0" stopColor={face[2]} />
          <stop offset="0.4" stopColor={face[0]} />
          <stop offset="1" stopColor={face[2]} />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" x2="1">
          <MetalStops />
        </linearGradient>
        <linearGradient id={`${id}rv`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff2d0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={`${id}sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.9" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="290" rx="140" ry="12" fill={`url(#${id}sh)`} />
      {/* Body */}
      <rect x="44" y="146" width="212" height="140" fill={`url(#${id}f)`} />
      <rect x="44" y="146" width="212" height="12" fill="#000" opacity="0.35" />
      {/* Lid */}
      <rect x="32" y="110" width="236" height="42" rx="1" fill={`url(#${id}lid)`} />
      <rect x="32" y="110" width="236" height="2" fill="#fff" opacity={dark ? 0.18 : 0.5} />
      {/* Ribbon */}
      <rect x="138" y="110" width="24" height="176" fill={`url(#${id}r)`} />
      <rect x="138" y="110" width="24" height="176" fill={`url(#${id}rv)`} />
      {/* Bow tails */}
      <path d="M146 116 L114 176 L126 170 L134 182 L156 118 Z" fill={`url(#${id}r)`} />
      <path d="M154 116 L186 176 L174 170 L166 182 L144 118 Z" fill={`url(#${id}r)`} opacity="0.92" />
      {/* Bow loops */}
      <path d="M150 112 C122 62 66 58 80 98 C88 120 126 118 150 112 Z" fill={`url(#${id}r)`} />
      <path d="M150 112 C178 62 234 58 220 98 C212 120 174 118 150 112 Z" fill={`url(#${id}r)`} />
      <path d="M150 112 C128 80 96 76 98 96 C102 110 128 112 150 112 Z" fill="#000" opacity="0.28" />
      <path d="M150 112 C172 80 204 76 202 96 C198 110 172 112 150 112 Z" fill="#000" opacity="0.28" />
      <rect x="138" y="100" width="24" height="22" rx="7" fill={`url(#${id}r)`} />
      <rect x="138" y="100" width="24" height="22" rx="7" fill={`url(#${id}rv)`} />
      {/* Monogram */}
      <text x="96" y="230" textAnchor="middle" fontSize="28" fill={ink} style={{ fontFamily: "var(--font-script)" }}>
        Bárbara
      </text>
      <text x="96" y="248" textAnchor="middle" fontSize="5.5" letterSpacing="3" fill={ink} style={{ fontFamily: "var(--font-sans)" }}>
        PRESENTES
      </text>
    </svg>
  );
}
