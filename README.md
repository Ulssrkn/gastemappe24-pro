# Gastemappe24 Pro

## Local checks

Use Node 24 and run `npm ci`, `npm test` and `npm run build`. The tests apply the versioned migrations to an isolated PostgreSQL fixture and exercise guest reads, publishing, account isolation, deletion and analytics limits. For local browser testing, supply the variables in `.env.example` for a test Supabase environment.

## Pilot release

1. Match the active Vercel production deployment to a known source release before choosing the production branch. The production alias and GitHub `main` were serving different application versions during the audit.
2. Compare `supabase migration list` with the repository. The historical files mirror the applied SQL and version IDs. Rehearse against an isolated database. Create a backup, verify restoration in a separate environment, and record the previous Vercel deployment and Edge Function version before production changes.
3. Apply the new `pilot_security` migration to the target database, then deploy the `track-view` function. It permits unauthenticated requests but limits which published guest events it can record. Keep the service-role key server-side.
4. Configure Vercel with the matching Supabase URL and publishable key. Point the optional legal links at the operator's approved Impressum and privacy notice before the public pilot. Confirm the intended Auth redirect origins, email confirmation, reset email delivery, password policy and rate limits in the target project.
5. Deploy the frontend and test an existing QR URL on a phone without signing in. Test unpublished and expired guides, signup and password recovery, a second account in the same browser, creating and copying up to three properties, and a successful guest view reflected in analytics.

Draft saves are private. Use **Publish** to update the guest snapshot. Guest Wi-Fi credentials require explicit opt-in. Existing published snapshots retain their content and are filtered on read. Pilot media uploads are paused. Existing images stay available and can be removed.

For a rollback, promote the last **compatible** Vercel deployment and restore the prior Edge Function version if needed. Keep the filtered guest endpoint and database protections. A frontend that still uses the old `gm24_guest_pages` view is incompatible with this release. Rehearse rollback in the test environment and prepare a forward database fix if a production schema change needs correction. Avoid rewinding customer data as part of a routine code rollback.

For manual one-time licence activation, a verified project operator changes the account's `plan_code` to `single`, `multi` or `business` and sets `subscription_status` to `active` after checking the customer's entitlement. The requested package is advisory. Guests and property owners cannot activate it via the app.
