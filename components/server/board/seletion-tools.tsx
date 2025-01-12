"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/type";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import React, { memo, useEffect } from "react";
import ColorPicker from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  PaintBucket,
  Grid3x3,
  BringToFront,
  SendToBack,
  Trash2,
} from "lucide-react";

type SelectionToolsProps = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
  setLastUsedAlpha: (alpha: number) => void;
};

const SelectionTools = memo(
  ({ camera, setLastUsedColor, setLastUsedAlpha }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const deleteLayers = useDeleteLayers();

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete") {
          deleteLayers();
        }
      };

      window.addEventListener("keydown", handleKeyDown, { capture: true });

      return () => {
        window.removeEventListener("keydown", handleKeyDown, { capture: true });
      };
    }, [deleteLayers]);

    const moveToBack = useMutation(
      ({ storage }) => {
        const livelayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = livelayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          livelayerIds.move(indices[i], 1);
        }
      },
      [selection]
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const livelayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = livelayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          livelayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const selectionBounds = useSelectionBounds();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const setAlpha = useMutation(
      ({ storage }, alpha: number) => {
        const liveLayers = storage.get("layers");
        setLastUsedAlpha(alpha);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("alpha", alpha);
        });
      },
      [selection, setLastUsedAlpha]
    );

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute z-10 p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
                calc(${x}px - 185%),
                calc(${y}px - 230%)
            )`,
        }}
      >
        <div className="flex flex-col gap-y-0.5 pr-2 mr-2 border-r border-neutral-200">
          <Hint label="Solid">
            <Button onClick={() => setAlpha(1)} variant="board" size="icon">
              <PaintBucket />
            </Button>
          </Hint>
          <Hint label="Transparent" side="bottom">
            <Button onClick={() => setAlpha(0)} variant="board" size="icon">
              <Grid3x3 />
            </Button>
          </Hint>
        </div>
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button onClick={moveToFront} variant="board" size="icon">
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom">
            <Button onClick={moveToBack} variant="board" size="icon">
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-1 border-neutral-200">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
