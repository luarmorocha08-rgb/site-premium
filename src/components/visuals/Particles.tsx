"use client";

import { useEffect, useRef } from "react";
import { isLowPower } from "@/lib/device";

interface Dot {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
}

/**
 * Discreet floating gold dust on canvas. Density adapts to viewport and device power,
 * rendering pauses off-screen and is disabled for prefers-reduced-motion.
 */
export function Particles({ className = "", density = 1 }: { className?: string; density?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const base = mobile ? 18 : 60;
    const count = Math.round(base * density * (isLowPower() ? 0.5 : 1));
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let running = false;
    let inView = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = c.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const seed = () => {
      dots = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 1.6,
          vx: (Math.random() - 0.5) * 0.06,
          vy: -(0.05 + z * 0.18),
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    // Pre-rendered glow sprite: drawing an image is far cheaper than building a gradient per dot per frame.
    const SPRITE = 32;
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
    g.addColorStop(0, "rgba(244, 214, 150, 1)");
    g.addColorStop(0.35, "rgba(201, 148, 69, 0.45)");
    g.addColorStop(1, "rgba(201, 148, 69, 0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.0012 + d.phase));
        const size = d.r * 8;
        ctx.globalAlpha = (0.15 + d.z * 0.55) * twinkle;
        ctx.drawImage(sprite, d.x + pointer.x * d.z * 18 - size / 2, d.y + pointer.y * d.z * 18 - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    seed();

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !document.hidden) start();
      else stop();
    });
    io.observe(c);
    const ro = new ResizeObserver(() => {
      resize();
      seed();
    });
    ro.observe(c);
    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    const onVis = () => (document.hidden || !inView ? stop() : start());
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
