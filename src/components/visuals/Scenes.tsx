import { Bottle } from "./Bottle";
import { Jar, Lipstick, Serum } from "./Cosmetics";
import { GiftBox } from "./GiftBox";
import { Satin } from "./Satin";
import { Monogram } from "./Logo";

/**
 * Art-directed still lifes (satin, light, product) used where editorial photography would go.
 * Swap any scene for <Image> once the brand's photo shoot is available.
 */
export type SceneName = "perfumes" | "cosmeticos" | "presentes" | "about" | "decants" | "rose" | "noir";

function Light({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full bg-[radial-gradient(circle,rgba(228,187,115,0.35),rgba(201,148,69,0.08)_45%,transparent_70%)] ${className}`}
    />
  );
}

export function Scene({ name, className = "", lift = false }: { name: SceneName; className?: string; lift?: boolean }) {
  const base = lift ? "bottom-[34%]" : "bottom-[10%]";
  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-warm ${className}`}>
      {name === "perfumes" && (
        <>
          <Satin className="absolute inset-0 h-full w-full" tone="warm" />
          <Light className="left-1/2 top-[18%] h-[70%] w-[90%] -translate-x-1/2" />
          <div className={`absolute inset-x-0 ${base} flex items-end justify-center gap-[2%]`}>
            <Bottle variant="round" liquid={["#F2B7AE", "#A2484F"]} className="w-[24%]" />
            <Bottle variant="classic" liquid={["#E9A75A", "#7A3A12"]} className="w-[34%]" />
            <Bottle variant="slim" liquid={["#F6EBC0", "#C9A75B"]} className="w-[18%]" />
          </div>
        </>
      )}
      {name === "cosmeticos" && (
        <>
          <Satin className="absolute inset-0 h-full w-full" tone="rose" />
          <Light className="left-1/2 top-[20%] h-[65%] w-[90%] -translate-x-1/2" />
          <div className={`absolute inset-x-0 ${base} flex items-end justify-center gap-[4%]`}>
            <Lipstick className="w-[13%]" />
            <Serum className="w-[20%]" />
            <Jar className="w-[36%]" />
          </div>
        </>
      )}
      {name === "presentes" && (
        <>
          <Satin className="absolute inset-0 h-full w-full" tone="gold" />
          <Light className="left-[55%] top-[10%] h-[80%] w-[70%] -translate-x-1/2" />
          <div className={`absolute inset-x-0 ${base} flex items-end justify-center gap-[3%]`}>
            <GiftBox box="champagne" className="w-[22%]" />
            <GiftBox box="black" className="w-[34%]" />
            <Bottle variant="facet" liquid={["#F4D08A", "#9A6420"]} className="w-[14%]" />
          </div>
        </>
      )}
      {name === "about" && (
        <>
          <Satin className="absolute inset-0 h-full w-full" tone="warm" />
          <Light className="left-1/2 top-[8%] h-[70%] w-[110%] -translate-x-1/2" />
          <div className="absolute inset-x-[16%] bottom-[8%] top-[10%] rounded-t-full border border-gold/30" />
          <Monogram className="absolute left-1/2 top-[17%] w-[22%] -translate-x-1/2 opacity-90" ring={false} />
          <div className="absolute inset-x-0 bottom-[10%] flex items-end justify-center gap-[2%]">
            <GiftBox box="black" className="w-[30%]" />
            <Bottle variant="round" liquid={["#E4C6E8", "#7D4C86"]} className="w-[22%]" />
          </div>
        </>
      )}
      {name === "decants" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#2a1d10,#0a0806_70%)]" />
          <Light className="left-1/2 top-[5%] h-[80%] w-[100%] -translate-x-1/2" />
          <div className="absolute inset-x-0 bottom-[14%] flex items-end justify-center gap-[5%]">
            {(
              [
                ["#F2B7AE", "#A2484F"],
                ["#E9A75A", "#7A3A12"],
                ["#F6EBC0", "#C9A75B"],
              ] as [string, string][]
            ).map((l, i) => (
              <Bottle key={i} variant="slim" liquid={l} className="w-[16%]" />
            ))}
          </div>
          <p className="absolute inset-x-0 top-[12%] text-center font-script text-[clamp(1.6rem,5vw,2.6rem)] text-champagne">Decants</p>
        </>
      )}
      {name === "rose" && (
        <>
          <Satin className="absolute inset-0 h-full w-full" tone="rose" />
          <Light className="left-1/2 top-[10%] h-[80%] w-[100%] -translate-x-1/2" />
          <div className="absolute inset-x-0 bottom-[8%] flex justify-center">
            <Bottle variant="round" liquid={["#F2B7AE", "#A2484F"]} className="w-[46%]" />
          </div>
        </>
      )}
      {name === "noir" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#1d1712,#050505_70%)]" />
          <Light className="left-1/2 top-[0%] h-[70%] w-[90%] -translate-x-1/2 opacity-70" />
          <div className="absolute inset-x-0 bottom-[8%] flex justify-center">
            <Bottle variant="classic" liquid={["#5B4A3A", "#1A120C"]} cap="black" className="w-[44%]" />
          </div>
        </>
      )}
    </div>
  );
}
