"use client";

import ModeSelector from "@/components/ModeSelector";
import TableComponent from "@/components/Table";
import { selectorModes } from "@/models/ModeSelector.models";
import { IMode, ModesEnum } from "@/types/ModeSelector.types";
import { useState } from "react";

const Game = () => {
  const [selectedMode, setSelectedMode] = useState<IMode>(
    selectorModes.find((mode) => mode.mode === ModesEnum.EASY) ??
      selectorModes[0]
  );

  return (
    <>
      <div
        style={{
          height: "100vh",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <h1>Buscaminas</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ModeSelector
            setSelectedMode={setSelectedMode}
            selectedMode={selectedMode}
          />
          <TableComponent {...selectedMode} />
        </div>
      </div>
    </>
  );
};

export default Game;
