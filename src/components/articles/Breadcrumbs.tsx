/**
 * src/components/articles/Breadcrumbs.tsx
 * Visible breadcrumb trail. Pairs with BreadcrumbList JSON-LD so the visible
 * and structured paths always match.
 */

import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

/**
 * Renders an accessible breadcrumb nav for deeper routes (e.g. insights articles).
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-zinc-400" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-zinc-300">
                  {item.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
