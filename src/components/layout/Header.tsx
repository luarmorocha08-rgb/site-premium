"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site, whatsappLink } from "@/lib/site";
import { useReady } from "@/hooks/useReady";
import { Logo } from "@/components/visuals/Logo";
import { Magnetic } from "@/components/ui/Magnetic";
import { Instagram, WhatsApp } from "@/components/ui/Icons";
import { useLenis } from "./SmoothScroll";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const ready = useReady();
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.removeProperty("overflow");
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled && !open
            ? "border-b border-gold/15 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        } ${ready ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        <div className="container-luxe flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          <Link href="/" aria-label={`${site.name} — página inicial`} className="relative z-10" data-header-logo>
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="link-underline text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ivory/75 transition-colors duration-500 hover:text-ivory aria-[current=page]:text-gold-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden lg:block">
            <Magnetic>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost min-h-11 px-5 text-[0.62rem]"
              >
                <WhatsApp className="h-3.5 w-3.5 text-gold" />
                Comprar / Falar conosco
              </a>
            </Magnetic>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 block h-px w-7 bg-ivory transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 block h-px bg-ivory transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "top-1.5 w-7 -rotate-45" : "top-3 w-4"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/3 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,148,69,0.18),transparent_65%)]"
            />
            <nav aria-label="Menu móvel" className="container-luxe relative flex flex-1 flex-col justify-center pt-20">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-5 py-2 font-serif text-[2.6rem] font-light leading-tight text-ivory"
                      >
                        <span className="text-[0.6rem] font-sans tracking-[0.3em] text-gold">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="container-luxe relative space-y-6 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.55 }}
            >
              <div className="hairline" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full">
                <WhatsApp /> Falar pelo WhatsApp
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-champagne/80"
              >
                <Instagram /> {site.instagram.handle}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
