# Triage Decision Tree: Broad vs. Isolated

*Determine your primary blast radius before beginning an investigation. Choose your path below.*

**1. Is the `api/health` endpoint returning 500?**
- **Yes:** 🌐 Broad Outage. Open the [First 10 Minutes](first-10-minutes.md) and prepare to roll back. Use the [Outage Update Template](outage-update-template.md).
- **No:** Proceed to 2.

**2. Is this issue reproducible on your local Admin/Test account?**
- **Yes:** 🌐 Likely Broad Outage or recent deployment regression. Investigate immediately.
- **No:** Proceed to 3.

**3. Does this affect only a specific user's login session or billing row?**
- **Yes:** 👤 Isolated Account Issue. Stop hunting for a fatal codebase flaw. 
  - Need to unblock them? Use [Temporary User Unblock Safety](temp-unblock-safety.md). 
  - Need to rewrite DB rows? Use [Manual DB Intervention Safety](manual-db-intervention-safety.md).
  - Draft comms using the [Direct User Reply Templates](direct-user-reply-templates.md).
- **No:** Proceed to 4.

**4. Are multiple independent users reporting the *exact same* specific error (like Editor save failing)?**
- **Yes:** 👥 Partial Outage. Track with an [Internal Incident Note](internal-incident-note-template.md) and review recent middleware/Supabase config drift.
- **No:** Edge Case. Return to the [Incident Index](index.md) to locate the specific symptom.
