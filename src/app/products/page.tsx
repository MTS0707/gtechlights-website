import Link from "next/link";
import { BatteryCharging, ClipboardList, MessageCircle, Zap } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/config/site";
import { powerSolutions, productCategories, products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { QuoteBar } from "@/components/products/QuoteBar";

export const metadata = pageMetadata({
  title: "Products — Linear, Ring, Pendant & Designer Lights Catalogue",
  description: `${products.length} lighting products from the G Tech Lights catalogue — linear lights, ring and geometric profile lights, LED cylinder pendants and decorative pendants — with wattage, CCT, lumens, dimensions, finish and material. Request prices on WhatsApp or by email.`,
  path: "/products",
});

const steps = [
  { icon: ClipboardList, title: "Add to quote", text: "Tick the products you need — they stay in your quote list while you browse." },
  { icon: MessageCircle, title: "Send on WhatsApp or email", text: "One tap sends the product codes to our team." },
  { icon: Zap, title: "Get price & offer", text: "We reply with pricing and the best offer for your quantities." },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title="Lighting products"
        intro={
          <p>
            {products.length} products across {productCategories.length} ranges, with full specifications. Add products to your quote list or
            ask for a price on WhatsApp.
          </p>
        }
        breadcrumb={[{ name: "Products", path: "/products" }]}
      >
        <Button href="#catalogue" arrow>
          Browse catalogue
        </Button>
        <Button href={whatsappUrl(`Hello ${site.name}, I would like prices for lighting products from your catalogue.`)} variant="light">
          WhatsApp for prices
        </Button>
      </PageHero>

      {/* How to get a price */}
      <section aria-label="How to get a price" className="border-b border-ink-100 bg-mist">
        <Container>
          <ol className="grid gap-px bg-ink-100 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4 bg-mist py-6 sm:px-6 sm:first:pl-0">
                <span className="grid size-10 shrink-0 place-items-center bg-white text-brand-600">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">
                    <span className="mr-2 tabular-nums text-brand-600">{i + 1}.</span>
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-ink-500">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="catalogue" aria-label="Catalogue" className="scroll-mt-20 pb-20 sm:pb-28">
        <Container>
          <ProductCatalogue products={products} />
          <p className="mt-14 text-sm text-ink-400">
            Specifications as listed in the G Tech Lights catalogue. Custom sizes, finishes and colour temperatures can be discussed —{" "}
            <Link href="/customized-lighting" className="font-semibold text-brand-600 hover:text-brand-800">
              see customized lighting
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* UPS & batteries */}
      <section className="border-t border-ink-100 bg-mist py-16 sm:py-20" aria-labelledby="power-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="eyebrow text-brand-600">Also available</p>
              <h2 id="power-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink-900">
                UPS &amp; Batteries
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {powerSolutions.map((p, i) => {
                const Icon = i === 0 ? Zap : BatteryCharging;
                return (
                  <li key={p.title} className="flex gap-4 bg-white p-5">
                    <Icon aria-hidden strokeWidth={1.5} className="size-8 shrink-0 text-brand-600" />
                    <div>
                      <h3 className="font-semibold text-ink-900">{p.title}</h3>
                      <p className="mt-1 text-sm text-ink-500">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="lg:col-span-2">
              <Button href="/ups-batteries" variant="outline" arrow>
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="Need a price or a custom size?" text="Send us the product codes and quantities — we'll share pricing and the best offer." />
      <QuoteBar />
    </>
  );
}
