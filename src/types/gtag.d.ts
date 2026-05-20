/**
 * src/types/gtag.d.ts
 * Global gtag typings for Google Ads conversion events.
 */

type GtagCommand = "config" | "event" | "js" | "set";

interface GtagEventParams {
  send_to?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: GtagCommand,
      targetId: string | Date,
      params?: GtagEventParams,
    ) => void;
  }
}

export {};
