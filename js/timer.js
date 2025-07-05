import { updateMessage, updateScore, endGame, renderBoard } from './ui.js';
import { state } from './state.js';

let timerId = null;

export function startTimer(current, difficulty) {
  clearTimeout(timerId);

  // Skip bot turns
  if (state.gameMode === "bot" && current === 2) return;

  const delayMap = {
    easy: 10000,
    medium: 5000,
    hard: 3000
  };

  const delay = delayMap[difficulty] || 5000;
  const currentName = current === 1 ? state.player1.name : state.player2.name;

  updateMessage(`${currentName}'s turn ⏳ (${delay / 1000}s)`);

  timerId = setTimeout(() => {
    if (!state.gameActive) return;

    const loser = current === 1 ? state.player1 : state.player2;
    const winner = current === 1 ? state.player2 : state.player1;

    updateMessage(`${loser.name} ran out of time! ${winner.name} wins the round! 🕒`);
    winner.score++;
    updateScore();

    endGame(); // Disable board and finish match

    renderBoard(); // Optional: show final board

  }, delay);
}

export function stopTimer() {
  clearTimeout(timerId);
}
