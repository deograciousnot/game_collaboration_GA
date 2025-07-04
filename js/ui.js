/*UI.js – This is where our main game stuff is controlled , like player vs player normal ,player vs player timed  and bot mode
 all the logic happens here, like when someone clicks, wins, draws, etc.*/

const board = document.getElementById("board");
const message = document.getElementById("message");
const startBtn = document.getElementById("start-btn");
const rematchBtn = document.getElementById("rematch-btn");
const p1ScoreDisplay = document.getElementById("p1-score");
const p2ScoreDisplay = document.getElementById("p2-score");
const player1Emoji = document.getElementById("player1-emoji");
const player2Emoji = document.getElementById("player2-emoji");  //things we’re grabbing from the HTML

let player1 = { name: "Player 1", emoji: "❌", score: 0 };
let player2 = { name: "Player 2", emoji: "⭕", score: 0 };
let cells = ["", "", "", "", "", "", "", "", ""]; //it represents the board cell it is empty cells
let currentPlayer = 1; //tells us whose turn it is 
let gameActive = false;
let gameMode = "pvp"; 
let timer = null;  // only works when we chose the timed mode
let selectedModeBtn = null;
 
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
]; // perfect winning rows and colums it is 3*3 but we'll also create 5*5 and 7*7 to make the game more fun


const modeRadios = document.querySelectorAll('input[name="mode"]');
modeRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    gameMode = radio.value;
    updateMessage(`You picked ${radio.parentElement.textContent.trim()}`);
  });
});/* So this part just listens when I click one of the modes normal, timed, or bot
    and then it changes the gameMode to that one I picked,and also shows a small 
    message like "You picked Bot Mode" just to confirm it*/




function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener("click", handleCellClick);
    board.appendChild(div);
  }); // this function draws the 9 boxes like it draws the board 
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
    launchConfetti();
    winner.score++;
    updateScore();
    gameActive = false;
    return;
  }  //check if someone won


  if (!cells.includes("")) {
    updateMessage("It's a draw!");
    gameActive = false;
    return;
  }// checks nif it is a draw

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  const nextName = currentPlayer === 1 ? player1.name : player2.name;
  updateMessage(`${nextName}'s turn ⏳`);
  
  if (gameMode === "pvp-timed") {
    startTimer(); // Comes from timer.js
  } // starts the countdown for timed mode 

 if (gameMode === "bot" && currentPlayer === 2) {
  setTimeout(() => {
    botMove();
  }, 500); // 
}

}

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

  if (gameMode === "pvp-timed") startTimer(); // Optional timer mode
  if (gameMode === "bot" && currentPlayer === 2) botMove(); // Optional bot mode
}

function updateScore() {
  p1ScoreDisplay.textContent = player1.score;
  p2ScoreDisplay.textContent = player2.score;
}

function updateMessage(msg) {
  message.textContent = msg;
}
// this makes the confetti show up when someone wins,i used an external library for this like I linked it in the html file
function launchConfetti() {
  if (typeof confetti === "function") {
    const duration = 2000;
    const interval = setInterval(() => confetti(), 200);
    setTimeout(() => clearInterval(interval), duration);
  }
}

startBtn.addEventListener("click", () => {
  if (player1Emoji.value === player2Emoji.value) {
    updateMessage("Pick a different emoji!!!");
    return;
  }
  player1.name = document.getElementById("player1-name").value || "Player 1";
  player2.name = document.getElementById("player2-name").value || "Player 2";
  player1.emoji = player1Emoji.value;
  player2.emoji = player2Emoji.value;

  document.querySelector(".player-setup").classList.add("hidden");/*this hides the setup form like, after the players type their names
                                                                     and pick emojis and theme, once i press start game, it hides
                                                                      all that */

  resetGame();
});

rematchBtn.addEventListener("click", resetGame);//if someone clicks rematch, it resets everything

