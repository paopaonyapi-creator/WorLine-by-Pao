# File Risk Map

Before modifying files, consult this table to quickly judge how safely you can make a change and what checks are mandatory before pushing to `master`.

> Editing Stripe or Middleware? Stop and run through the [High-Risk Edit Checklists](high-risk-edit-checklists.md) first.

---

## Risk Levels Explained
- 🟢 **Low Risk:** Safe to change directly on `master`. Mostly cosmetic or documentation.
- 🟡 **Medium Risk:** Can break layout or isolated UI flows. Open a PR and run `pnpm dev`.
- 🔴 **High Risk:** Can lock out users, break billing, or corrupt data. PR required. Must run E2E tests and `pnpm typecheck` before merging.

---

## Core Files & Areas

| File / Area | Risk | Why It’s Risky | Minimum Checks Before Merge | Related Docs |
|-------------|------|----------------|-----------------------------|--------------|
| `src/lib/supabase/middleware.ts` | 🔴 **High** | Auth gatekeeper. Bugs here cause infinite login redirect loops. | `pnpm typecheck`, Manual Auth QA, E2E | [Troubleshooting Shortcuts](troubleshooting-shortcuts.md) |
| `src/app/api/checkout/route.ts` | 🔴 **High** | Creates Stripe sessions. Bugs block revenue and upgrades. | `pnpm test`, E2E (Subscription flow) | [Merge Policy](merge-policy.md) |
| `src/app/api/stripe/webhook/route.ts` | 🔴 **High** | Syncs Stripe state to DB. Bugs cause "paid but UI says free" state. | `pnpm typecheck`, Manual webhook retry in Stripe | [Runbook](production-runbook.md) |
| `src/components/editor/EditorWorkspace.tsx` | 🔴 **High** | The core Konva canvas. Bugs break drawing, saving, or PDF export. | `pnpm typecheck`, Manual QA (Canvas fidelity) | [Manual QA Matrix](manual-qa-matrix.md) |
| `src/app/api/health/route.ts` | 🟡 **Medium** | Used by Railway to determine if deploy is healthy. Bugs roll back deploy. | `pnpm dev` (verify /api/health returns 200) | [Runbook](production-runbook.md) |
| `src/app/app/(dashboard)/admin/layout.tsx` | 🟡 **Medium** | Controls access to admin dashboard. Bugs may expose admin data. | Verify admin gating manually for 1 admin & 1 normal user | [Architecture Map](architecture-map.md) |
| `src/app/app/(dashboard)/layout.tsx` | 🟡 **Medium** | App shell layer. Bugs break global navigation or mobile responsiveness. | Manual QA on Desktop & Mobile viewport | [Bug Report Template](../.github/ISSUE_TEMPLATE/bug_report.md) |
| `.github/pull_request_template.md` | 🟢 **Low** | Only affects developer workflow. No user impact. | None required | [GitHub Setup](github-setup-checklist.md) |
| `docs/*` | 🟢 **Low** | Pure documentation. No runtime impact. | None required (direct push allowed) | [Docs Index](index.md) |

---

### Still Depends on Human Judgment

Even "Low Risk" areas can be dangerous depending on *what* you change:
- **Changing `docs/`:** Safe to push, but if you update the [Runbook](production-runbook.md) with the *wrong* disaster recovery steps, the next maintainer will fail to recover the app.
- **Changing CSS in `layout.tsx`:** Standard Tailwind tweaks are low/medium risk. But if you accidentally slap `z-50` on an overlay that blocks the entire screen, it becomes a Critical severity bug.

Always think: *"If this breaks, what is the impact on the user?"*

> For a symptom → file mapping when things are actively broken, check the [Troubleshooting Shortcuts](troubleshooting-shortcuts.md).
