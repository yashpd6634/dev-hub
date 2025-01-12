import { colorToCss } from "@/lib/utils";
import { LineLayer } from "@/type";
import React from "react";

type LineProps = {
  id: string;
  layer: LineLayer;
  selectionColor?: string; // Color of the arrow
  arrowSize?: number; // Size of the arrowhead
  onPointerDown: (e: React.PointerEvent, id: string) => void; // Pointer event handler
};

const Line = ({
  id,
  layer,
  selectionColor = "#000",
  arrowSize = 10,
  onPointerDown,
}: LineProps) => {
  const { x, y, width, height, fill } = layer;

  // Calculate the ending point of the arrow
  const endX = x + width;
  const endY = y + height;

  // Calculate the angle of the arrow line
  const angle = Math.atan2(endY - y, endX - x);

  // Calculate the arrowhead points
  const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowY1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowY2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);

  return (
    <g className="arrow">
      {/* Line */}
      <line
        className="hover:cursor-move"
        onPointerDown={(e) => onPointerDown(e, id)}
        x1={x}
        y1={y}
        x2={endX}
        y2={endY}
        stroke={selectionColor || colorToCss(fill || { r: 0, g: 0, b: 0 }, 1)}
        strokeWidth={2}
      />
    </g>
  );
};

export default Line;
