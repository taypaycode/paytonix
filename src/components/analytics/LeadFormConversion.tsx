/**
 * src/components/analytics/LeadFormConversion.tsx
 * Fires Google Ads "Submit lead form" conversion on the thank-you page.
 */
"use client";

import { useEffect } from "react";
import { LEAD_FORM_CONVERSION_SEND_TO } from "@/lib/google-ads";

const GTAG_RETRY_MS = 100;
const GTAG_MAX_RETRIES = 30;

/**
 * Tracks lead form submission conversion once gtag is available.
 */
export function LeadFormConversion() {
  useEffect(() => {
    let retries = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function fireConversion() {
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: LEAD_FORM_CONVERSION_SEND_TO,
          value: 1.0,
          currency: "USD",
        });
        return;
      }

      if (retries < GTAG_MAX_RETRIES) {
        retries += 1;
        timeoutId = setTimeout(fireConversion, GTAG_RETRY_MS);
      }
    }

    fireConversion();

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
