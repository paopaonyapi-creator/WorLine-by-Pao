# Top Recurring Incidents Fast Lane

*Not every incident is equally likely. These are the absolute most common things that break in production. If you don't confidently see your issue here, fall back to the [Main Incident Index](index.md).*

### 1. App completely down (Outage)
👉 **[`api/health` 500](api-health-returns-500.md)** (Check Railway immediately. Rollback highly likely.)

### 2. Users paying but getting locked out
👉 **[User paid but still Free](billing-still-free-after-payment.md)** (Checkout succeeded, but Stripe Webhook dropped. Requires manual DB edit.)

### 3. Subscription data mismatch
👉 **[Subscription row missing](subscription-row-missing.md)** (Edge case in Supabase auth linking. Requires temporary unblock.)

### 4. Checkout crashes on click
👉 **[Checkout returns 500](checkout-returns-500.md)** (Usually broken middleware. Broad impact, rollback immediately.)

### 5. You are locked out of admin data
👉 **[Admin access denied](admin-access-fails.md)** (Check local `.env` missing fallback variables.)

### 6. Editor won't save progress
👉 **[Editor save fails](editor-save-fails.md)** (Always run [Broad vs Isolated triage](broad-vs-isolated.md) before assuming the whole world is broken.)

### 7. App works but mobile menu won't open
👉 **[Mobile nav breaks](mobile-nav-or-app-shell-breaks.md)** (Usually a safe rollback if just deployed.)
