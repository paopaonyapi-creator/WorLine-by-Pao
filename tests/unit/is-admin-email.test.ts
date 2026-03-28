import { describe, it, expect } from 'vitest';
import { isAdminEmail } from '../../src/lib/auth/is-admin-email';

describe('isAdminEmail', () => {
  it('returns false for missing email', () => {
    expect(isAdminEmail(null, 'admin@example.com')).toBe(false);
    expect(isAdminEmail(undefined, 'admin@example.com')).toBe(false);
    expect(isAdminEmail('', 'admin@example.com')).toBe(false);
  });

  it('returns false for missing admin emails config', () => {
    expect(isAdminEmail('admin@example.com', undefined)).toBe(false);
    expect(isAdminEmail('admin@example.com', '')).toBe(false);
  });

  it('returns true for exact match', () => {
    expect(isAdminEmail('admin@example.com', 'admin@example.com')).toBe(true);
  });

  it('returns true for case-insensitive match', () => {
    expect(isAdminEmail('ADMIN@example.com', 'admin@example.com')).toBe(true);
    expect(isAdminEmail('admin@example.com', 'ADMIN@example.com')).toBe(true);
  });

  it('works with comma-separated list and whitespace', () => {
    const list = ' user1@example.com , Admin@Example.com, user2@example.com ';
    
    expect(isAdminEmail('admin@example.com', list)).toBe(true);
    expect(isAdminEmail('user1@example.com', list)).toBe(true);
    expect(isAdminEmail('user2@example.com', list)).toBe(true);
    expect(isAdminEmail('user3@example.com', list)).toBe(false);
  });

  it('handles whitespace in the email check', () => {
    expect(isAdminEmail(' admin@example.com ', 'admin@example.com')).toBe(true);
  });
});
