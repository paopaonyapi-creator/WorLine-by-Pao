---
name: Bug Report / Regression 🐛
about: Create a report to track a high-severity breakage (Auth, Billing, Editor).
title: 'bug(area): short description'
labels: 'bug, triage'
assignees: ''

---

## 🔥 Area Affected
*Which high-risk repository boundary broke? (Delete the ones that do not apply)*
- **Auth / Admin** (Middleware loops, 500 blockades, missed `.env` checks)
- **Billing / Stripe** (Checkout failures, Unhandled Webhooks)
- **Editor / Canvas / Export** (Drawing logic crashed, PDF builder timed out)
- **Deploy / Infrastructure** (Database misconfigured, Edge timeout)
- **Docs / DX** (Outdated Runbook command)

## 🤔 Expected Behavior
*A clear and concise description of what you expected to happen.*

## 💥 Actual Behavior
*A clear and concise description of what actually happened. (Include exact error codes if known).*

## 👣 Reproduction Steps
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error.

---

## 🛑 Repository Regression Checklist
*Help us aggressively triage this by tracking standard runtime behaviors:*
- [ ] Did `/api/health` return HTTP 200 properly?
- [ ] Did `/app` redirect to `/login` gracefully without throwing raw 500 Server Errors?
- [ ] Did `/admin` fail for every user, or only unauthenticated users?
- [ ] Did the Stripe Checkout redirect return a 500?
- [ ] Did the Stripe Webhook boundary receive a HTTP 200 delivered status?
- [ ] Did the Canvas Save/Export crash **only** on Mobile viewports or explicitly inside Headless CI?

---

## 💻 Environment
- **Stage**: [e.g. Local Turbopack / CI Pipeline / Railway Production]
- **Browser/Device:** [e.g. Chrome 120, iPhone 14 / Safari]
- **Relevant `.env` Context**: *(Is `STRIPE_WEBHOOK_SECRET` missing? **Do NOT Paste secrets here!**)*

## 📸 Logs / Screenshots
*Drop your browser Network tab results, Railway crash logs, or Stripe Webhook Delivery snippets here.*
