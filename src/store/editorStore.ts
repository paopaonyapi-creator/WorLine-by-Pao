import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { AnyDiagramObject, CanvasState, SymbolObject, WireObject } from '@/lib/editor/types';
import { calculateOrthogonalRoute } from '@/lib/editor/routing';

// Avoid deep imports that might break depending on the platform, we'll implement simple deep copy or shallow copy
const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export type EditorState = {
  // Document state
  id: string | null;
  history: CanvasState[];
  currentHistoryIndex: number;
  canvas: CanvasState;
  
  // Selection
  selectedIds: string[];
  
  // Viewport
  zoom: number;
  panX: number;
  panY: number;
  
  // Draw wire state
  isDrawingWire: boolean;
  wireStartParams: { objectId: string; terminalId: string; x: number; y: number } | null;

  // Interaction Mode
  activeTool: "select" | "text";

  // Actions
  initialize: (id: string, state?: Partial<CanvasState>) => void;
  setActiveTool: (tool: "select" | "text") => void;
  addObject: (obj: Omit<AnyDiagramObject, "id"> & { id?: string }) => void;
  updateObject: (id: string, updates: Partial<AnyDiagramObject>) => void;
  deleteObjects: (ids: string[]) => void;
  setSelection: (ids: string[]) => void;
  duplicateSelected: () => void;
  
  // Viewport actions
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  
  // Wire actions
  startWire: (objectId: string, terminalId: string, x: number, y: number) => void;
  endWire: (objectId: string, terminalId: string, x: number, y: number) => void;
  cancelWire: () => void;
  updateWirePoint: (wireId: string, index: number, x: number, y: number) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
};

const DEFAULT_CANVAS: CanvasState = {
  objects: [],
  width: 1920,
  height: 1080,
  background: "#ffffff",
  gridSize: 20,
};

export const useEditorStore = create<EditorState>((set, get) => ({
  id: null,
  history: [DEFAULT_CANVAS],
  currentHistoryIndex: 0,
  canvas: DEFAULT_CANVAS,
  selectedIds: [],
  zoom: 1,
  panX: 0,
  panY: 0,
  activeTool: "select",
  isDrawingWire: false,
  wireStartParams: null,

  initialize: (id, state) => {
    const newState = { ...DEFAULT_CANVAS, ...state };
    set({
      id,
      canvas: newState,
      history: [newState],
      currentHistoryIndex: 0,
      selectedIds: [],
      activeTool: "select",
    });
  },

  setActiveTool: (tool) => set({ activeTool: tool, selectedIds: [] }),

  pushHistory: () => {
    set((state) => {
      const history = state.history.slice(0, state.currentHistoryIndex + 1);
      history.push(clone(state.canvas));
      // limit history size
      if (history.length > 50) history.shift();
      return {
        history,
        currentHistoryIndex: history.length - 1
      };
    });
  },

  addObject: (objDef) => {
    const id = objDef.id || uuidv4();
    const newObj = { ...objDef, id } as AnyDiagramObject;
    set((state) => {
      const newCanvas = { ...state.canvas, objects: [...state.canvas.objects, newObj] };
      return { canvas: newCanvas };
    });
    get().pushHistory();
  },

  updateObject: (id, updates) => {
    set((state) => {
      let objects = state.canvas.objects.map((obj) => 
        obj.id === id ? { ...obj, ...updates } : obj
      ) as AnyDiagramObject[];

      // Dynamically recalculate attached wires if a symbol moved
      const updatedObject = objects.find(o => o.id === id);
      if (updatedObject?.type === 'symbol' && (updates.x !== undefined || updates.y !== undefined)) {
        objects = objects.map(obj => {
          if (obj.type === 'wire' && obj.startEndpoint && obj.endEndpoint) {
            if (obj.startEndpoint.objectId === id || obj.endEndpoint.objectId === id) {
              const stNode = objects.find(o => o.id === obj.startEndpoint!.objectId) as SymbolObject;
              const edNode = objects.find(o => o.id === obj.endEndpoint!.objectId) as SymbolObject;
              if (stNode && edNode) {
                const newPoints = calculateOrthogonalRoute(stNode, obj.startEndpoint.terminalId, edNode, obj.endEndpoint.terminalId);
                if (newPoints.length > 0) {
                  return { ...obj, points: newPoints };
                }
              }
            }
          }
          return obj;
        });
      }

      return { canvas: { ...state.canvas, objects } };
    });
    get().pushHistory();
  },

  deleteObjects: (ids) => {
    set((state) => {
      const objects = state.canvas.objects.filter((obj) => !ids.includes(obj.id));
      // Also remove any wires connected to deleted objects
      const finalObjects = objects.filter(obj => {
        if (obj.type === "wire") {
          return !(
            (obj.startEndpoint && ids.includes(obj.startEndpoint.objectId)) ||
            (obj.endEndpoint && ids.includes(obj.endEndpoint.objectId))
          );
        }
        return true;
      });
      return { canvas: { ...state.canvas, objects: finalObjects }, selectedIds: state.selectedIds.filter(id => !ids.includes(id)) };
    });
    get().pushHistory();
  },

  setSelection: (ids) => {
    set({ selectedIds: ids });
  },

  duplicateSelected: () => {
    const { canvas, selectedIds } = get();
    if (selectedIds.length === 0) return;
    
    const newObjects: AnyDiagramObject[] = [];
    const newSelection: string[] = [];

    selectedIds.forEach((id) => {
      const obj = canvas.objects.find((o) => o.id === id);
      if (obj) {
        const newObj = clone(obj);
        newObj.id = uuidv4();
        // Shift a bit
        newObj.x += 20;
        newObj.y += 20;
        
        if (newObj.type === "wire") {
          // Clear endpoints for duplicated wires so they don't attach automatically
          newObj.startEndpoint = undefined;
          newObj.endEndpoint = undefined;
          newObj.points = newObj.points.map((p, i) => i % 2 === 0 ? p + 20 : p + 20);
        }

        newObjects.push(newObj);
        newSelection.push(newObj.id);
      }
    });

    set({
      canvas: { ...canvas, objects: [...canvas.objects, ...newObjects] },
      selectedIds: newSelection
    });
    get().pushHistory();
  },

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(zoom, 5)) }),
  
  setPan: (x, y) => set({ panX: x, panY: y }),

  startWire: (objectId, terminalId, x, y) => {
    set({
      isDrawingWire: true,
      wireStartParams: { objectId, terminalId, x, y }
    });
  },

  endWire: (objectId, terminalId, targetX, targetY) => {
    const { isDrawingWire, wireStartParams } = get();
    if (!isDrawingWire || !wireStartParams) return;
    
    // Prevent connecting to self
    if (wireStartParams.objectId === objectId) {
      set({ isDrawingWire: false, wireStartParams: null });
      return;
    }

    const { x: startX, y: startY } = wireStartParams;
    const canvasObjects = get().canvas.objects;
    const startNode = canvasObjects.find(o => o.id === wireStartParams.objectId) as SymbolObject | undefined;
    const endNode = canvasObjects.find(o => o.id === objectId) as SymbolObject | undefined;
    
    let points = [startX, startY, startX, targetY, targetX, targetY];
    if (startNode && endNode) {
      points = calculateOrthogonalRoute(startNode, wireStartParams.terminalId, endNode, terminalId);
    }
    
    get().addObject({
      type: "wire",
      x: 0,
      y: 0,
      rotation: 0,
      zIndex: 1,
      points,
      color: "#000000",
      thickness: 2,
      startEndpoint: { objectId: wireStartParams.objectId, terminalId: wireStartParams.terminalId },
      endEndpoint: { objectId, terminalId }
    } as WireObject);

    set({ isDrawingWire: false, wireStartParams: null });
  },

  cancelWire: () => {
    set({ isDrawingWire: false, wireStartParams: null });
  },

  updateWirePoint: (wireId, index, x, y) => {
    // Advanced wiring feature Placeholder
  },

  undo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex > 0) {
      set({
        currentHistoryIndex: currentHistoryIndex - 1,
        canvas: clone(history[currentHistoryIndex - 1]),
        selectedIds: [],
      });
    }
  },

  redo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex < history.length - 1) {
      set({
        currentHistoryIndex: currentHistoryIndex + 1,
        canvas: clone(history[currentHistoryIndex + 1]),
        selectedIds: [],
      });
    }
  },
}));
