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
import { SheetTabs } from "./SheetTabs";
import { DrawingToolbar } from "./DrawingToolbar";
import { PluginHub } from "./PluginHub";

// Tier 1-5
import { LoadCalculator } from "./LoadCalculator";
import { BOMTable } from "./BOMTable";
import { AIAutoLayout } from "./AIAutoLayout";
import { CustomSymbolCreator } from "./CustomSymbolCreator";
import { CableSchedule } from "./CableSchedule";
import { TitleBlockEditor } from "./TitleBlockEditor";
import { ShortCircuitCalc } from "./ShortCircuitCalc";
import { ProtectionCoordination } from "./ProtectionCoordination";
import { CommentOverlay } from "./CommentOverlay";
import { PrintLayout } from "./PrintLayout";
import { DXFExport } from "./DXFExport";
import { VersionDiffView } from "./VersionDiffView";
import { SymbolEditorPro } from "./SymbolEditorPro";
import { TerminalStripDesigner } from "./TerminalStripDesigner";
import { VoltageDropCalc } from "./VoltageDropCalc";
import { LoadFlowAnalysis } from "./LoadFlowAnalysis";
import { EquipmentDatabase } from "./EquipmentDatabase";
import { InspectionChecklist } from "./InspectionChecklist";
import { HyperlinkCrossRef } from "./HyperlinkCrossRef";
import { ProjectTemplateLibrary } from "./ProjectTemplateLibrary";
import { AIDiagramRecognition } from "./AIDiagramRecognition";
// Tier 6
import { PowerFactorCorrection } from "./PowerFactorCorrection";
import { BatterySizingCalc } from "./BatterySizingCalc";
import { CableDeratingCalc } from "./CableDeratingCalc";
import { PanelSchedule } from "./PanelSchedule";
import { ThemePresets } from "./ThemePresets";
import { GridSnapSystem } from "./GridSnapSystem";
import { ImageLayer } from "./ImageLayer";
import { RevisionHistory as DrawingRevisionHistory } from "./DrawingRevisionHistory";
import { MobileTouchDraw } from "./MobileTouchDraw";
import { PDFBatchExport } from "./PDFBatchExport";
// Tier 7
import { ArcFlashAnalysis } from "./ArcFlashAnalysis";
import { HarmonicDistortion } from "./HarmonicDistortion";
import { MotorStartVoltdrop } from "./MotorStartVoltdrop";
import { SolarPVSizing } from "./SolarPVSizing";
import { SCADASimulation } from "./SCADASimulation";
import { AIGenerativeDesign } from "./AIGenerativeDesign";
import { SmartAutoRouting } from "./SmartAutoRouting";
import { BIMExport } from "./BIMExport";
import { LiveCostEstimator } from "./LiveCostEstimator";
import { CollaborationChat } from "./CollaborationChat";
// Tier 8
import { LightningProtection } from "./LightningProtection";
import { GroundGridCalc } from "./GroundGridCalc";
import { IoTMqttBinding } from "./IoTMqttBinding";
import { RelayLogicSimulator } from "./RelayLogicSimulator";
import { GISMapOverlay } from "./GISMapOverlay";
import { CMMSTagging } from "./CMMSTagging";
import { ThermalIRMap } from "./ThermalIRMap";
import { LoadProfileSim } from "./LoadProfileSim";
import { AIGenerativeReport } from "./AIGenerativeReport";
import { WebXRPreview } from "./WebXRPreview";
// Tier 9
import { EVFleetOptimizer } from "./EVFleetOptimizer";
import { BlockchainP2PEnergy } from "./BlockchainP2PEnergy";
import { CyberAttackSim } from "./CyberAttackSim";
import { AIFailurePrediction } from "./AIFailurePrediction";
import { DroneInspectionPath } from "./DroneInspectionPath";
import { ESGCarbonTokenizer } from "./ESGCarbonTokenizer";
import { ExtremeWeatherSim } from "./ExtremeWeatherSim";
import { GenerativeVoiceCommand } from "./GenerativeVoiceCommand";
import { HologramDisplayExport } from "./HologramDisplayExport";
import { AutoGridHealing } from "./AutoGridHealing";
// Tier 10
import { MarsMicrogridDesigner } from "./MarsMicrogridDesigner";
import { QuantumCryptoRouting } from "./QuantumCryptoRouting";
import { DysonSwarmBeam } from "./DysonSwarmBeam";
import { FusionReactorSim } from "./FusionReactorSim";
import { AGIGridGodMode } from "./AGIGridGodMode";
import { SuperconductorLines } from "./SuperconductorLines";
import { SpaceLaunchPulse } from "./SpaceLaunchPulse";
import { MultiverseTimeline } from "./MultiverseTimeline";
import { AntimatterUPS } from "./AntimatterUPS";
import { NeuralinkBCI } from "./NeuralinkBCI";
import { DarkCanvasToggle } from "./DarkCanvasToggle";

import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  FolderOpen, LayoutGrid, Wrench, Plus, X,
  MousePointer2, Cable, Type, Shapes
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

export const EditorWorkspace = ({ projectId, readOnly = false }: { projectId: string; readOnly?: boolean }) => {
  const { initialize, canvas, zoom, panX, panY } = useEditorStore();
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showPluginHub, setShowPluginHub] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [showMobileProps, setShowMobileProps] = useState(false);
  const [showMobileFAB, setShowMobileFAB] = useState(false);
  const [panels, setPanels] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  const toggle = useCallback((key: string) => setPanels(p => ({ ...p, [key]: !p[key] })), []);

  const { save: manualSave } = useAutoSave(readOnly ? null : projectId);
  const { cursors } = useRealtimeCollaboration(readOnly ? null : projectId);
  useEditorShortcuts(readOnly ? "readonly" : projectId, manualSave);

  useEffect(() => {
    if (readOnly) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setShowSearch(prev => !prev); }
      if (e.key === "Escape" && showSearch) setShowSearch(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [readOnly, showSearch]);

  useEffect(() => {
    const loadProject = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('projects').select('diagram_data').eq('id', projectId).single();
      if (data?.diagram_data && typeof data.diagram_data === 'object') {
        const dd = data.diagram_data as any;
        if (dd.objects && Array.isArray(dd.objects)) {
          initialize(projectId, { objects: dd.objects, width: dd.width || 1920, height: dd.height || 1080, background: dd.background || "#ffffff", gridSize: dd.gridSize || 20 });
        } else { initialize(projectId); }
      } else { initialize(projectId); }
      setLoading(false);
    };
    loadProject();
  }, [projectId, initialize]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground font-medium">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-muted">
      {/* Top Toolbar */}
      {!readOnly && <Toolbar projectId={projectId} />}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop: Left Palette */}
        {!readOnly && (
          <div className="hidden md:flex w-60 lg:w-64 flex-none border-r border-border/50 bg-background">
            <Palette />
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {/* Desktop Drawing Toolbar */}
          {!readOnly && !isMobile && (
            <div className="absolute left-3 top-3 z-30">
              <DrawingToolbar />
            </div>
          )}

          <div
            className="flex-1 overflow-hidden relative"
            id="canvas-container"
            style={{ pointerEvents: readOnly ? 'none' : 'auto' }}
          >
            <CanvasArea />
            <ZoomControls />

            {/* Ruler: desktop only */}
            {!readOnly && !isMobile && <RulerOverlay zoom={zoom} panX={panX} panY={panY} />}
            {!readOnly && !isMobile && <CrosshairOverlay />}
            {!readOnly && <VersionHistory projectId={projectId} />}
            {!readOnly && <CursorOverlay cursors={cursors} zoom={zoom} panX={panX} panY={panY} />}

            {/* ALL OVERLAY PANELS (lazy-loaded on toggle) */}
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
            {panels.terminal && <TerminalStripDesigner onClose={() => toggle("terminal")} />}
            {panels.vdrop && <VoltageDropCalc onClose={() => toggle("vdrop")} />}
            {panels.loadFlow && <LoadFlowAnalysis onClose={() => toggle("loadFlow")} />}
            {panels.equipDb && <EquipmentDatabase onClose={() => toggle("equipDb")} />}
            {panels.inspect && <InspectionChecklist onClose={() => toggle("inspect")} />}
            {panels.crossRef && <HyperlinkCrossRef onClose={() => toggle("crossRef")} />}
            {panels.templates && <ProjectTemplateLibrary onClose={() => toggle("templates")} />}
            {panels.aiRecog && <AIDiagramRecognition onClose={() => toggle("aiRecog")} />}
            {panels.pfCorrection && <PowerFactorCorrection onClose={() => toggle("pfCorrection")} />}
            {panels.battery && <BatterySizingCalc onClose={() => toggle("battery")} />}
            {panels.derating && <CableDeratingCalc onClose={() => toggle("derating")} />}
            {panels.panelSch && <PanelSchedule onClose={() => toggle("panelSch")} />}
            {panels.theme && <ThemePresets onClose={() => toggle("theme")} />}
            {panels.gridSnap && <GridSnapSystem onClose={() => toggle("gridSnap")} />}
            {panels.imgLayer && <ImageLayer onClose={() => toggle("imgLayer")} />}
            {panels.revHist && <DrawingRevisionHistory onClose={() => toggle("revHist")} />}
            {panels.touch && <MobileTouchDraw onClose={() => toggle("touch")} />}
            {panels.pdfExport && <PDFBatchExport onClose={() => toggle("pdfExport")} />}
            {panels.arcFlash && <ArcFlashAnalysis onClose={() => toggle("arcFlash")} />}
            {panels.thd && <HarmonicDistortion onClose={() => toggle("thd")} />}
            {panels.motorStart && <MotorStartVoltdrop onClose={() => toggle("motorStart")} />}
            {panels.solar && <SolarPVSizing onClose={() => toggle("solar")} />}
            {panels.scada && <SCADASimulation onClose={() => toggle("scada")} />}
            {panels.aiGen && <AIGenerativeDesign onClose={() => toggle("aiGen")} />}
            {panels.autoRout && <SmartAutoRouting onClose={() => toggle("autoRout")} />}
            {panels.bim && <BIMExport onClose={() => toggle("bim")} />}
            {panels.cost && <LiveCostEstimator onClose={() => toggle("cost")} />}
            {panels.chat && <CollaborationChat onClose={() => toggle("chat")} />}
            {panels.lightning && <LightningProtection onClose={() => toggle("lightning")} />}
            {panels.groundGrid && <GroundGridCalc onClose={() => toggle("groundGrid")} />}
            {panels.mqtt && <IoTMqttBinding onClose={() => toggle("mqtt")} />}
            {panels.relaySim && <RelayLogicSimulator onClose={() => toggle("relaySim")} />}
            {panels.gis && <GISMapOverlay onClose={() => toggle("gis")} />}
            {panels.cmms && <CMMSTagging onClose={() => toggle("cmms")} />}
            {panels.thermal && <ThermalIRMap onClose={() => toggle("thermal")} />}
            {panels.loadProfile && <LoadProfileSim onClose={() => toggle("loadProfile")} />}
            {panels.aiReport && <AIGenerativeReport onClose={() => toggle("aiReport")} />}
            {panels.webXr && <WebXRPreview onClose={() => toggle("webXr")} />}
            {panels.evFleet && <EVFleetOptimizer onClose={() => toggle("evFleet")} />}
            {panels.blockchain && <BlockchainP2PEnergy onClose={() => toggle("blockchain")} />}
            {panels.cyber && <CyberAttackSim onClose={() => toggle("cyber")} />}
            {panels.aiPred && <AIFailurePrediction onClose={() => toggle("aiPred")} />}
            {panels.drone && <DroneInspectionPath onClose={() => toggle("drone")} />}
            {panels.esg && <ESGCarbonTokenizer onClose={() => toggle("esg")} />}
            {panels.weather && <ExtremeWeatherSim onClose={() => toggle("weather")} />}
            {panels.voiceCmd && <GenerativeVoiceCommand onClose={() => toggle("voiceCmd")} />}
            {panels.hologram && <HologramDisplayExport onClose={() => toggle("hologram")} />}
            {panels.healing && <AutoGridHealing onClose={() => toggle("healing")} />}
            {panels.mars && <MarsMicrogridDesigner onClose={() => toggle("mars")} />}
            {panels.quantum && <QuantumCryptoRouting onClose={() => toggle("quantum")} />}
            {panels.dyson && <DysonSwarmBeam onClose={() => toggle("dyson")} />}
            {panels.fusion && <FusionReactorSim onClose={() => toggle("fusion")} />}
            {panels.agi && <AGIGridGodMode onClose={() => toggle("agi")} />}
            {panels.supercond && <SuperconductorLines onClose={() => toggle("supercond")} />}
            {panels.spaceLaunch && <SpaceLaunchPulse onClose={() => toggle("spaceLaunch")} />}
            {panels.multiverse && <MultiverseTimeline onClose={() => toggle("multiverse")} />}
            {panels.antimatter && <AntimatterUPS onClose={() => toggle("antimatter")} />}
            {panels.neuralink && <NeuralinkBCI onClose={() => toggle("neuralink")} />}

            {/* Desktop keyboard shortcuts */}
            {!readOnly && !isMobile && (
              <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/40 flex gap-3">
                <span>R rotate</span><span>H/V flip</span><span>Ctrl+K search</span><span>W wire</span><span>T text</span>
              </div>
            )}

            {/* Plugin Hub Dialog */}
            {!readOnly && (
              <PluginHub
                isOpen={showPluginHub}
                onClose={() => setShowPluginHub(false)}
                onSelect={(id) => toggle(id)}
              />
            )}

            {/* Desktop: FAB for Plugins */}
            {!readOnly && !isMobile && (
              <div className="absolute bottom-6 right-6 z-10">
                <Button
                  onClick={() => setShowPluginHub(true)}
                  size="lg"
                  className="rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-5 h-12"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm font-semibold">Plugins</span>
                  <span className="ml-1 bg-primary-foreground/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">99</span>
                </Button>
              </div>
            )}

            {/* ===== MOBILE BOTTOM BAR ===== */}
            {!readOnly && isMobile && (
              <div className="absolute bottom-0 left-0 right-0 z-40">
                {/* Mobile quick-tools bar */}
                <div className="absolute bottom-4 left-3 flex gap-1.5 bg-background/90 backdrop-blur-md border rounded-full px-1.5 py-1 shadow-lg">
                  <MobileToolBtn icon={MousePointer2} label="Select" active={useEditorStore.getState().activeTool === 'select'} onClick={() => useEditorStore.getState().setActiveTool('select')} />
                  <MobileToolBtn icon={Cable} label="Wire" active={useEditorStore.getState().activeTool === 'wire'} onClick={() => useEditorStore.getState().setActiveTool('wire')} />
                  <MobileToolBtn icon={Type} label="Text" active={useEditorStore.getState().activeTool === 'text'} onClick={() => useEditorStore.getState().setActiveTool('text')} />
                  <MobileToolBtn icon={Shapes} label="Shape" active={useEditorStore.getState().activeTool === 'shape'} onClick={() => useEditorStore.getState().setActiveTool('shape')} />
                </div>

                {/* FAB menu (expandable) */}
                {showMobileFAB && (
                  <div className="absolute bottom-16 right-3 flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-200">
                    <MobileFABItem
                      icon={FolderOpen}
                      label="Library"
                      onClick={() => { setShowMobilePalette(true); setShowMobileFAB(false); }}
                    />
                    <MobileFABItem
                      icon={LayoutGrid}
                      label="Plugins"
                      onClick={() => { setShowPluginHub(true); setShowMobileFAB(false); }}
                    />
                    <MobileFABItem
                      icon={Wrench}
                      label="Properties"
                      onClick={() => { setShowMobileProps(true); setShowMobileFAB(false); }}
                    />
                  </div>
                )}

                {/* Floating Action Button */}
                <div className="absolute bottom-4 right-3">
                  <Button
                    onClick={() => setShowMobileFAB(!showMobileFAB)}
                    size="icon"
                    className="w-12 h-12 rounded-full shadow-xl bg-primary text-primary-foreground"
                  >
                    {showMobileFAB ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            )}

            {/* Online users badge */}
            {!readOnly && cursors.length > 0 && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border shadow-sm">
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
                <span className="text-[10px] text-muted-foreground ml-1">{cursors.length} online</span>
              </div>
            )}
          </div>

          {/* Sheet tabs: desktop only */}
          {!readOnly && !isMobile && <SheetTabs />}
        </div>

        {/* Desktop: Right Properties Panel */}
        {!readOnly && (
          <div className="hidden lg:flex w-60 xl:w-64 flex-none border-l border-border/50 bg-background">
            <PropertiesPanel />
          </div>
        )}
      </div>

      {/* ===== MOBILE DRAWERS ===== */}
      <Sheet open={showMobilePalette} onOpenChange={setShowMobilePalette}>
        <SheetContent side="left" className="w-[88vw] sm:w-[380px] p-0 border-r">
          <div className="h-full flex flex-col pt-6">
            <Palette onClose={() => setShowMobilePalette(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showMobileProps} onOpenChange={setShowMobileProps}>
        <SheetContent side="right" className="w-[88vw] sm:w-[380px] p-0 border-l">
          <div className="h-full flex flex-col pt-6">
            <PropertiesPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Mobile FAB menu item
function MobileFABItem({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 bg-background border shadow-lg rounded-full pl-4 pr-5 py-2.5 hover:bg-muted transition-colors"
    >
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

// Mobile quick-tool button
function MobileToolBtn({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-11 h-11 rounded-full transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-muted"
      }`}
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] mt-0.5 font-medium leading-none">{label}</span>
    </button>
  );
}
