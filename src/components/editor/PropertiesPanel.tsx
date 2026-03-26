import { useEditorStore } from "@/store/editorStore";
import { Copy, Trash, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WireObject, SymbolObject } from "@/lib/editor/types";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { useState } from "react";

const WIRE_COLORS = [
  { label: "Black (Phase)", value: "#000000" },
  { label: "Red (Line)", value: "#ef4444" },
  { label: "Blue (Neutral)", value: "#3b82f6" },
  { label: "Green (Ground)", value: "#22c55e" },
  { label: "Orange (Control)", value: "#f97316" },
  { label: "Gray", value: "#6b7280" },
];

const WIRE_THICKNESSES = [
  { label: "Thin", value: 1 },
  { label: "Normal", value: 2 },
  { label: "Thick", value: 3 },
  { label: "Heavy", value: 4 },
];

const VOLTAGES = ["12V", "24V", "48V", "110V", "220V", "380V", "400V", "690V", "11kV", "22kV", "33kV", "115kV"];
const CABLE_SIZES = ["1.0mm²", "1.5mm²", "2.5mm²", "4.0mm²", "6.0mm²", "10mm²", "16mm²", "25mm²", "35mm²", "50mm²", "70mm²", "95mm²", "120mm²", "150mm²", "240mm²"];

export const PropertiesPanel = () => {
  const { selectedIds, canvas, deleteObjects, duplicateSelected, updateObject, rotateSelected, flipSelectedH, flipSelectedV } = useEditorStore();

  const selectedObjects = canvas.objects.filter((obj) => selectedIds.includes(obj.id));

  if (selectedObjects.length === 0) {
    return (
      <div className="w-full h-full bg-background p-4 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <span className="text-lg mb-2">📋</span>
        Select an object to edit properties
        <span className="text-xs mt-2 opacity-50">Click on any symbol or wire</span>
      </div>
    );
  }

  const firstObj = selectedObjects[0];
  const isWire = firstObj.type === "wire";
  const wireObj = isWire ? (firstObj as WireObject) : null;
  const isSymbol = firstObj.type === "symbol";
  const symObj = isSymbol ? (firstObj as SymbolObject) : null;
  const symDef = symObj ? symbolRegistry[symObj.symbolId] : null;

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="p-4 border-b font-semibold text-sm flex items-center justify-between">
        <span>Properties</span>
        {selectedObjects.length === 1 && (
          <span className="text-[10px] text-muted-foreground font-normal">{firstObj.id.slice(0, 8)}</span>
        )}
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto text-sm pb-20">
        {selectedObjects.length === 1 && (
          <div className="space-y-4">
            {/* Type & Symbol Info */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Type</span>
              <span className="font-medium">{symDef?.displayName || firstObj.type}</span>
              {symDef && <span className="text-xs text-muted-foreground">{symDef.category}</span>}
            </div>

            {/* Position */}
            {(isSymbol || firstObj.type === "text") && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Position</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="flex border rounded overflow-hidden text-sm">
                    <span className="bg-muted px-2 py-1 text-muted-foreground border-r text-xs">X</span>
                    <span className="px-2 py-1 flex-1 bg-background">{Math.round(firstObj.x)}</span>
                  </div>
                  <div className="flex border rounded overflow-hidden text-sm">
                    <span className="bg-muted px-2 py-1 text-muted-foreground border-r text-xs">Y</span>
                    <span className="px-2 py-1 flex-1 bg-background">{Math.round(firstObj.y)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rotation */}
            {isSymbol && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Rotation</span>
                <span className="text-sm">{firstObj.rotation || 0}°</span>
              </div>
            )}

            {/* ─── Symbol Electrical Properties ─── */}
            {isSymbol && symObj && (
              <>
                {/* Label */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Label / Tag</span>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                    defaultValue={(symObj as any).label || ""}
                    placeholder="e.g. CB-01, M1"
                    onBlur={(e) => updateObject(firstObj.id, { label: e.target.value } as any)}
                  />
                </div>

                {/* Rated Power (for motors, VFDs, generators) */}
                {["motor", "generator", "vfd", "wind_turbine"].includes(symObj.symbolId) && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Rated Power</span>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                        defaultValue={(symObj as any).ratedPower || ""}
                        placeholder="kW"
                        onBlur={(e) => updateObject(firstObj.id, { ratedPower: parseFloat(e.target.value) || 0 } as any)}
                      />
                      <span className="flex items-center text-xs text-muted-foreground px-1">kW</span>
                    </div>
                  </div>
                )}

                {/* Rated Current (CB, contactors, fuses) */}
                {["circuit_breaker", "contactor", "fuse", "disconnect_switch", "overload_relay", "differential_switch", "ats", "switch_disconnector", "fuse_disconnector"].includes(symObj.symbolId) && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Rated Current</span>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                        defaultValue={(symObj as any).ratedCurrent || ""}
                        placeholder="A"
                        onBlur={(e) => updateObject(firstObj.id, { ratedCurrent: parseFloat(e.target.value) || 0 } as any)}
                      />
                      <span className="flex items-center text-xs text-muted-foreground px-1">A</span>
                    </div>
                  </div>
                )}

                {/* Voltage */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Voltage</span>
                  <select
                    className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                    defaultValue={(symObj as any).voltage || ""}
                    onChange={(e) => updateObject(firstObj.id, { voltage: e.target.value } as any)}
                  >
                    <option value="">— Select —</option>
                    {VOLTAGES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>

                {/* Transformer Ratio */}
                {["transformer", "current_transformer", "potential_transformer"].includes(symObj.symbolId) && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Ratio</span>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                      defaultValue={(symObj as any).ratio || ""}
                      placeholder={symObj.symbolId === "current_transformer" ? "e.g. 200/5A" : "e.g. 22/0.4kV"}
                      onBlur={(e) => updateObject(firstObj.id, { ratio: e.target.value } as any)}
                    />
                  </div>
                )}

                {/* Cable Size */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Cable Size</span>
                  <select
                    className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                    defaultValue={(symObj as any).cableSize || ""}
                    onChange={(e) => updateObject(firstObj.id, { cableSize: e.target.value } as any)}
                  >
                    <option value="">— Select —</option>
                    {CABLE_SIZES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Notes</span>
                  <textarea
                    className="w-full border rounded px-2 py-1.5 text-sm bg-background min-h-[60px] resize-none"
                    defaultValue={(symObj as any).notes || ""}
                    placeholder="Add notes..."
                    rows={2}
                    onBlur={(e) => updateObject(firstObj.id, { notes: e.target.value } as any)}
                  />
                </div>
              </>
            )}

            {/* Wire Styling */}
            {isWire && wireObj && (
              <>
                {/* Wire Label */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Wire Label</span>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                    defaultValue={(wireObj as any).label || ""}
                    placeholder="e.g. L1, N, PE, W1"
                    onBlur={(e) => updateObject(firstObj.id, { label: e.target.value } as any)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Wire Color</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {WIRE_COLORS.map((c) => (
                      <button
                        key={c.value}
                        title={c.label}
                        onClick={() => updateObject(firstObj.id, { color: c.value } as any)}
                        className={`h-7 rounded-md border-2 transition-all ${
                          wireObj.color === c.value
                            ? "border-primary ring-2 ring-primary/30 scale-110"
                            : "border-border hover:border-muted-foreground"
                        }`}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Thickness</span>
                  <div className="flex gap-1.5">
                    {WIRE_THICKNESSES.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => updateObject(firstObj.id, { thickness: t.value } as any)}
                        className={`flex-1 px-2 py-1.5 text-xs rounded-md border transition-all ${
                          wireObj.thickness === t.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted border-border hover:border-muted-foreground"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cable Size for Wire */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Cable Size</span>
                  <select
                    className="w-full border rounded px-2 py-1.5 text-sm bg-background"
                    defaultValue={(wireObj as any).cableSize || ""}
                    onChange={(e) => updateObject(firstObj.id, { cableSize: e.target.value } as any)}
                  >
                    <option value="">— Select —</option>
                    {CABLE_SIZES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {selectedObjects.length > 1 && (
          <div className="text-sm">
            <span className="font-medium">{selectedObjects.length}</span> objects selected
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-3 border-t space-y-2">
        {selectedObjects.length === 1 && isSymbol && (
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs" onClick={rotateSelected} title="Rotate 90° (R)">
              <RotateCw className="w-3.5 h-3.5" /> 90°
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs" onClick={flipSelectedH} title="Flip H">
              <FlipHorizontal className="w-3.5 h-3.5" /> H
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs" onClick={flipSelectedV} title="Flip V">
              <FlipVertical className="w-3.5 h-3.5" /> V
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive/10" onClick={() => deleteObjects(selectedIds)}>
            <Trash className="w-4 h-4" /> Delete
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => duplicateSelected()}>
            <Copy className="w-4 h-4" /> Duplicate
          </Button>
        </div>
      </div>
    </div>
  );
};
