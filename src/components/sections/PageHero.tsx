import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo as PhotoType } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: PhotoType;
  breadcrumb: { name: string; path: string }[];
  children?: ReactNode;
};

/** Dark inner-page hero with optional background photo and breadcrumbs. */
export function PageHero({ eyebrow, title, intro, image, breadcrumb, children }: Props) {
  const crumbs = [{ name: "Home", path: "/" }, ...breadcrumb];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink-950 pb-20 pt-36 sm:pb-24 sm:pt-44 lg:pb-28 lg:pt-52 xl:pb-[clamp(3rem,10vh,7rem)] xl:pt-[clamp(8rem,22vh,13rem)]">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {image && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Photo photo={{ ...image, alt: "" }} sizes="100vw" priority className="animate-slow-zoom opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        </div>
      )}
      <div aria-hidden className="arch-grid absolute inset-0 -z-10 opacity-60" />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 short:mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-400">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-200">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mb-6 flex items-center gap-3 text-brand-300 short:mb-4">
          <span aria-hidden className="h-px w-10 bg-brand-300/60" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl short:text-6xl">
          {title}
        </h1>
        {intro && <div className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300 sm:text-xl short:mt-5 short:text-lg">{intro}</div>}
        {children && <div className="mt-10 flex flex-wrap gap-3 short:mt-7">{children}</div>}
      </Container>
    </section>
  );
}
