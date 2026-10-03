import manifest from "@/data/image-manifest.json";

export type ImageKey = keyof typeof manifest;

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
};

/**
 * Looks up a processed photo (see scripts/build-assets.mjs).
 * Keys are "<folder>/<slug>", e.g. "projects/hexagon-frame-pendants".
 */
export function photo(key: ImageKey, alt: string): Photo {
  return { ...manifest[key], alt };
}
