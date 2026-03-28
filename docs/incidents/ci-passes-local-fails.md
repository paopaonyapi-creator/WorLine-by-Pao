# Incident: CI Passes But Local Fails (or vice versa)

**Symptom:** A pull request shows a green checkmark in GitHub Actions, but running the exact same `pnpm test` or `pnpm typecheck` locally fails. (Or the reverse).
**Time to execute:** 1 minute.
**Goal:** Isolate environment variable drift, seed data discrepancies, or hidden local cache issues.

---

### 1. Identify the Exact Command
- [ ] What exactly failed? (`test:e2e`, `typecheck`, `lint`, or `build`?)
- [ ] If it's a typecheck/lint error, it's likely a stale local `.next` cache or an uncommitted file. Run `pnpm install` and try again.

### 2. Compare Environments
- [ ] Open `.env.local` on your machine.
- [ ] Open GitHub -> Settings -> Secrets and Variables -> Actions.
- [ ] Are the Supabase URL, Anon Key, and Playwright Test Emails identical?

### 3. Verify the Test Target
- [ ] Are your local E2E tests pointing at `localhost:3000` while GitHub is testing a deployed preview URL?
- [ ] If pointing to the same Supabase instance, [did someone recently wipe the test users](../local-test-seed-workflow.md)?

### 4. Headless vs. Headed
- [ ] Does the test pass locally when you run it *with* the browser UI, but fail in `--headless` mode (which CI uses)? This is a known issue. See [Testing Limitations](../testing-limitations.md).

---

### Stop Conditions & Next Steps
- **Sync Env:** If GitHub is missing a secret that you just added locally, add it to GitHub immediately and re-run the action.
- **Re-Seed:** If the CI test users randomly vanished from the database, re-seed the DB and run the suite again. Do not merge until it passes. (See [Merge Policy](../merge-policy.md)).
- **Escalate:** If the exact same commit, with the exact same variables, consistently passes local headless testing but crashes in GitHub Actions, start a [Postmortem](../postmortem-template.md) on container drift or Node versioning limits.
