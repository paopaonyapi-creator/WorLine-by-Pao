# Post-Rollback Checks

*Use this tiny checklist immediately after a Vercel/Railway code rollback finishes. Do not stop monitoring just because the deploy indicator turned green.*

- [ ] Does `/api/health` return a clean `200 OK`?
- [ ] Is the primary broken route or feature working again for you locally (or in an incognito window)?
- [ ] Is the original reported symptom completely gone?
- [ ] Did the rollback deploy actually swap the active commit? (Check the hash in your dashboard).
- [ ] Did you post an "Issue Resolved" update or directly reply to the users who reported the outage?
- [ ] Did you capture the raw error logs (or open an [Internal Incident Note](internal-incident-note-template.md)) so you can debug what happened without guessing later?
