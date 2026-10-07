"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/site";
import { Bottle } from "@/components/visuals/Bottle";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitLines } from "@/components/ui/SplitLines";
import { ArrowRight } from "@/components/ui/Icons";

export function Featured() {
  const root = useRef<HTMLElement>(null);
  const product = getProduct("rose-satin")!;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
        tl.fromTo("[data-f='product']", { yPercent: 22 }, { yPercent: -16 }, 0)
          .fromTo("[data-f='spot']", { scale: 0.7, opacity: 0.25 }, { scale: 1.15, opacity: 1 }, 0)
          .fromTo("[data-f='halo']", { rotate: -12 }, { rotate: 12 }, 0)
          .fromTo("[data-f='left']", { xPercent: -14, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 }, 0.1)
          .fromTo("[data-f='right']", { xPercent: 14, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 }, 0.18)
          .fromTo("[data-f='bg']", { yPercent: -10 }, { yPercent: 10 }, 0)
          .fromTo("[data-f='tint']", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.25)
          .to("[data-f='tint']", { opacity: 0.2, duration: 0.25 }, 0.75);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="fragrancias" ref={root} className="relative isolate overflow-hidden bg-ink py-28 lg:min-h-[115vh] lg:flex lg:items-center lg:py-40">
      <div aria-hidden="true" data-f="bg" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(138,91,50,0.28),transparent_70%)]" />
        <div
          data-f="tint"
          className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_45%,rgba(162,72,79,0.22),transparent_70%)] opacity-0"
        />
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center font-serif text-[22vw] font-light italic leading-none text-ivory/[0.025]"
      >
        Satin
      </p>

      <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div data-f="left" className="lg:col-span-4">
          <p className="eyebrow" data-reveal="fade">
            Fragrância em destaque
          </p>
          <h2 className="display mt-6 text-[clamp(2.6rem,4.2vw,4.1rem)]" data-reveal="lines">
            <SplitLines lines={["Uma fragrância.", <em key="m" className="italic text-champagne">Uma memória.</em>]} />
          </h2>
          <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-ivory/65" data-reveal="up">
            Descubra fragrâncias selecionadas para marcar momentos, despertar sensações e contar histórias.
          </p>
          <div className="mt-10" data-reveal="up" data-delay="0.1">
            <Magnetic>
              <Link href="/colecao/perfumes" className="btn btn-gold">
                Conhecer fragrâncias <ArrowRight className="btn-icon h-3.5 w-3.5" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="relative mx-auto flex h-[64svh] w-full max-w-[460px] items-center justify-center lg:col-span-4 lg:h-[86vh] lg:max-w-none">
          <div data-f="spot" aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="h-[86%] w-[110%] rounded-full bg-[radial-gradient(circle,rgba(228,187,115,0.4)_0%,rgba(201,148,69,0.14)_38%,transparent_68%)] blur-xl" />
          </div>
          <div data-f="halo" aria-hidden="true" className="absolute aspect-square w-[88%] rounded-full border border-gold/20">
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light shadow-[0_0_12px_rgba(228,187,115,0.9)]" />
          </div>
          <div data-f="product" className="relative w-[64%]">
            <Link href={`/produto/${product.slug}`} data-cursor="Ver" aria-label={`Ver ${product.name}`}>
              <Bottle variant="round" liquid={["#F2B7AE", "#A2484F"]} reflection className="w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.65)]" title={`${product.name} — ${product.subtitle}`} />
            </Link>
          </div>
        </div>

        <div data-f="right" className="lg:col-span-3 lg:col-start-10">
          <div className="border-l border-gold/20 pl-7">
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-ivory/50">{product.subtitle}</p>
            <h3 className="mt-3 font-serif text-4xl font-light">{product.name}</h3>
            <p className="mt-2 text-sm text-gold-light">{formatPrice(product.price)}</p>
            {product.notes && (
              <dl className="mt-8 space-y-5 text-sm">
                {(
                  [
                    ["Saída", product.notes.top],
                    ["Coração", product.notes.heart],
                    ["Fundo", product.notes.base],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">{k}</dt>
                    <dd className="mt-1.5 text-ivory/70">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Link href={`/produto/${product.slug}`} className="link-underline mt-9 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
              Ver detalhes <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
