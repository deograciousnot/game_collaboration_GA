export function checkWin(cells, size, symbol) {
  const winLength = size === 3 ? 3 : 4; 

  
  function hasStreak(startRow, startCol, dirRow, dirCol) {
    let streak = 0;

    for (let i = 0; i < winLength; i++) {
      const row = startRow + i * dirRow;
      const col = startCol + i * dirCol;
      if (row >= size || col >= size || row < 0 || col < 0) return false;
      if (cells[row * size + col] === symbol) {
        streak++;
      } else {
        break;
      }
    }

    return streak === winLength;
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        hasStreak(row, col, 0, 1) || 
        hasStreak(row, col, 1, 0) || 
        hasStreak(row, col, 1, 1) || 
        hasStreak(row, col, 1, -1)   
      ) {
        return true;
      }
    }
  }

  return false;
}
