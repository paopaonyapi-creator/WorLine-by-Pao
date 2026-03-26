"use client";

import { useState } from "react";
import { X, ClipboardCheck, Check, Circle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CheckItem = { id: string; text: string; checked: boolean; severity: "critical" | "major" | "minor" };

const DEFAULT_CHECKLIST: CheckItem[] = [
  { id: "c1", text: "All symbols have labels/designations", checked: false, severity: "critical" },
  { id: "c2", text: "Wire numbering is complete and consistent", checked: false, severity: "critical" },
  { id: "c3", text: "Protection devices are correctly rated", checked: false, severity: "critical" },
  { id: "c4", text: "Cable sizes match load calculations", checked: false, severity: "critical" },
  { id: "c5", text: "Voltage levels are clearly marked", checked: false, severity: "major" },
  { id: "c6", text: "Transformer ratios are indicated", checked: false, severity: "major" },
  { id: "c7", text: "Grounding system is shown", checked: false, severity: "critical" },
  { id: "c8", text: "Metering points are identified", checked: false, severity: "minor" },
  { id: "c9", text: "Drawing title block is complete", checked: false, severity: "major" },
  { id: "c10", text: "Revision number is updated", checked: false, severity: "major" },
  { id: "c11", text: "BOM matches symbols on drawing", checked: false, severity: "major" },
  { id: "c12", text: "Cable schedule is complete", checked: false, severity: "major" },
  { id: "c13", text: "Cross-references are accurate", checked: false, severity: "minor" },
  { id: "c14", text: "Motor loads show kW/HP ratings", checked: false, severity: "minor" },
  { id: "c15", text: "Emergency stop circuits are shown", checked: false, severity: "critical" },
];

export const InspectionChecklist = ({ onClose }: { onClose: () => void }) => {
  const [items, setItems] = useState<CheckItem[]>(() => {
    if (typeof window === "undefined") return DEFAULT_CHECKLIST;
    const saved = localStorage.getItem("worline-checklist");
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
  });

  const toggle = (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
    setItems(updated);
    localStorage.setItem("worline-checklist", JSON.stringify(updated));
  };

  const reset = () => {
    setItems(DEFAULT_CHECKLIST);
    localStorage.removeItem("worline-checklist");
  };

  const total = items.length;
  const done = items.filter(i => i.checked).length;
  const pct = Math.round((done / total) * 100);

  const criticalDone = items.filter(i => i.severity === "critical" && i.checked).length;
  const criticalTotal = items.filter(i => i.severity === "critical").length;

  const sevColors = {
    critical: "text-red-500",
    major: "text-amber-500",
    minor: "text-blue-400",
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ClipboardCheck className="h-4 w-4 text-amber-500" />
          SLD Inspection Checklist
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress */}
      <div className="p-3 border-b">
        <div className="flex justify-between text-xs mb-1">
          <span>{done}/{total} complete</span>
          <span className={pct === 100 ? "text-green-600 font-bold" : ""}>{pct}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${pct === 100 ? "bg-green-500" : "bg-primary"}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-3 mt-2 text-[10px]">
          <span className="text-red-500">● Critical: {criticalDone}/{criticalTotal}</span>
          <span className="text-amber-500">● Major: {items.filter(i => i.severity === "major" && i.checked).length}/{items.filter(i => i.severity === "major").length}</span>
          <span className="text-blue-400">● Minor: {items.filter(i => i.severity === "minor" && i.checked).length}/{items.filter(i => i.severity === "minor").length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-colors hover:bg-muted/30 ${item.checked ? "opacity-50" : ""}`}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${item.checked ? "bg-green-500 border-green-500" : "border-muted-foreground/30"}`}>
              {item.checked && <Check className="h-2.5 w-2.5 text-white" />}
            </div>
            <span className={item.checked ? "line-through" : ""}>{item.text}</span>
            <span className={`ml-auto text-[8px] ${sevColors[item.severity]}`}>
              {item.severity === "critical" && <AlertTriangle className="h-2.5 w-2.5 inline" />}
              {item.severity}
            </span>
          </button>
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <Button variant="outline" size="sm" className="text-xs" onClick={reset}>Reset</Button>
        <div className="flex-1" />
        {pct === 100 && (
          <span className="text-green-600 text-xs font-bold self-center">✅ Ready for Review</span>
        )}
      </div>
    </div>
  );
};
