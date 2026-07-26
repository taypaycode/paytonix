/**
 * src/lib/schema.ts
 * JSON-LD builders for Paytonix. Every function returns plain objects that
 * mirror visible page content — no invented ratings, dates, or locations.
 */

import { ASSESSMENT_PRICE, FOUNDER, ORGANIZATION, SITE_URL } from "@/lib/site";
import type { Article } from "@/lib/articles";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ASSESSMENT_SERVICE_ID = `${SITE_URL}/revenue-data-integrity-assessment#service`;

/** Organization entity shared across every page. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    description: ORGANIZATION.description,
    founder: {
      "@type": "Person",
      "@id": FOUNDER.url + "#tay-payton",
      name: FOUNDER.name,
      url: FOUNDER.url,
      sameAs: [FOUNDER.linkedIn],
    },
    sameAs: ORGANIZATION.sameAs,
  };
}

/** WebSite entity for sitelinks search-box eligibility and entity linking. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: ORGANIZATION.name,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Service + Offer for the Revenue Data Integrity Assessment. */
export function assessmentServiceSchema() {
  return {
    "@type": "Service",
    "@id": ASSESSMENT_SERVICE_ID,
    name: "Revenue Data Integrity Assessment",
    serviceType: "Revenue Data Reliability Assessment",
    url: `${SITE_URL}/revenue-data-integrity-assessment`,
    description:
      "A focused technical and commercial assessment of one critical customer-to-revenue journey, covering identity continuity, attribution, and CRM-to-warehouse reconciliation.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: ASSESSMENT_PRICE.amount,
      priceCurrency: ASSESSMENT_PRICE.currency,
      description:
        "Starting price; final scope depends on the customer journey and systems assessed.",
      url: `${SITE_URL}/revenue-data-integrity-assessment`,
      availability: "https://schema.org/InStock",
    },
  };
}

/** Homepage entity graph: WebSite + Organization + Service reference. */
export function homepageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), organizationSchema()],
  };
}

/**
 * Full graph for the dedicated assessment page. `provider` references the
 * Organization `@id` defined fully on the homepage rather than repeating it.
 */
export function assessmentPageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [assessmentServiceSchema()],
  };
}

/** BreadcrumbList for a two-level path: Home > Insights > Article. */
export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Article/TechArticle schema for a cornerstone diagnostic piece. */
export function articleSchema(article: Article) {
  const url = `${SITE_URL}/insights/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: article.question,
    description: article.description,
    mainEntityOfPage: url,
    url,
    datePublished: article.datePublished,
    dateModified: article.lastReviewed,
    author: {
      "@type": "Person",
      name: article.authorName,
      url: article.authorUrl,
    },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** FAQPage schema — only used on pages where the questions are visible. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
