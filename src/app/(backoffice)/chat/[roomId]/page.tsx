import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ChatWindow from "@/components/ChatWindow";
import MemberList from "@/components/MemberList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const supabase = await createClient();
  const { data: room } = await supabase
    .from("chat_rooms")
    .select("name")
    .eq("id", roomId)
    .single();

  return {
    title: room ? `${room.name} – Chat` : "Chat",
  };
}

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check room exists
  const { data: room } = await supabase
    .from("chat_rooms")
    .select("id, name, is_direct, created_by")
    .eq("id", roomId)
    .single();

  if (!room) {
    notFound();
  }

  // Check membership
  const { data: membership } = await supabase
    .from("room_members")
    .select("user_id")
    .eq("room_id", roomId)
    .eq("user_id", user!.id)
    .single();

  if (!membership) {
    notFound();
  }

  // Load initial members for the member list
  let initialMembers: { user_id: string; display_name: string }[] = [];
  if (!room.is_direct) {
    const { data: memberRows } = await supabase
      .from("room_members")
      .select("user_id")
      .eq("room_id", roomId);

    if (memberRows && memberRows.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name")
        .in("id", memberRows.map((m) => m.user_id));

      initialMembers = (profiles ?? []).map((p) => ({
        user_id: p.id,
        display_name: p.display_name,
      }));
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="flex flex-1 flex-col">
        {/* Room header */}
        <div className="flex items-center gap-3 border-b border-light bg-white px-4 py-3">
          <Link
            href="/chat"
            className="text-sm text-dark/40 hover:text-dark"
          >
            &larr; Zurück
          </Link>
          <h1 className="text-lg font-bold text-fachschule-teal">
            {room.name || "Direktnachricht"}
          </h1>
        </div>

        <ChatWindow roomId={roomId} userId={user!.id} />
      </div>

      {!room.is_direct && (
        <div className="hidden w-64 shrink-0 lg:block">
          <MemberList
            roomId={roomId}
            roomCreatedBy={room.created_by}
            currentUserId={user!.id}
            initialMembers={initialMembers}
          />
        </div>
      )}
    </div>
  );
}
