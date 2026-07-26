/**
 * src/components/sections/HowItWorks.tsx
 * Five-step engagement model: Trace, Test, Quantify, Repair, Monitor.
 */

type Step = {
  number: string;
  title: string;
  description: string;
  example?: string;
};

const steps: readonly Step[] = [
  {
    number: "01",
    title: "Trace",
    description:
      "We select one commercially important journey and map it from acquisition through customer and revenue reporting.",
    example:
      "Campaign → Landing Page → Conversion Event → CRM → Warehouse → Executive Dashboard",
  },
  {
    number: "02",
    title: "Test",
    description:
      "We validate the events, identifiers, transformations, joins, and business definitions supporting that journey.",
  },
  {
    number: "03",
    title: "Quantify",
    description:
      "We identify the business exposure: wasted spend, unattributed revenue, duplicated results, delayed reporting, and recurring manual work.",
  },
  {
    number: "04",
    title: "Repair",
    description:
      "If requested, we correct the highest-value failures through a separately scoped implementation sprint.",
  },
  {
    number: "05",
    title: "Monitor",
    description:
      "For qualified systems, recurring controls continue testing data freshness, completeness, identity coverage, attribution, and revenue reconciliation.",
  },
] as const;

/**
 * How It Works section outlining the Trace → Test → Quantify → Repair → Monitor model.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            Start with one revenue journey—not a six-month transformation.
          </h2>
        </div>

        <ol className="mt-12 space-y-8 border-l border-white/[0.08] pl-8 sm:pl-10">
          {steps.map((step) => (
            <li key={step.number} className="relative">
              <span className="absolute -left-[calc(2rem+9px)] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/40 bg-zinc-950 sm:-left-[calc(2.5rem+9px)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400/90">
                {step.number}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {step.description}
              </p>
              {step.example && (
                <p className="mt-3 inline-block rounded-md border border-white/[0.08] bg-zinc-900/50 px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-400">
                  {step.example}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
