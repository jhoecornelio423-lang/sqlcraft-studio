/**
 * SQLCraft Studio - Interactive Onboarding Tour Module
 * Guía interactiva paso a paso para usuarios nuevos con spotlight visual
 */

(function () {
  const TOUR_STORAGE_KEY = "sqlcraft_tour_completed";
  let tourPasoActual = 0;
  let tourActivo = false;
  let tourBackdropEl = null;
  let tourSpotlightEl = null;
  let tourPopoverEl = null;

  const TOUR_STEPS = [
    {
      target: "#app-sidebar",
      placement: "right",
      badge: "Paso 1 de 5",
      title: "Banco de Retos y Secciones",
      content: "Aquí encuentras todos los ejercicios organizados por nivel de dificultad (Básico, Intermedio y Avanzado). Usa el <strong>selector superior</strong> para cambiar cómodamente entre las distintas secciones temáticas de aprendizaje (como consultas SELECT, JOINs, entre otras).",
      beforeStep: () => {
        if (typeof window.colapsarSidebar === "function") {
          window.colapsarSidebar(false);
        }
      }
    },
    {
      target: "#problem-panel",
      placement: "right",
      badge: "Paso 2 de 5",
      title: "Indicaciones y Ayudas del Reto",
      content: "En este panel se detalla el objetivo de la consulta, los filtros necesarios y el resultado esperado. Si tienes dudas, puedes desplegar las <strong>Pistas</strong> o consultar la <strong>Solución explicada</strong>.",
      beforeStep: () => {
        if (window.modoActual !== "practice" && typeof window.activarModo === "function") {
          window.activarModo("practice");
        }
      }
    },
    {
      target: "#editor-panel",
      placement: "left",
      badge: "Paso 3 de 5",
      title: "Editor SQL y Botones de Ejecución",
      content: "Escribe tus consultas aquí con autocompletado (<code>Ctrl + Espacio</code>).<br><br>• <strong>Probar (Ctrl + Enter)</strong>: ejecuta tu código para inspeccionar los datos.<br>• <strong>Comprobar (Ctrl + Shift + Enter)</strong>: valida si tu consulta resuelve el reto.",
      beforeStep: () => {}
    },
    {
      target: "#bottom-workspace",
      placement: "top",
      badge: "Paso 4 de 5",
      title: "Tablas y Esquema de Datos",
      content: "En la pestaña <strong>Esquema y Diagrama ER</strong> puedes consultar la estructura de las tablas de la base de datos (como <code>videojuegos</code>, <code>clientes</code>, <code>ventas</code>, entre otras), sus columnas, tipos de datos y el diagrama de relaciones para guiar tus consultas.",
      beforeStep: () => {
        if (typeof window.cambiarTab === "function") {
          window.cambiarTab("esquema");
        }
      },
      afterStep: () => {
        if (typeof window.cambiarTab === "function") {
          window.cambiarTab("resultado");
        }
      }
    },
    {
      target: ".mode-switch-group",
      placement: "bottom",
      badge: "Paso 5 de 5",
      title: "Modos de Práctica, Examen y Sandbox",
      content: "Alterna entre los <strong>Desafíos guiados</strong>, el <strong>Examen de Certificación</strong> (con 100 puntos y banco de preguntas aleatorias) o el <strong>Sandbox Libre</strong> para experimentar sin restricciones.<br><br>¡Todo listo para comenzar!",
      beforeStep: () => {}
    }
  ];

  function crearElementosTour() {
    if (document.getElementById("tour-backdrop-layer")) return;

    tourBackdropEl = document.createElement("div");
    tourBackdropEl.id = "tour-backdrop-layer";
    tourBackdropEl.className = "tour-backdrop-layer";

    tourSpotlightEl = document.createElement("div");
    tourSpotlightEl.id = "tour-spotlight-box";
    tourSpotlightEl.className = "tour-spotlight-box";

    tourPopoverEl = document.createElement("div");
    tourPopoverEl.id = "tour-popover-card";
    tourPopoverEl.className = "tour-popover-card";

    document.body.appendChild(tourBackdropEl);
    document.body.appendChild(tourSpotlightEl);
    document.body.appendChild(tourPopoverEl);

    tourBackdropEl.addEventListener("click", () => {
      // Clic fuera para avanzar
      avanzarTutorial();
    });

    window.addEventListener("resize", reposicionarTour);
    window.addEventListener("scroll", reposicionarTour, true);
    window.addEventListener("keydown", manejarTecladoTour);
  }

  function eliminarElementosTour() {
    if (tourBackdropEl) tourBackdropEl.remove();
    if (tourSpotlightEl) tourSpotlightEl.remove();
    if (tourPopoverEl) tourPopoverEl.remove();

    tourBackdropEl = null;
    tourSpotlightEl = null;
    tourPopoverEl = null;

    window.removeEventListener("resize", reposicionarTour);
    window.removeEventListener("scroll", reposicionarTour, true);
    window.removeEventListener("keydown", manejarTecladoTour);
  }

  function manejarTecladoTour(e) {
    if (!tourActivo) return;
    if (e.key === "Escape") {
      e.preventDefault();
      finalizarTutorial(true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      avanzarTutorial();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      retrocederTutorial();
    }
  }

  function renderizarPaso(index) {
    if (!tourActivo || !tourPopoverEl) return;
    const step = TOUR_STEPS[index];
    if (!step) return;

    if (typeof step.beforeStep === "function") {
      step.beforeStep();
    }

    const totalPasos = TOUR_STEPS.length;
    const esUltimo = index === totalPasos - 1;

    let dotsHtml = "";
    for (let i = 0; i < totalPasos; i++) {
      let dotClass = "tour-dot";
      if (i === index) dotClass += " active";
      else if (i < index) dotClass += " passed";
      dotsHtml += `<span class="${dotClass}"></span>`;
    }

    tourPopoverEl.innerHTML = `
      <div class="tour-popover-header">
        <span class="tour-step-badge">${step.badge}</span>
        <button class="tour-close-btn" onclick="window.finalizarTutorial(true)" title="Cerrar tutorial (Esc)">✕</button>
      </div>
      <h3 class="tour-popover-title">${step.title}</h3>
      <div class="tour-popover-body">${step.content}</div>
      <div class="tour-popover-footer">
        <div class="tour-step-dots">${dotsHtml}</div>
        <div class="tour-nav-actions">
          <button class="btn-tour-skip" onclick="window.finalizarTutorial(true)">Omitir</button>
          ${index > 0 ? `<button class="btn-tour-prev" onclick="window.retrocederTutorial()">◀ Anterior</button>` : ""}
          <button class="btn-tour-next" onclick="window.avanzarTutorial()">${esUltimo ? "¡Comenzar! ✨" : "Siguiente ▶"}</button>
        </div>
      </div>
    `;

    reposicionarTour();
    setTimeout(reposicionarTour, 25);
  }

  function reposicionarTour() {
    if (!tourActivo || !tourSpotlightEl || !tourPopoverEl) return;
    const step = TOUR_STEPS[tourPasoActual];
    if (!step) return;

    const targetEl = document.querySelector(step.target);
    const pad = 6;
    let targetRect;

    if (targetEl && targetEl.offsetParent !== null) {
      targetRect = targetEl.getBoundingClientRect();
    } else {
      // Fallback si el elemento no es visible
      targetRect = {
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 150,
        width: 300,
        height: 200,
        right: window.innerWidth / 2 + 150,
        bottom: window.innerHeight / 2 + 100
      };
    }

    // Posición del spotlight con margen suave
    const spotTop = Math.max(4, targetRect.top - pad);
    const spotLeft = Math.max(4, targetRect.left - pad);
    const spotWidth = Math.min(window.innerWidth - spotLeft - 4, targetRect.width + pad * 2);
    const spotHeight = Math.min(window.innerHeight - spotTop - 4, targetRect.height + pad * 2);

    tourSpotlightEl.style.top = `${spotTop}px`;
    tourSpotlightEl.style.left = `${spotLeft}px`;
    tourSpotlightEl.style.width = `${spotWidth}px`;
    tourSpotlightEl.style.height = `${spotHeight}px`;

    // Recorte dinámico en el telón de fondo para que el elemento activo quede 100% nítido (sin desenfoque ni pixelado)
    if (tourBackdropEl) {
      tourBackdropEl.style.clipPath = `polygon(
        0% 0%,
        0% 100%,
        ${spotLeft}px 100%,
        ${spotLeft}px ${spotTop}px,
        ${spotLeft + spotWidth}px ${spotTop}px,
        ${spotLeft + spotWidth}px ${spotTop + spotHeight}px,
        ${spotLeft}px ${spotTop + spotHeight}px,
        ${spotLeft}px 100%,
        100% 100%,
        100% 0%
      )`;
    }

    // Posición del Popover
    const popWidth = Math.min(380, window.innerWidth - 28);
    const popHeight = tourPopoverEl.offsetHeight || 220;
    const margin = 16;
    let popTop = 0;
    let popLeft = 0;

    const placement = step.placement || "bottom";

    if (window.innerWidth < 700) {
      // En pantallas compactas, centrar abajo
      popLeft = 14;
      popTop = window.innerHeight - popHeight - 14;
    } else {
      switch (placement) {
        case "right":
          popLeft = targetRect.right + margin;
          popTop = targetRect.top + targetRect.height / 2 - popHeight / 2;
          // Si desborda a la derecha, colocarlo a la izquierda
          if (popLeft + popWidth > window.innerWidth - 14) {
            popLeft = Math.max(14, targetRect.left - popWidth - margin);
          }
          break;

        case "left":
          popLeft = targetRect.left - popWidth - margin;
          popTop = targetRect.top + targetRect.height / 2 - popHeight / 2;
          // Si desborda a la izquierda, colocar a la derecha
          if (popLeft < 14) {
            popLeft = Math.min(window.innerWidth - popWidth - 14, targetRect.right + margin);
          }
          break;

        case "top":
          popLeft = targetRect.left + targetRect.width / 2 - popWidth / 2;
          popTop = targetRect.top - popHeight - margin;
          // Si desborda arriba, colocar abajo
          if (popTop < 14) {
            popTop = Math.min(window.innerHeight - popHeight - 14, targetRect.bottom + margin);
          }
          break;

        case "bottom":
        default:
          popLeft = targetRect.left + targetRect.width / 2 - popWidth / 2;
          popTop = targetRect.bottom + margin;
          // Si desborda abajo, colocar arriba
          if (popTop + popHeight > window.innerHeight - 14) {
            popTop = Math.max(14, targetRect.top - popHeight - margin);
          }
          break;
      }

      // Restricciones de pantalla
      popLeft = Math.max(14, Math.min(window.innerWidth - popWidth - 14, popLeft));
      popTop = Math.max(14, Math.min(window.innerHeight - popHeight - 14, popTop));
    }

    tourPopoverEl.style.top = `${popTop}px`;
    tourPopoverEl.style.left = `${popLeft}px`;
  }

  function iniciarTutorial(forzar = false) {
    if (tourActivo) return;
    tourPasoActual = 0;
    tourActivo = true;
    crearElementosTour();
    renderizarPaso(tourPasoActual);
  }

  function avanzarTutorial() {
    if (!tourActivo) return;
    const stepActual = TOUR_STEPS[tourPasoActual];
    if (stepActual && typeof stepActual.afterStep === "function") {
      stepActual.afterStep();
    }

    if (tourPasoActual < TOUR_STEPS.length - 1) {
      tourPasoActual++;
      renderizarPaso(tourPasoActual);
    } else {
      finalizarTutorial(true);
    }
  }

  function retrocederTutorial() {
    if (!tourActivo || tourPasoActual <= 0) return;
    const stepActual = TOUR_STEPS[tourPasoActual];
    if (stepActual && typeof stepActual.afterStep === "function") {
      stepActual.afterStep();
    }

    tourPasoActual--;
    renderizarPaso(tourPasoActual);
  }

  function finalizarTutorial(marcarVisto = true) {
    if (!tourActivo) return;
    const stepActual = TOUR_STEPS[tourPasoActual];
    if (stepActual && typeof stepActual.afterStep === "function") {
      stepActual.afterStep();
    }

    tourActivo = false;
    eliminarElementosTour();

    if (marcarVisto) {
      try {
        localStorage.setItem(TOUR_STORAGE_KEY, "true");
      } catch (e) {}
    }
  }

  function verificarTutorialInicial() {
    try {
      const visto = localStorage.getItem(TOUR_STORAGE_KEY);
      if (!visto) {
        setTimeout(() => {
          iniciarTutorial(false);
        }, 700);
      }
    } catch (e) {}
  }

  // Exportar al ámbito global
  window.iniciarTutorial = iniciarTutorial;
  window.avanzarTutorial = avanzarTutorial;
  window.retrocederTutorial = retrocederTutorial;
  window.finalizarTutorial = finalizarTutorial;
  window.verificarTutorialInicial = verificarTutorialInicial;
})();
