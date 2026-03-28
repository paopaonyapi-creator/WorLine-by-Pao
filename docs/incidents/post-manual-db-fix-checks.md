# Post-Manual DB Fix Checks

*Running a manual SQL query or toggling booleans in Supabase Table Editor is risky (see [Safety Notes](manual-db-intervention-safety.md)). Complete this tiny checklist immediately after any manual database intervention to prevent leaving the system in a corrupted state.*

- [ ] Is the edited row valid? (No typos in JSON blobs, UUIDs match exactly).
- [ ] Does the user actually have the correct access or state now? (Verify via UI or API if possible).
- [ ] Do Stripe and Supabase match? (If you manually activated a subscription, does Stripe agree they are actively paying?)
- [ ] Did you inform the user? (Grab a [Direct User Reply Template](direct-user-reply-templates.md)).
- [ ] Did you note the underlying bug for later? (Manual fixes treat the symptom, not the cause. Start an [Internal Incident Note](internal-incident-note-template.md)).
