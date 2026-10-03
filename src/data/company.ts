import { photo } from "@/lib/images";

export const about = {
  headline: "More Than Light. We Create Experiences.",
  paragraphs: [
    "G Tech Lights is a professionally driven architectural and designer lighting company, delivering lighting solutions for residential, commercial, hospitality, retail and architectural spaces.",
    "The company was established in 2026. Its promoters bring more than 20 years of lighting industry experience — and with it, the understanding that lighting is more than illumination. It is an essential element of architecture and interior design.",
    "We specialise in customized architectural, interior and designer lighting, working closely with architects, interior designers, consultants, contractors, corporate clients and end customers to transform concepts into beautifully illuminated environments.",
    "Our goal is simple: to bring spaces to life through exceptional lighting.",
  ],
  approach: [
    "Creativity",
    "Technology",
    "Functionality",
    "Energy efficiency",
    "Aesthetics",
    "Quality",
    "Reliability",
    "Customer satisfaction",
  ],
  collaborators: ["Architects", "Interior designers", "Consultants", "Contractors", "Corporate clients", "End customers"],
};

export const mission =
  "To provide customized architectural, interior, and designer lighting solutions that combine creativity, technology, quality, and sustainability — creating spaces that inspire, enhance, and endure.";

export const vision =
  "To be a leading force in architectural lighting, transforming spaces through innovative, sustainable, and beautifully designed lighting solutions that inspire people and elevate the built environment.";

export const coreValues = [
  { title: "Innovation", text: "Exploring new forms, materials and methods for every brief." },
  { title: "Quality", text: "Careful fabrication, assembly and testing before anything leaves the workshop." },
  { title: "Creativity", text: "Lighting treated as part of the design language of a space." },
  { title: "Customer Focus", text: "Solutions shaped around the project, not a catalogue." },
  { title: "Integrity", text: "Clear commitments and honest advice." },
  { title: "Sustainability", text: "Energy-conscious lighting that is built to last." },
  { title: "Collaboration", text: "Working hand in hand with architects, designers and contractors." },
  { title: "Excellence", text: "Attention to detail from concept to installation." },
];

/** Home: "Light That Defines Space" */
export const lightInfluence = [
  { title: "Architecture", text: "Light reveals form, rhythm and material — it can make a ceiling float or a façade read at night." },
  { title: "Interior design", text: "Fixtures become part of the design vocabulary, carrying lines, curves and colour through a space." },
  { title: "Mood", text: "Colour temperature, intensity and contrast set how a space feels — calm, focused, warm or energetic." },
  { title: "Functionality", text: "The right light on the right task: workstations, circulation, display and service areas." },
  { title: "Experience", text: "People remember spaces by how they felt in them. Lighting shapes that memory." },
  { title: "Aesthetics", text: "Proportion, finish and detail in the luminaire itself — lit or unlit." },
];

export type Expertise = {
  number: string;
  title: string;
  text: string;
  href: string;
  image?: ReturnType<typeof photo>;
};

export const expertise: Expertise[] = [
  {
    number: "01",
    title: "Architectural Lighting",
    text: "Lighting that works with the structure — feature ceilings, linear systems, coves and large-format backlit elements.",
    href: "/lighting-solutions#architectural-lighting",
    image: photo("projects/backlit-dot-ceiling-auditorium", "Backlit perforated architectural ceiling"),
  },
  {
    number: "02",
    title: "Interior Lighting",
    text: "Layered lighting for offices, lounges, cafeterias and meeting spaces, balancing function and atmosphere.",
    href: "/lighting-solutions#interior-lighting",
    image: photo("projects/pantry-globes-and-vertical-linear", "Interior lighting in a pantry with globe pendants and linear lights"),
  },
  {
    number: "03",
    title: "Designer Lighting",
    text: "Decorative and sculptural pieces — rings, loops, lanterns and folded shades — that give a space its signature.",
    href: "/lighting-solutions#designer-lighting",
    image: photo("projects/triple-ring-pendant-lounge", "Triple ring designer pendant"),
  },
  {
    number: "04",
    title: "Customized Lighting",
    text: "Made-to-shape luminaires developed around the project's geometry, dimensions and design intent.",
    href: "/customized-lighting",
    image: photo("projects/infinity-loop-profile-pendant", "Custom double-loop profile pendant"),
  },
  {
    number: "05",
    title: "Lighting Manufacturing",
    text: "In-house fabrication, assembly and testing at our Bengaluru workshop.",
    href: "/r-and-d",
    image: photo("facility/hexagon-luminaires-production", "Hexagon luminaires being produced at the G Tech Lights workshop"),
  },
  {
    number: "06",
    title: "UPS & Battery Solutions",
    text: "Sales, installation, service and maintenance support for UPS systems and batteries.",
    href: "/ups-batteries",
  },
];

export const whyUs = [
  { title: "20+ Years Industry Experience", text: "Promoters with more than two decades in the lighting industry, across projects and services." },
  { title: "Customized Solutions", text: "Luminaires developed to the shape, size and finish your design calls for." },
  { title: "Design + Engineering Approach", text: "Design intent translated into buildable, serviceable lighting." },
  { title: "Quality Driven", text: "Dedicated assembling and testing areas in our own workshop." },
  { title: "Customer Focus", text: "Direct access to the people designing and building your lighting." },
  { title: "End-to-End Support", text: "From requirement and concept through manufacturing, installation and support." },
  { title: "Professional Service", text: "Responsive coordination with architects, contractors and site teams." },
  { title: "Innovation & R&D", text: "Prototyping and development of new forms for each brief." },
];

export const differentiator = [
  "20+ years of lighting industry experience",
  "Customized lighting solutions",
  "Architectural & interior design understanding",
  "Engineering & R&D",
  "Manufacturing & customization",
  "UPS & battery services",
];
