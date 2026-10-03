import { photo, type Photo } from "@/lib/images";

export type Solution = {
  slug: string;
  title: string;
  summary: string;
  applications: string[];
  benefits: string[];
  image: Photo;
};

export const solutions: Solution[] = [
  {
    slug: "architectural-lighting",
    title: "Architectural Lighting",
    summary:
      "Lighting integrated with the architecture itself — feature ceilings, continuous linear systems, coves and backlit surfaces that define the space.",
    applications: ["Feature ceilings", "Linear light lines", "Coves & wall washing", "Backlit ceilings & panels"],
    benefits: ["Reinforces architectural form", "Clean, integrated appearance", "Consistent light across large areas"],
    image: photo("projects/backlit-stretch-ceiling-reception", "Backlit panel feature ceiling in a reception"),
  },
  {
    slug: "interior-lighting",
    title: "Interior Lighting",
    summary: "Layered ambient, task and accent lighting for interiors that need to work hard and still feel good.",
    applications: ["Offices & workstations", "Meeting rooms", "Pantries & cafeterias", "Corridors & lounges"],
    benefits: ["Balanced, comfortable light", "Supports the interior design", "Practical for daily use"],
    image: photo("projects/collaboration-cove-lighting", "Interior collaboration area with cove lighting and pendants"),
  },
  {
    slug: "decorative-lighting",
    title: "Decorative Lighting",
    summary: "Pendants, lanterns and shades that add warmth, colour and character.",
    applications: ["Lantern clusters", "Fabric & drum pendants", "Globe pendants", "Accent pieces"],
    benefits: ["Adds character and warmth", "Defines zones within open spaces", "Pairs with architectural lighting"],
    image: photo("projects/restaurant-lantern-pendants", "Decorative lantern pendants in a restaurant"),
  },
  {
    slug: "designer-lighting",
    title: "Designer Lighting",
    summary: "Sculptural luminaires — rings, loops and folded forms — that become the signature of a space.",
    applications: ["Ring & multi-ring pendants", "Loop & wave profiles", "Folded / origami pendants", "Statement centrepieces"],
    benefits: ["A memorable focal point", "Expresses brand or design theme", "Beautiful lit and unlit"],
    image: photo("projects/origami-pendant", "Folded origami designer pendant"),
  },
  {
    slug: "customized-lighting",
    title: "Customized Lighting",
    summary: "Made-to-shape luminaires engineered around your drawings, dimensions and design intent.",
    applications: ["Custom geometries", "Project-specific sizes", "Special finishes", "One-off feature pieces"],
    benefits: ["Fits the design exactly", "Engineered for installation & service", "Developed with your team"],
    image: photo("projects/library-wave-profile", "Custom wave profile weaving between acoustic discs"),
  },
  {
    slug: "commercial-lighting",
    title: "Commercial Lighting",
    summary: "Robust, distinctive lighting for commercial buildings, fitness centres and multi-use spaces.",
    applications: ["Lobbies & common areas", "Fitness centres", "Studios", "Food courts"],
    benefits: ["Durable everyday performance", "Distinctive visual identity", "Scales across large areas"],
    image: photo("projects/gym-hexagon-grid-ceiling", "Hexagon grid light ceiling in a fitness centre"),
  },
  {
    slug: "residential-lighting",
    title: "Residential Lighting",
    summary: "Custom and decorative lighting for premium homes — designed around the way you live.",
    applications: ["Living & dining", "Feature ceilings", "Staircases", "Decorative pendants"],
    benefits: ["Personal, tailored design", "Warm, comfortable atmosphere", "Direct support from our team"],
    image: photo("projects/triple-ring-pendant-lounge", "Triple ring pendant — the kind of statement piece suited to homes"),
  },
  {
    slug: "hospitality-lighting",
    title: "Hospitality Lighting",
    summary: "Atmosphere-led lighting for restaurants, cafés and lounges.",
    applications: ["Restaurants", "Cafés & bars", "Lounges", "Dining booths"],
    benefits: ["Sets the mood", "Creates memorable moments", "Supports the guest experience"],
    image: photo("projects/stitched-fabric-pendant", "Stitched fabric pendant over a dining booth"),
  },
  {
    slug: "retail-lighting",
    title: "Retail Lighting",
    summary: "Lighting that draws people in and presents products and services at their best.",
    applications: ["Salons & studios", "Showrooms", "Stores", "Display areas"],
    benefits: ["Draws attention", "Flatters products and people", "Reinforces the brand"],
    image: photo("projects/salon-interlocking-profiles", "Interlocking profile luminaires in a salon"),
  },
  {
    slug: "corporate-lighting",
    title: "Corporate Lighting",
    summary: "Workplace lighting for receptions, workstations, collaboration spaces and cafeterias.",
    applications: ["Receptions", "Workstations", "Collaboration zones", "Cafeterias & pantries"],
    benefits: ["Supports focus and wellbeing", "Expresses workplace identity", "Coordinated across floors"],
    image: photo("projects/large-ring-pendants", "Large ring pendants in a corporate workspace"),
  },
];
