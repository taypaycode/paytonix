/**
 * src/components/ui/JourneyTrace.tsx
 * Horizontal revenue-journey visual metaphor: Campaign → Website → CRM → Warehouse → Revenue.
 * Each node communicates a verification state so visitors immediately grasp
 * that Paytonix inspects the transitions between systems, not just the endpoints.
 */

export type JourneyNodeStatus = "healthy" | "warning" | "failed" | "unverified";

export type JourneyNode = {
  label: string;
  status: JourneyNodeStatus;
};

const statusStyles: Record<
  JourneyNodeStatus,
  { dot: string; ring: string; text: string; badge: string }
> = {
  healthy: {
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/30",
    text: "text-emerald-400",
    badge: "Healthy",
  },
  warning: {
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-400",
    badge: "Warning",
  },
  failed: {
    dot: "bg-red-400",
    ring: "ring-red-400/30",
    text: "text-red-400",
    badge: "Failed",
  },
  unverified: {
    dot: "bg-zinc-500",
    ring: "ring-zinc-500/20",
    text: "text-zinc-400",
    badge: "Unverified",
  },
};

/**
 * Renders the revenue journey as a chain of inspected system-to-system transitions.
 */
export function JourneyTrace({ nodes }: { nodes: readonly JourneyNode[] }) {
  return (
    <div
      className="flex items-start justify-between gap-1"
      role="img"
      aria-label={`Revenue journey trace: ${nodes
        .map((n) => `${n.label} is ${statusStyles[n.status].badge}`)
        .join(", ")}`}
    >
      {nodes.map((node, index) => {
        const style = statusStyles[node.status];
        const isLast = index === nodes.length - 1;

        return (
          <div key={node.label} className="flex flex-1 items-start">
            <div className="flex flex-col items-center gap-2 text-center">
              <span
                className={`flex h-2.5 w-2.5 shrink-0 rounded-full ${style.dot} ring-4 ${style.ring}`}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-400">
                {node.label}
              </span>
              <span
                className={`font-mono text-[9px] uppercase tracking-wider ${style.text}`}
              >
                {style.badge}
              </span>
            </div>

            {!isLast && (
              <div
                className="mt-[5px] h-px flex-1 bg-gradient-to-r from-zinc-700 to-zinc-800"
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
