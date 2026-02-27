import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BackofficeSidebar from "@/components/BackofficeSidebar";
import BackofficeHeader from "@/components/BackofficeHeader";

export default async function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.display_name || user.email || "Mitglied";

  return (
    <div className="flex min-h-screen bg-light">
      <BackofficeSidebar />
      <div className="flex flex-1 flex-col">
        <BackofficeHeader displayName={displayName} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
