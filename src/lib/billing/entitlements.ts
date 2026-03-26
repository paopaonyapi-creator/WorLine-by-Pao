// Launch offer: Pro features free for 1 year for all users
// After March 2027, restore original gating logic

const TRIAL_END = new Date('2027-03-26T00:00:00Z');

export const getEntitlements = (_planId: string | undefined | null) => {
  const isTrialActive = new Date() < TRIAL_END;

  // During trial: everyone gets Pro
  // After trial: check planId
  const hasPro = isTrialActive || _planId != null;

  return {
    canCreateProject: (_currentCount: number) => hasPro ? true : _currentCount < 3,
    canUsePremiumTemplates: () => hasPro,
    canExportWithoutWatermark: () => hasPro,
    isTrialActive: () => isTrialActive,
    trialEndsAt: TRIAL_END,
  };
};
