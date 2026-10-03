"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
import type { Photo } from "@/lib/images";
import { Lightbox } from "./Lightbox";

type Props = { images: Photo[]; columns?: string; /** Fit-to-screen: from 1280px the grid fills its parent's height. */ fit?: boolean };

/** Grid of photos that open in the lightbox (used on project detail & facility sections). */
export function ImageGrid({ images, columns = "sm:grid-cols-2", fit = false }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className={`grid gap-4 ${columns} ${fit ? "xl:h-full xl:auto-rows-fr" : ""}`}>
        {images.map((img, i) => (
          <li key={img.src} className={fit ? "xl:min-h-0" : ""}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative block aspect-[4/3] w-full overflow-hidden bg-ink-900 ${fit ? "xl:aspect-auto xl:h-full" : ""}`}
              aria-label={`Enlarge image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
              />
              <span className="absolute right-3 top-3 grid size-10 place-items-center bg-ink-950/70 text-white backdrop-blur-sm">
                <Expand aria-hidden className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={index} onChange={setIndex} />
    </>
  );
}
