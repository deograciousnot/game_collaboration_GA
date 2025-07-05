// logic.js
export function checkWin(cells, size, symbol) {
  const lines = [];

  for (let i = 0; i < size; i++) {
    lines.push([...Array(size).keys()].map(j => i * size + j)); // rows
    lines.push([...Array(size).keys()].map(j => j * size + i)); // cols
  }

  lines.push([...Array(size).keys()].map(i => i * size + i)); // diag
  lines.push([...Array(size).keys()].map(i => i * size + (size - 1 - i))); // anti-diag

  return lines.some(line => line.every(i => cells[i] === symbol));
}
