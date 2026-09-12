# ⚡ SQLCraft Studio

> **Plataforma Interactiva de Práctica y Aprendizaje de SQL** impulsada por **SQLite WASM** directamente en el navegador web y sincronización en la nube con **Supabase**.

![SQLCraft Studio Banner](https://img.shields.io/badge/SQLCraft-Studio-06b6d4?style=for-the-badge&logo=sqlite&logoColor=white)
![Retos Disponibles](https://img.shields.io/badge/Retos-120%20Desafíos-10b981?style=for-the-badge)
![Nivel](https://img.shields.io/badge/Dificultad-Básico%20|%20Intermedio%20|%20Avanzado-3b82f6?style=for-the-badge)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Modular%20CSS%20&%20JS-8b5cf6?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-MIT-purple?style=for-the-badge)

---

## 🎯 Características Principales

- **💻 100% Ejecución en Navegador (SQLite WASM):** Sin necesidad de instalar servidores de bases de datos locales pesados; la base de datos corre dentro del navegador web mediante WebAssembly.
- **📚 120 Desafíos Organizados por Secciones y Niveles:**
  - **Sección 1: Consultas SELECT, Alias (AS) y Filtrado (60 Retos):**
    - 20 Básicos: Proyección, `AS`, `DISTINCT`, `WHERE`, operadores de comparación.
    - 20 Intermedios: `AND`, `OR`, `NOT`, `BETWEEN`, `IN`, `LIKE`, comodines `%` y `_`.
    - 20 Avanzados: Precedencia de operadores, ordenamiento múltiple (`ORDER BY`), `LIMIT` y `OFFSET`.
  - **Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL (60 Retos):**
    - 20 Básicos: Fundamentos de `INNER JOIN`, alias de tablas (`AS`), filtrado sobre tablas combinadas.
    - 20 Intermedios: `LEFT JOIN`, `RIGHT JOIN`, simulación de `FULL OUTER JOIN`, combinaciones múltiples.
    - 20 Avanzados: Detección y manejo de `NULL` vs `NOT NULL`, `COALESCE`, `CROSS JOIN` y casos relacionales complejos.
- **📝 Exámenes de Certificación Oficiales:**
  - Evaluaciones completas para cada sección con preguntas teóricas rigurosas y retos prácticos evaluados en vivo.
  - Puntuación automática sobre 100 puntos y opción de reinicio desde cero en cualquier momento.
- **☁️ Autenticación y Sincronización en la Nube (Supabase):**
  - Registro e inicio de sesión seguro.
  - Guarda automáticamente el progreso (retos resueltos, código de cada solución y estadísticas) en Supabase para que los usuarios puedan continuar en cualquier dispositivo sin perder datos.
  - Funciona también en modo **Invitado Offline** con `localStorage`.
- **⚖️ Veredicto Inteligente:**
  - Comprobador automático que evalúa las consultas contra el resultado oficial esperado comprobando columnas, tipos y filas.
  - Sistema de reputación: distingue entre retos resueltos **limpiamente (✅)** y retos resueltos **con ayuda (❌)** si se consultó la respuesta antes de completarlo.
- **🖥️ Paneles Redimensionables:**
  - Ajusta el tamaño de la consola, enunciado, resultado y barra lateral arrastrando divisores interactivos.
- **🧪 Modo Sandbox Libre:**
  - Espacio de juego para experimentar con cualquier consulta SQL personalizada en las tablas `videojuegos`, `clientes` y `ventas`.
- **📖 Chuleta SQL y Atajos de Teclado:**
  - Modal integrado con sintaxis rápida de SQL y atajos como `Ctrl+Enter` para probar y `Ctrl+Shift+Enter` para comprobar.

---

## 🏗️ Estructura del Proyecto

```text
SQL/
├── css/                             # Estilos modulares desacoplados
│   ├── variables.css                # Tokens de diseño y colores
│   ├── base.css                     # Reset universal y tipografía
│   ├── layout.css                   # Header, grid y paneles redimensionables
│   ├── sidebar.css                  # Selector de secciones y lista de retos
│   ├── problem.css                  # Enunciados, etiquetas y modo sandbox
│   ├── editor.css                   # CodeMirror 5 y tema personalizado
│   ├── results.css                  # Tablas SQL, comparativa diff y diagrama ER
│   ├── exam.css                     # Motor de exámenes de certificación
│   ├── modals.css                   # Ventanas modales (chuleta, atajos, auth)
│   ├── responsive.css               # Reglas adaptativas multidispositivo
│   └── main.css                     # Manifiesto central de estilos
├── js/
│   ├── modules/                     # Módulos especializados
│   │   ├── state.js                 # Estado global reactivo y persistencia
│   │   ├── ui.js                    # Paneles, audio, modales y confeti
│   │   ├── editor.js                # CodeMirror, autocompletado y formateador
│   │   ├── results.js               # Tablas, diff, esquema ER y exportación
│   │   ├── practice.js              # Navegación y validador de ejercicios
│   │   └── exam.js                  # Motor de exámenes y calificación
│   ├── db.js                        # SQLite WASM y motor de consultas
│   ├── auth.js                      # Supabase Auth y sincronización en la nube
│   ├── ejercicios.js                # Banco de 120 ejercicios y exámenes
│   └── app.js                       # Orquestador principal del ciclo de vida
├── index.html                       # Interfaz principal
├── tienda.db                        # Base de datos SQLite
├── setup_db.py                      # Script generador de la base de datos
├── supabase_setup.sql               # Esquema y políticas RLS para Supabase
├── nginx.conf                       # Configuración Nginx para Docker
├── Dockerfile                       # Definición de contenedor Docker
└── docker-compose.yml               # Orquestación de contenedores
```

---

## 🚀 Despliegue y Ejecución

### Opción 1: Docker Compose (Recomendado)

```bash
docker compose up -d --build
```
Abre tu navegador en: **`http://localhost:8080`**

### Opción 2: Servidor Local (Python)

```bash
python -m http.server 5173
```
Abre tu navegador en: **`http://localhost:5173`**

---

## 🛠️ Configuración de Supabase (Opcional para Nube)

Si deseas conectar tu propio proyecto de Supabase:
1. Crea un proyecto en [Supabase](https://supabase.com).
2. Ejecuta el script [`supabase_setup.sql`](./supabase_setup.sql) en el **SQL Editor** de tu panel de Supabase.
3. Actualiza tu URL y anon key en [`js/auth.js`](./js/auth.js).

---

## 📦 Tecnologías Utilizadas

- **Frontend:** HTML5 semántico, CSS3 modular (Custom Properties, Flexbox, CSS Grid).
- **Editor de Código:** [CodeMirror 5](https://codemirror.net/) con modo SQL y autocompletado inteligente.
- **Motor de Base de Datos:** [sql.js](https://github.com/sql-js/sql.js/) (SQLite compilado a WebAssembly).
- **Backend & Auth:** [Supabase JS Client v2](https://supabase.com/docs/reference/javascript).
- **Contenedor:** Docker & Nginx Alpine.
