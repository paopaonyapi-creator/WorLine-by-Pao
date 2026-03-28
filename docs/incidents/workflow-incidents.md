# Workflow Incidents 🛠️

*Use this filtered hub when the issue primarily blocks maintainers, internal admin tools, or local velocity rather than causing live customer breakage. These incidents rarely need a public outage notice.*

### CI/CD & Testing
- ⚪ [CI passes but local fails](ci-passes-local-fails.md) (Check `.env.local` vs `.env.example`.)
- ⚪ [Local-vs-CI drift](local-vs-ci-drift.md) (Check lockfile changes or node versions.)
- ⚪ [E2E auth tests skip unexpectedly](e2e-tests-skip.md) (Check Playwright headless config.)

### Admin & Infrastructure
- 🟡 [Admin access denied](admin-access-fails.md) (Check `.env` overrides or Supabase roles.)
- 🟠 [Webhook deliveries return 400](webhook-deliveries-return-400.md) (Check Stripe log signatures. Usually requires internal manual DB fixes or temp unblocks.)

---
> ↩️ **Not what you need?** Return to [Which Doc First?](which-doc-first.md) or the [Main Incident Index](index.md).
