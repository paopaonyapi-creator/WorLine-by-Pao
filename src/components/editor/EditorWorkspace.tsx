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
// Tier 4
import { ShortCircuitCalc } from "./ShortCircuitCalc";
import { ProtectionCoordination } from "./ProtectionCoordination";
import { CommentOverlay } from "./CommentOverlay";
import { PrintLayout } from "./PrintLayout";
import { DXFExport } from "./DXFExport";
import { VersionDiffView } from "./VersionDiffView";
import { SymbolEditorPro } from "./SymbolEditorPro";
import { DarkCanvasToggle } from "./DarkCanvasToggle";
// Tier 5
import { TerminalStripDesigner } from "./TerminalStripDesigner";
import { VoltageDropCalc } from "./VoltageDropCalc";
import { LoadFlowAnalysis } from "./LoadFlowAnalysis";
import { EquipmentDatabase } from "./EquipmentDatabase";
import { InspectionChecklist } from "./InspectionChecklist";
import { HyperlinkCrossRef } from "./HyperlinkCrossRef";
import { ProjectTemplateLibrary } from "./ProjectTemplateLibrary";
import { AIDiagramRecognition } from "./AIDiagramRecognition";

import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { createClient } from "@/lib/supabase/client";
import {
  Calculator, FileSpreadsheet, Sparkles, Paintbrush,
  Cable, FileText, Zap, Shield, MessageSquare,
  Printer, FileDown, GitCompare, PenTool,
  CircuitBoard, TrendingDown, Activity, Database,
  ClipboardCheck, Link2, FolderOpen, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditorWorkspace = ({ projectId, readOnly = false }: { projectId: string; readOnly?: boolean }) => {
  const { initialize, canvas, zoom, panX, panY } = useEditorStore();
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  // Tool panels
  const [panels, setPanels] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setPanels(p => ({ ...p, [key]: !p[key] }));

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

  const Btn = ({ icon: Icon, title, id }: { icon: any; title: string; id: string }) => (
    <Button
      variant={panels[id] ? "secondary" : "ghost"}
      size="icon"
      className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm"
      onClick={() => toggle(id)}
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

            {/* All overlay panels */}
            {showSearch && <SymbolSearch onClose={() => setShowSearch(false)} />}
            {panels.loadCalc && <LoadCalculator onClose={() => toggle("loadCalc")} />}
            {panels.bom && <BOMTable onClose={() => toggle("bom")} />}
            {panels.aiLayout && <AIAutoLayout onClose={() => toggle("aiLayout")} />}
            {panels.symCreator && <CustomSymbolCreator onClose={() => toggle("symCreator")} />}
            {panels.cable && <CableSchedule onClose={() => toggle("cable")} />}
            {panels.titleBlock && <TitleBlockEditor onClose={() => toggle("titleBlock")} onApply={() => {}} />}
            {panels.shortCircuit && <ShortCircuitCalc onClose={() => toggle("shortCircuit")} />}
            {panels.protection && <ProtectionCoordination onClose={() => toggle("protection")} />}
            {panels.comments && <CommentOverlay onClose={() => toggle("comments")} />}
            {panels.print && <PrintLayout onClose={() => toggle("print")} />}
            {panels.dxf && <DXFExport onClose={() => toggle("dxf")} />}
            {panels.diff && <VersionDiffView onClose={() => toggle("diff")} />}
            {panels.symEditor && <SymbolEditorPro onClose={() => toggle("symEditor")} />}
            {/* Tier 5 */}
            {panels.terminal && <TerminalStripDesigner onClose={() => toggle("terminal")} />}
            {panels.vdrop && <VoltageDropCalc onClose={() => toggle("vdrop")} />}
            {panels.loadFlow && <LoadFlowAnalysis onClose={() => toggle("loadFlow")} />}
            {panels.equipDb && <EquipmentDatabase onClose={() => toggle("equipDb")} />}
            {panels.inspect && <InspectionChecklist onClose={() => toggle("inspect")} />}
            {panels.crossRef && <HyperlinkCrossRef onClose={() => toggle("crossRef")} />}
            {panels.templates && <ProjectTemplateLibrary onClose={() => toggle("templates")} />}
            {panels.aiRecog && <AIDiagramRecognition onClose={() => toggle("aiRecog")} />}

            {/* Shortcut hints */}
            {!readOnly && (
              <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
                <span>R rotate</span><span>H/V flip</span><span>Ctrl+K search</span><span>W wire</span><span>T text</span>
              </div>
            )}

            {/* Action buttons — 3 rows */}
            {!readOnly && (
              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1 items-end">
                {/* Row 1: Tier 5 - SCADA */}
                <div className="flex gap-1">
                  <Btn icon={Brain} title="AI Diagram Recognition" id="aiRecog" />
                  <Btn icon={FolderOpen} title="Templates" id="templates" />
                  <Btn icon={Link2} title="Cross-Reference" id="crossRef" />
                  <Btn icon={ClipboardCheck} title="Inspection" id="inspect" />
                  <Btn icon={Database} title="Equipment DB" id="equipDb" />
                </div>
                {/* Row 2: Tier 5 + 4 - Analysis */}
                <div className="flex gap-1">
                  <Btn icon={CircuitBoard} title="Terminal Strips" id="terminal" />
                  <Btn icon={TrendingDown} title="Voltage Drop" id="vdrop" />
                  <Btn icon={Activity} title="Load Flow" id="loadFlow" />
                  <Btn icon={Zap} title="Short Circuit" id="shortCircuit" />
                  <Btn icon={Shield} title="Protection TCC" id="protection" />
                  <Btn icon={MessageSquare} title="Comments" id="comments" />
                </div>
                {/* Row 3: Core tools */}
                <div className="flex gap-1">
                  <DarkCanvasToggle />
                  <Btn icon={PenTool} title="Symbol Editor" id="symEditor" />
                  <Btn icon={GitCompare} title="Version Diff" id="diff" />
                  <Btn icon={Printer} title="Print Layout" id="print" />
                  <Btn icon={FileDown} title="DXF Export" id="dxf" />
                  <Btn icon={FileText} title="Title Block" id="titleBlock" />
                  <Btn icon={Cable} title="Cable Schedule" id="cable" />
                  <Btn icon={Paintbrush} title="Custom Symbol" id="symCreator" />
                  <Btn icon={Sparkles} title="AI Layout" id="aiLayout" />
                  <Btn icon={FileSpreadsheet} title="BOM" id="bom" />
                  <Btn icon={Calculator} title="Load Calc" id="loadCalc" />
                </div>
              </div>
            )}

            {/* Online users */}
            {!readOnly && cursors.length > 0 && (
              <div className="absolute top-24 left-4 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm">
                <div className="flex -space-x-1">
                  {cursors.slice(0, 3).map((c) => (
                    <div key={c.userId} className="w-5 h-5 rounded-full border-2 border-background flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: c.color }} title={c.name}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground ml-1">{cursors.length} online</span>
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
