"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEditorStore } from "@/store/editorStore";
import { History, RotateCcw, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

type VersionEntry = {
  id: string;
  created_at: string;
  diagram_data: any;
};

export const VersionHistory = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<VersionEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { initialize } = useEditorStore();
  const supabase = createClient();

  const fetchVersions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("project_versions")
      .select("id, created_at, diagram_data")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(30);

    if (data) setVersions(data);
    if (error) console.error("Failed to load versions:", error);
    setLoading(false);
  };

  useEffect(() => {
    if (open) fetchVersions();
  }, [open]);

  const restoreVersion = async (version: VersionEntry) => {
    const dd = version.diagram_data;
    if (dd && dd.objects) {
      initialize(projectId, {
        objects: dd.objects,
        width: dd.width || 1920,
        height: dd.height || 1080,
        background: dd.background || "#ffffff",
        gridSize: dd.gridSize || 20,
      });

      // Also save as current state
      const { error } = await supabase
        .from("projects")
        .update({
          diagram_data: dd,
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) {
        toast.error("Failed to save restored version");
      } else {
        toast.success("Version restored!");
      }
    }
    setOpen(false);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("th-TH", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRelativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "เมื่อสักครู่";
    if (mins < 60) return `${mins} นาทีที่แล้ว`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} ชั่วโมงที่แล้ว`;
    const days = Math.floor(hrs / 24);
    return `${days} วันที่แล้ว`;
  };

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm shadow-md border"
        onClick={() => setOpen(true)}
        title="Version History"
      >
        <History className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="absolute top-0 right-0 z-30 w-72 h-full border-l bg-background shadow-xl flex flex-col animate-in slide-in-from-right-5 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Clock className="h-4 w-4" />
          Version History
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Version List */}
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : versions.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            <History className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>No versions saved yet.</p>
            <p className="text-xs mt-1">Versions are auto-saved every 5 minutes.</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {versions.map((v, i) => (
              <div
                key={v.id}
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/60 transition-colors cursor-default"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {i === 0 ? "🟢 Latest" : `Version ${versions.length - i}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{getRelativeTime(v.created_at)}</p>
                  <p className="text-[10px] text-muted-foreground/60">{formatDate(v.created_at)}</p>
                </div>
                {i !== 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity gap-1 text-xs"
                    onClick={() => restoreVersion(v)}
                  >
                    <RotateCcw className="h-3 w-3" />
                    Restore
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t text-center">
        <p className="text-[10px] text-muted-foreground">
          {versions.length} version{versions.length !== 1 ? "s" : ""} saved
        </p>
      </div>
    </div>
  );
};
