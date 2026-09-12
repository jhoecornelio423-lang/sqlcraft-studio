/**
 * SQLCraft Studio - Plataforma Interactiva de Práctica SQL
 * Motor de UI, Editor CodeMirror, Evaluador Inteligente y Utilidades
 */

// Estado global de la aplicación
let seccionActualId = 1; // 1: Consultas SELECT y Filtrado | 2: Combinación de Tablas (JOINs)
let ejercicioActualIndex = 0;
let ejerciciosResueltos = new Set();
let ejerciciosAyudados = new Set(); // Retos donde se consultó la solución oficial
let tabActiva = "resultado"; // 'resultado', 'esperado', 'comparar', 'esquema', 'historial'
let modoActual = "practice"; // 'practice' | 'exam' | 'sandbox'
let filtroEstado = "all"; // 'all' | 'pending' | 'completed'
let filtroNivel = "all"; // 'all' | 'Básico' | 'Intermedio' | 'Avanzado'
let filtroTexto = "";
let editorCM = null;
let historialConsultas = [];

// Estado del Examen de Sección
let examenRespuestasTeoria = {};
let examenRetosResueltos = new Set();
let examenTabActiva = "teoria";
let examenRetoPracticoIndex = 0;
let examenCalificado = false;
let examenCodigosPracticos = {};
let sonidoHabilitado = true;
let ultimoResultadoUsuario = null;
let ultimoResultadoEsperado = null;
let editorFontSize = 14;

// Inicialización de AudioContext para efectos sonoros sintetizados
let audioCtx = null;
function reproducirSonido(tipo) {
  if (!sonidoHabilitado) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (tipo === "success") {
      // Fanfarria arpegiada agradable
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (tipo === "error") {
      // Sonido bajo de error
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (tipo === "click") {
      // Click sutil
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Silencioso en caso de bloqueo de políticas de audio
  }
}

// Persistencia en LocalStorage
function cargarConfiguraciones() {
  try {
    const savedSection = localStorage.getItem("sqlcraft_active_section");
    if (savedSection) seccionActualId = parseInt(savedSection, 10) || 1;

    const resueltos = localStorage.getItem("sqlcraft_resueltos");
    if (resueltos) ejerciciosResueltos = new Set(JSON.parse(resueltos));

    const ayudados = localStorage.getItem("sqlcraft_ayudados");
    if (ayudados) ejerciciosAyudados = new Set(JSON.parse(ayudados));

    const soundPref = localStorage.getItem("sqlcraft_sound");
    if (soundPref !== null) sonidoHabilitado = soundPref === "true";

    const savedSize = localStorage.getItem("sqlcraft_fontsize");
    if (savedSize) editorFontSize = parseInt(savedSize, 10) || 14;

    // Restaurar dimensiones personalizadas de paneles
    const savedSidebarW = localStorage.getItem("sqlcraft_sidebar_w");
    if (savedSidebarW) {
      const sb = document.getElementById("app-sidebar");
      if (sb) sb.style.width = `${savedSidebarW}px`;
    }
    const savedProblemW = localStorage.getItem("sqlcraft_problem_w");
    if (savedProblemW) {
      const pp = document.getElementById("problem-panel");
      if (pp) {
        pp.style.flex = "none";
        pp.style.width = `${savedProblemW}px`;
      }
    }
    const savedBottomH = localStorage.getItem("sqlcraft_bottom_h");
    if (savedBottomH) {
      const bw = document.getElementById("bottom-workspace");
      if (bw) bw.style.height = `${savedBottomH}px`;
    }
  } catch (e) {
    console.warn("No se pudo leer localStorage:", e);
  }
}

function guardarProgreso() {
  try {
    localStorage.setItem("sqlcraft_resueltos", JSON.stringify([...ejerciciosResueltos]));
    localStorage.setItem("sqlcraft_ayudados", JSON.stringify([...ejerciciosAyudados]));
  } catch (e) {}

  if (typeof window.sincronizarProgresoConNube === "function") {
    window.sincronizarProgresoConNube();
  }
}

function guardarCodigoEjercicio(id, codigo) {
  try {
    localStorage.setItem(`sqlcraft_code_${id}`, codigo);
  } catch (e) {}

  if (typeof window.sincronizarProgresoConNube === "function") {
    window.sincronizarProgresoConNube();
  }
}

function obtenerCodigoGuardado(id) {
  try {
    return localStorage.getItem(`sqlcraft_code_${id}`) || "";
  } catch (e) {
    return "";
  }
}

// Inicialización de la Aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", async () => {
  cargarConfiguraciones();
  actualizarBotonSonido();

  // Inicializar Autenticación y Sincronización con Supabase
  if (typeof window.inicializarSupabaseAuth === "function") {
    window.inicializarSupabaseAuth();
  }

  // Inicializar CodeMirror 5
  inicializarEditorCodeMirror();

  // Inicializar Motor SQLite WASM
  const statusDbEl = document.getElementById("db-status-badge");
  statusDbEl.textContent = "⏳ Cargando SQLite WASM...";
  
  const dbInitResult = await inicializarBaseDeDatos();
  if (dbInitResult.success) {
    statusDbEl.textContent = "🟢 SQLite Ready (3 Tablas)";
    statusDbEl.classList.add("ready");
  } else {
    statusDbEl.textContent = "❌ Error en SQLite";
    mostrarBanner("error", `Error al inicializar SQLite: ${dbInitResult.error}`);
  }

  // Inicializar componentes y sección activa
  configurarEventosUI();
  inicializarPanelesRedimensionables();
  renderizarVisorEsquema();
  cambiarSeccion(seccionActualId);
});

// Configuración del Editor Profesional CodeMirror 5
function inicializarEditorCodeMirror() {
  const textarea = document.getElementById("sql-editor");
  if (!textarea) return;

  // Extraer nombres de tablas y columnas para autocompletado
  const schemaInfo = obtenerInfoEsquema();
  const tablesObj = {};
  schemaInfo.forEach(t => {
    tablesObj[t.nombre] = t.columnas.map(c => c.nombre);
  });

  editorCM = CodeMirror.fromTextArea(textarea, {
    mode: "text/x-sql",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    hintOptions: {
      tables: tablesObj,
      completeSingle: false
    },
    extraKeys: {
      "Ctrl-Enter": () => ejecutarCodigoUsuario(),
      "Ctrl-Shift-Enter": () => comprobarRespuesta(),
      "Ctrl-Space": "autocomplete",
      "Ctrl-Alt-F": () => formatearCodigoSQL(),
      "Alt-Right": () => navegarEjercicio(1),
      "Alt-Left": () => navegarEjercicio(-1)
    }
  });

  // Ajustar tamaño de fuente inicial
  aplicarTamanoFuente(editorFontSize);

  // Guardar en tiempo real
  editorCM.on("change", () => {
    if (modoActual === "practice") {
      const ejercicio = BANCO_EJERCICIOS[ejercicioActualIndex];
      guardarCodigoEjercicio(ejercicio.id, editorCM.getValue());
    } else if (modoActual === "exam") {
      const examData = obtenerExamenActivo();
      if (examData && examData.desafiosPracticos && examData.desafiosPracticos[examenRetoPracticoIndex]) {
        const reto = examData.desafiosPracticos[examenRetoPracticoIndex];
        examenCodigosPracticos[reto.id] = editorCM.getValue();
        guardarProgresoExamenLocal();
      }
    } else {
      localStorage.setItem("sqlcraft_sandbox_code", editorCM.getValue());
    }
  });

  // Autocompletado inteligente mientras escribe palabras clave
  editorCM.on("inputRead", (cm, change) => {
    if (change.text[0] && change.text[0].match(/[a-zA-Z_]/)) {
      if (!cm.state.completionActive) {
        CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
      }
    }
  });
}

function aplicarTamanoFuente(size) {
  editorFontSize = Math.min(Math.max(size, 11), 22);
  const wrapper = document.querySelector(".CodeMirror");
  if (wrapper) {
    wrapper.style.fontSize = `${editorFontSize}px`;
  }
  localStorage.setItem("sqlcraft_fontsize", editorFontSize);
}

// Renderizar la lista de ejercicios en la Sidebar con filtros
function renderizarListaEjercicios() {
  const container = document.getElementById("exercise-list-container");
  container.innerHTML = "";

  const q = filtroTexto.toLowerCase().trim();
  let countVisibles = 0;

  // Filtrar banco por sección activa
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === seccionActualId);

  // Agrupamiento por módulo
  let moduloActual = "";

  ejerciciosDeSeccion.forEach((ejercicio) => {
    // Filtro por estado
    const isCompleted = ejerciciosResueltos.has(ejercicio.id);
    if (filtroEstado === "pending" && isCompleted) return;
    if (filtroEstado === "completed" && !isCompleted) return;

    // Filtro por nivel de dificultad
    if (filtroNivel !== "all" && ejercicio.nivel !== filtroNivel) return;

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

    const isAssisted = ejerciciosAyudados.has(ejercicio.id);

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
    btn.className = `exercise-nav-btn ${globalIdx === ejercicioActualIndex ? "active" : ""} ${statusCardClass}`;
    btn.id = `nav-ejercicio-${globalIdx}`;
    btn.onclick = () => {
      reproducirSonido("click");
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

// Cargar un ejercicio en el panel de trabajo
function cargarEjercicio(index) {
  if (index < 0 || index >= BANCO_EJERCICIOS.length) return;
  ejercicioActualIndex = index;
  const ejercicio = BANCO_EJERCICIOS[index];

  // Si el ejercicio pertenece a otra sección, sincronizar seccionActualId
  if (ejercicio.seccionId && ejercicio.seccionId !== seccionActualId) {
    seccionActualId = ejercicio.seccionId;
    const tab1 = document.getElementById("tab-section-1");
    const tab2 = document.getElementById("tab-section-2");
    if (tab1) tab1.classList.toggle("active", seccionActualId === 1);
    if (tab2) tab2.classList.toggle("active", seccionActualId === 2);
  }

  // Si estamos en modo sandbox, cambiar a práctica
  if (modoActual === "sandbox") {
    activarModo("practice");
  }

  // Actualizar estado en sidebar
  document.querySelectorAll(".exercise-nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.id === `nav-ejercicio-${index}`);
  });

  // Datos del problema
  document.getElementById("problem-title").textContent = ejercicio.titulo;
  document.getElementById("problem-desc").innerHTML = ejercicio.descripcion;

  // Indicador de paso en la sección actual
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === seccionActualId);
  const posEnSeccion = ejerciciosDeSeccion.findIndex(e => e.id === ejercicio.id);
  const stepText = posEnSeccion !== -1 ? `${posEnSeccion + 1} / ${ejerciciosDeSeccion.length}` : `${index + 1} / ${BANCO_EJERCICIOS.length}`;
  document.getElementById("exercise-step-indicator").textContent = stepText;

  // Tags
  const tagsContainer = document.getElementById("problem-tags");
  tagsContainer.innerHTML = "";
  ejercicio.tags.forEach(tag => {
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.textContent = tag;
    tagsContainer.appendChild(pill);
  });

  // Pistas y Solución
  const pistasBody = document.getElementById("pistas-content");
  pistasBody.innerHTML = ejercicio.pistas.map((p, i) => `
    <div class="hint-item">
      <strong>Pista ${i + 1}:</strong> ${p}
    </div>
  `).join("");

  actualizarVistaSolucion(ejercicio.id);

  // Cerrar acordeones al cambiar de reto
  const pDetails = document.getElementById("details-pistas");
  const sDetails = document.getElementById("details-solucion");
  if (pDetails) pDetails.removeAttribute("open");
  if (sDetails) sDetails.removeAttribute("open");

  // Código en el editor
  const guardado = obtenerCodigoGuardado(ejercicio.id);
  const initialCode = guardado || `-- Escribe tu consulta SQL para el reto ${ejercicio.id}:\n`;
  if (editorCM) {
    editorCM.setValue(initialCode);
    editorCM.clearHistory();
    setTimeout(() => editorCM.refresh(), 50);
  }

  // Limpiar resultados
  document.getElementById("status-banner-container").innerHTML = "";
  cambiarTab("resultado");
  limpiarTablaResultados();
  actualizarInsigniasFilas(0, 0);
}

// Cambiar la sección activa (Sección 1: SELECT / Sección 2: JOINs)
function cambiarSeccion(seccionId) {
  seccionActualId = Number(seccionId) || 1;
  localStorage.setItem("sqlcraft_active_section", seccionActualId);

  // Actualizar pestañas de sección en el sidebar
  const tab1 = document.getElementById("tab-section-1");
  const tab2 = document.getElementById("tab-section-2");
  if (tab1) tab1.classList.toggle("active", seccionActualId === 1);
  if (tab2) tab2.classList.toggle("active", seccionActualId === 2);

  // Actualizar banner dinámico del sidebar
  const badgeEl = document.getElementById("sidebar-section-badge");
  const titleEl = document.getElementById("sidebar-section-title");
  const metaEl = document.getElementById("sidebar-section-meta");
  if (badgeEl) badgeEl.textContent = `SECCIÓN ${seccionActualId}`;
  if (titleEl) {
    titleEl.textContent = seccionActualId === 1
      ? "Consultas SELECT, Alias (AS) y Filtrado"
      : "Combinación de Tablas (JOINs) y NULL";
  }
  if (metaEl) {
    metaEl.textContent = seccionActualId === 1
      ? "60 Retos • SELECT, AS, WHERE, LIKE, ORDER BY • Examen Certificación"
      : "60 Retos • INNER, OUTER & NULL • Examen Certificación";
  }

  // Actualizar botón de examen en header y tarjeta de examen en sidebar
  const headerExamBtnText = document.getElementById("header-exam-btn-text");
  if (headerExamBtnText) {
    headerExamBtnText.textContent = `Examen Sección ${seccionActualId}`;
  }
  const sidebarExamTitle = document.getElementById("sidebar-exam-title");
  if (sidebarExamTitle) {
    sidebarExamTitle.textContent = `Examen de Certificación - Sección ${seccionActualId}`;
  }
  const sidebarExamDesc = document.getElementById("sidebar-exam-desc");
  if (sidebarExamDesc) {
    sidebarExamDesc.textContent = seccionActualId === 1
      ? "8 preguntas teóricas de precisión y 4 retos prácticos en vivo sobre SELECT, AS y filtrado."
      : "8 preguntas teóricas rigurosas y 4 retos prácticos sobre INNER, LEFT, RIGHT, FULL OUTER y NULL.";
  }

  // Si estamos en modo examen, actualizar el título del editor y recargar examen
  if (modoActual === "exam") {
    const titleText = document.getElementById("editor-title-text");
    const examData = obtenerExamenActivo();
    if (titleText) titleText.textContent = `Editor SQL (${examData ? examData.titulo : "Examen de Sección"})`;
    inicializarExamenSeccion();
    cambiarTabExamen("teoria");
  } else {
    cargarProgresoExamenLocal();
  }

  // Re-renderizar lista de ejercicios filtrados por esta sección
  renderizarListaEjercicios();

  // Cargar el primer ejercicio de esta sección
  const primerEjIdx = BANCO_EJERCICIOS.findIndex(e => e.seccionId === seccionActualId);
  if (primerEjIdx !== -1) {
    cargarEjercicio(primerEjIdx);
  }

  actualizarEstadisticas();
}

// Navegación rápida (Anterior / Siguiente) dentro de la sección activa
function navegarEjercicio(offset) {
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === seccionActualId);
  const currentPos = ejerciciosDeSeccion.findIndex(e => e.id === BANCO_EJERCICIOS[ejercicioActualIndex]?.id);
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

// Actualizar barra de estadísticas, nivel y progreso para la sección activa
function actualizarEstadisticas() {
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === seccionActualId);
  const totalSeccion = ejerciciosDeSeccion.length || 60;

  let resueltosSeccion = 0;
  let limpiosSeccion = 0;
  let ayudadosSeccion = 0;

  ejerciciosDeSeccion.forEach(ej => {
    if (ejerciciosResueltos.has(ej.id)) {
      resueltosSeccion++;
      if (ejerciciosAyudados.has(ej.id)) ayudadosSeccion++;
      else limpiosSeccion++;
    }
  });

  const porcentaje = Math.round((resueltosSeccion / totalSeccion) * 100);

  const solvedBadge = document.getElementById("mode-solved-counter");
  if (solvedBadge) {
    if (ayudadosSeccion > 0) {
      solvedBadge.innerHTML = `${resueltosSeccion}/${totalSeccion} <span class="stats-mini-detail">(${limpiosSeccion} ✅ | ${ayudadosSeccion} ❌)</span>`;
    } else {
      solvedBadge.textContent = `${resueltosSeccion}/${totalSeccion}`;
    }
  }

  const percentEl = document.getElementById("stats-progress-percent");
  if (percentEl) percentEl.textContent = `${porcentaje}%`;

  const fillBar = document.getElementById("progress-fill-bar");
  if (fillBar) fillBar.style.width = `${porcentaje}%`;

  // Insignia de Nivel
  const levelEl = document.getElementById("user-level-badge");
  if (levelEl) {
    const totalGlobal = BANCO_EJERCICIOS.length;
    const resueltosGlobal = ejerciciosResueltos.size;
    if (resueltosGlobal === totalGlobal) {
      levelEl.innerHTML = `<span>👑 Gran Arquitecto SQL</span>`;
      levelEl.className = "level-capsule rank-master";
    } else if (resueltosGlobal >= 80) {
      levelEl.innerHTML = `<span>🟣 Especialista SQL Maestro</span>`;
      levelEl.className = "level-capsule rank-advanced";
    } else if (resueltosGlobal >= 40) {
      levelEl.innerHTML = `<span>🟣 Especialista SQL</span>`;
      levelEl.className = "level-capsule rank-advanced";
    } else if (resueltosGlobal >= 20) {
      levelEl.innerHTML = `<span>🔵 Analista de Datos</span>`;
      levelEl.className = "level-capsule rank-intermediate";
    } else {
      levelEl.innerHTML = `<span>🌱 Novato SQL</span>`;
      levelEl.className = "level-capsule rank-novice";
    }
  }

  // Si llegó al 100% de la sección activa, abrir modal de celebración
  if (resueltosSeccion === totalSeccion && totalSeccion > 0) {
    abrirModal("completion-modal");
  }
}

// Ejecutar consulta SQL escrita por el usuario
function ejecutarCodigoUsuario() {
  reproducirSonido("click");
  const sql = editorCM ? editorCM.getValue().trim() : "";

  if (!sql) {
    mostrarBanner("info", "Escribe una consulta SQL antes de ejecutar.");
    return null;
  }

  cambiarTab("resultado");
  const res = ejecutarConsulta(sql);
  ultimoResultadoUsuario = res;

  // Registrar en historial
  registrarEnHistorial(sql, res.success, res.executionTime, res.rowCount);

  if (!res.success) {
    reproducirSonido("error");
    mostrarBanner("error", `Error de sintaxis: ${res.error}`);
    renderizarTablaVacia("Error de ejecución SQL.");
    actualizarInsigniasFilas(0, null);
    return res;
  }

  // Notificación amigable
  if (res.isDml) {
    mostrarBanner("info", `Sentencia DDL/DML ejecutada con éxito (${res.rowsModified || 0} filas modificadas) en ${res.executionTime}ms.`);
  } else {
    mostrarBanner("info", `Consulta ejecutada correctamente: ${res.rowCount} fila(s) devueltas en ${res.executionTime}ms.`);
  }

  renderizarTabla("user-table-container", res);
  actualizarInsigniasFilas(res.rowCount, null);
  return res;
}

// Comprobar la respuesta del usuario contra la solución oficial o validar reto de examen
function comprobarRespuesta() {
  if (modoActual === "sandbox") {
    ejecutarCodigoUsuario();
    return;
  }
  if (modoActual === "exam") {
    validarRetoPracticoActivo();
    return;
  }

  const ejercicio = BANCO_EJERCICIOS[ejercicioActualIndex];
  const userRes = ejecutarCodigoUsuario();

  if (!userRes || !userRes.success) {
    return;
  }

  // Ejecutar consulta esperada
  const expectedRes = ejecutarConsulta(ejercicio.queryEsperada);
  ultimoResultadoEsperado = expectedRes;
  actualizarInsigniasFilas(userRes.rowCount, expectedRes.rowCount);

  // Comparar
  const veredicto = compararResultados(userRes, expectedRes);

  if (veredicto.correcto) {
    reproducirSonido("success");
    const fueAyudado = ejerciciosAyudados.has(ejercicio.id);

    if (fueAyudado) {
      mostrarBanner("warning", `⚠️ ¡Consulta correcta! Has completado el reto, pero quedó registrado como <strong>Resuelto con Ayuda (❌)</strong> debido a que consultaste la respuesta oficial.`);
    } else {
      mostrarBanner("success", veredicto.mensaje + ` 🌟 ¡Excelente! Resuelto 100% por tus propios méritos (✅).`);
      lanzarConfeti();
    }

    ejerciciosResueltos.add(ejercicio.id);
    guardarProgreso();
    actualizarEstadisticas();
    renderizarListaEjercicios();
    actualizarVistaSolucion(ejercicio.id);
  } else {
    reproducirSonido("error");
    mostrarBanner("error", veredicto.mensaje);
  }
}

// Renderizado de tabla SQL interactiva
function renderizarTabla(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (data.empty || !data.values || data.values.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <p>La consulta no devolvió ninguna fila.</p>
      </div>
    `;
    return;
  }

  let html = `<div class="table-container"><table class="sql-table"><thead><tr>`;
  data.columns.forEach(col => {
    html += `<th>${escapeHtml(col)}</th>`;
  });
  html += `</tr></thead><tbody>`;

  data.values.forEach(row => {
    html += `<tr>`;
    row.forEach(val => {
      let displayVal = val === null ? '<span class="null-tag">NULL</span>' : escapeHtml(String(val));
      html += `<td>${displayVal}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

function limpiarTablaResultados() {
  document.getElementById("user-table-container").innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">⌨️</div>
      <p>Escribe tu consulta SQL arriba y presiona <strong>Probar</strong> o <strong>Comprobar</strong>.</p>
    </div>
  `;
}

function renderizarTablaVacia(msg) {
  document.getElementById("user-table-container").innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">⚠️</div>
      <p>${escapeHtml(msg)}</p>
    </div>
  `;
}

// Mostrar banner de estado
function mostrarBanner(tipo, mensaje) {
  const container = document.getElementById("status-banner-container");
  const icon = tipo === 'success' ? '🎉' : tipo === 'error' ? '❌' : 'ℹ️';
  container.innerHTML = `
    <div class="status-banner ${tipo}">
      <span class="status-icon">${icon}</span>
      <span class="status-text">${mensaje}</span>
    </div>
  `;
}

// Insignias con recuento de filas en pestañas
function actualizarInsigniasFilas(userCount, expectedCount) {
  const userBadge = document.getElementById("badge-user-rows");
  if (userBadge) {
    userBadge.style.display = userCount !== null ? "inline-block" : "none";
    userBadge.textContent = `${userCount || 0} filas`;
  }

  const expBadge = document.getElementById("badge-expected-rows");
  if (expBadge && expectedCount !== null) {
    expBadge.style.display = "inline-block";
    expBadge.textContent = `${expectedCount} filas`;
  }
}

// Cambio de Pestañas Inferiores
function cambiarTab(tab) {
  tabActiva = tab;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`tab-btn-${tab}`);
  if (btn) btn.classList.add("active");

  const paneles = ["resultado", "esperado", "comparar", "esquema", "historial"];
  paneles.forEach(p => {
    const el = document.getElementById(`panel-${p}`);
    if (el) el.style.display = p === tab ? "block" : "none";
  });

  if (tab === "esperado" && modoActual === "practice") {
    const ejercicio = BANCO_EJERCICIOS[ejercicioActualIndex];
    const expRes = ejecutarConsulta(ejercicio.queryEsperada);
    ultimoResultadoEsperado = expRes;
    renderizarTabla("expected-table-container", expRes);
  } else if (tab === "comparar" && modoActual === "practice") {
    renderizarComparativa();
  } else if (tab === "historial") {
    renderizarHistorial();
  }
}

// Pestaña Comparativa Dividida (Diff)
function renderizarComparativa() {
  const userContainer = document.getElementById("diff-user-table-container");
  const expContainer = document.getElementById("diff-expected-table-container");
  const userMeta = document.getElementById("diff-user-meta");
  const expMeta = document.getElementById("diff-expected-meta");

  if (!ultimoResultadoUsuario) {
    userContainer.innerHTML = `<div class="empty-state"><p>Aún no has ejecutado ninguna consulta.</p></div>`;
    userMeta.textContent = "Sin datos";
  } else {
    userMeta.textContent = `${ultimoResultadoUsuario.rowCount || 0} filas (${ultimoResultadoUsuario.columns ? ultimoResultadoUsuario.columns.length : 0} cols)`;
    renderizarTabla("diff-user-table-container", ultimoResultadoUsuario);
  }

  const ejercicio = BANCO_EJERCICIOS[ejercicioActualIndex];
  const expRes = ejecutarConsulta(ejercicio.queryEsperada);
  ultimoResultadoEsperado = expRes;
  expMeta.textContent = `${expRes.rowCount || 0} filas (${expRes.columns.length} cols)`;
  renderizarTabla("diff-expected-table-container", expRes);
}

// Renderizar Visor del Esquema con Botones de Acción
function renderizarVisorEsquema() {
  const container = document.getElementById("schema-grid-container");
  const tablas = obtenerInfoEsquema();

  let html = "";
  tablas.forEach(tabla => {
    html += `
      <div class="schema-card">
        <div class="schema-card-header">
          <div class="schema-card-title-group">
            <span class="schema-table-icon">${tabla.icono || "📦"}</span>
            <span class="schema-table-name">${tabla.nombre}</span>
            <span class="schema-row-badge">${tabla.totalFilas} registros</span>
          </div>
          <div class="schema-card-actions">
            <button class="btn btn-secondary btn-xs" onclick="previsualizarTabla('${tabla.nombre}')">Ver 10 filas</button>
            <button class="btn btn-secondary btn-xs" onclick="insertarSnippet('SELECT * FROM ${tabla.nombre} LIMIT 10;')">Copiar SELECT</button>
          </div>
        </div>
        <div class="schema-card-desc">${tabla.descripcion}</div>
        <div class="schema-cols-list">
    `;

    tabla.columnas.forEach(col => {
      const isPk = col.clave && col.clave.includes("PK");
      const isFk = col.clave && col.clave.includes("FK");
      const badgeCls = isPk ? "key-pk" : isFk ? "key-fk" : "";

      html += `
        <div class="schema-col-row">
          <div class="col-name-group">
            <span class="col-name">${escapeHtml(col.nombre)}</span>
            ${col.clave ? `<span class="col-key ${badgeCls}">${col.clave}</span>` : ""}
          </div>
          <span class="col-type">${escapeHtml(col.tipo)}</span>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
}

function previsualizarTabla(nombreTabla) {
  cambiarTab("resultado");
  const res = ejecutarConsulta(`SELECT * FROM ${nombreTabla} LIMIT 10;`);
  mostrarBanner("info", `Vista previa de 10 filas de la tabla '${nombreTabla}':`);
  renderizarTabla("user-table-container", res);
  actualizarInsigniasFilas(res.rowCount, null);
}

// Historial de Consultas
function registrarEnHistorial(query, success, time, rowCount) {
  historialConsultas.unshift({
    query,
    success,
    time,
    rowCount: rowCount || 0,
    timestamp: new Date().toLocaleTimeString()
  });

  if (historialConsultas.length > 30) historialConsultas.pop();
  document.getElementById("history-counter").textContent = historialConsultas.length;
}

function renderizarHistorial() {
  const container = document.getElementById("history-list");
  if (!container) return;

  if (historialConsultas.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No has ejecutado consultas en esta sesión.</p></div>`;
    return;
  }

  let html = "";
  historialConsultas.forEach((item, idx) => {
    html += `
      <div class="history-item ${item.success ? "success" : "failed"}">
        <div class="history-meta">
          <span class="history-badge ${item.success ? "badge-ok" : "badge-fail"}">
            ${item.success ? "✓ Éxito" : "✕ Error"}
          </span>
          <span>${item.timestamp}</span>
          <span>${item.rowCount} filas</span>
          <span>${item.time}ms</span>
          <button class="btn btn-secondary btn-xs" onclick="cargarDesdeHistorial(${idx})">Cargar al Editor</button>
        </div>
        <pre class="history-query"><code>${escapeHtml(item.query)}</code></pre>
      </div>
    `;
  });

  container.innerHTML = html;
}

function cargarDesdeHistorial(idx) {
  const item = historialConsultas[idx];
  if (item && editorCM) {
    editorCM.setValue(item.query);
    editorCM.focus();
    reproducirSonido("click");
  }
}

// Formateador SQL Integrado (Beautifier)
function formatearCodigoSQL() {
  if (!editorCM) return;
  reproducirSonido("click");
  const raw = editorCM.getValue();

  const keywords = [
    "SELECT", "FROM", "WHERE", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "JOIN", "ON",
    "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "AND", "OR", "AS",
    "DISTINCT", "BETWEEN", "IN", "LIKE", "IS NULL", "IS NOT NULL", "ASC", "DESC",
    "COUNT", "SUM", "AVG", "MIN", "MAX", "ROUND", "INSERT INTO", "VALUES", "UPDATE",
    "SET", "DELETE FROM", "CREATE TABLE", "DROP TABLE", "ALTER TABLE"
  ];

  let formatted = raw.trim();

  // Convertir palabras clave a mayúsculas
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    formatted = formatted.replace(regex, kw);
  });

  // Salto de línea antes de cláusulas principales
  const lineBreaks = ["SELECT", "FROM", "WHERE", "INNER JOIN", "LEFT JOIN", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"];
  lineBreaks.forEach(cl => {
    const regex = new RegExp(`\\s+(${cl}\\b)`, "g");
    formatted = formatted.replace(regex, `\n$1`);
  });

  editorCM.setValue(formatted);
}

// Modos de Aplicación (Práctica, Examen de Certificación, Sandbox Libre)
function activarModo(modo) {
  modoActual = modo;
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
    const ej = BANCO_EJERCICIOS[ejercicioActualIndex];
    if (ej && editorCM) {
      const guardado = obtenerCodigoGuardado(ej.id);
      editorCM.setValue(guardado || `-- Escribe tu consulta SQL para el reto ${ej.id}:\n`);
    }
  } else if (modo === "exam") {
    const examData = obtenerExamenActivo();
    if (titleText) titleText.textContent = `Editor SQL (${examData ? examData.titulo : "Examen de Sección"})`;
    inicializarExamenSeccion();
    if (examenTabActiva === "practica") {
      cargarRetoPracticoExamenEnEditor(examenRetoPracticoIndex);
    } else {
      cargarRetoPracticoExamenEnEditor(0);
    }
  } else {
    if (titleText) titleText.textContent = "Editor SQL (Modo Sandbox Libre)";
    const saved = localStorage.getItem("sqlcraft_sandbox_code") || "SELECT * FROM videojuegos LIMIT 10;";
    if (editorCM) editorCM.setValue(saved);
  }

  if (editorCM) {
    setTimeout(() => editorCM.refresh(), 50);
  }
}

// -------------------------------------------------------------------
// MÓDULO: EXAMEN DE CERTIFICACIÓN MULTISECCIÓN
// -------------------------------------------------------------------

function obtenerExamenActivo() {
  if (typeof window !== "undefined" && window.EXAMENES_CATALOGO && window.EXAMENES_CATALOGO[seccionActualId]) {
    return window.EXAMENES_CATALOGO[seccionActualId];
  }
  if (typeof window !== "undefined" && window.EXAMEN_SECCION_2 && seccionActualId === 2) {
    return window.EXAMEN_SECCION_2;
  }
  if (typeof window !== "undefined" && window.EXAMEN_SECCION_1) {
    return window.EXAMEN_SECCION_1;
  }
  return null;
}

function guardarProgresoExamenLocal() {
  try {
    localStorage.setItem(`sqlcraft_exam_s${seccionActualId}_theory`, JSON.stringify(examenRespuestasTeoria));
    localStorage.setItem(`sqlcraft_exam_s${seccionActualId}_practical`, JSON.stringify([...examenRetosResueltos]));
    localStorage.setItem(`sqlcraft_exam_s${seccionActualId}_codes`, JSON.stringify(examenCodigosPracticos));
    localStorage.setItem(`sqlcraft_exam_s${seccionActualId}_graded`, JSON.stringify(examenCalificado));
  } catch (e) {}
}

function cargarProgresoExamenLocal() {
  try {
    examenRespuestasTeoria = {};
    examenRetosResueltos = new Set();
    examenCodigosPracticos = {};
    examenCalificado = false;

    const th = localStorage.getItem(`sqlcraft_exam_s${seccionActualId}_theory`);
    if (th) examenRespuestasTeoria = JSON.parse(th);
    const pr = localStorage.getItem(`sqlcraft_exam_s${seccionActualId}_practical`);
    if (pr) examenRetosResueltos = new Set(JSON.parse(pr));
    const cd = localStorage.getItem(`sqlcraft_exam_s${seccionActualId}_codes`);
    if (cd) examenCodigosPracticos = JSON.parse(cd);
    const gr = localStorage.getItem(`sqlcraft_exam_s${seccionActualId}_graded`);
    if (gr !== null) examenCalificado = JSON.parse(gr);
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
    btnRes.style.display = examenCalificado ? "inline-flex" : "none";
  }

  if (examenCalificado) {
    renderizarExamenResultados();
  }
}

function cambiarTabExamen(tab) {
  examenTabActiva = tab;
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
      if (examenCalificado) {
        btnNext.style.display = "inline-flex";
        btnNext.innerHTML = "Ver Calificación ▶";
        btnNext.onclick = () => cambiarTabExamen("resultado");
      } else {
        btnNext.style.display = "none";
      }
    }
    cargarRetoPracticoExamenEnEditor(examenRetoPracticoIndex);
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
    const respondida = examenRespuestasTeoria[q.id];
    const cardStatusClass = examenCalificado
      ? (respondida === q.correcta ? "exam-card-correct" : "exam-card-incorrect")
      : "";

    html += `
      <div class="exam-question-card ${cardStatusClass}" id="exam-q-card-${q.id}">
        <div class="exam-q-header">
          <span class="exam-q-index">Pregunta ${idx + 1} de ${examData.preguntasTeoricas.length}</span>
          <span class="exam-q-points">${q.puntos} pts</span>
        </div>
        <h4 class="exam-q-title">${escapeHtml(q.titulo)}</h4>
        <p class="exam-q-text">${escapeHtml(q.pregunta)}</p>
        <div class="exam-options-list">
    `;

    q.opciones.forEach(opt => {
      let optClass = "exam-option-item";
      const isSelected = respondida === opt.id;
      if (isSelected) optClass += " selected";

      if (examenCalificado) {
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

    if (examenCalificado) {
      const esAcierto = respondida === q.correcta;
      html += `
        <div class="exam-explanation-callout ${esAcierto ? 'exp-correct' : 'exp-incorrect'}">
          <strong>${esAcierto ? '✅ Justificación Técnica:' : '❌ Explicación y Corrección:'}</strong>
          <p>${escapeHtml(q.explicacion)}</p>
        </div>
      `;
    }

    html += `</div>`;
  });

  container.innerHTML = html;
}

function seleccionarOpcionTeorica(preguntaId, opcionId) {
  if (examenCalificado) {
    mostrarBanner("info", "El examen ya ha sido calificado. Puedes revisar las justificaciones técnicas o reiniciar para un nuevo intento.");
    return;
  }
  reproducirSonido("click");
  examenRespuestasTeoria[preguntaId] = opcionId;
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
    const isCompleted = examenRetosResueltos.has(reto.id);
    const isActive = idx === examenRetoPracticoIndex;
    const chipClass = `practical-tab-chip ${isActive ? 'active' : ''} ${isCompleted ? 'passed' : ''}`;
    const icon = isCompleted ? "✅" : "💻";

    selectorHtml += `
      <button class="${chipClass}" onclick="seleccionarRetoPracticoExamen(${idx})" type="button">
        <span class="chip-icon">${icon}</span>
        <span>Reto ${idx + 1}</span>
        <span class="chip-pts">${reto.puntos} pts</span>
      </button>
    `;
  });
  selectorContainer.innerHTML = selectorHtml;

  const retoActivo = retos[examenRetoPracticoIndex];
  if (!retoActivo) return;

  const estaResuelto = examenRetosResueltos.has(retoActivo.id);

  let detailHtml = `
    <div class="exam-practical-header">
      <div class="practical-tag-row">
        <span class="practical-badge">RETO PRÁCTICO ${examenRetoPracticoIndex + 1} DE ${retos.length}</span>
        <span class="practical-points-badge">${retoActivo.puntos} puntos</span>
        ${estaResuelto ? '<span class="practical-solved-badge">✅ Reto Validado con Éxito (15/15 pts)</span>' : '<span class="practical-pending-badge">⏳ Pendiente de Validación</span>'}
      </div>
      <h3 class="practical-challenge-title">${escapeHtml(retoActivo.titulo)}</h3>
    </div>
    <div class="practical-challenge-desc">
      ${retoActivo.descripcion}
    </div>
    <div class="practical-hints-box">
      <strong>⚙️ Pautas de Evaluación Práctica:</strong>
      <ul>
        <li>Escribe la sentencia SQL solicitada en la consola del editor.</li>
        <li>Presiona <strong>Probar (Ctrl+Enter)</strong> para inspeccionar la tabla devuelta.</li>
        <li>Presiona <strong>🎯 Comprobar / Validar (Ctrl+Shift+Enter)</strong> para contrastar contra el criterio formal de certificación.</li>
      </ul>
    </div>
  `;

  detailContainer.innerHTML = detailHtml;
}

function seleccionarRetoPracticoExamen(idx) {
  const examData = obtenerExamenActivo();
  if (!examData || !examData.desafiosPracticos) return;
  const retos = examData.desafiosPracticos;
  if (idx < 0 || idx >= retos.length) return;

  if (editorCM && retos[examenRetoPracticoIndex]) {
    examenCodigosPracticos[retos[examenRetoPracticoIndex].id] = editorCM.getValue();
    guardarProgresoExamenLocal();
  }

  examenRetoPracticoIndex = idx;
  renderizarExamenPractica();
  cargarRetoPracticoExamenEnEditor(idx);
}

function cargarRetoPracticoExamenEnEditor(idx) {
  const examData = obtenerExamenActivo();
  if (!editorCM || !examData || !examData.desafiosPracticos) return;
  const retos = examData.desafiosPracticos;
  const reto = retos[idx];
  if (!reto) return;

  const codigoGuardado = examenCodigosPracticos[reto.id];
  const plantilla = codigoGuardado || `-- ${examData.titulo} - Reto Práctico ${idx + 1}: ${reto.titulo}\n-- Escribe tu consulta SQL a continuación:\n`;

  editorCM.setValue(plantilla);
  setTimeout(() => editorCM.refresh(), 50);
}

function validarRetoPracticoActivo() {
  const examData = obtenerExamenActivo();
  if (!examData || !examData.desafiosPracticos) return;
  const retos = examData.desafiosPracticos;
  const reto = retos[examenRetoPracticoIndex];
  if (!reto) return;

  const userRes = ejecutarCodigoUsuario();
  if (!userRes || !userRes.success) return;

  const expRes = ejecutarConsulta(reto.queryEsperada);
  ultimoResultadoEsperado = expRes;
  actualizarInsigniasFilas(userRes.rowCount, expRes.rowCount);

  const veredicto = compararResultados(userRes, expRes);

  if (veredicto.correcto) {
    reproducirSonido("success");
    mostrarBanner("success", `🌟 ¡Excelente! Reto práctico ${examenRetoPracticoIndex + 1} validado exitosamente (+15 pts).`);
    lanzarConfeti();

    examenRetosResueltos.add(reto.id);
    if (editorCM) examenCodigosPracticos[reto.id] = editorCM.getValue();
    guardarProgresoExamenLocal();
    actualizarPuntajeEnVivoExamen();
    renderizarExamenPractica();
  } else {
    reproducirSonido("error");
    mostrarBanner("error", `❌ El resultado no coincide con la especificación del examen: ${veredicto.mensaje}`);
  }
}

function actualizarPuntajeEnVivoExamen() {
  const pill = document.getElementById("exam-live-score-pill");
  const examData = obtenerExamenActivo();
  if (!pill || !examData) return;

  if (examenCalificado) {
    let puntosTeoria = 0;
    examData.preguntasTeoricas.forEach(q => {
      if (examenRespuestasTeoria[q.id] === q.correcta) puntosTeoria += q.puntos;
    });
    let puntosPractica = 0;
    examData.desafiosPracticos.forEach(r => {
      if (examenRetosResueltos.has(r.id)) puntosPractica += r.puntos;
    });
    const totalPuntos = puntosTeoria + puntosPractica;
    const aprobado = totalPuntos >= 70;
    pill.textContent = `Calificación: ${totalPuntos} / 100 pts (${aprobado ? 'APROBADO ✅' : 'NO APROBADO ❌'})`;
    pill.className = `exam-score-pill ${aprobado ? 'passed' : 'failed'}`;
  } else {
    const numTeoria = Object.keys(examenRespuestasTeoria).length;
    const numPractica = examenRetosResueltos.size;
    const totalTeoria = examData.preguntasTeoricas ? examData.preguntasTeoricas.length : 8;
    const totalPractica = examData.desafiosPracticos ? examData.desafiosPracticos.length : 4;
    pill.textContent = `Avance: ${numTeoria}/${totalTeoria} Teoría • ${numPractica}/${totalPractica} Práctica`;
    pill.className = "exam-score-pill in-progress";
  }
}

function calificarExamenSeccion() {
  const examData = obtenerExamenActivo();
  if (!examData) return;

  const respondidasTeoria = Object.keys(examenRespuestasTeoria).length;
  const totalTeoria = examData.preguntasTeoricas ? examData.preguntasTeoricas.length : 8;
  const resueltosPractica = examenRetosResueltos.size;
  const totalPractica = examData.desafiosPracticos ? examData.desafiosPracticos.length : 4;

  const faltanTeoria = totalTeoria - respondidasTeoria;
  const faltanPractica = totalPractica - resueltosPractica;

  if (faltanTeoria > 0 || faltanPractica > 0) {
    let msg = "Aún tienes componentes pendientes en el examen:\n";
    if (faltanTeoria > 0) msg += `• ${faltanTeoria} pregunta(s) teórica(s) sin responder.\n`;
    if (faltanPractica > 0) msg += `• ${faltanPractica} reto(s) práctico(s) sin validar.\n`;
    msg += "\n¿Deseas finalizar y calificar ahora mismo?";

    if (!confirm(msg)) {
      return;
    }
  }

  let puntosTeoria = 0;
  let aciertosTeoria = 0;
  examData.preguntasTeoricas.forEach(q => {
    if (examenRespuestasTeoria[q.id] === q.correcta) {
      puntosTeoria += q.puntos;
      aciertosTeoria++;
    }
  });

  let puntosPractica = 0;
  examData.desafiosPracticos.forEach(r => {
    if (examenRetosResueltos.has(r.id)) {
      puntosPractica += r.puntos;
    }
  });

  const puntajeTotal = puntosTeoria + puntosPractica;
  const aprobado = puntajeTotal >= 70;

  examenCalificado = true;
  guardarProgresoExamenLocal();

  const btnResTab = document.getElementById("btn-exam-tab-resultado");
  if (btnResTab) btnResTab.style.display = "inline-flex";

  renderizarExamenTeoria();
  renderizarExamenPractica();
  renderizarExamenResultados();
  actualizarPuntajeEnVivoExamen();
  cambiarTabExamen("resultado");

  if (aprobado) {
    reproducirSonido("success");
    lanzarConfeti();
    mostrarBanner("success", `🏆 ¡Felicidades! Has APROBADO el ${examData.titulo} con ${puntajeTotal}/100 puntos.`);
  } else {
    reproducirSonido("error");
    mostrarBanner("error", `⚠️ Has obtenido ${puntajeTotal}/100 puntos. Se requiere mínimo 70 puntos para certificar. ¡Revisa las justificaciones técnicas e inténtalo de nuevo!`);
  }
}

function renderizarExamenResultados() {
  const container = document.getElementById("exam-resultado-container");
  const examData = obtenerExamenActivo();
  if (!container || !examData) return;

  let puntosTeoria = 0;
  let aciertosTeoria = 0;
  examData.preguntasTeoricas.forEach(q => {
    if (examenRespuestasTeoria[q.id] === q.correcta) {
      puntosTeoria += q.puntos;
      aciertosTeoria++;
    }
  });

  let puntosPractica = 0;
  let aciertosPractica = 0;
  examData.desafiosPracticos.forEach(r => {
    if (examenRetosResueltos.has(r.id)) {
      puntosPractica += r.puntos;
      aciertosPractica++;
    }
  });

  const puntajeTotal = puntosTeoria + puntosPractica;
  const aprobado = puntajeTotal >= 70;

  const feedbackAprobado = seccionActualId === 1
    ? '¡Excelente dominio conceptual y técnico! Has demostrado una comprensión sólida del estándar ANSI SQL, precedencia lógica de operadores, filtrado avanzado, ordenamiento y expresiones condicionales CASE.'
    : '¡Extraordinario dominio de JOINs y lógica relacional! Comprendes a la perfección la semántica entre ON y WHERE, relaciones muchos a muchos, preservación de registros en OUTER JOINs y manejo riguroso de valores NULL.';

  const feedbackReprobado = 'Estás muy cerca de dominar todos los conceptos. Revisa las justificaciones teóricas en la pestaña de Teoría y asegúrate de validar todos los retos prácticos antes de volver a presentar el examen.';

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

function reiniciarExamenSeccion(confirmar = true) {
  if (confirmar) {
    if (!confirm("¿Deseas reiniciar este examen? Se borrarán las respuestas seleccionadas y el puntaje actual para permitirte presentar una nueva evaluación limpia.")) {
      return;
    }
  }

  examenRespuestasTeoria = {};
  examenRetosResueltos = new Set();
  examenCodigosPracticos = {};
  examenCalificado = false;
  examenRetoPracticoIndex = 0;
  guardarProgresoExamenLocal();

  const btnResTab = document.getElementById("btn-exam-tab-resultado");
  if (btnResTab) btnResTab.style.display = "none";

  inicializarExamenSeccion();
  cambiarTabExamen("teoria");

  mostrarBanner("info", "🔄 Examen reiniciado. ¡Mucho éxito en este nuevo intento!");
}

// Exponer funciones globales para los eventos inline de la UI
if (typeof window !== "undefined") {
  window.seleccionarOpcionTeorica = seleccionarOpcionTeorica;
  window.seleccionarRetoPracticoExamen = seleccionarRetoPracticoExamen;
  window.cambiarTabExamen = cambiarTabExamen;
  window.calificarExamenSeccion = calificarExamenSeccion;
  window.reiniciarExamenSeccion = reiniciarExamenSeccion;
  window.activarModo = activarModo;
  window.cambiarSeccion = cambiarSeccion;
}

// Inserción de Snippets y Chuleta
function insertarSnippet(codigo) {
  if (!editorCM) return;
  editorCM.setValue(codigo);
  editorCM.focus();
  reproducirSonido("click");
}

function insertarDesdeChuleta(codigo) {
  insertarSnippet(codigo);
  cerrarModal("cheatsheet-modal");
}

// Exportar Datos a CSV
function exportarCSV() {
  if (!ultimoResultadoUsuario || !ultimoResultadoUsuario.columns || ultimoResultadoUsuario.columns.length === 0) {
    mostrarBanner("info", "No hay resultados para exportar. Ejecuta una consulta primero.");
    return;
  }

  const cols = ultimoResultadoUsuario.columns;
  const rows = ultimoResultadoUsuario.values;

  let csvContent = cols.map(c => `"${c.replace(/"/g, '""')}"`).join(",") + "\n";
  rows.forEach(r => {
    const line = r.map(val => {
      if (val === null) return '""';
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(",");
    csvContent += line + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `sqlcraft_resultado_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  mostrarBanner("success", "Archivo CSV descargado exitosamente.");
}

// Copiar Datos en Formato JSON
function copiarJSON() {
  if (!ultimoResultadoUsuario || !ultimoResultadoUsuario.columns) {
    mostrarBanner("info", "No hay resultados para copiar. Ejecuta una consulta primero.");
    return;
  }

  const cols = ultimoResultadoUsuario.columns;
  const rows = ultimoResultadoUsuario.values;
  const jsonArr = rows.map(r => {
    const obj = {};
    cols.forEach((col, idx) => {
      obj[col] = r[idx];
    });
    return obj;
  });

  navigator.clipboard.writeText(JSON.stringify(jsonArr, null, 2)).then(() => {
    mostrarBanner("success", "Resultados copiados al portapapeles en formato JSON.");
  });
}

// Modales
function abrirModal(id) {
  const m = document.getElementById(id);
  if (m && typeof m.showModal === "function") {
    m.showModal();
  }
}

function cerrarModal(id) {
  const m = document.getElementById(id);
  if (m && typeof m.close === "function") {
    m.close();
  }
}

// Alternar Sonido
function actualizarBotonSonido() {
  const icon = document.getElementById("sound-icon");
  if (icon) icon.textContent = sonidoHabilitado ? "🔊" : "🔇";
}

// Configurar Todos los Eventos del DOM
function configurarEventosUI() {
  // Modos
  const btnModePractice = document.getElementById("btn-mode-practice");
  if (btnModePractice) btnModePractice.addEventListener("click", () => activarModo("practice"));

  const btnModeExam = document.getElementById("btn-mode-exam");
  if (btnModeExam) btnModeExam.addEventListener("click", () => activarModo("exam"));

  const btnModeSandbox = document.getElementById("btn-mode-sandbox");
  if (btnModeSandbox) btnModeSandbox.addEventListener("click", () => activarModo("sandbox"));

  // Acceso al examen desde la barra lateral
  const btnSidebarExam = document.getElementById("btn-sidebar-exam-trigger");
  if (btnSidebarExam) btnSidebarExam.addEventListener("click", () => activarModo("exam"));

  // Pestañas del Examen
  const btnExamTabTeoria = document.getElementById("btn-exam-tab-teoria");
  if (btnExamTabTeoria) btnExamTabTeoria.addEventListener("click", () => cambiarTabExamen("teoria"));

  const btnExamTabPractica = document.getElementById("btn-exam-tab-practica");
  if (btnExamTabPractica) btnExamTabPractica.addEventListener("click", () => cambiarTabExamen("practica"));

  const btnExamTabResultado = document.getElementById("btn-exam-tab-resultado");
  if (btnExamTabResultado) btnExamTabResultado.addEventListener("click", () => cambiarTabExamen("resultado"));

  // Botón Calificar Examen
  const btnFinalizarExamen = document.getElementById("btn-finalizar-examen");
  if (btnFinalizarExamen) btnFinalizarExamen.addEventListener("click", calificarExamenSeccion);

  // Botones de reinicio del examen (cabecera y pie del examen)
  const btnResetExamHeader = document.getElementById("btn-reset-exam-header");
  if (btnResetExamHeader) {
    btnResetExamHeader.addEventListener("click", () => reiniciarExamenSeccion(true));
  }
  const btnResetExamFooter = document.getElementById("btn-reset-exam-footer");
  if (btnResetExamFooter) {
    btnResetExamFooter.addEventListener("click", () => reiniciarExamenSeccion(true));
  }

  // Pestañas selectoras de Sección
  const tabSec1 = document.getElementById("tab-section-1");
  if (tabSec1) {
    tabSec1.addEventListener("click", () => cambiarSeccion(1));
  }
  const tabSec2 = document.getElementById("tab-section-2");
  if (tabSec2) {
    tabSec2.addEventListener("click", () => cambiarSeccion(2));
  }

  // Navegación
  document.getElementById("btn-nav-prev").addEventListener("click", () => navegarEjercicio(-1));
  document.getElementById("btn-nav-next").addEventListener("click", () => navegarEjercicio(1));

  // Botones de ejecución
  document.getElementById("btn-ejecutar").addEventListener("click", ejecutarCodigoUsuario);
  document.getElementById("btn-comprobar").addEventListener("click", comprobarRespuesta);

  // Limpiar editor
  document.getElementById("btn-limpiar").addEventListener("click", () => {
    if (editorCM) {
      editorCM.setValue("");
      editorCM.focus();
    }
  });

  // Interceptar apertura de la solución oficial con advertencia (solo para retos pendientes no resueltos)
  const summarySol = document.getElementById("summary-solucion");
  if (summarySol) {
    summarySol.addEventListener("click", (e) => {
      const ej = BANCO_EJERCICIOS[ejercicioActualIndex];
      const sDetails = document.getElementById("details-solucion");
      if (!sDetails) return;

      // Si ya está desplegado, permitimos colapsarlo libremente
      if (sDetails.hasAttribute("open")) return;

      const yaResuelto = ejerciciosResueltos.has(ej.id);
      const yaAyudado = ejerciciosAyudados.has(ej.id);

      // Si ya fue resuelto limpiamente o ya fue consultado con anterioridad,
      // se abre de inmediato sin advertencias ni penalizaciones
      if (yaResuelto || yaAyudado) {
        actualizarVistaSolucion(ej.id);
        return; // Deja que <details> se abra de forma natural
      }

      // Si es un reto pendiente y nunca vio la solución, pedir confirmación previa
      e.preventDefault();
      abrirModal("modal-confirm-solution");
    });
  }

  // Confirmar revelación de la solución en el modal
  const btnConfirmReveal = document.getElementById("btn-confirm-reveal-solution");
  if (btnConfirmReveal) {
    btnConfirmReveal.addEventListener("click", () => {
      const ej = BANCO_EJERCICIOS[ejercicioActualIndex];
      const yaResuelto = ejerciciosResueltos.has(ej.id);

      if (!yaResuelto) {
        ejerciciosAyudados.add(ej.id);
        guardarProgreso();
      }

      cerrarModal("modal-confirm-solution");

      const sDetails = document.getElementById("details-solucion");
      if (sDetails) sDetails.setAttribute("open", "");

      actualizarVistaSolucion(ej.id);
      renderizarListaEjercicios();
      actualizarEstadisticas();

      if (!yaResuelto) {
        reproducirSonido("error");
      }
    });
  }

  // Copiar solución (solo registra como ayudado si no estaba ya resuelto o ayudado)
  const btnCopiarSol = document.getElementById("btn-copiar-solucion");
  if (btnCopiarSol) {
    btnCopiarSol.addEventListener("click", () => {
      const ej = BANCO_EJERCICIOS[ejercicioActualIndex];
      const yaResuelto = ejerciciosResueltos.has(ej.id);
      const yaAyudado = ejerciciosAyudados.has(ej.id);

      if (!yaResuelto && !yaAyudado) {
        ejerciciosAyudados.add(ej.id);
        guardarProgreso();
        actualizarVistaSolucion(ej.id);
        renderizarListaEjercicios();
        actualizarEstadisticas();
      }
      insertarSnippet(ej.queryEsperada);
    });
  }

  // Fuentes
  document.getElementById("btn-font-increase").addEventListener("click", () => aplicarTamanoFuente(editorFontSize + 1));
  document.getElementById("btn-font-decrease").addEventListener("click", () => aplicarTamanoFuente(editorFontSize - 1));

  // Exportar & Copiar
  document.getElementById("btn-export-csv").addEventListener("click", exportarCSV);
  document.getElementById("btn-copy-json").addEventListener("click", copiarJSON);

  // Limpiar historial
  document.getElementById("btn-clear-history").addEventListener("click", () => {
    historialConsultas = [];
    document.getElementById("history-counter").textContent = "0";
    renderizarHistorial();
  });

  // Modales
  document.getElementById("btn-open-cheatsheet").addEventListener("click", () => abrirModal("cheatsheet-modal"));
  document.getElementById("btn-open-shortcuts").addEventListener("click", () => abrirModal("shortcuts-modal"));

  // Sonido
  document.getElementById("btn-toggle-sound").addEventListener("click", () => {
    sonidoHabilitado = !sonidoHabilitado;
    localStorage.setItem("sqlcraft_sound", String(sonidoHabilitado));
    actualizarBotonSonido();
    reproducirSonido("click");
  });

  // Reiniciar Progreso Total (Ejercicios y Exámenes de Todas las Secciones)
  document.getElementById("btn-reset-progress").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas reiniciar todo el progreso a 0? Esta acción borrará todas las soluciones guardadas, las respuestas de los exámenes y restaurará la base de datos.")) {
      ejerciciosResueltos.clear();
      ejerciciosAyudados.clear();

      // Resetear estado del examen en memoria
      examenRespuestasTeoria = {};
      examenRetosResueltos = new Set();
      examenCodigosPracticos = {};
      examenCalificado = false;
      examenRetoPracticoIndex = 0;

      // Eliminar todas las claves de localStorage de SQLCraft
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("sqlcraft_")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {}

      restaurarBaseDeDatos();
      renderizarListaEjercicios();
      actualizarEstadisticas();
      cargarEjercicio(0);

      // Re-inicializar examen
      const btnResTab = document.getElementById("btn-exam-tab-resultado");
      if (btnResTab) btnResTab.style.display = "none";
      inicializarExamenSeccion();
      cambiarTabExamen("teoria");

      mostrarBanner("info", "🔄 Progreso y evaluaciones reiniciadas a 0. ¡Listo para comenzar desde el primer reto!");
    }
  });

  // Restaurar DB original en Sandbox
  const btnResetDb = document.getElementById("btn-reset-db");
  if (btnResetDb) {
    btnResetDb.addEventListener("click", () => {
      if (restaurarBaseDeDatos()) {
        mostrarBanner("success", "Base de datos restaurada al estado original de fábrica.");
        renderizarVisorEsquema();
      }
    });
  }

  // Buscador de ejercicios
  const searchInput = document.getElementById("exercise-search-input");
  const clearSearchBtn = document.getElementById("btn-clear-search");

  searchInput.addEventListener("input", (e) => {
    filtroTexto = e.target.value;
    clearSearchBtn.style.display = filtroTexto ? "block" : "none";
    renderizarListaEjercicios();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    filtroTexto = "";
    clearSearchBtn.style.display = "none";
    renderizarListaEjercicios();
  });

  // Filtros de estado (chips)
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      filtroEstado = e.currentTarget.dataset.filter;
      renderizarListaEjercicios();
    });
  });

  // Filtros de nivel de dificultad (chips)
  document.querySelectorAll(".level-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".level-chip").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      filtroNivel = e.currentTarget.dataset.level;
      renderizarListaEjercicios();
    });
  });

  // Buscador dentro de la Chuleta
  const csSearch = document.getElementById("cheatsheet-search");
  if (csSearch) {
    csSearch.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      document.querySelectorAll(".cheat-card").forEach(card => {
        const kw = card.getAttribute("data-keywords") || "";
        const txt = card.innerText.toLowerCase();
        card.style.display = (!val || kw.includes(val) || txt.includes(val)) ? "block" : "none";
      });
    });
  }

  // Atajos globales de teclado
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModal("cheatsheet-modal");
      cerrarModal("shortcuts-modal");
      cerrarModal("completion-modal");
      cerrarModal("modal-confirm-solution");
    }
  });
}

// Actualizar contenido visual de la solución y banner si fue ayudado o resuelto limpiamente
function actualizarVistaSolucion(id) {
  const ej = BANCO_EJERCICIOS.find(e => e.id === id);
  if (!ej) return;

  const solucionBody = document.getElementById("solucion-content");
  if (!solucionBody) return;

  const esResuelto = ejerciciosResueltos.has(id);
  const esAyudado = ejerciciosAyudados.has(id);

  let bannerHtml = '';
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

// Paneles Redimensionables Interactivos (Ajuste de pantallas a gusto del usuario)
function inicializarPanelesRedimensionables() {
  const sidebar = document.getElementById("app-sidebar");
  const resizerSidebar = document.getElementById("resizer-sidebar");
  const workspaceContainer = document.getElementById("workspace-container");
  const topWorkspace = document.getElementById("top-workspace") || document.querySelector(".top-workspace");
  const problemPanel = document.getElementById("problem-panel");
  const resizerEditor = document.getElementById("resizer-editor");
  const bottomWorkspace = document.getElementById("bottom-workspace");
  const resizerWorkspace = document.getElementById("resizer-workspace");

  // 1. Redimensionar Barra Lateral (Sidebar de ejercicios)
  if (resizerSidebar && sidebar) {
    let isDragging = false;
    let startX = 0;
    let startW = 0;

    resizerSidebar.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startW = sidebar.getBoundingClientRect().width;
      resizerSidebar.classList.add("is-dragging");
      document.body.classList.add("is-resizing-col");
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      const newWidth = Math.max(220, Math.min(650, startW + delta));
      sidebar.style.width = `${newWidth}px`;
      if (editorCM) editorCM.refresh();
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      resizerSidebar.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-col");
      localStorage.setItem("sqlcraft_sidebar_w", Math.round(sidebar.getBoundingClientRect().width));
      if (editorCM) editorCM.refresh();
    });

    // Doble clic para restablecer tamaño original
    resizerSidebar.addEventListener("dblclick", () => {
      sidebar.style.width = "330px";
      localStorage.removeItem("sqlcraft_sidebar_w");
      if (editorCM) editorCM.refresh();
    });
  }

  // 2. Redimensionar Indicaciones del Problema vs Consola Editor SQL
  if (resizerEditor && problemPanel) {
    let isDragging = false;
    let startX = 0;
    let startW = 0;

    resizerEditor.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startW = problemPanel.getBoundingClientRect().width;
      problemPanel.style.flex = "none";
      resizerEditor.classList.add("is-dragging");
      document.body.classList.add("is-resizing-col");
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const parent = topWorkspace || problemPanel.parentElement;
      const containerW = parent ? parent.getBoundingClientRect().width : window.innerWidth;
      const delta = e.clientX - startX;
      // Permitir ajustar libremente entre 220px y containerW - 240px
      const newWidth = Math.max(220, Math.min(containerW - 240, startW + delta));
      problemPanel.style.width = `${newWidth}px`;
      if (editorCM) editorCM.refresh();
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      resizerEditor.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-col");
      localStorage.setItem("sqlcraft_problem_w", Math.round(problemPanel.getBoundingClientRect().width));
      if (editorCM) editorCM.refresh();
    });

    // Doble clic para restablecer tamaño original
    resizerEditor.addEventListener("dblclick", () => {
      problemPanel.style.flex = "";
      problemPanel.style.width = "44%";
      localStorage.removeItem("sqlcraft_problem_w");
      if (editorCM) editorCM.refresh();
    });
  }

  // 3. Redimensionar Editor Superior vs Consola de Resultados Inferior
  if (resizerWorkspace && bottomWorkspace) {
    let isDragging = false;
    let startY = 0;
    let startH = 0;

    resizerWorkspace.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      startY = e.clientY;
      startH = bottomWorkspace.getBoundingClientRect().height;
      resizerWorkspace.classList.add("is-dragging");
      document.body.classList.add("is-resizing-row");
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const parent = workspaceContainer || bottomWorkspace.parentElement;
      const containerH = parent ? parent.getBoundingClientRect().height : window.innerHeight;
      const delta = e.clientY - startY; // Arrastre hacia arriba agranda bottomWorkspace
      const newHeight = Math.max(100, Math.min(containerH - 140, startH - delta));
      bottomWorkspace.style.height = `${newHeight}px`;
      if (editorCM) editorCM.refresh();
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      resizerWorkspace.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-row");
      localStorage.setItem("sqlcraft_bottom_h", Math.round(bottomWorkspace.getBoundingClientRect().height));
      if (editorCM) editorCM.refresh();
    });

    // Doble clic para restablecer altura original
    resizerWorkspace.addEventListener("dblclick", () => {
      bottomWorkspace.style.height = "38%";
      localStorage.removeItem("sqlcraft_bottom_h");
      if (editorCM) editorCM.refresh();
    });
  }
}

// Utilidades auxiliares
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function lanzarConfeti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
