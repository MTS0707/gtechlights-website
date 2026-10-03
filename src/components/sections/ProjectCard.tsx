import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { PLACEHOLDER } from "@/data/projects";
import { Photo } from "@/components/ui/Photo";

type Props = {
  project: Project;
  sizes?: string;
  aspect?: string;
  headingLevel?: "h2" | "h3";
  /** Fit-to-screen: from 1280px the image flexes to fill the available height. */
  fit?: boolean;
};

export function ProjectCard({ project, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", aspect = "aspect-[4/5]", headingLevel = "h3", fit = false }: Props) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden bg-ink-900 ${aspect} ${fit ? "xl:aspect-auto xl:min-h-0 xl:flex-1" : ""}`}>
        <Photo
          photo={project.images[0]}
          sizes={sizes}
          className="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-80" />
        <p className="eyebrow absolute left-4 top-4 bg-ink-950/70 px-3 py-1.5 text-[0.62rem] text-white backdrop-blur-sm">
          {project.categories[0]}
        </p>
      </div>
      <div className={`flex flex-1 flex-col border-b border-ink-100 pb-6 pt-5 ${fit ? "xl:flex-none short:pb-4 short:pt-3" : ""}`}>
        <H className={`text-xl font-semibold leading-snug text-ink-900 short:text-lg ${fit ? "xl:min-h-[2lh] short:min-h-0" : ""}`}>
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </H>
        <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5 text-sm short:mt-2 short:gap-y-1">
          <dt className="text-ink-400">Location</dt>
          <dd className={project.location ? "text-ink-700" : "italic text-ink-400"}>{project.location ?? PLACEHOLDER}</dd>
          <dt className="text-ink-400">Application</dt>
          <dd className="text-ink-700">{project.application}</dd>
          <dt className="text-ink-400">Lighting scope</dt>
          <dd className="line-clamp-2 text-ink-700">{project.lightingScope}</dd>
        </dl>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 short:mt-3">
          View Project
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
