import { state } from './state.js';
import { renderBoard, updateMessage, updateScore, endGame } from './ui.js';
import { checkWin } from './logic.js'; // Optional if you moved it out

export function botMove() {
  if (!state.gameActive || state.currentPlayer !== 2) return;

  const emptyIndices = state.cells
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  if (emptyIndices.length === 0) return;

  const moveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  state.cells[moveIndex] = state.player2.emoji;
  renderBoard();

  if (checkWin(state.cells, state.grid, state.player2.emoji)) {
    updateMessage(`${state.player2.name} (Bot) wins! 💻`);
    state.player2.score++;
    updateScore();
    endGame();
  } else if (!state.cells.includes("")) {
    updateMessage("It's a draw!");
    endGame();
  } else {
    state.currentPlayer = 1;
    updateMessage(`${state.player1.name}'s turn ⏳`);
  }
}
