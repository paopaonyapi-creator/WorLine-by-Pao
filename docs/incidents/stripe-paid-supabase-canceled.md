# Incident: Stripe Shows Paid but Supabase Says Canceled

**Symptom:** The user is locked out of premium features. Stripe shows their subscription is completely healthy and active, but the Supabase `subscriptions` table (or the UI) says it is `canceled` or `past_due`.
**Time to execute:** 1 minute.
**Goal:** Determine if a `customer.subscription.updated` webhook failed to deliver or if the UI is misinterpreting the end date.

---

### 1. Confirm Stripe is Healthy
- [ ] Open Stripe Dashboard -> Customers.
- [ ] Search for the user's email.
- [ ] Verify the Status is perfectly `Active`.

### 2. Check Supabase Date Fields
- [ ] Open Supabase -> Table Editor -> `subscriptions`.
- [ ] Is `status` set to `canceled` or `past_due`?
- [ ] Look at `current_period_end` and `cancel_at_period_end`. 
- [ ] If the DB says `canceled` but the date hasn't passed yet, the user manually canceled but still deserves access (UI/Query bug). See [Billing Badge Wrong](billing-status-badge-wrong.md).

### 3. Dig into Webhooks
- [ ] If Stripe is `Active` but Supabase genuinely says the subscription ended yesterday, a renewal webhook failed.
- [ ] Go back to Stripe Developers -> Webhooks -> Recent Deliveries.
- [ ] Search for `customer.subscription.updated` or `invoice.payment_succeeded` events for that customer.
- [ ] Did they fail with a `400` or `500` error? (If yes, see [Webhooks Return 400](webhook-deliveries-return-400.md)).

---

### Stop Conditions & Next Steps
- **Data Sync Fix:** If webhooks failed, click "Resend" on the webhook in Stripe to force Supabase to catch up. 
- **Escalate:** If the webhooks succeeded (Status `200`) but Supabase still says `canceled`, your webhook handler (`src/app/api/stripe/webhook/route.ts`) is silently dropping update events. Start a [Postmortem](../postmortem-template.md).
- **Communicate:** If the user lost access, manually flip their Supabase `status` to `active` immediately to unblock them, then investigate the webhook failure asynchronously. 

> *If the row doesn't even exist in Supabase, the problem occurred during checkout, not renewal. See [Subscription Row Missing](subscription-row-missing.md).*
