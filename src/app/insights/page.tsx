/**
 * src/app/insights/page.tsx
 * Insights index — lists cornerstone diagnostic articles.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Diagnostic articles on customer-journey gaps, attribution failures, and CRM-to-warehouse revenue reconciliation.",
  alternates: {
    canonical: `${SITE_URL}/insights`,
  },
};

export default function InsightsIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Insights
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Diagnostic articles on revenue-data failures
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Specific, evidence-based answers to the questions that come up
              during a Revenue Data Integrity Assessment — published as we
              validate each one, not mass-produced.
            </p>

            <ul className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {articles.map((article) => (
                <li key={article.slug} className="py-6">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="text-lg font-medium text-zinc-100 underline-offset-2 hover:text-emerald-300 hover:underline"
                  >
                    {article.question}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {article.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
