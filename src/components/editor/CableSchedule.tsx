"use client";

import { useEditorStore } from "@/store/editorStore";
import { SymbolObject, WireObject } from "@/lib/editor/types";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { X, Cable, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CableSchedule = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();

  const wires = canvas.objects.filter(o => o.type === "wire") as WireObject[];
  const symbols = canvas.objects.filter(o => o.type === "symbol") as SymbolObject[];

  // Build cable schedule from wires
  const schedule = wires.map((wire, idx) => {
    const label = (wire as any).label || `W${idx + 1}`;
    const from = wire.startEndpoint
      ? symbols.find(s => s.id === wire.startEndpoint?.objectId)
      : null;
    const to = wire.endEndpoint
      ? symbols.find(s => s.id === wire.endEndpoint?.objectId)
      : null;
    const fromLabel = from ? ((from as any).label || symbolRegistry[from.symbolId]?.displayName || "—") : "—";
    const toLabel = to ? ((to as any).label || symbolRegistry[to.symbolId]?.displayName || "—") : "—";
    const cableSize = (wire as any).cableSize || "—";
    const length = wire.points.length >= 4
      ? Math.round(Math.sqrt(
          Math.pow(wire.points[wire.points.length - 2] - wire.points[0], 2) +
          Math.pow(wire.points[wire.points.length - 1] - wire.points[1], 2)
        ) / 20) + "m"
      : "—";

    return { label, fromLabel, toLabel, cableSize, color: wire.color, thickness: wire.thickness, length };
  });

  const handleExportCSV = () => {
    let csv = "Cable No,From,To,Cable Size,Color,Thickness,Length\n";
    schedule.forEach(row => {
      csv += `${row.label},${row.fromLabel},${row.toLabel},${row.cableSize},${row.color},${row.thickness}mm,${row.length}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CableSchedule_WorLine.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Cable className="h-4 w-4 text-orange-500" />
          Cable Schedule ({wires.length} cables)
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={handleExportCSV}>
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 sticky top-0">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Cable No.</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">From</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">To</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Cable Size</th>
              <th className="text-center px-4 py-2 font-medium text-muted-foreground">Color</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Thickness</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Est. Length</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, i) => (
              <tr key={i} className="border-b hover:bg-muted/20 transition-colors">
                <td className="px-4 py-2 font-medium">{row.label}</td>
                <td className="px-4 py-2">{row.fromLabel}</td>
                <td className="px-4 py-2">{row.toLabel}</td>
                <td className="px-4 py-2">{row.cableSize}</td>
                <td className="px-4 py-2 text-center">
                  <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: row.color }} />
                </td>
                <td className="px-4 py-2">{row.thickness}mm</td>
                <td className="px-4 py-2">{row.length}</td>
              </tr>
            ))}
            {schedule.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No cables/wires drawn yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 border-t text-[10px] text-muted-foreground bg-muted/20">
        Total: {wires.length} cables • Lengths are estimated from canvas coordinates
      </div>
    </div>
  );
};
