/**
 * SQLCraft Studio - Main Application Orchestrator & Bootstrap
 * Orquestador principal de la aplicación, configuración de eventos del DOM y ciclo de vida
 */

function configurarEventosUI() {
  // Modos
  const btnModePractice = document.getElementById("btn-mode-practice");
  if (btnModePractice) btnModePractice.addEventListener("click", () => window.activarModo("practice"));

  const btnModeExam = document.getElementById("btn-mode-exam");
  if (btnModeExam) btnModeExam.addEventListener("click", () => window.activarModo("exam"));

  const btnModeSandbox = document.getElementById("btn-mode-sandbox");
  if (btnModeSandbox) btnModeSandbox.addEventListener("click", () => window.activarModo("sandbox"));

  // Acceso al examen desde la barra lateral
  const btnSidebarExam = document.getElementById("btn-sidebar-exam-trigger");
  if (btnSidebarExam) btnSidebarExam.addEventListener("click", () => window.activarModo("exam"));

  // Pestañas del Examen
  const btnExamTabTeoria = document.getElementById("btn-exam-tab-teoria");
  if (btnExamTabTeoria) btnExamTabTeoria.addEventListener("click", () => window.cambiarTabExamen("teoria"));

  const btnExamTabPractica = document.getElementById("btn-exam-tab-practica");
  if (btnExamTabPractica) btnExamTabPractica.addEventListener("click", () => window.cambiarTabExamen("practica"));

  const btnExamTabResultado = document.getElementById("btn-exam-tab-resultado");
  if (btnExamTabResultado) btnExamTabResultado.addEventListener("click", () => window.cambiarTabExamen("resultado"));

  // Botón Calificar Examen
  const btnFinalizarExamen = document.getElementById("btn-finalizar-examen");
  if (btnFinalizarExamen) btnFinalizarExamen.addEventListener("click", window.calificarExamenSeccion);

  // Botones de reinicio del examen (cabecera y pie del examen)
  const btnResetExamHeader = document.getElementById("btn-reset-exam-header");
  if (btnResetExamHeader) {
    btnResetExamHeader.addEventListener("click", () => window.reiniciarExamenSeccion(true));
  }
  const btnResetExamFooter = document.getElementById("btn-reset-exam-footer");
  if (btnResetExamFooter) {
    btnResetExamFooter.addEventListener("click", () => window.reiniciarExamenSeccion(true));
  }

  // Selector de Sección (Combobox en el sidebar)
  const selectSection = document.getElementById("section-select-dropdown");
  if (selectSection) {
    selectSection.addEventListener("change", (e) => {
      window.cambiarSeccion(Number(e.target.value));
    });
  }

  // Pestañas selectoras de Sección (si existen en el DOM)
  const tabSec1 = document.getElementById("tab-section-1");
  if (tabSec1) {
    tabSec1.addEventListener("click", () => window.cambiarSeccion(1));
  }
  const tabSec2 = document.getElementById("tab-section-2");
  if (tabSec2) {
    tabSec2.addEventListener("click", () => window.cambiarSeccion(2));
  }

  // Botones para colapsar y expandir la barra lateral (modo reducido / slim rail)
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener("click", () => window.toggleSidebar());
  }
  const btnExpandSidebar = document.getElementById("btn-expand-sidebar");
  if (btnExpandSidebar) {
    btnExpandSidebar.addEventListener("click", (e) => {
      e.stopPropagation();
      window.toggleSidebar(false);
    });
  }
  const railSidebar = document.getElementById("sidebar-collapsed-rail");
  if (railSidebar) {
    railSidebar.addEventListener("click", () => window.toggleSidebar(false));
  }

  // Navegación
  const btnPrev = document.getElementById("btn-nav-prev");
  if (btnPrev) btnPrev.addEventListener("click", () => window.navegarEjercicio(-1));
  const btnNext = document.getElementById("btn-nav-next");
  if (btnNext) btnNext.addEventListener("click", () => window.navegarEjercicio(1));

  // Botones de ejecución
  const btnEjecutar = document.getElementById("btn-ejecutar");
  if (btnEjecutar) btnEjecutar.addEventListener("click", window.ejecutarCodigoUsuario);
  const btnComprobar = document.getElementById("btn-comprobar");
  if (btnComprobar) btnComprobar.addEventListener("click", window.comprobarRespuesta);

  // Limpiar editor
  const btnLimpiar = document.getElementById("btn-limpiar");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      if (window.editorCM) {
        window.editorCM.setValue("");
        window.editorCM.focus();
      }
    });
  }

  // Interceptar apertura de la solución oficial con advertencia (solo para retos pendientes no resueltos)
  const summarySol = document.getElementById("summary-solucion");
  if (summarySol) {
    summarySol.addEventListener("click", (e) => {
      const ej = BANCO_EJERCICIOS[window.ejercicioActualIndex];
      const sDetails = document.getElementById("details-solucion");
      if (!sDetails || !ej) return;

      // Si ya está desplegado, permitimos colapsarlo libremente
      if (sDetails.hasAttribute("open")) return;

      const yaResuelto = window.ejerciciosResueltos.has(ej.id);
      const yaAyudado = window.ejerciciosAyudados.has(ej.id);

      // Si ya fue resuelto limpiamente o ya fue consultado con anterioridad,
      // se abre de inmediato sin advertencias ni penalizaciones
      if (yaResuelto || yaAyudado) {
        window.actualizarVistaSolucion(ej.id);
        return; // Deja que <details> se abra de forma natural
      }

      // Si es un reto pendiente y nunca vio la solución, pedir confirmación previa
      e.preventDefault();
      window.abrirModal("modal-confirm-solution");
    });
  }

  // Confirmar revelación de la solución en el modal
  const btnConfirmReveal = document.getElementById("btn-confirm-reveal-solution");
  if (btnConfirmReveal) {
    btnConfirmReveal.addEventListener("click", () => {
      const ej = BANCO_EJERCICIOS[window.ejercicioActualIndex];
      if (!ej) return;
      const yaResuelto = window.ejerciciosResueltos.has(ej.id);

      if (!yaResuelto) {
        window.ejerciciosAyudados.add(ej.id);
        window.guardarProgreso();
      }

      window.cerrarModal("modal-confirm-solution");

      const sDetails = document.getElementById("details-solucion");
      if (sDetails) sDetails.setAttribute("open", "");

      window.actualizarVistaSolucion(ej.id);
      window.renderizarListaEjercicios();
      window.actualizarEstadisticas();

      if (!yaResuelto && typeof window.reproducirSonido === "function") {
        window.reproducirSonido("error");
      }
    });
  }

  // Copiar solución (solo registra como ayudado si no estaba ya resuelto o ayudado)
  const btnCopiarSol = document.getElementById("btn-copiar-solucion");
  if (btnCopiarSol) {
    btnCopiarSol.addEventListener("click", () => {
      const ej = BANCO_EJERCICIOS[window.ejercicioActualIndex];
      if (!ej) return;
      const yaResuelto = window.ejerciciosResueltos.has(ej.id);
      const yaAyudado = window.ejerciciosAyudados.has(ej.id);

      if (!yaResuelto && !yaAyudado) {
        window.ejerciciosAyudados.add(ej.id);
        window.guardarProgreso();
        window.actualizarVistaSolucion(ej.id);
        window.renderizarListaEjercicios();
        window.actualizarEstadisticas();
      }
      window.insertarSnippet(ej.queryEsperada);
    });
  }

  // Fuentes
  const btnFontInc = document.getElementById("btn-font-increase");
  if (btnFontInc) btnFontInc.addEventListener("click", () => window.aplicarTamanoFuente(window.editorFontSize + 1));
  const btnFontDec = document.getElementById("btn-font-decrease");
  if (btnFontDec) btnFontDec.addEventListener("click", () => window.aplicarTamanoFuente(window.editorFontSize - 1));

  // Exportar & Copiar
  const btnExportCsv = document.getElementById("btn-export-csv");
  if (btnExportCsv) btnExportCsv.addEventListener("click", window.exportarCSV);
  const btnCopyJson = document.getElementById("btn-copy-json");
  if (btnCopyJson) btnCopyJson.addEventListener("click", window.copiarJSON);

  // Limpiar historial
  const btnClearHist = document.getElementById("btn-clear-history");
  if (btnClearHist) {
    btnClearHist.addEventListener("click", () => {
      window.historialConsultas = [];
      const counter = document.getElementById("history-counter");
      if (counter) counter.textContent = "0";
      window.renderizarHistorial();
    });
  }

  // Modales
  const btnOpenCheat = document.getElementById("btn-open-cheatsheet");
  if (btnOpenCheat) btnOpenCheat.addEventListener("click", () => window.abrirModal("cheatsheet-modal"));
  const btnOpenShort = document.getElementById("btn-open-shortcuts");
  if (btnOpenShort) btnOpenShort.addEventListener("click", () => window.abrirModal("shortcuts-modal"));
  const btnOpenTour = document.getElementById("btn-open-tour");
  if (btnOpenTour) btnOpenTour.addEventListener("click", () => window.iniciarTutorial(true));

  // Sonido
  const btnToggleSound = document.getElementById("btn-toggle-sound");
  if (btnToggleSound) {
    btnToggleSound.addEventListener("click", () => {
      window.sonidoHabilitado = !window.sonidoHabilitado;
      localStorage.setItem("sqlcraft_sound", String(window.sonidoHabilitado));
      window.actualizarBotonSonido();
      if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
    });
  }

  // Reiniciar Progreso Total (Ejercicios y Exámenes de Todas las Secciones)
  const btnResetProg = document.getElementById("btn-reset-progress");
  if (btnResetProg) {
    btnResetProg.addEventListener("click", async () => {
      const confirmado = typeof window.mostrarConfirmacion === "function"
        ? await window.mostrarConfirmacion({
            titulo: "¿Reiniciar todo el progreso a 0?",
            mensaje: "Esta acción borrará permanentemente todas tus soluciones guardadas, las respuestas de los exámenes en todas las secciones y restaurará la base de datos a su estado original.",
            badge: "Reinicio Total",
            tipo: "danger",
            textoConfirmar: "Sí, reiniciar todo",
            textoCancelar: "Cancelar"
          })
        : confirm("¿Estás seguro de que deseas reiniciar todo el progreso a 0? Esta acción borrará todas las soluciones guardadas, las respuestas de los exámenes y restaurará la base de datos.");

      if (confirmado) {
        window.ejerciciosResueltos.clear();
        window.ejerciciosAyudados.clear();

        // Resetear estado del examen en memoria
        window.examenRespuestasTeoria = {};
        window.examenRetosResueltos = new Set();
        window.examenCodigosPracticos = {};
        window.examenCalificado = false;
        window.examenRetoPracticoIndex = 0;

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

        if (typeof restaurarBaseDeDatos === "function") restaurarBaseDeDatos();
        window.renderizarListaEjercicios();
        window.actualizarEstadisticas();
        window.cargarEjercicio(0);

        // Re-inicializar examen
        const btnResTab = document.getElementById("btn-exam-tab-resultado");
        if (btnResTab) btnResTab.style.display = "none";
        window.inicializarExamenSeccion();
        window.cambiarTabExamen("teoria");

        if (typeof window.mostrarBanner === "function") {
          window.mostrarBanner("info", "🔄 Progreso y evaluaciones reiniciadas a 0. ¡Listo para comenzar desde el primer reto!");
        }
      }
    });
  }

  // Restaurar DB original en Sandbox
  const btnResetDb = document.getElementById("btn-reset-db");
  if (btnResetDb) {
    btnResetDb.addEventListener("click", () => {
      if (typeof restaurarBaseDeDatos === "function" && restaurarBaseDeDatos()) {
        if (typeof window.mostrarBanner === "function") {
          window.mostrarBanner("success", "Base de datos restaurada al estado original de fábrica.");
        }
        window.renderizarVisorEsquema();
      }
    });
  }

  // Buscador de ejercicios
  const searchInput = document.getElementById("exercise-search-input");
  const clearSearchBtn = document.getElementById("btn-clear-search");

  if (searchInput && clearSearchBtn) {
    searchInput.addEventListener("input", (e) => {
      window.filtroTexto = e.target.value;
      clearSearchBtn.style.display = window.filtroTexto ? "block" : "none";
      window.renderizarListaEjercicios();
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      window.filtroTexto = "";
      clearSearchBtn.style.display = "none";
      window.renderizarListaEjercicios();
    });
  }

  // Filtros de estado (chips)
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      window.filtroEstado = e.currentTarget.dataset.filter;
      window.renderizarListaEjercicios();
    });
  });

  // Filtros de nivel de dificultad (chips)
  document.querySelectorAll(".level-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".level-chip").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      window.filtroNivel = e.currentTarget.dataset.level;
      window.renderizarListaEjercicios();
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
      window.cerrarModal("cheatsheet-modal");
      window.cerrarModal("shortcuts-modal");
      window.cerrarModal("completion-modal");
      window.cerrarModal("modal-confirm-solution");
    }
  });
}

// Inicialización de la Aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar componentes y modales HTML modulares primero
  if (typeof window.cargarComponentesHTML === "function") {
    await window.cargarComponentesHTML();
  }

  window.cargarConfiguraciones();
  window.actualizarBotonSonido();

  // Inicializar Autenticación y Sincronización con Supabase
  if (typeof window.inicializarSupabaseAuth === "function") {
    window.inicializarSupabaseAuth();
  }

  // Inicializar CodeMirror 5
  window.inicializarEditorCodeMirror();

  // Inicializar Motor SQLite WASM
  const statusDbEl = document.getElementById("db-status-badge");
  if (statusDbEl) statusDbEl.textContent = "⏳ Cargando SQLite WASM...";
  
  if (typeof inicializarBaseDeDatos === "function") {
    const dbInitResult = await inicializarBaseDeDatos();
    if (dbInitResult && dbInitResult.success) {
      if (statusDbEl) {
        statusDbEl.textContent = "🟢 SQLite Ready (3 Tablas)";
        statusDbEl.classList.add("ready");
      }
    } else {
      if (statusDbEl) statusDbEl.textContent = "❌ Error en SQLite";
      if (typeof window.mostrarBanner === "function") {
        window.mostrarBanner("error", `Error al inicializar SQLite: ${dbInitResult ? dbInitResult.error : "Error desconocido"}`);
      }
    }
  }

  // Inicializar componentes y sección activa
  configurarEventosUI();
  window.inicializarPanelesRedimensionables();
  window.renderizarVisorEsquema();
  window.cambiarSeccion(window.seccionActualId);

  // Verificar tutorial para nuevos usuarios
  if (typeof window.verificarTutorialInicial === "function") {
    window.verificarTutorialInicial();
  }
});

// Exportar configuración de eventos
window.configurarEventosUI = configurarEventosUI;
