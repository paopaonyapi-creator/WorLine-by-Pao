"use client";

import { useState } from "react";
import { X, FileText, Bot, FileCheck2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIGenerativeReport = ({ onClose }: { onClose: () => void }) => {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const startGen = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 3000);
  };

  return (
    <div className="absolute top-20 right-20 w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-violet-500/10 font-semibold text-xs text-violet-600">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" /> AI Engineering Report Gen
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-4 space-y-4">
        {!generating && !done ? (
          <>
            <div className="text-xs text-muted-foreground text-center">
              Our LLM will analyze your SLD design, equipment specs, and SCADA logic to write a comprehensive 15-20 page structural engineering report in PDF format.
            </div>
            <div className="border rounded p-3 bg-muted/20 text-[10px] space-y-1.5 font-medium text-foreground">
              <div className="flex justify-between"><span>• Executive Summary</span><CheckCircle2 color="green" /></div>
              <div className="flex justify-between"><span>• Load Flow Analysis</span><CheckCircle2 color="green" /></div>
              <div className="flex justify-between"><span>• Short Circuit & Protection</span><CheckCircle2 color="green" /></div>
              <div className="flex justify-between"><span>• Equipment Bill of Quantities</span><CheckCircle2 color="green" /></div>
            </div>
            <Button className="w-full text-xs h-9 bg-violet-600 hover:bg-violet-700 shadow-none" onClick={startGen}>
              <FileText className="w-4 h-4 mr-2" /> Generate Formal Report Now
            </Button>
          </>
        ) : generating ? (
          <div className="py-6 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
            <div className="text-xs font-semibold animate-pulse text-violet-700">AI is writing your report...</div>
            <div className="text-[10px] text-muted-foreground w-48 text-center">Analyzing busbar sizing, preparing fault current appendices...</div>
          </div>
        ) : (
          <div className="py-2 text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <FileCheck2 className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Report Ready!</div>
              <div className="text-xs text-muted-foreground">WorLine_System_Analysis_Report.pdf (24 Pages)</div>
            </div>
            <a href="#" className="flex" onClick={onClose}><Button className="w-full text-xs">Download PDF</Button></a>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckCircle2 = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
