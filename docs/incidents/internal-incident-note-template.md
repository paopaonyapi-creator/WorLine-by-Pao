# Internal Incident Note Template

*This is a scratchpad for active incident response. It is NOT for broad sharing and NOT a final postmortem. Copy and paste this into a private Slack thread, notes app, or internal ticket to maintain situational awareness.*

---

**Symptom:** [e.g., /api/health returning 500, user missing subscription row]
**First Report Time:** [time/timezone]
**Scope:** [👤 Isolated | 👥 Partial | 🌐 Broad]
**First-Check Tool:** [e.g., Railway, Stripe, Supabase]

**Action Posture:** [⏪ Rollback-first | 🔎 Investigate-first]
**Likely Cause:** [🚀 Recent Deploy | 🧩 Data/Config Drift]

### Checkpoints
- [ ] Communication sent? (Broad outgage / 1:1 direct reply)
- [ ] Temp unblock applied? (For isolated users awaiting root fix)
- [ ] Manual DB edit applied? 

### Next Safe Step
* [e.g. "Triggering Vercel rollback", "Opening Supabase Table Editor", "Checking Stripe Webhook logs"]
