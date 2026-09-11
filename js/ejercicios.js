// Banco de 90 Ejercicios Interactivos SQL (30 Básico, 30 Intermedio, 30 Avanzado)
const BANCO_EJERCICIOS = [
  {
    "id": 1,
    "modulo": "Módulo 1: Proyección y Alias",
    "nivel": "Básico",
    "tags": [
      "SELECT"
    ],
    "titulo": "1. Catálogo general de videojuegos",
    "descripcion": "Obtén el <strong>titulo</strong>, la <strong>consola</strong> y el <strong>precio</strong> de todos los videojuegos disponibles en la tabla <code>videojuegos</code>.",
    "queryEsperada": "SELECT titulo, consola, precio FROM videojuegos;",
    "pistas": [
      "Especifica las tres columnas separadas por coma.",
      "Tabla: videojuegos."
    ],
    "explicacion": "La cláusula SELECT proyecta columnas específicas reduciendo el tráfico de datos."
  },
  {
    "id": 2,
    "modulo": "Módulo 1: Proyección y Alias",
    "nivel": "Básico",
    "tags": [
      "SELECT"
    ],
    "titulo": "2. Directorio de clientes",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>email</strong> de todos los clientes de la tabla <code>clientes</code>.",
    "queryEsperada": "SELECT nombre, apellido, email FROM clientes;",
    "pistas": [
      "Selecciona las columnas solicitadas de clientes."
    ],
    "explicacion": "Permite extraer información de contacto básica de los usuarios."
  },
  {
    "id": 3,
    "modulo": "Módulo 1: Proyección y Alias",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "*"
    ],
    "titulo": "3. Inventario completo con comodín (*)",
    "descripcion": "Extrae todos los campos y registros de la tabla <code>videojuegos</code> utilizando el asterisco (<code>*</code>).",
    "queryEsperada": "SELECT * FROM videojuegos;",
    "pistas": [
      "Usa SELECT * FROM videojuegos;"
    ],
    "explicacion": "El asterisco (*) devuelve todas las columnas de la tabla origen."
  },
  {
    "id": 4,
    "modulo": "Módulo 1: Proyección y Alias",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "AS"
    ],
    "titulo": "4. Renombrando columnas con alias (AS)",
    "descripcion": "Selecciona el <strong>titulo</strong> renombrado como <code>nombre_juego</code> y el <strong>precio</strong> renombrado como <code>precio_dolares</code> de la tabla <code>videojuegos</code>.",
    "queryEsperada": "SELECT titulo AS nombre_juego, precio AS precio_dolares FROM videojuegos;",
    "pistas": [
      "Usa la palabra clave AS para renombrar cada columna."
    ],
    "explicacion": "AS asigna un alias legible en el resultado sin alterar el esquema de la tabla."
  },
  {
    "id": 5,
    "modulo": "Módulo 1: Proyección y Alias",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "AS"
    ],
    "titulo": "5. Billetera virtual de clientes",
    "descripcion": "Obtén el <strong>email</strong> y el <strong>saldo_cuenta</strong> renombrado como <code>saldo_disponible</code> de todos los clientes.",
    "queryEsperada": "SELECT email, saldo_cuenta AS saldo_disponible FROM clientes;",
    "pistas": [
      "SELECT email, saldo_cuenta AS saldo_disponible FROM clientes;"
    ],
    "explicacion": "Útil para adecuar los nombres de columnas a interfaces de usuario."
  },
  {
    "id": 6,
    "modulo": "Módulo 1: Proyección y Alias",
    "nivel": "Básico",
    "tags": [
      "SELECT"
    ],
    "titulo": "6. Registro resumido de ventas",
    "descripcion": "Muestra el <strong>id</strong>, <strong>cantidad</strong>, <strong>precio_unitario</strong> y <strong>metodo_pago</strong> de la tabla <code>ventas</code>.",
    "queryEsperada": "SELECT id, cantidad, precio_unitario, metodo_pago FROM ventas;",
    "pistas": [
      "Selecciona los 4 campos solicitados de la tabla ventas."
    ],
    "explicacion": "Proyecta los datos clave de cada transacción comercial."
  },
  {
    "id": 7,
    "modulo": "Módulo 2: Valores Únicos (DISTINCT)",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "titulo": "7. Consolas disponibles sin duplicados",
    "descripcion": "Obtén una lista única de todas las <strong>consolas</strong> para las cuales hay juegos registrados en la tienda.",
    "queryEsperada": "SELECT DISTINCT consola FROM videojuegos;",
    "pistas": [
      "Coloca DISTINCT justo después de SELECT."
    ],
    "explicacion": "DISTINCT remueve registros duplicados en el conjunto de resultados."
  },
  {
    "id": 8,
    "modulo": "Módulo 2: Valores Únicos (DISTINCT)",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "titulo": "8. Países de procedencia de clientes",
    "descripcion": "Muestra la lista de <strong>países</strong> únicos de donde provienen los clientes registrados.",
    "queryEsperada": "SELECT DISTINCT pais FROM clientes;",
    "pistas": [
      "SELECT DISTINCT pais FROM clientes;"
    ],
    "explicacion": "Permite conocer la cobertura geográfica sin repeticiones."
  },
  {
    "id": 9,
    "modulo": "Módulo 2: Valores Únicos (DISTINCT)",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "titulo": "9. Géneros temáticos en inventario",
    "descripcion": "Obtén la lista sin duplicados de todos los <strong>géneros</strong> de videojuegos disponibles en la tienda.",
    "queryEsperada": "SELECT DISTINCT genero FROM videojuegos;",
    "pistas": [
      "Aplica DISTINCT sobre la columna genero."
    ],
    "explicacion": "Devuelve las categorías de juegos existentes en la tienda."
  },
  {
    "id": 10,
    "modulo": "Módulo 2: Valores Únicos (DISTINCT)",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "titulo": "10. Estudios de desarrollo asociados",
    "descripcion": "Consulta la lista única de <strong>desarrolladores</strong> que han creado los juegos de nuestro catálogo.",
    "queryEsperada": "SELECT DISTINCT desarrollador FROM videojuegos;",
    "pistas": [
      "SELECT DISTINCT desarrollador FROM videojuegos;"
    ],
    "explicacion": "Identifica a todos los creadores y publishers registrados."
  },
  {
    "id": 11,
    "modulo": "Módulo 2: Valores Únicos (DISTINCT)",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "titulo": "11. Métodos de pago aceptados en compras",
    "descripcion": "Muestra los diferentes métodos de pago (<strong>metodo_pago</strong>) que han sido utilizados en la tabla <code>ventas</code> sin duplicados.",
    "queryEsperada": "SELECT DISTINCT metodo_pago FROM ventas;",
    "pistas": [
      "SELECT DISTINCT metodo_pago FROM ventas;"
    ],
    "explicacion": "Determina qué formas de pago han tenido actividad real."
  },
  {
    "id": 12,
    "modulo": "Módulo 3: Ordenación (ORDER BY)",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "ASC"
    ],
    "titulo": "12. Directorio telefónico por apellido",
    "descripcion": "Muestra el <strong>nombre</strong> y <strong>apellido</strong> de los clientes ordenados alfabéticamente por su apellido de la A a la Z.",
    "queryEsperada": "SELECT nombre, apellido FROM clientes ORDER BY apellido ASC;",
    "pistas": [
      "Usa ORDER BY apellido ASC al final de la consulta."
    ],
    "explicacion": "ORDER BY ordena los resultados de forma ascendente (ASC) o descendente (DESC)."
  },
  {
    "id": 13,
    "modulo": "Módulo 3: Ordenación (ORDER BY)",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "DESC"
    ],
    "titulo": "13. Juegos ordenados por precio descendente",
    "descripcion": "Muestra el <strong>titulo</strong> y el <strong>precio</strong> de todos los videojuegos, ordenados desde el más caro al más barato.",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos ORDER BY precio DESC;",
    "pistas": [
      "Usa ORDER BY precio DESC."
    ],
    "explicacion": "Permite clasificar productos por valor económico."
  },
  {
    "id": 14,
    "modulo": "Módulo 3: Ordenación (ORDER BY)",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "DESC"
    ],
    "titulo": "14. Ranking de videojuegos por calificación",
    "descripcion": "Obtén el <strong>titulo</strong> y la <strong>calificacion</strong> de los juegos ordenados de mayor a menor puntuación.",
    "queryEsperada": "SELECT titulo, calificacion FROM videojuegos ORDER BY calificacion DESC;",
    "pistas": [
      "ORDER BY calificacion DESC."
    ],
    "explicacion": "Excelente para mostrar las recomendaciones más aclamadas por la crítica."
  },
  {
    "id": 15,
    "modulo": "Módulo 3: Ordenación (ORDER BY)",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "ASC"
    ],
    "titulo": "15. Clientes por antigüedad de registro",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>fecha_registro</strong> de los clientes ordenados desde el más antiguo al más reciente.",
    "queryEsperada": "SELECT nombre, apellido, fecha_registro FROM clientes ORDER BY fecha_registro ASC;",
    "pistas": [
      "ORDER BY fecha_registro ASC."
    ],
    "explicacion": "Las fechas en formato ISO se ordenan cronológicamente con ASC."
  },
  {
    "id": 16,
    "modulo": "Módulo 3: Ordenación (ORDER BY)",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "MÚLTIPLE"
    ],
    "titulo": "16. Ordenación compuesta por género y título",
    "descripcion": "Lista el <strong>genero</strong> y el <strong>titulo</strong> de todos los videojuegos ordenados alfabéticamente por género y, en caso de empate, alfabéticamente por título.",
    "queryEsperada": "SELECT genero, titulo FROM videojuegos ORDER BY genero ASC, titulo ASC;",
    "pistas": [
      "Separa las columnas en ORDER BY con comas: ORDER BY genero ASC, titulo ASC."
    ],
    "explicacion": "SQL permite ordenar por múltiples columnas jerárquicamente."
  },
  {
    "id": 17,
    "modulo": "Módulo 3: Ordenación (ORDER BY)",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "DESC"
    ],
    "titulo": "17. Ventas recientes primero",
    "descripcion": "Muestra el <strong>id</strong>, <strong>fecha_venta</strong> y <strong>precio_unitario</strong> de las ventas ordenadas cronológicamente desde la más reciente a la más antigua.",
    "queryEsperada": "SELECT id, fecha_venta, precio_unitario FROM ventas ORDER BY fecha_venta DESC;",
    "pistas": [
      "ORDER BY fecha_venta DESC."
    ],
    "explicacion": "Permite auditar las últimas operaciones comerciales."
  },
  {
    "id": 18,
    "modulo": "Módulo 4: Límites y Paginación (LIMIT)",
    "nivel": "Básico",
    "tags": [
      "LIMIT",
      "ORDER BY"
    ],
    "titulo": "18. Top 5 videojuegos con más stock",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>consola</strong> y <strong>stock</strong> de los 5 videojuegos con mayor cantidad de unidades en almacén.",
    "queryEsperada": "SELECT titulo, consola, stock FROM videojuegos ORDER BY stock DESC LIMIT 5;",
    "pistas": [
      "Combina ORDER BY stock DESC con LIMIT 5."
    ],
    "explicacion": "LIMIT restringe el número de filas entregadas por la consulta."
  },
  {
    "id": 19,
    "modulo": "Módulo 4: Límites y Paginación (LIMIT)",
    "nivel": "Básico",
    "tags": [
      "LIMIT",
      "ORDER BY"
    ],
    "titulo": "19. Los 3 clientes con mayor saldo",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong> de los 3 clientes con más fondos en su cuenta.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta FROM clientes ORDER BY saldo_cuenta DESC LIMIT 3;",
    "pistas": [
      "ORDER BY saldo_cuenta DESC LIMIT 3."
    ],
    "explicacion": "Ideal para identificar a los clientes con mayor capacidad de compra inmediata."
  },
  {
    "id": 20,
    "modulo": "Módulo 4: Límites y Paginación (LIMIT)",
    "nivel": "Básico",
    "tags": [
      "LIMIT",
      "OFFSET"
    ],
    "titulo": "20. Segundo y tercer juego más caros (OFFSET)",
    "descripcion": "Obtén el <strong>titulo</strong> y el <strong>precio</strong> del segundo y tercer juego más caros del catálogo (omitiendo el primero).",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos ORDER BY precio DESC LIMIT 2 OFFSET 1;",
    "pistas": [
      "Usa LIMIT 2 OFFSET 1 tras ordenar descendentemente."
    ],
    "explicacion": "OFFSET salta filas iniciales para construir paginadores web."
  },
  {
    "id": 21,
    "modulo": "Módulo 4: Límites y Paginación (LIMIT)",
    "nivel": "Básico",
    "tags": [
      "LIMIT"
    ],
    "titulo": "21. Primeras 4 ventas registradas",
    "descripcion": "Consulta el <strong>id</strong>, <strong>fecha_venta</strong> y <strong>precio_unitario</strong> de las primeras 4 ventas según su id ascendente.",
    "queryEsperada": "SELECT id, fecha_venta, precio_unitario FROM ventas ORDER BY id ASC LIMIT 4;",
    "pistas": [
      "ORDER BY id ASC LIMIT 4."
    ],
    "explicacion": "Permite recuperar un lote inicial de transacciones."
  },
  {
    "id": 22,
    "modulo": "Módulo 4: Límites y Paginación (LIMIT)",
    "nivel": "Básico",
    "tags": [
      "LIMIT",
      "ORDER BY"
    ],
    "titulo": "22. Los 3 videojuegos más clásicos",
    "descripcion": "Obtén el <strong>titulo</strong> y el <strong>año_lanzamiento</strong> de los 3 juegos más antiguos del inventario.",
    "queryEsperada": "SELECT titulo, año_lanzamiento FROM videojuegos ORDER BY año_lanzamiento ASC LIMIT 3;",
    "pistas": [
      "ORDER BY año_lanzamiento ASC LIMIT 3."
    ],
    "explicacion": "Identifica los títulos de lanzamiento más remoto."
  },
  {
    "id": 23,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "IGUALDAD"
    ],
    "titulo": "23. Títulos para Nintendo Switch",
    "descripcion": "Obtén todas las columnas (<code>*</code>) de los videojuegos que pertenezcan a la consola <strong>'Nintendo Switch'</strong>.",
    "queryEsperada": "SELECT * FROM videojuegos WHERE consola = 'Nintendo Switch';",
    "pistas": [
      "WHERE consola = 'Nintendo Switch'."
    ],
    "explicacion": "El operador = compara cadenas de texto exactamente."
  },
  {
    "id": 24,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "COMPARACIÓN"
    ],
    "titulo": "24. Videojuegos económicos por debajo de $20",
    "descripcion": "Muestra el <strong>titulo</strong> y <strong>precio</strong> de los juegos cuyo precio sea menor a 20.00 dólares.",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos WHERE precio < 20.00;",
    "pistas": [
      "WHERE precio < 20.00."
    ],
    "explicacion": "El operador < filtra valores numéricos menores al umbral."
  },
  {
    "id": 25,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "WHERE"
    ],
    "titulo": "25. Clientes activos en plataforma",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>email</strong> y <strong>activo</strong> de los clientes cuya cuenta se encuentre activa (<code>activo = 1</code>).",
    "queryEsperada": "SELECT nombre, email, activo FROM clientes WHERE activo = 1;",
    "pistas": [
      "WHERE activo = 1."
    ],
    "explicacion": "Los booleanos en SQLite se representan como 1 (verdadero) y 0 (falso)."
  },
  {
    "id": 26,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "WHERE"
    ],
    "titulo": "26. Videojuegos agotados sin existencias",
    "descripcion": "Consulta el <strong>titulo</strong> y <strong>stock</strong> de aquellos videojuegos que no tengan ninguna unidad disponible (<code>stock = 0</code>).",
    "queryEsperada": "SELECT titulo, stock FROM videojuegos WHERE stock = 0;",
    "pistas": [
      "WHERE stock = 0."
    ],
    "explicacion": "Permite generar alertas de reabastecimiento de inventario."
  },
  {
    "id": 27,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "WHERE"
    ],
    "titulo": "27. Clientes con cuenta en ceros",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong> de los clientes que tengan un saldo exactamente igual a 0.00.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta FROM clientes WHERE saldo_cuenta = 0.00;",
    "pistas": [
      "WHERE saldo_cuenta = 0.00."
    ],
    "explicacion": "Filtra usuarios sin saldo a favor en su billetera."
  },
  {
    "id": 28,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "COUNT"
    ],
    "titulo": "28. Total global de títulos registrados",
    "descripcion": "Cuenta el total de videojuegos existentes en la tabla <code>videojuegos</code> con el alias <code>total_juegos</code>.",
    "queryEsperada": "SELECT COUNT(*) AS total_juegos FROM videojuegos;",
    "pistas": [
      "SELECT COUNT(*) AS total_juegos FROM videojuegos;"
    ],
    "explicacion": "COUNT(*) cuenta todas las filas de la tabla."
  },
  {
    "id": 29,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "MIN",
      "MAX"
    ],
    "titulo": "29. Rango de precios extremos",
    "descripcion": "Calcula el precio mínimo con el alias <code>precio_minimo</code> y el precio máximo con el alias <code>precio_maximo</code> de todo el catálogo.",
    "queryEsperada": "SELECT MIN(precio) AS precio_minimo, MAX(precio) AS precio_maximo FROM videojuegos;",
    "pistas": [
      "SELECT MIN(precio) AS precio_minimo, MAX(precio) AS precio_maximo FROM videojuegos;"
    ],
    "explicacion": "MIN y MAX extraen los extremos de una columna numérica."
  },
  {
    "id": 30,
    "modulo": "Módulo 5: Filtros Básicos (WHERE)",
    "nivel": "Básico",
    "tags": [
      "AVG",
      "ROUND"
    ],
    "titulo": "30. Precio medio del inventario",
    "descripcion": "Calcula el precio promedio de todos los videojuegos redondeado a 2 decimales con el alias <code>precio_promedio</code>.",
    "queryEsperada": "SELECT ROUND(AVG(precio), 2) AS precio_promedio FROM videojuegos;",
    "pistas": [
      "Usa ROUND(AVG(precio), 2) AS precio_promedio."
    ],
    "explicacion": "AVG obtiene el valor medio y ROUND limita los dígitos decimales."
  },
  {
    "id": 31,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "BETWEEN",
      "ORDER BY"
    ],
    "titulo": "31. Lanzamientos entre 2018 y 2022",
    "descripcion": "Muestra el <strong>titulo</strong> y <strong>año_lanzamiento</strong> de los videojuegos estrenados entre 2018 y 2022 inclusive, ordenados del más reciente al más antiguo.",
    "queryEsperada": "SELECT titulo, año_lanzamiento FROM videojuegos WHERE año_lanzamiento BETWEEN 2018 AND 2022 ORDER BY año_lanzamiento DESC;",
    "pistas": [
      "WHERE año_lanzamiento BETWEEN 2018 AND 2022 ORDER BY año_lanzamiento DESC;"
    ],
    "explicacion": "BETWEEN es inclusivo y evalúa límites numéricos o de fechas."
  },
  {
    "id": 32,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "BETWEEN",
      "ORDER BY"
    ],
    "titulo": "32. Videojuegos de gama media ($20 a $50)",
    "descripcion": "Obtén el <strong>titulo</strong> y <strong>precio</strong> de los videojuegos con precio entre 20.00 y 50.00 dólares, ordenados por precio ascendente.",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos WHERE precio BETWEEN 20.00 AND 50.00 ORDER BY precio ASC;",
    "pistas": [
      "WHERE precio BETWEEN 20.00 AND 50.00 ORDER BY precio ASC;"
    ],
    "explicacion": "Permite segmentar productos por franjas de precio."
  },
  {
    "id": 33,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "IN"
    ],
    "titulo": "33. Clientes de España o México",
    "descripcion": "Lista el <strong>nombre</strong>, <strong>apellido</strong> y <strong>pais</strong> de los clientes que residan en <strong>'España'</strong> o <strong>'México'</strong> utilizando el operador <code>IN</code>.",
    "queryEsperada": "SELECT nombre, apellido, pais FROM clientes WHERE pais IN ('España', 'México');",
    "pistas": [
      "WHERE pais IN ('España', 'México')."
    ],
    "explicacion": "IN evalúa si un valor coincide con cualquiera de los miembros de una lista."
  },
  {
    "id": 34,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "IN"
    ],
    "titulo": "34. Juegos de la familia PlayStation",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>consola</strong> y <strong>precio</strong> de los videojuegos de <strong>'PlayStation 4'</strong> o <strong>'PlayStation 5'</strong> usando <code>IN</code>.",
    "queryEsperada": "SELECT titulo, consola, precio FROM videojuegos WHERE consola IN ('PlayStation 4', 'PlayStation 5');",
    "pistas": [
      "WHERE consola IN ('PlayStation 4', 'PlayStation 5')."
    ],
    "explicacion": "Agrupa múltiples comprobaciones de igualdad en una sola cláusula limpia."
  },
  {
    "id": 35,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "NOT IN"
    ],
    "titulo": "35. Clientes fuera de Sudamérica (NOT IN)",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong> y <strong>pais</strong> de los clientes cuyo país NO sea 'Chile', 'Perú', 'Colombia' ni 'Argentina'.",
    "queryEsperada": "SELECT nombre, apellido, pais FROM clientes WHERE pais NOT IN ('Chile', 'Perú', 'Colombia', 'Argentina');",
    "pistas": [
      "WHERE pais NOT IN ('Chile', 'Perú', 'Colombia', 'Argentina')."
    ],
    "explicacion": "NOT IN excluye filas cuyos valores pertenezcan a la lista proporcionada."
  },
  {
    "id": 36,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "IN"
    ],
    "titulo": "36. Ventas digitales por Tarjeta o PayPal",
    "descripcion": "Consulta el <strong>id</strong>, <strong>metodo_pago</strong> y <strong>precio_unitario</strong> de las ventas pagadas con 'Tarjeta' o 'PayPal'.",
    "queryEsperada": "SELECT id, metodo_pago, precio_unitario FROM ventas WHERE metodo_pago IN ('Tarjeta', 'PayPal');",
    "pistas": [
      "WHERE metodo_pago IN ('Tarjeta', 'PayPal')."
    ],
    "explicacion": "Filtra transacciones por canales de pago específicos."
  },
  {
    "id": 37,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "BETWEEN",
      "FECHAS"
    ],
    "titulo": "37. Registros de clientes en el bienio 2021-2022",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>fecha_registro</strong> de los clientes registrados entre el '2021-01-01' y el '2022-12-31', ordenados de más antiguo a más reciente.",
    "queryEsperada": "SELECT nombre, apellido, fecha_registro FROM clientes WHERE fecha_registro BETWEEN '2021-01-01' AND '2022-12-31' ORDER BY fecha_registro ASC;",
    "pistas": [
      "WHERE fecha_registro BETWEEN '2021-01-01' AND '2022-12-31' ORDER BY fecha_registro ASC;"
    ],
    "explicacion": "Las fechas textuales ISO se comparan de forma natural con BETWEEN."
  },
  {
    "id": 38,
    "modulo": "Módulo 6: Rangos y Conjuntos (BETWEEN / IN)",
    "nivel": "Intermedio",
    "tags": [
      "NOT IN"
    ],
    "titulo": "38. Títulos que no son de PC ni Switch",
    "descripcion": "Obtén el <strong>titulo</strong> y <strong>consola</strong> de los videojuegos que NO sean para 'PC' ni 'Nintendo Switch'.",
    "queryEsperada": "SELECT titulo, consola FROM videojuegos WHERE consola NOT IN ('PC', 'Nintendo Switch');",
    "pistas": [
      "WHERE consola NOT IN ('PC', 'Nintendo Switch')."
    ],
    "explicacion": "Filtra el catálogo descartando plataformas seleccionadas."
  },
  {
    "id": 39,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "LIKE",
      "COMODINES"
    ],
    "titulo": "39. Títulos que inician con 'The'",
    "descripcion": "Obtén el <strong>titulo</strong> y <strong>genero</strong> de los videojuegos cuyo nombre comience con la palabra 'The'.",
    "queryEsperada": "SELECT titulo, genero FROM videojuegos WHERE titulo LIKE 'The%';",
    "pistas": [
      "WHERE titulo LIKE 'The%'."
    ],
    "explicacion": "El comodín % representa cero o más caracteres arbitrarios."
  },
  {
    "id": 40,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "LIKE"
    ],
    "titulo": "40. Correos estándar @email.com",
    "descripcion": "Muestra el <strong>nombre</strong> y <strong>email</strong> de los clientes cuya dirección termine exactamente en '@email.com'.",
    "queryEsperada": "SELECT nombre, email FROM clientes WHERE email LIKE '%@email.com';",
    "pistas": [
      "WHERE email LIKE '%@email.com'."
    ],
    "explicacion": "LIKE con % al principio busca terminaciones específicas de texto."
  },
  {
    "id": 41,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "LIKE",
      "SUBGUION"
    ],
    "titulo": "41. Apellidos con 'o' en segunda letra",
    "descripcion": "Busca el <strong>nombre</strong> y <strong>apellido</strong> de los clientes cuyo apellido tenga la vocal 'o' en su segunda posición exacta.",
    "queryEsperada": "SELECT nombre, apellido FROM clientes WHERE apellido LIKE '_o%';",
    "pistas": [
      "El comodín guion bajo (_) coincide con un único carácter: '_o%'."
    ],
    "explicacion": "El guion bajo actúa como comodín posicional estricto de 1 carácter."
  },
  {
    "id": 42,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "LIKE"
    ],
    "titulo": "42. Franquicias con la palabra 'War'",
    "descripcion": "Obtén el <strong>titulo</strong> y <strong>desarrollador</strong> de los videojuegos que contengan la palabra 'War' en cualquier parte de su título.",
    "queryEsperada": "SELECT titulo, desarrollador FROM videojuegos WHERE titulo LIKE '%War%';",
    "pistas": [
      "WHERE titulo LIKE '%War%'."
    ],
    "explicacion": "%palabra% busca coincidencias en cualquier posición de la cadena."
  },
  {
    "id": 43,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "UPPER"
    ],
    "titulo": "43. Nombres en mayúsculas sostenidas",
    "descripcion": "Muestra el <strong>nombre</strong> y <strong>apellido</strong> de los clientes convertidos a mayúsculas con los alias <code>nombre_mayus</code> y <code>apellido_mayus</code>.",
    "queryEsperada": "SELECT UPPER(nombre) AS nombre_mayus, UPPER(apellido) AS apellido_mayus FROM clientes;",
    "pistas": [
      "Usa UPPER(nombre) y UPPER(apellido)."
    ],
    "explicacion": "UPPER convierte todos los caracteres de texto a mayúsculas."
  },
  {
    "id": 44,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "LENGTH",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "44. Top 5 títulos más largos en caracteres",
    "descripcion": "Obtén el <strong>titulo</strong> y la longitud en caracteres del título con el alias <code>longitud_titulo</code> para los 5 juegos con nombres más extensos.",
    "queryEsperada": "SELECT titulo, LENGTH(titulo) AS longitud_titulo FROM videojuegos ORDER BY longitud_titulo DESC LIMIT 5;",
    "pistas": [
      "Usa LENGTH(titulo) AS longitud_titulo ORDER BY longitud_titulo DESC LIMIT 5;"
    ],
    "explicacion": "LENGTH calcula la cantidad de caracteres de una cadena."
  },
  {
    "id": 45,
    "modulo": "Módulo 7: Patrones y Texto (LIKE)",
    "nivel": "Intermedio",
    "tags": [
      "LIKE"
    ],
    "titulo": "45. Clientes con nombre iniciado en 'M'",
    "descripcion": "Consulta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>pais</strong> de los clientes cuyo nombre empiece con la letra 'M'.",
    "queryEsperada": "SELECT nombre, apellido, pais FROM clientes WHERE nombre LIKE 'M%';",
    "pistas": [
      "WHERE nombre LIKE 'M%'."
    ],
    "explicacion": "Filtra registros por inicial alfabética."
  },
  {
    "id": 46,
    "modulo": "Módulo 8: Lógica Booleana Combinada",
    "nivel": "Intermedio",
    "tags": [
      "AND",
      "WHERE"
    ],
    "titulo": "46. Clientes de México con saldo superior a $50",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong>, <strong>pais</strong> y <strong>saldo_cuenta</strong> de los clientes mexicanos con saldo superior a 50.00.",
    "queryEsperada": "SELECT nombre, apellido, pais, saldo_cuenta FROM clientes WHERE pais = 'México' AND saldo_cuenta > 50.00;",
    "pistas": [
      "WHERE pais = 'México' AND saldo_cuenta > 50.00."
    ],
    "explicacion": "AND exige que ambas expresiones se cumplan concurrentemente."
  },
  {
    "id": 47,
    "modulo": "Módulo 8: Lógica Booleana Combinada",
    "nivel": "Intermedio",
    "tags": [
      "AND",
      "WHERE"
    ],
    "titulo": "47. Joyas ocultas: Excelente nota y precio bajo",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>calificacion</strong> y <strong>precio</strong> de los videojuegos con calificación mayor o igual a 9.5 y precio menor a 30.00.",
    "queryEsperada": "SELECT titulo, calificacion, precio FROM videojuegos WHERE calificacion >= 9.5 AND precio < 30.00;",
    "pistas": [
      "WHERE calificacion >= 9.5 AND precio < 30.00."
    ],
    "explicacion": "Filtra productos con excelente relación calidad-precio."
  },
  {
    "id": 48,
    "modulo": "Módulo 8: Lógica Booleana Combinada",
    "nivel": "Intermedio",
    "tags": [
      "AND",
      "OR",
      "PARÉNTESIS"
    ],
    "titulo": "48. Agrupación con paréntesis: RPG o Plataformas",
    "descripcion": "Obtén los videojuegos (<strong>titulo</strong>, <strong>genero</strong>, <strong>precio</strong>, <strong>calificacion</strong>) que sean 'Acción RPG' por menos de $40, O 'Plataformas' con calificación mayor a 9.0.",
    "queryEsperada": "SELECT titulo, genero, precio, calificacion FROM videojuegos WHERE (genero = 'Acción RPG' AND precio < 40) OR (genero = 'Plataformas' AND calificacion > 9.0);",
    "pistas": [
      "Usa paréntesis para aislar las dos condiciones unidas por OR."
    ],
    "explicacion": "Los paréntesis anulan la precedencia natural de AND sobre OR."
  },
  {
    "id": 49,
    "modulo": "Módulo 8: Lógica Booleana Combinada",
    "nivel": "Intermedio",
    "tags": [
      "OR",
      "WHERE"
    ],
    "titulo": "49. Clientes inactivos o sin saldo",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong>, <strong>activo</strong> y <strong>saldo_cuenta</strong> de los clientes que tengan su cuenta inactiva (<code>activo = 0</code>) O su saldo en 0.",
    "queryEsperada": "SELECT nombre, apellido, activo, saldo_cuenta FROM clientes WHERE activo = 0 OR saldo_cuenta = 0;",
    "pistas": [
      "WHERE activo = 0 OR saldo_cuenta = 0;"
    ],
    "explicacion": "OR evalúa verdadero si al menos una de las dos condiciones se cumple."
  },
  {
    "id": 50,
    "modulo": "Módulo 8: Lógica Booleana Combinada",
    "nivel": "Intermedio",
    "tags": [
      "AND",
      "DISTINTO"
    ],
    "titulo": "50. Títulos con stock que no son de deportes",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>genero</strong> y <strong>stock</strong> de los videojuegos con stock disponible (<code>stock > 0</code>) que NO sean de 'Deportes'.",
    "queryEsperada": "SELECT titulo, genero, stock FROM videojuegos WHERE stock > 0 AND genero != 'Deportes';",
    "pistas": [
      "WHERE stock > 0 AND genero != 'Deportes'."
    ],
    "explicacion": "El operador != descarta registros que coincidan con el valor."
  },
  {
    "id": 51,
    "modulo": "Módulo 8: Lógica Booleana Combinada",
    "nivel": "Intermedio",
    "tags": [
      "OR",
      "WHERE"
    ],
    "titulo": "51. Ventas por volumen o en Cripto",
    "descripcion": "Obtén el <strong>id</strong>, <strong>cantidad</strong>, <strong>precio_unitario</strong> y <strong>metodo_pago</strong> de ventas con cantidad mayor o igual a 2 unidades O pagadas con 'Cripto'.",
    "queryEsperada": "SELECT id, cantidad, precio_unitario, metodo_pago FROM ventas WHERE cantidad >= 2 OR metodo_pago = 'Cripto';",
    "pistas": [
      "WHERE cantidad >= 2 OR metodo_pago = 'Cripto'."
    ],
    "explicacion": "Permite segmentar transacciones especiales por volumen o método."
  },
  {
    "id": 52,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "COUNT"
    ],
    "titulo": "52. Conteo de juegos por consola",
    "descripcion": "Obtén la <strong>consola</strong> y la cantidad de juegos registrados (alias <code>cantidad_juegos</code>) ordenados de mayor a menor cantidad.",
    "queryEsperada": "SELECT consola, COUNT(*) AS cantidad_juegos FROM videojuegos GROUP BY consola ORDER BY cantidad_juegos DESC;",
    "pistas": [
      "GROUP BY consola ORDER BY cantidad_juegos DESC;"
    ],
    "explicacion": "GROUP BY colapsa filas con la misma consola para agregar conteos."
  },
  {
    "id": 53,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "AVG",
      "ROUND"
    ],
    "titulo": "53. Puntuación media por género",
    "descripcion": "Muestra el <strong>genero</strong> y la calificación promedio redondeada a 1 decimal (alias <code>promedio_calificacion</code>) ordenado descendentemente.",
    "queryEsperada": "SELECT genero, ROUND(AVG(calificacion), 1) AS promedio_calificacion FROM videojuegos GROUP BY genero ORDER BY promedio_calificacion DESC;",
    "pistas": [
      "GROUP BY genero ORDER BY promedio_calificacion DESC;"
    ],
    "explicacion": "Permite comparar qué géneros gozan de mejor aceptación crítica."
  },
  {
    "id": 54,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "COUNT"
    ],
    "titulo": "54. Distribución de clientes por país",
    "descripcion": "Consulta el <strong>pais</strong> y el total de clientes registrados (alias <code>total_clientes</code>), ordenado descendentemente por dicho total.",
    "queryEsperada": "SELECT pais, COUNT(*) AS total_clientes FROM clientes GROUP BY pais ORDER BY total_clientes DESC;",
    "pistas": [
      "SELECT pais, COUNT(*) AS total_clientes FROM clientes GROUP BY pais ORDER BY total_clientes DESC;"
    ],
    "explicacion": "Segmentación geográfica de la base de usuarios."
  },
  {
    "id": 55,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "SUM"
    ],
    "titulo": "55. Unidades y transacciones por método de pago",
    "descripcion": "Para cada <strong>metodo_pago</strong> en la tabla <code>ventas</code>, calcula el número de ventas (alias <code>num_ventas</code>) y la suma de unidades vendidas (alias <code>total_unidades</code>).",
    "queryEsperada": "SELECT metodo_pago, COUNT(*) AS num_ventas, SUM(cantidad) AS total_unidades FROM ventas GROUP BY metodo_pago;",
    "pistas": [
      "GROUP BY metodo_pago con COUNT(*) y SUM(cantidad)."
    ],
    "explicacion": "Resumen transaccional agrupado por canal de pago."
  },
  {
    "id": 56,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "HAVING"
    ],
    "titulo": "56. Consolas con al menos 5 títulos",
    "descripcion": "Muestra las <strong>consolas</strong> que posean 5 o más títulos en el catálogo y la cantidad de juegos (alias <code>cantidad_juegos</code>). Usa <code>HAVING</code>.",
    "queryEsperada": "SELECT consola, COUNT(*) AS cantidad_juegos FROM videojuegos GROUP BY consola HAVING COUNT(*) >= 5;",
    "pistas": [
      "GROUP BY consola HAVING COUNT(*) >= 5;"
    ],
    "explicacion": "HAVING filtra grupos agregados después de la ejecución de GROUP BY."
  },
  {
    "id": 57,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "HAVING"
    ],
    "titulo": "57. Países con 3 o más clientes",
    "descripcion": "Obtén los países (<strong>pais</strong>) con 3 o más clientes registrados y el total de clientes con el alias <code>total_clientes</code>.",
    "queryEsperada": "SELECT pais, COUNT(*) AS total_clientes FROM clientes GROUP BY pais HAVING COUNT(*) >= 3;",
    "pistas": [
      "GROUP BY pais HAVING COUNT(*) >= 3;"
    ],
    "explicacion": "Identifica mercados con volumen representativo de usuarios."
  },
  {
    "id": 58,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "HAVING",
      "AVG"
    ],
    "titulo": "58. Géneros de alto costo promedio",
    "descripcion": "Muestra los géneros (<strong>genero</strong>) cuyo precio promedio sea estrictamente superior a 40 dólares, junto al promedio redondeado a 2 decimales (alias <code>precio_promedio</code>).",
    "queryEsperada": "SELECT genero, ROUND(AVG(precio), 2) AS precio_promedio FROM videojuegos GROUP BY genero HAVING AVG(precio) > 40;",
    "pistas": [
      "GROUP BY genero HAVING AVG(precio) > 40;"
    ],
    "explicacion": "Filtra categorías cuyo ticket promedio supera el estándar."
  },
  {
    "id": 59,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "HAVING"
    ],
    "titulo": "59. Métodos de pago populares (> 3 ventas)",
    "descripcion": "Lista los métodos de pago (<strong>metodo_pago</strong>) que registren más de 3 ventas con el alias <code>total_transacciones</code>.",
    "queryEsperada": "SELECT metodo_pago, COUNT(*) AS total_transacciones FROM ventas GROUP BY metodo_pago HAVING COUNT(*) > 3;",
    "pistas": [
      "GROUP BY metodo_pago HAVING COUNT(*) > 3;"
    ],
    "explicacion": "Detecta pasarelas de pago con alta tracción."
  },
  {
    "id": 60,
    "modulo": "Módulo 9: Agrupaciones (GROUP BY y HAVING)",
    "nivel": "Intermedio",
    "tags": [
      "GROUP BY",
      "SUM",
      "ORDER BY"
    ],
    "titulo": "60. Valor de inventario por consola",
    "descripcion": "Calcula el valor económico del inventario (<code>precio * stock</code>) agrupado por <strong>consola</strong> con el alias <code>valor_total</code>, ordenado de mayor a menor valor.",
    "queryEsperada": "SELECT consola, SUM(precio * stock) AS valor_total FROM videojuegos GROUP BY consola ORDER BY valor_total DESC;",
    "pistas": [
      "SELECT consola, SUM(precio * stock) AS valor_total FROM videojuegos GROUP BY consola ORDER BY valor_total DESC;"
    ],
    "explicacion": "Calcula el capital inmovilizado en stock por cada plataforma."
  },
  {
    "id": 61,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN"
    ],
    "titulo": "61. Ventas vinculadas con clientes",
    "descripcion": "Combina <code>ventas</code> y <code>clientes</code> para mostrar: <strong>ventas.id</strong>, <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong>, <strong>ventas.fecha_venta</strong> y <strong>ventas.precio_unitario</strong>. Ordena por <code>ventas.id</code> ascendente.",
    "queryEsperada": "SELECT ventas.id, clientes.nombre, clientes.apellido, ventas.fecha_venta, ventas.precio_unitario FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id ORDER BY ventas.id ASC;",
    "pistas": [
      "INNER JOIN clientes ON ventas.cliente_id = clientes.id ORDER BY ventas.id ASC;"
    ],
    "explicacion": "INNER JOIN vincula filas coincidentes en clave foránea y primaria."
  },
  {
    "id": 62,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN"
    ],
    "titulo": "62. Ventas con título de videojuego",
    "descripcion": "Combina <code>ventas</code> y <code>videojuegos</code> para mostrar: <strong>ventas.id</strong>, <strong>videojuegos.titulo</strong>, <strong>ventas.cantidad</strong> y <strong>ventas.precio_unitario</strong> ordenado por <code>ventas.id</code> ascendente.",
    "queryEsperada": "SELECT ventas.id, videojuegos.titulo, ventas.cantidad, ventas.precio_unitario FROM ventas INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id ORDER BY ventas.id ASC;",
    "pistas": [
      "INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id ORDER BY ventas.id ASC;"
    ],
    "explicacion": "Conecta transacciones monetarias con el catálogo de productos."
  },
  {
    "id": 63,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "WHERE"
    ],
    "titulo": "63. Compras realizadas por clientes mexicanos",
    "descripcion": "Muestra el <strong>ventas.id</strong>, <strong>clientes.nombre</strong>, <strong>clientes.pais</strong> y <strong>ventas.precio_unitario</strong> de todas las ventas hechas a clientes de 'México'.",
    "queryEsperada": "SELECT ventas.id, clientes.nombre, clientes.pais, ventas.precio_unitario FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id WHERE clientes.pais = 'México';",
    "pistas": [
      "Combina INNER JOIN con WHERE clientes.pais = 'México'."
    ],
    "explicacion": "Permite filtrar relaciones cruzadas basadas en atributos de cualquiera de las tablas."
  },
  {
    "id": 64,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "WHERE"
    ],
    "titulo": "64. Ventas de títulos para Switch",
    "descripcion": "Obtén el <strong>ventas.id</strong>, <strong>videojuegos.titulo</strong>, <strong>videojuegos.consola</strong> y <strong>ventas.fecha_venta</strong> de juegos vendidos para la consola 'Nintendo Switch'.",
    "queryEsperada": "SELECT ventas.id, videojuegos.titulo, videojuegos.consola, ventas.fecha_venta FROM ventas INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id WHERE videojuegos.consola = 'Nintendo Switch';",
    "pistas": [
      "WHERE videojuegos.consola = 'Nintendo Switch'."
    ],
    "explicacion": "Relaciona ventas filtrando por características del producto adquirido."
  },
  {
    "id": 65,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "titulo": "65. Total de copias vendidas por juego",
    "descripcion": "Muestra el <strong>videojuegos.titulo</strong> y la suma total de unidades vendidas (alias <code>total_vendido</code>) ordenado de mayor a menor venta.",
    "queryEsperada": "SELECT videojuegos.titulo, SUM(ventas.cantidad) AS total_vendido FROM ventas INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id GROUP BY videojuegos.titulo ORDER BY total_vendido DESC;",
    "pistas": [
      "GROUP BY videojuegos.titulo con SUM(ventas.cantidad)."
    ],
    "explicacion": "Agrega ventas individuales para calcular el volumen total de cada producto."
  },
  {
    "id": 66,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "GROUP BY",
      "SUM"
    ],
    "titulo": "66. Gasto acumulado por cliente",
    "descripcion": "Muestra el <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong> y el importe total gastado redondeado a 2 decimales (alias <code>total_gastado</code>) ordenado descendentemente.",
    "queryEsperada": "SELECT clientes.nombre, clientes.apellido, ROUND(SUM(ventas.cantidad * ventas.precio_unitario), 2) AS total_gastado FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id GROUP BY clientes.id ORDER BY total_gastado DESC;",
    "pistas": [
      "GROUP BY clientes.id con SUM(ventas.cantidad * ventas.precio_unitario)."
    ],
    "explicacion": "Métrica fundamental de Customer Lifetime Value (CLV)."
  },
  {
    "id": 67,
    "modulo": "Módulo 10: Relaciones (INNER JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "GROUP BY",
      "HAVING"
    ],
    "titulo": "67. Clientes VIP con gasto superior a $100",
    "descripcion": "Lista el <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong> y el <strong>total_gastado</strong> (redondeado a 2 decimales) de clientes que hayan comprado más de $100 en total.",
    "queryEsperada": "SELECT clientes.nombre, clientes.apellido, ROUND(SUM(ventas.cantidad * ventas.precio_unitario), 2) AS total_gastado FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id GROUP BY clientes.id HAVING SUM(ventas.cantidad * ventas.precio_unitario) > 100;",
    "pistas": [
      "Añade HAVING SUM(ventas.cantidad * ventas.precio_unitario) > 100;"
    ],
    "explicacion": "Filtra agregados relacionales para segmentar a los mejores compradores."
  },
  {
    "id": 68,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "TRIPLE JOIN"
    ],
    "titulo": "68. Registro maestro integral de transacciones",
    "descripcion": "Combina las 3 tablas para mostrar: <strong>ventas.id</strong>, <strong>clientes.nombre</strong>, <strong>videojuegos.titulo</strong>, <strong>ventas.cantidad</strong> y <strong>ventas.precio_unitario</strong> ordenado por <code>ventas.id</code> ascendente.",
    "queryEsperada": "SELECT ventas.id, clientes.nombre, videojuegos.titulo, ventas.cantidad, ventas.precio_unitario FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id ORDER BY ventas.id ASC;",
    "pistas": [
      "Encadena dos cláusulas INNER JOIN: clientes y videojuegos."
    ],
    "explicacion": "Reconstruye la vista consolidada de la transacción normalizada."
  },
  {
    "id": 69,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "WHERE"
    ],
    "titulo": "69. Compras con tarjeta con cliente y juego",
    "descripcion": "Muestra el <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong>, <strong>videojuegos.titulo</strong> y <strong>ventas.metodo_pago</strong> de ventas abonadas con 'Tarjeta'.",
    "queryEsperada": "SELECT clientes.nombre, clientes.apellido, videojuegos.titulo, ventas.metodo_pago FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id WHERE ventas.metodo_pago = 'Tarjeta';",
    "pistas": [
      "WHERE ventas.metodo_pago = 'Tarjeta'."
    ],
    "explicacion": "Filtra la transacción consolidada por canal de pago."
  },
  {
    "id": 70,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "SUM",
      "GROUP BY"
    ],
    "titulo": "70. Facturación por desarrollador",
    "descripcion": "Calcula el total de ingresos generados (alias <code>ingresos_totales</code> redondeado a 2 decimales) agrupado por <strong>videojuegos.desarrollador</strong>, ordenado descendentemente.",
    "queryEsperada": "SELECT videojuegos.desarrollador, ROUND(SUM(ventas.cantidad * ventas.precio_unitario), 2) AS ingresos_totales FROM ventas INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id GROUP BY videojuegos.desarrollador ORDER BY ingresos_totales DESC;",
    "pistas": [
      "GROUP BY videojuegos.desarrollador con SUM(ventas.cantidad * ventas.precio_unitario)."
    ],
    "explicacion": "Permite liquidar regalías y comisiones a proveedores."
  },
  {
    "id": 71,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "DISTINCT"
    ],
    "titulo": "71. Clientes fanáticos de Acción RPG",
    "descripcion": "Obtén una lista única (DISTINCT) de <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong> y <strong>videojuegos.genero</strong> de usuarios que hayan comprado algún juego de 'Acción RPG'.",
    "queryEsperada": "SELECT DISTINCT clientes.nombre, clientes.apellido, videojuegos.genero FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id WHERE videojuegos.genero = 'Acción RPG';",
    "pistas": [
      "SELECT DISTINCT ... WHERE videojuegos.genero = 'Acción RPG'."
    ],
    "explicacion": "Identifica audiencias por afinidad de género para campañas dirigidas."
  },
  {
    "id": 72,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "LIKE"
    ],
    "titulo": "72. Auditoría de ventas del año 2023",
    "descripcion": "Muestra <strong>ventas.id</strong>, <strong>clientes.nombre</strong>, <strong>videojuegos.titulo</strong> y <strong>ventas.fecha_venta</strong> de transacciones hechas en 2023, ordenadas por fecha.",
    "queryEsperada": "SELECT ventas.id, clientes.nombre, videojuegos.titulo, ventas.fecha_venta FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id WHERE ventas.fecha_venta LIKE '2023%' ORDER BY ventas.fecha_venta ASC;",
    "pistas": [
      "WHERE ventas.fecha_venta LIKE '2023%' ORDER BY ventas.fecha_venta ASC;"
    ],
    "explicacion": "Filtra transacciones por año calendario en datos normalizados."
  },
  {
    "id": 73,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "GROUP BY",
      "LIMIT"
    ],
    "titulo": "73. Género rey en unidades vendidas",
    "descripcion": "Obtén el <strong>videojuegos.genero</strong> y la suma de unidades vendidas (alias <code>unidades_vendidas</code>) del género más vendido de toda la tienda (LIMIT 1).",
    "queryEsperada": "SELECT videojuegos.genero, SUM(ventas.cantidad) AS unidades_vendidas FROM ventas INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id GROUP BY videojuegos.genero ORDER BY unidades_vendidas DESC LIMIT 1;",
    "pistas": [
      "GROUP BY videojuegos.genero ORDER BY unidades_vendidas DESC LIMIT 1;"
    ],
    "explicacion": "Determina la categoría más exitosa del negocio."
  },
  {
    "id": 74,
    "modulo": "Módulo 11: Joins Múltiples y Relaciones N:M",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "DISTINCT"
    ],
    "titulo": "74. Compradores de títulos de Nintendo",
    "descripcion": "Muestra sin duplicados el <strong>clientes.nombre</strong> y <strong>clientes.apellido</strong> de los clientes que hayan comprado al menos un título desarrollado por 'Nintendo'.",
    "queryEsperada": "SELECT DISTINCT clientes.nombre, clientes.apellido FROM ventas INNER JOIN clientes ON ventas.cliente_id = clientes.id INNER JOIN videojuegos ON ventas.videojuego_id = videojuegos.id WHERE videojuegos.desarrollador = 'Nintendo';",
    "pistas": [
      "WHERE videojuegos.desarrollador = 'Nintendo'."
    ],
    "explicacion": "Segmenta compradores fieles a un publisher específico."
  },
  {
    "id": 75,
    "modulo": "Módulo 12: Coincidencias y Faltantes (LEFT JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "IS NULL"
    ],
    "titulo": "75. Videojuegos sin ventas registradas",
    "descripcion": "Obtén el <strong>videojuegos.id</strong> y <strong>videojuegos.titulo</strong> de aquellos juegos que jamás han tenido una venta en la tienda.",
    "queryEsperada": "SELECT videojuegos.id, videojuegos.titulo FROM videojuegos LEFT JOIN ventas ON videojuegos.id = ventas.videojuego_id WHERE ventas.id IS NULL;",
    "pistas": [
      "LEFT JOIN ventas ON videojuegos.id = ventas.videojuego_id WHERE ventas.id IS NULL;"
    ],
    "explicacion": "El patrón LEFT JOIN ... WHERE right.id IS NULL detecta registros huérfanos o sin interacción."
  },
  {
    "id": 76,
    "modulo": "Módulo 12: Coincidencias y Faltantes (LEFT JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "IS NULL"
    ],
    "titulo": "76. Clientes inactivos sin compras",
    "descripcion": "Muestra el <strong>clientes.id</strong>, <strong>clientes.nombre</strong> y <strong>clientes.apellido</strong> de los clientes registrados que nunca han realizado una compra.",
    "queryEsperada": "SELECT clientes.id, clientes.nombre, clientes.apellido FROM clientes LEFT JOIN ventas ON clientes.id = ventas.cliente_id WHERE ventas.id IS NULL;",
    "pistas": [
      "LEFT JOIN ventas ON clientes.id = ventas.cliente_id WHERE ventas.id IS NULL;"
    ],
    "explicacion": "Permite a mercadotecnia reactivar usuarios que crearon cuenta pero no compraron."
  },
  {
    "id": 77,
    "modulo": "Módulo 12: Coincidencias y Faltantes (LEFT JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "GROUP BY"
    ],
    "titulo": "77. Historial de compras por cliente (incluyendo 0)",
    "descripcion": "Obtén <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong> y el total de transacciones (alias <code>total_compras</code>), incluyendo a quienes no tienen compras (0). Ordena descendentemente.",
    "queryEsperada": "SELECT clientes.nombre, clientes.apellido, COUNT(ventas.id) AS total_compras FROM clientes LEFT JOIN ventas ON clientes.id = ventas.cliente_id GROUP BY clientes.id ORDER BY total_compras DESC;",
    "pistas": [
      "Usa COUNT(ventas.id) en vez de COUNT(*) para que devuelva 0 si es NULL."
    ],
    "explicacion": "COUNT(columna) ignora nulos, permitiendo contar ceros correctamente en LEFT JOIN."
  },
  {
    "id": 78,
    "modulo": "Módulo 12: Coincidencias y Faltantes (LEFT JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "COALESCE"
    ],
    "titulo": "78. Total de unidades vendidas por juego con COALESCE",
    "descripcion": "Muestra el <strong>videojuegos.titulo</strong> y las unidades totales vendidas (alias <code>unidades_totales</code>) reemplazando nulos con 0 usando <code>COALESCE</code>, ordenado descendentemente.",
    "queryEsperada": "SELECT videojuegos.titulo, COALESCE(SUM(ventas.cantidad), 0) AS unidades_totales FROM videojuegos LEFT JOIN ventas ON videojuegos.id = ventas.videojuego_id GROUP BY videojuegos.id ORDER BY unidades_totales DESC;",
    "pistas": [
      "COALESCE(SUM(ventas.cantidad), 0) AS unidades_totales."
    ],
    "explicacion": "COALESCE devuelve el primer valor no nulo de la lista de argumentos."
  },
  {
    "id": 79,
    "modulo": "Módulo 12: Coincidencias y Faltantes (LEFT JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "AND"
    ],
    "titulo": "79. Clientes activos listos para primera compra",
    "descripcion": "Muestra el <strong>clientes.nombre</strong> y <strong>clientes.email</strong> de clientes con cuenta activa (<code>activo = 1</code>) que todavía no han comprado nada.",
    "queryEsperada": "SELECT clientes.nombre, clientes.email FROM clientes LEFT JOIN ventas ON clientes.id = ventas.cliente_id WHERE ventas.id IS NULL AND clientes.activo = 1;",
    "pistas": [
      "WHERE ventas.id IS NULL AND clientes.activo = 1;"
    ],
    "explicacion": "Público objetivo clave para cupones de primera compra."
  },
  {
    "id": 80,
    "modulo": "Módulo 12: Coincidencias y Faltantes (LEFT JOIN)",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "GROUP BY"
    ],
    "titulo": "80. Consolas y su total de transacciones",
    "descripcion": "Muestra la <strong>videojuegos.consola</strong> y el número total de ventas registradas (alias <code>total_ventas</code>) ordenado de mayor a menor.",
    "queryEsperada": "SELECT videojuegos.consola, COUNT(ventas.id) AS total_ventas FROM videojuegos LEFT JOIN ventas ON videojuegos.id = ventas.videojuego_id GROUP BY videojuegos.consola ORDER BY total_ventas DESC;",
    "pistas": [
      "GROUP BY videojuegos.consola ORDER BY total_ventas DESC;"
    ],
    "explicacion": "Evalúa el volumen comercial absorbido por cada plataforma."
  },
  {
    "id": 81,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "SUBCONSULTA",
      "AVG"
    ],
    "titulo": "81. Títulos con precio superior al promedio",
    "descripcion": "Muestra el <strong>titulo</strong> y <strong>precio</strong> de los videojuegos cuyo precio sea mayor al precio promedio de todo el catálogo, ordenados de mayor a menor.",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos WHERE precio > (SELECT AVG(precio) FROM videojuegos) ORDER BY precio DESC;",
    "pistas": [
      "Subconsulta: (SELECT AVG(precio) FROM videojuegos)."
    ],
    "explicacion": "Una subconsulta escalar calcula dinámicamente el promedio para la comparación."
  },
  {
    "id": 82,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "SUBCONSULTA",
      "IN"
    ],
    "titulo": "82. Clientes con pagos en Criptomonedas (IN)",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong> de clientes cuyo id aparezca en la subconsulta de ventas con pago 'Cripto'.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta FROM clientes WHERE id IN (SELECT cliente_id FROM ventas WHERE metodo_pago = 'Cripto');",
    "pistas": [
      "WHERE id IN (SELECT cliente_id FROM ventas WHERE metodo_pago = 'Cripto')."
    ],
    "explicacion": "El operador IN con subconsulta filtra según el conjunto generado."
  },
  {
    "id": 83,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "SUBCONSULTA CORRELACIONADA"
    ],
    "titulo": "83. Juegos destacados sobre la media de su consola",
    "descripcion": "Muestra <strong>v1.titulo</strong>, <strong>v1.consola</strong> y <strong>v1.calificacion</strong> de los juegos cuya calificación sea mayor o igual a la calificación promedio de su propia consola.",
    "queryEsperada": "SELECT v1.titulo, v1.consola, v1.calificacion FROM videojuegos v1 WHERE v1.calificacion >= (SELECT AVG(v2.calificacion) FROM videojuegos v2 WHERE v2.consola = v1.consola) ORDER BY v1.consola, v1.calificacion DESC;",
    "pistas": [
      "Subconsulta correlacionada: WHERE v2.consola = v1.consola."
    ],
    "explicacion": "Una subconsulta correlacionada se evalúa una vez por cada fila de la consulta externa."
  },
  {
    "id": 84,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "SUBCONSULTA",
      "AVG"
    ],
    "titulo": "84. Clientes con saldo sobre la media",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong> de clientes con saldo superior a la media de todos los clientes, ordenados de mayor a menor saldo.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta FROM clientes WHERE saldo_cuenta > (SELECT AVG(saldo_cuenta) FROM clientes) ORDER BY saldo_cuenta DESC;",
    "pistas": [
      "WHERE saldo_cuenta > (SELECT AVG(saldo_cuenta) FROM clientes)."
    ],
    "explicacion": "Identifica a usuarios con saldo por encima del comportamiento medio."
  },
  {
    "id": 85,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "EXISTS"
    ],
    "titulo": "85. Videojuegos comprados al menos una vez (EXISTS)",
    "descripcion": "Muestra el <strong>titulo</strong> de los videojuegos para los cuales existe al menos un registro en la tabla <code>ventas</code> utilizando la cláusula <code>EXISTS</code>.",
    "queryEsperada": "SELECT titulo FROM videojuegos WHERE EXISTS (SELECT 1 FROM ventas WHERE ventas.videojuego_id = videojuegos.id);",
    "pistas": [
      "WHERE EXISTS (SELECT 1 FROM ventas WHERE ventas.videojuego_id = videojuegos.id)."
    ],
    "explicacion": "EXISTS devuelve TRUE tan pronto como encuentra la primera coincidencia, siendo altamente eficiente."
  },
  {
    "id": 86,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "NOT EXISTS"
    ],
    "titulo": "86. Clientes sin transacciones usando NOT EXISTS",
    "descripcion": "Obtén el <strong>nombre</strong> y <strong>apellido</strong> de los clientes para los cuales NO existe ninguna venta registrada en <code>ventas</code> usando <code>NOT EXISTS</code>.",
    "queryEsperada": "SELECT nombre, apellido FROM clientes WHERE NOT EXISTS (SELECT 1 FROM ventas WHERE ventas.cliente_id = clientes.id);",
    "pistas": [
      "WHERE NOT EXISTS (SELECT 1 FROM ventas WHERE ventas.cliente_id = clientes.id)."
    ],
    "explicacion": "NOT EXISTS es una alternativa óptima a LEFT JOIN ... IS NULL."
  },
  {
    "id": 87,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN"
    ],
    "titulo": "87. Segmentación de precios con CASE WHEN",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>precio</strong> y una columna calculada llamada <code>categoria_precio</code> que devuelva: 'Premium' si el precio es >= 50, 'Estándar' si es >= 25, y 'Económico' en otro caso.",
    "queryEsperada": "SELECT titulo, precio, CASE WHEN precio >= 50 THEN 'Premium' WHEN precio >= 25 THEN 'Estándar' ELSE 'Económico' END AS categoria_precio FROM videojuegos ORDER BY precio DESC;",
    "pistas": [
      "Usa CASE WHEN precio >= 50 THEN ... END AS categoria_precio."
    ],
    "explicacion": "CASE WHEN evalúa lógica condicional if/else directamente en la proyección de columnas."
  },
  {
    "id": 88,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN"
    ],
    "titulo": "88. Estado de solvencia del cliente con CASE",
    "descripcion": "Muestra <strong>nombre</strong>, <strong>apellido</strong>, <strong>saldo_cuenta</strong> y una columna <code>estado_saldo</code>: 'Alto' si saldo > 100, 'Positivo' si saldo > 0, y 'Sin Saldo' si es 0.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta, CASE WHEN saldo_cuenta > 100 THEN 'Alto' WHEN saldo_cuenta > 0 THEN 'Positivo' ELSE 'Sin Saldo' END AS estado_saldo FROM clientes;",
    "pistas": [
      "CASE WHEN saldo_cuenta > 100 THEN 'Alto' WHEN saldo_cuenta > 0 THEN 'Positivo' ELSE 'Sin Saldo' END."
    ],
    "explicacion": "Permite clasificar cualitativamente métricas numéricas."
  },
  {
    "id": 89,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "SUBCONSULTA",
      "MAX",
      "INNER JOIN"
    ],
    "titulo": "89. Comprador del ticket unitario más alto",
    "descripcion": "Obtén el <strong>clientes.nombre</strong>, <strong>clientes.apellido</strong> y <strong>ventas.precio_unitario</strong> del cliente cuya venta haya tenido el precio unitario máximo de toda la tabla ventas.",
    "queryEsperada": "SELECT clientes.nombre, clientes.apellido, ventas.precio_unitario FROM clientes INNER JOIN ventas ON clientes.id = ventas.cliente_id WHERE ventas.precio_unitario = (SELECT MAX(precio_unitario) FROM ventas);",
    "pistas": [
      "WHERE ventas.precio_unitario = (SELECT MAX(precio_unitario) FROM ventas)."
    ],
    "explicacion": "Combina JOIN con una subconsulta para aislar el registro que empata con el valor tope."
  },
  {
    "id": 90,
    "modulo": "Módulo 13: Subconsultas y Lógica Condicional",
    "nivel": "Avanzado",
    "tags": [
      "SUBCONSULTA",
      "AVG",
      "DISTINCT"
    ],
    "titulo": "90. Títulos comprados en volumen sobre la media",
    "descripcion": "Muestra sin duplicados el <strong>videojuegos.titulo</strong> de aquellos juegos cuya cantidad vendida en alguna transacción fue estrictamente mayor que la cantidad promedio vendida en toda la tienda.",
    "queryEsperada": "SELECT DISTINCT videojuegos.titulo FROM videojuegos INNER JOIN ventas ON videojuegos.id = ventas.videojuego_id WHERE ventas.cantidad > (SELECT AVG(cantidad) FROM ventas);",
    "pistas": [
      "WHERE ventas.cantidad > (SELECT AVG(cantidad) FROM ventas)."
    ],
    "explicacion": "Filtra entidades mediante comparación con promedios globales de la tabla relacional."
  }
];
