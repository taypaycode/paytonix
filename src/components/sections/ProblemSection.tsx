/**
 * src/components/sections/ProblemSection.tsx
 * Names the underlying risk: dashboards report the end of an unverified chain.
 */

const unansweredQuestions = [
  "Which campaigns create profitable customers—not merely leads?",
  "Which customer journeys actually contribute to revenue?",
  "Where are prospects disappearing between platforms?",
  "Does CRM revenue reconcile with finance and the warehouse?",
  "Are missing events making good campaigns look ineffective?",
  "Are duplicated records making weak campaigns look successful?",
] as const;

/**
 * The Problem section — establishes why polished dashboards can still be wrong.
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
          The dashboard isn&apos;t the source of truth. It&apos;s the end of a
          long chain of assumptions.
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-zinc-400 sm:text-base lg:col-span-3">
            <p>
              A customer sees an ad, visits several pages, returns on another
              device, enters the CRM, progresses through a sales process, and
              eventually produces revenue.
            </p>
            <p>
              Between those moments, identifiers disappear. Events fail.
              Campaign fields change. Records duplicate. Models join at the
              wrong grain. Revenue reaches the dashboard without a defensible
              journey behind it.
            </p>
            <p className="border-l-2 border-amber-500/40 pl-4 font-medium text-zinc-300">
              The final report may still look polished.
            </p>
            <p>
              When those answers are unreliable, marketing wastes budget,
              analysts waste time reconciling numbers, and leadership loses
              confidence in the entire system.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                But your team cannot confidently answer
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
