"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/type";
import React from "react";

type ColorPickerProps = {
  onChange: (color: Color) => void;
};

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton onClick={onChange} color={{ r: 255, g: 99, b: 71 }} />
      <ColorButton onClick={onChange} color={{ r: 135, g: 206, b: 250 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 165, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 60, g: 179, b: 113 }} />
      <ColorButton onClick={onChange} color={{ r: 75, g: 0, b: 130 }} />
      <ColorButton onClick={onChange} color={{ r: 218, g: 112, b: 214 }} />
      <ColorButton onClick={onChange} color={{ r: 240, g: 230, b: 140 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 20, b: 147 }} />
    </div>
  );
};

type ColorButtonProps = {
  onClick: (color: Color) => void;
  color: Color;
};

export const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-400"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};

export default ColorPicker;
