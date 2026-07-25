/**
 * src/components/sections/DetectionGrid.tsx
 * "What We Detect" — the specific failure modes Paytonix tests for.
 */

const failureModes = [
  {
    title: "Customer-Journey Gaps",
    description:
      "Find where anonymous visitors, known leads, opportunities, and customers fail to connect across sessions and platforms.",
    signals: [
      "Missing or inconsistent customer identifiers",
      "Broken anonymous-to-known identity stitching",
      "Untracked landing pages and conversion steps",
      "Journey events that never reach downstream systems",
    ],
  },
  {
    title: "Attribution Failures",
    description:
      "Determine whether campaign and channel credit survives the journey from acquisition through revenue.",
    signals: [
      "Lost UTMs and campaign identifiers",
      "Inconsistent source and medium taxonomies",
      "Platform conversions that cannot be reconciled",
      "Revenue credited to the wrong campaign or touchpoint",
    ],
  },
  {
    title: "Revenue Reconciliation",
    description:
      "Validate whether CRM, warehouse, billing, and executive reporting agree.",
    signals: [
      "Duplicate transactions or opportunities",
      "Join fanout inflating revenue",
      "Missing or delayed closed-won records",
      "Conflicting definitions across dashboards",
    ],
  },
  {
    title: "Pipeline & Model Reliability",
    description:
      "Detect failures before stakeholders discover them in a meeting.",
    signals: [
      "Stale tables and failed jobs",
      "Schema and field drift",
      "Abnormal null rates or volume changes",
      "Grain mismatches and unsafe joins",
      "Transformation logic that changes historical results",
    ],
  },
  {
    title: "Marketing-Waste Signals",
    description:
      "Expose where unreliable data is causing budget and labor to move in the wrong direction.",
    signals: [
      "Spend without attributable customer outcomes",
      "Campaigns optimized against incomplete conversions",
      "Manual reconciliation and spreadsheet dependence",
      "Reporting work that repeats every week or month",
    ],
  },
] as const;

/**
 * What We Detect section — grid of failure-mode categories with concrete signals.
 */
export function DetectionGrid() {
  return (
    <section
      id="detect"
      className="border-b border-white/[0.06]"
      aria-labelledby="detect-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-teal-400/90">
            What We Detect
          </p>
          <h2
            id="detect-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            The failure modes hiding between your systems.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {failureModes.map((mode) => (
            <article
              key={mode.title}
              className="group flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 transition hover:border-amber-500/20 hover:bg-zinc-900/60"
            >
              <h3 className="text-lg font-semibold text-zinc-100">
                {mode.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                {mode.description}
              </p>
              <ul className="mt-5 space-y-2">
                {mode.signals.map((signal) => (
                  <li
                    key={signal}
                    className="flex gap-2 text-xs leading-relaxed text-zinc-500"
                  >
                    <span className="mt-0.5 font-mono text-amber-500/60">–</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
