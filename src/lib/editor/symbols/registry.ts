// src/lib/editor/symbols/registry.ts

// Global categories matching typical standard libraries
export const categories: string[] = [
  "Power Sources",
  "Transformers",
  "Motors and Generators",
  "Connections and Lines", // Merged
  "Switches and Disconnectors",
  "Breakers and Protection",
  "Fuses",
  "Relays and Contactors",
  "Metering",
  "Indicators and Lamps",
  "Terminals and Connectors",
];

// Helper to define symbols with both width/height and defaultWidth/defaultHeight
const sym = (id: string, category: string, displayName: string, symbolType: string, w: number, h: number, customData?: Record<string, string>, tab: string = "iec") => ({
  id, category, displayName, type: "symbol", symbolType, tab,
  width: w, height: h, defaultWidth: w, defaultHeight: h,
  ...(customData ? { customData } : {}),
});

export const SYMBOL_REGISTRY: Record<string, any> = {
  // ==========================================
  // --- Lines & Connections (Added heavily) ---
  // ==========================================
  line_h:             sym("line_h", "Connections and Lines", "Horizontal Line", "line_h", 60, 10, {}, "lines"),
  line_v:             sym("line_v", "Connections and Lines", "Vertical Line", "line_v", 10, 60, {}, "lines"),
  crossing_no_conn:   sym("crossing_no_conn", "Connections and Lines", "Crossing (No Conn)", "crossing", 40, 40, {}, "lines"),
  crossing_straight:  sym("crossing_straight", "Connections and Lines", "Straight Crossing", "crossing_straight", 40, 40, {}, "lines"),
  diagonal:           sym("diagonal", "Connections and Lines", "Diagonal", "diagonal", 50, 50, {}, "lines"),
  diagonal_rev:       sym("diagonal_rev", "Connections and Lines", "Diagonal Rev", "diagonal_rev", 50, 50, {}, "lines"),
  cross_x:            sym("cross_x", "Connections and Lines", "Crossing X", "cross_x", 40, 40, {}, "lines"),
  rebar:              sym("rebar", "Connections and Lines", "Rebar", "rebar", 60, 10, {}, "lines"),
  wire_junction_dot:  sym("wire_junction_dot", "Connections and Lines", "Wire Junction Dot", "wire_junction", 20, 20, {}, "lines"),
  discontinuous:      sym("discontinuous", "Connections and Lines", "Discontinuous Line", "discontinuous", 60, 10, {}, "lines"),
  connection_l:       sym("connection_l", "Connections and Lines", "Connection L", "connection_l", 40, 40, {}, "lines"),
  connection_r:       sym("connection_r", "Connections and Lines", "Connection R", "connection_r", 40, 40, {}, "lines"),
  connection_t:       sym("connection_t", "Connections and Lines", "Connection T", "connection_t", 40, 40, {}, "lines"),
  connection_b:       sym("connection_b", "Connections and Lines", "Connection B", "connection_b", 40, 40, {}, "lines"),
  three_conductors_pe:sym("three_conductors_pe", "Connections and Lines", "3 Phase + PE", "multiconductor_3pe", 40, 60, {}, "lines"),
  four_conductors:    sym("four_conductors", "Connections and Lines", "4 Conductors", "multiconductor_4", 40, 60, {}, "lines"),
  three_conductors_n: sym("three_conductors_n", "Connections and Lines", "3 Phase + Neutral", "multiconductor_3n", 40, 60, {}, "lines"),
  two_conductors:     sym("two_conductors", "Connections and Lines", "2 Conductors", "multiconductor_2", 40, 60, {}, "lines"),
  two_conductors_n:   sym("two_conductors_n", "Connections and Lines", "2 Conductors + Neutral", "multiconductor_2n", 40, 60, {}, "lines"),
  single_conductor:   sym("single_conductor", "Connections and Lines", "1 Conductor", "multiconductor_1", 40, 60, {}, "lines"),
  neutral_conductor:  sym("neutral_conductor", "Connections and Lines", "Neutral Conductor", "multiconductor_n", 40, 60, {}, "lines"),
  protective_earth:   sym("protective_earth", "Connections and Lines", "Protective Earth (PE)", "multiconductor_pe", 40, 60, {}, "lines"),
  connector_base_1:   sym("connector_base_1", "Terminals and Connectors", "Connector Base", "connector_base", 30, 30, {}, "lines"),
  connector_base_2:   sym("connector_base_2", "Terminals and Connectors", "Connector Base (Pin)", "connector_base_pin", 30, 30, {}, "lines"),
  connector_base_3:   sym("connector_base_3", "Terminals and Connectors", "Connector Base (Soc)", "connector_base_soc", 30, 30, {}, "lines"),

  // ==========================================
  // --- Switches & Disconnectors (IEC) ---
  // ==========================================
  pushbutton_no:      sym("pushbutton_no", "Switches and Disconnectors", "NO Pushbutton", "pushbutton_no", 40, 50, {}, "iec"),
  pushbutton_nc:      sym("pushbutton_nc", "Switches and Disconnectors", "NC Pushbutton", "pushbutton_nc", 40, 50, {}, "iec"),
  emergency_stop_no:  sym("emergency_stop_no", "Switches and Disconnectors", "NO E-Stop", "emergency_stop_no", 40, 50, {}, "iec"),
  emergency_stop_nc:  sym("emergency_stop_nc", "Switches and Disconnectors", "NC E-Stop", "emergency_stop_nc", 40, 50, {}, "iec"),
  selector_switch_2:  sym("selector_switch_2", "Switches and Disconnectors", "2-Pos Selector", "selector_switch_2", 40, 50, {}, "iec"),
  selector_switch_3:  sym("selector_switch_3", "Switches and Disconnectors", "3-Pos Selector", "selector_switch_3", 40, 50, {}, "iec"),
  limit_switch_no:    sym("limit_switch_no", "Switches and Disconnectors", "NO Limit Switch", "limit_switch_no", 40, 50, {}, "iec"),
  limit_switch_nc:    sym("limit_switch_nc", "Switches and Disconnectors", "NC Limit Switch", "limit_switch_nc", 40, 50, {}, "iec"),
  isolator_1p:        sym("isolator_1p", "Switches and Disconnectors", "1P Isolator", "disconnect_switch", 40, 60, {}, "iec"),
  isolator_3p:        sym("isolator_3p", "Switches and Disconnectors", "3P Isolator", "isolator_3p", 60, 60, {}, "iec"),
  earthing_switch:    sym("earthing_switch", "Switches and Disconnectors", "Earthing Switch", "earthing_disconnector", 40, 60, {}, "iec"),
  load_break_switch:  sym("load_break_switch", "Switches and Disconnectors", "Load Break Switch", "switch_disconnector", 40, 60, {}, "iec"),
  fuse_switch_disc_1: sym("fuse_switch_disc_1", "Switches and Disconnectors", "1P Fuse Switch Disc", "disconnect_fuse_switch", 40, 60, {}, "iec"),
  fuse_switch_disc_3: sym("fuse_switch_disc_3", "Switches and Disconnectors", "3P Fuse Switch Disc", "fuse_switch_disc_3", 60, 60, {}, "iec"),

  // ==========================================
  // --- Switches & Disconnectors (ANSI) ---
  // ==========================================
  ansi_disconnect:     sym("ansi_disconnect", "Switches and Disconnectors", "Disconnect Switch", "ansi_disconnect", 40, 60, {}, "ansi"),
  ansi_pushbutton_no:  sym("ansi_pushbutton_no", "Switches and Disconnectors", "NO Pushbutton", "ansi_pushbutton_no", 40, 50, {}, "ansi"),
  ansi_pushbutton_nc:  sym("ansi_pushbutton_nc", "Switches and Disconnectors", "NC Pushbutton", "ansi_pushbutton_nc", 40, 50, {}, "ansi"),
  ansi_limit_switch_no:sym("ansi_limit_switch_no", "Switches and Disconnectors", "NO Limit Switch", "ansi_limit_switch_no", 40, 50, {}, "ansi"),
  ansi_limit_switch_nc:sym("ansi_limit_switch_nc", "Switches and Disconnectors", "NC Limit Switch", "ansi_limit_switch_nc", 40, 50, {}, "ansi"),

  // ==========================================
  // --- Breakers & Protection (IEC) ---
  // ==========================================
  mcb_1p:             sym("mcb_1p", "Breakers and Protection", "1P MCB", "circuit_breaker", 40, 60, {}, "iec"),
  mcb_2p:             sym("mcb_2p", "Breakers and Protection", "2P MCB", "circuit_breaker_2p", 50, 60, {}, "iec"),
  mcb_3p:             sym("mcb_3p", "Breakers and Protection", "3P MCB", "circuit_breaker_3p", 60, 60, {}, "iec"),
  mcb_4p:             sym("mcb_4p", "Breakers and Protection", "4P MCB", "circuit_breaker_4p", 70, 60, {}, "iec"),
  mccb:               sym("mccb", "Breakers and Protection", "MCCB", "mccb", 60, 80, {}, "iec"),
  acb:                sym("acb", "Breakers and Protection", "ACB", "acb", 70, 90, {}, "iec"),
  rcbo:               sym("rcbo", "Breakers and Protection", "RCBO / RCD", "rcbo", 50, 70, {}, "iec"),
  motor_circuit_brk:  sym("motor_circuit_brk", "Breakers and Protection", "Motor CB", "motor_cb", 50, 70, {}, "iec"),
  surge_arrester:     sym("surge_arrester", "Breakers and Protection", "Surge Arrester", "surge_arrester", 40, 60, {}, "iec"),
  thermal_protection: sym("thermal_protection", "Breakers and Protection", "Thermal Prot.", "thermal_protection", 40, 40, {}, "iec"),
  magnetic_protection:sym("magnetic_protection", "Breakers and Protection", "Magnetic Prot.", "magnetic_protection", 40, 40, {}, "iec"),

  // ==========================================
  // --- Breakers & Protection (ANSI) ---
  // ==========================================
  ansi_circuit_breaker: sym("ansi_circuit_breaker", "Breakers and Protection", "Circuit Breaker", "ansi_circuit_breaker", 40, 60, {}, "ansi"),
  ansi_cb_3p:           sym("ansi_cb_3p", "Breakers and Protection", "3P CB", "ansi_cb_3p", 60, 60, {}, "ansi"),

  // ==========================================
  // --- Fuses (IEC / ANSI) ---
  // ==========================================
  fuse_iec:           sym("fuse_iec", "Fuses", "Fuse (IEC)", "fuse", 20, 60, {}, "iec"),
  fuse_3p_iec:        sym("fuse_3p_iec", "Fuses", "3P Fuse (IEC)", "fuse_3p", 60, 60, {}, "iec"),
  fuse_disconnector:  sym("fuse_disconnector", "Fuses", "Fuse Disconnector", "fuse_disconnector", 40, 60, {}, "iec"),
  ansi_fuse:          sym("ansi_fuse", "Fuses", "Fuse (ANSI)", "ansi_fuse", 20, 60, {}, "ansi"),

  // ==========================================
  // --- Transformers (IEC / ANSI) ---
  // ==========================================
  transformer_iec:    sym("transformer_iec", "Transformers", "2-Winding Trafo", "transformer", 40, 60, {}, "iec"),
  transformer_3w_iec: sym("transformer_3w_iec", "Transformers", "3-Winding Trafo", "transformer_3w", 40, 80, {}, "iec"),
  auto_transformer:   sym("auto_transformer", "Transformers", "Auto Transformer", "auto_transformer", 40, 60, {}, "iec"),
  current_trans_iec:  sym("current_trans_iec", "Transformers", "Current Trans. (CT)", "current_transformer", 40, 40, {}, "iec"),
  potential_trans_iec:sym("potential_trans_iec", "Transformers", "Potential Trans. (PT)", "potential_transformer", 40, 40, {}, "iec"),
  ansi_transformer:   sym("ansi_transformer", "Transformers", "Transformer (ANSI)", "ansi_transformer", 50, 80, {}, "ansi"),
  ansi_pt:            sym("ansi_pt", "Transformers", "PT (ANSI)", "ansi_pt", 50, 50, {}, "ansi"),

  // ==========================================
  // --- Power Sources ---
  // ==========================================
  generator_ac:       sym("generator_ac", "Power Sources", "Generator (AC)", "generator", 50, 50, {}, "iec"),
  generator_dc:       sym("generator_dc", "Power Sources", "Generator (DC)", "generator_dc", 50, 50, {}, "iec"),
  motor_ac:           sym("motor_ac", "Motors and Generators", "Motor (AC)", "motor", 50, 50, {}, "iec"),
  motor_3p:           sym("motor_3p", "Motors and Generators", "3-Phase Motor", "motor_3p", 60, 50, {}, "iec"),
  ansi_motor:         sym("ansi_motor", "Motors and Generators", "Motor (ANSI)", "ansi_motor", 50, 50, {}, "ansi"),
  ansi_generator:     sym("ansi_generator", "Motors and Generators", "Generator (ANSI)", "ansi_generator", 50, 50, {}, "ansi"),
  battery:            sym("battery", "Power Sources", "Battery", "battery", 40, 50, {}, "iec"),
  battery_multi:      sym("battery_multi", "Power Sources", "Battery (Multi-cell)", "battery_multi", 40, 60, {}, "iec"),
  solar_panel:        sym("solar_panel", "Power Sources", "Solar Panel", "solar_panel", 60, 40, {}, "iec"),
  ups:                sym("ups", "Power Sources", "UPS", "ups", 60, 60, {}, "iec"),
  ground:             sym("ground", "Power Sources", "Ground / Earth", "ground", 40, 40, {}, "iec"),

  // ==========================================
  // --- Relays and Contactors ---
  // ==========================================
  contactor_1p:       sym("contactor_1p", "Relays and Contactors", "1P Contactor", "contactor", 40, 50, {}, "iec"),
  contactor_3p:       sym("contactor_3p", "Relays and Contactors", "3P Contactor", "contactor_3p", 60, 50, {}, "iec"),
  contactor_coil:     sym("contactor_coil", "Relays and Contactors", "Contactor Coil", "contactor_coil", 40, 50, {}, "iec"),
  relay_coil_iec:     sym("relay_coil_iec", "Relays and Contactors", "Relay Coil", "relay_coil", 40, 40, {}, "iec"),
  timer_relay_iec:    sym("timer_relay_iec", "Relays and Contactors", "Timer Relay", "timer_relay", 40, 40, {}, "iec"),
  overload_relay:     sym("overload_relay", "Relays and Contactors", "Overload Relay", "overload_relay", 40, 40, {}, "iec"),
  ansi_contactor:     sym("ansi_contactor", "Relays and Contactors", "Contactor (ANSI)", "ansi_contactor", 40, 50, {}, "ansi"),
  ansi_relay_coil:    sym("ansi_relay_coil", "Relays and Contactors", "Relay Coil (ANSI)", "ansi_relay_coil", 40, 40, {}, "ansi"),

  // ==========================================
  // --- Indicators, Meters & Passives ---
  // ==========================================
  ammeter:            sym("ammeter", "Metering", "Ammeter", "ammeter", 40, 40, {}, "iec"),
  voltmeter:          sym("voltmeter", "Metering", "Voltmeter", "voltmeter", 40, 40, {}, "iec"),
  wattmeter:          sym("wattmeter", "Metering", "Wattmeter", "wattmeter", 40, 40, {}, "iec"),
  frequency_meter:    sym("frequency_meter", "Metering", "Hz Meter", "frequency_meter", 40, 40, {}, "iec"),
  power_meter:        sym("power_meter", "Metering", "Multifunction Meter", "power_meter", 50, 50, {}, "iec"),
  lamp:               sym("lamp", "Indicators and Lamps", "Lamp/Indicator", "lamp", 40, 40, {}, "iec"),
  resistor:           sym("resistor", "Indicators and Lamps", "Resistor", "resistor", 60, 30, {}, "iec"),
  variable_resistor:  sym("variable_resistor", "Indicators and Lamps", "Variable Resistor", "variable_resistor", 60, 30, {}, "iec"),
  capacitor:          sym("capacitor", "Indicators and Lamps", "Capacitor", "capacitor", 40, 60, {}, "iec"),
  inductor:           sym("inductor", "Indicators and Lamps", "Inductor", "inductor", 60, 30, {}, "iec"),
  vfd:                sym("vfd", "Indicators and Lamps", "VFD Drive", "vfd", 50, 50, {}, "iec"),
};

// Expose object format for generic mapping
export const symbolRegistry = SYMBOL_REGISTRY;
