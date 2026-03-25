import { Group, Rect, Circle, Line, Text, Arc, Path } from "react-konva";
import { SymbolObject } from "@/lib/editor/types";

export const RenderSymbol = ({ obj, isSelected }: { obj: SymbolObject, isSelected: boolean }) => {
  const { symbolId, width, height } = obj;

  const strokeColor = isSelected ? "blue" : "black";
  const strokeWidth = 2;

  // Render logic per symbol type
  // This is a simplified rendering mechanism.
  const renders: Record<string, React.ReactNode> = {
    breaker: (
      <Group>
        <Rect x={width*0.2} y={height*0.1} width={width*0.6} height={height*0.8} stroke={strokeColor} strokeWidth={strokeWidth} fill="white" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.9, width*0.5, height]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.2, height*0.3, width*0.8, height*0.7]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.2, height*0.7, width*0.8, height*0.3]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    fuse: (
      <Group>
        <Rect x={width*0.2} y={height*0.2} width={width*0.6} height={height*0.6} stroke={strokeColor} strokeWidth={strokeWidth} fill="white" />
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.2, width*0.5, height*0.8]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    transformer: (
      <Group>
        <Circle x={width*0.5} y={height*0.35} radius={height*0.25} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" />
        <Circle x={width*0.5} y={height*0.65} radius={height*0.25} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.9, width*0.5, height]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    motor: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={strokeWidth} fill="white" />
        <Text text="M" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={20} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    ground: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.5]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[0, height*0.5, width, height*0.5]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.2, height*0.7, width*0.8, height*0.7]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.4, height*0.9, width*0.6, height*0.9]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    generator: (
      <Group>
        <Circle x={width*0.5} y={height*0.5} radius={height*0.4} stroke={strokeColor} strokeWidth={strokeWidth} fill="white" />
        <Text text="G" x={0} y={height*0.5 - 10} width={width} align="center" fontSize={20} fill={strokeColor} fontStyle="bold" />
        <Line points={[width*0.5, 0, width*0.5, height*0.1]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    capacitor: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.4]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.2, height*0.4, width*0.8, height*0.4]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.2, height*0.6, width*0.8, height*0.6]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.6, width*0.5, height]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
    isolator: (
      <Group>
        <Line points={[width*0.5, 0, width*0.5, height*0.2]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.8, width*0.5, height]} stroke={strokeColor} strokeWidth={strokeWidth} />
        <Circle x={width*0.5} y={height*0.2} radius={3} stroke={strokeColor} fill="white" strokeWidth={strokeWidth} />
        <Circle x={width*0.5} y={height*0.8} radius={3} stroke={strokeColor} fill="white" strokeWidth={strokeWidth} />
        <Line points={[width*0.5, height*0.2, width*0.8, height*0.6]} stroke={strokeColor} strokeWidth={strokeWidth} />
      </Group>
    ),
  };

  return renders[symbolId] || (
    <Rect width={width} height={height} stroke="red" fill="pink" />
  );
};
