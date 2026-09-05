/**
 * src/components/sections/MarTechOSBetaForm.tsx
 * Lightweight founding-beta interest capture on the MarTechOS landing page.
 * Stripe checkout remains the primary conversion; this form captures leads
 * who want a human follow-up before paying.
 */
"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackFunnelEvent } from "@/lib/analytics";
import {
  buildIntakeSummary,
  isHubSpotFormConfigured,
  splitFullName,
  submitToHubSpotForm,
} from "@/lib/hubspot";

type FormStatus = "idle" | "submitting" | "error";

/**
 * MarTechOS founding beta interest form — posts to HubSpot with product segmentation.
 */
export function MarTechOSBetaForm() {
  const router = useRouter();
  const hasTrackedStart = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFormInteraction() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackFunnelEvent("start_martechos_beta_form");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    if (!isHubSpotFormConfigured("martechos_beta")) {
      setStatus("error");
      setErrorMessage(
        "Form backend is not configured locally. Run npm run provision:hubspot, then restart the dev server.",
      );
      return;
    }

    const form = event.currentTarget;
    const body = new FormData(form);
    const name = String(body.get("name") ?? "");
    const { firstname } = splitFullName(name);
    const message = String(body.get("message") ?? "").trim();

    const intakeSummary = buildIntakeSummary({
      Interest: "MarTechOS founding beta",
      Message: message || "(none provided)",
    });

    try {
      await submitToHubSpotForm(
        "martechos_beta",
        [
          { name: "email", value: String(body.get("email") ?? "") },
          { name: "firstname", value: firstname },
          { name: "company", value: String(body.get("company") ?? "") },
          { name: "paytonix_lead_source", value: "martechos_beta" },
          { name: "paytonix_customer_type", value: "martechos" },
          { name: "paytonix_intake_summary", value: intakeSummary },
        ],
        { pageName: "MarTechOS Beta Interest Form" },
      );

      trackFunnelEvent("submit_martechos_beta_form");
      form.reset();
      router.push("/thank-you?source=martechos-beta");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section
      id="beta-interest"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="beta-interest-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/90">
            Founding beta interest
          </p>
          <h2
            id="beta-interest-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
          >
            Questions before checkout?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Leave your email if you want a short walkthrough of the demo workflow
            before claiming a founding seat. No newsletter — one follow-up about
            the beta only.
          </p>

          <form
            onSubmit={handleSubmit}
            onChange={handleFormInteraction}
            className="mt-8 rounded-xl border border-white/[0.08] bg-zinc-900/30 p-6 sm:p-8"
          >
            {status === "error" && errorMessage && (
              <div
                className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="beta_name" className="block text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input
                  id="beta_name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={status === "submitting"}
                  className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="beta_email" className="block text-sm font-medium text-zinc-300">
                  Work email
                </label>
                <input
                  id="beta_email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={status === "submitting"}
                  className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="beta_company" className="block text-sm font-medium text-zinc-300">
                  Company <span className="text-zinc-500">(optional)</span>
                </label>
                <input
                  id="beta_company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  disabled={status === "submitting"}
                  className="mt-2 w-full rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="beta_message" className="block text-sm font-medium text-zinc-300">
                  What are you trying to automate?{" "}
                  <span className="text-zinc-500">(optional)</span>
                </label>
                <textarea
                  id="beta_message"
                  name="message"
                  rows={3}
                  disabled={status === "submitting"}
                  placeholder="e.g. Repeated Salesforce + Pardot campaign setup across clients"
                  className="mt-2 w-full resize-y rounded-md border border-white/10 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-400 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 disabled:opacity-60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 w-full rounded-md border border-violet-500/40 bg-violet-500/10 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
            >
              {status === "submitting" ? "Submitting…" : "Request beta walkthrough"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
