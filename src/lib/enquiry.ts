/** Shared enquiry validation — used by the client form and the API route. */

export const projectTypes = [
  "Product Price / Quotation",
  "Architectural Lighting",
  "Interior Lighting",
  "Designer / Decorative Lighting",
  "Customized Lighting",
  "Commercial / Corporate Project",
  "Hospitality / Retail Project",
  "Residential Project",
  "UPS & Batteries",
  "Other",
] as const;

export type Enquiry = {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  /** Agreement to be contacted and to the Privacy Policy (DPDP Act consent). */
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

export function validateEnquiry(input: Partial<Record<keyof Enquiry, unknown>>): { data: Enquiry; errors: EnquiryErrors } {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data: Enquiry = {
    name: str(input.name, 120),
    company: str(input.company, 160),
    phone: str(input.phone, 30),
    email: str(input.email, 160),
    projectType: str(input.projectType, 80),
    message: str(input.message, 4000),
    consent: input.consent === true,
  };
  const errors: EnquiryErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE.test(data.phone) || data.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!data.projectType) errors.projectType = "Please choose a project type.";
  if (data.message.length < 10) errors.message = "Please tell us a little about your requirement (at least 10 characters).";
  if (!data.consent) errors.consent = "Please agree to the Privacy Policy so we can respond to your enquiry.";
  return { data, errors };
}
