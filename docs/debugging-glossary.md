# Debugging Glossary

Quick reference for platform-specific terms and repo jargon used throughout the WorLine docs and codebase. One or two lines per term — just enough to orient you during debugging.

---

## Supabase & Auth

| Term | What it means here |
|------|--------------------|
| **Supabase** | Hosted Postgres + auth + storage backend. All user sessions, project data, and subscription rows live here. Dashboard: `app.supabase.com`. |
| **Anon key** | `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Public client-side key with RLS-restricted access. Safe to expose in the browser. Set in `.env.local` and Railway. |
| **Service role key** | `SUPABASE_SERVICE_ROLE_KEY`. Server-only key that bypasses RLS. Never expose to the client. Used in webhook handlers and admin server components. |
| **RLS** | Row Level Security. Postgres policies that restrict which rows a user can read/write. If a save or read fails for one user but works for another, check RLS policies in Supabase → Authentication → Policies. |
| **Middleware** | `src/lib/supabase/middleware.ts`. The Next.js middleware that checks env vars and session state on every request. Redirects to `/misconfigured` (missing env) or `/login` (no session). |
| **Seed user** | A pre-created test account (`PLAYWRIGHT_TEST_USER_EMAIL` / `_PASSWORD`) used by E2E tests. Created manually via the [Local Seed Workflow](local-test-seed-workflow.md), not programmatically. |
| **GoTrue** | Supabase's auth service. Rate-limits programmatic signups, which is why we use seed users instead of creating accounts in tests. |

## Stripe & Billing

| Term | What it means here |
|------|--------------------|
| **Stripe Checkout Session** | A server-generated payment URL. Created in `src/app/api/checkout/route.ts` using the authenticated `user.id`. The client never touches payment credentials. |
| **Webhook** | Stripe POSTs events to `src/app/api/stripe/webhook/route.ts` after payment. The handler writes subscription data to Supabase. Verify delivery in Stripe → Developers → Webhooks. |
| **`STRIPE_WEBHOOK_SECRET`** | Starts with `whsec_`. Used to verify webhook signatures. If this is wrong or missing, webhook deliveries return 400/500. |
| **`STRIPE_PRO_PRICE_ID`** | The specific Stripe price object used for the Pro plan. Must match an active product in the Stripe catalogue. |
| **Subscription status** | The `status` column in the `subscriptions` table. Values: `active`, `canceled`, `past_due`, etc. The billing page badge reads directly from this row. |

## Editor & Canvas

| Term | What it means here |
|------|--------------------|
| **Konva** | HTML5 Canvas library used via `react-konva`. Renders all diagram shapes in `src/components/editor/EditorWorkspace.tsx`. Not DOM-based — Playwright cannot click individual shapes. |
| **Zustand** | Lightweight state manager. The editor stores all shape/polygon data in a Zustand store, which is serialized to JSON on save and written to the `projects` table's `canvas_data` column. |
| **`pdf-lib`** | Client-side PDF generation library. Converts canvas `toDataURL()` output into a downloadable PDF. Can timeout in resource-constrained environments (CI, mobile). |
| **Canvas `toDataURL`** | Browser API that exports the Konva stage as a PNG data string. Fails silently on tainted canvases or cross-origin images. |

## Deploy & Infrastructure

| Term | What it means here |
|------|--------------------|
| **Railway** | Hosting platform. Builds and deploys from `master`. Environment variables are set in Railway → Variables. Logs are in Railway → Deployments. |
| **Railway variables** | The production equivalent of `.env.local`. Must stay in sync with `.env.example`. Missing variables cause `/misconfigured` redirects. |
| **`/api/health`** | Health check endpoint at `src/app/api/health/route.ts`. Returns 200 if the build is running. First thing to check after any deploy. |
| **Rollout** | The process of deploying a new version to production. Follows the [Rollout Plan](releases/v0.2.0-rollout.md) with 5-minute success criteria. |
| **Rollback** | Reverting to the last stable deployment via Railway → History → Revert. Used when a deploy breaks auth or billing. |

## Testing & CI

| Term | What it means here |
|------|--------------------|
| **Smoke test** | A shallow test that verifies a feature loads without crashing. Our Stripe E2E tests are smoke tests — they confirm the checkout URL generates but do not complete payment. |
| **E2E test** | End-to-end Playwright test in `tests/e2e/`. Runs a real browser against the app. Requires seed users in `.env.local`. |
| **CI vs local** | GitHub Actions CI runs without Supabase/Stripe secrets by default. Tests that need `PLAYWRIGHT_TEST_USER_EMAIL` skip gracefully in CI unless secrets are configured. See [Testing Limitations](testing-limitations.md) §1. |
| **Flaky test** | A test that passes sometimes and fails others. Common with canvas exports and PDF generation in headless Chrome. See [Testing Limitations](testing-limitations.md) §3. |

---

> **Still confused?** Most terms map directly to a file or dashboard. Check the [Troubleshooting Shortcuts](troubleshooting-shortcuts.md) table for the exact lookup.
