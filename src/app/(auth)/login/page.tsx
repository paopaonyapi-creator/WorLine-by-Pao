"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/useLocale";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { locale } = useLocale();
  const isTh = locale === "th";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success(isTh ? "ยินดีต้อนรับกลับมา!" : "Welcome back!");
    router.push("/app");
    router.refresh();
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
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isTh ? "ยินดีต้อนรับกลับมา" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {isTh ? "เข้าสู่ระบบบัญชี WorLine ของคุณ" : "Sign in to your WorLine account."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{isTh ? "อีเมล (Email)" : "Email"}</Label>
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
            <div className="space-y-2">
              <Label htmlFor="password">{isTh ? "รหัสผ่าน (Password)" : "Password"}</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder={isTh ? "รหัสผ่านของคุณ" : "Your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-11 glow-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isTh ? "กำลังเข้าสู่ระบบ..." : "Signing in..."}
                </>
              ) : (
                isTh ? "เข้าสู่ระบบ" : "Sign In"
              )}
            </Button>
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors text-center">
              {isTh ? "ลืมรหัสผ่านใช่หรือไม่?" : "Forgot your password?"}
            </Link>
            <div className="text-center text-sm text-muted-foreground">
              {isTh ? "ยังไม่มีบัญชีใช่หรือไม่? " : "Don't have an account? "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                {isTh ? "สร้างบัญชีใหม่" : "Create one"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
