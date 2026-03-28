"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Loader2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/useLocale";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { locale } = useLocale();
  const isTh = locale === "th";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error(isTh ? "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" : "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error(isTh ? "รหัสผ่านไม่ตรงกัน" : "Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success(isTh ? "อัปเดตรหัสผ่านสำเร็จ!" : "Password updated successfully!");
    router.push("/app");
  };

  return (
    <div className="relative">
      <Card className="mx-auto w-full shadow-xl shadow-primary/5 border-primary/10">
        <CardHeader className="space-y-1 items-center pb-2">
          <Link href="/" className="flex items-center space-x-2 mb-6 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
              <Zap className="h-5 w-5" />
            </div>
          </Link>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isTh ? "ตั้งรหัสผ่านใหม่" : "Set New Password"}
          </CardTitle>
          <CardDescription>
            {isTh ? "กรุณากรอกรหัสผ่านใหม่ของคุณด้านล่าง" : "Enter your new password below."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleReset}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">{isTh ? "รหัสผ่านใหม่ (New Password)" : "New Password"}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{isTh ? "ยืนยันรหัสผ่านใหม่ (Confirm Password)" : "Confirm Password"}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-11 glow-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isTh ? "กำลังอัปเดต..." : "Updating..."}
                </>
              ) : (
                isTh ? "อัปเดตรหัสผ่าน" : "Update Password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
