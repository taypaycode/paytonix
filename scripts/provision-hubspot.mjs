#!/usr/bin/env node
/**
 * scripts/provision-hubspot.mjs
 * Idempotently create Paytonix CRM properties + marketing forms in a HubSpot
 * production portal, then write .env.local with portal and form GUIDs.
 *
 * Usage (from website-infra/paytonix):
 *   npm run provision:hubspot
 *
 * Token resolution (first match wins):
 *   HUBSPOT_ACCESS_TOKEN, HUBSPOT_MARTECHOS_SERVICE_KEY, HUBSPOT_SERVICE_KEY,
 *   or the same keys from ../../../martechos/.env
 *
 * Note: HUBSPOT_MARTECHOS_SERVICE_KEY_ID is the Private App numeric ID — not
 * the bearer token. API calls need the pat-... access token.
 *
 * Required Private App scopes:
 *   crm.schemas.contacts.read, crm.schemas.contacts.write, forms
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const API = "https://api.hubapi.com";

/** Parse a simple KEY=VALUE env file without external dependencies. */
function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

const martechosEnv = loadEnvFile(resolve(ROOT, "../../martechos/.env"));

/** First non-empty value from process env, then martechos .env file. */
function pickToken(...keys) {
  for (const key of keys) {
    const fromProcess = process.env[key]?.trim();
    if (fromProcess) return { value: fromProcess, source: `process.env.${key}` };
    const fromFile = martechosEnv[key]?.trim();
    if (fromFile) return { value: fromFile, source: `martechos/.env → ${key}` };
  }
  return { value: "", source: "(none)" };
}

const tokenPick = pickToken(
  "HUBSPOT_ACCESS_TOKEN",
  "HUBSPOT_MARTECHOS_SERVICE_KEY",
  "HUBSPOT_SERVICE_KEY",
);
const TOKEN = tokenPick.value;

const PRIVATE_APP_ID =
  process.env.HUBSPOT_MARTECHOS_SERVICE_KEY_ID ??
  martechosEnv.HUBSPOT_MARTECHOS_SERVICE_KEY_ID;

function explainTokenFailure() {
  console.error(`
Could not find a valid HubSpot Private App access token.

What you have in martechos/.env:
  HUBSPOT_MARTECHOS_SERVICE_KEY_ID=${PRIVATE_APP_ID ?? "(not set)"}
    → This is the Private App ID (numeric). It is NOT used as a Bearer token.

  HUBSPOT_SERVICE_KEY=pat-...
    → This IS the token provision needs (Settings → Private Apps → your app → Access token).

Do NOT use:
  • HUBSPOT_PERSONAL_ACCESS_KEY (HubSpot CLI only, not CRM API)
  • HUBSPOT_DEVELOPER_API_KEY (developer portal, not CRM API)
  • Literal placeholders like pat-na2-...

If PowerShell still fails with 401 after martechos/.env is correct, clear stale session vars:
  Remove-Item Env:HUBSPOT_ACCESS_TOKEN -ErrorAction SilentlyContinue
  Remove-Item Env:HUBSPOT_SERVICE_KEY -ErrorAction SilentlyContinue
Then rerun in the same window, or open a fresh terminal.

Set one of HUBSPOT_ACCESS_TOKEN, HUBSPOT_MARTECHOS_SERVICE_KEY, or HUBSPOT_SERVICE_KEY
to the full pat-... string, then rerun: npm run provision:hubspot
`);
}

if (!TOKEN || TOKEN.includes("...") || !TOKEN.startsWith("pat-")) {
  explainTokenFailure();
  process.exit(1);
}

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function hubspotRequest(method, path, body) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }
  if (!response.ok) {
    const detail = payload?.message ?? payload?.raw ?? response.statusText;
    if (response.status === 401) {
      throw new Error(
        `${method} ${path} → 401: ${detail}\n` +
          "Auth failed. Confirm HUBSPOT_SERVICE_KEY is the full Private App access token (pat-...), " +
          "not HUBSPOT_MARTECHOS_SERVICE_KEY_ID or HUBSPOT_PERSONAL_ACCESS_KEY.",
      );
    }
    throw new Error(`${method} ${path} → ${response.status}: ${detail}`);
  }
  return payload;
}

const CUSTOM_PROPERTIES = [
  {
    name: "paytonix_customer_type",
    label: "Paytonix customer type",
    type: "enumeration",
    fieldType: "select",
    groupName: "contactinformation",
    description:
      "Which Paytonix offer line applies: MarTechOS product, services, or both.",
    options: [
      { label: "Prospect", value: "prospect", displayOrder: 0, hidden: false },
      {
        label: "MarTechOS",
        value: "martechos",
        displayOrder: 1,
        hidden: false,
      },
      {
        label: "Paytonix services",
        value: "paytonix_services",
        displayOrder: 2,
        hidden: false,
      },
      { label: "Both", value: "both", displayOrder: 3, hidden: false },
    ],
  },
  {
    name: "paytonix_lead_source",
    label: "Paytonix lead source",
    type: "enumeration",
    fieldType: "select",
    groupName: "contactinformation",
    description: "How this contact entered the Paytonix CRM.",
    options: [
      {
        label: "Assessment form",
        value: "assessment_form",
        displayOrder: 0,
        hidden: false,
      },
      {
        label: "MarTechOS beta form",
        value: "martechos_beta",
        displayOrder: 1,
        hidden: false,
      },
      {
        label: "Organic",
        value: "organic",
        displayOrder: 2,
        hidden: false,
      },
      {
        label: "Cold outbound",
        value: "cold_outbound",
        displayOrder: 3,
        hidden: false,
      },
      { label: "Other", value: "other", displayOrder: 4, hidden: false },
    ],
  },
  {
    name: "paytonix_intake_summary",
    label: "Paytonix intake summary",
    type: "string",
    fieldType: "textarea",
    groupName: "contactinformation",
    description:
      "Free-text intake from Paytonix website forms (assessment or beta interest).",
  },
];

function contactField(name, label, { required = false, hidden = false, fieldType = "single_line_text" } = {}) {
  return {
    objectTypeId: "0-1",
    name,
    label,
    required,
    hidden,
    fieldType,
    validation: {
      blockedEmailDomains: [],
      useDefaultBlockList: false,
    },
  };
}

function formDefinition(name, fields) {
  const now = new Date().toISOString();
  const fieldGroups = [];
  for (let i = 0; i < fields.length; i += 3) {
    fieldGroups.push({ fields: fields.slice(i, i + 3) });
  }
  return {
    formType: "hubspot",
    name,
    createdAt: now,
    updatedAt: now,
    archived: false,
    fieldGroups,
    configuration: {
      language: "en",
      cloneable: true,
      postSubmitAction: { type: "thank_you", value: "Thanks — we'll be in touch." },
      editable: true,
      archivable: true,
      recaptchaEnabled: false,
      createMarketableContact: true,
    },
    displayOptions: {
      renderRawHtml: false,
      theme: "default_style",
      submitButtonText: "Submit",
      cssClass: "hs-form paytonix-hidden-form",
    },
    legalConsentOptions: { type: "none" },
  };
}

const FORMS = [
  {
    envKey: "NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID",
    name: "Paytonix — Revenue Data Integrity Assessment",
    fields: [
      contactField("email", "Work email", { required: true, fieldType: "email" }),
      contactField("firstname", "First name", { required: true }),
      contactField("lastname", "Last name"),
      contactField("paytonix_lead_source", "Lead source", { hidden: true }),
      contactField("paytonix_customer_type", "Customer type", { hidden: true }),
      contactField("paytonix_intake_summary", "Intake summary", {
        hidden: true,
        fieldType: "multi_line_text",
      }),
    ],
  },
  {
    envKey: "NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID",
    name: "Paytonix — MarTechOS Founding Beta Interest",
    fields: [
      contactField("email", "Work email", { required: true, fieldType: "email" }),
      contactField("firstname", "First name", { required: true }),
      contactField("company", "Company"),
      contactField("paytonix_lead_source", "Lead source", { hidden: true }),
      contactField("paytonix_customer_type", "Customer type", { hidden: true }),
      contactField("paytonix_intake_summary", "Intake summary", {
        hidden: true,
        fieldType: "multi_line_text",
      }),
    ],
  },
];

async function ensureProperty(definition) {
  try {
    await hubspotRequest("GET", `/crm/v3/properties/contacts/${definition.name}`);
    console.log(`  property exists: ${definition.name}`);
  } catch {
    await hubspotRequest("POST", "/crm/v3/properties/contacts", definition);
    console.log(`  property created: ${definition.name}`);
  }
}

async function findFormByName(name) {
  let after;
  do {
    const query = new URLSearchParams({ limit: "100" });
    if (after) query.set("after", after);
    const payload = await hubspotRequest(
      "GET",
      `/marketing/v3/forms/?${query.toString()}`,
    );
    const match = (payload.results ?? []).find((form) => form.name === name);
    if (match) return match;
    after = payload.paging?.next?.after;
  } while (after);
  return null;
}

async function ensureForm(definition) {
  const existing = await findFormByName(definition.name);
  if (existing) {
    console.log(`  form exists: ${definition.name} (${existing.id})`);
    return existing.id;
  }
  const created = await hubspotRequest(
    "POST",
    "/marketing/v3/forms/",
    formDefinition(definition.name, definition.fields),
  );
  console.log(`  form created: ${definition.name} (${created.id})`);
  return created.id;
}

function upsertEnvLocal(updates) {
  const envPath = resolve(ROOT, ".env.local");
  const lines = existsSync(envPath)
    ? readFileSync(envPath, "utf8").split(/\r?\n/)
    : [];

  const map = new Map(
    lines
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .map((line) => {
        const idx = line.indexOf("=");
        return idx === -1 ? [line, ""] : [line.slice(0, idx), line.slice(idx + 1)];
      }),
  );

  for (const [key, value] of Object.entries(updates)) {
    map.set(key, value);
  }

  const header = [
    "# Generated / updated by npm run provision:hubspot",
    "# Production HubSpot portal — do not commit this file.",
    "",
  ];
  const body = [...map.entries()].map(([k, v]) => `${k}=${v}`).join("\n");
  writeFileSync(envPath, `${header.join("\n")}${body}\n`, "utf8");
  console.log(`\nWrote ${envPath}`);
}

async function main() {
  console.log("Fetching HubSpot account details…");
  console.log(
    `  token source: ${tokenPick.source} (length ${TOKEN.length}, prefix ${TOKEN.slice(0, 12)}…)`,
  );
  const account = await hubspotRequest("GET", "/account-info/v3/details");
  const portalId = String(account.portalId);
  console.log(`Portal ID: ${portalId} (${account.accountType ?? "unknown type"})`);

  console.log("\nEnsuring contact properties…");
  for (const property of CUSTOM_PROPERTIES) {
    await ensureProperty(property);
  }

  console.log("\nEnsuring marketing forms…");
  const envUpdates = { NEXT_PUBLIC_HUBSPOT_PORTAL_ID: portalId };
  let formsOk = true;
  try {
    for (const form of FORMS) {
      envUpdates[form.envKey] = await ensureForm(form);
    }
  } catch (err) {
    formsOk = false;
    console.error(`\nForms step failed: ${err.message ?? err}`);
    if (String(err.message ?? err).includes("403")) {
      console.error(`
Add the "forms" scope to Private App ${PRIVATE_APP_ID ?? "(your app)"}:
  HubSpot → Settings → Integrations → Private Apps → MarTechOS (or your app)
  → Scopes → Marketing → Forms → Read + Write
  → Save, then copy the access token again into martechos/.env as HUBSPOT_SERVICE_KEY

Then rerun: npm run provision:hubspot
`);
    }
    console.error(`
Properties and portal ID are already provisioned; only forms remain.
Alternatively, create the two forms manually in HubSpot UI and paste form GUIDs into .env.local:
  NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID=
  NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID=
Form names to match: "${FORMS[0].name}", "${FORMS[1].name}"
`);
  }

  upsertEnvLocal(envUpdates);

  console.log("\nDone. Next steps:");
  if (!formsOk) {
    console.log("  0. Add forms scope + rerun provision (see error above)");
  }
  console.log("  1. npm run dev");
  console.log("  2. Submit test forms on / and /martechos");
  console.log("  3. Confirm contacts in HubSpot production CRM");
  console.log("  4. Copy .env.local vars to Vercel before deploying");
  if (!formsOk) process.exit(1);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
