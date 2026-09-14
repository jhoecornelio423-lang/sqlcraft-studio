/**
 * SQLCraft Studio - HTML Component Loader Module
 * Carga modular asíncrona de componentes HTML y modales
 */

const COMPONENT_MANIFEST = [
  { slot: "header-slot", file: "components/header.html" },
  { slot: "sidebar-slot", file: "components/sidebar.html" },
  { slot: "problem-slot", file: "components/problem-panel.html" },
  { slot: "editor-slot", file: "components/editor-panel.html" },
  { slot: "results-slot", file: "components/results-panel.html" },
  { slot: "cheatsheet-modal-slot", file: "components/modals/cheatsheet-modal.html" },
  { slot: "shortcuts-modal-slot", file: "components/modals/shortcuts-modal.html" },
  { slot: "confirm-solution-modal-slot", file: "components/modals/confirm-solution-modal.html" },
  { slot: "completion-modal-slot", file: "components/modals/completion-modal.html" },
  { slot: "auth-modal-slot", file: "components/modals/auth-modal.html" },
  { slot: "confirm-dialog-slot", file: "components/modals/confirm-dialog.html" }
];

async function cargarComponentesHTML() {
  const promises = COMPONENT_MANIFEST.map(async ({ slot, file }) => {
    const el = document.getElementById(slot);
    if (!el) return;
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const html = await res.text();
      el.outerHTML = html;
    } catch (e) {
      console.error(`Error al cargar el componente [${file}]:`, e);
    }
  });

  await Promise.all(promises);
}

window.cargarComponentesHTML = cargarComponentesHTML;
