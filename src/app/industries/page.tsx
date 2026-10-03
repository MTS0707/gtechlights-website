import Link from "next/link";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { fitBody, fitFill, fitImage, fitSection } from "@/lib/fit";

export const metadata = pageMetadata({
  title: "Industries We Serve — Corporate, Commercial, Hospitality, Retail & More",
  description:
    "Lighting solutions for corporate offices, commercial buildings, hospitality, retail, healthcare, residential, industrial and architectural projects in Bengaluru.",
  path: "/industries",
});

const variants = ["rings", "lines", "hex"] as const;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Lighting shaped by the way each sector works"
        intro={<p>For architects, interior designers, builders, contractors, consultants and owners across these sectors.</p>}
        image={photo("projects/cafeteria-linear-and-round-panels", "")}
        breadcrumb={[{ name: "Industries", path: "/industries" }]}
      />

      <div className="py-12 sm:py-20 xl:py-0">
        {industries.map((ind, i) => (
          <section key={ind.slug} id={ind.slug} aria-labelledby={`${ind.slug}-title`} className={`py-10 sm:py-14 ${fitSection}`}>
            <Container className={fitBody}>
              <div className={`grid items-center gap-10 border-b border-ink-100 pb-14 sm:pb-20 lg:grid-cols-12 lg:gap-16 xl:border-0 xl:pb-0 ${fitFill}`}>
                <div className={`relative aspect-[16/10] overflow-hidden bg-ink-900 lg:col-span-6 ${fitImage} ${i % 2 ? "lg:order-2" : ""}`}>
                  {ind.image ? (
                    <Photo photo={ind.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                  ) : (
                    <PlaceholderVisual variant={variants[i % 3]} label={`${ind.title} project photographs to follow`} />
                  )}
                </div>
                <div className="reveal lg:col-span-6">
                  <p className="text-sm font-semibold tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</p>
                  <h2 id={`${ind.slug}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                    {ind.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-500">{ind.text}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {ind.applications.map((a) => (
                      <li key={a} className="border border-ink-100 px-4 py-2 text-sm font-medium text-ink-700">
                        {a}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-8 inline-flex font-semibold text-brand-600 hover:text-brand-800">
                    Discuss a {ind.title.toLowerCase()} project →
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CTASection />
    </>
  );
}
