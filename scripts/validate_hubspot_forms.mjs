/**
 * scripts/validate_hubspot_forms.mjs
 * Post-build / post-deploy checks that HubSpot forms are wired for production.
 * Gates CI and can smoke-test live paytonix.net after promote.
 *
 * Usage: node scripts/validate_hubspot_forms.mjs [baseUrl]
 */

const baseUrl = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const EXPECTED_PORTAL_ID = process.env.EXPECTED_HUBSPOT_PORTAL_ID || "247279773";
const EXPECTED_ASSESSMENT_FORM_ID =
  process.env.EXPECTED_HUBSPOT_ASSESSMENT_FORM_ID ||
  "fb1b9952-c198-4e8f-b68a-7295fd752904";
const EXPECTED_BETA_FORM_ID =
  process.env.EXPECTED_HUBSPOT_MARTECHOS_BETA_FORM_ID ||
  "ba5bb7a9-3b91-45b8-b462-e613040e1cf0";

const FORM_PAGES = [
  {
    route: "/revenue-data-integrity-assessment",
    sectionId: "request-assessment",
    label: "assessment",
  },
  {
    route: "/martechos",
    sectionId: "beta-interest",
    label: "martechos beta",
  },
];

const failures = [];

function fail(message) {
  failures.push(message);
}

async function fetchText(route) {
  const url = `${baseUrl}${route}`;
  const response = await fetch(url);
  const text = await response.text();
  return { url, response, text };
}

function extractScriptSrcs(html) {
  const pattern = /<script[^>]+src="([^"]+)"/g;
  const srcs = [];
  for (const match of html.matchAll(pattern)) {
    srcs.push(match[1]);
  }
  return srcs;
}

async function verifyFormPage({ route, sectionId, label }) {
  const { url, response, text } = await fetchText(route);

  if (response.status !== 200) {
    fail(`${label} (${url}): expected HTTP 200, got ${response.status}`);
    return;
  }

  if (text.includes("Form backend is not configured")) {
    fail(
      `${label} (${url}): HubSpot env vars missing at build time — form shows configuration error`,
    );
  }

  if (!text.includes(`id="${sectionId}"`)) {
    fail(`${label} (${url}): missing form section #${sectionId}`);
  }

  if (!text.includes('type="submit"')) {
    fail(`${label} (${url}): missing submit button`);
  }
}

async function verifyPortalIdInClientBundle(route) {
  const { text } = await fetchText(route);
  const scriptSrcs = extractScriptSrcs(text).filter((src) => src.includes("/_next/"));

  if (scriptSrcs.length === 0) {
    fail(`${route}: no Next.js client chunks found to verify HubSpot portal ID`);
    return;
  }

  let foundPortal = false;
  let foundAssessmentForm = false;
  let foundBetaForm = false;

  for (const src of scriptSrcs.slice(0, 12)) {
    const chunkUrl = src.startsWith("http") ? src : `${baseUrl}${src}`;
    const chunkResponse = await fetch(chunkUrl);
    if (!chunkResponse.ok) continue;
    const chunkText = await chunkResponse.text();
    if (chunkText.includes(EXPECTED_PORTAL_ID)) foundPortal = true;
    if (chunkText.includes(EXPECTED_ASSESSMENT_FORM_ID)) foundAssessmentForm = true;
    if (chunkText.includes(EXPECTED_BETA_FORM_ID)) foundBetaForm = true;
  }

  if (!foundPortal) {
    fail(
      `${route}: production portal ID ${EXPECTED_PORTAL_ID} not found in client bundle — ` +
        "NEXT_PUBLIC_HUBSPOT_PORTAL_ID likely missing at build",
    );
  }

  if (route.includes("assessment") && !foundAssessmentForm) {
    fail(
      `${route}: assessment form GUID not found in client bundle — ` +
        "NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID likely missing at build",
    );
  }

  if (route.includes("martechos") && !foundBetaForm) {
    fail(
      `${route}: beta form GUID not found in client bundle — ` +
        "NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID likely missing at build",
    );
  }
}

async function main() {
  console.log(`Validating HubSpot forms at ${baseUrl}`);

  for (const page of FORM_PAGES) {
    await verifyFormPage(page);
  }

  await verifyPortalIdInClientBundle("/revenue-data-integrity-assessment");
  await verifyPortalIdInClientBundle("/martechos");

  if (failures.length > 0) {
    console.error("\nHubSpot form validation failed:\n");
    for (const message of failures) {
      console.error(`  ✗ ${message}`);
    }
    process.exit(1);
  }

  console.log("HubSpot form validation passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
