/**
 * src/components/sections/NextSteps.tsx
 * Optional expansion paths after the assessment: Repair Sprint and Continuous Monitoring.
 */

const repairScope = [
  "Event instrumentation repair",
  "CRM and warehouse reconciliation",
  "Identity-resolution improvements",
  "Attribution-model corrections",
  "SQL model and grain redesign",
  "API and pipeline remediation",
  "Dashboard-source validation",
] as const;

const monitoringScope = [
  "Missing conversion events",
  "Schema drift",
  "Data-freshness failures",
  "Revenue discrepancies",
  "Duplicate transactions",
  "Identity-coverage deterioration",
  "Campaign-taxonomy violations",
  "Abnormal changes in event volume",
] as const;

/**
 * Optional Next Steps section — Repair Sprint (expansion) and Continuous Monitoring (recurring).
 */
export function NextSteps() {
  return (
    <section
      id="next-steps"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="next-steps-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-sky-400/90">
            Optional Next Steps
          </p>
          <h2
            id="next-steps-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            Assess first. Expand only where the evidence supports it.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 sm:p-8">
            <span className="w-fit rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
              Expansion
            </span>
            <h3 className="mt-4 text-lg font-semibold text-zinc-100">
              Repair Sprint
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Correct a defined set of high-priority failures uncovered
              during the assessment.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              Typical work may include
            </p>
            <ul className="mt-3 flex-1 space-y-2">
              {repairScope.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-0.5 font-mono text-emerald-500/60">–</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs text-zinc-400">
              Fixed scope based on validated findings.
            </p>
          </article>

          <article className="flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 sm:p-8">
            <span className="w-fit rounded border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sky-400">
              Recurring · Available for qualified systems
            </span>
            <h3 className="mt-4 text-lg font-semibold text-zinc-100">
              Continuous Reliability Monitoring
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Maintain automated controls around the revenue-data chain after
              it has been mapped and validated.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              Potential monitoring includes
            </p>
            <ul className="mt-3 flex-1 space-y-2">
              {monitoringScope.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-0.5 font-mono text-sky-500/60">–</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs text-zinc-400">
              Monitoring availability and pricing depend on stack complexity
              and supported integrations.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
