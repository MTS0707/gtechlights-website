"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Photo } from "@/lib/images";
import { site } from "@/config/site";

const INTERVAL = 7000;

/** Full-bleed home hero: slow crossfade of real G Tech Lights installations with a light-beam sweep. */
export function HomeHero({ slides }: { slides: Photo[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      aria-label="Introduction"
      className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-950 pb-24 pt-32 sm:pb-28 lg:items-center lg:pb-20 xl:pb-[clamp(2.5rem,7vh,5rem)] xl:pt-[clamp(6rem,13vh,8rem)]"
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              placeholder="blur"
              blurDataURL={s.blurDataURL}
              className={`object-cover ${i === index ? "animate-slow-zoom" : ""}`}
            />
          </div>
        ))}
      </div>

      {/* Scrims + architectural grid */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/10 to-ink-950/50" />
      <div aria-hidden className="arch-grid absolute inset-0 -z-10 opacity-70" />

      {/* Light beam sweep */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-[38%] -z-10 h-px overflow-hidden">
        <div className="h-px w-1/2 animate-beam bg-gradient-to-r from-transparent via-brand-300 to-transparent shadow-[0_0_24px_4px_rgba(91,134,240,0.55)]" />
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Company name, prominent: English + Kannada as on the visiting card */}
          <p className="flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-1">
            <span aria-hidden className="h-px w-10 bg-brand-300/70" />
            <span className="text-lg font-bold uppercase tracking-[0.28em] text-white sm:text-2xl">{site.name}</span>
            <span lang="kn" className="font-kannada text-lg font-bold text-brand-200 sm:text-2xl">
              {site.nameKannada}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-300">· Bengaluru</span>
          </p>
          <h1 className="mt-7 animate-fade-up text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white [animation-delay:120ms] sm:text-6xl lg:text-[5.4rem] xl:mt-[clamp(1.25rem,3vh,1.75rem)] xl:text-[clamp(3.4rem,9vh,5.4rem)]">
            Customized Architectural &amp; Designer Lighting Solutions
          </h1>
          <p className="mt-8 max-w-2xl animate-fade-up text-pretty text-lg leading-relaxed text-ink-200 [animation-delay:240ms] sm:text-xl xl:mt-[clamp(1.25rem,3.5vh,2rem)] short:text-lg">
            Transforming spaces through innovative lighting, engineering and design — backed by more than 20 years of lighting industry
            experience.
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:360ms] xl:mt-[clamp(1.5rem,4.5vh,2.5rem)]">
            <Button href="/lighting-solutions" arrow>
              Explore Lighting
            </Button>
            <Button href="/contact" variant="light">
              Discuss Your Project
            </Button>
            <Button href="/projects" variant="text-light" arrow className="px-3!">
              View Projects
            </Button>
          </div>
        </div>

        {/* Slide indicator */}
        <div className="mt-16 flex items-center gap-5 lg:mt-24 xl:mt-[clamp(1.5rem,7vh,6rem)]">
          <div className="flex gap-2" role="group" aria-label="Hero images">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                aria-pressed={i === index}
                className="group grid h-8 place-items-center"
              >
                <span className={`block h-0.5 transition-all duration-500 ${i === index ? "w-12 bg-white" : "w-6 bg-white/35 group-hover:bg-white/70"}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-300 hover:text-white"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <p className="hidden text-xs text-ink-400 sm:block">G Tech Lights installation photograph</p>
        </div>
      </div>
    </section>
  );
}
