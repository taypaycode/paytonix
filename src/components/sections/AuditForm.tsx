/**
 * src/components/sections/AuditForm.tsx
 * Technical audit intake via Formspree + Cal.com scheduling embed.
 */
"use client";

import { FormEvent, useRef, useState } from "react";
import { CalEmbed } from "@/components/ui/CalEmbed";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvzleqv";

const stackOptions = [
  "Spreadsheets + ad-hoc exports",
  "HubSpot / Salesforce + disconnected BI",
  "Snowflake / BigQuery + partial pipelines",
  "Custom Postgres + internal scripts",
  "Other / hybrid stack",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Technical audit intake form with Formspree submission and Cal.com embed.
 */
export function AuditForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section
      id="audit"
      className="bg-zinc-950"
      aria-labelledby="audit-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Technical Audit Intake
            </p>
            <h2
              id="audit-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Start with a diagnostic—not a pitch deck.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Share where your stack breaks down. We map bottlenecks, integration
              gaps, and the fastest path to a unified executive view—before any
              build commitment.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-zinc-500">
              <li className="flex gap-2">
                <span className="font-mono text-emerald-500/70">→</span>
                45-minute architecture review
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-emerald-500/70">→</span>
                Stack-specific integration assessment
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-emerald-500/70">→</span>
                Actionable roadmap—not generic consulting
              </li>
            </ul>
            <p className="mt-8 text-sm text-zinc-500">
              Prefer to skip the form?{" "}
              <a
                href="https://cal.com/taylor-payton-c2gr6m/tech-growth-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
              >
                Book the Tech &amp; Growth Audit directly
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="rounded-xl border border-white/[0.08] bg-zinc-900/30 p-6 sm:p-8"
            >
              <input type="hidden" name="_subject" value="Paytonix Technical Audit Intake" />

              {status === "success" ? (
                <div
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-6"
                  role="status"
                >
                  <p className="font-medium text-emerald-300">
                    Intake received. We&apos;ll follow up within one business day.
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Lock your slot now—pick a time in the calendar below.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm font-medium text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
                  >
                    Submit another intake
                  </button>
                </div>
              ) : (
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
                        htmlFor="bottleneck"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        What is the biggest bottleneck in your current data or
                        software stack?
                      </label>
                      <textarea
                        id="bottleneck"
                        name="bottleneck"
                        rows={4}
                        required
                        disabled={status === "submitting"}
                        placeholder="e.g. Revenue lives in three spreadsheets; marketing CAC is never reconciled with finance..."
                        className="mt-2 w-full resize-y rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="stack"
                        className="block text-sm font-medium text-zinc-300"
                      >
                        What tools/databases make up your core stack today?
                      </label>
                      <select
                        id="stack"
                        name="stack"
                        required
                        defaultValue=""
                        disabled={status === "submitting"}
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      >
                        <option value="" disabled>
                          Select your primary stack profile
                        </option>
                        {stackOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="stack_detail"
                        disabled={status === "submitting"}
                        placeholder="Optional: list specific tools (Stripe, Meta Ads, Postgres, etc.)"
                        className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-60"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
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
                      : "Submit Technical Intake"}
                  </button>
                </>
              )}

              <div className="mt-8 border-t border-white/[0.06] pt-8" id="book-audit">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Schedule your audit
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Tech &amp; Growth Audit — pick a time that works for you.
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
