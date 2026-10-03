import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { differentiator } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { PageHero } from "@/components/sections/PageHero";
import { WhyGrid } from "@/components/sections/WhyGrid";
import { ClientReferences } from "@/components/sections/ClientReferences";
import { CTASection } from "@/components/sections/CTASection";
import { fitBody, fitFill, fitGap, fitImage, fitSection } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "Why G Tech Lights — 20+ Years of Lighting Industry Experience",
  description:
    "Why architects, designers and businesses choose G Tech Lights: 20+ years of lighting industry experience, customized solutions, design + engineering approach and end-to-end support.",
  path: "/why-g-tech-lights",
});

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why G Tech Lights"
        title="Experience you can build on"
        intro={<p>Established in 2026. Built on more than 20 years of lighting industry experience.</p>}
        image={photo("projects/salon-rounded-profile-pendants", "")}
        breadcrumb={[{ name: "Why G Tech Lights", path: "/why-g-tech-lights" }]}
      />

      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={fitBody}>
          <SectionHeading number="01" eyebrow="Eight Reasons" title="What working with us looks like" />
          <WhyGrid className={`${fitGap} xl:grid-rows-2 ${fitFill}`} />
        </Container>
      </section>

      <section className={`on-dark relative overflow-hidden bg-ink-950 py-24 sm:py-32 ${fitSection}`}>
        <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
        <Container className={`relative ${fitBody}`}>
          <div className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${fitFill}`}>
            <div>
              <SectionHeading dark number="02" eyebrow="Our Combination" title="One partner, from lighting design to power backup" />
              <ol className="mt-12 space-y-0 short:mt-6">
                {differentiator.map((d, i) => (
                  <li key={d} className="reveal flex items-center gap-6 border-t border-white/10 py-5 last:border-b short:py-3">
                    <span className="text-sm font-semibold tabular-nums text-brand-300">{i === 0 ? "" : "+"}</span>
                    <span className="text-xl font-medium text-white sm:text-2xl short:text-xl">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className={`relative aspect-[4/5] overflow-hidden bg-ink-900 ${fitImage}`}>
              <Photo photo={photo("projects/halo-ring-backlit-oval", "Halo ring light and backlit oval feature ceiling during installation")} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
        </Container>
      </section>

      <ClientReferences number="03" />
      <CTASection />
    </>
  );
}
