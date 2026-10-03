"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { projectTypes, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { site, whatsappUrl } from "@/config/site";
import { useQuoteList } from "@/lib/quote";

type Status = "idle" | "sending" | "success" | "error";

const empty: Enquiry = { name: "", company: "", phone: "", email: "", projectType: "", message: "", consent: false };

type Props = {
  defaultProjectType?: string;
  defaultMessage?: string;
  /** Product codes from the quote list; the list is cleared once the enquiry is sent. */
  quoteCodes?: string[];
};

export function ContactForm({ defaultProjectType = "", defaultMessage = "", quoteCodes = [] }: Props) {
  const [values, setValues] = useState<Enquiry>({ ...empty, projectType: defaultProjectType, message: defaultMessage });
  const quote = useQuoteList();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const mailtoFallback = () =>
    `mailto:${site.email.primary}?subject=${encodeURIComponent(`Website enquiry — ${values.projectType || "Lighting"}`)}&body=${encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nPhone: ${values.phone}\nEmail: ${values.email}\nProject type: ${values.projectType}\n\n${values.message}`,
    )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { errors: found } = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    try {
      const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        if (quoteCodes.length) quote.clear();
        setValues({ ...empty });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerMessage(typeof json.error === "string" && !["not_configured", "send_failed"].includes(json.error) ? json.error : "");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-brand-200 bg-brand-50 p-8 sm:p-10">
        <CheckCircle2 aria-hidden className="size-10 text-brand-600" />
        <h3 className="mt-5 text-2xl font-semibold text-ink-900">Thank you — your enquiry has been sent.</h3>
        <p className="mt-3 leading-relaxed text-ink-600">
          Our team will get back to you shortly. For anything urgent, call us on{" "}
          <a className="font-semibold text-brand-600" href={`tel:${site.phones[0].tel}`}>
            {site.phones[0].display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 font-semibold text-brand-600 hover:text-brand-800">
          Send another enquiry
        </button>
      </div>
    );
  }

  const field = "peer block w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-base text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-0";
  const border = (k: keyof Enquiry) => (errors[k] ? "border-red-600 focus:border-red-600" : "border-ink-200 focus:border-brand-600");
  const label = "block text-xs font-semibold uppercase tracking-[0.14em] text-ink-500";
  const err = (k: keyof Enquiry) =>
    errors[k] ? (
      <p id={`enquiry-${k}-error`} className="mt-2 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Enquiry) => ({
    id: `enquiry-${k}`,
    name: k,
    "aria-invalid": Boolean(errors[k]) || undefined,
    "aria-describedby": errors[k] ? `enquiry-${k}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 sm:grid-cols-2" aria-describedby="enquiry-note">
      <div>
        <label htmlFor="enquiry-name" className={label}>
          Name <span className="text-brand-600">*</span>
        </label>
        <input {...aria("name")} autoComplete="name" required value={values.name} onChange={set("name")} className={`${field} ${border("name")}`} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="enquiry-company" className={label}>
          Company
        </label>
        <input {...aria("company")} autoComplete="organization" value={values.company} onChange={set("company")} className={`${field} ${border("company")}`} />
      </div>
      <div>
        <label htmlFor="enquiry-phone" className={label}>
          Phone <span className="text-brand-600">*</span>
        </label>
        <input {...aria("phone")} type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={set("phone")} className={`${field} ${border("phone")}`} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="enquiry-email" className={label}>
          Email <span className="text-brand-600">*</span>
        </label>
        <input {...aria("email")} type="email" autoComplete="email" required value={values.email} onChange={set("email")} className={`${field} ${border("email")}`} />
        {err("email")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="enquiry-projectType" className={label}>
          Project Type <span className="text-brand-600">*</span>
        </label>
        <select {...aria("projectType")} required value={values.projectType} onChange={set("projectType")} className={`${field} ${border("projectType")} cursor-pointer`}>
          <option value="" disabled>
            Select a project type
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {err("projectType")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="enquiry-message" className={label}>
          Message <span className="text-brand-600">*</span>
        </label>
        <textarea
          {...aria("message")}
          rows={5}
          required
          value={values.message}
          onChange={set("message")}
          placeholder="Tell us about the space, the lighting you have in mind, quantities and timelines."
          className={`${field} ${border("message")} resize-y`}
        />
        {err("message")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="enquiry-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-600">
          <input
            id="enquiry-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => {
              const checked = e.target.checked;
              setValues((v) => ({ ...v, consent: checked }));
              if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }));
            }}
            aria-invalid={Boolean(errors.consent) || undefined}
            aria-describedby={errors.consent ? "enquiry-consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-brand-600"
          />
          <span>
            I agree to {site.name} using these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-800">
              Privacy Policy
            </Link>
            . <span className="text-brand-600">*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" className="flex gap-3 border border-red-200 bg-red-50 p-5 text-sm text-red-800 sm:col-span-2">
          <AlertTriangle aria-hidden className="size-5 shrink-0" />
          <div>
            <p className="font-semibold">{serverMessage || "We couldn't send your enquiry online right now."}</p>
            <p className="mt-1">
              Please{" "}
              <a href={mailtoFallback()} className="font-semibold underline">
                email it to {site.email.primary}
              </a>
              ,{" "}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                message us on WhatsApp
              </a>{" "}
              or call{" "}
              <a href={`tel:${site.phones[0].tel}`} className="font-semibold underline">
                {site.phones[0].display}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="enquiry-note" className="text-sm text-ink-500">
          Fields marked * are required. Enquiries go to {site.email.primary}.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-13 items-center justify-center gap-2 bg-brand-600 px-8 font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}
