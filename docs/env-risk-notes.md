# Environment & Secrets Risk Notes

Do not rotate or change these environment variables casually. If one of these values is misconfigured in production, the app will break in specific, severe ways.

Always mirror new vars to `.env.example` and update Railway immediately.

---

### Supabase Core
`NEXT_PUBLIC_SUPABASE_URL`
- **Affects:** The base endpoint for all database and auth requests.
- **Breaks:** The entire app. 500 errors on every page.
- **Verify:** Railway Settings -> Variables.

`NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Affects:** Client-side database requests governed by RLS.
- **Breaks:** Infinite login loops, failed data fetches for authenticated users.
- **Verify:** Supabase Dashboard -> Project Settings -> API.

`SUPABASE_SERVICE_ROLE_KEY`
- **Affects:** Server-side admin actions (bypassing RLS), notably Stripe webhook syncing.
- **Breaks:** Webhooks show `200` but the database won't update.
- **Verify:** Supabase Dashboard -> Project Settings -> API.

---

### Stripe Billing
`STRIPE_SECRET_KEY`
- **Affects:** Creation of checkout sessions and webhook validation.
- **Breaks:** Users can't buy subscriptions. Checkout button throws `500`.
- **Verify:** Stripe Dashboard -> Developers -> API Keys.

`STRIPE_WEBHOOK_SECRET`
- **Affects:** Cryptographic validation of Stripe events pushing to our `/api/stripe/webhook` route.
- **Breaks:** Subscriptions won't activate. Silent failure (Stripe retries but fails).
- **Verify:** Stripe Dashboard -> Developers -> Webhooks.

`STRIPE_PRO_PRICE_ID`
- **Affects:** The specific product ID attached to the checkout payload.
- **Breaks:** Users are charged for the wrong tier, or checkout fails completely if the ID is missing.
- **Verify:** Stripe Dashboard -> Products.

---

### Application Logic
`NEXT_PUBLIC_APP_URL`
- **Affects:** Auth callback links and Stripe checkout success/cancel URLs.
- **Breaks:** Users successfully pay but are redirected to `localhost:3000` (or vice versa).
- **Verify:** Hardcoded to the live domain in Railway.

`ADMIN_EMAILS`
- **Affects:** Hardcoded gatekeeping for the `/admin` dashboard routes.
- **Breaks:** Maintainers lose access to the admin panel, or worse, random users gain access.
- **Verify:** Ensure it's a comma-separated list with no spaces. Test logging in manually.
