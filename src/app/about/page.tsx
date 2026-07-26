/**
 * src/app/about/page.tsx
 * About Paytonix — founder background, evidence standards, and how access
 * and client data are handled during an assessment.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SecurityAccess } from "@/components/sections/SecurityAccess";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paytonix was founded by Tay Payton to diagnose and repair the breaks between marketing platforms, CRM records, warehouse models, and reported revenue.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Paytonix",
    description:
      "Founder background, evidence standards, and how Paytonix handles access to client systems during an assessment.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-white/[0.06] bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              About
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Built by Tay Payton
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-lg font-semibold text-emerald-400">
                TP
              </span>
              <p className="text-sm text-zinc-400">
                MarTech &amp; customer-data architect · Founder, Paytonix
              </p>
            </div>

            <p className="mt-8 text-base leading-relaxed text-zinc-300">
              Tay Payton is a MarTech and customer-data architect who has
              worked across marketing platforms, CRM systems, websites, data
              warehouses, APIs, automation, and executive reporting.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              That work repeatedly exposed the same underlying problem:
              companies were not lacking data. They were lacking confidence
              that customer behavior, campaign activity, and reported revenue
              still represented the same reality after passing through a
              fragmented technology stack.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-zinc-100">
              Paytonix was created to diagnose and prevent those failures.
            </p>

            <p className="mt-8 text-sm leading-relaxed text-zinc-400">
              Paytonix works across the boundaries most teams operate
              within individually — marketing understands campaigns but not
              warehouse logic, engineering understands pipelines but not
              attribution, analysts understand reports but don&apos;t own
              instrumentation, and vendors understand their own platform but
              not the full revenue chain. The result isn&apos;t another
              dashboard. It&apos;s a tested and explainable system behind
              the dashboard.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a
                href="https://www.linkedin.com/in/taypayton/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href="https://www.taypayton.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
              >
                Technical experience (taypayton.com)
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.06]">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Evidence standards
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              What we claim, and what we don&apos;t
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-400">
              <li>
                We distinguish Paytonix clients from Tay&apos;s prior
                employers or contract experience — logos and names are only
                used with permission.
              </li>
              <li>
                We use language like &quot;experience engineering systems
                for teams including…&quot; rather than implying a formal
                client endorsement that hasn&apos;t been given.
              </li>
              <li>
                We never fabricate testimonials, reviews, benchmarks,
                incidents, or outcomes. Anonymized examples are used only
                where confidentiality permits.
              </li>
            </ul>
          </div>
        </section>

        <SecurityAccess />

        <section className="bg-zinc-950">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/revenue-data-integrity-assessment"
              className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_20px_var(--glow-emerald)] transition hover:bg-emerald-400"
            >
              Request an Assessment
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
