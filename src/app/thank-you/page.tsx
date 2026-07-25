/**
 * src/app/thank-you/page.tsx
 * Post-submission thank-you page with Google Ads lead conversion tracking.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LeadFormConversion } from "@/components/analytics/LeadFormConversion";
import { CalEmbed } from "@/components/ui/CalEmbed";

export const metadata: Metadata = {
  title: "Thank You | Paytonix",
  description: "Your assessment request was received.",
  robots: { index: false, follow: false },
};

/**
 * Thank-you page shown after successful assessment request submission.
 */
export default function ThankYouPage() {
  return (
    <>
      <LeadFormConversion />
      <SiteHeader />
      <main className="flex-1">
        <section className="paytonix-grid-bg relative border-b border-white/[0.06]">
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Request received
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Thank you—we received your submission.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
              We&apos;ll review your revenue journey context and follow up
              within one business day to confirm scope and access
              requirements. Lock a qualification call now if you&apos;d
              rather talk it through directly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#book-assessment"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_var(--glow-emerald)] transition hover:bg-emerald-400"
              >
                Schedule a Qualification Call
              </a>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-medium text-zinc-200 transition hover:border-sky-500/40 hover:text-sky-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <section
          id="book-assessment"
          className="bg-zinc-950"
          aria-labelledby="thank-you-calendar-heading"
        >
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <h2
              id="thank-you-calendar-heading"
              className="text-center font-mono text-xs uppercase tracking-widest text-zinc-500"
            >
              Schedule a qualification call
            </h2>
            <div className="mt-6">
              <CalEmbed />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
