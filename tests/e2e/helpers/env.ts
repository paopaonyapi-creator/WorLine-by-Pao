export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Seeded testing identities via Playwright GitHub Secrets / Local Environment 
export const TEST_USER_EMAIL = process.env.PLAYWRIGHT_TEST_USER_EMAIL;
export const TEST_USER_PASSWORD = process.env.PLAYWRIGHT_TEST_USER_PASSWORD;

export const TEST_ADMIN_EMAIL = process.env.PLAYWRIGHT_TEST_ADMIN_EMAIL;
export const TEST_ADMIN_PASSWORD = process.env.PLAYWRIGHT_TEST_ADMIN_PASSWORD;
