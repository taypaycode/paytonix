# Paytonix.net SEO, AEO & Ethical SEM Implementation Checklist

Site: `https://paytonix.net`

Category: **Revenue Data Reliability**

Primary offer: **Revenue Data Integrity Assessment**

Primary buyer: growth, RevOps, MarTech, and data leaders operating across multiple marketing, CRM, warehouse, and reporting platforms.

Primary conversion:

> Request a qualified Revenue Data Integrity Assessment.

This repository must remain commercially narrow. Do not reintroduce generic fractional CTO work, broad full-stack development, dashboard building, or unlimited engineering retainers.

## Definition of Done

- Search and answer engines can crawl, render, understand, and cite every public page.
- The site clearly explains one expensive problem: customer journeys, attribution, CRM data, warehouse models, and reported revenue break apart.
- The offer progression remains `Assess → Repair → Monitor`.
- Structured data accurately describes Paytonix and the visible assessment offer.
- Content demonstrates original expertise rather than manufacturing search volume.
- Conversion measurement reaches qualified-lead and purchased-assessment outcomes.

---

# P0 — Crawlability and Indexation

## 1. Create a real `robots.txt`

Current behavior: `/robots.txt` returns a `404`.

Create:

```txt
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Optional. Independent from OpenAI search discovery.
User-agent: GPTBot
Allow: /

User-agent: OAI-AdsBot
Allow: /

Sitemap: https://paytonix.net/sitemap.xml
```

Acceptance criteria:

- [ ] `GET /robots.txt` returns `200`.
- [ ] `Content-Type` begins with `text/plain`.
- [ ] Response contains no HTML.
- [ ] Intended public pages and assets are crawlable.
- [ ] Admin, internal APIs, preview pages, and form-confirmation routes are not indexed.
- [ ] Allow `OAI-SearchBot` for OpenAI search discovery.
- [ ] Make a deliberate, separate decision about `GPTBot`.
- [ ] Allow `OAI-AdsBot` if OpenAI advertising discovery is desired.

## 2. Generate a real sitemap

Current behavior: `/sitemap.xml` returns a `404`.

- [ ] Use the framework’s native sitemap-generation mechanism.
- [ ] Include only canonical, indexable URLs returning `200`.
- [ ] Use accurate `<lastmod>` values.
- [ ] Exclude anchors, query variants, redirects, API routes, thank-you pages, and errors.
- [ ] Reference the sitemap in `robots.txt`.

Initial sitemap:

```txt
https://paytonix.net/
https://paytonix.net/revenue-data-integrity-assessment
https://paytonix.net/about
https://paytonix.net/privacy
https://paytonix.net/terms
https://paytonix.net/insights/...
```

Only include routes after they contain substantive public content.

## 3. Canonicals and URL normalization

- [ ] Keep `https://paytonix.net` as the canonical host.
- [ ] Redirect HTTP to HTTPS.
- [ ] Redirect `www` consistently if it resolves.
- [ ] Normalize trailing slashes.
- [ ] Add self-referencing canonicals.
- [ ] Match canonical URLs across metadata, sitemap, structured data, and internal links.
- [ ] Prevent indexing of tracking-parameter duplicates.
- [ ] Do not canonicalize distinct articles or service pages to the homepage.

## 4. Preserve server-rendered content

The homepage currently exposes meaningful HTML. Keep it that way.

- [ ] Ensure every public route is server-rendered or statically generated.
- [ ] Include headings, copy, links, metadata, and JSON-LD in initial HTML.
- [ ] Use real `<a href>` navigation.
- [ ] Keep core content available with JavaScript disabled.
- [ ] Do not replace server-rendered copy with client-only hydration.

## 5. Status codes

- [ ] Existing public pages return `200`.
- [ ] Unknown routes return `404`.
- [ ] Replaced pages use `301` or `308`.
- [ ] Removed pages use `410` when no replacement exists.
- [ ] Redirect chains and loops are absent.
- [ ] Preview/staging deployments use authentication or `noindex`.

---

# P0 — Positioning and Metadata

## 6. Protect the category

Primary category:

> Revenue Data Reliability

Primary promise:

> Find where customer journeys, campaign attribution, CRM records, warehouse models, and reported revenue break apart before more budget is allocated using bad data.

- [ ] Keep this language consistent across title, hero, About page, social profiles, and structured data.
- [ ] Use “revenue data reliability” as a category, not a phrase repeated unnaturally in every heading.
- [ ] Keep one entry offer and one primary CTA.
- [ ] Avoid “single pane of glass,” which positions Paytonix as another dashboard builder.

## 7. Page metadata

Homepage:

```html
<title>Revenue Data Reliability & Attribution Audits | Paytonix</title>
<meta
  name="description"
  content="Find where customer journeys, campaign attribution, CRM records, warehouse models, and reported revenue break apart before more budget is wasted."
/>
<link rel="canonical" href="https://paytonix.net/" />
```

Assessment page:

```html
<title>Revenue Data Integrity Assessment | Paytonix</title>
<meta
  name="description"
  content="Trace one critical customer-to-revenue journey, identify attribution and reconciliation failures, and receive a prioritized repair and monitoring plan."
/>
```

Article title pattern:

```txt
[Question or Diagnostic Problem] | Paytonix
```

- [ ] Give every page a unique title and description.
- [ ] Align metadata with visible content.
- [ ] Avoid stuffing platform names into the homepage title.
- [ ] Do not invest in the obsolete `meta keywords` tag.

## 8. Social metadata

- [ ] Create a branded `1200 × 630` Open Graph image.
- [ ] Add Open Graph metadata to every public page.
- [ ] Add Twitter/X card metadata.
- [ ] Use page-specific images for cornerstone articles.
- [ ] Use consistent Paytonix iconography.
- [ ] Ensure social images do not imply a mature live SaaS product before it exists.

---

# P1 — Structured Data

All schema must match visible page content. JSON-LD is preferred.

## 9. Homepage entity graph

Add:

- `WebSite`
- `Organization`
- `Service`
- `Offer`

Recommended IDs:

```txt
https://paytonix.net/#website
https://paytonix.net/#organization
https://paytonix.net/revenue-data-integrity-assessment#service
https://www.taypayton.com/#tay-payton
```

Organization properties:

- [ ] `name`
- [ ] `url`
- [ ] `logo`
- [ ] `description`
- [ ] `founder`
- [ ] Controlled `sameAs` profiles only
- [ ] Public `contactPoint` only if visible

Do not use invented founding dates, employee counts, ratings, reviews, locations, or awards.

## 10. Assessment service schema

Example structure:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://paytonix.net/revenue-data-integrity-assessment#service",
  "name": "Revenue Data Integrity Assessment",
  "serviceType": "Revenue Data Reliability Assessment",
  "url": "https://paytonix.net/revenue-data-integrity-assessment",
  "provider": {
    "@id": "https://paytonix.net/#organization"
  },
  "offers": {
    "@type": "Offer",
    "price": "3500",
    "priceCurrency": "USD",
    "description": "Starting price; final scope depends on the customer journey and systems assessed."
  }
}
```

- [ ] Keep `$3,500 starting at` visible near the offer.
- [ ] Keep schema pricing synchronized with visible pricing.
- [ ] Explain what changes scope.
- [ ] Do not use `Product` or fabricated aggregate ratings.
- [ ] Do not use `LocalBusiness` unless Paytonix becomes a genuine public local establishment.

## 11. Article and breadcrumb schema

For every insight:

- [ ] Add `Article` or `TechArticle`.
- [ ] Include headline, description, author, dates, image, and `mainEntityOfPage`.
- [ ] Link the author to Tay’s stable Person identity.
- [ ] Add `BreadcrumbList`.
- [ ] Show author and review date visibly.

## 12. FAQ schema

- [ ] Publish only genuine buyer questions.
- [ ] Keep questions and answers visible.
- [ ] Cover access, security, scope, timing, deliverables, repairs, monitoring, and fit.
- [ ] Use `FAQPage` only when the page truly contains FAQs.
- [ ] Do not expect guaranteed FAQ rich results.

## 13. Validation

- [ ] Test supported markup with Google Rich Results Test.
- [ ] Test full graphs with Schema.org Validator.
- [ ] Validate rendered production pages.
- [ ] Add CI validation for JSON-LD.
- [ ] Revalidate after template changes.

---

# P1 — Information Architecture

Recommended structure:

```txt
/
/revenue-data-integrity-assessment
/about
/insights/
/insights/customer-journey-attribution-gaps
/insights/crm-warehouse-revenue-reconciliation
/insights/marketing-data-quality-checklist
/insights/join-fanout-inflated-revenue
/privacy
/terms
```

## 14. Dedicated assessment page

- [ ] Create `/revenue-data-integrity-assessment`.
- [ ] Keep a concise homepage offer summary.
- [ ] Put complete scope, deliverables, fit, exclusions, price, timing, and FAQ on the dedicated page.
- [ ] Use the dedicated page as the primary organic and paid-search landing page.
- [ ] Keep one primary CTA: `Request an Assessment`.

## 15. Internal linking

- [ ] Link the homepage to the assessment, About page, and cornerstone insights.
- [ ] Link diagnostic articles naturally to the assessment.
- [ ] Link the assessment back to methodology articles.
- [ ] Link related insights to one another.
- [ ] Use descriptive anchor text.
- [ ] Prevent orphan pages.
- [ ] Add breadcrumbs to deeper routes.

## 16. Avoid doorway pages

Do not create near-duplicate pages for:

```txt
BigQuery attribution audit
Snowflake attribution audit
HubSpot attribution audit
Salesforce attribution audit
Florida attribution audit
Tampa attribution audit
```

A platform-specific page is allowed only when it contains unique expertise, workflow, limitations, examples, and meaningful demand.

---

# P1 — Trust and Qualification

## 17. About page

Explain:

- [ ] Who founded Paytonix
- [ ] The repeated problem observed across real work
- [ ] Relevant MarTech and data-engineering experience
- [ ] Why Paytonix crosses marketing, CRM, warehouse, and reporting boundaries
- [ ] How Paytonix differs from dashboard shops and generic consultants

Link to TayPayton for technical experience without turning Paytonix into an employment portfolio.

## 18. Evidence standards

- [ ] Explain how quantified claims were measured.
- [ ] Distinguish Paytonix clients from Tay’s prior employers or contract experience.
- [ ] Use “Experience engineering systems for teams including…” unless formal endorsement exists.
- [ ] Obtain permission before using logos, names, quotes, or proprietary details.
- [ ] Use anonymized examples only where confidentiality permits.
- [ ] Never fabricate testimonials, reviews, benchmarks, incidents, or outcomes.

## 19. Security and access

Add a visible section explaining:

- [ ] Read-only access where possible
- [ ] Least-privilege expectations
- [ ] Supported access methods
- [ ] Credential handling
- [ ] Data retention and deletion
- [ ] Confidentiality
- [ ] What happens when access cannot be provided

Do not make enterprise-security claims that have not been implemented.

## 20. Qualification

Add “Best fit” and “Not a fit” content.

Best fit:

- Multiple marketing systems
- Established CRM or warehouse
- Meaningful acquisition/lifecycle spend
- A commercially important journey that is not trusted
- Ability to provide technical read access

Not a fit:

- No meaningful customer/revenue data
- Seeking a generic dashboard
- Seeking unlimited engineering support
- No access to validate source systems
- Wants attribution certainty that available data cannot support

---

# P1 — AEO Content Engine

Answer-engine optimization should make Paytonix easy to understand, verify, quote, and cite.

## 21. Article template

Each article should contain:

1. Specific question as H1
2. Direct 40–80 word answer
3. Definition of the failure
4. Observable symptoms
5. Likely causes
6. Diagnostic tests
7. Business consequences
8. Repair options
9. Prevention and monitoring
10. Assumptions and limitations
11. Author and last-reviewed date
12. Primary-source citations where applicable
13. Relevant assessment CTA

- [ ] Use plain language before implementation detail.
- [ ] Use tables for exact comparisons.
- [ ] Use diagrams for multi-system flows.
- [ ] Include original SQL patterns or test logic where safe.
- [ ] Keep conclusions proportional to evidence.

## 22. Cornerstone content

Priority:

- [ ] Why CRM revenue and warehouse revenue disagree
- [ ] How join fanout silently inflates marketing revenue
- [ ] How to audit a customer journey from ad click to closed revenue
- [ ] What breaks attribution between landing pages, CRM records, and the warehouse
- [ ] Revenue data integrity assessment checklist

Second wave:

- [ ] Anonymous-to-known identity-resolution failures
- [ ] Detecting missing marketing events after deployment
- [ ] Campaign taxonomy governance across ads, CRM, and warehouse
- [ ] How to decide whether a marketing dashboard can be trusted
- [ ] Leading indicators of marketing-data drift

Publish one excellent piece per month rather than mass-producing articles.

## 23. Original evidence

- [ ] Create sanitized architecture diagrams.
- [ ] Publish original checklists and decision frameworks.
- [ ] Show realistic failure modes.
- [ ] Provide reproducible diagnostic logic.
- [ ] Update articles when evidence or tooling changes.
- [ ] Avoid generic definitions already answered better elsewhere.

## 24. Optional `llms.txt`

- [ ] May list canonical pages and concise descriptions.
- [ ] Generate it from a shared source of truth.
- [ ] Keep it synchronized.
- [ ] Treat it as experimental—not as an official ranking signal.
- [ ] Never substitute it for HTML, schema, sitemap, or strong content.

---

# P1 — Performance and Accessibility

## 25. Core Web Vitals

Target:

- LCP ≤ 2.5 seconds
- INP ≤ 200 milliseconds
- CLS ≤ 0.1

- [ ] Test mobile and desktop.
- [ ] Monitor field data when available.
- [ ] Compress and correctly size images.
- [ ] Set image dimensions.
- [ ] Lazy-load only below-the-fold media.
- [ ] Optimize fonts.
- [ ] Remove unused scripts and styles.
- [ ] Load analytics/advertising scripts with an appropriate deferred strategy.
- [ ] Confirm third-party scripts do not materially harm interaction performance.

## 26. Monitoring-console visual

- [ ] Identify it as illustrative where necessary.
- [ ] Do not imply that the displayed numbers are a live customer account.
- [ ] Keep its accessibility label accurate.
- [ ] Respect reduced-motion preferences.
- [ ] Avoid expensive continuous animation.
- [ ] Ensure the hero copy remains the LCP focus.

## 27. Accessibility

- [ ] Use semantic landmarks and heading order.
- [ ] Provide visible focus states.
- [ ] Meet WCAG AA contrast.
- [ ] Use actual labels for form inputs.
- [ ] Provide clear errors and success messages.
- [ ] Make the entire qualification flow keyboard accessible.
- [ ] Use descriptive alt text for informative imagery.

---

# P1 — Measurement

## 28. Search platforms

- [ ] Verify Paytonix in Google Search Console using DNS.
- [ ] Verify in Bing Webmaster Tools.
- [ ] Submit the sitemap to both.
- [ ] Inspect canonical pages.
- [ ] Monitor crawl errors, indexation, queries, CTR, positions, Core Web Vitals, and schema.

## 29. Funnel events

Track:

```txt
view_assessment
start_assessment_form
submit_assessment_form
book_qualification_call
view_methodology_article
qualified_lead
assessment_purchased
```

- [ ] Send qualified-lead and purchased-assessment outcomes back from the CRM where feasible.
- [ ] Do not optimize only for form starts.
- [ ] Exclude internal and test traffic.
- [ ] Use documented UTM standards.
- [ ] Avoid collecting unnecessary personal or system data before an agreement.
- [ ] Confirm consent and privacy behavior.

## 30. Baseline

Record before major content or campaign changes:

- Indexed URLs
- Branded and non-branded impressions
- Organic assessment inquiries
- Qualification rate
- Assessment close rate
- Current search titles/descriptions
- PageSpeed results

Review monthly rather than reacting to daily noise.

---

# P2 — Ethical SEM

Use paid search to validate commercial intent after the organic landing page and conversion measurement are trustworthy.

## 31. Campaign prerequisites

- [ ] Dedicated assessment landing page is complete.
- [ ] Form and calendar flows work.
- [ ] Privacy disclosures are accurate.
- [ ] Qualified-lead and purchase outcomes can be measured.
- [ ] Negative keywords are prepared.
- [ ] Ad claims match visible landing-page claims.

## 32. Initial search themes

Validate narrowly:

```txt
revenue data audit
marketing attribution audit
crm data quality audit
marketing data reconciliation
customer journey data audit
marketing data pipeline audit
```

- [ ] Begin with exact and tightly controlled phrase match.
- [ ] Review search terms weekly.
- [ ] Separate attribution, reconciliation, and pipeline-integrity intent.
- [ ] Send users to the dedicated assessment page.
- [ ] Optimize toward qualified opportunities and purchases.

Avoid broad early bidding on:

```txt
data engineer
marketing dashboard
martech consultant
bigquery developer
fractional CTO
```

These are likely to generate job, staff-augmentation, generic dashboard, or low-intent traffic.

## 33. Negative-keyword system

Include irrelevant:

- Jobs and salaries
- Courses and certifications
- Free templates
- Consumer analytics
- School assignments
- Generic dashboard software
- Unsupported platforms or services
- DIY-only informational intent when running commercial campaigns

Do not exclude research traffic from organic content; apply negatives to paid campaigns based on commercial economics.

## 34. Ethical ad rules

- [ ] No fabricated urgency.
- [ ] No unsupported savings or revenue claims.
- [ ] No competitor impersonation.
- [ ] No misleading “free audit” if the assessment costs money.
- [ ] No fake scarcity.
- [ ] No ad/landing-page mismatch.
- [ ] No optimizing toward low-quality leads merely to report conversion volume.

---

# CI and Regression Tests

- [ ] Fail for broken internal links.
- [ ] Fail when indexable routes lack title, description, canonical, or H1.
- [ ] Fail when titles are duplicated.
- [ ] Validate sitemap syntax.
- [ ] Verify every sitemap URL returns `200`.
- [ ] Verify `robots.txt` returns plain text.
- [ ] Validate JSON-LD syntax.
- [ ] Ensure production lacks accidental global `noindex`.
- [ ] Ensure preview deployments contain `noindex`.
- [ ] Check redirects for chains.
- [ ] Run Lighthouse CI.
- [ ] Test form and analytics events without producing real leads.

Smoke tests:

```bash
curl -I https://paytonix.net/
curl -I https://paytonix.net/robots.txt
curl -I https://paytonix.net/sitemap.xml
curl -I https://www.paytonix.net/
```

Inspect bodies and content types in addition to status codes.

---

# Prohibited Tactics

Do not:

- Publish unreviewed or generic AI-generated content.
- Create location pages without genuine local relevance.
- Create near-duplicate pages for every platform or keyword.
- Stuff metadata, headings, schema, alt text, or footers.
- Buy links or join link farms.
- Fabricate reviews, clients, results, incidents, certifications, or citations.
- Mark up hidden or nonexistent content.
- Cloak content.
- Use expired domains or misleading redirects.
- Claim continuous monitoring is a mature product before it exists.
- Present illustrative dashboard values as real customer data.
- Treat crawler permissions, schema, or `llms.txt` as substitutes for value.

---

# Recommended Execution Order

## Sprint 1

1. Create `robots.txt`.
2. Generate `sitemap.xml`.
3. Add canonical and redirect rules.
4. Confirm server rendering.
5. Add route-specific metadata.

## Sprint 2

1. Create the dedicated assessment page.
2. Add Organization/WebSite/Service/Offer schema.
3. Add About, privacy, terms, security, and fit content.
4. Validate schema.

## Sprint 3

1. Publish the first cornerstone diagnostic article.
2. Add Article and breadcrumb schema.
3. Build internal links.
4. Add measurement through qualified lead and purchase.

## Sprint 4

1. Improve performance and accessibility.
2. Verify Search Console and Bing.
3. Test one narrow paid-search campaign.
4. Improve existing pages before expanding content volume.

---

# Required Cursor Completion Report

Return:

1. Files changed
2. Routes added or removed
3. Redirect and canonical behavior
4. Final `robots.txt`
5. Final sitemap URLs
6. Structured-data type per route
7. Metadata per route
8. Server-rendering verification
9. Lighthouse results
10. Schema validation results
11. Analytics and conversion events implemented
12. Remaining manual Search Console, Bing, CRM, or advertising steps

