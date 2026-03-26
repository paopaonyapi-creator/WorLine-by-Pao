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
        {!readOnly && <div className="hidden md:flex flex-none"><DrawingToolbar /></div>}
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
              <div className="absolute bottom-4 left-4 z-10 text-[10px] text-muted-foreground/50 hidden lg:flex gap-3">
                <span>R rotate</span><span>H/V flip</span><span>Ctrl+K search</span><span>W wire</span><span>T text</span>
              </div>
            )}

            {/* === ACTION BUTTONS — 8 rows === */}
            {!readOnly && (
              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1 items-end">
                {/* Row 0000: Tier 10 — The Singularity */}
                <div className="flex gap-1">
                  <Btn icon={Earth} title="Mars Microgrid" id="mars" />
                  <Btn icon={Lock} title="Quantum Crypto QKD" id="quantum" />
                  <Btn icon={Satellite} title="Dyson Swarm Beam" id="dyson" />
                  <Btn icon={Atom} title="Fusion Reactor Sim" id="fusion" />
                  <Btn icon={Cpu} title="AGI Grid God-Mode" id="agi" />
                  <Btn icon={Snowflake} title="Superconductor 0% Drop" id="supercond" />
                  <Btn icon={Rocket} title="Space Launch Pulse" id="spaceLaunch" />
                  <Btn icon={Layers} title="Multiverse Timeline" id="multiverse" />
                  <Btn icon={BatteryWarning} title="Antimatter UPS" id="antimatter" />
                  <Btn icon={Brain} title="Neuralink BCI" id="neuralink" />
                </div>
                {/* Row 000: Tier 9 — Cyber-Physical / Cosmic Grid */}
                <div className="flex gap-1">
                  <Btn icon={CarFront} title="EV Fleet V2G Optimizer" id="evFleet" />
                  <Btn icon={Bitcoin} title="Blockchain P2P Trade" id="blockchain" />
                  <Btn icon={Skull} title="SCADA Cyber Attack" id="cyber" />
                  <Btn icon={BrainCircuit} title="AI Failure Predict" id="aiPred" />
                  <Btn icon={PlaneTakeoff} title="Drone Fleet Path" id="drone" />
                  <Btn icon={Leaf} title="ESG Carbon Token" id="esg" />
                  <Btn icon={CloudRainWind} title="Weather Hazard Sim" id="weather" />
                  <Btn icon={Mic} title="AI Voice Command" id="voiceCmd" />
                  <Btn icon={Cuboid} title="3D Hologram Export" id="hologram" />
                  <Btn icon={PowerOff} title="Grid Self-Healing" id="healing" />
                </div>
                {/* Row 00: Tier 8 — Digital Twin Omniverse */}
                <div className="flex gap-1">
                  <Btn icon={CloudLightning} title="Lightning Protect." id="lightning" />
                  <Btn icon={Network} title="Earth Grid Calc" id="groundGrid" />
                  <Btn icon={Wifi} title="IoT MQTT Sensor" id="mqtt" />
                  <Btn icon={Cpu} title="Relay Logic Sim" id="relaySim" />
                  <Btn icon={MapIcon} title="GIS Map Overlay" id="gis" />
                  <Btn icon={Wrench} title="CMMS Maintenance" id="cmms" />
                  <Btn icon={Thermometer} title="Thermal IR Heatmap" id="thermal" />
                  <Btn icon={TrendingDown} title="Peak Shaving Sim" id="loadProfile" />
                  <Btn icon={FileText} title="AI Gen Report" id="aiReport" />
                  <Btn icon={Glasses} title="WebXR 3D Preview" id="webXr" />
                </div>
                {/* Row 0: Tier 7 — God Mode */}
                <div className="flex gap-1">
                  <Btn icon={Flame} title="Arc Flash Analysis" id="arcFlash" />
                  <Btn icon={ActivitySquare} title="Harmonic THD%" id="thd" />
                  <Btn icon={TrendingDown} title="Motor Start Dip" id="motorStart" />
                  <Btn icon={Sun} title="Solar PV Sizing" id="solar" />
                  <Btn icon={CircleDollarSign} title="Cost Estimator" id="cost" />
                  <Btn icon={Bot} title="AI Generative Design" id="aiGen" />
                  <Btn icon={Route} title="Smart Auto-Routing" id="autoRout" />
                  <Btn icon={Box} title="BIM / IFC Export" id="bim" />
                  <Btn icon={Play} title="SCADA Sim" id="scada" />
                  <Btn icon={Users} title="Team Chat" id="chat" />
                </div>
                {/* Row 1: Tier 6 — Ultimate */}
                <div className="flex gap-1">
                  <Btn icon={Gauge} title="PF Correction" id="pfCorrection" />
                  <Btn icon={Battery} title="Battery Sizing" id="battery" />
                  <Btn icon={Thermometer} title="Cable Derating" id="derating" />
                  <Btn icon={LayoutGrid} title="Panel Schedule" id="panelSch" />
                  <Btn icon={PaletteIcon} title="Theme Presets" id="theme" />
                  <Btn icon={FileOutput} title="PDF Export" id="pdfExport" />
                </div>
                {/* Row 2: Tier 6 — Utility */}
                <div className="flex gap-1">
                  <Btn icon={Grid3x3} title="Grid & Snap" id="gridSnap" />
                  <Btn icon={Image} title="Image Layer" id="imgLayer" />
                  <Btn icon={History} title="Revision History" id="revHist" />
                  <Btn icon={Smartphone} title="Touch Controls" id="touch" />
                  <Btn icon={Brain} title="AI Recognition" id="aiRecog" />
                  <Btn icon={FolderOpen} title="Templates" id="templates" />
                </div>
                {/* Row 3: Tier 5 — SCADA */}
                <div className="flex gap-1">
                  <Btn icon={Link2} title="Cross-Reference" id="crossRef" />
                  <Btn icon={ClipboardCheck} title="Inspection" id="inspect" />
                  <Btn icon={Database} title="Equipment DB" id="equipDb" />
                  <Btn icon={CircuitBoard} title="Terminal Strips" id="terminal" />
                  <Btn icon={TrendingDown} title="Voltage Drop" id="vdrop" />
                  <Btn icon={Activity} title="Load Flow" id="loadFlow" />
                </div>
                {/* Row 4: Core tools */}
                <div className="flex gap-1">
                  <DarkCanvasToggle />
                  <Btn icon={Zap} title="Short Circuit" id="shortCircuit" />
                  <Btn icon={Shield} title="Protection TCC" id="protection" />
                  <Btn icon={MessageSquare} title="Comments" id="comments" />
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
        {!readOnly && <div className="hidden lg:flex w-64 flex-none border-l border-border/50"><PropertiesPanel /></div>}
      </div>
    </div>
  );
};
