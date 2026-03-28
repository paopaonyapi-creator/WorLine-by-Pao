# Local Test Seed & Reset Workflow

For the Playwright E2E suite to execute reliably, your local Supabase instance must contain deterministically accessible user accounts and projects. Follow this minimal workflow to ensure repeatable test states.

---

### 1. Creating a Standard Test User 
*(Used for `requireUserSeed()` standard dashboard/editor testing)*

1. Navigate to your local or target **Supabase Dashboard → Authentication → Users**.
2. Click **Add user** → **Create new user**.
3. Use `user@example.com` and a predictable password (e.g., `password123`).
4. Ensure `Auto-confirm user?` is checked (so they bypass email verification).
5. Map these exactly into your `.env.local`:
   ```env
   PLAYWRIGHT_TEST_USER_EMAIL="user@example.com"
   PLAYWRIGHT_TEST_USER_PASSWORD="password123"
   ```

### 2. Creating an Admin Test User
*(Used for `requireAdminSeed()` admin perimeter testing)*

1. Create a second user in Supabase identically (e.g., `admin@example.com` / `password123`).
2. Add them to the `ADMIN_EMAILS` array inside your `.env.local` securely.
   ```env
   ADMIN_EMAILS="admin@example.com,real.founder@email.com"
   ```
3. Map their login variables for Playwright:
   ```env
   PLAYWRIGHT_TEST_ADMIN_EMAIL="admin@example.com"
   PLAYWRIGHT_TEST_ADMIN_PASSWORD="password123"
   ```

### 3. Seeding Demo Projects for Editor Fixtures
The E2E suite uses mock network interception (`demo-project.json`) for heavy visual layout tests without modifying the Database. 

However, to run *Visual Studio UI manual checks* cleanly, you can inject a local test project manually:
1. Log in to the application locally using `user@example.com`.
2. Click **Create Project**.
3. Draw 3-4 components (Transformer, Wire, Text).
4. Hit **Save**. 

*(You now have a persistent active project bound to the test user safely verified inside Supabase's `projects` table.)*

### 4. Cleaning Up Stale Data (Reset)
If you corrupt state locally performing chaotic tests, the safest workflow for a solo maintainer using Supabase is a destructive SQL truncate:

Open the **Supabase Dashboard → SQL Editor** and execute:
```sql
-- DANGER: Only run locally! Wipes all projects but keeps user auth accounts.
TRUNCATE TABLE projects CASCADE;
```

**To drop EVERYTHING including auth users locally:**
If you run `npx supabase start` locally in Docker, simply run:
```bash
npx supabase db reset
```
*(This entirely flushes the local container database and re-runs `migrations/20260325000000_init.sql`)*. Afterwards, repeat Step 1 & 2 to recreate the test users.

---
**Summary of required .env.local variables before running `pnpm test:e2e`**:
- `PLAYWRIGHT_TEST_USER_EMAIL`
- `PLAYWRIGHT_TEST_USER_PASSWORD`
- `PLAYWRIGHT_TEST_ADMIN_EMAIL`
- `PLAYWRIGHT_TEST_ADMIN_PASSWORD`
- `ADMIN_EMAILS` (must contain `PLAYWRIGHT_TEST_ADMIN_EMAIL`)
