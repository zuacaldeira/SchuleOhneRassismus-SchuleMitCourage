"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewDirectMessage({ userId }: { userId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ id: string; display_name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query: string) {
    setSearch(query);
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name")
      .ilike("display_name", `%${query}%`)
      .neq("id", userId)
      .limit(10);

    setResults((data ?? []) as { id: string; display_name: string }[]);
  }

  async function startDM(otherUserId: string, otherName: string) {
    setLoading(true);
    const supabase = createClient();

    // Check if a DM room already exists between these two users
    const { data: myRooms } = await supabase
      .from("room_members")
      .select("room_id")
      .eq("user_id", userId);

    const { data: theirRooms } = await supabase
      .from("room_members")
      .select("room_id")
      .eq("user_id", otherUserId);

    const myRoomIds = new Set(myRooms?.map((r) => r.room_id) ?? []);
    const sharedRoomIds = (theirRooms ?? [])
      .filter((r) => myRoomIds.has(r.room_id))
      .map((r) => r.room_id);

    if (sharedRoomIds.length > 0) {
      // Check if any shared room is a direct message room
      const { data: dmRooms } = await supabase
        .from("chat_rooms")
        .select("id")
        .in("id", sharedRoomIds)
        .eq("is_direct", true);

      if (dmRooms && dmRooms.length > 0) {
        router.push(`/chat/${dmRooms[0].id}`);
        return;
      }
    }

    // Create new DM room
    const { data: room } = await supabase
      .from("chat_rooms")
      .insert({
        name: otherName,
        is_direct: true,
        created_by: userId,
      })
      .select("id")
      .single();

    if (room) {
      // Add both users as members
      await supabase.from("room_members").insert([
        { room_id: room.id, user_id: userId },
        { room_id: room.id, user_id: otherUserId },
      ]);

      router.push(`/chat/${room.id}`);
      router.refresh();
    }

    setLoading(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-fachschule-teal px-4 py-2 text-sm font-bold text-fachschule-teal transition-colors hover:bg-fachschule-teal hover:text-white"
      >
        + Neue Direktnachricht
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-light bg-white p-4">
      <h3 className="mb-3 text-sm font-bold text-fachschule-teal">
        Direktnachricht starten
      </h3>
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Mitglied suchen..."
        className="mb-3 w-full rounded-lg border border-light px-3 py-2 text-sm text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
        autoFocus
      />
      {results.length > 0 && (
        <ul className="mb-3 max-h-40 space-y-1 overflow-y-auto">
          {results.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => startDM(user.id, user.display_name)}
                disabled={loading}
                className="w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-light disabled:opacity-50"
              >
                {user.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {search.length >= 2 && results.length === 0 && (
        <p className="mb-3 text-xs text-dark/40">Keine Mitglieder gefunden.</p>
      )}
      <button
        onClick={() => {
          setOpen(false);
          setSearch("");
          setResults([]);
        }}
        className="text-sm text-dark/60 hover:underline"
      >
        Abbrechen
      </button>
    </div>
  );
}
