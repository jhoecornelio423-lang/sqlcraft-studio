/**
 * SQLCraft Studio - Editor Module
 * Inicialización de CodeMirror 5, autocompletado, formateador SQL y snippets
 */

function inicializarEditorCodeMirror() {
  const textarea = document.getElementById("sql-editor");
  if (!textarea) return;

  // Extraer nombres de tablas y columnas para autocompletado
  const schemaInfo = typeof obtenerInfoEsquema === "function" ? obtenerInfoEsquema() : [];
  const tablesObj = {};
  schemaInfo.forEach(t => {
    tablesObj[t.nombre] = t.columnas.map(c => c.nombre);
  });

  window.editorCM = CodeMirror.fromTextArea(textarea, {
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
      "Ctrl-Enter": () => typeof window.ejecutarCodigoUsuario === "function" && window.ejecutarCodigoUsuario(),
      "Ctrl-Shift-Enter": () => typeof window.comprobarRespuesta === "function" && window.comprobarRespuesta(),
      "Ctrl-Space": "autocomplete",
      "Ctrl-Alt-F": () => formatearCodigoSQL(),
      "Alt-Right": () => typeof window.navegarEjercicio === "function" && window.navegarEjercicio(1),
      "Alt-Left": () => typeof window.navegarEjercicio === "function" && window.navegarEjercicio(-1)
    }
  });

  // Ajustar tamaño de fuente inicial
  aplicarTamanoFuente(window.editorFontSize || 14);

  // Guardar en tiempo real
  window.editorCM.on("change", () => {
    if (window.modoActual === "practice") {
      const ejercicio = BANCO_EJERCICIOS[window.ejercicioActualIndex];
      if (ejercicio && typeof window.guardarCodigoEjercicio === "function") {
        window.guardarCodigoEjercicio(ejercicio.id, window.editorCM.getValue());
      }
    } else if (window.modoActual === "exam") {
      const examData = typeof window.obtenerExamenActivo === "function" ? window.obtenerExamenActivo() : null;
      if (examData && examData.desafiosPracticos && examData.desafiosPracticos[window.examenRetoPracticoIndex]) {
        const reto = examData.desafiosPracticos[window.examenRetoPracticoIndex];
        window.examenCodigosPracticos[reto.id] = window.editorCM.getValue();
        if (typeof window.guardarProgresoExamenLocal === "function") {
          window.guardarProgresoExamenLocal();
        }
      }
    } else {
      localStorage.setItem("sqlcraft_sandbox_code", window.editorCM.getValue());
    }
  });

  // Autocompletado inteligente mientras escribe palabras clave
  window.editorCM.on("inputRead", (cm, change) => {
    if (change.text[0] && change.text[0].match(/[a-zA-Z_]/)) {
      if (!cm.state.completionActive) {
        CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
      }
    }
  });
}

function aplicarTamanoFuente(size) {
  window.editorFontSize = Math.min(Math.max(size, 11), 22);
  const wrapper = document.querySelector(".CodeMirror");
  if (wrapper) {
    wrapper.style.fontSize = `${window.editorFontSize}px`;
  }
  localStorage.setItem("sqlcraft_fontsize", window.editorFontSize);
}

function formatearCodigoSQL() {
  if (!window.editorCM) return;
  if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
  const raw = window.editorCM.getValue();

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

  window.editorCM.setValue(formatted);
}

function insertarSnippet(codigo) {
  if (!window.editorCM) return;
  window.editorCM.setValue(codigo);
  window.editorCM.focus();
  if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
}

function insertarDesdeChuleta(codigo) {
  insertarSnippet(codigo);
  if (typeof window.cerrarModal === "function") window.cerrarModal("cheatsheet-modal");
}

// Exportar globalmente
window.inicializarEditorCodeMirror = inicializarEditorCodeMirror;
window.aplicarTamanoFuente = aplicarTamanoFuente;
window.formatearCodigoSQL = formatearCodigoSQL;
window.insertarSnippet = insertarSnippet;
window.insertarDesdeChuleta = insertarDesdeChuleta;
