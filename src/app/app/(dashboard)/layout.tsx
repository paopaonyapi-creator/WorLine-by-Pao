"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Folder, LayoutTemplate, Settings, LogOut, BookOpen, Menu, CreditCard, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n/useLocale";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLocale();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const mainNav = [
    { name: t("sidebar_projects"), href: "/app/projects", icon: Folder },
    { name: t("sidebar_templates"), href: "/app/templates", icon: LayoutTemplate },
  ];

  const accountNav = [
    { name: t("sidebar_profile"), href: "/app/settings/profile", icon: User },
    { name: t("sidebar_billing"), href: "/app/settings/billing", icon: CreditCard },
    { name: t("sidebar_help"), href: "/guide", icon: BookOpen },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/app" && pathname.startsWith(href));

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col h-full px-2 text-sm font-medium lg:px-4 mt-4" role="navigation" aria-label="Main navigation">
      {/* Main */}
      <div className="space-y-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-4 border-t" />

      {/* Account */}
      <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">{t("sidebar_account")}</p>
      <div className="space-y-1">
        {accountNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r bg-muted/40 hidden md:flex md:flex-col" role="complementary" aria-label="Sidebar">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/app/projects" className="flex items-center gap-2 font-semibold">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold">WorLine</span>
          </Link>
        </div>
        <div className="flex-1">
          <NavLinks />
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button variant="outline" className="flex-1 justify-start gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              {t("sidebar_signout")}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full bg-background">
        {/* Mobile Header */}
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Link href="/app/projects" className="flex items-center gap-2 font-semibold">
            <Zap className="h-6 w-6 text-primary" />
            <span>WorLine</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 pt-8">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">WorLine</span>
                </div>
                <NavLinks onNavigate={() => setMobileOpen(false)} />
                <div className="absolute bottom-6 left-4 right-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
