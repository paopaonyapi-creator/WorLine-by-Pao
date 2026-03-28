# Auth & Access Hub 🟡

*Identity and access failures require careful debugging to avoid compromising security. Choose the symptom below.*

### User-Facing Auth Loops
- [`/app` redirects to `/login` (Auth Loop)](app-redirects-to-login.md) (User is fundamentally blocked from the app. Rollback likely if broad.)
- [E2E auth tests skip unexpectedly](e2e-tests-skip.md) (Local testing failure. Not a live outage.)

### Maintainer / Admin Lockout
- [Admin access denied](admin-access-fails.md) (Internal workflow blocked. Check `.env` and role flags.)

### Access-State Corrections
- [Account access restored temporarily](account-access-restored-temporarily.md) (When you gave an extension or temporary override before a root-cause fix.)
- [Temporary Unblock Safety](temp-unblock-safety.md) (Rules for executing a manual bypass.)

### Verification
- [Post-Manual DB Fix Checks](post-manual-db-fix-checks.md) (Always run these after updating an auth row or access flag manually.)

---
> ↩️ **Not what you need?** Return to [Which Doc First?](which-doc-first.md) or the [Main Incident Index](index.md).
