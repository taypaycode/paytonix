/**
 * src/components/layout/SiteFooter.tsx
 * Minimal site footer for Paytonix.
 */

/**
 * Site footer with brand and contact anchor.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500">
          <span className="font-semibold text-zinc-400">Paytonix</span>
          <span className="mx-2 text-zinc-700">·</span>
          paytonix.net
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          Single Pane of Glass · Engineered Clarity
        </p>
      </div>
    </footer>
  );
}
