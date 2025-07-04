const bgMusic = new Audio("assets/tictac.mp3");
bgMusic.loop = true; // repeats the music continously
bgMusic.volume = 0.5; // controls the volume

let soundOn = true; // checks whethe the music is on or off

document.getElementById("start-btn").addEventListener("click", () => {
  bgMusic.play().catch(e => console.log("Autoplay blocked"));
});/* starts music when the stat button is clicked 
it is function it is handled in the ui file*/

const muteBtn = document.getElementById("mute-btn");
muteBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  bgMusic.muted = !soundOn;
  muteBtn.textContent = soundOn ? "Mute" : "Unmute";
}); // muting and unmuting happens here 

const themeSelect = document.getElementById("theme-select");
const body = document.body;

const themeBackgrounds = {
  classic: "url('assets/forest.jpeg')",
  galaxy: "url('assets/space.jpeg')",
  war: "url('assets/post-war.jpeg')"
};

themeSelect.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;
  body.style.backgroundImage = themeBackgrounds[selectedTheme];
  body.style.backgroundSize = "cover";
}); // theme bg like it allows the player to choose the theme he or she wants 

function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });// confetti animation am calling it in the ui file 
}
