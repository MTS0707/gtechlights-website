"use client";

import Link from "next/link";
import { useState } from "react";
import { Cookie } from "lucide-react";
import { useConsent } from "@/lib/consent";

/** Cookie consent banner. Non-essential = third-party embeds (Google Maps). No analytics/ads are used. */
export function CookieBanner() {
  const { consent, showBanner, save } = useConsent();
  const [manage, setManage] = useState(false);
  const [embeds, setEmbeds] = useState(consent.embeds);
  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-50 md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md"
    >
      <div className="on-dark border border-white/10 bg-ink-950 p-5 text-ink-200 shadow-2xl sm:p-6">
        <p id="cookie-title" className="flex items-center gap-2 font-semibold text-white">
          <Cookie aria-hidden className="size-5 text-brand-300" /> Cookies &amp; privacy
        </p>
        <p id="cookie-desc" className="mt-2 text-sm leading-relaxed">
          We use only what is needed for the site to work (such as your quote list). With your permission we also load Google Maps, which may
          set its own cookies. We do not use advertising or tracking cookies.{" "}
          <Link href="/cookie-policy" className="font-semibold text-white underline underline-offset-2 hover:text-brand-200">
            Cookie Policy
          </Link>
        </p>

        {manage && (
          <fieldset className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm">
            <legend className="sr-only">Cookie categories</legend>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-0.5 size-4 accent-brand-500" />
              <span>
                <span className="font-semibold text-white">Essential</span> — always on. Remembers your quote list and this choice.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={embeds} onChange={(e) => setEmbeds(e.target.checked)} className="mt-0.5 size-4 accent-brand-500" />
              <span>
                <span className="font-semibold text-white">Maps &amp; third-party content</span> — Google Maps on the contact page.
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {manage ? (
            <button type="button" onClick={() => save(embeds)} className="min-h-11 flex-1 bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-500">
              Save choices
            </button>
          ) : (
            <>
              <button type="button" onClick={() => save(true)} className="min-h-11 flex-1 bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-500">
                Accept all
              </button>
              <button type="button" onClick={() => save(false)} className="min-h-11 flex-1 border border-white/25 px-4 text-sm font-semibold text-white hover:border-white">
                Essential only
              </button>
              <button type="button" onClick={() => setManage(true)} className="min-h-11 px-3 text-sm font-semibold text-ink-300 underline underline-offset-2 hover:text-white">
                Manage
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie settings
    </button>
  );
}
