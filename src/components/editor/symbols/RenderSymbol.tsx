import { Group, Rect, Circle, Line, Text } from "react-konva";
import { SymbolObject } from "@/lib/editor/types";

export const RenderSymbol = ({ obj, isSelected }: { obj: SymbolObject, isSelected: boolean }) => {
  const { symbolId, width, height } = obj;

  const strokeColor = isSelected ? "blue" : "black";
  const sw = 2;

  const renders: Record<string, React.ReactNode> = {
    // --- Power Sources ---
    generator: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="G" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={20} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    motor: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="M" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={20} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    battery: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.25]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.25, width*0.8, height*0.25]} stroke={strokeColor} strokeWidth={3} />
        <Line points={[width*0.35, height*0.35, width*0.65, height*0.35]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.45, width*0.8, height*0.45]} stroke={strokeColor} strokeWidth={3} />
        <Line points={[width*0.35, height*0.55, width*0.65, height*0.55]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.55, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    solar_panel: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="PV" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={16} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- Switchgear ---
    circuit_breaker: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.2} y={height*0.2} width={width*0.6} height={height*0.6} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Line points={[width*0.2, height*0.35, width*0.8, height*0.65]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.65, width*0.8, height*0.35]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    disconnect_switch: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.2} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.8} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.5, height*0.2, width*0.8, height*0.6]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    fuse: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.2} y={height*0.2} width={width*0.6} height={height*0.6} stroke={strokeColor} strokeWidth={sw} fill="white" rx={4} ry={4} />
        <Line points={[width*0.5, height*0.2, width*0.5, height*0.8]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    contactor: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="K" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={18} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.85, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- Transformers ---
    transformer: (
      <Group>
        <Circle x={width*0.5} y={height*0.35} radius={height*0.25} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Circle x={width*0.5} y={height*0.65} radius={height*0.25} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.9, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    current_transformer: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="CT" x={0} y={height*0.5 - 8} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.85, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- Loads ---
    resistor: (
      <Group>
        <Line points={[0, height*0.5, width*0.1, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[
          width*0.1, height*0.5,
          width*0.2, height*0.2,
          width*0.3, height*0.8,
          width*0.4, height*0.2,
          width*0.5, height*0.8,
          width*0.6, height*0.2,
          width*0.7, height*0.8,
          width*0.8, height*0.2,
          width*0.9, height*0.5
        ]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.9, height*0.5, width, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    capacitor: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.4]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.4, width*0.8, height*0.4]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.6, width*0.8, height*0.6]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.6, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    inductor: (
      <Group>
        <Line points={[0, height*0.5, width*0.1, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
        {/* Coil bumps */}
        <Circle x={width*0.2} y={height*0.5} radius={width*0.08} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Circle x={width*0.35} y={height*0.5} radius={width*0.08} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Circle x={width*0.5} y={height*0.5} radius={width*0.08} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Circle x={width*0.65} y={height*0.5} radius={width*0.08} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Circle x={width*0.8} y={height*0.5} radius={width*0.08} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Line points={[width*0.9, height*0.5, width, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    lamp: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Line points={[width*0.25, height*0.25, width*0.75, height*0.75]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.75, height*0.25, width*0.25, height*0.75]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- Protection ---
    relay: (
      <Group>
        <Rect x={width*0.1} y={height*0.1} width={width*0.8} height={height*0.8} stroke={strokeColor} strokeWidth={sw} fill="white" rx={4} ry={4} />
        <Text text="R" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={18} fill={strokeColor} fontStyle="bold" />
      </Group>
    ),
    surge_arrester: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.2, width*0.5, height*0.6, width*0.8, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.6, width*0.8, height*0.6]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.6, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- Connections ---
    busbar: (
      <Group>
        <Line points={[0, height*0.5, width, height*0.5]} stroke={strokeColor} strokeWidth={4} />
      </Group>
    ),
    ground: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[0, height*0.5, width, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.7, width*0.8, height*0.7]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.4, height*0.9, width*0.6, height*0.9]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    junction: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={width*0.3} stroke={strokeColor} fill={strokeColor} />
      </Group>
    ),

    // --- New Symbols ---
    wind_turbine: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="WT" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={16} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    ats: (
      <Group>
        <Rect x={width*0.1} y={height*0.1} width={width*0.8} height={height*0.8} stroke={strokeColor} strokeWidth={sw} fill="white" rx={4} ry={4} />
        <Text text="ATS" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.9, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    potential_transformer: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="PT" x={0} y={height*0.5 - 8} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.85, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    vfd: (
      <Group>
        <Rect x={width*0.1} y={height*0.1} width={width*0.8} height={height*0.8} stroke={strokeColor} strokeWidth={sw} fill="white" rx={4} ry={4} />
        <Text text="VFD" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={13} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.9, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    overload_relay: (
      <Group>
        <Rect x={width*0.1} y={height*0.1} width={width*0.8} height={height*0.8} stroke={strokeColor} strokeWidth={sw} fill="white" rx={4} ry={4} />
        <Text text="OL" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={16} fill={strokeColor} fontStyle="bold" />
      </Group>
    ),
    power_meter: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="kW" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
      </Group>
    ),
    ammeter: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="A" x={0} y={height*0.5 - 8} width={width} align="center" fontSize={18} fill={strokeColor} fontStyle="bold" />
      </Group>
    ),

    // Legacy aliases
    breaker: (
      <Group>
        <Rect x={width*0.2} y={height*0.1} width={width*0.6} height={height*0.8} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.9, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.3, width*0.8, height*0.7]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.7, width*0.8, height*0.3]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    isolator: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.2} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.8} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.5, height*0.2, width*0.8, height*0.6]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- New IEC Switchgear ---
    switch_disconnector: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.2} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.8} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.5, height*0.2, width*0.85, height*0.55]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.6, height*0.65, width*0.85, height*0.55]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.75, height*0.65, width*0.85, height*0.55]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    earthing_disconnector: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.2} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.5, height*0.2, width*0.8, height*0.55]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.6, width*0.5, height*0.7]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.7, width*0.8, height*0.7]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.3, height*0.8, width*0.7, height*0.8]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.4, height*0.9, width*0.6, height*0.9]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    plug_in_switch: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.85, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.15} y={height*0.15} width={width*0.7} height={height*0.7} stroke={strokeColor} strokeWidth={sw} fill="white" rx={3} ry={3} />
        <Circle x={width*0.35} y={height*0.5} radius={4} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Circle x={width*0.65} y={height*0.5} radius={4} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.35, height*0.35, width*0.65, height*0.65]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    differential_switch: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.1} y={height*0.15} width={width*0.8} height={height*0.55} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Line points={[width*0.2, height*0.35, width*0.8, height*0.55]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.2, height*0.55, width*0.8, height*0.35]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.8} radius={height*0.08} stroke={strokeColor} strokeWidth={sw} fill="transparent" />
        <Line points={[width*0.5, height*0.7, width*0.5, height*0.72]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.88, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    fuse_disconnector: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.18} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.5, height*0.18, width*0.8, height*0.4]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.2} y={height*0.45} width={width*0.6} height={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" rx={3} ry={3} />
        <Line points={[width*0.5, height*0.45, width*0.5, height*0.8]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    disconnect_fuse_switch: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.12]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.15} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.55} radius={3} stroke={strokeColor} fill="white" strokeWidth={sw} />
        <Line points={[width*0.5, height*0.15, width*0.8, height*0.4]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.2} y={height*0.6} width={width*0.6} height={height*0.25} stroke={strokeColor} strokeWidth={sw} fill="white" rx={3} ry={3} />
        <Line points={[width*0.5, height*0.6, width*0.5, height*0.85]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.85, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    contactor_coil: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Circle x={width*0.5} y={height*0.35} radius={height*0.18} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="K" x={0} y={height*0.28} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
        <Rect x={width*0.2} y={height*0.6} width={width*0.6} height={height*0.2} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),

    // --- New Protection ---
    thermal_protection: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.1} y={height*0.15} width={width*0.8} height={height*0.6} stroke={strokeColor} strokeWidth={sw} fill="white" rx={3} ry={3} />
        <Text text="θ" x={0} y={height*0.35} width={width} align="center" fontSize={20} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, height*0.75, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    magnetic_protection: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.1} y={height*0.15} width={width*0.8} height={height*0.6} stroke={strokeColor} strokeWidth={sw} fill="white" rx={3} ry={3} />
        <Text text="I>" x={0} y={height*0.32} width={width} align="center" fontSize={16} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, height*0.75, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    instantaneous_overcurrent: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.1} y={height*0.15} width={width*0.8} height={height*0.6} stroke={strokeColor} strokeWidth={sw} fill="white" rx={3} ry={3} />
        <Text text="I>>" x={0} y={height*0.32} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, height*0.75, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    relay_coil: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.15]} stroke={strokeColor} strokeWidth={sw} />
        <Rect x={width*0.15} y={height*0.15} width={width*0.7} height={height*0.7} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Line points={[width*0.3, height*0.5, width*0.45, height*0.35, width*0.55, height*0.65, width*0.7, height*0.5]} stroke={strokeColor} strokeWidth={sw} />
        <Line points={[width*0.5, height*0.85, width*0.5, height]} stroke={strokeColor} strokeWidth={sw} />
      </Group>
    ),
    timer_relay: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="T" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={18} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, height*0.1, width*0.5, height*0.25]} stroke={strokeColor} strokeWidth={1} />
        <Line points={[width*0.5, height*0.25, width*0.65, height*0.3]} stroke={strokeColor} strokeWidth={1} />
      </Group>
    ),

    // --- New Metering ---
    voltmeter: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="V" x={0} y={height*0.5 - 8} width={width} align="center" fontSize={18} fill={strokeColor} fontStyle="bold" />
      </Group>
    ),
    frequency_meter: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.35} stroke={strokeColor} strokeWidth={sw} fill="white" />
        <Text text="Hz" x={0} y={height*0.5 - 8} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
      </Group>
    ),
  };

  return renders[symbolId] || (
    <Group>
      <Rect width={width} height={height} stroke={strokeColor} strokeWidth={sw} fill="white" />
      <Text text={symbolId?.slice(0, 3)?.toUpperCase() || "?"} x={0} y={height*0.5 - 8} width={width} align="center" fontSize={14} fill={strokeColor} fontStyle="bold" />
    </Group>
  );
};
