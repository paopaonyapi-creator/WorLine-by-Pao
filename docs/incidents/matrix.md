# Incident Triage Matrix

*This matrix provides an at-a-glance summary of action posture and impact for core incidents. It does not replace the [Incident Playbooks Index](index.md).*

| Symptom | Severity | First-Check | Action Posture | Impact | DB Edit? | Temp Unblock? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`/api/health` 500** | 🔴 Outage | Railway | ⏪ Rollback | 🌐 Broad | ✅ No | 🚫 No |
| **`/misconfigured` redirect** | 🔴 Outage | Railway | ⏪ Rollback | 🌐 Broad | ✅ No | 🚫 No |
| **Auth kick loop** | 🟡 Access | Browser | ⏪ Rollback | 👥 Partial | ✅ No | 🚫 No |
| **Checkout 500** | 🟠 Revenue | Stripe | ⏪ Rollback | 👥 Partial | ✅ No | 🚫 No |
| **Paid but still Free** | 🟠 Revenue | Supabase| 🔎 Investigate | 👤 Isolated| ✍️ Yes | 🩹 Yes |
| **Missing sub row** | 🟠 Revenue | Supabase| 🔎 Investigate | 👤 Isolated| ✍️ Yes | 🩹 Yes |
| **Stripe paid/Supa canceled** | 🟡 Access | Supabase| 🔎 Investigate | 👤 Isolated| ✍️ Yes | 🩹 Yes |
| **Stripe canceled/Supa active**| 🟠 Revenue | Supabase| 🔎 Investigate | 👤 Isolated| ✍️ Yes | 🩹 Yes |
| **Editor save fails** | 🔵 Editor | Browser | ⏪ Rollback | 👤 Isolated| ✅ No | 🚫 No |
| **Download PDF fails** | 🔵 Editor | Browser | ⏪ Rollback | 👤 Isolated| ✅ No | 🚫 No |
| **Mobile nav breaks** | 🔵 UI | Browser | ⏪ Rollback | 🌐 Broad | ✅ No | 🚫 No |
| **Admin access denied** | 🟡 Access | Railway | 🔎 Investigate | 🛠️ Maintainer| ✍️ Yes | 🩹 Yes |
| **E2E auth tests skip** | ⚪ Testing | .env.local| 🔎 Investigate | 🛠️ Maintainer| ✅ No | 🚫 No |
| **CI passes/Local fails** | ⚪ Testing | GitHub | 🔎 Investigate | 🛠️ Maintainer| ✅ No | 🚫 No |

> 🔑 **Need full definitions?** See the [Tag Legend](tag-legend.md).
