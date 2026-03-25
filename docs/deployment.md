# WorLine by Pao Deployment Guide

This project is built and optimized for Railway Pro deployment.
It does not rely on Vercel-specific features. Features such as server functions, edge configuration, auth flows, and webhooks are containerized via Docker.

## 1. Deploy from GitHub to Railway
Log into your Railway Dashboard. Create a new project, select "Deploy from Github repo", and point to your WorLine by Pao repository.
Railway will automatically detect the Dockerfile and build it.

## 2. Environment Variables
In the Railway Dashboard, go to your service's "Variables" tab.
Add all the variables described in `.env.example`.

In particular, ensure `NEXT_PUBLIC_APP_URL` is equal to the public URL that Railway generates (`https://<your-service>.up.railway.app`).

## 3. Supabase Redirect URLs
In Supabase > Authentication > URL Configuration:
Add your `NEXT_PUBLIC_APP_URL` as the Site Url.
Add `NEXT_PUBLIC_APP_URL/auth/callback` to the redirect URLs list.

## 4. Stripe Webhooks
In the Stripe Dashboard, set the webhook endpoint to `NEXT_PUBLIC_APP_URL/api/stripe/webhook` and define the events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

The endpoint secret should be added to Railway as `STRIPE_WEBHOOK_SECRET`.

## 5. Docker Local Verification
```bash
docker build -t worline-app .
docker run -p 3000:3000 worline-app
```
Then navigate to http://localhost:3000 to verify.
