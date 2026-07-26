/**
 * src/components/hero/HeroSection.tsx
 * Above-the-fold hero establishing the revenue-data-reliability risk and proof visual.
 */

import { ReliabilityConsole } from "@/components/ui/ReliabilityConsole";

/**
 * Primary hero section for the Paytonix landing page.
 */
export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="hero-heading"
    >
      <div className="paytonix-grid-bg absolute inset-0 pointer-events-none" />
      <div className="paytonix-stream-line absolute left-0 right-0 top-1/3 opacity-60" />
      <div className="paytonix-stream-line absolute left-0 right-0 top-2/3 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-medium tracking-wide text-amber-400/90">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Revenue Data Reliability
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-xl">
            <h1
              id="hero-heading"
              className="text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
            >
              Your marketing numbers look precise. Are they actually right?
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              Find where customer journeys, campaign attribution, CRM records,
              and reported revenue break apart—before more budget is
              allocated using bad data.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Paytonix traces revenue data from first touch through closed
              business, identifies the gaps costing you visibility and
              wasted spend, and installs controls that keep your reporting
              trustworthy.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#request-assessment"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_var(--glow-emerald)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_var(--glow-emerald)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Request a Revenue Data Assessment
              </a>
              <a
                href="#detect"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-transparent px-6 text-sm font-medium text-zinc-200 transition hover:border-sky-500/40 hover:bg-white/[0.03] hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                See What We Test
              </a>
            </div>

            <p className="mt-8 border-t border-white/[0.06] pt-6 text-xs text-zinc-400">
              Built for growth, RevOps, MarTech, and data teams operating
              across multiple platforms.
            </p>
          </div>

          <div className="lg:pl-4">
            <ReliabilityConsole />
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-400 lg:text-left">
              Illustrative example — not a live customer account
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
