# Incident: App Redirects to Login

**Symptom:** A user tries to visit the dashboard at `/app` (or any sub-route), but they are forcibly bounced back to `/login` despite thinking they are logged in.
**Time to execute:** 1 minute.
**Goal:** Determine if the session actually expired, or if a missing environment variable broke the authentication middleware.

---

### 1. Confirm the Redirect
- [ ] Attempt to manually go to `[YOUR_DOMAIN]/app` in your browser.
- [ ] Were you redirected to `/login`? (If you were redirected to `/misconfigured` instead, see [Redirect to Misconfigured](app-redirects-to-misconfigured.md)).

### 2. Check Browser Auth State
- [ ] Open Browser Developer Tools -> Application -> Storage -> Cookies (or Local Storage, depending on Supabase setup).
- [ ] Do you see a valid `sb-[PROJECT_ID]-auth-token`? (If missing, the session expired normally).

### 3. Verify Public Variables
- [ ] Open Railway -> Variables.
- [ ] Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Are they present? (If these are missing, the client-side Supabase client fails to initialize, dumping the user to `/login`).

### 4. Retry Fresh Login
- [ ] Perform a full manual login from the `/login` screen.
- [ ] Does it work now?

---

### Stop Conditions & Next Steps
- **Stale Session:** If the user hasn't logged in for 30 days and the cookie is missing, this is expected behavior. Close the support ticket.
- **Rollback:** If *every* user is suddenly getting dumped to `/login` simultaneously after a deployment, rollback immediately. See the [Production Runbook](../production-runbook.md).
- **Escalate:** If the env vars are perfect, but the Supabase middleware (`src/lib/supabase/middleware.ts`) is throwing 500s or failing to refresh valid tokens, start a [Postmortem](../postmortem-template.md).

> *For a deeper look at what these auth variables affect, see the [Env Risk Notes](../env-risk-notes.md).*
