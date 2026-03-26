"use client";

import { useState, useEffect } from "react";
import { X, Lock, Fingerprint, ScanEye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuantumCryptoRouting = ({ onClose }: { onClose: () => void }) => {
  const [entangled, setEntangled] = useState(false);

  useEffect(() => {
    let t: any;
    if (entangled) {
      t = setTimeout(() => setEntangled(false), 5000);
    }
    return () => clearTimeout(t);
  }, [entangled]);

  return (
    <div className="absolute top-[25%] left-[10%] w-[330px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-indigo-950/20 font-semibold text-xs text-indigo-500">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" /> Quantum SCADA Cryptography (QKD)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3 bg-zinc-950 text-indigo-400 font-mono rounded-b-xl border-x border-b border-indigo-900/30">
        <div className="text-[10px] leading-tight text-indigo-600/70 mb-2">
          Implement Quantum Key Distribution (QKD) across the grid's fiber-optic network. Renders all SCADA nodes completely immune to Shor's algorithm on quantum computers.
        </div>

        {!entangled ? (
          <Button className="w-full text-xs h-8 bg-indigo-900 hover:bg-indigo-800 text-indigo-100 border border-indigo-700 shadow-none font-sans" onClick={() => setEntangled(true)}>
            <ScanEye className="w-3.5 h-3.5 mr-2" /> Generate Entangled Photons
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="bg-emerald-950/40 text-emerald-500 border border-emerald-800/50 p-1.5 text-[10px] rounded flex items-center justify-center font-medium gap-1.5">
              <Fingerprint className="w-3.5 h-3.5" /> Qubits Entangled & Distributed
            </div>
            
            <div className="border border-indigo-900/50 rounded bg-indigo-950/20 p-2 text-[9px] space-y-1.5 break-all">
              <div className="text-indigo-600/70 mb-1 font-bold">LIVE QKD STATE (BB84 PROTOCOL)</div>
              <div><span className="text-indigo-500">Alice_Basis:</span> ++XX++X+XX++X++X</div>
              <div><span className="text-indigo-500">Bob_Basis:</span>   +XXX++X+XX++X++X</div>
              <div><span className="text-emerald-500">Sifted_Key:</span> 1010110010100101</div>
              <div className="text-red-500/80 pt-1 border-t border-indigo-900/50 mt-1">Eavesdropper interference (Eve): 0.00%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
