"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site";
import { Scene } from "@/components/visuals/Scenes";
import { SplitLines } from "@/components/ui/SplitLines";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsApp } from "@/components/ui/Icons";

const phrases = ["Para surpreender.", "Para agradecer.", "Para celebrar.", "Para lembrar."];

export function Gifts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-phrase]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.08, x: -24, filter: "blur(4px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 85%", end: "top 50%", scrub: 0.6 },
            },
          );
          gsap.fromTo(
            el.querySelector("[data-phrase-line]"),
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 75%", end: "top 45%", scrub: 0.6 } },
          );
        });
      });
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          "[data-gift-media]",
          { scale: 1.12 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="presentes" ref={root} className="relative bg-ink-warm">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <div className="container-luxe grid gap-14 py-28 lg:grid-cols-12 lg:gap-16 lg:py-0">
        <div className="lg:col-span-6 lg:py-40">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[calc(100vh-10rem)]" data-reveal="clip">
              <div data-gift-media data-reveal-media className="absolute inset-0">
                <Scene name="presentes" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent" />
              <p className="absolute left-7 top-7 font-script text-4xl text-champagne lg:left-10 lg:top-10 lg:text-5xl">
                pensei em você
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:py-40">
          <p className="eyebrow" data-reveal="fade">
            Presentes
          </p>
          <h2 className="display mt-6 text-[clamp(2.8rem,5.6vw,5rem)]" data-reveal="lines">
            <SplitLines lines={["Mais do que", <em key="p" className="italic text-champagne">um presente.</em>]} />
          </h2>
          <p className="mt-7 max-w-md text-lg font-light text-ivory/70" data-reveal="up">
            Uma forma de dizer: <span className="font-serif text-2xl italic text-gold-light">pensei em você.</span>
          </p>
          <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-ivory/55" data-reveal="up" data-delay="0.1">
            Caixas rígidas, laço de cetim, papel de seda e um cartão escrito à mão. Cada detalhe é preparado para que o momento de abrir seja tão especial quanto o presente.
          </p>

          <ul className="mt-16 lg:mt-24">
            {phrases.map((p) => (
              <li key={p} data-phrase className="border-t border-ivory/10 py-8 lg:py-14">
                <p className="display text-[clamp(2.2rem,4.4vw,3.8rem)] text-ivory">{p}</p>
                <span data-phrase-line aria-hidden="true" className="mt-5 block h-px w-24 origin-left bg-gold" />
              </li>
            ))}
          </ul>

          <div className="mt-8" data-reveal="up">
            <Magnetic>
              <a
                href={whatsappLink("Olá, Bárbara! Quero montar um presente especial. Pode me ajudar?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <WhatsApp /> Montar um presente
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
