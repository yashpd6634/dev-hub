import { Side, TextLayer, XYWH } from "@/type";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import React from "react";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@liveblocks/react/suspense";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calaculateFontSize = (width: number, height: number) => {
  const maxFontSize = 156;
  const minFontSize = 8; // Minimum readable font size
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.max(Math.min(fontSizeBasedOnHeight, maxFontSize), minFontSize);
};
type TextProps = {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
  selectionColor?: string;
};

const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
  onResizeHandlePointerDown,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      className="hover:cursor-move"
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        overflow: "hidden",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          fontSize: calaculateFontSize(width, height),
          color: fill ? colorToCss(fill) : "#000",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
          overflow: "hidden",
        }}
      />
    </foreignObject>
  );
};

export default Text;
