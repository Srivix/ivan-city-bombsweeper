import { ICursor } from "@/types/CursorSelector.types"

export const openCell = (
    indexRow: number, 
    indexColumn: number,
    bombsArray: number[][], 
    visibleTable: any[], 
    maxCol: number, 
    maxRow: number
) => {
    return isBombInCell(bombsArray, indexRow, indexColumn)
        ? addIconToTable(visibleTable, indexRow, indexColumn, "💣") 
        : addOpenCellToTable(indexRow, indexColumn, visibleTable, bombsArray, maxCol, maxRow)
}

export const markCell = (indexRow: number, indexColumn: number, visibleTable: any[], cursor: ICursor) => {
  if(visibleTable[indexRow][indexColumn] === ""){
    return addIconToTable(visibleTable, indexRow, indexColumn, cursor.icon)
  }

  return visibleTable[indexRow][indexColumn] === cursor.icon ? addIconToTable(visibleTable, indexRow, indexColumn, "") : visibleTable
  
}

const isBombInCell = (bombsArray: any[], indexRow: number, indexColumn: number) => {
    return bombsArray.find((bomb) => bomb.join() === Array.from([indexRow, indexColumn]).join()) 
}

const addIconToTable = (table: any[], indexRow: number, indexColumn: number, icon: string) => {
    return table.map((row, idxRow) => {
        if (idxRow === indexRow) {
          return row.map((item: string, idxItem: number) => {
            if (idxItem === indexColumn) {
              return icon
            }
            return item;
          })
        }
        return row
      })
}

const countNeighbourBombs = (
    bombsArray: number[][],
    indexRow: number,
    indexColumn: number,
    maxCol: number,
    maxRow: number,
) => {
    let bombsNum = 0;

    for (let i = indexColumn - 1; i <= indexColumn + 1; i++) {
      for (let j = indexRow - 1; j <= indexRow + 1; j++) {
        if (isInTable(i,j,maxRow, maxCol)) {
          if (
            bombsArray.some((bomb) => {
              return bomb[0] === j && bomb[1] === i
            })
          ) {
            bombsNum++
          }
        }
      }
    }
    return bombsNum
}

const addCellValueToTable = (oldTable: any[], bombsNum: number, indexRow: number, indexColumn: number) => {
   return oldTable.map((row, idxRow) => {
        if (idxRow === indexRow) {
          return row.map((item: string, idxItem: number) => {
            if (idxItem === indexColumn) {
              return bombsNum
            }
            return item
          })
        }
        return row
      })
}

const isInTable = (i: number, j: number, maxRow: number, maxCol: number) => {
    return i >= 0 && i < maxCol && j >= 0 && j < maxRow
}

const openNeighbourCells = (newTable: any[], bombsArray: number[][], indexColumn: number, indexRow: number, maxCol: number, maxRow: number) => {
    for (let i = indexColumn - 1; i <= indexColumn + 1; i++) {
        for (let j = indexRow - 1; j <= indexRow + 1; j++) {
          const isOwnCell = i === indexColumn && j === indexRow
          if (
            isInTable(i,j,maxRow, maxCol) && 
            !isOwnCell && 
            (newTable[j][i] === "" || 
            newTable[j][i] === "🚩" || 
            newTable[j][i] === "❓"
          )) {
           newTable = addOpenCellToTable(j, i, newTable, bombsArray, maxCol, maxRow);
          }
        }
      }
      return newTable
}

const addOpenCellToTable = (
    indexRow: number,
    indexColumn: number,
    oldTable: any[],
    bombsArray: number[][],
    maxCol: number,
    maxRow: number,
  ) => {
    const bombsNum = countNeighbourBombs(bombsArray, indexRow, indexColumn, maxCol, maxRow)

    const newTable = addCellValueToTable(oldTable, bombsNum, indexRow, indexColumn)

    if (bombsNum === 0) {
       return openNeighbourCells(newTable, bombsArray, indexColumn, indexRow, maxCol, maxRow)
    }

    return newTable
  }

export const gameIsLost = (visibleTable: any[]) => {
  return visibleTable.some((row) => {
      return row.some((item: string) => {
        return item === '💣'
      })
    })
}

export const gameIsWon = (visibleTable: any[], bombsArray: number[][]) => {
 return !visibleTable.some((row, indexRow) => {
      return row.some((item: string, indexColumn: number) => {
        return (item === "" && !isBombInCell(bombsArray, indexRow, indexColumn)) || 
        (item === "🚩" && !isBombInCell(bombsArray, indexRow, indexColumn)) || 
        (item === "❓"  && !isBombInCell(bombsArray, indexRow, indexColumn))
      })
    })
}