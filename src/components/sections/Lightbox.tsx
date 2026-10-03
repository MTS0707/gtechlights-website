"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/images";

type Props = {
  images: (Photo & { caption?: string })[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Accessible image lightbox built on the native <dialog> element (focus trap + Esc for free). */
export function Lightbox({ images, index, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const img = index !== null ? images[index] : null;

  return (
    <dialog
      ref={ref}
      onClose={() => onChange(null)}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      aria-label="Image viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink-950/95 backdrop:backdrop-blur-sm"
    >
      {img && (
        <div className="on-dark flex h-full w-full flex-col" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
          <div className="flex items-center justify-between px-4 py-3 text-sm text-ink-300 sm:px-8">
            <span className="tabular-nums">
              {index! + 1} / {images.length}
            </span>
            <button type="button" onClick={() => onChange(null)} aria-label="Close image viewer" className="grid size-12 place-items-center text-white hover:text-brand-200">
              <X className="size-7" />
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" placeholder="blur" blurDataURL={img.blurDataURL} />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid size-12 place-items-center border border-white/20 text-white hover:border-white">
              <ChevronLeft className="size-6" />
            </button>
            <p className="line-clamp-2 flex-1 text-center text-sm text-ink-200">{img.caption ?? img.alt}</p>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid size-12 place-items-center border border-white/20 text-white hover:border-white">
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
