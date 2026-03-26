"use client";

import { useState } from "react";
import { X, Bitcoin, ArrowRightLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BlockchainP2PEnergy = ({ onClose }: { onClose: () => void }) => {
  const [trading, setTrading] = useState(false);

  return (
    <div className="absolute top-[20%] right-[10%] w-[320px] bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-amber-500/10 font-semibold text-xs text-amber-600">
        <div className="flex items-center gap-2">
          <Bitcoin className="w-4 h-4" /> Blockchain P2P Energy Trading
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground">
          Deploy ERC-20 Smart Contracts to simulate peer-to-peer microgrid energy trading. Tokens are minted per kWh produced by Solar PV arrays.
        </div>

        {!trading ? (
          <Button className="w-full text-xs h-8 bg-amber-500 hover:bg-amber-600 shadow-none text-white font-medium" onClick={() => setTrading(true)}>
            Initialize Energy Token Ledger
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="bg-green-50 text-green-700 border border-green-200 p-1.5 text-[10px] rounded flex items-center justify-center font-medium gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Blockchain Network Synchronized
            </div>
            
            <div className="border rounded bg-muted/20 p-2 font-mono text-[9px] space-y-1.5">
              <div className="text-muted-foreground mb-1 font-bold">LIVE TRANSACTIONS</div>
              <div className="flex justify-between items-center bg-background px-1 border-l-2 border-green-500">
                <span>[TxHash: 0x8f...2A]</span>
                <span className="flex items-center"><ArrowRightLeft className="w-2 h-2 mx-1"/> Solar_01 ➔ Factory_B</span>
                <span className="text-green-600 font-bold">+45 kWh</span>
              </div>
              <div className="flex justify-between items-center bg-background px-1 border-l-2 border-green-500">
                <span>[TxHash: 0x3b...9C]</span>
                <span className="flex items-center"><ArrowRightLeft className="w-2 h-2 mx-1"/> BESS_02 ➔ EV_Fleet</span>
                <span className="text-green-600 font-bold">+120 kWh</span>
              </div>
              <div className="text-amber-500 mt-2 text-center animate-pulse">Waiting for next block...</div>
            </div>
            
            <Button variant="outline" className="w-full text-xs h-7 mt-2" onClick={() => setTrading(false)}>Stop Ledger</Button>
          </div>
        )}
      </div>
    </div>
  );
};
