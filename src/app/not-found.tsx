import Link from "next/link";
import { Zap, ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero px-4">
      <div className="text-center max-w-md space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-2">
              <SearchX className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter text-primary">404</h1>
          <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/">
            <Button className="glow-primary px-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" className="px-6">
              View Features
            </Button>
          </Link>
        </div>

        {/* Brand */}
        <div className="pt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Zap className="h-4 w-4 text-primary" />
          <span>WorLine by Pao</span>
        </div>
      </div>
    </div>
  );
}
