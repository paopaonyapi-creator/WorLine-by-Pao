# Broad Production Incidents 🌐

*Use this filtered hub when the application is fundamentally broken for many users at once. These incidents heavily favor immediate rollback over deep investigation.*

### Core Availability (App Down)
- 🔴 [`/api/health` returns 500](api-health-returns-500.md) (Check Railway. Rollback likely.)
- 🔴 [`/app` redirects to `/misconfigured`](app-redirects-to-misconfigured.md) (Check `.env` integrity.)
- 🔴 [Checkout returns 500](checkout-returns-500.md) (Check Stripe logs via Terminal. Rollback likely. See [Billing Hub](billing-hub.md) for more.)

### Core Workflows (Auth & UI)
- 🟡 [`/app` redirects to `/login` (Auth Loop)](app-redirects-to-login.md) (Check cookie limits / middleware logic.)
- 🔵 [Mobile nav or app shell breaks](mobile-nav-or-app-shell-breaks.md) (Check React Suspense boundaries. Rollback likely.)
- 🔵 [Editor save fails (if broad)](editor-save-fails.md) (Check Supabase RLS policies.)
- 🔵 [Export breaks broadly after deploy](export-fails-png-pdf.md) (Check serverless function memory limits.)

---
> ↩️ **Not what you need?** Return to [Which Doc First?](which-doc-first.md) or the [Main Incident Index](index.md).
