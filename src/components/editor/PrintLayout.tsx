"use client";

import { useState } from "react";
import { X, Printer, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PageSize = "A4" | "A3" | "A2" | "A1";
type Orientation = "landscape" | "portrait";

const PAGE_SIZES: Record<PageSize, { w: number; h: number }> = {
  A4: { w: 297, h: 210 },
  A3: { w: 420, h: 297 },
  A2: { w: 594, h: 420 },
  A1: { w: 841, h: 594 },
};

export const PrintLayout = ({ onClose }: { onClose: () => void }) => {
  const [pageSize, setPageSize] = useState<PageSize>("A3");
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [margins, setMargins] = useState({ top: 10, bottom: 10, left: 20, right: 10 });
  const [showTitleBlock, setShowTitleBlock] = useState(true);
  const [showBorder, setShowBorder] = useState(true);
  const [showCropMarks, setShowCropMarks] = useState(true);

  const size = PAGE_SIZES[pageSize];
  const pw = orientation === "landscape" ? size.w : size.h;
  const ph = orientation === "landscape" ? size.h : size.w;
  const scale = 0.6;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-2xl mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Printer className="h-4 w-4 text-blue-500" />
          Print Layout
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className="flex-1 p-4 flex items-center justify-center bg-muted/20 overflow-auto">
          <div
            className="bg-white shadow-lg relative"
            style={{ width: pw * scale, height: ph * scale }}
          >
            {/* Crop marks */}
            {showCropMarks && (
              <>
                <div className="absolute -top-3 left-2 w-px h-3 bg-black" />
                <div className="absolute -top-3 right-2 w-px h-3 bg-black" />
                <div className="absolute -bottom-3 left-2 w-px h-3 bg-black" />
                <div className="absolute -bottom-3 right-2 w-px h-3 bg-black" />
                <div className="absolute top-2 -left-3 h-px w-3 bg-black" />
                <div className="absolute top-2 -right-3 h-px w-3 bg-black" />
                <div className="absolute bottom-2 -left-3 h-px w-3 bg-black" />
                <div className="absolute bottom-2 -right-3 h-px w-3 bg-black" />
              </>
            )}

            {/* Border */}
            {showBorder && (
              <div
                className="absolute border-2 border-black"
                style={{
                  top: margins.top * scale,
                  left: margins.left * scale,
                  right: margins.right * scale,
                  bottom: margins.bottom * scale,
                }}
              />
            )}

            {/* Title block */}
            {showTitleBlock && (
              <div
                className="absolute border-t-2 border-black flex items-center justify-center text-[6px] text-gray-400"
                style={{
                  left: margins.left * scale,
                  right: margins.right * scale,
                  bottom: margins.bottom * scale,
                  height: 25 * scale,
                }}
              >
                TITLE BLOCK
              </div>
            )}

            {/* Drawing area */}
            <div className="absolute flex items-center justify-center text-[8px] text-gray-300" style={{
              top: margins.top * scale + 2,
              left: margins.left * scale + 2,
              right: margins.right * scale + 2,
              bottom: (margins.bottom + (showTitleBlock ? 25 : 0)) * scale + 2,
            }}>
              SLD Drawing Area
            </div>

            {/* Page size label */}
            <div className="absolute bottom-1 right-1 text-[5px] text-gray-300">
              {pageSize} {orientation} ({pw}×{ph}mm)
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="w-52 border-l p-3 space-y-3 overflow-auto">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Page Size</label>
            <select value={pageSize} onChange={e => setPageSize(e.target.value as PageSize)} className="w-full border rounded px-2 py-1 text-xs bg-background">
              <option value="A4">A4 (297×210)</option>
              <option value="A3">A3 (420×297)</option>
              <option value="A2">A2 (594×420)</option>
              <option value="A1">A1 (841×594)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Orientation</label>
            <div className="flex gap-1.5">
              <Button variant={orientation === "landscape" ? "secondary" : "outline"} size="sm" className="flex-1 text-[10px]" onClick={() => setOrientation("landscape")}>Landscape</Button>
              <Button variant={orientation === "portrait" ? "secondary" : "outline"} size="sm" className="flex-1 text-[10px]" onClick={() => setOrientation("portrait")}>Portrait</Button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Margins (mm)</label>
            <div className="grid grid-cols-2 gap-1">
              {(["top", "bottom", "left", "right"] as const).map(side => (
                <div key={side}>
                  <label className="text-[8px] text-muted-foreground capitalize">{side}</label>
                  <Input type="number" value={margins[side]} onChange={e => setMargins({ ...margins, [side]: +e.target.value })} className="h-6 text-xs" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input type="checkbox" checked={showBorder} onChange={e => setShowBorder(e.target.checked)} />
              Drawing Border
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input type="checkbox" checked={showTitleBlock} onChange={e => setShowTitleBlock(e.target.checked)} />
              Title Block
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input type="checkbox" checked={showCropMarks} onChange={e => setShowCropMarks(e.target.checked)} />
              Crop Marks
            </label>
          </div>
        </div>
      </div>

      <div className="p-3 border-t flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1 gap-2" onClick={handlePrint}>
          <Printer className="h-4 w-4" /> Print / Save PDF
        </Button>
      </div>
    </div>
  );
};
