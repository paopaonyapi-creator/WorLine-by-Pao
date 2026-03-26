"use client";

import { useEffect, useState } from "react";
import { CanvasArea } from "./CanvasArea";
import { Palette } from "./Palette";
import { Toolbar } from "./Toolbar";
import { PropertiesPanel } from "./PropertiesPanel";
import { ZoomControls } from "./ZoomControls";
import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { createClient } from "@/lib/supabase/client";

export const EditorWorkspace = ({ projectId, readOnly = false }: { projectId: string; readOnly?: boolean }) => {
  const { initialize, canvas } = useEditorStore();
  const [loading, setLoading] = useState(true);

  // Auto-save every 30 seconds (if not readonly)
  const { save: manualSave } = useAutoSave(readOnly ? null : projectId);

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
        {!readOnly && <Palette />}
        <div className="flex-1 overflow-hidden relative" id="canvas-container" style={{ pointerEvents: readOnly ? 'none' : 'auto' }}>
          <CanvasArea />
          <ZoomControls />
          {/* Shortcut hints */}
          {!readOnly && (
            <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
              <span>Ctrl+S save</span>
              <span>Ctrl+Z undo</span>
              <span>Del delete</span>
            </div>
          )}
        </div>
        {!readOnly && <PropertiesPanel />}
      </div>
    </div>
  );
};
