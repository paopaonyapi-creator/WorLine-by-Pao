import { useEditorStore } from "@/store/editorStore";
import { Copy, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PropertiesPanel = () => {
  const { selectedIds, canvas, deleteObjects, duplicateSelected } = useEditorStore();

  const selectedObjects = canvas.objects.filter((obj) => selectedIds.includes(obj.id));

  if (selectedObjects.length === 0) {
    return (
      <div className="w-64 flex-none border-l bg-background p-4 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        No object selected
      </div>
    );
  }

  const firstObj = selectedObjects[0];

  return (
    <div className="w-64 flex-none border-l bg-background flex flex-col">
      <div className="p-4 border-b font-semibold text-sm">
        Properties
      </div>
      <div className="p-4 space-y-4 flex-1">
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
