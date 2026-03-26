"use client";

import { useEffect, useState } from "react";
import { CanvasArea } from "./CanvasArea";
import { Palette } from "./Palette";
import { Toolbar } from "./Toolbar";
import { PropertiesPanel } from "./PropertiesPanel";
import { useEditorStore } from "@/store/editorStore";
import { createClient } from "@/lib/supabase/client";

export const EditorWorkspace = ({ projectId }: { projectId: string }) => {
  const { initialize, canvas } = useEditorStore();
  const [loading, setLoading] = useState(true);

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
        // Hydrate from DB
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
        // Just initialize blank
        initialize(projectId);
      }
      setLoading(false);
    };
    loadProject();
  }, [projectId, initialize]);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading editor...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-muted">
      <Toolbar projectId={projectId} />
      <div className="flex flex-1 overflow-hidden relative">
        <Palette />
        <div className="flex-1 overflow-hidden relative" id="canvas-container">
          <CanvasArea />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
};
