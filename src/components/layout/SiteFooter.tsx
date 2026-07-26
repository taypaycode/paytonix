/**
 * src/components/layout/SiteFooter.tsx
 * Minimal site footer for Paytonix.
 */

import Link from "next/link";

const exploreLinks = [
  { href: "/revenue-data-integrity-assessment", label: "Assessment" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

/**
 * Site footer with brand, tagline, internal links, and legal links.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-300">Paytonix</p>
            <p className="mt-1 text-xs text-zinc-400">
              Revenue Data Reliability
            </p>
          </div>

          <nav aria-label="Explore" className="flex items-center gap-4">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-zinc-400 hover:text-zinc-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            Customer journeys · Attribution · Revenue reconciliation · Data
            monitoring
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Paytonix LLC</p>
          <nav className="flex items-center gap-4" aria-label="Legal">
            <Link href="/privacy" className="hover:text-zinc-400">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-zinc-400">
              Terms
            </Link>
            <a
              href="https://www.linkedin.com/in/taypayton/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
