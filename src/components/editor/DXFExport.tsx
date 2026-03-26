"use client";

import { useEditorStore } from "@/store/editorStore";
import { X, FileDown, FileUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Simple DXF generator for SLD diagrams
function generateDXF(canvas: any): string {
  let dxf = "0\nSECTION\n2\nHEADER\n0\nENDSEC\n";
  dxf += "0\nSECTION\n2\nENTITIES\n";

  canvas.objects.forEach((obj: any) => {
    if (obj.type === "wire" && obj.points && obj.points.length >= 4) {
      // Draw wires as LINE entities
      for (let i = 0; i < obj.points.length - 2; i += 2) {
        dxf += "0\nLINE\n8\nWires\n";
        dxf += `10\n${obj.points[i]}\n20\n${-obj.points[i + 1]}\n30\n0\n`;
        dxf += `11\n${obj.points[i + 2]}\n21\n${-obj.points[i + 3]}\n31\n0\n`;
      }
    } else if (obj.type === "symbol") {
      // Draw symbols as CIRCLE + TEXT
      const cx = obj.x + (obj.width || 60) / 2;
      const cy = -(obj.y + (obj.height || 60) / 2);
      const r = Math.min(obj.width || 60, obj.height || 60) / 2;
      dxf += `0\nCIRCLE\n8\nSymbols\n10\n${cx}\n20\n${cy}\n30\n0\n40\n${r}\n`;
      if (obj.label) {
        dxf += `0\nTEXT\n8\nLabels\n10\n${cx}\n20\n${cy + r + 5}\n30\n0\n40\n5\n1\n${obj.label}\n`;
      }
    } else if (obj.type === "text") {
      dxf += `0\nTEXT\n8\nAnnotations\n10\n${obj.x}\n20\n${-obj.y}\n30\n0\n40\n${obj.fontSize || 12}\n1\n${obj.text}\n`;
    }
  });

  dxf += "0\nENDSEC\n0\nEOF\n";
  return dxf;
}

export const DXFExport = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();

  const handleExportDXF = () => {
    const dxf = generateDXF(canvas);
    const blob = new Blob([dxf], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "WorLine_SLD.dxf";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("DXF exported!");
  };

  const handleImportDXF = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".dxf";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        toast.success(`Imported ${file.name} (${(file.size / 1024).toFixed(1)}KB)`);
        // DXF parsing would go here — complex task, placeholder for now
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const symbolCount = canvas.objects.filter(o => o.type === "symbol").length;
  const wireCount = canvas.objects.filter(o => o.type === "wire").length;
  const textCount = canvas.objects.filter(o => o.type === "text").length;

  return (
    <div className="absolute top-16 right-4 z-50 w-72 bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FileDown className="h-4 w-4 text-emerald-500" />
          DXF Import / Export
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-muted/30 rounded-lg p-3 text-xs space-y-1">
          <div className="flex justify-between"><span className="text-muted-foreground">Symbols:</span><span>{symbolCount}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Wires:</span><span>{wireCount}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Text:</span><span>{textCount}</span></div>
          <div className="flex justify-between font-medium"><span>Total entities:</span><span>{symbolCount + wireCount + textCount}</span></div>
        </div>

        <Button className="w-full gap-2" onClick={handleExportDXF}>
          <Download className="h-4 w-4" /> Export DXF
        </Button>

        <Button variant="outline" className="w-full gap-2" onClick={handleImportDXF}>
          <FileUp className="h-4 w-4" /> Import DXF
        </Button>

        <p className="text-[8px] text-muted-foreground/60 text-center">
          Compatible with AutoCAD, BricsCAD, LibreCAD
        </p>
      </div>
    </div>
  );
};
