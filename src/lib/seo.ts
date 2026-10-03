import type { Metadata } from "next";
import { site, fullAddress } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Site URLs end with "/" (trailingSlash in next.config) — keep canonical links identical to the served URL. */
export const withSlash = (path: string) => (path === "/" || path.endsWith("/") ? path : `${path}/`);

/** Builds per-page metadata with canonical URL and Open Graph / Twitter tags. */
export function pageMetadata({ title, description, path: rawPath, image = "/og-image.jpg" }: PageMeta): Metadata {
  const path = withSlash(rawPath);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

/** Organization + LocalBusiness structured data (schema.org). */
export function organizationJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.nameKannada,
      url: site.url,
      logo: `${site.url}/images/logo/g-tech-lights-logo.svg`,
      email: site.email.primary,
      telephone: site.phones[0].tel,
      foundingDate: String(site.established),
      address,
      contactPoint: site.phones.map((p) => ({
        "@type": "ContactPoint",
        telephone: p.tel,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Kannada"],
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ElectricalContractor"],
      "@id": `${site.url}/#localbusiness`,
      name: site.name,
      description: site.shortDescription,
      url: site.url,
      image: `${site.url}/og-image.jpg`,
      logo: `${site.url}/images/logo/g-tech-lights-logo.svg`,
      email: site.email.primary,
      telephone: site.phones.map((p) => p.tel),
      taxID: site.gstin,
      address,
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        { "@type": "State", name: "Karnataka" },
      ],
      knowsAbout: [
        "Architectural lighting",
        "Interior lighting",
        "Designer lighting",
        "Customized lighting fixtures",
        "UPS sales and service",
        "Battery sales and service",
      ],
      parentOrganization: { "@id": `${site.url}/#organization` },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress.join(", "))}`,
    },
  ];
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${withSlash(item.path)}`,
    })),
  };
}
