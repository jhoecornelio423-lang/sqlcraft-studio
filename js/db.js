/**
 * Gestor de la Base de Datos SQLite en el Navegador (WebAssembly / sql.js)
 */

let db = null;
let SQL = null;

// Datos iniciales para la base de datos
const INIT_SQL = `
CREATE TABLE videojuegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero TEXT NOT NULL,
    consola TEXT NOT NULL,
    año_lanzamiento INTEGER NOT NULL,
    precio REAL NOT NULL,
    calificacion REAL NOT NULL,
    stock INTEGER NOT NULL,
    desarrollador TEXT NOT NULL,
    fecha_adicion TEXT NOT NULL
);

CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pais TEXT NOT NULL,
    fecha_registro TEXT NOT NULL,
    saldo_cuenta REAL NOT NULL,
    activo INTEGER NOT NULL CHECK (activo IN (0, 1))
);

CREATE TABLE ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    videojuego_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario REAL NOT NULL,
    fecha_venta TEXT NOT NULL,
    metodo_pago TEXT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (videojuego_id) REFERENCES videojuegos(id)
);

INSERT INTO videojuegos (titulo, genero, consola, año_lanzamiento, precio, calificacion, stock, desarrollador, fecha_adicion) VALUES
('The Legend of Zelda: Tears of the Kingdom', 'Aventura', 'Nintendo Switch', 2023, 69.99, 9.6, 25, 'Nintendo', '2023-05-12'),
('Elden Ring', 'Acción RPG', 'PlayStation 5', 2022, 59.99, 9.5, 12, 'FromSoftware', '2022-02-25'),
('Cyberpunk 2077', 'Acción RPG', 'PC', 2020, 29.99, 7.8, 50, 'CD Projekt Red', '2020-12-10'),
('Red Dead Redemption 2', 'Acción Aventura', 'PlayStation 4', 2018, 19.99, 9.7, 30, 'Rockstar Games', '2018-10-26'),
('Grand Theft Auto V', 'Acción', 'PlayStation 4', 2013, 14.99, 9.5, 100, 'Rockstar North', '2015-04-14'),
('Hollow Knight', 'Metroidvania', 'Nintendo Switch', 2017, 14.99, 9.0, 0, 'Team Cherry', '2018-06-12'),
('Minecraft', 'Sandbox', 'PC', 2011, 26.95, 9.0, 150, 'Mojang', '2011-11-18'),
('Portal 2', 'Puzzles', 'PC', 2011, 9.99, 9.8, 5, 'Valve', '2011-04-18'),
('Super Mario Odyssey', 'Plataformas', 'Nintendo Switch', 2017, 59.99, 9.7, 18, 'Nintendo', '2017-10-27'),
('The Witcher 3: Wild Hunt', 'Acción RPG', 'PlayStation 4', 2015, 39.99, 9.8, 40, 'CD Projekt Red', '2015-05-19'),
('God of War Ragnarok', 'Acción Aventura', 'PlayStation 5', 2022, 69.99, 9.4, 15, 'Santa Monica Studio', '2022-11-09'),
('Spider-Man 2', 'Acción', 'PlayStation 5', 2023, 69.99, 9.0, 20, 'Insomniac Games', '2023-10-20'),
('Stardew Valley', 'Simulación', 'PC', 2016, 13.99, 8.9, 80, 'ConcernedApe', '2016-02-26'),
('Celeste', 'Plataformas', 'Nintendo Switch', 2018, 19.99, 9.2, 0, 'Extremely OK Games', '2018-01-25'),
('Hadestown (Hades)', 'Roguelike', 'PC', 2020, 24.99, 9.3, 35, 'Supergiant Games', '2020-09-17'),
('Baldur''s Gate 3', 'Rol', 'PC', 2023, 59.99, 9.6, 60, 'Larian Studios', '2023-08-03'),
('FIFA 23', 'Deportes', 'PlayStation 5', 2022, 49.99, 7.2, 45, 'EA Sports', '2022-09-30'),
('Gran Turismo 7', 'Carreras', 'PlayStation 5', 2022, 59.99, 8.2, 8, 'Polyphony Digital', '2022-03-04'),
('Doom Eternal', 'Disparos', 'PC', 2020, 39.99, 9.0, 14, 'id Software', '2020-03-20'),
('Street Fighter 6', 'Lucha', 'PlayStation 5', 2023, 59.99, 8.8, 10, 'Capcom', '2023-06-02');

INSERT INTO clientes (nombre, apellido, email, pais, fecha_registro, saldo_cuenta, activo) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 'México', '2021-03-15', 45.50, 1),
('María', 'Gómez', 'maria.gomez@email.com', 'España', '2020-11-22', 120.00, 1),
('Carlos', 'López', 'carlos.lopez@email.com', 'Argentina', '2022-01-10', 5.00, 1),
('Ana', 'Martínez', 'ana.martinez@email.com', 'Colombia', '2023-05-02', 0.00, 0),
('Luis', 'Rodríguez', 'luis.rod@email.com', 'México', '2019-08-14', 350.75, 1),
('Laura', 'Sánchez', 'laura.s@email.com', 'España', '2021-07-19', 15.20, 1),
('Pedro', 'Fernández', 'pedro.f@email.com', 'Chile', '2022-10-05', 85.00, 1),
('Sofía', 'Diaz', 'sofia.diaz@email.com', 'México', '2023-02-28', 12.50, 1),
('Diego', 'Alvarez', 'diego.a@email.com', 'Perú', '2020-04-12', 0.00, 1),
('Elena', 'Ruiz', 'elena.ruiz@email.com', 'España', '2021-12-01', 95.40, 0),
('Miguel', 'Torres', 'miguel.t@email.com', 'Colombia', '2022-06-30', 60.00, 1),
('Lucía', 'Morales', 'lucia.m@email.com', 'Argentina', '2023-09-15', 110.50, 1),
('Javier', 'Herrera', 'javier.h@email.com', 'México', '2018-05-20', 500.00, 1),
('Isabel', 'Castro', 'isabel.c@email.com', 'Chile', '2022-03-11', 8.90, 1),
('Andrés', 'Ortiz', 'andres.o@email.com', 'Colombia', '2021-09-24', 25.00, 1);

INSERT INTO ventas (cliente_id, videojuego_id, cantidad, precio_unitario, fecha_venta, metodo_pago) VALUES
(1, 1, 1, 69.99, '2023-05-15', 'Tarjeta'),
(1, 3, 1, 29.99, '2023-06-20', 'PayPal'),
(2, 2, 1, 59.99, '2023-02-28', 'Tarjeta'),
(2, 6, 2, 14.99, '2023-04-10', 'Transferencia'),
(3, 5, 1, 14.99, '2023-01-18', 'Tarjeta'),
(5, 4, 1, 19.99, '2023-03-12', 'PayPal'),
(5, 11, 1, 69.99, '2023-07-04', 'Tarjeta'),
(5, 16, 1, 59.99, '2023-08-15', 'Cripto'),
(6, 7, 2, 26.95, '2023-02-14', 'Tarjeta'),
(7, 8, 1, 9.99, '2023-05-22', 'Transferencia'),
(8, 9, 1, 59.99, '2023-06-01', 'Tarjeta'),
(8, 13, 1, 13.99, '2023-06-15', 'PayPal'),
(10, 10, 1, 39.99, '2023-03-30', 'Tarjeta'),
(11, 1, 1, 69.99, '2023-05-13', 'Tarjeta'),
(11, 12, 1, 69.99, '2023-10-25', 'PayPal'),
(12, 16, 1, 59.99, '2023-08-10', 'Tarjeta'),
(12, 2, 1, 59.99, '2023-09-05', 'Transferencia'),
(13, 1, 1, 69.99, '2023-05-20', 'Tarjeta'),
(13, 15, 2, 24.99, '2023-07-18', 'Cripto'),
(13, 17, 1, 49.99, '2023-11-02', 'Tarjeta'),
(14, 19, 1, 39.99, '2023-04-05', 'PayPal'),
(15, 20, 1, 59.99, '2023-06-12', 'Tarjeta'),
(1, 16, 1, 59.99, '2023-09-01', 'Tarjeta'),
(2, 9, 1, 59.99, '2023-10-10', 'PayPal'),
(5, 1, 1, 69.99, '2023-11-15', 'Tarjeta');
`;

/**
 * Inicializa la base de datos WebAssembly
 */
async function inicializarBaseDeDatos() {
  try {
    if (typeof initSqlJs === 'undefined') {
      throw new Error("No se pudo cargar la librería sql.js. Asegúrate de tener conexión a Internet o los archivos locales.");
    }
    
    SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });
    
    db = new SQL.Database();
    db.run(INIT_SQL);
    console.log("✅ Base de datos SQLite WebAssembly inicializada exitosamente.");
    return { success: true };
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Restaura la base de datos al estado inicial
 */
function restaurarBaseDeDatos() {
  if (!db) return false;
  try {
    db.run(INIT_SQL);
    return true;
  } catch (err) {
    console.error("Error al restaurar base de datos:", err);
    return false;
  }
}

/**
 * Ejecuta una sentencia SQL en la base de datos
 */
function ejecutarConsulta(querySql) {
  if (!db) {
    return { success: false, error: "La base de datos aún no está lista." };
  }
  
  const startTime = performance.now();
  try {
    const queryLimpia = querySql.trim();
    if (!queryLimpia) {
      return { success: false, error: "La consulta está vacía." };
    }
    
    const res = db.exec(queryLimpia);
    const duration = (performance.now() - startTime).toFixed(2);
    
    if (res.length === 0) {
      const rowsModified = typeof db.getRowsModified === 'function' ? db.getRowsModified() : 0;
      return {
        success: true,
        columns: [],
        values: [],
        rowCount: 0,
        rowsModified: rowsModified,
        executionTime: duration,
        empty: true,
        isDml: rowsModified > 0 || /^(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/i.test(queryLimpia)
      };
    }
    
    const resultItem = res[res.length - 1];
    return {
      success: true,
      columns: resultItem.columns,
      values: resultItem.values,
      rowCount: resultItem.values.length,
      executionTime: duration,
      empty: false
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      executionTime: (performance.now() - startTime).toFixed(2)
    };
  }
}

/**
 * Compara minuciosamente el resultado de la consulta del usuario con el resultado esperado
 */
function compararResultados(userResult, expectedResult) {
  if (!userResult.success) {
    return {
      correcto: false,
      mensaje: `❌ Error de sintaxis SQL: ${userResult.error}`,
      tipo: "error_sql"
    };
  }

  if (userResult.empty && !expectedResult.empty) {
    return {
      correcto: false,
      mensaje: "❌ Tu consulta no devolvió ninguna fila, pero la respuesta correcta sí tiene registros.",
      tipo: "vacio"
    };
  }

  // Verificar número de columnas
  if (userResult.columns.length !== expectedResult.columns.length) {
    return {
      correcto: false,
      mensaje: `❌ Discrepancia en columnas: Se esperaban ${expectedResult.columns.length} columna(s) [${expectedResult.columns.join(", ")}], pero tu consulta devolvió ${userResult.columns.length} columna(s) [${userResult.columns.join(", ")}].`,
      tipo: "columnas"
    };
  }

  // Normalizar nombres de columnas
  const colsUser = userResult.columns.map(c => c.toLowerCase().trim());
  const colsExpected = expectedResult.columns.map(c => c.toLowerCase().trim());
  const todasColumnasCoinciden = colsExpected.every(c => colsUser.includes(c));

  // Mapa de índices de columnas
  let mapping = [];
  if (todasColumnasCoinciden) {
    mapping = colsExpected.map(c => colsUser.indexOf(c));
  } else {
    // Si no coinciden exactamente los nombres (ej. agregaciones o alias opcionales), mapear por posición
    mapping = colsExpected.map((_, idx) => idx);
  }

  // Verificar cantidad de filas
  if (userResult.rowCount !== expectedResult.rowCount) {
    return {
      correcto: false,
      mensaje: `❌ Número de filas incorrecto: Se esperaban ${expectedResult.rowCount} fila(s), pero tu consulta devolvió ${userResult.rowCount} fila(s). Revisa tus filtros WHERE, GROUP BY o LIMIT.`,
      tipo: "filas_count"
    };
  }

  // Verificar valores fila por fila con tolerancia numérica
  for (let i = 0; i < expectedResult.values.length; i++) {
    const userRow = userResult.values[i];
    const expRow = expectedResult.values[i];
    
    for (let j = 0; j < expRow.length; j++) {
      const userColIdx = mapping[j];
      const valUser = userRow[userColIdx];
      const valExp = expRow[j];
      
      if (valExp === null || valUser === null) {
        if (valExp !== valUser) {
          return {
            correcto: false,
            mensaje: `❌ Discrepancia en fila ${i + 1}: Se esperaba NULL pero se obtuvo "${valUser}".`,
            tipo: "valores"
          };
        }
        continue;
      }

      const numUser = parseFloat(valUser);
      const numExp = parseFloat(valExp);
      const ambosNumeros = !isNaN(numUser) && !isNaN(numExp) && typeof valExp === 'number';

      if (ambosNumeros) {
        if (Math.abs(numExp - numUser) > 0.05) {
          return {
            correcto: false,
            mensaje: `❌ Valor numérico distinto en fila ${i + 1}, columna "${expectedResult.columns[j]}". Esperado: ${valExp}, tu resultado: ${valUser}.`,
            tipo: "valores"
          };
        }
      } else if (String(valUser).trim().toLowerCase() !== String(valExp).trim().toLowerCase()) {
        return {
          correcto: false,
          mensaje: `❌ Los valores no coinciden en la fila ${i + 1}, columna "${expectedResult.columns[j]}". Se esperaba "${valExp}" y se obtuvo "${valUser}". Revisa el filtrado o el ORDER BY.`,
          tipo: "valores"
        };
      }
    }
  }

  return {
    correcto: true,
    mensaje: "🎉 ¡Excelente trabajo! Tu consulta SQL es 100% correcta y los resultados coinciden a la perfección.",
    tipo: "exito"
  };
}

/**
 * Obtiene la información del esquema para el visor lateral y diagrama
 */
function obtenerInfoEsquema() {
  return [
    {
      nombre: "videojuegos",
      icono: "🎮",
      descripcion: "Inventario de títulos disponibles",
      totalFilas: 20,
      columnas: [
        { nombre: "id", tipo: "INTEGER", clave: "PK" },
        { nombre: "titulo", tipo: "TEXT", clave: "" },
        { nombre: "genero", tipo: "TEXT", clave: "" },
        { nombre: "consola", tipo: "TEXT", clave: "" },
        { nombre: "año_lanzamiento", tipo: "INTEGER", clave: "" },
        { nombre: "precio", tipo: "REAL", clave: "" },
        { nombre: "calificacion", tipo: "REAL", clave: "" },
        { nombre: "stock", tipo: "INTEGER", clave: "" },
        { nombre: "desarrollador", tipo: "TEXT", clave: "" },
        { nombre: "fecha_adicion", tipo: "TEXT (YYYY-MM-DD)", clave: "" }
      ]
    },
    {
      nombre: "clientes",
      icono: "👥",
      descripcion: "Usuarios registrados en la plataforma",
      totalFilas: 15,
      columnas: [
        { nombre: "id", tipo: "INTEGER", clave: "PK" },
        { nombre: "nombre", tipo: "TEXT", clave: "" },
        { nombre: "apellido", tipo: "TEXT", clave: "" },
        { nombre: "email", tipo: "TEXT", clave: "UNIQUE" },
        { nombre: "pais", tipo: "TEXT", clave: "" },
        { nombre: "fecha_registro", tipo: "TEXT (YYYY-MM-DD)", clave: "" },
        { nombre: "saldo_cuenta", tipo: "REAL", clave: "" },
        { nombre: "activo", tipo: "INTEGER (1 / 0)", clave: "" }
      ]
    },
    {
      nombre: "ventas",
      icono: "🛒",
      descripcion: "Registro de transacciones de compra",
      totalFilas: 25,
      columnas: [
        { nombre: "id", tipo: "INTEGER", clave: "PK" },
        { nombre: "cliente_id", tipo: "INTEGER", clave: "FK -> clientes.id" },
        { nombre: "videojuego_id", tipo: "INTEGER", clave: "FK -> videojuegos.id" },
        { nombre: "cantidad", tipo: "INTEGER", clave: "" },
        { nombre: "precio_unitario", tipo: "REAL", clave: "" },
        { nombre: "fecha_venta", tipo: "TEXT (YYYY-MM-DD)", clave: "" },
        { nombre: "metodo_pago", tipo: "TEXT", clave: "" }
      ]
    }
  ];
}
