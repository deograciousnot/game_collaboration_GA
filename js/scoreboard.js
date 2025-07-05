const body = document.getElementById("scoreboard-body");
const history = JSON.parse(localStorage.getItem("matchResults")) || [];

if (history.length === 0) {
  body.innerHTML = "<tr><td colspan='6'>No matches yet.</td></tr>";
} else {
  history.forEach(match => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${match.p1}</td>
      <td>${match.score1}</td>
      <td>${match.p2}</td>
      <td>${match.score2}</td>
      <td>${match.winner}</td>
      <td>${match.date}</td>
    `;
    body.appendChild(row);
  });
}

document.getElementById("clear-history").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all match history?")) {
    localStorage.removeItem("matchResults");
    location.reload();
  }
});
