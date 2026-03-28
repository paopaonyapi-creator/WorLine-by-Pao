# Testing Limitations & Flaky Notes

This document honestly outlines the limitations of our current E2E and testing pipelines. When running your **Pre-Release Checklist** or relying on automated validations, be explicitly aware of the following bounds to avoid chasing false-positives or overestimating confidence.


## 1. Environment Differences (Local vs CI)
- **Local Runs:** Expected to execute directly against your localized `.env.local` mappings (usually hitting a local Dockerized Supabase `.co` instance or raw Vercel connections).
- **CI Runs:** Standard GH Actions are completely sterile by default. 
  - **Authenticated Test Skipping:** Without explicit Github Actions Secrets configuring `PLAYWRIGHT_TEST_USER_EMAIL` natively into the runner, any script calling `requireUserSeed()` skips internally gracefully. CI *does not* auto-simulate a Supabase user unless you explicitly provide one.

## 2. Seeded Account & Data Requirements
- Most `.spec.ts` files inside `/tests/e2e` rigorously expect pre-existing row-level data natively inside your target database instance.
- **Why?** Programmatic Playwright account generation inside Supabase runs into email rate-limiting and GoTrue container resets quickly. Always refer to your [Local Test Seed Workflow](local-test-seed-workflow.md) prior to executing tests dynamically.

## 3. High-Risk Editor & Canvas Flakiness
- **Konva Abstractions:** The Editor `<CanvasAreaRaw />` renders purely in WebGL/HTML5 Canvas elements. Playwright `.click()` hooks do not map reliably to SVG lines internally. 
- **Download Delays:** PNG/PDF Exports structurally force Playwright to intercept outbound browser download events. In resource-constrained CI instances or headless Chrome targets natively, the PDF builder (`pdf-lib`) may timeout before returning the blob payload. E2E test scripts prove the "Export Button" executes the function—they do not prove the structural bounds of the image itself.
- **Mobile Viewports:** Parallel Playwright "Mobile Chrome" runs simulate physical viewports, but they cannot flawlessly simulate heavy multi-point touch events natively (like pinch-to-zoom on the Canvas).

## 4. Live Stripe Integration (Smoke vs. Integration)
- E2E tests covering `/app/settings/billing` and the public Pricing page are **Smoke Tests**, not true end-to-end integration tests natively.
- **Why?** Submitting test credit cards repetitively inside Stripe Checkout portals natively across automated matrices triggers anti-fraud metrics natively. 
- **What to Expect:** Playwright cleanly intercepts the `checkout.stripe.com` session redirect dynamically, asserts the URL generated securely, and halts. It does not complete the checkout process natively!

## 5. Manual QA Requirements
Always consult your [Manual QA Matrix](manual-qa-matrix.md) after automated pipelines pass! If a test passes internally but exports visually break, your final physical regression checklist remains the absolute source of truth.
