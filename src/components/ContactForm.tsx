"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        throw new Error("Konfigurationsfehler. Bitte versuche es später erneut.");
      }

      const res = await fetch(`${supabaseUrl}/functions/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.",
      );
    }
  };

  if (state === "success") {
    return (
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
        <h3 className="mb-2 text-xl font-bold text-green-800">
          Nachricht gesendet!
        </h3>
        <p className="text-sm text-green-700">
          Vielen Dank für deine Nachricht. Wir melden uns so schnell wie
          möglich bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {state === "error" && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1 block text-sm font-medium text-dark"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1 block text-sm font-medium text-dark"
        >
          E-Mail
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-dark"
        >
          Nachricht
        </label>
        <textarea
          id="contact-message"
          required
          maxLength={2000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-light bg-white px-4 py-2 text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
        />
        <p className="mt-1 text-right text-xs text-dark/50">
          {message.length}/2000
        </p>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full rounded-lg bg-fachschule-teal px-4 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light disabled:opacity-50"
      >
        {state === "loading" ? "Wird gesendet..." : "Nachricht senden"}
      </button>
    </form>
  );
}
