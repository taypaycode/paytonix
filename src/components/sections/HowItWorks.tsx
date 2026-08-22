/**
 * src/components/sections/HowItWorks.tsx
 * Five-step engagement model: Assess, Architect, Build, Automate, Monitor.
 */

type Step = {
  number: string;
  title: string;
  description: string;
  detail?: string;
};

const steps: readonly Step[] = [
  {
    number: "01",
    title: "Assess",
    description:
      "We identify the systems, workflows, bottlenecks, failure modes, and business outcomes that matter.",
    detail:
      "This may involve tracing a customer journey, reviewing CRM architecture, examining a warehouse model, auditing an automation workflow, or scoping an AI system.",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "We define the system boundaries, canonical entities, data contracts, integrations, control points, and operating model.",
    detail: "The goal is not to add more tools—it is to decide how the tools should work together.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We implement the technical foundation: APIs, pipelines, SQL models, CRM integrations, LLM workflows, dashboards, webhooks, orchestration, validation, and automation.",
  },
  {
    number: "04",
    title: "Automate",
    description:
      "We remove repetitive operational work where the process is understood well enough to encode safely.",
    detail:
      "That may include targeting, enrichment, campaign creation, list management, CRM writeback, lifecycle actions, reporting, QA, and sync logic.",
  },
  {
    number: "05",
    title: "Monitor",
    description:
      "Where appropriate, we add controls for failures, freshness, schema drift, identity coverage, workflow execution, revenue reconciliation, and attribution integrity.",
  },
] as const;

/**
 * How It Works section outlining the Assess → Architect → Build → Automate → Monitor model.
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
            How We Work
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            Assess → Architect → Build → Automate → Monitor
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
              {step.detail && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {step.detail}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
