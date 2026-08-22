/**
 * src/components/sections/ProblemSection.tsx
 * The Problem — fragmented systems create a stack full of powerful software
 * that still depends on human glue. Broader than data-only framing.
 */

const unansweredQuestions = [
  "Which campaigns create profitable customers—not merely leads?",
  "Which customer journeys actually contribute to revenue?",
  "Where are prospects disappearing between systems?",
  "Does CRM state reconcile with warehouse and finance data?",
  "Which repetitive campaign operations can be automated safely?",
  "Can AI-generated outputs be validated and written back into production systems?",
  "Which workflows depend on tribal knowledge or manual intervention?",
  "Can we change vendors without rebuilding the operating logic from scratch?",
  "Which systems are producing the same business concept differently?",
  "Where should we automate, integrate, or redesign before adding another tool?",
] as const;

/**
 * The Problem section — fragmented revenue systems and the human glue holding them together.
 */
export function ProblemSection() {
  return (
    <section
      id="problem"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-400/90">
          The Problem
        </p>
        <h2
          id="problem-heading"
          className="mt-2 max-w-3xl text-2xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl"
        >
          The dashboard is only the last mile.
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-zinc-400 sm:text-base lg:col-span-3">
            <p>
              A modern revenue system spans ads, websites, analytics,
              enrichment, CRM, lifecycle messaging, sales workflows, warehouses,
              AI tools, and executive reporting.
            </p>
            <p>
              Each platform may work perfectly on its own.
            </p>
            <p>
              The failures happen between them.
            </p>
            <p>
              Customer identities fragment. Campaign context disappears. CRM
              state drifts from warehouse models. Automation logic lives in
              one-off scripts. AI workflows stop short of production. Analysts
              repair the same reporting problems repeatedly. Operators manually
              coordinate steps that should be deterministic.
            </p>
            <p className="border-l-2 border-amber-500/40 pl-4 font-medium text-zinc-300">
              The result is a stack full of powerful software that still depends
              on human glue.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Your team should be able to answer
              </p>
              <ul className="mt-4 space-y-3">
                {unansweredQuestions.map((question) => (
                  <li
                    key={question}
                    className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                  >
                    <span className="mt-0.5 font-mono text-amber-500/70">?</span>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
