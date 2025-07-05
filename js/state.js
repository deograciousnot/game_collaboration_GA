/*this section holds the current state of the game....
 to avoid repeatedly passing the same data around in other modules*/
export const state = {
  currentPlayer: 1,
  gameActive: true,
  cells: [],

  player1: {
    name: "Player 1",
    emoji: "❌",
    score: 0,
  },
  player2: {
    name: "Player 2",
    emoji: "⭕",
    score: 0,
  },

  setCells(newCells) {
    this.cells = newCells;
  }
};
