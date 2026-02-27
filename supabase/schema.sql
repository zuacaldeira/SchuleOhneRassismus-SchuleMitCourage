-- =============================================
-- Schule ohne Rassismus – Backoffice Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Profiles (auto-created on signup via trigger)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Chat rooms
create table public.chat_rooms (
  id uuid default gen_random_uuid() primary key,
  name text not null default '',
  is_direct boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.chat_rooms enable row level security;

create policy "Members can view their rooms"
  on public.chat_rooms for select
  using (
    exists (
      select 1 from public.room_members
      where room_members.room_id = chat_rooms.id
        and room_members.user_id = auth.uid()
    )
  );

create policy "Authenticated users can create rooms"
  on public.chat_rooms for insert
  with check (auth.uid() = created_by);

-- 3. Room members (join table)
create table public.room_members (
  room_id uuid references public.chat_rooms(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

alter table public.room_members enable row level security;

create policy "Members can view room members"
  on public.room_members for select
  using (
    exists (
      select 1 from public.room_members as rm
      where rm.room_id = room_members.room_id
        and rm.user_id = auth.uid()
    )
  );

create policy "Room creators can add members"
  on public.room_members for insert
  with check (
    auth.uid() in (
      select created_by from public.chat_rooms where id = room_id
    )
    or auth.uid() = user_id
  );

-- 4. Messages
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.chat_rooms(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Members can view room messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.room_members
      where room_members.room_id = messages.room_id
        and room_members.user_id = auth.uid()
    )
  );

create policy "Members can send messages to their rooms"
  on public.messages for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.room_members
      where room_members.room_id = messages.room_id
        and room_members.user_id = auth.uid()
    )
  );

-- Indexes
create index idx_messages_room_id on public.messages(room_id);
create index idx_messages_created_at on public.messages(created_at);
create index idx_room_members_user_id on public.room_members(user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable realtime on messages
alter publication supabase_realtime add table public.messages;
