import Image from "next/image";
import type { Product } from "@/data/products";
import { Bottle } from "./Bottle";
import { Jar, Lipstick, Serum } from "./Cosmetics";
import { GiftBox } from "./GiftBox";

/** Renders product photography when available, otherwise the art-directed SVG still life. */
export function ProductArt({ product, className = "", sizes = "(min-width: 1024px) 25vw, 70vw" }: { product: Product; className?: string; sizes?: string }) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.name} — ${product.subtitle}`}
        fill
        sizes={sizes}
        className={`object-contain ${className}`}
      />
    );
  }
  const a = product.art;
  const title = `${product.name} — ${product.subtitle}`;
  switch (a.kind) {
    case "bottle":
      return <Bottle variant={a.variant} liquid={a.liquid} cap={a.cap} className={className} title={title} />;
    case "jar":
      return <Jar tone={a.tone} className={className} />;
    case "serum":
      return <Serum liquid={a.liquid} className={className} />;
    case "lipstick":
      return <Lipstick tone={a.tone} className={className} />;
    case "gift":
      return <GiftBox box={a.box} className={className} />;
  }
}
