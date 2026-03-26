"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, CreditCard, Gift } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-2">Manage your subscription plan.</p>
      </div>

      {/* Launch Offer Banner */}
      <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 shrink-0">
            <Gift className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">🎉 Launch Offer Active!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All Pro features are <span className="font-semibold text-foreground">free for 1 year</span> until <span className="font-semibold text-foreground">March 2027</span>.
              Enjoy unlimited projects, all templates, and PDF export — no credit card needed.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            You are on the <span className="font-semibold text-emerald-600 dark:text-emerald-400">Pro (Free Trial)</span> plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-emerald-500 w-4 h-4 shrink-0" />
            <span>Unlimited projects</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-emerald-500 w-4 h-4 shrink-0" />
            <span>All templates included</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-emerald-500 w-4 h-4 shrink-0" />
            <span>PDF export (no watermark)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-emerald-500 w-4 h-4 shrink-0" />
            <span>Full symbol library (20 symbols)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-emerald-500 w-4 h-4 shrink-0" />
            <span>Auto-save &amp; cloud sync</span>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Trial ends March 2027. Pricing plans will be announced before then.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
