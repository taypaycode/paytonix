# Paytonix deploy and rollback

Production host: [paytonix.net](https://paytonix.net) (Vercel, branch `main`).

## Before each production deploy

1. Copy HubSpot public env vars from `.env.local` into the Vercel project:
   - `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
   - `NEXT_PUBLIC_HUBSPOT_ASSESSMENT_FORM_ID`
   - `NEXT_PUBLIC_HUBSPOT_MARTECHOS_BETA_FORM_ID`
2. Run locally:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
3. Push to `main` — Vercel deploys automatically.

## Rollback (safe, ~30 seconds)

**Preferred — Vercel instant rollback (no git rewrite):**

1. Vercel → Project → Deployments
2. Find the last known-good deployment
3. ⋯ → **Promote to Production**

**Git rollback (when you need the branch to match prod):**

```bash
git revert <bad-commit-sha>
git push origin main
```

Vercel will deploy the revert commit. Do not force-push `main`.

## Post-deploy smoke test

Automated wiring check (no test contact created):

```bash
npm run smoke:prod
```

Manual end-to-end (creates real CRM contacts):

1. Submit the assessment form at `/revenue-data-integrity-assessment#request-assessment`
2. Submit the beta form at `/martechos#beta-interest`
3. In HubSpot → Marketing → Forms, confirm both submission counters increment
4. Confirm new contacts have `paytonix_lead_source` and `paytonix_customer_type` set
