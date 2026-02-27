import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CreateRoomDialog from "@/components/CreateRoomDialog";

export const metadata: Metadata = {
  title: "Chat – Mitgliederbereich",
};

export default async function ChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get room IDs the user is a member of
  const { data: memberships } = await supabase
    .from("room_members")
    .select("room_id")
    .eq("user_id", user!.id);

  const roomIds = memberships?.map((m) => m.room_id) ?? [];

  let rooms: { id: string; name: string; is_direct: boolean; created_at: string }[] = [];
  if (roomIds.length > 0) {
    const { data } = await supabase
      .from("chat_rooms")
      .select("id, name, is_direct, created_at")
      .in("id", roomIds)
      .order("created_at", { ascending: false });
    rooms = (data ?? []) as typeof rooms;
  }

  const groupRooms = rooms.filter((r) => !r.is_direct);
  const dmRooms = rooms.filter((r) => r.is_direct);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-fachschule-teal">Chat</h1>

      <div className="mb-6">
        <CreateRoomDialog userId={user!.id} />
      </div>

      {/* Group rooms */}
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-dark/50">
          Gruppenchats
        </h2>
        {groupRooms.length === 0 ? (
          <p className="text-sm text-dark/40">Noch keine Gruppenchats.</p>
        ) : (
          <div className="space-y-2">
            {groupRooms.map((room) => (
              <Link
                key={room.id}
                href={`/chat/${room.id}`}
                className="block rounded-lg border border-light bg-white p-4 transition-shadow hover:shadow-md"
              >
                <span className="font-medium text-fachschule-teal">
                  {room.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Direct messages */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-dark/50">
          Direktnachrichten
        </h2>
        {dmRooms.length === 0 ? (
          <p className="text-sm text-dark/40">Noch keine Direktnachrichten.</p>
        ) : (
          <div className="space-y-2">
            {dmRooms.map((room) => (
              <Link
                key={room.id}
                href={`/chat/${room.id}`}
                className="block rounded-lg border border-light bg-white p-4 transition-shadow hover:shadow-md"
              >
                <span className="font-medium text-fachschule-teal">
                  {room.name || "Direktnachricht"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
