"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Folder, Clock, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: string;
  name: string;
  updated_at: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const handleNewProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("projects")
      .insert({ name: "Untitled Project", user_id: user.id, diagram_data: {} })
      .select()
      .single();

    if (data) {
      window.location.href = `/app/projects/${data.id}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your single-line diagram projects.
          </p>
        </div>
        <Button onClick={handleNewProject} className="glow-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="bg-muted w-full h-24 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Folder className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-sm mb-6 text-center">
              Create your first single-line diagram to get started.
            </p>
            <Button onClick={handleNewProject} className="glow-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/app/projects/${project.id}`}>
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(project.updated_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted w-full h-24 rounded flex items-center justify-center text-sm text-muted-foreground">
                    [Diagram Preview]
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
