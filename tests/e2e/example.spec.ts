import { test, expect } from '@playwright/test';

// Basic sanity tests without DB credentials since they are required for full e2e.
test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/WorLine/);
});

test('can navigate to login', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Login');
  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('h3')).toContainText('Sign In');
});

test('can navigate to pricing page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Pricing');
  await expect(page).toHaveURL(/.*pricing/);
});
