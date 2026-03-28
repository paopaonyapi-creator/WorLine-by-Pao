# Quick Restart Guide

Haven't touched the repo since Friday? Run through this 2-minute checklist to get your bearings before changing code or triggering a deploy.

## 1. Get Synced
- [ ] Pull latest: `git pull origin master`
- [ ] Install deps: `pnpm install` (if `package.json` changed)
- [ ] Review recent commits: `git log -3 --oneline`
- [ ] Read the latest [Recent Changes Summary](recent-changes-template.md) if one was left behind.
- [ ] Check for a saved [Session Resume Note](session-resume-template.md) if you paused work mid-feature.

## 2. Check Repo Health
- [ ] Run `pnpm typecheck` (ensure the baseline compiles)
- [ ] Run `pnpm test` (verify unit tests pass)
- [ ] Open the live production app and confirm `/api/health` returns 200

## 3. Active Incident Response
If you are opening this repo because of an active outage or angry user right now:
- Open **[🚨 The First 10 Minutes](incidents/first-10-minutes.md)** immediately to triage it safely.
- Need a fast scan of what tool to check? Open the **[📊 Incident Matrix](incidents/matrix.md)**.
- Need the full list of playbooks? Open the **[Incident Index](incidents/index.md)** (or try the **[Top Recurring Incidents](incidents/top-recurring.md)** fast lane).

## 4. Check for Lingering Fires
- [ ] Read the [Release Readiness Scorecard](release-readiness-scorecard.md). Are any core paths blocked?
- [ ] Check `docs/postmortems/` for any incidents that happened while you were away.
- [ ] Check GitHub Issues for any newly reported `🚨 critical` regressions.

## 5. Decide Your Next Move
- **Fixing a bug?** Start at the [Troubleshooting Shortcuts](troubleshooting-shortcuts.md) to find the right file.
- **Modifying a core flow?** Check the [File Risk Map](file-risk-map.md) to see if you need a PR vs direct push.
- **Ready to deploy?** Use the [Pre-Release Checklist](pre-release-checklist.md).

> Always keep `master` deployable. See the [Merge Policy](merge-policy.md).
