# 🎮 Tic-Tac-Tension

An immersive, modular, and dynamic twist on the classic Tic-Tac-Toe — now with bots, timed challenges, customizable themes, narration, and a glitchy retro sci-fi vibe.

---

## 🧠 Project Overview

Tic-Tac-Tension is a web-based multiplayer game that allows users to play traditional Tic-Tac-Toe with modern enhancements including:

- Classic Player vs Player
- PvP with a timer (Easy, Medium, Hard)
- Player vs Bot with named opponents
- Score tracking and local match history
- Voice-guided intro and cinematic landing
- Grid size selection (3x3, 5x5, 7x7)
- Custom themes (Nature, Galaxy, Post-War)
- 🎉 Confetti effects and glitch transitions
- Modularized JS (logic, state, UI, storage)

---

## 👨‍💻 Project Developers

Deogracious Kiprop ([@deograciousnot](https://github.com/deograciousnot)) 

Melissa Angwenyi ([@melissamoraa](https://github.com/melissamoraa)) 

Miski Abdullahi  ([@MiskiUpdu](https://github.com/MiskiUpdu))   
                                                                                                                                            
Dylan Limozi([@dylan_led][https://github.com/dylan872])
                                                                                                                                                 
---

## 🛠 Technologies Used

- HTML5  
- CSS3 (with responsive styling & backdrop filters)  
- Vanilla JavaScript (ES Modules)  
- LocalStorage for persistent settings  
- Canvas Confetti (external library)  
- 🎵 HTML5 Audio & Video

---

## 📂 Project / File Structure

📁 game_collaboration_GA/ ├── index.html               # Hero / welcome page ├── setup.html               # Game configuration page ├── board.html               # Game board page ├── scoreboard.html          # Match history │ ├── css/ │   ├── hero.css │   ├── setup.css │   ├── board.css │   └── scoreboard.css │ ├── js/ │   ├── main.js              # Page loader & handlers │   ├── ui.js                # Board rendering + UI logic │   ├── bot.js               # Bot opponent logic │   ├── timer.js             # Countdown per turn │   ├── logic.js             # Win/draw logic (optional module) │   ├── state.js             # Game state & players │   └── storage.js           # localStorage wrapper │ ├── assets/ │   ├── intro.mp4            # Landing page video │   ├── tictac.mp3           # Background music │   └── glitch-transition.mp3 │ └── README.md                # Project documentation (this file)

---

## 🧪 Installation Instructions

### ⚙ Run Locally

1. Clone the repository:
```bash
git clone https://github.com/deograciousnot/game_collaboration_GA.git

2. Navigate into the project folder:



cd game_collaboration_GA

3. Start a local server: You can use Live Server in VSCode or run:



npx serve .
# or use python
python -m http.server

4. Open index.html in your browser to begin.



> 🔒 Note: Game uses localStorage to track scores and match history. Clear storage to reset data.




---

🔖 License

Free to use for academic and demo purposes.
Design and voice narration by the team.
Attribution required for third-party audio/video assets if redistributed.


---

🙌 Acknowledgements

Special thanks to my teammates [Melissa, Miski and Dylan] for co-developing the landing page and early logic






