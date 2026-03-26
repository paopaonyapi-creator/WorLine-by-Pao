"use client";

import { useState } from "react";
import { X, ShieldAlert, Skull, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CyberAttackSim = ({ onClose }: { onClose: () => void }) => {
  const [stage, setStage] = useState(0);

  const startAttack = () => {
    setStage(1);
    setTimeout(() => setStage(2), 2000);
    setTimeout(() => setStage(3), 4000);
  };

  return (
    <div className="absolute top-1/4 left-1/3 w-[350px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-red-950/20 font-semibold text-xs text-red-600">
        <div className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-red-600" /> SCADA Ransomware Simulator
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-emerald-500 font-mono rounded-b-xl border-x border-b border-red-900/30">
        <div className="text-[10px] leading-tight text-emerald-600/70 mb-2">
          Execute simulated "Stuxnet-style" cyber attack to test SCADA endpoint vulnerabilities and firewall routing in the SLD network architecture.
        </div>

        {stage === 0 ? (
          <Button className="w-full text-xs h-8 bg-red-800 hover:bg-red-950 text-white border border-red-500 shadow-none font-sans" onClick={startAttack}>
            <ShieldAlert className="w-3.5 h-3.5 mr-2" /> Launch Simulation
          </Button>
        ) : (
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center gap-2"><Terminal className="w-3 h-3" /> Initializing payload injection... [SUCCESS]</div>
            {stage >= 2 && <div className="flex items-center gap-2 text-yellow-500"><Terminal className="w-3 h-3" /> Bypassing DMZ Firewall (Port 502 Modbus open)...</div>}
            {stage >= 3 && (
              <>
                <div className="flex items-center gap-2 text-red-500"><Terminal className="w-3 h-3" /> CRITICAL: PLC-01 compromise deteted!</div>
                <div className="flex items-center gap-2 text-red-500 animate-pulse bg-red-950/50 py-1 pl-1 border-l-2 border-red-500 mt-2">
                  Ransomware encrypted Substation HMI. Breakers forced OPEN.
                </div>
              </>
            )}
            <Button variant="outline" className="w-full font-sans text-xs h-7 mt-3 border-emerald-800 text-emerald-500 hover:bg-emerald-950 hover:text-emerald-400" onClick={() => setStage(0)}>
              Reset Environment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
