# WorLine Repository Handoff Summary

If you are returning to this repository after 2 months away or preparing to scale development, read this document first. It summarizes exact architecture boundaries and testing paradigms so you do not accidentally overwrite critical production safety nets.

## What This App Is
WorLine is a professional single-line diagram editor built for electrical engineers. It combines a heavy client-side React canvas (Konva) with a secure, server-side-protected dashboard and billing boundary seamlessly.

## Core Stack
- **Framework:** Next.js 16 (App Router)
- **Database/Auth:** Supabase (PostgreSQL + RLS)
- **Monetization:** Stripe (Checkout + Server-side Webhooks)
- **Drawing Engine:** `react-konva`
- **Testing:** Playwright (E2E) + Vitest (Unit)

---

## 🏗️ Key Architecture Boundaries

If you are modifying any of these files, perform extreme manual UI checking:
- **Authentication & Middleware:** `src/lib/supabase/middleware.ts` 
  - *Rule:* If environment variables are missing, this file forcefully bounces the entire application to `/login` or `/misconfigured`. Do not loosen these redirects.
- **Admin Gating:** Handled securely inside components by validating the active user's email against `process.env.ADMIN_EMAILS` (e.g., in `/app/(dashboard)/admin/...`).
- **Billing Checkout:** `src/app/api/checkout/route.ts`
  - *Rule:* The `userId` and `email` payload strictly comes from `supabase.auth.getUser()` server-side, entirely overriding maliciously intercepted client REST payloads.
- **Editor Workspace:** `src/components/editor/EditorWorkspace.tsx`
  - *Rule:* Handles massive JSON object state bindings via Zustand. Saving pushes Stringified JSON representations to Supabase's `projects` table.

---

## 🔐 Most Important Environment Variables
If your `.env.local` or Railway lacks these, tests skip and logic crashes:
1. `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. `SUPABASE_SERVICE_ROLE_KEY` *(Admin bypass for webhooks)*
3. `ADMIN_EMAILS` *(Security allowlist)*
4. `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`
5. `PLAYWRIGHT_TEST_USER_EMAIL` *(Required for E2E bounds)*

---

## 🛠️ Most Important Commands
- `pnpm dev` – Starts localized Next16 Turbopack server.
- `pnpm test` – Runs raw isolated vitest logic (Billing parsers + Config hooks).
- `pnpm test:e2e` – Boots the heavy headless Playwright bot. *(Will skip authenticated tests if `.env.local` lacks Playwright emails!)*

---

## 🚨 First Places to Debug Common Issues
If production is failing, start here:
1. **App redirects endlessly to `/login`?** Your Supabase token expired or your layout `<Suspense>` boundary is blowing up Auth hooks. Look at your local `.env`.
2. **"Active" badge doesn't appear after subscribing?** Check your Stripe Dashboard Webhook logs. If they return `500`, your `STRIPE_WEBHOOK_SECRET` mismatch is dropping the payload before Supabase registers the event.
3. **Konva canvas throws missing reference errors?** The user is likely on Mobile, or the `pdf-lib` script timed-out exporting a massive JSON payload securely.

---

## 📖 What is Still Intentionally Manual
- **Automating Stripe Checkouts:** E2E tests halt exactly at `checkout.stripe.com` to prevent generating massive anti-fraud limits locally.
- **Canvas Visual Validation:** Playwright cannot accurately read PDF binaries or perfectly validate SVG spacing coordinates. Visual exports must always be asserted via the [Manual QA Matrix](manual-qa-matrix.md).

---

## 🗺️ Most Important Docs to Read First
When modifying code bounds and pushing drops, leverage the following workflow continuously:
1. Open the **[Documentation Index](index.md)**.
2. Read the **Local Test Seed Workflow** to regain test user access.
3. Consult the **Rollout & Rollback Plan** before clicking "Deploy".
