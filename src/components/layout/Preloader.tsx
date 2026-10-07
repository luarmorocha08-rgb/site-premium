"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/hooks/useReady";
import { Monogram } from "@/components/visuals/Logo";

/**
 * Intro (~2.5s): black → monogram draws itself → gold light sweeps the logo →
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
      try {
        sessionStorage.setItem("bp-intro", "1");
      } catch {}
      document.documentElement.style.removeProperty("overflow");
      markReady();
      setDone(true);
    };

    // Already seen in this session: the page shows straight away (CSS hides the overlay).
    if (document.documentElement.classList.contains("intro-seen")) {
      finish();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(el, { autoAlpha: 0, duration: 0.3, onComplete: finish });
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const word = el.querySelector("[data-word]");

    // The draw-in + light sweep run in CSS from first paint (see globals.css), so the intro
    // overlaps hydration instead of waiting for it. JS only plays the hand-off to the header.
    const INTRO_MS = 1800;
    const wait = Math.max(0, INTRO_MS - performance.now()) / 1000;

    const tl = gsap.timeline({ delay: wait, defaults: { ease: "expo.out" } });
    tl.to(word, { autoAlpha: 0, duration: 0.4 }, 0)
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
      }, 0.05)
      .to(el, { backgroundColor: "rgba(5,5,5,0)", duration: 0.7, ease: "power2.inOut" }, 0.3)
      .add(markReady, 0.4)
      .to(mark, { autoAlpha: 0, duration: 0.3 }, 0.8)
      .add(finish, 0.9);

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
      <div ref={logo} className="intro-logo relative h-24 w-24 overflow-hidden rounded-full">
        <Monogram className="h-full w-full" />
        <span
          data-shine
          className="intro-shine absolute inset-y-0 -left-1/4 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#fff3d0]/70 to-transparent mix-blend-overlay"
        />
      </div>
      <p data-word className="intro-word mt-8 pl-[0.55em] text-[0.62rem] font-medium uppercase tracking-[0.55em] text-champagne/80">
        Bárbara Presentes
      </p>
    </div>
  );
}
