"use client";

import { X, FolderOpen, FileCheck2, Zap, Factory, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

type Template = {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  objects: any[];
};

const TEMPLATES: Template[] = [
  {
    id: "mdb", name: "Main Distribution Board", description: "Standard MDB with ACB, MCCB feeders, metering CT/PT",
    icon: Zap, category: "Distribution",
    objects: [
      { type: "symbol", symbolId: "acb", x: 400, y: 60, width: 60, height: 60, rotation: 0, zIndex: 1, label: "ACB-001" },
      { type: "symbol", symbolId: "ct", x: 400, y: 160, width: 50, height: 40, rotation: 0, zIndex: 2, label: "CT-001" },
      { type: "symbol", symbolId: "mccb", x: 200, y: 300, width: 50, height: 60, rotation: 0, zIndex: 3, label: "MCCB-001" },
      { type: "symbol", symbolId: "mccb", x: 400, y: 300, width: 50, height: 60, rotation: 0, zIndex: 4, label: "MCCB-002" },
      { type: "symbol", symbolId: "mccb", x: 600, y: 300, width: 50, height: 60, rotation: 0, zIndex: 5, label: "MCCB-003" },
      { type: "wire", points: [430, 120, 430, 160], color: "#333", thickness: 2, x: 0, y: 0, rotation: 0, zIndex: 0 },
      { type: "wire", points: [430, 200, 430, 260, 230, 260, 230, 300], color: "#333", thickness: 2, x: 0, y: 0, rotation: 0, zIndex: 0 },
      { type: "wire", points: [430, 260, 430, 300], color: "#333", thickness: 2, x: 0, y: 0, rotation: 0, zIndex: 0 },
      { type: "wire", points: [430, 260, 630, 260, 630, 300], color: "#333", thickness: 2, x: 0, y: 0, rotation: 0, zIndex: 0 },
    ],
  },
  {
    id: "mcc", name: "Motor Control Center", description: "MCC with DOL starters, VFD, and soft starters",
    icon: Factory, category: "Motor",
    objects: [
      { type: "symbol", symbolId: "mccb", x: 400, y: 60, width: 50, height: 60, rotation: 0, zIndex: 1, label: "MCCB-IN" },
      { type: "symbol", symbolId: "contactor", x: 200, y: 220, width: 50, height: 50, rotation: 0, zIndex: 2, label: "K1" },
      { type: "symbol", symbolId: "overload-relay", x: 200, y: 320, width: 50, height: 40, rotation: 0, zIndex: 3, label: "OL-1" },
      { type: "symbol", symbolId: "motor", x: 200, y: 420, width: 60, height: 60, rotation: 0, zIndex: 4, label: "M1-15kW" },
      { type: "symbol", symbolId: "contactor", x: 400, y: 220, width: 50, height: 50, rotation: 0, zIndex: 5, label: "K2" },
      { type: "symbol", symbolId: "motor", x: 400, y: 420, width: 60, height: 60, rotation: 0, zIndex: 6, label: "M2-7.5kW" },
    ],
  },
  {
    id: "substation", name: "HV/LV Substation", description: "22kV incoming, transformer, LV switchgear",
    icon: Building2, category: "Power",
    objects: [
      { type: "symbol", symbolId: "disconnect-switch", x: 400, y: 40, width: 50, height: 50, rotation: 0, zIndex: 1, label: "DS-001" },
      { type: "symbol", symbolId: "fuse", x: 400, y: 130, width: 40, height: 50, rotation: 0, zIndex: 2, label: "HV-Fuse" },
      { type: "symbol", symbolId: "transformer", x: 380, y: 220, width: 80, height: 100, rotation: 0, zIndex: 3, label: "TR-001\n1000kVA" },
      { type: "symbol", symbolId: "acb", x: 400, y: 370, width: 60, height: 60, rotation: 0, zIndex: 4, label: "LV-ACB" },
      { type: "text", text: "22kV", x: 480, y: 80, fontSize: 14, fontFamily: "sans-serif", fill: "#e11d48", rotation: 0, zIndex: 10 },
      { type: "text", text: "400V", x: 480, y: 380, fontSize: 14, fontFamily: "sans-serif", fill: "#2563eb", rotation: 0, zIndex: 10 },
    ],
  },
];

export const ProjectTemplateLibrary = ({ onClose }: { onClose: () => void }) => {
  const { canvas, addObject } = useEditorStore();

  const applyTemplate = (tmpl: Template) => {
    tmpl.objects.forEach((obj, i) => {
      addObject({
        ...obj,
        id: `tmpl-${tmpl.id}-${Date.now()}-${i}`,
      });
    });
    toast.success(`Template "${tmpl.name}" applied!`);
    onClose();
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-lg mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-pink-500/10 to-rose-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FolderOpen className="h-4 w-4 text-pink-500" />
          Project Templates
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-2">
        {TEMPLATES.map(tmpl => {
          const Icon = tmpl.icon;
          return (
            <div key={tmpl.id} className="border rounded-lg p-3 hover:bg-muted/20 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold">{tmpl.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tmpl.description}</p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-[8px] bg-muted px-1.5 py-0.5 rounded">{tmpl.category}</span>
                    <span className="text-[8px] text-muted-foreground">{tmpl.objects.length} objects</span>
                  </div>
                </div>
                <Button size="sm" className="text-[10px] h-7 shrink-0" onClick={() => applyTemplate(tmpl)}>
                  <FileCheck2 className="h-3 w-3 mr-1" /> Apply
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
