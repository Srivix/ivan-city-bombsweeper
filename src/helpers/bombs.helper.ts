const generateBomb = (maxCol: number, maxRow: number) => {
    return [
      Math.floor(Math.random() * maxRow),
      Math.floor(Math.random() * maxCol),
    ];
  };

 export const generateBombArray = (maxCol: number, maxRow: number, maxBombs: number) => {
    const bombsArray = [generateBomb(maxCol, maxRow)];
    while (bombsArray.length < maxBombs) {
      const place =generateBomb(maxCol, maxRow);
      if (
        !bombsArray.some((element) => {
          return element.join() === place.join();
        })
      ) {
        bombsArray.push(place);
      }
    }
    return bombsArray;
  };