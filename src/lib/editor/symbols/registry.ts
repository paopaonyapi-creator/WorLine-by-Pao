export const categories: string[] = [
  "Power Sources",
  "Transformers",
  "Motors and Generators",
  "Connections and Junctions",
  "Switches and Disconnectors",
  "Breakers and Protection",
  "Fuses",
  "Relays and Contactors",
  "Metering",
  "Indicators and Lamps",
  "Terminals and Connectors",
];

// Helper to define symbols with both width/height and defaultWidth/defaultHeight
const sym = (id: string, category: string, displayName: string, symbolType: string, w: number, h: number, customData?: Record<string, string>) => ({
  id, category, displayName, type: "symbol", symbolType,
  width: w, height: h, defaultWidth: w, defaultHeight: h,
  ...(customData ? { customData } : {}),
});

export const symbolRegistry: Record<string, any> = {
  // --- Power Sources ---
  solar_panel:        sym("solar_panel", "Power Sources", "Solar Panel", "solar_panel", 60, 60, { label: "PV" }),
  solar_array:        sym("solar_array", "Power Sources", "Solar Array", "solar_panel", 80, 80, { label: "ARRAY" }),
  wind_turbine:       sym("wind_turbine", "Power Sources", "Wind Turbine", "wind_turbine", 60, 60, { label: "WT" }),
  battery:            sym("battery", "Power Sources", "Battery", "battery", 40, 60),
  battery_cell:       sym("battery_cell", "Power Sources", "Single Cell Battery", "battery", 40, 60, { label: "1.5V" }),
  ups:                sym("ups", "Power Sources", "UPS", "battery", 60, 60, { label: "UPS" }),
  fuel_cell:          sym("fuel_cell", "Power Sources", "Fuel Cell", "battery", 50, 60, { label: "FC" }),

  // --- Motors and Generators ---
  generator:          sym("generator", "Motors and Generators", "Generator", "generator", 60, 60, { label: "G" }),
  sync_generator:     sym("sync_generator", "Motors and Generators", "Sync Generator", "generator", 60, 60, { label: "GS" }),
  async_generator:    sym("async_generator", "Motors and Generators", "Async Generator", "generator", 60, 60, { label: "GA" }),
  dc_generator:       sym("dc_generator", "Motors and Generators", "DC Generator", "generator", 60, 60, { label: "G=" }),
  motor:              sym("motor", "Motors and Generators", "Motor", "motor", 60, 60, { label: "M" }),
  motor_3ph:          sym("motor_3ph", "Motors and Generators", "3-Phase Motor", "motor", 60, 60, { label: "M3~" }),
  stepper_motor:      sym("stepper_motor", "Motors and Generators", "Stepper Motor", "motor", 60, 60, { label: "SM" }),
  servo_motor:        sym("servo_motor", "Motors and Generators", "Servo Motor", "motor", 60, 60, { label: "M_SRV" }),

  // --- Transformers ---
  transformer:        sym("transformer", "Transformers", "2-Winding Transformer", "transformer", 60, 80, { label: "T" }),
  transformer_3w:     sym("transformer_3w", "Transformers", "3-Winding Transformer", "transformer", 60, 100, { label: "T3" }),
  auto_transformer:   sym("auto_transformer", "Transformers", "Auto Transformer", "transformer", 60, 80, { label: "AT" }),
  current_transformer:sym("current_transformer", "Transformers", "Current Transformer", "current_transformer", 40, 40, { label: "CT" }),
  potential_transformer: sym("potential_transformer", "Transformers", "Potential Transformer", "potential_transformer", 40, 40, { label: "PT" }),
  isolation_transformer: sym("isolation_transformer", "Transformers", "Isolation Transformer", "transformer", 60, 80, { label: "IT" }),
  zig_zag_transformer: sym("zig_zag_transformer", "Transformers", "Zig-Zag Transformer", "transformer", 60, 80, { label: "Z" }),

  // --- Connections and Junctions ---
  busbar:             sym("busbar", "Connections and Junctions", "Busbar", "busbar", 200, 10),
  ground:             sym("ground", "Connections and Junctions", "Ground (PE)", "ground", 30, 40),
  chassis_ground:     sym("chassis_ground", "Connections and Junctions", "Chassis Ground", "ground", 30, 40, { label: "PE" }),
  junction:           sym("junction", "Connections and Junctions", "Junction Node", "junction", 10, 10),

  // --- Terminals and Connectors ---
  terminal_block:     sym("terminal_block", "Terminals and Connectors", "Terminal Block", "junction", 20, 20, { label: "X" }),
  plug_socket:        sym("plug_socket", "Terminals and Connectors", "Plug & Socket", "plug_in_switch", 40, 20),
  socket_outlet:      sym("socket_outlet", "Terminals and Connectors", "Socket Outlet", "junction", 30, 30, { label: "SKT" }),

  // --- Switches and Disconnectors ---
  disconnect_switch:  sym("disconnect_switch", "Switches and Disconnectors", "Disconnect Switch", "disconnect_switch", 40, 60),
  load_break_switch:  sym("load_break_switch", "Switches and Disconnectors", "Load Break Switch", "disconnect_switch", 40, 60, { label: "LBS" }),
  earth_switch:       sym("earth_switch", "Switches and Disconnectors", "Earth Switch", "earthing_disconnector", 40, 60),
  switch_disconnector:sym("switch_disconnector", "Switches and Disconnectors", "Switch-Disconnector", "switch_disconnector", 40, 60),
  earthing_disconnector: sym("earthing_disconnector", "Switches and Disconnectors", "Earthing Discon", "earthing_disconnector", 40, 60),
  plug_in_switch:     sym("plug_in_switch", "Switches and Disconnectors", "Plug-in Switch", "plug_in_switch", 40, 60),
  ats:                sym("ats", "Switches and Disconnectors", "ATS", "ats", 60, 60, { label: "ATS" }),
  mts:                sym("mts", "Switches and Disconnectors", "MTS", "ats", 60, 60, { label: "MTS" }),

  // --- Breakers and Protection ---
  circuit_breaker:    sym("circuit_breaker", "Breakers and Protection", "Circuit Breaker", "circuit_breaker", 40, 60, { label: "CB" }),
  mccb:               sym("mccb", "Breakers and Protection", "MCCB", "circuit_breaker", 40, 60, { label: "MCCB" }),
  acb:                sym("acb", "Breakers and Protection", "ACB", "circuit_breaker", 50, 70, { label: "ACB" }),
  vcb:                sym("vcb", "Breakers and Protection", "VCB", "circuit_breaker", 50, 70, { label: "VCB" }),
  mcb:                sym("mcb", "Breakers and Protection", "MCB", "circuit_breaker", 40, 60, { label: "MCB" }),
  differential_switch:sym("differential_switch", "Breakers and Protection", "Differential (RCD)", "differential_switch", 40, 60, { label: "RCD" }),
  rcbo:               sym("rcbo", "Breakers and Protection", "RCBO", "differential_switch", 40, 60, { label: "RCBO" }),
  surge_arrester:     sym("surge_arrester", "Breakers and Protection", "Surge Arrester", "surge_arrester", 30, 60),
  surge_arrester_3ph: sym("surge_arrester_3ph", "Breakers and Protection", "3-Ph Surge Arrester", "surge_arrester", 50, 60, { label: "SPD" }),

  // --- Fuses ---
  fuse:               sym("fuse", "Fuses", "Fuse", "fuse", 30, 60),
  fuse_link:          sym("fuse_link", "Fuses", "Fuse Link", "fuse", 30, 60, { label: "FL" }),
  fuse_disconnector:  sym("fuse_disconnector", "Fuses", "Fuse Disconnector", "fuse_disconnector", 40, 70),
  disconnect_fuse_switch: sym("disconnect_fuse_switch", "Fuses", "Disconnect Fuse Switch", "disconnect_fuse_switch", 40, 70),

  // --- Relays and Contactors ---
  relay:              sym("relay", "Relays and Contactors", "General Relay", "relay", 50, 50, { label: "R" }),
  contactor:          sym("contactor", "Relays and Contactors", "Contactor (NO)", "contactor", 40, 60, { label: "K" }),
  contactor_nc:       sym("contactor_nc", "Relays and Contactors", "Contactor (NC)", "contactor", 40, 60, { label: "K_NC" }),
  overload_relay:     sym("overload_relay", "Relays and Contactors", "Overload Relay", "overload_relay", 50, 50, { label: "OL" }),
  earth_fault_relay:  sym("earth_fault_relay", "Relays and Contactors", "Earth Fault Relay", "relay", 50, 50, { label: "51N" }),
  undervoltage_relay: sym("undervoltage_relay", "Relays and Contactors", "Under Voltage Relay", "relay", 50, 50, { label: "27" }),
  overvoltage_relay:  sym("overvoltage_relay", "Relays and Contactors", "Over Voltage Relay", "relay", 50, 50, { label: "59" }),
  differential_relay: sym("differential_relay", "Relays and Contactors", "Differential Relay", "relay", 50, 50, { label: "87" }),
  relay_coil:         sym("relay_coil", "Relays and Contactors", "Relay Coil", "relay_coil", 40, 50),
  contactor_coil:     sym("contactor_coil", "Relays and Contactors", "Contactor Coil", "contactor_coil", 40, 60, { label: "K" }),
  timer_relay:        sym("timer_relay", "Relays and Contactors", "Timer Relay", "timer_relay", 50, 50, { label: "T" }),

  // --- Metering ---
  power_meter:        sym("power_meter", "Metering", "Power Meter", "power_meter", 50, 50, { label: "kW" }),
  ammeter:            sym("ammeter", "Metering", "Ammeter", "ammeter", 40, 40, { label: "A" }),
  voltmeter:          sym("voltmeter", "Metering", "Voltmeter", "voltmeter", 40, 40, { label: "V" }),
  frequency_meter:    sym("frequency_meter", "Metering", "Frequency Meter", "frequency_meter", 40, 40, { label: "Hz" }),
  var_meter:          sym("var_meter", "Metering", "VARMeter", "power_meter", 50, 50, { label: "kVAR" }),
  energy_meter:       sym("energy_meter", "Metering", "Energy Meter", "power_meter", 50, 50, { label: "kWh" }),
  pf_meter:           sym("pf_meter", "Metering", "Power Factor Meter", "power_meter", 50, 50, { label: "PF" }),
  smart_meter:        sym("smart_meter", "Metering", "Smart Meter", "power_meter", 60, 60, { label: "PQ" }),

  // --- Indicators and Lamps ---
  lamp:               sym("lamp", "Indicators and Lamps", "Lamp/Indicator", "lamp", 40, 40, { label: "L" }),
  resistor:           sym("resistor", "Indicators and Lamps", "Resistor", "resistor", 60, 30),
  variable_resistor:  sym("variable_resistor", "Indicators and Lamps", "Variable Resistor", "resistor", 60, 30, { label: "VR" }),
  capacitor:          sym("capacitor", "Indicators and Lamps", "Capacitor", "capacitor", 40, 60),
  polarized_capacitor:sym("polarized_capacitor", "Indicators and Lamps", "Polarized Cap", "capacitor", 40, 60, { label: "C+" }),
  inductor:           sym("inductor", "Indicators and Lamps", "Inductor", "inductor", 60, 30),
  heater:             sym("heater", "Indicators and Lamps", "Heater", "resistor", 60, 30, { label: "H" }),
  vfd:                sym("vfd", "Indicators and Lamps", "VFD / Drive", "vfd", 50, 50, { label: "VFD" }),
  soft_starter:       sym("soft_starter", "Indicators and Lamps", "Soft Starter", "vfd", 50, 50, { label: "SS" }),
  generic_load:       sym("generic_load", "Indicators and Lamps", "Generic Load", "vfd", 50, 50, { label: "LOAD" }),
};

