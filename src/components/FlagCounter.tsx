import { Dispatch, SetStateAction, useEffect, useState } from "react";

const FlagCounter = ({
  visibleTable,
  maxBombs,
  setHasMaxFlags,
  hasMaxFlags,
}: {
  visibleTable: any[];
  maxBombs: number;
  setHasMaxFlags: Dispatch<SetStateAction<boolean>>;
  hasMaxFlags: boolean;
}) => {
  const [count, setCount] = useState<number>(maxBombs);

  useEffect(() => {
    setCount(maxBombs - countFlagsOnTable());
  }, [visibleTable]);

  useEffect(() => {
    if (count <= 0) {
      setHasMaxFlags(true);
    } else {
      if (hasMaxFlags) {
        setHasMaxFlags(false);
      }
    }
  }, [count]);

  const countFlagsOnTable = () => {
    return visibleTable.reduce((rowAcc: number, row: any[]) => {
      return (
        rowAcc +
        row.reduce((acc: number, item) => {
          if (item === "🚩") {
            return acc + 1;
          }
          return acc;
        }, 0)
      );
    }, 0);
  };

  return (
    <p
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        fontWeight: 900,
        width: 28,
        height: 28,
        border: "2px solid rgb(var(--foreground-rgb))",
        background: "rgb(var(--background-start-rgb))",
      }}
    >
      {count}
    </p>
  );
};

export default FlagCounter;
