/**
 * src/app/privacy/page.tsx
 * Placeholder privacy policy page.
 * TODO(tay-2026-07-24): Replace with finalized privacy policy copy.
 */

import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Paytonix LLC handles personal data submitted through the assessment intake form.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

/**
 * Placeholder privacy policy page.
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              This page is being finalized. Paytonix LLC does not sell
              personal data. Information submitted through our assessment
              intake form is used solely to evaluate and respond to your
              request. For questions about data handling, contact us via
              LinkedIn.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
