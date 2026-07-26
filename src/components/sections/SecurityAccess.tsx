/**
 * src/components/sections/SecurityAccess.tsx
 * Security & access practices, shown on /about. Describes only practices
 * Paytonix actually follows today — no unimplemented enterprise-security claims.
 */

const practices = [
  {
    label: "Access model",
    detail:
      "Read-only credentials wherever the platform supports them — analytics, CRM, warehouse, and reporting access is requested read-only by default.",
  },
  {
    label: "Credential handling",
    detail:
      "Credentials are used only for the scoped assessment and are never stored beyond the active engagement.",
  },
  {
    label: "Data retention",
    detail:
      "Access is revoked immediately once the engagement concludes. No client data is retained after findings are delivered.",
  },
  {
    label: "Confidentiality",
    detail:
      "Findings, credentials, and anything observed during an assessment are treated as confidential and are not shared or referenced without explicit permission.",
  },
  {
    label: "When access can't be granted",
    detail:
      "If read-only access to a required system can't be provided, that system is scoped out of the assessment and noted as a limitation in the findings — not worked around.",
  },
] as const;

/**
 * Security & Access section — visible, factual description of current practices.
 */
export function SecurityAccess() {
  return (
    <section
      id="security"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="security-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
          Security &amp; Access
        </p>
        <h2
          id="security-heading"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
        >
          How Paytonix handles access to your systems
        </h2>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {practices.map((practice) => (
            <div
              key={practice.label}
              className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5"
            >
              <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                {practice.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
                {practice.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
