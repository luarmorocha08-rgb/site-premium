"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop-only cursor companion. The native cursor stays visible everywhere
 * except on [data-cursor] areas, where a gold disc with a label ("Explorar") takes over.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.7, ease: "expo.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.7, ease: "expo.out" });
    let visible = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.6 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const interactive = (e.target as HTMLElement).closest("a, button, [role='button'], input, label");
      setLabel(t?.dataset.cursor ?? "");
      ring.current?.classList.toggle("is-hover", !!interactive && !t);
    };
    const leave = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.4 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const active = label !== "";
  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-light opacity-0 transition-[scale] duration-500"
        style={{ scale: active ? 0 : 1 }}
      />
      <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0">
        <div
          className={`cursor-ring flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active
              ? "h-24 w-24 border-gold/0 bg-gold/90 text-ink backdrop-blur-sm"
              : "h-9 w-9 border-gold/40 bg-transparent"
          }`}
        >
          <span
            className={`text-[0.6rem] font-medium uppercase tracking-[0.24em] transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
          >
            {label}
          </span>
        </div>
      </div>
      <style>{`.cursor-ring{will-change:width,height}.is-hover .cursor-ring{width:3.25rem;height:3.25rem;border-color:rgba(228,187,115,.7)}`}</style>
    </>
  );
}
