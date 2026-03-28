# WorLine by Pao ⚡

> Professional single-line diagram editor for electrical engineers.

Built with **Next.js 16**, **Supabase**, **Stripe**, and **Konva** canvas engine.

> 📚 **Looking for operation playbooks?** Start at the [Documentation Index](docs/index.md) for the pre-release checklists, rollback plans, and testing boundaries.
> 🤝 **Looking to contribute or maintain?** Read the [Maintainer Guide](MAINTAINERS.md) before making structural changes!

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (for billing features)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (secret!) |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks |
| `STRIPE_PRO_PRICE_ID` | Stripe → Products → Price ID |
| `NEXT_PUBLIC_APP_URL` | Your production URL |
| `ADMIN_EMAILS` | Comma-separated admin emails |

### 3. Initialize the database

Push the schema to your Supabase project:

```bash
npx supabase db push --db-url "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
```

Or via the Supabase Dashboard → SQL Editor, paste the contents of:
`supabase/migrations/20260325000000_init.sql`

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. (Optional) Set up Stripe webhook for local testing

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Deploy to Railway Pro

### Option A: One-click deploy

1. Push this repo to GitHub
2. Go to [Railway](https://railway.app) → New Project → Deploy from GitHub repo
3. Add environment variables in Railway Dashboard → Variables tab
4. Railway auto-detects `Dockerfile` and deploys

### Option B: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Set environment variables
railway variables set NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
railway variables set SUPABASE_SERVICE_ROLE_KEY=eyJ...
railway variables set STRIPE_SECRET_KEY=sk_live_...
railway variables set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
railway variables set STRIPE_WEBHOOK_SECRET=whsec_...
railway variables set STRIPE_PRO_PRICE_ID=price_...
railway variables set NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app
railway variables set ADMIN_EMAILS=admin@example.com

# Deploy
railway up
```

## Production Deployment Smoke Test

After every production deployment, follow this sequential behavior checklist to confirm critical environments are running cleanly:

- [ ] **Home Page**: Open the production root URL and ensure the marketing layout loads without 500 errors.
- [ ] **Health API**: Visit `/api/health` and verify it returns a 200 JSON object.
- [ ] **Auth Sign-in**: Create a test user via signup and log in successfully.
- [ ] **Protected Boundaries**: Attempt to visit `/app` while logged out; ensure you are redirected to `/login` natively.
- [ ] **Admin Segmentation**: Navigate to `/admin`.
      - As a standard user: Verify you are bounced to `/app`.
      - As an authorized admin (listed in `ADMIN_EMAILS`): Verify successful dashboard access.
- [ ] **Billing Settings**: Load `/app/settings/billing` and ensure no generic fallback prices crash the UI.
- [ ] **Stripe Checkout**: Click the subscribe/upgrade button to confirm a Stripe Session ID is created and displays the payment portal reliably. 
- [ ] **Webhook Binding**: Inside your Stripe Dashboard, execute a test event to confirm your endpoint acknowledges receipt.
- [ ] **Subscription Storage**: Complete a simulated checkout and verify the `subscriptions` row updates inside your Supabase project correctly.
- [ ] **Editor Engine**: Open a Workspace canvas and verify the PDF/PNG export successfully processes client-side.

*See `docs/production-runbook.md` for extended recovery rules and runtime validation documentation.*

---

## Project Structure

```
worline-by-pao/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Login / Signup pages
│   │   ├── (marketing)/      # Landing, Features, Pricing, Terms, Privacy
│   │   ├── app/              # Protected SaaS pages
│   │   │   ├── (dashboard)/  # Dashboard layout + Projects, Settings, Templates
│   │   │   └── projects/[id] # Editor workspace
│   │   └── api/
│   │       ├── health/       # Health check endpoint
│   │       └── stripe/       # Checkout + Webhook handlers
│   ├── components/
│   │   ├── editor/           # Canvas, Palette, Properties, Toolbar, Symbols
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── editor/           # Types, symbol definitions
│   │   └── supabase/         # Client, Server, Middleware helpers
│   └── store/                # Zustand editor state
├── supabase/
│   └── migrations/           # Database schema (RLS policies included)
├── tests/
│   └── unit/                 # Vitest unit tests
├── Dockerfile                # Multi-stage production build
├── railway.json              # Railway deployment config
└── .env.example              # Environment variable template
```

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, shadcn/ui |
| Canvas | Konva + react-konva |
| State | Zustand |
| Auth & DB | Supabase (Auth + PostgreSQL + RLS) |
| Payments | Stripe (Checkout + Webhooks) |
| Export | pdf-lib (PDF), Canvas API (PNG) |
| Testing | Vitest (unit), Playwright (E2E) |
| Deploy | Docker → Railway Pro |

## Authenticated Playwright Testing

To run the authenticated end-to-end test suite locally, you must provide seeded credentials that match active users existing inside the connected Supabase database. These tests will simulate logging in via the UI to verify role-based permissions and billing boundaries securely.

Create or append the following to your `.env.local` (or supply them directly in CI):

```bash
PLAYWRIGHT_TEST_USER_EMAIL="user@example.com"
PLAYWRIGHT_TEST_USER_PASSWORD="password123"

PLAYWRIGHT_TEST_ADMIN_EMAIL="admin@example.com"
PLAYWRIGHT_TEST_ADMIN_PASSWORD="password123"
```

*Note: The test suite will gracefully `.skip()` authenticated tests if variables are unsupplied, keeping your test passes honest.*

> **Need help setting up these test accounts?** Check out the [Local Test Seed Workflow](docs/local-test-seed-workflow.md) guide for a fast, repeatable setup process.

To execute the test suite in terminal mode:
```bash
pnpm test:e2e
```

---

## License

MIT
