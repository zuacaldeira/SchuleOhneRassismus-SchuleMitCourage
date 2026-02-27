import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-fachschule-teal text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-3 text-lg font-bold">
              Schule ohne Rassismus &ndash; Schule mit Courage
            </h3>
            <p className="text-sm leading-relaxed text-fachschule-cyan">
              Eine Initiative der Freien Fachschule für Sozialpädagogik Berlin
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-lg font-bold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ueber-uns" className="transition-colors hover:text-fachschule-cyan">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/aktionen" className="transition-colors hover:text-fachschule-cyan">
                  Aktionen
                </Link>
              </li>
              <li>
                <Link href="/mitmachen" className="transition-colors hover:text-fachschule-cyan">
                  Mitmachen
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="transition-colors hover:text-fachschule-cyan">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-lg font-bold">Kontakt</h3>
            <address className="space-y-1 text-sm not-italic leading-relaxed text-fachschule-cyan">
              <p>Freie Fachschule für Sozialpädagogik Berlin</p>
              <p>Schule ohne Rassismus &ndash; Schule mit Courage</p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-fachschule-teal-light pt-6 text-center text-xs text-fachschule-cyan">
          &copy; {new Date().getFullYear()} Schule ohne Rassismus &ndash;
          Schule mit Courage &middot; Freie Fachschule für Sozialpädagogik
          Berlin
        </div>
      </div>
    </footer>
  );
}
