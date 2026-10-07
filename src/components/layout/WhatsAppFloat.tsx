"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsApp } from "@/components/ui/Icons";

/** Discreet floating shortcut, shown once the visitor has scrolled past the first screen. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 900;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-gold-light shadow-[0_10px_40px_-10px_rgba(201,148,69,0.5)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:border-gold-light lg:bottom-8 lg:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsApp className="h-5 w-5" />
    </a>
  );
}
