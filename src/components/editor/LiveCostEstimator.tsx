"use client";

import { useState } from "react";
import { X, CircleDollarSign, TrendingUp, RefreshCcw } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";

export const LiveCostEstimator = ({ onClose }: { onClose: () => void }) => {
  const { canvas } = useEditorStore();
  const [isUpdating, setIsUpdating] = useState(false);

  // Fake logic to count pricing based on objects
  let basePrice = 0;
  let wireLength = 0;
  
  canvas.objects.forEach(obj => {
    if (obj.type === 'symbol') {
      basePrice += 15000; // avg switchgear component price THB
    } else if (obj.type === 'wire') {
      wireLength += 5; // avg 5 meters
    }
  });

  const [copperPrice] = useState(315.40); // THB/kg
  const cablePrice = wireLength * (copperPrice * 0.4); 
  const totalRaw = basePrice + cablePrice;
  const markup = totalRaw * 0.15; // 15% margin
  const vat = (totalRaw + markup) * 0.07;
  const grandTotal = totalRaw + markup + vat;

  const refreshMarket = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 1000);
  };

  const formatB = (num: number) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="absolute top-20 right-4 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-green-500/10 font-semibold text-xs text-green-700 dark:text-green-500">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-4 h-4" /> Live Cost Estimator 
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refreshMarket} className={isUpdating ? "animate-spin text-green-600" : "text-muted-foreground hover:text-green-600"} title="Update market prices"><RefreshCcw className="w-3.5 h-3.5" /></button>
          <button onClick={onClose}><X className="w-3.5 h-3.5 hover:text-red-500 text-muted-foreground" /></button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-3 bg-muted/30 p-1.5 rounded">
          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-red-500" /> LME Copper Price (Live):</span>
          <span className="font-bold">{copperPrice.toFixed(2)} THB/kg</span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between py-1 border-b border-dashed">
            <span>Equipment ({canvas.objects.filter(o => o.type === 'symbol').length} items)</span>
            <span className="font-mono">{formatB(basePrice)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed">
            <span>Power Cables (~{wireLength}m)</span>
            <span className="font-mono">{formatB(cablePrice)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed">
            <span>Labor & Margin (15%)</span>
            <span className="font-mono text-muted-foreground">{formatB(markup)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed">
            <span>VAT (7%)</span>
            <span className="font-mono text-muted-foreground">{formatB(vat)}</span>
          </div>
          
          <div className="flex justify-between py-2 text-sm font-black mt-2 bg-green-500/10 px-2 rounded-md text-green-700 dark:text-green-400">
            <span>Grand Total:</span>
            <span>{formatB(grandTotal)}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-7">Export Excel</Button>
          <Button size="sm" className="flex-1 text-xs h-7 bg-green-600 hover:bg-green-700">Issue Quotation</Button>
        </div>
      </div>
    </div>
  );
};
