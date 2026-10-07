"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

const HEADER_OFFSET = -72;

/** Scrolls to an in-page anchor with Lenis when available, natively otherwise. */
export function scrollToHash(hash: string, lenis: Lenis | null, immediate = false) {
  const el = hash && hash !== "#" ? document.querySelector<HTMLElement>(hash) : null;
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: immediate ? 0 : 1.6, immediate });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  return true;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices keep native momentum scrolling — smoother and lighter on phones.
      syncTouch: false,
    });
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Intercept same-page anchor links ("/#sobre", "#contato").
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const [path, hash] = href.split("#");
      if (hash === undefined) return;
      if (path && path !== window.location.pathname) return;
      if (scrollToHash(`#${hash}`, lenis)) {
        e.preventDefault();
        history.replaceState(null, "", `#${hash}`);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  // Reset scroll on route change; honour hashes when arriving from another page.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (window.location.hash) {
        const t = window.setTimeout(() => scrollToHash(window.location.hash, lenis, true), 400);
        return () => window.clearTimeout(t);
      }
      return;
    }
    if (window.location.hash) {
      const t = window.setTimeout(() => scrollToHash(window.location.hash, lenis), 150);
      return () => window.clearTimeout(t);
    }
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Recalculate trigger positions once webfonts have settled.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
