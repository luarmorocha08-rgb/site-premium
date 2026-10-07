# Bárbara Presentes — site

Site da **Bárbara Presentes** (perfumaria, cosméticos e presentes): boutique digital com direção de arte cinematográfica, animações de scroll e foco em conversão via WhatsApp/Instagram.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis (smooth scroll)

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Defina a URL de produção (usada em canonical, Open Graph, sitemap e dados estruturados):

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
```

> Os scripts usam `--webpack`. O Turbopack também funciona em ambientes com acesso normal ao Google Fonts — basta remover a flag.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, textos de SEO, menu | `src/lib/site.ts` |
| Catálogo (produtos, preços, notas, famílias olfativas) | `src/data/products.ts` |
| Cores, tipografia, botões, easing | `src/app/globals.css` (`@theme`) |
| Seções da home | `src/components/sections/*` |

### Conectando catálogo, fotos e pedidos

- **Catálogo:** `products.ts` é a única fonte de dados. Troque o array por uma chamada a CMS/planilha/API mantendo o tipo `Product` — coleções (`/colecao/[categoria]`), páginas de produto (`/produto/[slug]`), sitemap e JSON-LD se atualizam sozinhos.
- **Fotografia:** enquanto não há fotos de produto, o site usa ilustrações SVG art-directed (frascos, potes, caixas de presente). Basta preencher `image: "/images/produtos/arquivo.webp"` no produto e `ProductArt` passa a usar `next/image` (AVIF/WebP e lazy loading automáticos). As cenas editoriais ficam em `src/components/visuals/Scenes.tsx`.
- **Pedidos:** todo CTA de compra usa `whatsappLink(mensagem)` com mensagem pré-preenchida (inclui nome e preço do produto). Para um checkout futuro, substitua esse helper.
- **Instagram:** o grid em `InstagramFeed.tsx` está pronto para receber posts reais (imagens ou Instagram Graph API).
- **Quiz de fragrâncias:** `FragranceFinder.tsx` recomenda produtos pela propriedade `families`; pode evoluir para um quiz com mais etapas.

## Experiência

- Intro de ~2,5s (uma vez por sessão): monograma desenhado em CSS desde o primeiro paint → brilho dourado → logo desliza até o header.
- Hero 100vh com frasco flutuante, luz dourada, partículas (canvas) e parallax pelo mouse.
- Seção cinematográfica com sticky scroll em 5 cenas (escuridão → luz → revelação → texto → CTA), totalmente atrelada ao progresso do scroll.
- Reveals declarativos via atributos: `data-reveal="up|fade|left|right|clip|lines|draw|stagger"`, `data-delay`, `data-speed` (parallax) — ver `src/components/layout/Reveals.tsx`.
- Cursor customizado e botões magnéticos apenas em desktop com ponteiro fino.

## Performance e acessibilidade

Lighthouse (build de produção): **desktop 95 · acessibilidade 100 · boas práticas 100 · SEO 100**; mobile (CPU 4× mais lenta) 70 na home e 81 em produto, com acessibilidade/boas práticas/SEO em 100. No mobile o LCP (~4s) é dominado pela intro de marca — por isso ela só toca na primeira visita da sessão.

- Reveals de scroll via IntersectionObserver (sem leituras de layout); ScrollTrigger só nas cenas com scrub.
- Transições de página, menu mobile e quiz em CSS puro — sem biblioteca de animação extra no bundle.

- Nenhuma imagem raster na home: ilustrações em SVG inline, fontes via `next/font` (self-hosted, variáveis).
- Partículas reduzidas no mobile e em dispositivos fracos (`deviceMemory`/`hardwareConcurrency`/`saveData`), pausadas fora da tela.
- Parallax pesado apenas em desktop; animações só com `transform`/`opacity` (exceto a máscara de luz da cena cinematográfica).
- `prefers-reduced-motion` respeitado: sem intro, sem scroll suave, conteúdo visível imediatamente.
- Fallback sem JavaScript e failsafe caso a hidratação falhe.

## SEO

`title`/`description` por página, Open Graph + Twitter, imagem OG gerada (`/opengraph-image`), favicon SVG e apple-icon, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, JSON-LD `Store` (global) e `Product` + `Offer` (páginas de produto).
