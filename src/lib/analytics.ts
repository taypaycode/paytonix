/**
 * src/lib/analytics.ts
 * GA4 funnel-event tracking. Reads the Measurement ID from an environment
 * variable so it can be dropped in once a GA4 property exists, and no-ops
 * safely everywhere else (local dev, before the property is created).
 */

export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/** Funnel events tracked from view through qualified/purchased outcomes. */
export type FunnelEvent =
  | "view_assessment"
  | "start_assessment_form"
  | "submit_assessment_form"
  | "book_qualification_call"
  | "view_methodology_article"
  | "qualified_lead"
  | "assessment_purchased";

/**
 * Sends a funnel event to GA4 via gtag, if configured. Safe to call
 * unconditionally — it is a no-op when GA4 is not yet set up or gtag has
 * not loaded.
 */
export function trackFunnelEvent(
  event: FunnelEvent,
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", event, params);
}
