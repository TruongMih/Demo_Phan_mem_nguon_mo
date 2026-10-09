let students = [
  { id: 1, name: "Le Pham Hoai N", class: "CNTT", score: 4.5 },
  { id: 1, name: "Do Thanh L", class: "QTKD", score: 5.0 },
  { id: 1, name: "Truong Nhut M", class: "CNTT", score: 10.0 },
];

const total = document.getElementById("stat-total");
const classes = document.getElementById("stat-classes");
const gpa = document.getElementById("stat-gpa");

const body = document.getElementById("student-body");
const searchInput = document.getElementById("search-input");

// Phan thong ke
function updateStats() {
  total = students.length;
  classes = new Set(students.map((person) => person.class)).size;
  gqa = total ? students.reduce((sum, s) => (sum + s.score) / total) : "0";
}

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
      <td>${escapeHtml(s.cls)}</td>
      <td>${s.score}</td>
      <td class="actions">
        <button type="button" class="btn btn-small" data-action="edit" data-id="${escapeHtml(s.id)}">Sửa</button>
        <button type="button" class="btn btn-small btn-danger" data-action="delete" data-id="${escapeHtml(s.id)}">Xóa</button>
      </td>
    </tr>`,
    )
    .join("");
}

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
