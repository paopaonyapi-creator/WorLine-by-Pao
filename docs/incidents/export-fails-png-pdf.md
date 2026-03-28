# Incident: PNG/PDF Export Fails

**Symptom:** A user finishes their design, clicks "Export as PNG" or "Export as PDF", but nothing downloads, or the browser freezes.
**Time to execute:** 1 minute.
**Goal:** Determine if a browser constraint, a tainted canvas, or the `pdf-lib` library is blocking the export.

---

### 1. Confirm the Scope
- [ ] Ask the user (or test yourself): Is it just PDF? Just PNG? Or both?
- [ ] If PNG fails, PDF will automatically fail (since PDF export relies on rendering PNGs first).

### 2. Check the Canvas State for Taint
- [ ] Open the Developer Tools -> Console.
- [ ] Attempt the export again.
- [ ] Do you see a `Tainted canvases may not be exported` or `.toDataURL` error? (This means an external cross-origin image was drawn on the Konva canvas, blocking export).

### 3. Verify the Environment
- [ ] Does this only fail on iOS Safari? (Safari has strict memory limits for large canvas `toDataURL` operations).
- [ ] Does it only fail inside the Playwright CI pipeline? See [Testing Limitations](../testing-limitations.md).
- [ ] Retry the exact same export on a Desktop version of Google Chrome.

---

### Stop Conditions & Next Steps
- **Rollback:** If *every* export fails on Desktop Chrome after a recent editor deploy, rollback immediately.
- **Escalate:** If `pdf-lib` throws a specific memory timeout error for very large multi-page projects, start a [Postmortem](../postmortem-template.md) to explore chunking the PDF generation.
- **Communicate:** If mobile Safari simply cannot export their massive design due to memory constraints, inform the user to log in via Desktop (see [Manual QA Matrix](../manual-qa-matrix.md)).
