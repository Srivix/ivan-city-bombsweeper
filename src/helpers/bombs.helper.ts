const generateBomb = (maxCol: number, maxRow: number) => {
    return [
      Math.floor(Math.random() * maxRow),
      Math.floor(Math.random() * maxCol),
    ];
  };

 export const generateBombArray = (indexCol: number, indexRow: number, maxCol: number, maxRow: number, maxBombs: number) => {
    const bombsArray: number[][] = [];
    while (bombsArray.length < maxBombs) {
      const place = generateBomb(maxCol, maxRow);
      if (
        !bombsArray.some((element) => {
          return element.join() === place.join();
        }) &&
        isBombFarFromFirstOpen(indexCol, indexRow, place)
      ) {
        bombsArray.push(place);
      }
    }
    return bombsArray;
  };

  const isBombFarFromFirstOpen = (indexCol: number, indexRow: number, bomb: number[]) => {
    for(let i = indexCol-1; i<=indexCol+1; i++){
      for(let j = indexRow-1; j<=indexRow+1;j++){
        if(bomb[0] === j && bomb[1] === i){
          return false
        }
      }
    }
    return true
  }