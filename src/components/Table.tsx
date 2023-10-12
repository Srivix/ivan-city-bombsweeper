"use client";

import {
  gameIsLost,
  gameIsWon,
  markCell,
  openCell,
} from "@/helpers/table.helper";
import { selectorCursor } from "@/models/CursorSelector.models";
import { CursorEnum, ICursor } from "@/types/CursorSelector.types";
import { useEffect, useState } from "react";
import CursorSelector from "./CursorSelector";

const TableComponent = ({
  maxRow,
  maxCol,
  bombsArray,
}: {
  maxRow: number;
  maxCol: number;
  bombsArray: number[][];
}) => {
  const columns = Array(maxCol).fill("");
  const table = Array(maxRow).fill(columns);
  const [visibleTable, setVisibleTable] = useState(table);

  const [selectedCursor, setSelectedCursor] = useState<ICursor>(
    selectorCursor.find((cursor) => cursor.cursor === CursorEnum.OPEN) ??
      selectorCursor[0]
  );

  const [isWon, setIsWon] = useState<boolean>(false);
  const [isLost, setIsLost] = useState<boolean>(false);

  const onClickCell = (indexRow: number, indexColumn: number) => {
    if (selectedCursor.cursor === CursorEnum.OPEN) {
      if (
        visibleTable[indexRow][indexColumn] !== "🚩" &&
        visibleTable[indexRow][indexColumn] !== "❔"
      ) {
        return openCell(
          indexRow,
          indexColumn,
          bombsArray,
          visibleTable,
          maxCol,
          maxRow
        );
      }
    } else {
      return markCell(indexRow, indexColumn, visibleTable, selectedCursor);
    }
    return visibleTable;
  };

  useEffect(() => {
    const newColumns = Array(maxCol).fill("");
    const newTable = Array(maxRow).fill(newColumns);
    setVisibleTable(newTable);
  }, [maxCol, maxRow, bombsArray]);

  useEffect(() => {
    setIsLost(gameIsLost(visibleTable));
    setIsWon(gameIsWon(visibleTable, bombsArray));
  }, [visibleTable]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {isWon && (
        <p style={{ fontSize: 16 }}>
          👏✨ ¡Enhorabuena, has ganado titán! 👏✨
        </p>
      )}
      {isLost && <p style={{ fontSize: 20 }}>💥Has perdido💥</p>}
      <CursorSelector
        selectedCursor={selectedCursor}
        setSelectedCursor={setSelectedCursor}
      />
      <div
        style={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          border: "2px solid white",
          padding: 2,
          backgroundColor: "grey",
        }}
      >
        {visibleTable.map((row, indexRow) => {
          return (
            <div
              key={indexRow}
              style={{
                display: "flex",
                gap: 2,
                flexDirection: "row",
              }}
            >
              {row.map((item: string, idx: number) => {
                return (
                  <div
                    style={{
                      fontFamily: "sans-serif",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 1,
                      margin: 0,
                      width: 18,
                      height: 18,
                      border: "1px solid grey",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                    key={idx}
                    onClick={() => {
                      if (!isLost && !isWon) {
                        setVisibleTable(onClickCell(indexRow, idx));
                      }
                    }}
                  >
                    <CellSwitch item={item} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CellSwitch = ({ item }: { item: string | number }) => {
  const getCellColor = () => {
    switch (item) {
      case 1:
        return "#0000FF";
      case 2:
        return "#008000";
      case 3:
        return "#FF0000";
      case 4:
        return "#FFA500";
      case 5:
        return "#800080";
      case 6:
        return "#04d704";
      case 7:
        return "#05d5d5";
      case 8:
        return "#808080";
      default:
        return "";
    }
  };

  switch (item) {
    case 0:
      return <p></p>;
    case "❔":
    case "💣":
    case "🚩":
      return <p style={{ fontSize: 12 }}>{item}</p>;
    case "":
      return (
        <p
          style={{ width: "100%", height: "100%", backgroundColor: "#b1b1b1" }}
        />
      );
    default:
      return (
        <p style={{ fontSize: 16, color: getCellColor(), fontWeight: 900 }}>
          {item}
        </p>
      );
  }
};

export default TableComponent;