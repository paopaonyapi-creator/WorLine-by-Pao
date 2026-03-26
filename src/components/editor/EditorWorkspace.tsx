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

export const EditorWorkspace = ({ projectId }: { projectId: string }) => {
  const { initialize, canvas } = useEditorStore();
  const [loading, setLoading] = useState(true);

  // Auto-save every 30 seconds
  const { save: manualSave } = useAutoSave(projectId);

  // Keyboard shortcuts: Ctrl+S, Ctrl+Z/Y, Delete, Escape, Ctrl+D
  useEditorShortcuts(projectId, manualSave);

  useEffect(() => {
    const loadProject = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('project_pages')
        .select('canvas_width, canvas_height, background, scene_version, diagram_objects (id, object_type, object_data, z_index)')
        .eq('project_id', projectId)
        .order('z_index', { referencedTable: 'diagram_objects', ascending: true })
        .limit(1)
        .maybeSingle();

      if (data) {
        const objects = data.diagram_objects ? data.diagram_objects.map((doObj: any) => ({
          id: doObj.id,
          ...doObj.object_data
        })) : [];

        initialize(projectId, {
          objects,
          width: data.canvas_width || 1920,
          height: data.canvas_height || 1080,
          background: data.background ? (data.background as any).color : "#ffffff",
          gridSize: 20
        });
      } else {
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
      <Toolbar projectId={projectId} />
      <div className="flex flex-1 overflow-hidden relative">
        <Palette />
        <div className="flex-1 overflow-hidden relative" id="canvas-container">
          <CanvasArea />
          <ZoomControls />
          {/* Shortcut hints */}
          <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
            <span>Ctrl+S save</span>
            <span>Ctrl+Z undo</span>
            <span>Del delete</span>
          </div>
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
};

