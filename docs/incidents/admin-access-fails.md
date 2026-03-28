# Incident: Admin Access Suddenly Fails

**Symptom:** You (the maintainer) try to visit `/admin` but are immediately bounced back to the `/app` dashboard.
**Time to execute:** 1 minute.
**Goal:** Verify the `ADMIN_EMAILS` environment variable matches your exact Supabase session email.

---

### 1. Confirm Reproducibility
- [ ] Log out of the app completely.
- [ ] Log back in with your designated admin email.
- [ ] Attempt to visit `/admin`. Does it still redirect?

### 2. Verify Railway Variables
- [ ] Open Railway -> Variables.
- [ ] Check `ADMIN_EMAILS`. Does it contain your exact email address?

### 3. Check for Syntax Errors
- [ ] Are there spaces after the commas? (e.g., `admin@example.com, test@example.com`). Spaces can break exact string matching.
- [ ] Are there casing mismatches? (e.g., `Admin@example.com` vs `admin@example.com`).

### 4. Fix & Verify
- [ ] If you found a typo or space, fix it in Railway and click "Redeploy".
- [ ] Open the app, ensure you are logged in, and visit `/admin`.

---

### Stop Conditions & Next Steps
- **Rollback:** If `ADMIN_EMAILS` is perfect and this started immediately after a deploy, the gating logic in `src/app/app/(dashboard)/admin/layout.tsx` is likely broken. Rollback the deploy.
- **Escalate:** If the exact same email works on `localhost` but fails in production, start a [Postmortem](../postmortem-template.md) to figure out if your edge middleware or caching strategy is dropping the email claim.
- **Communicate:** Other maintainers/support staff might be blocked from refunding users. Ping them if the rollback will take a while.

> *For a map of how the admin routes are gated, see the [Architecture Map](../architecture-map.md) §2, or check [Env Risk Notes](../env-risk-notes.md) for variable impacts.*
