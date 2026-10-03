import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { articles, getArticle } from "@/data/insights";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, image: a.image.src });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          datePublished: a.date,
          image: `${site.url}${a.image.src}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/insights/${a.slug}/`,
        }}
      />
      <PageHero
        eyebrow={new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        title={a.title}
        intro={<p>{a.excerpt}</p>}
        breadcrumb={[
          { name: "Lighting Insights", path: "/insights" },
          { name: a.title, path: `/insights/${a.slug}` },
        ]}
      />
      <article className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
              <Photo photo={a.image} sizes="(min-width: 768px) 768px, 100vw" priority />
            </div>
            <div className="mt-12 space-y-6 text-lg leading-relaxed text-ink-600">
              {a.body.map((b, i) =>
                b.type === "h2" ? (
                  <h2 key={i} className="pt-6 text-2xl font-semibold tracking-tight text-ink-900">
                    {b.text}
                  </h2>
                ) : (
                  <p key={i}>{b.text}</p>
                ),
              )}
            </div>
          </div>
        </Container>
      </article>
      <CTASection />
    </>
  );
}
