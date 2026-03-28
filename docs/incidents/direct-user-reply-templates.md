# Direct User Reply Templates

Use these 1:1 email/chat templates for isolated billing and access incidents (👤). 
*Tone constraints: Short, professional, reassuring, no fake ETAs.*

### 1. Paid but still sees Free / Subscription row missing
**When to use:** When the system dropped their payment webhook, but their money cleared Stripe.
> **Subject: Access Restored - [App Name] Pro**
> 
> Hi [Name],
> 
> Thank you for reaching out. I’ve checked your account and confirmed your payment was successful. 
> 
> Due to a slight delay in our system, your Pro access wasn't automatically applied. I've manually upgraded your account [or inserted the missing subscription row], so you now have full access. Feel free to refresh your browser.
> 
> Please let me know if you run into any other issues!

### 2. User locked out unexpectedly (Auth loop)
**When to use:** When session state is breaking for an individual, preventing login.
> **Subject: Re: Trouble logging in**
> 
> Hi [Name],
> 
> I'm sorry to hear you're having trouble logging in. We are actively investigating an issue causing unexpected lockouts for some users.
> 
> While we deploy a permanent fix, could you try clearing your browser cookies for [App Domain] or attempting to log in via an Incognito window? That often clears the stalled session. I will follow up with you as soon as the core issue is fully resolved.

### 3. Temporary workaround/restore applied (🚑)
**When to use:** You gave them a temporary DB unblock while you look into the codebase. *(Did you run through the [Post-Manual DB Fix Checks](post-manual-db-fix-checks.md)?)*
> **Subject: Temporary Access Restored**
> 
> Hi [Name],
> 
> Thanks for reporting this. I've gone ahead and temporarily restored your Premium access so you can immediately get back to your work.
> 
> I'm still investigating the root cause of why this disconnected in the first place, but you shouldn't experience any more interruptions today. I will follow up once the underlying bug is squashed!

### 4. Billing badge is wrong (but access is fine)
**When to use:** UI caching issue, access isn't actually blocked.
> **Subject: Re: Billing page shows Free**
> 
> Hi [Name],
> 
> Thanks for letting us know! I've checked our backend and can confirm your Pro subscription is fully active and you won't lose access to any features. 
> 
> We are currently experiencing a slight visual bug on the dashboard that shows the incorrect badge. We're rolling out a fix for this shortly. You can safely ignore the badge for now!
