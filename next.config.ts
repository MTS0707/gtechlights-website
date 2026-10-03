import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (https://gtechlights.com).
 * `next build` writes the complete site to `out/`, which the GitHub Actions
 * workflow (.github/workflows/deploy.yml) publishes.
 *
 * Not available on a static host (and therefore not used): API routes,
 * redirects/headers config, and Next.js on-the-fly image optimisation —
 * images are pre-optimised to WebP by `npm run assets` instead.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Writes about/index.html (not about.html + about/ folder), which GitHub Pages always serves correctly.
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
