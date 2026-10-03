import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { JsonLd } from "@/components/ui/JsonLd";
import { CookieBanner } from "@/components/legal/CookieBanner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Only used for the Kannada brand name.
const notoKannada = Noto_Sans_Kannada({
  variable: "--font-noto-kannada",
  subsets: ["kannada"],
  weight: ["500", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "G Tech Lights | Architectural, Interior & Designer Lighting in Bengaluru",
    template: "%s | G Tech Lights",
  },
  description:
    "Customized architectural, interior and designer lighting solutions in Bengaluru — built on 20+ years of lighting industry experience. Custom lighting manufacturing, UPS & battery sales and services.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    "architectural lighting Bangalore",
    "architectural lighting Bengaluru",
    "designer lights Bangalore",
    "customized lighting Bangalore",
    "interior lighting Bangalore",
    "customized lighting manufacturer Bangalore",
    "designer lighting manufacturer Bangalore",
    "commercial lighting Bangalore",
    "lighting company Bangalore",
    "lighting solutions Bangalore",
    "UPS and battery services Bangalore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: "G Tech Lights | Customized Architectural & Designer Lighting",
    description: "Engineering Light. Designing Experiences. Customized lighting solutions in Bengaluru, backed by 20+ years of industry experience.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "G Tech Lights" }],
    emails: [site.email.primary],
    phoneNumbers: site.phones.map((p) => p.tel),
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${notoKannada.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <CookieBanner />
      </body>
    </html>
  );
}
