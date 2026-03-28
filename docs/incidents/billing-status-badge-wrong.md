# Incident: Billing Status Badge is Wrong

**Symptom:** A user looks at `/app/settings/billing` and sees "Free Plan" or "Canceled" when they firmly believe they are paying for "Pro."
**Time to execute:** 1 minute.
**Goal:** Determine if this is a purely visual UI bug in the dashboard, or if the underlying database state is actually incorrect.

---

### 1. Verify the User's Database State
- [ ] Open Supabase -> Table Editor -> `subscriptions`.
- [ ] Search for the specific user's `user_id`.
- [ ] Does a row exist? 
- [ ] Is the `status` column exactly the string `"active"`?
- [ ] Is `current_period_end` in the future?

### 2. Isolate UI vs. Data Issue
- **If the DB says "active" but the UI says "Free":** The bug is in `src/app/app/(dashboard)/settings/billing/page.tsx`. It is likely failing to fetch the row or misinterpreting the date math.
- **If the DB says something else (or is missing):** The UI is correct; the data sync from Stripe is broken. See [Billing Says Free](billing-still-free-after-payment.md).

### 3. Verify Stripe's Source of Truth
- [ ] If the data sync is broken, open the Stripe Dashboard.
- [ ] Search for the user's email.
- [ ] Does Stripe show them as currently paying? (If yes, you missed a webhook. See [Webhooks Return 400](webhook-deliveries-return-400.md)).

---

### Stop Conditions & Next Steps
- **Rollback:** If the UI logic is broken globally for all users after a deploy, rollback to the previous version.
- **Data Sync Fix:** If webhooks failed hours ago but are fixed now, manually flip the user's Supabase `status` to `"active"` to restore their access immediately while you investigate.
- **Escalate:** If Stripe shows "Past Due" but Supabase says "Active", your `invoice.payment_failed` webhook logic might be broken. Start a [Postmortem](../postmortem-template.md).
- **Communicate:** If the user lost access to premium features due to a badge error, manually bump their access and inform them the UI is just out of sync.
