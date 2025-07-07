// storage.js


export function saveSettings(settings) {
  localStorage.setItem("ticSettings", JSON.stringify(settings));
}

export function loadSettings() {
  const saved = localStorage.getItem("ticSettings");
  return saved ? JSON.parse(saved) : null;
}

export function clearSettings() {
  localStorage.removeItem("ticSettings");
}

