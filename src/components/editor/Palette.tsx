import { symbolRegistry, categories } from "@/lib/editor/symbols/registry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export const Palette = () => {
  return (
    <div className="w-64 flex-none border-r bg-background flex flex-col">
      <div className="p-4 border-b font-semibold text-sm flex items-center gap-2">
        <Zap className="h-4 w-4" />
        Symbol Library
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {categories.map((cat) => {
            const symbols = Object.values(symbolRegistry).filter(s => s.category === cat);
            if (symbols.length === 0) return null;
            return (
              <div key={cat} className="space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">{cat}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {symbols.map(sym => (
                    <div
                      key={sym.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("application/unifilar-symbol", sym.id);
                        e.dataTransfer.effectAllowed = "copy";
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-md border bg-card text-card-foreground shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-colors h-20"
                      )}
                    >
                      <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center mb-2">
                        {/* Placeholder mini icon */}
                        <div className="w-4 h-4 border border-foreground bg-white" />
                      </div>
                      <span className="text-[10px] leading-tight text-center font-medium truncate w-full">{sym.displayName}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
