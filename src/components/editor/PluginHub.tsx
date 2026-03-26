"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator, FileSpreadsheet, Sparkles, Paintbrush, Cable, FileText, Zap, Shield, MessageSquare,
  Printer, FileDown, GitCompare, PenTool, CircuitBoard, TrendingDown, Activity, Database,
  ClipboardCheck, Link2, FolderOpen, Brain, Gauge, Battery, Thermometer, LayoutGrid, PaletteIcon,
  Grid3x3, Image, History, Smartphone, FileOutput, Flame, ActivitySquare, Sun, Play, Bot, Route, Box, CircleDollarSign, Users,
  CloudLightning, Network, Wifi, Cpu, MapIcon, Wrench, Glasses, CarFront, Bitcoin, Skull, BrainCircuit, PlaneTakeoff, Leaf, CloudRainWind, Mic, Cuboid, PowerOff,
  Earth, Lock, Satellite, Atom, Snowflake, Rocket, Layers, BatteryWarning
} from "lucide-react";

type PluginHubProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export const PluginHub = ({ isOpen, onClose, onSelect }: PluginHubProps) => {
  const PluginItem = ({ icon: Icon, title, id, desc }: { icon: any; title: string; id: string; desc: string }) => (
    <button
      onClick={() => { onSelect(id); onClose(); }}
      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground text-left transition-colors w-full group"
    >
      <div className="p-2 bg-primary/10 text-primary rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{desc}</div>
      </div>
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[800px] w-[95vw] max-h-[90vh] p-0 flex flex-col gap-0 rounded-xl overflow-hidden">
        <DialogHeader className="p-4 border-b bg-muted/50">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <LayoutGrid className="w-5 h-5 text-primary" />
            WorLine App Store & Plugins
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="core" className="flex-1 flex flex-col overflow-hidden">
          <div className="w-full overflow-x-auto border-b hide-scrollbar">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0 px-2">
              <TabsTrigger value="core" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">⚡ Core</TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">🤖 AI</TabsTrigger>
              <TabsTrigger value="sim" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">🔮 Sim</TabsTrigger>
              <TabsTrigger value="industrial" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">🏭 SCADA</TabsTrigger>
              <TabsTrigger value="future" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">🌌 Sci-Fi</TabsTrigger>
              <TabsTrigger value="util" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">🛠️ Utils</TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1 bg-muted/20 p-4">
            <TabsContent value="core" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Zap} title="Short Circuit" id="shortCircuit" desc="IEC 60909 fault calculation" />
              <PluginItem icon={Shield} title="Protection TCC" id="protection" desc="Time-Current Curve coordination" />
              <PluginItem icon={TrendingDown} title="Voltage Drop" id="vdrop" desc="Cable size & drop analysis" />
              <PluginItem icon={Activity} title="Load Flow" id="loadFlow" desc="Newton-Raphson load flow" />
              <PluginItem icon={Calculator} title="Load Calc" id="loadCalc" desc="Demand factor & sizing" />
              <PluginItem icon={Cable} title="Cable Schedule" id="cable" desc="Auto-generate wire lengths" />
              <PluginItem icon={Gauge} title="PF Correction" id="pfCorrection" desc="Capacitor bank sizing" />
              <PluginItem icon={Battery} title="Battery Sizing" id="battery" desc="DC UPS backup calculation" />
              <PluginItem icon={Thermometer} title="Cable Derating" id="derating" desc="IEC thermal correction" />
              <PluginItem icon={LayoutGrid} title="Panel Schedule" id="panelSch" desc="Switchboard load balancing" />
            </TabsContent>

            <TabsContent value="ai" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Cpu} title="AGI Grid God-Mode" id="agi" desc="Autonomous city generation" />
              <PluginItem icon={Bot} title="AI Gen Design" id="aiGen" desc="Generate SLD from text" />
              <PluginItem icon={Brain} title="AI Recognition" id="aiRecog" desc="Image to SLD conversion" />
              <PluginItem icon={Sparkles} title="AI Auto Layout" id="aiLayout" desc="Beautify scattered nodes" />
              <PluginItem icon={BrainCircuit} title="Failure Predict" id="aiPred" desc="Predictive transformer ML" />
              <PluginItem icon={Mic} title="Voice Command" id="voiceCmd" desc="Draw using voice prompts" />
              <PluginItem icon={FileText} title="AI Report" id="aiReport" desc="Generate technical specs" />
              <PluginItem icon={Route} title="Smart Routing" id="autoRout" desc="Auto-route overlapping wires" />
            </TabsContent>

            <TabsContent value="sim" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Flame} title="Arc Flash" id="arcFlash" desc="IEEE 1584 hazard analysis" />
              <PluginItem icon={ActivitySquare} title="Harmonic THD%" id="thd" desc="Non-linear load simulation" />
              <PluginItem icon={TrendingDown} title="Motor Start Dip" id="motorStart" desc="Large induction motor starts" />
              <PluginItem icon={Sun} title="Solar PV" id="solar" desc="Yield & inverter sizing" />
              <PluginItem icon={CloudRainWind} title="Weather Hazard" id="weather" desc="Typhoon & flood simulation" />
              <PluginItem icon={PowerOff} title="Self-Healing" id="healing" desc="Auto-restore Blackout" />
              <PluginItem icon={CloudLightning} title="Lightning Protect" id="lightning" desc="Rolling sphere method" />
              <PluginItem icon={Network} title="Earth Grid" id="groundGrid" desc="IEEE 80 step/touch calc" />
              <PluginItem icon={TrendingDown} title="Peak Shaving" id="loadProfile" desc="Demand response smoothing" />
            </TabsContent>

            <TabsContent value="industrial" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Play} title="SCADA Sim" id="scada" desc="Real-time breaker toggles" />
              <PluginItem icon={Cpu} title="Relay Logic" id="relaySim" desc="ANSI code ladder logic" />
              <PluginItem icon={Wifi} title="IoT MQTT" id="mqtt" desc="Live sensor data binding" />
              <PluginItem icon={Database} title="Equipment DB" id="equipDb" desc="Manufacturer catalogs" />
              <PluginItem icon={Wrench} title="CMMS Tagging" id="cmms" desc="Maintenance schedules" />
              <PluginItem icon={Thermometer} title="Thermal IR" id="thermal" desc="Live heatmap simulation" />
              <PluginItem icon={CircuitBoard} title="Terminal Strips" id="terminal" desc="Control wire generation" />
              <PluginItem icon={Skull} title="Cyber Attack" id="cyber" desc="Pen-test SCADA networks" />
              <PluginItem icon={PlaneTakeoff} title="Drone Fleet" id="drone" desc="Auto-gen inspection paths" />
            </TabsContent>

            <TabsContent value="future" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Earth} title="Mars Microgrid" id="mars" desc="Off-world base utility tech" />
              <PluginItem icon={Lock} title="Quantum QKD" id="quantum" desc="Quantum-safe encryptions" />
              <PluginItem icon={Satellite} title="Dyson Beam" id="dyson" desc="Orbital solar laser arrays" />
              <PluginItem icon={Atom} title="Fusion Tokamak" id="fusion" desc="Plasma ignition parameters" />
              <PluginItem icon={Snowflake} title="Superconductor" id="supercond" desc="0% Voltage Drop cryogenics" />
              <PluginItem icon={Rocket} title="Space Launch" id="spaceLaunch" desc="Electromagnetic pulse calc" />
              <PluginItem icon={Layers} title="Multiverse" id="multiverse" desc="1024 alternate future grids" />
              <PluginItem icon={BatteryWarning} title="Antimatter UPS" id="antimatter" desc="Planetary emergency backup" />
              <PluginItem icon={Brain} title="Neuralink BCI" id="neuralink" desc="Brain-wave direct control" />
              <PluginItem icon={Cuboid} title="3D Hologram" id="hologram" desc="Volumetric 3D export" />
              <PluginItem icon={Glasses} title="WebXR Preview" id="webXr" desc="Augmented Reality scale" />
              <PluginItem icon={CarFront} title="EV Fleet V2G" id="evFleet" desc="Bidirectional charging" />
              <PluginItem icon={Bitcoin} title="Blockchain P2P" id="blockchain" desc="Web3 utility trading" />
              <PluginItem icon={Leaf} title="ESG Carbon Token" id="esg" desc="Auto-mint carbon credits" />
            </TabsContent>

            <TabsContent value="util" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={FileSpreadsheet} title="BOM Export" id="bom" desc="Bill of Materials" />
              <PluginItem icon={CircleDollarSign} title="Cost Estimator" id="cost" desc="Live pricing calc" />
              <PluginItem icon={Printer} title="Print Layout" id="print" desc="A3/A4 border generation" />
              <PluginItem icon={FileDown} title="DXF Export" id="dxf" desc="Export to AutoCAD" />
              <PluginItem icon={FileOutput} title="PDF Export" id="pdfExport" desc="Batch schematic prints" />
              <PluginItem icon={Box} title="BIM / IFC Export" id="bim" desc="Revit 3D integration" />
              <PluginItem icon={FileText} title="Title Block" id="titleBlock" desc="Parametric stamp editor" />
              <PluginItem icon={MapIcon} title="GIS Map Over" id="gis" desc="Google Maps background" />
              <PluginItem icon={PenTool} title="Symbol Editor" id="symEditor" desc="Vector asset creator" />
              <PluginItem icon={GitCompare} title="Version Diff" id="diff" desc="Compare git-like states" />
              <PluginItem icon={History} title="Rev History" id="revHist" desc="Audit trail commits" />
              <PluginItem icon={Users} title="Team Chat" id="chat" desc="Live collaboration ping" />
              <PluginItem icon={MessageSquare} title="Comments" id="comments" desc="Annotate directly on node" />
              <PluginItem icon={FolderOpen} title="Templates" id="templates" desc="Standard IEEE presets" />
              <PluginItem icon={Link2} title="Cross-Ref" id="crossRef" desc="Page-to-page hyperlinks" />
              <PluginItem icon={ClipboardCheck} title="Inspection" id="inspect" desc="QA checklist standard" />
              <PluginItem icon={PaletteIcon} title="Theme Presets" id="theme" desc="Dark/Light & UI styling" />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
