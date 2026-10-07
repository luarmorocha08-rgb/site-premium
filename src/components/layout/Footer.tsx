import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";
import { categories, type Category } from "@/data/products";
import { Logo } from "@/components/visuals/Logo";
import { Instagram, Truck, WhatsApp } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-ink pt-20 lg:pt-28">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <div className="container-luxe">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-7 max-w-xs font-serif text-xl font-light italic leading-snug text-ivory/70">{site.tagline}</p>
            <p className="mt-6 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-champagne/80">
              <Truck className="h-4 w-4 text-gold" /> Enviamos para todo o Brasil.
            </p>
          </div>

          <nav aria-label="Links rápidos" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow">Navegação</p>
            <ul className="mt-6 space-y-3.5 text-[0.85rem] text-ivory/60">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline transition-colors hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Coleções" className="lg:col-span-2">
            <p className="eyebrow">Coleções</p>
            <ul className="mt-6 space-y-3.5 text-[0.85rem] text-ivory/60">
              {(Object.keys(categories) as Category[]).map((c) => (
                <li key={c}>
                  <Link href={`/colecao/${c}`} className="link-underline transition-colors hover:text-ivory">
                    {categories[c].label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#fragrancia" className="link-underline transition-colors hover:text-ivory">
                  Encontre sua fragrância
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow">Contato</p>
            <ul className="mt-6 space-y-4 text-[0.85rem] text-ivory/60">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-ivory">
                  <WhatsApp className="h-4 w-4 text-gold" /> WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-ivory">
                  <Instagram className="h-4 w-4 text-gold" /> {site.instagram.handle}
                </a>
              </li>
              <li className="pt-2 text-[0.78rem] leading-relaxed text-ivory/60">Pedidos pelo direct do Instagram ou WhatsApp.</li>
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className="hairline mt-20" />
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-[0.66rem] uppercase tracking-[0.18em] text-ivory/55 sm:flex-row">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p>Perfumes · Cosméticos · Presentes</p>
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1000 230" className="pointer-events-none w-full select-none">
        <text x="500" y="200" textAnchor="middle" fontSize="260" fill="#f7f4ee" fillOpacity="0.03" style={{ fontFamily: "var(--font-script)" }}>
          Bárbara
        </text>
      </svg>
    </footer>
  );
}
