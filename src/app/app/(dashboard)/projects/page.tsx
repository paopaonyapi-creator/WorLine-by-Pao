"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Folder, Clock, Trash2, Share2, Link2, Check, Pencil, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  updated_at: string;
  created_at: string;
  is_public?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const perPage = 12;
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

  const handleDelete = async (projectId: string, projectName: string) => {
    if (!confirm(`Delete "${projectName}"? This cannot be undone.`)) return;

    setDeletingId(projectId);
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      toast.error("Failed to delete project");
    } else {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast.success(`"${projectName}" deleted`);
    }
    setDeletingId(null);
  };

  const handleShare = async (projectId: string, currentlyPublic: boolean) => {
    setSharingId(projectId);
    const newState = !currentlyPublic;

    try {
      const res = await fetch("/api/projects/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, isPublic: newState }),
      });

      if (res.ok) {
        setProjects(prev =>
          prev.map(p => p.id === projectId ? { ...p, is_public: newState } : p)
        );

        if (newState) {
          const shareUrl = `${window.location.origin}/share/${projectId}`;
          await navigator.clipboard.writeText(shareUrl);
          setCopiedId(projectId);
          setTimeout(() => setCopiedId(null), 2000);
          toast.success("Share link copied to clipboard!");
        } else {
          toast.success("Project is now private");
        }
      } else {
        toast.error("Failed to update sharing");
      }
    } catch {
      toast.error("Failed to update sharing");
    }
    setSharingId(null);
  };

  const handleRename = async (projectId: string, newName: string) => {
    if (!newName.trim()) return;
    const { error } = await supabase
      .from("projects")
      .update({ name: newName.trim() })
      .eq("id", projectId);

    if (error) {
      toast.error("Failed to rename");
    } else {
      setProjects(prev =>
        prev.map(p => p.id === projectId ? { ...p, name: newName.trim() } : p)
      );
      toast.success("Project renamed");
    }
    setRenamingId(null);
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

      {/* Search & Sort Bar */}
      {!loading && projects.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="pl-9 h-10"
              aria-label="Search projects"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Sort projects"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
          </select>
        </div>
      )}

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
      ) : (() => {
          const filtered = projects.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
              case "name-asc": return a.name.localeCompare(b.name);
              case "name-desc": return b.name.localeCompare(a.name);
              case "oldest": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
              default: return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }
          });
          const totalPages = Math.ceil(sorted.length / perPage);
          const paginated = sorted.slice((page - 1) * perPage, page * perPage);

          if (sorted.length === 0) return (
            <p className="text-center text-muted-foreground py-12">No projects match "{searchQuery}"</p>
          );

          return (
            <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg hover:border-primary/30 transition-all duration-200 relative">
              <Link href={`/app/projects/${project.id}`}>
                <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    {renamingId === project.id ? (
                      <Input
                        autoFocus
                        className="h-7 text-lg font-semibold px-1"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRename(project.id, renameValue)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(project.id, renameValue);
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      />
                    ) : (
                      <span
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setRenamingId(project.id);
                          setRenameValue(project.name);
                        }}
                        title="Double-click to rename"
                      >
                        {project.name}
                      </span>
                    )}
                    {project.is_public && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-normal">
                        Public
                      </span>
                    )}
                  </CardTitle>
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
              </Link>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary/10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleShare(project.id, !!project.is_public);
                  }}
                  disabled={sharingId === project.id}
                >
                  {copiedId === project.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : project.is_public ? (
                    <Link2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(project.id, project.name);
                  }}
                  disabled={deletingId === project.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <span className="text-sm font-medium px-2">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
        </>
          );
        })()}
    </div>
  );
}
