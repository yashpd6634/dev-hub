import { Camera } from "@/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#DC3626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringToColor = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substring(-2);
  }

  return color;
};

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
