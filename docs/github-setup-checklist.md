# GitHub Setup Checklist

One-time setup tasks for the WorLine repo on GitHub. Run through this list once after creating or cloning the repo settings. Everything here is done in the GitHub UI — no automation required.

---

## 1. Create Labels

Go to **Settings → Labels** (or Issues → Labels) and create the labels below. Delete any default GitHub labels you do not use.

### Severity Labels

| Label | Color | Hex |
|-------|-------|-----|
| `critical` | 🔴 Red | `#D73A4A` |
| `major` | 🟡 Yellow | `#FBCA04` |
| `minor` | 🟢 Green | `#0E8A16` |

### Area Labels

| Label | Color | Hex |
|-------|-------|-----|
| `auth` | 🔵 Blue | `#1D76DB` |
| `admin` | 🔵 Blue | `#1D76DB` |
| `billing` | 🔵 Blue | `#1D76DB` |
| `stripe` | 🔵 Blue | `#1D76DB` |
| `editor` | 🔵 Blue | `#1D76DB` |
| `export` | 🔵 Blue | `#1D76DB` |
| `responsive` | 🔵 Blue | `#1D76DB` |
| `deploy` | 🔵 Blue | `#1D76DB` |
| `ci` | 🔵 Blue | `#1D76DB` |
| `docs` | 🔵 Blue | `#1D76DB` |

### Status Labels

| Label | Color | Hex |
|-------|-------|-----|
| `needs-env-check` | 🟣 Purple | `#D876E3` |
| `needs-manual-qa` | 🟣 Purple | `#D876E3` |
| `needs-stripe-check` | 🟣 Purple | `#D876E3` |
| `regression` | 🟠 Orange | `#E99695` |
| `high-risk` | 🟠 Orange | `#E99695` |

### Default Labels to Keep

| Label | Notes |
|-------|-------|
| `bug` | Keep — used by the bug report template's default label set |
| `triage` | Keep — used by the bug report template's default label set |

> Full label definitions are in the [Triage Taxonomy](triage-taxonomy.md).

---

## 2. Verify Issue Templates

- [ ] Go to **Issues → New Issue**
- [ ] Confirm "Bug Report / Regression 🐛" appears as a template option
- [ ] Confirm the template chooser shows links to Troubleshooting Shortcuts and Production Runbook (from `config.yml`)
- [ ] Confirm "Open a blank issue" is available (blank issues are enabled)
- [ ] File a test issue using the template, verify all sections render correctly, then close/delete it

---

## 3. Verify PR Template

- [ ] Open a draft PR against any branch
- [ ] Confirm the PR description auto-populates with the checklist from `.github/pull_request_template.md`
- [ ] Confirm all checkbox sections render: Always, Auth/Admin, Billing/Stripe, Editor/Export, Env/Deploy, Behavior Changed
- [ ] Close the draft PR

---

## 4. Verify Doc Links

- [ ] Open `MAINTAINERS.md` on GitHub — confirm all links resolve (docs index, architecture map, handoff, glossary)
- [ ] Open `docs/index.md` on GitHub — confirm all links resolve (all listed docs)
- [ ] Spot-check 2–3 cross-links inside `docs/` files (e.g., troubleshooting → runbook, triage → bug template)

---

## 5. Repository Settings (Optional)

These are not required but improve workflow consistency:

- [ ] **Default branch:** Confirm `master` is the default branch
- [ ] **Branch protection:** Enforce the required tests as documented in the [Merge Policy](merge-policy.md)
- [ ] **Squash merging:** Enable "Squash and merge" as the default strategy (also per [Merge Policy](merge-policy.md))
- [ ] **Auto-delete branches:** Enable "Automatically delete head branches" after merge

---

## When to Re-Run This Checklist

- After transferring or forking the repo
- After major changes to `.github/` templates
- After adding new labels to the [Triage Taxonomy](triage-taxonomy.md)

---

> All label definitions, severity guidance, and triage workflow are documented in the [Triage Taxonomy](triage-taxonomy.md).
