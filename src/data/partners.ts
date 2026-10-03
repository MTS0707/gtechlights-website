import { photo, type Photo } from "@/lib/images";

/**
 * Companies G Tech Lights is a channel partner for (logos supplied by G Tech Lights).
 * Add an entry here to show a new partner on the home page, About page and footer.
 * `url` is optional — add the partner's website when confirmed.
 */
export type Partner = { name: string; logo: Photo; url?: string };

export const channelPartners: Partner[] = [
  {
    name: "Orbilit Technology",
    logo: photo("partners/orbilit-technology", "Orbilit Technology — For a better tomorrow"),
  },
];
