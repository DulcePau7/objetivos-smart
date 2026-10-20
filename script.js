/* ====== DATOS DE LAS LETRAS ====== */
const letras = [
  {
    letra: "S", nombre: "Specific (Específico)",
    texto: "El objetivo debe ser claro, concreto y detallado. Responde: ¿qué quiero lograr?, ¿por qué?, ¿quién participa?, ¿dónde? y ¿cómo? Evita frases generales o ambiguas.",
    tip: "💡 En lugar de “quiero estar sano”, di “quiero hacer ejercicio 3 veces por semana”."
  },
  {
    letra: "M", nombre: "Measurable (Medible)",
    texto: "Debe poder medirse con números, porcentajes, cantidades o indicadores. Así sabrás cuánto avanzaste y cuándo lo lograste.",
    tip: "💡 Pregúntate: ¿cuánto?, ¿cuántos?, ¿cómo sabré que ya lo logré?"
  },
  {
    letra: "A", nombre: "Achievable (Alcanzable)",
    texto: "Debe ser realista según tus recursos, habilidades y tiempo. Debe ser un reto que motive, pero no algo imposible que te frustre.",
    tip: "💡 Si hoy corres 1 km, proponerte un maratón en una semana no es alcanzable."
  },
  {
    letra: "R", nombre: "Relevant (Relevante)",
    texto: "Debe tener sentido e importancia para ti o tu equipo, y estar alineado con tus metas a largo plazo, valores o necesidades.",
    tip: "💡 Pregúntate: ¿vale la pena?, ¿es el momento adecuado?, ¿me acerca a mi meta mayor?"
  },
  {
    letra: "T", nombre: "Time-bound (Temporal)",
    texto: "Debe tener una fecha límite o un periodo definido. El tiempo genera compromiso, urgencia y permite organizar las etapas.",
    tip: "💡 “Algún día” no es una fecha. Usa: “antes del 30 de noviembre” o “en 3 meses”."
  }
];

const tabs = document.getElementById("tabs");
const tabContent = document.getElementById("tabContent");

function mostrarLetra(i) {
  const l = letras[i];
  tabContent.innerHTML = `
    <h3>${l.letra} – ${l.nombre}</h3>
    <p>${l.texto}</p>
    <div class="tip">${l.tip}</div>`;
  document.querySelectorAll(".tab").forEach((b, idx) => b.classList.toggle("active", idx === i));
  tabContent.style.animation = "none";
  void tabContent.offsetWidth;
  tabContent.style.animation = "fade .5s";
}

letras.forEach((l, i) => {
  const btn = document.createElement("button");
  btn.className = "tab";
  btn.textContent = l.letra;
  btn.addEventListener("click", () => mostrarLetra(i));
  tabs.appendChild(btn);
});
mostrarLetra(0);

/* ====== EJEMPLOS (TARJETAS QUE VOLTEAN) ====== */
const ejemplos = [
  {
    mal: "Quiero mejorar mis calificaciones.",
    bien: "Subiré mi promedio de 8.0 a 9.0 este semestre estudiando 1 hora diaria y entregando todas mis tareas, antes del 15 de diciembre."
  },
  {
    mal: "Quiero ahorrar dinero.",
    bien: "Ahorraré $3,000 pesos en 6 meses, guardando $500 cada mes en mi cuenta de ahorro."
  },
  {
    mal: "Quiero hacer ejercicio.",
    bien: "Haré 30 minutos de cardio, 3 veces por semana (lun, mié y vie), durante los próximos 2 meses para mejorar mi condición física."
  }
];

const grid = document.getElementById("ejemplosGrid");
ejemplos.forEach(e => {
  const div = document.createElement("div");
  div.className = "flip";
  div.innerHTML = `
    <div class="flip-inner">
      <div class="flip-front">
        <div class="etiqueta mal">❌ Objetivo vago</div>
        <p>${e.mal}</p>
      </div>
      <div class="flip-back">
        <div class="etiqueta">✅ Objetivo SMART</div>
        <p>${e.bien}</p>
      </div>
    </div>`;
  div.addEventListener("click", () => div.classList.toggle("volteada"));
  grid.appendChild(div);
});

/* ====== GENERADOR ====== */
const form = document.getElementById("smartForm");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const s = document.getElementById("fS").value.trim();
  const m = document.getElementById("fM").value.trim();
  const a = document.getElementById("fA").value.trim();
  const r = document.getElementById("fR").value.trim();
  const t = document.getElementById("fT").value.trim();

  if (!s || !m || !a || !r || !t) {
    resultado.className = "resultado show";
    resultado.innerHTML = "⚠️ Completa los 5 campos para generar tu objetivo SMART.";
    return;
  }
  resultado.className = "resultado show";
  resultado.innerHTML = `
    <h3>🎯 Tu objetivo SMART:</h3>
    <p>Mi objetivo es <b>${s}</b>, ${m}. Lo lograré ${a}. Es importante para mí ${r}. Fecha límite: <b>${t}</b>.</p>`;
});

document.getElementById("limpiar").addEventListener("click", () => {
  form.reset();
  resultado.className = "resultado";
  resultado.innerHTML = "";
});

/* ====== CHECKLIST ====== */
const checks = document.querySelectorAll(".checklist input");
const bar = document.getElementById("bar");
const checkMsg = document.getElementById("checkMsg");

checks.forEach(c => c.addEventListener("change", () => {
  const total = [...checks].filter(x => x.checked).length;
  bar.style.width = (total / checks.length * 100) + "%";
  if (total === 5) checkMsg.textContent = "🎉 ¡Excelente! Tu objetivo es 100% SMART";
  else checkMsg.textContent = `${total} de 5 criterios cumplidos`;
}));

/* ====== QUIZ ====== */
const preguntas = [
  { p: "¿Qué significa la letra M en SMART?", o: ["Motivante", "Medible", "Mental"], c: 1 },
  { p: "¿Cuál es un objetivo con tiempo definido (Time-bound)?", o: ["Quiero leer más", "Leeré 2 libros antes de diciembre", "Algún día leeré mucho"], c: 1 },
  { p: "Un objetivo Alcanzable debe ser…", o: ["Imposible pero emocionante", "Realista según tus recursos", "Igual al de otra persona"], c: 1 },
  { p: "¿Quién propuso el término SMART en 1981?", o: ["George T. Doran", "Steve Jobs", "Peter Pan"], c: 0 }
];

let qi = 0, puntos = 0;
const quizBox = document.getElementById("quizBox");

function mostrarPregunta() {
  if (qi >= preguntas.length) {
    quizBox.innerHTML = `
      <h3>🏆 Resultado final</h3>
      <p class="quiz-info">Obtuviste ${puntos} de ${preguntas.length} respuestas correctas.</p>
      <p>${puntos === preguntas.length ? "¡Perfecto! Eres experta/o en SMART 💖" : "¡Buen intento! Repasa y vuelve a intentarlo 💪"}</p>
      <button class="btn" id="reiniciar">Reintentar</button>`;
    document.getElementById("reiniciar").onclick = () => { qi = 0; puntos = 0; mostrarPregunta(); };
    return;
  }
  const q = preguntas[qi];
  quizBox.innerHTML = `<h3>Pregunta ${qi + 1} de ${preguntas.length}: ${q.p}</h3>`;
  q.o.forEach((txt, i) => {
    const b = document.createElement("button");
    b.className = "opcion";
    b.textContent = txt;
    b.onclick = () => responder(i, b);
    quizBox.appendChild(b);
  });
}

function responder(i, btn) {
  const q = preguntas[qi];
  const botones = quizBox.querySelectorAll(".opcion");
  botones.forEach(b => b.disabled = true);
  if (i === q.c) { btn.classList.add("correcta"); puntos++; }
  else { btn.classList.add("incorrecta"); botones[q.c].classList.add("correcta"); }
  const sig = document.createElement("button");
  sig.className = "btn";
  sig.textContent = qi === preguntas.length - 1 ? "Ver resultado" : "Siguiente ➜";
  sig.onclick = () => { qi++; mostrarPregunta(); };
  quizBox.appendChild(sig);
}
mostrarPregunta();

/* ====== SCROLL: REVEAL + BOTÓN SUBIR ====== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("visible"); });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));