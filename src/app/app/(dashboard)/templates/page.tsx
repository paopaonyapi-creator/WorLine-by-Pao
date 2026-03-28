"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, CircuitBoard, Sun, Building2, Factory, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useLocale } from "@/lib/i18n/useLocale";

// ─── Pre-built diagram_data for each template ─────────
const presets: Record<string, any> = {
  blank: {
    objects: [],
    width: 1920,
    height: 1080,
    background: "#ffffff",
    gridSize: 20,
  },
  "motor-starter": {
    objects: [
      { id: "cb1", type: "symbol", symbolId: "circuit_breaker", x: 400, y: 100, width: 60, height: 60, rotation: 0, zIndex: 0, label: "CB-01" },
      { id: "ct1", type: "symbol", symbolId: "contactor", x: 400, y: 260, width: 60, height: 60, rotation: 0, zIndex: 1, label: "K1" },
      { id: "ol1", type: "symbol", symbolId: "overload_relay", x: 400, y: 420, width: 60, height: 60, rotation: 0, zIndex: 2, label: "OL-01" },
      { id: "m1", type: "symbol", symbolId: "motor", x: 400, y: 580, width: 60, height: 60, rotation: 0, zIndex: 3, label: "M1 (5.5kW)" },
      { id: "w1", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 4, points: [430, 160, 430, 260], color: "#000000", thickness: 2, startEndpoint: { objectId: "cb1", terminalId: "bottom" }, endEndpoint: { objectId: "ct1", terminalId: "top" } },
      { id: "w2", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 5, points: [430, 320, 430, 420], color: "#000000", thickness: 2, startEndpoint: { objectId: "ct1", terminalId: "bottom" }, endEndpoint: { objectId: "ol1", terminalId: "top" } },
      { id: "w3", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 6, points: [430, 480, 430, 580], color: "#000000", thickness: 2, startEndpoint: { objectId: "ol1", terminalId: "bottom" }, endEndpoint: { objectId: "m1", terminalId: "top" } },
    ],
    width: 1920, height: 1080, background: "#ffffff", gridSize: 20,
  },
  "residential": {
    objects: [
      { id: "g1", type: "symbol", symbolId: "generator", x: 200, y: 60, width: 60, height: 60, rotation: 0, zIndex: 0, label: "Utility" },
      { id: "t1", type: "symbol", symbolId: "transformer", x: 200, y: 220, width: 60, height: 60, rotation: 0, zIndex: 1, label: "TX 22/0.4kV" },
      { id: "mcb", type: "symbol", symbolId: "circuit_breaker", x: 200, y: 380, width: 60, height: 60, rotation: 0, zIndex: 2, label: "Main CB" },
      { id: "cb_l1", type: "symbol", symbolId: "circuit_breaker", x: 80, y: 540, width: 60, height: 60, rotation: 0, zIndex: 3, label: "Lighting" },
      { id: "cb_l2", type: "symbol", symbolId: "circuit_breaker", x: 200, y: 540, width: 60, height: 60, rotation: 0, zIndex: 4, label: "Outlets" },
      { id: "cb_l3", type: "symbol", symbolId: "circuit_breaker", x: 320, y: 540, width: 60, height: 60, rotation: 0, zIndex: 5, label: "A/C" },
      { id: "w1", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 6, points: [230, 120, 230, 220], color: "#000", thickness: 2 },
      { id: "w2", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 7, points: [230, 280, 230, 380], color: "#000", thickness: 2 },
      { id: "w3", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 8, points: [230, 440, 230, 500, 110, 500, 110, 540], color: "#000", thickness: 2 },
      { id: "w4", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 9, points: [230, 440, 230, 540], color: "#000", thickness: 2 },
      { id: "w5", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 10, points: [230, 440, 230, 500, 350, 500, 350, 540], color: "#000", thickness: 2 },
    ],
    width: 1920, height: 1080, background: "#ffffff", gridSize: 20,
  },
  "substation": {
    objects: [
      { id: "g1", type: "symbol", symbolId: "generator", x: 400, y: 40, width: 60, height: 60, rotation: 0, zIndex: 0, label: "Grid 115kV" },
      { id: "ds1", type: "symbol", symbolId: "disconnect_switch", x: 400, y: 140, width: 60, height: 60, rotation: 0, zIndex: 1, label: "DS-01" },
      { id: "cb1", type: "symbol", symbolId: "circuit_breaker", x: 400, y: 240, width: 60, height: 60, rotation: 0, zIndex: 2, label: "HV CB" },
      { id: "ct1", type: "symbol", symbolId: "current_transformer", x: 400, y: 340, width: 60, height: 60, rotation: 0, zIndex: 3, label: "CT 200/5A" },
      { id: "tx1", type: "symbol", symbolId: "transformer", x: 400, y: 440, width: 60, height: 60, rotation: 0, zIndex: 4, label: "TX 115/22kV" },
      { id: "cb2", type: "symbol", symbolId: "circuit_breaker", x: 400, y: 560, width: 60, height: 60, rotation: 0, zIndex: 5, label: "LV CB" },
      { id: "pm1", type: "symbol", symbolId: "power_meter", x: 540, y: 340, width: 60, height: 60, rotation: 0, zIndex: 6, label: "PM" },
      { id: "w1", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 7, points: [430, 100, 430, 140], color: "#000", thickness: 2 },
      { id: "w2", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 8, points: [430, 200, 430, 240], color: "#000", thickness: 2 },
      { id: "w3", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 9, points: [430, 300, 430, 340], color: "#000", thickness: 2 },
      { id: "w4", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 10, points: [430, 400, 430, 440], color: "#000", thickness: 2 },
      { id: "w5", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 11, points: [430, 500, 430, 560], color: "#000", thickness: 2 },
      { id: "w6", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 12, points: [460, 370, 540, 370], color: "#000", thickness: 2, label: "CT→PM" },
    ],
    width: 1920, height: 1080, background: "#ffffff", gridSize: 20,
  },
  "solar-pv": {
    objects: [
      { id: "pv1", type: "symbol", symbolId: "solar_panel", x: 100, y: 60, width: 60, height: 60, rotation: 0, zIndex: 0, label: "PV Array 1" },
      { id: "pv2", type: "symbol", symbolId: "solar_panel", x: 260, y: 60, width: 60, height: 60, rotation: 0, zIndex: 1, label: "PV Array 2" },
      { id: "vfd1", type: "symbol", symbolId: "vfd", x: 100, y: 220, width: 60, height: 60, rotation: 0, zIndex: 2, label: "Inverter 1" },
      { id: "vfd2", type: "symbol", symbolId: "vfd", x: 260, y: 220, width: 60, height: 60, rotation: 0, zIndex: 3, label: "Inverter 2" },
      { id: "cb1", type: "symbol", symbolId: "circuit_breaker", x: 180, y: 380, width: 60, height: 60, rotation: 0, zIndex: 4, label: "AC CB" },
      { id: "tx1", type: "symbol", symbolId: "transformer", x: 180, y: 500, width: 60, height: 60, rotation: 0, zIndex: 5, label: "Step-Up TX" },
      { id: "pm1", type: "symbol", symbolId: "power_meter", x: 180, y: 620, width: 60, height: 60, rotation: 0, zIndex: 6, label: "Grid Meter" },
      { id: "w1", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 7, points: [130, 120, 130, 220], color: "#000", thickness: 2 },
      { id: "w2", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 8, points: [290, 120, 290, 220], color: "#000", thickness: 2 },
      { id: "w3", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 9, points: [130, 280, 130, 340, 210, 340, 210, 380], color: "#000", thickness: 2 },
      { id: "w4", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 10, points: [290, 280, 290, 340, 210, 340, 210, 380], color: "#000", thickness: 2 },
      { id: "w5", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 11, points: [210, 440, 210, 500], color: "#000", thickness: 2 },
      { id: "w6", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 12, points: [210, 560, 210, 620], color: "#000", thickness: 2 },
    ],
    width: 1920, height: 1080, background: "#ffffff", gridSize: 20,
  },
  "factory": {
    objects: [
      { id: "g1", type: "symbol", symbolId: "generator", x: 400, y: 40, width: 60, height: 60, rotation: 0, zIndex: 0, label: "Main Supply" },
      { id: "ats1", type: "symbol", symbolId: "ats", x: 400, y: 160, width: 60, height: 60, rotation: 0, zIndex: 1, label: "ATS" },
      { id: "gen1", type: "symbol", symbolId: "generator", x: 560, y: 160, width: 60, height: 60, rotation: 0, zIndex: 2, label: "Standby Gen" },
      { id: "mcb", type: "symbol", symbolId: "circuit_breaker", x: 400, y: 300, width: 60, height: 60, rotation: 0, zIndex: 3, label: "Main CB" },
      { id: "cb1", type: "symbol", symbolId: "circuit_breaker", x: 240, y: 440, width: 60, height: 60, rotation: 0, zIndex: 4, label: "Production" },
      { id: "cb2", type: "symbol", symbolId: "circuit_breaker", x: 400, y: 440, width: 60, height: 60, rotation: 0, zIndex: 5, label: "HVAC" },
      { id: "cb3", type: "symbol", symbolId: "circuit_breaker", x: 560, y: 440, width: 60, height: 60, rotation: 0, zIndex: 6, label: "Lighting" },
      { id: "m1", type: "symbol", symbolId: "motor", x: 240, y: 580, width: 60, height: 60, rotation: 0, zIndex: 7, label: "M1 (22kW)" },
      { id: "m2", type: "symbol", symbolId: "motor", x: 400, y: 580, width: 60, height: 60, rotation: 0, zIndex: 8, label: "AHU (7.5kW)" },
      { id: "w1", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 9, points: [430, 100, 430, 160], color: "#000", thickness: 2 },
      { id: "w2", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 10, points: [460, 190, 560, 190], color: "#000", thickness: 2 },
      { id: "w3", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 11, points: [430, 220, 430, 300], color: "#000", thickness: 2 },
      { id: "w4", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 12, points: [430, 360, 430, 400, 270, 400, 270, 440], color: "#000", thickness: 2 },
      { id: "w5", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 13, points: [430, 360, 430, 440], color: "#000", thickness: 2 },
      { id: "w6", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 14, points: [430, 360, 430, 400, 590, 400, 590, 440], color: "#000", thickness: 2 },
      { id: "w7", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 15, points: [270, 500, 270, 580], color: "#000", thickness: 2 },
      { id: "w8", type: "wire", x: 0, y: 0, rotation: 0, zIndex: 16, points: [430, 500, 430, 580], color: "#000", thickness: 2 },
    ],
    width: 1920, height: 1080, background: "#ffffff", gridSize: 20,
  },
};

const templates = [
  {
    id: "blank",
    name: "Blank Project",
    nameTh: "โปรเจคเปล่า",
    desc: "Start from scratch with a blank canvas",
    descTh: "เริ่มต้นจากผืนผ้าใบเปล่า",
    icon: Zap,
  },
  {
    id: "motor-starter",
    name: "Motor Starter (DOL)",
    nameTh: "วงจรมอเตอร์สตาร์ท (DOL)",
    desc: "Circuit breaker → Contactor → Overload → Motor",
    descTh: "CB → คอนแทคเตอร์ → โอเวอร์โหลด → มอเตอร์",
    icon: CircuitBoard,
  },
  {
    id: "residential",
    name: "Residential Wiring",
    nameTh: "ระบบไฟฟ้าบ้านพักอาศัย",
    desc: "Utility → Transformer → Main CB → Branch circuits",
    descTh: "ไฟฟ้าการไฟฟ้า → หม้อแปลง → เมนเบรคเกอร์ → วงจรย่อย",
    icon: Home,
  },
  {
    id: "substation",
    name: "Substation 115/22kV",
    nameTh: "สถานีไฟฟ้า 115/22kV",
    desc: "Grid → Disconnect → HV CB → CT → Transformer → LV CB",
    descTh: "สายส่ง → สวิตช์ตัด → CB แรงสูง → CT → หม้อแปลง → CB แรงต่ำ",
    icon: Building2,
  },
  {
    id: "solar-pv",
    name: "Solar PV System",
    nameTh: "ระบบโซลาร์เซลล์",
    desc: "PV Arrays → Inverters → AC CB → Step-Up TX → Grid Meter",
    descTh: "แผงโซลาร์ → อินเวอร์เตอร์ → AC CB → หม้อแปลง → มิเตอร์",
    icon: Sun,
  },
  {
    id: "factory",
    name: "Factory Power",
    nameTh: "ระบบไฟฟ้าโรงงาน",
    desc: "Main Supply + ATS + Standby Gen → Branch feeders",
    descTh: "ไฟฟ้าหลัก + ATS + เครื่องปั่นไฟสำรอง → สายป้อนย่อย",
    icon: Factory,
  },
];

export default function TemplatesPage() {
  const [creating, setCreating] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const { t, locale } = useLocale();
  const isTh = locale === "th";

  const handleUseTemplate = async (template: typeof templates[0]) => {
    setCreating(template.id);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in first");
        return;
      }

      const diagramData = presets[template.id] || presets["blank"];

      const { data, error } = await supabase
        .from("projects")
        .insert({
          name: template.id === "blank" ? "Untitled Project" : (isTh && template.nameTh ? template.nameTh : template.name),
          user_id: user.id,
          diagram_data: diagramData,
        })
        .select()
        .single();

      if (error) {
        toast.error(t("create_failed"));
        return;
      }

      if (data) {
        toast.success(`"${data.name}" ${t("created_success")}`);
        router.push(`/app/projects/${data.id}`);
      }
    } catch {
      toast.error(t("error_generic"));
    } finally {
      setCreating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("sidebar_templates")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("manage_templates")}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Zap className="h-3 w-3" />
          {t("templates_banner")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <Card key={tpl.id} className="flex flex-col hover:shadow-lg hover:border-primary/30 transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  {isTh && tpl.nameTh ? tpl.nameTh : tpl.name}
                </CardTitle>
                <CardDescription>
                  {isTh && tpl.descTh ? tpl.descTh : tpl.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="bg-muted w-full h-32 rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/20">
                  <Icon className="h-12 w-12 text-muted-foreground/30" />
                </div>
              </CardContent>
              <div className="p-4 pt-0 mt-auto">
                <Button
                  className="w-full"
                  onClick={() => handleUseTemplate(tpl)}
                  disabled={creating === tpl.id}
                >
                  {creating === tpl.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("creating_project")}
                    </>
                  ) : (
                    t("use_template")
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
