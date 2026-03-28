# WorLine Documentation Index

Welcome to the WorLine documentation hub. As a solo-maintainer, finding the exact playbook or checklist you need during a critical deploy or bugfix is paramount. 

Use this feature map to quickly locate the correct bounded document.

---

## 1. Release & Rollout
- **[Pre-Release Checklist](pre-release-checklist.md)**
  Execute this immediately prior to drafting a version tag. It contains the exact manual and automated boundaries required before pushing to production safely natively.
- **[v0.2.0 Rollout & Rollback Plan](releases/v0.2.0-rollout.md)**
  Consult this the exact second you hit "Deploy" in Railway. It outlines the first 5-minute success criteria and definitive "Go/No-Go" rollback logic.
- **[Historical Releases](releases/v0.2.0.md)**
  View the exact security, billing, and system hardening differences captured cleanly across versioned milestones.

## 2. Testing & QA
- **[Manual QA Matrix](manual-qa-matrix.md)**
  The definitive physical checklist required to validate boundaries that E2E Playwright tests cannot safely check (like Canvas visual fidelity and raw PDF exports).
- **[Testing Limitations & Flaky Notes](testing-limitations.md)**
  Read this before spending hours fighting CI pipelines natively! It explains exactly why certain Stripe checkouts must remain mocked and why Headless Chromium might drop PDF binaries randomly.

## 3. Ops & Infrastructure
- **[Repository Handoff Summary](repository-handoff.md)**
  Start here if you have been away from the codebase. It details the precise locations of Stripe Logic, Supabase boundaries, and the most critical `.env` fallbacks.
- **[Architecture Map](architecture-map.md)**
  Visually charts the physical data flows covering React `Suspense`, Supabase Webhooks, and E2E bot boundaries logically natively!
- **[Production Runbook](production-runbook.md)**
  The absolute source of truth when the live application goes down. Outlines immediate triage steps natively connecting Supabase incidents, Stripe Webhook crashes, and Railway memory limits.
- **[Local Test Seed Workflow](local-test-seed-workflow.md)**
  Explains how to quickly spin up localized `user@example.com` and administrative credentials required to power the end-to-end testing matrix natively.

## 4. Auth, Billing, & Editor (Code Boundaries)
While specific `docs/` files map these broadly, remember to check these primary file patterns locally:
- **Auth Guarding:** `src/lib/supabase/middleware.ts` (Routing logic)
- **Billing Security:** `src/app/api/checkout/route.ts` (Server-side Stripe identity binding) 
- **Editor Canvas:** `src/components/editor/EditorWorkspace.tsx` (Core Konva architecture)
