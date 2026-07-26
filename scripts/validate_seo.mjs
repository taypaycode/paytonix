/**
 * scripts/validate_seo.mjs
 * CI regression checks against a running server: status codes, unique
 * titles, canonicals, H1 presence, valid JSON-LD syntax, and broken
 * same-origin internal links. Exits non-zero on any failure so it can gate
 * CI merges.
 *
 * Usage: node scripts/validate_seo.mjs [baseUrl]
 */

const baseUrl = process.argv[2] || "http://localhost:3000";

const indexableRoutes = [
  "/",
  "/revenue-data-integrity-assessment",
  "/about",
  "/insights",
  "/insights/why-crm-and-warehouse-revenue-disagree",
  "/privacy",
  "/terms",
];

const noindexRoutes = ["/thank-you"];

const jsonLdPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
const titlePattern = /<title>([\s\S]*?)<\/title>/;
const canonicalPattern = /rel="canonical" href="([^"]*)"/;
const h1Pattern = /<h1[^>]*>([\s\S]*?)<\/h1>/;
const robotsMetaPattern = /<meta name="robots" content="([^"]*)"/;
const anchorHrefPattern = /<a\s[^>]*href="([^"#][^"]*)"/g;

const failures = [];
const seenTitles = new Map();
const visitedLinks = new Set();

function fail(route, message) {
  failures.push(`${route}: ${message}`);
}

async function checkRoute(route) {
  const res = await fetch(baseUrl + route);
  const text = await res.text();

  if (res.status !== 200) {
    fail(route, `expected 200, got ${res.status}`);
    return text;
  }

  const title = text.match(titlePattern)?.[1];
  if (!title) {
    fail(route, "missing <title>");
  } else if (seenTitles.has(title)) {
    fail(route, `duplicate title "${title}" also used by ${seenTitles.get(title)}`);
  } else {
    seenTitles.set(title, route);
  }

  const canonical = text.match(canonicalPattern)?.[1];
  if (!canonical) fail(route, "missing canonical link");

  const h1 = text.match(h1Pattern);
  if (!h1) fail(route, "missing <h1>");

  const robotsMeta = text.match(robotsMetaPattern)?.[1];
  const robotsHeader = res.headers.get("x-robots-tag");
  if (robotsMeta?.includes("noindex") || robotsHeader?.includes("noindex")) {
    fail(route, "unexpected noindex on an indexable route");
  }

  for (const match of text.matchAll(jsonLdPattern)) {
    try {
      JSON.parse(match[1]);
    } catch (err) {
      fail(route, `invalid JSON-LD: ${err.message}`);
    }
  }

  for (const match of text.matchAll(anchorHrefPattern)) {
    const href = match[1];
    const isSameOrigin = href.startsWith(baseUrl) || href.startsWith("https://paytonix.net");
    if (href.startsWith("http") && !isSameOrigin) continue;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    const path = isSameOrigin
      ? href.replace(baseUrl, "").replace("https://paytonix.net", "")
      : href;
    if (!path.startsWith("/")) continue;
    visitedLinks.add(path.split("#")[0] || "/");
  }

  return text;
}

async function checkNoindexRoute(route) {
  const res = await fetch(baseUrl + route);
  const text = await res.text();
  if (res.status !== 200) {
    fail(route, `expected 200, got ${res.status}`);
    return;
  }
  const robotsMeta = text.match(robotsMetaPattern)?.[1];
  const robotsHeader = res.headers.get("x-robots-tag");
  if (!robotsMeta?.includes("noindex") && !robotsHeader?.includes("noindex")) {
    fail(route, "expected noindex (form-confirmation route) but none found");
  }
}

async function checkRobotsAndSitemap() {
  const robotsRes = await fetch(baseUrl + "/robots.txt");
  if (robotsRes.status !== 200) fail("/robots.txt", `expected 200, got ${robotsRes.status}`);
  const contentType = robotsRes.headers.get("content-type") || "";
  if (!contentType.startsWith("text/plain")) {
    fail("/robots.txt", `expected text/plain content-type, got ${contentType}`);
  }

  const sitemapRes = await fetch(baseUrl + "/sitemap.xml");
  if (sitemapRes.status !== 200) fail("/sitemap.xml", `expected 200, got ${sitemapRes.status}`);
  const sitemapText = await sitemapRes.text();
  try {
    const urls = [...sitemapText.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
    if (urls.length === 0) fail("/sitemap.xml", "no <loc> entries found");
    for (const url of urls) {
      const localUrl = url.replace("https://paytonix.net", baseUrl);
      const res = await fetch(localUrl);
      if (res.status !== 200) fail("/sitemap.xml", `entry ${url} returned ${res.status}`);
    }
  } catch (err) {
    fail("/sitemap.xml", `failed to parse: ${err.message}`);
  }
}

async function checkInternalLinks() {
  for (const path of visitedLinks) {
    if (indexableRoutes.includes(path) || noindexRoutes.includes(path)) continue;
    const res = await fetch(baseUrl + path);
    if (res.status !== 200) {
      fail("internal link", `${path} returned ${res.status}`);
    }
  }
}

await checkRobotsAndSitemap();
for (const route of indexableRoutes) {
  await checkRoute(route);
}
for (const route of noindexRoutes) {
  await checkNoindexRoute(route);
}
await checkInternalLinks();

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} SEO regression check(s) failed:\n`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(`✓ All SEO regression checks passed (${indexableRoutes.length + noindexRoutes.length} routes, ${visitedLinks.size} internal links).`);
