/**
 * SQLCraft Studio - Results & Schema Viewer Module
 * Renderizado de tablas SQL, comparativa diff, visor de esquema ER, historial y exportación
 */

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
  const userTableContainer = document.getElementById("user-table-container");
  if (userTableContainer) {
    userTableContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⌨️</div>
        <p>Escribe tu consulta SQL arriba y presiona <strong>Probar</strong> o <strong>Comprobar</strong>.</p>
      </div>
    `;
  }
}

function renderizarTablaVacia(msg) {
  const userTableContainer = document.getElementById("user-table-container");
  if (userTableContainer) {
    userTableContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <p>${escapeHtml(msg)}</p>
      </div>
    `;
  }
}

function mostrarBanner(tipo, mensaje) {
  const container = document.getElementById("status-banner-container");
  if (!container) return;
  const icon = tipo === "success" ? "🎉" : tipo === "error" ? "❌" : "ℹ️";
  container.innerHTML = `
    <div class="status-banner ${tipo}">
      <span class="status-icon">${icon}</span>
      <span class="status-text">${mensaje}</span>
    </div>
  `;
}

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

function cambiarTab(tab) {
  window.tabActiva = tab;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`tab-btn-${tab}`);
  if (btn) btn.classList.add("active");

  const paneles = ["resultado", "esperado", "comparar", "esquema", "historial"];
  paneles.forEach(p => {
    const el = document.getElementById(`panel-${p}`);
    if (el) el.style.display = p === tab ? "block" : "none";
  });

  if (tab === "esperado" && window.modoActual === "practice") {
    const ejercicio = BANCO_EJERCICIOS[window.ejercicioActualIndex];
    if (ejercicio && typeof ejecutarConsulta === "function") {
      const expRes = ejecutarConsulta(ejercicio.queryEsperada);
      window.ultimoResultadoEsperado = expRes;
      renderizarTabla("expected-table-container", expRes);
    }
  } else if (tab === "comparar" && window.modoActual === "practice") {
    renderizarComparativa();
  } else if (tab === "historial") {
    renderizarHistorial();
  }
}

function renderizarComparativa() {
  const userContainer = document.getElementById("diff-user-table-container");
  const expContainer = document.getElementById("diff-expected-table-container");
  const userMeta = document.getElementById("diff-user-meta");
  const expMeta = document.getElementById("diff-expected-meta");

  if (!userContainer || !expContainer) return;

  if (!window.ultimoResultadoUsuario) {
    userContainer.innerHTML = `<div class="empty-state"><p>Aún no has ejecutado ninguna consulta.</p></div>`;
    if (userMeta) userMeta.textContent = "Sin datos";
  } else {
    if (userMeta) {
      userMeta.textContent = `${window.ultimoResultadoUsuario.rowCount || 0} filas (${window.ultimoResultadoUsuario.columns ? window.ultimoResultadoUsuario.columns.length : 0} cols)`;
    }
    renderizarTabla("diff-user-table-container", window.ultimoResultadoUsuario);
  }

  const ejercicio = BANCO_EJERCICIOS[window.ejercicioActualIndex];
  if (ejercicio && typeof ejecutarConsulta === "function") {
    const expRes = ejecutarConsulta(ejercicio.queryEsperada);
    window.ultimoResultadoEsperado = expRes;
    if (expMeta) {
      expMeta.textContent = `${expRes.rowCount || 0} filas (${expRes.columns.length} cols)`;
    }
    renderizarTabla("diff-expected-table-container", expRes);
  }
}

function renderizarVisorEsquema() {
  const container = document.getElementById("schema-grid-container");
  if (!container || typeof obtenerInfoEsquema !== "function") return;
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
  if (typeof ejecutarConsulta !== "function") return;
  const res = ejecutarConsulta(`SELECT * FROM ${nombreTabla} LIMIT 10;`);
  mostrarBanner("info", `Vista previa de 10 filas de la tabla '${nombreTabla}':`);
  renderizarTabla("user-table-container", res);
  actualizarInsigniasFilas(res.rowCount, null);
}

function registrarEnHistorial(query, success, time, rowCount) {
  window.historialConsultas.unshift({
    query,
    success,
    time,
    rowCount: rowCount || 0,
    timestamp: new Date().toLocaleTimeString()
  });

  if (window.historialConsultas.length > 30) window.historialConsultas.pop();
  const counter = document.getElementById("history-counter");
  if (counter) counter.textContent = window.historialConsultas.length;
}

function renderizarHistorial() {
  const container = document.getElementById("history-list");
  if (!container) return;

  if (window.historialConsultas.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No has ejecutado consultas en esta sesión.</p></div>`;
    return;
  }

  let html = "";
  window.historialConsultas.forEach((item, idx) => {
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
  const item = window.historialConsultas[idx];
  if (item && window.editorCM) {
    window.editorCM.setValue(item.query);
    window.editorCM.focus();
    if (typeof window.reproducirSonido === "function") window.reproducirSonido("click");
  }
}

function exportarCSV() {
  if (!window.ultimoResultadoUsuario || !window.ultimoResultadoUsuario.columns || window.ultimoResultadoUsuario.columns.length === 0) {
    mostrarBanner("info", "No hay resultados para exportar. Ejecuta una consulta primero.");
    return;
  }

  const cols = window.ultimoResultadoUsuario.columns;
  const rows = window.ultimoResultadoUsuario.values;

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

function copiarJSON() {
  if (!window.ultimoResultadoUsuario || !window.ultimoResultadoUsuario.columns) {
    mostrarBanner("info", "No hay resultados para copiar. Ejecuta una consulta primero.");
    return;
  }

  const cols = window.ultimoResultadoUsuario.columns;
  const rows = window.ultimoResultadoUsuario.values;
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

// Exportar globalmente
window.renderizarTabla = renderizarTabla;
window.limpiarTablaResultados = limpiarTablaResultados;
window.renderizarTablaVacia = renderizarTablaVacia;
window.mostrarBanner = mostrarBanner;
window.actualizarInsigniasFilas = actualizarInsigniasFilas;
window.cambiarTab = cambiarTab;
window.renderizarComparativa = renderizarComparativa;
window.renderizarVisorEsquema = renderizarVisorEsquema;
window.previsualizarTabla = previsualizarTabla;
window.registrarEnHistorial = registrarEnHistorial;
window.renderizarHistorial = renderizarHistorial;
window.cargarDesdeHistorial = cargarDesdeHistorial;
window.exportarCSV = exportarCSV;
window.copiarJSON = copiarJSON;
