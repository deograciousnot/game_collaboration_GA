import { state } from './state.js';
import { startTimer } from './timer.js';
import { botMove, unbeatableBotMove } from './bot.js';
import { saveGameState } from './state.js';




const board = document.getElementById("board");
const message = document.getElementById("message");
const p1ScoreDisplay = document.getElementById("p1-score");
const p2ScoreDisplay = document.getElementById("p2-score");
const rematchBtn = document.getElementById("rematch-btn");

let size = 3;
let gameMode = "pvp";
let difficulty = null;

export function initUI(settings) {
  state.player1.name = settings.p1;
  state.player1.emoji = settings.e1;
  state.player2.name = settings.p2;
  state.player2.emoji = settings.e2;
  gameMode = settings.mode;
  difficulty = settings.difficulty;
  size = settings.grid;
  state.grid = size;
  

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  updateMessage(`${state.player1.name}'s turn ⏳`);
  resetGame();

  rematchBtn.addEventListener("click", resetGame);
  const undoBtn = document.getElementById("undo-btn");
    if (undoBtn) {
      undoBtn.addEventListener("click", () => {
        if (state.moveHistory.length === 0 || !state.gameActive) return;

        const previousBoard = state.moveHistory.pop();
        state.setCells(previousBoard);
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
        renderBoard();
        updateMessage(`${state.currentPlayer === 1 ? state.player1.name : state.player2.name}'s turn ⏳`);
  });
}


  const name1El = document.getElementById("p1-name");
  const name2El = document.getElementById("p2-name");
  if (name1El && name2El) {
    name1El.textContent = state.player1.name;
    name2El.textContent = state.player2.name;
  }
}

export function renderBoard() {
  board.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.className = "cell";
    div.dataset.index = i;
    div.textContent = state.cells[i];
    div.addEventListener("click", handleCellClick);
    board.appendChild(div);
  }
}

function handleCellClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (!state.gameActive || state.cells[index] !== "") return;

  state.moveHistory.push([...state.cells]);

  const emoji = state.currentPlayer === 1 ? state.player1.emoji : state.player2.emoji;
  state.cells[index] = emoji;
  saveGameState();
  
  renderBoard();

  if (checkWin(emoji)) {
    const winner = state.currentPlayer === 1 ? state.player1 : state.player2;
    updateMessage(`${winner.name} wins! 🎉`);
    launchConfetti();
    winner.score++;
    updateScore();
    showRandomStory();
    endGame();
    return;
  }

  if (!state.cells.includes("")) {
    updateMessage("It's a draw!");
    endGame();
    return;
  }

  state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
  const next = state.currentPlayer === 1 ? state.player1.name : state.player2.name;
  updateMessage(`${next}'s turn ⏳`);

  if (gameMode === "pvp-timed" || (gameMode === "bot" && state.currentPlayer === 1)) {
    startTimer(state.currentPlayer, difficulty, () => {
      updateMessage(`${next} ran out of time!`);
      const opponent = state.currentPlayer === 1 ? state.player2 : state.player1;
      opponent.score++;
      updateScore();
      showRandomStory();
      endGame();
    });
  }

 
  if ((gameMode === "bot" || gameMode === "bot-unbeatable") && state.currentPlayer === 2) {
   if (gameMode === "bot-unbeatable") {
    setTimeout(unbeatableBotMove, 500);
   } else {
    setTimeout(botMove, 500);
   }
}

}

function checkWin(sym) {
  const lines = [];

  for (let i = 0; i < size; i++) {
    lines.push([...Array(size).keys()].map(j => i * size + j)); // rows
    lines.push([...Array(size).keys()].map(j => j * size + i)); // cols
  }

  lines.push([...Array(size).keys()].map(i => i * size + i)); // diag
  lines.push([...Array(size).keys()].map(i => i * size + (size - 1 - i))); // anti-diag

  return lines.some(line => line.every(i => state.cells[i] === sym));
}

export function resetGame() {
  state.setCells(Array(size * size).fill(""));
  state.moveHistory = [];
  state.gameActive = true;
  state.currentPlayer = 1;
  updateScore();
  renderBoard();
  updateMessage(`${state.player1.name}'s turn ⏳`);

  if (gameMode === "pvp-timed") {
    startTimer(1, difficulty, () => {
      updateMessage(`${state.player1.name} ran out of time!`);
      state.player2.score++;
      updateScore();
      endGame();
    });
  }

  if ((gameMode === "bot" || gameMode === "bot-unbeatable") && state.currentPlayer === 2) {
   if (gameMode === "bot-unbeatable") {
    setTimeout(unbeatableBotMove, 500);
   } else {
    setTimeout(botMove, 500);
   }
}

 
}

export function updateScore() {
  p1ScoreDisplay.textContent = state.player1.score;
  p2ScoreDisplay.textContent = state.player2.score;
}

export function updateMessage(msg) {
  message.textContent = msg;
}

function launchConfetti() {
  if (typeof confetti === "function") {
    const duration = 2000;
    const interval = setInterval(() => confetti(), 200);
    setTimeout(() => clearInterval(interval), duration);
  }
}

export function endGame() {
  state.gameActive = false;
  saveGameState();
}

export function showRandomStory() {
  const stories = [
   "🧙‍♀️ Code Wizard just cast ‘Game Over’ — you stood no chance!",
   "⚔️ Player said: ‘Click click boom!’ — and just took the win.",
   "🐱 Kitty hacked the grid — like, literally clawed their way to victory.",
   "🦊 Fox unlocked beast mode. Like, are you even playing, or just watching?",
   "🐶 DebugDog barked once and the bugs surrendered. Game = done.",
   "💥 This wasn’t just a win, it was a whole *main character moment*.",
   "🚀 Boom! Someone just launched themselves to victory — no countdown needed.",
   "🎮 Game said ‘Tic’... player said ‘Tac’, and ‘Toe’ got SMACKED.",
   "🌀 Hold up — did you just witness a *legendary* Tic Tac move?",
   "😎 Someone’s cooking. And it’s not even close — that board just got served."
  ];

  const popup = document.getElementById("story-popup");
  const storyText = document.getElementById("story-text");
  const randomStory = stories[Math.floor(Math.random() * stories.length)];

  storyText.textContent = randomStory;
  popup.classList.remove("hidden");
}

window.hideStory = function () {
  document.getElementById("story-popup").classList.add("hidden");
}
