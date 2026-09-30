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
  {
    slug: "what-data-architecture-fits-your-organization",
    question: "What data architecture should my organization use?",
    description:
      "Match data architecture to industry, latency, and decision needs—RDW for ad-heavy reporting, lakehouse MDW for telecom CDRs, data fabric when IoT and many domains must interoperate.",
    directAnswer:
      "The right data architecture is the smallest design that reliably answers your business questions at the speed leadership actually decides—not the platform your vendor demoed last quarter. Ad-centric organizations with high-volume campaign and conversion reporting often need a relational data warehouse (RDW) tuned for SQL analytics and BI. Service-heavy industries such as telecom that must retain call detail records (CDRs), usage events, and network telemetry for compliance and operational reporting typically benefit from a lakehouse with a modeled data warehouse (MDW) layer on top. Larger, multi-domain enterprises that must unify ERP, product, IoT, edge, and partner feeds without rebuilding every pipeline each time a source appears are candidates for a data fabric—metadata-driven integration with governed access across environments.",
    definition:
      "Data architecture here means how raw signals become trusted metrics: where data lands, how it is transformed, who can query it, and how fresh it must be for finance, operations, and executives. A relational data warehouse (RDW) optimizes structured tables, joins, and dashboards—ideal when sources are well-defined and questions are recurring (ROAS, funnel conversion, revenue by channel). A data lakehouse keeps cheap object storage for raw and semi-structured data while supporting ACID tables and SQL—useful when volume, retention, and schema drift are high (CDRs, logs, device events). A modeled data warehouse (MDW) sits on that foundation with business-grain facts and dimensions so reporting does not re-parse raw files every Monday. A data fabric is not a single product; it is an operating model—active metadata, cataloging, policy, and reusable data products—so many domains share definitions and pipelines without one monolithic warehouse owning everything.",
    symptoms: [
      "Executives see three different \"official\" numbers for the same KPI because each team built its own extract.",
      "Analysts spend more time finding and fixing files than answering questions.",
      "Real-time or near-real-time needs (campaign pacing, network faults, fraud) are forced into overnight batch jobs.",
      "IoT, call records, or clickstream data are stored but never join cleanly to customer or revenue entities.",
      "Every new acquisition or product line triggers a six-month \"new data platform\" project instead of onboarding a source.",
      "Cloud spend climbs while time-to-insight stays flat—more storage, same visibility.",
    ],
    causes: [
      "Architecture chosen from a reference slide deck rather than from decision latency and regulatory retention requirements.",
      "Conflating \"we need AI\" with \"we need a fabric\" before basic entity resolution and metric definitions exist.",
      "Buying a lake when the organization only consumes curated SQL reports—or building a warehouse when 80% of value is raw log replay.",
      "No explicit owner for canonical customer, account, product, and revenue grains across systems.",
      "Siloed purchases: marketing stack, billing OSS/BSS, and product telemetry each optimized locally without interoperability standards.",
      "Future-state roadmaps (IoT, international expansion, M&A) treated as optional instead of constraints on today's design.",
    ],
    diagnosticTests: [
      "List the top ten decisions executives make monthly and the maximum acceptable data age for each (minutes, hours, days).",
      "Inventory data classes: structured transactions, semi-structured events (CDRs, clicks, logs), unstructured (documents, call audio metadata), and IoT/edge streams.",
      "Measure query patterns: mostly recurring BI (dashboards) versus ad hoc exploration versus operational triggers.",
      "Document retention and compliance requirements per domain (telecom CDR retention, ad log policies, healthcare/finance if applicable).",
      "Trace one revenue-critical entity (subscriber, advertiser, account) across CRM, billing, product, and reporting—note every handoff and ID scheme.",
      "Estimate cost of wrong architecture: duplicate pipelines, manual reconciliations, and delayed decisions in the last two quarters.",
      "Compare present needs (next 12 months) to credible future needs (new lines of business, IoT scale, M&A integration)—flag gaps that a minimal RDW cannot cover.",
    ],
    consequences: [
      "Interoperability debt: each new source requires custom glue instead of governed onboarding.",
      "ROI erodes when platforms are oversized for the question set—or undersized so teams export CSVs to shadow spreadsheets.",
      "Executive visibility stays fragmented; board-ready narratives require manual assembly.",
      "Operational risk when network or service data cannot be correlated with customer experience and revenue impact.",
      "Engineering morale drops when the stack fights the business instead of accelerating it.",
    ],
    repairOptions: [
      "Ad platform–heavy org (performance marketing, publisher analytics): prioritize an RDW with strong ELT, identity resolution for users/campaigns, and fast refresh for channel and conversion metrics; add a lightweight lake only if you must replay raw event logs for attribution debugging.",
      "Service-based telecom or similar (CDRs, usage, trouble tickets, OSS/BSS): lakehouse for durable, high-volume event and record storage plus an MDW layer for subscriber, product, and revenue reporting—so compliance retention and executive dashboards share one governed model.",
      "Multi-domain enterprise with IoT, partners, and legacy ERP: evolve toward data fabric patterns—enterprise catalog, data products with SLAs, policy-as-code, and federated query—rather than forcing all bytes into one physical warehouse.",
      "Hybrid present/future: implement a thin MDW for executive KPIs now while standardizing ingestion and metadata so fabric capabilities can layer on without re-platforming.",
      "If CRM and warehouse revenue already disagree, fix grain and reconciliation before expanding architecture scope—see the CRM-vs-warehouse diagnostic on Insights.",
    ],
    prevention: [
      "Anchor every architecture choice to a named business outcome (faster exec decisions, lower reconciliation labor, compliant retention)—not platform features.",
      "Publish a one-page metric dictionary and entity model before selecting net-new tooling.",
      "Design for interoperability: stable IDs, event contracts, and catalog entries so tomorrow's IoT or acquisition feed reuses today's pipes.",
      "Right-size spend: match storage/compute tier to query latency requirements; reserve fabric investments for when domain count and source volatility justify them.",
      "Plan executive visibility as a product—curated KPI layers with lineage and freshness labels leadership can trust in the room.",
      "Revisit architecture when decision latency, regulatory scope, or domain count crosses a threshold—Paytonix treats assessments as matching present needs and credible future load to the smallest reliable design.",
    ],
    assumptions: [
      "Examples (telecom CDR lakehouse, ad RDW) are illustrative patterns; exact stack choices depend on existing contracts, skills, and latency SLAs.",
      "Data fabric descriptions reflect common industry usage (metadata-driven integration and data products), not a single vendor product definition.",
      "Does not replace legal/compliance review for regulated retention or cross-border data residency.",
      "Assumes leadership can articulate at least a draft set of priority decisions and KPIs; if not, discovery work precedes platform selection.",
    ],
    citations: [
      {
        label: "Databricks: What is a data lakehouse?",
        url: "https://www.databricks.com/glossary/data-lakehouse",
      },
      {
        label: "Gartner IT Glossary: Data fabric",
        url: "https://www.gartner.com/en/information-technology/glossary/data-fabric",
      },
    ],
    authorName: "Tay Payton",
    authorUrl: "https://www.taypayton.com/",
    datePublished: "2026-09-30",
    lastReviewed: "2026-09-30",
  },
];

/**
 * Look up a single article by slug.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
