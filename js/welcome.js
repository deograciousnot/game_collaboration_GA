document.addEventListener("DOMContentLoaded", () => {
  const line = document.getElementById("line");
  const button = document.getElementById("start-btn");
  const narration = document.getElementById("narration");
  const skipBtn = document.getElementById("skip-intro");
  const rulesGlass = document.getElementById("rules-glass");
  const overlay = document.getElementById("transition-overlay");

  const lines = [
    "This is no ordinary Tic-Tac-Toe.",
    "I see you made it.",
    "It's a battle of wits... Tic-Tac-Tension awaits.",
    "Begin, lowly traveler...",
    "It has begun.",
    "", // pause
    "The rules of the game are simple...",
    "Each player takes turns in one of three modes...",
    "PvP. PvP Timed. Or Player vs Bot.",
    "I should warn you... no one beats the machine.",
  ];

  let currentLine = 0;

  // Start narration
  narration.play();

  // Show skip button after short delay
  setTimeout(() => {
    skipBtn.style.display = "block";
  }, 2000);

  // Typing logic
  function typeLine(lineText, callback) {
    let i = 0;
    line.textContent = "";
    const interval = setInterval(() => {
      line.textContent += lineText.charAt(i);
      i++;
      if (i >= lineText.length) {
        clearInterval(interval);
        setTimeout(callback, 1200);
      }
    }, 40);
  }

  function processLines() {
    if (currentLine >= lines.length) {
      showRules();
      return;
    }

    const text = lines[currentLine];
    currentLine++;

    if (text === "") {
      line.textContent = "";
      setTimeout(processLines, 800);
    } else {
      typeLine(text, processLines);
    }
  }

  function showRules() {
    line.textContent = "";
    rulesGlass.classList.remove("hidden");
    button.style.display = "inline-block";
  }

function transitionToGame() {
  const overlay = document.getElementById("transition-overlay");
  const glitchText = overlay.querySelector(".glitch-text");
  const glitchSound = document.getElementById("glitch-sound");

  overlay.classList.add("active");

  // Lower narration volume
  narration.volume = 0.2;
  glitchSound.volume = 0.9;
  glitchSound.play();  // 🔊 play glitch FX

  setTimeout(() => {
    narration.pause();
    glitchText.textContent = "";
    window.location.href = "setup.html";
  }, 1800);
}

  // Start typing sequence
  processLines();

  // Buttons
  button.addEventListener("click", transitionToGame);
  skipBtn.addEventListener("click", transitionToGame);
});
