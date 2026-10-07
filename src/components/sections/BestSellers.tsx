"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

const list = [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)];

export function BestSellers() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Drag to scroll with the mouse (touch already scrolls natively).
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.style.removeProperty("scroll-snap-type");
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="desejados" className="relative overflow-hidden bg-ink-warm py-28 lg:py-40">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <div className="container-luxe">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Best sellers"
            lines={["Os mais", <em key="d" className="italic text-champagne">desejados.</em>]}
            intro="Os favoritos de quem já presenteou — e de quem se presenteou."
          />
          <div className="flex items-center gap-3" data-reveal="fade">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={edges.start}
              aria-label="Produtos anteriores"
              className="flex h-12 w-12 items-center justify-center border border-ivory/15 text-ivory/80 transition-all duration-500 hover:border-gold/60 hover:text-gold-light disabled:opacity-30"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={edges.end}
              aria-label="Próximos produtos"
              className="flex h-12 w-12 items-center justify-center border border-ivory/15 text-ivory/80 transition-all duration-500 hover:border-gold/60 hover:text-gold-light disabled:opacity-30"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label="Produtos mais desejados"
        tabIndex={0}
        className="slider-pad no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 lg:mt-20 cursor-grab active:cursor-grabbing"
        data-reveal="stagger"
      >
        {list.map((p, i) => (
          <div key={p.slug} data-slide className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[calc((min(100vw,1360px)_-_8rem_-_4.5rem)/4)]">
            <ProductCard product={p} priority={i < 2} />
          </div>
        ))}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>

      <div className="container-luxe mt-10 flex items-center gap-8">
        <div className="relative h-px flex-1 bg-ivory/10" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <Link href="/colecao/perfumes" className="link-underline inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
          Ver coleção completa <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
