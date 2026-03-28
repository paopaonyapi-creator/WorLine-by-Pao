## Summary

<!-- One or two sentences. What does this PR change and why? -->

## Area Affected

<!-- Delete the ones that do not apply -->

- **Auth / Admin** — middleware, session, admin gating
- **Billing / Stripe** — checkout, webhook, billing page
- **Editor / Canvas / Export** — drawing engine, save, PNG/PDF export
- **Responsive / App Shell** — layouts, mobile nav
- **Docs / DX** — runbook, checklists, guides
- **Release / Deploy / CI** — env vars, workflows, Dockerfile

## Risk Level

<!-- Pick one -->

- [ ] 🟢 Low — docs, typo fix, dev tooling only
- [ ] 🟡 Medium — UI change, new component, test update
- [ ] 🔴 High — touches middleware, checkout, webhook, editor save, or env config

## What Was Tested

<!-- Describe what you ran and what you verified. Be honest — skipped tests are fine if noted. -->

---

## Pre-Merge Checks

### Always

- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] No unrelated files changed

### If you touched Auth / Admin

- [ ] `/app` redirects to `/login` correctly when logged out
- [ ] `/app` does not redirect to `/misconfigured` with valid env
- [ ] `/admin` redirects non-admin users to `/app`
- [ ] Checked `src/lib/supabase/middleware.ts` impact

### If you touched Billing / Stripe

- [ ] Checkout button generates a valid Stripe session URL
- [ ] Webhook endpoint returns 200 on test delivery
- [ ] Billing page status badge reflects `subscriptions` table correctly
- [ ] Checked `src/app/api/checkout/route.ts` and `src/app/api/stripe/webhook/route.ts`

### If you touched Editor / Export

- [ ] Editor save writes to `projects` table without RLS errors
- [ ] PNG export completes on Desktop Chrome
- [ ] PDF export completes on Desktop Chrome
- [ ] Checked `src/components/editor/EditorWorkspace.tsx`

### If you touched env or deploy logic

- [ ] `.env.example` updated if a new variable was added
- [ ] Railway variables reviewed against `.env.example`
- [ ] `/api/health` returns 200 after deploy

### If behavior changed

- [ ] Relevant docs updated (runbook, checklist, troubleshooting, etc.)
- [ ] `pnpm test:e2e` passes (if auth/billing flows affected)

---

## Screenshots / Logs

<!-- Optional. Drop browser console output, Stripe delivery logs, or before/after screenshots here. -->

---

> **Docs:** [Maintainer Guide](../MAINTAINERS.md) · [Troubleshooting Shortcuts](../docs/troubleshooting-shortcuts.md) · [Production Runbook](../docs/production-runbook.md)
