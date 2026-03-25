# WorLine by Pao ⚡

> Professional single-line diagram editor for electrical engineers.

Built with **Next.js 16**, **Supabase**, **Stripe**, and **Konva** canvas engine.

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

# Deploy
railway up
```

### Post-deployment checklist

- [ ] Verify health endpoint: `https://your-app.up.railway.app/api/health`
- [ ] Configure Stripe webhook endpoint: `https://your-app.up.railway.app/api/stripe/webhook`
- [ ] Test signup → login → create project → editor flow
- [ ] Verify PDF/PNG export works in production

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

---

## License

MIT
