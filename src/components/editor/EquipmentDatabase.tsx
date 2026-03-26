"use client";

import { useState } from "react";
import { X, Database, Search, Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

type Equipment = {
  id: string;
  brand: string;
  model: string;
  category: string;
  rating: string;
  voltage: string;
  breaking: string;
  price?: string;
};

const EQUIPMENT_DB: Equipment[] = [
  // Schneider
  { id: "sch-1", brand: "Schneider", model: "NSX100F", category: "MCCB", rating: "100A", voltage: "690V", breaking: "36kA", price: "~$280" },
  { id: "sch-2", brand: "Schneider", model: "NSX250F", category: "MCCB", rating: "250A", voltage: "690V", breaking: "36kA", price: "~$450" },
  { id: "sch-3", brand: "Schneider", model: "iC60N", category: "MCB", rating: "63A", voltage: "440V", breaking: "6kA", price: "~$25" },
  { id: "sch-4", brand: "Schneider", model: "LC1D09", category: "Contactor", rating: "9A", voltage: "660V", breaking: "", price: "~$35" },
  { id: "sch-5", brand: "Schneider", model: "ATV320", category: "VFD", rating: "7.5kW", voltage: "400V", breaking: "", price: "~$800" },
  { id: "sch-6", brand: "Schneider", model: "Acti9 A9F74206", category: "MCB", rating: "6A", voltage: "440V", breaking: "10kA", price: "~$15" },
  // ABB
  { id: "abb-1", brand: "ABB", model: "Tmax XT1", category: "MCCB", rating: "160A", voltage: "690V", breaking: "36kA", price: "~$320" },
  { id: "abb-2", brand: "ABB", model: "Tmax XT4", category: "MCCB", rating: "250A", voltage: "690V", breaking: "36kA", price: "~$580" },
  { id: "abb-3", brand: "ABB", model: "S201", category: "MCB", rating: "16A", voltage: "440V", breaking: "6kA", price: "~$12" },
  { id: "abb-4", brand: "ABB", model: "AF09-30", category: "Contactor", rating: "9A", voltage: "690V", breaking: "", price: "~$30" },
  { id: "abb-5", brand: "ABB", model: "ACS580", category: "VFD", rating: "11kW", voltage: "400V", breaking: "", price: "~$1100" },
  // Siemens
  { id: "sie-1", brand: "Siemens", model: "3VA1", category: "MCCB", rating: "160A", voltage: "690V", breaking: "36kA", price: "~$350" },
  { id: "sie-2", brand: "Siemens", model: "5SY6", category: "MCB", rating: "32A", voltage: "440V", breaking: "6kA", price: "~$18" },
  { id: "sie-3", brand: "Siemens", model: "3RT2015", category: "Contactor", rating: "7A", voltage: "690V", breaking: "", price: "~$28" },
  { id: "sie-4", brand: "Siemens", model: "SINAMICS V20", category: "VFD", rating: "5.5kW", voltage: "400V", breaking: "", price: "~$650" },
  // Eaton
  { id: "eat-1", brand: "Eaton", model: "NZM1", category: "MCCB", rating: "160A", voltage: "690V", breaking: "50kA", price: "~$380" },
  { id: "eat-2", brand: "Eaton", model: "FAZ-C16", category: "MCB", rating: "16A", voltage: "440V", breaking: "10kA", price: "~$14" },
];

export const EquipmentDatabase = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterCat, setFilterCat] = useState("all");

  const filtered = EQUIPMENT_DB.filter(e => {
    if (filterBrand !== "all" && e.brand !== filterBrand) return false;
    if (filterCat !== "all" && e.category !== filterCat) return false;
    if (query) {
      const q = query.toLowerCase();
      return e.model.toLowerCase().includes(q) || e.brand.toLowerCase().includes(q) || e.rating.toLowerCase().includes(q);
    }
    return true;
  });

  const brands = [...new Set(EQUIPMENT_DB.map(e => e.brand))];
  const cats = [...new Set(EQUIPMENT_DB.map(e => e.category))];

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Database className="h-4 w-4 text-emerald-500" />
          Equipment Database ({EQUIPMENT_DB.length} items)
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-3 border-b bg-muted/10">
        <div className="relative flex-1">
          <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search model, brand..." className="pl-7 h-7 text-xs" />
        </div>
        <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="h-7 text-xs border rounded px-2 bg-background">
          <option value="all">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="h-7 text-xs border rounded px-2 bg-background">
          <option value="all">All Types</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/30 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left">Brand</th>
              <th className="px-3 py-2 text-left">Model</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Rating</th>
              <th className="px-3 py-2">Voltage</th>
              <th className="px-3 py-2">Breaking</th>
              <th className="px-3 py-2">Est. Price</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-t hover:bg-muted/10 transition-colors">
                <td className="px-3 py-1.5 font-medium">{e.brand}</td>
                <td className="px-3 py-1.5 font-mono text-[10px]">{e.model}</td>
                <td className="px-3 py-1.5 text-center">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted">{e.category}</span>
                </td>
                <td className="px-3 py-1.5 text-center font-medium">{e.rating}</td>
                <td className="px-3 py-1.5 text-center">{e.voltage}</td>
                <td className="px-3 py-1.5 text-center">{e.breaking || "—"}</td>
                <td className="px-3 py-1.5 text-center text-muted-foreground">{e.price || "—"}</td>
                <td className="px-3 py-1.5">
                  <Button variant="ghost" size="sm" className="h-5 text-[9px]" onClick={() => {
                    navigator.clipboard.writeText(`${e.brand} ${e.model} ${e.rating}`);
                    toast.success(`Copied: ${e.model}`);
                  }}>
                    <Copy className="h-2.5 w-2.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2 border-t text-[9px] text-muted-foreground text-center">
        Showing {filtered.length} of {EQUIPMENT_DB.length} • Schneider / ABB / Siemens / Eaton
      </div>
    </div>
  );
};
