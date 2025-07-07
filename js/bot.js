import { state } from './state.js';
import { renderBoard, updateMessage, updateScore, endGame } from './ui.js';
import { checkWin } from './logic.js'; 
import { showRandomStory } from './ui.js';

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
    showRandomStory();
    endGame();
  } else if (!state.cells.includes("")) {
    updateMessage("It's a draw!");
    endGame();
  } else {
    state.currentPlayer = 1;
    updateMessage(`${state.player1.name}'s turn ⏳`);
  }
}

export function unbeatableBotMove() {
  if (!state.gameActive || state.currentPlayer !== 2) return;

  let moveIndex;

  if (state.grid === 3) {
    moveIndex = findBestMove(state.cells, state.grid, state.player2.emoji);
  } else {
    const empty = state.cells.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    moveIndex = empty[Math.floor(Math.random() * empty.length)];
  }

  if (moveIndex === -1 || state.cells[moveIndex] !== "") return;

  state.cells[moveIndex] = state.player2.emoji;
  renderBoard();

  if (checkWin(state.cells, state.grid, state.player2.emoji)) {
    updateMessage(`${state.player2.name} (Unbeatable Bot) wins! 💻`);
    showRandomStory();
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

function findBestMove(cells, size, botSymbol) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      cells[i] = botSymbol;
      const score = minimax(cells, size, 0, false, botSymbol);
      cells[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(cells, size, depth, isMaximizing, botSymbol) {
  const humanSymbol = botSymbol === state.player1.emoji ? state.player2.emoji : state.player1.emoji;

  if (checkWin(cells, size, botSymbol)) return 10 - depth;
  if (checkWin(cells, size, humanSymbol)) return depth - 10;
  if (!cells.includes("")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === "") {
        cells[i] = botSymbol;
        const score = minimax(cells, size, depth + 1, false, botSymbol);
        cells[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === "") {
        cells[i] = humanSymbol;
        const score = minimax(cells, size, depth + 1, true, botSymbol);
        cells[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
