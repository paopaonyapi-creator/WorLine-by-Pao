# Temporary Unblock Safety

*Providing a quick DB workaround (🩹) is often necessary for access or billing issues while you hunt down the codebase bug. Do this safely so you don't accidentally give lifetime free access.*

- [ ] **Confirm Identity:** Double-check the user's email/ID against Stripe or Auth logs before altering state.
- [ ] **Confirm Scope:** Only unblock the user who reported the problem. Do not broadly override access logic.
- [ ] **Track the Unblock:** Start an [Internal Incident Note](internal-incident-note-template.md) explicitly stating what was changed (e.g., "bumped expiration date by 2 days").
- [ ] **Communicate the Boundary:** Inform the user this is a temporary override using the [Direct User Reply Templates](direct-user-reply-templates.md).
- [ ] **Verify Efficacy:** Did the unblock actually work?
- [ ] **Set a Revert Hook:** Put a reminder in your task tracker (or ticket) to reconcile the temporary fix once the root problem is deployed.
