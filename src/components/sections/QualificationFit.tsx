/**
 * src/components/sections/QualificationFit.tsx
 * Best-fit / not-a-fit qualification content for the assessment page.
 */

const bestFit = [
  "Multiple marketing systems in active use",
  "An established CRM or warehouse",
  "Meaningful acquisition or lifecycle marketing spend",
  "A commercially important journey that isn't fully trusted",
  "Ability to provide read-only technical access",
] as const;

const notAFit = [
  "No meaningful customer or revenue data yet",
  "Looking for a generic dashboard, not a data-integrity audit",
  "Seeking unlimited engineering support or a retainer",
  "Unable to provide access to validate source systems",
  "Wants attribution certainty the available data can't support",
] as const;

/**
 * Qualification section — sets expectations before someone requests an assessment.
 */
export function QualificationFit() {
  return (
    <section
      id="fit"
      className="border-b border-white/[0.06]"
      aria-labelledby="fit-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
          Is this a fit?
        </p>
        <h2
          id="fit-heading"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
        >
          We&apos;ll tell you directly if it isn&apos;t.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/40 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/80">
              Best fit
            </p>
            <ul className="mt-4 space-y-2.5">
              {bestFit.map((item) => (
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

          <div className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              Not a fit
            </p>
            <ul className="mt-4 space-y-2.5">
              {notAFit.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                >
                  <span
                    className="mt-0.5 font-mono text-zinc-400"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
