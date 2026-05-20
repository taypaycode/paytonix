/**
 * src/components/sections/CapabilitiesGrid.tsx
 * Technical validation block for CIOs and technical evaluators.
 */

const capabilities = [
  {
    title: "Advisory",
    description:
      "Fractional CTO engagements, technical roadmapping, and legacy migrations—aligned to revenue outcomes, not vanity architecture.",
    tags: ["Roadmap", "Migration", "Governance"],
  },
  {
    title: "Data Engineering",
    description:
      "Custom ETL/ELT pipelines, low-cost cloud data warehouse deployment, and semantic layer design your exec team can actually read.",
    tags: ["ETL/ELT", "Warehouse", "Semantic Layer"],
  },
  {
    title: "MarTech Syncing",
    description:
      "Multi-platform API integration and continuous business intelligence maintenance—so dashboards never drift from reality.",
    tags: ["APIs", "BI Ops", "Unified Profiles"],
  },
] as const;

const techBadges = ["SQL", "Python", "Go", "TypeScript", "REST APIs"] as const;

/**
 * Capabilities grid with tech stack badges.
 */
export function CapabilitiesGrid() {
  return (
    <section
      id="capabilities"
      className="border-b border-white/[0.06]"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-teal-400/90">
              Technical Validation
            </p>
            <h2
              id="capabilities-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Elite engineering. Business-grade delivery.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
              Built for founders who need clarity—and for the technical leaders
              who must sign off on how it gets there.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            aria-label="Technology stack"
          >
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="rounded border border-white/10 bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-400"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <article
              key={cap.title}
              className="group flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 transition hover:border-emerald-500/20 hover:bg-zinc-900/60"
            >
              <h3 className="text-lg font-semibold text-zinc-100">
                {cap.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                {cap.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-zinc-600"
                  >
                    {tag}
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
