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

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { locale } = useLocale();
  const isTh = locale === "th";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success(isTh ? "สร้างบัญชีสำเร็จ! ยินดีต้อนรับสู่ WorLine" : "Account created! Welcome to WorLine.");
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
            {isTh ? "สร้างบัญชีใหม่" : "Create your account"}
          </CardTitle>
          <CardDescription>
            {isTh ? "เริ่มต้นออกแบบระบบไฟฟ้าได้ในไม่กี่วินาที" : "Start designing electrical schematics in seconds."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{isTh ? "ชื่อ-นามสกุล (Full Name)" : "Full Name"}</Label>
              <Input
                id="fullName"
                type="text"
                placeholder={isTh ? "คำมูน วงศ์คำเหลา" : "John Doe"}
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11"
              />
            </div>
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
                minLength={6}
                placeholder={isTh ? "อย่างน้อย 6 ตัวอักษร" : "Min. 6 characters"}
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
                  {isTh ? "กำลังสร้างบัญชี..." : "Creating account..."}
                </>
              ) : (
                isTh ? "สร้างบัญชี" : "Create Account"
              )}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {isTh ? "มีบัญชีอยู่แล้วใช่หรือไม่? " : "Already have an account? "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                {isTh ? "เข้าสู่ระบบ" : "Sign in"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
