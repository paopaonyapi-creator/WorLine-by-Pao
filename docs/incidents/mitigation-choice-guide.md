# Mitigation Choice Guide 🩹

*Before you touch code or databases, deliberately choose your mitigation path. Do not mix them.*

### 1. Rollback (⏪)
**When:** The app is broken globally after a recent deploy (e.g., Checkout 500, Mobile Nav broken).
**Action:** Revert in Railway immediately. Do not debug logs while users are bleeding.
**Safety Check:** [Post-Rollback Checks](post-rollback-checks.md)

### 2. Temporary Unblock (🚑)
**When:** An isolated user is locked out due to an edge case or billing mismatch, and finding the root cause will take hours.
**Action:** Bump their expiration date or flip an access boolean so they can work today.
**Safety Check:** [Temporary Unblock Safety](temp-unblock-safety.md)

### 3. Manual DB Correction (✍️)
**When:** Webhook failure or explicit data corruption left a user's row in a broken state (e.g., Stripe Paid vs Supabase Cancelled).
**Action:** Carefully edit the specific record in the Supabase Table Editor.
**Safety Check:** [Manual DB Intervention Safety](manual-db-intervention-safety.md) | [Post-Manual DB Fix Checks](post-manual-db-fix-checks.md)

### 4. Investigate First (🔎)
**When:** The issue is isolated (one user's editor won't save) or internal (admin access denied). Overreacting with a broad rollback would be dangerous.
**Action:** Gather payload sizes, browser info, or check `.env` variables locally.

---
> ↩️ **Need to rethink triage?** Return to [The First 10 Minutes](first-10-minutes.md) or the [Main Incident Index](index.md).
