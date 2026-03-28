# Comms Mode Guide 📣

*Choose your communication radius before you start answering tickets. If unsure, start narrower (Internal / 1:1) and widen only if the scope actually grows.*

### 1. Broad Public Outage (📣)
**When to use:** The app is hard-down (500) for many users, or a core flow (checkout/save) is globally broken. Don't leave users guessing.
**Where to post:** Status Page, Discord `#announcements`.
**What to say:** Use the [Outage Update Template](outage-update-template.md).

### 2. Isolated Direct Reply (💬)
**When to use:** A single user is blocked due to data drift, an edge case, or a webhook failure.
**Where to post:** Email or private reply to the specific reporter.
**What to say:** Use the [Direct User Reply Templates](direct-user-reply-templates.md).

### 3. Internal Only (🤫)
**When to use:** The issue only blocks maintainers, admin tools, CI pipeline, or was caught in test environments. Customers do not care that your E2E suite is skipping.
**Where to post:** Do not broadcast publically. Track it privately.
**What to say:** Use the [Internal Incident Note Template](internal-incident-note-template.md).

---
> ↩️ **Need to rethink triage?** Return to [The First 10 Minutes](first-10-minutes.md) or the [Main Incident Index](index.md).
