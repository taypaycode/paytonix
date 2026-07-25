/**
 * src/components/sections/AssessmentOffer.tsx
 * Entry offer — the Revenue Data Integrity Assessment pricing and scope.
 */

const included = [
  "One customer-to-revenue journey map",
  "Review of one CRM, one warehouse, and selected acquisition sources",
  "Attribution and identity-continuity analysis",
  "Revenue and conversion reconciliation",
  "Pipeline, schema, grain, and freshness checks",
  "Prioritized failure register",
  "Estimated business exposure where evidence permits",
  "Executive findings review",
  "Fixed-scope repair and monitoring recommendations",
] as const;

const receiveQuestions = [
  "Where is the revenue-data chain breaking?",
  "Which reports or decisions are affected?",
  "What should be repaired first?",
  "Which controls would prevent recurrence?",
] as const;

/**
 * Assessment offer section — pricing, scope, and qualification for the entry engagement.
 */
export function AssessmentOffer() {
  return (
    <section
      id="assessment"
      className="border-b border-white/[0.06]"
      aria-labelledby="assessment-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/40 p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
                Entry Offer
              </p>
              <h2
                id="assessment-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
              >
                Revenue Data Integrity Assessment
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                A focused technical and commercial assessment of one critical
                customer-to-revenue journey.
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-zinc-50">
                  $3,500
                </span>
                <span className="text-sm text-zinc-500">starting at</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Delivered in approximately 7–10 business days after access and
                scope confirmation.
              </p>

              <a
                href="#request-assessment"
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_20px_var(--glow-emerald)] transition hover:bg-emerald-400 hover:shadow-[0_0_28px_var(--glow-emerald)] sm:w-auto"
              >
                Request an Assessment
              </a>

              <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                Best suited to companies with multiple marketing systems, an
                established CRM or warehouse, and meaningful acquisition or
                lifecycle spend.
              </p>
            </div>

            <div className="grid gap-8 lg:col-span-3 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Included
                </p>
                <ul className="mt-4 space-y-2.5">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-zinc-300"
                    >
                      <span
                        className="mt-0.5 font-mono text-emerald-400"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  You receive
                </p>
                <p className="mt-4 text-sm text-zinc-400">
                  A clear answer to four questions:
                </p>
                <ul className="mt-4 space-y-3">
                  {receiveQuestions.map((question) => (
                    <li
                      key={question}
                      className="rounded-lg border border-white/[0.08] bg-zinc-950/50 px-3 py-2.5 text-sm text-zinc-200"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
