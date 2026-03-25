"use client";

// Force dynamic — prevent pre-rendering during build when env vars are absent

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Check } from "lucide-react";

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
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.assign(data.url);
      } else {
        toast.error("Failed to create checkout session");
        setManaging(false);
      }
    } catch (e) {
      toast.error("An error occurred");
      setManaging(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and billing.</p>
      </div>

      <div className="flex space-x-4 border-b pb-4 mb-4">
        <Link href="/app/settings">
          <Button variant="ghost">Profile</Button>
        </Link>
        <Link href="/app/settings/billing">
          <Button variant="default">Billing</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the {isPro ? "Pro" : "Free"} plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm">
            <Check className="text-primary w-4 h-4" />
            <span>{isPro ? "Unlimited projects" : "Up to 3 projects"}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2">
            <Check className="text-primary w-4 h-4" />
            <span>{isPro ? "Premium templates included" : "Basic templates only"}</span>
          </div>
        </CardContent>
        <CardFooter>
          {isPro ? (
            <Button disabled>Manage via Stripe Portal (Setup Required)</Button>
          ) : (
            <Button onClick={handleSubscribe} disabled={managing}>
              {managing ? "Redirecting..." : "Upgrade to Pro"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
