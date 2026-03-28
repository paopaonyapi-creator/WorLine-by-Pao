import { Page } from '@playwright/test';

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
