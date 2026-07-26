/**
 * src/components/analytics/ViewTracker.tsx
 * Fires a single GA4 funnel event on mount. Used for page-level view events
 * (view_assessment, view_methodology_article) that can't be tied to a
 * user interaction.
 */
"use client";

import { useEffect } from "react";
import { trackFunnelEvent, type FunnelEvent } from "@/lib/analytics";

/**
 * Renders nothing; fires `event` once when the page mounts.
 */
export function ViewTracker({
  event,
  params,
}: {
  event: FunnelEvent;
  params?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    trackFunnelEvent(event, params);
    // Intentionally track once per mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
