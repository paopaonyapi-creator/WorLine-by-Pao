"use client";

import { useEditorStore } from "@/store/editorStore";
import { Stage, Layer, Rect, Transformer, Group, Line, Text, Circle } from "react-konva";
import { RenderSymbol } from "./symbols/RenderSymbol";
import { AnyDiagramObject, SymbolObject, TextObject, WireObject } from "@/lib/editor/types";
import { useEffect, useRef, useState, useCallback } from "react";
import { symbolRegistry } from "@/lib/editor/symbols/registry";

// ─── Grid Snap Utility ─────────────────────────────────
const snapToGrid = (val: number, gridSize: number) => Math.round(val / gridSize) * gridSize;

// ─── Terminal positions for symbols (top, bottom center) ──
const getTerminals = (obj: SymbolObject) => {
  const w = obj.width || 60;
  const h = obj.height || 60;
  return [
    { id: "top", x: obj.x + w / 2, y: obj.y },
    { id: "bottom", x: obj.x + w / 2, y: obj.y + h },
    { id: "left", x: obj.x, y: obj.y + h / 2 },
    { id: "right", x: obj.x + w, y: obj.y + h / 2 },
  ];
};

// ─── Grid Overlay Component ─────────────────────────────
const GridOverlay = ({ width, height, gridSize }: { width: number; height: number; gridSize: number }) => {
  const lines: React.JSX.Element[] = [];
  for (let x = 0; x <= width; x += gridSize) {
    lines.push(
      <Line key={`gv-${x}`} points={[x, 0, x, height]} stroke="#e5e7eb" strokeWidth={0.5} />
    );
  }
  for (let y = 0; y <= height; y += gridSize) {
    lines.push(
      <Line key={`gh-${y}`} points={[0, y, width, y]} stroke="#e5e7eb" strokeWidth={0.5} />
    );
  }
  return <>{lines}</>;
};

// ─── Object Node: renders symbol/wire/text ──────────────
const ObjectNode = ({ obj, isSelected, onSelect, onChange, onEdit, onDblClick, activeTool, onTerminalClick, gridSize }: any) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const symbolObj = obj as SymbolObject;

  return (
    <>
      {obj.type === "symbol" && (
        <Group
          ref={shapeRef}
          x={obj.x}
          y={obj.y}
          draggable={activeTool === "select"}
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={onDblClick}
          onDragEnd={(e) => {
            // Snap to grid on drag end
            const snappedX = snapToGrid(e.target.x(), gridSize);
            const snappedY = snapToGrid(e.target.y(), gridSize);
            e.target.x(snappedX);
            e.target.y(snappedY);
            onChange({ x: snappedX, y: snappedY });
          }}
        >
          <RenderSymbol obj={symbolObj} isSelected={isSelected} />
          {/* Label below symbol */}
          {symbolObj.label && (
            <Text
              text={symbolObj.label}
              x={0}
              y={(symbolObj.height || 60) + 4}
              width={symbolObj.width || 60}
              align="center"
              fontSize={11}
              fill="#374151"
              fontStyle="bold"
            />
          )}
        </Group>
      )}

      {/* Terminal dots when wire tool is active */}
      {obj.type === "symbol" && activeTool === "wire" && (
        <>
          {getTerminals(symbolObj).map((t) => (
            <Circle
              key={`${obj.id}-${t.id}`}
              x={t.x}
              y={t.y}
              radius={5}
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth={1.5}
              opacity={0.8}
              onClick={() => onTerminalClick(obj.id, t.id, t.x, t.y)}
              onTap={() => onTerminalClick(obj.id, t.id, t.x, t.y)}
              onMouseEnter={(e: any) => { e.target.to({ radius: 7, opacity: 1, duration: 0.1 }); }}
              onMouseLeave={(e: any) => { e.target.to({ radius: 5, opacity: 0.8, duration: 0.1 }); }}
            />
          ))}
        </>
      )}

      {obj.type === "wire" && (
        <Group onClick={onSelect} onTap={onSelect}>
          <Line
            points={(obj as WireObject).points}
            stroke={isSelected ? "#2563eb" : (obj as WireObject).color}
            strokeWidth={(obj as WireObject).thickness}
            hitStrokeWidth={10}
            draggable={activeTool === "select"}
            onDragEnd={(e: any) => {
              onChange({ x: e.target.x(), y: e.target.y() });
            }}
          />
          {/* Wire label */}
          {(obj as WireObject).label && (obj as WireObject).points.length >= 4 && (
            <Text
              text={(obj as WireObject).label!}
              x={((obj as WireObject).points[0] + (obj as WireObject).points[(obj as WireObject).points.length - 2]) / 2}
              y={((obj as WireObject).points[1] + (obj as WireObject).points[(obj as WireObject).points.length - 1]) / 2 - 14}
              fontSize={10}
              fill="#6b7280"
            />
          )}
        </Group>
      )}

      {obj.type === "text" && (
        <Group
          ref={shapeRef}
          x={obj.x}
          y={obj.y}
          draggable={activeTool === "select"}
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={(e) => {
            const snappedX = snapToGrid(e.target.x(), gridSize);
            const snappedY = snapToGrid(e.target.y(), gridSize);
            e.target.x(snappedX);
            e.target.y(snappedY);
            onChange({ x: snappedX, y: snappedY });
          }}
          onDblClick={(e) => {
            if (onEdit) onEdit(obj.id);
          }}
        >
          <Text 
            text={(obj as TextObject).text} 
            fontSize={(obj as TextObject).fontSize} 
            fontFamily={(obj as TextObject).fontFamily} 
            fill={(obj as TextObject).fill} 
          />
        </Group>
      )}

      {isSelected && (obj.type === "symbol" || obj.type === "text") && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          rotateEnabled={obj.type === "symbol"}
          resizeEnabled={false}
          boundBoxFunc={(oldBox, newBox) => newBox}
        />
      )}
    </>
  );
};

// ─── Main Canvas Area ───────────────────────────────────
export const CanvasAreaRaw = () => {
  const {
    canvas,
    selectedIds,
    setSelection,
    updateObject,
    deleteObjects,
    zoom,
    panX,
    panY,
    setZoom,
    setPan,
    activeTool,
    setActiveTool,
    addObject,
    undo,
    redo,
    duplicateSelected,
    isDrawingWire,
    wireStartParams,
    startWire,
    endWire,
    cancelWire,
  } = useEditorStore();

  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [editingTextNode, setEditingTextNode] = useState<{ id: string; x: number; y: number; text: string; fontSize: number} | null>(null);
  const [editingLabel, setEditingLabel] = useState<{ id: string; x: number; y: number; label: string } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const gridSize = canvas.gridSize || 20;

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse for wire preview line
  const handleMouseMove = useCallback((e: any) => {
    if (isDrawingWire && stageRef.current) {
      const pos = stageRef.current.getPointerPosition();
      if (pos) {
        const st = stageRef.current;
        setMousePos({
          x: (pos.x - st.x()) / st.scaleX(),
          y: (pos.y - st.y()) / st.scaleY(),
        });
      }
    }
  }, [isDrawingWire]);

  const handleTerminalClick = (objectId: string, terminalId: string, x: number, y: number) => {
    if (activeTool !== "wire") return;
    
    if (!isDrawingWire) {
      startWire(objectId, terminalId, x, y);
    } else {
      endWire(objectId, terminalId, x, y);
    }
  };

  const checkStageClick = (e: any) => {
    // Save editing label/text if active
    if (editingTextNode) {
      updateObject(editingTextNode.id, { text: editingTextNode.text });
      setEditingTextNode(null);
    }
    if (editingLabel) {
      updateObject(editingLabel.id, { label: editingLabel.label });
      setEditingLabel(null);
    }

    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === "background-rect";
    if (clickedOnEmpty) {
      if (activeTool === "text") {
        const pos = stageRef.current.getPointerPosition();
        const st = stageRef.current;
        const x = snapToGrid((pos.x - st.x()) / st.scaleX(), gridSize);
        const y = snapToGrid((pos.y - st.y()) / st.scaleY(), gridSize);
        addObject({
          type: "text",
          x,
          y,
          text: "Double click to edit",
          fontSize: 16,
          fontFamily: "var(--font-heading), sans-serif",
          fill: "#000000",
          zIndex: canvas.objects.length,
          rotation: 0
        } as TextObject);
        setActiveTool("select");
      } else if (activeTool === "wire" && isDrawingWire) {
        cancelWire();
        setMousePos(null);
      } else {
        setSelection([]);
      }
    }
  };

  const startEditText = (id: string) => {
    const node = canvas.objects.find(o => o.id === id) as TextObject;
    if (node) {
      const st = stageRef.current;
      const absPos = {
        x: node.x * st.scaleX() + st.x(),
        y: node.y * st.scaleY() + st.y(),
      };
      setEditingTextNode({
        id,
        text: node.text,
        fontSize: node.fontSize * st.scaleX(),
        x: absPos.x,
        y: absPos.y
      });
    }
  };

  const startEditLabel = (id: string) => {
    const node = canvas.objects.find(o => o.id === id) as SymbolObject;
    if (node) {
      const st = stageRef.current;
      const absPos = {
        x: node.x * st.scaleX() + st.x(),
        y: (node.y + (node.height || 60) + 4) * st.scaleY() + st.y(),
      };
      setEditingLabel({
        id,
        label: node.label || "",
        x: absPos.x,
        y: absPos.y,
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const symbolId = e.dataTransfer.getData("application/worline-symbol");
    if (!symbolId) return;

    if (stageRef.current) {
      stageRef.current.setPointersPositions(e);
      const pos = stageRef.current.getPointerPosition();
      const st = stageRef.current;
      const rawX = (pos.x - st.x()) / st.scaleX();
      const rawY = (pos.y - st.y()) / st.scaleY();

      const def = symbolRegistry[symbolId];
      if (def) {
        // Snap to grid
        const x = snapToGrid(rawX - def.defaultWidth / 2, gridSize);
        const y = snapToGrid(rawY - def.defaultHeight / 2, gridSize);
        addObject({
          type: "symbol",
          symbolId: def.id,
          x,
          y,
          zIndex: canvas.objects.length,
          rotation: 0,
          width: def.defaultWidth,
          height: def.defaultHeight,
          label: def.customData?.label || "",
        } as SymbolObject);
      }
    }
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === "Escape") {
        if (isDrawingWire) {
          cancelWire();
          setMousePos(null);
        } else {
          setSelection([]);
          setActiveTool("select");
        }
      } else if (e.key === "Delete" || e.key === "Backspace") {
        deleteObjects(selectedIds);
      } else if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (e.key === "z" && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (e.key === "y" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        redo();
      } else if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        duplicateSelected();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteObjects, selectedIds, undo, redo, duplicateSelected, isDrawingWire, cancelWire, setSelection, setActiveTool]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 outline-none"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      tabIndex={0}
    >
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={checkStageClick}
        onTouchStart={checkStageClick}
        onMouseMove={handleMouseMove}
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={canvas.width}
            height={canvas.height}
            fill={canvas.background}
            name="background-rect"
          />
          {/* Grid overlay */}
          <GridOverlay width={canvas.width} height={canvas.height} gridSize={gridSize} />
          
          {canvas.objects.map((obj) => (
            <ObjectNode
              key={obj.id}
              obj={obj}
              isSelected={selectedIds.includes(obj.id)}
              activeTool={activeTool}
              gridSize={gridSize}
              onSelect={(e: any) => {
                if (activeTool === "wire") return; // Don't select in wire mode
                if (e.evt.shiftKey) {
                  setSelection([...selectedIds, obj.id]);
                } else {
                  setSelection([obj.id]);
                }
              }}
              onChange={(newAttrs: any) => {
                updateObject(obj.id, newAttrs);
              }}
              onEdit={startEditText}
              onDblClick={() => {
                if (obj.type === "symbol") startEditLabel(obj.id);
              }}
              onTerminalClick={handleTerminalClick}
            />
          ))}

          {/* Wire preview line while drawing */}
          {isDrawingWire && wireStartParams && mousePos && (
            <Line
              points={[wireStartParams.x, wireStartParams.y, wireStartParams.x, mousePos.y, mousePos.x, mousePos.y]}
              stroke="#3b82f6"
              strokeWidth={2}
              dash={[6, 3]}
              opacity={0.7}
            />
          )}

          {/* Junction dots: where multiple wires share an endpoint */}
          {(() => {
            const wires = canvas.objects.filter(o => o.type === "wire") as WireObject[];
            const pointCounts: Record<string, number> = {};
            wires.forEach(w => {
              if (w.points.length >= 2) {
                const startKey = `${w.points[0]},${w.points[1]}`;
                const endKey = `${w.points[w.points.length - 2]},${w.points[w.points.length - 1]}`;
                pointCounts[startKey] = (pointCounts[startKey] || 0) + 1;
                pointCounts[endKey] = (pointCounts[endKey] || 0) + 1;
              }
            });
            return Object.entries(pointCounts)
              .filter(([, count]) => count >= 2)
              .map(([key]) => {
                const [cx, cy] = key.split(",").map(Number);
                return (
                  <Circle
                    key={`junction-${key}`}
                    x={cx}
                    y={cy}
                    radius={4}
                    fill="#000000"
                    listening={false}
                  />
                );
              });
          })()}

          {/* Auto wire labels (W1, W2...) */}
          {canvas.objects
            .filter(o => o.type === "wire")
            .map((w, idx) => {
              const wire = w as WireObject;
              if (wire.points.length < 4) return null;
              // Find midpoint of wire path
              const midIdx = Math.floor(wire.points.length / 2);
              const mx = (wire.points[midIdx - 2] + wire.points[midIdx]) / 2;
              const my = (wire.points[midIdx - 1] + wire.points[midIdx + 1]) / 2;
              const label = (wire as any).label || `W${idx + 1}`;
              return (
                <Text
                  key={`wire-label-${wire.id}`}
                  x={mx - 12}
                  y={my - 14}
                  text={label}
                  fontSize={10}
                  fill="#6b7280"
                  fontStyle="italic"
                  listening={false}
                />
              );
            })}
        </Layer>
      </Stage>

      {/* Wire mode indicator */}
      {activeTool === "wire" && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-lg z-10">
          {isDrawingWire ? "Click a terminal to connect • Esc to cancel" : "Click a terminal dot to start wire"}
        </div>
      )}

      {/* HTML Overlay for Text Editing */}
      {editingTextNode && (
        <textarea
          style={{
            position: "absolute",
            top: editingTextNode.y + "px",
            left: editingTextNode.x + "px",
            fontSize: editingTextNode.fontSize + "px",
            fontFamily: "var(--font-heading), sans-serif",
            padding: "4px",
            margin: "-4px 0 0 -4px",
            minHeight: "30px",
            background: "white",
            border: "1px solid #2563eb",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 10,
            outline: "none",
            resize: "none",
            width: `${Math.max(150, editingTextNode.text.length * (editingTextNode.fontSize * 0.6))}px`
          }}
          value={editingTextNode.text}
          onChange={(e) => setEditingTextNode({ ...editingTextNode, text: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              updateObject(editingTextNode.id, { text: editingTextNode.text });
              setEditingTextNode(null);
            } else if (e.key === "Escape") {
              setEditingTextNode(null);
            }
          }}
          autoFocus
        />
      )}

      {/* HTML Overlay for Symbol Label Editing */}
      {editingLabel && (
        <input
          type="text"
          style={{
            position: "absolute",
            top: editingLabel.y + "px",
            left: editingLabel.x + "px",
            fontSize: "12px",
            padding: "2px 6px",
            background: "white",
            border: "1px solid #2563eb",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 10,
            outline: "none",
            width: "100px",
          }}
          value={editingLabel.label}
          placeholder="Label (e.g. G1, CB-01)"
          onChange={(e) => setEditingLabel({ ...editingLabel, label: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateObject(editingLabel.id, { label: editingLabel.label });
              setEditingLabel(null);
            } else if (e.key === "Escape") {
              setEditingLabel(null);
            }
          }}
          autoFocus
        />
      )}
    </div>
  );
};
