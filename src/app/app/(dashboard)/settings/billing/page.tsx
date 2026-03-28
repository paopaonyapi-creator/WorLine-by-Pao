"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, ExternalLink, Zap } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please log in to subscribe");
        return;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          email: user.email 
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        // We use a mock error toast if Stripe keys aren't set up yet, 
        // since URL will likely fail with placeholder keys.
        if (url.includes('api.stripe.com') || url.includes('checkout.stripe.com')) {
           window.location.href = url;
        } else {
           toast.error("Stripe is currently in test mode with invalid placeholder keys.");
        }
      }
    } catch (err: any) {
      toast.error("Failed to start checkout: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mt-8">
        {/* Current Plan */}
        <Card className="border-primary shadow-md relative overflow-hidden">
          <div data-testid="billing-status-badge" className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-medium">
            Active
          </div>
          <CardHeader>
            <CardTitle>Pro Plan (Early Access)</CardTitle>
            <CardDescription>You are currently on the 1-year free trial.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">฿0<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
            <p className="text-sm text-emerald-500 mt-2 font-medium">Expires in 365 days</p>
            
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Unlimited Projects</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> All Templates</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> SVG & PDF Export</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> CSV/Excel BOM Export</li>
            </ul>
          </CardContent>
        </Card>

        {/* Upgrade Plan */}
        <Card className="opacity-90">
          <CardHeader>
            <CardTitle>Professional License</CardTitle>
            <CardDescription>Secure your pricing after the trial ends.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">฿290<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
            <p className="text-sm text-muted-foreground mt-2">Billed annually at ฿3,480</p>
            
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center"><Check className="h-4 w-4 text-muted-foreground mr-2" /> Priority Support</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-muted-foreground mr-2" /> Custom Templates</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-muted-foreground mr-2" /> API Access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button data-testid="billing-subscribe-btn" className="w-full gap-2" onClick={handleSubscribe} disabled={loading}>
              <CreditCard className="h-4 w-4" />
              {loading ? "Loading..." : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 max-w-3xl">
        <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-16 bg-muted rounded-md flex items-center justify-center border">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No payment method added</p>
                <p className="text-sm text-muted-foreground">Add a card to prevent service interruption after trial.</p>
              </div>
            </div>
            <Button variant="outline">Add Card</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
