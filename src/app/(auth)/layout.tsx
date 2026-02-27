import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anmelden – Schule ohne Rassismus",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-light px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {children}
      </div>
    </div>
  );
}
