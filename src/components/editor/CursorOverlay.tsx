"use client";

type CursorOverlayProps = {
  cursors: Array<{
    userId: string;
    name: string;
    color: string;
    x: number;
    y: number;
  }>;
  zoom: number;
  panX: number;
  panY: number;
};

export const CursorOverlay = ({ cursors, zoom, panX, panY }: CursorOverlayProps) => {
  if (cursors.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {cursors.map((c) => {
        const screenX = c.x * zoom + panX;
        const screenY = c.y * zoom + panY;

        return (
          <div
            key={c.userId}
            className="absolute transition-all duration-100 ease-out"
            style={{ left: screenX, top: screenY }}
          >
            {/* Cursor Arrow SVG */}
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              className="drop-shadow-md"
            >
              <path
                d="M0 0L16 12L8 12L4 20L0 0Z"
                fill={c.color}
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            {/* Name Label */}
            <span
              className="absolute left-4 top-4 text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm"
              style={{
                backgroundColor: c.color,
                color: "white",
              }}
            >
              {c.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
