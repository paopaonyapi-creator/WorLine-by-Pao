import { Page } from '@playwright/test';

// Use seeded test accounts provided by the environment
// If running locally, you must provide these in your .env or CI script
// to run the authenticated suites.
export const TEST_USER_EMAIL = process.env.PLAYWRIGHT_TEST_USER_EMAIL;
export const TEST_USER_PASSWORD = process.env.PLAYWRIGHT_TEST_USER_PASSWORD;

export const TEST_ADMIN_EMAIL = process.env.PLAYWRIGHT_TEST_ADMIN_EMAIL;
export const TEST_ADMIN_PASSWORD = process.env.PLAYWRIGHT_TEST_ADMIN_PASSWORD;

/**
 * Standard login helper to complete the Supabase authentication flow via the UI.
 */
export async function login(page: Page, email?: string, password?: string, url: string = 'http://localhost:3000') {
  if (!email || !password) {
    throw new Error('E2E Auth Error: Missing required credentials for login. Please check process.env.PLAYWRIGHT_TEST_*');
  }

  await page.goto(`${url}/login`);
  
  // Fill the standard credentials using resilient accessible locators
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  
  // Submit the login form
  await page.getByRole('button', { name: /sign in/i }).click();
  
  // Wait for the Next.js router to redirect successfully to the protected area
  await page.waitForURL(/.*\/app/);
}
