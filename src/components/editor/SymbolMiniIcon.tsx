import React from "react";

export function SymbolMiniIcon({ symbolType }: { symbolType: string }) {
  const size = 28;
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  const stroke = "currentColor";
  const sw = 1.5;

  switch (symbolType) {
    // ==========================================
    // --- Power Sources & Machines
    // ==========================================
    case "generator":
    case "generator_dc":
    case "ansi_generator":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">G</text></svg>;
    case "motor":
    case "motor_dc":
    case "ansi_motor":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">M</text></svg>;
    case "motor_3p":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="16" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">M</text><text x="14" y="22" textAnchor="middle" fill={stroke} fontSize="6">3~</text></svg>;
    case "battery":
      return <svg {...common}><line x1="10" y1="12" x2="18" y2="12" stroke={stroke} strokeWidth={2.5} /><line x1="12" y1="16" x2="16" y2="16" stroke={stroke} strokeWidth={sw} /></svg>;
    case "battery_multi":
      return <svg {...common}><line x1="10" y1="8" x2="18" y2="8" stroke={stroke} strokeWidth={2.5} /><line x1="12" y1="12" x2="16" y2="12" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="16" x2="18" y2="16" stroke={stroke} strokeWidth={2.5} /><line x1="12" y1="20" x2="16" y2="20" stroke={stroke} strokeWidth={sw} /></svg>;
    case "solar_panel":
      return <svg {...common}><rect x="4" y="6" width="20" height="16" rx="1" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="6" x2="14" y2="22" stroke={stroke} strokeWidth={sw} /><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /></svg>;
    case "ups":
      return <svg {...common}><rect x="4" y="6" width="20" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="16" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">UPS</text></svg>;
    case "ground":
    case "ansi_ground":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="6" y1="14" x2="22" y2="14" stroke={stroke} strokeWidth={2} /><line x1="9" y1="18" x2="19" y2="18" stroke={stroke} strokeWidth={2} /><line x1="12" y1="22" x2="16" y2="22" stroke={stroke} strokeWidth={2} /></svg>;

    // ==========================================
    // --- Breakers & Protection
    // ==========================================
    case "circuit_breaker":
    case "iec_cb_thermal":
    case "iec_cb_magnetic":
    case "iec_cb_therm_mag":
    case "ansi_circuit_breaker":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="20" y2="18" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="18" x2="18" y2="18" stroke={stroke} strokeWidth={sw} /></svg>;
    case "circuit_breaker_2p":
    case "circuit_breaker_3p":
    case "circuit_breaker_4p":
    case "mccb":
    case "acb":
    case "motor_cb":
    case "ansi_cb_3p":
      return <svg {...common}><rect x="6" y="4" width="16" height="20" rx="2" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="8" x2="18" y2="8" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="14" x2="14" y2="20" stroke={stroke} strokeWidth={sw}/></svg>;
    case "rcbo":
      return <svg {...common}><rect x="6" y="4" width="16" height="20" rx="2" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="20" r="2" stroke={stroke} strokeWidth={sw}/><line x1="10" y1="8" x2="18" y2="14" stroke={stroke} strokeWidth={sw}/></svg>;
    case "surge_arrester":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><polyline points="8,10 14,22 20,10" stroke={stroke} strokeWidth={sw} fill="none" /><line x1="14" y1="22" x2="14" y2="26" stroke={stroke} strokeWidth={sw} /></svg>;

    // ==========================================
    // --- Switches & Disconnectors (IEC)
    // ==========================================
    case "disconnect_switch":
    case "isolator_3p":
    case "ansi_disconnect":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="22" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "switch_disconnector":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="22" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><circle cx="18" cy="18" r="1.5" fill={stroke}/></svg>;
    case "earthing_disconnector":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="10" x2="20" y2="16" stroke={stroke} strokeWidth={sw} /><line x1="8" y1="18" x2="20" y2="18" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="21" x2="18" y2="21" stroke={stroke} strokeWidth={sw} /><line x1="12" y1="24" x2="16" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "pushbutton_no":
    case "iec_contact_no":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw}/><line x1="8" y1="8" x2="20" y2="8" stroke={stroke} strokeWidth={sw}/><line x1="10" y1="12" x2="18" y2="12" stroke={stroke} strokeWidth={sw}/><line x1="10" y1="12" x2="10" y2="16" stroke={stroke} strokeWidth={sw}/><line x1="18" y1="12" x2="18" y2="16" stroke={stroke} strokeWidth={sw}/></svg>;
    case "pushbutton_nc":
    case "iec_contact_nc":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="14" r="3" fill="none" stroke={stroke} strokeWidth={sw}/></svg>;
    case "pushbutton_mush":
      return <svg {...common}><path d="M8 8 C 8 4, 20 4, 20 8 Z" fill={stroke} stroke={stroke} strokeWidth={sw}/><line x1="14" y1="8" x2="14" y2="16" stroke={stroke} strokeWidth={sw}/></svg>;
    case "selector_switch_2":
    case "selector_switch_3":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="14" x2="20" y2="8" stroke={stroke} strokeWidth={sw}/></svg>;
    case "emergency_stop_no":
    case "emergency_stop_nc":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw}/><path d="M6 8 Q14 2 22 8 Z" fill="none" stroke={stroke} strokeWidth={sw}/></svg>;
    case "limit_switch_no":
    case "prox_switch_no":
      return <svg {...common}><rect x="8" y="4" width="12" height="12" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="16" x2="14" y2="24" stroke={stroke} strokeWidth={sw}/></svg>;
    case "limit_switch_nc":
    case "prox_switch_nc":
      return <svg {...common}><rect x="8" y="4" width="12" height="12" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="16" x2="14" y2="4" stroke={stroke} strokeWidth={sw}/></svg>;

    // ==========================================
    // --- Switches & Disconnectors (ANSI)
    // ==========================================
    case "ansi_contact_no":
    case "ansi_pushb_no":
    case "ansi_limit_sw_no":
    case "ansi_flow_sw_no":
    case "ansi_press_sw_no":
    case "ansi_temp_sw_no":
    case "ansi_level_sw_no":
    case "ansi_foot_sw_no":
    case "ansi_tdc_no":
    case "ansi_tdo_no":
      return <svg {...common}><polyline points="6,12 14,8 22,12" stroke={stroke} strokeWidth={sw} fill="none"/><line x1="14" y1="8" x2="14" y2="4" stroke={stroke} strokeWidth={sw}/></svg>;
    case "ansi_contact_nc":
    case "ansi_pushb_nc":
    case "ansi_limit_sw_nc":
    case "ansi_flow_sw_nc":
    case "ansi_press_sw_nc":
    case "ansi_temp_sw_nc":
    case "ansi_level_sw_nc":
    case "ansi_foot_sw_nc":
    case "ansi_tdc_nc":
    case "ansi_tdo_nc":
      return <svg {...common}><polyline points="6,12 14,14 22,12" stroke={stroke} strokeWidth={sw} fill="none"/><line x1="14" y1="14" x2="14" y2="4" stroke={stroke} strokeWidth={sw}/></svg>;
    case "ansi_pushb_mush_no":
    case "ansi_pushb_mush_nc":
      return <svg {...common}><path d="M8 8 C 8 4, 20 4, 20 8 Z" fill="none" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="8" x2="14" y2="16" stroke={stroke} strokeWidth={sw}/></svg>;


    // ==========================================
    // --- Fuses
    // ==========================================
    case "fuse":
    case "fuse_3p":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw} /><rect x="10" y="8" width="8" height="12" rx="2" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="20" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "fuse_disconnector":
    case "fuse_switch_disc":
    case "fuse_switch_disc_3":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="8" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="8" x2="20" y2="14" stroke={stroke} strokeWidth={sw} /><rect x="10" y="16" width="8" height="6" rx="1" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="22" x2="14" y2="26" stroke={stroke} strokeWidth={sw} /></svg>;
    case "ansi_fuse":
      return <svg {...common}><path d="M14 4 L14 8 Q10 14 14 20 L14 24" stroke={stroke} strokeWidth={sw} fill="none"/></svg>;

    // ==========================================
    // --- Relays and Contactors
    // ==========================================
    case "contactor":
    case "contactor_3p":
    case "ansi_contactor":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">K</text></svg>;
    case "contactor_coil":
    case "ansi_coil_latch":
    case "ansi_coil_unlatch":
      return <svg {...common}><rect x="6" y="6" width="16" height="12" stroke={stroke} strokeWidth={sw}/><line x1="6" y1="10" x2="22" y2="10" stroke={stroke} strokeWidth={sw}/></svg>;
    case "relay_coil":
    case "ansi_relay_coil":
    case "ansi_coil_timer":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw}/><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">R</text></svg>;
    case "timer_relay":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">T</text></svg>;
    case "overload_relay":
    case "thermal_relay":
    case "ansi_overload":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="bold">OL</text></svg>;

    // ==========================================
    // --- Transformers
    // ==========================================
    case "transformer":
    case "transformer_3w":
    case "auto_transformer":
      return <svg {...common}><circle cx="10" cy="11" r="5" stroke={stroke} strokeWidth={sw} /><circle cx="18" cy="17" r="5" stroke={stroke} strokeWidth={sw} /></svg>;
    case "current_transformer":
    case "ansi_ct":
      return <svg {...common}><circle cx="14" cy="14" r="7" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">CT</text></svg>;
    case "potential_transformer":
      return <svg {...common}><circle cx="14" cy="14" r="7" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">PT</text></svg>;
    case "ansi_transformer":
    case "ansi_trans_3p":
    case "ansi_auto_trans":
    case "ansi_pt":
      return <svg {...common}><path d="M14 4 Q6 8 14 12 Q6 16 14 20 L14 24" stroke={stroke} strokeWidth={sw} fill="none"/></svg>;

    // ==========================================
    // --- Meters & Indicators
    // ==========================================
    case "ammeter":
      return <svg {...common}><circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">A</text></svg>;
    case "voltmeter":
      return <svg {...common}><circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="bold">V</text></svg>;
    case "wattmeter":
    case "power_meter":
      return <svg {...common}><circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">W</text></svg>;
    case "frequency_meter":
      return <svg {...common}><circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="bold">Hz</text></svg>;
    case "lamp":
    case "ansi_lamp":
      return <svg {...common}><circle cx="14" cy="14" r="8" stroke={stroke} strokeWidth={sw} /><line x1="8" y1="8" x2="20" y2="20" stroke={stroke} strokeWidth={sw} /><line x1="20" y1="8" x2="8" y2="20" stroke={stroke} strokeWidth={sw} /></svg>;
    case "resistor":
    case "ansi_resistor":
      return <svg {...common}><polyline points="4,14 7,8 11,20 15,8 19,20 23,8 26,14" stroke={stroke} strokeWidth={sw} fill="none" /></svg>;
    case "variable_resistor":
      return <svg {...common}><polyline points="4,14 7,8 11,20 15,8 19,20 23,8 26,14" stroke={stroke} strokeWidth={sw} fill="none" /><line x1="4" y1="20" x2="24" y2="8" stroke={stroke} strokeWidth={sw}/></svg>;
    case "capacitor":
    case "ansi_capacitor":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="6" y1="10" x2="22" y2="10" stroke={stroke} strokeWidth={2} /><line x1="6" y1="16" x2="22" y2="16" stroke={stroke} strokeWidth={2} /><line x1="14" y1="16" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "inductor":
    case "ansi_inductor":
      return <svg {...common}><path d="M4,14 Q7,6 10,14 Q13,22 16,14 Q19,6 22,14 Q25,22 26,14" stroke={stroke} strokeWidth={sw} fill="none" /></svg>;
    case "ansi_horn":
    case "ansi_bell":
      return <svg {...common}><path d="M14 14 Q10 14 6 10 L22 10 Q18 14 14 14 Z" stroke={stroke} strokeWidth={sw} fill="none"/><line x1="14" y1="14" x2="14" y2="22" stroke={stroke} strokeWidth={sw}/></svg>;
    case "vfd":
      return <svg {...common}><rect x="6" y="6" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} /><text x="14" y="18" textAnchor="middle" fill={stroke} fontSize="7" fontWeight="bold">VFD</text></svg>;

    // ==========================================
    // --- Lines & Connections
    // ==========================================
    case "line_h":
      return <svg {...common}><line x1="2" y1="14" x2="26" y2="14" stroke={stroke} strokeWidth={sw} /></svg>;
    case "line_v":
      return <svg {...common}><line x1="14" y1="2" x2="14" y2="26" stroke={stroke} strokeWidth={sw} /></svg>;
    case "crossing":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="12" stroke={stroke} strokeWidth={sw} /><path d="M14 12 A 2 2 0 0 0 14 16" stroke={stroke} strokeWidth={sw} fill="none" /><line x1="14" y1="16" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /></svg>;
    case "crossing_straight":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /></svg>;
    case "diagonal":
      return <svg {...common}><line x1="4" y1="24" x2="24" y2="4" stroke={stroke} strokeWidth={sw} /></svg>;
    case "diagonal_rev":
      return <svg {...common}><line x1="4" y1="4" x2="24" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "cross_x":
      return <svg {...common}><line x1="6" y1="6" x2="22" y2="22" stroke={stroke} strokeWidth={sw} /><line x1="22" y1="6" x2="6" y2="22" stroke={stroke} strokeWidth={sw} /></svg>;
    case "wire_junction":
      return <svg {...common}><circle cx="14" cy="14" r="2.5" fill={stroke} /><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="14" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "discontinuous":
      return <svg {...common} strokeDasharray="2 2"><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /></svg>;
    case "connection_l":
      return <svg {...common}><line x1="14" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="14" x2="14" y2="4" stroke={stroke} strokeWidth={sw} /></svg>;
    case "connection_r":
      return <svg {...common}><line x1="4" y1="14" x2="14" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="14" x2="14" y2="4" stroke={stroke} strokeWidth={sw} /></svg>;
    case "connection_t":
      return <svg {...common}><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="14" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /></svg>;
    case "connection_b":
      return <svg {...common}><line x1="4" y1="14" x2="24" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="14" y1="14" x2="14" y2="4" stroke={stroke} strokeWidth={sw} /></svg>;
    
    case "plug_socket":
    case "connector_base":
    case "connector_base_pin":
    case "connector_base_soc":
      return <svg {...common}><rect x="10" y="10" width="8" height="8" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="4" x2="14" y2="10" stroke={stroke} strokeWidth={sw}/><line x1="14" y1="18" x2="14" y2="24" stroke={stroke} strokeWidth={sw}/></svg>;

    // ==========================================
    // --- Multiconductors
    // ==========================================
    case "multiconductor_1":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="16" x2="18" y2="12" stroke={stroke} strokeWidth={sw} /></svg>;
    case "multiconductor_2":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="18" x2="18" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="14" x2="18" y2="10" stroke={stroke} strokeWidth={sw} /></svg>;
    case "multiconductor_2n":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="16" x2="18" y2="12" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="12" x2="18" y2="8" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="20" r="1.5" fill={stroke}/></svg>;
    case "multiconductor_3n":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="14" x2="18" y2="10" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="11" x2="18" y2="7" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="8" x2="18" y2="4" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="19" r="1.5" fill={stroke}/></svg>;
    case "multiconductor_4":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="18" x2="18" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="15" x2="18" y2="11" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="12" x2="18" y2="8" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="9" x2="18" y2="5" stroke={stroke} strokeWidth={sw} /></svg>;
    case "multiconductor_4pe":
    case "multiconductor_3pen":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="18" x2="18" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="15" x2="18" y2="11" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="12" x2="18" y2="8" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="9" x2="18" y2="5" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="22" r="1.5" fill={stroke}/></svg>;
    case "multiconductor_n":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="14" r="2.5" fill={stroke}/></svg>;
    case "multiconductor_pe":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="14" x2="18" y2="14" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="16" r="1.5" fill={stroke}/></svg>;
    case "multiconductor_3pe":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="12" x2="18" y2="8" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="15" x2="18" y2="11" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="18" x2="18" y2="14" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="21" x2="18" y2="17" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="19" r="1.5" fill={stroke}/></svg>;
    case "multiconductor_pn":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="16" x2="18" y2="12" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="18" r="1.5" fill={stroke}/></svg>;
    case "multiconductor_ppe":
      return <svg {...common}><line x1="14" y1="4" x2="14" y2="24" stroke={stroke} strokeWidth={sw} /><line x1="10" y1="16" x2="18" y2="12" stroke={stroke} strokeWidth={sw} /><circle cx="14" cy="12" r="1.5" fill={stroke}/><line x1="10" y1="12" x2="18" y2="12" stroke={stroke} strokeWidth={sw} /></svg>;

    // Fallback for missing/generic
    default:
      return <svg {...common}><rect x="6" y="6" width="16" height="16" stroke={stroke} strokeWidth={sw} rx="2"/></svg>;
  }
}

export function SymbolButton({ sym, onClick }: { sym: any, onClick: () => void }) {
  return (
    <button
      draggable
      onClick={onClick}
      onDragStart={(e) => {
        e.dataTransfer.setData("application/worline-symbol", sym.id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-95 transition-all cursor-pointer select-none"
      style={{ minHeight: "84px" }}
    >
      <div className="text-foreground scale-125">
        <SymbolMiniIcon symbolType={sym.symbolType} />
      </div>
      <span className="text-[10px] leading-tight text-center font-medium text-muted-foreground w-full line-clamp-2 px-0.5" title={sym.displayName}>
        {sym.displayName}
      </span>
    </button>
  );
}
