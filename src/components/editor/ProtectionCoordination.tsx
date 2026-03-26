"use client";

import { useState } from "react";
import { X, Shield, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DeviceCurve = {
  name: string;
  rating: number;
  color: string;
  type: "fuse" | "mcb" | "mccb" | "relay";
};

// Generate simplified TCC points for a device
function generateTCCPoints(device: DeviceCurve): { t: number; i: number }[] {
  const In = device.rating;
  const points: { t: number; i: number }[] = [];
  const multipliers = [1.0, 1.1, 1.2, 1.5, 2, 3, 5, 7, 10, 15, 20];
  
  multipliers.forEach(m => {
    const current = In * m;
    let time: number;
    if (device.type === "fuse") {
      time = Math.pow(10, 3 - m * 0.3); // Fuse curve (fast)
    } else if (device.type === "mcb") {
      time = m < 1.13 ? 3600 : Math.pow(10, 2.5 - m * 0.25);
    } else if (device.type === "mccb") {
      time = m < 1.1 ? 7200 : Math.pow(10, 3 - m * 0.28);
    } else {
      time = m < 1.05 ? 100 : Math.pow(10, 2 - m * 0.2); // Relay
    }
    if (time > 0.001 && time < 100000) {
      points.push({ t: Math.max(0.01, time), i: current });
    }
  });
  return points;
}

export const ProtectionCoordination = ({ onClose }: { onClose: () => void }) => {
  const [devices, setDevices] = useState<DeviceCurve[]>([
    { name: "Upstream MCCB", rating: 400, color: "#ef4444", type: "mccb" },
    { name: "Downstream MCB", rating: 63, color: "#3b82f6", type: "mcb" },
  ]);

  const addDevice = () => {
    setDevices(prev => [...prev, {
      name: `Device ${prev.length + 1}`,
      rating: 100,
      color: ["#10b981", "#f59e0b", "#8b5cf6", "#ec4899"][prev.length % 4],
      type: "mcb",
    }]);
  };

  const removeDevice = (idx: number) => {
    setDevices(prev => prev.filter((_, i) => i !== idx));
  };

  // SVG chart dimensions
  const chartW = 400, chartH = 300;
  const logMinI = 0.5, logMaxI = 4.5; // 3A to 30kA
  const logMinT = -2, logMaxT = 4;     // 0.01s to 10000s

  const toX = (logI: number) => ((logI - logMinI) / (logMaxI - logMinI)) * chartW;
  const toY = (logT: number) => chartH - ((logT - logMinT) / (logMaxT - logMinT)) * chartH;

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Shield className="h-4 w-4 text-blue-500" />
          Protection Coordination (TCC)
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chart */}
        <div className="flex-1 p-4 overflow-auto">
          <svg viewBox={`-40 -20 ${chartW + 60} ${chartH + 40}`} className="w-full h-full min-h-[300px]">
            {/* Grid */}
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map(logI => (
              <line key={`gi-${logI}`} x1={toX(logI)} y1={0} x2={toX(logI)} y2={chartH} stroke="currentColor" strokeOpacity={0.07} />
            ))}
            {[-2, -1, 0, 1, 2, 3, 4].map(logT => (
              <line key={`gt-${logT}`} x1={0} y1={toY(logT)} x2={chartW} y2={toY(logT)} stroke="currentColor" strokeOpacity={0.07} />
            ))}

            {/* Axes labels */}
            {[1, 2, 3, 4].map(logI => (
              <text key={`li-${logI}`} x={toX(logI)} y={chartH + 15} textAnchor="middle" fontSize="8" fill="currentColor" opacity={0.5}>
                {Math.pow(10, logI)}A
              </text>
            ))}
            {[-1, 0, 1, 2, 3].map(logT => (
              <text key={`lt-${logT}`} x={-5} y={toY(logT) + 3} textAnchor="end" fontSize="8" fill="currentColor" opacity={0.5}>
                {logT < 0 ? `${Math.pow(10, logT).toFixed(2)}s` : `${Math.pow(10, logT)}s`}
              </text>
            ))}

            <text x={chartW / 2} y={chartH + 30} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.6}>Current (A)</text>
            <text x={-30} y={chartH / 2} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.6} transform={`rotate(-90, -30, ${chartH / 2})`}>Time (s)</text>

            {/* Curves */}
            {devices.map((dev, di) => {
              const pts = generateTCCPoints(dev);
              if (pts.length < 2) return null;
              const pathD = pts.map((p, i) => {
                const x = toX(Math.log10(p.i));
                const y = toY(Math.log10(p.t));
                return `${i === 0 ? 'M' : 'L'}${x},${y}`;
              }).join(' ');
              return (
                <g key={di}>
                  <path d={pathD} fill="none" stroke={dev.color} strokeWidth={2} strokeLinecap="round" />
                  <text x={toX(Math.log10(pts[pts.length - 1].i)) + 4} y={toY(Math.log10(pts[pts.length - 1].t))} fontSize="7" fill={dev.color}>
                    {dev.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Device list */}
        <div className="w-56 border-l p-3 space-y-2 overflow-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Devices</p>
          {devices.map((dev, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-2 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dev.color }} />
                <Input value={dev.name} onChange={e => {
                  const updated = [...devices];
                  updated[i] = { ...dev, name: e.target.value };
                  setDevices(updated);
                }} className="h-6 text-xs flex-1" />
                <button onClick={() => removeDevice(i)}>
                  <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
              <div className="flex gap-1">
                <div className="flex-1">
                  <label className="text-[8px] text-muted-foreground">Rating (A)</label>
                  <Input type="number" value={dev.rating} onChange={e => {
                    const updated = [...devices];
                    updated[i] = { ...dev, rating: +e.target.value };
                    setDevices(updated);
                  }} className="h-6 text-xs" />
                </div>
                <div className="flex-1">
                  <label className="text-[8px] text-muted-foreground">Type</label>
                  <select value={dev.type} onChange={e => {
                    const updated = [...devices];
                    updated[i] = { ...dev, type: e.target.value as DeviceCurve["type"] };
                    setDevices(updated);
                  }} className="w-full h-6 text-xs border rounded bg-background px-1">
                    <option value="fuse">Fuse</option>
                    <option value="mcb">MCB</option>
                    <option value="mccb">MCCB</option>
                    <option value="relay">Relay</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={addDevice}>
            <Plus className="h-3 w-3" /> Add Device
          </Button>
        </div>
      </div>
    </div>
  );
};
