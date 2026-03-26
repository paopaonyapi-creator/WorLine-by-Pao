"use client";

import { useState } from "react";
import { X, History, Clock, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type RevisionEntry = { id: string; version: string; date: string; author: string; description: string; changes: number };

export const RevisionHistory = ({ onClose }: { onClose: () => void }) => {
  const [revisions] = useState<RevisionEntry[]>([
    { id: "r6", version: "F", date: "2026-03-26", author: "Engineer A", description: "Added load flow data & cable schedule", changes: 12 },
    { id: "r5", version: "E", date: "2026-03-25", author: "Engineer A", description: "Protection coordination update", changes: 8 },
    { id: "r4", version: "D", date: "2026-03-24", author: "Reviewer B", description: "Client review comments addressed", changes: 15 },
    { id: "r3", version: "C", date: "2026-03-20", author: "Engineer A", description: "Motor feeder sizing revised", changes: 6 },
    { id: "r2", version: "B", date: "2026-03-15", author: "Engineer A", description: "Transformer added, cable routes updated", changes: 22 },
    { id: "r1", version: "A", date: "2026-03-10", author: "Engineer A", description: "Initial issue for construction", changes: 45 },
  ]);

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4 text-cyan-500" />
          Revision History ({revisions.length} revisions)
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-auto">
        {revisions.map((rev, i) => (
          <div key={rev.id} className={`flex gap-3 px-4 py-3 border-b hover:bg-muted/10 transition-colors ${i === 0 ? "bg-primary/5" : ""}`}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {rev.version}
              </div>
              {i < revisions.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Rev {rev.version}</span>
                {i === 0 && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600">Current</span>}
              </div>
              <p className="text-[10px] text-foreground mt-0.5">{rev.description}</p>
              <div className="flex gap-3 mt-1 text-[9px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {rev.date}</span>
                <span className="flex items-center gap-0.5"><User className="h-2.5 w-2.5" /> {rev.author}</span>
                <span className="flex items-center gap-0.5"><FileText className="h-2.5 w-2.5" /> {rev.changes} changes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
