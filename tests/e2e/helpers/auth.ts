import { Page } from '@playwright/test';

// Use seeded test accounts provided by the environment
// If running locally, you must provide these in your .env or CI script
// to run the authenticated suites.
export const TEST_USER_EMAIL = process.env.PLAYWRIGHT_TEST_USER_EMAIL || 'user@example.com';
export const TEST_USER_PASSWORD = process.env.PLAYWRIGHT_TEST_USER_PASSWORD || 'password123';

export const TEST_ADMIN_EMAIL = process.env.PLAYWRIGHT_TEST_ADMIN_EMAIL || 'admin@example.com';
export const TEST_ADMIN_PASSWORD = process.env.PLAYWRIGHT_TEST_ADMIN_PASSWORD || 'password123';

/**
 * Standard login helper to complete the Supabase authentication flow via the UI.
 */
export async function login(page: Page, email: string, password: string, url: string = 'http://localhost:3000') {
  await page.goto(`${url}/login`);
  
  // Fill the standard credentials
  await page.fill('input#email', email);
  await page.fill('input#password', password);
  
  // Submit the login form
  await page.click('button[type="submit"]');
  
  // Wait for the Next.js router to redirect successfully to the protected area
  await page.waitForURL(/.*\/app/);
}
