import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mitmachen – Schule ohne Rassismus",
  description:
    "Engagiere dich bei Schule ohne Rassismus – Schule mit Courage an der Freien Fachschule für Sozialpädagogik Berlin.",
};

const moeglichkeiten = [
  {
    title: "Aktionsgruppe beitreten",
    description:
      "Werde festes Mitglied unserer Gruppe und plane mit uns Projekte, Workshops und Veranstaltungen. Wir treffen uns regelmäßig.",
    icon: "👥",
  },
  {
    title: "Projekte mitgestalten",
    description:
      "Du hast eine Idee für ein Projekt oder eine Aktion? Bring sie ein! Wir unterstützen dich bei der Umsetzung.",
    icon: "💡",
  },
  {
    title: "Workshops besuchen",
    description:
      "Nimm an unseren Workshops teil und setze dich intensiv mit Themen wie Antirassismus, Zivilcourage und Vielfalt auseinander.",
    icon: "📚",
  },
  {
    title: "Botschafter*in werden",
    description:
      "Trage die Werte von Schule ohne Rassismus in deinen Alltag und deine zukünftige pädagogische Arbeit.",
    icon: "🌍",
  },
];

export default function Mitmachen() {
  return (
    <>
      {/* Page header */}
      <section className="bg-fachschule-teal py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-extrabold">Mitmachen</h1>
          <p className="mt-3 text-fachschule-cyan">
            Engagiere dich für ein respektvolles Miteinander
          </p>
        </div>
      </section>

      {/* Engagement-Möglichkeiten */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-fachschule-teal">
            So kannst du dich engagieren
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-dark/70">
            Es gibt viele Wege, Teil unserer Arbeit zu werden. Egal ob du viel
            oder wenig Zeit hast – jeder Beitrag zählt.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {moeglichkeiten.map((m) => (
              <div
                key={m.title}
                className="rounded-lg border border-light bg-white p-6 shadow-sm"
              >
                <div className="mb-3 text-3xl">{m.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-fachschule-teal">
                  {m.title}
                </h3>
                <p className="text-sm leading-relaxed text-dark/70">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sor-orange py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Interesse geweckt?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Schreib uns eine Nachricht und wir melden uns bei dir. Gemeinsam
            machen wir den Unterschied!
          </p>
          <Link
            href="/kontakt"
            className="inline-block rounded-lg bg-fachschule-teal px-8 py-3 font-bold text-white transition-colors hover:bg-fachschule-teal-light"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
