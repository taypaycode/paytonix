/**
 * src/components/articles/ArticleTemplate.tsx
 * Renders a cornerstone diagnostic article in the required 13-part AEO
 * template: question, direct answer, definition, symptoms, causes, tests,
 * consequences, repairs, prevention, assumptions, author/review date,
 * citations, and an assessment CTA.
 */

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { Breadcrumbs } from "@/components/articles/Breadcrumbs";
import { SITE_URL } from "@/lib/site";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items, tone }: { items: string[]; tone: "neutral" | "muted" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-2.5 text-sm leading-relaxed ${
            tone === "neutral" ? "text-zinc-300" : "text-zinc-400"
          }`}
        >
          <span className="mt-0.5 font-mono text-emerald-400/90" aria-hidden="true">
            –
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Full article body for a single cornerstone piece.
 */
export function ArticleTemplate({ article }: { article: Article }) {
  const dateLabel = new Date(article.lastReviewed).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          { name: article.question, href: `${SITE_URL}/insights/${article.slug}` },
        ]}
      />

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {article.question}
      </h1>

      <p className="mt-3 text-xs text-zinc-400">
        By {article.authorName} · Last reviewed {dateLabel}
      </p>

      <p className="mt-6 rounded-xl border border-emerald-500/20 bg-zinc-900/40 p-5 text-base leading-relaxed text-zinc-200">
        {article.directAnswer}
      </p>

      <Section title="What's actually happening">
        <p className="text-sm leading-relaxed text-zinc-400">
          {article.definition}
        </p>
      </Section>

      <Section title="Observable symptoms">
        <BulletList items={article.symptoms} tone="neutral" />
      </Section>

      <Section title="Likely causes">
        <BulletList items={article.causes} tone="neutral" />
      </Section>

      <Section title="Diagnostic tests">
        <BulletList items={article.diagnosticTests} tone="neutral" />
      </Section>

      <Section title="Business consequences">
        <BulletList items={article.consequences} tone="muted" />
      </Section>

      <Section title="Repair options">
        <BulletList items={article.repairOptions} tone="neutral" />
      </Section>

      <Section title="Prevention &amp; monitoring">
        <BulletList items={article.prevention} tone="neutral" />
      </Section>

      <Section title="Assumptions &amp; limitations">
        <BulletList items={article.assumptions} tone="muted" />
      </Section>

      {article.citations.length > 0 && (
        <Section title="Sources">
          <ul className="space-y-1.5 text-sm">
            {article.citations.map((citation) => (
              <li key={citation.url}>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400/90 underline-offset-2 hover:text-emerald-300 hover:underline"
                >
                  {citation.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="mt-12 rounded-xl border border-white/[0.08] bg-zinc-900/40 p-6 text-center">
        <p className="text-sm text-zinc-400">
          Seeing this failure mode in your own stack?
        </p>
        <Link
          href="/revenue-data-integrity-assessment"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_20px_var(--glow-emerald)] transition hover:bg-emerald-400"
        >
          Request an Assessment
        </Link>
      </div>

      <div className="mt-8 text-sm">
        <Link
          href="/insights"
          className="text-zinc-400 underline-offset-2 hover:text-zinc-300 hover:underline"
        >
          ← Back to all Insights
        </Link>
      </div>
    </article>
  );
}
