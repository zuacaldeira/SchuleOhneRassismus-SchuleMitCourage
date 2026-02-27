"use client";

export default function BackofficeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center">
      <h2 className="mb-2 text-xl font-bold text-fachschule-teal">
        Etwas ist schiefgelaufen
      </h2>
      <p className="mb-6 text-sm text-dark/60">
        {error.message || "Ein unerwarteter Fehler ist aufgetreten."}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-fachschule-teal px-6 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
