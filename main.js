let students = [
  { id: 1, name: "Le Pham Hoai N", class: "CNTT", score: 4.5 },
  { id: 2, name: "Do Thanh L", class: "QTKD", score: 5.0 },
  { id: 3, name: "Truong Nhut M", class: "CNTT", score: 10.0 },
];

const body = document.getElementById("student-body");
const searchInput = document.getElementById("search-input");

// Phan thong ke
function updateStats() {
  const rows = document.querySelectorAll("#student-body tr");
  const classes = new Set();
  let sum = 0;

  rows.forEach(tr => {
    const cells = tr.querySelectorAll("td");
    classes.add(cells[2].textContent.trim());      
    sum += parseFloat(cells[3].textContent) || 0;     
  });

  const total = rows.length;
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-classes").textContent = classes.size;
  document.getElementById("stat-gpa").textContent =
    total ? (sum / total).toFixed(1) : 0;
}

updateStats();
// Bang
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderTable(list) {
  body.innerHTML = list
    .map(
      (s) => `
    <tr>
      <td>${escapeHtml(s.id)}</td>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.class)}</td>
      <td>${s.score}</td>
      <td class="actions">
        <button type="button" class="btn btn-small" data-action="edit" data-id="${escapeHtml(s.id)}">Sửa</button>
        <button type="button" class="btn btn-small btn-danger" data-action="delete" data-id="${escapeHtml(s.id)}">Xóa</button>
      </td>
    </tr>`,
    )
    .join("");
};
function render() {
  const q = searchInput.value.trim().toLowerCase();
  const list = q
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q),
      )
    : students;

  renderTable(list);
  updateStats();
  try {
    localStorage.setItem("students", JSON.stringify(students));
  } catch (e) {}
}
render();