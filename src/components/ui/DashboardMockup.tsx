/**
 * src/components/ui/DashboardMockup.tsx
 * CSS-only executive dashboard frame for hero visual proof.
 */

const metrics = [
  {
    label: "CAC",
    value: "$142",
    delta: "-12.4%",
    positive: true,
    accent: "text-emerald-400",
    bar: "w-[68%] bg-emerald-500/60",
  },
  {
    label: "LTV",
    value: "$4,280",
    delta: "+8.2%",
    positive: true,
    accent: "text-teal-400",
    bar: "w-[82%] bg-teal-500/60",
  },
  {
    label: "Net Margin",
    value: "34.7%",
    delta: "+2.1pp",
    positive: true,
    accent: "text-sky-400",
    bar: "w-[74%] bg-sky-500/60",
  },
  {
    label: "Real-Time Revenue",
    value: "$128.4K",
    delta: "Live",
    positive: true,
    accent: "text-emerald-300",
    bar: "w-[91%] bg-emerald-400/70 animate-pulse-glow",
    live: true,
  },
] as const;

/**
 * Renders a polished dashboard mockup with metric cards.
 */
export function DashboardMockup() {
  return (
    <div
      className="relative w-full max-w-lg mx-auto lg:mx-0"
      aria-hidden="true"
    >
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-sky-500/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 shadow-2xl shadow-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-950/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            Executive Dashboard — Live
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="font-mono text-[10px] text-emerald-400/90">
              Synced
            </span>
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Unified KPI Layer
              </p>
              <p className="font-mono text-sm text-zinc-300">
                Marketing · Sales · Finance
              </p>
            </div>
            <p className="font-mono text-xs text-zinc-500">Q2 · Real-time</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="group rounded-lg border border-white/[0.06] bg-zinc-950/60 p-3 transition-colors hover:border-emerald-500/20 hover:bg-zinc-950/80"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {m.label}
                  </span>
                  {"live" in m && m.live && (
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
                      LIVE
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1 font-mono text-lg font-medium tracking-tight ${m.accent} animate-metric-tick`}
                >
                  {m.value}
                </p>
                <p
                  className={`mt-0.5 font-mono text-[10px] ${m.positive ? "text-emerald-500/80" : "text-red-400/80"}`}
                >
                  {m.delta}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
                  <div className={`h-full rounded-full ${m.bar}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-white/[0.04] bg-zinc-950/40 p-3">
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span className="font-mono uppercase tracking-wider">
                Revenue trend (7d)
              </span>
              <span className="text-emerald-400/80">+18.3%</span>
            </div>
            <div className="mt-2 flex h-12 items-end gap-1">
              {[40, 55, 48, 62, 58, 72, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-emerald-600/30 to-emerald-400/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
