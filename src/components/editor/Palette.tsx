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
import { useLocale } from "@/lib/i18n/useLocale";
import { SymbolMiniIcon, SymbolButton } from "./SymbolMiniIcon";

const CATEGORY_META: Record<string, { icon: any, color: string, desc: string }> = {
  "Power Sources": { icon: Zap, color: "text-amber-500", desc: "PV, Batteries, Fuel Cells" },
  "Transformers": { icon: Activity, color: "text-emerald-500", desc: "Step-up, PT/CT, Zig-Zag" },
  "Motors and Generators": { icon: Cpu, color: "text-indigo-500", desc: "Sync, Async, DC, Stepper" },
  "Connections and Lines": { icon: Waypoints, color: "text-slate-500", desc: "Lines, Wires, Busbars" },
  "Switches and Disconnectors": { icon: ToggleRight, color: "text-blue-500", desc: "LBS, Disconnectors, ATS" },
  "Breakers and Protection": { icon: Shield, color: "text-red-500", desc: "ACB, VCB, MCB, RCD, SPD" },
  "Fuses": { icon: Zap, color: "text-orange-500", desc: "Inline, Link, Disconnectors" },
  "Relays and Contactors": { icon: Brain, color: "text-violet-500", desc: "Relays, Contactors, Coils" },
  "Metering": { icon: Gauge, color: "text-cyan-500", desc: "Amps, Volts, kW, Smart Meter" },
  "Indicators and Lamps": { icon: Lightbulb, color: "text-yellow-500", desc: "Lamps, Resistors, VFD" },
  "Terminals and Connectors": { icon: Waypoints, color: "text-gray-500", desc: "Blocks, Plugs, Sockets" },
};

type UserSymbol = {
  id: string;
  name: string;
  symbol_data: any;
};

export const Palette = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useLocale();
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
      toast.error(t("toast_select_first"));
      return;
    }
    const name = prompt(t("toast_name_group"));
    if (!name) return;

    const selectedObjs = canvas.objects.filter(o => selectedIds.includes(o.id));
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error(t("toast_not_logged_in")); return; }

    const { error } = await supabase.from("user_symbols").insert({
      user_id: user.id,
      name,
      symbol_data: selectedObjs,
    });

    if (error) {
      toast.error(t("toast_save_group_failed") + error.message);
    } else {
      toast.success(`"${name}" ${t("toast_saved_library")}`);
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
    toast.success(`${t("toast_placed")} "${us.name}"`);

    if (onClose) onClose();
  };

  const handleDeleteUserSymbol = async (id: string) => {
    const { error } = await supabase.from("user_symbols").delete().eq("id", id);
    if (!error) {
      setUserSymbols(prev => prev.filter(s => s.id !== id));
      toast.success(t("toast_deleted_library"));
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
            {t("palette_title")}
          </span>
          {selectedIds.length > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1 px-2" onClick={handleSaveToLibrary}>
              <Plus className="h-3 w-3" /> {t("palette_save_selection")}
            </Button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("palette_search")}
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
            <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">{t("palette_search_results")}</p>
            <div className="grid grid-cols-3 gap-2">
              {displayedSymbols.map(sym => (
                <SymbolButton key={sym.id} sym={sym} onClick={() => handleAddCenter(sym.id)} />
              ))}
            </div>
            {displayedSymbols.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <p className="text-sm">{t("palette_no_results")} "{search}"</p>
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
              <div className="grid grid-cols-2 gap-2">
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
                  <Bookmark className="h-3.5 w-3.5" /> {t("palette_my_saved")}
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
                {t("palette_categories")}
              </p>
              <div className="grid grid-cols-1 gap-2">
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


