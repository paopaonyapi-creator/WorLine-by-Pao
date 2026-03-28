# Incident Tag Legend

*These tags classify the severity, scope, and required action for any given incident. Rather than reading paragraphs of text, use these visual signals to execute triage in under 60 seconds.*
*(Not sure how they stack together? See [Worked Incident Examples](worked-examples.md)).*

Use this reference to quickly decode the symbol matrices found in the [Incident Playbooks Index](index.md).

**Severity Labels:**  
🔴 **Outage** (App is down) | 🟠 **Revenue** (Blocking money) | 🟡 **Access** (Users locked out) | 🔵 **Editor/UI** (Core feature degraded) | ⚪ **Testing/CI** (Internal velocity blocked)

**Action Hints:**  
⏪ **Rollback-first** (If recently deployed) | 🔎 **Investigate-first** (Likely a data or config sync issue)

**Audience Tags:**  
👤 **User-facing** (Customers are complaining) | 🛠️ **Maintainer-facing** (Dev or business operations are blocked)

**Impact Scope:**  
🌐 **Broad** (System-wide) | 👥 **Partial** (Many users) | 👤 **Isolated** (Often single user)

**Communication Hints:**  
📣 **Communicate Now** (Alert active users/broadcast) | 🤫 **Internal First** (Fix quietly or direct 1:1 reply)

**Public Status:**  
📡 **Status-page worthy** (Broad service notice) | 💬 **Direct reply** (1:1 support usually enough)

**Root Cause Hint:**  
🚀 **Likely recent deploy** (Regression) | 🧩 **Likely data/config/user** (Drift or isolated state)

**Data Risk Hint:**  
🧨 **Customer data risk** (Saved work, billing, access state) | 🪶 **Low direct data risk**

**Manual DB Edit:**  
✍️ **Likely manual DB edit** (Direct Supabase intervention) | ✅ **Usually no DB edit**

**Short-Term Mitigation:**  
🚑 **Likely temporary unblock** | ⏳ **Usually fix first**

**Response Urgency:**  
🚨 **Act immediately** | ⏱️ **Safe to wait briefly**

**Workaround:**  
🩹 **Workaround likely** | 🚫 **No real workaround**
