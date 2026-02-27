"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateRoomDialog({ userId }: { userId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!roomName.trim()) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { data: room, error: roomError } = await supabase
      .from("chat_rooms")
      .insert({
        name: roomName.trim(),
        is_direct: false,
        created_by: userId,
      })
      .select("id")
      .single();

    if (roomError) {
      setError(roomError.message);
      setLoading(false);
      return;
    }

    // Add creator as member
    await supabase.from("room_members").insert({
      room_id: room.id,
      user_id: userId,
    });

    setRoomName("");
    setOpen(false);
    setLoading(false);
    router.push(`/chat/${room.id}`);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg bg-sor-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-sor-orange-dark"
      >
        + Neuer Gruppenchat
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-light bg-white p-4">
      <h3 className="mb-3 text-sm font-bold text-fachschule-teal">
        Neuen Gruppenchat erstellen
      </h3>

      {error && (
        <p className="mb-2 text-xs text-red-600">{error}</p>
      )}

      <form onSubmit={handleCreate} className="space-y-3">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Name des Gruppenchats"
          required
          className="w-full rounded-lg border border-light px-3 py-2 text-sm text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-fachschule-teal px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-fachschule-teal-light disabled:opacity-50"
          >
            {loading ? "Erstellen..." : "Erstellen"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setRoomName("");
              setError(null);
            }}
            className="rounded-lg px-3 py-2 text-sm text-dark/60 transition-colors hover:bg-light"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
