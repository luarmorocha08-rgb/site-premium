import Link from "next/link";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import { formatPrice } from "@/lib/site";
import { ProductArt } from "@/components/visuals/ProductArt";
import { ArrowRight } from "./Icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const tall = product.art.kind === "bottle" || product.art.kind === "serum" || product.art.kind === "lipstick";
  return (
    <article className="group relative flex h-full flex-col" data-priority={priority || undefined}>
      <Link
        href={`/produto/${product.slug}`}
        data-cursor="Ver"
        className="relative block aspect-[4/5] overflow-hidden border border-ivory/[0.06] bg-ink-warm transition-colors duration-1000 group-hover:border-gold/25 group-hover:bg-ink-soft"
        aria-label={`${product.name} — ver produto`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(201,148,69,0.14),transparent_70%)] opacity-60 transition-opacity duration-1000 group-hover:opacity-100"
        />
        <div aria-hidden="true" className="absolute inset-x-[18%] bottom-[12%] h-6 rounded-[100%] bg-gold/0 blur-2xl transition-colors duration-1000 group-hover:bg-gold/30" />
        <div className="absolute inset-0 flex items-end justify-center pb-[12%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]">
          <div className={tall ? "h-[72%]" : "w-[66%]"}>
            <ProductArt product={product} className={tall ? "h-full w-auto" : "h-auto w-full"} />
          </div>
        </div>
        <span className="absolute left-5 top-5 text-[0.58rem] uppercase tracking-[0.28em] text-ivory/60">
          {categories[product.category].label}
        </span>
        <span className="absolute inset-x-5 bottom-5 flex translate-y-0 items-center justify-center gap-3 border border-gold/40 bg-ink/70 py-3 text-[0.6rem] uppercase tracking-[0.24em] text-gold-light opacity-100 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          Ver produto <ArrowRight />
        </span>
      </Link>
      <div className="flex flex-1 items-start justify-between gap-4 pt-5">
        <div>
          <h3 className="font-serif text-[1.55rem] font-light leading-tight text-ivory">
            <Link href={`/produto/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.72rem] text-ivory/50">{product.subtitle}</p>
        </div>
        <p className="shrink-0 pt-1 text-[0.8rem] text-champagne">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
