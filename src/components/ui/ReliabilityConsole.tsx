/**
 * src/components/ui/ReliabilityConsole.tsx
 * Hero product visual — a revenue-data reliability console.
 * Replaces the generic executive-dashboard mockup with an inspection-system
 * aesthetic: the revenue journey trace plus the automated checks running behind it.
 */

import { JourneyTrace, type JourneyNode } from "@/components/ui/JourneyTrace";

const journeyNodes: readonly JourneyNode[] = [
  { label: "Campaign", status: "healthy" },
  { label: "Website", status: "warning" },
  { label: "CRM", status: "warning" },
  { label: "Warehouse", status: "failed" },
  { label: "Revenue", status: "unverified" },
] as const;

type ConsoleRow = {
  label: string;
  value: string;
  detail: string;
  tone: "healthy" | "warning" | "failed";
  progress?: number;
};

const rows: readonly ConsoleRow[] = [
  {
    label: "Journey Coverage",
    value: "82%",
    detail:
      "18% of converting journeys contain an unresolved identity or attribution gap.",
    tone: "warning",
    progress: 82,
  },
  {
    label: "Revenue Reconciliation",
    value: "Alert",
    detail: "CRM revenue and warehouse revenue differ by $47,820.",
    tone: "failed",
  },
  {
    label: "Campaign Mapping",
    value: "3 Failures",
    detail: "Campaign identifiers are missing from two active acquisition sources.",
    tone: "warning",
  },
  {
    label: "Data Freshness",
    value: "Healthy",
    detail: "All monitored revenue models updated within expected windows.",
    tone: "healthy",
  },
] as const;

const toneStyles: Record<
  ConsoleRow["tone"],
  { text: string; bar: string; dot: string }
> = {
  healthy: { text: "text-emerald-400", bar: "bg-emerald-400/70", dot: "bg-emerald-400" },
  warning: { text: "text-amber-400", bar: "bg-amber-400/70", dot: "bg-amber-400" },
  failed: { text: "text-red-400", bar: "bg-red-400/70", dot: "bg-red-400" },
};

/**
 * Renders the reliability console: journey trace header plus live check rows.
 */
export function ReliabilityConsole() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0" aria-hidden="true">
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-red-500/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 shadow-2xl shadow-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-950/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            Revenue Data Integrity
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="font-mono text-[10px] text-emerald-400/90">
              Monitoring
            </span>
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="rounded-lg border border-white/[0.06] bg-zinc-950/50 px-3 py-4">
            <JourneyTrace nodes={journeyNodes} />
          </div>

          <ul className="mt-4 space-y-2.5">
            {rows.map((row) => {
              const tone = toneStyles[row.tone];
              return (
                <li
                  key={row.label}
                  className="rounded-lg border border-white/[0.06] bg-zinc-950/60 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                      {row.label}
                    </span>
                    <span className={`font-mono text-xs font-medium ${tone.text}`}>
                      {row.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500">
                    {row.detail}
                  </p>
                  {typeof row.progress === "number" && (
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full rounded-full ${tone.bar}`}
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[10px] text-zinc-500">
            <span>Last validated: 9 minutes ago</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
