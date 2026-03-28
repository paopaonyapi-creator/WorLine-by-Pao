# Troubleshooting Shortcuts

When something breaks, start here. Find the symptom, check the file, open the dashboard.

## Quick Triage Table

| Symptom | Likely Area | First File to Check | First Dashboard / Tool | First Action |
|---------|-------------|---------------------|------------------------|--------------|
| `/api/health` returns 500 | Deploy | `src/app/api/health/route.ts` | Railway → Deployments → Logs | Check if the build completed. Redeploy if the previous deployment was healthy. |
| `/app` redirects to `/login` unexpectedly | Auth | `src/lib/supabase/middleware.ts` | Supabase → Authentication → Users | Confirm your session token is valid. Check if `.env.local` has both Supabase keys set. |
| `/app` redirects to `/misconfigured` | Env Config | `src/lib/supabase/middleware.ts` | Railway → Variables | One or more required env vars are missing. Compare against `.env.example`. |
| `/admin` redirects to `/app` | Admin Gating | `src/app/app/(dashboard)/admin/layout.tsx` | Railway → Variables → `ADMIN_EMAILS` | Confirm your email is in the comma-separated list with no extra spaces. |
| Checkout returns 500 | Billing | `src/app/api/checkout/route.ts` | Stripe → Developers → Logs | Check if `STRIPE_SECRET_KEY` and `STRIPE_PRO_PRICE_ID` are set and valid. |
| Webhook not updating subscription | Billing | `src/app/api/stripe/webhook/route.ts` | Stripe → Developers → Webhooks → Recent deliveries | Confirm `STRIPE_WEBHOOK_SECRET` matches. Check for 400/500 responses in the delivery log. |
| Billing page shows wrong status badge | Billing | `src/app/app/(dashboard)/settings/billing/page.tsx` | Supabase → Table Editor → `subscriptions` | Query the `subscriptions` table for the user's row. Verify `status` and `current_period_end`. |
| Editor save fails | Editor | `src/components/editor/EditorWorkspace.tsx` | Supabase → Table Editor → `projects` | Check browser console for Supabase RLS errors. Confirm the user owns the project row. |
| PNG/PDF export fails | Editor | `src/components/editor/EditorWorkspace.tsx` | Browser → Console | Usually a `pdf-lib` timeout or canvas `toDataURL` error. Try on Desktop Chrome first. See [Testing Limitations](testing-limitations.md). |
| Mobile nav or app shell breaks | Responsive | `src/app/app/(dashboard)/layout.tsx` | Browser → DevTools → Toggle Device | Check if `<SheetTrigger>` renders. Compare against the [Manual QA Matrix](manual-qa-matrix.md). |
| E2E auth tests skip unexpectedly | Testing | `tests/e2e/helpers/seed.ts` | Terminal → `.env.local` | Confirm `PLAYWRIGHT_TEST_USER_EMAIL` is set. See [Local Seed Workflow](local-test-seed-workflow.md). |
| CI passes but local fails (or vice versa) | Testing | `.github/workflows/ci.yml` | GitHub → Actions → Latest run | Compare env vars between local `.env.local` and CI secrets. See [Testing Limitations](testing-limitations.md). |

## When This Table Is Not Enough

For extended recovery procedures, consult the [Production Runbook](production-runbook.md).
For deployment-specific rollback logic, consult the [Rollout Plan](releases/v0.2.0-rollout.md).
