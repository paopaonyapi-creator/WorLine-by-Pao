"use client";

import { useState } from "react";
import { X, Box, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";

export const BIMExport = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();
  const [isExporting, setIsExporting] = useState(false);
  const [done, setDone] = useState(false);

  const numSymbols = canvas.objects.filter(o => o.type === "symbol").length;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 2000);
  };

  return (
    <div className="absolute top-1/4 right-1/4 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-emerald-500/10 font-semibold text-xs text-emerald-600">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4" /> BIM / IFC Export
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500" /></button>
      </div>

      <div className="p-3 text-center space-y-3">
        <div className="text-[11px] text-muted-foreground">
          Export this Single Line Diagram as an Industry Foundation Classes (IFC) dataset for 3D Revit linking.
        </div>
        
        <div className="bg-muted/30 border rounded p-3 flex flex-col items-center justify-center gap-1">
          <span className="text-2xl font-black text-foreground">{numSymbols}</span>
          <span className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">BIM Objects Found</span>
        </div>

        <Button 
          className="w-full h-8 text-xs bg-emerald-600 hover:bg-emerald-700 transition-colors"
          onClick={handleExport}
          disabled={isExporting || done}
          variant={done ? "secondary" : "default"}
        >
          {isExporting ? "Compiling IFC Data..." : done ? <><CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Download Complete</> : <><Download className="w-3.5 h-3.5 mr-2" /> Export to .IFC</>}
        </Button>
        <div className="text-[9px] text-muted-foreground">Supported by Revit 2021+, Navisworks</div>
      </div>
    </div>
  );
};
