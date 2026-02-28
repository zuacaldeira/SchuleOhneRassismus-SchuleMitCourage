"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/aktionen", label: "Aktionen" },
  { href: "/mitmachen", label: "Mitmachen" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const mobileMenuRef = useFocusTrap(menuOpen, closeMenu);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-fachschule-teal text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div>
            <span className="block text-lg font-bold leading-tight">
              Schule ohne Rassismus
            </span>
            <span className="block text-sm text-fachschule-cyan">
              Schule mit Courage
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-fachschule-teal-light hover:text-fachschule-cyan"
            >
              {link.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-fachschule-teal-light" />
          <div aria-live="polite">
            {authLoading ? (
              <span className="inline-block h-9 w-24 animate-pulse rounded bg-fachschule-teal-light" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded bg-fachschule-teal-light px-3 py-2 text-sm font-medium transition-colors hover:bg-fachschule-cyan hover:text-fachschule-teal"
                >
                  Backoffice
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-fachschule-teal-light hover:text-fachschule-cyan"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded bg-sor-orange px-3 py-2 text-sm font-bold transition-colors hover:bg-sor-orange-dark"
              >
                Anmelden
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          ref={mobileMenuRef as React.RefObject<HTMLElement>}
          className="border-t border-fachschule-teal-light px-4 pb-4 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-fachschule-teal-light hover:text-fachschule-cyan"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2 border-fachschule-teal-light" />
          <div aria-live="polite">
            {authLoading ? (
              <span className="block h-9 w-24 animate-pulse rounded bg-fachschule-teal-light" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-fachschule-teal-light hover:text-fachschule-cyan"
                  onClick={() => setMenuOpen(false)}
                >
                  Backoffice
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-fachschule-teal-light hover:text-fachschule-cyan"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block rounded px-3 py-2 text-sm font-bold text-sor-orange transition-colors hover:bg-fachschule-teal-light"
                onClick={() => setMenuOpen(false)}
              >
                Anmelden
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
