"use client";

import { useEffect, useState, useCallback } from "react";
import { CanvasArea } from "./CanvasArea";
import { Palette } from "./Palette";
import { Toolbar } from "./Toolbar";
import { PropertiesPanel } from "./PropertiesPanel";
import { ZoomControls } from "./ZoomControls";
import { VersionHistory } from "./VersionHistory";
import { CursorOverlay } from "./CursorOverlay";
import { CrosshairOverlay } from "./CrosshairOverlay";
import { RulerOverlay } from "./RulerOverlay";
import { SymbolSearch } from "./SymbolSearch";
import { LoadCalculator } from "./LoadCalculator";
import { BOMTable } from "./BOMTable";
import { SheetTabs } from "./SheetTabs";
import { AIAutoLayout } from "./AIAutoLayout";
import { CustomSymbolCreator } from "./CustomSymbolCreator";
import { DrawingToolbar } from "./DrawingToolbar";
import { CableSchedule } from "./CableSchedule";
import { TitleBlockEditor } from "./TitleBlockEditor";
import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { createClient } from "@/lib/supabase/client";
import { Calculator, FileSpreadsheet, Sparkles, Paintbrush, Cable, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditorWorkspace = ({ projectId, readOnly = false }: { projectId: string; readOnly?: boolean }) => {
  const { initialize, canvas, zoom, panX, panY } = useEditorStore();
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showLoadCalc, setShowLoadCalc] = useState(false);
  const [showBOM, setShowBOM] = useState(false);
  const [showAILayout, setShowAILayout] = useState(false);
  const [showSymbolCreator, setShowSymbolCreator] = useState(false);
  const [showCableSchedule, setShowCableSchedule] = useState(false);
  const [showTitleBlock, setShowTitleBlock] = useState(false);

  // Auto-save every 30 seconds (if not readonly)
  const { save: manualSave } = useAutoSave(readOnly ? null : projectId);

  // Real-time collaboration
  const { cursors } = useRealtimeCollaboration(readOnly ? null : projectId);

  // Keyboard shortcuts
  useEditorShortcuts(readOnly ? "readonly" : projectId, manualSave);

  // Ctrl+K for search
  useEffect(() => {
    if (readOnly) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === "Escape" && showSearch) {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [readOnly, showSearch]);

  useEffect(() => {
    const loadProject = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('diagram_data')
        .eq('id', projectId)
        .single();

      if (data?.diagram_data && typeof data.diagram_data === 'object') {
        const dd = data.diagram_data as any;
        if (dd.objects && Array.isArray(dd.objects)) {
          initialize(projectId, {
            objects: dd.objects,
            width: dd.width || 1920,
            height: dd.height || 1080,
            background: dd.background || "#ffffff",
            gridSize: dd.gridSize || 20,
          });
        } else {
          initialize(projectId);
        }
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
      {!readOnly && <Toolbar projectId={projectId} />}
      <div className="flex flex-1 overflow-hidden relative">
        {!readOnly && (
          <div className="hidden md:flex w-64 flex-none border-r border-border/50">
            <Palette />
          </div>
        )}
        {/* Drawing Toolbar - vertical strip */}
        {!readOnly && (
          <div className="hidden md:flex flex-none">
            <DrawingToolbar />
          </div>
        )}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {/* Canvas area */}
          <div className="flex-1 overflow-hidden relative" id="canvas-container" style={{ pointerEvents: readOnly ? 'none' : 'auto' }}>
            <CanvasArea />
            <ZoomControls />

            {/* Rulers */}
            {!readOnly && <RulerOverlay zoom={zoom} panX={panX} panY={panY} />}

            {/* Crosshair cursor */}
            {!readOnly && <CrosshairOverlay />}

            {!readOnly && <VersionHistory projectId={projectId} />}
            {!readOnly && <CursorOverlay cursors={cursors} zoom={zoom} panX={panX} panY={panY} />}

            {/* Symbol Search (Ctrl+K) */}
            {showSearch && <SymbolSearch onClose={() => setShowSearch(false)} />}

            {/* Load Calculator */}
            {showLoadCalc && <LoadCalculator onClose={() => setShowLoadCalc(false)} />}

            {/* BOM Table */}
            {showBOM && <BOMTable onClose={() => setShowBOM(false)} />}

            {/* AI Auto Layout */}
            {showAILayout && <AIAutoLayout onClose={() => setShowAILayout(false)} />}

            {/* Custom Symbol Creator */}
            {showSymbolCreator && <CustomSymbolCreator onClose={() => setShowSymbolCreator(false)} />}

            {/* Cable Schedule */}
            {showCableSchedule && <CableSchedule onClose={() => setShowCableSchedule(false)} />}

            {/* Title Block Editor */}
            {showTitleBlock && <TitleBlockEditor onClose={() => setShowTitleBlock(false)} onApply={() => {}} />}

            {/* Shortcut hints */}
            {!readOnly && (
              <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
                <span>R rotate</span>
                <span>H/V flip</span>
                <span>Ctrl+K search</span>
                <span>W wire</span>
                <span>T text</span>
                <span>F freehand</span>
                <span>D shape</span>
              </div>
            )}

            {/* Bottom-right action buttons */}
            {!readOnly && (
              <div className="absolute bottom-4 right-4 z-10 flex gap-1.5 flex-wrap justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setShowTitleBlock(!showTitleBlock)}
                  title="Title Block"
                >
                  <FileText className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setShowCableSchedule(!showCableSchedule)}
                  title="Cable Schedule"
                >
                  <Cable className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setShowSymbolCreator(!showSymbolCreator)}
                  title="Custom Symbol Creator"
                >
                  <Paintbrush className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setShowAILayout(!showAILayout)}
                  title="AI Auto Layout"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setShowBOM(!showBOM)}
                  title="Bill of Materials"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
                  onClick={() => setShowLoadCalc(!showLoadCalc)}
                  title="Load Calculator"
                >
                  <Calculator className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {/* Online users indicator */}
            {!readOnly && cursors.length > 0 && (
              <div className="absolute top-24 left-4 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm">
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

          {/* Sheet Tabs — bottom of canvas */}
          {!readOnly && <SheetTabs />}
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
