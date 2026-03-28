# Incident: /api/health Returns 500

**Symptom:** Your automated monitor or manual check against `/api/health` returns `500` instead of `200`. The app might be completely down.
**Time to execute:** 1 minute.
**Goal:** Determine if this is a bad deploy, a missing environment variable, or a runtime crash, and restore the service immediately.

---

### 1. Confirm Outage
- [ ] Hit `/api/health` in your own browser. Does it return `500`?
- [ ] If yes, the app is likely down for everyone.

### 2. Check Railway Build & Deploy Logs
- [ ] Open Railway -> Deployments.
- [ ] Did the very last deployment fail to build? (If yes, traffic is probably still hitting the old deploy, but verify).
- [ ] Click "View Logs" on the active deployment. Look closely:
  - Is it infinitely looping or restarting? (OOM / Runtime crash).
  - Did it throw an error about missing variables right at boot?

### 3. Verify Env Variables
- [ ] Compare Railway's active variables against `.env.example`.
- [ ] A missing core variable (like database URLs) can cause Next.js routing to fail globally.

### 4. Fix or Revert
- [ ] **Missing Env:** Add it, then click "Redeploy".
- [ ] **Bad Code:** If the deployment logs show a crash traceable to a recent PR, do not try to fix it right now.

---

### Stop Conditions & Next Steps
- **Rollback:** If you see runtime crashes tied to new code, click "Revert" on the previous healthy deployment in Railway immediately. See the [Production Runbook](../production-runbook.md) for full rollback semantics.
- **Escalate:** Once the app is healthy via a rollback or trivial config fix, document *why* the bad code passed the [Merge Policy](../merge-policy.md) checks but crashed in production using the [Postmortem Template](../postmortem-template.md).
- **Communicate:** If the app was completely inaccessible for more than 5 minutes, post a status update to users.
