"use client";

import { useState } from "react";
import { X, Wifi, DatabaseZap, PowerOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const IoTMqttBinding = ({ onClose }: { onClose: () => void }) => {
  const [broker, setBroker] = useState("mqtt://broker.hivemq.com");
  const [port, setPort] = useState(1883);
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");

  const connect = () => {
    setStatus("connecting");
    setTimeout(() => {
      setStatus("connected");
    }, 1500);
  };

  return (
    <div className="absolute top-28 right-24 w-80 bg-background border rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-cyan-500/10 font-semibold text-xs text-cyan-600 dark:text-cyan-400">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" /> IoT / MQTT Data Binding
        </div>
        <button onClick={onClose}><X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" /></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="text-[10px] text-muted-foreground leading-tight">
          Bind digital twin elements to real-time industrial sensors via MQTT. Supports AWS IoT Core, Mosquitto, HiveMQ.
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-[10px] text-muted-foreground p-0.5">Broker URL</label>
            <Input className="h-7 text-xs font-mono" value={broker} onChange={e => setBroker(e.target.value)} disabled={status !== 'disconnected'} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-muted-foreground p-0.5">Port</label>
              <Input type="number" className="h-7 text-xs font-mono" value={port} onChange={e => setPort(+e.target.value)} disabled={status !== 'disconnected'} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground p-0.5">Topic Prefix</label>
              <Input className="h-7 text-xs font-mono" defaultValue="worline/plant1/" disabled={status !== 'disconnected'} />
            </div>
          </div>
        </div>

        {status === "disconnected" ? (
          <Button className="w-full text-xs h-8 bg-cyan-600 hover:bg-cyan-700 font-medium shadow-none" onClick={connect}>
            <DatabaseZap className="w-3.5 h-3.5 mr-2" /> Connect Broker
          </Button>
        ) : status === "connecting" ? (
          <Button disabled className="w-full text-xs h-8 bg-cyan-600/50 text-white">
            <span className="animate-spin w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full mr-2" /> Establishing...
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-500/10 text-green-600 border border-green-500/30 rounded text-[10px] font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Connected to HiveMQ</span>
            </div>
            <div className="border rounded p-2 text-[10px]">
              <div className="font-semibold mb-1">Live Subscriptions:</div>
              <ul className="text-muted-foreground list-disc pl-4">
                <li>ACB_Main/Current (1204 A)</li>
                <li>TR_01/OilTemp (64 °C)</li>
                <li>MDB_05/Status (CLOSED)</li>
              </ul>
            </div>
            <Button variant="destructive" className="w-full text-xs h-7 shadow-none" onClick={() => setStatus("disconnected")}>
              <PowerOff className="w-3.5 h-3.5 mr-2" /> Disconnect
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
