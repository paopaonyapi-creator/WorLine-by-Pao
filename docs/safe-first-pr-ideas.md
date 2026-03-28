# Safe First PR Ideas

If you are returning to this repository after a long break, or handing it off to a new contributor, these are the safest places to start. They help you warm up to the codebase without risking a critical failure in Auth, Billing, or the Editor Canvas.

Before merging any of these, you must still follow the [Merge Policy](merge-policy.md) (e.g., `pnpm typecheck` and `pnpm test`).

---

### 1. Document Wording & Formatting Cleanup
- **Why it's safe:** `docs/*` files are exclusively markdown. They do not ship to the runtime client.
- **Where to start:** Check the [Debugging Glossary](debugging-glossary.md) or [Troubleshooting Shortcuts](troubleshooting-shortcuts.md) for typos or outdated references.

### 2. Broken Cross-Link Fixes
- **Why it's safe:** A broken link in a README is annoying but doesn't cause a `500` error during checkout.
- **Where to start:** Search `[text](docs/...` across the repo and verify the relative paths actually resolve.

### 3. Issue and PR Template Polish
- **Why it's safe:** The `.github/` folder only dictates the contributor workflow inside GitHub. It does not affect Railway deployments.
- **Where to start:** Look at `.github/pull_request_template.md` and `.github/ISSUE_TEMPLATE/bug_report.md`. Can the wording be tightened?

### 4. Non-Critical UI Text Polish
- **Why it's safe:** Adjusting static strings outside of core flows (e.g., footer text, tooltip labels) rarely breaks React rendering.
- **Where to start:** Search `src/components/ui/` or static layout files for generic strings that need better localization or styling (assuming you avoid `z-index` and complex layout shifts).

---

### 🛑 What to Avoid First

When warming up, **never start** with edits to these areas. See the [File Risk Map](file-risk-map.md) for why:
- `src/lib/supabase/middleware.ts` (Auth routing)
- `src/app/api/checkout/route.ts` (Stripe payments)
- `src/app/api/stripe/webhook/route.ts` (Stripe synchronization)
- `src/components/editor/EditorWorkspace.tsx` (Konva bounds logic)
