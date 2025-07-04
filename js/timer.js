// This timer only works in pvp timed mode
// Every player has 3 seconds to play or it switches to the next player automatically

function startTimer() {
 
  if (gameMode !== "pvp-timed") return;

  clearTimeout(timer);

  const currentName = currentPlayer === 1 ? player1.name : player2.name;
  updateMessage(`${currentName}'s turn ⏳`);

  timer = setTimeout(() => {
    if (!gameActive) return;
    updateMessage(`${currentName} took too long! ❌`);

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    renderBoard();

    
    startTimer();
  }, 3000); 
}
