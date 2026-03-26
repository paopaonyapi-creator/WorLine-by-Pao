"use client";

import { useState } from "react";
import { X, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/editorStore";

type BusNode = { id: string; name: string; voltage: number; genMW: number; loadMW: number; loadPF: number };

export const LoadFlowAnalysis = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();
  const symCount = canvas.objects.filter(o => o.type === "symbol").length;

  const [buses, setBuses] = useState<BusNode[]>([
    { id: "b1", name: "Main Bus", voltage: 22, genMW: 5, loadMW: 0, loadPF: 1 },
    { id: "b2", name: "Load Bus 1", voltage: 0.4, genMW: 0, loadMW: 1.5, loadPF: 0.85 },
    { id: "b3", name: "Load Bus 2", voltage: 0.4, genMW: 0, loadMW: 0.8, loadPF: 0.8 },
  ]);

  const totalGen = buses.reduce((s, b) => s + b.genMW, 0);
  const totalLoad = buses.reduce((s, b) => s + b.loadMW, 0);
  const balance = totalGen - totalLoad;
  const avgPF = buses.filter(b => b.loadMW > 0).reduce((s, b) => s + b.loadPF, 0) / Math.max(1, buses.filter(b => b.loadMW > 0).length);

  const update = (id: string, field: keyof BusNode, val: any) => {
    setBuses(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-xl mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Activity className="h-4 w-4 text-purple-500" />
          Load Flow Analysis
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-2 p-3">
        <div className="bg-green-500/10 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">{totalGen.toFixed(1)}</div>
          <div className="text-[9px] text-green-600/70">Gen (MW)</div>
        </div>
        <div className="bg-red-500/10 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-red-600">{totalLoad.toFixed(1)}</div>
          <div className="text-[9px] text-red-600/70">Load (MW)</div>
        </div>
        <div className={`rounded-lg p-2 text-center ${balance >= 0 ? "bg-blue-500/10" : "bg-amber-500/10"}`}>
          <div className={`text-lg font-bold ${balance >= 0 ? "text-blue-600" : "text-amber-600"}`}>{balance >= 0 ? "+" : ""}{balance.toFixed(1)}</div>
          <div className="text-[9px] text-muted-foreground">Balance</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-2 text-center">
          <div className="text-lg font-bold">{avgPF.toFixed(2)}</div>
          <div className="text-[9px] text-muted-foreground">Avg PF</div>
        </div>
      </div>

      {/* Bus table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/20 sticky top-0">
            <tr>
              <th className="px-3 py-1.5 text-left">Bus</th>
              <th className="px-3 py-1.5">kV</th>
              <th className="px-3 py-1.5">Gen MW</th>
              <th className="px-3 py-1.5">Load MW</th>
              <th className="px-3 py-1.5">PF</th>
              <th className="px-3 py-1.5">kVAR</th>
            </tr>
          </thead>
          <tbody>
            {buses.map(b => {
              const kvar = b.loadMW > 0 ? b.loadMW * Math.tan(Math.acos(b.loadPF)) : 0;
              return (
                <tr key={b.id} className="border-t">
                  <td className="px-3 py-1"><Input value={b.name} onChange={e => update(b.id, "name", e.target.value)} className="h-5 text-[10px] w-24" /></td>
                  <td className="px-3 py-1"><Input type="number" value={b.voltage} onChange={e => update(b.id, "voltage", +e.target.value)} className="h-5 text-[10px] w-14" /></td>
                  <td className="px-3 py-1"><Input type="number" value={b.genMW} onChange={e => update(b.id, "genMW", +e.target.value)} className="h-5 text-[10px] w-14" step="0.1" /></td>
                  <td className="px-3 py-1"><Input type="number" value={b.loadMW} onChange={e => update(b.id, "loadMW", +e.target.value)} className="h-5 text-[10px] w-14" step="0.1" /></td>
                  <td className="px-3 py-1"><Input type="number" value={b.loadPF} onChange={e => update(b.id, "loadPF", +e.target.value)} className="h-5 text-[10px] w-14" step="0.01" min="0" max="1" /></td>
                  <td className="px-3 py-1 text-center font-medium">{kvar.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t flex gap-2">
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setBuses(prev => [...prev, { id: `b-${Date.now()}`, name: `Bus ${prev.length + 1}`, voltage: 0.4, genMW: 0, loadMW: 0.5, loadPF: 0.85 }])}>
          + Add Bus
        </Button>
        <div className="text-[9px] text-muted-foreground self-center flex-1 text-right">{symCount} symbols on canvas</div>
      </div>
    </div>
  );
};
