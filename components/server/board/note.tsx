import { NoteLayer } from "@/type";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import React from "react";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@liveblocks/react/suspense";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calaculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
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
      style={{
        outline: selectionColor
          ? selectionColor
          : fill
          ? colorToCss(layer.fill, layer.alpha)
          : "transparent",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl hover:cursor-move"
      strokeWidth={1}
      stroke={
        selectionColor
          ? selectionColor
          : fill
          ? colorToCss(layer.fill)
          : "transparent"
      }
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: calaculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};

export default Note;
