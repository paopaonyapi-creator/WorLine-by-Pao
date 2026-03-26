"use client";

import { useState, useEffect } from "react";
import { X, Leaf, Coins } from "lucide-react";

export const ESGCarbonTokenizer = ({ onClose }: { onClose: () => void }) => {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setCredits(c => +(c + Math.random() * 0.05).toFixed(3));
    }, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="absolute top-[28%] left-[20%] w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-emerald-500/10 font-semibold text-xs text-emerald-600">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4" /> ESG Carbon Tokenizer
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Track Scope 2 emissions reduction from Solar PV & BESS. Automatically mint REC (Renewable Energy Certificates) carbon credits to the blockchain.
        </div>

        <div className="bg-emerald-950 text-emerald-400 p-3 rounded-lg border border-emerald-800 text-center space-y-1 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 to-transparent animate-pulse"></div>
          <div className="text-[10px] font-semibold text-emerald-500">Live Carbon Credits Minted (tCO2e)</div>
          <div className="text-3xl font-mono font-bold tracking-wider">{credits.toFixed(3)}</div>
          <div className="text-[10px] flex items-center justify-center gap-1 mt-2 text-emerald-300">
            <Coins className="w-3 h-3" /> Est. Market Value: ${(credits * 85.50).toFixed(2)} USD
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-muted-foreground">
          <div className="border p-1.5 rounded bg-muted/20">Solar Yield: 4.2 MW</div>
          <div className="border p-1.5 rounded bg-muted/20">Grid Offset: 100%</div>
        </div>
      </div>
    </div>
  );
};
