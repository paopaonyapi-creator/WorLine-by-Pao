# User-Facing Incidents (👤 / 👥 / 🌐)

*This is a filtered fast-lane for when external customers are actively complaining or blocked. Click the matched symptom to open the 1-minute playbook.*

### Full Outage or Deploy Breakage
- 🔴 [`/api/health` returns 500](api-health-returns-500.md)
- 🔴 [`/app` redirects to `/misconfigured`](app-redirects-to-misconfigured.md)
- 🔵 [Mobile nav is broken](mobile-nav-or-app-shell-breaks.md)

### Billing & Checkout
- 🟠 [Checkout returns 500](checkout-returns-500.md)
- 🟠 [User paid but still sees Free](billing-still-free-after-payment.md)
- 🟠 [Subscription row missing entirely](subscription-row-missing.md)
- 🟡 [Billing badge shows wrong plan](billing-status-badge-wrong.md)
- 🟠 [Stripe canceled but Supabase active (Revenue Leak)](stripe-canceled-supabase-active.md)
- 🟡 [Stripe paid but Supabase canceled (False Churn)](stripe-paid-supabase-canceled.md)

### Access & Core Features
- 🟡 [`/app` redirects to `/login` (Auth Loop)](app-redirects-to-login.md)
- 🔵 [Editor save fails](editor-save-fails.md)
- 🔵 [PNG/PDF export fails](export-fails-png-pdf.md)

---
> 🎯 **Don't see it?** Return to the [Main Incident Index](index.md) or check the [Incident Matrix](matrix.md).
