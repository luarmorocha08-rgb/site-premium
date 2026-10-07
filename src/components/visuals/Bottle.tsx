import { useId } from "react";

export type BottleVariant = "classic" | "round" | "slim" | "facet";

interface BottleProps {
  variant?: BottleVariant;
  liquid?: [string, string];
  cap?: "gold" | "black";
  label?: string;
  reflection?: boolean;
  className?: string;
  title?: string;
}

const W = 200;
const H = 360;

/** Metal gradient stops used for caps, collars and medallions. */
export function MetalStops({ tone = "gold" }: { tone?: "gold" | "black" }) {
  if (tone === "black") {
    return (
      <>
        <stop offset="0" stopColor="#050505" />
        <stop offset="0.2" stopColor="#2a2622" />
        <stop offset="0.38" stopColor="#6d655b" />
        <stop offset="0.5" stopColor="#1d1a17" />
        <stop offset="0.78" stopColor="#0b0a09" />
        <stop offset="0.9" stopColor="#3b352f" />
        <stop offset="1" stopColor="#060606" />
      </>
    );
  }
  return (
    <>
      <stop offset="0" stopColor="#4e3116" />
      <stop offset="0.16" stopColor="#b88539" />
      <stop offset="0.34" stopColor="#f7dfa4" />
      <stop offset="0.48" stopColor="#c99445" />
      <stop offset="0.7" stopColor="#7d5228" />
      <stop offset="0.86" stopColor="#e4bb73" />
      <stop offset="1" stopColor="#5a3818" />
    </>
  );
}

function shapes(variant: BottleVariant) {
  switch (variant) {
    case "round":
      return {
        cap: <rect x="78" y="10" width="44" height="84" rx="2" />,
        collar: <rect x="83" y="92" width="34" height="16" rx="1" />,
        body: <path d="M86 106 H114 V160 C160 170 192 205 192 254 C192 308 150 348 100 348 C50 348 8 308 8 254 C8 205 40 170 86 160 Z" />,
        liquid: <ellipse cx="100" cy="258" rx="78" ry="80" />,
        liquidTop: 196,
        label: { x: 100, y: 262, r: 30, round: true },
        highlight: <path d="M30 220 C24 250 28 290 50 318 C40 290 38 252 46 222 Z" />,
        base: <path d="M40 330 C70 350 130 350 160 330 C140 342 60 342 40 330 Z" />,
      };
    case "slim":
      return {
        cap: <rect x="74" y="4" width="52" height="100" rx="3" />,
        collar: <rect x="82" y="102" width="36" height="12" rx="1" />,
        body: <rect x="48" y="112" width="104" height="236" rx="6" />,
        liquid: <rect x="58" y="138" width="84" height="200" rx="3" />,
        liquidTop: 138,
        label: { x: 66, y: 218, w: 68, h: 62 },
        highlight: <rect x="56" y="122" width="8" height="214" rx="4" />,
        base: <rect x="52" y="322" width="96" height="22" rx="3" />,
      };
    case "facet":
      return {
        cap: <path d="M76 12 H124 L134 26 V76 L124 88 H76 L66 76 V26 Z" />,
        collar: <rect x="82" y="88" width="36" height="14" rx="1" />,
        body: <path d="M54 100 H146 L184 140 V306 L146 346 H54 L16 306 V140 Z" />,
        liquid: <path d="M60 128 H140 L170 152 V298 L140 332 H60 L30 298 V152 Z" />,
        liquidTop: 128,
        label: { x: 62, y: 198, w: 76, h: 78 },
        highlight: <path d="M24 146 L36 136 V302 L24 296 Z" />,
        base: <path d="M30 312 L56 338 H144 L170 312 L150 330 H50 Z" />,
      };
    default:
      return {
        cap: <rect x="64" y="8" width="72" height="76" rx="3" />,
        collar: <rect x="79" y="82" width="42" height="18" rx="1" />,
        body: <rect x="20" y="98" width="160" height="250" rx="16" />,
        liquid: <rect x="33" y="126" width="134" height="208" rx="8" />,
        liquidTop: 126,
        label: { x: 58, y: 196, w: 84, h: 84 },
        highlight: <rect x="28" y="110" width="10" height="226" rx="5" />,
        base: <rect x="26" y="318" width="148" height="26" rx="10" />,
      };
  }
}

/**
 * Art-directed perfume bottle rendered in SVG: glass, liquid, metallic cap and label.
 * Lightweight (no raster) and crisp at any size.
 */
export function Bottle({
  variant = "classic",
  liquid = ["#E9A75A", "#7A3A12"],
  cap = "gold",
  label = "BÁRBARA",
  reflection = false,
  className,
  title = "Frasco de perfume Bárbara Presentes",
}: BottleProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = shapes(variant);
  const height = reflection ? H + 150 : H + 14;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className={className} role="img" aria-label={title} overflow="visible">
      <defs>
        <linearGradient id={`${id}m`} x1="0" x2="1" y1="0" y2="0">
          <MetalStops tone={cap} />
        </linearGradient>
        <linearGradient id={`${id}mt`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff3d6" stopOpacity={cap === "gold" ? 0.55 : 0.25} />
          <stop offset="0.12" stopColor="#fff3d6" stopOpacity="0" />
          <stop offset="0.9" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff8ea" stopOpacity="0.2" />
          <stop offset="0.12" stopColor="#fff8ea" stopOpacity="0.05" />
          <stop offset="0.55" stopColor="#fff8ea" stopOpacity="0.03" />
          <stop offset="0.88" stopColor="#fff8ea" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff8ea" stopOpacity="0.24" />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={liquid[0]} stopOpacity="0.92" />
          <stop offset="1" stopColor={liquid[1]} stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id={`${id}ls`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.22" stopColor="#000" stopOpacity="0" />
          <stop offset="0.62" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${id}h`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}lb`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3e3c4" />
          <stop offset="1" stopColor="#d9bf93" />
        </linearGradient>
        <radialGradient id={`${id}sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.85" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}lc`}>
          <rect x="0" y={s.liquidTop} width={W} height={H} />
        </clipPath>
        {reflection && (
          <linearGradient id={`${id}rf`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        )}
        {reflection && (
          <mask id={`${id}rm`} maskUnits="userSpaceOnUse" x="0" y={H} width={W} height="150">
            <rect x="0" y={H} width={W} height="150" fill={`url(#${id}rf)`} />
          </mask>
        )}

        <g id={`${id}b`}>
          {/* Liquid */}
          <g clipPath={`url(#${id}lc)`}>
            <g fill={`url(#${id}l)`}>{s.liquid}</g>
            <g fill={`url(#${id}ls)`}>{s.liquid}</g>
          </g>
          {/* Glass body */}
          <g fill={`url(#${id}g)`} stroke="#fff3dd" strokeOpacity="0.28" strokeWidth="1">
            {s.body}
          </g>
          <g fill="#fff6e6" opacity="0.08">
            {s.base}
          </g>
          <g fill={`url(#${id}h)`}>{s.highlight}</g>
          {/* Label */}
          {s.label.r !== undefined ? (
            <g>
              <circle cx={s.label.x} cy={s.label.y} r={s.label.r} fill={`url(#${id}m)`} />
              <circle cx={s.label.x} cy={s.label.y} r={s.label.r! - 3} fill="#0d0b09" />
              <circle cx={s.label.x} cy={s.label.y} r={s.label.r! - 6} fill="none" stroke="#c99445" strokeOpacity="0.6" strokeWidth="0.6" />
              <text
                x={s.label.x}
                y={s.label.y + 9}
                textAnchor="middle"
                fontSize="26"
                fill="#e4bb73"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                B
              </text>
            </g>
          ) : (
            <g>
              <rect x={s.label.x} y={s.label.y} width={s.label.w} height={s.label.h} fill={`url(#${id}lb)`} opacity="0.94" />
              <rect
                x={s.label.x + 4}
                y={s.label.y + 4}
                width={s.label.w - 8}
                height={s.label.h - 8}
                fill="none"
                stroke="#8a5b32"
                strokeWidth="0.6"
              />
              <text
                x={s.label.x + s.label.w / 2}
                y={s.label.y + s.label.h * 0.48}
                textAnchor="middle"
                fontSize="24"
                fill="#1a140e"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                B
              </text>
              <text
                x={s.label.x + s.label.w / 2}
                y={s.label.y + s.label.h * 0.7}
                textAnchor="middle"
                fontSize="6"
                letterSpacing="2.2"
                fill="#1a140e"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </text>
              <text
                x={s.label.x + s.label.w / 2}
                y={s.label.y + s.label.h * 0.84}
                textAnchor="middle"
                fontSize="3.8"
                letterSpacing="1.4"
                fill="#5c4630"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                EAU DE PARFUM
              </text>
            </g>
          )}
          {/* Collar + cap */}
          <g fill={`url(#${id}m)`}>{s.collar}</g>
          <g fill={`url(#${id}m)`}>{s.cap}</g>
          <g fill={`url(#${id}mt)`}>{s.cap}</g>
        </g>
      </defs>

      <ellipse cx="100" cy={H - 6} rx="92" ry="10" fill={`url(#${id}sh)`} />
      <use href={`#${id}b`} />
      {reflection && (
        <g mask={`url(#${id}rm)`} opacity="0.55">
          <use href={`#${id}b`} transform={`translate(0 ${H * 2 - 4}) scale(1 -1)`} />
        </g>
      )}
    </svg>
  );
}
