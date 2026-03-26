"use client";

import Link from "next/link";
import { Zap, ArrowRight, Shield, Cloud, FileDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/useLocale";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 gradient-hero -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
            <Zap className="h-4 w-4" />
            {t("hero_badge")}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
            {t("hero_title_1")}{" "}
            <span className="text-primary">{t("hero_title_2")}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {t("hero_desc")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-primary"
            >
              {t("get_started_free")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {t("view_pricing")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            {t("features_heading")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("feature_editor_title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("feature_editor_desc")}
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("feature_cloud_title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("feature_cloud_desc")}
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <FileDown className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("feature_export_title")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("feature_export_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {t("cta_heading")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("cta_desc")}
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-primary"
          >
            {t("cta_button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
