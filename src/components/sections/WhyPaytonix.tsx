/**
 * src/components/sections/WhyPaytonix.tsx
 * Positions Paytonix as the layer that works across marketing, engineering, and analytics boundaries.
 */

const boundaries = [
  "Marketing understands campaigns but not warehouse logic.",
  "Engineering understands pipelines but not attribution.",
  "Analysts understand reports but do not own instrumentation.",
  "Vendors understand their own platform but not the full revenue chain.",
] as const;

const capabilities = [
  "Python",
  "SQL",
  "BigQuery",
  "APIs",
  "CRM Integration",
  "Customer Identity",
  "Event Instrumentation",
  "Attribution",
  "Semantic Modeling",
  "Business Intelligence",
] as const;

/**
 * Why Paytonix section — cross-boundary positioning and underlying capabilities.
 */
export function WhyPaytonix() {
  return (
    <section
      id="why-paytonix"
      className="border-b border-white/[0.06]"
      aria-labelledby="why-paytonix-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Why Paytonix
            </p>
            <h2
              id="why-paytonix-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
            >
              Marketing context. Data-engineering rigor.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Most teams have specialists at individual layers:
            </p>
            <ul className="mt-4 space-y-2.5">
              {boundaries.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-0.5 font-mono text-zinc-600">–</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-zinc-300">
              Paytonix works across those boundaries.
            </p>
            <p className="mt-3 text-base font-medium leading-relaxed text-zinc-100">
              The result is not another dashboard. It is a tested and
              explainable system behind the dashboard.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Capabilities
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded border border-white/10 bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-400"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
