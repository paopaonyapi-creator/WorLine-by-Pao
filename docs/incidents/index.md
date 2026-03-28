# Incident Playbooks Index

When a user reports a specific symptom or a monitor starts firing, use this directory to find the ultra-short (1-minute) triage steps. These playbooks are designed to stop you from guessing and force you to check the correct dashboard or environment variable immediately.

### Deploy / Outage
- **Global 500 Outage** → [`/api/health` returns 500](api-health-returns-500.md)
- **Misconfigured Server** → [`/app` redirects to `/misconfigured`](app-redirects-to-misconfigured.md)

### Auth / Access
- **Auth Loop (Kicked Out)** → [`/app` redirects to `/login`](app-redirects-to-login.md)
- **Maintainer Locked Out** → [Admin access denied](admin-access-fails.md)

### Billing / Stripe
- **Checkout Broken** → [Checkout returns 500](checkout-returns-500.md)
- **Paid but Still Free** → [User paid but still sees Free](billing-still-free-after-payment.md)
- **Missing Data Row** → [Subscription row missing entirely](subscription-row-missing.md)
- **UI Mismatch** → [Billing badge shows wrong plan](billing-status-badge-wrong.md)
- **Webhook Rejection** → [Webhooks failing (returns 400)](webhook-deliveries-return-400.md)
- **Revenue Leak (User Canceled)** → [Stripe canceled but Supabase active](stripe-canceled-supabase-active.md)
- **False Churn (User Paid)** → [Stripe paid but Supabase canceled](stripe-paid-supabase-canceled.md)

### Editor / Canvas
- **Progress Lost** → [Editor save fails](editor-save-fails.md)
- **Download Broken** → [PNG/PDF export fails](export-fails-png-pdf.md)

### Responsive / UI
- **Viewport Traps** → [Mobile nav is broken](mobile-nav-or-app-shell-breaks.md)

### Testing / CI
- **E2E Aborts Workflow** → [E2E auth tests skip unexpectedly](e2e-auth-tests-skip.md)
- **"Works On My Machine"** → [CI passes but local fails (or vice versa)](ci-passes-local-fails.md)

---
> *If your exact symptom isn't listed here, start with the broader [Troubleshooting Shortcuts](../troubleshooting-shortcuts.md) table or run through the [Production Runbook](../production-runbook.md).*
