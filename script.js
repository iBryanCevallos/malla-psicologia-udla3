const materias = [
  { id: "psico_general", nombre: "Psicología general", semestre: 1 },
  { id: "perspectivas", nombre: "Perspectivas en psicología", semestre: 1 },
  { id: "lenguaje_cuantitativo", nombre: "Lenguaje cuantitativo", semestre: 1 },
  { id: "lenguaje_digital", nombre: "Lenguaje y comunicación digital", semestre: 1 },

  { id: "estadistica", nombre: "Estadística en psicología", semestre: 2, depende: ["lenguaje_cuantitativo"] },
  { id: "investigacion1", nombre: "Introducción a la investigación en psicología", semestre: 2, depende: ["psico_general", "perspectivas"] },
  { id: "textos_academicos", nombre: "Investigación y textos académicos", semestre: 2, depende: ["lenguaje_digital"] },
  { id: "personalidad", nombre: "Psicología de la personalidad", semestre: 2, depende: ["psico_general"] }
];

let aprobadas = new Set();
let visibles = new Set(materias.filter(m => m.semestre === 1).map(m => m.id));

function actualizarVista() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let semestre = 1; semestre <= 8; semestre++) {
    const bloque = document.createElement("div");
    bloque.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `${semestre}° Semestre`;
    bloque.appendChild(titulo);

    materias
      .filter(m => m.semestre === semestre && visibles.has(m.id))
      .forEach(m => {
        const div = document.createElement("div");
        div.className = "materia";
        div.textContent = m.nombre;

        if (aprobadas.has(m.id)) {
          div.classList.add("completed");
        }

        div.addEventListener("click", () => {
          if (aprobadas.has(m.id)) {
            aprobadas.delete(m.id);
          } else {
            aprobadas.add(m.id);
            // Desbloquea materias que dependan de esta
            materias.forEach(destino => {
              if (destino.depende && destino.depende.includes(m.id)) {
                if (destino.depende.every(req => aprobadas.has(req))) {
                  visibles.add(destino.id);
                }
              }
            });
          }
          actualizarVista();
        });

        bloque.appendChild(div);
      });

    if (bloque.children.length > 1) {
      contenedor.appendChild(bloque);
    }
  }
}

document.addEventListener("DOMContentLoaded", actualizarVista);

