# Release Readiness Scorecard

Use this lightweight scorecard to quickly judge if the `master` branch is actually ready to be deployed or tagged as a release.

Are we ready? **[ ] YES / [ ] NO**

---

## 1. Auth & Admin
**Status:** [ ] Ready | [ ] Needs Check | [ ] Blocked

**Minimum Checks:**
- [ ] `pnpm test` passes
- [ ] Manual login/logout verified
- [ ] Admin route (`/admin`) correctly gates standard users

**Blockers (Do not release if):**
- Middleware changes are untested
- Login redirects loop to `/misconfigured`

---

## 2. Billing & Stripe
**Status:** [ ] Ready | [ ] Needs Check | [ ] Blocked

**Minimum Checks:**
- [ ] Checkout route generates Stripe session correctly
- [ ] Webhook deliveries show `200` in Stripe Dashboard for recent tests
- [ ] `subscriptions` table updates as expected

**Blockers (Do not release if):**
- Any un-synced `STRIPE_WEBHOOK_SECRET` rotations
- "Paid but UI says free" state detected

---

## 3. Editor & Export
**Status:** [ ] Ready | [ ] Needs Check | [ ] Blocked

**Minimum Checks:**
- [ ] `pnpm typecheck` passes (no hidden Zustand/Konva type errors)
- [ ] Manual QA: Can draw a component and save workspace
- [ ] Manual QA: PDF and PNG exports trigger file downloads

**Blockers (Do not release if):**
- `pdf-lib` is dropping elements
- RLS policies block saving the workspace

---

## 4. Deploy & Health
**Status:** [ ] Ready | [ ] Needs Check | [ ] Blocked

**Minimum Checks:**
- [ ] Staging/Local `/api/health` returns `200`
- [ ] Railway env vars match `.env.example` exactly (no missing keys)
- [ ] CI pipeline is green on `master`

**Blockers (Do not release if):**
- Deploy logs show memory limit warnings
- Build passes but runtime throws 500s

---

## 5. Docs & Ops
**Status:** [ ] Ready | [ ] Needs Check | [ ] Blocked

**Minimum Checks:**
- [ ] Behavior changes are documented in the [Glossary](debugging-glossary.md) or [Runbook](production-runbook.md)
- [ ] New env vars are added to `railway.json` and `.env.example`
- [ ] High-risk files are updated in [File Risk Map](file-risk-map.md) if architecture changed

**Blockers (Do not release if):**
- We don't have a plan to monitor a newly added high-risk feature

---

> This scorecard relies heavily on human judgment for the manual QA portions. For step-by-step commands on how to run these checks, see the [Pre-Release Checklist](pre-release-checklist.md) and [Manual QA Matrix](manual-qa-matrix.md).
