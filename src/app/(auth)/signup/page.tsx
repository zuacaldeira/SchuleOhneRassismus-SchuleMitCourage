"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <>
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto mb-3 h-12 w-12 text-green-600"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h2 className="mb-2 text-xl font-bold text-green-800">
            Bestätigungs-E-Mail gesendet
          </h2>
          <p className="mb-4 text-sm text-green-700">
            Bitte prüfe dein Postfach und klicke auf den Bestätigungslink, um
            dein Konto zu aktivieren.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-fachschule-teal px-6 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light"
          >
            Zur Anmeldung
          </Link>
        </div>
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-dark/40 hover:underline">
            &larr; Zurück zur Startseite
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-2 text-center text-2xl font-bold text-fachschule-teal">
        Registrieren
      </h1>
      <p className="mb-6 text-center text-sm text-dark/60">
        Erstelle ein Konto für den Mitgliederbereich
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="mb-1 block text-sm font-medium text-dark">
            Anzeigename
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-dark">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-dark">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
          />
          <p className="mt-1 text-xs text-dark/50">Mindestens 6 Zeichen</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-fachschule-teal px-4 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light disabled:opacity-50"
        >
          {loading ? "Wird registriert..." : "Registrieren"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-dark/60">
        Bereits ein Konto?{" "}
        <Link href="/login" className="font-semibold text-fachschule-teal hover:underline">
          Anmelden
        </Link>
      </p>
      <p className="mt-2 text-center">
        <Link href="/" className="text-sm text-dark/40 hover:underline">
          &larr; Zurück zur Startseite
        </Link>
      </p>
    </>
  );
}
