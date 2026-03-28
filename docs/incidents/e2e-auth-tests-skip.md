# Incident: E2E Auth Tests Skip

**Symptom:** You run `pnpm test` (Playwright), but the auth-dependent tests unexpectedly mark themselves as "skipped" instead of passing or failing.
**Time to execute:** 1 minute.
**Goal:** Verify local `.env` setup and ensure the Supabase test users actually exist.

---

### 1. Confirm the Skip
- [ ] Check the terminal output from Playwright.
- [ ] Are *only* the tests inside `test.describe('authenticated')` skipping, while public routes like `/login` still pass?

### 2. Verify Environment Variables
- [ ] Open `.env.local` (or GitHub Actions Secrets if this is CI).
- [ ] Confirm you have explicitly set:
  - `PLAYWRIGHT_TEST_USER_EMAIL`
  - `PLAYWRIGHT_TEST_USER_PASSWORD`
  - `PLAYWRIGHT_ADMIN_EMAIL`
  - `PLAYWRIGHT_ADMIN_PASSWORD`
- [ ] The testing suite intentionally skips if these are empty to prevent pipeline noise.

### 3. Verify Database Users Exist
- [ ] Open Supabase -> Authentication -> Users (for your local or staging project).
- [ ] Do those exact email addresses actually exist in the database?
- [ ] Can you log in to those accounts manually via `localhost:3000/login`?

### 4. Re-Seed & Retry
- [ ] If the users do not exist, follow the [Local Test Seed Workflow](../local-test-seed-workflow.md) to generate them.
- [ ] Run `pnpm test` again.

---

### Stop Conditions & Next Steps
- **Rollback / Reseed:** Do not merge a PR while tests are skipping. The [Merge Policy](../merge-policy.md) requires these tests to explicitly *pass*. Reseed your database.
- **Escalate:** If the env vars are populated and the users exist, but the test runner itself crashes during the auth setup hook, start a [Postmortem](../postmortem-template.md) on test flakiness.
- **Communicate:** If CI behaves differently from local tests using the same DB, you likely have a missing secret in GitHub Actions. Refer to [Testing Limitations](../testing-limitations.md).
