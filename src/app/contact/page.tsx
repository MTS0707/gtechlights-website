import { Mail, MapPin, Phone, Globe, FileText } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, mapsLinkUrl, site, whatsappUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ContactFormFromQuery } from "@/components/sections/ContactFormFromQuery";
import { ConsentMap } from "@/components/legal/ConsentMap";

export const metadata = pageMetadata({
  title: "Contact — Lighting Company Bangalore",
  description:
    "Contact G Tech Lights, Nagasandra, Bengaluru. Call +91 81978 31032, email info@gtechlights.com or WhatsApp us to discuss your lighting, UPS or battery requirement.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your space"
        intro={<p>Tell us about your lighting, UPS or battery requirement. Call, email, WhatsApp or send an enquiry below.</p>}
        breadcrumb={[{ name: "Contact", path: "/contact" }]}
      >
        <Button href={`tel:${site.phones[0].tel}`} arrow>
          Call {site.phones[0].display}
        </Button>
        <Button href={whatsappUrl()} variant="light">
          WhatsApp Us
        </Button>
        <Button href={`mailto:${site.email.primary}`} variant="outline-light">
          Email Us
        </Button>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Send an enquiry</h2>
              <p className="mt-3 text-ink-500">Share a few details and our team will get back to you.</p>
              <div className="mt-12">
                <ContactFormFromQuery />
              </div>
            </div>

            <aside className="lg:col-span-5" aria-labelledby="contact-details">
              <div className="on-dark bg-ink-950 p-8 sm:p-10">
                <h2 id="contact-details" className="text-2xl font-semibold text-white">
                  {site.name.toUpperCase()}
                </h2>
                <p lang="kn" className="mt-1 font-kannada text-ink-300">
                  {site.nameKannada}
                </p>
                <ul className="mt-8 space-y-7 text-[0.95rem] text-ink-200">
                  <li className="flex gap-4">
                    <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <div>
                      <address className="not-italic leading-relaxed">
                        {fullAddress.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </address>
                      <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand-300 hover:text-white">
                        Get directions →
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <div className="flex flex-col gap-1.5">
                      {site.phones.map((p) => (
                        <a key={p.tel} href={`tel:${p.tel}`} className="text-lg font-medium text-white hover:text-brand-200">
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="eyebrow text-[0.62rem] text-ink-400">Primary email</p>
                        <a href={`mailto:${site.email.primary}`} className="text-lg font-medium text-white hover:text-brand-200">
                          {site.email.primary}
                        </a>
                      </div>
                      <div>
                        <p className="eyebrow text-[0.62rem] text-ink-400">Secondary email</p>
                        <a href={`mailto:${site.email.secondary}`} className="hover:text-white">
                          {site.email.secondary}
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Globe aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <a href={site.url} className="hover:text-white">
                      {site.url}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <FileText aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <span>GSTIN: {site.gstin}</span>
                  </li>
                </ul>
                <div className="mt-10 grid grid-cols-3 gap-2">
                  <a href={`tel:${site.phones[0].tel}`} className="flex min-h-12 items-center justify-center bg-brand-600 text-sm font-semibold text-white hover:bg-brand-500">
                    Call
                  </a>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center bg-[#25D366] text-sm font-semibold text-white hover:brightness-95"
                  >
                    WhatsApp
                  </a>
                  <a href={`mailto:${site.email.primary}`} className="flex min-h-12 items-center justify-center border border-white/25 text-sm font-semibold text-white hover:border-white">
                    Email
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section aria-label="Map" className="border-t border-ink-100">
        <ConsentMap />
      </section>
    </>
  );
}
