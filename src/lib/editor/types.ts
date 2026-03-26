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
  type: "symbol" | "wire" | "text" | "shape" | "arrow" | "pencil" | "dimension" | "busbar";
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  locked?: boolean;
  layer?: "power" | "control" | "ground" | "annotation";
  groupId?: string;
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

export type ShapeObject = DiagramObject & {
  type: "shape";
  shapeType: "rect" | "ellipse" | "line";
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
};

export type ArrowObject = DiagramObject & {
  type: "arrow";
  points: number[]; // [x1,y1, x2,y2]
  color: string;
  thickness: number;
};

export type PencilObject = DiagramObject & {
  type: "pencil";
  points: number[]; // freehand points
  color: string;
  thickness: number;
};

export type DimensionObject = DiagramObject & {
  type: "dimension";
  startPoint: Point;
  endPoint: Point;
  offset: number;
  label?: string;
  color: string;
};

export type BusBarObject = DiagramObject & {
  type: "busbar";
  points: number[]; // horizontal bar points
  color: string;
  thickness: number;
  label?: string;
};

export type AnyDiagramObject = SymbolObject | WireObject | TextObject | ShapeObject | ArrowObject | PencilObject | DimensionObject | BusBarObject;

export type CanvasState = {
  objects: AnyDiagramObject[];
  width: number;
  height: number;
  background: string;
  gridSize: number;
};
