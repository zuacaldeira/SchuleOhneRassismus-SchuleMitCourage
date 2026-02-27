"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <h1 className="mb-2 text-center text-2xl font-bold text-fachschule-teal">
        Anmelden
      </h1>
      <p className="mb-6 text-center text-sm text-dark/60">
        Melde dich im Mitgliederbereich an
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-fachschule-teal px-4 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light disabled:opacity-50"
        >
          {loading ? "Wird angemeldet..." : "Anmelden"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-dark/60">
        Noch kein Konto?{" "}
        <Link href="/signup" className="font-semibold text-fachschule-teal hover:underline">
          Registrieren
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
