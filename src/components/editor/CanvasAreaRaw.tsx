"use client";

import { useEditorStore } from "@/store/editorStore";
import { Stage, Layer, Rect, Transformer, Group, Line, Text } from "react-konva";
import { RenderSymbol } from "./symbols/RenderSymbol";
import { AnyDiagramObject, SymbolObject, TextObject, WireObject } from "@/lib/editor/types";
import { useEffect, useRef, useState } from "react";
import { symbolRegistry } from "@/lib/editor/symbols/registry";

const ObjectNode = ({ obj, isSelected, onSelect, onChange, onEdit }: any) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {obj.type === "symbol" && (
        <Group
          ref={shapeRef}
          x={obj.x}
          y={obj.y}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={(e) => {
            onChange({ x: e.target.x(), y: e.target.y() });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            onChange({
              x: node.x(),
              y: node.y(),
            });
          }}
        >
          <RenderSymbol obj={obj as SymbolObject} isSelected={isSelected} />
        </Group>
      )}

      {obj.type === "wire" && (
        <Group onClick={onSelect} onTap={onSelect}>
          <Line
            points={(obj as WireObject).points}
            stroke={(obj as WireObject).color}
            strokeWidth={(obj as WireObject).thickness}
            draggable
            onDragEnd={(e: any) => {
              onChange({ x: e.target.x(), y: e.target.y() });
            }}
          />
        </Group>
      )}

      {obj.type === "text" && (
        <Group
          ref={shapeRef}
          x={obj.x}
          y={obj.y}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={(e) => {
            onChange({ x: e.target.x(), y: e.target.y() });
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
          boundBoxFunc={(oldBox, newBox) => {
            return newBox; // disable scaling for now, just rotation and selection bounds
          }}
        />
      )}
    </>
  );
};

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
    duplicateSelected
  } = useEditorStore();

  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [editingTextNode, setEditingTextNode] = useState<{ id: string; x: number; y: number; text: string; fontSize: number} | null>(null);

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

  const checkStageClick = (e: any) => {
    // If editing text and clicked elsewhere, save and close editor
    if (editingTextNode) {
      updateObject(editingTextNode.id, { text: editingTextNode.text });
      setEditingTextNode(null);
    }

    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === "background-rect";
    if (clickedOnEmpty) {
      if (activeTool === "text") {
        const pos = stageRef.current.getPointerPosition();
        const st = stageRef.current;
        const x = (pos.x - st.x()) / st.scaleX();
        const y = (pos.y - st.y()) / st.scaleY();
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
      } else {
        setSelection([]);
      }
    }
  };

  const startEditText = (id: string) => {
    const node = canvas.objects.find(o => o.id === id) as TextObject;
    if (node) {
      const st = stageRef.current;
      const absolutePosition = {
        x: node.x * st.scaleX() + st.x(),
        y: node.y * st.scaleY() + st.y(),
      };
      setEditingTextNode({
        id,
        text: node.text,
        fontSize: node.fontSize * st.scaleX(),
        x: absolutePosition.x,
        y: absolutePosition.y
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
      // Convert to zoomed coords
      const x = (pos.x - st.x()) / st.scaleX();
      const y = (pos.y - st.y()) / st.scaleY();

      const def = symbolRegistry[symbolId];
      if (def) {
        addObject({
          type: "symbol",
          symbolId: def.id,
          x: x - def.defaultWidth / 2,
          y: y - def.defaultHeight / 2,
          zIndex: canvas.objects.length,
          rotation: 0,
          width: def.defaultWidth,
          height: def.defaultHeight
        } as SymbolObject);
      }
    }
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === "Delete" || e.key === "Backspace") {
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
  }, [deleteObjects, selectedIds, undo, redo, duplicateSelected]);

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
          {canvas.objects.map((obj) => (
            <ObjectNode
              key={obj.id}
              obj={obj}
              isSelected={selectedIds.includes(obj.id)}
              onSelect={(e: any) => {
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
            />
          ))}
        </Layer>
      </Stage>

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
            width: `${Math.max(150, editingTextNode.text.length * (editingTextNode.fontSize * 0.6))}px` // Auto scale roughly
          }}
          value={editingTextNode.text}
          onChange={(e) => setEditingTextNode({ ...editingTextNode, text: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              updateObject(editingTextNode.id, { text: editingTextNode.text });
              setEditingTextNode(null);
            } else if (e.key === "Escape") {
              setEditingTextNode(null); // Cancel edit
            }
          }}
          autoFocus
        />
      )}
    </div>
  );
};
