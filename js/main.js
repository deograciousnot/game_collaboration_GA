import { initUI, updateScore, updateMessage, endGame, renderBoard, resetGame } from './ui.js';
import { loadSettings } from './storage.js';
import { loadGameState, state } from './state.js';


// Background music setup
const bgMusic = new Audio("assets/tictac.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

let soundOn = true;

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", () => {
    // Load settings and initialize game
    const settings = loadSettings();
    if (!settings) {
        window.location.href = "setup.html";
        return;
    }

    state.gameMode = settings.mode;

    const hasSaved = loadGameState();
    const restoreBtn = document.getElementById("restore-btn");

    
    // Initialize the game UI
    initUI(settings);
   
    restoreBtn.addEventListener("click", () => {
        const restored = loadGameState();
        if (restored) {
         renderBoard();
         updateScore();
         updateMessage(`${state.currentPlayer === 1 ? state.player1.name : state.player2.name}'s turn ⏳`); 
        } else {
             alert("No previous game found to restore.");
      
        }
    });
    
    // Apply theme background
    const themeBackgrounds = {
        classic: "url('assets/forest.jpeg')",
        galaxy: "url('assets/space.jpeg')",
        war: "url('assets/post-war.jpeg')",
        ancient: "url('assets/ancient.jpeg')",
        tik: "url('assets/tik.jpeg')",
        secret: "url('assets/secret.jpeg')"
    };
    document.body.style.backgroundImage = themeBackgrounds[settings.theme];
    document.body.style.backgroundSize = "cover";
    
    // Try to play background music
    bgMusic.play().catch(e => console.log("Autoplay blocked"));

    // Setup all button handlers
    setupButtonHandlers();
});

let isPaused = false;

document.getElementById("pause-btn").addEventListener("click", () => {
  isPaused = !isPaused;

  const boardContainer = document.querySelector(".game-container");
  if (isPaused) {
    document.body.classList.add("paused");
    document.getElementById("pause-btn").textContent = "Resume";
    stopTimer(); // Stop countdown
    showOverlay("Paused...");
    document.body.classList.add("paused");
document.getElementById("board").classList.add("disabled");

  } else {
    document.body.classList.remove("paused");
    document.getElementById("pause-btn").textContent = "Pause";
    removeOverlay();
    // Resume timer if needed
    startTimer(state.currentPlayer, state.difficulty, () => {
      updateMessage(`Player took too long!`);
      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      updateScore();
      endGame();
    });
  }
});

function showOverlay(text) {
  const overlay = document.createElement("div");
  overlay.id = "pause-overlay";
  overlay.textContent = text;
  document.body.appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.getElementById("pause-overlay");
  if (overlay) overlay.remove();
}


function setupButtonHandlers() {
    // Mute button
    const muteBtn = document.getElementById("mute-btn");
    muteBtn.addEventListener("click", () => {
        soundOn = !soundOn;
        bgMusic.muted = !soundOn;
        muteBtn.textContent = soundOn ? "Mute" : "Unmute";
    });

    // Quit button
const quitBtn = document.getElementById("quit-btn");
quitBtn.addEventListener("click", () => {
  const result = {
    p1: state.player1.name,
    p2: state.player2.name,
    score1: state.player1.score,
    score2: state.player2.score,
    winner:
      state.player1.score > state.player2.score
        ? state.player1.name
        : state.player1.score < state.player2.score
        ? state.player2.name
        : "Draw",
    date: new Date().toLocaleString(),
  };

  const history = JSON.parse(localStorage.getItem("matchResults") || "[]");
  history.push(result);
  localStorage.setItem("matchResults", JSON.stringify(history));

  window.location.href = "scoreboard.html";
});


    // Forfeit button
    const forfeitBtn = document.getElementById("forfeit-btn");
    forfeitBtn.addEventListener("click", () => {
        const currentPlayerName = state.currentPlayer === 1 ? state.player1.name : state.player2.name;
        if (confirm(`${currentPlayerName}, are you sure you want to forfeit?`)) {
            const winner = state.currentPlayer === 1 ? state.player2 : state.player1;
            winner.score++;
            updateScore();
            endGame();
            updateMessage(`${winner.name} wins by forfeit! 🏳️`);
        }
    });
}

// Export for use in other files
export function launchConfetti() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });
}
