/**
 * SQLCraft Studio - Exam Engine Module
 * Evaluación de certificación teórico-práctica para todas las secciones
 */

function obtenerExamenActivo() {
  if (typeof window !== "undefined" && typeof window.generarInstanciaExamen === "function") {
    const inst = window.generarInstanciaExamen(window.seccionActualId);
    if (inst) return inst;
  }
  if (typeof window !== "undefined" && window.EXAMENES_CATALOGO && window.EXAMENES_CATALOGO[window.seccionActualId]) {
    return window.EXAMENES_CATALOGO[window.seccionActualId];
  }
  if (typeof window !== "undefined" && window.EXAMEN_SECCION_2 && window.seccionActualId === 2) {
    return window.EXAMEN_SECCION_2;
  }
  if (typeof window !== "undefined" && window.EXAMEN_SECCION_1) {
    return window.EXAMEN_SECCION_1;
  }
  return null;
}

function guardarProgresoExamenLocal() {
  try {
    localStorage.setItem(`sqlcraft_exam_s${window.seccionActualId}_theory`, JSON.stringify(window.examenRespuestasTeoria));
    localStorage.setItem(`sqlcraft_exam_s${window.seccionActualId}_practical`, JSON.stringify([...window.examenRetosResueltos]));
    localStorage.setItem(`sqlcraft_exam_s${window.seccionActualId}_codes`, JSON.stringify(window.examenCodigosPracticos));
    localStorage.setItem(`sqlcraft_exam_s${window.seccionActualId}_graded`, JSON.stringify(window.examenCalificado));
  } catch (e) {}
}

function cargarProgresoExamenLocal() {
  try {
    window.examenRespuestasTeoria = {};
    window.examenRetosResueltos = new Set();
    window.examenCodigosPracticos = {};
    window.examenCalificado = false;

    const th = localStorage.getItem(`sqlcraft_exam_s${window.seccionActualId}_theory`);
    if (th) window.examenRespuestasTeoria = JSON.parse(th);
    const pr = localStorage.getItem(`sqlcraft_exam_s${window.seccionActualId}_practical`);
    if (pr) window.examenRetosResueltos = new Set(JSON.parse(pr));
    const cd = localStorage.getItem(`sqlcraft_exam_s${window.seccionActualId}_codes`);
    if (cd) window.examenCodigosPracticos = JSON.parse(cd);
    const gr = localStorage.getItem(`sqlcraft_exam_s${window.seccionActualId}_graded`);
    if (gr !== null) window.examenCalificado = JSON.parse(gr);
  } catch (e) {}
}

function inicializarExamenSeccion() {
  cargarProgresoExamenLocal();

  const examData = obtenerExamenActivo();
  const titleEl = document.getElementById("exam-title-display");
  if (titleEl && examData) {
    titleEl.textContent = examData.titulo;
  }
  const descEl = document.getElementById("exam-desc-display");
  if (descEl && examData) {
    descEl.innerHTML = examData.descripcion;
  }

  renderizarExamenTeoria();
  renderizarExamenPractica();
  actualizarPuntajeEnVivoExamen();

  const btnRes = document.getElementById("btn-exam-tab-resultado");
  if (btnRes) {
    btnRes.style.display = window.examenCalificado ? "inline-flex" : "none";
  }

  if (window.examenCalificado) {
    renderizarExamenResultados();
  }
}

function cambiarTabExamen(tab) {
  window.examenTabActiva = tab;
  const btnTeoria = document.getElementById("btn-exam-tab-teoria");
  const btnPractica = document.getElementById("btn-exam-tab-practica");
  const btnResultado = document.getElementById("btn-exam-tab-resultado");
  const panTeoria = document.getElementById("exam-teoria-container");
  const panPractica = document.getElementById("exam-practica-container");
  const panResultado = document.getElementById("exam-resultado-container");
  const btnPrev = document.getElementById("btn-exam-prev-step");
  const btnNext = document.getElementById("btn-exam-next-step");

  if (btnTeoria) btnTeoria.classList.toggle("active", tab === "teoria");
  if (btnPractica) btnPractica.classList.toggle("active", tab === "practica");
  if (btnResultado) btnResultado.classList.toggle("active", tab === "resultado");

  if (panTeoria) panTeoria.style.display = tab === "teoria" ? "block" : "none";
  if (panPractica) panPractica.style.display = tab === "practica" ? "block" : "none";
  if (panResultado) panResultado.style.display = tab === "resultado" ? "block" : "none";

  if (tab === "teoria") {
    if (btnPrev) btnPrev.style.display = "none";
    if (btnNext) {
      btnNext.style.display = "inline-flex";
      btnNext.innerHTML = "Ir a Retos Prácticos ▶";
      btnNext.onclick = () => cambiarTabExamen("practica");
    }
  } else if (tab === "practica") {
    if (btnPrev) {
      btnPrev.style.display = "inline-flex";
      btnPrev.innerHTML = "◀ Volver a Teoría";
      btnPrev.onclick = () => cambiarTabExamen("teoria");
    }
    if (btnNext) {
      if (window.examenCalificado) {
        btnNext.style.display = "inline-flex";
        btnNext.innerHTML = "Ver Calificación ▶";
        btnNext.onclick = () => cambiarTabExamen("resultado");
      } else {
        btnNext.style.display = "none";
      }
    }
    cargarRetoPracticoExamenEnEditor(window.examenRetoPracticoIndex);
  } else if (tab === "resultado") {
    if (btnPrev) {
      btnPrev.style.display = "inline-flex";
      btnPrev.innerHTML = "◀ Volver a Práctica";
      btnPrev.onclick = () => cambiarTabExamen("practica");
    }
    if (btnNext) btnNext.style.display = "none";
  }
}

function renderizarExamenTeoria() {
  const container = document.getElementById("exam-teoria-container");
  const examData = obtenerExamenActivo();
  if (!container || !examData || !examData.preguntasTeoricas) return;

  let html = "";

  examData.preguntasTeoricas.forEach((q, idx) => {
    const respondida = window.examenRespuestasTeoria[q.id];
    const cardStatusClass = window.examenCalificado
      ? (respondida === q.correcta ? "exam-card-correct" : "exam-card-incorrect")
      : "";

    html += `
      <div class="exam-question-card ${cardStatusClass}" id="exam-q-card-${q.id}">
        <div class="exam-q-header">
          <span class="exam-q-index">Pregunta ${idx + 1} de ${examData.preguntasTeoricas.length} (${q.puntos} pts)</span>
        </div>
        <h4 class="exam-q-title">${escapeHtml(q.titulo)}</h4>
        <p class="exam-q-text">${escapeHtml(q.pregunta)}</p>
        <div class="exam-options-list">
    `;

    q.opciones.forEach(opt => {
      let optClass = "exam-option-item";
      const isSelected = respondida === opt.id;
      if (isSelected) optClass += " selected";

      if (window.examenCalificado) {
        if (opt.id === q.correcta) {
          optClass += " option-correct";
        } else if (isSelected && opt.id !== q.correcta) {
          optClass += " option-incorrect";
        }
      }

      html += `
        <div class="${optClass}" onclick="seleccionarOpcionTeorica('${q.id}', '${opt.id}')">
          <span class="exam-option-radio"></span>
          <span class="exam-option-text"><strong>${opt.id})</strong> ${escapeHtml(opt.texto)}</span>
        </div>
      `;
    });

    html += `</div>`;

    if (window.examenCalificado) {
      const esAcierto = respondida === q.correcta;
      html += `
        <div class="exam-explanation-callout ${esAcierto ? 'exp-correct' : 'exp-incorrect'}">
          <strong>${esAcierto ? 'Justificación Técnica:' : 'Explicación y Corrección:'}</strong>
          <p>${escapeHtml(q.explicacion)}</p>
        </div>
      `;
    }

    html += `</div>`;
  });

  container.innerHTML = html;
}

function seleccionarOpcionTeorica(preguntaId, opcionId) {
  if (window.examenCalificado) {
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("info", "El examen ya ha sido calificado. Puedes revisar las justificaciones técnicas o reiniciar para un nuevo intento.");
    }
    return;
  }
  if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
  window.examenRespuestasTeoria[preguntaId] = opcionId;
  guardarProgresoExamenLocal();
  actualizarPuntajeEnVivoExamen();
  renderizarExamenTeoria();
}

function renderizarExamenPractica() {
  const selectorContainer = document.getElementById("exam-practical-selector");
  const detailContainer = document.getElementById("exam-practical-detail");
  const examData = obtenerExamenActivo();
  if (!selectorContainer || !detailContainer || !examData || !examData.desafiosPracticos) return;

  const retos = examData.desafiosPracticos;

  let selectorHtml = "";
  retos.forEach((reto, idx) => {
    const isCompleted = window.examenRetosResueltos.has(reto.id);
    const isActive = idx === window.examenRetoPracticoIndex;
    const chipClass = `practical-tab-chip ${isActive ? 'active' : ''} ${isCompleted ? 'passed' : ''}`;
    const statusTag = isCompleted
      ? `<span class="chip-status-tag passed">Validado</span>`
      : `<span class="chip-status-tag">${reto.puntos} pts</span>`;

    selectorHtml += `
      <button class="${chipClass}" onclick="seleccionarRetoPracticoExamen(${idx})" type="button">
        <span class="chip-title">Reto ${idx + 1}</span>
        ${statusTag}
      </button>
    `;
  });
  selectorContainer.innerHTML = selectorHtml;

  const retoActivo = retos[window.examenRetoPracticoIndex];
  if (!retoActivo) return;

  const estaResuelto = window.examenRetosResueltos.has(retoActivo.id);
  const tituloLimpio = retoActivo.titulo.replace(/^Reto Práctico \d+:\s*/i, "");

  let detailHtml = `
    <div class="practical-detail-card">
      <div class="practical-header-clean">
        <div class="practical-meta-row">
          <span class="practical-badge-neutral">Reto Práctico ${window.examenRetoPracticoIndex + 1} de ${retos.length}</span>
          <span class="practical-badge-points">${retoActivo.puntos} puntos</span>
          <span class="practical-badge-status ${estaResuelto ? 'status-ok' : 'status-pending'}">
            ${estaResuelto ? 'Validado con éxito' : 'Pendiente de validación'}
          </span>
        </div>
        <h3 class="practical-challenge-title">${escapeHtml(tituloLimpio)}</h3>
      </div>
      <div class="practical-challenge-desc">
        ${retoActivo.descripcion}
      </div>
      <div class="practical-eval-box">
        <div class="practical-eval-box-header">Pautas de Evaluación Técnica</div>
        <p class="practical-eval-box-desc">
          Escribe la sentencia SQL solicitada en el editor. Usa <kbd>Ctrl</kbd> + <kbd>Enter</kbd> para probar la consulta o <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd> para validar la solución oficial contra el evaluador.
        </p>
      </div>
    </div>
  `;

  detailContainer.innerHTML = detailHtml;
}

function seleccionarRetoPracticoExamen(idx) {
  const examData = obtenerExamenActivo();
  if (!examData || !examData.desafiosPracticos) return;
  const retos = examData.desafiosPracticos;
  if (idx < 0 || idx >= retos.length) return;

  if (window.editorCM && retos[window.examenRetoPracticoIndex]) {
    window.examenCodigosPracticos[retos[window.examenRetoPracticoIndex].id] = window.editorCM.getValue();
    guardarProgresoExamenLocal();
  }

  window.examenRetoPracticoIndex = idx;
  renderizarExamenPractica();
  cargarRetoPracticoExamenEnEditor(idx);
}

function cargarRetoPracticoExamenEnEditor(idx) {
  const examData = obtenerExamenActivo();
  if (!window.editorCM || !examData || !examData.desafiosPracticos) return;
  const retos = examData.desafiosPracticos;
  const reto = retos[idx];
  if (!reto) return;

  const codigoGuardado = window.examenCodigosPracticos[reto.id];
  const plantilla = codigoGuardado || `-- ${examData.titulo} - Reto Práctico ${idx + 1}: ${reto.titulo}\n-- Escribe tu consulta SQL a continuación:\n`;

  window.editorCM.setValue(plantilla);
  setTimeout(() => window.editorCM.refresh(), 50);
}

function validarRetoPracticoActivo() {
  const examData = obtenerExamenActivo();
  if (!examData || !examData.desafiosPracticos) return;
  const retos = examData.desafiosPracticos;
  const reto = retos[window.examenRetoPracticoIndex];
  if (!reto) return;

  const userRes = typeof window.ejecutarCodigoUsuario === "function" ? window.ejecutarCodigoUsuario() : null;
  if (!userRes || !userRes.success) return;

  const expRes = typeof ejecutarConsulta === "function" ? ejecutarConsulta(reto.queryEsperada) : null;
  window.ultimoResultadoEsperado = expRes;
  if (typeof window.actualizarInsigniasFilas === "function") {
    window.actualizarInsigniasFilas(userRes.rowCount, expRes ? expRes.rowCount : 0);
  }

  const veredicto = typeof compararResultados === "function" ? compararResultados(userRes, expRes) : { correcto: false, mensaje: "Error comparando" };

  if (veredicto.correcto) {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("success");
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("success", `🌟 ¡Excelente! Reto práctico ${window.examenRetoPracticoIndex + 1} validado exitosamente (+15 pts).`);
    }
    if (typeof window.lanzarConfeti === "function") window.lanzarConfeti();

    window.examenRetosResueltos.add(reto.id);
    if (window.editorCM) window.examenCodigosPracticos[reto.id] = window.editorCM.getValue();
    guardarProgresoExamenLocal();
    actualizarPuntajeEnVivoExamen();
    renderizarExamenPractica();
  } else {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("error");
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("error", `❌ El resultado no coincide con la especificación del examen: ${veredicto.mensaje}`);
    }
  }
}

function actualizarPuntajeEnVivoExamen() {
  const pill = document.getElementById("exam-live-score-pill");
  const examData = obtenerExamenActivo();
  if (!pill || !examData) return;

  if (window.examenCalificado) {
    let puntosTeoria = 0;
    examData.preguntasTeoricas.forEach(q => {
      if (window.examenRespuestasTeoria[q.id] === q.correcta) puntosTeoria += q.puntos;
    });
    let puntosPractica = 0;
    examData.desafiosPracticos.forEach(r => {
      if (window.examenRetosResueltos.has(r.id)) puntosPractica += r.puntos;
    });
    const totalPuntos = puntosTeoria + puntosPractica;
    const aprobado = totalPuntos >= 70;
    pill.textContent = `Calificación: ${totalPuntos} / 100 pts (${aprobado ? 'APROBADO ✅' : 'NO APROBADO ❌'})`;
    pill.className = `exam-score-pill ${aprobado ? 'passed' : 'failed'}`;
  } else {
    const numTeoria = Object.keys(window.examenRespuestasTeoria).length;
    const numPractica = window.examenRetosResueltos.size;
    const totalTeoria = examData.preguntasTeoricas ? examData.preguntasTeoricas.length : 8;
    const totalPractica = examData.desafiosPracticos ? examData.desafiosPracticos.length : 4;
    pill.textContent = `Avance: ${numTeoria}/${totalTeoria} Teoría • ${numPractica}/${totalPractica} Práctica`;
    pill.className = "exam-score-pill in-progress";
  }
}

async function calificarExamenSeccion() {
  const examData = obtenerExamenActivo();
  if (!examData) return;

  const respondidasTeoria = Object.keys(window.examenRespuestasTeoria).length;
  const totalTeoria = examData.preguntasTeoricas ? examData.preguntasTeoricas.length : 8;
  const resueltosPractica = window.examenRetosResueltos.size;
  const totalPractica = examData.desafiosPracticos ? examData.desafiosPracticos.length : 4;

  const faltanTeoria = totalTeoria - respondidasTeoria;
  const faltanPractica = totalPractica - resueltosPractica;

  if (faltanTeoria > 0 || faltanPractica > 0) {
    let msg = "<p>Aún tienes componentes pendientes en este examen:</p><ul class='confirm-pending-list'>";
    if (faltanTeoria > 0) msg += `<li><strong>${faltanTeoria}</strong> pregunta(s) teórica(s) sin responder.</li>`;
    if (faltanPractica > 0) msg += `<li><strong>${faltanPractica}</strong> reto(s) práctico(s) sin validar.</li>`;
    msg += "</ul><p>¿Deseas finalizar y calificar ahora mismo? Las partes incompletas recibirán 0 puntos.</p>";

    const confirmado = typeof window.mostrarConfirmacion === "function"
      ? await window.mostrarConfirmacion({
          titulo: "¿Finalizar con retos pendientes?",
          mensaje: msg,
          badge: "Evaluación Incompleta",
          tipo: "warning",
          textoConfirmar: "Calificar de todos modos",
          textoCancelar: "Continuar Examen"
        })
      : confirm("Aún tienes componentes pendientes en el examen. ¿Deseas finalizar y calificar ahora mismo?");

    if (!confirmado) {
      return;
    }
  }

  let puntosTeoria = 0;
  let aciertosTeoria = 0;
  examData.preguntasTeoricas.forEach(q => {
    if (window.examenRespuestasTeoria[q.id] === q.correcta) {
      puntosTeoria += q.puntos;
      aciertosTeoria++;
    }
  });

  let puntosPractica = 0;
  examData.desafiosPracticos.forEach(r => {
    if (window.examenRetosResueltos.has(r.id)) {
      puntosPractica += r.puntos;
    }
  });

  const puntajeTotal = puntosTeoria + puntosPractica;
  const aprobado = puntajeTotal >= 70;

  window.examenCalificado = true;
  guardarProgresoExamenLocal();

  const btnResTab = document.getElementById("btn-exam-tab-resultado");
  if (btnResTab) btnResTab.style.display = "inline-flex";

  renderizarExamenTeoria();
  renderizarExamenPractica();
  renderizarExamenResultados();
  actualizarPuntajeEnVivoExamen();
  cambiarTabExamen("resultado");

  if (aprobado) {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("success");
    if (typeof window.lanzarConfeti === "function") window.lanzarConfeti();
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("success", `🏆 ¡Felicidades! Has APROBADO el ${examData.titulo} con ${puntajeTotal}/100 puntos.`);
    }
  } else {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("error");
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("error", `⚠️ Has obtenido ${puntajeTotal}/100 puntos. Se requiere mínimo 70 puntos para certificar. ¡Revisa las justificaciones técnicas e inténtalo de nuevo!`);
    }
  }
}

function renderizarExamenResultados() {
  const container = document.getElementById("exam-resultado-container");
  const examData = obtenerExamenActivo();
  if (!container || !examData) return;

  let puntosTeoria = 0;
  let aciertosTeoria = 0;
  examData.preguntasTeoricas.forEach(q => {
    if (window.examenRespuestasTeoria[q.id] === q.correcta) {
      puntosTeoria += q.puntos;
      aciertosTeoria++;
    }
  });

  let puntosPractica = 0;
  let aciertosPractica = 0;
  examData.desafiosPracticos.forEach(r => {
    if (window.examenRetosResueltos.has(r.id)) {
      puntosPractica += r.puntos;
      aciertosPractica++;
    }
  });

  const puntajeTotal = puntosTeoria + puntosPractica;
  const aprobado = puntajeTotal >= 70;

  const feedbackAprobado = window.seccionActualId === 1
    ? "¡Excelente dominio conceptual y técnico! Has demostrado una comprensión sólida del estándar ANSI SQL, precedencia lógica de operadores, filtrado avanzado, ordenamiento y expresiones condicionales CASE."
    : "¡Extraordinario dominio de JOINs y lógica relacional! Comprendes a la perfección la semántica entre ON y WHERE, relaciones muchos a muchos, preservación de registros en OUTER JOINs y manejo riguroso de valores NULL.";

  const feedbackReprobado = "Estás muy cerca de dominar todos los conceptos. Revisa las justificaciones teóricas en la pestaña de Teoría y asegúrate de validar todos los retos prácticos antes de volver a presentar el examen.";

  let html = `
    <div class="exam-results-card ${aprobado ? 'result-passed' : 'result-failed'}">
      <div class="results-badge-icon">${aprobado ? '🏆' : '📚'}</div>
      <h2 class="results-status-title">${aprobado ? '¡Certificación Aprobada!' : 'Evaluación Finalizada (Pendiente de Aprobación)'}</h2>
      <div class="results-score-display">${puntajeTotal} <span class="score-max">/ 100 pts</span></div>
      <p class="results-feedback-message">
        ${aprobado ? feedbackAprobado : feedbackReprobado}
      </p>

      <div class="results-breakdown-grid">
        <div class="breakdown-stat-box">
          <span class="stat-box-title">🧠 Evaluación Teórica</span>
          <span class="stat-box-value">${puntosTeoria} / 40 pts</span>
          <span class="stat-box-sub">${aciertosTeoria} de ${examData.preguntasTeoricas.length} preguntas correctas</span>
        </div>
        <div class="breakdown-stat-box">
          <span class="stat-box-title">💻 Retos Prácticos</span>
          <span class="stat-box-value">${puntosPractica} / 60 pts</span>
          <span class="stat-box-sub">${aciertosPractica} de ${examData.desafiosPracticos.length} retos validados</span>
        </div>
        <div class="breakdown-stat-box">
          <span class="stat-box-title">🎯 Criterio de Aprobación</span>
          <span class="stat-box-value">70%</span>
          <span class="stat-box-sub">${aprobado ? 'Superado con éxito' : 'No alcanzado (Mínimo 70 pts)'}</span>
        </div>
      </div>

      <div class="results-actions-row">
        <button class="btn btn-secondary" onclick="cambiarTabExamen('teoria')">
          🔍 Ver Justificaciones Teóricas
        </button>
        <button class="btn btn-secondary" onclick="cambiarTabExamen('practica')">
          💻 Ver Consultas Prácticas
        </button>
        <button class="btn btn-warning" onclick="reiniciarExamenSeccion(true)">
          🔄 Reintentar Examen desde Cero
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

async function reiniciarExamenSeccion(confirmar = true) {
  if (confirmar) {
    const confirmado = typeof window.mostrarConfirmacion === "function"
      ? await window.mostrarConfirmacion({
          titulo: "¿Reiniciar este examen?",
          mensaje: "Se seleccionará un <strong>nuevo conjunto aleatorio</strong> de preguntas conceptuales y retos del banco maestro, y se borrarán las respuestas anteriores de esta sección.",
          badge: "Nuevo Intento",
          tipo: "warning",
          textoConfirmar: "Reiniciar Examen",
          textoCancelar: "Cancelar"
        })
      : confirm("¿Deseas reiniciar este examen? Se seleccionará un nuevo conjunto aleatorio de preguntas y retos del banco, y se borrarán las respuestas anteriores.");

    if (!confirmado) {
      return;
    }
  }

  // Si existe motor de muestreo, forzar un nuevo sorteo fresco
  if (typeof window.generarInstanciaExamen === "function") {
    window.generarInstanciaExamen(window.seccionActualId, true);
  }

  window.examenRespuestasTeoria = {};
  window.examenRetosResueltos = new Set();
  window.examenCodigosPracticos = {};
  window.examenCalificado = false;
  window.examenRetoPracticoIndex = 0;
  guardarProgresoExamenLocal();

  const btnResTab = document.getElementById("btn-exam-tab-resultado");
  if (btnResTab) btnResTab.style.display = "none";

  inicializarExamenSeccion();
  cambiarTabExamen("teoria");

  if (typeof window.mostrarBanner === "function") {
    window.mostrarBanner("info", "Examen reiniciado. Se ha seleccionado un nuevo conjunto aleatorio de preguntas y retos.");
  }
}

// Exportar globalmente
window.obtenerExamenActivo = obtenerExamenActivo;
window.guardarProgresoExamenLocal = guardarProgresoExamenLocal;
window.cargarProgresoExamenLocal = cargarProgresoExamenLocal;
window.inicializarExamenSeccion = inicializarExamenSeccion;
window.cambiarTabExamen = cambiarTabExamen;
window.renderizarExamenTeoria = renderizarExamenTeoria;
window.seleccionarOpcionTeorica = seleccionarOpcionTeorica;
window.renderizarExamenPractica = renderizarExamenPractica;
window.seleccionarRetoPracticoExamen = seleccionarRetoPracticoExamen;
window.cargarRetoPracticoExamenEnEditor = cargarRetoPracticoExamenEnEditor;
window.validarRetoPracticoActivo = validarRetoPracticoActivo;
window.actualizarPuntajeEnVivoExamen = actualizarPuntajeEnVivoExamen;
window.calificarExamenSeccion = calificarExamenSeccion;
window.renderizarExamenResultados = renderizarExamenResultados;
window.reiniciarExamenSeccion = reiniciarExamenSeccion;
