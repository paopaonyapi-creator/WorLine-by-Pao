import { Check, X, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for evaluation and simple projects.",
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    highlighted: false,
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "6 standard symbols", included: true },
      { text: "PNG export (watermarked)", included: true },
      { text: "Cloud save & sync", included: true },
      { text: "Unlimited projects", included: false },
      { text: "PDF export (no watermark)", included: false },
      { text: "Premium templates", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "For professional engineers and design firms.",
    cta: "Subscribe to Pro",
    ctaVariant: "default" as const,
    highlighted: true,
    badge: "Most popular",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Full symbol library", included: true },
      { text: "High-res PNG export", included: true },
      { text: "PDF export (no watermark)", included: true },
      { text: "Cloud save & sync", included: true },
      { text: "Premium templates", included: true },
      { text: "Priority email support", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Simple Pricing
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Choose the right plan{" "}
            <span className="gradient-text">for your team</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Start free, upgrade when you need more. No credit card required for the free plan.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? "border-2 border-primary bg-card shadow-xl shadow-primary/10 glow-primary"
                  : "border bg-card"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold tracking-tight ${plan.highlighted ? "text-primary" : ""}`}>
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-base font-medium text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    ) : (
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                        <X className="h-3 w-3 text-muted-foreground/50" />
                      </div>
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground/60"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button
                  variant={plan.ctaVariant}
                  className={`w-full h-11 gap-2 ${plan.highlighted ? "glow-primary" : ""}`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom plan for your organization?{" "}
            <a href="mailto:hello@unifilar.studio" className="text-primary hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
