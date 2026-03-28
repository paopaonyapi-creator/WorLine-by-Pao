# Incident: Checkout Returns 500

**Symptom:** A user tries to upgrade, clicks the checkout button, and gets a `500 Internal Server Error` instead of the Stripe payment page.
**Time to execute:** 1 minute.
**Goal:** Identify the Stripe API failure or missing environment variable in the checkout route.

---

### 1. Confirm Reproducibility
- [ ] Log in as a test user.
- [ ] Click "Upgrade". Do you get a 500?

### 2. Check Stripe & Railway Logs
- [ ] Open Stripe Dashboard -> Developers -> Logs. Are there any `400` errors for `v1/checkout/sessions`?
- [ ] Open Railway -> Deployments -> View Logs. Is `STRIPE_SECRET_KEY` missing, or did it throw a specific error?

### 3. Verify Env Variables
- [ ] Compare live Railway variables against `.env.example`.
- [ ] Check `STRIPE_SECRET_KEY` (must start with `sk_live_` or `sk_test_`).
- [ ] Check `STRIPE_PRO_PRICE_ID` (must start with `price_`).
- [ ] Check `NEXT_PUBLIC_APP_URL` (needs a valid URL for Stripe redirects).

### 4. Verify Stripe State
- [ ] Open Stripe Dashboard -> Products.
- [ ] Does the exact string mapped to `STRIPE_PRO_PRICE_ID` actually exist? Is the product archived?

---

### Stop Conditions & Next Steps
- **Rollback:** If Stripe logs show no API requests at all, the checkout route itself is broken. Rollback the last deployment immediately.
- **Escalate:** If the price IDs and keys match perfectly but Stripe returns obscure `400` errors, start a [Postmortem](../postmortem-template.md) and dive into Stripe's extensive API documentation.
- **Communicate:** Revenue features are blocked. Immediately notify users if you have a status page or discord.

> *For a deeper look at what these billing variables affect, see the [Env Risk Notes](../env-risk-notes.md).*
