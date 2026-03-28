# New Playbook Checklist 📝

*Follow this exact checklist when adding a new 1-minute playbook. Missing these links creates "doc drift" where a playbook exists but maintainers can't easily find it under pressure.*

### The Playbook File
- [ ] **Name it by its symptom:** `docs/incidents/user-cannot-save-project.md` (Not `supabase-rls-bug.md`).
- [ ] **Keep it tiny:** Under 150 words. A playbook is a physical checklist, not a tutorial.
- [ ] **Name the first-check tool:** E.g., *(Check Railway Logs)* or *(Check Stripe Dashboard)*.
- [ ] **Link safety checks:** If the playbook tells a maintainer to run a DB edit, link to [Manual DB Intervention Safety](manual-db-intervention-safety.md).

### The Routing Architecture
- [ ] **Add to the Main Index:** Add a single line to [index.md](index.md) with the correct emoji prefix (🔴 Outage, 🟠 Revenue, 🟡 Access, 🔵 UI, ⚪ Testing) and all appropriate [Tags](tag-legend.md).
- [ ] **Add to the Matrix:** Add a simplified line mapping Symptom → Tool → Action in the [Incident Matrix](matrix.md).
- [ ] **Add to ONE Primary Hub:**
  - If a user experiences it: [Production Incidents](production-incidents.md).
  - If a maintainer/bot experiences it: [Workflow Incidents](workflow-incidents.md).
- [ ] **Add to ONE Domain Hub (If Applicable):**
  - If it involves payments/webhooks: [Billing Hub](billing-hub.md).
  - If it involves login/admin/state: [Auth & Access Hub](auth-access-hub.md).
  - If it involves canvas/exports/layout: [Editor & UI Hub](editor-ui-hub.md).

> **Done?** Click through from the [Which Doc First?](which-doc-first.md) selector all the way to your new playbook to verify the path makes sense.
