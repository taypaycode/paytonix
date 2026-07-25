/**
 * src/components/layout/SiteFooter.tsx
 * Minimal site footer for Paytonix.
 */

/**
 * Site footer with brand, tagline, and legal links.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-300">Paytonix</p>
            <p className="mt-1 text-xs text-zinc-600">
              Revenue Data Reliability
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            Customer journeys · Attribution · Revenue reconciliation · Data
            monitoring
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Paytonix LLC</p>
          <nav className="flex items-center gap-4" aria-label="Legal">
            <a href="/privacy" className="hover:text-zinc-400">
              Privacy
            </a>
            <a href="/terms" className="hover:text-zinc-400">
              Terms
            </a>
            <a
              href="https://www.linkedin.com/in/taypayton"
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
