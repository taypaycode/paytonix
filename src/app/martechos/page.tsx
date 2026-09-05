/**
 * src/app/martechos/page.tsx
 * MarTechOS Founding Beta landing page — high-conversion product page for
 * the self-hosted marketing-operations runtime.
 *
 * Primary conversion: $99 one-time Stripe checkout (5 founding seats).
 * Audience: MarTech / RevOps / growth / analytics engineers.
 * Tone: technical, restrained, confident, honest about beta status.
 */

import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { MarTechOSCta } from "@/components/analytics/MarTechOSCta";
import { MarTechOSBetaForm } from "@/components/sections/MarTechOSBetaForm";
import { SITE_URL } from "@/lib/site";

const CHECKOUT_URL = "https://buy.stripe.com/cNidRaaZc48f0JGaX48AE00";

/** Primary CTA button classes — 56px tall per conversion spec. */
const ctaPrimary =
  "inline-flex h-14 items-center justify-center rounded-xl bg-emerald-500 px-8 text-base font-semibold text-zinc-950 shadow-[0_0_24px_var(--glow-emerald)] transition hover:bg-emerald-400 hover:shadow-[0_0_32px_var(--glow-emerald)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export const metadata: Metadata = {
  title: "MarTechOS — Automate Repetitive MarTech Workflows",
  description:
    "MarTechOS is a self-hosted automation runtime for technical marketing operators. Configure workflows, preview changes with dry-runs, and execute across your MarTech stack. Founding beta: $99, limited to 5 seats.",
  alternates: {
    canonical: `${SITE_URL}/martechos`,
  },
  openGraph: {
    title: "MarTechOS Founding Beta — 5 Seats",
    description:
      "Connect your stack. Configure the workflow. Preview the changes. Execute safely. $99 one-time founding beta from Paytonix.",
    url: `${SITE_URL}/martechos`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarTechOS Founding Beta — 5 Seats",
    description:
      "Connect your stack. Configure the workflow. Preview the changes. Execute safely. $99 one-time founding beta from Paytonix.",
  },
};

// ---------------------------------------------------------------------------
// Sub-components — kept local because they exist only on this page (YAGNI)
// ---------------------------------------------------------------------------

/** MacOS-style terminal chrome wrapper. */
function Terminal({ children, label = "terminal" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="ml-2 font-mono text-[10px] text-zinc-500">{label}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-xs leading-relaxed text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/** Section eyebrow label — monospace caps, emerald, consistent with the rest of the site. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">{children}</p>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MarTechOSPage() {
  return (
    <>
      <ViewTracker event="martechos_lp_view" />
      <SiteHeader />
      <main className="flex-1">

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden border-b border-white/[0.06]"
          aria-labelledby="martechos-hero-heading"
        >
          <div className="paytonix-grid-bg absolute inset-0 pointer-events-none" />
          <div className="paytonix-stream-line absolute left-0 right-0 top-1/3 opacity-60" />
          <div className="paytonix-stream-line absolute left-0 right-0 top-2/3 opacity-40" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium tracking-wide text-emerald-400/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Founding Beta — 5 Seats Only
            </p>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="max-w-xl">
                <h1
                  id="martechos-hero-heading"
                  className="text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
                >
                  Stop manually stitching your MarTech stack together.
                </h1>

                <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
                  MarTechOS turns repetitive marketing operations into configurable workflows
                  you can preview before they touch production.
                </p>

                <p className="mt-3 text-sm text-zinc-400">
                  Connect your stack. Configure the workflow. Dry-run the changes. Execute safely.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MarTechOSCta
                    href={CHECKOUT_URL}
                    label="Get Founding Beta — $99"
                    event="martechos_hero_cta_click"
                    className={ctaPrimary}
                  />
                  <a
                    href="#workflow"
                    className="inline-flex h-14 items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 text-sm font-medium text-zinc-200 transition hover:border-sky-500/40 hover:bg-white/[0.03] hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    See the workflow ↓
                  </a>
                </div>

                <p className="mt-3 text-xs text-zinc-400">
                  One-time payment · 5 founding seats · Includes current beta + v1 access
                </p>

                <ul className="mt-8 space-y-2.5 border-t border-white/[0.06] pt-6">
                  {[
                    "Dry-run first: see intended creates, updates, skips, and mutations before execution.",
                    "Self-hosted: credentials and customer data stay in your environment.",
                    "Vendor-neutral core: workflows depend on capabilities, not one CRM's worldview.",
                    "Real adapters today: Salesforce, Pardot / Account Engagement, ZoomInfo, plus zero-network demo adapters.",
                    "Built for operators: YAML + CLI + APIs instead of another drag-and-drop automation toy.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-0.5 shrink-0 font-mono text-emerald-400" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:pl-4">
                <Terminal label="martechos demo">
                  {`$ martechos demo

Workflow: prospect_to_engagement

Discovered: 24 contacts
Segments:   3

Would create:
  1  CRM campaign
  24 campaign members
  3  mailing lists
  3  messages

Would update:
  6  existing contacts

External mutations:
  NONE

Dry-run complete.`}
                </Terminal>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-400 lg:text-left">
                  Zero network calls · fictional fixture data · no real account required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST / RISK-REVERSAL STRIP ──────────────────────────────── */}
        <section className="border-b border-white/[0.06] bg-zinc-900/30">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-zinc-400">
              Built for a founding cohort, not a mass-market launch.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="pb-3 pr-8 text-left font-mono text-[10px] uppercase tracking-widest text-emerald-400/90">
                      What you get
                    </th>
                    <th className="pb-3 text-left font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                      What you do not need
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {[
                    ["Current v0.1.0-beta", "A new CRM"],
                    ["Full source-based beta access", "A hosted Paytonix account"],
                    ["Demo mode with fictional data", "Production credentials to try the workflow"],
                    ["Founding-user v1 access", "A long-term subscription"],
                    ["Direct beta feedback path", "A consulting retainer"],
                  ].map(([get, skip]) => (
                    <tr key={get}>
                      <td className="py-2.5 pr-8 text-zinc-200">{get}</td>
                      <td className="py-2.5 text-zinc-400">{skip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Try the product logic before connecting a real account.{" "}
              <strong className="text-zinc-200">
                Demo mode performs zero network calls and cannot mutate production systems.
              </strong>
            </p>
          </div>
        </section>

        {/* ── 3. PAIN RECOGNITION ─────────────────────────────────────────── */}
        <section className="border-b border-white/[0.06]" aria-labelledby="pain-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="max-w-lg">
                <Eyebrow>The real problem</Eyebrow>
                <h2
                  id="pain-heading"
                  className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
                >
                  Your stack is automated. Your work often isn&apos;t.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Modern marketing teams already pay for CRMs, enrichment tools, mailers,
                  analytics, warehouses, and ad platforms.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  And technical operators still spend hours:
                </p>
                <ul className="mt-4 space-y-1.5">
                  {[
                    "exporting CSVs",
                    "deduplicating contacts",
                    "creating campaigns",
                    "mapping member statuses",
                    "splitting audiences",
                    "building lists",
                    "recreating message variants",
                    "checking whether a previous run already touched the same record",
                    "reconciling campaign activity back to the CRM",
                    "debugging scripts that only one person understands",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-400">
                      <span className="font-mono text-zinc-500" aria-hidden="true">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-6">
                  <p className="text-sm leading-relaxed text-zinc-300">
                    The problem is rarely that the tools cannot talk to each other.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-200">
                    The problem is that{" "}
                    <strong className="text-zinc-50">
                      your operating logic lives in spreadsheets, one-off scripts, admin muscle
                      memory, and tribal knowledge.
                    </strong>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    MarTechOS moves that logic into a repeatable workflow.
                  </p>
                </div>
                <p className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-5 py-4 text-sm leading-relaxed text-zinc-300">
                  The work is beneath the level at which you should be operating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PRODUCT MECHANISM ─────────────────────────────────────────── */}
        <section
          id="workflow"
          className="border-b border-white/[0.06] bg-zinc-900/20"
          aria-labelledby="mechanism-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>How it works</Eyebrow>
            <h2
              id="mechanism-heading"
              className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              One workflow. Different tools.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              MarTechOS separates{" "}
              <strong className="text-zinc-200">what the workflow needs to do</strong> from{" "}
              <strong className="text-zinc-200">which vendor performs the action</strong>.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  The workflow asks for capabilities
                </p>
                <Terminal label="workflow.yaml">
                  {`Find prospects
→ enrich
→ normalize
→ deduplicate
→ upsert CRM records
→ create campaign
→ assign members
→ segment
→ create messages
→ schedule
→ sync engagement`}
                </Terminal>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Adapters handle vendor-specific APIs at the edges.{" "}
                  <strong className="text-zinc-200">
                    The operating logic stays in MarTechOS.
                  </strong>
                </p>
              </div>

              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Architecture
                </p>
                <Terminal label="architecture">
                  {`        ENRICHMENT
     ZoomInfo / Demo
            │
            ▼
    ┌──────────────────┐
    │    MarTechOS     │
    │                  │
    │  Canonical       │
    │  models          │
    │                  │
    │  Validation      │
    │  Dry-runs        │
    │  Idempotency     │
    │  Run state       │
    └──────────────────┘
         │          │
         ▼          ▼
       CRM        MAILER
   Salesforce     Pardot
    / Demo         / Demo`}
                </Terminal>
                <p className="mt-4 text-sm font-medium text-zinc-200">
                  Vendor-specific at the edges. MarTechOS-specific in the middle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. WHAT IT ACTUALLY DOES — 10 STEPS ─────────────────────────── */}
        <section className="border-b border-white/[0.06]" aria-labelledby="steps-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>Full operation</Eyebrow>
            <h2
              id="steps-heading"
              className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              From prospect search to campaign execution without rebuilding the process every time.
            </h2>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[
                { n: "01", name: "Discover", desc: "Search the configured enrichment provider for contacts that match your criteria." },
                { n: "02", name: "Enrich", desc: "Resolve richer contact data through the provider's supported enrichment flow." },
                { n: "03", name: "Normalize", desc: "Map vendor-specific records into MarTechOS canonical contact objects." },
                { n: "04", name: "Upsert", desc: "Create or update CRM contacts without blindly duplicating records." },
                { n: "05", name: "Campaign", desc: "Create the campaign and safely add members." },
                { n: "06", name: "Segment", desc: "Split the audience using configuration rather than manual list work." },
                { n: "07", name: "Message", desc: "Generate or render segment-specific messages from templates." },
                { n: "08", name: "Preview", desc: "Inspect the proposed changes before the workflow mutates anything." },
                { n: "09", name: "Execute", desc: "Run the approved workflow." },
                { n: "10", name: "Sync", desc: "Bring engagement state back into the operating model." },
              ].map(({ n, name, desc }) => (
                <li
                  key={n}
                  className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5"
                >
                  <p className="font-mono text-[10px] text-zinc-500">{n}</p>
                  <p className="mt-1.5 text-sm font-semibold text-zinc-100">{name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{desc}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-xl border border-white/[0.06] bg-zinc-900/30 p-6">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                The current beta includes
              </p>
              <ul className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "canonical models",
                  "provider capability checks",
                  "YAML + environment configuration",
                  "structured logging with redaction",
                  "idempotency keys",
                  "approval manifests",
                  "dry-run reporting",
                  "retry with backoff",
                  "JSON run-state tracking",
                  "demo adapters with fictional fixture data",
                  "sandbox proving harness",
                  "CLI commands: init, doctor, demo, validate, run",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-zinc-300">
                    <span className="font-mono text-emerald-400" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 6. DRY-RUN DEMO BLOCK ────────────────────────────────────────── */}
        <section
          className="border-b border-white/[0.06] bg-zinc-900/20"
          aria-labelledby="dryrun-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>Preview before production</Eyebrow>
            <h2
              id="dryrun-heading"
              className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Preview before production.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              The same workflow moves from inspection to execution.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div>
                <Terminal label="dry-run">
                  {`$ martechos run workflows/outbound.yaml --dry-run

Workflow validated.

Prospects discovered: 25

CRM:
  would create:        18
  would update:         7
  would create campaign: 1
  would add members:   25

Mailer:
  would create lists:   3
  would create messages: 3

External writes performed: 0`}
                </Terminal>
              </div>
              <div>
                <Terminal label="execute">
                  {`$ martechos run workflows/outbound.yaml

Workflow validated.

Prospects discovered: 25

CRM:
  created:             18
  updated:              7
  campaign created:     1
  members added:       25

Mailer:
  lists created:        3
  messages created:     3

Run complete.
State saved → runs/outbound-20260822.json`}
                </Terminal>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
              The value proposition is{" "}
              <strong className="text-zinc-200">predictability and explicit approval</strong>, not
              magical undo. Not every API mutation is reversible — but every mutation can be
              inspected before it happens.
            </p>
          </div>
        </section>

        {/* ── 7. WHY TECHNICAL OPERATORS CARE — 4 CARDS ───────────────────── */}
        <section className="border-b border-white/[0.06]" aria-labelledby="operators-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>Built for builders</Eyebrow>
            <h2
              id="operators-heading"
              className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Built for people who would rather design the system than babysit the process.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Reproducibility",
                  desc: 'Stop relying on "the way we usually do it." Configuration and workflows make the process inspectable and repeatable.',
                },
                {
                  name: "Safety",
                  desc: "Dry-runs, capability validation, idempotency, and run-state reduce the blast radius of automation mistakes.",
                },
                {
                  name: "Portability",
                  desc: "Workflow logic is not supposed to disappear the moment your company switches vendors.",
                },
                {
                  name: "Leverage",
                  desc: "Encode a process once, then use the same operating model across campaigns, clients, and teams.",
                },
              ].map(({ name, desc }) => (
                <div
                  key={name}
                  className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5"
                >
                  <p className="text-sm font-semibold text-zinc-100">{name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. FOUNDING BETA OFFER — PRICING CARD ───────────────────────── */}
        <section
          id="founding-beta"
          className="border-b border-white/[0.06] bg-zinc-900/20"
          aria-labelledby="offer-heading"
        >
          <ViewTracker event="martechos_pricing_view" />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="rounded-2xl border border-emerald-500/25 bg-zinc-900/60 p-8 sm:p-12">
              <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">

                <div className="lg:col-span-2">
                  <Eyebrow>Founding Operator Beta</Eyebrow>
                  <h2
                    id="offer-heading"
                    className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
                  >
                    MarTechOS
                  </h2>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-50">$99</span>
                    <span className="text-base text-zinc-400">one time</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">
                    Get early access while the first production workflows are being hardened with
                    real operators.
                  </p>

                  <MarTechOSCta
                    href={CHECKOUT_URL}
                    label="Claim a Founding Seat — $99"
                    event="martechos_checkout_click"
                    className={`mt-6 block text-center ${ctaPrimary}`}
                  />

                  <p className="mt-3 text-center text-xs text-zinc-400">
                    One-time payment. No subscription. No automatic renewal.
                  </p>

                  <div className="mt-6 rounded-lg border border-white/[0.06] bg-zinc-950/50 px-4 py-3">
                    <p className="text-xs font-medium text-zinc-200">5 founding seats total.</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      The cap is intentional. This beta is for learning where real operators hit
                      friction—not for onboarding hundreds of users before the product is ready.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    Included
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {[
                      "v0.1.0-beta",
                      "current source-based product access",
                      "zero-network demo mode",
                      "Salesforce / Pardot / ZoomInfo reference adapters",
                      "CRM / Mailer / Enrichment provider architecture",
                      "scaffolded starter configuration",
                      "quickstart documentation",
                      "future v1 access for founding buyers",
                      "direct beta feedback channel",
                      "founding-user pricing position",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
                        <span className="mt-0.5 font-mono text-emerald-400" aria-hidden="true">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Beta disclosure
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      MarTechOS is a working technical product under active validation. The current
                      reference adapters are intentionally narrow implementations—not exhaustive
                      replacements for every capability in Salesforce, Pardot, or ZoomInfo.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      You are buying early access to a real product, not a finished enterprise
                      platform disguised as a beta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. WHO IT IS / IS NOT FOR ────────────────────────────────────── */}
        <section className="border-b border-white/[0.06]" aria-labelledby="fit-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>Qualification</Eyebrow>
            <h2
              id="fit-heading"
              className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              MarTechOS is deliberately not for everyone.
            </h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/40 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  Good fit
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "MarTech / marketing engineers",
                    "RevOps engineers",
                    "Technical Marketing Ops practitioners",
                    "Salesforce / Account Engagement operators",
                    "Growth engineers",
                    "Analytics engineers working inside marketing",
                    "Agencies repeating the same campaign setup across clients",
                    "Technical consultants who want reusable delivery infrastructure",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-zinc-300">
                      <span className="font-mono text-emerald-400" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-zinc-900/30 p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Probably not yet
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Nontechnical marketers looking for a no-code UI",
                    "Teams expecting every vendor connector out of the box",
                    "Companies requiring white-glove enterprise support",
                    "Users who want a hosted SaaS that stores their credentials",
                    "Teams unwilling to work with beta software",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-zinc-400">
                      <span className="font-mono text-zinc-500" aria-hidden="true">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                  The right buyer should think: "This was built for someone like me."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. SAFETY + TRUST ───────────────────────────────────────────── */}
        <section
          className="border-b border-white/[0.06] bg-zinc-900/20"
          aria-labelledby="safety-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>Safety model</Eyebrow>
            <h2
              id="safety-heading"
              className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Automation should increase control, not remove it.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                {
                  name: "Self-hosted",
                  desc: "MarTechOS runs in your environment. Your vendor credentials are configured locally rather than handed to a central credential store.",
                },
                {
                  name: "Dry-run first",
                  desc: "Mutating workflows show intended actions before execution. See exactly what would be created, updated, or skipped.",
                },
                {
                  name: "Capability-aware",
                  desc: "The product checks whether configured providers support the operations a workflow requires before it runs.",
                },
                {
                  name: "Idempotent by design",
                  desc: "The runtime includes hashing and idempotency mechanisms designed to reduce accidental duplication.",
                },
                {
                  name: "Redacted logs",
                  desc: "Sensitive values are deliberately removed from structured logs. You get observability without credential exposure.",
                },
                {
                  name: "Demo without access",
                  desc: "The built-in demo adapters run against fictional data with zero network calls. Evaluate the logic, not your production data.",
                },
                {
                  name: "Run-state tracking",
                  desc: "Completed operations are recorded so subsequent runs can avoid redundant work.",
                },
              ].map(({ name, desc }) => (
                <div
                  key={name}
                  className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5"
                >
                  <p className="text-sm font-semibold text-zinc-100">{name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Language used intentionally:{" "}
              <em className="text-zinc-300">
                "designed to reduce accidental duplication and unsafe execution"
              </em>
              {" "}— not "guaranteed never to duplicate anything." Beta buyers respect precise
              engineering language more than absolute marketing claims.
            </p>
          </div>
        </section>

        {/* ── 11. FAQ ──────────────────────────────────────────────────────── */}
        <section className="border-b border-white/[0.06]" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Eyebrow>Common questions</Eyebrow>
            <h2
              id="faq-heading"
              className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              FAQ
            </h2>

            <div className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {[
                {
                  q: "Do I need Salesforce, Pardot, or ZoomInfo to try it?",
                  a: "No. MarTechOS includes demo providers with fictional fixture data and no network calls, so you can experience the full workflow without connecting a production account.",
                },
                {
                  q: "Is this SaaS?",
                  a: "Not in the current beta. MarTechOS is self-hosted and source-based.",
                },
                {
                  q: "Does Paytonix store my CRM credentials?",
                  a: "No. The current product is designed around customer-controlled credentials in the customer's own environment.",
                },
                {
                  q: "Is this a no-code tool?",
                  a: "No. The beta is intentionally designed for technical operators who are comfortable with configuration, APIs, terminals, and modern developer tooling.",
                },
                {
                  q: "Why not just use Zapier / Make / Workato?",
                  a: "Those tools are excellent at connecting individual triggers and actions. MarTechOS is focused on repeatable operational workflows with canonical data models, validation, dry-runs, idempotency, run state, provider capabilities, and code-level extensibility. The category is closer to an operating runtime than a collection of one-off zaps.",
                },
                {
                  q: "Can I add another CRM or mailer?",
                  a: "The architecture was built for that. The beta currently ships with a limited set of reference adapters. Additional adapters will be driven by real user demand rather than connector-count vanity.",
                },
                {
                  q: "Does it use AI?",
                  a: "MarTechOS can participate in AI-assisted workflows, but AI is not the product. The core value is reliable orchestration across fragmented marketing systems.",
                },
                {
                  q: "What happens after I pay?",
                  a: "You receive founding-beta onboarding instructions and product access. The first recommended step is to run the zero-network demo before connecting a live account.",
                },
                {
                  q: "Is the $99 recurring?",
                  a: "No. The founding beta is a one-time $99 purchase.",
                },
                {
                  q: "Why only five seats?",
                  a: "Because the current goal is high-signal operator feedback. Paytonix would rather learn deeply from five real users than pretend a beta is ready for mass distribution.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-zinc-100 marker:content-['']">
                    {q}
                    <span
                      className="mt-0.5 shrink-0 font-mono text-zinc-400 transition group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. RISK REVERSAL ────────────────────────────────────────────── */}
        <section
          className="border-b border-white/[0.06] bg-zinc-900/20"
          aria-labelledby="risk-reversal-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Getting started</Eyebrow>
              <h2
                id="risk-reversal-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
              >
                Start with fictional data. Decide whether it belongs near production later.
              </h2>
            </div>

            <ol className="mx-auto mt-10 max-w-lg space-y-4">
              {[
                "Install MarTechOS.",
                "Run the bundled demo.",
                "Inspect the workflow.",
                "Configure a provider only when you're ready.",
                "Dry-run before enabling writes.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4 text-sm text-zinc-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-zinc-900 font-mono text-xs text-zinc-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-zinc-400">
              This turns the buyer&apos;s mental model from{" "}
              <em className="text-zinc-500">"I&apos;m paying $99 to gamble on some GitHub repo"</em>{" "}
              into{" "}
              <strong className="text-zinc-200">
                "I&apos;m paying $99 for a bounded technical evaluation with a clear first success state."
              </strong>
            </p>
          </div>
        </section>

        <MarTechOSBetaForm />

        {/* ── 13. FINAL CTA ────────────────────────────────────────────────── */}
        <section
          className="border-b border-white/[0.06]"
          aria-labelledby="final-cta-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>5 seats · $99 one time</Eyebrow>
              <h2
                id="final-cta-heading"
                className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl"
              >
                The first five operators will shape what MarTechOS becomes next.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                If you spend your week moving data between marketing systems, rebuilding campaigns,
                writing glue scripts, or maintaining workflows that only exist in your head, this
                beta is for you.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Get in before the product becomes broader, more polished—and priced like a broader
                product.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4">
                <MarTechOSCta
                  href={CHECKOUT_URL}
                  label="Claim a Founding Seat — $99"
                  event="martechos_final_cta_click"
                  className={ctaPrimary}
                />
                <p className="text-xs text-zinc-400">
                  Limited to 5 founding purchases · one-time payment
                </p>
                <a
                  href="#beta-interest"
                  className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
                >
                  Questions before checkout? ↓
                </a>
                <a
                  href="#workflow"
                  className="text-xs font-medium text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
                >
                  Read how it works ↑
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
