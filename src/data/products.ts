/**
 * Catálogo de demonstração.
 * Substitua por dados reais (CMS, planilha, API de pedidos…) mantendo o tipo `Product`.
 * Quando houver fotografia real, preencha `image` (ex.: "/images/produtos/ambar-noir.webp")
 * e o componente `ProductArt` passará a exibi-la via next/image (AVIF/WebP automáticos).
 */

export type Category = "perfumes" | "cosmeticos" | "presentes";
export type Family = "floral" | "doce" | "amadeirado" | "fresco" | "intenso" | "elegante";

export type Art =
  | { kind: "bottle"; variant: "classic" | "round" | "slim" | "facet"; liquid: [string, string]; cap?: "gold" | "black" }
  | { kind: "jar"; tone: [string, string] }
  | { kind: "serum"; liquid: [string, string] }
  | { kind: "lipstick"; tone: string }
  | { kind: "gift"; box: "black" | "champagne" };

export interface Product {
  slug: string;
  name: string;
  category: Category;
  subtitle: string;
  price: number;
  families: Family[];
  notes?: { top: string; heart: string; base: string };
  description: string;
  art: Art;
  image?: string;
  featured?: boolean;
}

export const categories: Record<Category, { label: string; title: string; intro: string }> = {
  perfumes: {
    label: "Perfumes",
    title: "Fragrâncias que contam histórias",
    intro: "Perfumes femininos, masculinos e compartilháveis — selecionados para marcar presença e deixar lembrança.",
  },
  cosmeticos: {
    label: "Cosméticos",
    title: "Rituais de cuidado",
    intro: "Texturas delicadas, ativos generosos e aquele cuidado que transforma a rotina em um pequeno luxo.",
  },
  presentes: {
    label: "Presentes",
    title: "Gestos que encantam",
    intro: "Kits e caixas preparados à mão para surpreender, agradecer, celebrar e lembrar.",
  },
};

export const products: Product[] = [
  {
    slug: "ambar-noir",
    name: "Âmbar Noir",
    category: "perfumes",
    subtitle: "Eau de Parfum · 100 ml",
    price: 389.9,
    families: ["amadeirado", "intenso"],
    notes: { top: "Bergamota e pimenta rosa", heart: "Âmbar e baunilha negra", base: "Sândalo, couro e fava tonka" },
    description: "Quente, envolvente e magnético. Uma assinatura amadeirada para quem prefere ser lembrada.",
    art: { kind: "bottle", variant: "classic", liquid: ["#E9A75A", "#7A3A12"] },
    featured: true,
  },
  {
    slug: "rose-satin",
    name: "Rose Satin",
    category: "perfumes",
    subtitle: "Eau de Parfum · 75 ml",
    price: 329.9,
    families: ["floral", "elegante"],
    notes: { top: "Lichia e pera", heart: "Rosa damascena e peônia", base: "Almíscar branco e cashmere" },
    description: "Rosas aveludadas sobre um fundo de almíscar — feminino, suave e impossível de esquecer.",
    art: { kind: "bottle", variant: "round", liquid: ["#F2B7AE", "#A2484F"] },
    featured: true,
  },
  {
    slug: "velours-dore",
    name: "Velours Doré",
    category: "perfumes",
    subtitle: "Extrait de Parfum · 50 ml",
    price: 459.9,
    families: ["doce", "intenso"],
    notes: { top: "Açafrão e mandarina", heart: "Caramelo salgado e jasmim", base: "Baunilha bourbon e benjoim" },
    description: "Gourmand sofisticado, com brilho de açafrão e um rastro aveludado de baunilha.",
    art: { kind: "bottle", variant: "facet", liquid: ["#F4D08A", "#9A6420"] },
    featured: true,
  },
  {
    slug: "neroli-lumiere",
    name: "Néroli Lumière",
    category: "perfumes",
    subtitle: "Eau de Toilette · 100 ml",
    price: 279.9,
    families: ["fresco", "elegante"],
    notes: { top: "Néroli e limão siciliano", heart: "Flor de laranjeira e chá branco", base: "Vetiver e almíscar" },
    description: "Luminoso e limpo, como uma manhã de sol no Mediterrâneo. Para todos os dias.",
    art: { kind: "bottle", variant: "slim", liquid: ["#F6EBC0", "#C9A75B"] },
    featured: true,
  },
  {
    slug: "bois-sacre",
    name: "Bois Sacré",
    category: "perfumes",
    subtitle: "Eau de Parfum masculino · 100 ml",
    price: 349.9,
    families: ["amadeirado", "elegante"],
    notes: { top: "Cardamomo e grapefruit", heart: "Lavanda e íris", base: "Cedro, vetiver e oud" },
    description: "Amadeirado seco e refinado, com um toque aromático. Presença sem excessos.",
    art: { kind: "bottle", variant: "classic", liquid: ["#5B4A3A", "#1A120C"], cap: "black" },
  },
  {
    slug: "fleur-de-lune",
    name: "Fleur de Lune",
    category: "perfumes",
    subtitle: "Eau de Parfum · 50 ml",
    price: 299.9,
    families: ["floral", "doce"],
    notes: { top: "Framboesa e bergamota", heart: "Jasmim sambac e tuberosa", base: "Praliné e almíscar" },
    description: "Floral noturno com doçura delicada — sensual na medida certa.",
    art: { kind: "bottle", variant: "round", liquid: ["#E4C6E8", "#7D4C86"] },
  },
  {
    slug: "serum-iluminador",
    name: "Sérum Iluminador",
    category: "cosmeticos",
    subtitle: "Vitamina C + ouro coloidal · 30 ml",
    price: 189.9,
    families: ["fresco"],
    description: "Pele luminosa e uniforme com textura leve de rápida absorção.",
    art: { kind: "serum", liquid: ["#F5D898", "#B07A2A"] },
    featured: true,
  },
  {
    slug: "creme-cetim",
    name: "Creme Corporal Cetim",
    category: "cosmeticos",
    subtitle: "Hidratação 48h · 200 g",
    price: 139.9,
    families: ["doce", "floral"],
    description: "Manteigas nobres e um perfume suave de baunilha e flor de algodão.",
    art: { kind: "jar", tone: ["#F3E6CF", "#C9A979"] },
  },
  {
    slug: "batom-velvet",
    name: "Batom Velvet Nude",
    category: "cosmeticos",
    subtitle: "Acabamento aveludado",
    price: 89.9,
    families: ["elegante"],
    description: "Cor intensa, conforto de bálsamo e embalagem dourada para levar na bolsa.",
    art: { kind: "lipstick", tone: "#A4524A" },
  },
  {
    slug: "kit-signature",
    name: "Caixa Signature",
    category: "presentes",
    subtitle: "Perfume + creme + cartão escrito à mão",
    price: 499.9,
    families: ["elegante", "floral"],
    description: "Nosso presente mais pedido: caixa rígida, laço de cetim e um bilhete com a sua mensagem.",
    art: { kind: "gift", box: "black" },
    featured: true,
  },
  {
    slug: "caixa-encanto",
    name: "Caixa Encanto",
    category: "presentes",
    subtitle: "Decants + mimos selecionados",
    price: 219.9,
    families: ["doce", "fresco"],
    description: "Três decants de fragrâncias desejadas e mimos escolhidos com carinho. Ideal para descobrir.",
    art: { kind: "gift", box: "champagne" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (c: Category) => products.filter((p) => p.category === c);
export const featuredProducts = products.filter((p) => p.featured);

export const families: { id: Family; label: string; mood: string; tone: [string, string] }[] = [
  { id: "floral", label: "Floral", mood: "Pétalas, delicadeza e romance.", tone: ["#E8A9A2", "#5A2228"] },
  { id: "doce", label: "Doce", mood: "Baunilha, caramelo e aconchego.", tone: ["#F0C987", "#5E3812"] },
  { id: "amadeirado", label: "Amadeirado", mood: "Madeiras nobres e calor de âmbar.", tone: ["#B4794A", "#2A170C"] },
  { id: "fresco", label: "Fresco", mood: "Cítricos, chá branco e luz.", tone: ["#E9E3C2", "#3E4A3A"] },
  { id: "intenso", label: "Intenso", mood: "Especiarias, couro e mistério.", tone: ["#B0413A", "#1C0807"] },
  { id: "elegante", label: "Elegante", mood: "Íris, almíscar e discrição.", tone: ["#E7D1AC", "#3A3128"] },
];
