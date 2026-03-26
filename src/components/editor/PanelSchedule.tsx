"use client";

import { useState } from "react";
import { X, LayoutGrid, Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BreakerSlot = { id: string; circuit: string; rating: number; poles: 1 | 2 | 3; load: string; cableSize: string; wireNo: string };

export const PanelSchedule = ({ onClose }: { onClose: () => void }) => {
  const [panelName, setPanelName] = useState("Panel LP-1");
  const [mainBreaker, setMainBreaker] = useState(100);
  const [slots, setSlots] = useState<BreakerSlot[]>([
    { id: "s1", circuit: "Lighting L1", rating: 16, poles: 1, load: "1.2 kW", cableSize: "2.5", wireNo: "W1" },
    { id: "s2", circuit: "Socket S1", rating: 20, poles: 1, load: "2.0 kW", cableSize: "4", wireNo: "W2" },
    { id: "s3", circuit: "AC Unit", rating: 32, poles: 3, load: "5.5 kW", cableSize: "6", wireNo: "W3" },
    { id: "s4", circuit: "Lighting L2", rating: 16, poles: 1, load: "0.8 kW", cableSize: "2.5", wireNo: "W4" },
    { id: "s5", circuit: "Socket S2", rating: 20, poles: 1, load: "1.5 kW", cableSize: "4", wireNo: "W5" },
    { id: "s6", circuit: "Water Heater", rating: 32, poles: 1, load: "4.5 kW", cableSize: "6", wireNo: "W6" },
  ]);

  const addSlot = () => setSlots(p => [...p, { id: `s-${Date.now()}`, circuit: "", rating: 16, poles: 1, load: "", cableSize: "2.5", wireNo: "" }]);
  const update = (id: string, f: keyof BreakerSlot, v: any) => setSlots(p => p.map(s => s.id === id ? { ...s, [f]: v } : s));

  const exportCSV = () => {
    let csv = `Panel: ${panelName}\nMain Breaker: ${mainBreaker}A\n\nNo,Circuit,Rating (A),Poles,Load,Cable mm²,Wire No\n`;
    slots.forEach((s, i) => { csv += `${i + 1},${s.circuit},${s.rating},${s.poles}P,${s.load},${s.cableSize},${s.wireNo}\n`; });
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${panelName.replace(/\s+/g, "_")}_Schedule.csv`;
    a.click();
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <LayoutGrid className="h-4 w-4 text-blue-500" />
          Panel Schedule
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={exportCSV}><Download className="h-3 w-3" /> CSV</Button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
      </div>
      {/* Header */}
      <div className="flex gap-3 p-3 border-b bg-muted/10">
        <div><label className="text-[10px] text-muted-foreground">Panel</label>
          <Input value={panelName} onChange={e => setPanelName(e.target.value)} className="h-7 text-xs w-32" /></div>
        <div><label className="text-[10px] text-muted-foreground">Main (A)</label>
          <Input type="number" value={mainBreaker} onChange={e => setMainBreaker(+e.target.value)} className="h-7 text-xs w-20" /></div>
        <div className="self-end text-[10px] text-muted-foreground">{slots.length} ways</div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/30 sticky top-0">
            <tr>
              <th className="px-2 py-1.5 w-8">#</th>
              <th className="px-2 py-1.5 text-left">Circuit</th>
              <th className="px-2 py-1.5">A</th>
              <th className="px-2 py-1.5">P</th>
              <th className="px-2 py-1.5">Load</th>
              <th className="px-2 py-1.5">mm²</th>
              <th className="px-2 py-1.5">Wire</th>
              <th className="px-2 py-1.5"></th>
            </tr>
          </thead>
          <tbody>
            {slots.map((s, i) => (
              <tr key={s.id} className="border-t hover:bg-muted/10">
                <td className="px-2 py-0.5 text-center text-muted-foreground">{i + 1}</td>
                <td className="px-2 py-0.5"><Input value={s.circuit} onChange={e => update(s.id, "circuit", e.target.value)} className="h-5 text-[10px]" placeholder="Circuit name" /></td>
                <td className="px-2 py-0.5"><Input type="number" value={s.rating} onChange={e => update(s.id, "rating", +e.target.value)} className="h-5 text-[10px] w-12" /></td>
                <td className="px-2 py-0.5">
                  <select value={s.poles} onChange={e => update(s.id, "poles", +e.target.value)} className="h-5 text-[10px] bg-background border rounded px-1">
                    <option value={1}>1P</option><option value={2}>2P</option><option value={3}>3P</option>
                  </select>
                </td>
                <td className="px-2 py-0.5"><Input value={s.load} onChange={e => update(s.id, "load", e.target.value)} className="h-5 text-[10px] w-16" placeholder="kW" /></td>
                <td className="px-2 py-0.5"><Input value={s.cableSize} onChange={e => update(s.id, "cableSize", e.target.value)} className="h-5 text-[10px] w-12" /></td>
                <td className="px-2 py-0.5"><Input value={s.wireNo} onChange={e => update(s.id, "wireNo", e.target.value)} className="h-5 text-[10px] w-12" /></td>
                <td className="px-2 py-0.5"><button onClick={() => setSlots(p => p.filter(x => x.id !== s.id))}><Trash2 className="h-2.5 w-2.5 text-muted-foreground hover:text-destructive" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2 border-t">
        <Button variant="outline" className="w-full text-xs" onClick={addSlot}><Plus className="h-3 w-3 mr-1" /> Add Way</Button>
      </div>
    </div>
  );
};
