import { Scene } from "@/components/visuals/Scenes";
import { SplitLines } from "@/components/ui/SplitLines";
import { Gift, Sparkle, Truck } from "@/components/ui/Icons";

const facts = [
  { icon: Sparkle, title: "Curadoria autoral", text: "Cada item é testado e escolhido a dedo." },
  { icon: Gift, title: "Pronto para presentear", text: "Embalagem elegante e cartão personalizado." },
  { icon: Truck, title: "Todo o Brasil", text: "Enviamos com cuidado para qualquer endereço." },
];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-ink py-28 lg:py-44">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden" data-reveal="clip">
            <div data-reveal-media className="absolute inset-0">
              <Scene name="about" />
            </div>
          </div>
          <div
            aria-hidden="true"
            data-speed="-0.4"
            className="absolute -bottom-10 -right-4 hidden h-40 w-40 items-center justify-center border border-gold/25 bg-ink/80 backdrop-blur-md md:flex lg:-right-12"
          >
            <p className="text-center font-script text-3xl leading-[0.9] text-champagne">
              feito com
              <span className="block">carinho</span>
              <span className="mt-2 block font-sans text-[0.5rem] uppercase tracking-[0.4em] text-gold">Bárbara</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow" data-reveal="fade">
            Sobre a Bárbara
          </p>
          <h2 className="display mt-6 text-[clamp(2.8rem,5.8vw,5.2rem)]" data-reveal="lines">
            <SplitLines lines={["Escolhidos", <em key="c" className="italic text-champagne">com carinho.</em>]} />
          </h2>
          <span aria-hidden="true" className="mt-10 block h-px w-28 bg-gold" data-reveal="draw" />
          <p className="mt-10 max-w-xl font-serif text-[1.45rem] font-light leading-relaxed text-ivory/85 lg:text-[1.7rem]" data-reveal="up">
            Na Bárbara Presentes, cada produto é escolhido pensando nos detalhes que tornam um momento especial.
          </p>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-ivory/60" data-reveal="up" data-delay="0.1">
            Perfumes, cosméticos e presentes selecionados para você encontrar a escolha perfeita para alguém especial — ou para você mesma.
          </p>
          <p className="mt-10 font-script text-5xl text-gold-light" data-reveal="fade" data-delay="0.2">
            Bárbara
          </p>

          <ul className="mt-14 grid gap-8 border-t border-ivory/10 pt-10 sm:grid-cols-3" data-reveal="stagger">
            {facts.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon className="h-5 w-5 text-gold" />
                <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ivory">{title}</p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ivory/55">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
