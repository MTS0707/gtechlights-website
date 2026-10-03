import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { withSlash } from "@/lib/seo";
import { projects } from "@/data/projects";
import { articles } from "@/data/insights";
import { products } from "@/data/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["", 1],
    ["/about", 0.8],
    ["/lighting-solutions", 0.9],
    ["/products", 0.8],
    ["/customized-lighting", 0.9],
    ["/projects", 0.9],
    ["/r-and-d", 0.7],
    ["/ups-batteries", 0.8],
    ["/industries", 0.7],
    ["/why-g-tech-lights", 0.6],
    ["/contact", 0.9],
    ["/insights", 0.5],
    ["/privacy-policy", 0.3],
    ["/cookie-policy", 0.3],
    ["/terms", 0.3],
    ["/disclaimer", 0.3],
  ];
  return [
    ...pages.map(([path, priority]) => ({ url: `${site.url}${withSlash(path || "/")}`, lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}/`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...articles.map((a) => ({ url: `${site.url}/insights/${a.slug}/`, lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
