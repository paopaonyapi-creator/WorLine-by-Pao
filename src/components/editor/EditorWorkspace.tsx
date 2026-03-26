"use client";

import { useEffect, useState } from "react";
import { CanvasArea } from "./CanvasArea";
import { Palette } from "./Palette";
import { Toolbar } from "./Toolbar";
import { PropertiesPanel } from "./PropertiesPanel";
import { ZoomControls } from "./ZoomControls";
import { VersionHistory } from "./VersionHistory";
import { CursorOverlay } from "./CursorOverlay";
import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { createClient } from "@/lib/supabase/client";

export const EditorWorkspace = ({ projectId, readOnly = false }: { projectId: string; readOnly?: boolean }) => {
  const { initialize, canvas, zoom, panX, panY } = useEditorStore();
  const [loading, setLoading] = useState(true);

  // Auto-save every 30 seconds (if not readonly)
  const { save: manualSave } = useAutoSave(readOnly ? null : projectId);

  // Real-time collaboration
  const { cursors } = useRealtimeCollaboration(readOnly ? null : projectId);

  // Keyboard shortcuts: Ctrl+S, Ctrl+Z/Y, Delete, Escape, Ctrl+D (disable if readonly)
  useEditorShortcuts(readOnly ? "readonly" : projectId, manualSave);

  useEffect(() => {
    const loadProject = async () => {
      const supabase = createClient();

      // Load from projects.diagram_data (the single source of truth)
      const { data, error } = await supabase
        .from('projects')
        .select('diagram_data')
        .eq('id', projectId)
        .single();

      if (data?.diagram_data && typeof data.diagram_data === 'object') {
        const dd = data.diagram_data as any;

        // If diagram_data contains objects array, use it
        if (dd.objects && Array.isArray(dd.objects)) {
          initialize(projectId, {
            objects: dd.objects,
            width: dd.width || 1920,
            height: dd.height || 1080,
            background: dd.background || "#ffffff",
            gridSize: dd.gridSize || 20,
          });
        } else {
          // diagram_data exists but is a preset or empty object
          initialize(projectId);
        }
      } else {
        // No diagram_data, start fresh
        initialize(projectId);
      }

      setLoading(false);
    };
    loadProject();
  }, [projectId, initialize]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-muted">
      {!readOnly && <Toolbar projectId={projectId} />}
      <div className="flex flex-1 overflow-hidden relative">
        {!readOnly && (
          <div className="hidden md:flex w-64 flex-none border-r border-border/50">
            <Palette />
          </div>
        )}
        <div className="flex-1 overflow-hidden relative" id="canvas-container" style={{ pointerEvents: readOnly ? 'none' : 'auto' }}>
          <CanvasArea />
          <ZoomControls />
          {!readOnly && <VersionHistory projectId={projectId} />}
          {!readOnly && <CursorOverlay cursors={cursors} zoom={zoom} panX={panX} panY={panY} />}
          {/* Shortcut hints */}
          {!readOnly && (
            <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
              <span>Ctrl+S save</span>
              <span>Ctrl+Z undo</span>
              <span>Del delete</span>
            </div>
          )}
          {/* Online users indicator */}
          {!readOnly && cursors.length > 0 && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm">
              <div className="flex -space-x-1">
                {cursors.slice(0, 3).map((c) => (
                  <div
                    key={c.userId}
                    className="w-5 h-5 rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  >
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground ml-1">
                {cursors.length} online
              </span>
            </div>
          )}
        </div>
        {!readOnly && (
          <div className="hidden lg:flex w-64 flex-none border-l border-border/50">
            <PropertiesPanel />
          </div>
        )}
      </div>
    </div>
  );
};
