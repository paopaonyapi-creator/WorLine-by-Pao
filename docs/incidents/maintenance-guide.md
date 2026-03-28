# Incident Docs Maintenance Guide

*The incident system is a highly structured decision engine. Be careful when updating it. Follow these strict rules to prevent doc drift and keep the matrix usable under pressure.*

**1. When adding a completely new incident playbook:**
You must follow the **[New Playbook Checklist](new-playbook-checklist.md)** precisely. Every new symptom *must* have an entry in the Main Index, the Matrix, a filtered hub, and a domain hub (if applicable). Do not create orphaned playbooks.

**2. When adding a new tag family:**
- Update the definitions in `tag-legend.md`.
- Apply the tag across all existing relevant playbooks in `index.md`.
- If the tag changes the immediate action (e.g. introduces a new "Rollback vs Fix" rule), update `first-10-minutes.md` and `worked-examples.md` to reflect the new logic.

**3. When adding mitigation templates:**
- Keep text copy-paste friendly. No long paragraphs exploring *why* an incident happened.
- Link the template *only* from the highest-value early decision docs (e.g. `first-10-minutes.md`). Do not paste the template link into all 25 individual playbooks.

**4. Golden Rules:**
- Keep the main index *symptom-first*. Do not group by generic labels like "Database Errors". Group by "Save fails".
- Keep the matrix compact. Do not let columns expand.
- Avoid duplicating the same 10-line explanation in five different docs. Link to the source of truth instead. 
