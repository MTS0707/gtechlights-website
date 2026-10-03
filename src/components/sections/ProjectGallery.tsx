"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import { projectCategories, PLACEHOLDER, type Project, type ProjectCategory } from "@/data/projects";
import { Lightbox } from "./Lightbox";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", ...projectCategories];

/** Filterable masonry portfolio with lightbox. */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter, projects]);
  const lightboxImages = useMemo(() => visible.map((p) => ({ ...p.images[0], caption: `${p.title} — ${p.application}` })), [visible]);
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length);

  return (
    <div>
      <div role="group" aria-label="Filter projects by sector" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.filter((f) => count(f) > 0).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`min-h-11 shrink-0 border px-4 text-sm font-semibold transition-colors ${
              filter === f ? "border-ink-900 bg-ink-900 text-white" : "border-ink-100 text-ink-600 hover:border-ink-900 hover:text-ink-900"
            }`}
          >
            {f} <span className="ml-1 font-normal tabular-nums opacity-60">{count(f)}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>

      {visible.length === 0 ? (
        <div className="mt-12 border border-dashed border-ink-200 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink-900">{filter} projects coming soon</p>
          <p className="mt-2 text-ink-500">Photographs and details for this sector will be added here.</p>
          <Link href="/contact" className="mt-6 inline-flex font-semibold text-brand-600 hover:text-brand-800">
            Discuss a {filter.toLowerCase()} project →
          </Link>
        </div>
      ) : (
        <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((p, i) => {
            const img = p.images[0];
            return (
              <li key={p.slug} className="group relative mb-6 break-inside-avoid">
                <div className="relative overflow-hidden bg-ink-900">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    className="h-auto w-full transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`Enlarge image: ${p.title}`}
                    className="absolute right-3 top-3 grid size-11 place-items-center bg-ink-950/70 text-white opacity-100 backdrop-blur-sm transition-opacity hover:bg-brand-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                  >
                    <Expand className="size-4" />
                  </button>
                </div>
                <div className="border-b border-ink-100 pb-6 pt-4">
                    <p className="eyebrow text-[0.62rem] text-brand-600">{p.categories.join(" · ")}</p>
                    <h2 className="mt-2 text-lg font-semibold leading-snug text-ink-900">
                      <Link href={`/projects/${p.slug}`} className="hover:text-brand-600">
                        {p.title}
                      </Link>
                    </h2>
                    <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-sm text-ink-700">
                      <dt className="text-ink-400">Location</dt>
                      <dd className={p.location ? "" : "italic text-ink-400"}>{p.location ?? PLACEHOLDER}</dd>
                      <dt className="text-ink-400">Application</dt>
                      <dd>{p.application}</dd>
                      <dt className="text-ink-400">Lighting scope</dt>
                      <dd className="line-clamp-2">{p.lightingScope}</dd>
                    </dl>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800"
                      aria-label={`View project: ${p.title}`}
                    >
                      View Project <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Lightbox images={lightboxImages} index={lightbox} onChange={setLightbox} />
    </div>
  );
}
