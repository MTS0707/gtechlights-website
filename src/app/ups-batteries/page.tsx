import { BatteryCharging, ClipboardCheck, PlugZap, Wrench, Zap } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { fitBody, fitFill, fitGap, fitSection } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "UPS & Battery Sales and Services Bangalore",
  description:
    "UPS and battery sales, installation, service, support and maintenance in Bengaluru from G Tech Lights — backed by promoter experience in UPS manufacturing.",
  path: "/ups-batteries",
});

const offerings = [
  {
    id: "ups-solutions",
    icon: Zap,
    title: "UPS Solutions",
    text: "Supply of UPS systems matched to your load and backup needs, for offices, commercial spaces and facilities.",
    points: ["Requirement assessment", "Product selection & supply", "Replacement & upgrades"],
  },
  {
    id: "battery-solutions",
    icon: BatteryCharging,
    title: "Battery Solutions",
    text: "Supply and replacement of batteries for UPS and power backup systems.",
    points: ["Battery supply", "Replacement planning", "Battery health checks"],
  },
  {
    id: "installation",
    icon: PlugZap,
    title: "Installation",
    text: "Installation and commissioning coordinated with your site and electrical team.",
    points: ["Site coordination", "Installation", "Handover"],
  },
  {
    id: "service-support",
    icon: Wrench,
    title: "Service & Support",
    text: "Responsive service for UPS and battery issues, with direct access to our team.",
    points: ["Breakdown support", "Troubleshooting", "Repairs & replacement"],
  },
  {
    id: "maintenance",
    icon: ClipboardCheck,
    title: "Maintenance",
    text: "Periodic maintenance to help power backup systems stay ready when needed.",
    points: ["Periodic inspection", "Preventive maintenance", "Service records"],
  },
];

export default function UpsPage() {
  return (
    <>
      <PageHero
        eyebrow="UPS & Batteries"
        title="Reliable power backup, supplied and serviced"
        intro={
          <p>
            Alongside lighting, G Tech Lights provides UPS and battery sales and services — backed by our promoters&apos; experience in UPS
            manufacturing.
          </p>
        }
        breadcrumb={[{ name: "UPS & Batteries", path: "/ups-batteries" }]}
      >
        <Button href="/contact?type=UPS%20%26%20Batteries" arrow>
          Request UPS / Battery Service
        </Button>
        <Button href={whatsappUrl("Hello G Tech Lights, I would like to enquire about UPS / battery sales or service.")} variant="outline-light">
          WhatsApp Us
        </Button>
      </PageHero>

      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={fitBody}>
          <SectionHeading number="01" eyebrow="What We Offer" title="Sales, installation, service and maintenance" />
          <ul className={`${fitGap} grid gap-px bg-ink-100 md:grid-cols-2 lg:grid-cols-3 xl:grid-rows-2 ${fitFill}`}>
            {offerings.map(({ id, icon: Icon, title, text, points }) => (
              <li key={id} id={id} className="reveal flex flex-col bg-white p-8 sm:p-10 xl:justify-center short:px-7 short:py-5">
                {/* Icon and title share a row on desktop to keep each card compact */}
                <div className="xl:flex xl:items-center xl:gap-4">
                  <Icon aria-hidden strokeWidth={1.5} className="size-10 shrink-0 text-brand-600 short:size-8" />
                  <h2 className="mt-8 text-2xl font-semibold text-ink-900 xl:mt-0 short:text-xl">{title}</h2>
                </div>
                <p className="mt-3 leading-relaxed text-ink-500 short:mt-2 short:text-sm">{text}</p>
                <ul className="mt-6 space-y-2 border-t border-ink-100 pt-6 text-[0.95rem] text-ink-700 short:mt-3 short:space-y-1 short:pt-3 short:text-sm">
                  {points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-brand-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="on-dark flex flex-col justify-between bg-brand-700 p-8 sm:p-10 short:px-7 short:py-5">
              <div>
                <p className="eyebrow text-brand-200">Brands & capacities</p>
                <p className="mt-5 text-lg leading-relaxed text-white short:mt-3 short:text-base">
                  Brands, capacities and ratings supplied are confirmed per requirement. Contact us with your load and backup needs.
                </p>
              </div>
              <Button href="/contact?type=UPS%20%26%20Batteries" variant="light" className="mt-8 self-start short:mt-4" arrow>
                Enquire now
              </Button>
            </li>
          </ul>
        </Container>
      </section>

      <CTASection title="Need UPS or battery support?" text="Call, email or WhatsApp us — we'll get back to you promptly." />
    </>
  );
}
