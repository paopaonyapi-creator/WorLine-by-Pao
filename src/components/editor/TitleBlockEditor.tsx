"use client";

import { useState } from "react";
import { X, FileText, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TitleBlockData {
  projectName: string;
  drawingTitle: string;
  drawingNo: string;
  revision: string;
  drawnBy: string;
  checkedBy: string;
  approvedBy: string;
  date: string;
  company: string;
  scale: string;
  sheet: string;
}

export const TitleBlockEditor = ({ onClose, onApply }: {
  onClose: () => void;
  onApply: (data: TitleBlockData) => void;
}) => {
  const [data, setData] = useState<TitleBlockData>({
    projectName: "",
    drawingTitle: "",
    drawingNo: "DWG-001",
    revision: "A",
    drawnBy: "",
    checkedBy: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
    company: "",
    scale: "NTS",
    sheet: "1 of 1",
  });

  const update = (key: keyof TitleBlockData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("worline-title-block", JSON.stringify(data));
    onApply(data);
    onClose();
  };

  // Load saved data on mount
  useState(() => {
    const saved = localStorage.getItem("worline-title-block");
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
  });

  const fields: { key: keyof TitleBlockData; label: string; span?: number }[] = [
    { key: "company", label: "Company / Organization", span: 2 },
    { key: "projectName", label: "Project Name", span: 2 },
    { key: "drawingTitle", label: "Drawing Title", span: 2 },
    { key: "drawingNo", label: "Drawing No." },
    { key: "revision", label: "Rev." },
    { key: "drawnBy", label: "Drawn By" },
    { key: "date", label: "Date" },
    { key: "checkedBy", label: "Checked By" },
    { key: "approvedBy", label: "Approved By" },
    { key: "scale", label: "Scale" },
    { key: "sheet", label: "Sheet" },
  ];

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-xl mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FileText className="h-4 w-4 text-blue-500" />
          Drawing Title Block
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-auto">
        {/* Preview */}
        <div className="border-2 border-foreground rounded p-3 text-[9px] leading-tight font-mono space-y-1 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2 border-b pb-1 mb-1">
            <Building2 className="h-6 w-6 text-muted-foreground" />
            <div>
              <div className="font-bold text-xs">{data.company || "Company Name"}</div>
              <div className="text-muted-foreground">{data.projectName || "Project Name"}</div>
            </div>
          </div>
          <div className="font-bold text-sm text-center py-1">{data.drawingTitle || "DRAWING TITLE"}</div>
          <div className="grid grid-cols-4 gap-px">
            <div className="border p-0.5"><span className="text-muted-foreground">Dwg:</span> {data.drawingNo}</div>
            <div className="border p-0.5"><span className="text-muted-foreground">Rev:</span> {data.revision}</div>
            <div className="border p-0.5"><span className="text-muted-foreground">Scale:</span> {data.scale}</div>
            <div className="border p-0.5"><span className="text-muted-foreground">Sheet:</span> {data.sheet}</div>
          </div>
          <div className="grid grid-cols-3 gap-px">
            <div className="border p-0.5"><span className="text-muted-foreground">Drawn:</span> {data.drawnBy}</div>
            <div className="border p-0.5"><span className="text-muted-foreground">Checked:</span> {data.checkedBy}</div>
            <div className="border p-0.5"><span className="text-muted-foreground">Approved:</span> {data.approvedBy}</div>
          </div>
          <div className="text-right text-muted-foreground">{data.date}</div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-2">
          {fields.map(f => (
            <div key={f.key} className={f.span === 2 ? "col-span-2" : ""}>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-0.5">{f.label}</label>
              <Input
                value={data[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                className="text-sm h-8"
                placeholder={f.label}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1" onClick={handleSave}>Save & Apply</Button>
      </div>
    </div>
  );
};
