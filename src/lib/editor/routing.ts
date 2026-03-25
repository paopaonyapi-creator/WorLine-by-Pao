import { SymbolObject } from "./types";

export function calculateOrthogonalRoute(
  startObj: SymbolObject,
  startTerminalId: string,
  endObj: SymbolObject,
  endTerminalId: string
): number[] {
  // Simplified Manhattan L-shape routing
  const startX = startObj.x + (startObj.width || 40) / 2;
  const startY = startObj.y + (startObj.height || 40) / 2;
  
  const endX = endObj.x + (endObj.width || 40) / 2;
  const endY = endObj.y + (endObj.height || 40) / 2;
  
  return [
    startX, startY,
    startX, endY,
    endX, endY
  ];
}
