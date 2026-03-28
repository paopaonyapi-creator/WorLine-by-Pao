# The First 10 Minutes

**Goal:** Move from "something feels broken" to an absolute triage decision without guessing or freezing.
**Time to execute:** 2-10 minutes.

---

### Minute 0-2: Verify & Classify
- [ ] **Reproduce:** Can you replicate the failure using a test account, or is it isolated to just one user's machine?
- [ ] **Scope Impact:** Is this happening to one user (👤), many users (👥), or everyone (🌐)? *(Broad impact heavily favors a rollback-first response).*
- [ ] **Classify Severity:**
  - 🔴 App is down globally (Outage)
  - 🟠 Money is blocked or missing (Revenue)
  - 🟡 Users cannot log in or access features (Access)
  - 🔵 A specific feature throws errors (Editor/UI)
  - ⚪ A test suite is broken locally (Testing)

### Minute 2-5: Locate the Playbook
- [ ] Open the [Incident Playbooks Index](index.md).
- [ ] Find the scenario that perfectly matches your symptom.
- [ ] *Tag check:* Use the [Tag Legend](tag-legend.md) to decode urgency, root cause, and data risk.
- [ ] *Workaround check:* If an isolated incident has a workaround available (**🩹**), provide it before deep-diving into code.
- [ ] Immediately log into the specific `first-check tool` listed next to the symptom (e.g., Stripe Dash, Railway, Supabase).
- [ ] Follow the 1-minute playbook inside.

### Minute 5-8: The Rollback Decision
If the playbook proves that recent application code broke the platform for *all* users:
- [ ] Stop debugging.
- [ ] Follow the rollback procedures in the [V0.2.0 Rollout Plan](../releases/v0.2.0-rollout.md) or [Production Runbook](../production-runbook.md) immediately to protect users.
- [ ] Resume your investigation only *after* the rollback finishes.

### Minute 8-10: Communication
- [ ] **If 🌐 Broad Impact:** Grab an [Outage Update Template](outage-update-template.md) to alert users quickly without guessing what to write.
- [ ] **If 👤 Isolated:** Grab a [Direct User Reply Template](direct-user-reply-templates.md) to ensure the reporter knows you are mitigating it.
- [ ] Begin taking notes for a [Postmortem](../postmortem-template.md) if money or data was lost.
