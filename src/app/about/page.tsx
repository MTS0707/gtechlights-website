import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { about, coreValues, mission, vision } from "@/data/company";
import { leadership } from "@/data/people";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { PageHero } from "@/components/sections/PageHero";
import { LeadershipCard } from "@/components/sections/LeadershipCard";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { CTASection } from "@/components/sections/CTASection";
import { ChannelPartners } from "@/components/sections/ChannelPartners";
import { Button } from "@/components/ui/Button";
import { fitBody, fitCenter, fitFill, fitGap, fitImage, fitSection } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "About Us — Lighting Company in Bengaluru",
  description:
    "G Tech Lights is a Bengaluru lighting company established in 2026, built on 20+ years of lighting industry experience. Customized architectural, interior and designer lighting.",
  path: "/about",
});

const highlights = [
  "20+ years of lighting industry experience",
  "Customized lighting",
  "Architectural understanding",
  "Engineering approach",
  "Quality",
  "Reliability",
  "Customer collaboration",
  "Innovation",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About G Tech Lights"
        title={about.headline}
        intro={<p>A Bengaluru lighting company designing, engineering and manufacturing customized architectural, interior and designer lighting.</p>}
        image={photo("projects/large-ring-pendants", "")}
        breadcrumb={[{ name: "About", path: "/about" }]}
      />

      {/* Established vs experience */}
      <section className="border-b border-ink-100 bg-white">
        <Container>
          <dl className="grid gap-px bg-ink-100 sm:grid-cols-2">
            <div className="bg-white py-10 sm:pr-10">
              <dt className="eyebrow text-ink-500">The company</dt>
              <dd className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">Established in {site.established}</dd>
            </div>
            <div className="bg-white py-10 sm:pl-10">
              <dt className="eyebrow text-ink-500">The people behind it</dt>
              <dd className="mt-3 text-3xl font-semibold tracking-tight text-brand-600 sm:text-4xl">Built on 20+ years of lighting industry experience</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Story */}
      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={fitBody}>
          <div className={`grid gap-14 lg:grid-cols-12 lg:gap-20 xl:grid-rows-[minmax(0,1fr)] ${fitFill}`}>
            <div className="lg:col-span-7 xl:self-center">
              <SectionHeading number="01" eyebrow="Our Story" title="Lighting is an essential element of architecture and interior design" />
              <div className="prose-gt mt-10 text-lg leading-relaxed text-ink-600 xl:mt-[clamp(1.25rem,3vh,2.5rem)] xl:text-[1.05rem] short:text-base">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-12 short:mt-6">
                <p className="eyebrow text-ink-500">We work closely with</p>
                <ul className="mt-5 flex flex-wrap gap-2 short:mt-3">
                  {about.collaborators.map((c) => (
                    <li key={c} className="border border-ink-100 px-4 py-2 text-sm font-medium text-ink-700 short:px-3 short:py-1.5 short:text-xs">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-5 xl:flex xl:min-h-0 xl:flex-col">
              <div className={`relative aspect-[4/5] overflow-hidden bg-ink-900 ${fitImage} xl:flex-1`}>
                <Photo photo={photo("facility/hexagon-luminaires-assembly", "Hexagon luminaires being assembled at the G Tech Lights workshop in Bengaluru")} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
              <p className="mt-3 shrink-0 text-sm text-ink-400">Custom hexagon luminaires in production at our workshop.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights + approach */}
      <section className={`on-dark relative bg-ink-950 py-24 sm:py-32 ${fitSection}`}>
        <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
        <Container className={`relative ${fitBody} ${fitCenter}`}>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading dark number="02" eyebrow="What Defines Us" title="Experience, engineering and collaboration" />
              <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 short:mt-6">
                {highlights.map((h, i) => (
                  <li key={h} className="flex items-baseline gap-4 bg-ink-950 p-5 short:py-3.5">
                    <span className="text-xs font-semibold tabular-nums text-brand-300">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium text-white">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading dark number="03" eyebrow="Our Approach" title="Combining" />
              <ul className="mt-12 flex flex-wrap gap-3 short:mt-6">
                {about.approach.map((a) => (
                  <li key={a} className="border border-white/15 px-5 py-3 text-lg font-medium text-ink-100 short:px-4 short:py-2 short:text-base">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className={`py-24 sm:py-32 ${fitSection}`}>
        <Container className={`${fitBody} ${fitCenter}`}>
          <div className="grid gap-px bg-ink-100 lg:grid-cols-2">
            <div className="bg-white p-8 sm:p-12 lg:pl-0">
              <p className="eyebrow text-brand-600">Mission</p>
              <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight text-ink-900 sm:text-3xl">“{mission}”</blockquote>
            </div>
            <div className="bg-white p-8 sm:p-12 lg:pr-0">
              <p className="eyebrow text-brand-600">Vision</p>
              <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight text-ink-900 sm:text-3xl">“{vision}”</blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className={`bg-mist py-24 sm:py-32 ${fitSection}`} id="values">
        <Container className={fitBody}>
          <SectionHeading number="04" eyebrow="Core Values" title="What we stand for" />
          <ul className={`${fitGap} grid border-l border-t border-ink-200/70 sm:grid-cols-2 lg:grid-cols-4 xl:grid-rows-2 ${fitFill}`}>
            {coreValues.map((v, i) => (
              <li key={v.title} className="reveal border-b border-r border-ink-200/70 bg-white p-7 sm:p-8 short:px-6 short:py-5">
                <span className="text-sm font-semibold tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-semibold text-ink-900 short:mt-2 short:text-lg">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500 short:mt-1.5 short:text-sm">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Leadership */}
      <section className={`on-dark bg-ink-900 py-24 sm:py-32 ${fitSection}`} id="leadership">
        <Container className={fitBody}>
          <SectionHeading
            dark
            number="05"
            eyebrow="Leadership"
            title="Our Leadership"
            intro="Our leadership brings more than 20 years of lighting industry experience to every project."
          />
          <div className={`${fitGap} grid gap-6 lg:grid-cols-2 ${fitFill}`}>
            {leadership.map((l) => (
              <LeadershipCard key={l.name} leader={l} fit />
            ))}
          </div>
        </Container>
      </section>

      {/* Facility */}
      <section className={`py-24 sm:py-32 ${fitSection}`} id="facility">
        <Container className={fitBody}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              number="06"
              eyebrow="Our Facility"
              title="Designed, assembled and tested in Bengaluru"
              intro="Our workshop at Nagasandra, Bengaluru includes dedicated assembling and testing areas."
            />
            <Button href="/r-and-d" variant="outline" arrow>
              R&amp;D / Engineering
            </Button>
          </div>
          <div className={`${fitGap} ${fitFill}`}>
            <ImageGrid
              fit
              columns="sm:grid-cols-2 lg:grid-cols-4"
              images={[
                photo("facility/linear-assembly-bench", "Technicians assembling linear LED luminaires at the G Tech Lights assembling bench"),
                photo("facility/ring-luminaires-batch", "Stacks of finished white and black ring luminaires at the G Tech Lights workshop"),
                photo("facility/linear-luminaires-assembled", "Assembled linear LED luminaires with LED strips fitted, ready for testing"),
                photo("facility/linear-profiles-production", "Batch of white linear aluminium profiles and curved diffusers in production"),
                photo("facility/workshop-sample-racks", "Workshop racks with ring, drum, fabric and acoustic pendant samples"),
                photo("facility/workshop-floor", "G Tech Lights workshop floor with custom luminaires under test"),
                photo("facility/assembling-area", "Technicians assembling a pendant in the assembling area"),
                photo("facility/testing-area", "Luminaires on the bench in the testing area"),
              ]}
            />
          </div>
        </Container>
      </section>

      <ChannelPartners number="07" />

      <CTASection />
    </>
  );
}
