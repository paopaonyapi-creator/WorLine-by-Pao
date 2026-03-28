# Postmortem Template

Copy this template into a new file under `docs/postmortems/` when documenting an incident.
Name the file by date and area: `YYYY-MM-DD-area-short-description.md`.

No blame. Focus on what happened, why, and what prevents recurrence.

For a realistic example, see [2026-03-28 Webhook Secret Mismatch](postmortems/2026-03-28-checkout-webhook-secret-mismatch.md).

---

## Incident Summary

<!-- One or two sentences. What broke and what was the user-visible impact? -->

**Date:** YYYY-MM-DD
**Duration:** ~X minutes
**Environment:** <!-- Railway Production / Staging / Local -->
**Severity:** <!-- Critical / Major / Minor — per triage taxonomy -->

## User Impact

<!-- Who was affected and how? Be specific. -->

- [ ] Users could not log in
- [ ] Users redirected to `/misconfigured`
- [ ] Checkout was broken — no new subscriptions
- [ ] Webhook stopped updating subscriptions — status badges wrong
- [ ] Editor save failed — user work at risk
- [ ] Export (PNG/PDF) broken
- [ ] App shell or mobile nav broken
- [ ] No user-facing impact (internal / CI only)

## Detection

<!-- How was the issue discovered? -->

- **Detected by:** <!-- Manual check / user report / monitoring / CI failure -->
- **First signal:** <!-- e.g. `/api/health` 500, Stripe webhook 400, Railway deploy log error -->
- **Time to detect:** <!-- ~X minutes after deploy / change -->

## Timeline

<!-- Keep it short. Only include the key events. -->

| Time | Event |
|------|-------|
| HH:MM | <!-- e.g. Pushed commit abc123 to master --> |
| HH:MM | <!-- e.g. Railway deploy completed --> |
| HH:MM | <!-- e.g. /api/health started returning 500 --> |
| HH:MM | <!-- e.g. Root cause identified --> |
| HH:MM | <!-- e.g. Fix deployed / rollback executed --> |

## Root Cause

<!-- What specifically caused the failure? Link to the file or config that was wrong. -->

## Contributing Factors

<!-- What made this easier to happen or harder to detect? -->

- [ ] Missing or mismatched env var in Railway
- [ ] Untested change to middleware or webhook handler
- [ ] CI did not catch the issue (env difference)
- [ ] No monitoring on the affected endpoint
- [ ] Manual QA step was skipped
- [ ] Other: <!-- describe -->

## Immediate Fix

<!-- What was done to restore service? -->

- **Action taken:** <!-- e.g. Rolled back to commit abc123 via Railway History → Revert -->
- **Verified by:** <!-- e.g. /api/health 200, Stripe webhook 200, manual login test -->

## Preventive Follow-Up

<!-- What will prevent this from happening again? Each item should be actionable. -->

| Action | Owner | Status |
|--------|-------|--------|
| <!-- e.g. Add env var validation to CI --> | <!-- name --> | ⬜ TODO |
| <!-- e.g. Add E2E test for /misconfigured redirect --> | <!-- name --> | ⬜ TODO |
| <!-- e.g. Document new env var in .env.example --> | <!-- name --> | ⬜ TODO |

## Evidence Links

<!-- Link to any external dashboards, logs, or screenshots used during investigation. -->

- Railway deploy log: <!-- URL or screenshot -->
- Stripe webhook delivery: <!-- URL or screenshot -->
- Supabase table state: <!-- screenshot -->
- Browser console / Network tab: <!-- screenshot -->
- Related GitHub issue: <!-- #number -->
- Related commit: <!-- SHA -->

---

## Common Incident Types (Reference)

Use these as starting points when filling in root cause and contributing factors:

| Incident Type | Typical Root Cause | First File | First Dashboard |
|---------------|-------------------|------------|-----------------|
| Auth redirect loop | Bad session or missing Supabase keys | `src/lib/supabase/middleware.ts` | Supabase → Auth → Users |
| `/misconfigured` redirect | Missing env var in Railway | `src/lib/supabase/middleware.ts` | Railway → Variables |
| Checkout 500 | Invalid `STRIPE_SECRET_KEY` or `STRIPE_PRO_PRICE_ID` | `src/app/api/checkout/route.ts` | Stripe → Developers → Logs |
| Webhook not updating | Wrong `STRIPE_WEBHOOK_SECRET` | `src/app/api/stripe/webhook/route.ts` | Stripe → Webhooks → Deliveries |
| Editor save failure | RLS policy mismatch or Supabase outage | `src/components/editor/EditorWorkspace.tsx` | Supabase → Table Editor → `projects` |
| Export failure | `pdf-lib` timeout or canvas error | `src/components/editor/EditorWorkspace.tsx` | Browser → Console |
| Deploy regression | Build succeeded but runtime env incomplete | `src/app/api/health/route.ts` | Railway → Deployments → Logs |

> For the full symptom → file → dashboard mapping, see [Troubleshooting Shortcuts](troubleshooting-shortcuts.md).
> For recovery procedures, see [Production Runbook](production-runbook.md).
