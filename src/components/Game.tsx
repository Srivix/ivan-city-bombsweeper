"use client";

import ModeSelector from "@/components/ModeSelector";
import TableComponent from "@/components/Table";
import { generateBombArray } from "@/helpers/bombs.helper";
import { selectorModes } from "@/models/ModeSelector.models";
import { IMode, ModesEnum } from "@/types/ModeSelector.types";
import { useEffect, useState } from "react";

const Game = () => {
  const [selectedMode, setSelectedMode] = useState<IMode>(
    selectorModes.find((mode) => mode.mode === ModesEnum.EASY) ??
      selectorModes[0]
  );

  const [bombsArray, setBombsArray] = useState<number[][]>(
    generateBombArray(
      selectedMode.maxCol,
      selectedMode.maxRow,
      selectedMode.maxBombs
    )
  );

  useEffect(() => {
    const { maxCol, maxRow, maxBombs } = selectedMode;
    setBombsArray(generateBombArray(maxCol, maxRow, maxBombs));
  }, [selectedMode]);

  const onClickReset = () => {
    const { maxCol, maxRow, maxBombs } = selectedMode;
    setBombsArray(generateBombArray(maxCol, maxRow, maxBombs));
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <h1>Buscaminas</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ModeSelector
            setSelectedMode={setSelectedMode}
            selectedMode={selectedMode}
          />
          <button
            style={{
              borderRadius: 9,
              fontFamily: "Times New Roman",
              fontWeight: 900,
              color: "rgb(var(--background-start-rgb))",
              backgroundColor: "rgb(var(--foreground-rgb))",
              fontSize: 18,
              padding: 3,
            }}
            onClick={onClickReset}
          >
            Reiniciar
          </button>
        </div>
        <TableComponent
          maxCol={selectedMode.maxCol}
          maxRow={selectedMode.maxRow}
          bombsArray={bombsArray}
        />
      </div>
    </>
  );
};

export default Game;
