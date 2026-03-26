"use client";

import { useState } from "react";
import { X, BrainCircuit, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIFailurePrediction = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-[15%] right-[25%] w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-violet-500/10 font-semibold text-xs text-violet-600">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4" /> AI Prognostics (Failure Pred.)
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground">
          Machine Learning model analyzes transformer historical load spikes, harmonic history, and DGA oil tests to predict time-to-failure (TTF).
        </div>

        <div className="border border-violet-100 bg-violet-50 rounded p-2 text-xs space-y-2">
          <div className="flex justify-between font-semibold text-violet-900 border-b border-violet-200 pb-1">
            <span>Asset: TR-10 MDB Main</span>
            <span className="text-rose-600 bg-rose-100 px-1 rounded">High Risk</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[10px]">Predicted Time to Failure:</span>
            <span className="font-mono font-bold text-rose-600">3 Months 14 Days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[10px]">Failure Mode Root Cause:</span>
            <span className="font-semibold text-violet-700 text-[10px]">Insulation Paper Degradation</span>
          </div>
          <div className="w-full bg-violet-200 rounded-full h-2 mt-2">
            <div className="bg-rose-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <div className="text-[8px] text-right text-muted-foreground mt-1">Health Index: 15%</div>
        </div>

        <Button className="w-full text-xs h-8 bg-violet-600 hover:bg-violet-700 shadow-none text-white font-medium">
          <Activity className="w-3.5 h-3.5 mr-2" /> Generate Life Extension Plan
        </Button>
      </div>
    </div>
  );
};
