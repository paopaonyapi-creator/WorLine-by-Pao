"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2, CreditCard } from "lucide-react";

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [managing, setManaging] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('subscriptions').select('stripe_price_id').eq('user_id', user.id).maybeSingle();
        if (data?.stripe_price_id) {
          setIsPro(true);
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSubscribe = async () => {
    setManaging(true);
    toast.info("Preparing checkout session...");

    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        toast.error("Failed to create checkout session");
        setManaging(false);
      }
    } catch {
      toast.error("An error occurred");
      setManaging(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-2">Manage your subscription plan.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            You are on the <span className="font-semibold text-foreground">{isPro ? "Pro" : "Free"}</span> plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-primary w-4 h-4 shrink-0" />
            <span>{isPro ? "Unlimited projects" : "Up to 3 projects"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-primary w-4 h-4 shrink-0" />
            <span>{isPro ? "All templates included" : "Basic templates only"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="text-primary w-4 h-4 shrink-0" />
            <span>{isPro ? "Priority support" : "Community support"}</span>
          </div>
        </CardContent>
        <CardFooter>
          {isPro ? (
            <Button variant="outline" disabled>
              Manage via Stripe Portal
            </Button>
          ) : (
            <Button onClick={handleSubscribe} disabled={managing} className="glow-primary">
              {managing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                "Upgrade to Pro"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
