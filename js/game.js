let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 1;
let gameActive = false;
let gameMode = "pvp"; // Default
let timer = null;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWin(emoji) {
  return winCombos.some(combo =>
    combo.every(index => cells[index] === emoji)
  );
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 1;
  updateMessage("");
  renderBoard();

  if (gameMode === "pvp-timed") {
    startTimer();
  }
}

function botMove() {
  if (!gameActive) return;
  let emptyIndices = cells.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  if (emptyIndices.length === 0) return;

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[randomIndex] = player2.emoji;
  renderBoard();

  if (checkWin(player2.emoji)) {
    updateMessage(`${player2.name} (Bot) wins! 💻`);
    player2.score++;
    updateScore();
    gameActive = false;
  } else if (!cells.includes("")) {
    updateMessage("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = 1;
    if (gameMode === "pvp-timed") startTimer();
  }
}

function startTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    updateMessage(`${currentPlayer === 1 ? player1.name : player2.name} took too long!`);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    renderBoard(); // no move made
    if (gameMode === "pvp-timed") startTimer();
    if (gameMode === "bot" && currentPlayer === 2) botMove();
  }, 5000); // 5 seconds
}
