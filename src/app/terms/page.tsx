/**
 * src/app/terms/page.tsx
 * Placeholder terms of service page.
 * TODO(tay-2026-07-24): Replace with finalized terms of service copy.
 */

import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Engagement terms for the Revenue Data Integrity Assessment and related Paytonix services.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

/**
 * Placeholder terms of service page.
 */
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              This page is being finalized. Engagement-specific terms,
              including scope, deliverables, and pricing for the Revenue
              Data Integrity Assessment, are confirmed in writing before
              work begins.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
