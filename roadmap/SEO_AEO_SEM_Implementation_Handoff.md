# Paytonix SEO / AEO / SEM — Implementation Handoff

**Purpose:** Summarize what was shipped so a follow-on model (or human) can recommend further optimization. Includes remaining **manual steps** that require account access outside the repo.

**Date:** 2026-07-26  
**Repo:** `https://github.com/taypaycode/paytonix`  
**Canonical site:** `https://paytonix.net`  
**Stack:** Next.js App Router (16.x), Tailwind, Vercel hosting, Formspree + Cal.com  
**Branch / deploy:** Shipped on `main` (commit `fd9ca12` and subsequent domain fix)

**Live domain status (verified 2026-07-26):**
- `https://paytonix.net` → **200 OK** (primary / canonical)
- `https://www.paytonix.net` → **308** → `https://paytonix.net/`

---

## 1. Business positioning (context for optimization)

Paytonix sells **Revenue Data Reliability** — detecting and repairing breaks between marketing platforms, customer journeys, CRM records, warehouse models, and revenue reporting.

**Primary offer:** Revenue Data Integrity Assessment  
- Fixed / starting price: **$3,500**  
- Timeline: **7–10 business days**  
- Scope: one customer-to-revenue journey, attribution + reconciliation breaks, prioritized fix list  
- Primary CTA: **Request an Assessment** → `/revenue-data-integrity-assessment#request-assessment`

Do not invent savings claims, urgency, scarcity, or competitor comparisons in ads or copy.

---

## 2. What was implemented (by sprint)

### Sprint 1 — Technical SEO / crawlability

| Item | Status | Where |
| --- | --- | --- |
| `robots.txt` | Done | `src/app/robots.ts` — allows `*`, `GPTBot`, `OAI-SearchBot`, `OAI-AdsBot`; points to sitemap |
| `sitemap.xml` | Done | `src/app/sitemap.ts` — 7 URLs (home, assessment, about, insights, article, privacy, terms) |
| www → apex | Done | App: `next.config.ts` redirect; Vercel Domains: apex = Production primary, www redirects to apex |
| Preview / non-prod `noindex` | Done | `next.config.ts` sets `X-Robots-Tag: noindex, nofollow` when `VERCEL_ENV !== "production"` |
| Per-route metadata | Done | Title template, description, canonical, Open Graph, Twitter cards |
| OG image | Done | `public/og-image.png` (1200×630) |
| Single source of truth for URLs | Done | `src/lib/site.ts` (`SITE_URL = https://paytonix.net`) |

### Sprint 2 — Information architecture + structured data

**New routes (all static / SSG):**
- `/` — condensed homepage
- `/revenue-data-integrity-assessment` — dedicated assessment landing page
- `/about` — founder, security & access, qualification fit
- `/insights` — content index
- `/insights/[slug]` — article route (SSG via `generateStaticParams`)
- `/privacy`, `/terms` — made **indexable** (previously noindex)
- `/thank-you` — remains conversion / thank-you (noindex-appropriate)

**JSON-LD** (`src/lib/schema.ts` + `src/components/seo/JsonLd.tsx`):
- Homepage: `WebSite` + `Organization` (+ related graph)
- Assessment: `Service`, `Offer`, `FAQPage`
- Article: `TechArticle` / Article + `BreadcrumbList`
- Founder/`Person` facts wired from `src/lib/site.ts`

### Sprint 3 — Content engine + internal linking

- First cornerstone article: `/insights/why-crm-and-warehouse-revenue-disagree`
- Article content model: `src/lib/articles.ts`
- Template: `src/components/articles/ArticleTemplate.tsx` (AEO-oriented structure)
- Visible breadcrumbs: `src/components/articles/Breadcrumbs.tsx`
- Assessment FAQ section: `src/components/sections/AssessmentFaq.tsx`
- Nav/footer updated to page links (Assessment, Insights, About) via `next/link`

### Sprint 4 — Measurement, a11y, CI

- GA4 helpers (env-driven, no-op until ID set): `src/lib/analytics.ts`
- View tracker: `src/components/analytics/ViewTracker.tsx`
- Funnel events wired in form / CTAs (see §4)
- WCAG AA contrast pass (dark theme muted text lifted)
- Global `focus-visible` + `prefers-reduced-motion` in `src/app/globals.css`
- SEO regression script: `scripts/validate_seo.mjs` (`npm run validate:seo`)
- CI: `.github/workflows/ci.yml` — lint, build, SEO checks, Lighthouse CI
- Lighthouse thresholds: `lighthouserc.json`

### P2 — Ethical SEM (prep only, not launched)

Full keyword / negative / ad-copy pack: `roadmap/SEM_Campaign_Prep.md`

- 6 ad groups (exact + phrase)
- Campaign-level negatives (jobs, free, DIY, wrong-category BI tools, etc.)
- RSA headlines + descriptions matching live landing-page claims
- Final URL must be assessment page, not homepage

---

## 3. Route inventory

| URL | Purpose | Index | Schema highlights |
| --- | --- | --- | --- |
| `/` | Positioning homepage | yes | WebSite, Organization |
| `/revenue-data-integrity-assessment` | Paid offer landing | yes | Service, Offer, FAQPage |
| `/about` | Trust / founder / security | yes | Person-related |
| `/insights` | Content hub | yes | — |
| `/insights/why-crm-and-warehouse-revenue-disagree` | Cornerstone article | yes | Article + BreadcrumbList |
| `/privacy` | Privacy policy | yes | — |
| `/terms` | Terms | yes | — |
| `/thank-you` | Post-submit | noindex (intended) | — |
| `/robots.txt` | Crawl rules | — | — |
| `/sitemap.xml` | URL inventory | — | — |

---

## 4. Analytics & conversion events

**Google Ads (already live, pre-existing):**
- Ads ID: `AW-18177137190` (`src/lib/google-ads.ts`)
- Lead form conversion send-to already configured; thank-you flow intact

**GA4 (code ready; property not created yet):**
- Env var: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- Until set, helpers no-op safely

| Event | Trigger | Status |
| --- | --- | --- |
| `view_assessment` | Assessment page mount | Implemented |
| `start_assessment_form` | First form field change | Implemented |
| `submit_assessment_form` | Successful Formspree submit | Implemented |
| `book_qualification_call` | Cal.com link click | Implemented (iframe internals not observable) |
| `view_methodology_article` | Article page mount | Implemented |
| `qualified_lead` | Real pipeline qualification | Helper only — **needs CRM/manual wiring** |
| `assessment_purchased` | Paid assessment closed | Helper only — **needs CRM/manual wiring** |

**SEM rule:** Do not launch paid spend optimized to raw form fills until `qualified_lead` is a real conversion action.

---

## 5. Local Lighthouse snapshot (caveat)

Measured against a local `next start` production build on a Windows machine — **not** Vercel edge. Treat SEO/a11y as reliable; Performance as a lower bound.

| Page | Perf | A11y | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Homepage | ~71 | 100 | ~79 | 100 |
| Assessment | ~78 | 100 | ~79 | 100 |

Best Practices ~79 largely due to third-party Google Ads cookies (expected). Re-run via PageSpeed Insights on production and rely on Lighthouse CI on `main`.

---

## 6. Key files (for further optimization work)

```
src/lib/site.ts              # SITE_URL, org, founder, price constants
src/lib/schema.ts            # JSON-LD builders
src/lib/analytics.ts         # GA4 funnel helpers
src/lib/articles.ts          # Article content registry
src/app/robots.ts
src/app/sitemap.ts
src/app/layout.tsx           # root metadata + GA4/Ads scripts
next.config.ts               # www→apex safety redirect + preview noindex
.github/workflows/ci.yml
scripts/validate_seo.mjs
lighthouserc.json
roadmap/SEM_Campaign_Prep.md
roadmap/Paytonix_SEO_AEO_SEM_Implementation_Checklist.md
```

---

## 7. Manual steps still required

Use this list as the optimization backlog / ops checklist.

### A. Analytics & CRM
1. Create a **GA4 property** for paytonix.net.
2. Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in **Vercel → Environment Variables** (Production + Preview as desired). Redeploy if needed.
3. Confirm events fire in GA4 DebugView / Realtime.
4. Import GA4 → Google Ads conversion actions for at least `qualified_lead` (once wired).
5. Decide how `qualified_lead` and `assessment_purchased` fire (CRM webhook, Zapier/Make after Formspree, manual admin action, Stripe if/when checkout exists). Formspree alone is not enough for qualified pipeline.

### B. Search consoles
6. Verify **Google Search Console** for `https://paytonix.net` (DNS TXT preferred).
7. Verify **Bing Webmaster Tools**.
8. If using HTML meta verification, add to `metadata.verification` in `src/app/layout.tsx`.
9. Submit `https://paytonix.net/sitemap.xml` in both consoles.
10. Request indexing for `/`, assessment page, and cornerstone article after GSC verifies.

### C. Domains / hosting hygiene
11. Keep **apex (`paytonix.net`) as Production primary** in Vercel Domains.
12. Keep **www → apex** (308) at Vercel edge; leave app-level `next.config.ts` rule as safety net.
13. **Do not** re-enable Vercel’s “Redirect apex domains to www (recommended)” when adding domains — that recreates the redirect loop against the app rule.
14. Confirm DNS at registrar (Namecheap / registrar-servers) still points correctly to Vercel for both apex and www.

### D. Structured data validation (post-deploy)
15. Run [Google Rich Results Test](https://search.google.com/test/rich-results) on:
    - `/`
    - `/revenue-data-integrity-assessment`
    - `/insights/why-crm-and-warehouse-revenue-disagree`
16. Run Schema.org Validator on the same URLs.
17. Fix any Google warnings (not just JSON parse validity).

### E. Performance
18. Run **PageSpeed Insights** on production URLs (mobile + desktop).
19. Prioritize LCP / render-blocking findings on the live edge network.
20. Confirm CI Lighthouse job on GitHub Actions is green on `main`.

### F. Content & trust
21. Human-review cornerstone article before promoting in ads or outreach.
22. Confirm **client logo permissions** (Acrisure, Adaptigent, Awesomely, Tawkify, Tri-Tronics) before paid traffic hits the homepage logo block.
23. Flesh out `/privacy` and `/terms` beyond placeholders if counsel requires it before SEM spend.

### G. SEM launch (only after A + landing-page QA)
24. Build campaign from `roadmap/SEM_Campaign_Prep.md` in Google Ads UI.
25. Landing URL: `https://paytonix.net/revenue-data-integrity-assessment` only.
26. Exact + phrase match first; apply full negative list.
27. Optimize to `qualified_lead`, not raw form submit.
28. Weekly search-terms review for first 30 days.

### H. Optional product / funnel upgrades
29. CRM (HubSpot / Attio / etc.) to replace Formspree-only lead handling.
30. Explicit purchase / invoice event for `assessment_purchased`.
31. Additional cornerstone articles (second / third topics for topical authority).
32. FAQ expansion from real sales objections once calls start.

---

## 8. Known gotchas (do not regress)

1. **Redirect loop:** Vercel “Redirect apex → www” + Next.js “www → apex” = `ERR_TOO_MANY_REDIRECTS`. Apex must be primary; www redirects to apex.
2. **Preview noindex:** Missing `VERCEL_ENV=production` in CI can fail Lighthouse `is-crawlable`. Production Vercel deployments are fine.
3. **Canonical drift:** Always change URLs in `src/lib/site.ts`, not scattered strings.
4. **Ad claim parity:** Any price/timeline/scope change on the assessment page must update SEM copy in the same PR.
5. **Params are Promises** in this Next.js version — `insights/[slug]/page.tsx` must `await params`.

---

## 9. Suggested prompts for further optimization (ChatGPT / Cursor)

Copy/paste as needed:

**Technical SEO next pass**
> Given the Paytonix implementation handoff, propose a prioritized 2-week technical SEO backlog focused on Core Web Vitals, internal linking, and crawl efficiency. Assume Next.js App Router on Vercel. Do not change positioning or invent claims.

**AEO / content**
> Propose the next 5 cornerstone articles for Paytonix’s Revenue Data Reliability offer. Each should include: search intent, target query cluster, outline matching the existing ArticleTemplate sections, internal links to assessment/about/home, and FAQ candidates suitable for FAQPage schema. No fabricated case-study metrics.

**SEM**
> Review `SEM_Campaign_Prep.md` and suggest match-type experiments, RSA asset tests, and a conversion-tracking plan that uses `qualified_lead` instead of form fills. Stay ethical: no urgency, no unsupported savings claims, no competitor bidding by name unless I opt in.

**Conversion rate**
> Critique `/revenue-data-integrity-assessment` for B2B RevOps / growth buyers. Suggest copy and UX changes that improve qualified assessment requests without adding dashboard clutter or fake social proof.

**Measurement**
> Design the minimum viable GA4 + Google Ads conversion architecture for Paytonix with Formspree today and a future CRM. Include event taxonomy, naming, and what not to optimize paid search on yet.

---

## 10. One-line status

Sprints 1–4 of the SEO/AEO/SEM checklist are **implemented and live** on `paytonix.net`; SEM is **prepped but not launched**; remaining work is mostly **account ops** (GA4, Search Console, Rich Results validation, production CWV, CRM-qualified conversions) plus content/trust follow-ups.
