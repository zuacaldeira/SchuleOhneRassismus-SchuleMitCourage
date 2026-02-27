"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: { display_name: string } | null;
}

export default function ChatWindow({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    // Load existing messages
    supabase
      .from("messages")
      .select("id, content, created_at, user_id, profiles(display_name)")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as unknown as Message[]);
      });

    // Subscribe to new messages
    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("id", payload.new.user_id)
            .single();

          const newMsg: Message = {
            ...(payload.new as Message),
            profiles: profile,
          };

          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const supabase = createClient();

    await supabase.from("messages").insert({
      room_id: roomId,
      user_id: userId,
      content: newMessage.trim(),
    });

    setNewMessage("");
    setSending(false);
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Messages area */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-dark/40">
            Noch keine Nachrichten. Schreibe die erste!
          </p>
        )}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            content={msg.content}
            displayName={msg.profiles?.display_name || "Unbekannt"}
            createdAt={msg.created_at}
            isOwn={msg.user_id === userId}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSend}
        className="flex gap-2 border-t border-light bg-white p-4"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nachricht schreiben..."
          className="flex-1 rounded-lg border border-light px-4 py-2 text-sm text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
        />
        <button
          type="submit"
          disabled={sending || !newMessage.trim()}
          className="rounded-lg bg-fachschule-teal px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-fachschule-teal-light disabled:opacity-50"
        >
          Senden
        </button>
      </form>
    </div>
  );
}
