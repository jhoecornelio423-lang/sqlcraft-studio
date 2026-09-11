// ====================================================================
// SQLCraft Studio - Módulo de Autenticación y Sincronización con Supabase
// ====================================================================

const SUPABASE_CONFIG = {
  url: "https://qrxoporukcrtrtpznpkg.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyeG9wb3J1a2NydHJ0cHpucGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNTc2MjEsImV4cCI6MjEwNDczMzYyMX0.6Gj6Hu3kSLFvrqzsd1Hi4RmUKik0mqvWoCkCK61WdDo"
};

let supabaseClient = null;
let sesionUsuarioActual = null;
let ultimoUserIdSincronizado = null;
let timerDebounceSincronizacion = null;

// Inicialización del Cliente Supabase y escucha de estado de sesión
function inicializarSupabaseAuth() {
  if (window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  } else {
    console.warn("Librería de Supabase no cargada desde CDN.");
    return;
  }

  // Escuchar cambios de sesión en tiempo real
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    sesionUsuarioActual = session ? session.user : null;
    actualizarBarraUsuario(sesionUsuarioActual);

    if (event === "SIGNED_IN" && sesionUsuarioActual) {
      // Evitar relanzar sincronizaciones completas si es la misma sesión activa al enfocar pestaña
      if (ultimoUserIdSincronizado !== sesionUsuarioActual.id) {
        ultimoUserIdSincronizado = sesionUsuarioActual.id;
        mostrarNotificacionAuth("success", `¡Sesión iniciada como ${obtenerNombreUsuario(sesionUsuarioActual)}!`);
        await sincronizarAlIniciarSesion(sesionUsuarioActual);
      }
    } else if (event === "SIGNED_OUT") {
      ultimoUserIdSincronizado = null;
      mostrarNotificacionAuth("info", "Sesión cerrada. Ahora estás en modo invitado.");
    }
  });

  // Verificar sesión activa inicial
  supabaseClient.auth.getSession().then(({ data: { session }, error }) => {
    if (!error && session) {
      sesionUsuarioActual = session.user;
      ultimoUserIdSincronizado = session.user.id;
      actualizarBarraUsuario(sesionUsuarioActual);
      sincronizarAlIniciarSesion(sesionUsuarioActual);
    }
  });

  configurarFormulariosAuth();
}

// Obtener nombre presentable del usuario
function obtenerNombreUsuario(user) {
  if (!user) return "Invitado";
  const meta = user.user_metadata || {};
  if (meta.nombre && meta.nombre.trim()) return meta.nombre.trim();
  if (user.email) return user.email.split("@")[0];
  return "Colega SQL";
}

// Actualizar componentes visuales de la cabecera
function actualizarBarraUsuario(user) {
  const btnTrigger = document.getElementById("btn-open-auth-modal");
  const capsule = document.getElementById("user-profile-capsule");
  const nameEl = document.getElementById("user-display-name");
  const avatarEl = document.getElementById("user-avatar-initials");

  if (!btnTrigger || !capsule) return;

  if (user) {
    btnTrigger.style.display = "none";
    capsule.style.display = "inline-flex";

    const nombre = obtenerNombreUsuario(user);
    if (nameEl) nameEl.textContent = nombre;
    if (avatarEl) {
      const iniciales = nombre.substring(0, 2).toUpperCase();
      avatarEl.textContent = iniciales;
    }
    const currentIndicator = document.getElementById("sync-status-indicator");
    if (!currentIndicator || (!currentIndicator.classList.contains("status-syncing") && !currentIndicator.classList.contains("status-synced"))) {
      actualizarEstadoSincronizacion("synced", "Nube activa");
    }
  } else {
    btnTrigger.style.display = "inline-flex";
    capsule.style.display = "none";
  }
}

// Indicador de sincronización en tiempo real
function actualizarEstadoSincronizacion(estado, texto) {
  const ind = document.getElementById("sync-status-indicator");
  const txt = document.getElementById("sync-status-text");
  if (!ind || !txt) return;

  ind.className = `sync-status-indicator status-${estado}`;
  txt.textContent = texto;
}

// Sincronización inteligente al iniciar sesión (Merge Nube + Local)
async function sincronizarAlIniciarSesion(user) {
  if (!supabaseClient || !user) return;
  actualizarEstadoSincronizacion("syncing", "Sincronizando...");

  try {
    // 1. Consultar progreso existente en Supabase
    const { data, error } = await supabaseClient
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.warn("Aviso al consultar user_progress en Supabase:", error);
    }

    let nubeResueltos = [];
    let nubeAyudados = [];
    let nubeCodigos = {};

    if (data) {
      nubeResueltos = Array.isArray(data.resueltos) ? data.resueltos : [];
      nubeAyudados = Array.isArray(data.ayudados) ? data.ayudados : [];
      nubeCodigos = (typeof data.codigos_guardados === "object" && data.codigos_guardados !== null) 
        ? data.codigos_guardados 
        : {};
    }

    // 2. Unir (Merge) con el progreso local actual (sin perder nada de lo que resolvió previamente)
    let huboCambios = false;

    nubeResueltos.forEach(id => {
      if (!ejerciciosResueltos.has(id)) {
        ejerciciosResueltos.add(id);
        huboCambios = true;
      }
    });

    nubeAyudados.forEach(id => {
      if (!ejerciciosAyudados.has(id)) {
        ejerciciosAyudados.add(id);
        huboCambios = true;
      }
    });

    // Códigos de retos guardados
    Object.keys(nubeCodigos).forEach(idKey => {
      const localCode = obtenerCodigoGuardado(idKey);
      if (!localCode && nubeCodigos[idKey]) {
        guardarCodigoEjercicio(idKey, nubeCodigos[idKey]);
      }
    });

    // 3. Subir el resultado unificado a Supabase
    const codigosLocales = {};
    BANCO_EJERCICIOS.forEach(ej => {
      const c = obtenerCodigoGuardado(ej.id);
      if (c && c.trim()) {
        codigosLocales[ej.id] = c;
      }
    });

    const payload = {
      user_id: user.id,
      email: user.email,
      nombre: obtenerNombreUsuario(user),
      resueltos: [...ejerciciosResueltos],
      ayudados: [...ejerciciosAyudados],
      codigos_guardados: codigosLocales,
      ultimo_ejercicio: ejercicioActualIndex,
      updated_at: new Date().toISOString()
    };

    const { error: upsertErr } = await supabaseClient
      .from("user_progress")
      .upsert(payload, { onConflict: "user_id" });

    if (upsertErr) {
      console.warn("Aviso al guardar progreso en Supabase (¿Se ejecutó supabase_setup.sql?):", upsertErr.message);
      actualizarEstadoSincronizacion("warning", "Offline");
    } else {
      actualizarEstadoSincronizacion("synced", "Sincronizado");
    }

    // 4. Guardar en localStorage y actualizar la vista
    guardarProgreso();
    renderizarListaEjercicios();
    actualizarEstadisticas();
    cargarEjercicio(ejercicioActualIndex);

  } catch (err) {
    console.error("Error al sincronizar con Supabase:", err);
    actualizarEstadoSincronizacion("error", "Error sincronización");
  }
}

// Sincronizar un reto completado o cambio en la nube (con debounce)
function sincronizarProgresoConNube() {
  if (!supabaseClient || !sesionUsuarioActual) return;

  if (timerDebounceSincronizacion) {
    clearTimeout(timerDebounceSincronizacion);
  }

  actualizarEstadoSincronizacion("syncing", "Guardando...");

  timerDebounceSincronizacion = setTimeout(async () => {
    try {
      const codigosLocales = {};
      BANCO_EJERCICIOS.forEach(ej => {
        const c = obtenerCodigoGuardado(ej.id);
        if (c && c.trim()) {
          codigosLocales[ej.id] = c;
        }
      });

      const payload = {
        user_id: sesionUsuarioActual.id,
        email: sesionUsuarioActual.email,
        nombre: obtenerNombreUsuario(sesionUsuarioActual),
        resueltos: [...ejerciciosResueltos],
        ayudados: [...ejerciciosAyudados],
        codigos_guardados: codigosLocales,
        ultimo_ejercicio: ejercicioActualIndex,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabaseClient
        .from("user_progress")
        .upsert(payload, { onConflict: "user_id" });

      if (error) {
        console.warn("Aviso de guardado en la nube:", error.message);
        actualizarEstadoSincronizacion("warning", "Offline");
      } else {
        actualizarEstadoSincronizacion("synced", "Nube activa");
      }
    } catch (e) {
      console.error("Fallo al guardar en nube:", e);
      actualizarEstadoSincronizacion("error", "Error sync");
    }
  }, 1000);
}

// Configuración de eventos en el Modal de Autenticación
function configurarFormulariosAuth() {
  // Pestañas Login vs Registro
  const tabLogin = document.getElementById("auth-tab-login");
  const tabRegister = document.getElementById("auth-tab-register");
  const formLogin = document.getElementById("form-auth-login");
  const formRegister = document.getElementById("form-auth-register");

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      if (formLogin) formLogin.style.display = "flex";
      if (formRegister) formRegister.style.display = "none";
      limpiarAlertasAuth();
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      if (formLogin) formLogin.style.display = "none";
      if (formRegister) formRegister.style.display = "flex";
      limpiarAlertasAuth();
    });
  }

  // Submit Login
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-password").value;
      const btn = document.getElementById("btn-submit-login");

      if (!email || !pass) {
        mostrarAlertaAuth("login", "Por favor completa todos los campos.");
        return;
      }

      btn.disabled = true;
      btn.textContent = "Iniciando sesión...";

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: pass
      });

      btn.disabled = false;
      btn.textContent = "Iniciar Sesión";

      if (error) {
        let msg = error.message;
        if (msg.includes("Invalid login credentials")) {
          msg = "Correo o contraseña incorrectos.";
        } else if (msg.includes("Email not confirmed")) {
          msg = "El correo aún no ha sido confirmado. Puedes confirmarlo en tu bandeja o pedirle al administrador que desactive 'Confirm email' en Supabase.";
        }
        mostrarAlertaAuth("login", msg);
      } else {
        cerrarModal("modal-auth");
      }
    });
  }

  // Submit Registro
  if (formRegister) {
    formRegister.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("reg-nombre").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const pass = document.getElementById("reg-password").value;
      const btn = document.getElementById("btn-submit-register");

      if (!email || !pass || !nombre) {
        mostrarAlertaAuth("register", "Por favor completa todos los campos.");
        return;
      }

      if (pass.length < 6) {
        mostrarAlertaAuth("register", "La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      btn.disabled = true;
      btn.textContent = "Creando cuenta...";

      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: pass,
        options: {
          data: {
            nombre: nombre
          }
        }
      });

      btn.disabled = false;
      btn.textContent = "Crear Mi Cuenta";

      if (error) {
        mostrarAlertaAuth("register", error.message);
      } else {
        if (data.session) {
          // Confirmación automática activada en Supabase
          mostrarAlertaAuth("register", "¡Cuenta creada y sesión iniciada con éxito!", "success");
          setTimeout(() => cerrarModal("modal-auth"), 1000);
        } else {
          // Requiere confirmación por correo
          mostrarAlertaAuth("register", "¡Cuenta creada! Revisa tu correo electrónico para confirmar tu cuenta y luego inicia sesión.", "success");
        }
      }
    });
  }

  // Botón Cerrar Sesión
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      if (confirm("¿Seguro que deseas cerrar sesión? Tu progreso en la nube ya está a salvo.")) {
        if (supabaseClient) {
          await supabaseClient.auth.signOut();
        }
      }
    });
  }

  // Abrir modal de autenticación
  const btnOpenAuth = document.getElementById("btn-open-auth-modal");
  if (btnOpenAuth) {
    btnOpenAuth.addEventListener("click", () => {
      limpiarAlertasAuth();
      abrirModal("modal-auth");
    });
  }
}

// Helpers de mensajes de alerta en el modal
function mostrarAlertaAuth(tipoForm, mensaje, clase = "error") {
  const container = document.getElementById(`auth-alert-${tipoForm}`);
  if (container) {
    container.className = `auth-form-alert alert-${clase}`;
    container.textContent = mensaje;
    container.style.display = "block";
  }
}

function limpiarAlertasAuth() {
  ["login", "register"].forEach(t => {
    const c = document.getElementById(`auth-alert-${t}`);
    if (c) {
      c.textContent = "";
      c.style.display = "none";
    }
  });
}

function mostrarNotificacionAuth(tipo, mensaje) {
  if (typeof mostrarBanner === "function") {
    mostrarBanner(tipo === "success" ? "success" : "info", mensaje);
  }
}

// Exponer funciones en ventana global
window.inicializarSupabaseAuth = inicializarSupabaseAuth;
window.sincronizarProgresoConNube = sincronizarProgresoConNube;
