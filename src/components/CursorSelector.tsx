"use client";

import { selectorCursor } from "@/models/CursorSelector.models";
import { ICursor } from "@/types/CursorSelector.types";
import { Dispatch, SetStateAction } from "react";
import { useMediaQuery } from "react-responsive";

const CursorSelector = ({
  resetTable,
  setSelectedCursor,
  selectedCursor,
}: {
  resetTable: () => void;
  setSelectedCursor: Dispatch<SetStateAction<ICursor>>;
  selectedCursor: ICursor;
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1020px)" });

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
      {selectorCursor.map((cursor) => {
        return (
          !isDesktop && (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                width: 24,
                height: 24,
                border: "2px solid rgb(var(--foreground-rgb))",
                background:
                  selectedCursor.cursor === cursor.cursor
                    ? "rgb(var(--background-start-rgb))y"
                    : "rgb(var(--foreground-rgb))",
                padding: 2,
                paddingBottom: 3,
              }}
              key={cursor.cursor}
              onClick={() => setSelectedCursor(cursor)}
            >
              {cursor.icon}
            </div>
          )
        );
      })}
      <button
        style={{
          borderRadius: 9,
          fontFamily: "Times New Roman",
          fontWeight: 900,
          color: "rgb(var(--background-start-rgb))",
          backgroundColor: "rgb(var(--foreground-rgb))",
          fontSize: 16,
          padding: 3,
        }}
        onClick={resetTable}
      >
        Reiniciar
      </button>
    </div>
  );
};

export default CursorSelector;
