import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/data/industries";
import { Photo } from "@/components/ui/Photo";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

const variants = ["rings", "lines", "hex"] as const;

type Props = { industry: Industry; index: number; href?: string; /** Fit-to-screen: from 1280px the card fills its grid cell. */ fit?: boolean };

export function IndustryCard({ industry, index, href = `/industries#${industry.slug}`, fit = false }: Props) {
  return (
    <article className={`group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden bg-ink-900 sm:aspect-[4/5] ${fit ? "xl:aspect-auto xl:h-full" : ""}`}>
      {industry.image ? (
        <Photo
          photo={industry.image}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="-z-10 transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 -z-10">
          <PlaceholderVisual variant={variants[index % 3]} label={`${industry.title} — project photographs to follow`} showLabel={false} />
        </div>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      <div className="on-dark p-6 short:p-5">
        <p className="text-xs font-semibold tabular-nums text-brand-300">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          <Link href={href} className="after:absolute after:inset-0">
            {industry.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 max-h-24 text-sm leading-relaxed text-ink-200 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-within:max-h-24 lg:group-focus-within:opacity-100">
          {industry.text}
        </p>
        <ArrowUpRight aria-hidden className="mt-4 size-5 text-white short:mt-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </article>
  );
}
