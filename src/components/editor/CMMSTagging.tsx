"use client";

import { useState } from "react";
import { X, Wrench, CalendarClock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CMMSTagging = ({ onClose }: { onClose: () => void }) => {
  const [synced, setSynced] = useState(false);

  return (
    <div className="absolute top-1/3 left-1/3 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-orange-500/10 font-semibold text-xs text-orange-600">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4" /> CMMS Maintenance Sync
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Bind SLD symbols to external Enterprise Asset Management (EAM) / CMMS tools like SAP PM or IBM Maximo to flag maintenance schedules.
        </div>

        {!synced ? (
          <div className="space-y-3">
            <div className="border border-orange-200 bg-orange-50 p-3 rounded-lg flex flex-col items-center justify-center text-center gap-2">
              <CalendarClock className="w-8 h-8 text-orange-400" />
              <div className="text-xs font-semibold text-orange-800">No active CMMS connection</div>
              <div className="text-[9px] text-orange-600/80">Connect to fetch PM (Preventive Maintenance) orders.</div>
            </div>
            <Button className="w-full h-8 text-xs bg-orange-600 hover:bg-orange-700 shadow-none text-white font-medium" onClick={() => setSynced(true)}>
              Sync with SAP PM (Demo)
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 text-green-700 border border-green-200 p-2 text-xs rounded-md flex items-center justify-center font-medium gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Synced with CMMS successfully
            </div>
            
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Overdue Assets (2)</div>
              
              <div className="border border-red-200 bg-red-50 rounded p-2 text-[10px] flex justify-between items-center group cursor-pointer hover:bg-red-100 transition-colors">
                <div>
                  <div className="font-semibold text-red-700">Transformer TR-01</div>
                  <div className="text-red-600/70">PM: Oil DGA Analysis (3 days ago)</div>
                </div>
                <div className="px-2 py-0.5 bg-red-600 text-white rounded text-[9px] font-bold">WO-9912</div>
              </div>

              <div className="border border-amber-200 bg-amber-50 rounded p-2 text-[10px] flex justify-between items-center group cursor-pointer hover:bg-amber-100 transition-colors">
                <div>
                  <div className="font-semibold text-amber-700">ACB-M1 Main</div>
                  <div className="text-amber-600/70">PM: Mechanical Contact Test (Due Today)</div>
                </div>
                <div className="px-2 py-0.5 bg-amber-500 text-white rounded text-[9px] font-bold">WO-9914</div>
              </div>
            </div>

            <Button variant="outline" className="w-full text-xs h-7 mt-2" onClick={() => setSynced(false)}>Disconnect</Button>
          </div>
        )}
      </div>
    </div>
  );
};
