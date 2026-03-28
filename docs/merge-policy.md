# Merge Policy

This is the lightweight merge policy for the `master` branch. It is designed to keep the repository deployable at all times without bogging down solo maintainers or small teams in heavy process. No enterprise approval matrices—just simple, common-sense guardrails.

---

## 1. The Golden Rule
**`master` must ALWAYS be deployable.**
Do not merge code into `master` if it is known to be broken, incomplete, or fails type-checking.

## 2. Direct Pushes vs. Pull Requests

- **Direct Pushes:** Allowed for safe, minor changes (e.g., typos in README, label color updates, isolated CSS tweaks on non-critical pages).
- **Pull Requests:** **Required** for any changes touching the repository's high-risk areas: Auth/Admin, Billing/Stripe, Editor/Canvas, or CI/Deploy configurations. Use a branch and review the [PR Checklist](.github/pull_request_template.md).

## 3. Mandatory Pre-Merge Checks

Before a PR can be merged—or before safety-checking a direct push—the following must pass locally or in CI:
1. **TypeScript Compilation:** `pnpm typecheck` must pass.
2. **Unit Tests:** `pnpm test` must pass.

## 4. When to Run Heavy Tests

If your changes modify middleware (`src/lib/supabase/middleware.ts`), the checkout route (`src/app/api/checkout/route.ts`), or the editor state, you **must** manually run or verify the E2E suite (`pnpm test:e2e`). 

Since E2E tests often require seeded mock accounts and Stripe fake-cards, it is understood that this depends heavily on human judgment rather than fully automated bots.

## 5. Documentation Requirements

If you change how the system behaves, you must update the docs in the same PR.
- Changed a webhook secret name? Update `railway.json` and the [Runbook](production-runbook.md).
- Added a new label? Update the [Triage Taxonomy](triage-taxonomy.md).
- Edited a core concept? Update the [Debugging Glossary](debugging-glossary.md).

## 6. Merge Strategy
- **Prefer Squash Merging.**
Squash all commits in a PR into a single, well-titled commit when merging. This creates a clean, linear git history that is immensely easier to audit during postmortems or rollbacks. 

---

> If you are setting up this repository for the first time, see the [GitHub Setup Checklist](github-setup-checklist.md) for how to enforce these rules in the GitHub UI.
