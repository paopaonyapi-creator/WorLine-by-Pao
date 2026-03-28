"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, ExternalLink, Zap } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/useLocale";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error(t("pls_login_sub"));
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
           toast.error(t("stripe_test_mode"));
        }
      }
    } catch (err: any) {
      toast.error(t("fail_checkout") + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("billing_sub")}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mt-8">
        {/* Current Plan */}
        <Card className="border-primary shadow-md relative overflow-hidden">
          <div data-testid="billing-status-badge" className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-medium">
            {t("status_active")}
          </div>
          <CardHeader>
            <CardTitle>{t("pro_plan")}</CardTitle>
            <CardDescription>{t("trial_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">฿0<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
            <p className="text-sm text-emerald-500 mt-2 font-medium">{t("expires_365")}</p>
            
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> {t("unlimited_projects")}</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> {t("all_templates")}</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> {t("svg_pdf_export")}</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> {t("csv_bom_export")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Upgrade Plan */}
        <Card className="opacity-90">
          <CardHeader>
            <CardTitle>{t("pro_license")}</CardTitle>
            <CardDescription>{t("secure_pricing")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">฿290<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
            <p className="text-sm text-muted-foreground mt-2">{t("billed_annually")}</p>
            
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center"><Check className="h-4 w-4 text-muted-foreground mr-2" /> {t("priority_support")}</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-muted-foreground mr-2" /> {t("custom_templates")}</li>
              <li className="flex items-center"><Check className="h-4 w-4 text-muted-foreground mr-2" /> {t("api_access")}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button data-testid="billing-subscribe-btn" className="w-full gap-2" onClick={handleSubscribe} disabled={loading}>
              <CreditCard className="h-4 w-4" />
              {loading ? t("loading") : t("subscribe_now")}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 max-w-3xl">
        <h3 className="text-lg font-medium mb-4">{t("payment_methods")}</h3>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-16 bg-muted rounded-md flex items-center justify-center border">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{t("no_card")}</p>
                <p className="text-sm text-muted-foreground">{t("add_card_desc")}</p>
              </div>
            </div>
            <Button variant="outline">{t("add_card")}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
