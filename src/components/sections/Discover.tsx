import Link from "next/link";
import { Scene, type SceneName } from "@/components/visuals/Scenes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

const items: {
  n: string;
  title: string;
  text: string;
  href: string;
  scene: SceneName;
  layout: string;
  aspect: string;
  from: "left" | "right";
}[] = [
  {
    n: "01",
    title: "Perfumes",
    text: "Assinaturas olfativas para marcar presença.",
    href: "/colecao/perfumes",
    scene: "perfumes",
    layout: "lg:col-span-7",
    aspect: "aspect-[4/5] lg:aspect-[7/8]",
    from: "left",
  },
  {
    n: "02",
    title: "Cosméticos",
    text: "Rituais de cuidado com toque de luxo.",
    href: "/colecao/cosmeticos",
    scene: "cosmeticos",
    layout: "lg:col-span-5 lg:mt-48",
    aspect: "aspect-[4/5]",
    from: "right",
  },
  {
    n: "03",
    title: "Presentes",
    text: "Caixas e kits preparados à mão, com laço de cetim.",
    href: "/colecao/presentes",
    scene: "presentes",
    layout: "lg:col-span-8 lg:col-start-3 lg:-mt-8",
    aspect: "aspect-[4/5] sm:aspect-[16/10]",
    from: "left",
  },
];

export function Discover() {
  return (
    <section id="descubra" className="relative bg-ink py-28 lg:py-44">
      <div className="container-luxe">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Descubra"
            lines={["Um universo", <em key="e" className="italic text-champagne">de pequenos luxos.</em>]}
          />
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ivory/60 lg:col-span-4 lg:col-start-9 lg:pb-4" data-reveal="up">
            Cada coleção foi pensada como uma vitrine de boutique — poucos itens, muito critério e o cuidado de quem escolhe presentes para pessoas queridas.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              data-cursor="Explorar"
              data-reveal={item.from}
              className={`group relative block ${item.layout}`}
            >
              <div className={`relative overflow-hidden ${item.aspect}`}>
                <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                  <Scene name={item.scene} lift />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/10 transition-opacity duration-1000 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-ink/25 opacity-100 transition-opacity duration-1000 group-hover:opacity-0" />
                <span className="absolute left-6 top-6 text-[0.62rem] tracking-[0.3em] text-champagne/70 lg:left-8 lg:top-8">{item.n}</span>
                <div className="absolute inset-x-6 bottom-6 lg:inset-x-10 lg:bottom-10">
                  <h3 className="display text-[clamp(2.4rem,5vw,4.4rem)] text-ivory transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                    {item.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-full origin-left scale-x-[0.12] bg-gold transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-[0.85rem] text-ivory/70">{item.text}</p>
                    <span className="flex shrink-0 items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-gold-light opacity-100 transition-all duration-700 lg:translate-x-[-8px] lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                      Explorar <ArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
