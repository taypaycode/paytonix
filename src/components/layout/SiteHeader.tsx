/**
 * src/components/layout/SiteHeader.tsx
 * Minimal top navigation for Paytonix landing.
 */

const navLinks = [
  { href: "#matrix", label: "Operational Matrix" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#audit", label: "Technical Audit" },
] as const;

/**
 * Site header with brand and anchor navigation.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs font-semibold text-emerald-400 transition group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_var(--glow-emerald)]">
            P
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            Paytonix
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-zinc-500 transition hover:text-zinc-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#audit"
          className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
        >
          Request Audit
        </a>
      </div>
    </header>
  );
}
