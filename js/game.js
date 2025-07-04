//bot mode
function botMove() {
  if (!gameActive || gameMode !== "bot") return;

  let emptyIndices = cells
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  if (emptyIndices.length === 0) return;

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[randomIndex] = player2.emoji;
  renderBoard();

  if (checkWin(player2.emoji)) {
    updateMessage(`${player2.name} (Bot) wins! 💻`);
    player2.score++;
    updateScore();//updates it on UI
    gameActive = false;
  } else if (!cells.includes("")) {
    updateMessage("It's a draw!");
    gameActive = false;
  }   else {
    currentPlayer = 1;
    updateMessage(`${player1.name}'s turn ⏳`);
  }
  
}
