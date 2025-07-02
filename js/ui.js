// UI handling code goes here
const board = document.getElementById("board");
const message = document.getElementById("message");
const startBtn = document.getElementById("start-btn");
const rematchBtn = document.getElementById("rematch-btn");
const p1ScoreDisplay = document.getElementById("p1-score");
const p2ScoreDisplay = document.getElementById("p2-score");

const player1Emoji = document.getElementById("player1-emoji");
const player2Emoji = document.getElementById("player2-emoji");

let player1 = { name: "Player 1", emoji: "❌", score: 0 };
let player2 = { name: "Player 2", emoji: "⭕", score: 0 };

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener("click", handleCellClick);
    board.appendChild(div);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index] !== "") return;

  const emoji = currentPlayer === 1 ? player1.emoji : player2.emoji;
  cells[index] = emoji;
  renderBoard();

  if (checkWin(emoji)) {
    const winner = currentPlayer === 1 ? player1 : player2;
    updateMessage(`${winner.name} wins! 🎉`);
    winner.score++;
    updateScore();
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    updateMessage("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function updateScore() {
  p1ScoreDisplay.textContent = player1.score;
  p2ScoreDisplay.textContent = player2.score;
}

function updateMessage(msg) {
  message.textContent = msg;
}

startBtn.addEventListener("click", () => {
  player1.name = document.getElementById("player1-name").value || "Player 1";
  player2.name = document.getElementById("player2-name").value || "Player 2";
  player1.emoji = player1Emoji.value;
  player2.emoji = player2Emoji.value;
  resetGame();
});

rematchBtn.addEventListener("click", resetGame);
