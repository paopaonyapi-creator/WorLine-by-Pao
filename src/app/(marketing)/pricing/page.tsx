"use client";

import { Check, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/useLocale";
import type { TranslationKey } from "@/lib/i18n/translations";

const featureKeys: TranslationKey[] = [
  "feat_unlimited", "feat_symbols", "feat_templates", "feat_pdf",
  "feat_cloud", "feat_shortcuts", "feat_zoom", "feat_backup", "feat_support",
];

export default function PricingPage() {
  const { t } = useLocale();

  return (
    <div className="py-12 sm:py-32 min-h-[100dvh]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">
            <Gift className="h-4 w-4" />
            {t("pricing_badge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {t("pricing_heading_1")}{" "}
            <span className="text-emerald-500">{t("pricing_heading_2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("pricing_desc")}
          </p>
        </div>

        {/* Single Pro Plan */}
        <div className="mx-auto max-w-lg">
          <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500/50 bg-card p-8 shadow-xl shadow-emerald-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white">
                <Gift className="h-3 w-3" />
                {t("pricing_trial_badge")}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                Pro
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("pricing_plan_desc")}
              </p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold tracking-tight">$0</span>
              <span className="text-base font-medium text-muted-foreground">/year</span>
              <p className="text-xs text-muted-foreground mt-1">{t("pricing_tbd")}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup">
              <Button className="w-full h-11 gap-2 bg-emerald-500 hover:bg-emerald-600 text-white">
                {t("get_started_free")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            {t("pricing_contact")}{" "}
            <a href="mailto:paopaonyapi@gmail.com" className="text-primary hover:underline font-medium">
              {t("pricing_contact_link")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
