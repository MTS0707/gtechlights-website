import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { footerNav, fullAddress, site, whatsappUrl } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { channelPartners } from "@/data/partners";
import { legalDocs } from "@/data/legal";
import { CookieSettingsLink } from "@/components/legal/CookieBanner";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent" />
      <Container className="pb-28 pt-20 md:pb-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverse className="h-16 w-auto sm:h-20" />
            <p lang="kn" className="mt-5 font-kannada text-2xl font-bold text-white/90 sm:text-3xl">
              {site.nameKannada}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">{site.descriptor}</p>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed">
              Customized architectural, interior and designer lighting — designed, engineered and manufactured in Bengaluru. Built on more
              than 20 years of lighting industry experience. UPS & battery sales and services.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow text-white">Quick Links</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 text-[0.95rem] lg:grid-cols-1 lg:gap-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-10 items-center transition-colors hover:text-white lg:min-h-0">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-5">
            <h2 className="eyebrow text-white">Contact</h2>
            <ul className="mt-6 space-y-5 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <address className="not-italic leading-relaxed">
                  {site.name}
                  <br />
                  {fullAddress.slice(0, 4).map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <div className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="transition-colors hover:text-white">
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${site.email.primary}`} className="text-white transition-colors hover:text-brand-200">
                    {site.email.primary}
                  </a>
                  <span className="text-sm">
                    Alternate:{" "}
                    <a href={`mailto:${site.email.secondary}`} className="transition-colors hover:text-white">
                      {site.email.secondary}
                    </a>
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <Globe aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                <a href={site.url} className="transition-colors hover:text-white">
                  gtechlights.com
                </a>
              </li>
            </ul>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>

        {channelPartners.length > 0 && (
          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:gap-8">
            <p className="eyebrow text-[0.65rem] text-ink-400">Channel partner of</p>
            <ul className="flex flex-wrap items-center gap-8">
              {channelPartners.map((p) => (
                <li key={p.name}>
                  <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} sizes="240px" className="h-9 w-auto" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.established} {site.name}. All Rights Reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 sm:gap-y-2">
              {legalDocs.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}`} className="inline-flex min-h-10 items-center transition-colors hover:text-white sm:min-h-0">
                    {d.title}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsLink className="min-h-10 transition-colors hover:text-white sm:min-h-0" />
              </li>
            </ul>
          </nav>
          <p>GSTIN: {site.gstin}</p>
        </div>
      </Container>
    </footer>
  );
}
