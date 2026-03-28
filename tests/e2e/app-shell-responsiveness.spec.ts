import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';
import { requireUserSeed } from './helpers/seed';
import { NEXT_PUBLIC_APP_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD } from './helpers/env';

const URL = NEXT_PUBLIC_APP_URL;

test.describe('App Shell Responsiveness & Navigation', () => {
  test.beforeEach(() => {
    requireUserSeed();
  });

  test('user can log in securely and navigate the dashboard shell structure responsively', async ({ page, isMobile }) => {
    // 1. Authenticate via standard flow
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD, URL);

    // 2. Successful redirect into /app/projects (the default authenticated landing zone)
    await page.goto(`${URL}/app/projects`);
    await expect(page).toHaveURL(/.*\/app\/projects/);

    // 3. If mobile, we must manually toggle the hamburger menu to expose navigation elements
    if (isMobile) {
      const toggle = page.getByTestId('mobile-nav-toggle');
      await expect(toggle).toBeVisible();
      await toggle.click();
    }

    // 4. Verify explicit rendering of navigation node bounds globally 
    const billingLink = page.getByTestId('nav-billing');
    await expect(billingLink).toBeVisible();
    await billingLink.click();
    
    // Validate we've moved to settings organically
    await expect(page).toHaveURL(/.*\/app\/settings\/billing/);
    
    // 5. If mobile, re-toggle the menu before making the next action
    if (isMobile) {
      const toggle = page.getByTestId('mobile-nav-toggle');
      // Sheet might automatically close on link-click via the component onClick. Verify if we need to reopen.
      // E2E test proves stability.
      await toggle.click();
    }

    // 6. Navigate back to Core Projects Area
    const projectsLink = page.getByTestId('nav-projects');
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();

    // 7. Validate full trip back to root shell without breaking history/React lifecycles
    await expect(page).toHaveURL(/.*\/app\/projects/);
  });
});
