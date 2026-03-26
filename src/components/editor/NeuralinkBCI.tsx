"use client";

import { useState } from "react";
import { X, Brain, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NeuralinkBCI = ({ onClose }: { onClose: () => void }) => {
  const [synced, setSynced] = useState(false);

  return (
    <div className="absolute bottom-[20%] left-[20%] w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-emerald-950/20 font-semibold text-xs text-emerald-500">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4" /> Neuralink BCI Thought Control
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-4 flex flex-col items-center justify-center space-y-4 bg-zinc-950 text-emerald-400 font-mono rounded-b-xl border-x border-b border-emerald-900/30">
        <div className="text-[10px] leading-tight text-emerald-600/70 mb-2 font-sans text-center">
          Direct Brain-Computer Interface (BCI). Think of a component, and it will materialize on the canvas. Look at two nodes to connect a wire.
        </div>

        <div className="relative">
          <div className={`absolute inset-0 border-2 rounded-full border-emerald-500 animate-ping ${synced ? 'opacity-100' : 'opacity-0'}`}></div>
          <button 
            className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 transition-colors ${synced ? 'bg-emerald-900 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-zinc-900 border border-emerald-900/50 text-emerald-600 hover:bg-emerald-950/50'}`}
            onClick={() => setSynced(!synced)}
          >
            <Waves className={`w-8 h-8 ${synced ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        <div className="h-4 text-[10px] font-bold">
          {synced ? <span className="text-emerald-400">Cortical Link Established (4.2 Tbps)</span> : <span className="text-zinc-600">Disconnected</span>}
        </div>
      </div>
    </div>
  );
};
