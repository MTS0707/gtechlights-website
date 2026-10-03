import Link from "next/link";
import { Check } from "lucide-react";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { fitBody, fitFill, fitImage, fitSectionSubnav } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "Lighting Solutions — Architectural, Interior & Designer Lighting Bangalore",
  description:
    "Architectural, interior, decorative, designer and customized lighting solutions for commercial, corporate, hospitality, retail and residential spaces in Bengaluru.",
  path: "/lighting-solutions",
});

export default function LightingSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Lighting Solutions"
        title="Lighting for every kind of space"
        intro={<p>From architectural systems to sculptural designer pieces — each solution is shaped around the space, the design and the people who use it.</p>}
        image={photo("projects/hexagon-linear-ceiling", "")}
        breadcrumb={[{ name: "Lighting Solutions", path: "/lighting-solutions" }]}
      >
        <Button href="/contact" arrow>
          Discuss Your Requirement
        </Button>
      </PageHero>

      {/* Category index */}
      <nav aria-label="Lighting categories" className="sticky top-18 z-30 border-b border-ink-100 bg-white/95 backdrop-blur-md lg:top-20">
        <Container>
          <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 py-3 sm:mx-0 sm:px-0 xl:h-14 xl:items-center xl:py-0">
            {solutions.map((s) => (
              <li key={s.slug} className="shrink-0">
                <a href={`#${s.slug}`} className="block px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600">
                  {s.title.replace(" Lighting", "")}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="py-12 sm:py-20 xl:py-0">
        {solutions.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className={`py-12 sm:py-16 ${fitSectionSubnav}`}>
              <Container className={fitBody}>
                <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${fitFill}`}>
                  <div className={`relative aspect-[4/3] overflow-hidden bg-ink-900 lg:col-span-7 ${fitImage} ${flip ? "lg:order-2" : ""}`}>
                    <Photo photo={s.image} sizes="(min-width: 1024px) 58vw, 100vw" className="transition-transform duration-[1500ms] ease-out-soft hover:scale-[1.03]" />
                    <span className="absolute left-5 top-5 bg-ink-950/70 px-3 py-1.5 text-xs font-semibold tabular-nums text-white backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")} / {String(solutions.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="reveal lg:col-span-5">
                    <h2 id={`${s.slug}-title`} className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-ink-500 short:mt-3 short:text-base">{s.summary}</p>
                    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 short:mt-5">
                      <div>
                        <h3 className="eyebrow text-ink-900">Applications</h3>
                        <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-600">
                          {s.applications.map((a) => (
                            <li key={a} className="flex gap-3">
                              <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-brand-600" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="eyebrow text-ink-900">Benefits</h3>
                        <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-600">
                          {s.benefits.map((b) => (
                            <li key={b} className="flex gap-2.5">
                              <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand-600" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Link
                      href={`/contact?type=${encodeURIComponent(s.title)}`}
                      className="mt-10 inline-flex min-h-12 items-center border border-ink-900 short:mt-6 px-6 font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
                    >
                      Discuss Your Requirement
                    </Link>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <CTASection />
    </>
  );
}
