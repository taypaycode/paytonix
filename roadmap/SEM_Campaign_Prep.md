# Paytonix — Ethical SEM Campaign Prep

Prepared to satisfy checklist section **P2 — Ethical SEM** (`Paytonix_SEO_AEO_SEM_Implementation_Checklist.md`, items 31–34).

This is a reference document for pasting into Google Ads — it does not create or modify any live campaign. No Google Ads account access was available to this agent, and no Google Ads MCP/API tool is configured in this workspace, so campaign creation itself remains a manual step (see `Manual steps` at the bottom).

## Prerequisites status (item 31)

| Prerequisite | Status |
| --- | --- |
| Dedicated assessment landing page | ✅ `/revenue-data-integrity-assessment` — built this session |
| Form + calendar flows work | ✅ `AssessmentForm` (Formspree) + Cal.com embed, reused on the dedicated page |
| Privacy disclosures accurate | ✅ `/privacy` describes actual data handling (no sale of personal data, form data used only to evaluate requests) |
| Qualified-lead / purchase outcomes measurable | ⚠️ Partial — GA4 funnel events are wired (`view_assessment`, `start_assessment_form`, `submit_assessment_form`, `book_qualification_call`, `qualified_lead`, `assessment_purchased` helpers exist in `src/lib/analytics.ts`), but `qualified_lead` and `assessment_purchased` require a manual trigger or CRM webhook — see the Completion Report for details. **Do not launch paid spend until at least `qualified_lead` firing is wired to a real workflow**, or you'll optimize Google Ads toward raw form-fills instead of real pipeline. |
| Negative keywords prepared | ✅ Below |
| Ad claims match landing-page claims | ✅ Ad copy below only uses claims already live on the assessment page ($3,500 starting price, 7–10 business days, one journey, fixed scope) |

## Campaign structure recommendation

One campaign, one ad group per theme, all traffic landing on `/revenue-data-integrity-assessment` (not the homepage). Start on exact + phrase match only, manual CPC or Maximize Conversions with a conservative cap once `qualified_lead` is flowing.

## Initial search themes (item 32)

Six tightly-scoped ad groups, one keyword theme each. Start exact + phrase match only.

| Ad group | Keywords (exact + phrase) |
| --- | --- |
| Revenue data audit | `[revenue data audit]`, `"revenue data audit"`, `[revenue data integrity audit]` |
| Marketing attribution audit | `[marketing attribution audit]`, `"marketing attribution audit"`, `[attribution audit]` |
| CRM data quality audit | `[crm data quality audit]`, `"crm data quality audit"`, `[crm data audit]` |
| Marketing data reconciliation | `[marketing data reconciliation]`, `"marketing data reconciliation"`, `[crm warehouse reconciliation]` |
| Customer journey data audit | `[customer journey data audit]`, `"customer journey data audit"` |
| Marketing data pipeline audit | `[marketing data pipeline audit]`, `"marketing data pipeline audit"`, `[marketing data pipeline reliability]` |

Review search-terms report weekly for the first month; promote genuinely converting queries to their own ad group, add everything else as negatives.

## Explicitly avoid bidding on (broad, low-intent)

Per checklist item 32 — these generate job-seeker, staff-augmentation, generic-dashboard, or DIY traffic:

```
data engineer
marketing dashboard
martech consultant
bigquery developer
fractional CTO
```

## Negative keyword list (item 33)

Add at the campaign level before launch:

**Jobs / careers**
`job, jobs, hiring, resume, salary, career, careers, internship`

**Education / certification**
`course, courses, certification, certificate, bootcamp, tutorial, training program, degree`

**Free / DIY**
`free, free template, template, download, open source, diy, how to build my own`

**Consumer analytics (wrong buyer)**
`google analytics for beginners, personal finance, instagram analytics, tiktok analytics`

**School / academic**
`assignment, homework, thesis, dissertation, case study example, syllabus`

**Generic dashboard software (wrong category)**
`tableau pricing, power bi pricing, looker pricing, dashboard software, bi tool comparison`

**Unsupported platforms/services**
`shopify` *(unless/until Shopify-specific expertise is confirmed)*, `wordpress analytics plugin`

**Staff augmentation / generic consulting**
`fractional cto, staff augmentation, contract developer, hire a developer, hourly rate`

Do **not** apply these negatives to organic content targeting or to the Insights articles — they're SEM-only exclusions based on paid commercial economics, not a signal that this content shouldn't rank organically.

## Ad copy (item 34 — ethical ad rules)

All claims below already appear on the live `/revenue-data-integrity-assessment` page. No fabricated urgency, no unsupported savings claims, no competitor mentions, no "free audit" language since the assessment is paid, no fake scarcity.

**Headlines (pick 3 per ad, Responsive Search Ads)**
- Revenue Data Integrity Assessment
- Is Your Revenue Data Actually Right?
- Trace One Journey, Ad to Revenue
- CRM vs. Warehouse Revenue Mismatch?
- Fixed Scope. Fixed Price. 7–10 Days.
- Attribution & Reconciliation Audit

**Descriptions**
- Trace one customer-to-revenue journey, find where attribution and reconciliation break, and get a prioritized fix list. Starting at $3,500.
- For growth, RevOps, and data leaders running multiple marketing, CRM, and warehouse systems. We'll tell you directly if it's not a fit.

**Final URL:** `https://paytonix.net/revenue-data-integrity-assessment`

**Display path:** `paytonix.net/assessment`

## Ethical rules checklist (item 34)

- [x] No fabricated urgency ("limited spots," countdown timers, etc.)
- [x] No unsupported savings/revenue-recovery claims (no "$X recovered" numbers — none exist yet)
- [x] No competitor names or comparisons
- [x] No "free audit" language — price is stated up front
- [x] No fake scarcity
- [x] Ad copy matches landing-page claims exactly (price, timeline, scope)
- [x] Optimization target is `qualified_lead`, not raw form-fills, once that event is wired to a real workflow

## Manual steps required (outside this agent's access)

1. Create/confirm the Google Ads account tied to conversion ID `AW-18177137190` (already wired into `src/lib/google-ads.ts` and `layout.tsx`).
2. Build the campaign/ad groups/keywords/negatives above directly in Google Ads UI (no Ads API/MCP access was available here).
3. Import the GA4 `qualified_lead` and `assessment_purchased` events as Google Ads conversion actions once the GA4 property exists and those events are wired to a real trigger (see Completion Report).
4. Set a conservative daily budget cap and manual or Maximize-Conversions bidding; review search terms weekly for the first month per item 32.
