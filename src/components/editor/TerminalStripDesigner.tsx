"use client";

import { useState } from "react";
import { X, CircuitBoard, Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Terminal = {
  id: string;
  number: string;
  wireFrom: string;
  wireTo: string;
  type: "through" | "ground" | "fuse" | "disconnect";
};

type Strip = {
  id: string;
  name: string;
  terminals: Terminal[];
};

export const TerminalStripDesigner = ({ onClose }: { onClose: () => void }) => {
  const [strips, setStrips] = useState<Strip[]>([
    {
      id: "ts-1",
      name: "X1",
      terminals: [
        { id: "t1", number: "1", wireFrom: "W1", wireTo: "W5", type: "through" },
        { id: "t2", number: "2", wireFrom: "W2", wireTo: "W6", type: "through" },
        { id: "t3", number: "3", wireFrom: "W3", wireTo: "W7", type: "through" },
        { id: "t4", number: "PE", wireFrom: "PE", wireTo: "PE", type: "ground" },
      ],
    },
  ]);

  const addTerminal = (stripId: string) => {
    setStrips(prev => prev.map(s => {
      if (s.id !== stripId) return s;
      const num = s.terminals.length + 1;
      return {
        ...s,
        terminals: [...s.terminals, {
          id: `t-${Date.now()}`,
          number: String(num),
          wireFrom: "",
          wireTo: "",
          type: "through" as const,
        }],
      };
    }));
  };

  const addStrip = () => {
    setStrips(prev => [...prev, {
      id: `ts-${Date.now()}`,
      name: `X${prev.length + 1}`,
      terminals: [],
    }]);
  };

  const updateTerminal = (stripId: string, termId: string, field: keyof Terminal, value: string) => {
    setStrips(prev => prev.map(s => {
      if (s.id !== stripId) return s;
      return {
        ...s,
        terminals: s.terminals.map(t =>
          t.id === termId ? { ...t, [field]: value } : t
        ),
      };
    }));
  };

  const exportCSV = () => {
    let csv = "Strip,Terminal No,Wire From,Wire To,Type\n";
    strips.forEach(s => {
      s.terminals.forEach(t => {
        csv += `${s.name},${t.number},${t.wireFrom},${t.wireTo},${t.type}\n`;
      });
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "TerminalStrips_WorLine.csv";
    a.click();
  };

  const typeColors: Record<string, string> = {
    through: "bg-blue-100 dark:bg-blue-900/30",
    ground: "bg-green-100 dark:bg-green-900/30",
    fuse: "bg-red-100 dark:bg-red-900/30",
    disconnect: "bg-amber-100 dark:bg-amber-900/30",
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CircuitBoard className="h-4 w-4 text-cyan-500" />
          Terminal Strip Designer
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={exportCSV}>
            <Download className="h-3 w-3" /> CSV
          </Button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {strips.map(strip => (
          <div key={strip.id} className="border rounded-lg overflow-hidden">
            <div className="bg-muted/30 px-3 py-2 flex items-center justify-between">
              <Input
                value={strip.name}
                onChange={e => setStrips(prev => prev.map(s => s.id === strip.id ? { ...s, name: e.target.value } : s))}
                className="h-6 w-20 font-bold text-xs"
              />
              <span className="text-[10px] text-muted-foreground">{strip.terminals.length} terminals</span>
            </div>

            {/* Visual strip */}
            <div className="px-3 py-2 flex gap-0.5 overflow-x-auto">
              {strip.terminals.map(t => (
                <div key={t.id} className={`flex flex-col items-center min-w-[36px] p-1 rounded text-[7px] ${typeColors[t.type]}`}>
                  <div className="w-1 h-3 bg-foreground/30 rounded-full" />
                  <div className="w-6 h-6 border-2 border-foreground/40 rounded-sm flex items-center justify-center font-bold text-[8px]">
                    {t.number}
                  </div>
                  <div className="w-1 h-3 bg-foreground/30 rounded-full" />
                </div>
              ))}
            </div>

            {/* Table */}
            <table className="w-full text-[10px]">
              <thead className="bg-muted/20">
                <tr>
                  <th className="px-2 py-1 text-left">No.</th>
                  <th className="px-2 py-1 text-left">Wire From</th>
                  <th className="px-2 py-1 text-left">Wire To</th>
                  <th className="px-2 py-1 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {strip.terminals.map(t => (
                  <tr key={t.id} className="border-t">
                    <td className="px-2 py-0.5">
                      <Input value={t.number} onChange={e => updateTerminal(strip.id, t.id, "number", e.target.value)} className="h-5 text-[10px] w-10" />
                    </td>
                    <td className="px-2 py-0.5">
                      <Input value={t.wireFrom} onChange={e => updateTerminal(strip.id, t.id, "wireFrom", e.target.value)} className="h-5 text-[10px]" placeholder="W1" />
                    </td>
                    <td className="px-2 py-0.5">
                      <Input value={t.wireTo} onChange={e => updateTerminal(strip.id, t.id, "wireTo", e.target.value)} className="h-5 text-[10px]" placeholder="W5" />
                    </td>
                    <td className="px-2 py-0.5">
                      <select value={t.type} onChange={e => updateTerminal(strip.id, t.id, "type", e.target.value)} className="h-5 text-[10px] bg-background border rounded px-1">
                        <option value="through">Through</option>
                        <option value="ground">Ground</option>
                        <option value="fuse">Fuse</option>
                        <option value="disconnect">Disconnect</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-1.5">
              <Button variant="ghost" size="sm" className="text-[10px] h-5 w-full" onClick={() => addTerminal(strip.id)}>
                <Plus className="h-2.5 w-2.5 mr-1" /> Add Terminal
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t">
        <Button variant="outline" className="w-full text-xs gap-1" onClick={addStrip}>
          <Plus className="h-3 w-3" /> Add Strip
        </Button>
      </div>
    </div>
  );
};
