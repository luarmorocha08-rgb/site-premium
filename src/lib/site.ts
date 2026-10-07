export const site = {
  name: "Bárbara Presentes",
  shortName: "Bárbara",
  tagline: "Presentes que encantam. Momentos que ficam.",
  description:
    "Bárbara Presentes — perfumaria, cosméticos e presentes selecionados com carinho. Perfumes femininos e masculinos, kits e presentes especiais com envio para todo o Brasil.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://barbarapresentes.com.br",
  locale: "pt_BR",
  instagram: {
    handle: "@barbarapresentes_oficial",
    url: "https://www.instagram.com/barbarapresentes_oficial/",
  },
  whatsapp: {
    number: "5522988592588",
    display: "(22) 98859-2588",
  },
  keywords: [
    "Bárbara Presentes",
    "perfumaria",
    "perfumes",
    "perfumes femininos",
    "perfumes masculinos",
    "cosméticos",
    "presentes",
    "presentes especiais",
    "decants",
    "kits de presente",
  ],
} as const;

export function whatsappLink(message = "Olá, Bárbara! Vim pelo site e gostaria de ajuda para escolher um presente.") {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Início", href: "/" },
  { label: "Perfumes", href: "/colecao/perfumes" },
  { label: "Cosméticos", href: "/colecao/cosmeticos" },
  { label: "Presentes", href: "/colecao/presentes" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
] as const;

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
