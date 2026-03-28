import { useEditorStore } from "@/store/editorStore";
import { Copy, Trash, RotateCw, FlipHorizontal, FlipVertical, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WireObject, SymbolObject } from "@/lib/editor/types";
import { symbolRegistry } from "@/lib/editor/symbols/registry";
import { useState, useCallback } from "react";
import { useLocale } from "@/lib/i18n/useLocale";

const getWireColors = (t: any) => [
  { label: t("color_black"), value: "#000000" },
  { label: t("color_red"), value: "#ef4444" },
  { label: t("color_blue"), value: "#3b82f6" },
  { label: t("color_green"), value: "#22c55e" },
  { label: t("color_orange"), value: "#f97316" },
  { label: t("color_gray"), value: "#6b7280" },
];

const getWireThicknesses = (t: any) => [
  { label: t("thick_thin"), value: 1 },
  { label: t("thick_normal"), value: 2 },
  { label: t("thick_thick"), value: 3 },
  { label: t("thick_heavy"), value: 4 },
];

const VOLTAGES = ["12V", "24V", "48V", "110V", "220V", "380V", "400V", "690V", "11kV", "22kV", "33kV", "115kV"];
const CABLE_SIZES = ["1.0mm²", "1.5mm²", "2.5mm²", "4.0mm²", "6.0mm²", "10mm²", "16mm²", "25mm²", "35mm²", "50mm²", "70mm²", "95mm²", "120mm²", "150mm²", "240mm²"];
const PHASES = ["1Φ", "3Φ"];
const PROTECTION_TYPES = ["MCB", "MCCB", "ACB", "VCB", "RCD", "RCBO"];

// ─── Collapsible Section ──────────────────────────────────
const Section = ({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase text-muted-foreground hover:bg-muted/50 transition-colors"
      >
        {title}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="px-3 pb-3 space-y-3">{children}</div>}
    </div>
  );
};

// ─── Field wrapper ────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

export const PropertiesPanel = () => {
  const { t } = useLocale();
  const { selectedIds, canvas, deleteObjects, duplicateSelected, updateObject, rotateSelected, flipSelectedH, flipSelectedV } = useEditorStore();

  const selectedObjects = canvas.objects.filter((obj) => selectedIds.includes(obj.id));

  const handleUpdate = useCallback((id: string, updates: Record<string, any>) => {
    updateObject(id, updates as any);
  }, [updateObject]);

  if (selectedObjects.length === 0) {
    return (
      <div className="w-full h-full bg-background p-4 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <span className="text-lg mb-2">📋</span>
        {t("prop_empty")}
        <span className="text-xs mt-2 opacity-50">{t("prop_empty_sub")}</span>
      </div>
    );
  }

  const firstObj = selectedObjects[0];
  const isWire = firstObj.type === "wire";
  const wireObj = isWire ? (firstObj as WireObject) : null;
  const isSymbol = firstObj.type === "symbol";
  const symObj = isSymbol ? (firstObj as SymbolObject) : null;
  const symDef = symObj ? symbolRegistry[symObj.symbolId] : null;

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header */}
      <div className="p-3 border-b font-semibold text-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span>{t("prop_title")}</span>
          {symDef && (
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-normal">
              {symDef.category}
            </span>
          )}
        </div>
        {selectedObjects.length === 1 && (
          <span className="text-[10px] text-muted-foreground font-mono">{firstObj.id.slice(0, 8)}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-3 flex-1 overflow-y-auto text-sm pb-20">
        {selectedObjects.length === 1 && (
          <>
            {/* ─── Identity Section ─── */}
            <Section title={t("prop_identity")} defaultOpen={true}>
              <Field label={t("prop_type")}>
                <div className="text-sm font-medium">{symDef?.displayName || firstObj.type}</div>
              </Field>
              {isSymbol && symObj && (
                <Field label={t("prop_label")}>
                  <Input
                    className="h-9"
                    defaultValue={(symObj as any).label || ""}
                    placeholder="e.g. CB-01, M1"
                    onBlur={(e) => handleUpdate(firstObj.id, { label: e.target.value })}
                  />
                </Field>
              )}
              {isWire && wireObj && (
                <Field label={t("prop_wire_label")}>
                  <Input
                    className="h-9"
                    defaultValue={(wireObj as any).label || ""}
                    placeholder="e.g. L1, N, PE"
                    onBlur={(e) => handleUpdate(firstObj.id, { label: e.target.value })}
                  />
                </Field>
              )}
            </Section>

            {/* ─── Position Section (Symbol only) ─── */}
            {(isSymbol || firstObj.type === "text") && (
              <Section title={t("prop_position")} defaultOpen={false}>
                <div className="grid grid-cols-3 gap-2">
                  <Field label="X">
                    <div className="h-9 flex items-center border rounded px-2 text-sm bg-muted/30 font-mono">
                      {Math.round(firstObj.x)}
                    </div>
                  </Field>
                  <Field label="Y">
                    <div className="h-9 flex items-center border rounded px-2 text-sm bg-muted/30 font-mono">
                      {Math.round(firstObj.y)}
                    </div>
                  </Field>
                  {isSymbol && (
                    <Field label="Rot">
                      <div className="h-9 flex items-center border rounded px-2 text-sm bg-muted/30 font-mono">
                        {firstObj.rotation || 0}°
                      </div>
                    </Field>
                  )}
                </div>
              </Section>
            )}

            {/* ─── Electrical Properties (Symbol only) ─── */}
            {isSymbol && symObj && (
              <Section title={t("prop_electrical")} defaultOpen={true}>
                {/* Phase */}
                <Field label={t("prop_phase")}>
                  <div className="flex gap-1">
                    {PHASES.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleUpdate(firstObj.id, { phase: p })}
                        className={`flex-1 h-9 text-xs rounded-md border transition-all font-medium ${
                          (symObj as any).phase === p
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/30 border-border hover:border-muted-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Voltage */}
                <Field label={t("prop_voltage")}>
                  <select
                    className="w-full h-9 border rounded-md px-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    defaultValue={(symObj as any).voltage || ""}
                    onChange={(e) => handleUpdate(firstObj.id, { voltage: e.target.value })}
                  >
                    <option value="">{t("prop_select")}</option>
                    {VOLTAGES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </Field>

                {/* Rated Power (motors, generators) */}
                {["motor", "motor_3ph", "stepper_motor", "servo_motor", "generator", "sync_generator", "async_generator", "dc_generator", "vfd", "wind_turbine"].includes(symObj.symbolId) && (
                  <Field label={t("prop_rated_power")}>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        className="h-9 flex-1"
                        defaultValue={(symObj as any).ratedPower || ""}
                        placeholder="0"
                        onBlur={(e) => handleUpdate(firstObj.id, { ratedPower: parseFloat(e.target.value) || 0 })}
                      />
                      <span className="flex items-center text-xs text-muted-foreground px-2 bg-muted/30 border rounded-md">kW</span>
                    </div>
                  </Field>
                )}

                {/* Rated Current (CBs, contactors, fuses) */}
                {["circuit_breaker", "mccb", "acb", "vcb", "mcb", "contactor", "contactor_nc", "fuse", "fuse_link", "disconnect_switch", "load_break_switch", "overload_relay", "differential_switch", "rcbo", "ats", "mts", "switch_disconnector", "fuse_disconnector", "disconnect_fuse_switch"].includes(symObj.symbolId) && (
                  <Field label={t("prop_rated_current")}>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        className="h-9 flex-1"
                        defaultValue={(symObj as any).ratedCurrent || ""}
                        placeholder="0"
                        onBlur={(e) => handleUpdate(firstObj.id, { ratedCurrent: parseFloat(e.target.value) || 0 })}
                      />
                      <span className="flex items-center text-xs text-muted-foreground px-2 bg-muted/30 border rounded-md">A</span>
                    </div>
                  </Field>
                )}

                {/* Protection Type (breakers/relays) */}
                {["circuit_breaker", "mccb", "acb", "vcb", "mcb", "differential_switch", "rcbo"].includes(symObj.symbolId) && (
                  <Field label={t("prop_protection_type")}>
                    <div className="flex gap-1 flex-wrap">
                      {PROTECTION_TYPES.map((p) => (
                        <button
                          key={p}
                          onClick={() => handleUpdate(firstObj.id, { protectionType: p })}
                          className={`px-2.5 h-8 text-[11px] rounded-md border transition-all font-medium ${
                            (symObj as any).protectionType === p
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/30 border-border hover:border-muted-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </Field>
                )}

                {/* Transformer Ratio */}
                {["transformer", "transformer_3w", "auto_transformer", "isolation_transformer", "zig_zag_transformer", "current_transformer", "potential_transformer"].includes(symObj.symbolId) && (
                  <Field label={t("prop_ratio")}>
                    <Input
                      className="h-9"
                      defaultValue={(symObj as any).ratio || ""}
                      placeholder={symObj.symbolId.includes("current") ? "e.g. 200/5A" : "e.g. 22/0.4kV"}
                      onBlur={(e) => handleUpdate(firstObj.id, { ratio: e.target.value })}
                    />
                  </Field>
                )}
              </Section>
            )}

            {/* ─── Cable Section (Symbol + Wire) ─── */}
            {(isSymbol || isWire) && (
              <Section title={t("prop_cable")} defaultOpen={isWire}>
                <Field label={t("prop_cable_size")}>
                  <select
                    className="w-full h-9 border rounded-md px-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    defaultValue={(firstObj as any).cableSize || ""}
                    onChange={(e) => handleUpdate(firstObj.id, { cableSize: e.target.value })}
                  >
                    <option value="">{t("prop_select")}</option>
                    {CABLE_SIZES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>

                {/* Wire-specific: Color + Thickness */}
                {isWire && wireObj && (
                  <>
                    <Field label={t("prop_wire_color")}>
                      <div className="grid grid-cols-6 gap-1.5">
                        {getWireColors(t).map((c) => (
                          <button
                            key={c.value}
                            title={c.label}
                            onClick={() => handleUpdate(firstObj.id, { color: c.value })}
                            className={`h-8 rounded-md border-2 transition-all ${
                              wireObj.color === c.value
                                ? "border-primary ring-2 ring-primary/30 scale-110"
                                : "border-border hover:border-muted-foreground"
                            }`}
                            style={{ backgroundColor: c.value }}
                          />
                        ))}
                      </div>
                    </Field>
                    <Field label={t("prop_thickness")}>
                      <div className="flex gap-1">
                        {getWireThicknesses(t).map((tkn) => (
                          <button
                            key={tkn.value}
                            onClick={() => handleUpdate(firstObj.id, { thickness: tkn.value })}
                            className={`flex-1 h-8 text-xs rounded-md border transition-all font-medium ${
                              wireObj.thickness === tkn.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/30 border-border hover:border-muted-foreground"
                            }`}
                          >
                            {tkn.label}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </>
                )}
              </Section>
            )}

            {/* ─── Notes Section ─── */}
            {isSymbol && symObj && (
              <Section title={t("prop_notes")} defaultOpen={false}>
                <Field label={t("prop_notes")}>
                  <textarea
                    className="w-full border rounded-md px-2 py-2 text-sm bg-background min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    defaultValue={(symObj as any).notes || ""}
                    placeholder={t("prop_add_notes")}
                    rows={2}
                    onBlur={(e) => handleUpdate(firstObj.id, { notes: e.target.value })}
                  />
                </Field>
              </Section>
            )}
          </>
        )}

        {selectedObjects.length > 1 && (
          <div className="text-sm p-3 bg-muted/30 rounded-lg text-center">
            <span className="font-semibold text-primary">{selectedObjects.length}</span> {t("prop_objects_selected")}
          </div>
        )}
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="p-3 border-t space-y-2 shrink-0 bg-background">
        {selectedObjects.length === 1 && isSymbol && (
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-9" onClick={rotateSelected} title="Rotate 90° (R)">
              <RotateCw className="w-3.5 h-3.5" /> 90°
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-9" onClick={flipSelectedH} title="Flip Horizontal">
              <FlipHorizontal className="w-3.5 h-3.5" /> H
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-9" onClick={flipSelectedV} title="Flip Vertical">
              <FlipVertical className="w-3.5 h-3.5" /> V
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2 h-9 border-destructive text-destructive hover:bg-destructive/10" onClick={() => deleteObjects(selectedIds)}>
            <Trash className="w-4 h-4" /> {t("tool_delete")}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2 h-9" onClick={() => duplicateSelected()}>
            <Copy className="w-4 h-4" /> {t("tool_duplicate")}
          </Button>
        </div>
      </div>
    </div>
  );
};
