import { describe, it, expect } from 'vitest';
import { getEntitlements } from '../../src/lib/billing/entitlements';

describe('Entitlements', () => {
  it('Free plan users can only create up to 3 projects', () => {
    const freeEntitlements = getEntitlements(null);
    expect(freeEntitlements.canCreateProject(0)).toBe(true);
    expect(freeEntitlements.canCreateProject(2)).toBe(true);
    expect(freeEntitlements.canCreateProject(3)).toBe(false);
  });

  it('Pro plan users can create unlimited projects', () => {
    const proEntitlements = getEntitlements('price_pro_123');
    expect(proEntitlements.canCreateProject(0)).toBe(true);
    expect(proEntitlements.canCreateProject(10)).toBe(true);
  });

  it('Free plan users cannot use premium templates', () => {
    const freeEntitlements = getEntitlements(null);
    expect(freeEntitlements.canUsePremiumTemplates()).toBe(false);
  });

  it('Pro plan users can use premium templates', () => {
    const proEntitlements = getEntitlements('price_pro_123');
    expect(proEntitlements.canUsePremiumTemplates()).toBe(true);
  });
});
