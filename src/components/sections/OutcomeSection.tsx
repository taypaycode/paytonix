/**
 * src/components/sections/OutcomeSection.tsx
 * Before/after matrix showing the shift from fragmented, manually-connected
 * platforms to a reliable operating system across revenue systems.
 */

const rows = [
  {
    before: "Campaign and customer data live in disconnected tools.",
    after: "A mapped operating model across marketing, CRM, sales, data, and reporting.",
  },
  {
    before: "Analysts and operators maintain one-off queries, scripts, spreadsheets, and manual procedures.",
    after: "Reusable pipelines, integrations, workflows, and controls.",
  },
  {
    before: "AI tools generate useful output but stop short of production workflows.",
    after: "Validated LLM systems connected to APIs, CRM actions, business rules, and human approval gates.",
  },
  {
    before: "CRM, warehouse, billing, and dashboards disagree.",
    after: "Reconciled entities, definitions, lineage, and revenue reporting.",
  },
  {
    before: "Campaign setup requires repeated exports, imports, segmentation, and manual status updates.",
    after: "Automated orchestration across enrichment, CRM, email, paid media, and reporting.",
  },
  {
    before: "Leadership receives competing versions of the business.",
    after: "A system that explains where important numbers and operational states came from.",
  },
] as const;

/**
 * The Paytonix Outcome section — before/after matrix from fragmented systems to operating system.
 */
export function OutcomeSection() {
  return (
    <section
      id="outcome"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="outcome-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-sky-400/90">
            The Paytonix Outcome
          </p>
          <h2
            id="outcome-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            From fragmented platforms to an operating system.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Paytonix builds the technical layer that makes revenue systems
            operate—not just report.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-white/[0.08]">
          <div className="grid grid-cols-1 border-b border-white/[0.06] bg-zinc-900/50 sm:grid-cols-2">
            <div className="border-b border-white/[0.06] px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-400/80">
                Before
              </span>
            </div>
            <div className="px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/90">
                After
              </span>
            </div>
          </div>

          {rows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-1 border-t border-white/[0.06] sm:grid-cols-2"
            >
              <div className="flex gap-3 border-b border-white/[0.06] bg-red-500/[0.02] p-5 sm:border-b-0 sm:border-r">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-mono text-red-400/60"
                  aria-hidden="true"
                >
                  ×
                </span>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {row.before}
                </p>
              </div>
              <div className="flex gap-3 bg-emerald-500/[0.03] p-5">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-mono text-emerald-400"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <p className="text-sm leading-relaxed text-zinc-200">
                  {row.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
