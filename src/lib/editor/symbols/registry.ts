export const categories: string[] = [
  "Power Sources",
  "Switchgear",
  "Transformers",
  "Loads",
  "Protection",
  "Connections",
  "Metering",
  "Core Systems",
  "AI Engines",
  "Simulators",
  "SCADA Modules",
  "Future Tech",
  "Utility Nodes"
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

  // --- Switchgear (12) ---
  circuit_breaker:    sym("circuit_breaker", "Switchgear", "Circuit Breaker", "circuit_breaker", 40, 60, { label: "CB" }),
  disconnect_switch:  sym("disconnect_switch", "Switchgear", "Disconnect Switch", "disconnect_switch", 40, 60),
  fuse:               sym("fuse", "Switchgear", "Fuse", "fuse", 30, 60),
  contactor:          sym("contactor", "Switchgear", "Contactor", "contactor", 40, 60, { label: "K" }),
  ats:                sym("ats", "Switchgear", "ATS", "ats", 60, 60, { label: "ATS" }),
  switch_disconnector:sym("switch_disconnector", "Switchgear", "Switch-Disconnector", "switch_disconnector", 40, 60),
  earthing_disconnector: sym("earthing_disconnector", "Switchgear", "Earthing Disconnector", "earthing_disconnector", 40, 60),
  plug_in_switch:     sym("plug_in_switch", "Switchgear", "Plug-in Switch", "plug_in_switch", 40, 60),
  differential_switch:sym("differential_switch", "Switchgear", "Differential Switch", "differential_switch", 40, 60, { label: "RCD" }),
  fuse_disconnector:  sym("fuse_disconnector", "Switchgear", "Fuse Disconnector", "fuse_disconnector", 40, 70),
  disconnect_fuse_switch: sym("disconnect_fuse_switch", "Switchgear", "Disconnect Fuse Switch", "disconnect_fuse_switch", 40, 70),
  contactor_coil:     sym("contactor_coil", "Switchgear", "Contactor & Coil", "contactor_coil", 40, 60, { label: "K" }),

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

  // --- Protection (8) ---
  relay:              sym("relay", "Protection", "Relay", "relay", 50, 50, { label: "R" }),
  surge_arrester:     sym("surge_arrester", "Protection", "Surge Arrester", "surge_arrester", 30, 60),
  overload_relay:     sym("overload_relay", "Protection", "Overload Relay", "overload_relay", 50, 50, { label: "OL" }),
  thermal_protection: sym("thermal_protection", "Protection", "Thermal Protection", "thermal_protection", 40, 60, { label: "θ" }),
  magnetic_protection:sym("magnetic_protection", "Protection", "Magnetic Protection", "magnetic_protection", 40, 60, { label: "I>" }),
  instantaneous_overcurrent: sym("instantaneous_overcurrent", "Protection", "Instantaneous O/C", "instantaneous_overcurrent", 40, 60, { label: "I>>" }),
  relay_coil:         sym("relay_coil", "Protection", "Relay Coil", "relay_coil", 40, 50),
  timer_relay:        sym("timer_relay", "Protection", "Timer Relay", "timer_relay", 50, 50, { label: "T" }),

  // --- Connections (3) ---
  busbar:             sym("busbar", "Connections", "Busbar", "busbar", 200, 10),
  ground:             sym("ground", "Connections", "Ground", "ground", 30, 40),
  junction:           sym("junction", "Connections", "Junction", "junction", 10, 10),

  // --- Metering (4) ---
  power_meter:        sym("power_meter", "Metering", "Power Meter", "power_meter", 50, 50, { label: "kW" }),
  ammeter:            sym("ammeter", "Metering", "Ammeter", "ammeter", 40, 40, { label: "A" }),
  voltmeter:          sym("voltmeter", "Metering", "Voltmeter", "voltmeter", 40, 40, { label: "V" }),
  frequency_meter:    sym("frequency_meter", "Metering", "Frequency Meter", "frequency_meter", 40, 40, { label: "Hz" }),

  // --- Core Systems ---
  shortCircuit: sym("shortCircuit", "Core Systems", "Short Circuit", "shortCircuit", 60, 60),
  protection_tcc: sym("protection_tcc", "Core Systems", "Protection TCC", "protection_tcc", 60, 60),
  vdrop: sym("vdrop", "Core Systems", "Voltage Drop", "vdrop", 60, 60),
  loadFlow: sym("loadFlow", "Core Systems", "Load Flow", "loadFlow", 60, 60),
  loadCalc: sym("loadCalc", "Core Systems", "Load Calc", "loadCalc", 60, 60),
  cableSch: sym("cableSch", "Core Systems", "Cable Schedule", "cableSch", 60, 60),
  pfCorrection: sym("pfCorrection", "Core Systems", "PF Correction", "pfCorrection", 60, 60),
  batterySize: sym("batterySize", "Core Systems", "Battery Sizing", "batterySize", 60, 60),
  cableDerating: sym("cableDerating", "Core Systems", "Cable Derating", "cableDerating", 60, 60),
  panelSch: sym("panelSch", "Core Systems", "Panel Schedule", "panelSch", 60, 60),

  // --- AI Engines ---
  agiGrid: sym("agiGrid", "AI Engines", "AGI God-Mode", "agiGrid", 60, 60),
  aiGen: sym("aiGen", "AI Engines", "AI Gen Design", "aiGen", 60, 60),
  aiRecog: sym("aiRecog", "AI Engines", "AI Recognition", "aiRecog", 60, 60),
  aiLayout: sym("aiLayout", "AI Engines", "AI Auto Layout", "aiLayout", 60, 60),
  aiPred: sym("aiPred", "AI Engines", "Failure Predict", "aiPred", 60, 60),
  voiceCmd: sym("voiceCmd", "AI Engines", "Voice Command", "voiceCmd", 60, 60),
  aiReport: sym("aiReport", "AI Engines", "AI Report", "aiReport", 60, 60),
  autoRout: sym("autoRout", "AI Engines", "Smart Routing", "autoRout", 60, 60),

  // --- Simulators ---
  arcFlash: sym("arcFlash", "Simulators", "Arc Flash Sim", "arcFlash", 60, 60),
  thd: sym("thd", "Simulators", "Harmonic THD%", "thd", 60, 60),
  motorStart: sym("motorStart", "Simulators", "Motor Start", "motorStart", 60, 60),
  solarSim: sym("solarSim", "Simulators", "Solar PV Yield", "solarSim", 60, 60),
  weather: sym("weather", "Simulators", "Weather Hazard", "weather", 60, 60),
  healing: sym("healing", "Simulators", "Auto-Heal Grid", "healing", 60, 60),
  lightning: sym("lightning", "Simulators", "Lightning Protect", "lightning", 60, 60),
  groundGrid: sym("groundGrid", "Simulators", "Earth Grid IEEE", "groundGrid", 60, 60),
  peakShave: sym("peakShave", "Simulators", "Peak Shaving", "peakShave", 60, 60),

  // --- SCADA Modules ---
  scadaSim: sym("scadaSim", "SCADA Modules", "SCADA Term", "scadaSim", 60, 60),
  relayLog: sym("relayLog", "SCADA Modules", "Relay Logic", "relayLog", 60, 60),
  mqtt: sym("mqtt", "SCADA Modules", "IoT MQTT", "mqtt", 60, 60),
  equipDb: sym("equipDb", "SCADA Modules", "Equipment DB", "equipDb", 60, 60),
  cmms: sym("cmms", "SCADA Modules", "CMMS Tagging", "cmms", 60, 60),
  thermalIr: sym("thermalIr", "SCADA Modules", "Thermal IR", "thermalIr", 60, 60),
  terminalStrip: sym("terminalStrip", "SCADA Modules", "Terminal Strips", "terminalStrip", 60, 60),
  cyberAttack: sym("cyberAttack", "SCADA Modules", "Cyber Sec Pen", "cyberAttack", 60, 60),
  droneInsp: sym("droneInsp", "SCADA Modules", "Drone Fleet", "droneInsp", 60, 60),

  // --- Future Tech ---
  marsGrid: sym("marsGrid", "Future Tech", "Mars Microgrid", "marsGrid", 60, 60),
  quantumCrypt: sym("quantumCrypt", "Future Tech", "Quantum QKD", "quantumCrypt", 60, 60),
  dysonBeam: sym("dysonBeam", "Future Tech", "Dyson Beam", "dysonBeam", 60, 60),
  fusionTokamak: sym("fusionTokamak", "Future Tech", "Fusion Tokamak", "fusionTokamak", 60, 60),
  superconductor: sym("superconductor", "Future Tech", "Superconductor", "superconductor", 60, 60),
  spaceLaunch: sym("spaceLaunch", "Future Tech", "Space Launch", "spaceLaunch", 60, 60),
  multiverse: sym("multiverse", "Future Tech", "Multiverse Grid", "multiverse", 60, 60),
  antimatterUps: sym("antimatterUps", "Future Tech", "Antimatter UPS", "antimatterUps", 60, 60),
  neuralinkBci: sym("neuralinkBci", "Future Tech", "Neuralink BCI", "neuralinkBci", 60, 60),
  hologram: sym("hologram", "Future Tech", "3D Hologram", "hologram", 60, 60),
  webXr: sym("webXr", "Future Tech", "WebXR Preview", "webXr", 60, 60),
  evFleet: sym("evFleet", "Future Tech", "EV Fleet V2G", "evFleet", 60, 60),
  blockchain: sym("blockchain", "Future Tech", "Blockchain P2P", "blockchain", 60, 60),
  esgToken: sym("esgToken", "Future Tech", "ESG Token", "esgToken", 60, 60),

  // --- Utility Nodes ---
  bomNode: sym("bomNode", "Utility Nodes", "BOM Data", "bomNode", 60, 60),
  costNode: sym("costNode", "Utility Nodes", "Cost Tally", "costNode", 60, 60),
  printNode: sym("printNode", "Utility Nodes", "Print Border", "printNode", 60, 60),
  dxfNode: sym("dxfNode", "Utility Nodes", "DXF Link", "dxfNode", 60, 60),
  pdfNode: sym("pdfNode", "Utility Nodes", "PDF Gen", "pdfNode", 60, 60),
  bimNode: sym("bimNode", "Utility Nodes", "BIM Revit", "bimNode", 60, 60),
  titleBlock: sym("titleBlock", "Utility Nodes", "Title Block", "titleBlock", 60, 60),
  gisMap: sym("gisMap", "Utility Nodes", "GIS Map", "gisMap", 60, 60),
  symEditor: sym("symEditor", "Utility Nodes", "Symbol Editor", "symEditor", 60, 60),
  diffNode: sym("diffNode", "Utility Nodes", "Git Diff", "diffNode", 60, 60),
  revHist: sym("revHist", "Utility Nodes", "Rev History", "revHist", 60, 60),
  chatNode: sym("chatNode", "Utility Nodes", "Team Chat", "chatNode", 60, 60),
  commentNode: sym("commentNode", "Utility Nodes", "Comment Pin", "commentNode", 60, 60),
  templateNode: sym("templateNode", "Utility Nodes", "Template Pres", "templateNode", 60, 60),
  crossRef: sym("crossRef", "Utility Nodes", "Cross-Ref", "crossRef", 60, 60),
  inspectNode: sym("inspectNode", "Utility Nodes", "Inspection", "inspectNode", 60, 60),
  themeNode: sym("themeNode", "Utility Nodes", "Theme Node", "themeNode", 60, 60),
};
