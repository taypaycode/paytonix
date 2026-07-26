/**
 * src/app/insights/[slug]/page.tsx
 * Individual cornerstone article page — statically generated per slug, with
 * Article + BreadcrumbList structured data.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArticleTemplate } from "@/components/articles/ArticleTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { articles, getArticleBySlug } from "@/lib/articles";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return {};
  }

  const url = `${SITE_URL}/insights/${article.slug}`;

  return {
    title: article.question,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${article.question} | Paytonix`,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.lastReviewed,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Insights", url: `${SITE_URL}/insights` },
          {
            name: article.question,
            url: `${SITE_URL}/insights/${article.slug}`,
          },
        ])}
      />
      <ViewTracker
        event="view_methodology_article"
        params={{ article_slug: article.slug }}
      />
      <SiteHeader />
      <main className="flex-1 bg-zinc-950">
        <ArticleTemplate article={article} />
      </main>
      <SiteFooter />
    </>
  );
}
