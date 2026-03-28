# Outage Update Templates

Use these templates to quickly post public-facing updates (Status Page, Discord, global banners) when a broad incident affects many users.

*Tone constraints: Calm, clear, no blame, no fake ETAs, no legal filler.*

### 1. Initial Incident Notice
**When to use:** As soon as a global issue is confirmed (e.g., `/api/health` 500, broad checkout failure, mobile nav broken for everyone).

> **Issue accessing [Feature/System]**
>
> We are currently investigating an issue affecting [describe impact simply, e.g., app access / the main editor / the checkout page]. Some users may experience errors or be unable to load the page. We are actively working to resolve this and will provide an update shortly.

### 2. Mitigation in Progress
**When to use:** Following a `[⏪]` rollback or when a fix is actively deploying.

> **Update: [Feature/System] Issue**
>
> We have identified the cause of the [describe impact] issue and are currently deploying a fix. We are monitoring the system as the fix rolls out.

### 3. Resolved / Monitoring
**When to use:** After post-rollback checks pass and metrics return to baseline.

> **Resolved: [Feature/System] Issue**
>
> The issue affecting [describe impact] has been fully resolved and systems are operating normally. If you are still seeing lingering effects, please refresh your page or reach out to us directly. Thank you for your patience.
