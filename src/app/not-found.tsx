import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-light px-4 text-center">
      <h1 className="mb-2 text-6xl font-extrabold text-fachschule-teal">404</h1>
      <p className="mb-6 text-lg text-dark/60">
        Diese Seite konnte nicht gefunden werden.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-fachschule-teal px-6 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
