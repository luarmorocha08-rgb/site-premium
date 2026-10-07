import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-ink px-5 pt-24 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="display mt-6 text-[clamp(2.6rem,6vw,5rem)]">
        Este perfume <em className="italic text-champagne">evaporou.</em>
      </h1>
      <p className="mt-6 max-w-sm text-ivory/60">A página que você procura não existe ou mudou de endereço.</p>
      <Link href="/" className="btn btn-gold mt-10">
        Voltar ao início
      </Link>
    </section>
  );
}
