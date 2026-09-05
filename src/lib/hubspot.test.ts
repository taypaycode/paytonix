/**
 * src/lib/hubspot.test.ts
 * Unit tests for HubSpot form payload shaping and submit behavior.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildIntakeSummary,
  isHubSpotFormConfigured,
  normalizeHubSpotFields,
  splitFullName,
  submitToHubSpotForm,
} from "./hubspot";

const PROD_LIKE_ENV = {
  NEXT_PUBLIC_HUBSPOT_PORTAL_ID: "247279773",
  NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID: "fb1b9952-c198-4e8f-b68a-7295fd752904",
  NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID: "ba5bb7a9-3b91-45b8-b462-e613040e1cf0",
};

describe("normalizeHubSpotFields", () => {
  it("drops unknown fields and empty optionals on the beta form", () => {
    const payload = normalizeHubSpotFields("martechos_beta", [
      { name: "email", value: "ops@example.com" },
      { name: "firstname", value: "Taylor" },
      { name: "lastname", value: "Payton" },
      { name: "company", value: "" },
      { name: "paytonix_lead_source", value: "martechos_beta" },
      { name: "paytonix_customer_type", value: "martechos" },
      { name: "paytonix_intake_summary", value: "Interested in beta" },
      { name: "not_on_form", value: "reject me" },
    ]);

    expect(payload.map((field) => field.name)).toEqual([
      "email",
      "firstname",
      "paytonix_lead_source",
      "paytonix_customer_type",
      "paytonix_intake_summary",
    ]);
  });

  it("keeps lastname on assessment when provided and drops it when empty", () => {
    const withLast = normalizeHubSpotFields("assessment", [
      { name: "email", value: "a@example.com" },
      { name: "firstname", value: "Alex" },
      { name: "lastname", value: "Operator" },
      { name: "paytonix_lead_source", value: "assessment_form" },
      { name: "paytonix_customer_type", value: "paytonix_services" },
      { name: "paytonix_intake_summary", value: "Journey mismatch" },
    ]);
    expect(withLast.some((field) => field.name === "lastname")).toBe(true);

    const withoutLast = normalizeHubSpotFields("assessment", [
      { name: "email", value: "a@example.com" },
      { name: "firstname", value: "Alex" },
      { name: "lastname", value: "   " },
      { name: "paytonix_lead_source", value: "assessment_form" },
      { name: "paytonix_customer_type", value: "paytonix_services" },
      { name: "paytonix_intake_summary", value: "Journey mismatch" },
    ]);
    expect(withoutLast.some((field) => field.name === "lastname")).toBe(false);
  });
});

describe("isHubSpotFormConfigured", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv, ...PROD_LIKE_ENV };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns true when portal and form IDs are set", () => {
    expect(isHubSpotFormConfigured("assessment")).toBe(true);
    expect(isHubSpotFormConfigured("martechos_beta")).toBe(true);
  });

  it("returns false when a required public env var is missing", () => {
    delete process.env.NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID;
    expect(isHubSpotFormConfigured("assessment")).toBe(false);
  });
});

describe("submitToHubSpotForm", () => {
  const originalEnv = { ...process.env };
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env = { ...originalEnv, ...PROD_LIKE_ENV };
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("posts normalized fields to the assessment form endpoint", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ inlineMessage: "Thanks" }),
    });

    await submitToHubSpotForm(
      "assessment",
      [
        { name: "email", value: "assessment@example.com" },
        { name: "firstname", value: "Rev" },
        { name: "lastname", value: "" },
        { name: "paytonix_lead_source", value: "assessment_form" },
        { name: "paytonix_customer_type", value: "paytonix_services" },
        { name: "paytonix_intake_summary", value: "CRM vs warehouse drift" },
      ],
      { pageName: "Assessment test" },
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      "https://api.hsforms.com/submissions/v3/integration/submit/247279773/fb1b9952-c198-4e8f-b68a-7295fd752904",
    );
    const body = JSON.parse(String(init.body));
    expect(body.fields.some((field: { name: string }) => field.name === "lastname")).toBe(
      false,
    );
    expect(body.context.pageName).toBe("Assessment test");
  });

  it("throws when HubSpot returns field errors on a 200 response", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        errors: [{ message: "FIELD_NOT_IN_FORM_DEFINITION" }],
      }),
    });

    await expect(
      submitToHubSpotForm("martechos_beta", [
        { name: "email", value: "beta@example.com" },
        { name: "firstname", value: "Beta" },
        { name: "paytonix_lead_source", value: "martechos_beta" },
        { name: "paytonix_customer_type", value: "martechos" },
        { name: "paytonix_intake_summary", value: "Demo please" },
      ]),
    ).rejects.toThrow("FIELD_NOT_IN_FORM_DEFINITION");
  });
});

describe("helpers", () => {
  it("buildIntakeSummary skips blank lines", () => {
    expect(
      buildIntakeSummary({
        Journey: "Paid social → CRM",
        Notes: "   ",
      }),
    ).toBe("Journey: Paid social → CRM");
  });

  it("splitFullName handles single and multi-part names", () => {
    expect(splitFullName("Taylor Payton")).toEqual({
      firstname: "Taylor",
      lastname: "Payton",
    });
    expect(splitFullName("Madonna")).toEqual({
      firstname: "Madonna",
      lastname: "",
    });
  });
});
