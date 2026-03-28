# Worked Incident Examples

*Not sure how to string these checklists together? Here are 5 real-world examples of how a maintainer should use the incident docs under pressure.*

### Example 1: `/api/health` returns 500 after a deploy
1. **Symptom:** Uptime monitor pings Slack.
2. **First Doc:** Open `first-10-minutes.md`.
3. **Classify:** 🔴 Outage. 🌐 Broad impact.
4. **Action:** Find symptom in `matrix.md`. It explicitly says ⏪ Rollback.
5. **Mitigate:** Hit "Rollback" in Railway. Do not look at logs yet.
6. **Communicate:** Copy the Initial Notice from `outage-update-template.md` to Discord.
7. **Verify:** Run the `post-rollback-checks.md`.
8. **Next Step:** Now you can safely dig into the logs to find the bug.

### Example 2: User paid but still sees "Free"
1. **Symptom:** Email from user saying they just bought Pro but are locked out.
2. **First Doc:** Open `first-10-minutes.md`.
3. **Classify:** 🟠 Revenue. 👤 Isolated impact.
4. **Action:** Find symptom in `matrix.md`. It says 🔎 Investigate. First-check tool shows Stripe.
5. **Mitigate:** Open Stripe. See the payment succeeded. Webhook failed.
6. **Unblock:** Use `manual-db-intervention-safety.md`. Override their Supabase status to "Pro" manually so they can work. Run `post-manual-db-fix-checks.md`.
7. **Communicate:** Grab a `direct-user-reply-templates.md` reply.
8. **Next Step:** Note the workaround in an `internal-incident-note-template.md` and debug the webhook codebase later.

### Example 3: Maintainer locked out of Admin dashboard
1. **Symptom:** You try to log in and get redirected away.
2. **First Doc:** `maintainer-facing.md`. 
3. **Classify:** 🟡 Access. 🛠️ Maintainer impact.
4. **Action:** Open `admin-access-fails.md` playbook. 
5. **Mitigate:** Check your `.env.local` for the exact admin email bypass string. 
6. **Next Step:** No broad comms needed. Fix locally.

### Example 4: Editor save fails for one specific user
1. **Symptom:** User reports their canvas won't save.
2. **First Doc:** `first-10-minutes.md`.
3. **Classify:** 🔵 Editor. 👤 Isolated impact.
4. **Action:** `matrix.md` says ⏪ Rollback. Wait, isolated? Check `broad-vs-isolated.md`. Since it's isolated to one user's machine, it might be a payload size limit or browser issue.
5. **Mitigate:** Ask the user for their exact Browser and Project size (following the 1-minute playbook).
6. **Next Step:** Bug ticket. No immediate rollback required.

### Example 5: Mobile nav breaks broadly
1. **Symptom:** Discord lights up with users unable to open the menu on phones.
2. **First Doc:** `user-facing.md`.
3. **Classify:** 🔵 UI. 🌐 Broad impact.
4. **Action:** Check `tag-legend.md`. Broad UI bugs without data risk (🪶) are ⏪ Rollback targets if introduced today.
5. **Mitigate:** Revert the main branch. 
6. **Next Step:** Post a broad update and run the `post-rollback-checks.md`.
