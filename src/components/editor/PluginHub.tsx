"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calculator, FileSpreadsheet, Cable, FileText, Zap, Shield, MessageSquare,
  FileDown, CircuitBoard, TrendingDown, Activity, Database,
  FolderOpen, Gauge, Battery, Thermometer, LayoutGrid,
  FileOutput, Flame, ActivitySquare, Sun, Play, Bot, Route, CircleDollarSign,
  CloudLightning, Network, Wifi, Cpu, Wrench, CarFront, BrainCircuit, PowerOff,
  CheckCircle2, SlidersHorizontal, ArrowUpDown, Scale, Combine, BarChart3, ListOrdered
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PluginHubProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
};

const TABS = [
  { key: "analysis", label: "📊 คำนวณ", labelEn: "Calc" },
  { key: "protection", label: "🛡 ป้องกัน", labelEn: "Protection" },
  { key: "smartgrid", label: "🤖 AI & Grid", labelEn: "Smart" },
  { key: "docs", label: "📄 เอกสาร", labelEn: "Docs" },
  { key: "scada", label: "📡 SCADA", labelEn: "IoT" },
] as const;

type TabKey = typeof TABS[number]["key"];

type Tool = {
  icon: any;
  title: string;
  id: string;
  desc: string;
  status?: "ok" | "pro" | "beta";
};

const TOOLS: Record<TabKey, Tool[]> = {
  analysis: [
    { icon: Zap, title: "Short Circuit", id: "shortCircuit", desc: "IEC 60909 fault calc" },
    { icon: TrendingDown, title: "Voltage Drop", id: "vdrop", desc: "Cable sizing & drop" },
    { icon: Activity, title: "Load Flow", id: "loadFlow", desc: "Newton-Raphson analysis", status: "pro" },
    { icon: Calculator, title: "Load Calc", id: "loadCalc", desc: "Demand factor & panel" },
    { icon: Cable, title: "Cable Schedule", id: "cable", desc: "Auto wire lengths" },
    { icon: Gauge, title: "PF Correction", id: "pfCorrection", desc: "Capacitor bank sizing" },
    { icon: Battery, title: "Battery Sizing", id: "battery", desc: "DC UPS backup" },
    { icon: Thermometer, title: "Cable Derating", id: "derating", desc: "IEC thermal factors" },
    { icon: TrendingDown, title: "Motor Start", id: "motorStart", desc: "Voltage dip analysis", status: "pro" },
    { icon: Scale, title: "Trafo Sizing", id: "trafoSize", desc: "kVA from load diversity" },
    { icon: Combine, title: "Busbar Sizing", id: "busbarSize", desc: "Cross-section & density" },
  ],
  protection: [
    { icon: Shield, title: "TCC Curves", id: "protection", desc: "Time-Current coordination", status: "pro" },
    { icon: Flame, title: "Arc Flash", id: "arcFlash", desc: "IEEE 1584 hazard", status: "pro" },
    { icon: Cpu, title: "Relay Logic", id: "relaySim", desc: "ANSI code ladder sim" },
    { icon: Network, title: "Earth Grid", id: "groundGrid", desc: "IEEE 80 step/touch" },
    { icon: CloudLightning, title: "Lightning", id: "lightning", desc: "Rolling sphere method" },
    { icon: ActivitySquare, title: "THD Analysis", id: "thd", desc: "Harmonic distortion", status: "pro" },
    { icon: SlidersHorizontal, title: "Relay Settings", id: "relaySetting", desc: "CT ratio & pickup 50/51" },
    { icon: ArrowUpDown, title: "Selectivity", id: "selectivity", desc: "Up/downstream coord." },
  ],
  smartgrid: [
    { icon: Sun, title: "Solar PV", id: "solar", desc: "Yield & string sizing" },
    { icon: PowerOff, title: "Self-Healing", id: "healing", desc: "Auto-restore topology", status: "beta" },
    { icon: BrainCircuit, title: "AI Predictor", id: "aiPred", desc: "Transformer ML model", status: "beta" },
    { icon: Bot, title: "AI Gen SLD", id: "aiGen", desc: "Text-to-diagram", status: "beta" },
    { icon: Route, title: "Auto-Route", id: "autoRout", desc: "Smart wire routing" },
    { icon: CarFront, title: "EV Fleet V2G", id: "evFleet", desc: "Bidirectional charge", status: "pro" },
    { icon: BarChart3, title: "VFD Harmonics", id: "vfdHarmonics", desc: "Drive injection model", status: "beta" },
  ],
  docs: [
    { icon: FileSpreadsheet, title: "BOM Export", id: "bom", desc: "Bill of Materials" },
    { icon: CircleDollarSign, title: "Cost Estimate", id: "cost", desc: "Live pricing calc" },
    { icon: LayoutGrid, title: "Panel Schedule", id: "panelSch", desc: "Load balancing" },
    { icon: FileText, title: "Title Block", id: "titleBlock", desc: "Project stamps" },
    { icon: FileOutput, title: "PDF Export", id: "pdfExport", desc: "Batch schematic prints" },
    { icon: FileDown, title: "DXF Export", id: "dxf", desc: "AutoCAD compatible" },
    { icon: FolderOpen, title: "Templates", id: "templates", desc: "IEEE/IEC presets" },
    { icon: MessageSquare, title: "Annotations", id: "comments", desc: "Pin notes to nodes" },
  ],
  scada: [
    { icon: Play, title: "SCADA Sim", id: "scada", desc: "Breaker & flow toggles" },
    { icon: Wifi, title: "MQTT Broker", id: "mqtt", desc: "Sensor telemetry", status: "pro" },
    { icon: Database, title: "Equipment DB", id: "equipDb", desc: "Manufacturer catalogs" },
    { icon: Wrench, title: "CMMS Tags", id: "cmms", desc: "Maintenance & SLAs" },
    { icon: Thermometer, title: "Thermal Map", id: "thermal", desc: "IR simulation", status: "beta" },
    { icon: CircuitBoard, title: "Terminal Strip", id: "terminal", desc: "Control wire gen" },
    { icon: ListOrdered, title: "PLC I/O Map", id: "plcIoMap", desc: "DI/DO/AI/AO assign" },
  ],
};

export const PluginHub = ({ isOpen, onClose, onSelect }: PluginHubProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("analysis");

  const tools = TOOLS[activeTab];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[920px] w-[96vw] max-h-[88vh] p-0 flex flex-col gap-0 rounded-2xl overflow-hidden shadow-2xl border-0">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-3 bg-gradient-to-r from-primary/5 to-transparent">
          <DialogTitle className="flex items-center gap-2.5 text-xl font-bold">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <LayoutGrid className="w-5 h-5 text-primary" />
            </div>
            Engineering Toolset
            <span className="text-xs font-normal text-muted-foreground ml-1">
              {Object.values(TOOLS).flat().length} tools
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Tab bar — compact pill style, always visible */}
        <div className="px-5 pb-3 flex gap-1.5 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <ScrollArea className="flex-1 px-5 pb-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const st = tool.status || "ok";
              return (
                <button
                  key={tool.id}
                  onClick={() => { onSelect(tool.id); onClose(); }}
                  className={cn(
                    "group relative flex flex-col items-center text-center gap-2 p-4 rounded-xl border transition-all",
                    "bg-card hover:bg-accent hover:border-primary/40 hover:shadow-md",
                    st === "pro" && "border-amber-200/60",
                    st === "beta" && "border-blue-200/60"
                  )}
                >
                  {/* Status badge */}
                  {st === "pro" && (
                    <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase bg-amber-500/15 text-amber-600 px-1.5 py-0.5 rounded-full leading-none">
                      PRO
                    </span>
                  )}
                  {st === "beta" && (
                    <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase bg-blue-500/15 text-blue-600 px-1.5 py-0.5 rounded-full leading-none">
                      BETA
                    </span>
                  )}
                  {st === "ok" && (
                    <CheckCircle2 className="absolute top-2 right-2 w-3 h-3 text-emerald-500" />
                  )}

                  {/* Icon */}
                  <div className="p-2.5 rounded-xl bg-primary/8 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title — never truncated */}
                  <div className="font-semibold text-[13px] leading-tight">
                    {tool.title}
                  </div>

                  {/* Desc */}
                  <div className="text-[10px] text-muted-foreground leading-snug">
                    {tool.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
