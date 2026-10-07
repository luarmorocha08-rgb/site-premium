import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { byCategory, categories, type Category } from "@/data/products";
import { whatsappLink } from "@/lib/site";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsApp } from "@/components/ui/Icons";
import Link from "next/link";

type Params = { categoria: string };

const isCategory = (c: string): c is Category => c in categories;

export function generateStaticParams() {
  return Object.keys(categories).map((categoria) => ({ categoria }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { categoria } = await params;
  if (!isCategory(categoria)) return {};
  const c = categories[categoria];
  return {
    title: `${c.label} — ${c.title}`,
    description: c.intro,
    alternates: { canonical: `/colecao/${categoria}` },
    openGraph: { title: `${c.label} | Bárbara Presentes`, description: c.intro, url: `/colecao/${categoria}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { categoria } = await params;
  if (!isCategory(categoria)) notFound();
  const c = categories[categoria];
  const items = byCategory(categoria);

  return (
    <section className="relative min-h-screen bg-ink pb-28 pt-40 lg:pb-40 lg:pt-52">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(138,91,50,0.3),transparent_70%)]" />
      <div className="container-luxe relative">
        <nav aria-label="Coleções" className="mb-14 flex flex-wrap gap-x-8 gap-y-3" data-reveal="fade">
          {(Object.keys(categories) as Category[]).map((k) => (
            <Link
              key={k}
              href={`/colecao/${k}`}
              aria-current={k === categoria ? "page" : undefined}
              className="link-underline text-[0.66rem] uppercase tracking-[0.24em] text-ivory/50 transition-colors hover:text-ivory aria-[current=page]:text-gold-light"
            >
              {categories[k].label}
            </Link>
          ))}
        </nav>
        <SectionHeading as="h1" eyebrow={c.label} lines={[c.title]} intro={c.intro} />

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3" data-reveal="stagger">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-ivory/10 pt-12 md:flex-row md:items-center" data-reveal="up">
          <p className="max-w-lg font-serif text-3xl font-light leading-snug">
            Não encontrou o que procurava? <em className="italic text-champagne">A Bárbara ajuda você a escolher.</em>
          </p>
          <a href={whatsappLink(`Olá, Bárbara! Estou procurando ${c.label.toLowerCase()} e gostaria de uma indicação.`)} target="_blank" rel="noopener noreferrer" className="btn btn-gold shrink-0">
            <WhatsApp /> Pedir indicação
          </a>
        </div>
      </div>
    </section>
  );
}
