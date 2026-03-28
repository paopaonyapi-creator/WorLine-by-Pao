import { test, expect } from '@playwright/test';
import { 
  login, 
  TEST_USER_EMAIL, 
  TEST_USER_PASSWORD, 
  TEST_ADMIN_EMAIL, 
  TEST_ADMIN_PASSWORD 
} from './helpers/auth';

const URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Note: Test skipping logic. 
// Authenticated E2E flows require a seeded Supabase instance.
// If the CI environment doesn't specify test accounts, gracefully skip rather than failing blindly.

export function requireUserSeed() {
  if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
    test.skip(true, 'Skipping standard user authenticated test: Missing PLAYWRIGHT_TEST_USER_EMAIL or PASSWORD');
  }
}

export function requireAdminSeed() {
  if (!TEST_ADMIN_EMAIL || !TEST_ADMIN_PASSWORD) {
    test.skip(true, 'Skipping admin authenticated test: Missing PLAYWRIGHT_TEST_ADMIN_EMAIL or PASSWORD');
  }
}

test.describe('Authenticated Flow Security (Non-Admin)', () => {
  // Test the API endpoint cleanly without UI
  test('unauthenticated checkout request gets rejected with 401', async ({ request }) => {
    const response = await request.post(`${URL}/api/checkout`, {
      data: {
        userId: 'hacker_attempt',
        email: 'fake_email@example.com'
      }
    });

    // Should be explicitly blocked from initiating Stripe
    expect(response.status()).toBe(401);
  });

  // UI tests
  test('authenticated non-admin user is redirected from /admin to /app', async ({ page }) => {
    requireUserSeed();
    
    // 1. Log in as standard user
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);
    
    // 2. Attempt to navigate directly to the admin interface
    await page.goto(`${URL}/admin`);
    
    // 3. System boundary should bounce user back to the standard application
    await expect(page).toHaveURL(/.*\/app/);
  });

  test('authenticated user can reach billing settings successfully', async ({ page }) => {
    requireUserSeed();
    
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);
    
    await page.goto(`${URL}/app/settings/billing`);
    
    // Should persist cleanly on the billing route
    await expect(page).toHaveURL(/.*\/app\/settings\/billing/);
    
    // Verify the visual rendering implies the page is loaded
    await expect(page.getByText('Billing', { exact: false }).first()).toBeVisible();
  });
});

test.describe('Authenticated Flow Security (Admin)', () => {
  test('authenticated admin user can access /admin successfully', async ({ page }) => {
    requireAdminSeed();

    // 1. Log in using seeded admin credentials
    await login(page, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD, URL);
    
    // 2. Attempt to navigate to the admin interface
    await page.goto(`${URL}/admin`);
    
    // 3. User is preserved on the admin page securely
    await expect(page).toHaveURL(/.*\/admin/);
  });
});
