/**
 * src/components/sections/OutcomeSection.tsx
 * Before/after matrix showing the shift from disconnected activity to defensible revenue.
 */

const rows = [
  {
    before: "Marketing platforms report conversions differently.",
    after: "One mapped customer and revenue journey.",
  },
  {
    before: "Customer identities fragment across sessions and tools.",
    after: "Defined ownership for every source and transformation.",
  },
  {
    before: "CRM stages do not reconcile with warehouse records.",
    after:
      "Automated checks for missing, duplicated, delayed, or malformed data.",
  },
  {
    before: "Analysts repeatedly repair spreadsheets and one-off queries.",
    after: "Reconciled campaign, CRM, warehouse, and revenue reporting.",
  },
  {
    before: "Leadership receives competing versions of revenue.",
    after: "A clear record of where every important number came from.",
  },
] as const;

/**
 * The Paytonix Outcome section — before/after matrix of the revenue-data chain.
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
            From disconnected activity to defensible revenue
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
            Paytonix connects the technical evidence behind each revenue
            decision.
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
