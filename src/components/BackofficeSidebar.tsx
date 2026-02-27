"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "Chat" },
  { href: "/profil", label: "Profil" },
];

export default function BackofficeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-light bg-white md:block">
      <div className="px-4 py-6">
        <Link href="/" className="block text-sm font-bold text-fachschule-teal">
          Schule ohne Rassismus
        </Link>
        <span className="text-xs text-dark/50">Mitgliederbereich</span>
      </div>
      <nav className="space-y-1 px-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-fachschule-teal text-white"
                  : "text-dark/70 hover:bg-light hover:text-dark"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
