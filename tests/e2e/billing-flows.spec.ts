import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { requireUserSeed } from './helpers/seed';
import { NEXT_PUBLIC_APP_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD } from './helpers/env';

const URL = NEXT_PUBLIC_APP_URL;

test.describe('Billing & Checkout Flows', () => {
  test.beforeEach(() => {
    requireUserSeed();
  });

  test('unauthenticated user can navigate from marketing pricing page to auth portal', async ({ page }) => {
    // 1. Visit Public Pricing Page
    await page.goto(`${URL}/pricing`);
    
    // 2. Identify and trigger standard Upgrade CTA
    const pricingUpgradeBtn = page.getByTestId('pricing-upgrade-btn');
    await expect(pricingUpgradeBtn).toBeVisible();
    await pricingUpgradeBtn.click();
    
    // 3. Asset seamless redirect boundary blocks unauthenticated users pushing them to register
    await expect(page).toHaveURL(/.*\/signup/);
  });

  test('authenticated user maintains billing dashboard stability and hits checkout proxy successfully', async ({ page }) => {
    // 1. Authenticate locally through isolated helper directly bounding to app shell
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);

    // 2. Bound dynamically onto the billing center
    await page.goto(`${URL}/app/settings/billing`);
    await expect(page).toHaveURL(/.*\/app\/settings\/billing/);

    // 3. Verify Active Subscription State Badge displays cleanly over the standard dashboard component
    const billingStatusBadge = page.getByTestId('billing-status-badge');
    await expect(billingStatusBadge).toBeVisible();
    await expect(billingStatusBadge).toHaveText(/Active/i);
    
    // 4. Test Subscribe Button bounds
    // Listens for EITHER a successful Stripe outbound dispatch OR the internal API fallback Toast depending on API Key modes securely
    const checkoutTrigger = page.getByTestId('billing-subscribe-btn');
    await expect(checkoutTrigger).toBeVisible();
    
    // We execute click while listening to API proxies 
    await checkoutTrigger.click();

    // The handler inside `/api/checkout` fires gracefully.
    // If we have fake placeholder test keys during CI, it blocks local redirects explicitly via a client toast
    // If we have live dev Stripe keys, it pushes location to checkout.stripe.com.
    // We use a Promise.race structural assertion to accept either deterministic outcome cleanly!
    const fallbackToastLoc = page.locator('li[data-sonner-toast]').filter({ hasText: /Stripe is currently in test mode/i }).first();
    const isToastVisible = await fallbackToastLoc.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isToastVisible) {
      // Mock route successfully handled without crashing React!
      expect(isToastVisible).toBeTruthy();
    } else {
      // Production API generated the session securely and routed correctly!
      await expect(page).toHaveURL(/.*checkout\.stripe\.com/);
    }
  });

  test('authenticated user maintains stable layout when returning from Stripe checkout via success or canceled URLs', async ({ page }) => {
    // 1. Authenticate locally through isolated helper
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);

    // 2. Simulate user bouncing BACK from checkout.stripe.com with a canceled payload organically
    await page.goto(`${URL}/app/settings/billing?canceled=true`);
    
    // Assert the page securely loads without triggering 500 crashes and the Subscribe button is structurally usable
    const checkoutTrigger = page.getByTestId('billing-subscribe-btn');
    await expect(checkoutTrigger).toBeVisible();

    // 3. Simulate user bouncing BACK with a successful payment intent
    await page.goto(`${URL}/app/settings/billing?success=true`);
    
    // Validate the page remains functional and Active Status overlays don't break
    const billingStatusBadge = page.getByTestId('billing-status-badge');
    await expect(billingStatusBadge).toBeVisible();
    await expect(billingStatusBadge).toHaveText(/Active/i);
  });
});


