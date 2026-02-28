import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ContactMessageList from "./ContactMessageList";

export const metadata: Metadata = {
  title: "Nachrichten – Mitgliederbereich",
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default async function NachrichtenPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("contact_messages")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false });

  const messages = (data ?? []) as unknown as ContactMessage[];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-fachschule-teal">
        Kontakt-Nachrichten
      </h1>

      {messages.length === 0 ? (
        <p className="text-sm text-dark/40">Noch keine Nachrichten.</p>
      ) : (
        <ContactMessageList messages={messages} />
      )}
    </div>
  );
}
