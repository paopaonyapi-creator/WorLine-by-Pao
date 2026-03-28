# Billing Incidents Hub 🟠

*Billing issues branch wildly depending on whether the payment succeeded or the checkout crashed. Choose your path below.*

### Payment Initiation Failures
- [Checkout returns 500](checkout-returns-500.md) (User clicks "Upgrade" and the app crashes. Usually broad.)

### Billing State Mismatches
- [User paid but still sees "Free"](billing-still-free-after-payment.md) (Webhook delivery failed.)
- [Billing status badge is wrong](billing-badge-wrong.md) (UI state mismatch vs DB.)
- [Stripe says Paid, Supabase says Canceled](stripe-paid-supabase-canceled.md) (Data drift.)
- [Stripe says Canceled, Supabase says Active](stripe-canceled-supabase-active.md) (Data drift.)

### Missing Data & Sync Breaks
- [Subscription row is entirely missing](subscription-row-missing.md) (Auth-to-billing link failed to fire.)
- [Webhook deliveries return 400](webhook-deliveries-return-400.md) (Signature validation fails globally.)

### Immediate Interventions
- [Temporary Unblock Safety](temp-unblock-safety.md) (How to unblock an isolated user right now.)
- [Manual DB Intervention Safety](manual-db-intervention-safety.md) (How to forcefully correct a mismatched subscription row.)

---
> ↩️ **Not what you need?** Return to [Which Doc First?](which-doc-first.md) or the [Main Incident Index](index.md).
