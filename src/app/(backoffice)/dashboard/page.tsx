import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard – Mitgliederbereich",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user!.id)
    .single();

  const displayName = profile?.display_name || "Mitglied";

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold text-fachschule-teal">
        Willkommen, {displayName}!
      </h1>
      <p className="mb-8 text-dark/60">
        Dies ist dein Mitgliederbereich. Hier kannst du mit anderen Mitgliedern
        chatten und dein Profil verwalten.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/chat"
          className="rounded-xl border border-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="mb-2 text-lg font-bold text-fachschule-teal">Chat</h2>
          <p className="text-sm text-dark/60">
            Schreibe Nachrichten an andere Mitglieder und in Gruppenchats.
          </p>
        </Link>
        <Link
          href="/profil"
          className="rounded-xl border border-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="mb-2 text-lg font-bold text-fachschule-teal">Profil</h2>
          <p className="text-sm text-dark/60">
            Verwalte deinen Anzeigenamen und deine Profileinstellungen.
          </p>
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="mb-2 text-lg font-bold text-fachschule-teal">
            Zur Website
          </h2>
          <p className="text-sm text-dark/60">
            Zurück zur öffentlichen Website.
          </p>
        </Link>
      </div>
    </div>
  );
}
