# Triage Taxonomy

How to label and prioritize issues in this repo. Keep labeling consistent so triage takes seconds, not minutes.

---

## Severity Labels

Apply exactly one severity label per issue. These align with the [bug report template](../.github/ISSUE_TEMPLATE/bug_report.md) severity choices.

| Label | When to use | Example |
|-------|-------------|---------|
| `critical` | Auth, billing, or deploy is broken in production. Users are blocked. | Checkout 500, webhook stopped, `/app` redirect loop |
| `major` | Feature is broken but a workaround exists, or only affects a subset of users. | Export fails on mobile only, admin gating wrong for one email |
| `minor` | Cosmetic, docs-only, edge case, or dev tooling issue. | Typo in runbook, badge color wrong, flaky CI test |

---

## Area Labels

Apply one or more area labels to identify which part of the system is affected.

| Label | When to use | Key files |
|-------|-------------|-----------|
| `auth` | Session handling, login redirects, middleware behavior | `src/lib/supabase/middleware.ts` |
| `admin` | Admin gating, `ADMIN_EMAILS` logic, admin dashboard | `src/app/app/(dashboard)/admin/layout.tsx` |
| `billing` | Checkout flow, subscription status, billing page UI | `src/app/api/checkout/route.ts`, `settings/billing/page.tsx` |
| `stripe` | Webhook delivery, Stripe secrets, Stripe dashboard issues | `src/app/api/stripe/webhook/route.ts` |
| `editor` | Drawing engine, canvas state, Zustand store, save logic | `src/components/editor/EditorWorkspace.tsx` |
| `export` | PNG/PDF generation, `pdf-lib`, `toDataURL` failures | `src/components/editor/EditorWorkspace.tsx` |
| `responsive` | Mobile nav, app shell layout, viewport-specific breakage | `src/app/app/(dashboard)/layout.tsx` |
| `deploy` | Railway build, env var sync, `/api/health`, Dockerfile | `railway.json`, `Dockerfile`, `.env.example` |
| `ci` | GitHub Actions, workflow config, CI-vs-local differences | `.github/workflows/ci.yml` |
| `docs` | Runbook, checklist, glossary, or any `docs/` file | `docs/` |

---

## Status Labels

Optional. Use when the issue needs a specific follow-up action before it can be resolved.

| Label | When to use |
|-------|-------------|
| `needs-env-check` | Likely caused by a missing or mismatched env var. Requires checking Railway Variables or `.env.local`. |
| `needs-manual-qa` | Cannot be verified by automated tests. Requires manual visual or device testing per the [Manual QA Matrix](manual-qa-matrix.md). |
| `needs-stripe-check` | Requires inspecting Stripe → Developers → Webhooks or Logs to verify delivery status. |
| `regression` | A feature that previously worked is now broken. |
| `high-risk` | Touches middleware, checkout, webhook, or editor save — the repo's highest-risk files. |

---

## How to Triage an Issue

1. **Read the bug report.** The [template](../.github/ISSUE_TEMPLATE/bug_report.md) pre-fills area and severity.
2. **Apply one severity label** (`critical` / `major` / `minor`).
3. **Apply one or more area labels** based on what broke.
4. **Apply status labels** if a specific follow-up is needed.
5. **Check the [Troubleshooting Shortcuts](troubleshooting-shortcuts.md)** — the fix may already be documented.
6. **Assign or act.** Critical issues get immediate attention. Minor issues can wait for the next PR batch.

---

## Setting Up Labels in GitHub

These labels are not auto-created. To add them once:

1. Go to the repo → **Issues** → **Labels**.
2. Create each label from the tables above.
3. Suggested color groups:
   - Severity: `critical` red, `major` yellow, `minor` green
   - Area: use a consistent neutral color (e.g., blue or gray)
   - Status: use a distinct accent color (e.g., purple or orange)

This is a one-time manual setup. No automation needed.

---

## What Still Requires Human Judgment

- **Severity assignment** — only you know if the issue is blocking real users or just an edge case.
- **Duplicate detection** — check existing issues before creating a new one.
- **Root-cause vs. symptom** — a billing badge bug might be a webhook issue, not a UI issue. Apply both labels if unsure.
- **Priority within severity** — two `major` issues may have different urgency. Use your judgment on ordering.
