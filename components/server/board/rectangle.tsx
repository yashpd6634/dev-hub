import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/type";
import React from "react";

type RectangleProps = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill, alpha } = layer;

  return (
    <rect
      className="drop-shadow-md hover:cursor-move"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill, alpha) : "#000"}
      stroke={
        selectionColor
          ? selectionColor
          : fill
          ? colorToCss(layer.fill)
          : "transparent"
      }
    />
  );
};

export default Rectangle;
