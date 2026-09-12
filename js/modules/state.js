/**
 * SQLCraft Studio - State Management & Persistence Module
 * Módulo de gestión del estado global y almacenamiento local/nube
 */

// Estado global de la aplicación
window.seccionActualId = 1; // 1: Consultas SELECT y Filtrado | 2: Combinación de Tablas (JOINs)
window.ejercicioActualIndex = 0;
window.ejerciciosResueltos = new Set();
window.ejerciciosAyudados = new Set(); // Retos donde se consultó la solución oficial
window.tabActiva = "resultado"; // 'resultado', 'esperado', 'comparar', 'esquema', 'historial'
window.modoActual = "practice"; // 'practice' | 'exam' | 'sandbox'
window.filtroEstado = "all"; // 'all' | 'pending' | 'completed'
window.filtroNivel = "all"; // 'all' | 'Básico' | 'Intermedio' | 'Avanzado'
window.filtroTexto = "";
window.editorCM = null;
window.historialConsultas = [];

// Estado del Examen de Sección
window.examenRespuestasTeoria = {};
window.examenRetosResueltos = new Set();
window.examenTabActiva = "teoria";
window.examenRetoPracticoIndex = 0;
window.examenCalificado = false;
window.examenCodigosPracticos = {};
window.sonidoHabilitado = true;
window.ultimoResultadoUsuario = null;
window.ultimoResultadoEsperado = null;
window.editorFontSize = 14;

// Audio Context
window.audioCtx = null;

// Funciones de configuración y persistencia
function cargarConfiguraciones() {
  try {
    const savedSection = localStorage.getItem("sqlcraft_active_section");
    if (savedSection) window.seccionActualId = parseInt(savedSection, 10) || 1;

    const resueltos = localStorage.getItem("sqlcraft_resueltos");
    if (resueltos) window.ejerciciosResueltos = new Set(JSON.parse(resueltos));

    const ayudados = localStorage.getItem("sqlcraft_ayudados");
    if (ayudados) window.ejerciciosAyudados = new Set(JSON.parse(ayudados));

    const soundPref = localStorage.getItem("sqlcraft_sound");
    if (soundPref !== null) window.sonidoHabilitado = soundPref === "true";

    const savedSize = localStorage.getItem("sqlcraft_fontsize");
    if (savedSize) window.editorFontSize = parseInt(savedSize, 10) || 14;

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
    localStorage.setItem("sqlcraft_resueltos", JSON.stringify([...window.ejerciciosResueltos]));
    localStorage.setItem("sqlcraft_ayudados", JSON.stringify([...window.ejerciciosAyudados]));
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

function actualizarEstadisticas() {
  const ejerciciosDeSeccion = BANCO_EJERCICIOS.filter(e => !e.seccionId || e.seccionId === window.seccionActualId);
  const totalSeccion = ejerciciosDeSeccion.length || 60;

  let resueltosSeccion = 0;
  let limpiosSeccion = 0;
  let ayudadosSeccion = 0;

  ejerciciosDeSeccion.forEach(ej => {
    if (window.ejerciciosResueltos.has(ej.id)) {
      resueltosSeccion++;
      if (window.ejerciciosAyudados.has(ej.id)) ayudadosSeccion++;
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
    const resueltosGlobal = window.ejerciciosResueltos.size;
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
    if (typeof window.abrirModal === "function") {
      window.abrirModal("completion-modal");
    }
  }
}

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Exportar globalmente
window.cargarConfiguraciones = cargarConfiguraciones;
window.guardarProgreso = guardarProgreso;
window.guardarCodigoEjercicio = guardarCodigoEjercicio;
window.obtenerCodigoGuardado = obtenerCodigoGuardado;
window.actualizarEstadisticas = actualizarEstadisticas;
window.escapeHtml = escapeHtml;
