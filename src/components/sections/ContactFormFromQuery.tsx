"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { projectTypes } from "@/lib/enquiry";
import { ContactForm } from "./ContactForm";

/** Maps a ?type= hint from CTA links to one of the form's project types. */
function matchProjectType(hint: string | null) {
  if (!hint) return "";
  const h = hint.toLowerCase();
  const pick = (needle: string) => projectTypes.find((t) => t.toLowerCase().includes(needle)) ?? "";
  if (h.includes("quot") || h.includes("price")) return pick("quotation");
  if (h.includes("ups") || h.includes("batter")) return pick("ups");
  if (h.includes("custom")) return pick("customized");
  if (h.includes("architectural")) return pick("architectural");
  if (h.includes("interior")) return pick("interior");
  if (h.includes("designer") || h.includes("decorative") || h.includes("specialty")) return pick("designer");
  if (h.includes("residential")) return pick("residential");
  if (h.includes("hospitality") || h.includes("retail")) return pick("hospitality");
  if (h.includes("commercial") || h.includes("corporate")) return pick("commercial");
  return "";
}

function FormWithQuery() {
  const params = useSearchParams();
  const defaultType = matchProjectType(params.get("type"));
  // Product codes from the catalogue quote list (e.g. ?products=GTC 1504,GTC 1510)
  const codes = (params.get("products") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter((c) => /^GTC [\w-]{2,15}$/i.test(c))
    .slice(0, 50);
  const defaultMessage = codes.length
    ? ["Please share the price and best offer for:", ...codes.map((c) => `- ${c} — Qty: `), "", "Site / delivery location: "].join("\n")
    : "";
  return <ContactForm key={defaultType + codes.join()} defaultProjectType={defaultType} defaultMessage={defaultMessage} quoteCodes={codes} />;
}

/**
 * Contact form pre-filled from the page address (?type=…&products=…).
 * Read in the browser so the contact page can be a static page on GitHub Pages.
 */
export function ContactFormFromQuery() {
  return (
    <Suspense fallback={<ContactForm />}>
      <FormWithQuery />
    </Suspense>
  );
}
