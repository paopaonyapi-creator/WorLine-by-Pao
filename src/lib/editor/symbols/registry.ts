export const categories: string[] = [
  "Power Sources",
  "Switchgear",
  "Transformers",
  "Loads",
  "Protection",
  "Connections",
  "Metering",
];

// Helper to define symbols with both width/height and defaultWidth/defaultHeight
const sym = (id: string, category: string, displayName: string, symbolType: string, w: number, h: number, customData?: Record<string, string>) => ({
  id, category, displayName, type: "symbol", symbolType,
  width: w, height: h, defaultWidth: w, defaultHeight: h,
  ...(customData ? { customData } : {}),
});

export const symbolRegistry: Record<string, any> = {
  // --- Power Sources (5) ---
  generator:          sym("generator", "Power Sources", "Generator", "generator", 60, 60, { label: "G" }),
  motor:              sym("motor", "Power Sources", "Motor", "motor", 60, 60, { label: "M" }),
  battery:            sym("battery", "Power Sources", "Battery", "battery", 40, 60),
  solar_panel:        sym("solar_panel", "Power Sources", "Solar Panel", "solar_panel", 60, 60, { label: "PV" }),
  wind_turbine:       sym("wind_turbine", "Power Sources", "Wind Turbine", "wind_turbine", 60, 60, { label: "WT" }),

  // --- Switchgear (5) ---
  circuit_breaker:    sym("circuit_breaker", "Switchgear", "Circuit Breaker", "circuit_breaker", 40, 60, { label: "CB" }),
  disconnect_switch:  sym("disconnect_switch", "Switchgear", "Disconnect Switch", "disconnect_switch", 40, 60),
  fuse:               sym("fuse", "Switchgear", "Fuse", "fuse", 30, 60),
  contactor:          sym("contactor", "Switchgear", "Contactor", "contactor", 40, 60, { label: "K" }),
  ats:                sym("ats", "Switchgear", "ATS", "ats", 60, 60, { label: "ATS" }),

  // --- Transformers (3) ---
  transformer:        sym("transformer", "Transformers", "Transformer", "transformer", 60, 80, { label: "T" }),
  current_transformer:sym("current_transformer", "Transformers", "Current Transformer", "current_transformer", 40, 40, { label: "CT" }),
  potential_transformer: sym("potential_transformer", "Transformers", "PT / VT", "potential_transformer", 40, 40, { label: "PT" }),

  // --- Loads (5) ---
  resistor:           sym("resistor", "Loads", "Resistor", "resistor", 60, 30),
  capacitor:          sym("capacitor", "Loads", "Capacitor", "capacitor", 40, 60),
  inductor:           sym("inductor", "Loads", "Inductor", "inductor", 60, 30),
  lamp:               sym("lamp", "Loads", "Lamp", "lamp", 40, 40, { label: "L" }),
  vfd:                sym("vfd", "Loads", "VFD / Drive", "vfd", 50, 50, { label: "VFD" }),

  // --- Protection (3) ---
  relay:              sym("relay", "Protection", "Relay", "relay", 50, 50, { label: "R" }),
  surge_arrester:     sym("surge_arrester", "Protection", "Surge Arrester", "surge_arrester", 30, 60),
  overload_relay:     sym("overload_relay", "Protection", "Overload Relay", "overload_relay", 50, 50, { label: "OL" }),

  // --- Connections (3) ---
  busbar:             sym("busbar", "Connections", "Busbar", "busbar", 200, 10),
  ground:             sym("ground", "Connections", "Ground", "ground", 30, 40),
  junction:           sym("junction", "Connections", "Junction", "junction", 10, 10),

  // --- Metering (2) ---
  power_meter:        sym("power_meter", "Metering", "Power Meter", "power_meter", 50, 50, { label: "kW" }),
  ammeter:            sym("ammeter", "Metering", "Ammeter", "ammeter", 40, 40, { label: "A" }),
};
