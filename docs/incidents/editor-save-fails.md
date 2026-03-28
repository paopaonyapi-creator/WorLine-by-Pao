# Incident: Editor Save Fails

**Symptom:** A user is working in the canvas editor, clicks save, but the project state doesn't persist, or they see a red error toast.
**Time to execute:** 1 minute.
**Goal:** Determine if this is a client-side state issue, a stale Supabase session, or an RLS block.

---

### 1. Confirm the Client Error
- [ ] Open your browser's Developer Tools -> Console.
- [ ] Attempt to save a test project.
- [ ] Do you see a `401 Unauthorized` or an RLS violation error from Supabase?

### 2. Verify Session State
- [ ] Open the Network tab.
- [ ] Inspect the payload of the failing `PATCH/POST` request to Supabase.
- [ ] Is the `Authorization: Bearer <token>` header missing or expired? (If yes, the user's session simply expired. Provide a standard "please log out and log back in" support reply).

### 3. Verify Database Ownership
- [ ] Open Supabase -> Table Editor -> `projects`.
- [ ] Find the specific project ID the user is trying to save.
- [ ] Does the `user_id` column exactly match the Auth ID of the user trying to save it?

### 4. Verify Payload Integrity
- [ ] In the Network tab, look at the Request Payload.
- [ ] Is the canvas JSON state too large? (Supabase free tier has payload limits).
- [ ] Does it contain invalid JSON?

---

### Stop Conditions & Next Steps
- **Rollback:** If *every* save is failing globally with a `500` immediately following a deployment, rollback immediately.
- **Escalate:** If the `user_id` matches and the token is valid, but Supabase still throws an RLS error, the Row Level Security policy itself is broken in the database. Start a [Postmortem](../postmortem-template.md).
- **Communicate:** If the user lost work due to an expired token, recommend they copy their canvas JSON locally next time they see a save error.

> *For a map of how the Editor components interact, see the [Manual QA Matrix](../manual-qa-matrix.md).*
