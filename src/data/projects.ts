import { photo, type Photo } from "@/lib/images";

/**
 * Project portfolio.
 *
 * All photographs are installation photos supplied by G Tech Lights.
 * Titles, applications and lighting scopes below are DESCRIPTIVE of what is
 * visible in each photograph. Client names and locations have not been
 * supplied, so they are left as `undefined` and render as "To be updated".
 * Fill in `client`, `location` and `year` when verified details are available.
 */

export const projectCategories = [
  "Commercial",
  "Corporate",
  "Hospitality",
  "Residential",
  "Healthcare",
  "Retail",
  "Industrial",
  "Architectural",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  client?: string;
  location?: string;
  year?: string;
  application: string;
  lightingScope: string;
  solution: string;
  categories: ProjectCategory[];
  images: Photo[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hexagon-frame-pendants",
    title: "Hexagon Frame Pendants & Perimeter Linear",
    application: "Open-plan activity space",
    lightingScope: "Suspended hexagonal frame luminaires, backlit hexagon panels and a continuous perimeter linear line",
    solution:
      "A geometric composition of open hexagon frames and solid backlit hexagons, tied together by a continuous linear light that traces the ceiling edge.",
    categories: ["Commercial", "Architectural"],
    images: [photo("projects/hexagon-frame-pendants", "Suspended hexagon frame pendants and backlit hexagon panels with continuous perimeter linear lighting on a dark ceiling")],
    featured: true,
  },
  {
    slug: "backlit-perforated-ceiling-auditorium",
    title: "Backlit Perforated Feature Ceiling",
    application: "Conference auditorium",
    lightingScope: "Custom backlit perforated ceiling with a radial dot pattern",
    solution:
      "A large-format backlit ceiling whose perforations form a concentric radial pattern, turning the ceiling plane into the room's defining feature.",
    categories: ["Corporate", "Architectural"],
    images: [photo("projects/backlit-dot-ceiling-auditorium", "Conference auditorium with a large backlit perforated ceiling forming a radial dot pattern")],
    featured: true,
  },
  {
    slug: "salon-continuous-profile-pendants",
    title: "Continuous Profile Pendants — Salon",
    application: "Salon and beauty studio",
    lightingScope: "Rounded-rectangle and interlocking suspended profile luminaires with track spotlights",
    solution:
      "Warm-white continuous profiles in overlapping rounded forms, layered with track spots to light workstations and displays.",
    categories: ["Retail", "Commercial"],
    images: [
      photo("projects/salon-rounded-profile-pendants", "Salon ceiling with warm-white rounded-rectangle suspended profile luminaires and black track spotlights"),
      photo("projects/salon-interlocking-profiles", "Two interlocking rounded-rectangle profile luminaires suspended in a salon"),
    ],
    featured: true,
  },
  {
    slug: "reception-linear-profile-grid",
    title: "Interlocking Linear Profile Grid",
    application: "Reception and waiting area",
    lightingScope: "Suspended interlocking rectangular linear profile system",
    solution:
      "Linear profiles arranged as overlapping rectangles at varying heights, bringing order to an exposed-services ceiling.",
    categories: ["Corporate", "Architectural"],
    images: [photo("projects/reception-linear-profile-grid", "Reception area with suspended interlocking white linear profile luminaires beneath an exposed ceiling")],
    featured: true,
  },
  {
    slug: "backlit-stretch-ceiling-reception",
    title: "Backlit Panel Feature Ceiling",
    application: "Corporate reception",
    lightingScope: "Rounded backlit ceiling panels set in a dark feature bulkhead",
    solution: "Soft, uniform backlit panels with rounded corners create a luminous ceiling over the reception lounge.",
    categories: ["Corporate", "Architectural"],
    images: [photo("projects/backlit-stretch-ceiling-reception", "Dark ceiling bulkhead with a grid of rounded backlit white panels")],
    featured: true,
  },
  {
    slug: "halo-ring-and-backlit-oval",
    title: "Halo Ring & Backlit Oval",
    application: "Lobby / central feature zone",
    lightingScope: "Large-diameter halo ring profile with a backlit oval ceiling feature",
    solution:
      "A large halo ring follows the curved ceiling raft while a backlit oval forms the centrepiece. Photographed during installation.",
    categories: ["Architectural", "Commercial"],
    images: [photo("projects/halo-ring-backlit-oval", "Large halo ring light following a curved ceiling raft with a backlit oval at the centre, during installation")],
    featured: true,
  },
  {
    slug: "pantry-globes-and-vertical-linear",
    title: "Globe Pendants & Vertical Linear",
    application: "Pantry and breakout area",
    lightingScope: "Opal globe pendants, linear lines within timber baffles and vertical wall-integrated linear lights",
    solution: "Globe pendants and slim linear lines integrated with timber baffles for a warm, layered breakout space.",
    categories: ["Corporate"],
    images: [photo("projects/pantry-globes-and-vertical-linear", "Pantry with timber baffle ceiling, opal globe pendants and vertical linear lights set into the wall")],
  },
  {
    slug: "library-wave-profile",
    title: "Wave Profile Over Acoustic Discs",
    application: "Library / reading room",
    lightingScope: "Custom curved wave-form profile luminaire weaving between coloured acoustic discs",
    solution: "A continuous curved profile, shaped to weave through suspended acoustic discs, adds a playful signature line.",
    categories: ["Architectural", "Commercial"],
    images: [photo("projects/library-wave-profile", "Library with a curved wave-shaped profile light weaving between coloured suspended acoustic discs")],
  },
  {
    slug: "hexagon-linear-ceiling",
    title: "Hexagon Linear Ceiling",
    application: "Workspace",
    lightingScope: "Linear lighting integrated along hexagonal ceiling baffle joints",
    solution: "Linear light runs along the joints of hexagonal baffles, drawing a honeycomb pattern across the ceiling.",
    categories: ["Corporate", "Architectural"],
    images: [photo("projects/hexagon-linear-ceiling", "Hexagonal ceiling baffles with linear lighting along the joints and hanging greenery")],
  },
  {
    slug: "corporate-cafeteria",
    title: "Cafeteria Pendants & Linear Lines",
    application: "Corporate cafeteria",
    lightingScope: "Cone pendants, globe pendants, recessed linear lines and round surface luminaires",
    solution: "A mix of decorative pendants and architectural linear lines to zone the dining and servery areas.",
    categories: ["Corporate", "Hospitality"],
    images: [
      photo("projects/cafeteria-linear-and-round-panels", "Corporate cafeteria with recessed linear light lines, round surface luminaires and cone pendants"),
      photo("projects/cafeteria-cone-pendants", "Large white cone pendants in a corporate cafeteria with an exposed ceiling"),
    ],
  },
  {
    slug: "workspace-drum-pendants",
    title: "Workspace Drum Pendants",
    application: "Open-plan office",
    lightingScope: "Oversized fabric drum pendants with warm interiors, cylinder downlights and linear lines",
    solution: "Large pleated drum pendants anchor collaboration tables within an open-plan floor.",
    categories: ["Corporate"],
    images: [
      photo("projects/workspace-drum-pendants", "Open-plan office with large drum pendants over a collaboration table and linear lights beyond"),
      photo("projects/pleated-fabric-pendant", "Close-up of a pleated grey fabric pendant with a warm orange interior"),
    ],
  },
  {
    slug: "triple-ring-pendant",
    title: "Triple Ring Pendant",
    application: "Lounge",
    lightingScope: "Three-ring suspended decorative pendant with cove lighting",
    solution: "Three illuminated rings suspended at offset angles create a sculptural centrepiece.",
    categories: ["Commercial", "Hospitality"],
    images: [photo("projects/triple-ring-pendant-lounge", "Three black illuminated rings suspended at different angles above a lounge")],
  },
  {
    slug: "infinity-loop-profile",
    title: "Infinity Loop Profile Pendant",
    application: "Breakout space",
    lightingScope: "Custom-shaped double-loop suspended profile luminaire",
    solution: "A made-to-shape double-loop profile that doubles as a graphic element in the space.",
    categories: ["Commercial"],
    images: [photo("projects/infinity-loop-profile-pendant", "Custom double-loop infinity-shaped profile pendant above a brick feature wall")],
  },
  {
    slug: "large-ring-pendants",
    title: "Large Ring Pendants With Timber Rafts",
    application: "Workspace",
    lightingScope: "Large-diameter ring profiles suspended beneath timber baffle rafts, with cove lighting",
    solution: "Ring profiles sized to the timber rafts above them, combined with a perimeter cove.",
    categories: ["Corporate", "Architectural"],
    images: [photo("projects/large-ring-pendants", "Three large ring profile lights beneath timber baffle rafts")],
  },
  {
    slug: "layered-loop-profiles",
    title: "Layered Loop Profiles",
    application: "Studio / training room",
    lightingScope: "Overlapping rounded-rectangle suspended profiles",
    solution: "Multiple continuous loops layered at different sizes and heights.",
    categories: ["Commercial"],
    images: [photo("projects/layered-loop-profiles", "Overlapping rounded-rectangle profile lights suspended under an exposed ceiling")],
  },
  {
    slug: "oblong-profile-pendant",
    title: "Oblong Profile Pendants",
    application: "Office workstations",
    lightingScope: "Oblong suspended profile luminaires over workstations",
    solution: "Slim oblong profiles aligned with workstation runs.",
    categories: ["Corporate"],
    images: [photo("projects/oblong-profile-pendant", "Oblong suspended profile luminaire over office workstations")],
  },
  {
    slug: "square-profile-pendant",
    title: "Square Profile Pendant",
    application: "Meeting lounge",
    lightingScope: "Black square profile pendant with cylinder downlights under a timber baffle ceiling",
    solution: "A single large square profile frames the seating zone beneath a timber baffle ceiling.",
    categories: ["Corporate"],
    images: [photo("projects/square-profile-pendant", "Black square profile pendant beneath a timber baffle ceiling in front of a patterned wall")],
  },
  {
    slug: "rounded-triangle-profile",
    title: "Rounded Triangle Profile",
    application: "Meeting / collaboration table",
    lightingScope: "Rounded-triangle suspended profile luminaire",
    solution: "A made-to-shape rounded triangle profile centred over a long collaboration table.",
    categories: ["Corporate"],
    images: [photo("projects/rounded-triangle-profile", "White rounded-triangle profile pendant suspended above a long meeting table")],
  },
  {
    slug: "collaboration-cove-lighting",
    title: "Cove Lighting & Pendants",
    application: "Collaboration area",
    lightingScope: "Concealed cove lighting with drum pendants and linear corridor lines",
    solution: "Soft concealed cove light washes the walls while pendants mark the collaboration table.",
    categories: ["Corporate"],
    images: [photo("projects/collaboration-cove-lighting", "Collaboration area with concealed cove lighting washing the walls and two drum pendants")],
  },
  {
    slug: "fitness-studio-linear-and-rings",
    title: "Linear, Ring & Hexagon Luminaires",
    application: "Fitness centre",
    lightingScope: "Suspended linear luminaires, ring pendants and hexagon frames",
    solution: "A rhythm of linear, ring and hexagon forms across a dark ceiling.",
    categories: ["Commercial"],
    images: [photo("projects/fitness-studio-linear-and-rings", "Fitness centre with suspended linear, ring and hexagon luminaires on a grey ceiling")],
  },
  {
    slug: "hexagon-grid-ceiling",
    title: "Hexagon Grid Light Ceiling",
    application: "Fitness centre",
    lightingScope: "Continuous hexagon-grid linear ceiling with a rectangular perimeter",
    solution: "A honeycomb of linear light framed by a rectangular border on a black ceiling.",
    categories: ["Commercial", "Architectural"],
    images: [photo("projects/gym-hexagon-grid-ceiling", "Hexagon grid of linear lights framed by a rectangular border on a black ceiling")],
  },
  {
    slug: "restaurant-lantern-pendants",
    title: "Lantern Pendant Cluster",
    application: "Restaurant",
    lightingScope: "Clustered fabric lantern pendants",
    solution: "A cluster of warm lantern pendants against a dark industrial deck ceiling.",
    categories: ["Hospitality"],
    images: [photo("projects/restaurant-lantern-pendants", "Cluster of three warm fabric lantern pendants beneath a dark metal deck ceiling")],
  },
  {
    slug: "globe-pendant-gold-shade",
    title: "Globe Pendant With Metal Dish",
    application: "Café / breakout",
    lightingScope: "Opal globe pendant with a gold-finish dish shade",
    solution: "A decorative globe and dish pendant against an exposed duct.",
    categories: ["Hospitality"],
    images: [photo("projects/globe-pendant-gold-shade", "Opal globe pendant with a gold-finish dish shade under an exposed duct")],
  },
  {
    slug: "stitched-fabric-pendant",
    title: "Stitched Fabric Pendant",
    application: "Dining booth",
    lightingScope: "Tapered fabric shade pendant with contrast stitching",
    solution: "A tapered, stitched fabric shade to give a dining booth its own identity.",
    categories: ["Hospitality"],
    images: [photo("projects/stitched-fabric-pendant", "Tapered tan fabric pendant with black cross stitching over a dining booth")],
  },
  {
    slug: "origami-pendant",
    title: "Folded Origami Pendant",
    application: "Breakout zone",
    lightingScope: "Folded, pleated decorative pendant",
    solution: "A folded, faceted pendant in a strong colour as a designer accent.",
    categories: ["Commercial"],
    images: [photo("projects/origami-pendant", "Purple folded origami-style pendant seen from below")],
  },
  {
    slug: "cylinder-pendants",
    title: "Cylinder Pendants",
    application: "Exposed-services interior",
    lightingScope: "Black cylinder pendant downlights at staggered heights",
    solution: "Minimal cylinder pendants dropped to working height below an exposed-services ceiling.",
    categories: ["Commercial"],
    images: [photo("projects/cylinder-pendants", "Two black cylinder pendants hanging at staggered heights under an exposed ceiling")],
  },
  {
    slug: "drum-pendant-timber-frame",
    title: "Drum Pendant in Timber Frame",
    application: "Food court / pavilion",
    lightingScope: "Large drum pendant within a timber hexagonal frame structure",
    solution: "A large drum pendant hung within a timber pavilion frame.",
    categories: ["Commercial", "Hospitality"],
    images: [photo("projects/drum-pendant-timber-frame", "Large dark drum pendant hanging inside a timber hexagonal frame structure")],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const PLACEHOLDER = "To be updated";
