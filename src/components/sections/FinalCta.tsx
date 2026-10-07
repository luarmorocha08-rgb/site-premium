import { site, whatsappLink } from "@/lib/site";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitLines } from "@/components/ui/SplitLines";
import { Instagram, WhatsApp } from "@/components/ui/Icons";

export function FinalCta() {
  return (
    <section id="contato" className="relative isolate overflow-hidden bg-ink py-32 lg:py-52">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,148,69,0.24),rgba(138,91,50,0.08)_40%,transparent_68%)]" />
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
        <div className="absolute left-1/2 top-1/2 h-[84vmin] w-[84vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.06]" />
      </div>
      <div className="container-luxe text-center">
        <p className="eyebrow" data-reveal="fade">
          Fale conosco
        </p>
        <h2 className="display mx-auto mt-8 max-w-5xl text-[clamp(2.5rem,6.4vw,6rem)]" data-reveal="lines">
          <SplitLines
            lines={[
              "O presente perfeito",
              <>
                está mais perto do que <em className="italic text-champagne">você imagina.</em>
              </>,
            ]}
          />
        </h2>
        <p className="mx-auto mt-8 max-w-md text-[0.95rem] text-ivory/60" data-reveal="up">
          Fale conosco e encontre algo especial.
        </p>
        <div className="mt-14 flex justify-center" data-reveal="up" data-delay="0.15">
          <div className="relative">
            <span aria-hidden="true" className="animate-glow absolute -inset-4 rounded-sm bg-gold/25 blur-2xl" />
            <Magnetic strength={0.35}>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-gold relative min-h-16 px-10 text-[0.74rem]">
                <WhatsApp className="h-5 w-5" /> Falar com a Bárbara
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-center gap-5 text-[0.68rem] uppercase tracking-[0.22em] text-ivory/50 sm:flex-row sm:gap-10" data-reveal="fade">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-underline flex items-center gap-2 hover:text-champagne">
            <WhatsApp className="h-3.5 w-3.5 text-gold" /> {site.whatsapp.display}
          </a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline flex items-center gap-2 hover:text-champagne">
            <Instagram className="h-3.5 w-3.5 text-gold" /> {site.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
