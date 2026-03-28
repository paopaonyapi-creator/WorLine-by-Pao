# Postmortem: Webhook Secret Mismatch After Stripe Dashboard Rotation

## Incident Summary

Stripe webhook deliveries to `/api/stripe/webhook` started returning 400 errors after the `STRIPE_WEBHOOK_SECRET` was rotated in the Stripe Dashboard but not updated in Railway. New subscriptions completed checkout successfully but were never written to the `subscriptions` table, leaving billing status badges stuck on "Free" for paying users.

**Date:** 2026-03-28
**Duration:** ~45 minutes
**Environment:** Railway Production
**Severity:** Critical

## User Impact

- [x] Webhook stopped updating subscriptions — status badges wrong
- [x] Checkout was broken — no new subscriptions (payments succeeded on Stripe's side, but the app never recorded them)

Three users completed checkout during the incident window. Their Stripe charges succeeded, but the `subscriptions` table was not updated. These users saw "Free" on their billing page despite having paid.

## Detection

- **Detected by:** Manual check after a user reported their subscription was not activated
- **First signal:** Stripe → Developers → Webhooks showed `400` responses on all recent `checkout.session.completed` deliveries
- **Time to detect:** ~40 minutes after the secret was rotated

## Timeline

| Time | Event |
|------|-------|
| 14:00 | Rotated webhook signing secret in Stripe Dashboard as part of routine key rotation |
| 14:02 | Stripe began signing new deliveries with the new secret |
| 14:15 | First user completed checkout — webhook returned 400, subscription not written |
| 14:40 | User reported "still showing Free" via support |
| 14:42 | Opened Stripe → Webhooks → Recent deliveries — all deliveries since 14:02 show 400 |
| 14:43 | Identified `STRIPE_WEBHOOK_SECRET` mismatch between Stripe and Railway |
| 14:44 | Updated `STRIPE_WEBHOOK_SECRET` in Railway → Variables with the new `whsec_` value |
| 14:45 | Triggered Railway redeploy |
| 14:47 | Redeploy completed. Manually retried failed webhook events in Stripe Dashboard |
| 14:48 | All retried events returned 200. `subscriptions` table updated correctly for all 3 affected users |

## Root Cause

The `STRIPE_WEBHOOK_SECRET` environment variable in Railway still held the old signing secret after the secret was rotated in the Stripe Dashboard. The webhook handler in `src/app/api/stripe/webhook/route.ts` correctly verifies signatures using `stripe.webhooks.constructEvent()` — when the secrets mismatched, every delivery was rejected with a 400 signature verification error.

## Contributing Factors

- [x] Missing or mismatched env var in Railway
- [ ] Untested change to middleware or webhook handler
- [x] CI did not catch the issue (env difference)
- [x] No monitoring on the affected endpoint
- [ ] Manual QA step was skipped
- [x] Other: No documented procedure for key rotation that includes Railway variable sync

## Immediate Fix

- **Action taken:** Updated `STRIPE_WEBHOOK_SECRET` in Railway → Variables to match the new value from Stripe Dashboard. Redeployed. Retried all failed webhook deliveries from Stripe → Webhooks → Recent deliveries.
- **Verified by:** All retried events returned 200. Checked `subscriptions` table — all 3 affected users now show `status: 'active'` with correct `current_period_end`.

## Preventive Follow-Up

| Action | Owner | Status |
|--------|-------|--------|
| Add key rotation procedure to production runbook (always sync Railway after Stripe rotation) | Pao | ✅ Done |
| Add `STRIPE_WEBHOOK_SECRET` format check (`whsec_` prefix) to health endpoint or startup log | Pao | ⬜ TODO |
| Set up Stripe webhook failure alerting (email on consecutive 400s) | Pao | ⬜ TODO |
| Document the 3 affected users and confirm they received their Pro access | Pao | ✅ Done |

## Evidence Links

- Stripe webhook delivery log: checked in Stripe → Developers → Webhooks → Recent deliveries (400 responses from 14:02–14:44)
- Railway deploy log: confirmed successful redeploy at 14:47
- Supabase `subscriptions` table: verified 3 rows updated after webhook retry
- Related file: `src/app/api/stripe/webhook/route.ts`
