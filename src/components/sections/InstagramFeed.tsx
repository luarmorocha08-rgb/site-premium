import { site } from "@/lib/site";
import { Scene, type SceneName } from "@/components/visuals/Scenes";
import { Monogram } from "@/components/visuals/Logo";
import { Instagram } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";

type Post =
  | { kind: "scene"; scene: SceneName; caption: string }
  | { kind: "quote"; text: string; caption: string }
  | { kind: "brand"; caption: string };

/**
 * Editorial grid inspired by the brand's feed. To show real posts, replace these
 * entries with images (or plug the Instagram Basic Display / Graph API here).
 */
const posts: Post[] = [
  { kind: "scene", scene: "rose", caption: "Rose Satin — o floral mais pedido da semana." },
  { kind: "quote", text: "É só dar zoom…", caption: "Detalhes que fazem a diferença." },
  { kind: "scene", scene: "decants", caption: "Decants: experimente antes de se apaixonar." },
  { kind: "brand", caption: "Presentes que encantam. Momentos que ficam." },
  { kind: "scene", scene: "noir", caption: "Bois Sacré — amadeirado para ele." },
  { kind: "scene", scene: "presentes", caption: "Caixas montadas à mão, com laço de cetim." },
];

export function InstagramFeed() {
  return (
    <section id="instagram" className="relative bg-ink-warm py-28 lg:py-40">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <div className="container-luxe">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow flex items-center gap-3" data-reveal="fade">
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </p>
          <h2 className="display mt-6 break-all text-[clamp(1.9rem,5vw,4.4rem)] sm:break-normal" data-reveal="up">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline transition-colors hover:text-gold-light">
              {site.instagram.handle}
            </a>
          </h2>
          <p className="mt-5 max-w-md text-[0.92rem] text-ivory/55" data-reveal="up" data-delay="0.1">
            Lançamentos, bastidores e inspirações para presentear — todos os dias.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:mt-20" data-reveal="stagger">
          {posts.map((post, i) => (
            <li key={i}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Abrir"
                aria-label={`Abrir no Instagram: ${post.caption}`}
                className="group relative block aspect-square overflow-hidden bg-ink"
              >
                <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                  {post.kind === "scene" && <Scene name={post.scene} />}
                  {post.kind === "quote" && (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_40%_30%,#6b4523,#2a180b_60%,#120b05)] p-6">
                      <p className="gold-text font-serif text-[clamp(1.6rem,4.4vw,3.4rem)] italic leading-none">{post.text}</p>
                    </div>
                  )}
                  {post.kind === "brand" && (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#1d160f,#050505_70%)]">
                      <Monogram className="w-[42%]" />
                      <p className="mt-3 font-script text-[clamp(1.4rem,3.4vw,2.4rem)] text-champagne">Bárbara</p>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/0 p-6 text-center opacity-0 transition-all duration-700 group-hover:bg-ink/65 group-hover:opacity-100 group-focus-visible:bg-ink/65 group-focus-visible:opacity-100">
                  <Instagram className="h-6 w-6 text-gold-light" />
                  <p className="hidden max-w-[16rem] text-[0.8rem] leading-relaxed text-ivory/85 sm:block">{post.caption}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center" data-reveal="up">
          <Magnetic>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Instagram className="h-4 w-4 text-gold" /> Nos acompanhe no Instagram
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
