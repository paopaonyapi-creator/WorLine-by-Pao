# Incident: Billing Says Free After Payment

**Symptom:** A user reports they paid, but the UI still shows them on the Free plan.
**Time to execute:** 1 minute.
**Goal:** Manually fix the user's state and find the broken link in the chain.

---

### 1. Verify Payment
- [ ] Open Stripe Dashboard -> Payments.
- [ ] Find the user's email. Did the charge actually succeed? (If no: stop, tell user their card declined).

### 2. Verify Webhook Delivery
- [ ] Open Stripe Dashboard -> Developers -> Webhooks.
- [ ] Check "Recent deliveries" for `checkout.session.completed`.
- [ ] Did it return `200`? (If `400`: see [Webhook Deliveries Return 400](webhook-deliveries-return-400.md)).

### 3. Verify Database State
- [ ] Open Supabase -> Table Editor -> `subscriptions`.
- [ ] Find the user. Does the row exist and say `status = active`?
- [ ] (If missing: manually insert/update it so the user can use the app immediately).

### 4. Retry & Resolve
- [ ] If you fixed a misconfigured `STRIPE_WEBHOOK_SECRET` in Railway, go back to Stripe Webhooks.
- [ ] Click the failed delivery and hit "Resend".
- [ ] Verify Supabase updates correctly.

---

### Stop Conditions & Next Steps
- **Rollback:** If webhooks are throwing `500`s for *everyone* after a recent deploy, rollback the deployment immediately. See [Production Runbook](../production-runbook.md).
- **Escalate:** If the exact same bug happens twice in a week, fill out a [Postmortem Template](../postmortem-template.md) to fix the root cause.
- **Communicate:** If you had to manually update Supabase to fix their account, email the user apologizing for the delay.
