"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { productCategories, type Product, type ProductCategorySlug } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Filter = "all" | ProductCategorySlug;

/** Searchable, filterable catalogue. With "All" selected products are grouped by category. */
export function ProductCatalogue({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      products.filter(
        (p) =>
          (filter === "all" || p.category === filter) &&
          (!q || p.code.toLowerCase().includes(q) || p.specs.some((s) => s.value.toLowerCase().includes(q))),
      ),
    [products, filter, q],
  );
  const counts = useMemo(() => products.reduce<Record<string, number>>((m, p) => ((m[p.category] = (m[p.category] ?? 0) + 1), m), {}), [products]);
  const groups = productCategories.map((c) => ({ ...c, items: matches.filter((p) => p.category === c.slug) })).filter((g) => g.items.length);
  const showGroups = filter === "all" && !q;

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-18 z-30 -mx-5 border-b border-ink-100 bg-white/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-20 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block lg:w-72 lg:shrink-0">
            <span className="sr-only">Search products by code, finish or material</span>
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code, finish, material…"
              className="h-11 w-full border border-ink-200 bg-white pl-9 pr-9 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center text-ink-400 hover:text-ink-900">
                <X aria-hidden className="size-4" />
              </button>
            )}
          </label>
          <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:pb-0">
            {[{ slug: "all" as const, title: "All products" }, ...productCategories].map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setFilter(c.slug)}
                aria-pressed={filter === c.slug}
                className={`min-h-10 shrink-0 border px-3 text-sm font-semibold transition-colors ${
                  filter === c.slug ? "border-ink-900 bg-ink-900 text-white" : "border-ink-100 text-ink-600 hover:border-ink-900 hover:text-ink-900"
                }`}
              >
                {c.title}
                <span className="ml-1.5 font-normal tabular-nums opacity-60">{c.slug === "all" ? products.length : counts[c.slug]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {matches.length} product{matches.length === 1 ? "" : "s"} shown
      </p>

      {matches.length === 0 ? (
        <div className="mt-12 border border-dashed border-ink-200 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink-900">No products match “{query}”.</p>
          <p className="mt-2 text-ink-500">Try a product code such as “1504”, or a finish such as “Copper”.</p>
        </div>
      ) : showGroups ? (
        groups.map((g, gi) => (
          <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-title`} className="scroll-mt-40 pt-14">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
              <span className="text-sm font-semibold tabular-nums text-brand-600">{String(gi + 1).padStart(2, "0")}</span>
              <h2 id={`${g.slug}-title`} className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                {g.title} <span className="text-base font-normal text-ink-400">({g.items.length})</span>
              </h2>
            </div>
            <p className="mt-2 max-w-2xl text-ink-500 sm:ml-12">{g.description}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {g.items.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {matches.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} categoryLabel={productCategories.find((c) => c.slug === p.category)?.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
