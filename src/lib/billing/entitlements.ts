export const getEntitlements = (planId: string | undefined | null) => {
  const isPro = planId != null;

  return {
    canCreateProject: (currentCount: number) => {
      if (isPro) return true;
      return currentCount < 3;
    },
    canUsePremiumTemplates: () => isPro,
    canExportWithoutWatermark: () => isPro
  };
};
