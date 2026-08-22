/**
 * src/components/analytics/MarTechOSCta.tsx
 * Checkout anchor for MarTechOS that fires a GA4 event before navigating
 * to the Stripe checkout URL. Kept minimal — the href always works even if
 * gtag has not loaded.
 */
"use client";

import { trackFunnelEvent, type FunnelEvent } from "@/lib/analytics";

interface MarTechOSCtaProps {
  /** Visible button label. */
  label: string;
  /** Stripe checkout URL (or any external checkout). */
  href: string;
  /** GA4 event to fire on click. */
  event: FunnelEvent;
  /** Additional Tailwind classes for the anchor element. */
  className?: string;
}

/**
 * Styled anchor to the MarTechOS checkout URL that fires a GA4 funnel event
 * on click before the browser follows the link.
 *
 * @param label   - Visible CTA text.
 * @param href    - Destination URL (Stripe checkout).
 * @param event   - GA4 event name to fire on click.
 * @param className - Optional additional Tailwind classes.
 */
export function MarTechOSCta({ label, href, event, className }: MarTechOSCtaProps) {
  function handleClick() {
    trackFunnelEvent(event);
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {label}
    </a>
  );
}
