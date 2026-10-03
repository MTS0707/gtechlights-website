"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronUp, ClipboardList, MessageCircle, Trash2, X } from "lucide-react";
import { quoteContactUrl, quoteWhatsappUrl, useQuoteList } from "@/lib/quote";

/**
 * Floating quote list: appears once a product is added. Sits above the mobile
 * contact bar and to the left of the desktop WhatsApp button.
 */
export function QuoteBar() {
  const { items, remove, clear } = useQuoteList();
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Quote list"
      className="fixed inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 md:inset-x-auto md:bottom-6 md:left-6 md:w-[26rem]"
    >
      <div className="on-dark overflow-hidden border border-white/10 bg-ink-950 text-white shadow-2xl">
        {open && (
          <div className="max-h-64 overflow-y-auto border-b border-white/10 p-4">
            <ul className="flex flex-wrap gap-2">
              {items.map((code) => (
                <li key={code} className="flex items-center gap-1 bg-white/10 py-1 pl-3 pr-1 text-sm">
                  {code}
                  <button type="button" onClick={() => remove(code)} aria-label={`Remove ${code}`} className="grid size-7 place-items-center hover:text-brand-200">
                    <X aria-hidden className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={clear} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-300 hover:text-white">
              <Trash2 aria-hidden className="size-3.5" /> Clear list
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 p-2 pl-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex min-h-11 flex-1 items-center gap-2 text-left text-sm font-semibold"
          >
            <ClipboardList aria-hidden className="size-5 text-brand-300" />
            Quote list
            <span className="grid min-w-6 place-items-center bg-brand-600 px-1.5 text-xs tabular-nums">{items.length}</span>
            <ChevronUp aria-hidden className={`size-4 text-ink-400 transition-transform ${open ? "" : "rotate-180"}`} />
          </button>
          <a
            href={quoteWhatsappUrl(items)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send quote list on WhatsApp"
            className="grid size-11 place-items-center bg-[#25D366] text-white hover:brightness-95"
          >
            <MessageCircle aria-hidden className="size-5" />
          </a>
          <Link href={quoteContactUrl(items)} className="inline-flex min-h-11 items-center bg-brand-600 px-4 text-sm font-semibold hover:bg-brand-500">
            Get quote
          </Link>
        </div>
      </div>
    </div>
  );
}
