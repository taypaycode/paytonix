/**
 * src/lib/articles.ts
 * Structured content for the AEO cornerstone article series. Each entry
 * follows the required diagnostic template: question, direct answer,
 * definition, symptoms, causes, tests, consequences, repairs, prevention,
 * and stated assumptions/limitations. This is the single source of truth
 * consumed by the insights index, article pages, and the sitemap.
 */

export type ArticleCitation = {
  label: string;
  url: string;
};

export type Article = {
  slug: string;
  /** The specific question rendered as the page H1. */
  question: string;
  /** <title> pattern: "[Question] | Paytonix" is applied at render time. */
  description: string;
  /** 40-80 word direct answer, shown immediately below the H1. */
  directAnswer: string;
  definition: string;
  symptoms: string[];
  causes: string[];
  diagnosticTests: string[];
  consequences: string[];
  repairOptions: string[];
  prevention: string[];
  assumptions: string[];
  citations: ArticleCitation[];
  authorName: string;
  authorUrl: string;
  datePublished: string;
  lastReviewed: string;
};

export const articles: Article[] = [
  {
    slug: "why-crm-and-warehouse-revenue-disagree",
    question: "Why do CRM revenue and warehouse revenue disagree?",
    description:
      "CRM and warehouse revenue disagree because of timing mismatches, duplicate records, join fanout, and unsynced manual overrides. Here's how to diagnose and fix it.",
    directAnswer:
      "CRM and warehouse revenue disagree because they compute revenue through different technical paths—stage-based pipeline values versus warehouse-aggregated transaction data. Mismatches usually trace to timing differences between when a deal is marked won and when revenue is recognized, duplicate or reopened records, join fanout during warehouse modeling, and manual CRM overrides that never sync back to source systems.",
    definition:
      "\"CRM revenue\" and \"warehouse revenue\" are not the same measurement of the same fact. CRM revenue is typically a stage-based field on an opportunity or deal record, set manually or via workflow automation. Warehouse revenue is typically computed by joining and aggregating raw event, billing, or transaction tables through a transformation pipeline. Unless someone has explicitly engineered these two paths to reconcile, they will drift.",
    symptoms: [
      "Finance's reported revenue doesn't match the number sales leadership presents from the CRM.",
      "The same month's revenue total changes depending on which dashboard or report is pulled.",
      "Closed-won deal counts don't match invoice or transaction counts.",
      "Revenue swings after a warehouse model refresh with no underlying business change.",
      "Different teams each defend \"their own version\" of the revenue number.",
    ],
    causes: [
      "Timing mismatch: a deal is marked closed-won on a different date than the billing system recognizes revenue.",
      "Duplicate opportunity or contact records inflating downstream counts.",
      "Join fanout: joining CRM opportunities to warehouse billing tables at the wrong grain multiplies rows.",
      "Manual CRM amount overrides made after close that never reach the warehouse.",
      "Currency or amount-field mismatches—list price vs. discounted price vs. recognized revenue.",
      "Reopened or deleted opportunities that still exist in historical warehouse snapshots.",
      "Partial syncs or failed ETL jobs that silently drop records.",
    ],
    diagnosticTests: [
      "Reconcile row counts: closed-won CRM opportunities in a period vs. matching warehouse revenue records.",
      "Trace 5–10 individual deals end-to-end from CRM through the warehouse to the reported dashboard.",
      "Inspect the join keys and grain used in the warehouse model that maps CRM records to revenue.",
      "Compare the CRM amount-field audit log against the value the warehouse actually captured.",
      "Check for duplicate primary keys or fanned-out joins in the transformation logic.",
      "Review sync job success/failure logs for the CRM-to-warehouse pipeline over the reconciliation period.",
    ],
    consequences: [
      "Sales compensation gets calculated on a number finance doesn't recognize.",
      "Marketing ROI is measured against revenue figures that don't reconcile with collected revenue.",
      "Leadership spends meetings reconciling numbers instead of making decisions.",
      "Forecast accuracy erodes because the baseline itself is contested.",
      "Board or investor reporting carries risk if a material discrepancy goes undisclosed.",
    ],
    repairOptions: [
      "Define one authoritative revenue definition and document exactly where it lives.",
      "Fix the join grain and add uniqueness tests to the warehouse model.",
      "Add a reconciliation job that flags CRM-vs-warehouse deltas above a set threshold.",
      "Backfill and correct historical records where duplicates or fanout are found.",
      "Establish a change-log process for manual CRM revenue overrides.",
    ],
    prevention: [
      "Automated daily reconciliation check between CRM and warehouse revenue totals.",
      "Row-count and uniqueness tests on every warehouse model deploy.",
      "Alerting when CRM-to-warehouse sync jobs fail or run partially.",
      "A documented change-management step for manual revenue overrides in the CRM.",
    ],
    assumptions: [
      "Assumes the CRM and warehouse are the primary systems of record. A third system (e.g., a standalone billing platform not integrated with the CRM) changes the diagnostic path.",
      "Assumes reasonably standard ETL/ELT tooling with scheduled syncs and a transformation layer.",
      "Does not cover multi-period revenue recognition under formal accounting standards—that requires finance review alongside a technical audit.",
      "The diagnostic tests above are illustrative starting points; exact test design depends on the specific CRM, warehouse, and pipeline involved.",
    ],
    citations: [
      {
        label: "dbt: About data tests",
        url: "https://docs.getdbt.com/docs/build/data-tests",
      },
    ],
    authorName: "Tay Payton",
    authorUrl: "https://www.taypayton.com/",
    datePublished: "2026-07-25",
    lastReviewed: "2026-07-25",
  },
];

/**
 * Look up a single article by slug.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
