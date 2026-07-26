/**
 * src/app/revenue-data-integrity-assessment/page.tsx
 * Dedicated landing page for the Revenue Data Integrity Assessment — the
 * primary organic and paid-search destination. Carries the full scope,
 * exclusions, fit criteria, and FAQ; the homepage only links here.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssessmentOffer } from "@/components/sections/AssessmentOffer";
import { QualificationFit } from "@/components/sections/QualificationFit";
import { AssessmentFaq } from "@/components/sections/AssessmentFaq";
import { AssessmentForm } from "@/components/sections/AssessmentForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { assessmentPageGraph } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Revenue Data Integrity Assessment",
  description:
    "Trace one critical customer-to-revenue journey, identify attribution and reconciliation failures, and receive a prioritized repair and monitoring plan.",
  alternates: {
    canonical: `${SITE_URL}/revenue-data-integrity-assessment`,
  },
  openGraph: {
    title: "Revenue Data Integrity Assessment | Paytonix",
    description:
      "Trace one critical customer-to-revenue journey, identify attribution and reconciliation failures, and receive a prioritized repair and monitoring plan.",
    url: `${SITE_URL}/revenue-data-integrity-assessment`,
    type: "website",
  },
};

export default function AssessmentPage() {
  return (
    <>
      <JsonLd data={assessmentPageGraph()} />
      <ViewTracker event="view_assessment" />
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-white/[0.06] bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Revenue Data Integrity Assessment
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Find out where your revenue-data chain actually breaks.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              A focused technical and commercial assessment of one critical
              customer-to-revenue journey — scoped, priced, and delivered in
              7–10 business days.
            </p>
          </div>
        </section>

        <AssessmentOffer showDetailLink={false} />
        <QualificationFit />

        <section className="border-b border-white/[0.06] bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:px-8">
            <p className="text-sm text-zinc-400">
              Want to see how we diagnose failures like these before you
              request an assessment?{" "}
              <Link
                href="/insights"
                className="font-medium text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
              >
                Read our methodology articles →
              </Link>
            </p>
          </div>
        </section>

        <AssessmentFaq />
        <AssessmentForm />
      </main>
      <SiteFooter />
    </>
  );
}
