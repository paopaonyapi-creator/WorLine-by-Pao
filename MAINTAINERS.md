# Maintainer Guide

Welcome to WorLine. If you are preparing to modify this repository, read this central guide first. The codebase operates with tight security, testing, and operational bounds that must be respected to keep production stable.

## 1. What This Repository Is
WorLine is a single-line diagram editor tailored for professional electrical engineers. At its core, it is a heavy client-side React Canvas application wrapped in a strict Next.js/Supabase server-side security perimeter and monetized via Stripe.

## 2. Before You Change Anything
Do not rewrite core logic before understanding the existing architecture. 
- 📚 **[Documentation Index](docs/index.md):** The central hub for all operational guides.
- 🏗️ **[Architecture Map](docs/architecture-map.md):** Visual flow of how Auth, Admin, Editor, and Webhooks interact.
- 🤝 **[Repository Handoff Summary](docs/repository-handoff.md):** A detailed snapshot of our tech stack overrides and missing environment bounds.
- 📖 **[Debugging Glossary](docs/debugging-glossary.md):** Quick definitions for Supabase, Stripe, Konva, RLS, and other repo-specific terms.

## 3. High-Risk Areas to Change Carefully
If you touch the following files, test extensively.
- `src/lib/supabase/middleware.ts` — The gatekeeper. Missing env vars or bad sessions will crash the app into a redirect loop here.
- `src/app/api/checkout/route.ts` — The Stripe link. Never trust client payloads. The `user.id` is pulled exclusively from the server session.
- `src/components/editor/EditorWorkspace.tsx` — The Drawing Engine. Zustand state mapping dictates physical polygon bounds on the Konva canvas.

If something breaks after a change, check the [Troubleshooting Shortcuts](docs/troubleshooting-shortcuts.md) table for a fast symptom → file → dashboard lookup.

## 4. How to Run Tests
Do not push failing checks into `master`. 

**Unit Tests (Fast):**
```bash
pnpm test
```
*Validates billing parsers and environment reset hooks isolation.*

**E2E Tests (Heavy / Playwright):**
```bash
pnpm test:e2e
```
*Requires explicit [Seeded Test Users](docs/local-test-seed-workflow.md) within `.env.local` to execute authenticated flows.*

## 5. Opening a Pull Request
Every PR auto-populates with the [PR checklist template](.github/pull_request_template.md). Fill it out honestly — it covers auth, billing, editor, and deploy risk areas so regressions are caught before merge. Please also review the [Merge Policy](docs/merge-policy.md) for when a PR is strictly required over a direct push and which checks must pass.

## 6. Most Important Commands
```bash
pnpm install    # Install deps
pnpm dev        # Boot the local Turbopack server
pnpm typecheck  # Prevent stealthy typescript regressions
```

## 7. When to Consult Release Docs
Before executing `git push` on a release tag, you must verify the operational checklists:
- **[Pre-Release Checklist](docs/pre-release-checklist.md):** The exact criteria required before merging to production.
- **[Launch-Day Checklist](docs/releases/launch-day-checklist.md):** Which external tabs (Stripe, Railway, Supabase) to open immediately after deploying.
- **[Production Runbook](docs/production-runbook.md):** What to do if `/api/health` 500s directly after a deployment.

## 8. Reporting Regressions
If you discover a breakage in Auth, Billing, Editor, or Deploy — first check the [Troubleshooting Shortcuts](docs/troubleshooting-shortcuts.md) for a known fix. If the issue persists, file it using the [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) and complete the regression checklist so triage can start immediately. Label the issue using the [Triage Taxonomy](docs/triage-taxonomy.md). After resolving a production incident, document what happened using the [Postmortem Template](docs/postmortem-template.md).

## 9. First-Time GitHub Setup
If you just created or forked this repo, run through the [GitHub Setup Checklist](docs/github-setup-checklist.md) once to create labels, verify templates, and confirm doc links.
