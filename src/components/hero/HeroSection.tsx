/**
 * src/components/hero/HeroSection.tsx
 * Above-the-fold hero with headline, CTAs, and dashboard visual proof.
 */

import { DashboardMockup } from "@/components/ui/DashboardMockup";

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
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium tracking-wide text-emerald-400/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Fractional CTO &amp; Growth Architect
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-xl">
            <h1
              id="hero-heading"
              className="text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
            >
              Stop Running Your Business on Delayed Data and Spreadsheet
              Chaos.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              We engineer your company&apos;s Single Pane of Glass—unifying your
              marketing, sales, and financial data into one automated, real-time
              executive dashboard. Enterprise-grade technical architecture
              without the full-time overhead.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#audit"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_var(--glow-emerald)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_var(--glow-emerald)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Request a Technical Audit
              </a>
              <a
                href="#capabilities"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-transparent px-6 text-sm font-medium text-zinc-200 transition hover:border-sky-500/40 hover:bg-white/[0.03] hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Explore the Stack
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.06] pt-8 text-xs text-zinc-500">
              <li className="flex items-center gap-2">
                <span className="font-mono text-emerald-500/80">01</span>
                Real-time pipelines
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-sky-500/80">02</span>
                Unified executive KPIs
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-teal-500/80">03</span>
                Zero spreadsheet drift
              </li>
            </ul>
          </div>

          <div className="lg:pl-4">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
