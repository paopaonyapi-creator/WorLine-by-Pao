import type { Metadata } from "next";
import { Zap, Download, Layers, Shield, Palette, Users, Cloud, MonitorSmartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore WorLine's powerful features: drag-and-drop editor, IEC/IEEE symbols, SVG & PDF export, cloud save, version history, and team collaboration.",
};

const features = [
  {
    icon: Zap,
    title: "Drag & Drop Editor",
    description:
      "Intuitively place generators, transformers, breakers, and more — simply drag from the symbol palette onto your diagram canvas.",
  },
  {
    icon: Layers,
    title: "Smart Wire Routing",
    description:
      "Automatic orthogonal routing snaps wires between terminals. Connections stay clean even when you move components.",
  },
  {
    icon: Download,
    title: "SVG & PDF Export",
    description:
      "Export publication-ready single-line diagrams as SVG vectors or PDF documents for reports, submissions, and printing.",
  },
  {
    icon: Palette,
    title: "IEC & IEEE Symbol Library",
    description:
      "Comprehensive symbol set covering generators, motors, transformers, switchgear, protection relays, and more — built to international standards.",
  },
  {
    icon: Cloud,
    title: "Cloud Save & Sync",
    description:
      "Your projects are securely stored in the cloud. Pick up where you left off from any device, any time.",
  },
  {
    icon: Shield,
    title: "Version History",
    description:
      "Never lose work. Automatic version snapshots let you review, compare, and restore previous diagram revisions.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share projects with colleagues. Real-time collaboration lets multiple engineers work on the same diagram simultaneously.",
  },
  {
    icon: MonitorSmartphone,
    title: "Works Everywhere",
    description:
      "WorLine runs entirely in the browser — no installation required. Works on desktop, tablet, and modern mobile browsers.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 md:px-8">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium mb-6 bg-primary/5 text-primary border-primary/20">
          Everything you need
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
          Powerful features for{" "}
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            professional diagrams
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          WorLine gives electrical engineers a modern, web-based toolkit to
          create, edit, and export single-line diagrams — no desktop software
          required.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 text-center">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-blue-500/5 p-12 md:p-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start drawing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Create your first single-line diagram in minutes — no credit card
            required.
          </p>
          <a
            href="/signup"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  );
}
