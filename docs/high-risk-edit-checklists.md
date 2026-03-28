# High-Risk Edit Checklists

Stop and check this guide *before* you modify the repository's most failure-prone areas: Stripe and Middleware. These areas represent the highest operational risk.

---

## 🛑 Before Touching Stripe

If you are modifying `src/app/api/checkout/route.ts` or `src/app/api/stripe/webhook/route.ts`:

- [ ] **Confirm Env Vars:** Do your changes rely on new Stripe price IDs or webhook secrets? If so, update `.env.example` and Railway immediately. (See [Env Risk Notes](env-risk-notes.md) before rotating old ones).
- [ ] **Confirm Manual Checks:** Can this be tested locally, or will you need to run fake test cards in the Stripe Dashboard?
- [ ] **Confirm State Impact:** Will this change how the `subscriptions` table behaves? If so, does the billing UI need to reflect the new state?
- [ ] **Confirm Docs:** If you renamed a secret or changed the webhook endpoint, you *must* update the [Production Runbook](production-runbook.md) and [Debugging Glossary](debugging-glossary.md).

---

## 🛑 Before Touching Middleware

If you are modifying `src/lib/supabase/middleware.ts`:

- [ ] **Confirm Redirects:** Have you verified the behavior of all core redirects (`/login`, `/misconfigured`, `/app`, `/admin`)?
- [ ] **Confirm Assumptions:** Are you assuming a session always exists? What happens when Supabase tokens expire or `STRIPE_SECRET_KEY` is missing?
- [ ] **Confirm Manual Testing:** Automated tests might mock auth. Have you manually logged in, logged out, and tried accessing `/app` while unauthenticated?
- [ ] **Confirm E2E Testing:** Any change here *requires* running `pnpm test:e2e` (especially the auth flows) to ensure you didn't break E2E bot boundaries.

---

> **Still Unsure?**
> See the [File Risk Map](file-risk-map.md) to understand overall safety levels, or review the [Merge Policy](merge-policy.md) for required PR checks. If something already broke, see the [Troubleshooting Shortcuts](troubleshooting-shortcuts.md).
