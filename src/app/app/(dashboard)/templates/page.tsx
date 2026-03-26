"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, CircuitBoard, Sun, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const templates = [
  {
    id: "blank",
    name: "Blank Project",
    desc: "Start from scratch with a blank canvas",
    icon: Zap,
    diagram_data: {},
  },
  {
    id: "motor-starter",
    name: "Single Motor Circuit",
    desc: "Basic DOL starter with circuit breaker, contactor, and motor",
    icon: CircuitBoard,
    diagram_data: { preset: "motor-starter" },
  },
  {
    id: "substation",
    name: "Substation Layout",
    desc: "Typical 132/33kV substation with transformer and switchgear",
    icon: Building2,
    diagram_data: { preset: "substation" },
  },
  {
    id: "solar-pv",
    name: "Solar PV Plant",
    desc: "Utility-scale solar power plant single-line diagram",
    icon: Sun,
    diagram_data: { preset: "solar-pv" },
  },
];

export default function TemplatesPage() {
  const [creating, setCreating] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleUseTemplate = async (template: typeof templates[0]) => {
    setCreating(template.id);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in first");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .insert({
          name: template.name === "Blank Project" ? "Untitled Project" : template.name,
          user_id: user.id,
          diagram_data: template.diagram_data,
        })
        .select()
        .single();

      if (error) {
        toast.error("Failed to create project");
        return;
      }

      if (data) {
        toast.success(`"${data.name}" created!`);
        router.push(`/app/projects/${data.id}`);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setCreating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-2">
          Start your schematic with a pre-configured template.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Zap className="h-3 w-3" />
          🎉 Launch offer — All templates free until March 2027
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <Card key={tpl.id} className="flex flex-col hover:shadow-lg hover:border-primary/30 transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  {tpl.name}
                </CardTitle>
                <CardDescription>{tpl.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="bg-muted w-full h-32 rounded-lg flex items-center justify-center">
                  <Icon className="h-12 w-12 text-muted-foreground/30" />
                </div>
              </CardContent>
              <div className="p-4 pt-0 mt-auto">
                <Button
                  className="w-full"
                  onClick={() => handleUseTemplate(tpl)}
                  disabled={creating === tpl.id}
                >
                  {creating === tpl.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Use Template"
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
