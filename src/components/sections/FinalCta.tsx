/**
 * src/components/sections/FinalCta.tsx
 * Closing call-to-action before the assessment intake form.
 */

/**
 * Final CTA section driving toward the assessment request form.
 */
export function FinalCta() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="final-cta-heading"
    >
      <div className="paytonix-grid-bg absolute inset-0 pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2
          id="final-cta-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
        >
          Stop asking which dashboard is right.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Trace one critical revenue journey from first touch to closed
          business. Find the missing data, broken attribution, unsafe
          transformations, and reporting discrepancies before they consume
          another quarter of budget.
        </p>

        <a
          href="#request-assessment"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_var(--glow-emerald)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_var(--glow-emerald)]"
        >
          Request a Revenue Data Integrity Assessment
        </a>

        <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-zinc-500">
          You&apos;ll receive a short qualification form first. If the
          assessment is not appropriate for your stack or stage, we&apos;ll
          tell you directly.
        </p>
      </div>
    </section>
  );
}
