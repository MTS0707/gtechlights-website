import { photo, type Photo } from "@/lib/images";

export type Industry = {
  slug: string;
  title: string;
  text: string;
  applications: string[];
  /** Real project photo, where one exists. Industries without one show a neutral placeholder. */
  image?: Photo;
};

export const industries: Industry[] = [
  {
    slug: "corporate-offices",
    title: "Corporate Offices",
    text: "Workspaces, receptions, meeting rooms, cafeterias and breakout areas lit for focus, collaboration and identity.",
    applications: ["Receptions", "Workstations", "Meeting rooms", "Cafeterias", "Breakout zones"],
    image: photo("projects/reception-linear-profile-grid", "Corporate reception with interlocking linear profile lighting"),
  },
  {
    slug: "commercial-buildings",
    title: "Commercial Spaces",
    text: "Lobbies, common areas, fitness centres and multi-use spaces that need durable, distinctive lighting.",
    applications: ["Lobbies", "Common areas", "Fitness centres", "Studios"],
    image: photo("projects/fitness-studio-linear-and-rings", "Commercial fitness centre with linear and ring luminaires"),
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    text: "Restaurants, cafés and lounges where lighting sets the mood and becomes part of the experience.",
    applications: ["Restaurants", "Cafés", "Lounges", "Dining areas"],
    image: photo("projects/restaurant-lantern-pendants", "Restaurant lantern pendant cluster"),
  },
  {
    slug: "retail",
    title: "Retail",
    text: "Salons, showrooms and stores where lighting draws attention, flatters products and reinforces the brand.",
    applications: ["Salons", "Showrooms", "Stores", "Display areas"],
    image: photo("projects/salon-rounded-profile-pendants", "Salon with rounded profile pendants"),
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    text: "Comfortable, well-balanced lighting for receptions, waiting areas, corridors and staff spaces.",
    applications: ["Receptions", "Waiting areas", "Corridors", "Staff areas"],
  },
  {
    slug: "residential",
    title: "Residential",
    text: "Custom and decorative lighting for premium homes, apartments and villas.",
    applications: ["Living & dining", "Staircases", "Feature ceilings", "Decorative pendants"],
  },
  {
    slug: "industrial",
    title: "Industrial",
    text: "Practical lighting along with UPS and battery support for industrial and facility customers.",
    applications: ["Facilities", "Workshops", "Utility areas", "Power backup"],
  },
  {
    slug: "architectural-projects",
    title: "Architectural Projects",
    text: "Feature ceilings, large-format backlit elements and custom geometries developed with architects.",
    applications: ["Feature ceilings", "Backlit elements", "Custom geometries", "Linear light lines"],
    image: photo("projects/halo-ring-backlit-oval", "Architectural halo ring and backlit oval ceiling feature"),
  },
];
