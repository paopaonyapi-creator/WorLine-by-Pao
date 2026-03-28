---
name: Bug Report / Regression 🐛
about: Report a breakage in Auth, Billing, Editor, Export, or Deploy.
title: 'bug(area): short description'
labels: 'bug, triage'
assignees: ''

---

## Area Affected

<!-- Delete the ones that do not apply -->

- **Auth / Admin** — middleware redirect loop, session invalid, admin gating wrong
- **Billing / Stripe** — checkout 500, webhook not delivering, wrong subscription status
- **Editor / Canvas / Export** — save fails, PNG/PDF export broken, canvas crash
- **Deploy / Infrastructure** — `/api/health` 500, Railway build fail, env vars missing
- **Responsive / App Shell** — mobile nav broken, layout shift, viewport issue
- **Docs / DX** — outdated runbook, wrong command, stale checklist

## Severity

<!-- Pick one -->

- [ ] 🔴 **Critical** — auth, billing, or deploy is broken in production
- [ ] 🟡 **Major** — feature broken but workaround exists
- [ ] 🟢 **Minor** — cosmetic, docs, or edge case

## Expected Behavior

<!-- What should have happened? -->

## Actual Behavior

<!-- What actually happened? Include exact error codes, HTTP status, or console output. -->

## Reproduction Steps

1. Go to '...'
2. Click on '...'
3. See error

---

## Regression Checklist

<!-- Check each item you have verified. Leave unchecked if not applicable or not tested. -->

### Auth & Routing
- [ ] `/api/health` returns HTTP 200
- [ ] `/app` redirects to `/login` when logged out (not a raw 500)
- [ ] `/app` does not redirect to `/misconfigured` with valid env vars
- [ ] `/admin` correctly rejects non-admin users (redirects to `/app`)

### Billing & Stripe
- [ ] Checkout button generates a Stripe session URL (no 500)
- [ ] Stripe webhook shows `200 OK` in Developers → Webhooks → Recent deliveries
- [ ] `subscriptions` table row has correct `status` and `current_period_end`

### Editor & Export
- [ ] Editor save writes to `projects` table without errors
- [ ] PNG export completes on Desktop Chrome
- [ ] PDF export completes on Desktop Chrome
- [ ] Issue occurs on mobile viewports only / CI only / everywhere (specify)

---

## Environment

- **Stage:** <!-- Local Turbopack / CI Pipeline / Railway Production -->
- **Browser / Device:** <!-- e.g. Chrome 125 / iPhone 15 Safari / Headless Chromium -->
- **Viewport:** <!-- Desktop / Mobile / Both -->
- **Relevant `.env` context:** <!-- e.g. STRIPE_WEBHOOK_SECRET missing — do NOT paste actual secrets -->

## Logs / Screenshots

<!-- Drop browser console output, Railway deploy logs, Stripe webhook delivery screenshots, or Network tab results here. -->

---

> **Before filing:** check the [Troubleshooting Shortcuts](../../docs/troubleshooting-shortcuts.md) table — your issue may have a known first-action fix.
