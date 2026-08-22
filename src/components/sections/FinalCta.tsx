/**
 * src/components/sections/FinalCta.tsx
 * Three-path project CTA — routes visitors toward the right qualification
 * entry based on their primary problem. All three paths anchor to the
 * intake form below.
 */

const paths = [
  {
    heading: "Fix unreliable data",
    description:
      "For attribution, journey, CRM, warehouse, revenue, and reporting issues.",
    cta: "Diagnose the Data",
    color: "border-amber-500/20 hover:border-amber-500/40",
    ctaColor: "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20",
  },
  {
    heading: "Build or integrate a system",
    description:
      "For new pipelines, CRM architecture, LLM workflows, APIs, warehouses, analytics, or executive systems.",
    cta: "Scope the Build",
    color: "border-emerald-500/20 hover:border-emerald-500/40",
    ctaColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20",
  },
  {
    heading: "Automate repetitive work",
    description:
      "For campaign setup, enrichment, segmentation, messaging, CRM updates, paid workflows, and recurring operations.",
    cta: "Automate the Workflow",
    color: "border-sky-500/20 hover:border-sky-500/40",
    ctaColor: "bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20",
  },
] as const;

/**
 * Final CTA section — three-path project routing into a shared qualification form.
 */
export function FinalCta() {
  return (
    <section
      id="start"
      className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="final-cta-heading"
    >
      <div className="paytonix-grid-bg absolute inset-0 pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
            Start a Project
          </p>
          <h2
            id="final-cta-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            What needs to work better?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Your stack should operate like a system. If the problem is broken
            attribution, disconnected CRM data, brittle pipelines, manual campaign
            operations, an AI workflow that never reached production, or a reporting
            layer nobody trusts—Paytonix can help.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {paths.map((path) => (
            <a
              key={path.heading}
              href="#request-assessment"
              className={`group flex flex-col rounded-xl border bg-zinc-900/40 p-6 transition ${path.color}`}
            >
              <h3 className="text-base font-semibold text-zinc-100">
                {path.heading}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {path.description}
              </p>
              <span
                className={`mt-5 inline-flex h-8 items-center justify-center rounded px-3 text-xs font-medium transition ${path.ctaColor}`}
              >
                {path.cta}
              </span>
            </a>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-xs leading-relaxed text-zinc-400">
          You&apos;ll receive a short qualification form first. If Paytonix is not
          a fit for the stack, stage, or problem, we&apos;ll say so directly.
        </p>
      </div>
    </section>
  );
}
