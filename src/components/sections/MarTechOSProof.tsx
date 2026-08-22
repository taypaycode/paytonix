/**
 * src/components/sections/MarTechOSProof.tsx
 * Product proof block for MarTechOS — demonstrates that Paytonix builds
 * the reusable infrastructure it recommends, not just one-off deliverables.
 */

import Link from "next/link";

/**
 * MarTechOS proof section — positioned as evidence of Paytonix's engineering
 * depth and productized infrastructure capabilities.
 */
export function MarTechOSProof() {
  return (
    <section
      id="martechos"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="martechos-proof-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-2xl border border-teal-500/20 bg-zinc-900/40 p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <p className="font-mono text-xs uppercase tracking-widest text-teal-400/90">
                Productized Infrastructure
              </p>
              <h2
                id="martechos-proof-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
              >
                We build reusable systems—not just one-off deliverables.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                MarTechOS is Paytonix&apos;s automation runtime for technical marketing
                operations.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                It was created around a recurring pattern: teams already own powerful
                CRMs, enrichment platforms, mailers, analytics tools, and warehouses—but
                the operating logic between them still lives in scripts, spreadsheets,
                admin clicks, and institutional memory.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                MarTechOS turns that logic into configurable, inspectable workflows.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/martechos"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-teal-500 px-5 text-sm font-semibold text-zinc-950 shadow-[0_0_20px_rgba(20,184,166,0.3)] transition hover:bg-teal-400"
                >
                  Explore MarTechOS
                </Link>
                <a
                  href="https://buy.stripe.com/cNidRaaZc48f0JGaX48AE00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-medium text-zinc-200 transition hover:border-teal-500/40 hover:text-teal-300"
                >
                  Founding Beta — $99
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Core mental model
              </p>
              <p className="mt-3 text-base font-medium text-zinc-100">
                Connect → Configure → Preview → Execute
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Current product concepts
              </p>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                {[
                  "Canonical marketing and revenue entities",
                  "Provider adapters (Salesforce, Pardot, ZoomInfo)",
                  "CRM / Mailer / Enrichment capabilities",
                  "Dry-run execution",
                  "Idempotency and run-state tracking",
                  "Validation and approval manifests",
                  "Safe mutation controls",
                  "Self-hosted / local operation",
                  "Zero-network demo mode",
                  "CLI: init, doctor, demo, validate, run",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-zinc-300">
                    <span className="mt-0.5 font-mono text-teal-400" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                The existence of MarTechOS demonstrates the broader point: Paytonix is
                capable of building the technical infrastructure it recommends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
