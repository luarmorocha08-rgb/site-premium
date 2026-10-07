import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getProduct, products } from "@/data/products";
import { formatPrice, site, whatsappLink } from "@/lib/site";
import { ProductArt } from "@/components/visuals/ProductArt";
import { ProductCard } from "@/components/ui/ProductCard";
import { SplitLines } from "@/components/ui/SplitLines";
import { ArrowLeft, Gift, Instagram, Truck, WhatsApp } from "@/components/ui/Icons";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.subtitle}`,
    description: p.description,
    alternates: { canonical: `/produto/${p.slug}` },
    openGraph: { title: `${p.name} | ${site.name}`, description: p.description, url: `/produto/${p.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const related = products.filter((x) => x.slug !== p.slug && (x.category === p.category || x.families.some((f) => p.families.includes(f)))).slice(0, 3);
  const tall = p.art.kind === "bottle" || p.art.kind === "serum" || p.art.kind === "lipstick";
  const order = whatsappLink(`Olá, Bárbara! Tenho interesse em ${p.name} (${p.subtitle}) — ${formatPrice(p.price)}. Está disponível?`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: categories[p.category].label,
    brand: { "@type": "Brand", name: site.name },
    url: `${site.url}/produto/${p.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: p.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${site.url}/produto/${p.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative bg-ink pb-24 pt-32 lg:pb-36 lg:pt-40">
        <div className="container-luxe">
          <Link
            href={`/colecao/${p.category}`}
            className="link-underline inline-flex items-center gap-3 text-[0.64rem] uppercase tracking-[0.24em] text-ivory/55 hover:text-ivory"
            data-reveal="fade"
          >
            <ArrowLeft /> {categories[p.category].label}
          </Link>

          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="relative lg:col-span-7">
              <div className="relative flex aspect-[4/5] items-end justify-center overflow-hidden bg-ink-warm pb-[10%] lg:aspect-[6/7]" data-reveal="clip">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(228,187,115,0.28),rgba(201,148,69,0.06)_45%,transparent_70%)]" />
                <div aria-hidden="true" className="absolute inset-x-[18%] bottom-[8%] top-[10%] rounded-t-full border border-gold/20" />
                <div data-reveal-media className={`relative ${tall ? "h-[74%]" : "w-[70%]"}`}>
                  <div className="animate-float h-full">
                    <ProductArt product={p} className={tall ? "h-full w-auto" : "h-auto w-full"} sizes="(min-width: 1024px) 55vw, 90vw" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-10">
              <p className="eyebrow" data-reveal="fade">
                {categories[p.category].label}
              </p>
              <h1 className="display mt-5 text-[clamp(3rem,6vw,5.4rem)]" data-reveal="lines">
                <SplitLines lines={[p.name]} />
              </h1>
              <p className="mt-4 text-[0.8rem] uppercase tracking-[0.2em] text-ivory/50" data-reveal="up">
                {p.subtitle}
              </p>
              <p className="mt-8 font-serif text-3xl text-gold-light" data-reveal="up">
                {formatPrice(p.price)}
              </p>
              <span aria-hidden="true" className="mt-8 block h-px w-24 bg-gold/70" data-reveal="draw" />
              <p className="mt-8 max-w-md text-[1rem] leading-relaxed text-ivory/70" data-reveal="up">
                {p.description}
              </p>

              {p.notes && (
                <dl className="mt-10 grid gap-6 border-y border-ivory/10 py-8 sm:grid-cols-3" data-reveal="stagger">
                  {(
                    [
                      ["Saída", p.notes.top],
                      ["Coração", p.notes.heart],
                      ["Fundo", p.notes.base],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[0.58rem] uppercase tracking-[0.3em] text-gold">{k}</dt>
                      <dd className="mt-2 text-[0.85rem] leading-relaxed text-ivory/70">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row" data-reveal="up">
                <a href={order} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  <WhatsApp /> Pedir pelo WhatsApp
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Instagram className="h-4 w-4 text-gold" /> Pedir pelo direct
                </a>
              </div>

              <ul className="mt-10 space-y-3 text-[0.8rem] text-ivory/55" data-reveal="fade">
                <li className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-gold" /> Enviamos para todo o Brasil.
                </li>
                <li className="flex items-center gap-3">
                  <Gift className="h-4 w-4 text-gold" /> Embalagem para presente e cartão personalizado.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative bg-ink-warm py-24 lg:py-32">
          <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
          <div className="container-luxe">
            <h2 className="display text-[clamp(2.2rem,4vw,3.6rem)]" data-reveal="lines">
              <SplitLines lines={[<>Você também <em key="i" className="italic text-champagne">vai amar.</em></>]} />
            </h2>
            <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
