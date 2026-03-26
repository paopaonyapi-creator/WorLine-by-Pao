"use client";

import { useState, useRef } from "react";
import { X, PenTool, Save, Circle, Square, Minus, Type, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type SVGPrimitive = {
  type: "rect" | "circle" | "line" | "text";
  x: number; y: number;
  w?: number; h?: number; r?: number;
  text?: string;
  stroke: string; fill: string;
};

export const SymbolEditorPro = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("Custom Symbol");
  const [primitives, setPrimitives] = useState<SVGPrimitive[]>([]);
  const [activePrim, setActivePrim] = useState<SVGPrimitive["type"]>("rect");
  const [stroke, setStroke] = useState("#000000");
  const [fill, setFill] = useState("none");
  const svgRef = useRef<SVGSVGElement>(null);

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round((e.clientX - rect.left) / rect.width * 100);
    const y = Math.round((e.clientY - rect.top) / rect.height * 100);

    const prim: SVGPrimitive = {
      type: activePrim,
      x, y,
      stroke, fill,
    };
    if (activePrim === "rect") { prim.w = 20; prim.h = 15; }
    if (activePrim === "circle") { prim.r = 10; }
    if (activePrim === "line") { prim.w = 30; }
    if (activePrim === "text") { prim.text = "T"; }

    setPrimitives(prev => [...prev, prim]);
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("worline-pro-symbols") || "[]");
    saved.push({
      id: `pro-${Date.now()}`,
      name,
      primitives,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("worline-pro-symbols", JSON.stringify(saved));
    toast.success(`Symbol "${name}" saved!`);
  };

  const handleExportSVG = () => {
    if (!svgRef.current) return;
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "_")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("SVG exported!");
  };

  return (
    <div className="absolute inset-4 z-50 bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-lg mx-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-violet-500/10 to-pink-500/10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <PenTool className="h-4 w-4 text-violet-500" />
          Symbol Editor Pro
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tools */}
        <div className="w-10 border-r flex flex-col items-center gap-1 py-2">
          {[
            { type: "rect" as const, icon: Square },
            { type: "circle" as const, icon: Circle },
            { type: "line" as const, icon: Minus },
            { type: "text" as const, icon: Type },
          ].map(t => (
            <Button
              key={t.type}
              variant={activePrim === t.type ? "secondary" : "ghost"}
              size="icon"
              className="w-7 h-7"
              onClick={() => setActivePrim(t.type)}
            >
              <t.icon className="h-3.5 w-3.5" />
            </Button>
          ))}
          <div className="w-full h-px bg-border my-1" />
          <input type="color" value={stroke} onChange={e => setStroke(e.target.value)} className="w-6 h-6 cursor-pointer rounded" title="Stroke" />
          <input type="color" value={fill === "none" ? "#ffffff" : fill} onChange={e => setFill(e.target.value)} className="w-6 h-6 cursor-pointer rounded" title="Fill" />
          <div className="w-full h-px bg-border my-1" />
          <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => setPrimitives([])} title="Clear">
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-4 flex items-center justify-center bg-muted/20">
          <div className="bg-white border-2 border-dashed border-muted-foreground/20 rounded-lg overflow-hidden" style={{ width: 250, height: 250 }}>
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              className="w-full h-full cursor-crosshair"
              onClick={handleSVGClick}
            >
              {/* Grid */}
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(n => (
                <g key={n}>
                  <line x1={n} y1={0} x2={n} y2={100} stroke="#eee" strokeWidth={0.3} />
                  <line x1={0} y1={n} x2={100} y2={n} stroke="#eee" strokeWidth={0.3} />
                </g>
              ))}

              {/* Primitives */}
              {primitives.map((p, i) => {
                if (p.type === "rect") return <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} stroke={p.stroke} fill={p.fill} strokeWidth={1} />;
                if (p.type === "circle") return <circle key={i} cx={p.x} cy={p.y} r={p.r} stroke={p.stroke} fill={p.fill} strokeWidth={1} />;
                if (p.type === "line") return <line key={i} x1={p.x} y1={p.y} x2={p.x + (p.w || 30)} y2={p.y} stroke={p.stroke} strokeWidth={1.5} />;
                if (p.type === "text") return <text key={i} x={p.x} y={p.y} fontSize="6" fill={p.stroke}>{p.text}</text>;
                return null;
              })}

              {/* Terminal markers */}
              <circle cx={50} cy={5} r={2} fill="red" opacity={0.5} />
              <circle cx={50} cy={95} r={2} fill="red" opacity={0.5} />
              <text x={52} y={8} fontSize="3" fill="red" opacity={0.4}>Top</text>
              <text x={52} y={98} fontSize="3" fill="red" opacity={0.4}>Bot</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="p-3 border-t space-y-2">
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Symbol name" className="text-sm" />
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleExportSVG}>Export SVG</Button>
          <Button className="flex-1 gap-1.5" onClick={handleSave}>
            <Save className="h-4 w-4" /> Save Symbol
          </Button>
        </div>
      </div>
    </div>
  );
};
