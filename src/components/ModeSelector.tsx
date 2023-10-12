"use client";

import { selectorModes } from "@/models/ModeSelector.models";
import { IMode } from "@/types/ModeSelector.types";
import { Dispatch, SetStateAction } from "react";

const ModeSelector = ({
  setSelectedMode,
  selectedMode,
}: {
  setSelectedMode: Dispatch<SetStateAction<IMode>>;
  selectedMode: IMode;
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "row",
      }}
    >
      {selectorModes.map((mode) => {
        return (
          <div
            style={{
              fontSize: 20,
              borderBottom:
                selectedMode.mode === mode.mode
                  ? "1px solid rgb(var(--foreground-rgb))"
                  : "",
            }}
            key={mode.mode}
            onClick={() => setSelectedMode(mode)}
          >
            {mode.mode}
          </div>
        );
      })}
    </div>
  );
};

export default ModeSelector;
