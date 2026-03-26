import { symbolRegistry, categories } from "@/lib/editor/symbols/registry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

// Mini SVG icons for each symbol type
function SymbolMiniIcon({ symbolType }: { symbolType: string }) {
  const size = 28;
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  const stroke = "currentColor";
  const sw = 1.5;

  switch (symbolType) {
    case "generator":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">G</text></svg>;
    case "motor":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">M</text></svg>;
    case "battery":
      return <svg {...common}><line x1="10" y1="8" x2="18" y2="8" stroke={stroke} strokeWidth={2.5} /><line x1="12" y1="12" x2="16" y2="12" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="16" x2="18" y2="16" stroke={stroke} strokeWidth={2.5} /><line x1="12" y1="20" x2="16" y2="20" stroke={stroke} strokeWidth={sw} /></svg>;
    case "solar_panel":
      return <svg {...common}><rect x="4" y="6" width="20" height="16" rx="1" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="6" x2="14" y2="22" stroke={stroke} strokeWidth={sw} /><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /></svg>;
    case "circuit_breaker":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="20" y2="18" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="18" x2="18" y2="18" stroke={stroke} strokeWidth={sw} /></svg>;
    case "disconnect_switch":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="22" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "fuse":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw} /><rect x="10" y="8" width="8" height="12" rx="2" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="20" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "contactor":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">K</text></svg>;
    case "transformer":
      return <svg {...common}><circle cx="10" cy="11" r="5" stroke={stroke} strokeWidth={sw} /><circle cx="18" cy="17" r="5" stroke={stroke} strokeWidth={sw} /></svg>;
    case "current_transformer":
      return <svg {...common}><circle cx="14" cy="14" r="7" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">CT</text></svg>;
    case "resistor":
      return <svg {...common}><polyline points="4,14 7,8 11,20 15,8 19,20 23,8 26,14" stroke={stroke} strokeWidth={sw} fill="none" /></svg>;
    case "capacitor":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="6" y1="10" x2="22" y2="10" stroke={stroke} strokeWidth={2} /><line x1="6" y1="16" x2="22" y2="16" stroke={stroke} strokeWidth={2} /><line x1="14" y1="16" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "inductor":
      return <svg {...common}><path d="M4,14 Q7,6 10,14 Q13,22 16,14 Q19,6 22,14 Q25,22 26,14" stroke={stroke} strokeWidth={sw} fill="none" /></svg>;
    case "lamp":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw} /><line x1="8" y1="8" x2="20" y2="20" stroke={stroke} strokeWidth={sw} /><line x1="20" y1="8" x2="8" y2="20" stroke={stroke} strokeWidth={sw} /></svg>;
    case "relay":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="bold">R</text></svg>;
    case "surge_arrester":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><polyline points="8,10 14,22 20,10" stroke={stroke} strokeWidth={sw} fill="none" /><line x1="14" y1="22" x2="14" y2="26" stroke={stroke} strokeWidth={sw} /></svg>;
    case "busbar":
      return <svg {...common}><line x1="2" y1="14" x2="26" y2="14" stroke={stroke} strokeWidth={3} /></svg>;
    case "ground":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="6" y1="14" x2="22" y2="14" stroke={stroke} strokeWidth={2} /><line x1="9" y1="18" x2="19" y2="18" stroke={stroke} strokeWidth={2} /><line x1="12" y1="22" x2="16" y2="22" stroke={stroke} strokeWidth={2} /></svg>;
    case "junction":
      return <svg {...common}><circle cx="14" cy="14" r="4" fill={stroke} /></svg>;
    case "wind_turbine":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">WT</text></svg>;
    case "ats":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">ATS</text></svg>;
    case "potential_transformer":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="bold">PT</text></svg>;
    case "vfd":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="7" fontWeight="bold">VFD</text></svg>;
    case "overload_relay":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="bold">OL</text></svg>;
    case "power_meter":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">kW</text></svg>;
    case "ammeter":
      return <svg {...common}><circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">A</text></svg>;
    default:
      return <svg {...common}><rect x="6" y="6" width="16" height="16" stroke={stroke} strokeWidth={sw} /></svg>;
  }
}

import { useEditorStore } from "@/store/editorStore";

export const Palette = () => {
  const { addObject, panX, panY, zoom } = useEditorStore();

  const handleAddCenter = (symbolId: string) => {
    const canvasContainer = document.getElementById("canvas-container");
    const rect = canvasContainer?.getBoundingClientRect();
    const w = rect ? rect.width : window.innerWidth;
    const h = rect ? rect.height : window.innerHeight;

    const centerX = -panX / zoom + (w / 2) / zoom;
    const centerY = -panY / zoom + (h / 2) / zoom;

    const def = symbolRegistry[symbolId];
    if (!def) return;

    addObject({
      type: "symbol",
      symbolId,
      x: centerX - def.width / 2,
      y: centerY - def.height / 2,
      rotation: 0,
      zIndex: 1,
      connections: [],
    } as any);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
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
                      onClick={() => handleAddCenter(sym.id)}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("application/worline-symbol", sym.id);
                        e.dataTransfer.effectAllowed = "copy";
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-md border bg-card text-card-foreground shadow-sm cursor-grab active:cursor-grabbing hover:border-primary hover:shadow-md transition-all h-20"
                      )}
                    >
                      <div className="mb-1.5 text-foreground">
                        <SymbolMiniIcon symbolType={sym.symbolType} />
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

