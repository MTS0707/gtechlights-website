"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav, site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Dropdown that was just used: kept closed until the pointer leaves it, so it doesn't hang open over the next page.
  const [dismissed, setDismissed] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open; close it on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "border-b border-white/10 bg-ink-950/92 backdrop-blur-md" : "bg-gradient-to-b from-ink-950/70 to-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-18 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" aria-label="G Tech Lights — home" className="shrink-0">
          <Logo inverse className="h-11 w-auto lg:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label} className="group relative" onMouseLeave={() => setDismissed(null)}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-[0.92rem] font-medium transition-colors ${
                      item.children.some((c) => isActive(c.href)) ? "text-white" : "text-ink-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className="size-3.5 transition-transform group-hover:rotate-180 group-has-[:focus-visible]:rotate-180" />
                  </Link>
                  <div
                    className={`invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100 ${
                      dismissed === item.label ? "invisible! opacity-0!" : ""
                    }`}
                  >
                    <ul className="min-w-60 border border-white/10 bg-ink-950/96 p-2 shadow-2xl backdrop-blur-md">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={(e) => {
                              setDismissed(item.label);
                              e.currentTarget.blur();
                            }}
                            className={`block px-4 py-3 text-sm transition-colors hover:bg-white/5 hover:text-white ${
                              isActive(c.href) ? "text-white" : "text-ink-300"
                            }`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative px-3 py-2 text-[0.92rem] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-brand-400 after:transition-transform ${
                      isActive(item.href) ? "text-white after:scale-x-100" : "text-ink-300 after:scale-x-0 hover:text-white hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phones[0].tel}`}
            className="hidden items-center gap-2 px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:text-white lg:flex"
          >
            <Phone aria-hidden className="size-4" />
            {site.phones[0].display}
          </a>
          <Link
            href="/contact"
            className="hidden min-h-11 items-center bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 sm:inline-flex"
          >
            Discuss Your Project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-12 place-items-center text-white xl:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-ink-950 xl:hidden"
      >
        <nav
          aria-label="Mobile"
          className="px-5 py-6 sm:px-8"
          onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        >
          <ul className="divide-y divide-white/10">
            <li>
              <Link href="/" className="block py-4 text-lg font-medium text-white">
                Home
              </Link>
            </li>
            {mainNav.flatMap((item) => item.children ?? [item]).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-4 text-lg font-medium ${isActive(item.href) ? "text-brand-300" : "text-white"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/insights" className="block py-4 text-lg font-medium text-white">
                Lighting Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-4 text-lg font-medium text-white">
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact" className="flex min-h-13 items-center justify-center bg-brand-600 font-semibold text-white">
              Discuss Your Project
            </Link>
            {site.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="flex min-h-12 items-center justify-center gap-2 border border-white/20 text-white">
                <Phone aria-hidden className="size-4" /> {p.display}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
