/*this section holds the current state of the game....
 to avoid repeatedly passing the same data around in other modules*/
export const state = {
  currentPlayer: 1,
  gameActive: true,
  cells: [],
  moveHistory: [],

  unlockedEmojis: ["❌", "⭕", "🐱","🧙","🐶","🦾"],
  unlockedThemes: ["Nature","space","post-war"],


  player1: {
    name: "Player 1",
    emoji: "❌",
    score: 0,
    xp: 0,
  },
  player2: {
    name: "Player 2",
    emoji: "⭕",
    score: 0,
    xp: 0,
  },

  setCells(newCells) {
    this.cells =[...newCells];
  }

};

export function saveGameState() {
  const gameData = {
    cells: state.cells,
    currentPlayer: state.currentPlayer,
    player1: state.player1,
    player2: state.player2,
    gameActive: state.gameActive,
    moveHistory: state.moveHistory,
    grid: state.grid,
    gameMode: state.gameMode,
    unlockedEmojis: state.unlockedEmojis,
    unlockedThemes: state.unlockedThemes,
    

  };

  localStorage.setItem("gameState", JSON.stringify(gameData));
}

export function loadGameState() {
  const saved = JSON.parse(localStorage.getItem("gameState"));
  if (!saved || !saved.player1 || !saved.player2) return false;

  state.cells = saved.cells || [];
  state.currentPlayer = saved.currentPlayer || 1;
  state.player1 = saved.player1;
  state.player2 = saved.player2;
  state.gameActive = saved.gameActive;
  state.moveHistory = saved.moveHistory || [];
  state.grid = saved.grid || 3;
  state.gameMode = saved.gameMode || "pvp";
  state.unlockedEmojis = saved.unlockedEmojis ||  ["❌", "⭕", "🐱","🧙","🐶","🦾"];
  state.unlockedThemes = saved.unlockedThemes ||   ["Nature","space","post-war"];

  return true;
}

export function clearGameState() {
  localStorage.removeItem("gameState");
}


