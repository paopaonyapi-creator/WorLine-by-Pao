"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";

const navLinks = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Guide", href: "/guide" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto px-4 md:px-8">
          {/* Desktop Nav */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-8 flex items-center space-x-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Zap className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Wor<span className="text-primary">Line</span>
              </span>
            </Link>
            <nav className="flex items-center space-x-1 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                    pathname === link.href ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Logo + Hamburger */}
          <div className="flex flex-1 items-center justify-between md:justify-end">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold">WorLine</span>
            </Link>

            <nav className="flex items-center space-x-1">
              <ThemeToggle />
              <LanguageSwitcher />
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-9 px-4">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="h-9 px-4">Sign Up Free</Button>
                </Link>
              </div>

              {/* Mobile Hamburger */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-72 pt-12">
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-lg font-medium px-2 py-2 rounded-md transition-colors hover:bg-accent ${
                          pathname === link.href ? "text-primary" : "text-foreground/80"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <hr className="border-border" />
                    <Link
                      href="/login"
                      className="text-lg font-medium px-2 py-2 rounded-md hover:bg-accent text-foreground/80"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full">Sign Up Free</Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <span className="font-bold">WorLine by Pao</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional electrical single-line diagram editor built for engineers.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/guide" className="hover:text-foreground transition-colors">User Guide</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Get Started</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/signup" className="hover:text-foreground transition-colors">Create Account</Link></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} WorLine by Pao. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Built with Next.js, Supabase, and Stripe
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
