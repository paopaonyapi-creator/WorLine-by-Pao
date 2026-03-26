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
    // --- New IEC Symbols ---
    case "switch_disconnector":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="22" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="18" y1="18" x2="22" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="20" y1="18" x2="22" y2="16" stroke={stroke} strokeWidth={sw} /></svg>;
    case "earthing_disconnector":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="20" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="8" y1="18" x2="20" y2="18" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="21" x2="18" y2="21" stroke={stroke} strokeWidth={sw} /><line x1="12" y1="24" x2="16" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "plug_in_switch":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><circle cx="11" cy="14" r="2" stroke={stroke} strokeWidth={sw} /><circle cx="17" cy="14" r="2" stroke={stroke} strokeWidth={sw} /><line x1="11" y1="10" x2="17" y2="18" stroke={stroke} strokeWidth={sw} /></svg>;
    case "differential_switch":
      return <svg {...common}><rect x="6" y="6" width="16" height="12" stroke={stroke} strokeWidth={sw} /><line x1="8" y1="10" x2="20" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="8" y1="14" x2="20" y2="10" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="22" r="3" stroke={stroke} strokeWidth={sw} /></svg>;
    case "fuse_disconnector":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="8" x2="20" y2="13" stroke={stroke} strokeWidth={sw} /><rect x="10" y="14" width="8" height="8" rx="1" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="22" x2="14" y2="26" stroke={stroke} strokeWidth={sw} /></svg>;
    case "disconnect_fuse_switch":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="8" x2="20" y2="14" stroke={stroke} strokeWidth={sw} /><rect x="10" y="16" width="8" height="6" rx="1" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="22" x2="14" y2="26" stroke={stroke} strokeWidth={sw} /></svg>;
    case "contactor_coil":
      return <svg {...common}><circle cx="14" cy="10" r="6" stroke={stroke} strokeWidth={sw} /><text x="14" y="14" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">K</text><rect x="8" y="18" width="12" height="5" stroke={stroke} strokeWidth={sw} /></svg>;
    case "thermal_protection":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="bold">θ</text></svg>;
    case "magnetic_protection":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="bold">I&gt;</text></svg>;
    case "instantaneous_overcurrent":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">I&gt;&gt;</text></svg>;
    case "relay_coil":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" stroke={stroke} strokeWidth={sw} /><polyline points="9,14 12,9 16,19 19,14" stroke={stroke} strokeWidth={sw} fill="none" /></svg>;
    case "timer_relay":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">T</text></svg>;
    case "voltmeter":
      return <svg {...common}><circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">V</text></svg>;
    case "frequency_meter":
      return <svg {...common}><circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">Hz</text></svg>;
    default:
      return <svg {...common}><rect x="6" y="6" width="16" height="16" stroke={stroke} strokeWidth={sw} /></svg>;
  }
}

import { useEditorStore } from "@/store/editorStore";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Bookmark, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type UserSymbol = {
  id: string;
  name: string;
  symbol_data: any;
};

export const Palette = ({ onClose }: { onClose?: () => void }) => {
  const { addObject, panX, panY, zoom, selectedIds, canvas } = useEditorStore();
  const [userSymbols, setUserSymbols] = useState<UserSymbol[]>([]);
  const supabase = createClient();

  // Load user's custom symbols
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("user_symbols")
        .select("id, name, symbol_data")
        .order("created_at", { ascending: false });
      if (data) setUserSymbols(data);
    };
    load();
  }, []);
  const handleAddCenter = (symbolId: string) => {
    // Capture current viewport state NOW (from React hook) before sheet closes
    const capturedPanX  = panX;
    const capturedPanY  = panY;
    const capturedZoom  = zoom || 1;

    const def = symbolRegistry[symbolId];
    if (!def) return;

    // Correct formula: convert viewport center → canvas coordinate space
    // canvas_coord = (viewport_center - pan_offset) / zoom
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = Math.round((vw / 2 - capturedPanX) / capturedZoom - def.width  / 2);
    const cy = Math.round((vh / 2 - capturedPanY) / capturedZoom - def.height / 2);

    addObject({
      type: "symbol",
      symbolId,
      x: cx,
      y: cy,
      rotation: 0,
      zIndex: canvas.objects.length + 1,
      width: def.width,
      height: def.height,
      label: def.customData?.label || "",
      connections: [],
    } as any);

    // Close sheet after adding (on mobile)
    if (onClose) onClose();
  };

  const handleSaveToLibrary = async () => {
    if (selectedIds.length === 0) {
      toast.error("Select objects first");
      return;
    }
    const name = prompt("Name for this group:");
    if (!name) return;

    const selectedObjs = canvas.objects.filter(o => selectedIds.includes(o.id));
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Not logged in"); return; }

    const { error } = await supabase.from("user_symbols").insert({
      user_id: user.id,
      name,
      symbol_data: selectedObjs,
    });

    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success(`"${name}" saved to My Library!`);
      // Reload
      const { data } = await supabase.from("user_symbols").select("id, name, symbol_data").order("created_at", { ascending: false });
      if (data) setUserSymbols(data);
    }
  };

  const handlePlaceUserSymbol = (us: UserSymbol) => {
    const canvasContainer = document.getElementById("canvas-container");
    const rect = canvasContainer?.getBoundingClientRect();
    const w = rect ? rect.width : window.innerWidth;
    const h = rect ? rect.height : window.innerHeight;
    const centerX = -panX / zoom + (w / 2) / zoom;
    const centerY = -panY / zoom + (h / 2) / zoom;

    const objs = us.symbol_data as any[];
    if (!Array.isArray(objs)) return;

    // Calculate bounding box
    let minX = Infinity, minY = Infinity;
    objs.forEach(o => { if (o.x < minX) minX = o.x; if (o.y < minY) minY = o.y; });

    objs.forEach(o => {
      addObject({
        ...o,
        id: uuidv4(),
        x: o.x - minX + centerX,
        y: o.y - minY + centerY,
      });
    });
    toast.success(`Placed "${us.name}"`);

    if (onClose) {
      onClose(); // Auto-close sheet on mobile
    }
  };

  const handleDeleteUserSymbol = async (id: string) => {
    const { error } = await supabase.from("user_symbols").delete().eq("id", id);
    if (!error) {
      setUserSymbols(prev => prev.filter(s => s.id !== id));
      toast.success("Deleted from library");
    }
  };

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Power Sources");

  const filteredSymbols = Object.values(symbolRegistry).filter((s) => {
    const matchCat = s.category === activeCategory;
    const matchSearch = search
      ? s.displayName.toLowerCase().includes(search.toLowerCase())
      : matchCat;
    return matchSearch;
  });

  const displayedSymbols = search ? Object.values(symbolRegistry).filter(s =>
    s.displayName.toLowerCase().includes(search.toLowerCase())
  ) : filteredSymbols;

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header with search */}
      <div className="p-3 border-b space-y-2 flex-none">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Symbol Library
          </span>
          {selectedIds.length > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1 px-2" onClick={handleSaveToLibrary}>
              <Plus className="h-3 w-3" /> Save
            </Button>
          )}
        </div>
        <input
          type="text"
          placeholder="🔍  Search symbols..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-xs rounded-md border bg-muted/30 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category tabs (horizontal scroll like IEC app) */}
      {!search && (
        <div className="flex-none overflow-x-auto border-b hide-scrollbar">
          <div className="flex gap-0.5 p-1 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-2.5 py-1 text-[10px] font-medium rounded whitespace-nowrap transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Symbol Grid */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* My Library */}
        {!search && userSymbols.length > 0 && activeCategory === categories[0] && (
          <div className="p-3 border-b space-y-2">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wide flex items-center gap-1">
              <Bookmark className="h-3 w-3" /> My Saved Groups
            </p>
            {userSymbols.map(us => (
              <div
                key={us.id}
                className="group flex items-center justify-between px-3 py-2 rounded-md border bg-card hover:border-primary cursor-pointer transition-all"
                onClick={() => handlePlaceUserSymbol(us)}
              >
                <span className="text-xs font-medium truncate">{us.name}</span>
                <button
                  className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); handleDeleteUserSymbol(us.id); }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Symbol cards - 3 column IEC-style grid */}
        <div className="grid grid-cols-3 gap-1.5 p-2">
          {displayedSymbols.map(sym => (
            <button
              key={sym.id}
              draggable
              onClick={() => handleAddCenter(sym.id)}
              onDragStart={(e) => {
                e.dataTransfer.setData("application/worline-symbol", sym.id);
                e.dataTransfer.effectAllowed = "copy";
              }}
              className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-95 transition-all cursor-pointer select-none"
              style={{ minHeight: "72px" }}
            >
              <div className="text-foreground scale-110">
                <SymbolMiniIcon symbolType={sym.symbolType} />
              </div>
              <span className="text-[9px] leading-tight text-center font-medium text-muted-foreground w-full truncate px-0.5">
                {sym.displayName}
              </span>
            </button>
          ))}
        </div>

        {displayedSymbols.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Zap className="h-8 w-8 mb-2 opacity-30" />
            <p className="text-xs">No symbols found</p>
          </div>
        )}
      </div>
    </div>
  );
};
