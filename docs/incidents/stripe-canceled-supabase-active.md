# Incident: Stripe Shows Canceled but Supabase Says Active

**Symptom:** A user is getting premium features for free. Stripe explicitly shows their subscription is `canceled`, `past_due`, or `unpaid`, but the Supabase `subscriptions` table (and the UI) still lists them as `active`.
**Time to execute:** 1 minute.
**Goal:** Determine if an `invoice.payment_failed` or `customer.subscription.deleted` webhook failed to deliver.

---

### 1. Confirm Stripe is Dropped
- [ ] Open Stripe Dashboard -> Customers.
- [ ] Search for the user's email.
- [ ] Verify the Status is perfectly `Canceled` or `Past due`.

### 2. Check Supabase Date Fields
- [ ] Open Supabase -> Table Editor -> `subscriptions`.
- [ ] Search the same user's `user_id`.
- [ ] Is `status` still set to `active`?
- [ ] Look at `current_period_end`.
- [ ] If the DB says `active` but the date actually expired weeks ago, your UI logic is failing to check the expiration date. See [Billing Badge Wrong](billing-status-badge-wrong.md).

### 3. Dig into Webhooks
- [ ] If the date in Supabase is still erroneously set in the future (or the status is just stuck), a cancellation/failure webhook dropped.
- [ ] Go back to Stripe Developers -> Webhooks -> Recent Deliveries.
- [ ] Search for `customer.subscription.deleted` or `invoice.payment_failed` events for that customer.
- [ ] Did they fail with a `400` or `500` error? (If yes, see [Webhooks Return 400](webhook-deliveries-return-400.md)).

---

### Stop Conditions & Next Steps
- **Data Sync Fix:** If webhooks failed, click "Resend" on the webhook in Stripe to force Supabase to revoke access.
- **Manual Revocation:** If Stripe no longer lets you retry the event, manually change the Supabase row's `status` to `canceled` to stop revenue leakage.
- **Escalate:** If the webhooks succeeded (Status `200`) but Supabase still says `active`, your webhook handler (`src/app/api/stripe/webhook/route.ts`) is silently dropping downgrade events. Start a [Postmortem](../postmortem-template.md).

> *If the user never existed in Supabase at all, see [Subscription Row Missing](subscription-row-missing.md).*
