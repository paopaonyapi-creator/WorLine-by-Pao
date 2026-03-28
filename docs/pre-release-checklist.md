# WorLine Pre-Release Checklist

This checklist is designed for a lightweight, solo-maintainer workflow. Run through these steps before generating a new release tag or deploying to the production environment.


## 1. Automated Validation (CI/Local)
- [ ] `pnpm lint` – Ensures no new style/syntax violations.
- [ ] `pnpm typecheck` – Verifies TypeScript compiler integrity.
- [ ] `pnpm test` – Passes all local unit tests (Billing helpers, Webhooks, Env resets).
- [ ] `pnpm test:e2e` – Passes all Playwright E2E flows (`auth`, `authenticated`, `editor-desktop`, `editor-mobile`).
  *(See [Testing Limitations](testing-limitations.md) for expected CI skips or flaky scenarios)*

## 2. Manual Smoke Tests
*(See [Manual QA Matrix](manual-qa-matrix.md) for full scenario tables)*

- [ ] **Verify `/api/health`** – Returns `200 OK` safely in your target environment.
- [ ] **Verify Auth Flow** – Log out, log in, confirm correct redirection.
- [ ] **Verify `/admin` Behavior** – Non-admins are blocked; explicit admins can view the dashboard.
- [ ] **Verify Billing Checkout** – Stripe redirects cleanly; session returns successfully.
- [ ] **Verify Webhook Delivery** – Stripe logs show `200 OK` for subscriptions (check Stripe Dashboard > Developers > Webhooks).
- [ ] **Verify Editor Save/Export Paths** – Open a populated workspace, click Save (expect toast), Export PNG/PDF (expect successful file download).

## 3. Version Bump
- [ ] Bump version in `package.json`.
- [ ] Run `pnpm install` if the lockfile needs syncing.
- [ ] The app automatically references `package.json` via `src/lib/app-meta.ts`. No extra hardcoding needed!

## 4. Release Notes
- [ ] Copy the template from `docs/release-template.md`.
- [ ] Draft notes.
- [ ] Commit as `chore(release): vX.X.X` and push tag!
