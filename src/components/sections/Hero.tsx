"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useReady } from "@/hooks/useReady";
import { whatsappLink } from "@/lib/site";
import { Bottle } from "@/components/visuals/Bottle";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitLines } from "@/components/ui/SplitLines";
import { ArrowDown, ArrowRight, Gift, Sparkle, Truck, WhatsApp } from "@/components/ui/Icons";

const Particles = dynamic(() => import("@/components/visuals/Particles").then((m) => m.Particles), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useReady();

  // Entrance — runs once the intro has finished.
  useGSAP(
    () => {
      if (!ready) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(q("[data-hero='glow']"), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 2.4 }, 0)
          .fromTo(q("[data-hero='arch']"), { autoAlpha: 0, scaleY: 0.85 }, { autoAlpha: 1, scaleY: 1, duration: 2, transformOrigin: "bottom center" }, 0.1)
          .fromTo(q("[data-hero='product']"), { autoAlpha: 0, y: 90, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 2.2 }, 0.15)
          .fromTo(q("[data-hero='brand']"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.3)
          .set(q("[data-hero='title']"), { autoAlpha: 1 }, 0.35)
          .fromTo(q("[data-hero='title'] .line-inner"), { y: 0, yPercent: 115 }, { yPercent: 0, duration: 1.6, stagger: 0.12 }, 0.35)
          .fromTo(q("[data-hero='fade']"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.1 }, 0.75)
          .fromTo(q("[data-hero='side']"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, 1.1);
      });
      mm.add(MQ.reduce, () => {
        gsap.set(q("[data-hero]"), { autoAlpha: 1 });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] },
  );

  // Mouse depth + scroll-out parallax (desktop only).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.fine}`, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", root.current);
        const setters = layers.map((el) => ({
          depth: parseFloat(el.dataset.depth ?? "0"),
          x: gsap.quickTo(el, "x", { duration: 1.6, ease: "expo.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.6, ease: "expo.out" }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.depth * 60);
            s.y(ny * s.depth * 40);
          });
        };
        window.addEventListener("pointermove", move, { passive: true });

        gsap.to("[data-hero-scroll='content']", {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-scroll='visual']", {
          yPercent: 12,
          scale: 0.96,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => window.removeEventListener("pointermove", move);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="inicio"
      aria-label="Bárbara Presentes"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-[72px] lg:pt-[84px]"
    >
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_45%,rgba(138,91,50,0.32),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_100%,rgba(201,148,69,0.08),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      {ready && <Particles className="-z-10" />}

      <div className="container-luxe relative grid flex-1 grid-cols-1 items-center gap-6 pb-24 pt-6 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        {/* Visual */}
        <div
          data-hero-scroll="visual"
          className="relative order-1 mx-auto flex h-[44svh] w-full max-w-[420px] items-end justify-center lg:order-2 lg:col-span-6 lg:col-start-7 lg:h-[78svh] lg:max-w-none"
        >
          <div data-depth="0.25" className="absolute inset-0 flex items-center justify-center">
            <div
              data-hero="glow"
              className="animate-glow h-[80%] w-[80%] rounded-full bg-[radial-gradient(circle,rgba(228,187,115,0.38)_0%,rgba(201,148,69,0.16)_35%,transparent_68%)] blur-2xl"
            />
          </div>
          <div data-depth="0.12" className="absolute inset-x-[14%] bottom-[6%] top-[4%] lg:inset-x-[18%]">
            <div
              data-hero="arch"
              className="h-full w-full rounded-t-full border border-gold/25 bg-gradient-to-b from-gold/[0.06] to-transparent"
            />
          </div>
          <div data-depth="0.5" className="absolute bottom-[16%] left-[2%] w-[24%] opacity-60 blur-[1.5px] lg:left-[6%]" aria-hidden="true">
            <div data-hero="product">
              <Bottle variant="round" liquid={["#F2B7AE", "#A2484F"]} className="w-full" />
            </div>
          </div>
          <div data-depth="0.8" className="relative z-10 h-[96%]">
            <div data-hero="product" className="h-full">
              <div className="animate-float h-full">
                <Bottle variant="classic" liquid={["#E9A75A", "#7A3A12"]} reflection className="h-full w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" title="Âmbar Noir — Eau de Parfum" />
              </div>
            </div>
          </div>
          <div data-depth="1.2" className="absolute bottom-[10%] right-[0%] w-[18%] lg:right-[4%]" aria-hidden="true">
            <div data-hero="product">
              <Bottle variant="slim" liquid={["#F6EBC0", "#C9A75B"]} className="w-full" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div data-hero-scroll="content" className="relative z-10 order-2 lg:order-1 lg:col-span-6">
          <h1>
            <span data-hero="brand" className="eyebrow mb-6 flex items-center gap-4 lg:mb-8">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              Bárbara Presentes
              <span className="hidden text-ivory/40 sm:inline">·</span>
              <span className="hidden text-ivory/60 sm:inline">Perfumaria</span>
            </span>
            <span data-hero="title" className="display block text-[clamp(2.7rem,6.2vw,5.6rem)] text-ivory">
              <SplitLines
                lines={[
                  "Presentes que encantam.",
                  <>
                    Momentos que <em className="gold-text animate-shimmer-once font-normal italic">ficam.</em>
                  </>,
                ]}
              />
            </span>
          </h1>
          <p data-hero="fade" className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-ivory/65 lg:mt-9">
            Perfumes, cosméticos e presentes selecionados para transformar pequenos gestos em momentos inesquecíveis.
          </p>
          <div data-hero="fade" className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-11">
            <Magnetic>
              <a href="#descubra" className="btn btn-gold w-full sm:w-auto">
                Descobrir produtos <ArrowRight className="btn-icon h-3.5 w-3.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full sm:w-auto">
                <WhatsApp className="h-4 w-4 text-gold" /> Falar pelo WhatsApp
              </a>
            </Magnetic>
          </div>
          <ul
            data-hero="fade"
            className="mt-12 hidden max-w-lg grid-cols-3 divide-x divide-gold/15 border-y border-gold/15 py-5 text-[0.66rem] uppercase tracking-[0.18em] text-ivory/60 sm:grid lg:mt-16"
          >
            <li className="flex items-center gap-3 pr-4">
              <Sparkle className="h-4 w-4 shrink-0 text-gold" /> Seleção autoral
            </li>
            <li className="flex items-center gap-3 px-4">
              <Gift className="h-4 w-4 shrink-0 text-gold" /> Embalagem presente
            </li>
            <li className="flex items-center gap-3 pl-4">
              <Truck className="h-4 w-4 shrink-0 text-gold" /> Todo o Brasil
            </li>
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#descubra"
        data-hero="side"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.58rem] uppercase tracking-[0.35em] text-ivory/50 transition-colors hover:text-gold-light"
      >
        Scroll to discover <ArrowDown className="h-3 w-3" />
        <span className="relative block h-10 w-px overflow-hidden bg-ivory/10">
          <span className="animate-scroll-cue absolute inset-0 bg-gold" />
        </span>
      </a>
      <p
        data-hero="side"
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-180 text-[0.56rem] uppercase tracking-[0.5em] text-ivory/35 [writing-mode:vertical-rl] xl:block"
      >
        Perfumes — Cosméticos — Presentes
      </p>
    </section>
  );
}
