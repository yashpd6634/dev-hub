import { colorToCss } from "@/lib/utils";
import { ArrowLayer } from "@/type";
import React from "react";

type ArrowProps = {
  id: string;
  layer: ArrowLayer;
  selectionColor?: string; // Color of the arrow
  arrowSize?: number; // Size of the arrowhead
  onPointerDown: (e: React.PointerEvent, id: string) => void; // Pointer event handler
};

const Arrow = ({
  id,
  layer,
  selectionColor = "#000",
  arrowSize = 10,
  onPointerDown,
}: ArrowProps) => {
  const { x, y, width, height, endX, endY, fill } = layer;

  // Calculate the angle of the arrow line
  const angle = Math.atan2(endY! - y, endX! - x);

  // Calculate the arrowhead points
  const arrowX1 = endX! - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowY1 = endY! - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowX2 = endX! - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowY2 = endY! - arrowSize * Math.sin(angle + Math.PI / 6);

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
      {/* Arrowhead */}
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={selectionColor || colorToCss(fill || { r: 0, g: 0, b: 0 }, 1)}
      />
    </g>
  );
};

export default Arrow;
