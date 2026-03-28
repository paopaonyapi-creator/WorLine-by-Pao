# Incident: Mobile Nav or App Shell Breaks

**Symptom:** Users report they cannot open the sidebar on mobile, the menu button is missing, or the entire screen is covered by an invisible overlay preventing clicks.
**Time to execute:** 1 minute.
**Goal:** Determine if a recent layout change broke conditional rendering, introduced a `z-index` bug, or crashed the React tree.

---

### 1. Recreate the Viewport
- [ ] Open the app on Desktop Chrome.
- [ ] Open Developer Tools -> Toggle Device Toolbar (mobile viewport).
- [ ] Verify: Does the mobile "hamburger" menu even render?

### 2. Check the React Tree
- [ ] If the button is missing, check the Console for React hydration or crash errors.
- [ ] If the button is rendering but unclickable, use the element inspector.
- [ ] Is another `div` (like a stray overlay or modal) sitting on top of the menu with a higher `z-index`?

### 3. Compare with Desktop
- [ ] Disable the mobile viewport and stretch the window.
- [ ] Does the sidebar correctly transition into the permanent desktop state?
- [ ] (If both are broken, the issue is your global layout file, not just responsive CSS).

---

### Stop Conditions & Next Steps
- **Rollback:** If users cannot navigate the app at all and the issue appeared right after a frontend layout tweak, revert the deployment. Check the [File Risk Map](../file-risk-map.md) before touching `layout.tsx` again.
- **Escalate:** If the overlay/backdrop is stuck open because of a deeply nested state bug, create a [Postmortem](../postmortem-template.md) and assign a fix.
- **Communicate:** Mobile-specific layout breakages block >50% of traffic. Put an immediate warning on your support channels instructing users to swap to a Desktop browser until fixed.

> *For a list of all required screen sizes to test before merging layout changes, see the [Manual QA Matrix](../manual-qa-matrix.md).*
