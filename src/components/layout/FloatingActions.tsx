"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, MessageSquareText, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 01-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43a9.4 9.4 0 016.68 2.77 9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0012.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.32 11.32 0 005.36 1.37h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03z" />
    </svg>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop / tablet floating buttons */}
      <div className="fixed bottom-6 right-5 z-40 hidden flex-col items-end gap-3 md:flex">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`grid size-12 place-items-center border border-ink-900/10 bg-white text-ink-900 shadow-lg transition-all duration-300 hover:bg-mist ${
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <ArrowUp className="size-5" />
        </button>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with G Tech Lights on WhatsApp"
          className="group flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-all duration-300 hover:gap-2 hover:pr-5"
        >
          <WhatsAppIcon className="size-6 shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">
            WhatsApp us
          </span>
        </a>
      </div>

      {/* Mobile sticky action bar */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-ink-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <a href={`tel:${site.phones[0].tel}`} className="flex min-h-15 flex-col items-center justify-center gap-1 text-xs font-semibold text-white">
          <Phone aria-hidden className="size-5" /> Call
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-15 flex-col items-center justify-center gap-1 bg-[#25D366] text-xs font-semibold text-white"
        >
          <WhatsAppIcon className="size-5" /> WhatsApp
        </a>
        <Link href="/contact" className="flex min-h-15 flex-col items-center justify-center gap-1 bg-brand-600 text-xs font-semibold text-white">
          <MessageSquareText aria-hidden className="size-5" /> Enquire
        </Link>
      </nav>
    </>
  );
}
