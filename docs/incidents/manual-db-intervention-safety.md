# Manual DB Intervention Safety

*Editing Supabase rows manually (✍️) is risky. Follow these strict constraints to avoid introducing secondary corruption during an active incident.*

**1. Double-Check Identity**
Before changing a boolean or JSON blob, confirm the row belongs to the exact user complaining. Do not guess based on first name. Match the exact `user_id` from the Stripe payload or their session.

**2. Minimal Corrections Only**
Never perform broad `UPDATE table SET status = ...` query sweeps during a fire. Edit the specific row via the Supabase Table Editor. Fix only the user who reported it while you hunt for the actual code bug.

**3. Verify Mismatches Before Editing**
If altering a subscription status, physically open the Stripe Dashboard and confirm the Stripe state (e.g. Paid) contradicts the Supabase state (e.g. Canceled). Never change a subscription to "Pro" manually without proof of payment clearing.

**4. Track It**
When you manually override the system, log it immediately in an [Internal Incident Note](internal-incident-note-template.md). Manual fixes treat symptoms, not root causes. The codebase still has a bug that needs fixing tomorrow.

**5. Verify the Unblock**
Immediately after saving the DB edit, run the [Post-Manual DB Fix Checks](post-manual-db-fix-checks.md). Ensure the user is actually unblocked.
