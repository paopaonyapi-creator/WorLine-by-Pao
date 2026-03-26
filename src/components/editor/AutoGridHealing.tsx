"use client";

import { useState } from "react";
import { X, Network, PowerOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AutoGridHealing = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<"normal" | "blackout" | "healed">("normal");

  const simulateBlackout = () => {
    setStatus("blackout");
    setTimeout(() => {
      setStatus("healed");
    }, 3000);
  };

  return (
    <div className="absolute top-[15%] left-[25%] w-[330px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-cyan-900/10 font-semibold text-xs text-cyan-700">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4" /> AI Auto-Grid Self Healing
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground">
          Simulate a total utility grid blackout. The AI controller will instantly re-route power, shed non-essential loads, and island the microgrid using BESS and Solar.
        </div>

        <div className={`p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors border ${
          status === "normal" ? "bg-muted/30 border-border" : 
          status === "blackout" ? "bg-zinc-950 border-red-900" : 
          "bg-cyan-950 border-cyan-800"
        }`}>
          {status === "normal" && (
            <>
              <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2" />
              <div className="text-xs font-bold">Grid Normal</div>
            </>
          )}
          {status === "blackout" && (
            <>
              <PowerOff className="w-8 h-8 text-red-500 mb-2 animate-pulse" />
              <div className="text-xs font-bold text-red-500">UTILITY BLACKOUT DETECTED</div>
              <div className="text-[9px] text-red-400 mt-1 font-mono">Running self-healing matrix...</div>
            </>
          )}
          {status === "healed" && (
            <>
              <Network className="w-8 h-8 text-cyan-400 mb-2 animate-pulse" />
              <div className="text-xs font-bold text-cyan-400">MICROGRID ISLANDED SUCCESSFULLY</div>
              <div className="text-[9px] text-cyan-200 mt-1 font-mono text-left w-full pl-4 space-y-1 mt-2">
                <div>&gt; Main utility breaker OPENED</div>
                <div>&gt; Non-essential loads SHED</div>
                <div>&gt; BESS discharging (3.5MW)</div>
              </div>
            </>
          )}
        </div>

        {status === "normal" || status === "healed" ? (
          <Button variant="destructive" className="w-full text-xs h-8 shadow-none" onClick={simulateBlackout}>
            <PowerOff className="w-3.5 h-3.5 mr-2" /> Force Total Blackout
          </Button>
        ) : (
          <Button disabled className="w-full text-xs h-8 bg-red-950 text-red-500 border border-red-900 border-dashed">
            Executing Islanding Protocol...
          </Button>
        )}
      </div>
    </div>
  );
};
