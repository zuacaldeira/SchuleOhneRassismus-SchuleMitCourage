import Link from "next/link";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import { DiversityIllustration } from "@/components/icons";

const aktionen = [
  {
    title: "Projekttag gegen Diskriminierung",
    description:
      "Workshop-Tag mit interaktiven Übungen zum Thema Alltagsrassismus und Zivilcourage.",
    tag: "Workshop",
  },
  {
    title: "Filmvorführung & Diskussion",
    description:
      "Gemeinsame Filmabende mit anschließender Diskussionsrunde zu aktuellen Themen.",
    tag: "Veranstaltung",
  },
  {
    title: "Wanderausstellung",
    description:
      "Ausstellung zu den Themen Vielfalt, Toleranz und couragiertes Handeln in unserer Schule.",
    tag: "Ausstellung",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Über-uns Vorschau */}
      <section className="bg-light py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-fachschule-teal">
            Wer wir sind
          </h2>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-dark/80">
            Wir sind eine engagierte Gruppe von Studierenden und Lehrenden an
            der Freien Fachschule für Sozialpädagogik Berlin. Als Teil des
            bundesweiten Netzwerks{" "}
            <strong className="text-sor-orange">
              Schule ohne Rassismus – Schule mit Courage
            </strong>{" "}
            setzen wir uns aktiv für ein diskriminierungsfreies Lernumfeld ein.
          </p>
          <div className="mt-8 flex justify-center">
            <DiversityIllustration />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/ueber-uns"
              className="font-semibold text-fachschule-teal underline decoration-sor-orange decoration-2 underline-offset-4 transition-colors hover:text-sor-orange"
            >
              Mehr über uns erfahren &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Aktuelle Aktionen */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-fachschule-teal">
            Unsere Aktionen
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aktionen.map((aktion) => (
              <Card key={aktion.title} {...aktion} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/aktionen"
              className="font-semibold text-fachschule-teal underline decoration-sor-orange decoration-2 underline-offset-4 transition-colors hover:text-sor-orange"
            >
              Alle Aktionen ansehen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Mitmachen */}
      <section className="bg-sor-orange py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Du willst etwas verändern?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed">
            Werde Teil unserer Gruppe und engagiere dich für eine Schule ohne
            Rassismus und mit Courage. Jede Stimme zählt!
          </p>
          <Link
            href="/mitmachen"
            className="inline-block rounded-lg bg-fachschule-teal px-8 py-3 font-bold text-white transition-colors hover:bg-fachschule-teal-light"
          >
            Jetzt mitmachen
          </Link>
        </div>
      </section>
    </>
  );
}
