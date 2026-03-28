import { test } from '@playwright/test';
import { 
  TEST_USER_EMAIL, 
  TEST_USER_PASSWORD, 
  TEST_ADMIN_EMAIL, 
  TEST_ADMIN_PASSWORD 
} from './env';

/**
 * Check for live user seeding configuration. Safely skip without test suite explosion.
 */
export function requireUserSeed() {
  if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
    test.skip(true, 'Skipping standard user authenticated test: Missing PLAYWRIGHT_TEST_USER_EMAIL or PASSWORD');
  }
}

/**
 * Check for live administrative configuration. Skip safely if missing from execution layer.
 */
export function requireAdminSeed() {
  if (!TEST_ADMIN_EMAIL || !TEST_ADMIN_PASSWORD) {
    test.skip(true, 'Skipping admin authenticated test: Missing PLAYWRIGHT_TEST_ADMIN_EMAIL or PASSWORD');
  }
}
