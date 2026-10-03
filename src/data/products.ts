import brochure from "@/data/brochure-products.json";

/**
 * Product catalogue — from the G Tech Lights brochure (G_TECH_LIGHTS_Brochure.pdf).
 * Codes and specifications are as printed in the brochure. Edit
 * `src/data/brochure-products.json` to correct or add products
 * (see scripts/brochure/README.md).
 */

export type ProductSpec = { label: string; value: string };

export type ProductImage = { src: string; width: number; height: number; blurDataURL: string };

export type Product = {
  slug: string;
  code: string;
  category: ProductCategorySlug;
  brochurePage: number;
  specs: ProductSpec[];
  /** null when the brochure has no photograph for this product */
  image: ProductImage | null;
};

export const productCategories = [
  {
    slug: "linear",
    title: "Linear Lights",
    description: "Suspended and recessed linear luminaires in aluminium die cast and wooden finishes.",
  },
  {
    slug: "architectural",
    title: "Ring & Geometric Profile Lights",
    description: "Rings, discs, squares, hexagons, triangles and panels for architectural ceilings.",
  },
  {
    slug: "cylinder",
    title: "Cylinder & Tube Pendants",
    description: "Slim LED tube and cylinder pendants for focused, minimal lighting.",
  },
  {
    slug: "contemporary",
    title: "Contemporary Pendants",
    description: "Dome, cone and bell pendants in black, white, grey and gold combinations.",
  },
  {
    slug: "wood-accent",
    title: "Wood-Accent Pendants",
    description: "Pendants combining aluminium and metal shades with wooden details.",
  },
  {
    slug: "industrial",
    title: "Industrial & Vintage Pendants",
    description: "Copper, brass, chrome and rustic finishes with an industrial character.",
  },
  {
    slug: "textured",
    title: "Textured-Finish Pendants",
    description: "Granite, stone and wood-look finishes.",
  },
  {
    slug: "cage",
    title: "Cage & Wire Pendants",
    description: "Open wire, cage and geometric frame pendants.",
  },
  {
    slug: "glass",
    title: "Glass Pendants",
    description: "Clear and milky glass pendants and globes.",
  },
  {
    slug: "multi-acoustic",
    title: "Multi-Light & Acoustic Pendants",
    description: "Three-light bars and acoustic fabric pendants.",
  },
] as const;

export type ProductCategorySlug = (typeof productCategories)[number]["slug"];

export const products = brochure as Product[];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categoryTitle = (slug: ProductCategorySlug) => productCategories.find((c) => c.slug === slug)?.title ?? slug;

/** Short one-line summary for cards, e.g. "36W · L1200XW50XH70MM". */
export function productSummary(p: Product) {
  const pick = (label: string) => p.specs.find((s) => s.label === label)?.value;
  return [pick("Wattage") ?? pick("Lamp"), pick("Dimensions")].filter(Boolean).join(" · ");
}

/** Lets long spec values (e.g. "L600XW50XH70/L1200XW50XH70MM") wrap after each slash. */
export const breakable = (value: string) => value.replaceAll("/", "/​");

/** UPS & batteries are services rather than catalogue items; shown as a strip on the products page. */
export const powerSolutions = [
  { title: "UPS Systems", text: "Sales, installation and service. Brands and capacities confirmed per requirement." },
  { title: "Batteries", text: "Supply, replacement and service for UPS and backup systems." },
];
