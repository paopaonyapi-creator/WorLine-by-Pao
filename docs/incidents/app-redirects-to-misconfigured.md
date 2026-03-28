# Incident: /app Redirects to /misconfigured

**Symptom:** Users successfully log in but are immediately bumped to a `/misconfigured` error page instead of the main app.
**Time to execute:** 1 minute.
**Goal:** Identify which environment variable the middleware is missing and restore access.

---

### 1. Confirm Reproducibility
- [ ] Attempt to log into `/app` yourself.
- [ ] Do you land on `/misconfigured`? (If no: the user's browser may be blocking Supabase cookies. Standard support reply).

### 2. Verify Railway Variables
- [ ] Open Railway -> Variables.
- [ ] Compare the live variables against `.env.example`. Check specifically for typos or missing keys in:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_APP_URL`
- [ ] Confirm no rogue spaces exist at the end of the variable strings.

### 3. Redeploy
- [ ] If you found a missing or typo'd variable, fix it.
- [ ] Trigger a manual redeploy in Railway.
- [ ] Wait for the build to finish.

### 4. Verify Fix
- [ ] Check `/api/health` -> should return 200.
- [ ] Try logging into `/app` again.

---

### Stop Conditions & Next Steps
- **Rollback:** If all env vars are perfectly matched but the redirect still happens, and you just deployed, rollback to the previous deployment immediately.
- **Escalate:** If the middleware logic itself is throwing the redirect unexpectedly (even with good env vars), start a [Postmortem](../postmortem-template.md) to debug the routing logic.
- **Communicate:** Once fixed, post a quick status update if users reported it, as this is a hard blocker for the entire application.

> *For a deeper look at what these variables affect, see the [Env Risk Notes](../env-risk-notes.md).*
