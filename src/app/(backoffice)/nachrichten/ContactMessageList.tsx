"use client";

import { useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function ContactMessageList({
  messages,
}: {
  messages: ContactMessage[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-2">
      {messages.map((msg) => {
        const isExpanded = expandedId === msg.id;
        const date = new Date(msg.created_at).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <button
            key={msg.id}
            onClick={() => toggle(msg.id)}
            className="block w-full rounded-lg border border-light bg-white p-4 text-left transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-fachschule-teal">{msg.name}</p>
                <p className="text-sm text-dark/60">{msg.email}</p>
              </div>
              <span className="shrink-0 text-xs text-dark/40">{date}</span>
            </div>

            {isExpanded ? (
              <p className="mt-3 whitespace-pre-wrap text-sm text-dark/80">
                {msg.message}
              </p>
            ) : (
              <p className="mt-2 truncate text-sm text-dark/50">
                {msg.message}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
