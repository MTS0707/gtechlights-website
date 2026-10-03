import { photo, type Photo } from "@/lib/images";

/**
 * Lighting Insights (blog). Add a new object to publish a new article.
 * `body` is an array of blocks: paragraphs or level-2 headings.
 */
export type ArticleBlock = { type: "p"; text: string } | { type: "h2"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  image: Photo;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "why-lighting-is-part-of-architecture",
    title: "Why Lighting Is Part of the Architecture",
    excerpt: "Lighting decisions made early shape how a space is read — its form, its rhythm and how people move through it.",
    date: "2026-09-01",
    image: photo("projects/hexagon-linear-ceiling", "Hexagon linear light ceiling"),
    body: [
      { type: "p", text: "Lighting is often the last item on a project schedule, yet it is one of the first things people notice in a finished space. When it is considered alongside the architecture — not after it — lighting can reveal structure, guide movement and make a space feel intentional." },
      { type: "h2", text: "Start with the ceiling plane" },
      { type: "p", text: "Ceilings are the largest uninterrupted surface in most interiors. Linear lines, backlit panels and custom geometries can turn that surface into an organising element — aligning with grids, circulation routes or furniture layouts." },
      { type: "h2", text: "Coordinate early" },
      { type: "p", text: "Custom luminaires need to be coordinated with ceiling services, mounting points and electrical provisions. Involving the lighting partner during design development avoids clashes and makes installation smoother." },
      { type: "p", text: "Have a project in design? Share your drawings with us and we will help you explore options." },
    ],
  },
  {
    slug: "planning-a-custom-light-fixture",
    title: "Planning a Custom Light Fixture: What to Share",
    excerpt: "A short checklist of the information that helps turn a design idea into a buildable, serviceable luminaire.",
    date: "2026-09-10",
    image: photo("facility/testing-area", "Luminaires on the bench in the G Tech Lights testing area"),
    body: [
      { type: "p", text: "Custom lighting starts with a conversation. The more we understand about the space and the design intent, the faster we can move from concept to a sample or prototype." },
      { type: "h2", text: "Useful information to share" },
      { type: "p", text: "Drawings or sketches of the space; the approximate size and shape you have in mind; mounting height and ceiling type; finish and colour references; the mood or light effect you want; and your timeline." },
      { type: "h2", text: "What happens next" },
      { type: "p", text: "We develop the concept, engineer it for fabrication and — where required — build a sample for review before manufacturing." },
    ],
  },
  {
    slug: "ups-and-battery-maintenance-basics",
    title: "UPS & Battery Maintenance Basics",
    excerpt: "Simple practices that help power backup systems stay ready when they are needed.",
    date: "2026-09-20",
    image: photo("facility/workshop-floor", "G Tech Lights workshop floor"),
    body: [
      { type: "p", text: "A UPS is only as dependable as its batteries and the care it receives. Periodic inspection and timely service help reduce unexpected downtime." },
      { type: "h2", text: "Good practices" },
      { type: "p", text: "Keep equipment in a clean, ventilated area; schedule periodic checks; watch for alarms or unusual behaviour; and plan battery replacement before performance drops." },
      { type: "p", text: "For sales, installation, service or maintenance support, contact our team." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
