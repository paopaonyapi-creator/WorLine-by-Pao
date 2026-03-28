import { describe, it, expect } from 'vitest';
import { getEntitlements } from '../../src/lib/billing/entitlements';

describe('Entitlements', () => {
  it('Free plan users get unlimited projects during launch offer', () => {
    const freeEntitlements = getEntitlements(null);
    expect(freeEntitlements.canCreateProject(0)).toBe(true);
    expect(freeEntitlements.canCreateProject(2)).toBe(true);
    expect(freeEntitlements.canCreateProject(3)).toBe(true);
  });

  it('Pro plan users can create unlimited projects', () => {
    const proEntitlements = getEntitlements('price_pro_123');
    expect(proEntitlements.canCreateProject(0)).toBe(true);
    expect(proEntitlements.canCreateProject(10)).toBe(true);
  });

  it('Free plan users get premium templates during launch offer', () => {
    const freeEntitlements = getEntitlements(null);
    expect(freeEntitlements.canUsePremiumTemplates()).toBe(true);
  });

  it('Pro plan users can use premium templates', () => {
    const proEntitlements = getEntitlements('price_pro_123');
    expect(proEntitlements.canUsePremiumTemplates()).toBe(true);
  });
});
