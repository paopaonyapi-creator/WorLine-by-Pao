import { symbolRegistry, categories } from "@/lib/editor/symbols/registry";
import { cn } from "@/lib/utils";
import { 
  Zap, ToggleRight, Activity, Lightbulb, Shield, Waypoints, 
  Gauge, Cpu, Brain, MonitorSmartphone, Rocket, PlayCircle, 
  ChevronRight, ArrowLeft, Bookmark, Trash2, Plus, Search 
} from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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

const CATEGORY_META: Record<string, { icon: any, color: string, desc: string }> = {
  "Power Sources": { icon: Zap, color: "text-amber-500", desc: "Generators, Batteries" },
  "Switchgear": { icon: ToggleRight, color: "text-blue-500", desc: "Breakers, Switches" },
  "Transformers": { icon: Activity, color: "text-emerald-500", desc: "Step-up, Isolation" },
  "Loads": { icon: Lightbulb, color: "text-orange-500", desc: "Motors, Lighting" },
  "Protection": { icon: Shield, color: "text-red-500", desc: "Relays, Surge" },
  "Connections": { icon: Waypoints, color: "text-slate-500", desc: "Busbars, Nodes" },
  "Metering": { icon: Gauge, color: "text-cyan-500", desc: "Voltmeters, Ammeters" },
  "Core Systems": { icon: Cpu, color: "text-indigo-500", desc: "Logic, Analysis" },
  "AI Engines": { icon: Brain, color: "text-violet-500", desc: "Automation, Predict" },
  "SCADA Modules": { icon: MonitorSmartphone, color: "text-sky-500", desc: "PLC, HMI, RTU" },
  "Future Tech": { icon: Rocket, color: "text-pink-500", desc: "Microgrids, Nano" },
  "Simulators": { icon: PlayCircle, color: "text-teal-500", desc: "Faults, Weather" },
  "Utility Nodes": { icon: Waypoints, color: "text-gray-500", desc: "BOM, Export, Tools" },
};

type UserSymbol = {
  id: string;
  name: string;
  symbol_data: any;
};

export const Palette = ({ onClose }: { onClose?: () => void }) => {
  const { addObject, panX, panY, zoom, selectedIds, canvas } = useEditorStore();
  const [userSymbols, setUserSymbols] = useState<UserSymbol[]>([]);
  const supabase = createClient();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("user_symbols")
        .select("id, name, symbol_data")
        .order("created_at", { ascending: false });
      if (data) setUserSymbols(data);
    };
    load();
  }, [supabase]);

  const handleAddCenter = (symbolId: string) => {
    const capturedPanX  = panX;
    const capturedPanY  = panY;
    const capturedZoom  = zoom || 1;

    const def = symbolRegistry[symbolId];
    if (!def) return;

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

    if (onClose) onClose();
  };

  const handleDeleteUserSymbol = async (id: string) => {
    const { error } = await supabase.from("user_symbols").delete().eq("id", id);
    if (!error) {
      setUserSymbols(prev => prev.filter(s => s.id !== id));
      toast.success("Deleted from library");
    }
  };

  const displayedSymbols = search 
    ? Object.values(symbolRegistry).filter(s => s.displayName.toLowerCase().includes(search.toLowerCase()))
    : activeCategory 
      ? Object.values(symbolRegistry).filter(s => s.category === activeCategory)
      : [];

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      
      {/* Search Header (Always visible) */}
      <div className="p-3 border-b space-y-3 flex-none bg-card/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Symbol Library
          </span>
          {selectedIds.length > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1 px-2" onClick={handleSaveToLibrary}>
              <Plus className="h-3 w-3" /> Save Selection
            </Button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search 100+ symbols..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md border bg-muted/30 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        
        {/* --- STATE 1: SEARCH RESULTS --- */}
        {search && (
          <div className="p-2 animate-in fade-in duration-200">
            <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">Search Results</p>
            <div className="grid grid-cols-3 gap-2">
              {displayedSymbols.map(sym => (
                <SymbolButton key={sym.id} sym={sym} onClick={() => handleAddCenter(sym.id)} />
              ))}
            </div>
            {displayedSymbols.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <p className="text-sm">No symbols found for "{search}"</p>
              </div>
            )}
          </div>
        )}

        {/* --- STATE 2: CATEGORY DRILL-DOWN --- */}
        {!search && activeCategory && (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-200">
            <div className="sticky top-0 bg-background/95 backdrop-blur z-10 flex items-center p-2 border-b">
              <Button variant="ghost" size="sm" className="gap-1 h-8 px-2" onClick={() => setActiveCategory(null)}>
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">{activeCategory}</span>
              </Button>
            </div>
            <div className="p-2">
              <div className="grid grid-cols-3 gap-2">
                {displayedSymbols.map(sym => (
                  <SymbolButton key={sym.id} sym={sym} onClick={() => handleAddCenter(sym.id)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- STATE 3: HOME DASHBOARD --- */}
        {!search && !activeCategory && (
          <div className="p-3 space-y-6 animate-in slide-in-from-left-4 duration-200">
            
            {/* My Library */}
            {userSymbols.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide flex items-center gap-1.5 px-1">
                  <Bookmark className="h-3.5 w-3.5" /> My Saved Groups
                </p>
                <div className="space-y-1">
                  {userSymbols.map(us => (
                    <div
                      key={us.id}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-lg border bg-card hover:bg-muted/50 hover:border-primary/50 cursor-pointer transition-all"
                      onClick={() => handlePlaceUserSymbol(us)}
                    >
                      <span className="text-sm font-medium truncate">{us.name}</span>
                      <button
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity p-1 rounded-md hover:bg-destructive/10"
                        onClick={(e) => { e.stopPropagation(); handleDeleteUserSymbol(us.id); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories List */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide px-1">
                Library Categories
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categories.map(cat => {
                  const count = Object.values(symbolRegistry).filter(s => s.category === cat).length;
                  if (count === 0) return null;
                  
                  const meta = CATEGORY_META[cat] || { icon: Zap, color: "text-foreground", desc: "" };
                  const Icon = meta.icon;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="flex items-center text-left p-3 rounded-xl border bg-card hover:bg-muted/40 hover:border-primary/50 transition-all group"
                    >
                      <div className={cn("p-2 rounded-lg bg-muted group-hover:bg-background transition-colors mr-3", meta.color)}>
                        <Icon strokeWidth={2} className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{cat}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{meta.desc}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-medium text-muted-foreground">
                          {count}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for the symbol icon button
function SymbolButton({ sym, onClick }: { sym: any, onClick: () => void }) {
  return (
    <button
      draggable
      onClick={onClick}
      onDragStart={(e) => {
        e.dataTransfer.setData("application/worline-symbol", sym.id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-95 transition-all cursor-pointer select-none"
      style={{ minHeight: "84px" }}
    >
      <div className="text-foreground scale-125">
        <SymbolMiniIcon symbolType={sym.symbolType} />
      </div>
      <span className="text-[10px] leading-tight text-center font-medium text-muted-foreground w-full truncate px-0.5">
        {sym.displayName}
      </span>
    </button>
  );
}
