"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useConsent } from "@/lib/consent";
import { fullAddress, mapsEmbedUrl, mapsLinkUrl } from "@/config/site";

/** Google Map that loads only after the visitor allows third-party content (Google may set cookies). */
export function ConsentMap() {
  const { consent, save } = useConsent();

  if (consent.embeds) {
    return (
      <iframe
        title="G Tech Lights location on Google Maps"
        src={mapsEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[26rem] w-full grayscale-[0.6] sm:h-[32rem]"
      />
    );
  }

  return (
    <div className="arch-grid-light grid h-[26rem] place-items-center bg-mist px-5 text-center sm:h-[32rem]">
      <div className="max-w-md">
        <MapPin aria-hidden className="mx-auto size-10 text-brand-600" />
        <p className="mt-4 font-semibold text-ink-900">{fullAddress.slice(0, 3).join(", ")}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">
          The map is provided by Google, which may set cookies. Load it here, or open the location directly in Google Maps.{" "}
          <Link href="/cookie-policy" className="font-semibold text-brand-600 hover:text-brand-800">
            Cookie Policy
          </Link>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => save(true)} className="min-h-12 bg-brand-600 px-6 font-semibold text-white hover:bg-brand-700">
            Load map
          </button>
          <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border border-ink-900 px-6 font-semibold text-ink-900 hover:bg-ink-900 hover:text-white">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
