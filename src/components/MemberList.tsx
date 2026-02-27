"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Member {
  user_id: string;
  display_name: string;
}

export default function MemberList({
  roomId,
  roomCreatedBy,
  currentUserId,
  initialMembers,
}: {
  roomId: string;
  roomCreatedBy: string | null;
  currentUserId: string;
  initialMembers: Member[];
}) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: string; display_name: string }[]>([]);
  const [adding, setAdding] = useState(false);

  const isCreator = currentUserId === roomCreatedBy;

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  async function refreshMembers() {
    const supabase = createClient();
    const { data: memberRows } = await supabase
      .from("room_members")
      .select("user_id")
      .eq("room_id", roomId);

    if (!memberRows) return;

    const userIds = memberRows.map((m) => m.user_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", userIds);

    setMembers(
      (profiles ?? []).map((p) => ({
        user_id: p.id,
        display_name: p.display_name,
      }))
    );
  }

  async function handleSearch(query: string) {
    setSearch(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const supabase = createClient();
    const memberIds = members.map((m) => m.user_id);

    const { data } = await supabase
      .from("profiles")
      .select("id, display_name")
      .ilike("display_name", `%${query}%`)
      .limit(10);

    setSearchResults(
      ((data ?? []) as { id: string; display_name: string }[]).filter(
        (p) => !memberIds.includes(p.id)
      )
    );
  }

  async function addMember(userId: string) {
    setAdding(true);
    const supabase = createClient();

    await supabase.from("room_members").insert({
      room_id: roomId,
      user_id: userId,
    });

    setSearch("");
    setSearchResults([]);
    await refreshMembers();
    setAdding(false);
  }

  return (
    <div className="rounded-lg border border-light bg-white p-4">
      <h3 className="mb-3 text-sm font-bold text-fachschule-teal">
        Mitglieder ({members.length})
      </h3>
      <ul className="mb-3 space-y-1">
        {members.map((m) => (
          <li key={m.user_id} className="text-sm text-dark/70">
            {m.display_name || "Unbekannt"}
            {m.user_id === currentUserId && (
              <span className="ml-1 text-xs text-dark/40">(du)</span>
            )}
          </li>
        ))}
      </ul>

      {isCreator && (
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Mitglied hinzufügen..."
            className="w-full rounded-lg border border-light px-3 py-2 text-sm text-dark outline-none focus:border-fachschule-cyan focus:ring-2 focus:ring-fachschule-cyan/30"
          />
          {searchResults.length > 0 && (
            <ul className="mt-1 max-h-32 space-y-1 overflow-y-auto">
              {searchResults.map((user) => (
                <li key={user.id}>
                  <button
                    onClick={() => addMember(user.id)}
                    disabled={adding}
                    className="w-full rounded px-3 py-1.5 text-left text-sm transition-colors hover:bg-light disabled:opacity-50"
                  >
                    + {user.display_name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
