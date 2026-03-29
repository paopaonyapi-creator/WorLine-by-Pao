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
  Earth, Lock, Satellite, Atom, Snowflake, Rocket, Layers, BatteryWarning, CheckCircle2, SlidersHorizontal, ArrowUpDown, Scale, Combine, BarChart3, ListOrdered
} from "lucide-react";

type PluginHubProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export const PluginHub = ({ isOpen, onClose, onSelect }: PluginHubProps) => {
  const PluginItem = ({ icon: Icon, title, id, desc, status = "Installed" }: { icon: any; title: string; id: string; desc: string; status?: "Installed" | "Premium" | "Beta" }) => (
    <button
      onClick={() => { onSelect(id); onClose(); }}
      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent hover:border-primary/50 text-left transition-all w-full group relative overflow-hidden"
    >
      <div className="p-2 bg-primary/10 text-primary rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm flex items-center gap-1.5">
          <span className="leading-tight">{title}</span>
          {status === "Installed" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
          {status === "Premium" && <span className="text-[9px] uppercase font-bold bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded shrink-0">PRO</span>}
          {status === "Beta" && <span className="text-[9px] uppercase font-bold bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded shrink-0">BETA</span>}
        </div>
        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5 pr-1 line-clamp-2">{desc}</div>
      </div>
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[800px] w-[95vw] max-h-[85vh] p-0 flex flex-col gap-0 rounded-xl overflow-hidden shadow-2xl">
        <DialogHeader className="p-4 border-b bg-background shadow-sm z-10">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <LayoutGrid className="w-5 h-5 text-primary" />
            Engineering Toolset
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="analysis" className="flex-1 flex flex-col overflow-hidden bg-muted/10">
          <div className="w-full overflow-x-auto border-b hide-scrollbar bg-background">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0 px-2 gap-1">
              <TabsTrigger value="analysis" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted/30">Analytics & Calc</TabsTrigger>
              <TabsTrigger value="protection" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted/30">Protection</TabsTrigger>
              <TabsTrigger value="smartgrid" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted/30">Smart Grid & AI</TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted/30">Documentation</TabsTrigger>
              <TabsTrigger value="scada" className="data-[state=active]:bg-muted/50 rounded-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted/30">SCADA & IoT</TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <TabsContent value="analysis" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Zap} title="Short Circuit Calc" id="shortCircuit" desc="IEC 60909 fault calculation" />
              <PluginItem icon={TrendingDown} title="Voltage Drop" id="vdrop" desc="Cable sizing & drop analysis" />
              <PluginItem icon={Activity} title="Load Flow Engine" id="loadFlow" desc="Newton-Raphson load flow" status="Premium" />
              <PluginItem icon={Calculator} title="Load Calculator" id="loadCalc" desc="Demand factor & panel sizing" />
              <PluginItem icon={Cable} title="Cable Schedule" id="cable" desc="Auto-generate wire lengths" />
              <PluginItem icon={Gauge} title="PF Correction" id="pfCorrection" desc="Capacitor bank sizing tool" />
              <PluginItem icon={Battery} title="Battery Sizing" id="battery" desc="DC UPS backup capacity" />
              <PluginItem icon={Thermometer} title="Cable Derating" id="derating" desc="IEC thermal correction factors" />
              <PluginItem icon={TrendingDown} title="Motor Start Dip" id="motorStart" desc="Large induction motor starts" status="Premium" />
              <PluginItem icon={Scale} title="Transformer Sizing" id="trafoSize" desc="kVA rating from load diversity" />
              <PluginItem icon={Combine} title="Busbar Sizing" id="busbarSize" desc="Cross-section & current density" />
            </TabsContent>

            <TabsContent value="protection" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Shield} title="Protection TCC" id="protection" desc="Time-Current Curve coordination" status="Premium" />
              <PluginItem icon={Flame} title="Arc Flash Analysis" id="arcFlash" desc="IEEE 1584 hazard analysis" status="Premium" />
              <PluginItem icon={Cpu} title="Relay Logic" id="relaySim" desc="ANSI code ladder simulation" />
              <PluginItem icon={Network} title="Earth Grid" id="groundGrid" desc="IEEE 80 step/touch voltage" />
              <PluginItem icon={CloudLightning} title="Lightning Protect" id="lightning" desc="Rolling sphere geometry method" />
              <PluginItem icon={ActivitySquare} title="Harmonic THD%" id="thd" desc="Non-linear load simulation" status="Premium" />
              <PluginItem icon={SlidersHorizontal} title="Relay Setting Calc" id="relaySetting" desc="CT ratio & pickup for 50/51/27/59" />
              <PluginItem icon={ArrowUpDown} title="Selectivity Check" id="selectivity" desc="Upstream/downstream coordination" />
            </TabsContent>

            <TabsContent value="smartgrid" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Sun} title="Solar PV Yield" id="solar" desc="Yield & inverter string sizing" />
              <PluginItem icon={PowerOff} title="Self-Healing Grid" id="healing" desc="Auto-restore Blackout topologies" status="Beta" />
              <PluginItem icon={BrainCircuit} title="Failure Predictor" id="aiPred" desc="Predictive transformer ML models" status="Beta" />
              <PluginItem icon={Bot} title="AI Gen Design" id="aiGen" desc="Generate SLD from text specs" status="Beta" />
              <PluginItem icon={Route} title="Smart Auto-Route" id="autoRout" desc="Auto-route overlapping wires" />
              <PluginItem icon={CarFront} title="EV Fleet V2G" id="evFleet" desc="Bidirectional charging loads" status="Premium" />
              <PluginItem icon={BarChart3} title="VFD Harmonics Sim" id="vfdHarmonics" desc="Drive harmonic injection model" status="Beta" />
            </TabsContent>

            <TabsContent value="docs" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={FileSpreadsheet} title="BOM Export" id="bom" desc="Bill of Materials & Schedules" />
              <PluginItem icon={CircleDollarSign} title="Cost Estimator" id="cost" desc="Live pricing calculation" />
              <PluginItem icon={LayoutGrid} title="Panel Schedule" id="panelSch" desc="Switchboard load balancing" />
              <PluginItem icon={FileText} title="Title Block Editor" id="titleBlock" desc="Parametric project stamps" />
              <PluginItem icon={FileOutput} title="PDF Batch Export" id="pdfExport" desc="Generate schematic prints" />
              <PluginItem icon={FileDown} title="DXF Export" id="dxf" desc="Export directly to AutoCAD" />
              <PluginItem icon={FolderOpen} title="Templates" id="templates" desc="Standard IEEE/IEC presets" />
              <PluginItem icon={MessageSquare} title="Annotations" id="comments" desc="Pin comments directly to nodes" />
            </TabsContent>

            <TabsContent value="scada" className="m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <PluginItem icon={Play} title="SCADA Simulator" id="scada" desc="Real-time breaker & flow toggles" />
              <PluginItem icon={Wifi} title="IoT MQTT Broker" id="mqtt" desc="Live sensor telemetry binding" status="Premium" />
              <PluginItem icon={Database} title="Equipment DB" id="equipDb" desc="Cloud manufacturer catalogs" />
              <PluginItem icon={Wrench} title="CMMS Tagging" id="cmms" desc="Maintenance schedules & SLAs" />
              <PluginItem icon={Thermometer} title="Thermal Heatmap" id="thermal" desc="Live infra-red IR simulation" status="Beta" />
              <PluginItem icon={CircuitBoard} title="Terminal Strips" id="terminal" desc="Control wire generation" />
              <PluginItem icon={ListOrdered} title="PLC I/O Map" id="plcIoMap" desc="Digital & analog I/O assignment" />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
