import Link from "next/link";
import { Zap, ArrowRight, Shield, Cloud, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 gradient-hero -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
            <Zap className="h-4 w-4" />
            Professional Electrical Engineering Tool
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
            Design Single-Line Diagrams{" "}
            <span className="text-primary">Like a Pro</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            WorLine is the modern, cloud-based editor for electrical engineers. 
            Create, collaborate, and export professional single-line diagrams in minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 glow-primary" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Everything you need to design electrical schematics
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Drag & Drop Editor</h3>
              <p className="text-muted-foreground text-sm">
                Intuitive canvas with professional electrical symbols. Just drag, drop, and connect.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cloud Save & Sync</h3>
              <p className="text-muted-foreground text-sm">
                Your diagrams are automatically saved and synced across all your devices.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <FileDown className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Export Anywhere</h3>
              <p className="text-muted-foreground text-sm">
                Export to PNG, SVG, or PDF. Share with clients and colleagues instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="mx-auto max-w-3xl text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to streamline your workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join engineers who trust WorLine for their electrical diagram needs.
          </p>
          <Button size="lg" className="h-12 px-8 glow-primary" asChild>
            <Link href="/signup">
              Start Designing Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
