/**
 * Central company configuration. Every page, the footer, the contact form,
 * SEO metadata and structured data read from here — edit once, update everywhere.
 */

export const site = {
  name: "G Tech Lights",
  nameKannada: "ಜಿ ಟೆಕ್ ಲೈಟ್ಸ್",
  legalName: "G Tech Lights",
  url: "https://gtechlights.com",
  established: 2026,
  industryExperience: "20+",
  tagline: "Technology meets lights · Lighting the Future",
  positioning: "Customized Lighting Solutions for Inspired Spaces",
  statement: "Engineering Light. Designing Experiences.",
  descriptor: "Customized Architectural, Interior & Designer Lights",
  secondaryDescriptor: "Sales & Services | UPS & Batteries",
  shortDescription:
    "G Tech Lights designs and manufactures customized architectural, interior and designer lighting in Bengaluru — built on more than 20 years of lighting industry experience — and provides UPS and battery sales and services.",

  email: {
    primary: "info@gtechlights.com",
    secondary: "gtechlights@gmail.com",
  },

  phones: [
    // First entry is the main number (header, call buttons, structured data).
    { display: "+91 81978 31032", tel: "+918197831032" },
    { display: "+91 99802 02773", tel: "+919980202773" },
    { display: "+91 98445 43610", tel: "+919844543610" },
  ],

  /**
   * WhatsApp number in international format without "+" or spaces.
   * Override without a code change by setting NEXT_PUBLIC_WHATSAPP_NUMBER.
   */
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918197831032",
    message: "Hello G Tech Lights, I would like to discuss a lighting requirement.",
  },

  address: {
    line1: "No.16, Thippenahalli Main Road",
    line2: "Nagasandra Post",
    locality: "Bengaluru",
    district: "Bengaluru Urban",
    region: "Karnataka",
    postalCode: "560073",
    country: "India",
    countryCode: "IN",
  },

  gstin: "29ATZPC8169J1ZO",

  mapQuery: "No.16 Thippenahalli Main Road, Nagasandra Post, Bengaluru, Karnataka 560073",
} as const;

export const whatsappUrl = (message: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  site.address.district,
  `${site.address.region} – ${site.address.postalCode}`,
  site.address.country,
];

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Lighting",
    href: "/lighting-solutions",
    children: [
      { label: "Lighting Solutions", href: "/lighting-solutions" },
      { label: "Customized Lighting", href: "/customized-lighting" },
      { label: "Products", href: "/products" },
      { label: "R&D / Engineering", href: "/r-and-d" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "UPS & Batteries", href: "/ups-batteries" },
  { label: "Why Us", href: "/why-g-tech-lights" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Lighting Solutions", href: "/lighting-solutions" },
  { label: "Products", href: "/products" },
  { label: "Customized Lighting", href: "/customized-lighting" },
  { label: "Projects", href: "/projects" },
  { label: "R&D", href: "/r-and-d" },
  { label: "UPS & Batteries", href: "/ups-batteries" },
  { label: "Industries", href: "/industries" },
  { label: "Lighting Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
