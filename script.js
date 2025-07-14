const materias = [
  // 1º Semestre
  { id: "psico_general", nombre: "Psicología general", semestre: 1 },
  { id: "perspectivas", nombre: "Perspectivas en psicología", semestre: 1 },
  { id: "lenguaje_cuantitativo", nombre: "Lenguaje cuantitativo", semestre: 1 },
  { id: "lenguaje_digital", nombre: "Lenguaje y comunicación digital", semestre: 1 },

  // 2º Semestre
  { id: "estadistica", nombre: "Estadística en psicología", semestre: 2, depende: ["lenguaje_cuantitativo"] },
  { id: "investigacion1", nombre: "Introducción a la investigación en psicología", semestre: 2, depende: ["psico_general", "perspectivas"] },
  { id: "textos", nombre: "Investigación y textos académicos", semestre: 2, depende: ["lenguaje_digital"] },
  { id: "personalidad", nombre: "Psicología de la personalidad", semestre: 2, depende: ["psico_general"] },
  { id: "ingles2", nombre: "Inglés elemental 2", semestre: 2 },
  { id: "bases_fisio", nombre: "Bases fisiológicas de la psicología", semestre: 2, depende: ["psico_general"] },

  // 3º Semestre
  { id: "ingles3", nombre: "Inglés Intermedio I", semestre: 3, depende: ["ingles2"] },
  { id: "cognicion", nombre: "Cognición y aprendizaje", semestre: 3, depende: ["bases_fisio"] },
  { id: "desarrollo1", nombre: "Desarrollo a través de la vida I", semestre: 3, depende: ["psico_general"] },
  { id: "critico", nombre: "Pensamiento crítico", semestre: 3 },

  // 4º Semestre
  { id: "psico_ninez", nombre: "Psicopatología de la niñez y adolescencia", semestre: 4, depende: ["cognicion", "personalidad", "desarrollo1"] },
  { id: "ingles4", nombre: "Inglés intermedio II", semestre: 4, depende: ["ingles3"] },
  { id: "psico_social", nombre: "Psicología social", semestre: 4, depende: ["desarrollo1", "cognicion", "personalidad", "investigacion1"] },
  { id: "gestion_org", nombre: "Gestión en organizaciones saludables", semestre: 4 },
  { id: "pedagogia", nombre: "Pedagogía y andragogía", semestre: 4 },

  // 5º Semestre
  { id: "comunitaria", nombre: "Psicología comunitaria", semestre: 5, depende: ["psico_social"] },
  { id: "ingles5", nombre: "Inglés Avanzado I", semestre: 5, depende: ["ingles4"] },
  { id: "investigacion2", nombre: "Investigación en psicología II", semestre: 5, depende: ["investigacion1", "textos", "estadistica"] },
  { id: "entrevista", nombre: "Entrevistas psicológicas", semestre: 5 },
  { id: "aplicada", nombre: "Psicología con aplicación al ámbito social", semestre: 5 },
  { id: "proyectos", nombre: "Proyectos de vida", semestre: 5 },

  // 6º Semestre
  { id: "medicion", nombre: "Medición en psicología", semestre: 6, depende: ["investigacion2"] },
  { id: "pruebas", nombre: "Pruebas psicológicas y evaluación", semestre: 6, depende: ["investigacion2", "psico_ninez"] },
  { id: "psico_adulto", nombre: "Psicopatología del adulto y adulto mayor", semestre: 6, depende: ["psico_ninez"] },
  { id: "abordaje", nombre: "Técnicas de abordaje grupal", semestre: 6, depende: ["aplicada"] },
  { id: "prevencion", nombre: "Prevención e intervención en psicología", semestre: 6, depende: ["aplicada"] },
  { id: "ingles6", nombre: "Inglés Avanzado II", semestre: 6, depende: ["ingles5"] },

  // 7º Semestre
  { id: "diversidad", nombre: "Diversidad sociocultural y la psicología", semestre: 7, depende: ["psico_adulto"] },
  { id: "sexualidad", nombre: "Educación en sexualidad", semestre: 7, depende: ["psico_adulto"] },
  { id: "desastres", nombre: "Gestión e intervención en desastres y emergencias", semestre: 7 },
  { id: "orientacion", nombre: "Orientación familiar", semestre: 7, depende: ["entrevista", "psico_adulto"] },
  { id: "tita1", nombre: "Diseño de investigación y formulación de proyectos I (Tita I)", semestre: 7 },

  // 8º Semestre
  { id: "perinatal", nombre: "Psicología perinatal", semestre: 8, depende: ["abordaje", "prevencion"] },
  { id: "motivacion", nombre: "Motivación y emoción", semestre: 8, depende: ["pruebas"] },
  { id: "practicas", nombre: "Prácticas preprofesionales", semestre: 8, depende: ["pruebas", "entrevista", "orientacion", "desastres"] },
  { id: "epidemiologia", nombre: "Epidemiología y problemas psicosociales contemporáneos", semestre: 8, depende: ["desastres"] },
  { id: "tita2", nombre: "Diseño de investigación y formulación de proyectos II (Tita II)", semestre: 8, depende: ["tita1"] }
];

let aprobadas = new Set();

function puedeActivarse(materia) {
  if (!materia.depende) return true;
  return materia.depende.every(id => aprobadas.has(id));
}

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let semestre = 1; semestre <= 8; semestre++) {
    const bloque = document.createElement("div");
    bloque.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `${semestre}° Semestre`;
    bloque.appendChild(titulo);

    materias
      .filter(m => m.semestre === semestre)
      .forEach(m => {
        const div = document.createElement("div");
        div.className = "materia";
        div.textContent = m.nombre;

        const estaAprobada = aprobadas.has(m.id);
        const activa = puedeActivarse(m);

        if (estaAprobada) div.classList.add("completed");
        else if (!activa) div.classList.add("locked");

        div.addEventListener("click", () => {
          if (!activa) return;
          if (estaAprobada) {
            aprobadas.delete(m.id);
          } else {
            aprobadas.add(m.id);
          }
          renderMalla();
        });

        bloque.appendChild(div);
      });

    contenedor.appendChild(bloque);
  }
}

document.addEventListener("DOMContentLoaded", renderMalla);
