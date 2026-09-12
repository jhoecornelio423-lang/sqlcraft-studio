/**
 * SQLCraft Studio - Practice & Exercises Module
 * Banco de retos, navegación de ejercicios, filtrado, modos y comprobador de respuestas
 */

function renderizarListaEjercicios() {
  const container = document.getElementById("exercise-list-container");
  if (!container || typeof BANCO_EJERCICIOS === "undefined") return;
  container.innerHTML = "";

  const q = window.filtroTexto.toLowerCase().trim();
  let countVisibles = 0;

  // Filtrar banco por sección activa
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === window.seccionActualId);

  // Agrupamiento por módulo
  let moduloActual = "";

  ejerciciosDeSeccion.forEach((ejercicio) => {
    // Filtro por estado
    const isCompleted = window.ejerciciosResueltos.has(ejercicio.id);
    if (window.filtroEstado === "pending" && isCompleted) return;
    if (window.filtroEstado === "completed" && !isCompleted) return;

    // Filtro por nivel de dificultad
    if (window.filtroNivel !== "all" && ejercicio.nivel !== window.filtroNivel) return;

    // Filtro por texto de búsqueda
    if (q) {
      const matchTitulo = ejercicio.titulo.toLowerCase().includes(q);
      const matchModulo = ejercicio.modulo.toLowerCase().includes(q);
      const matchTags = ejercicio.tags.some(t => t.toLowerCase().includes(q));
      const matchDesc = ejercicio.descripcion.toLowerCase().includes(q);
      const matchQuery = ejercicio.queryEsperada.toLowerCase().includes(q);
      if (!matchTitulo && !matchModulo && !matchTags && !matchDesc && !matchQuery) {
        return;
      }
    }

    countVisibles++;

    // Título de módulo si cambia
    if (ejercicio.modulo !== moduloActual) {
      moduloActual = ejercicio.modulo;
      const moduloHeader = document.createElement("div");
      moduloHeader.className = "module-group-title";
      moduloHeader.textContent = moduloActual;
      container.appendChild(moduloHeader);
    }

    const isAssisted = window.ejerciciosAyudados.has(ejercicio.id);

    let icon = "⚪";
    let iconClass = "";
    let statusPillHtml = "";
    let statusCardClass = "";

    if (isCompleted) {
      if (isAssisted) {
        icon = "❌";
        iconClass = "status-assisted";
        statusPillHtml = `<span class="nav-status-pill pill-assisted" title="Completado con ayuda de la solución">❌ Con ayuda</span>`;
        statusCardClass = "completed-assisted";
      } else {
        icon = "✅";
        iconClass = "status-clean";
        statusPillHtml = `<span class="nav-status-pill pill-clean" title="Resuelto limpiamente por tus propios méritos">✅ Resuelto</span>`;
        statusCardClass = "completed-clean";
      }
    } else if (isAssisted) {
      icon = "❌";
      iconClass = "status-assisted";
      statusPillHtml = `<span class="nav-status-pill pill-viewed" title="Solución consultada - Pendiente de resolver">⚠️ Con ayuda</span>`;
      statusCardClass = "completed-assisted";
    } else {
      statusPillHtml = `<span class="nav-status-pill pill-pending">Pendiente</span>`;
    }

    // Índice global dentro de BANCO_EJERCICIOS
    const globalIdx = BANCO_EJERCICIOS.findIndex(e => e.id === ejercicio.id);

    const btn = document.createElement("button");
    btn.className = `exercise-nav-btn ${globalIdx === window.ejercicioActualIndex ? "active" : ""} ${statusCardClass}`;
    btn.id = `nav-ejercicio-${globalIdx}`;
    btn.onclick = () => {
      if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
      cargarEjercicio(globalIdx);
    };

    const badgeClass = `badge-${ejercicio.nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;

    btn.innerHTML = `
      <div class="nav-card-header">
        <span class="nav-status-icon ${iconClass}" id="nav-icon-${ejercicio.id}">${icon}</span>
        <span class="nav-title-text" title="${escapeHtml(ejercicio.titulo)}">${escapeHtml(ejercicio.titulo)}</span>
      </div>
      <div class="nav-card-footer">
        <span class="nav-level-badge ${badgeClass}">${ejercicio.nivel}</span>
        ${statusPillHtml}
      </div>
    `;

    container.appendChild(btn);
  });

  const countBadge = document.getElementById("showing-exercises-count");
  if (countBadge) {
    countBadge.textContent = `Mostrando ${countVisibles} de ${ejerciciosDeSeccion.length} retos`;
  }

  if (countVisibles === 0) {
    container.innerHTML = `
      <div class="sidebar-empty">
        <p>No se encontraron ejercicios con ese criterio.</p>
      </div>
    `;
  }
}

function cargarEjercicio(index) {
  if (typeof BANCO_EJERCICIOS === "undefined" || index < 0 || index >= BANCO_EJERCICIOS.length) return;
  window.ejercicioActualIndex = index;
  const ejercicio = BANCO_EJERCICIOS[index];

  // Si el ejercicio pertenece a otra sección, sincronizar seccionActualId
  if (ejercicio.seccionId && ejercicio.seccionId !== window.seccionActualId) {
    window.seccionActualId = ejercicio.seccionId;
    const tab1 = document.getElementById("tab-section-1");
    const tab2 = document.getElementById("tab-section-2");
    if (tab1) tab1.classList.toggle("active", window.seccionActualId === 1);
    if (tab2) tab2.classList.toggle("active", window.seccionActualId === 2);
  }

  // Si estamos en modo sandbox, cambiar a práctica
  if (window.modoActual === "sandbox") {
    activarModo("practice");
  }

  // Actualizar estado en sidebar
  document.querySelectorAll(".exercise-nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.id === `nav-ejercicio-${index}`);
  });

  // Datos del problema
  const probTitle = document.getElementById("problem-title");
  const probDesc = document.getElementById("problem-desc");
  if (probTitle) probTitle.textContent = ejercicio.titulo;
  if (probDesc) probDesc.innerHTML = ejercicio.descripcion;

  // Indicador de paso en la sección actual
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === window.seccionActualId);
  const posEnSeccion = ejerciciosDeSeccion.findIndex(e => e.id === ejercicio.id);
  const stepText = posEnSeccion !== -1 ? `${posEnSeccion + 1} / ${ejerciciosDeSeccion.length}` : `${index + 1} / ${BANCO_EJERCICIOS.length}`;
  const stepEl = document.getElementById("exercise-step-indicator");
  if (stepEl) stepEl.textContent = stepText;

  // Tags
  const tagsContainer = document.getElementById("problem-tags");
  if (tagsContainer) {
    tagsContainer.innerHTML = "";
    ejercicio.tags.forEach(tag => {
      const pill = document.createElement("span");
      pill.className = "tag-pill";
      pill.textContent = tag;
      tagsContainer.appendChild(pill);
    });
  }

  // Pistas y Solución
  const pistasBody = document.getElementById("pistas-content");
  if (pistasBody) {
    pistasBody.innerHTML = ejercicio.pistas.map((p, i) => `
      <div class="hint-item">
        <strong>Pista ${i + 1}:</strong> ${p}
      </div>
    `).join("");
  }

  actualizarVistaSolucion(ejercicio.id);

  // Cerrar acordeones al cambiar de reto
  const pDetails = document.getElementById("details-pistas");
  const sDetails = document.getElementById("details-solucion");
  if (pDetails) pDetails.removeAttribute("open");
  if (sDetails) sDetails.removeAttribute("open");

  // Código en el editor
  const guardado = typeof window.obtenerCodigoGuardado === "function" ? window.obtenerCodigoGuardado(ejercicio.id) : "";
  const initialCode = guardado || `-- Escribe tu consulta SQL para el reto ${ejercicio.id}:\n`;
  if (window.editorCM) {
    window.editorCM.setValue(initialCode);
    window.editorCM.clearHistory();
    setTimeout(() => window.editorCM.refresh(), 50);
  }

  // Limpiar resultados
  const bannerContainer = document.getElementById("status-banner-container");
  if (bannerContainer) bannerContainer.innerHTML = "";
  if (typeof window.cambiarTab === "function") window.cambiarTab("resultado");
  if (typeof window.limpiarTablaResultados === "function") window.limpiarTablaResultados();
  if (typeof window.actualizarInsigniasFilas === "function") window.actualizarInsigniasFilas(0, 0);
}

function cambiarSeccion(seccionId) {
  window.seccionActualId = Number(seccionId) || 1;
  localStorage.setItem("sqlcraft_active_section", window.seccionActualId);

  // Actualizar pestañas de sección en el sidebar
  const tab1 = document.getElementById("tab-section-1");
  const tab2 = document.getElementById("tab-section-2");
  if (tab1) tab1.classList.toggle("active", window.seccionActualId === 1);
  if (tab2) tab2.classList.toggle("active", window.seccionActualId === 2);

  // Actualizar banner dinámico del sidebar
  const badgeEl = document.getElementById("sidebar-section-badge");
  const titleEl = document.getElementById("sidebar-section-title");
  const metaEl = document.getElementById("sidebar-section-meta");
  if (badgeEl) badgeEl.textContent = `SECCIÓN ${window.seccionActualId}`;
  if (titleEl) {
    titleEl.textContent = window.seccionActualId === 1
      ? "Consultas SELECT, Alias (AS) y Filtrado"
      : "Combinación de Tablas (JOINs) y NULL";
  }
  if (metaEl) {
    metaEl.textContent = window.seccionActualId === 1
      ? "60 Retos • SELECT, AS, WHERE, LIKE, ORDER BY • Examen Certificación"
      : "60 Retos • INNER, OUTER & NULL • Examen Certificación";
  }

  // Actualizar botón de examen en header y tarjeta de examen en sidebar
  const headerExamBtnText = document.getElementById("header-exam-btn-text");
  if (headerExamBtnText) {
    headerExamBtnText.textContent = `Examen Sección ${window.seccionActualId}`;
  }
  const sidebarExamTitle = document.getElementById("sidebar-exam-title");
  if (sidebarExamTitle) {
    sidebarExamTitle.textContent = `Examen de Certificación - Sección ${window.seccionActualId}`;
  }
  const sidebarExamDesc = document.getElementById("sidebar-exam-desc");
  if (sidebarExamDesc) {
    sidebarExamDesc.textContent = window.seccionActualId === 1
      ? "8 preguntas teóricas de precisión y 4 retos prácticos en vivo sobre SELECT, AS y filtrado."
      : "8 preguntas teóricas rigurosas y 4 retos prácticos sobre INNER, LEFT, RIGHT, FULL OUTER y NULL.";
  }

  // Si estamos en modo examen, actualizar el título del editor y recargar examen
  if (window.modoActual === "exam") {
    const titleText = document.getElementById("editor-title-text");
    const examData = typeof window.obtenerExamenActivo === "function" ? window.obtenerExamenActivo() : null;
    if (titleText) titleText.textContent = `Editor SQL (${examData ? examData.titulo : "Examen de Sección"})`;
    if (typeof window.inicializarExamenSeccion === "function") window.inicializarExamenSeccion();
    if (typeof window.cambiarTabExamen === "function") window.cambiarTabExamen("teoria");
  } else {
    if (typeof window.cargarProgresoExamenLocal === "function") window.cargarProgresoExamenLocal();
  }

  // Re-renderizar lista de ejercicios filtrados por esta sección
  renderizarListaEjercicios();

  // Cargar el primer ejercicio de esta sección
  const primerEjIdx = BANCO_EJERCICIOS.findIndex(e => e.seccionId === window.seccionActualId);
  if (primerEjIdx !== -1) {
    cargarEjercicio(primerEjIdx);
  }

  if (typeof window.actualizarEstadisticas === "function") {
    window.actualizarEstadisticas();
  }
}

function navegarEjercicio(offset) {
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === window.seccionActualId);
  const currentPos = ejerciciosDeSeccion.findIndex(e => e.id === BANCO_EJERCICIOS[window.ejercicioActualIndex]?.id);
  if (currentPos !== -1) {
    const nextPos = currentPos + offset;
    if (nextPos >= 0 && nextPos < ejerciciosDeSeccion.length) {
      const globalIdx = BANCO_EJERCICIOS.findIndex(e => e.id === ejerciciosDeSeccion[nextPos].id);
      if (globalIdx !== -1) {
        cargarEjercicio(globalIdx);
      }
    }
  }
}

function actualizarVistaSolucion(id) {
  const ej = BANCO_EJERCICIOS.find(e => e.id === id);
  if (!ej) return;

  const solucionBody = document.getElementById("solucion-content");
  if (!solucionBody) return;

  const esResuelto = window.ejerciciosResueltos.has(id);
  const esAyudado = window.ejerciciosAyudados.has(id);

  let bannerHtml = "";
  if (esResuelto && !esAyudado) {
    bannerHtml = `
      <div class="solution-clean-callout">
        <span class="callout-icon">✅</span>
        <div class="callout-body">
          <strong>¡Completado por tus propios méritos!</strong>
          <p>Ya superaste este reto exitosamente. Aquí tienes la solución oficial de referencia para comparar tu consulta y analizar variantes de sintaxis.</p>
        </div>
      </div>
    `;
  } else if (esAyudado) {
    bannerHtml = `
      <div class="solution-assisted-callout">
        <span class="callout-icon">❌</span>
        <div class="callout-body">
          <strong>Reto con Solución Revelada</strong>
          <p>Este reto quedó registrado como <em>Resuelto con Ayuda</em> en tus estadísticas.</p>
        </div>
      </div>
    `;
  }

  solucionBody.innerHTML = `
    ${bannerHtml}
    <p class="solucion-desc">${ej.explicacion}</p>
    <pre class="code-snippet"><code>${escapeHtml(ej.queryEsperada)}</code></pre>
  `;
}

function activarModo(modo) {
  window.modoActual = modo;
  const btnPractice = document.getElementById("btn-mode-practice");
  const btnExam = document.getElementById("btn-mode-exam");
  const btnSandbox = document.getElementById("btn-mode-sandbox");
  const practiceView = document.getElementById("exercise-content-view");
  const examView = document.getElementById("exam-content-view");
  const sandboxView = document.getElementById("sandbox-content-view");
  const titleText = document.getElementById("editor-title-text");

  if (btnPractice) btnPractice.classList.toggle("active", modo === "practice");
  if (btnExam) btnExam.classList.toggle("active", modo === "exam");
  if (btnSandbox) btnSandbox.classList.toggle("active", modo === "sandbox");

  if (practiceView) practiceView.style.display = modo === "practice" ? "block" : "none";
  if (examView) examView.style.display = modo === "exam" ? "block" : "none";
  if (sandboxView) sandboxView.style.display = modo === "sandbox" ? "block" : "none";

  if (modo === "practice") {
    if (titleText) titleText.textContent = "Editor SQL (Modo Reto)";
    const ej = BANCO_EJERCICIOS[window.ejercicioActualIndex];
    if (ej && window.editorCM) {
      const guardado = typeof window.obtenerCodigoGuardado === "function" ? window.obtenerCodigoGuardado(ej.id) : "";
      window.editorCM.setValue(guardado || `-- Escribe tu consulta SQL para el reto ${ej.id}:\n`);
    }
  } else if (modo === "exam") {
    const examData = typeof window.obtenerExamenActivo === "function" ? window.obtenerExamenActivo() : null;
    if (titleText) titleText.textContent = `Editor SQL (${examData ? examData.titulo : "Examen de Sección"})`;
    if (typeof window.inicializarExamenSeccion === "function") window.inicializarExamenSeccion();
    if (window.examenTabActiva === "practica") {
      if (typeof window.cargarRetoPracticoExamenEnEditor === "function") {
        window.cargarRetoPracticoExamenEnEditor(window.examenRetoPracticoIndex);
      }
    } else {
      if (typeof window.cargarRetoPracticoExamenEnEditor === "function") {
        window.cargarRetoPracticoExamenEnEditor(0);
      }
    }
  } else {
    if (titleText) titleText.textContent = "Editor SQL (Modo Sandbox Libre)";
    const saved = localStorage.getItem("sqlcraft_sandbox_code") || "SELECT * FROM videojuegos LIMIT 10;";
    if (window.editorCM) window.editorCM.setValue(saved);
  }

  if (window.editorCM) {
    setTimeout(() => window.editorCM.refresh(), 50);
  }
}

function ejecutarCodigoUsuario() {
  if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
  const sql = window.editorCM ? window.editorCM.getValue().trim() : "";

  if (!sql) {
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("info", "Escribe una consulta SQL antes de ejecutar.");
    }
    return null;
  }

  if (typeof window.cambiarTab === "function") window.cambiarTab("resultado");
  const res = typeof ejecutarConsulta === "function" ? ejecutarConsulta(sql) : { success: false, error: "BD no disponible" };
  window.ultimoResultadoUsuario = res;

  // Registrar en historial
  if (typeof window.registrarEnHistorial === "function") {
    window.registrarEnHistorial(sql, res.success, res.executionTime, res.rowCount);
  }

  if (!res.success) {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("error");
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("error", `Error de sintaxis: ${res.error}`);
    }
    if (typeof window.renderizarTablaVacia === "function") {
      window.renderizarTablaVacia("Error de ejecución SQL.");
    }
    if (typeof window.actualizarInsigniasFilas === "function") {
      window.actualizarInsigniasFilas(0, null);
    }
    return res;
  }

  // Notificación amigable
  if (res.isDml) {
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("info", `Sentencia DDL/DML ejecutada con éxito (${res.rowsModified || 0} filas modificadas) en ${res.executionTime}ms.`);
    }
  } else {
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("info", `Consulta ejecutada correctamente: ${res.rowCount} fila(s) devueltas en ${res.executionTime}ms.`);
    }
  }

  if (typeof window.renderizarTabla === "function") {
    window.renderizarTabla("user-table-container", res);
  }
  if (typeof window.actualizarInsigniasFilas === "function") {
    window.actualizarInsigniasFilas(res.rowCount, null);
  }
  return res;
}

function comprobarRespuesta() {
  if (window.modoActual === "sandbox") {
    ejecutarCodigoUsuario();
    return;
  }
  if (window.modoActual === "exam") {
    if (typeof window.validarRetoPracticoActivo === "function") {
      window.validarRetoPracticoActivo();
    }
    return;
  }

  const ejercicio = BANCO_EJERCICIOS[window.ejercicioActualIndex];
  const userRes = ejecutarCodigoUsuario();

  if (!userRes || !userRes.success) {
    return;
  }

  // Ejecutar consulta esperada
  const expectedRes = typeof ejecutarConsulta === "function" ? ejecutarConsulta(ejercicio.queryEsperada) : null;
  window.ultimoResultadoEsperado = expectedRes;
  if (typeof window.actualizarInsigniasFilas === "function") {
    window.actualizarInsigniasFilas(userRes.rowCount, expectedRes ? expectedRes.rowCount : 0);
  }

  // Comparar
  const veredicto = typeof compararResultados === "function" ? compararResultados(userRes, expectedRes) : { correcto: false, mensaje: "Error comparando" };

  if (veredicto.correcto) {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("success");
    const fueAyudado = window.ejerciciosAyudados.has(ejercicio.id);

    if (fueAyudado) {
      if (typeof window.mostrarBanner === "function") {
        window.mostrarBanner("warning", `⚠️ ¡Consulta correcta! Has completado el reto, pero quedó registrado como <strong>Resuelto con Ayuda (❌)</strong> debido a que consultaste la respuesta oficial.`);
      }
    } else {
      if (typeof window.mostrarBanner === "function") {
        window.mostrarBanner("success", veredicto.mensaje + ` 🌟 ¡Excelente! Resuelto 100% por tus propios méritos (✅).`);
      }
      if (typeof window.lanzarConfeti === "function") window.lanzarConfeti();
    }

    window.ejerciciosResueltos.add(ejercicio.id);
    if (typeof window.guardarProgreso === "function") window.guardarProgreso();
    if (typeof window.actualizarEstadisticas === "function") window.actualizarEstadisticas();
    renderizarListaEjercicios();
    actualizarVistaSolucion(ejercicio.id);
  } else {
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("error");
    if (typeof window.mostrarBanner === "function") {
      window.mostrarBanner("error", veredicto.mensaje);
    }
  }
}

// Exportar globalmente
window.renderizarListaEjercicios = renderizarListaEjercicios;
window.cargarEjercicio = cargarEjercicio;
window.cambiarSeccion = cambiarSeccion;
window.navegarEjercicio = navegarEjercicio;
window.actualizarVistaSolucion = actualizarVistaSolucion;
window.activarModo = activarModo;
window.ejecutarCodigoUsuario = ejecutarCodigoUsuario;
window.comprobarRespuesta = comprobarRespuesta;
