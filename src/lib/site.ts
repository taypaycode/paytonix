/**
 * src/lib/site.ts
 * Single source of truth for canonical site URLs and organization facts used
 * across metadata, sitemap, robots, and JSON-LD. Keeping this centralized
 * prevents the canonical-host drift the SEO checklist explicitly flags.
 */

export const SITE_URL = "https://paytonix.net";
export const SITE_NAME = "Paytonix";

export const ORGANIZATION = {
  name: "Paytonix",
  legalName: "Paytonix LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/paytonix-mark.svg`,
  description:
    "Paytonix detects and repairs the breaks between marketing platforms, customer journeys, CRM records, warehouse models, and revenue reporting.",
  founderUrl: "https://www.taypayton.com/#tay-payton",
  sameAs: ["https://www.linkedin.com/in/taypayton/", "https://www.taypayton.com/"],
} as const;

export const FOUNDER = {
  name: "Tay Payton",
  url: "https://www.taypayton.com/",
  linkedIn: "https://www.linkedin.com/in/taypayton/",
} as const;

export const ASSESSMENT_PRICE = {
  amount: "3500",
  currency: "USD",
  displayLabel: "$3,500 starting at",
} as const;
