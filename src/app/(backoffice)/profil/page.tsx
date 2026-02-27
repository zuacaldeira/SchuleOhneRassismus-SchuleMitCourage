"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilPage() {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();

        if (data) {
          setDisplayName(data.display_name || "");
        }
      }
      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) {
      setMessage("Fehler beim Speichern: " + error.message);
    } else {
      setMessage("Profil gespeichert!");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-xl">
        <p className="text-dark/60">Profil wird geladen...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-fachschule-teal">Profil</h1>

      {message && (
        <div
          className={`mb-4 rounded-lg p-3 text-sm ${
            message.startsWith("Fehler")
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="displayName"
            className="mb-1 block text-sm font-medium text-dark"
          >
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
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-fachschule-teal px-6 py-2.5 font-bold text-white transition-colors hover:bg-fachschule-teal-light disabled:opacity-50"
        >
          {saving ? "Wird gespeichert..." : "Speichern"}
        </button>
      </form>
    </div>
  );
}
