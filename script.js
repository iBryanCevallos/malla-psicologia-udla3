const materias = [
  { nombre: "Psicología general", semestre: 1, id: "psico_general" },
  { nombre: "Perspectivas en psicología", semestre: 1, id: "perspectivas" },
  { nombre: "Lenguaje cuantitativo", semestre: 1, id: "lenguaje_cuantitativo" },
  { nombre: "Lenguaje y comunicación digital", semestre: 1, id: "lenguaje_digital" },
  { nombre: "Estadística en psicología", semestre: 2, id: "estadistica", prereq: ["lenguaje_cuantitativo"] },
  { nombre: "Introducción a la investigación en psicología", semestre: 2, id: "investigacion1", prereq: ["psico_general", "perspectivas"] },
  { nombre: "Investigación y textos académicos", semestre: 2, id: "textos_academicos", prereq: ["lenguaje_digital"] },
  { nombre: "Psicología de la personalidad", semestre: 2, id: "personalidad", prereq: ["psico_general"] },
  { nombre: "Inglés elemental 2", semestre: 2, id: "ingles2" },
  { nombre: "Bases fisiológicas de la psicología", semestre: 2, id: "bases_fisio", prereq: ["psico_general"] },
  { nombre: "Inglés Intermedio I", semestre: 3, id: "ingles3", prereq: ["ingles2"] },
  { nombre: "Cognición y aprendizaje", semestre: 3, id: "cognicion", prereq: ["bases_fisio"] },
  { nombre: "Desarrollo a través de la vida I", semestre: 3, id: "desarrollo1", prereq: ["psico_general"] },
  { nombre: "Pensamiento crítico", semestre: 3, id: "critico" },
  { nombre: "Psicopatología de la niñez y adolescencia", semestre: 4, id: "psico_niñez", prereq: ["cognicion", "personalidad", "desarrollo1"] },
  { nombre: "Inglés intermedio II", semestre: 4, id: "ingles4", prereq: ["ingles3"] },
  { nombre: "Psicología social", semestre: 4, id: "psico_social", prereq: ["desarrollo1", "cognicion", "personalidad", "investigacion1"] },
  { nombre: "Gestión en organizaciones saludables", semestre: 4, id: "gestion_org" },
  { nombre: "Pedagogía y andragogía", semestre: 4, id: "pedagogia" },
  { nombre: "Psicología comunitaria", semestre: 5, id: "comunitaria", prereq: ["psico_social"] },
  { nombre: "Inglés Avanzado I", semestre: 5, id: "ingles5", prereq: ["ingles4"] },
  { nombre: "Investigación en psicología II", semestre: 5, id: "investigacion2", prereq: ["investigacion1", "textos_academicos", "estadistica"] },
  { nombre: "Entrevistas psicológicas", semestre: 5, id: "entrevista" },
  { nombre: "Psicología con aplicación al ámbito social", semestre: 5, id: "aplicada_social" },
  { nombre: "Proyectos de vida", semestre: 5, id: "proyectos" },
  { nombre: "Medición en psicología", semestre: 6, id: "medicion", prereq: ["investigacion2"] },
  { nombre: "Pruebas psicológicas y evaluación", semestre: 6, id: "pruebas_eval", prereq: ["investigacion2", "psico_niñez"] },
  { nombre: "Psicopatología del adulto y adulto mayor", semestre: 6, id: "psico_adulto", prereq: ["psico_niñez"] },
  { nombre: "Técnicas de abordaje grupal", semestre: 6, id: "abordaje_grupal", prereq: ["aplicada_social"] },
  { nombre: "Prevención e intervención en psicología", semestre: 6, id: "prevencion", prereq: ["aplicada_social"] },
  { nombre: "Inglés Avanzado II", semestre: 6, id: "ingles6", prereq: ["ingles5"] },
  { nombre: "Diversidad sociocultural y la psicología", semestre: 7, id: "diversidad", prereq: ["psico_adulto"] },
  { nombre: "Educación en sexualidad", semestre: 7, id: "sexualidad", prereq: ["psico_adulto"] },
  { nombre: "Gestión e intervención en desastres y emergencias", semestre: 7, id: "desastres" },
  { nombre: "Orientación familiar", semestre: 7, id: "orientacion", prereq: ["entrevista", "psico_adulto"] },
  { nombre: "Diseño de investigación y formulación de proyectos I (Tita I)", semestre: 7, id: "tita1" },
  { nombre: "Psicología perinatal", semestre: 8, id: "perinatal", prereq: ["abordaje_grupal", "prevencion"] },
  { nombre: "Motivación y emoción", semestre: 8, id: "motivacion", prereq: ["pruebas_eval"] },
  { nombre: "Prácticas preprofesionales", semestre: 8, id: "practicas", prereq: ["pruebas_eval", "entrevista", "orientacion", "desastres"] },
  { nombre: "Epidemiología y problemas psicosociales contemporáneos", semestre: 8, id: "epidemiologia", prereq: ["desastres"] },
  { nombre: "Diseño de investigación y formulación de proyectos II (Tita II)", semestre: 8, id: "tita2", prereq: ["tita1"] }
];

let aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas")) || []);

function guardarProgreso() {
  localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));
}

function puedeDesbloquear(materia) {
  const requisitos = materia.prereq || [];
  return requisitos.every(id => aprobadas.has(id));
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
        const estaAprobada = aprobadas.has(m.id);
        const desbloqueada = puedeDesbloquear(m);
        const matDiv = document.createElement("div");
        matDiv.className = "materia";
        matDiv.innerHTML = `<span>${m.nombre}</span>`;
        matDiv.dataset.id = m.id;

        if (!desbloqueada && !estaAprobada) {
          matDiv.classList.add("locked");
        }

        if (estaAprobada) {
          matDiv.classList.add("completed");
        }

        matDiv.addEventListener("click", () => {
          if (!desbloqueada && !estaAprobada) return;

          if (estaAprobada) {
            aprobadas.delete(m.id);
          } else {
            aprobadas.add(m.id);
          }

          guardarProgreso();
          renderMalla();
        });

        div.appendChild(matDiv);
      });

    container.appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", renderMalla);
