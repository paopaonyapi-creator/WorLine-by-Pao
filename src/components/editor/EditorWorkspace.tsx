"use client";

import { useEffect, useState } from "react";
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
// Sprint 11 — Tier 4
import { ShortCircuitCalc } from "./ShortCircuitCalc";
import { ProtectionCoordination } from "./ProtectionCoordination";
import { CommentOverlay } from "./CommentOverlay";
import { PrintLayout } from "./PrintLayout";
import { DXFExport } from "./DXFExport";
import { VersionDiffView } from "./VersionDiffView";
import { SymbolEditorPro } from "./SymbolEditorPro";
import { DarkCanvasToggle } from "./DarkCanvasToggle";
import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { createClient } from "@/lib/supabase/client";
import {
  Calculator, FileSpreadsheet, Sparkles, Paintbrush,
  Cable, FileText, Zap, Shield, MessageSquare,
  Printer, FileDown, GitCompare, PenTool,
} from "lucide-react";
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
  // Tier 4
  const [showShortCircuit, setShowShortCircuit] = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPrintLayout, setShowPrintLayout] = useState(false);
  const [showDXF, setShowDXF] = useState(false);
  const [showVersionDiff, setShowVersionDiff] = useState(false);
  const [showSymbolEditor, setShowSymbolEditor] = useState(false);

  const { save: manualSave } = useAutoSave(readOnly ? null : projectId);
  const { cursors } = useRealtimeCollaboration(readOnly ? null : projectId);
  useEditorShortcuts(readOnly ? "readonly" : projectId, manualSave);

  useEffect(() => {
    if (readOnly) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === "Escape" && showSearch) setShowSearch(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [readOnly, showSearch]);

  useEffect(() => {
    const loadProject = async () => {
      const supabase = createClient();
      const { data } = await supabase
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

  const ActionBtn = ({ icon: Icon, title, active, onClick }: { icon: any; title: string; active?: boolean; onClick: () => void }) => (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
      onClick={onClick}
      title={title}
    >
      <Icon className="h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-muted">
      {!readOnly && <Toolbar projectId={projectId} />}
      <div className="flex flex-1 overflow-hidden relative">
        {!readOnly && (
          <div className="hidden md:flex w-64 flex-none border-r border-border/50">
            <Palette />
          </div>
        )}
        {!readOnly && (
          <div className="hidden md:flex flex-none">
            <DrawingToolbar />
          </div>
        )}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <div className="flex-1 overflow-hidden relative" id="canvas-container" style={{ pointerEvents: readOnly ? 'none' : 'auto' }}>
            <CanvasArea />
            <ZoomControls />

            {!readOnly && <RulerOverlay zoom={zoom} panX={panX} panY={panY} />}
            {!readOnly && <CrosshairOverlay />}
            {!readOnly && <VersionHistory projectId={projectId} />}
            {!readOnly && <CursorOverlay cursors={cursors} zoom={zoom} panX={panX} panY={panY} />}

            {/* Overlays */}
            {showSearch && <SymbolSearch onClose={() => setShowSearch(false)} />}
            {showLoadCalc && <LoadCalculator onClose={() => setShowLoadCalc(false)} />}
            {showBOM && <BOMTable onClose={() => setShowBOM(false)} />}
            {showAILayout && <AIAutoLayout onClose={() => setShowAILayout(false)} />}
            {showSymbolCreator && <CustomSymbolCreator onClose={() => setShowSymbolCreator(false)} />}
            {showCableSchedule && <CableSchedule onClose={() => setShowCableSchedule(false)} />}
            {showTitleBlock && <TitleBlockEditor onClose={() => setShowTitleBlock(false)} onApply={() => {}} />}
            {/* Tier 4 overlays */}
            {showShortCircuit && <ShortCircuitCalc onClose={() => setShowShortCircuit(false)} />}
            {showProtection && <ProtectionCoordination onClose={() => setShowProtection(false)} />}
            {showComments && <CommentOverlay onClose={() => setShowComments(false)} />}
            {showPrintLayout && <PrintLayout onClose={() => setShowPrintLayout(false)} />}
            {showDXF && <DXFExport onClose={() => setShowDXF(false)} />}
            {showVersionDiff && <VersionDiffView onClose={() => setShowVersionDiff(false)} />}
            {showSymbolEditor && <SymbolEditorPro onClose={() => setShowSymbolEditor(false)} />}

            {/* Shortcut hints */}
            {!readOnly && (
              <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
                <span>R rotate</span>
                <span>H/V flip</span>
                <span>Ctrl+K search</span>
                <span>W wire</span>
                <span>T text</span>
                <span>F freehand</span>
              </div>
            )}

            {/* Bottom-right action buttons — 2 rows */}
            {!readOnly && (
              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5 items-end">
                {/* Row 1: Engineering */}
                <div className="flex gap-1">
                  <DarkCanvasToggle />
                  <ActionBtn icon={PenTool} title="Symbol Editor Pro" active={showSymbolEditor} onClick={() => setShowSymbolEditor(!showSymbolEditor)} />
                  <ActionBtn icon={GitCompare} title="Version Diff" active={showVersionDiff} onClick={() => setShowVersionDiff(!showVersionDiff)} />
                  <ActionBtn icon={MessageSquare} title="Comments" active={showComments} onClick={() => setShowComments(!showComments)} />
                  <ActionBtn icon={Printer} title="Print Layout" active={showPrintLayout} onClick={() => setShowPrintLayout(!showPrintLayout)} />
                  <ActionBtn icon={FileDown} title="DXF Export" active={showDXF} onClick={() => setShowDXF(!showDXF)} />
                </div>
                {/* Row 2: Analysis */}
                <div className="flex gap-1">
                  <ActionBtn icon={Zap} title="Short Circuit Calc" active={showShortCircuit} onClick={() => setShowShortCircuit(!showShortCircuit)} />
                  <ActionBtn icon={Shield} title="Protection Coordination" active={showProtection} onClick={() => setShowProtection(!showProtection)} />
                  <ActionBtn icon={FileText} title="Title Block" active={showTitleBlock} onClick={() => setShowTitleBlock(!showTitleBlock)} />
                  <ActionBtn icon={Cable} title="Cable Schedule" active={showCableSchedule} onClick={() => setShowCableSchedule(!showCableSchedule)} />
                  <ActionBtn icon={Paintbrush} title="Custom Symbol" active={showSymbolCreator} onClick={() => setShowSymbolCreator(!showSymbolCreator)} />
                  <ActionBtn icon={Sparkles} title="AI Layout" active={showAILayout} onClick={() => setShowAILayout(!showAILayout)} />
                  <ActionBtn icon={FileSpreadsheet} title="BOM" active={showBOM} onClick={() => setShowBOM(!showBOM)} />
                  <ActionBtn icon={Calculator} title="Load Calc" active={showLoadCalc} onClick={() => setShowLoadCalc(!showLoadCalc)} />
                </div>
              </div>
            )}

            {/* Online users */}
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
