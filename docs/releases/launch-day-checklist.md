# Launch-Day Command Checklist

When the code is merged, tested, and ready, the hardest part for a solo-maintainer is ensuring the external infrastructures (Railway, Supabase, Stripe) are synchronized. 

Use this strictly action-oriented checklist on Launch Day before and immediately after dropping a major release.

## 1. Before Pressing Deploy
- [ ] Confirmed the physical commit hash matches the targeted `vX.X.X` branch tag natively.
- [ ] `pnpm test:e2e` ran cleanly without skipping `.env.local` bindings locally.
- [ ] Ran through the physical [Manual QA Matrix](../manual-qa-matrix.md) for Canvas exports visually.

## 2. Railway Checks (Infrastructure)
- [ ] Open the **Railway Dashboard** → Project → Variables.
- [ ] Assert `NEXT_PUBLIC_APP_URL` identically matches your `https://your-domain.com`.
- [ ] Assert `ADMIN_EMAILS` correctly encapsulates the active maintainer emails without spaces securely.
- [ ] *[Press Deploy / Push to Main]*

## 3. First 5-Minute Verification (Live URL)
- [ ] Hit `https://your-domain.com/api/health` → Must parse an immediate HTTP `200` JSON success.
- [ ] Hit `https://your-domain.com/app` anonymously → Must hard-bounce back to `/login` flawlessly.
- [ ] Log in as Admin → Visit `/admin` → Must NOT redirect back to dashboard dynamically!

## 4. Supabase Checks (Database)
- [ ] Open the **Supabase Dashboard** → Authentication.
- [ ] Create a completely new dummy account physically.
- [ ] Open the **SQL Editor** or Table browser → Ensure the new user's `id` mapped securely.

## 5. Stripe Checks (Billing Boundaries)
- [ ] Log into the Live URL utilizing the new dummy account.
- [ ] Hit "Subscribe" on the Pricing Tier to spawn the Live Stripe Session interface securely.
- [ ] **Action:** Submit a physical $1 test charge or test-credit card natively.
- [ ] Open **Stripe Dashboard** → Developers → Webhooks.
- [ ] Assert `checkout.session.completed` fired a `200 OK` toward your `your-domain/api/stripe/webhook`!

## 6. First Rollback Actions (Critical Failure)
If the above 5 checks fail structurally (e.g., Stripe Webhooks 500, Health API times out):
1. Immediately navigate inside the **Railway Deployments** Tab.
2. Select the *previous* deployment block dynamically.
3. Click the explicit three-dot menu → **Redeploy**.
4. Check Supabase `.env` keys. A rollback usually means a key mismatch natively!
