import nodemailer from "nodemailer";
import { site } from "@/config/site";
import { validateEnquiry } from "@/lib/enquiry";

/**
 * Website enquiry endpoint. Sends enquiries to info@gtechlights.com via SMTP.
 *
 * Required environment variables (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * Optional:
 *   ENQUIRY_TO   (defaults to info@gtechlights.com)
 *   ENQUIRY_FROM (defaults to SMTP_USER)
 */

// Very small in-memory rate limit (per server instance) to deter spam bursts.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many enquiries. Please try again later or call us." }, { status: 429 });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[enquiry] SMTP is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS.");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Project type", data.projectType],
    ["Privacy consent", `Agreed on website form (${new Date().toISOString()})`],
  ];

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${process.env.ENQUIRY_FROM || SMTP_USER}>`,
      to: process.env.ENQUIRY_TO || site.email.primary,
      replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
      subject: `Website enquiry — ${data.projectType} — ${data.name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}\n`,
      html: `<h2 style="font-family:Arial,sans-serif">New website enquiry</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5a6072">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`)
        .join("")}</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(data.message)}</p>`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] sendMail failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
