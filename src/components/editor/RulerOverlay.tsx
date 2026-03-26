"use client";

export const RulerOverlay = ({ zoom, panX, panY }: { zoom: number; panX: number; panY: number }) => {
  const gridSize = 20;
  const rulerHeight = 20;

  const generateTicks = (length: number, offset: number, scale: number) => {
    const ticks: { pos: number; label: string; major: boolean }[] = [];
    const step = gridSize * scale;
    const start = Math.floor(-offset / step) * step;

    for (let i = start; i < start + length / scale + step * 2; i += step) {
      const screenPos = i * scale + offset;
      if (screenPos >= 0 && screenPos <= length) {
        const isMajor = Math.round(i / gridSize) % 5 === 0;
        ticks.push({
          pos: screenPos,
          label: isMajor ? String(Math.round(i)) : "",
          major: isMajor,
        });
      }
    }
    return ticks;
  };

  return (
    <>
      {/* Horizontal ruler */}
      <div className="absolute top-0 left-5 right-0 z-30 pointer-events-none" style={{ height: rulerHeight }}>
        <div className="w-full h-full bg-muted/80 backdrop-blur-sm border-b flex items-end overflow-hidden">
          <svg className="w-full" height={rulerHeight}>
            {generateTicks(2000, panX, zoom).map((t, i) => (
              <g key={`h-${i}`}>
                <line
                  x1={t.pos}
                  y1={t.major ? 4 : 12}
                  x2={t.pos}
                  y2={rulerHeight}
                  stroke="currentColor"
                  strokeWidth={t.major ? 1 : 0.5}
                  opacity={t.major ? 0.5 : 0.25}
                />
                {t.label && (
                  <text x={t.pos + 2} y={12} fontSize="8" fill="currentColor" opacity={0.5}>
                    {t.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Vertical ruler */}
      <div className="absolute top-5 left-0 bottom-0 z-30 pointer-events-none" style={{ width: rulerHeight }}>
        <div className="h-full w-full bg-muted/80 backdrop-blur-sm border-r overflow-hidden">
          <svg width={rulerHeight} className="h-full">
            {generateTicks(2000, panY, zoom).map((t, i) => (
              <g key={`v-${i}`}>
                <line
                  x1={t.major ? 4 : 12}
                  y1={t.pos}
                  x2={rulerHeight}
                  y2={t.pos}
                  stroke="currentColor"
                  strokeWidth={t.major ? 1 : 0.5}
                  opacity={t.major ? 0.5 : 0.25}
                />
                {t.label && (
                  <text
                    x={2}
                    y={t.pos - 2}
                    fontSize="7"
                    fill="currentColor"
                    opacity={0.5}
                    transform={`rotate(-90, 8, ${t.pos})`}
                  >
                    {t.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Corner box */}
      <div
        className="absolute top-0 left-0 z-40 bg-muted/80 backdrop-blur-sm border-r border-b pointer-events-none"
        style={{ width: rulerHeight, height: rulerHeight }}
      />
    </>
  );
};
