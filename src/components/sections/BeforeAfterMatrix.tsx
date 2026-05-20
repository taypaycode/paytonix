/**
 * src/components/sections/BeforeAfterMatrix.tsx
 * Scannable before/after operational friction matrix.
 */

const rows = [
  {
    friction:
      "Fragile, human-error-prone Excel sheets tracking core revenue.",
    fix: "Automated, centralized data pipelines feeding real-time BI dashboards.",
  },
  {
    friction:
      "Siloed MarTech tools and broken APIs that don't talk to each other.",
    fix: "Robust, cross-platform API integration and unified customer profiles.",
  },
  {
    friction:
      "Flying blind on marketing spend and actual customer acquisition costs.",
    fix: "Instant, verifiable visibility into exact profit margins and scaling levers.",
  },
] as const;

/**
 * Before/after operational matrix section.
 */
export function BeforeAfterMatrix() {
  return (
    <section
      id="matrix"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="matrix-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-sky-400/90">
            Operational Matrix
          </p>
          <h2
            id="matrix-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            From friction to absolute clarity
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
            What founders feel day-to-day—and what changes when your data stack
            is engineered as a single source of truth.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-white/[0.08]">
          <div className="grid grid-cols-1 border-b border-white/[0.06] bg-zinc-900/50 sm:grid-cols-2">
            <div className="border-b border-white/[0.06] px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-400/80">
                The Friction
              </span>
            </div>
            <div className="px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/90">
                The Paytonix Fix
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
                  {row.friction}
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
                  {row.fix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
