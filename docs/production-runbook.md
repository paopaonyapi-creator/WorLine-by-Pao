# WorLine Production Runbook

This runbook acts as the primary recovery and behavioral document for production deployment scenarios, specifically addressing Auth, Config, and Billing boundaries. 

## 1. Required Runtime Environments

If any of the following variables are missing in production (e.g., Railway Dashboard), **the application will intentionally fail-closed**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRO_PRICE_ID`

**Failure Symptom**: Requests to protected routes (`/app`, `/admin`) will immediately redirect to `/misconfigured`. Operations requiring Supabase clients inside server components will throw hard crashes. Webhooks will return explicit `500` missing secret errors. 

### Optional E2E Variables
- `PLAYWRIGHT_TEST_USER_EMAIL` / `_PASSWORD`: Validates non-admin boundaries locally. 
- `PLAYWRIGHT_TEST_ADMIN_EMAIL` / `_PASSWORD`: Validates admin dashboards locally.

## 2. Infrastructure Validation

### Validating Admin Emails
If your account should be an admin but `/admin` redirects you away:
1. Ensure your exact email string is included inside the `ADMIN_EMAILS` variable in Railway (comma-separated with no spaces).
2. Ensure you have fully authenticated. 

### Verify Webhook Delivery 
1. Open the Stripe Dashboard > Developers > Webhooks.
2. Select your registered endpoint.
3. After a successful checkout, verify `checkout.session.completed` appears with a `200 OK` status response. If it fails due to a signature error, your `STRIPE_WEBHOOK_SECRET` inside Railway is outdated.

### Supabase Storage Validation
After finishing a test checkout event, check your Supabase `subscriptions` table. A healthy webhook implementation will immediately populate:
- `user_id`
- `status` ('active')
- `stripe_price_id`
- `current_period_end`
- `cancel_at_period_end`

## 3. Railway Post-Deploy Checks

If Railway completes a deployment sequence, verify stability quickly:
- **Symptom:** Railway displays "Build Successful" but visiting the app throws 500s.
  **Fix:** Cross-check the "Variables" tab against `.env.example`. Check Health Endpoint `/api/health`.
- **Symptom:** `/app` forcibly routes you back to `/misconfigured` randomly.
  **Fix:** Your Supabase variables are stripped or missing from the production container. Re-apply them tightly and hit "Redeploy".
- **Symptom:** The Stripe Checkout button throws a 500 Server Error upon clicking.
  **Fix:** Ensure `STRIPE_PRO_PRICE_ID` is defined and explicitly matches the currently active product inside the Stripe catalogue.
- **Symptom:** Webhook returns missing secret errors inside the Stripe dashboard.
  **Fix:** `STRIPE_WEBHOOK_SECRET` is misconfigured. Ensure it begins with `whsec_`.

## 4. Rollback & Hotfix Protocols
1. If the current deployment fundamentally breaks authentication paths, execute an immediate rollback to the last stable commit directly from the Railway dashboard (History > Revert).
2. If billing architecture drops asynchronously, safely pause subscription marketing in frontend layouts locally, commit fixes without patching via dummy variables, and redeploy. Never mock failed configurations inside Edge server boundaries.
