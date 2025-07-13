const materias = [
  // Mismo arreglo de materias con id, semestre y prereq
  // Puedes pegar el mismo que ya tienes o el que te di anteriormente
];

let aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas")) || []);

function guardarProgreso() {
  localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));
}

function puedeDesbloquear(materia) {
  const requisitos = materia.prereq || [];
  return requisitos.every(id => aprobadas.has(id));
}

function crearMateriaElemento(m) {
  const matDiv = document.createElement("div");
  matDiv.className = "materia";
  matDiv.textContent = m.nombre;
  matDiv.dataset.id = m.id;

  const estaAprobada = aprobadas.has(m.id);
  const desbloqueada = puedeDesbloquear(m);

  if (!desbloqueada && !estaAprobada) {
    matDiv.classList.add("locked");
  }

  if (estaAprobada) {
    matDiv.classList.add("completed");
  }

  matDiv.addEventListener("click", () => {
    if (!desbloqueada && !estaAprobada) return;

    // Toggle aprobado/desaprobado
    if (aprobadas.has(m.id)) {
      aprobadas.delete(m.id);
    } else {
      aprobadas.add(m.id);
    }

    guardarProgreso();
    renderMalla(); // Redibuja todo
  });

  return matDiv;
}

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  for (let semestre = 1; semestre <= 8; semestre++) {
    const div = document.createElement("div");
    div.className = "semestre";

    const h2 = document.createElement("h2");
    h2.textContent = `${semestre}° Semestre`;
    div.appendChild(h2);

    materias
      .filter(m => m.semestre === semestre)
      .forEach(m => {
        const matElem = crearMateriaElemento(m);
        div.appendChild(matElem);
      });

    container.appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", renderMalla);


