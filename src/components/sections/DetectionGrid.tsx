/**
 * src/components/sections/DetectionGrid.tsx
 * Capabilities — the four service pillars where Paytonix operates:
 * Analytics & Revenue Data Engineering, MarTech & CRM Systems Engineering,
 * AI & LLM Production Systems, Campaign & Growth Automation.
 */

const pillars = [
  {
    title: "Analytics & Revenue Data Engineering",
    description: "Design the data foundation behind trustworthy decision-making.",
    statement: "Not another dashboard. The system behind the dashboard.",
    items: [
      "BigQuery and warehouse modeling",
      "SQL transformation architecture",
      "Semantic and KPI layers",
      "Customer and revenue models",
      "Attribution and journey analysis",
      "Identity continuity",
      "Executive reporting systems",
      "Data quality and observability",
      "Schema, freshness, grain, and reconciliation controls",
      "Source-to-report lineage",
    ],
  },
  {
    title: "MarTech & CRM Systems Engineering",
    description: "Make platforms operate as one system instead of a collection of vendor silos.",
    statement: "We don't just report on the stack. We make the stack operate.",
    items: [
      "Salesforce and CRM architecture",
      "CRM integrations",
      "API-based data ingestion and writeback",
      "Campaign-member and lifecycle-state orchestration",
      "Enrichment workflows",
      "Customer identity flows",
      "Reverse ETL patterns",
      "Webhook architecture",
      "Marketing automation integrations",
      "Event and operational data movement across systems",
    ],
  },
  {
    title: "AI & LLM Production Systems",
    description: "Move useful LLM behavior out of the chat window and into production systems.",
    statement: "AI that survives contact with production.",
    items: [
      "LLM-powered sales and marketing workflows",
      "Structured outputs",
      "Retrieval and knowledge integration",
      "API-connected agents and workflows",
      "CRM read/write integration",
      "Human approval gates",
      "Lead qualification and research",
      "Prompt and output validation",
      "Observability and failure handling",
      "Secure deployment patterns",
    ],
  },
  {
    title: "Campaign & Growth Automation",
    description: "Turn repetitive campaign operations into systems.",
    statement: "Encode the workflow once. Stop rebuilding the process every campaign.",
    items: [
      "Prospect enrichment",
      "Segmentation",
      "Campaign creation",
      "CRM member management",
      "Email-list orchestration",
      "Lifecycle messaging",
      "Paid-media automation",
      "Reporting loops",
      "Campaign QA",
      "Attribution feedback",
    ],
  },
] as const;

/**
 * Capabilities section — four service pillars showing the breadth of Paytonix work.
 */
export function DetectionGrid() {
  return (
    <section
      id="capabilities"
      className="border-b border-white/[0.06]"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-teal-400/90">
            Capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            The connective tissue between revenue systems.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Paytonix works across the boundaries where marketing, software
            engineering, analytics, AI, and revenue operations overlap.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 transition hover:border-teal-500/20 hover:bg-zinc-900/60"
            >
              <h3 className="text-base font-semibold text-zinc-100">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {pillar.description}
              </p>
              <ul className="mt-5 space-y-1.5">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs leading-relaxed text-zinc-400"
                  >
                    <span className="mt-0.5 font-mono text-teal-500/60">–</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs font-medium italic text-zinc-400">
                {pillar.statement}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
