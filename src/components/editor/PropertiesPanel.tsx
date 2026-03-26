import { useEditorStore } from "@/store/editorStore";
import { Copy, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WireObject } from "@/lib/editor/types";

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

export const PropertiesPanel = () => {
  const { selectedIds, canvas, deleteObjects, duplicateSelected, updateObject } = useEditorStore();

  const selectedObjects = canvas.objects.filter((obj) => selectedIds.includes(obj.id));

  if (selectedObjects.length === 0) {
    return (
      <div className="w-full h-full bg-background p-4 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        No object selected
      </div>
    );
  }

  const firstObj = selectedObjects[0];
  const isWire = firstObj.type === "wire";
  const wireObj = isWire ? (firstObj as WireObject) : null;

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="p-4 border-b font-semibold text-sm">
        Properties
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-auto">
        {selectedObjects.length === 1 && (
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Type</span>
              <span className="text-sm">{firstObj.type}</span>
            </div>
            {firstObj.type === "symbol" && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Position</span>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex border rounded overflow-hidden text-sm">
                      <span className="bg-muted px-2 py-1 text-muted-foreground border-r">X</span>
                      <span className="px-2 py-1 flex-1 bg-background">{Math.round(firstObj.x)}</span>
                    </div>
                    <div className="flex border rounded overflow-hidden text-sm">
                      <span className="bg-muted px-2 py-1 text-muted-foreground border-r">Y</span>
                      <span className="px-2 py-1 flex-1 bg-background">{Math.round(firstObj.y)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Wire Styling */}
            {isWire && wireObj && (
              <>
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
              </>
            )}
          </div>
        )}

        {selectedObjects.length > 1 && (
          <div className="text-sm">
            {selectedObjects.length} objects selected
          </div>
        )}
      </div>

      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive/10" onClick={() => deleteObjects(selectedIds)}>
          <Trash className="w-4 h-4" /> Delete
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => duplicateSelected()}>
          <Copy className="w-4 h-4" /> Duplicate
        </Button>
      </div>
    </div>
  );
};
