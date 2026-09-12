/**
 * SQLCraft Studio - UI Module
 * Efectos sonoros, modales, confeti y paneles redimensionables
 */

function reproducirSonido(tipo) {
  if (!window.sonidoHabilitado) return;
  try {
    if (!window.audioCtx) {
      window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (window.audioCtx.state === "suspended") {
      window.audioCtx.resume();
    }

    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);

    const now = window.audioCtx.currentTime;

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

function actualizarBotonSonido() {
  const icon = document.getElementById("sound-icon");
  if (icon) icon.textContent = window.sonidoHabilitado ? "🔊" : "🔇";
}

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

function lanzarConfeti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

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
      if (window.editorCM) window.editorCM.refresh();
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      resizerSidebar.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-col");
      localStorage.setItem("sqlcraft_sidebar_w", Math.round(sidebar.getBoundingClientRect().width));
      if (window.editorCM) window.editorCM.refresh();
    });

    // Doble clic para restablecer tamaño original
    resizerSidebar.addEventListener("dblclick", () => {
      sidebar.style.width = "330px";
      localStorage.removeItem("sqlcraft_sidebar_w");
      if (window.editorCM) window.editorCM.refresh();
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
      if (window.editorCM) window.editorCM.refresh();
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      resizerEditor.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-col");
      localStorage.setItem("sqlcraft_problem_w", Math.round(problemPanel.getBoundingClientRect().width));
      if (window.editorCM) window.editorCM.refresh();
    });

    // Doble clic para restablecer tamaño original
    resizerEditor.addEventListener("dblclick", () => {
      problemPanel.style.flex = "";
      problemPanel.style.width = "44%";
      localStorage.removeItem("sqlcraft_problem_w");
      if (window.editorCM) window.editorCM.refresh();
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
      if (window.editorCM) window.editorCM.refresh();
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      resizerWorkspace.classList.remove("is-dragging");
      document.body.classList.remove("is-resizing-row");
      localStorage.setItem("sqlcraft_bottom_h", Math.round(bottomWorkspace.getBoundingClientRect().height));
      if (window.editorCM) window.editorCM.refresh();
    });

    // Doble clic para restablecer altura original
    resizerWorkspace.addEventListener("dblclick", () => {
      bottomWorkspace.style.height = "38%";
      localStorage.removeItem("sqlcraft_bottom_h");
      if (window.editorCM) window.editorCM.refresh();
    });
  }
}

// Exportar globalmente
window.reproducirSonido = reproducirSonido;
window.actualizarBotonSonido = actualizarBotonSonido;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.lanzarConfeti = lanzarConfeti;
window.inicializarPanelesRedimensionables = inicializarPanelesRedimensionables;
