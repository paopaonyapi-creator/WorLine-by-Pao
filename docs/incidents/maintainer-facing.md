# Maintainer-Facing Incidents (🛠️)

*This is a filtered fast-lane for when the core application is running, but internal developer/operator workflows are blocked. Click the matched symptom to open the 1-minute playbook.*

### Access & Webhooks
- 🟡 [Admin access denied / Maintainer locked out](admin-access-fails.md)
- 🟠 [Webhook deliveries failing (Stripe returns 400)](webhook-deliveries-return-400.md)

### Testing & Pipeline (CI/CD)
- ⚪ [E2E auth tests skip unexpectedly](e2e-auth-tests-skip.md)
- ⚪ [CI passes but local fails (or vice versa)](ci-passes-local-fails.md)

### Mitigation Tooling
Maintainer-facing incidents often involve bypassing standard paths or digging into the database. Make sure you use these safety constraints:
- ✍️ **Must edit the DB manually?** See [Manual DB Intervention Safety](manual-db-intervention-safety.md).
- 🚑 **Providing a temporary bypass?** See [Temporary User Unblock Safety](temp-unblock-safety.md).
- 📝 **Need to track scope?** Start an [Internal Incident Note](internal-incident-note-template.md).

---
> 🎯 **Don't see it?** Return to the [Main Incident Index](index.md) or check the [Incident Matrix](matrix.md).
