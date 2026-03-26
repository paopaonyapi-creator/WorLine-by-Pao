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
import { ShortCircuitCalc } from "./ShortCircuitCalc";
import { ProtectionCoordination } from "./ProtectionCoordination";
import { CommentOverlay } from "./CommentOverlay";
import { PrintLayout } from "./PrintLayout";
import { DXFExport } from "./DXFExport";
import { VersionDiffView } from "./VersionDiffView";
import { SymbolEditorPro } from "./SymbolEditorPro";
import { DarkCanvasToggle } from "./DarkCanvasToggle";
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
import { PluginHub } from "./PluginHub";

import { useEditorStore } from "@/store/editorStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Calculator, FileSpreadsheet, Sparkles, Paintbrush,
  Cable, FileText, Zap, Shield, MessageSquare,
  Printer, FileDown, GitCompare, PenTool,
  CircuitBoard, TrendingDown, Activity, Database,
  ClipboardCheck, Link2, FolderOpen, Brain,
  Gauge, Battery, Thermometer, LayoutGrid, Palette as PaletteIcon,
  Grid3x3, Image, History, Smartphone, FileOutput,
  Flame, ActivitySquare, Sun, Play, Bot, Route, Box, CircleDollarSign, Users,
  CloudLightning, Network, Wifi, Cpu, Map as MapIcon, Wrench, Glasses,
  CarFront, Bitcoin, Skull, BrainCircuit, PlaneTakeoff, Leaf, CloudRainWind, Mic, Cuboid, PowerOff,
  Earth, Lock, Satellite, Atom, Snowflake, Rocket, Layers, BatteryWarning
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditorWorkspace = ({ projectId, readOnly = false }: { projectId: string; readOnly?: boolean }) => {
  const { initialize, canvas, zoom, panX, panY } = useEditorStore();
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showPluginHub, setShowPluginHub] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [showMobileProps, setShowMobileProps] = useState(false);
  const [panels, setPanels] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setPanels(p => ({ ...p, [key]: !p[key] }));

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
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading editor...</span>
        </div>
      </div>
    );
  }

  const Btn = ({ icon: Icon, title, id }: { icon: any; title: string; id: string }) => (
    <Button variant={panels[id] ? "secondary" : "ghost"} size="icon" className="w-7 h-7 bg-background/80 backdrop-blur-sm border shadow-sm" onClick={() => toggle(id)} title={title}>
      <Icon className="h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-muted">
      {!readOnly && <Toolbar projectId={projectId} />}
      <div className="flex flex-1 overflow-hidden relative">
        {!readOnly && <div className="hidden md:flex w-64 flex-none border-r border-border/50"><Palette /></div>}
        {/* Mobile-friendly Floating Toolbar */}
        {!readOnly && (
          <div className="absolute left-0 top-16 md:relative md:top-0 md:left-0 flex-none z-40">
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

            {/* === ALL OVERLAY PANELS === */}
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
            {/* Tier 6 */}
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
            {/* Tier 7 */}
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
            {/* Tier 8 */}
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
            {/* Tier 9 */}
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
            {/* Tier 10 */}
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

            {/* Shortcuts */}
            {!readOnly && (
              <div className="absolute bottom-20 lg:bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden md:flex gap-3">
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

            {/* Floating Action Button for Desktop */}
            {!readOnly && (
              <div className="absolute bottom-6 right-6 z-10 hidden lg:block">
                <Button 
                  onClick={() => setShowPluginHub(true)} 
                  size="lg" 
                  className="rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 h-14"
                >
                  <LayoutGrid className="w-5 h-5" />
                  <span className="font-bold">App Store & Plugins</span>
                  <div className="ml-2 bg-indigo-800 text-indigo-100 text-[10px] px-2 py-0.5 rounded-full font-mono">99</div>
                </Button>
              </div>
            )}

            {/* Mobile Bottom Navigation */}
            {!readOnly && (
              <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-1 px-2 flex justify-around items-center z-40 pb-safe">
                <Button variant="ghost" className="flex-1 flex flex-col items-center justify-center gap-1 h-14 text-muted-foreground hover:bg-muted/50" onClick={() => setShowMobilePalette(true)}>
                  <FolderOpen className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-none mt-1">Library</span>
                </Button>
                <Button variant="ghost" className="flex-1 flex flex-col items-center justify-center gap-1 h-14 text-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10" onClick={() => setShowPluginHub(true)}>
                  <LayoutGrid className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-none mt-1">Plugins</span>
                </Button>
                <Button variant="ghost" className="flex-1 flex flex-col items-center justify-center gap-1 h-14 text-muted-foreground hover:bg-muted/50" onClick={() => setShowMobileProps(true)}>
                  <Wrench className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-none mt-1">Props</span>
                </Button>
              </div>
            )}

            {/* Mobile Drawers (Sheets) */}
            <Sheet open={showMobilePalette} onOpenChange={setShowMobilePalette}>
              <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0 border-r">
                <div className="h-full flex flex-col pt-8"><Palette onClose={() => setShowMobilePalette(false)} /></div>
              </SheetContent>
            </Sheet>

            <Sheet open={showMobileProps} onOpenChange={setShowMobileProps}>
              <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0 border-l">
                <div className="h-full flex flex-col pt-8"><PropertiesPanel /></div>
              </SheetContent>
            </Sheet>

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
        {!readOnly && <div className="hidden lg:flex w-64 flex-none border-l border-border/50"><PropertiesPanel /></div>}
      </div>
    </div>
  );
};
