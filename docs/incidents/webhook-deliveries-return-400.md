# Incident: Webhook Deliveries Return 400

**Symptom:** Stripe logs show that webhooks (like `checkout.session.completed`) are failing with a `400 Bad Request` or `401 Unauthorized`.
**Time to execute:** 1 minute.
**Goal:** Fix the signature mismatch or correct the endpoint URL so subscriptions activate.

---

### 1. Confirm Failure Pattern
- [ ] Open Stripe Dashboard -> Developers -> Webhooks.
- [ ] Click "Recent deliveries". Are they all returning 400?

### 2. Verify Signature
- [ ] Open Railway -> Variables. 
- [ ] Compare `STRIPE_WEBHOOK_SECRET` with the "Signing secret" shown in the Stripe Webhooks dashboard.
- [ ] Does it match exactly? (Beware of trailing spaces).

### 3. Verify Endpoint URL
- [ ] Inside Stripe Webhooks, check the configured URL.
- [ ] Does it point exactly to `https://[YOUR_DOMAIN]/api/stripe/webhook`?
- [ ] Ensure it uses HTTPS and has no trailing slashes.

### 4. Check Railway Logs
- [ ] Open Railway -> Deployments -> View Logs.
- [ ] Look for "Webhook signature verification failed" right after a delivery attempt.

### 5. Fix & Retry
- [ ] Update Railway with the correct secret or fix the Stripe URL.
- [ ] Go back to Stripe Webhooks, click a failed delivery, and hit "Resend".
- [ ] Go to Supabase `subscriptions` table. Did the user's row finally update?

---

### Stop Conditions & Next Steps
- **Rollback:** If secrets match perfectly, but the `api/stripe/webhook/route.ts` code itself is crashing (e.g., throwing 500s instead of 400s), rollback the last deploy.
- **Escalate:** If the webhook processes successfully but Supabase refuses the update, check your Supabase Service Role Key. Start a [Postmortem](../postmortem-template.md).
- **Communicate:** If customers complained about "Free plan after paying", manually verify their account in Supabase or inform them the system caught up. See [Billing Says Free](billing-still-free-after-payment.md).

> *For a deeper look at what these billing variables affect, see the [Env Risk Notes](../env-risk-notes.md).*
