import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { customizationProcess } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { CTASection } from "@/components/sections/CTASection";
import { fitBody, fitCenter, fitFill, fitGap, fitSection } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "Customized Lighting Manufacturer Bangalore",
  description:
    "Custom lighting designed around your vision — made-to-shape architectural and designer luminaires, engineered and manufactured in Bengaluru by G Tech Lights.",
  path: "/customized-lighting",
});

const shapes = [
  { image: photo("projects/infinity-loop-profile-pendant", "Custom double-loop infinity profile pendant"), label: "Loops" },
  { image: photo("projects/library-wave-profile", "Custom wave profile weaving between acoustic discs"), label: "Waves" },
  { image: photo("projects/hexagon-frame-pendants", "Custom hexagon frame luminaires"), label: "Hexagons" },
  { image: photo("projects/rounded-triangle-profile", "Custom rounded-triangle profile"), label: "Rounded triangles" },
  { image: photo("projects/halo-ring-backlit-oval", "Large halo ring following a curved ceiling"), label: "Large rings" },
  { image: photo("projects/salon-interlocking-profiles", "Interlocking rounded-rectangle profiles"), label: "Interlocking forms" },
];

const brief = [
  "Drawings, sketches or reference images",
  "Approximate size, shape and quantity",
  "Mounting height and ceiling type",
  "Finish and colour references",
  "The light effect and mood you want",
  "Timelines and site readiness",
];

export default function CustomizedLightingPage() {
  return (
    <>
      <PageHero
        eyebrow="Customized Lighting"
        title="Lighting Designed Around Your Vision"
        intro={
          <p>
            When a catalogue fixture won&apos;t do, we design, engineer and manufacture lighting to the shape, size and finish your space calls
            for — in our own Bengaluru workshop.
          </p>
        }
        image={photo("projects/infinity-loop-profile-pendant", "")}
        breadcrumb={[{ name: "Customized Lighting", path: "/customized-lighting" }]}
      >
        <Button href="/contact?type=Customized%20Lighting" arrow>
          Discuss Your Requirement
        </Button>
        <Button href="#process" variant="outline-light">
          See the process
        </Button>
      </PageHero>

      {/* Shapes gallery */}
      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={fitBody}>
          <SectionHeading
            number="01"
            eyebrow="Made to Shape"
            title="If it can be drawn, it can be developed"
            intro="Examples of the forms and geometries from our installations, photographed on site."
          />
          <ul className={`${fitGap} grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-rows-2 ${fitFill}`}>
            {shapes.map((s) => (
              <li key={s.label} className="group relative aspect-square overflow-hidden bg-ink-900 xl:aspect-auto xl:min-h-0">
                <Photo photo={s.image} sizes="(min-width: 1024px) 33vw, 50vw" className="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent to-50%" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold text-white sm:bottom-5 sm:left-5 sm:text-base">{s.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className={`on-dark relative bg-ink-950 py-24 sm:py-32 ${fitSection}`}>
        <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
        <Container className={`relative ${fitBody} ${fitCenter}`}>
          <SectionHeading
            dark
            number="02"
            eyebrow="The Customization Process"
            title="Seven steps from requirement to light"
            intro="A clear, collaborative process with your architect, designer or contractor at every stage."
          />
          <div className={fitGap}>
            <ProcessTimeline steps={customizationProcess} dark />
          </div>
        </Container>
      </section>

      {/* From workshop */}
      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={fitBody}>
          <div className={`grid gap-14 lg:grid-cols-12 lg:gap-20 ${fitFill}`}>
            <div className="lg:col-span-5 xl:self-center">
              <SectionHeading
                number="03"
                eyebrow="Engineering & Manufacturing"
                title="Built in our own workshop"
                intro={
                  <p>
                    Concepts are engineered for fabrication, assembled and tested in-house before dispatch — so what&apos;s approved on paper is
                    what arrives on site.
                  </p>
                }
              />
              <div className="mt-12 border-t border-ink-100 pt-8 short:mt-6 short:pt-5">
                <h3 className="eyebrow text-ink-900">Helpful to share with your enquiry</h3>
                <ul className="mt-5 space-y-3 text-ink-600 short:mt-3 short:space-y-1.5 short:text-sm">
                  {brief.map((b, i) => (
                    <li key={b} className="flex gap-4">
                      <span className="text-sm font-semibold tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Button href="/contact?type=Customized%20Lighting" className="mt-10 short:mt-6" arrow>
                  Start a custom brief
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7 xl:flex xl:min-h-0 xl:flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-900 xl:aspect-auto xl:min-h-0 xl:flex-[2]">
                <Photo photo={photo("facility/ring-luminaires-batch", "Stacks of finished white and black ring luminaires at the G Tech Lights workshop")} sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
              <div className="mt-4 xl:min-h-0 xl:flex-1">
                <ImageGrid
                  fit
                  columns="grid-cols-2"
                  images={[
                    photo("facility/linear-profiles-production", "Batch of white linear aluminium profiles and curved diffusers in production"),
                    photo("facility/linear-luminaires-assembled", "Assembled linear LED luminaires with LED strips fitted, ready for testing"),
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="Have a shape in mind?" text="Share your drawings or idea — we'll help you develop it into a finished light." />
    </>
  );
}
