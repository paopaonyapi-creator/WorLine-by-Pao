// src/lib/editor/symbols/registry.ts

// Global categories matching typical standard libraries
export const categories: string[] = [
  "Power Sources",
  "Transformers",
  "Motors and Generators",
  "Connections and Lines",
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
  // --- Lines & Connections (Tab: lines) ---
  // ==========================================
  line_h:             sym("line_h", "Connections and Lines", "Horizontal Line", "line_h", 60, 10, {}, "lines"),
  line_v:             sym("line_v", "Connections and Lines", "Vertical Line", "line_v", 10, 60, {}, "lines"),
  crossing_no_conn:   sym("crossing_no_conn", "Connections and Lines", "Crossing (No Dot)", "crossing", 40, 40, {}, "lines"),
  crossing_straight:  sym("crossing_straight", "Connections and Lines", "Straight Crossing", "crossing_straight", 40, 40, {}, "lines"),
  diagonal:           sym("diagonal", "Connections and Lines", "Diagonal", "diagonal", 50, 50, {}, "lines"),
  diagonal_rev:       sym("diagonal_rev", "Connections and Lines", "Diagonal Rev", "diagonal_rev", 50, 50, {}, "lines"),
  cross_x:            sym("cross_x", "Connections and Lines", "Crossing X", "cross_x", 40, 40, {}, "lines"),
  rebar:              sym("rebar", "Connections and Lines", "Rebar", "line_h", 60, 10, {}, "lines"), // visual alias
  wire_junction_dot:  sym("wire_junction_dot", "Connections and Lines", "Wire Junction Dot", "wire_junction", 40, 40, {}, "lines"),
  discontinuous:      sym("discontinuous", "Connections and Lines", "Discontinuous Line", "discontinuous", 60, 10, {}, "lines"),
  connection_l:       sym("connection_l", "Connections and Lines", "Connection L", "connection_l", 40, 40, {}, "lines"),
  connection_r:       sym("connection_r", "Connections and Lines", "Connection R", "connection_r", 40, 40, {}, "lines"),
  connection_t:       sym("connection_t", "Connections and Lines", "Connection T", "connection_t", 40, 40, {}, "lines"),
  connection_b:       sym("connection_b", "Connections and Lines", "Connection B", "connection_b", 40, 40, {}, "lines"),
  
  // Multiconductors
  three_conductors_pe:   sym("three_conductors_pe", "Connections and Lines", "3 Cond + PE", "multiconductor_3pe", 40, 60, {}, "lines"),
  four_conductors:       sym("four_conductors", "Connections and Lines", "4 Conductors", "multiconductor_4", 40, 60, {}, "lines"),
  four_conductors_pe:    sym("four_conductors_pe", "Connections and Lines", "4 Cond + PE", "multiconductor_4pe", 40, 60, {}, "lines"),
  three_conductors_n:    sym("three_conductors_n", "Connections and Lines", "3 Cond + Neutral", "multiconductor_3n", 40, 60, {}, "lines"),
  three_conductors_pe_n: sym("three_conductors_pe_n", "Connections and Lines", "3 Cond + PE + N", "multiconductor_3pen", 50, 60, {}, "lines"),
  two_conductors:        sym("two_conductors", "Connections and Lines", "2 Conductors", "multiconductor_2", 40, 60, {}, "lines"),
  two_conductors_n:      sym("two_conductors_n", "Connections and Lines", "2 Cond + Neutral", "multiconductor_2n", 40, 60, {}, "lines"),
  single_conductor:      sym("single_conductor", "Connections and Lines", "1 Conductor", "multiconductor_1", 40, 60, {}, "lines"),
  neutral_conductor:     sym("neutral_conductor", "Connections and Lines", "Neutral Conductor", "multiconductor_n", 40, 60, {}, "lines"),
  protective_earth:      sym("protective_earth", "Connections and Lines", "Protective Earth (PE)", "multiconductor_pe", 40, 60, {}, "lines"),
  phase_neutral_cond:    sym("phase_neutral_cond", "Connections and Lines", "Phase + Neutral", "multiconductor_pn", 40, 60, {}, "lines"),
  phase_pe_cond:         sym("phase_pe_cond", "Connections and Lines", "Phase + PE", "multiconductor_ppe", 40, 60, {}, "lines"),

  // Connectors
  plug_socket:        sym("plug_socket", "Terminals and Connectors", "Plug and Socket", "plug_socket", 40, 60, {}, "lines"),
  connector_base_1:   sym("connector_base_1", "Terminals and Connectors", "Connector Base 1", "connector_base", 30, 30, {}, "lines"),
  connector_base_2:   sym("connector_base_2", "Terminals and Connectors", "Connector Base (Pin)", "connector_base_pin", 30, 30, {}, "lines"),
  connector_base_3:   sym("connector_base_3", "Terminals and Connectors", "Connector Base (Soc)", "connector_base_soc", 30, 30, {}, "lines"),

  // ==========================================
  // --- IEC Category ---
  // ==========================================
  
  // Breakers & Fuses (IEC)
  iec_cb_thermal:     sym("iec_cb_thermal", "Breakers and Protection", "CB Thermal (IEC)", "iec_cb_thermal", 40, 60, {}, "iec"),
  iec_cb_magnetic:    sym("iec_cb_magnetic", "Breakers and Protection", "CB Magnetic (IEC)", "iec_cb_magnetic", 40, 60, {}, "iec"),
  iec_cb_therm_mag:   sym("iec_cb_therm_mag", "Breakers and Protection", "CB Therm-Mag (IEC)", "iec_cb_therm_mag", 40, 60, {}, "iec"),
  mcb_1p:             sym("mcb_1p", "Breakers and Protection", "1P MCB", "circuit_breaker", 40, 60, {}, "iec"),
  mcb_2p:             sym("mcb_2p", "Breakers and Protection", "2P MCB", "circuit_breaker_2p", 50, 60, {}, "iec"),
  mcb_3p:             sym("mcb_3p", "Breakers and Protection", "3P MCB", "circuit_breaker_3p", 60, 60, {}, "iec"),
  mcb_4p:             sym("mcb_4p", "Breakers and Protection", "4P MCB", "circuit_breaker_4p", 70, 60, {}, "iec"),
  mccb:               sym("mccb", "Breakers and Protection", "MCCB", "mccb", 60, 80, {}, "iec"),
  acb:                sym("acb", "Breakers and Protection", "ACB", "acb", 70, 90, {}, "iec"),
  motor_circuit_brk:  sym("motor_circuit_brk", "Breakers and Protection", "Motor CB", "motor_cb", 50, 70, {}, "iec"),
  fuse_iec:           sym("fuse_iec", "Fuses", "Fuse", "fuse", 20, 60, {}, "iec"),
  fuse_3p_iec:        sym("fuse_3p_iec", "Fuses", "3P Fuse (IEC)", "fuse_3p", 60, 60, {}, "iec"),
  fuse_disconnector:  sym("fuse_disconnector", "Fuses", "Fuse Disconnector", "fuse_disconnector", 40, 60, {}, "iec"),
  fuse_switch_disc:   sym("fuse_switch_disc", "Fuses", "Fuse Switch Disc.", "fuse_switch_disc", 40, 60, {}, "iec"),
  fuse_switch_disc_3: sym("fuse_switch_disc_3", "Switches and Disconnectors", "3P Fuse Switch Disc", "fuse_switch_disc_3", 60, 60, {}, "iec"),
  thermal_relay_iec:  sym("thermal_relay_iec", "Relays and Contactors", "Thermal Relay", "thermal_relay", 40, 60, {}, "iec"),
  rcbo_iec:           sym("rcbo_iec", "Breakers and Protection", "RCBO / RCD", "rcbo", 50, 70, {}, "iec"),
  surge_arrester_iec: sym("surge_arrester_iec", "Breakers and Protection", "Surge Arrester", "surge_arrester", 40, 60, {}, "iec"),

  // Machines (IEC)
  generator_ac:       sym("generator_ac", "Power Sources", "Generator (AC)", "generator", 50, 50, {}, "iec"),
  generator_dc:       sym("generator_dc", "Power Sources", "Generator (DC)", "generator_dc", 50, 50, {}, "iec"),
  motor_ac:           sym("motor_ac", "Motors and Generators", "Motor 1P (AC)", "motor", 50, 50, {}, "iec"),
  motor_dc:           sym("motor_dc", "Motors and Generators", "Motor (DC)", "motor_dc", 50, 50, {}, "iec"),
  motor_3p:           sym("motor_3p", "Motors and Generators", "Motor 3P", "motor_3p", 60, 50, {}, "iec"),

  // Switches / Contacts (IEC)
  iec_contact_no:     sym("iec_contact_no", "Switches and Disconnectors", "Contact NO", "iec_contact_no", 40, 50, {}, "iec"),
  iec_contact_nc:     sym("iec_contact_nc", "Switches and Disconnectors", "Contact NC", "iec_contact_nc", 40, 50, {}, "iec"),
  iec_pushbutton_no:  sym("iec_pushbutton_no", "Switches and Disconnectors", "Pushbutton NO", "pushbutton_no", 40, 50, {}, "iec"),
  iec_pushbutton_nc:  sym("iec_pushbutton_nc", "Switches and Disconnectors", "Pushbutton NC", "pushbutton_nc", 40, 50, {}, "iec"),
  iec_pushbutton_mush:sym("iec_pushbutton_mush", "Switches and Disconnectors", "Pushbutton Mush.", "pushbutton_mush", 40, 50, {}, "iec"),
  iec_limit_sw_no:    sym("iec_limit_sw_no", "Switches and Disconnectors", "Limit Switch NO", "limit_switch_no", 40, 50, {}, "iec"),
  iec_limit_sw_nc:    sym("iec_limit_sw_nc", "Switches and Disconnectors", "Limit Switch NC", "limit_switch_nc", 40, 50, {}, "iec"),
  iec_prox_sw_no:     sym("iec_prox_sw_no", "Switches and Disconnectors", "Proximity Switch NO", "prox_switch_no", 40, 50, {}, "iec"),
  iec_prox_sw_nc:     sym("iec_prox_sw_nc", "Switches and Disconnectors", "Proximity Switch NC", "prox_switch_nc", 40, 50, {}, "iec"),
  iec_selector_2:     sym("iec_selector_2", "Switches and Disconnectors", "Selector 2-Pos", "selector_switch_2", 40, 50, {}, "iec"),
  iec_selector_3:     sym("iec_selector_3", "Switches and Disconnectors", "Selector 3-Pos", "selector_switch_3", 40, 50, {}, "iec"),
  iec_switch_disc_1p: sym("iec_switch_disc_1p", "Switches and Disconnectors", "Disconnect Switch 1P", "disconnect_switch", 40, 60, {}, "iec"),
  iec_switch_disc_3p: sym("iec_switch_disc_3p", "Switches and Disconnectors", "Disconnect Switch 3P", "isolator_3p", 60, 60, {}, "iec"),
  iec_load_break:     sym("iec_load_break", "Switches and Disconnectors", "Load Break Switch", "switch_disconnector", 40, 60, {}, "iec"),
  iec_earthing_sw:    sym("iec_earthing_sw", "Switches and Disconnectors", "Earthing Switch", "earthing_disconnector", 40, 60, {}, "iec"),
  
  // Contactors (IEC)
  contactor_1p:       sym("contactor_1p", "Relays and Contactors", "1P Contactor", "contactor", 40, 50, {}, "iec"),
  contactor_3p:       sym("contactor_3p", "Relays and Contactors", "3P Contactor", "contactor_3p", 60, 50, {}, "iec"),

  // Transformers & Coils (IEC)
  transformer_iec:    sym("transformer_iec", "Transformers", "2-Winding Trafo", "transformer", 40, 60, {}, "iec"),
  transformer_3w_iec: sym("transformer_3w_iec", "Transformers", "3-Winding Trafo", "transformer_3w", 40, 80, {}, "iec"),
  auto_transformer:   sym("auto_transformer", "Transformers", "Auto Transformer", "auto_transformer", 40, 60, {}, "iec"),
  potential_trans_iec:sym("potential_trans_iec", "Transformers", "Potential Trans (PT)", "potential_transformer", 40, 40, {}, "iec"),
  current_trans_iec:  sym("current_trans_iec", "Transformers", "Current Trans (CT)", "current_transformer", 40, 40, {}, "iec"),
  iec_relay_coil:     sym("iec_relay_coil", "Relays and Contactors", "Relay Coil", "relay_coil", 40, 40, {}, "iec"),
  iec_timer_coil:     sym("iec_timer_coil", "Relays and Contactors", "Timer Coil", "timer_relay", 40, 40, {}, "iec"),
  iec_contactor_coil: sym("iec_contactor_coil", "Relays and Contactors", "Contactor Coil", "contactor_coil", 40, 50, {}, "iec"),
  overload_relay:     sym("overload_relay", "Relays and Contactors", "Overload Relay", "overload_relay", 40, 40, {}, "iec"),

  // Passives & Indicators
  lamp_iec:           sym("lamp_iec", "Indicators and Lamps", "Lamp", "lamp", 40, 40, {}, "iec"),
  resistor_iec:       sym("resistor_iec", "Indicators and Lamps", "Resistor", "resistor", 60, 30, {}, "iec"),
  var_resistor_iec:   sym("var_resistor_iec", "Indicators and Lamps", "Variable Resistor", "variable_resistor", 60, 30, {}, "iec"),
  capacitor_iec:      sym("capacitor_iec", "Indicators and Lamps", "Capacitor", "capacitor", 40, 60, {}, "iec"),
  inductor_iec:       sym("inductor_iec", "Indicators and Lamps", "Inductor", "inductor", 60, 30, {}, "iec"),
  battery_iec:        sym("battery_iec", "Power Sources", "Battery", "battery", 40, 50, {}, "iec"),
  ground_iec:         sym("ground_iec", "Power Sources", "Ground", "ground", 40, 40, {}, "iec"),
  solar_iec:          sym("solar_iec", "Power Sources", "Solar Panel", "solar_panel", 60, 40, {}, "iec"),
  ups_iec:            sym("ups_iec", "Power Sources", "UPS", "ups", 60, 60, {}, "iec"),
  vfd:                sym("vfd", "Indicators and Lamps", "VFD Drive", "vfd", 50, 50, {}, "iec"),

  // Meters
  ammeter:            sym("ammeter", "Metering", "Ammeter", "ammeter", 40, 40, {}, "iec"),
  voltmeter:          sym("voltmeter", "Metering", "Voltmeter", "voltmeter", 40, 40, {}, "iec"),
  wattmeter:          sym("wattmeter", "Metering", "Wattmeter", "wattmeter", 40, 40, {}, "iec"),
  hz_meter:           sym("hz_meter", "Metering", "Hz Meter", "frequency_meter", 40, 40, {}, "iec"),
  power_meter:        sym("power_meter", "Metering", "Power Meter", "power_meter", 50, 50, {}, "iec"),

  // ==========================================
  // --- ANSI Category ---
  // ==========================================
  
  // Contacts & Pushbuttons (ANSI)
  ansi_contact_no:    sym("ansi_contact_no", "Switches and Disconnectors", "Contact NO", "ansi_contact_no", 40, 50, {}, "ansi"),
  ansi_contact_nc:    sym("ansi_contact_nc", "Switches and Disconnectors", "Contact NC", "ansi_contact_nc", 40, 50, {}, "ansi"),
  ansi_pushb_no:      sym("ansi_pushb_no", "Switches and Disconnectors", "Pushbutton NO", "ansi_pushb_no", 40, 50, {}, "ansi"),
  ansi_pushb_nc:      sym("ansi_pushb_nc", "Switches and Disconnectors", "Pushbutton NC", "ansi_pushb_nc", 40, 50, {}, "ansi"),
  ansi_pushb_mush_no: sym("ansi_pushb_mush_no", "Switches and Disconnectors", "Mushroom NO", "ansi_pushb_mush_no", 40, 50, {}, "ansi"),
  ansi_pushb_mush_nc: sym("ansi_pushb_mush_nc", "Switches and Disconnectors", "Mushroom NC", "ansi_pushb_mush_nc", 40, 50, {}, "ansi"),
  
  // Specialized Switches (ANSI)
  ansi_limit_sw_no:   sym("ansi_limit_sw_no", "Switches and Disconnectors", "Limit Switch NO", "ansi_limit_sw_no", 40, 50, {}, "ansi"),
  ansi_limit_sw_nc:   sym("ansi_limit_sw_nc", "Switches and Disconnectors", "Limit Switch NC", "ansi_limit_sw_nc", 40, 50, {}, "ansi"),
  ansi_flow_sw_no:    sym("ansi_flow_sw_no", "Switches and Disconnectors", "Flow Switch NO", "ansi_flow_sw_no", 40, 50, {}, "ansi"),
  ansi_flow_sw_nc:    sym("ansi_flow_sw_nc", "Switches and Disconnectors", "Flow Switch NC", "ansi_flow_sw_nc", 40, 50, {}, "ansi"),
  ansi_press_sw_no:   sym("ansi_press_sw_no", "Switches and Disconnectors", "Pressure Switch NO", "ansi_press_sw_no", 40, 50, {}, "ansi"),
  ansi_press_sw_nc:   sym("ansi_press_sw_nc", "Switches and Disconnectors", "Pressure Switch NC", "ansi_press_sw_nc", 40, 50, {}, "ansi"),
  ansi_temp_sw_no:    sym("ansi_temp_sw_no", "Switches and Disconnectors", "Temp Switch NO", "ansi_temp_sw_no", 40, 50, {}, "ansi"),
  ansi_temp_sw_nc:    sym("ansi_temp_sw_nc", "Switches and Disconnectors", "Temp Switch NC", "ansi_temp_sw_nc", 40, 50, {}, "ansi"),
  ansi_level_sw_no:   sym("ansi_level_sw_no", "Switches and Disconnectors", "Level Switch NO", "ansi_level_sw_no", 40, 50, {}, "ansi"),
  ansi_level_sw_nc:   sym("ansi_level_sw_nc", "Switches and Disconnectors", "Level Switch NC", "ansi_level_sw_nc", 40, 50, {}, "ansi"),
  ansi_foot_sw_no:    sym("ansi_foot_sw_no", "Switches and Disconnectors", "Foot Switch NO", "ansi_foot_sw_no", 40, 50, {}, "ansi"),
  ansi_foot_sw_nc:    sym("ansi_foot_sw_nc", "Switches and Disconnectors", "Foot Switch NC", "ansi_foot_sw_nc", 40, 50, {}, "ansi"),
  
  // Timing Contacts (ANSI) - Time delay closing/opening
  ansi_tdc_no:        sym("ansi_tdc_no", "Switches and Disconnectors", "NO Time Delay Close", "ansi_tdc_no", 40, 60, {}, "ansi"),
  ansi_tdc_nc:        sym("ansi_tdc_nc", "Switches and Disconnectors", "NC Time Delay Close", "ansi_tdc_nc", 40, 60, {}, "ansi"),
  ansi_tdo_no:        sym("ansi_tdo_no", "Switches and Disconnectors", "NO Time Delay Open", "ansi_tdo_no", 40, 60, {}, "ansi"),
  ansi_tdo_nc:        sym("ansi_tdo_nc", "Switches and Disconnectors", "NC Time Delay Open", "ansi_tdo_nc", 40, 60, {}, "ansi"),
  
  // Breakers & Disconnects (ANSI)
  ansi_disconnect:    sym("ansi_disconnect", "Switches and Disconnectors", "Disconnect Switch", "ansi_disconnect", 40, 60, {}, "ansi"),
  ansi_cb:            sym("ansi_cb", "Breakers and Protection", "Circuit Breaker", "ansi_circuit_breaker", 40, 60, {}, "ansi"),
  ansi_cb_3p:         sym("ansi_cb_3p", "Breakers and Protection", "CB 3-Pole", "ansi_cb_3p", 60, 60, {}, "ansi"),
  ansi_fuse:          sym("ansi_fuse", "Fuses", "Fuse", "ansi_fuse", 20, 60, {}, "ansi"),
  
  // Coils & Relays (ANSI)
  ansi_coil:          sym("ansi_coil", "Relays and Contactors", "Operating Coil", "ansi_relay_coil", 40, 40, {}, "ansi"),
  ansi_coil_latch:    sym("ansi_coil_latch", "Relays and Contactors", "Latch Coil", "ansi_coil_latch", 40, 40, {}, "ansi"),
  ansi_coil_unlatch:  sym("ansi_coil_unlatch", "Relays and Contactors", "Unlatch Coil", "ansi_coil_unlatch", 40, 40, {}, "ansi"),
  ansi_coil_timer:    sym("ansi_coil_timer", "Relays and Contactors", "Timer Coil", "ansi_coil_timer", 40, 40, {}, "ansi"),
  ansi_overload:      sym("ansi_overload", "Relays and Contactors", "Overload Heater", "ansi_overload", 40, 40, {}, "ansi"),
  ansi_contactor:     sym("ansi_contactor", "Relays and Contactors", "Contactor (ANSI)", "ansi_contactor", 40, 50, {}, "ansi"),

  // Transformers & Machines (ANSI)
  ansi_trans_1p:      sym("ansi_trans_1p", "Transformers", "1P Transformer", "ansi_transformer", 50, 80, {}, "ansi"),
  ansi_trans_3p:      sym("ansi_trans_3p", "Transformers", "3P Transformer", "ansi_trans_3p", 70, 80, {}, "ansi"),
  ansi_auto_trans:    sym("ansi_auto_trans", "Transformers", "Auto Transformer", "ansi_auto_trans", 50, 80, {}, "ansi"),
  ansi_pt:            sym("ansi_pt", "Transformers", "Potential Transformer", "ansi_pt", 50, 50, {}, "ansi"),
  ansi_ct:            sym("ansi_ct", "Transformers", "Current Transformer", "ansi_ct", 40, 40, {}, "ansi"),
  ansi_motor:         sym("ansi_motor", "Motors and Generators", "Motor", "ansi_motor", 50, 50, {}, "ansi"),
  ansi_gen:           sym("ansi_gen", "Motors and Generators", "Generator", "ansi_generator", 50, 50, {}, "ansi"),

  // Passives (ANSI style)
  ansi_resistor:      sym("ansi_resistor", "Indicators and Lamps", "Resistor", "ansi_resistor", 60, 20, {}, "ansi"),
  ansi_capacitor:     sym("ansi_capacitor", "Indicators and Lamps", "Capacitor", "ansi_capacitor", 40, 60, {}, "ansi"),
  ansi_inductor:      sym("ansi_inductor", "Indicators and Lamps", "Inductor", "ansi_inductor", 60, 20, {}, "ansi"),
  ansi_lamp:          sym("ansi_lamp", "Indicators and Lamps", "Lamp", "ansi_lamp", 40, 40, {}, "ansi"),
  ansi_horn:          sym("ansi_horn", "Indicators and Lamps", "Horn / Alarm", "ansi_horn", 40, 40, {}, "ansi"),
  ansi_bell:          sym("ansi_bell", "Indicators and Lamps", "Bell", "ansi_bell", 40, 40, {}, "ansi"),
  ansi_ground:        sym("ansi_ground", "Power Sources", "Ground", "ansi_ground", 40, 40, {}, "ansi"),
}; // END OF SYMBOL_REGISTRY

// Expose object format for generic mapping
export const symbolRegistry = SYMBOL_REGISTRY;
