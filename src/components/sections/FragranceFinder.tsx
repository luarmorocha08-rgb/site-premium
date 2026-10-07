"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { families, products, type Family } from "@/data/products";
import { whatsappLink } from "@/lib/site";
import { ScrollTrigger } from "@/lib/gsap";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";

/** Abstract motif per olfactory family — revealed on hover/selection. */
function Motif({ id }: { id: Family }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 0.6 } as const;
  switch (id) {
    case "floral":
      return (
        <g {...common}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="100" cy="62" rx="16" ry="40" transform={`rotate(${i * 45} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="8" />
        </g>
      );
    case "doce":
      return (
        <g {...common}>
          {Array.from({ length: 6 }).map((_, i) => (
            <path key={i} d={`M${30 + i * 4} ${100} C ${60} ${20 + i * 10}, ${140} ${180 - i * 10}, ${170 - i * 4} ${100}`} />
          ))}
        </g>
      );
    case "amadeirado":
      return (
        <g {...common}>
          {Array.from({ length: 9 }).map((_, i) => (
            <ellipse key={i} cx="100" cy="100" rx={12 + i * 10} ry={8 + i * 7} transform="rotate(-18 100 100)" />
          ))}
        </g>
      );
    case "fresco":
      return (
        <g {...common}>
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={i} d={`M10 ${50 + i * 16} Q 55 ${36 + i * 16} 100 ${50 + i * 16} T 190 ${50 + i * 16}`} />
          ))}
        </g>
      );
    case "intenso":
      return (
        <g {...common}>
          {Array.from({ length: 6 }).map((_, i) => (
            <path key={i} d={`M${70 + i * 12} 190 C ${40 + i * 14} 140, ${130 - i * 6} 100, ${90 + i * 8} 20`} />
          ))}
        </g>
      );
    default:
      return (
        <g {...common}>
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx="100" cy="100" r={14 + i * 12} />
          ))}
          <path d="M100 10 V190 M10 100 H190" strokeOpacity="0.5" />
        </g>
      );
  }
}

export function FragranceFinder() {
  const [selected, setSelected] = useState<Family | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);

  const fam = families.find((f) => f.id === selected);
  const matches = selected
    ? products
        .filter((p) => p.families.includes(selected))
        .sort((a, b) => Number(b.category === "perfumes") - Number(a.category === "perfumes"))
        .slice(0, 3)
    : [];

  const discover = () => {
    if (!selected) {
      setHint(true);
      return;
    }
    setRevealed(true);
    requestAnimationFrame(() => document.getElementById("finder-result")?.focus({ preventScroll: true }));
  };

  return (
    <section id="fragrancia" className="relative bg-ink py-28 lg:py-40">
      <div className="container-luxe">
        <SectionHeading
          align="center"
          eyebrow="Encontre sua fragrância"
          lines={["Qual fragrância", <em key="c" className="italic text-champagne">combina com você?</em>]}
          intro="Descubra aromas que combinam com sua personalidade."
        />

        <div role="radiogroup" aria-label="Famílias olfativas" className="mt-16 grid grid-cols-2 gap-px border border-ivory/[0.07] bg-ivory/[0.07] md:grid-cols-3 lg:mt-20" data-reveal="stagger">
          {families.map((f) => {
            const active = selected === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setSelected(f.id);
                  setHint(false);
                  setRevealed(false);
                }}
                className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden bg-ink p-5 text-left transition-colors duration-700 sm:aspect-[4/3] md:p-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{ background: `radial-gradient(ellipse 90% 80% at 70% 20%, ${f.tone[0]}38, ${f.tone[1]}66 45%, #050505 85%)` }}
                />
                <svg
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                  className={`absolute -right-6 -top-6 -z-10 h-[78%] w-[78%] transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active ? "rotate-0 scale-100 opacity-70" : "rotate-12 scale-90 opacity-15 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-60"
                  }`}
                  style={{ color: f.tone[0] }}
                >
                  <Motif id={f.id} />
                </svg>
                <span className={`absolute left-5 top-5 h-2 w-2 rounded-full border transition-colors duration-500 md:left-8 md:top-8 ${active ? "border-gold bg-gold" : "border-ivory/30"}`} />
                <span className="font-serif text-[1.9rem] font-light leading-none text-ivory md:text-[2.6rem]">{f.label}</span>
                <span className="mt-3 text-[0.72rem] leading-snug text-ivory/55 md:text-[0.8rem]">{f.mood}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? "scale-x-100" : "scale-x-0"}`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4" data-reveal="up">
          <button type="button" onClick={discover} className="btn btn-gold">
            Descobrir minha fragrância <ArrowRight className="btn-icon h-3.5 w-3.5" />
          </button>
          <p aria-live="polite" className={`text-[0.75rem] text-champagne/70 transition-opacity ${hint ? "opacity-100" : "opacity-0"}`}>
            Escolha uma família olfativa acima para começar.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {revealed && fam && (
            <motion.div
              key={fam.id}
              id="finder-result"
              tabIndex={-1}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => ScrollTrigger.refresh()}
              className="mt-16 border-t border-gold/15 pt-14 outline-none"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Sua família: {fam.label}</p>
                  <p className="mt-4 max-w-lg font-serif text-3xl font-light leading-snug text-ivory md:text-4xl">
                    {fam.mood} Separamos algumas escolhas para você.
                  </p>
                </div>
                <a
                  href={whatsappLink(`Olá, Bárbara! Fiz o teste no site e minha família olfativa é ${fam.label}. Pode me ajudar a escolher?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost shrink-0"
                >
                  <WhatsApp className="h-4 w-4 text-gold" /> Recomendação personalizada
                </a>
              </div>
              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
