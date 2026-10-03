import { site, fullAddress } from "@/config/site";

/**
 * Legal pages content. Written to describe what this website actually does
 * (enquiry form, quote list in local storage, optional Google Maps, WhatsApp links;
 * no analytics or advertising cookies).
 *
 * IMPORTANT: this is a sound starting template, not legal advice. Have it reviewed
 * by G Tech Lights' legal adviser — especially the grievance contact and retention
 * period — before or shortly after launch. Update `updated` when you change a policy.
 */

export type LegalBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };
export type LegalSection = { heading: string; blocks: LegalBlock[] };
export type LegalDoc = { slug: string; title: string; summary: string; updated: string; sections: LegalSection[] };

const UPDATED = "3 October 2026";
const contactLine = `${site.name}, ${fullAddress.join(", ")}. Email: ${site.email.primary}. Phone: ${site.phones[0].display}.`;

export const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  summary: `How ${site.name} collects, uses and protects your personal data when you use ${site.url.replace("https://", "")}.`,
  updated: UPDATED,
  sections: [
    {
      heading: "1. Who we are",
      blocks: [
        { type: "p", text: `This website is operated by ${site.name} (GSTIN ${site.gstin}), a lighting company based in Bengaluru, India. For the purposes of the Digital Personal Data Protection Act, 2023 ("DPDP Act"), ${site.name} is the Data Fiduciary for personal data collected through this website.` },
        { type: "p", text: `Contact: ${contactLine}` },
      ],
    },
    {
      heading: "2. Personal data we collect",
      blocks: [
        { type: "p", text: "We collect only the information you choose to give us, and the minimum technical data needed to run the website:" },
        {
          type: "ul",
          items: [
            "Enquiry form: your name, company (optional), phone number, email address, project type and message — including any product codes and quantities you add from the quote list.",
            "WhatsApp, phone and email: if you contact us this way, we receive the details and messages you send through those services.",
            "Technical data: our hosting provider, GitHub Pages (GitHub, Inc.), automatically processes standard server logs (such as IP address, browser type and pages requested) to deliver the website and keep it secure.",
            "On your own device: your quote list and your cookie choice are stored in your browser's local storage. This data stays on your device and is not sent to us unless you submit an enquiry.",
          ],
        },
        { type: "p", text: "We do not use analytics or advertising trackers, and we do not knowingly collect data from children." },
      ],
    },
    {
      heading: "3. Why we use your data",
      blocks: [
        {
          type: "ul",
          items: [
            "To respond to your enquiry and share prices, offers, product information or project proposals you ask for.",
            "To follow up on your requirement, arrange site visits, supply products and provide installation, service and support.",
            "To keep business, accounting and tax records as required by law.",
            "To keep the website secure and working properly.",
          ],
        },
        { type: "p", text: "We process your personal data on the basis of the consent you give when you submit the enquiry form or contact us, and where the law otherwise permits or requires it. We will not send you marketing messages unrelated to your enquiry without your consent." },
      ],
    },
    {
      heading: "4. Who we share it with",
      blocks: [
        { type: "p", text: "We do not sell or rent your personal data. We share it only with:" },
        {
          type: "ul",
          items: [
            "Service providers who help us run the website and communicate with you — GitHub Pages (website hosting), Web3Forms (which delivers enquiry-form submissions to our business mailbox) and our email provider.",
            "WhatsApp (Meta), Google and your telephone or email provider, when you choose to contact us through them or load the map. Their own privacy policies apply.",
            "Government or law-enforcement authorities where required by law.",
          ],
        },
        { type: "p", text: "Some of these providers may store or process data outside India. Where that happens, we rely on providers with appropriate security safeguards, and transfers are made as permitted under applicable Indian law." },
      ],
    },
    {
      heading: "5. How long we keep it",
      blocks: [
        { type: "p", text: "We keep enquiry details only for as long as needed to respond to you and, where you become a customer, for the duration of the business relationship and the period required for accounting, tax and legal purposes. Enquiries that do not lead to business are deleted when they are no longer needed. You can ask us to delete your data at any time (see section 7)." },
      ],
    },
    {
      heading: "6. How we protect it",
      blocks: [
        { type: "p", text: "The website is served over HTTPS, enquiry-form submissions are sent over an encrypted connection to our form-delivery service and on to our business mailbox, and access to enquiries is limited to people at G Tech Lights who need it to respond. No method of transmission or storage is completely secure, but we take reasonable security practices and procedures to protect your data, as required under the Information Technology Act, 2000 and its rules." },
      ],
    },
    {
      heading: "7. Your rights",
      blocks: [
        { type: "p", text: "Subject to the DPDP Act, you can:" },
        {
          type: "ul",
          items: [
            "Ask for a summary of the personal data we hold about you and how it is used.",
            "Ask us to correct, complete, update or erase your personal data.",
            "Withdraw your consent at any time (this does not affect processing already carried out).",
            "Nominate another person to exercise your rights in the event of death or incapacity.",
            "Raise a grievance with us, and if it is not resolved, approach the Data Protection Board of India.",
          ],
        },
        { type: "p", text: `To exercise any of these rights, email ${site.email.primary} with the subject "Privacy request". We will respond within a reasonable time and in any case within the period required by law.` },
      ],
    },
    {
      heading: "8. Grievance contact",
      blocks: [
        { type: "p", text: `Questions or complaints about how we handle personal data can be sent to: Grievance Officer, ${contactLine}` },
      ],
    },
    {
      heading: "9. Cookies and local storage",
      blocks: [{ type: "p", text: "See our Cookie Policy for details of the small amount of data stored in your browser and how to change your choices." }],
    },
    {
      heading: "10. Changes to this policy",
      blocks: [{ type: "p", text: "We may update this policy from time to time. The date at the top shows when it was last changed. Significant changes will be highlighted on this page." }],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  summary: "What this website stores in your browser, and how to control it.",
  updated: UPDATED,
  sections: [
    {
      heading: "1. Our approach",
      blocks: [
        { type: "p", text: "We keep this website light. We do not use analytics, advertising or social-media tracking cookies. We store only what is needed for the site to work, and load Google Maps only if you allow it." },
      ],
    },
    {
      heading: "2. What we store",
      blocks: [
        {
          type: "ul",
          items: [
            "Essential — quote list (\"gtech-quote-list\", browser local storage): the product codes you add to your quote list, so they stay with you while you browse. Kept until you clear it or your browser data.",
            "Essential — cookie choice (\"gtech-consent\", browser local storage): remembers whether you accepted maps and third-party content, so we don't ask again on every page.",
            "Optional — Google Maps (third-party cookies, contact page only): if you choose \"Accept all\" or \"Load map\", the embedded Google Map may set cookies controlled by Google under Google's privacy policy.",
          ],
        },
        { type: "p", text: "Clicking a WhatsApp, phone or email link opens that service; any data it stores is governed by its own policy." },
      ],
    },
    {
      heading: "3. Your choices",
      blocks: [
        { type: "p", text: "When you first visit, a banner lets you choose \"Accept all\" or \"Essential only\", or manage each category. You can change your choice at any time using \"Cookie settings\" at the bottom of every page. You can also clear stored data or block cookies in your browser settings; the website will still work, but your quote list will not be remembered." },
      ],
    },
    {
      heading: "4. Contact",
      blocks: [{ type: "p", text: `Questions about this policy: ${site.email.primary}.` }],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  slug: "terms",
  title: "Terms of Use",
  summary: `The terms that apply when you use the ${site.name} website.`,
  updated: UPDATED,
  sections: [
    {
      heading: "1. About these terms",
      blocks: [{ type: "p", text: `By using ${site.url.replace("https://", "")} you agree to these terms. If you do not agree, please do not use the website. The website is operated by ${site.name}, Bengaluru, India.` }],
    },
    {
      heading: "2. Information on the website",
      blocks: [
        { type: "p", text: "Content on this website — including product codes, specifications, photographs, project descriptions and service information — is provided for general information only. It does not form an offer, quotation or contract." },
        { type: "p", text: "Prices are not displayed and are quoted on request. A quotation becomes binding only when confirmed in writing by G Tech Lights, and any supply of products or services is governed by the terms of that quotation or purchase order." },
      ],
    },
    {
      heading: "3. Enquiries and quote requests",
      blocks: [{ type: "p", text: "Submitting an enquiry, using the quote list or messaging us on WhatsApp is a request for information or a quotation. It does not place an order or create an obligation on either side. Please provide accurate details so we can respond properly." }],
    },
    {
      heading: "4. Intellectual property",
      blocks: [{ type: "p", text: `The G Tech Lights name and logo, website design, text and photographs are owned by or licensed to ${site.name}. Third-party names and logos (including channel partners and customer references) belong to their respective owners and are shown for identification only. You may view and share pages for personal or business evaluation, but you may not copy, reproduce or reuse the content for commercial purposes without our written permission.` }],
    },
    {
      heading: "5. Acceptable use",
      blocks: [{ type: "ul", items: ["Do not misuse the website, attempt to gain unauthorised access, or interfere with its operation.", "Do not submit false, misleading, unlawful or abusive content through the enquiry form.", "Do not use automated tools to scrape or copy the website's content."] }],
    },
    {
      heading: "6. Third-party links and services",
      blocks: [{ type: "p", text: "The website links to services such as WhatsApp and Google Maps. We are not responsible for the content, availability or privacy practices of third-party services." }],
    },
    {
      heading: "7. Limitation of liability",
      blocks: [{ type: "p", text: "We aim to keep the website accurate and available, but it is provided \"as is\". To the extent permitted by law, G Tech Lights is not liable for any loss arising from use of, or reliance on, the website's content. Nothing in these terms limits any liability that cannot be limited under Indian law." }],
    },
    {
      heading: "8. Governing law",
      blocks: [{ type: "p", text: "These terms are governed by the laws of India. Courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute relating to the website." }],
    },
    {
      heading: "9. Changes and contact",
      blocks: [{ type: "p", text: `We may update these terms from time to time; the date above shows the latest version. Questions: ${site.email.primary}.` }],
    },
  ],
};

export const disclaimer: LegalDoc = {
  slug: "disclaimer",
  title: "Disclaimer",
  summary: "Important notes about product information, photographs and references on this website.",
  updated: UPDATED,
  sections: [
    {
      heading: "Product information",
      blocks: [
        { type: "p", text: "Product codes and specifications (wattage, CCT, lumens, dimensions, finish and material) are as listed in the G Tech Lights catalogue. Values may vary within normal manufacturing tolerances, and products, specifications and finishes may change without notice. Please confirm the exact specification with us before ordering." },
        { type: "p", text: "Product photographs are for illustration. Actual colour, finish and appearance may differ slightly due to photography and screen settings." },
      ],
    },
    {
      heading: "Projects and photographs",
      blocks: [{ type: "p", text: "Project and workshop photographs show G Tech Lights work. Project details are descriptive; client names and locations are shown only where confirmed." }],
    },
    {
      heading: "Experience",
      blocks: [{ type: "p", text: `${site.name} was established in ${site.established}. References to "20+ years" describe the lighting industry experience of our promoters and leadership, not the age of the company.` }],
    },
    {
      heading: "Customer references and partners",
      blocks: [{ type: "p", text: "Customer names are listed as references provided by G Tech Lights and reflect the experience of our team. Channel partner and third-party names and logos belong to their respective owners." }],
    },
  ],
};

export const legalDocs = [privacyPolicy, cookiePolicy, termsOfUse, disclaimer];
