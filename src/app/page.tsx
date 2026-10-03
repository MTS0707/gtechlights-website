import Link from "next/link";
import { ArrowUpRight, BatteryCharging } from "lucide-react";
import { photo } from "@/lib/images";
import { site } from "@/config/site";
import { expertise, lightInfluence, whyUs } from "@/data/company";
import { featuredProjects } from "@/data/projects";
import { industries } from "@/data/industries";
import { leadership } from "@/data/people";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { fitBody, fitFill, fitGap, fitSection } from "@/lib/fit";
import { HomeHero } from "@/components/sections/HomeHero";
import { WhyGrid } from "@/components/sections/WhyGrid";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { IndustryCard } from "@/components/sections/IndustryCard";
import { LeadershipCard } from "@/components/sections/LeadershipCard";
import { ClientReferences } from "@/components/sections/ClientReferences";
import { ChannelPartners } from "@/components/sections/ChannelPartners";
import { CTASection } from "@/components/sections/CTASection";

const heroSlides = [
  photo("projects/hexagon-frame-pendants", "Hexagon frame pendants and continuous linear lighting by G Tech Lights"),
  photo("projects/pantry-globes-and-vertical-linear", "Globe pendants and vertical linear lighting in a timber-baffle pantry by G Tech Lights"),
  photo("projects/backlit-dot-ceiling-auditorium", "Backlit perforated feature ceiling in an auditorium by G Tech Lights"),
];

// The homepage shows the seven points requested for it (all except "Professional Service").
const whyItems = whyUs.filter((w) => w.title !== "Professional Service");

export default function HomePage() {
  return (
    <>
      <HomeHero slides={heroSlides} />

      {/* Stat strip */}
      <section aria-label="At a glance" className="border-b border-ink-100 bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-ink-100 lg:grid-cols-4 lg:divide-x">
            {[
              { k: "20+", v: "Years of lighting industry experience" },
              { k: "Custom", v: "Made-to-shape architectural & designer lights" },
              { k: "In-house", v: "Fabrication, assembly & testing in Bengaluru" },
              { k: "UPS", v: "& battery sales and services" },
            ].map((s) => (
              <div key={s.k} className="py-8 lg:px-8 lg:first:pl-0">
                <dt className="sr-only">{s.v}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tracking-tight text-brand-600 sm:text-4xl">{s.k}</span>
                  <span className="mt-2 block text-sm leading-snug text-ink-500">{s.v}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 02 — Light That Defines Space */}
      <section
        className={`py-24 sm:py-32 ${fitSection}`}
        aria-labelledby="defines-space"
      >
        <Container className={fitBody}>
          <div className={`grid gap-14 lg:grid-cols-12 lg:gap-16 ${fitFill}`}>
            <div className="lg:col-span-5 xl:flex xl:min-h-0 xl:flex-col">
              <SectionHeading
                number="01"
                eyebrow="Our Perspective"
                title={<span id="defines-space">Light That Defines Space</span>}
                intro={
                  <p>
                    Lighting is more than illumination. It is an essential element of architecture and interior design — shaping how a space
                    looks, feels and works. {site.statement}
                  </p>
                }
              />
              <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden bg-ink-900 lg:block xl:mt-[clamp(1.5rem,4vh,3rem)] xl:aspect-auto xl:min-h-40 xl:flex-1">
                <Photo photo={photo("projects/library-wave-profile", "Custom wave profile light weaving between acoustic discs")} sizes="40vw" />
              </div>
            </div>
            <ol className="grid gap-px bg-ink-100 sm:grid-cols-2 self-start lg:col-span-7 xl:h-full xl:grid-rows-3 xl:self-stretch">
              {lightInfluence.map((item, i) => (
                <li key={item.title} className="reveal flex flex-col bg-white p-7 sm:p-9 xl:px-9 xl:py-[clamp(1rem,3vh,2.25rem)]">
                  <span className="text-sm font-semibold tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl font-semibold text-ink-900 xl:mt-[clamp(0.5rem,1.5vh,1rem)]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 03 — Our Expertise */}
      <section className={`on-dark relative bg-ink-950 py-24 sm:py-32 ${fitSection}`} aria-labelledby="expertise">
        <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
        <Container className={`relative ${fitBody}`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading dark number="02" eyebrow="What We Do" title={<span id="expertise">Our Expertise</span>} />
            <Button href="/lighting-solutions" variant="outline-light" arrow>
              All lighting solutions
            </Button>
          </div>
          <ul className={`${fitGap} grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-rows-2 ${fitFill}`}>
            {expertise.map((e) => (
              <li key={e.number} className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden bg-ink-950 p-7 sm:p-9 xl:min-h-0 short:p-6">
                {e.image ? (
                  <>
                    <Photo
                      photo={e.image}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="-z-10 opacity-45 transition-all duration-[1200ms] ease-out-soft group-hover:scale-105 group-hover:opacity-70"
                    />
                    <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
                  </>
                ) : (
                  <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_25%,rgba(91,134,240,0.28),transparent_55%)]">
                    <BatteryCharging strokeWidth={1} className="absolute right-8 top-8 size-28 text-brand-300/40" />
                  </div>
                )}
                <span className="absolute left-7 top-7 text-sm font-semibold tabular-nums text-brand-300 sm:left-9 sm:top-9 short:left-6 short:top-5">{e.number}</span>
                <h3 className="text-2xl font-semibold text-white short:text-xl">
                  <Link href={e.href} className="after:absolute after:inset-0">
                    {e.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-300 short:mt-1.5 short:text-sm">{e.text}</p>
                <ArrowUpRight
                  aria-hidden
                  className="mt-6 size-6 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 short:mt-3 short:size-5"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 04 — Why G Tech Lights */}
      <section className={`py-24 sm:py-32 ${fitSection}`} aria-labelledby="why">
        <Container className={fitBody}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              number="03"
              eyebrow="The Difference"
              title={<span id="why">Why G Tech Lights?</span>}
              intro="Established in 2026. Built on more than 20 years of lighting industry experience."
            />
            <Button href="/why-g-tech-lights" variant="outline" arrow>
              Learn more
            </Button>
          </div>
          <WhyGrid items={whyItems} cta={{ label: "Talk to our team", href: "/contact" }} className={`${fitGap} xl:grid-rows-2 ${fitFill}`} />
        </Container>
      </section>

      {/* 05 — Featured Projects */}
      <section className={`bg-mist py-24 sm:py-32 ${fitSection}`} aria-labelledby="featured">
        <Container className={fitBody}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              number="04"
              eyebrow="Portfolio"
              title={<span id="featured">Featured Projects</span>}
              intro="A selection of installations photographed on site."
            />
            <Button href="/projects" variant="outline" arrow>
              View all projects
            </Button>
          </div>
          {/* One row of three at fit-to-screen sizes; six below. */}
          <div className={`${fitGap} grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${fitFill}`}>
            {featuredProjects.slice(0, 6).map((p, i) => (
              <div key={p.slug} className={`reveal ${i >= 3 ? "hidden sm:block xl:hidden" : "xl:flex xl:min-h-0 xl:flex-col"}`}>
                <ProjectCard project={p} fit />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 — Industries */}
      <section className={`py-24 sm:py-32 ${fitSection}`} aria-labelledby="industries">
        <Container className={fitBody}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading number="05" eyebrow="Sectors" title={<span id="industries">Industries We Serve</span>} />
            <Button href="/industries" variant="outline" arrow>
              Explore industries
            </Button>
          </div>
          <ul className={`${fitGap} grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-rows-2 ${fitFill}`}>
            {industries.map((ind, i) => (
              <li key={ind.slug} className="xl:min-h-0">
                <IndustryCard industry={ind} index={i} fit />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 07 — R&D / Custom engineering */}
      <section className="on-dark relative overflow-hidden bg-ink-950 xl:h-[max(calc(100svh-5rem),38rem)] xl:scroll-mt-20" aria-labelledby="concept-to-light">
        <div className="grid lg:grid-cols-2 xl:h-full">
          <div className="relative min-h-[22rem] lg:min-h-[40rem] xl:min-h-0">
            <Photo photo={photo("facility/linear-assembly-bench", "Technicians assembling linear LED luminaires at the G Tech Lights assembling bench")} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="relative flex items-center px-5 py-20 sm:px-12 lg:px-20">
            <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
            <div className="relative max-w-xl">
              <SectionHeading
                dark
                number="06"
                eyebrow="R&D / Custom Engineering"
                title={<span id="concept-to-light">From Concept to Light</span>}
                intro={
                  <p>
                    G Tech Lights develops customized lighting according to each project&apos;s requirements — from understanding the design
                    intent, through concept, engineering and prototyping, to manufacturing in our own Bengaluru workshop and support on site.
                  </p>
                }
              />
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/contact" arrow>
                  Discuss Your Requirement
                </Button>
                <Button href="/r-and-d" variant="text-light" arrow className="px-3!">
                  Our process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Promoter experience */}
      <section className={`on-dark bg-ink-900 py-24 sm:py-32 ${fitSection}`} aria-labelledby="leadership">
        <Container className={fitBody}>
          <SectionHeading
            dark
            number="07"
            eyebrow="Promoter Experience"
            title={<span id="leadership">Led by more than two decades of lighting experience</span>}
            intro="G Tech Lights was established in 2026 by a leadership team bringing 20+ years of experience in the lighting industry, projects and services."
          />
          <div className={`${fitGap} grid gap-6 lg:grid-cols-2 ${fitFill}`}>
            {leadership.map((l) => (
              <LeadershipCard key={l.name} leader={l} fit />
            ))}
          </div>
        </Container>
      </section>

      {/* 09 — Client references */}
      <ClientReferences number="08" />

      {/* Channel partner */}
      <ChannelPartners number="09" />

      {/* 10 — Final CTA */}
      <CTASection />
    </>
  );
}

