"use client";

import Link from "next/link";
import { Check, MessageCircle, Plus } from "lucide-react";
import { quoteContactUrl, quoteWhatsappUrl, useQuoteList } from "@/lib/quote";

/** "Add to quote" toggle for one product. */
export function QuoteToggle({ code, className = "" }: { code: string; className?: string }) {
  const { has, toggle } = useQuoteList();
  const added = has(code);
  return (
    <button
      type="button"
      onClick={() => toggle(code)}
      aria-pressed={added}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 border px-3 text-sm font-semibold transition-colors ${
        added ? "border-brand-600 bg-brand-600 text-white hover:bg-brand-700" : "border-ink-200 text-ink-800 hover:border-brand-600 hover:text-brand-600"
      } ${className}`}
    >
      {added ? <Check aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}
      {added ? "In quote list" : "Add to quote"}
      <span className="sr-only"> — {code}</span>
    </button>
  );
}

/** Large action block on the product detail page. */
export function ProductQuoteActions({ code }: { code: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Link
        href={quoteContactUrl([code])}
        className="inline-flex min-h-13 items-center justify-center bg-brand-600 px-6 font-semibold text-white transition-colors hover:bg-brand-700 sm:col-span-2"
      >
        Request Price &amp; Offer
      </Link>
      <a
        href={quoteWhatsappUrl([code])}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#25D366] px-5 font-semibold text-white transition hover:brightness-95"
      >
        <MessageCircle aria-hidden className="size-4" /> WhatsApp for price
      </a>
      <QuoteToggle code={code} className="min-h-12" />
    </div>
  );
}
