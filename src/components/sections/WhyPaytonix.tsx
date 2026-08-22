/**
 * src/components/sections/WhyPaytonix.tsx
 * Cross-boundary positioning — Paytonix works where marketing, engineering,
 * data, RevOps, AI, and platform specialists don't overlap.
 */

const boundaries = [
  "Marketing understands campaigns but not warehouse logic.",
  "Engineering understands pipelines but not attribution or lifecycle operations.",
  "Analysts understand reports but often do not own instrumentation or CRM behavior.",
  "RevOps understands CRM workflows but may not own the underlying data architecture.",
  "AI vendors understand models but not the operational systems the outputs must enter.",
  "Platform vendors understand their own software but not the end-to-end revenue system.",
] as const;

const capabilities = [
  "Python",
  "SQL",
  "BigQuery",
  "APIs",
  "Salesforce",
  "CRM Integration",
  "Marketing Automation",
  "Webhooks",
  "Customer Identity",
  "Event Instrumentation",
  "Attribution",
  "Semantic Modeling",
  "Business Intelligence",
  "Data Quality",
  "Reverse ETL",
  "LLM Workflows",
  "Structured Outputs",
  "AI Integration",
  "Workflow Orchestration",
  "Campaign Automation",
  "Paid Media Automation",
  "Revenue Analytics",
] as const;

/**
 * Why Paytonix section — cross-boundary positioning and underlying capabilities.
 */
export function WhyPaytonix() {
  return (
    <section
      id="why-paytonix"
      className="border-b border-white/[0.06]"
      aria-labelledby="why-paytonix-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Why Paytonix
            </p>
            <h2
              id="why-paytonix-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Where MarTech, data engineering, software, automation, and AI meet.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Most teams have specialists at individual layers:
            </p>
            <ul className="mt-4 space-y-2.5">
              {boundaries.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-0.5 font-mono text-zinc-400">–</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-zinc-300">
              Paytonix works across those boundaries.
            </p>
            <p className="mt-3 text-base font-medium leading-relaxed text-zinc-100">
              The result is not another dashboard, integration, AI demo, or script.
              It is a system that can be operated, explained, and improved.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              Capabilities
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded border border-white/10 bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-400"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
