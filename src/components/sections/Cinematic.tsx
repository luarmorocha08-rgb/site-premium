"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Bottle } from "@/components/visuals/Bottle";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight } from "@/components/ui/Icons";

const scenes = ["Escuridão", "Luz", "Revelação", "Memória", "Encontro"];

/**
 * Scroll-driven film in five scenes. CSS sticky keeps the stage in view while
 * a scrubbed GSAP timeline maps scroll progress to light, product and copy.
 */
export function Cinematic() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desk: "(min-width: 1024px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desk = !!ctx.conditions.desk;
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const i = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
              q("[data-c='tick']").forEach((t, j) => t.classList.toggle("is-active", j <= i));
            },
          },
        });

        // Scene 01 → partially visible in the dark
        tl.set(q("[data-c='dark']"), { "--r": "6%" })
          .fromTo(q("[data-c='bottle']"), { filter: "brightness(0.12) contrast(1.1)", scale: 0.92, yPercent: 6 }, { filter: "brightness(0.35) contrast(1.1)", duration: 1 }, 0)
          // Scene 02 → golden light starts revealing
          .fromTo(q("[data-c='glow']"), { opacity: 0, scale: 0.5 }, { opacity: 0.7, scale: 0.9, duration: 1 }, 0.8)
          .to(q("[data-c='dark']"), { "--r": "26%", duration: 1 }, 0.8)
          .fromTo(q("[data-c='rim']"), { xPercent: -140 }, { xPercent: 340, duration: 1.4 }, 0.9)
          .fromTo(q("[data-c='rim']"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9)
          .to(q("[data-c='rim']"), { opacity: 0, duration: 0.5 }, 1.8)
          .to(q("[data-c='bottle']"), { filter: "brightness(0.7) contrast(1.05)", duration: 1 }, 0.9)
          // Scene 03 → fully visible
          .to(q("[data-c='dark']"), { "--r": "120%", duration: 1.2 }, 1.8)
          .to(q("[data-c='glow']"), { opacity: 1, scale: 1.1, duration: 1.2 }, 1.8)
          .to(q("[data-c='bottle']"), { filter: "brightness(1) contrast(1)", scale: 1, yPercent: 0, duration: 1.2 }, 1.8)
          .fromTo(q("[data-c='floor']"), { opacity: 0 }, { opacity: 1, duration: 1 }, 2)
          // Scene 04 → copy
          .to(q("[data-c='stage']"), desk ? { xPercent: -22, scale: 0.9, duration: 1.2 } : { yPercent: -14, scale: 0.78, duration: 1.2 }, 3)
          .fromTo(q("[data-c='l1']"), { opacity: 0, yPercent: 40, filter: "blur(8px)" }, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.8 }, 3)
          .fromTo(q("[data-c='l2']"), { opacity: 0, yPercent: 40, filter: "blur(8px)" }, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.8 }, 3.7)
          .to(q("[data-c='l1']"), { opacity: 0.35, duration: 0.6 }, 3.9)
          // Scene 05 → CTA
          .fromTo(q("[data-c='cta']"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 4.4)
          .to({}, { duration: 0.4 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Algumas fragrâncias são sentidas. Outras são lembradas." className="relative h-[460vh] bg-ink motion-reduce:h-auto">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden motion-reduce:relative motion-reduce:py-28">
        <div data-c="stage" className="relative flex h-full w-full items-center justify-center">
          <div data-c="glow" aria-hidden="true" className="absolute h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(228,187,115,0.42),rgba(201,148,69,0.12)_40%,transparent_70%)] opacity-0 blur-2xl" />
          <div data-c="floor" aria-hidden="true" className="absolute bottom-[10%] h-[18vh] w-[80vmin] rounded-[100%] bg-[radial-gradient(ellipse,rgba(201,148,69,0.18),transparent_70%)] opacity-0" />
          <div className="relative h-[62svh] max-h-[620px] lg:h-[70svh]">
            <div data-c="bottle" className="h-full">
              <Bottle variant="facet" liquid={["#F4D08A", "#9A6420"]} className="h-full w-auto" title="Velours Doré — Extrait de Parfum" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent_8%,black_30%,black_85%,transparent)]"
            >
              <div data-c="rim" className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold-light/25 to-transparent opacity-0" />
            </div>
          </div>
        </div>

        {/* Darkness: a radial mask that opens with scroll */}
        <div
          data-c="dark"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 motion-reduce:hidden"
          style={{ background: "radial-gradient(circle at 50% 48%, transparent var(--r, 6%), rgba(5,5,5,0.96) calc(var(--r, 6%) + 22%))" }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 px-5 text-center lg:bottom-auto lg:left-auto lg:right-[6%] lg:top-1/2 lg:w-[40%] lg:-translate-y-1/2 lg:text-left">
          <p data-c="l1" className="display text-[clamp(2rem,4.6vw,4.2rem)] text-ivory motion-reduce:opacity-100">
            Algumas fragrâncias são <em className="italic">sentidas.</em>
          </p>
          <p data-c="l2" className="display mt-3 text-[clamp(2rem,4.6vw,4.2rem)] text-champagne motion-reduce:opacity-100">
            Outras são <em className="gold-text italic">lembradas.</em>
          </p>
          <div data-c="cta" className="pointer-events-auto mt-10 motion-reduce:opacity-100">
            <Magnetic>
              <Link href="/colecao/perfumes" className="btn btn-gold">
                Encontre a sua. <ArrowRight className="btn-icon h-3.5 w-3.5" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <ol aria-hidden="true" className="absolute left-5 top-1/2 hidden -translate-y-1/2 space-y-4 lg:left-10 lg:block">
          {scenes.map((s, i) => (
            <li key={s} data-c="tick" className="group flex items-center gap-4 text-[0.56rem] uppercase tracking-[0.3em] text-ivory/25 transition-colors duration-700 [&.is-active]:text-gold-light">
              <span className="h-px w-5 bg-current transition-all duration-700 group-[.is-active]:w-10" />
              0{i + 1} {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
