import { beforeEach, afterEach } from 'vitest';

/**
 * Cleanly stubs process.env for the duration of a test suite,
 * restoring the original values after each test.
 * 
 * Must be called inside a describe() block.
 */
export function mockEnv() {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });
}
