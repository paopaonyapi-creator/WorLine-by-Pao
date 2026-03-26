"use client";

import { useEditorStore } from "@/store/editorStore";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { SymbolObject, WireObject } from "@/lib/editor/types";
import { X, FileSpreadsheet, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BOMTable = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();

  const symbols = canvas.objects.filter(o => o.type === "symbol") as SymbolObject[];
  const wires = canvas.objects.filter(o => o.type === "wire") as WireObject[];

  // Group symbols by type
  const grouped: Record<string, { 
    displayName: string; 
    category: string; 
    count: number; 
    items: SymbolObject[];
  }> = {};

  symbols.forEach(sym => {
    const def = symbolRegistry[sym.symbolId];
    if (!def) return;
    if (!grouped[sym.symbolId]) {
      grouped[sym.symbolId] = {
        displayName: def.displayName,
        category: def.category,
        count: 0,
        items: [],
      };
    }
    grouped[sym.symbolId].count += 1;
    grouped[sym.symbolId].items.push(sym);
  });

  const rows = Object.entries(grouped).sort(([, a], [, b]) => a.category.localeCompare(b.category));

  const handleExportCSV = () => {
    let csv = "Item,Symbol,Category,Qty,Labels,Voltage,Rated Power,Rated Current,Cable Size,Notes\n";
    let idx = 1;
    rows.forEach(([id, data]) => {
      const labels = data.items.map(i => (i as any).label || "—").join("; ");
      const voltages = [...new Set(data.items.map(i => (i as any).voltage || "—"))].join("; ");
      const powers = [...new Set(data.items.map(i => (i as any).ratedPower ? `${(i as any).ratedPower}kW` : "—"))].join("; ");
      const currents = [...new Set(data.items.map(i => (i as any).ratedCurrent ? `${(i as any).ratedCurrent}A` : "—"))].join("; ");
      const cables = [...new Set(data.items.map(i => (i as any).cableSize || "—"))].join("; ");
      const notes = [...new Set(data.items.map(i => (i as any).notes || "").filter(Boolean))].join("; ");
      csv += `${idx},${data.displayName},${data.category},${data.count},"${labels}","${voltages}","${powers}","${currents}","${cables}","${notes}"\n`;
      idx++;
    });

    // Add wires summary
    csv += `${idx},Wires,Connections,${wires.length},"—","—","—","—","—","—"\n`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "BOM_WorLine.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FileSpreadsheet className="h-4 w-4" />
          Bill of Materials ({symbols.length} components, {wires.length} wires)
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
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">#</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Symbol</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Category</th>
              <th className="text-center px-4 py-2 font-medium text-muted-foreground">Qty</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Labels</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Voltage</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Power/Current</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Cable</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([id, data], idx) => (
              <tr key={id} className="border-b hover:bg-muted/20 transition-colors">
                <td className="px-4 py-2 text-muted-foreground">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{data.displayName}</td>
                <td className="px-4 py-2 text-muted-foreground">{data.category}</td>
                <td className="px-4 py-2 text-center font-semibold">{data.count}</td>
                <td className="px-4 py-2 text-xs">
                  {data.items.map(i => (i as any).label || "—").join(", ")}
                </td>
                <td className="px-4 py-2 text-xs">
                  {[...new Set(data.items.map(i => (i as any).voltage).filter(Boolean))].join(", ") || "—"}
                </td>
                <td className="px-4 py-2 text-xs">
                  {[...new Set(data.items.map(i => {
                    const parts: string[] = [];
                    if ((i as any).ratedPower) parts.push(`${(i as any).ratedPower}kW`);
                    if ((i as any).ratedCurrent) parts.push(`${(i as any).ratedCurrent}A`);
                    return parts.join("/");
                  }).filter(Boolean))].join(", ") || "—"}
                </td>
                <td className="px-4 py-2 text-xs">
                  {[...new Set(data.items.map(i => (i as any).cableSize).filter(Boolean))].join(", ") || "—"}
                </td>
              </tr>
            ))}
            <tr className="border-b bg-muted/10">
              <td className="px-4 py-2 text-muted-foreground">{rows.length + 1}</td>
              <td className="px-4 py-2 font-medium italic">Wires</td>
              <td className="px-4 py-2 text-muted-foreground">Connections</td>
              <td className="px-4 py-2 text-center font-semibold">{wires.length}</td>
              <td className="px-4 py-2 text-xs" colSpan={4}>
                {wires.map((w, i) => (w as any).label || `W${i + 1}`).join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 border-t text-[10px] text-muted-foreground bg-muted/20">
        Total: {symbols.length} components + {wires.length} wires = {symbols.length + wires.length} items
      </div>
    </div>
  );
};
