import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { breakable, categoryTitle, getProduct, productSummary, products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductQuoteActions } from "@/components/products/QuoteActions";
import { QuoteBar } from "@/components/products/QuoteBar";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const cat = categoryTitle(p.category);
  return pageMetadata({
    title: `${p.code} — ${cat.replace(/s$/, "")}`,
    description: `${p.code} from G Tech Lights, Bengaluru. ${p.specs.map((s) => `${s.label}: ${s.value}`).join(". ")}. Request price and offer.`,
    path: `/products/${p.slug}`,
    image: p.image?.src,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const cat = categoryTitle(p.category);
  const related = products.filter((r) => r.category === p.category && r.slug !== p.slug).slice(0, 4);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: p.code, path: `/products/${p.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.code,
          sku: p.code,
          category: cat,
          brand: { "@type": "Brand", name: site.name },
          image: p.image ? `${site.url}${p.image.src}` : undefined,
          description: productSummary(p),
          additionalProperty: p.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
        }}
      />

      {/* Dark strip behind the fixed header (this page has no dark hero) */}
      <div aria-hidden className="h-18 bg-ink-950 lg:h-20" />
      <section className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-400">
              <li>
                <Link href="/" className="hover:text-ink-900">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/products" className="hover:text-ink-900">
                  Products
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/products#${p.category}`} className="hover:text-ink-900">
                  {cat}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink-700">
                {p.code}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="relative aspect-square overflow-hidden border border-ink-100 bg-white">
                {p.image ? (
                  <Image
                    src={p.image.src}
                    alt={`${p.code} — ${cat}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    placeholder="blur"
                    blurDataURL={p.image.blurDataURL}
                    className="object-contain p-6"
                  />
                ) : (
                  <span className="grid h-full place-items-center bg-mist text-sm font-semibold uppercase tracking-[0.16em] text-ink-400">
                    Photo to be supplied
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="eyebrow text-brand-600">{cat}</p>
              <h1 className="mt-3 text-5xl font-bold tracking-tight text-ink-900 sm:text-6xl">{p.code}</h1>

              <h2 className="eyebrow mt-10 text-ink-900">Specifications</h2>
              <dl className="mt-4 divide-y divide-ink-100 border-y border-ink-100">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3.5">
                    <dt className="text-ink-400">{s.label}</dt>
                    <dd className="break-words font-medium text-ink-900">{breakable(s.value)}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <ProductQuoteActions code={p.code} />
              </div>
              <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-500">
                <Phone aria-hidden className="size-4" /> Prefer to call?
                {site.phones.slice(0, 2).map((ph) => (
                  <a key={ph.tel} href={`tel:${ph.tel}`} className="font-semibold text-brand-600 hover:text-brand-800">
                    {ph.display}
                  </a>
                ))}
              </p>
              <p className="mt-6 text-sm text-ink-400">
                Specifications as listed in the G Tech Lights catalogue. Custom sizes and finishes on request.
              </p>
            </div>
          </div>

          <Link href={`/products#${p.category}`} className="mt-14 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-800">
            <ArrowLeft aria-hidden className="size-4" /> All {cat}
          </Link>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink-100 bg-mist py-16 sm:py-20" aria-labelledby="related-title">
          <Container>
            <h2 id="related-title" className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              More {cat}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <QuoteBar />
    </>
  );
}
