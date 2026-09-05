/**
 * src/lib/hubspot.ts
 * Client-side HubSpot form submission via the public submissions endpoint.
 * Keeps the existing Paytonix form UI; posts to HubSpot forms created by
 * scripts/provision-hubspot.mjs in the production CRM portal.
 */

export type HubSpotField = {
  name: string;
  value: string;
};

export type HubSpotSubmitContext = {
  pageUri?: string;
  pageName?: string;
};

export type HubSpotFormKey = "assessment" | "martechos_beta";

/** Fields declared on each HubSpot form — only these may be submitted (HubSpot rejects extras). */
const FORM_FIELD_ALLOWLIST: Record<HubSpotFormKey, readonly string[]> = {
  assessment: [
    "email",
    "firstname",
    "lastname",
    "paytonix_lead_source",
    "paytonix_customer_type",
    "paytonix_intake_summary",
  ],
  martechos_beta: [
    "email",
    "firstname",
    "company",
    "paytonix_lead_source",
    "paytonix_customer_type",
    "paytonix_intake_summary",
  ],
};

/** Returns true when portal + form IDs are present for the given form key. */
export function isHubSpotFormConfigured(formKey: HubSpotFormKey): boolean {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId =
    formKey === "assessment"
      ? process.env.NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID
      : process.env.NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID;
  return Boolean(portalId && formId);
}

function formGuidFor(formKey: HubSpotFormKey): string {
  const formId =
    formKey === "assessment"
      ? process.env.NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID
      : process.env.NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID;
  if (!formId) {
    throw new Error(
      "HubSpot form is not configured. Run npm run provision:hubspot and restart the dev server.",
    );
  }
  return formId;
}

/**
 * Flatten labeled form answers into one CRM textarea for simple segmentation
 * without dozens of custom properties.
 */
export function buildIntakeSummary(entries: Record<string, string>): string {
  return Object.entries(entries)
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n\n");
}

/** Split a full name into HubSpot firstname / lastname. */
export function splitFullName(fullName: string): {
  firstname: string;
  lastname: string;
} {
  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) {
    return { firstname: trimmed, lastname: "" };
  }
  return {
    firstname: trimmed.slice(0, spaceIndex),
    lastname: trimmed.slice(spaceIndex + 1).trim(),
  };
}

/**
 * HubSpot rejects fields not on the form definition and may reject empty
 * optional values. Keep payloads aligned with provision-hubspot.mjs.
 */
export function normalizeHubSpotFields(
  formKey: HubSpotFormKey,
  fields: HubSpotField[],
): HubSpotField[] {
  const allowed = new Set(FORM_FIELD_ALLOWLIST[formKey]);
  const requiredAlways = new Set([
    "email",
    "firstname",
    "paytonix_lead_source",
    "paytonix_customer_type",
    "paytonix_intake_summary",
  ]);

  return fields.filter((field) => {
    if (!allowed.has(field.name)) return false;
    if (requiredAlways.has(field.name)) return true;
    return field.value.trim().length > 0;
  });
}

/**
 * Submit fields to a HubSpot form. Uses the unauthenticated public endpoint —
 * safe for browser use; only portal ID + form GUID are exposed.
 */
export async function submitToHubSpotForm(
  formKey: HubSpotFormKey,
  fields: HubSpotField[],
  context?: HubSpotSubmitContext,
): Promise<void> {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  if (!portalId) {
    throw new Error(
      "NEXT_PUBLIC_HUBSPOT_PORTAL_ID is missing. Run npm run provision:hubspot.",
    );
  }

  const formGuid = formGuidFor(formKey);
  const pageUri =
    context?.pageUri ??
    (typeof window !== "undefined" ? window.location.href : undefined);

  const payload = normalizeHubSpotFields(formKey, fields);
  if (!payload.some((field) => field.name === "email" && field.value.trim())) {
    throw new Error("Email is required for HubSpot form submission.");
  }

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: payload,
        context: {
          pageUri,
          pageName: context?.pageName,
        },
      }),
    },
  );

  const body = (await response.json().catch(() => null)) as {
    message?: string;
    errors?: Array<{ message?: string; errorType?: string }>;
    inlineMessage?: string;
  } | null;

  if (!response.ok) {
    const detail =
      body?.errors?.map((e) => e.message).filter(Boolean).join("; ") ??
      body?.message;
    throw new Error(
      detail ?? "HubSpot submission failed. Check form IDs and property names.",
    );
  }

  if (body?.errors?.length) {
    throw new Error(
      body.errors.map((e) => e.message).filter(Boolean).join("; ") ||
        "HubSpot accepted the request but reported field errors.",
    );
  }
}
