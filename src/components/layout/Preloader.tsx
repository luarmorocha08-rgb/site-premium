"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/hooks/useReady";
import { Monogram } from "@/components/visuals/Logo";

/**
 * Intro (~2.3s): black → monogram draws itself → gold light sweeps the logo →
 * logo glides into the header position → page is revealed.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const mark = logo.current;
    if (!el || !mark) return;

    const finish = () => {
      document.documentElement.style.removeProperty("overflow");
      markReady();
      setDone(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(el, { autoAlpha: 0, duration: 0.3, onComplete: finish });
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const ring = mark.querySelector("[data-logo-ring]");
    const letter = mark.querySelector("[data-logo-letter]");
    const bow = mark.querySelectorAll("[data-logo-bow] path");
    const shine = mark.querySelector("[data-shine]");
    const word = el.querySelector("[data-word]");

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.set(ring, { strokeDasharray: 1, strokeDashoffset: 1 })
      .set(bow, { strokeDasharray: 60, strokeDashoffset: 60 })
      .to(ring, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.1)
      .fromTo(letter, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3)
      .to(bow, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.08 }, 0.5)
      .fromTo(word, { autoAlpha: 0, letterSpacing: "0.9em" }, { autoAlpha: 1, letterSpacing: "0.55em", duration: 1 }, 0.6)
      .fromTo(shine, { xPercent: -160 }, { xPercent: 160, duration: 0.9, ease: "power2.inOut" }, 1.05)
      .to(word, { autoAlpha: 0, duration: 0.4 }, 1.55)
      .add(() => {
        const target = document.querySelector<HTMLElement>("[data-header-logo]");
        const from = mark.getBoundingClientRect();
        if (target && target.offsetParent !== null) {
          const to = target.getBoundingClientRect();
          gsap.to(mark, {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: to.width / from.width,
            duration: 0.85,
            ease: "expo.inOut",
          });
        } else {
          gsap.to(mark, { autoAlpha: 0, scale: 0.9, duration: 0.6 });
        }
      }, 1.6)
      .to(el, { backgroundColor: "rgba(5,5,5,0)", duration: 0.7, ease: "power2.inOut" }, 1.85)
      .add(markReady, 1.95)
      .to(mark, { autoAlpha: 0, duration: 0.3 }, 2.35)
      .add(finish, 2.45);

    return () => {
      tl.kill();
      document.documentElement.style.removeProperty("overflow");
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="bp-preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      style={{ pointerEvents: "none" }}
    >
      <div ref={logo} className="relative h-24 w-24 overflow-hidden rounded-full">
        <Monogram className="h-full w-full" />
        <span
          data-shine
          className="absolute inset-y-0 -left-1/4 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#fff3d0]/70 to-transparent mix-blend-overlay"
        />
      </div>
      <p data-word className="mt-8 pl-[0.55em] text-[0.62rem] font-medium uppercase tracking-[0.55em] text-champagne/80">
        Bárbara Presentes
      </p>
    </div>
  );
}
