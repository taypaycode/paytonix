/**
 * src/components/sections/FounderSection.tsx
 * Condensed founder-credibility teaser for the homepage. Full biography,
 * security & access practices, and evidence standards live on /about to
 * avoid duplicating large text blocks across pages.
 */

import Link from "next/link";

/**
 * Built By Tay Payton teaser — short bio with a link to the full About page.
 */
export function FounderSection() {
  return (
    <section
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-base font-semibold text-emerald-400">
              TP
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
                Built by Tay Payton
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                A MarTech and customer-data architect who founded Paytonix
                after repeatedly finding the same problem: companies weren&apos;t
                lacking data, they were lacking confidence in it.
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="shrink-0 self-start rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300 sm:self-center"
          >
            Read the full story →
          </Link>
        </div>
      </div>
    </section>
  );
}
