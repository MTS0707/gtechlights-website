import { photo, type Photo } from "@/lib/images";

export type Leader = {
  name: string;
  role: string;
  summary: string;
  points: string[];
  /** Processed portrait (see scripts/build-assets.mjs, folder "team"). Falls back to a monogram if omitted. */
  photo?: Photo;
};

export const leadership: Leader[] = [
  {
    name: "Gangadhara H C",
    role: "Director",
    summary: "More than 20 years of experience in the lighting industry.",
    points: ["Lighting industry experience of 20+ years", "Experience in lighting projects and services"],
    photo: photo("team/gangadhara-h-c", "Gangadhara H C, Director, G Tech Lights"),
  },
  {
    name: "Chethan",
    role: "CEO",
    summary: "More than 20 years of experience in the lighting industry and UPS manufacturing.",
    points: ["Lighting industry and UPS manufacturing experience of 20+ years", "Experience in projects and services"],
    photo: photo("team/chethan", "Chethan, CEO, G Tech Lights"),
  },
];

/**
 * Customer references provided by the client. Shown as TEXT ONLY.
 * Do not add logos unless written authorisation has been obtained.
 */
export const clientReferences = [
  "CGI",
  "Infosys",
  "Accenture",
  "Capgemini",
  "Manipal Hospital",
  "Safina Plaza",
  "ABB",
  "Tecso",
  "Cyderes",
  "HSBC",
  "RMZ Coworks",
  "TIEI",
];
