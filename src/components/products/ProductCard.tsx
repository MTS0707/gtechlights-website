"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { breakable, type Product } from "@/data/products";
import { quoteWhatsappUrl } from "@/lib/quote";
import { QuoteToggle } from "./QuoteActions";

/**
 * Brochure-style product card: photo, code, full specifications, quote actions.
 * Phones: photo on the left, details on the right. From 640px: stacked.
 */
export function ProductCard({ product, categoryLabel }: { product: Product; categoryLabel?: string }) {
  const href = `/products/${product.slug}`;
  return (
    <article className="group grid h-full grid-cols-[7.5rem_minmax(0,1fr)] border border-ink-100 bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(11,16,32,0.35)] sm:flex sm:flex-col">
      <Link href={href} className="relative block aspect-square self-start overflow-hidden bg-white sm:w-full sm:self-auto" tabIndex={-1} aria-hidden>
        {product.image ? (
          <Image
            src={product.image.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 120px"
            placeholder="blur"
            blurDataURL={product.image.blurDataURL}
            className="object-contain p-2 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04] sm:p-3"
          />
        ) : (
          <span className="grid h-full place-items-center bg-mist p-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Photo to be supplied
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col border-l border-ink-100 p-3 sm:border-l-0 sm:border-t sm:p-5">
        {categoryLabel && <p className="eyebrow text-[0.6rem] text-ink-400">{categoryLabel}</p>}
        <h3 className="mt-0.5 text-base font-bold tracking-tight text-ink-900 sm:mt-1 sm:text-lg">
          <Link href={href} className="hover:text-brand-600">
            {product.code}
          </Link>
        </h3>
        <dl className="mt-2 space-y-1 text-xs leading-snug sm:mt-3 sm:text-[0.8rem]">
          {product.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-[4.6rem_minmax(0,1fr)] gap-2 sm:grid-cols-[5.6rem_minmax(0,1fr)]">
              <dt className="text-ink-400">{s.label}</dt>
              <dd className="text-ink-800 [overflow-wrap:anywhere]">{breakable(s.value)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] gap-2 pt-3 sm:pt-4">
          <QuoteToggle code={product.code} className="whitespace-nowrap" />
          <a
            href={quoteWhatsappUrl([product.code])}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask for the price of ${product.code} on WhatsApp`}
            className="grid size-11 place-items-center bg-[#25D366] text-white transition hover:brightness-95"
          >
            <MessageCircle aria-hidden className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
