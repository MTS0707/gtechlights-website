import { Compass, FlaskConical, PencilRuler, Wrench } from "lucide-react";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { developmentProcess } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { CTASection } from "@/components/sections/CTASection";
import { fitBody, fitCenter, fitGap, fitSection } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "R&D / Engineering — Custom Lighting Development",
  description:
    "How G Tech Lights develops customized lighting: requirement analysis, concept, design, engineering, prototype, testing, manufacturing and installation support.",
  path: "/r-and-d",
});

const pillars = [
  { icon: Compass, title: "Design thinking", text: "Every product starts from the space and the design intent, not a catalogue." },
  { icon: PencilRuler, title: "Engineering for fabrication", text: "Forms are detailed for construction, electrical integration, installation and service." },
  { icon: FlaskConical, title: "Prototype & test", text: "Samples and functional checks in our dedicated testing area before production." },
  { icon: Wrench, title: "Made in-house", text: "Fabrication and assembly at our Bengaluru workshop, with support through installation." },
];

export default function RndPage() {
  return (
    <>
      <PageHero
        eyebrow="R&D / Engineering"
        title="From Concept to Light"
        intro={<p>Customization, engineering thinking and product development — the capability behind every G Tech Lights project.</p>}
        image={photo("facility/ring-luminaires-batch", "")}
        breadcrumb={[{ name: "R&D / Engineering", path: "/r-and-d" }]}
      >
        <Button href="/contact" arrow>
          Discuss Your Requirement
        </Button>
      </PageHero>

      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={`${fitBody} ${fitCenter}`}>
          <SectionHeading number="01" eyebrow="Our Approach" title="Engineering light around the project" />
          <ul className={`${fitGap} grid gap-px bg-ink-100 sm:grid-cols-2 lg:grid-cols-4`}>
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal bg-white p-7 sm:p-8">
                <Icon aria-hidden strokeWidth={1.5} className="size-8 text-brand-600" />
                <h3 className="mt-6 text-lg font-semibold text-ink-900">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={`on-dark relative bg-ink-950 py-24 sm:py-32 ${fitSection}`}>
        <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
        <Container className={`relative ${fitBody} ${fitCenter}`}>
          <SectionHeading dark number="02" eyebrow="Development Process" title="Eight stages, one continuous line" />
          <div className={fitGap}>
            <ProcessTimeline steps={developmentProcess} dark />
          </div>
        </Container>
      </section>

      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={fitBody}>
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20 xl:min-h-0 xl:flex-[3] xl:items-stretch">
            <div className="lg:col-span-5">
              <SectionHeading
                number="03"
                eyebrow="Workshop"
                title="Assembling and testing areas"
                intro={
                  <p>
                    Our Bengaluru facility has dedicated areas for assembling and testing, where luminaires are built and checked before they
                    leave for site.
                  </p>
                }
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-ink-900 lg:col-span-7 xl:aspect-auto xl:min-h-0">
              <Photo photo={photo("facility/testing-area", "Hexagon, linear and round luminaires on the bench in the G Tech Lights testing area")} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
          </div>
          <div className="mt-6 xl:mt-4 xl:min-h-0 xl:flex-[2]">
            <ImageGrid
              fit
              columns="grid-cols-2 lg:grid-cols-4"
              images={[
                photo("facility/linear-assembly-bench", "Technicians assembling linear LED luminaires at the G Tech Lights assembling bench"),
                photo("facility/linear-luminaires-assembled", "Assembled linear LED luminaires with LED strips fitted, ready for testing"),
                photo("facility/linear-profiles-production", "Batch of white linear aluminium profiles and curved diffusers in production"),
                photo("facility/hexagon-luminaires-production", "Batch of hexagon luminaires on the workshop floor"),
              ]}
            />
          </div>
        </Container>
      </section>

      <CTASection title="Have a requirement that needs engineering?" text="Tell us what you're trying to achieve — we'll help you get there." />
    </>
  );
}
