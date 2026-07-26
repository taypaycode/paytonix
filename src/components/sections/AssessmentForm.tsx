/**
 * src/components/sections/AssessmentForm.tsx
 * Revenue Data Integrity Assessment qualification intake via Formspree + Cal.com scheduling embed.
 */
"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalEmbed } from "@/components/ui/CalEmbed";
import { trackFunnelEvent } from "@/lib/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvzleqv";

const spendOptions = [
  "Under $10K / month",
  "$10K–$50K / month",
  "$50K–$150K / month",
  "$150K–$500K / month",
  "$500K+ / month",
] as const;

const crmOptions = [
  "Salesforce",
  "HubSpot",
  "Pipedrive",
  "Other CRM",
  "No CRM in place",
] as const;

const warehouseOptions = [
  "BigQuery",
  "Snowflake",
  "Redshift",
  "Postgres / custom",
  "None — spreadsheets or exports",
  "Other",
] as const;

const reportingOptions = [
  "Looker / Looker Studio",
  "Tableau",
  "Power BI",
  "Custom or internal BI tool",
  "Spreadsheets",
  "Other",
] as const;

const accessOptions = [
  "Yes — we can provide read access",
  "Not yet, but likely",
  "Unsure — needs internal approval",
  "No",
] as const;

const timingOptions = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Exploring for a future quarter",
] as const;

type FormStatus = "idle" | "submitting" | "error";

/**
 * Qualification form for the Revenue Data Integrity Assessment, with Cal.com fallback.
 */
export function AssessmentForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedStart = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFormInteraction() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackFunnelEvent("start_assessment_form");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const body = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          data?.error ?? "Submission failed. Please try again or book directly below.",
        );
      }

      trackFunnelEvent("submit_assessment_form");
      form.reset();
      router.push("/thank-you");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section
      id="request-assessment"
      className="bg-zinc-950"
      aria-labelledby="request-assessment-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Assessment Qualification
            </p>
            <h2
              id="request-assessment-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Start with the journey you trust least.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Tell us where the revenue-data chain feels unreliable. We&apos;ll
              confirm scope, access, and timing before any engagement begins.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-zinc-400">
              <li className="flex gap-2">
                <span className="font-mono text-emerald-400/90">→</span>
                Scoped to one customer-to-revenue journey
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-emerald-400/90">→</span>
                Fixed price, fixed timeline
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-emerald-400/90">→</span>
                We&apos;ll tell you directly if it&apos;s not the right fit
              </li>
            </ul>
            <p className="mt-8 text-sm text-zinc-400">
              Prefer to skip the form?{" "}
              <a
                href="https://cal.com/taylor-payton-c2gr6m/tech-growth-audit"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFunnelEvent("book_qualification_call")}
                className="font-medium text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
              >
                Book a qualification call directly
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onChange={handleFormInteraction}
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="rounded-xl border border-white/[0.08] bg-zinc-900/30 p-6 sm:p-8"
            >
              <input
                type="hidden"
                name="_subject"
                value="Paytonix Revenue Data Integrity Assessment Request"
              />

              <>
                {status === "error" && errorMessage && (
                  <div
                    className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="untrustworthy_journey"
                      className="block text-sm font-medium text-zinc-300"
                    >
                      Which revenue journey is least trustworthy?
                    </label>
                    <textarea
                      id="untrustworthy_journey"
                      name="untrustworthy_journey"
                      rows={3}
                      required
                      disabled={status === "submitting"}
                      placeholder="e.g. Paid social leads through to closed-won revenue in Salesforce"
                      className="mt-2 w-full resize-y rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="systems_crossed"
                      className="block text-sm font-medium text-zinc-300"
                    >
                      Which systems does it cross?
                    </label>
                    <input
                      id="systems_crossed"
                      name="systems_crossed"
                      type="text"
                      required
                      disabled={status === "submitting"}
                      placeholder="e.g. Meta Ads, HubSpot, Salesforce, BigQuery"
                      className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="concern_prompt"
                      className="block text-sm font-medium text-zinc-300"
                    >
                      What prompted concern?
                    </label>
                    <textarea
                      id="concern_prompt"
                      name="concern_prompt"
                      rows={3}
                      required
                      disabled={status === "submitting"}
                      placeholder="e.g. CRM and warehouse revenue no longer match"
                      className="mt-2 w-full resize-y rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="blocked_decision"
                      className="block text-sm font-medium text-zinc-300"
                    >
                      What business decision is currently blocked?
                    </label>
                    <textarea
                      id="blocked_decision"
                      name="blocked_decision"
                      rows={3}
                      required
                      disabled={status === "submitting"}
                      placeholder="e.g. Reallocating Q3 acquisition spend across channels"
                      className="mt-2 w-full resize-y rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="monthly_spend"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        Approximate monthly marketing spend
                      </label>
                      <select
                        id="monthly_spend"
                        name="monthly_spend"
                        required
                        defaultValue=""
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      >
                        <option value="" disabled>
                          Select a range
                        </option>
                        {spendOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="technical_access"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        Can technical access be provided?
                      </label>
                      <select
                        id="technical_access"
                        name="technical_access"
                        required
                        defaultValue=""
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {accessOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="crm"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        CRM
                      </label>
                      <select
                        id="crm"
                        name="crm"
                        required
                        defaultValue=""
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {crmOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="warehouse"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        Warehouse
                      </label>
                      <select
                        id="warehouse"
                        name="warehouse"
                        required
                        defaultValue=""
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {warehouseOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="reporting_platform"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        Reporting platform
                      </label>
                      <select
                        id="reporting_platform"
                        name="reporting_platform"
                        required
                        defaultValue=""
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {reportingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="assessment_timing"
                      className="block text-sm font-medium text-zinc-300"
                    >
                      Desired assessment timing
                    </label>
                    <select
                      id="assessment_timing"
                      name="assessment_timing"
                      required
                      defaultValue=""
                      disabled={status === "submitting"}
                      className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                    >
                      <option value="" disabled>
                        Select timing
                      </option>
                      {timingOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        Work email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-8 w-full rounded-md bg-emerald-500 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_20px_var(--glow-emerald)] transition hover:bg-emerald-400 hover:shadow-[0_0_28px_var(--glow-emerald)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
                >
                  {status === "submitting"
                    ? "Submitting…"
                    : "Submit Assessment Request"}
                </button>
              </>

              <div className="mt-8 border-t border-white/[0.06] pt-8" id="book-assessment">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Schedule a qualification call
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  15 minutes to confirm fit before any assessment begins.
                </p>
                <div className="mt-4">
                  <CalEmbed />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
