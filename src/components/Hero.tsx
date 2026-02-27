import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-fachschule-teal text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
          Schule ohne Rassismus –{" "}
          <span className="text-sor-orange">Schule mit Courage</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-fachschule-cyan md:text-xl">
          Gemeinsam setzen wir uns an der Freien Fachschule für Sozialpädagogik
          Berlin für ein respektvolles Miteinander und gegen jede Form von
          Diskriminierung ein.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/mitmachen"
            className="inline-block rounded-lg bg-sor-orange px-8 py-3 font-bold text-white transition-colors hover:bg-sor-orange-dark"
          >
            Mitmachen
          </Link>
          <Link
            href="/ueber-uns"
            className="inline-block rounded-lg border-2 border-fachschule-cyan px-8 py-3 font-bold text-fachschule-cyan transition-colors hover:bg-fachschule-cyan hover:text-fachschule-teal"
          >
            Mehr erfahren
          </Link>
        </div>
      </div>
    </section>
  );
}
