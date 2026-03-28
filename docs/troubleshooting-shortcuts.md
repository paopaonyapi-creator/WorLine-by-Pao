# Troubleshooting Shortcuts

When something breaks, start here. Find the symptom, check the file, open the dashboard.
This is a fast triage layer — not a deep runbook. Fix the obvious cause in two minutes or escalate.

## How to Use This Table

1. Scan the **Symptom** column for your situation.
2. Open the **First File** in your editor.
3. Open the **First Dashboard / Tool** in your browser.
4. Execute the **First Action**.
5. If the issue persists, follow the linked doc in the row or jump to [When This Table Is Not Enough](#when-this-table-is-not-enough).

---

## Quick Triage Table

| # | Symptom | Likely Area | First File to Check | First Dashboard / Tool | First Action |
|---|---------|-------------|---------------------|------------------------|--------------|
| 1 | `/api/health` returns 500 | Deploy | `src/app/api/health/route.ts` | Railway → Deployments → Logs | Check if the build completed. Redeploy if the previous deployment was healthy. See **[Downtime Plays](incidents/api-health-returns-500.md)**. |
| 2 | `/app` redirects to `/login` unexpectedly | Auth | `src/lib/supabase/middleware.ts` | Supabase → Authentication → Users | Confirm your session token is valid. See **[Auth Loop Plays](incidents/app-redirects-to-login.md)**. |
| 3 | `/app` redirects to `/misconfigured` | Env Config | `src/lib/supabase/middleware.ts` | Railway → Variables | One or more required env vars are missing. See **[Redirect Plays](incidents/app-redirects-to-misconfigured.md)**. |
| 4 | `/admin` redirects to `/app` | Admin Gating | `src/app/app/(dashboard)/admin/layout.tsx` | Railway → Variables → `ADMIN_EMAILS` | Confirm your email is in the comma-separated list with no extra spaces. See **[Admin Plays](incidents/admin-access-fails.md)**. |
| 5 | Checkout returns 500 | Billing | `src/app/api/checkout/route.ts` | Stripe → Developers → Logs | Check `STRIPE_SECRET_KEY` and `STRIPE_PRO_PRICE_ID`. See **[Checkout Plays](incidents/checkout-returns-500.md)**. |
| 6 | Webhook not updating subscription | Billing | `src/app/api/stripe/webhook/route.ts` | Stripe → Developers → Webhooks → Recent deliveries | Confirm `STRIPE_WEBHOOK_SECRET` matches. See **[Billing Plays](incidents/billing-still-free-after-payment.md)**. |
| 7 | Billing page shows wrong status badge | Billing | `src/app/app/(dashboard)/settings/billing/page.tsx` | Supabase → Table Editor → `subscriptions` | Query the `subscriptions` table for the user's row. Verify `status`. See **[Badge Plays](incidents/billing-status-badge-wrong.md)**. |
| 8 | Editor save fails | Editor | `src/components/editor/EditorWorkspace.tsx` | Supabase → Table Editor → `projects` | Check browser console for Supabase RLS errors. Confirm user owns project. See **[Save Plays](incidents/editor-save-fails.md)**. |
| 9 | PNG/PDF export fails | Editor | `src/components/editor/EditorWorkspace.tsx` | Browser → Console | Usually a `pdf-lib` timeout or canvas `toDataURL` error. See **[Export Plays](incidents/export-fails-png-pdf.md)**. |
| 10 | Mobile nav or app shell breaks | Responsive | `src/app/app/(dashboard)/layout.tsx` | Browser → DevTools → Toggle Device | Check if `<SheetTrigger>` renders. See **[Responsive Plays](incidents/mobile-nav-or-app-shell-breaks.md)**. |
| 11 | E2E auth tests skip unexpectedly | Testing | `tests/e2e/helpers/seed.ts` | Terminal → `.env.local` | Confirm `PLAYWRIGHT_TEST_USER_EMAIL` and `_PASSWORD` are set. See **[E2E Plays](incidents/e2e-auth-tests-skip.md)**. |
| 12 | CI passes but local fails (or vice versa) | Testing | `.github/workflows/ci.yml` | GitHub → Actions → Latest run | Compare env vars. See **[Sync Plays](incidents/ci-passes-local-fails.md)** |

---

## When This Table Is Not Enough

- **Extended recovery procedures** → [Production Runbook](production-runbook.md)
- **App is offline / 500 errors** → [Incident: /api/health Returns 500](incidents/api-health-returns-500.md)
- **Checkout returns 500** → [Incident: Checkout Returns 500](incidents/checkout-returns-500.md)
- **User stuck on Free after paying** → [Incident: Billing Says Free](incidents/billing-still-free-after-payment.md)
- **Webhooks failing (400)** → [Incident: Webhooks Return 400](incidents/webhook-deliveries-return-400.md)
- **App redirects to /misconfigured** → [Incident: Redirect to Misconfigured](incidents/app-redirects-to-misconfigured.md)
- **App redirects to /login** → [Incident: Redirect to Login](incidents/app-redirects-to-login.md)
- **Billing badge shows wrong plan** → [Incident: Billing Badge Wrong](incidents/billing-status-badge-wrong.md)
- **Admin access denied** → [Incident: Admin Access Fails](incidents/admin-access-fails.md)
- **Editor save fails** → [Incident: Editor Save Fails](incidents/editor-save-fails.md)
- **PNG/PDF export fails** → [Incident: Export Fails](incidents/export-fails-png-pdf.md)
- **Mobile nav breaks** → [Incident: Mobile Nav Breaks](incidents/mobile-nav-or-app-shell-breaks.md)
- **E2E auth tests skip** → [Incident: E2E Tests Skip](incidents/e2e-auth-tests-skip.md)
- **CI vs Local checks differ** → [Incident: CI vs Local Fails](incidents/ci-passes-local-fails.md)
- **Deployment-specific rollback logic** → [Rollout Plan](releases/v0.2.0-rollout.md)
- **Full architecture context** → [Architecture Map](architecture-map.md)
- **Test seed setup** → [Local Test Seed Workflow](local-test-seed-workflow.md)
- **Pre-deploy sanity checks** → [Pre-Release Checklist](pre-release-checklist.md)
- **Codebase orientation** → [Maintainer Guide](../MAINTAINERS.md)

## Symptoms That Require Deeper Manual Investigation

Some issues cannot be resolved from a single file or dashboard:

- **Canvas visual fidelity bugs** — Playwright cannot validate Konva pixel output. Requires manual visual comparison on the actual device. Start with the [Manual QA Matrix](manual-qa-matrix.md).
- **Stripe anti-fraud lockouts** — Repeated test checkouts trigger Stripe's fraud detection. No code fix; wait and rotate test card numbers. See [Testing Limitations](testing-limitations.md) §4.
- **Supabase RLS policy mismatches** — If a save/read works for one user but not another, the issue is in Supabase's Row Level Security policies, not application code. Inspect policies directly in Supabase → Authentication → Policies.
- **Railway memory/CPU limits** — If the app randomly crashes under load, check Railway → Metrics. No code-level fix; increase the resource plan or optimize the build.
