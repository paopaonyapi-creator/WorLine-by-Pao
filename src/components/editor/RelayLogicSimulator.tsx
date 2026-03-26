"use client";

import { useState } from "react";
import { X, Cpu, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RelayLogicSimulator = ({ onClose }: { onClose: () => void }) => {
  const [faultActive, setFaultActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const simulateFault = () => {
    setFaultActive(true);
    setLogs([]);
    
    // Simulate relay tripping sequence
    setTimeout(() => setLogs(prev => [...prev, "[0ms] L-G Fault detected on Feeder 02 (8.5kA)"]), 100);
    setTimeout(() => setLogs(prev => [...prev, "[15ms] ANSI 50/51: Relay Pickup Time Elapsed"]), 700);
    setTimeout(() => setLogs(prev => [...prev, "[40ms] ANSI 86: Trip Coil Energized"]), 1200);
    setTimeout(() => setLogs(prev => [...prev, "[65ms] CB-02 Status -> OPEN (Arc Quenched)"]), 1700);
    setTimeout(() => {
      setLogs(prev => [...prev, "[70ms] SYSTEM SAFELY ISOLATED. Main Bus Healthy."]);
      setFaultActive(false);
    }, 2200);
  };

  return (
    <div className="absolute top-1/4 left-1/4 w-[350px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-rose-500/10 font-semibold text-xs text-rose-600">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" /> Protection Relay Simulator
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[11px] text-muted-foreground">
          Simulate a physical fault on the canvas to verify relay coordination logic (ANSI 50, 51, 87) and breaker clearing sequence.
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <Button variant="outline" className="h-7 border-rose-200 text-rose-600 hover:bg-rose-50" onClick={simulateFault} disabled={faultActive}>
            <AlertTriangle className="w-3.5 h-3.5 mr-2" /> L-G Fault
          </Button>
          <Button variant="outline" className="h-7 border-rose-200 text-rose-600 hover:bg-rose-50" onClick={simulateFault} disabled={faultActive}>
            <AlertTriangle className="w-3.5 h-3.5 mr-2" /> 3-Phase Short
          </Button>
        </div>

        <div className="border rounded bg-muted/30 p-2 min-h-[140px] font-mono text-[9px] flex flex-col">
          <div className="text-muted-foreground border-b pb-1 mb-1 font-bold">EVENT LOG (Resolution: 1ms)</div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {logs.length === 0 && !faultActive && (
              <span className="text-muted-foreground/50 italic">System normal. Awaiting fault trigger...</span>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`${i === logs.length - 1 && log.includes('SAFELY') ? 'text-green-500 font-bold' : log.includes('Fault') ? 'text-red-500' : 'text-foreground'}`}>
                {log}
              </div>
            ))}
            {faultActive && logs.length > 0 && logs.length < 5 && (
              <div className="text-muted-foreground animate-pulse">...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
