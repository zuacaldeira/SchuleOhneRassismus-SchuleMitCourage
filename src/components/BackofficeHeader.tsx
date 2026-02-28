"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function BackofficeHeader({
  displayName,
}: {
  displayName: string;
}) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between border-b border-light bg-white px-6 py-3">
      {/* Mobile nav links */}
      <nav className="flex gap-4 md:hidden">
        <Link href="/dashboard" className="text-sm font-medium text-fachschule-teal">
          Dashboard
        </Link>
        <Link href="/chat" className="text-sm font-medium text-fachschule-teal">
          Chat
        </Link>
        <Link href="/nachrichten" className="text-sm font-medium text-fachschule-teal">
          Nachrichten
        </Link>
        <Link href="/profil" className="text-sm font-medium text-fachschule-teal">
          Profil
        </Link>
      </nav>

      <div className="hidden md:block" />

      <div className="flex items-center gap-4">
        <span className="text-sm text-dark/60">{displayName}</span>
        <button
          onClick={handleLogout}
          className="rounded px-3 py-1.5 text-sm font-medium text-dark/60 transition-colors hover:bg-light hover:text-dark"
        >
          Abmelden
        </button>
      </div>
    </header>
  );
}
