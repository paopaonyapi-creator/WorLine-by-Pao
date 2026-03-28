# Incident: Subscription Row Missing

**Symptom:** The user loads their `/app/settings/billing` page seamlessly, but their paid subscription data is completely missing, showing them as a Free user.
**Time to execute:** 1 minute.
**Goal:** Determine if the row is missing from the Supabase database entirely due to a webhook failure, or if it's just being filtered out by a bad UI query.

---

### 1. Verify Database State
- [ ] Open Supabase -> Table Editor -> `subscriptions`.
- [ ] Search for the exact `user_id` of the affected user.
- [ ] Is the row completely missing? (If the row *exists* but the UI says "Free," see [Billing Badge Wrong](billing-status-badge-wrong.md)).

### 2. Verify Stripe Checkout State
- [ ] Open Stripe Dashboard -> Customers.
- [ ] Search by the user's email address.
- [ ] Do they have an active subscription listed?
- [ ] If no, the payment never completed at Stripe. Close the ticket.

### 3. Trace the Webhook
- [ ] If Stripe shows them as active, the Stripe -> Supabase sync failed.
- [ ] Open Stripe Developers -> Webhooks -> Recent Deliveries.
- [ ] Did the `checkout.session.completed` event fail? (If yes, see [Webhooks Return 400](webhook-deliveries-return-400.md) and retry).

---

### Stop Conditions & Next Steps
- **UI/Query Bug:** If the row exists, the `user_id` matches perfectly, and the `status` is "active", but the React component still doesn't render it, the data fetching logic in `page.tsx` is broken. Rollback recent changes.
- **Manual Data Sync:** If the webhook is permanently lost or corrupted, manually insert the missing row into Supabase's `subscriptions` table using the Stripe Customer ID and Price ID to immediately restore the user's access.
- **Escalate:** If webhooks are returning `200` but records are still not inserting into Supabase, the Supabase service role key might be invalid. Start a [Postmortem](../postmortem-template.md).
- **Communicate:** Once the row is restored manually, tell the user to refresh their browser.
