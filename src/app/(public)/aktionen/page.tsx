import type { Metadata } from "next";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Aktionen – Schule ohne Rassismus",
  description:
    "Unsere vergangenen und geplanten Projekte und Aktionen an der Freien Fachschule für Sozialpädagogik Berlin.",
};

const vergangeneAktionen = [
  {
    title: "Projekttag gegen Diskriminierung",
    description:
      "Ein ganzer Tag mit Workshops zu Alltagsrassismus, Privilegien und Zivilcourage. Studierende aller Semester haben teilgenommen.",
    tag: "Workshop",
  },
  {
    title: "Filmabend: 'Der junge Häuptling Winnetou' – Debatte",
    description:
      "Gemeinsame Filmvorführung mit anschließender Diskussion über kulturelle Aneignung und Repräsentation.",
    tag: "Veranstaltung",
  },
  {
    title: "Wanderausstellung 'Vielfalt'",
    description:
      "Eine von Studierenden gestaltete Ausstellung zu Vielfalt und Toleranz, die durch alle Etagen der Schule wanderte.",
    tag: "Ausstellung",
  },
  {
    title: "Lesung mit Autorin",
    description:
      "Eine Autorin las aus ihrem Buch über Alltagsrassismus und diskutierte anschließend mit den Studierenden.",
    tag: "Lesung",
  },
];

const geplanteAktionen = [
  {
    title: "Aktionstag zum Internationalen Tag gegen Rassismus",
    description:
      "Am 21. März planen wir einen Aktionstag mit verschiedenen Mitmach-Stationen, Redebeiträgen und einem gemeinsamen Zeichen.",
    tag: "Geplant",
  },
  {
    title: "Workshop-Reihe: Couragiert handeln",
    description:
      "Eine mehrteilige Workshop-Reihe zu Zivilcourage im Alltag und in pädagogischen Kontexten.",
    tag: "Geplant",
  },
  {
    title: "Kooperation mit anderen SoR-SmC-Schulen",
    description:
      "Vernetzungstreffen und gemeinsame Aktionen mit anderen Berliner Schulen aus dem Netzwerk.",
    tag: "Geplant",
  },
];

export default function Aktionen() {
  return (
    <>
      {/* Page header */}
      <section className="bg-fachschule-teal py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Unsere Aktionen</h1>
          <p className="mt-3 text-fachschule-cyan">
            Vergangene und geplante Projekte
          </p>
        </div>
      </section>

      {/* Geplante Aktionen */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-sor-orange">
            Geplante Aktionen
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {geplanteAktionen.map((aktion) => (
              <Card key={aktion.title} {...aktion} />
            ))}
          </div>
        </div>
      </section>

      {/* Vergangene Aktionen */}
      <section className="bg-light py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-fachschule-teal">
            Vergangene Aktionen
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vergangeneAktionen.map((aktion) => (
              <Card key={aktion.title} {...aktion} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
