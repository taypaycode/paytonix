/**
 * src/components/sections/FounderSection.tsx
 * Founder credibility section.
 */

const LINKEDIN_URL = "https://www.linkedin.com/in/taypayton";

/**
 * Built By Tay Payton section — founder background and diagnostic thesis.
 */
export function FounderSection() {
  return (
    <section
      id="about"
      className="border-b border-white/[0.06] bg-zinc-950"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-16 lg:items-start">
          <div className="lg:col-span-1">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-lg font-semibold text-emerald-400">
              TP
            </span>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">
              Built by Tay Payton
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-300">
              Tay Payton is a MarTech and customer-data architect who has
              worked across marketing platforms, CRM systems, websites, data
              warehouses, APIs, automation, and executive reporting.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
              His work repeatedly exposed the same underlying problem:
              companies were not lacking data. They were lacking confidence
              that customer behavior, campaign activity, and reported
              revenue still represented the same reality after passing
              through a fragmented technology stack.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Paytonix was created to diagnose and prevent those failures.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href="#why-paytonix"
                className="font-medium text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
              >
                View Technical Experience
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
