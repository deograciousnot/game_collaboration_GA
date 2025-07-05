let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-video", {
    events: {
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          window.location.href = "index.html";
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("start-video-btn");
  const music = document.getElementById("bg-music");
  const videoBox = document.getElementById("video-container");

  const lines = [
    "Well well, you finally made it.",
    "Welcome to our Tic-Tac-Toe game.",
    "Ready to lose or win?",
    "Your headache awaits 😈",
    "Choose your path..."
  ];

  let currentLine = 0;

  function typeText(text, elementId, callback) {
    const element = document.getElementById(elementId);
    let i = 0;
    const typing = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(typing);
        callback && callback();
      }
    }, 50);
  }

  function showLines() {
    if (currentLine < lines.length) {
      typeText(lines[currentLine], `line${currentLine + 1}`, () => {
        currentLine++;
        setTimeout(showLines, 300);
      });
    } else {
      button.style.display = "inline-block";
    }
  }

  showLines();

  button.addEventListener("click", () => {
    music.pause();
    videoBox.style.display = "block";

  
    if (player && typeof player.playVideo === "function") {
      player.playVideo();
    }
  });
});
