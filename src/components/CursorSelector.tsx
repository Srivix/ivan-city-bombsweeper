"use client";

import { selectorCursor } from "@/models/CursorSelector.models";
import { ICursor } from "@/types/CursorSelector.types";
import { Dispatch, SetStateAction } from "react";

const CursorSelector = ({
  setSelectedCursor,
  selectedCursor,
}: {
  setSelectedCursor: Dispatch<SetStateAction<ICursor>>;
  selectedCursor: ICursor;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
      {selectorCursor.map((cursor) => {
        return (
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
        );
      })}
    </div>
  );
};

export default CursorSelector;
