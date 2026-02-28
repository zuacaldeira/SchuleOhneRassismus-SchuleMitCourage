import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot — bots fill hidden fields, real users don't
    if (website) {
      return jsonResponse({ success: true });
    }

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) {
      return jsonResponse({ error: "Name muss zwischen 1 und 100 Zeichen lang sein." }, 400);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return jsonResponse({ error: "Bitte gib eine gültige E-Mail-Adresse an." }, 400);
    }

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length < 1 || message.trim().length > 2000) {
      return jsonResponse({ error: "Nachricht muss zwischen 1 und 2000 Zeichen lang sein." }, 400);
    }

    // Insert into database using service role (auto-injected by Supabase)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return jsonResponse({ error: "Nachricht konnte nicht gespeichert werden." }, 500);
    }

    // Send email notification via Resend (non-fatal)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const contactEmail = Deno.env.get("CONTACT_EMAIL");

    if (resendKey && contactEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SOR-SMC Kontakt <onboarding@resend.dev>",
            to: [contactEmail],
            subject: `Neue Kontaktnachricht von ${name.trim()}`,
            text: `Name: ${name.trim()}\nE-Mail: ${email.trim()}\n\nNachricht:\n${message.trim()}`,
          }),
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Non-fatal: message is already saved in DB
      }
    }

    return jsonResponse({ success: true });
  } catch {
    return jsonResponse({ error: "Ungültige Anfrage." }, 400);
  }
});
