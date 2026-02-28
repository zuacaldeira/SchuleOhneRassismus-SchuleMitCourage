create policy "Authenticated users can view contact messages"
  on public.contact_messages for select
  using (auth.uid() is not null);
