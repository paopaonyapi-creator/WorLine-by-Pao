"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Loader2, ArrowLeft, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/app/settings`,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 gradient-hero -z-10" />

      <Card className="mx-auto w-full shadow-xl shadow-primary/5 border-primary/10">
        <CardHeader className="space-y-1 items-center pb-2">
          <Link href="/" className="flex items-center space-x-2 mb-6 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
              <Zap className="h-5 w-5" />
            </div>
          </Link>

          {sent ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Check your email</CardTitle>
              <CardDescription className="text-center">
                We sent a password reset link to <strong>{email}</strong>. Check your inbox and click the link to reset your password.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-bold tracking-tight">Reset your password</CardTitle>
              <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
            </>
          )}
        </CardHeader>

        {sent ? (
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
              Try a different email
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Button>
            </Link>
          </CardFooter>
        ) : (
          <form onSubmit={handleReset}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="engineer@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full h-11 glow-primary" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="inline mr-1 h-3 w-3" />
                Back to login
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
