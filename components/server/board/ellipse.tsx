import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/type";
import React from "react";

type EllipseProps = {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) => {
  return (
    <ellipse
      className="drop-shadow-md hover:cursor-move"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${layer.x}px,${layer.y}px)`,
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCss(layer.fill) : "#000"}
      strokeWidth={1}
      stroke={
        selectionColor
          ? selectionColor
          : layer.fill
          ? colorToCss(layer.fill)
          : "transparent"
      }
    />
  );
};

export default Ellipse;
