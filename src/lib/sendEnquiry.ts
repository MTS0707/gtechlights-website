import { site } from "@/config/site";
import type { Enquiry } from "@/lib/enquiry";

/**
 * Sends a website enquiry to info@gtechlights.com through Web3Forms
 * (https://web3forms.com) — needed because GitHub Pages cannot run server code.
 *
 * The access key is public by design (it only allows sending to the registered
 * inbox). Set it as NEXT_PUBLIC_WEB3FORMS_KEY: locally in `.env.local`, and for
 * the live site as a GitHub repository variable (see README → Deployment).
 * Without a key the form shows its email/WhatsApp/call fallback instead.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export type SendResult = "sent" | "not_configured" | "failed";

export async function sendEnquiry(data: Enquiry, honeypot: string): Promise<SendResult> {
  if (honeypot) return "sent"; // bot filled the hidden field: pretend success, send nothing
  if (!WEB3FORMS_KEY) return "not_configured";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Website enquiry — ${data.projectType} — ${data.name}`,
        from_name: `${site.name} Website`,
        replyto: data.email,
        Name: data.name,
        Company: data.company || "—",
        Phone: data.phone,
        Email: data.email,
        "Project type": data.projectType,
        Message: data.message,
        "Privacy consent": `Agreed on website form (${new Date().toISOString()})`,
        botcheck: false,
      }),
    });
    const json = await res.json().catch(() => ({}));
    return res.ok && json.success ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
