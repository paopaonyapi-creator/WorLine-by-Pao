import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getProject(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("projects")
    .select("id, name, diagram_data, is_public, created_at, updated_at")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  return data;
}

export default async function SharedProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span>Wor<span className="text-primary">Line</span></span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>Shared view</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground mt-1">
              Last updated: {new Date(project.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Diagram Preview */}
          <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
            <div className="bg-muted w-full min-h-[500px] flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <Zap className="h-12 w-12 mx-auto text-primary/30" />
                <p className="text-lg font-medium">Diagram Preview</p>
                <p className="text-sm">Interactive preview coming soon</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/signup">
              <Button className="glow-primary px-8">
                Create Your Own Diagram
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to WorLine
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
