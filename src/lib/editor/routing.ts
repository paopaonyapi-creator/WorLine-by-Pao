import { SymbolObject } from "./types";

/**
 * Get the 4 terminal positions (world coordinates) for a symbol,
 * accounting for rotation. Terminals: top, bottom, left, right.
 */
export function getTerminalWorldPositions(obj: SymbolObject) {
  const w = obj.width || 60;
  const h = obj.height || 60;
  const rotation = (obj.rotation || 0) % 360;

  // Base terminal offsets relative to symbol origin (top-left)
  const baseTerminals = [
    { id: "top",    dx: w / 2, dy: 0,     dir: "up"    as const },
    { id: "bottom", dx: w / 2, dy: h,     dir: "down"  as const },
    { id: "left",   dx: 0,     dy: h / 2, dir: "left"  as const },
    { id: "right",  dx: w,     dy: h / 2, dir: "right" as const },
  ];

  // Rotation around symbol center
  const cx = w / 2;
  const cy = h / 2;
  const rad = (rotation * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);

  const dirRotationMap: Record<string, Record<number, "up" | "down" | "left" | "right">> = {
    up:    { 0: "up",    90: "right", 180: "down",  270: "left"  },
    down:  { 0: "down",  90: "left",  180: "up",    270: "right" },
    left:  { 0: "left",  90: "up",    180: "right", 270: "down"  },
    right: { 0: "right", 90: "down",  180: "left",  270: "up"    },
  };

  return baseTerminals.map((t) => {
    // Rotate offset around center
    const relX = t.dx - cx;
    const relY = t.dy - cy;
    const rotX = relX * cosA - relY * sinA;
    const rotY = relX * sinA + relY * cosA;

    return {
      id: t.id,
      x: obj.x + cx + rotX,
      y: obj.y + cy + rotY,
      direction: dirRotationMap[t.dir]?.[rotation] || t.dir,
    };
  });
}

/**
 * Find a specific terminal by ID on a symbol
 */
export function getTerminalPosition(obj: SymbolObject, terminalId: string) {
  const terminals = getTerminalWorldPositions(obj);
  return terminals.find((t) => t.id === terminalId) || terminals[0];
}

/**
 * Calculate smart orthogonal wire route between two symbol terminals.
 * Uses terminal direction to determine exit/entry stub, then routes
 * with a clean orthogonal (Manhattan-style) path.
 */
export function calculateOrthogonalRoute(
  startObj: SymbolObject,
  startTerminalId: string,
  endObj: SymbolObject,
  endTerminalId: string
): number[] {
  const start = getTerminalPosition(startObj, startTerminalId);
  const end = getTerminalPosition(endObj, endTerminalId);

  if (!start || !end) return [start?.x || 0, start?.y || 0, end?.x || 0, end?.y || 0];

  const STUB = 20; // Exit stub length (pixels)

  // Calculate stub exit points based on terminal direction
  const exitPoint = getStubPoint(start.x, start.y, start.direction, STUB);
  const entryPoint = getStubPoint(end.x, end.y, end.direction, STUB);

  // Build the path: start → exit stub → routing → entry stub → end
  const points: number[] = [start.x, start.y];

  // If terminals are directly aligned (same X or same Y), use simple routing
  if (Math.abs(exitPoint.x - entryPoint.x) < 2) {
    // Vertically aligned — straight line through stubs
    points.push(exitPoint.x, exitPoint.y);
    points.push(entryPoint.x, entryPoint.y);
  } else if (Math.abs(exitPoint.y - entryPoint.y) < 2) {
    // Horizontally aligned — straight line through stubs
    points.push(exitPoint.x, exitPoint.y);
    points.push(entryPoint.x, entryPoint.y);
  } else {
    // Need L-shape or Z-shape routing
    const startVertical = start.direction === "up" || start.direction === "down";
    const endVertical = end.direction === "up" || end.direction === "down";

    if (startVertical && endVertical) {
      // Both exit vertically — use Z-shape (horizontal midpoint)
      const midY = (exitPoint.y + entryPoint.y) / 2;
      points.push(exitPoint.x, exitPoint.y);
      points.push(exitPoint.x, midY);
      points.push(entryPoint.x, midY);
      points.push(entryPoint.x, entryPoint.y);
    } else if (!startVertical && !endVertical) {
      // Both exit horizontally — use Z-shape (vertical midpoint)
      const midX = (exitPoint.x + entryPoint.x) / 2;
      points.push(exitPoint.x, exitPoint.y);
      points.push(midX, exitPoint.y);
      points.push(midX, entryPoint.y);
      points.push(entryPoint.x, entryPoint.y);
    } else {
      // One vertical, one horizontal — simple L-shape
      points.push(exitPoint.x, exitPoint.y);
      if (startVertical) {
        points.push(exitPoint.x, entryPoint.y);
      } else {
        points.push(entryPoint.x, exitPoint.y);
      }
      points.push(entryPoint.x, entryPoint.y);
    }
  }

  points.push(end.x, end.y);
  return points;
}

/**
 * Calculate the stub exit/entry point offset from the terminal
 */
function getStubPoint(x: number, y: number, direction: string, stub: number) {
  switch (direction) {
    case "up":    return { x, y: y - stub };
    case "down":  return { x, y: y + stub };
    case "left":  return { x: x - stub, y };
    case "right": return { x: x + stub, y };
    default:      return { x, y: y - stub };
  }
}
