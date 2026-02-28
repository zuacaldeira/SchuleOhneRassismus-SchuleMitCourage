import type { Metadata } from "next";
import { DiversityIllustration } from "@/components/icons";

export const metadata: Metadata = {
  title: "Über uns – Schule ohne Rassismus",
  description:
    "Erfahre mehr über das Netzwerk Schule ohne Rassismus – Schule mit Courage und unsere Gruppe an der Freien Fachschule für Sozialpädagogik Berlin.",
};

export default function UeberUns() {
  return (
    <>
      {/* Page header */}
      <section className="bg-fachschule-teal py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Über uns</h1>
          <p className="mt-3 text-fachschule-cyan">
            Das Netzwerk und unsere Gruppe an der Fachschule
          </p>
          <div className="mt-6 flex justify-center">
            <DiversityIllustration />
          </div>
        </div>
      </section>

      {/* SoR-SmC Netzwerk */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-fachschule-teal">
            Das Netzwerk Schule ohne Rassismus – Schule mit Courage
          </h2>
          <div className="space-y-4 text-dark/80 leading-relaxed">
            <p>
              <strong className="text-sor-orange">
                Schule ohne Rassismus – Schule mit Courage
              </strong>{" "}
              ist das größte Schulnetzwerk in Deutschland mit über 4.000
              Schulen. Es bietet Schülerinnen, Schülern und Pädagoginnen und
              Pädagogen die Möglichkeit, das Klima an ihrer Schule aktiv
              mitzugestalten.
            </p>
            <p>
              Wer sich zu dem Netzwerk bekennt, unterschreibt eine
              Selbstverpflichtung: Sich gegen jede Form von Diskriminierung
              einzusetzen und bei Konflikten einzugreifen. Der Titel ist kein
              Preis, sondern eine Selbstverpflichtung für die Gegenwart und die
              Zukunft.
            </p>
            <p>
              Die Bundeskoordination liegt bei der Aktion Courage e.V. Jede
              Schule, die den Titel trägt, hat mindestens eine Patin oder einen
              Paten aus dem öffentlichen Leben, der die Arbeit unterstützt.
            </p>
          </div>
        </div>
      </section>

      {/* Unsere Gruppe */}
      <section className="bg-light py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-fachschule-teal">
            Unsere Gruppe an der Freien Fachschule für Sozialpädagogik
          </h2>
          <div className="space-y-4 text-dark/80 leading-relaxed">
            <p>
              An unserer Fachschule haben wir uns als Gruppe zusammengefunden,
              die das Thema Antirassismus und Courage fest im Schulalltag
              verankern möchte. Wir bestehen aus engagierten Studierenden und
              Lehrenden, die gemeinsam Projekte planen und umsetzen.
            </p>
            <p>
              Unsere Arbeit umfasst Workshops, Projekttage, Filmvorführungen,
              Diskussionsrunden und kreative Aktionen. Wir verstehen uns als
              lernende Gemeinschaft, die sich kontinuierlich mit Themen wie
              Rassismus, Antisemitismus, Sexismus und anderen Formen der
              Diskriminierung auseinandersetzt.
            </p>
            <p>
              Als angehende Sozialpädagoginnen und Sozialpädagogen sehen wir es
              als besondere Verantwortung, diese Werte in unsere zukünftige
              berufliche Praxis zu tragen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
