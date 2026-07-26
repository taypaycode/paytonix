/**
 * src/components/sections/AssessmentFaq.tsx
 * Genuine buyer questions for the Revenue Data Integrity Assessment, with
 * matching FAQPage structured data. Questions and answers stay visible —
 * this section is the single source of truth for both.
 */

import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

const faqs = [
  {
    question: "What technical access do you need?",
    answer:
      "Read-only access wherever the platform supports it — typically analytics/marketing platforms, the CRM, the warehouse, and reporting tools. If read-only access to a required system can't be granted, we scope that system out and note it as a limitation.",
  },
  {
    question: "How long does the assessment take?",
    answer:
      "Approximately 7–10 business days after access and scope are confirmed. Timeline depends on how quickly access is granted and how many systems the selected journey crosses.",
  },
  {
    question: "What's included at the starting price?",
    answer:
      "A single customer-to-revenue journey map, review of one CRM, one warehouse, and selected acquisition sources, attribution and identity-continuity analysis, revenue and conversion reconciliation, pipeline/schema/freshness checks, a prioritized failure register, and an executive findings review.",
  },
  {
    question: "What's not included?",
    answer:
      "Implementing fixes, ongoing monitoring, and auditing additional journeys beyond the one scoped are not included at the starting price. Those are offered separately as a Repair Sprint and Continuous Reliability Monitoring after the assessment.",
  },
  {
    question: "What happens to our data and credentials afterward?",
    answer:
      "Access is revoked immediately once the engagement concludes, and no client data is retained after findings are delivered. Findings and anything observed during the assessment are kept confidential.",
  },
  {
    question: "Do you implement the fixes you find?",
    answer:
      "Only if requested, and only through a separately scoped Repair Sprint priced against the specific failures the assessment identifies — not an open-ended retainer.",
  },
  {
    question: "Do you offer ongoing monitoring?",
    answer:
      "Continuous Reliability Monitoring is available for qualified systems as a post-assessment engagement. It is not yet a mature, self-serve product — availability and pricing depend on stack complexity and supported integrations.",
  },
  {
    question: "We don't have a CRM or warehouse yet — is this still a fit?",
    answer:
      "Probably not yet. This assessment is built for companies with an established CRM or warehouse, multiple marketing systems, and meaningful acquisition or lifecycle spend already in place.",
  },
] as const;

/**
 * FAQ section for the dedicated assessment page.
 */
export function AssessmentFaq() {
  return (
    <section
      id="faq"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="faq-heading"
    >
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
          Frequently asked
        </p>
        <h2
          id="faq-heading"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
        >
          Questions we&apos;re asked before someone requests an assessment
        </h2>

        <div className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-zinc-100 marker:content-['']">
                {faq.question}
                <span
                  className="mt-0.5 shrink-0 font-mono text-zinc-400 transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
