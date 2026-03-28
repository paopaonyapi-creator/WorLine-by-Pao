# The First 10 Minutes

**Goal:** Move from "something feels broken" to an absolute triage decision without guessing or freezing.
**Time to execute:** 2-10 minutes.
*(Need help deciding where to look? See [Which Doc First?](which-doc-first.md) or [Worked Incident Examples](worked-examples.md)).*

---

### Minute 0-2: Verify & Classify
- [ ] **Reproduce:** Can you replicate the failure using a test account, or is it isolated to just one user's machine?
- [ ] **Scope Impact:** Is this happening to one user (👤), many users (👥), or everyone (🌐)? *(See [Broad vs. Isolated Triage Tree](broad-vs-isolated.md) if unsure, or jump to [Production Incidents](production-incidents.md) if obviously broad).*
- [ ] **Classify Severity:**
  - 🔴 App is down globally (Outage)
  - 🟠 Money is blocked or missing (Revenue)
  - 🟡 Users cannot log in or access features (Access)
  - 🔵 A specific feature throws errors (Editor/UI)
  - ⚪ A test suite is broken locally (Testing) *(See [Workflow Incidents](workflow-incidents.md))*

### Minute 2-5: Locate the Playbook
- [ ] Open the [Incident Playbooks Index](index.md) (or try the [Top Recurring Incidents](top-recurring.md) fast lane).
- [ ] Find the scenario that perfectly matches your symptom.
- [ ] *Tag check:* Use the [Tag Legend](tag-legend.md) and [Incident Matrix](matrix.md) to decode urgency, root cause, and data risk.
- [ ] *Workaround check:* If an isolated incident has a workaround available (**🩹**), provide it before deep-diving into code.
- [ ] Immediately log into the specific `first-check tool` listed next to the symptom (e.g., Stripe Dash, Railway, Supabase).
- [ ] Follow the 1-minute playbook inside.

### Minute 5-8: Choose Your Mitigation
If the playbook proves that recent application code broke the platform for *all* users:
- [ ] Stop debugging logging and start reverting.
- [ ] Follow the rollback procedures in the [V0.2.0 Rollout Plan](../releases/v0.2.0-rollout.md) or [Production Runbook](../production-runbook.md) immediately to protect users.
*(If isolated or internal, review the [Mitigation Choice Guide](mitigation-choice-guide.md) before touching DB rows or extending subscriptions).*
- [ ] Run through the [Post-Rollback Checks](post-rollback-checks.md) before declaring the fire out.

### Minute 8-10: Communication
- [ ] **If 🌐 Broad Impact:** Grab an [Outage Update](outage-update-template.md) to alert users quickly.
- [ ] **If 👤 Isolated:** Grab a [Direct User Reply](direct-user-reply-templates.md) to ensure the reporter knows.
- [ ] **If 🤫 Internal:** Track actions using an [Internal Incident Note](internal-incident-note-template.md).
- [ ] *(See the [Comms Mode Guide](comms-mode-guide.md) if unsure whether to broadcast or DM).*
- [ ] Start a [Postmortem](../postmortem-template.md) if money/data was lost.
