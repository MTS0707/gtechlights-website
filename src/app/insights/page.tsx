import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { articles } from "@/data/insights";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: "Lighting Insights",
  description: "Notes on architectural lighting, custom fixtures and UPS & battery care from the G Tech Lights team.",
  path: "/insights",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Lighting Insights"
        title="Notes on light, space and engineering"
        breadcrumb={[{ name: "Lighting Insights", path: "/insights" }]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <article className="group relative">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                    <Photo photo={a.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-105" />
                  </div>
                  <time dateTime={a.date} className="mt-5 block text-sm text-ink-400">
                    {fmt(a.date)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                    <Link href={`/insights/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-500">{a.excerpt}</p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
