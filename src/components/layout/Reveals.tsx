"use client";

import { usePathname } from "next/navigation";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Declarative scroll animations driven by data attributes:
 *  data-reveal="up | fade | left | right | clip | lines | draw | stagger"
 *  data-delay="0.2"          → extra delay (seconds)
 *  data-speed="0.2"          → parallax (desktop only), positive = slower than scroll
 * Elements inside [data-hero] are handled by the hero itself.
 */
export function Reveals() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => !el.closest("[data-hero]"));

        els.forEach((el) => {
          const type = el.dataset.reveal;
          const delay = parseFloat(el.dataset.delay ?? "0");
          const st: ScrollTrigger.Vars = { trigger: el, start: "top 88%", once: true };
          const base = { delay, scrollTrigger: st, ease: "expo.out" };

          switch (type) {
            case "lines":
              gsap.fromTo(
                el.querySelectorAll(".line-inner"),
                { y: 0, yPercent: 110 },
                { yPercent: 0, duration: 1.5, stagger: 0.12, ...base },
              );
              break;
            case "clip": {
              const media = el.querySelector("[data-reveal-media]");
              gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ...base, ease: "expo.inOut" });
              if (media) gsap.fromTo(media, { scale: 1.18 }, { scale: 1, duration: 2.2, ...base });
              break;
            }
            case "draw":
              gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.6, transformOrigin: "left center", ...base, ease: "expo.inOut" });
              break;
            case "left":
            case "right":
              gsap.fromTo(
                el,
                { autoAlpha: 0, x: type === "left" ? -70 : 70 },
                { autoAlpha: 1, x: 0, duration: 1.6, ...base },
              );
              break;
            case "fade":
              gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6, ...base, ease: "power2.out" });
              break;
            case "stagger":
              gsap.set(el, { autoAlpha: 1 });
              gsap.fromTo(
                el.children,
                { autoAlpha: 0, y: 36 },
                { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.1, ...base },
              );
              break;
            default:
              gsap.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.4, ...base });
          }
        });
      });

      mm.add(MQ.desktop, () => {
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed ?? "0");
          gsap.fromTo(
            el,
            { yPercent: speed * 30 },
            {
              yPercent: speed * -30,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      // Layout may shift after images/fonts; keep triggers accurate.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
