/**
 * src/components/sections/NextSteps.tsx
 * Ways to Work Together — four engagement model cards covering the full range
 * of Paytonix entry points: assessment, systems build, automation, monitoring.
 */

import Link from "next/link";

const engagements = [
  {
    badge: "Fix unreliable data",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    title: "Revenue Data Integrity Assessment",
    description:
      "A focused technical and commercial assessment of one critical customer-to-revenue journey.",
    pricing: "Starting at $3,500",
    items: [
      "Attribution uncertainty",
      "CRM vs warehouse discrepancies",
      "Identity gaps",
      "Unreliable dashboards",
      "Revenue reconciliation problems",
    ],
    cta: { label: "Explore the Assessment", href: "/revenue-data-integrity-assessment" },
    ctaStyle: "border border-amber-500/40 text-amber-400 hover:bg-amber-500/10",
  },
  {
    badge: "Build or integrate",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    title: "Systems Architecture & Implementation",
    description:
      "Fixed-scope engineering for a high-value technical problem.",
    pricing: "Scoped after technical discovery",
    items: [
      "CRM integration and architecture",
      "API and pipeline design",
      "Warehouse and data models",
      "LLM production workflows",
      "Executive reporting systems",
    ],
    cta: { label: "Discuss a Build", href: "#start" },
    ctaStyle: "border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10",
  },
  {
    badge: "Automate repetitive work",
    badgeColor: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    title: "Campaign & Growth Automation Sprint",
    description:
      "Turn a stable manual process into a reusable workflow.",
    pricing: "Fixed scope based on workflow",
    items: [
      "Enrichment and segmentation",
      "Campaign creation and CRM updates",
      "Message and list orchestration",
      "Paid activation and sync-back",
      "Reporting and QA loops",
    ],
    cta: { label: "Automate a Workflow", href: "#start" },
    ctaStyle: "border border-sky-500/40 text-sky-400 hover:bg-sky-500/10",
  },
  {
    badge: "Ongoing reliability",
    badgeColor: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
    title: "Reliability & Monitoring",
    description:
      "Ongoing controls for qualified environments.",
    pricing: "Availability depends on stack",
    items: [
      "Pipeline freshness and schema drift",
      "Missing events and workflow failures",
      "Revenue discrepancies",
      "Identity deterioration",
      "Campaign taxonomy violations",
    ],
    cta: { label: "Discuss Monitoring", href: "#start" },
    ctaStyle: "border border-zinc-500/40 text-zinc-400 hover:bg-zinc-500/10",
  },
] as const;

/**
 * Ways to Work Together section — four engagement models presented as offer cards.
 * @param showAssessmentDetail - Passed through to allow deeper assessment links where relevant.
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
            Ways to Work Together
          </p>
          <h2
            id="next-steps-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            Start with the problem—not a predetermined service package.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {engagements.map((eng) => (
            <article
              key={eng.title}
              className="flex flex-col rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 sm:p-8"
            >
              <span
                className={`w-fit rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${eng.badgeColor}`}
              >
                {eng.badge}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-100">
                {eng.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {eng.description}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Typical work may include
              </p>
              <ul className="mt-3 flex-1 space-y-2">
                {eng.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-zinc-400"
                  >
                    <span className="mt-0.5 font-mono text-zinc-500">–</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <p className="text-xs text-zinc-400">{eng.pricing}</p>
                <Link
                  href={eng.cta.href}
                  className={`inline-flex h-8 items-center justify-center rounded px-3 text-xs font-medium transition ${eng.ctaStyle}`}
                >
                  {eng.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
