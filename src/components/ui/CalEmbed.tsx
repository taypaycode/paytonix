/**
 * src/components/ui/CalEmbed.tsx
 * Embedded Cal.com booking widget for the Tech & Growth Audit event.
 */

const CAL_EMBED_URL =
  "https://cal.com/taylor-payton-c2gr6m/tech-growth-audit?embed=true&theme=dark";

/**
 * Renders the Cal.com inline embed for scheduling the technical audit.
 */
export function CalEmbed() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80">
      <iframe
        src={CAL_EMBED_URL}
        title="Book a Tech & Growth Audit with Taylor Payton"
        className="h-[min(680px,80vh)] w-full border-0"
        loading="lazy"
        allow="payment"
      />
    </div>
  );
}
