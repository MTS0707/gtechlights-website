"use client";

import { useSyncExternalStore } from "react";
import { site, whatsappUrl } from "@/config/site";

/**
 * Quote list: product codes a visitor wants pricing for.
 * Kept in localStorage so it survives navigation to the contact page; falls back
 * to in-memory state when storage is unavailable (private mode, blocked cookies).
 */

const KEY = "gtech-quote-list";
const EMPTY: string[] = [];
let memory: string[] = [];
let cached: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(KEY);
    cached = raw ? (JSON.parse(raw) as string[]) : memory;
  } catch {
    cached = memory;
  }
  return cached;
}

function write(next: string[]) {
  memory = next;
  cached = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cached = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useQuoteList() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  // Mutations read the current list (not the rendered snapshot) so rapid clicks never drop an item.
  return {
    items,
    has: (code: string) => items.includes(code),
    toggle: (code: string) => {
      const now = read();
      write(now.includes(code) ? now.filter((c) => c !== code) : [...now, code]);
    },
    remove: (code: string) => write(read().filter((c) => c !== code)),
    clear: () => write([]),
  };
}

/** WhatsApp link asking for pricing on one or more product codes. */
export function quoteWhatsappUrl(codes: string[]) {
  const list = codes.join(", ");
  return whatsappUrl(
    codes.length === 1
      ? `Hello ${site.name}, I would like the price and best offer for ${list}.`
      : `Hello ${site.name}, I would like the price and best offer for these products: ${list}.`,
  );
}

/** Contact page link with the products pre-filled in the enquiry. */
export function quoteContactUrl(codes: string[]) {
  return `/contact?type=quotation&products=${encodeURIComponent(codes.join(","))}`;
}
