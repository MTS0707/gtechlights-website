"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie / storage consent.
 *
 * Categories:
 *  - essential: always on (quote list kept in localStorage, consent record itself)
 *  - embeds:    third-party content that may set cookies (Google Maps on the contact page)
 *
 * The choice is stored in localStorage under "gtech-consent". If storage is
 * blocked, the choice lasts for the current page view only.
 */

export type Consent = { decided: boolean; embeds: boolean; date?: string };

const KEY = "gtech-consent";
const DEFAULT: Consent = { decided: false, embeds: false };
const SERVER: Consent = { decided: true, embeds: false }; // no banner during server render
let cached: Consent | null = null;
let memory: Consent = DEFAULT;
let bannerOpen = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function read(): Consent {
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(KEY);
    cached = raw ? { ...DEFAULT, ...(JSON.parse(raw) as Consent) } : memory;
  } catch {
    cached = memory;
  }
  return cached;
}

function write(next: Consent) {
  memory = next;
  cached = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked — keep for this page view */
  }
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, read, () => SERVER);
  const settingsOpen = useSyncExternalStore(subscribe, () => bannerOpen, () => false);
  return {
    consent,
    /** Banner shows until a choice is made, or when reopened from "Cookie settings". */
    showBanner: !consent.decided || settingsOpen,
    save: (embeds: boolean) => {
      bannerOpen = false;
      write({ decided: true, embeds, date: new Date().toISOString() });
    },
    openSettings: () => {
      bannerOpen = true;
      emit();
    },
  };
}
