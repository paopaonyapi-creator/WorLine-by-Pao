export type Point = { x: number; y: number };

export type TerminalDef = {
  id: string;
  x: number; // Relative to the symbol's unrotated width
  y: number; // Relative to the symbol's unrotated height
  direction: "up" | "down" | "left" | "right";
};

export type ConnectionEndpoint = {
  objectId: string;
  terminalId: string;
};

export type SymbolDef = {
  id: string;
  category: string;
  displayName: string;
  keywords: string[];
  defaultWidth: number;
  defaultHeight: number;
  terminals: TerminalDef[];
};

export type DiagramObject = {
  id: string;
  type: "symbol" | "wire" | "text" | "shape";
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  locked?: boolean;
};

export type SymbolObject = DiagramObject & {
  type: "symbol";
  symbolId: string;
  width: number;
  height: number;
  label?: string;
};

export type WireObject = DiagramObject & {
  type: "wire";
  points: number[]; // absolute x,y pairs
  startEndpoint?: ConnectionEndpoint;
  endEndpoint?: ConnectionEndpoint;
  color: string;
  thickness: number;
  label?: string;
};

export type TextObject = DiagramObject & {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
};

export type AnyDiagramObject = SymbolObject | WireObject | TextObject;

export type CanvasState = {
  objects: AnyDiagramObject[];
  width: number;
  height: number;
  background: string;
  gridSize: number;
};
