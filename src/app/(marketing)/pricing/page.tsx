import type { Metadata } from "next";
import { Check, Zap, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "WorLine Pro features are free for 1 year. All users get unlimited projects, full symbol library, and PDF export until March 2027.",
};

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">
            <Gift className="h-4 w-4" />
            🎉 Launch Offer — Pro Free for 1 Year!
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            All Pro features{" "}
            <span className="text-emerald-500">free until March 2027</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We&apos;re launching WorLine and want you to experience the full power of our editor.
            No credit card. No limits. Just create.
          </p>
        </div>

        {/* Single Pro Plan */}
        <div className="mx-auto max-w-lg">
          <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500/50 bg-card p-8 shadow-xl shadow-emerald-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white">
                <Gift className="h-3 w-3" />
                Free for 1 Year
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                Pro
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything you need to design professional diagrams.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold tracking-tight">$0</span>
              <span className="text-base font-medium text-muted-foreground">/year</span>
              <p className="text-xs text-muted-foreground mt-1">Until March 2027 • Then pricing TBD</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Unlimited projects",
                "Full symbol library (20 symbols)",
                "All premium templates",
                "PDF export (no watermark)",
                "Auto-save & cloud sync",
                "Keyboard shortcuts",
                "Zoom controls",
                "JSON backup export",
                "Priority support",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-foreground">{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup">
              <Button className="w-full h-11 gap-2 bg-emerald-500 hover:bg-emerald-600 text-white">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            Questions about the launch offer?{" "}
            <a href="mailto:paopaonyapi@gmail.com" className="text-primary hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
