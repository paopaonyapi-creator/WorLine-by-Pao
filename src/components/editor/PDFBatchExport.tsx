"use client";

import { useState } from "react";
import { X, FileOutput, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

export const PDFBatchExport = ({ onClose }: { onClose: () => void }) => {
  const { sheets } = useEditorStore();
  const [selected, setSelected] = useState<Set<string>>(new Set(sheets.map(s => s.id)));
  const [pageSize, setPageSize] = useState("A3");
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [exporting, setExporting] = useState(false);

  const toggleSheet = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExport = async () => {
    setExporting(true);
    await new Promise(r => setTimeout(r, 1500));
    // In production, would use jsPDF or server-side rendering
    window.print();
    setExporting(false);
    toast.success(`Exported ${selected.size} sheets as PDF`);
  };

  return (
    <div className="absolute top-16 right-4 z-50 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FileOutput className="h-4 w-4 text-orange-500" />
          PDF Batch Export
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-3 space-y-3">
        {/* Sheets */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] font-semibold text-muted-foreground">Select Sheets</label>
            <button className="text-[9px] text-primary" onClick={() => setSelected(new Set(sheets.map(s => s.id)))}>Select All</button>
          </div>
          <div className="max-h-32 overflow-auto space-y-0.5">
            {sheets.map(s => (
              <label key={s.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-muted/20 cursor-pointer text-xs">
                <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSheet(s.id)} />
                {s.name}
              </label>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-muted-foreground">Page Size</label>
            <select value={pageSize} onChange={e => setPageSize(e.target.value)} className="w-full h-7 text-xs border rounded px-2 bg-background">
              <option value="A4">A4</option><option value="A3">A3</option>
              <option value="A2">A2</option><option value="A1">A1</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground">Orientation</label>
            <select value={orientation} onChange={e => setOrientation(e.target.value as any)} className="w-full h-7 text-xs border rounded px-2 bg-background">
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>
        </div>

        <Button className="w-full gap-2" disabled={selected.size === 0 || exporting} onClick={handleExport}>
          {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileOutput className="h-4 w-4" />}
          {exporting ? "Exporting..." : `Export ${selected.size} Sheet${selected.size > 1 ? "s" : ""}`}
        </Button>
      </div>
    </div>
  );
};
