import Link from "next/link";
import type { LegalDoc } from "@/data/legal";
import { legalDocs } from "@/data/legal";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";

/** Shared layout for Privacy Policy, Cookie Policy, Terms of Use and Disclaimer. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        intro={<p>{doc.summary}</p>}
        breadcrumb={[{ name: doc.title, path: `/${doc.slug}` }]}
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <nav aria-label="Legal pages" className="lg:sticky lg:top-28">
                <p className="eyebrow text-ink-400">Legal</p>
                <ul className="mt-4 space-y-1 border-l border-ink-100">
                  {legalDocs.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/${d.slug}`}
                        aria-current={d.slug === doc.slug ? "page" : undefined}
                        className={`-ml-px block border-l-2 py-2 pl-4 text-sm transition-colors ${
                          d.slug === doc.slug ? "border-brand-600 font-semibold text-ink-900" : "border-transparent text-ink-500 hover:text-ink-900"
                        }`}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <article className="max-w-3xl lg:col-span-9">
              <p className="text-sm text-ink-400">Last updated: {doc.updated}</p>
              {doc.sections.map((s) => (
                <section key={s.heading} className="mt-10">
                  <h2 className="text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">{s.heading}</h2>
                  {s.blocks.map((b, i) =>
                    b.type === "p" ? (
                      <p key={i} className="mt-4 leading-relaxed text-ink-600">
                        {b.text}
                      </p>
                    ) : (
                      <ul key={i} className="mt-4 space-y-2.5 text-ink-600">
                        {b.items.map((it) => (
                          <li key={it} className="flex gap-3 leading-relaxed">
                            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-brand-600" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </section>
              ))}
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
