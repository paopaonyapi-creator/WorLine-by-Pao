# Manual QA Matrix

This compact matrix maps the highest-risk application paths. Use this during a production smoke test or prior to sealing your pre-release checklist.

*Note: E2E Playwright tests natively cover the happy paths for these scenarios. This matrix is strictly for your eyes-on visual validation pass.*

| Area | Scenario | Expected Result | Desktop | Mobile | Notes / Risk Level |
|---|---|---|---|---|---|
| **Auth** | Logged-out visit to `/app` | Redirects safely to `/login`. No UI flashes. | [ ] | [ ] | High - Security perimeter |
| **Admin** | Non-admin visits `/admin` | Blocked securely; redirected to `/app`. | [ ] | [ ] | High - Security perimeter |
| **Admin** | Authorized admin visits `/admin` | Admin dashboard loads smoothly. | [ ] | [ ] | Low |
| **Billing** | Pricing page action | "Upgrade" button redirects to auth flow or initiates checkout. | [ ] | [ ] | High - Revenue blocking |
| **Billing** | Auth user views `/app/settings/billing` | Page renders active plan status without 500 crashes. | [ ] | [ ] | Medium |
| **Billing** | Post-Checkout Webhook | Subscriptions table updates; "Active" badge reflects natively in UI. | [ ] | [ ] | High - Revenue blocking |
| **Editor** | New project creation | Blank canvas loads; URL reflects valid UUID. | [ ] | [ ] | High - Core function |
| **Editor** | Loading demo/existing project | Symbols render dynamically; no unhandled element crashes. | [ ] | [ ] | High - Core function |
| **Editor** | Save operation | Pressing "Save" spawns successful Toast; DB record updates. | [ ] | [ ] | High - Data loss |
| **Editor** | Export PNG | File downloads matching Canvas stage dimensions natively. | [ ] | [ ] | Medium - Hard to E2E |
| **Editor** | Export PDF | File downloads as high-fidelity PDF successfully. | [ ] | [ ] | Medium - Hard to E2E |
| **App Shell** | Sidebar/Nav interaction | Router navigates successfully without React state crashes. | [ ] | N/A | Low |
| **App Shell** | Hamburger menu toggle | Drawer overlaps mobile layout; nav routes cleanly. | N/A | [ ] | Medium - Layout breaks |

---

### Associated Workflows
- If failures occur during this QA pass, immediately consult the [Production Runbook](production-runbook.md).
- To quickly bootstrap test accounts for these steps, see the [Local Test Seed Workflow](local-test-seed-workflow.md).
