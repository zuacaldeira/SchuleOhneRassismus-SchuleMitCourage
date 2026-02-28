import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Schule ohne Rassismus",
  description:
    "Kontaktiere die Gruppe Schule ohne Rassismus – Schule mit Courage an der Freien Fachschule für Sozialpädagogik Berlin.",
};

export default function Kontakt() {
  return (
    <>
      {/* Page header */}
      <section className="bg-fachschule-teal py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Kontakt</h1>
          <p className="mt-3 text-fachschule-cyan">
            Wir freuen uns über deine Nachricht
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-fachschule-teal">
                Ansprechpartner
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-dark">Unsere Gruppe</h3>
                  <p className="text-dark/70">
                    Schule ohne Rassismus – Schule mit Courage
                  </p>
                  <p className="text-dark/70">
                    Freie Fachschule für Sozialpädagogik Berlin
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-dark">Adresse</h3>
                  <address className="not-italic text-dark/70">
                    <p>Freie Fachschule für Sozialpädagogik Berlin</p>
                    <p>Berlin</p>
                  </address>
                </div>
                <div>
                  <h3 className="font-bold text-dark">So erreichst du uns</h3>
                  <p className="text-dark/70">
                    Sprich uns direkt in der Schule an oder komm zu einem
                    unserer Treffen. Die aktuellen Termine findest du an den
                    Aushängen in der Schule.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal contact info card */}
            <div className="rounded-lg border border-light bg-fachschule-teal/5 p-8">
              <div className="mb-4 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-sor-orange"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-fachschule-teal">
                  Persönlicher Kontakt
                </h2>
              </div>
              <p className="mb-4 leading-relaxed text-dark/80">
                Am besten erreichst du uns direkt in der Schule. Sprich uns in
                den Pausen an, komm zu einem unserer Treffen oder wende dich an
                deine Lehrkräfte – sie können dich an uns weiterleiten.
              </p>
              <p className="text-sm text-dark/60">
                Ein Online-Kontaktformular ist für die Zukunft geplant. Bis
                dahin freuen wir uns auf den persönlichen Austausch!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
