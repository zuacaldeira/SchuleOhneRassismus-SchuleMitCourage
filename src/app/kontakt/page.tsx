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

            {/* Contact form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-fachschule-teal">
                Schreib uns
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-sor-orange px-8 py-3 font-bold text-white transition-colors hover:bg-sor-orange-dark"
                >
                  Nachricht senden
                </button>
                <p className="text-xs text-dark/50">
                  Hinweis: Dieses Formular ist derzeit noch nicht aktiv. Bitte
                  kontaktiere uns direkt in der Schule.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
