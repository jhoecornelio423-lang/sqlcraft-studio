/**
 * SQLCraft Studio - Banco de Ejercicios y Exámenes de Certificación
 * Catálogo Multisección:
 *  - Sección 1: Consultas SELECT y Filtrado de Datos (60 Desafíos + Examen)
 *  - Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL (60 Desafíos + Examen)
 * Total: 120 Desafíos Evaluados en Vivo contra SQLite
 */

const SECCIONES_CATALOGO = [
  {
    "id": 1,
    "titulo": "Sección 1: Consultas SELECT y Filtrado de Datos",
    "descripcion": "Fundamentos esenciales de extracción, proyecciones, alias (AS), operadores relacionales y lógicos, rangos, patrones LIKE, ordenamiento, límites y expresiones condicionales CASE.",
    "totalRetos": 60,
    "niveles": {
      "Básico": 20,
      "Intermedio": 20,
      "Avanzado": 20
    }
  },
  {
    "id": 2,
    "titulo": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "descripcion": "Técnicas avanzadas de combinación relacional: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, detección de registros huérfanos y funciones de control de NULL (COALESCE, IFNULL, NULLIF).",
    "totalRetos": 60,
    "niveles": {
      "Básico": 20,
      "Intermedio": 20,
      "Avanzado": 20
    }
  }
];

const BANCO_EJERCICIOS = [
  {
    "id": 1,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 1: Proyección, Alias y DISTINCT",
    "nivel": "Básico",
    "tags": [
      "SELECT"
    ],
    "titulo": "1. Proyección de columnas específicas",
    "descripcion": "Obtén el <strong>titulo</strong>, la <strong>consola</strong> y el <strong>precio</strong> de todos los videojuegos disponibles en la tabla <code>videojuegos</code>.",
    "queryEsperada": "SELECT titulo, consola, precio FROM videojuegos;",
    "pistas": [
      "Enumera las tres columnas separadas por comas justo después de la palabra clave SELECT.",
      "Indica la tabla de origen con FROM videojuegos;"
    ],
    "explicacion": "La proyección explícita de columnas optimiza la transferencia de red y evita cargar atributos innecesarios.",
    "seccionId": 1
  },
  {
    "id": 2,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 1: Proyección, Alias y DISTINCT",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "*"
    ],
    "titulo": "2. Exploración completa con asterisco (*)",
    "descripcion": "Extrae todos los campos y registros de la tabla <code>clientes</code> usando el comodín asterisco (<code>*</code>).",
    "queryEsperada": "SELECT * FROM clientes;",
    "pistas": [
      "El asterisco (*) representa todas las columnas de la tabla.",
      "Escribe: SELECT * FROM clientes;"
    ],
    "explicacion": "SELECT * es ideal para exploración inicial en consolas de desarrollo, aunque en producción se desaconseja por rendimiento.",
    "seccionId": 1
  },
  {
    "id": 3,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 1: Proyección, Alias y DISTINCT",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "AS"
    ],
    "titulo": "3. Renombrado de columnas con alias (AS)",
    "descripcion": "Muestra el <strong>titulo</strong> renombrado como <code>nombre_juego</code> y la <strong>calificacion</strong> renombrada como <code>puntaje</code> de la tabla <code>videojuegos</code>.",
    "queryEsperada": "SELECT titulo AS nombre_juego, calificacion AS puntaje FROM videojuegos;",
    "pistas": [
      "Usa la cláusula AS después del nombre original de cada columna.",
      "Estructura: SELECT columna AS nuevo_nombre FROM ..."
    ],
    "explicacion": "Los alias mejoran la legibilidad de las columnas en reportes e integraciones con APIs.",
    "seccionId": 1
  },
  {
    "id": 4,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 1: Proyección, Alias y DISTINCT",
    "nivel": "Básico",
    "tags": [
      "SELECT",
      "Aritmética"
    ],
    "titulo": "4. Cálculo de descuento en la proyección",
    "descripcion": "Calcula un <strong>descuento del 10%</strong> sobre los precios. Proyecta el <strong>titulo</strong>, el <strong>precio</strong> original y el precio con descuento redondeado a 2 decimales renombrado como <code>precio_con_descuento</code> (<code>ROUND(precio * 0.90, 2)</code>) de la tabla <code>videojuegos</code>.",
    "queryEsperada": "SELECT titulo, precio, ROUND(precio * 0.90, 2) AS precio_con_descuento FROM videojuegos;",
    "pistas": [
      "Para descontar el 10% multiplica por 0.90.",
      "Aplica ROUND(precio * 0.90, 2) AS precio_con_descuento."
    ],
    "explicacion": "SQL permite evaluar expresiones aritméticas directamente en la cláusula SELECT sin alterar los datos almacenados en disco.",
    "seccionId": 1
  },
  {
    "id": 5,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 1: Proyección, Alias y DISTINCT",
    "nivel": "Básico",
    "tags": [
      "DISTINCT"
    ],
    "titulo": "5. Catálogo único de géneros con DISTINCT",
    "descripcion": "Obtén la lista de géneros únicos disponibles en la tabla <code>videojuegos</code> sin que aparezcan valores duplicados.",
    "queryEsperada": "SELECT DISTINCT genero FROM videojuegos;",
    "pistas": [
      "Coloca la palabra reservada DISTINCT inmediatamente después de SELECT.",
      "Sintaxis: SELECT DISTINCT columna FROM ..."
    ],
    "explicacion": "DISTINCT filtra las filas redundantes en la proyección asegurando que cada valor retornado sea único.",
    "seccionId": 1
  },
  {
    "id": 6,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 1: Proyección, Alias y DISTINCT",
    "nivel": "Básico",
    "tags": [
      "DISTINCT"
    ],
    "titulo": "6. Combinaciones únicas de consola y género",
    "descripcion": "Muestra todas las combinaciones únicas de <strong>consola</strong> y <strong>genero</strong> existentes en la tabla <code>videojuegos</code>.",
    "queryEsperada": "SELECT DISTINCT consola, genero FROM videojuegos;",
    "pistas": [
      "Aplica DISTINCT sobre ambas columnas simultáneamente.",
      "Escribe: SELECT DISTINCT consola, genero FROM videojuegos;"
    ],
    "explicacion": "Cuando DISTINCT se aplica a múltiples columnas, evalúa la unicidad de la tupla completa, no de cada columna por separado.",
    "seccionId": 1
  },
  {
    "id": 7,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 2: Filtrado y Operadores Relacionales",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "="
    ],
    "titulo": "7. Filtrado exacto de texto con WHERE",
    "descripcion": "Obtén todos los datos de los clientes cuyo <strong>pais</strong> sea exactamente <code>'México'</code> de la tabla <code>clientes</code>.",
    "queryEsperada": "SELECT * FROM clientes WHERE pais = 'México';",
    "pistas": [
      "Las cadenas de texto en SQL van encerradas entre comillas simples: 'México'.",
      "Usa la cláusula WHERE pais = 'México';"
    ],
    "explicacion": "La cláusula WHERE evalúa una condición booleana fila por fila, reteniendo únicamente aquellas donde el resultado es TRUE.",
    "seccionId": 1
  },
  {
    "id": 8,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 2: Filtrado y Operadores Relacionales",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      ">"
    ],
    "titulo": "8. Filtrado numérico estricto (>)",
    "descripcion": "Selecciona el <strong>titulo</strong> y la <strong>calificacion</strong> de aquellos videojuegos cuya calificación sea estrictamente mayor a <code>9.5</code>.",
    "queryEsperada": "SELECT titulo, calificacion FROM videojuegos WHERE calificacion > 9.5;",
    "pistas": [
      "Utiliza el operador relacional mayor que (>).",
      "Los números decimales en SQL se escriben con punto: 9.5."
    ],
    "explicacion": "El operador '>' compara valores numéricos de forma estricta excluyendo el valor frontera.",
    "seccionId": 1
  },
  {
    "id": 9,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 2: Filtrado y Operadores Relacionales",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "<="
    ],
    "titulo": "9. Filtrado con límite superior inclusivo (<=)",
    "descripcion": "Muestra el <strong>titulo</strong> y el <strong>precio</strong> de los videojuegos que cuesten <code>20.0</code> dólares o menos.",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos WHERE precio <= 20.0;",
    "pistas": [
      "Utiliza el operador menor o igual (<=).",
      "Condición: WHERE precio <= 20.0;"
    ],
    "explicacion": "El operador '<=' incluye tanto los valores menores como el valor exacto del límite especificado.",
    "seccionId": 1
  },
  {
    "id": 10,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 2: Filtrado y Operadores Relacionales",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "<>"
    ],
    "titulo": "10. Exclusión de valores con desigualdad (<>)",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong> y <strong>pais</strong> de todos los clientes que no sean de <code>'España'</code>.",
    "queryEsperada": "SELECT nombre, apellido, pais FROM clientes WHERE pais <> 'España';",
    "pistas": [
      "El operador estándar ANSI SQL para desigualdad es <> (también se acepta !=).",
      "Filtro: WHERE pais <> 'España';"
    ],
    "explicacion": "El operador '<>' excluye filas que coincidan exactamente con el valor dado.",
    "seccionId": 1
  },
  {
    "id": 11,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 3: Operadores Lógicos AND, OR, NOT",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "AND"
    ],
    "titulo": "11. Conjunción estricta con AND",
    "descripcion": "Consulta el <strong>titulo</strong>, <strong>consola</strong> y <strong>precio</strong> de los videojuegos que sean para la consola <code>'PC'</code> Y que cuesten menos de <code>30.0</code> dólares.",
    "queryEsperada": "SELECT titulo, consola, precio FROM videojuegos WHERE consola = 'PC' AND precio < 30.0;",
    "pistas": [
      "El operador AND exige que ambas condiciones se cumplan simultáneamente.",
      "Condición: WHERE consola = 'PC' AND precio < 30.0;"
    ],
    "explicacion": "La conjunción lógica AND solo produce TRUE cuando ambas expresiones booleanas son verdaderas.",
    "seccionId": 1
  },
  {
    "id": 12,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 3: Operadores Lógicos AND, OR, NOT",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "OR"
    ],
    "titulo": "12. Disyunción inclusiva con OR",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>pais</strong> de los clientes que vivan en <code>'Colombia'</code> O en <code>'Argentina'</code>.",
    "queryEsperada": "SELECT nombre, apellido, pais FROM clientes WHERE pais = 'Colombia' OR pais = 'Argentina';",
    "pistas": [
      "El operador OR permite que se cumpla cualquiera de las dos opciones.",
      "WHERE pais = 'Colombia' OR pais = 'Argentina';"
    ],
    "explicacion": "El operador OR retorna TRUE si al menos una de las condiciones es verdadera.",
    "seccionId": 1
  },
  {
    "id": 13,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 3: Operadores Lógicos AND, OR, NOT",
    "nivel": "Básico",
    "tags": [
      "WHERE",
      "NOT"
    ],
    "titulo": "13. Inversión lógica con NOT",
    "descripcion": "Obtén el <strong>titulo</strong> y <strong>genero</strong> de todos los videojuegos que NO pertenezcan al género <code>'Acción'</code> usando el operador <code>NOT</code>.",
    "queryEsperada": "SELECT titulo, genero FROM videojuegos WHERE NOT genero = 'Acción';",
    "pistas": [
      "Antepón la palabra reservada NOT antes de la condición.",
      "Escribe: WHERE NOT genero = 'Acción';"
    ],
    "explicacion": "NOT invierte el resultado lógico de una expresión: convierte TRUE en FALSE y viceversa.",
    "seccionId": 1
  },
  {
    "id": 14,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 4: Rangos, Listas y Patrones",
    "nivel": "Básico",
    "tags": [
      "BETWEEN"
    ],
    "titulo": "14. Rango inclusivo con BETWEEN",
    "descripcion": "Muestra el <strong>titulo</strong> y el <strong>año_lanzamiento</strong> de los videojuegos lanzados entre los años <code>2015</code> y <code>2020</code> (ambos inclusive).",
    "queryEsperada": "SELECT titulo, año_lanzamiento FROM videojuegos WHERE año_lanzamiento BETWEEN 2015 AND 2020;",
    "pistas": [
      "Usa el operador BETWEEN valor_min AND valor_max.",
      "WHERE año_lanzamiento BETWEEN 2015 AND 2020;"
    ],
    "explicacion": "BETWEEN es una sintaxis concisa equivalente a (campo >= min AND campo <= max), incluyendo siempre ambos límites.",
    "seccionId": 1
  },
  {
    "id": 15,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 4: Rangos, Listas y Patrones",
    "nivel": "Básico",
    "tags": [
      "NOT BETWEEN"
    ],
    "titulo": "15. Exclusión de franja con NOT BETWEEN",
    "descripcion": "Encuentra el <strong>titulo</strong> y el <strong>precio</strong> de los videojuegos cuyo precio NO esté dentro de la franja de <code>20.0</code> a <code>60.0</code> dólares.",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos WHERE precio NOT BETWEEN 20.0 AND 60.0;",
    "pistas": [
      "Combina NOT con BETWEEN.",
      "WHERE precio NOT BETWEEN 20.0 AND 60.0;"
    ],
    "explicacion": "NOT BETWEEN selecciona valores que se encuentren estrictamente por debajo del mínimo o por encima del máximo.",
    "seccionId": 1
  },
  {
    "id": 16,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 4: Rangos, Listas y Patrones",
    "nivel": "Básico",
    "tags": [
      "IN"
    ],
    "titulo": "16. Pertenencia a lista con IN",
    "descripcion": "Consulta el <strong>titulo</strong> y la <strong>consola</strong> de los videojuegos disponibles para <code>'Nintendo Switch'</code> o <code>'PlayStation 5'</code> utilizando el operador <code>IN</code>.",
    "queryEsperada": "SELECT titulo, consola FROM videojuegos WHERE consola IN ('Nintendo Switch', 'PlayStation 5');",
    "pistas": [
      "Encierra los valores permitidos entre paréntesis separados por comas.",
      "WHERE consola IN ('Nintendo Switch', 'PlayStation 5');"
    ],
    "explicacion": "El operador IN simplifica múltiples cláusulas OR sucesivas sobre una misma columna.",
    "seccionId": 1
  },
  {
    "id": 17,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 4: Rangos, Listas y Patrones",
    "nivel": "Básico",
    "tags": [
      "NOT IN"
    ],
    "titulo": "17. Exclusión de lista con NOT IN",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong> y <strong>pais</strong> de los clientes cuyo país NO sea ni <code>'México'</code> ni <code>'España'</code>.",
    "queryEsperada": "SELECT nombre, apellido, pais FROM clientes WHERE pais NOT IN ('México', 'España');",
    "pistas": [
      "Usa NOT IN ('México', 'España').",
      "WHERE pais NOT IN ('México', 'España');"
    ],
    "explicacion": "NOT IN comprueba que el valor evaluado no coincida con ninguno de los elementos del conjunto.",
    "seccionId": 1
  },
  {
    "id": 18,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 4: Rangos, Listas y Patrones",
    "nivel": "Básico",
    "tags": [
      "LIKE"
    ],
    "titulo": "18. Búsqueda por prefijo con LIKE (%)",
    "descripcion": "Encuentra el <strong>titulo</strong> y <strong>desarrollador</strong> de los videojuegos cuyo desarrollador comience con la palabra <code>'Rockstar'</code>.",
    "queryEsperada": "SELECT titulo, desarrollador FROM videojuegos WHERE desarrollador LIKE 'Rockstar%';",
    "pistas": [
      "El comodín % colocado al final busca cualquier texto que inicie con ese prefijo.",
      "WHERE desarrollador LIKE 'Rockstar%';"
    ],
    "explicacion": "El operador LIKE permite coincidencias difusas de cadenas. El símbolo % representa cero o más caracteres arbitrarios.",
    "seccionId": 1
  },
  {
    "id": 19,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 5: Ordenamiento y Límites",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "ASC"
    ],
    "titulo": "19. Ordenamiento ascendente con ORDER BY",
    "descripcion": "Muestra el <strong>titulo</strong> y el <strong>precio</strong> de todos los videojuegos ordenados del más barato al más caro (ascendente).",
    "queryEsperada": "SELECT titulo, precio FROM videojuegos ORDER BY precio ASC;",
    "pistas": [
      "Añade ORDER BY precio ASC al final de la consulta.",
      "ASC indica orden ascendente (menor a mayor)."
    ],
    "explicacion": "ORDER BY clasifica las filas del conjunto de resultados. Si se omite la dirección, ASC es el comportamiento predeterminado.",
    "seccionId": 1
  },
  {
    "id": 20,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 5: Ordenamiento y Límites",
    "nivel": "Básico",
    "tags": [
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "20. Top 5 mejores valorados con LIMIT",
    "descripcion": "Obtén el <strong>titulo</strong> y la <strong>calificacion</strong> de los <strong>5</strong> videojuegos con mayor calificación de la tienda.",
    "queryEsperada": "SELECT titulo, calificacion FROM videojuegos ORDER BY calificacion DESC LIMIT 5;",
    "pistas": [
      "Ordena de mayor a menor con DESC y luego corta con LIMIT 5.",
      "ORDER BY calificacion DESC LIMIT 5;"
    ],
    "explicacion": "La combinación de ORDER BY DESC con LIMIT es el patrón estándar en SQL para resolver problemas de 'Top N'.",
    "seccionId": 1
  },
  {
    "id": 21,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 6: Precedencia Lógica y Paréntesis",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "21. Los 3 juegos disponibles más económicos",
    "descripcion": "Consulta el <strong>titulo</strong>, <strong>precio</strong> y <strong>stock</strong> de los 3 videojuegos disponibles en inventario (<code>stock > 0</code>) que tengan el menor precio.",
    "queryEsperada": "SELECT titulo, precio, stock FROM videojuegos WHERE stock > 0 ORDER BY precio ASC LIMIT 3;",
    "pistas": [
      "Aplica primero el filtro WHERE stock > 0.",
      "Luego ordena por precio ASC y corta con LIMIT 3."
    ],
    "explicacion": "Filtra primero las existencias positivas y clasifica el subconjunto resultante para extraer los 3 más accesibles.",
    "seccionId": 1
  },
  {
    "id": 22,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 6: Precedencia Lógica y Paréntesis",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "AND",
      "OR"
    ],
    "titulo": "22. Precedencia lógica: (A OR B) AND C",
    "descripcion": "Obtén el <strong>titulo</strong>, <strong>consola</strong> y <strong>calificacion</strong> de los videojuegos que pertenezcan a <code>'PC'</code> O a <code>'Nintendo Switch'</code>, pero que OBLIGATORIAMENTE tengan una calificación mayor o igual a <code>9.5</code>.",
    "queryEsperada": "SELECT titulo, consola, calificacion FROM videojuegos WHERE (consola = 'PC' OR consola = 'Nintendo Switch') AND calificacion >= 9.5;",
    "pistas": [
      "Encierra entre paréntesis la condición de consola: (consola = 'PC' OR consola = 'Nintendo Switch').",
      "Luego añade: AND calificacion >= 9.5;"
    ],
    "explicacion": "Debido a que AND tiene mayor prioridad que OR, sin paréntesis la consulta devolvería todos los juegos de PC sin importar su calificación.",
    "seccionId": 1
  },
  {
    "id": 23,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 6: Precedencia Lógica y Paréntesis",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "AND",
      "OR"
    ],
    "titulo": "23. Precedencia inversa: A OR (B AND C)",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong>, <strong>pais</strong> y <strong>saldo_cuenta</strong> de los clientes que vivan en <code>'México'</code> O que estén activos (<code>activo = 1</code>) con un saldo mayor a <code>100.0</code>.",
    "queryEsperada": "SELECT nombre, apellido, pais, saldo_cuenta FROM clientes WHERE pais = 'México' OR (activo = 1 AND saldo_cuenta > 100.0);",
    "pistas": [
      "Agrupa con paréntesis la condición compuesta: (activo = 1 AND saldo_cuenta > 100.0).",
      "Usa OR para unir con pais = 'México'."
    ],
    "explicacion": "Los paréntesis eliminan ambigüedad y documentan explícitamente las reglas de negocio del filtrado.",
    "seccionId": 1
  },
  {
    "id": 24,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 7: Patrones Específicos y Búsqueda",
    "nivel": "Intermedio",
    "tags": [
      "LIKE",
      "_"
    ],
    "titulo": "24. Comodín posicional exacto (_)",
    "descripcion": "Encuentra el <strong>titulo</strong> y <strong>año_lanzamiento</strong> de los videojuegos cuyo año de lanzamiento comience con <code>'202'</code> seguido de exactamente un dígito adicional (juegos de la década de 2020).",
    "queryEsperada": "SELECT titulo, año_lanzamiento FROM videojuegos WHERE año_lanzamiento LIKE '202_';",
    "pistas": [
      "El guion bajo (_) representa exactamente un único carácter.",
      "WHERE año_lanzamiento LIKE '202_';"
    ],
    "explicacion": "A diferencia de '%', el comodín '_' restringe la longitud a exactamente un único símbolo en esa posición.",
    "seccionId": 1
  },
  {
    "id": 25,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 7: Patrones Específicos y Búsqueda",
    "nivel": "Intermedio",
    "tags": [
      "LIKE",
      "%"
    ],
    "titulo": "25. Coincidencia de subcadena con %texto%",
    "descripcion": "Muestra el <strong>titulo</strong> y el <strong>genero</strong> de todos los videojuegos cuyo género contenga en cualquier posición la palabra <code>'Acción'</code>.",
    "queryEsperada": "SELECT titulo, genero FROM videojuegos WHERE genero LIKE '%Acción%';",
    "pistas": [
      "Coloca el símbolo % tanto antes como después del término: '%Acción%'.",
      "Esto capturará géneros como 'Acción RPG' y 'Acción Aventura'."
    ],
    "explicacion": "El patrón '%palabra%' es la técnica estándar para búsquedas de texto contenido en cualquier parte del campo.",
    "seccionId": 1
  },
  {
    "id": 26,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 7: Patrones Específicos y Búsqueda",
    "nivel": "Intermedio",
    "tags": [
      "NOT LIKE"
    ],
    "titulo": "26. Exclusión de patrones corporativos con NOT LIKE",
    "descripcion": "Obtén el <strong>titulo</strong> y <strong>desarrollador</strong> de los videojuegos cuyo desarrollador no contenga la palabra <code>'Studio'</code> ni contenga <code>'Games'</code>.",
    "queryEsperada": "SELECT titulo, desarrollador FROM videojuegos WHERE desarrollador NOT LIKE '%Studio%' AND desarrollador NOT LIKE '%Games%';",
    "pistas": [
      "Usa dos cláusulas NOT LIKE unidas con AND.",
      "WHERE desarrollador NOT LIKE '%Studio%' AND desarrollador NOT LIKE '%Games%';"
    ],
    "explicacion": "Para excluir múltiples patrones de subcadena simultáneamente, se encadenan mediante el operador AND.",
    "seccionId": 1
  },
  {
    "id": 27,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 8: Filtrado de Fechas y Cronología",
    "nivel": "Intermedio",
    "tags": [
      "BETWEEN",
      "Fechas"
    ],
    "titulo": "27. Filtrado cronológico con BETWEEN",
    "descripcion": "Encuentra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>fecha_registro</strong> de los clientes registrados entre el <code>'2021-01-01'</code> y el <code>'2022-12-31'</code>.",
    "queryEsperada": "SELECT nombre, apellido, fecha_registro FROM clientes WHERE fecha_registro BETWEEN '2021-01-01' AND '2022-12-31';",
    "pistas": [
      "Las fechas en formato ISO YYYY-MM-DD se comparan directamente como cadenas alfanuméricas.",
      "WHERE fecha_registro BETWEEN '2021-01-01' AND '2022-12-31';"
    ],
    "explicacion": "El formato estándar ISO-8601 permite ordenar y comparar rangos de fechas de forma natural con BETWEEN.",
    "seccionId": 1
  },
  {
    "id": 28,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 8: Filtrado de Fechas y Cronología",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "Fechas",
      "ORDER BY"
    ],
    "titulo": "28. Nuevos clientes a partir de 2022 ordenados",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>email</strong> y <strong>fecha_registro</strong> de los clientes registrados desde el <code>'2022-01-01'</code> en adelante, ordenados del más antiguo al más reciente.",
    "queryEsperada": "SELECT nombre, email, fecha_registro FROM clientes WHERE fecha_registro >= '2022-01-01' ORDER BY fecha_registro ASC;",
    "pistas": [
      "Usa el operador >= '2022-01-01'.",
      "Ordena con ORDER BY fecha_registro ASC."
    ],
    "explicacion": "Al ordenar fechas en formato ISO de forma ascendente, los registros más antiguos aparecen primero.",
    "seccionId": 1
  },
  {
    "id": 29,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 9: Ordenamiento Compuesto y Paginación",
    "nivel": "Intermedio",
    "tags": [
      "ORDER BY"
    ],
    "titulo": "29. Ordenamiento compuesto multi-columna",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>consola</strong> y <strong>precio</strong> de todos los videojuegos ordenados primero por <strong>consola</strong> alfabéticamente (ASC) y, para la misma consola, por <strong>precio</strong> de mayor a menor (DESC).",
    "queryEsperada": "SELECT titulo, consola, precio FROM videojuegos ORDER BY consola ASC, precio DESC;",
    "pistas": [
      "Separa las columnas de ordenación por coma indicando la dirección de cada una.",
      "ORDER BY consola ASC, precio DESC;"
    ],
    "explicacion": "SQL permite clasificar jerárquicamente: si hay empates en la primera columna, se desempata con la segunda.",
    "seccionId": 1
  },
  {
    "id": 30,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 9: Ordenamiento Compuesto y Paginación",
    "nivel": "Intermedio",
    "tags": [
      "DISTINCT",
      "WHERE",
      "ORDER BY"
    ],
    "titulo": "30. Países únicos con saldo positivo ordenados",
    "descripcion": "Extrae los países únicos de aquellos clientes que tengan un <strong>saldo_cuenta</strong> mayor a cero, ordenados alfabéticamente.",
    "queryEsperada": "SELECT DISTINCT pais FROM clientes WHERE saldo_cuenta > 0 ORDER BY pais ASC;",
    "pistas": [
      "Usa SELECT DISTINCT pais ... WHERE saldo_cuenta > 0 ORDER BY pais ASC;"
    ],
    "explicacion": "Combina DISTINCT para evitar redundancia junto con un filtro de solvencia y ordenación alfabética.",
    "seccionId": 1
  },
  {
    "id": 31,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 9: Ordenamiento Compuesto y Paginación",
    "nivel": "Intermedio",
    "tags": [
      "LIMIT",
      "OFFSET"
    ],
    "titulo": "31. Paginación de catálogo con OFFSET",
    "descripcion": "Simula la página 2 de un listado paginado: selecciona el <strong>id</strong>, <strong>titulo</strong> y <strong>precio</strong> de los videojuegos ordenados por <strong>id ASC</strong>, omitiendo los primeros 5 y obteniendo los siguientes 5 registros.",
    "queryEsperada": "SELECT id, titulo, precio FROM videojuegos ORDER BY id ASC LIMIT 5 OFFSET 5;",
    "pistas": [
      "Usa LIMIT 5 OFFSET 5 al final de la consulta.",
      "ORDER BY id ASC asegura un orden determinista."
    ],
    "explicacion": "OFFSET salta N filas iniciales y LIMIT toma las M siguientes, conformando la base de la paginación web.",
    "seccionId": 1
  },
  {
    "id": 32,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 9: Ordenamiento Compuesto y Paginación",
    "nivel": "Intermedio",
    "tags": [
      "LIMIT",
      "OFFSET",
      "ORDER BY"
    ],
    "titulo": "32. Paginación determinista con desempate",
    "descripcion": "Selecciona el <strong>titulo</strong>, <strong>calificacion</strong> e <strong>id</strong> de los videojuegos ordenados por <strong>calificacion DESC</strong> (y por <strong>id ASC</strong> en caso de empate), saltando 10 registros y mostrando los siguientes 5.",
    "queryEsperada": "SELECT titulo, calificacion, id FROM videojuegos ORDER BY calificacion DESC, id ASC LIMIT 5 OFFSET 10;",
    "pistas": [
      "Ordena por dos columnas: calificacion DESC, id ASC.",
      "Aplica LIMIT 5 OFFSET 10;"
    ],
    "explicacion": "Para evitar que la paginación repita u omita filas con valores idénticos, siempre debe incluirse un criterio único de desempate.",
    "seccionId": 1
  },
  {
    "id": 33,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "Booleanos"
    ],
    "titulo": "33. Filtrado por estado activo y saldo mínimo",
    "descripcion": "Consulta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong> de los clientes con cuenta activa (<code>activo = 1</code>) cuyo saldo sea mayor o igual a <code>50.0</code>.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta FROM clientes WHERE activo = 1 AND saldo_cuenta >= 50.0;",
    "pistas": [
      "En SQLite los booleanos se representan como 1 (TRUE) y 0 (FALSE).",
      "WHERE activo = 1 AND saldo_cuenta >= 50.0;"
    ],
    "explicacion": "Representación estándar de estados booleanos en motores relacionales combinada con filtros cuantitativos.",
    "seccionId": 1
  },
  {
    "id": 34,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "Aritmética"
    ],
    "titulo": "34. Valorización total de inventario en WHERE",
    "descripcion": "Muestra el <strong>titulo</strong>, <strong>precio</strong>, <strong>stock</strong> y el valor total del inventario proyectado como <code>(precio * stock) AS valor_inventario</code> para aquellos juegos cuyo valor total almacenado supere los <code>1000.0</code> dólares, ordenados por <code>valor_inventario DESC</code>.",
    "queryEsperada": "SELECT titulo, precio, stock, (precio * stock) AS valor_inventario FROM videojuegos WHERE (precio * stock) > 1000.0 ORDER BY valor_inventario DESC;",
    "pistas": [
      "Como el WHERE no puede usar el alias en SQLite, escribe: WHERE (precio * stock) > 1000.0.",
      "Ordena con ORDER BY valor_inventario DESC."
    ],
    "explicacion": "Demuestra la necesidad de repetir la fórmula en la cláusula WHERE debido al orden de evaluación lógica de SQL.",
    "seccionId": 1
  },
  {
    "id": 35,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "NOT IN",
      "NOT LIKE"
    ],
    "titulo": "35. Exclusión simultánea por consola y género",
    "descripcion": "Obtén el <strong>titulo</strong>, <strong>consola</strong> y <strong>genero</strong> de los videojuegos que NO sean para <code>'PC'</code> ni <code>'PlayStation 4'</code> Y cuyo género no contenga <code>'Acción'</code>.",
    "queryEsperada": "SELECT titulo, consola, genero FROM videojuegos WHERE consola NOT IN ('PC', 'PlayStation 4') AND genero NOT LIKE '%Acción%';",
    "pistas": [
      "Combina NOT IN con NOT LIKE mediante AND.",
      "WHERE consola NOT IN ('PC', 'PlayStation 4') AND genero NOT LIKE '%Acción%';"
    ],
    "explicacion": "Depura el catálogo aplicando exclusión categórica de plataformas y exclusión difusa de géneros.",
    "seccionId": 1
  },
  {
    "id": 36,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "UPPER",
      "WHERE"
    ],
    "titulo": "36. Filtrado insensible a mayúsculas con UPPER",
    "descripcion": "Selecciona el <strong>nombre</strong>, <strong>apellido</strong> y <strong>email</strong> de los clientes cuyo país sea <code>'Colombia'</code>, asegurando una comparación robusta convirtiendo el campo a mayúsculas con <code>UPPER(pais) = 'COLOMBIA'</code>.",
    "queryEsperada": "SELECT nombre, apellido, email FROM clientes WHERE UPPER(pais) = 'COLOMBIA';",
    "pistas": [
      "Aplica UPPER sobre la columna pais.",
      "Compara con el literal en mayúsculas: 'COLOMBIA'."
    ],
    "explicacion": "Normalizar cadenas con UPPER o LOWER previene inconsistencias por diferencias de capitalización en la captura de datos.",
    "seccionId": 1
  },
  {
    "id": 37,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "LENGTH",
      "WHERE"
    ],
    "titulo": "37. Filtrado analítico por longitud de texto",
    "descripcion": "Muestra el <strong>titulo</strong> y su longitud proyectada como <code>LENGTH(titulo) AS longitud_titulo</code> de aquellos videojuegos cuyos títulos tengan más de <code>20</code> caracteres, ordenados por <code>longitud_titulo DESC</code>.",
    "queryEsperada": "SELECT titulo, LENGTH(titulo) AS longitud_titulo FROM videojuegos WHERE LENGTH(titulo) > 20 ORDER BY longitud_titulo DESC;",
    "pistas": [
      "Usa la función escalar LENGTH(titulo) en el SELECT y en el WHERE.",
      "Ordena por longitud_titulo DESC."
    ],
    "explicacion": "LENGTH calcula el número de caracteres de una cadena para análisis y restricciones de interfaz.",
    "seccionId": 1
  },
  {
    "id": 38,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "BETWEEN",
      "IN",
      "ORDER BY"
    ],
    "titulo": "38. Filtro triple: Rango, Plataforma y Calidad",
    "descripcion": "Encuentra el <strong>titulo</strong>, <strong>consola</strong>, <strong>precio</strong> y <strong>calificacion</strong> de los videojuegos con precio entre <code>20.0</code> y <code>60.0</code>, disponibles para <code>'PC'</code> o <code>'Nintendo Switch'</code>, ordenados por <strong>calificacion DESC</strong>.",
    "queryEsperada": "SELECT titulo, consola, precio, calificacion FROM videojuegos WHERE precio BETWEEN 20.0 AND 60.0 AND consola IN ('PC', 'Nintendo Switch') ORDER BY calificacion DESC;",
    "pistas": [
      "Usa precio BETWEEN 20.0 AND 60.0.",
      "Une con consola IN ('PC', 'Nintendo Switch') y finaliza con ORDER BY calificacion DESC."
    ],
    "explicacion": "Combina rangos numéricos continuos con listas discretas y ordenamiento de prioridad.",
    "seccionId": 1
  },
  {
    "id": 39,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "ORDER BY"
    ],
    "titulo": "39. Detección de quiebres de stock (Agotados)",
    "descripcion": "Obtén el <strong>titulo</strong>, <strong>consola</strong> y <strong>stock</strong> de los videojuegos que se encuentren completamente agotados (<code>stock = 0</code>), ordenados alfabéticamente por <strong>titulo ASC</strong>.",
    "queryEsperada": "SELECT titulo, consola, stock FROM videojuegos WHERE stock = 0 ORDER BY titulo ASC;",
    "pistas": [
      "Filtro: WHERE stock = 0.",
      "Orden: ORDER BY titulo ASC."
    ],
    "explicacion": "Monitoreo crítico de inventario para generar alertas de reposición inmediata.",
    "seccionId": 1
  },
  {
    "id": 40,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 10: Filtros Avanzados, Cálculos y Funciones",
    "nivel": "Intermedio",
    "tags": [
      "WHERE",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "40. Alerta temprana de reposición (Stock Crítico)",
    "descripcion": "Identifica los <strong>4</strong> videojuegos con existencias disponibles (<code>stock > 0</code>) que tengan el menor stock registrado para solicitar reabastecimiento.",
    "queryEsperada": "SELECT titulo, precio, stock FROM videojuegos WHERE stock > 0 ORDER BY stock ASC LIMIT 4;",
    "pistas": [
      "Filtra existencias positivas: WHERE stock > 0.",
      "Ordena de menor a mayor con ORDER BY stock ASC y limita a 4."
    ],
    "explicacion": "Excluye productos agotados y localiza los elementos activos más próximos al desabastecimiento.",
    "seccionId": 1
  },
  {
    "id": 41,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 11: Lógica Condicional con CASE WHEN",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN"
    ],
    "titulo": "41. Clasificación dinámica de inventario con CASE",
    "descripcion": "Proyecta el <strong>titulo</strong>, el <strong>stock</strong> y una columna calculada llamada <code>estado_inventario</code>: si stock es 0 debe decir <code>'Agotado'</code>, si es menor a 20 debe decir <code>'Stock Bajo'</code>, y en cualquier otro caso <code>'Stock Suficiente'</code>. Ordena por <strong>stock ASC</strong>.",
    "queryEsperada": "SELECT titulo, stock,\n  CASE\n    WHEN stock = 0 THEN 'Agotado'\n    WHEN stock < 20 THEN 'Stock Bajo'\n    ELSE 'Stock Suficiente'\n  END AS estado_inventario\nFROM videojuegos\nORDER BY stock ASC;",
    "pistas": [
      "Estructura: CASE WHEN condicion1 THEN '...' WHEN condicion2 THEN '...' ELSE '...' END AS estado_inventario.",
      "Ordena por stock ASC."
    ],
    "explicacion": "La expresión CASE transforma códigos numéricos en etiquetas de negocio intuitivas sin alterar la tabla física.",
    "seccionId": 1
  },
  {
    "id": 42,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 11: Lógica Condicional con CASE WHEN",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN"
    ],
    "titulo": "42. Segmentación de precios en tres gamas",
    "descripcion": "Muestra el <strong>titulo</strong>, el <strong>precio</strong> y una columna <code>gama_precio</code>: <code>'Económico'</code> si precio es menor a 20.0, <code>'Estándar'</code> si está entre 20.0 y 50.0, y <code>'Premium'</code> si supera 50.0. Ordena por <strong>precio DESC</strong>.",
    "queryEsperada": "SELECT titulo, precio,\n  CASE\n    WHEN precio < 20.0 THEN 'Económico'\n    WHEN precio BETWEEN 20.0 AND 50.0 THEN 'Estándar'\n    ELSE 'Premium'\n  END AS gama_precio\nFROM videojuegos\nORDER BY precio DESC;",
    "pistas": [
      "Utiliza WHEN precio < 20.0, WHEN precio BETWEEN 20.0 AND 50.0 y ELSE 'Premium'.",
      "Cierra con END AS gama_precio y ordena con ORDER BY precio DESC."
    ],
    "explicacion": "Segmenta analíticamente una variable continua en intervalos cualitativos de negocio.",
    "seccionId": 1
  },
  {
    "id": 43,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 11: Lógica Condicional con CASE WHEN",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN",
      "ORDER BY"
    ],
    "titulo": "43. Ordenamiento prioritario personalizado con CASE",
    "descripcion": "Selecciona el <strong>titulo</strong>, la <strong>consola</strong> y el <strong>precio</strong> de los videojuegos ordenándolos bajo una prioridad personalizada de consola: 1º 'Nintendo Switch', 2º 'PlayStation 5', 3º 'PC', 4º cualquier otra, y como segundo criterio por <strong>precio DESC</strong>.",
    "queryEsperada": "SELECT titulo, consola, precio\nFROM videojuegos\nORDER BY\n  CASE consola\n    WHEN 'Nintendo Switch' THEN 1\n    WHEN 'PlayStation 5' THEN 2\n    WHEN 'PC' THEN 3\n    ELSE 4\n  END ASC,\n  precio DESC;",
    "pistas": [
      "Coloca el bloque CASE directamente en la cláusula ORDER BY.",
      "Asigna enteros (1, 2, 3, 4) y ordénalos ASC junto a precio DESC."
    ],
    "explicacion": "El ordenamiento por CASE permite definir ponderaciones arbitrarias que no dependen del orden alfabético natural.",
    "seccionId": 1
  },
  {
    "id": 44,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 12: Filtrado Multi-criterio y Seguridad",
    "nivel": "Avanzado",
    "tags": [
      "WHERE",
      "AND",
      "OR"
    ],
    "titulo": "44. Matriz de ofertas de calidad por consola",
    "descripcion": "Obtén el <strong>titulo</strong>, <strong>genero</strong>, <strong>consola</strong>, <strong>precio</strong> y <strong>calificacion</strong> de aquellos juegos que cumplan: (ser de PlayStation 5 y costar menos de 60.0) O (ser de Nintendo Switch y costar menos de 30.0), y que en ambos casos su calificación sea al menos <code>9.0</code>.",
    "queryEsperada": "SELECT titulo, genero, consola, precio, calificacion\nFROM videojuegos\nWHERE ((consola = 'PlayStation 5' AND precio < 60.0) OR (consola = 'Nintendo Switch' AND precio < 30.0))\n  AND calificacion >= 9.0;",
    "pistas": [
      "Usa doble nivel de paréntesis: ((consola = '...' AND precio < ...) OR (...)) AND calificacion >= 9.0."
    ],
    "explicacion": "Construye filtros con diferentes umbrales cuantitativos por categoría antes de aplicar el corte de calidad global.",
    "seccionId": 1
  },
  {
    "id": 45,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 12: Filtrado Multi-criterio y Seguridad",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN",
      "ORDER BY"
    ],
    "titulo": "45. Niveles de fidelidad financiera en clientes",
    "descripcion": "Muestra el <strong>nombre</strong>, <strong>apellido</strong>, <strong>saldo_cuenta</strong> y una columna <code>categoria_cliente</code>: 'Cliente Platino' (>= 200.0), 'Cliente Oro' (>= 50.0), 'Cliente Plata' (> 0.0) y 'Sin Saldo' si es 0. Ordena por <strong>saldo_cuenta DESC</strong>.",
    "queryEsperada": "SELECT nombre, apellido, saldo_cuenta,\n  CASE\n    WHEN saldo_cuenta >= 200.0 THEN 'Cliente Platino'\n    WHEN saldo_cuenta >= 50.0 THEN 'Cliente Oro'\n    WHEN saldo_cuenta > 0.0 THEN 'Cliente Plata'\n    ELSE 'Sin Saldo'\n  END AS categoria_cliente\nFROM clientes\nORDER BY saldo_cuenta DESC;",
    "pistas": [
      "Evalúa en orden decreciente: >= 200, >= 50, > 0, ELSE.",
      "Ordena con ORDER BY saldo_cuenta DESC."
    ],
    "explicacion": "El orden de los WHEN en un CASE es fundamental: el motor evalúa secuencialmente y detiene en la primera coincidencia verdadera.",
    "seccionId": 1
  },
  {
    "id": 46,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 12: Filtrado Multi-criterio y Seguridad",
    "nivel": "Avanzado",
    "tags": [
      "LIKE"
    ],
    "titulo": "46. Detección de títulos con subtítulo (:)",
    "descripcion": "Encuentra el <strong>titulo</strong> de aquellos videojuegos que incluyan dos puntos seguidos de un espacio (<code>': '</code>) indicando un subtítulo o entrega de saga.",
    "queryEsperada": "SELECT titulo FROM videojuegos WHERE titulo LIKE '%: %';",
    "pistas": [
      "Usa LIKE con '%: %' para capturar los dos puntos seguidos de un espacio en cualquier parte.",
      "WHERE titulo LIKE '%: %';"
    ],
    "explicacion": "Patrones específicos con puntuación permiten identificar estructuras textuales particulares en bases de datos relacionales.",
    "seccionId": 1
  },
  {
    "id": 47,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 12: Filtrado Multi-criterio y Seguridad",
    "nivel": "Avanzado",
    "tags": [
      "LIKE",
      "ORDER BY"
    ],
    "titulo": "47. Verificación de formato de correo con puntos",
    "descripcion": "Consulta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>email</strong> de los clientes cuyos correos electrónicos tengan el formato estándar que incluye un punto en el nombre de usuario (usando <code>LIKE '%_%._%@%'</code>), ordenados por <strong>apellido ASC</strong>.",
    "queryEsperada": "SELECT nombre, apellido, email FROM clientes WHERE email LIKE '%_%._%@%' ORDER BY apellido ASC;",
    "pistas": [
      "El patrón '%_%._%@%' exige texto, un punto, más texto y el símbolo @.",
      "Ordena por apellido ASC."
    ],
    "explicacion": "Combina comodines '_' y '%' para auditar la validez sintáctica básica de direcciones de correo.",
    "seccionId": 1
  },
  {
    "id": 48,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 12: Filtrado Multi-criterio y Seguridad",
    "nivel": "Avanzado",
    "tags": [
      "WHERE",
      "BETWEEN",
      "IN"
    ],
    "titulo": "48. Auditoría transaccional de ventas del primer semestre",
    "descripcion": "Extrae el <strong>id</strong>, <strong>cliente_id</strong>, <strong>cantidad</strong>, <strong>precio_unitario</strong>, el subtotal calculado <code>(cantidad * precio_unitario) AS subtotal</code>, <strong>metodo_pago</strong> y <strong>fecha_venta</strong> de las ventas pagadas con 'Tarjeta' o 'PayPal' con subtotal >= 50.0 ocurridas en el primer semestre de 2023 (entre '2023-01-01' y '2023-06-30'), ordenadas por <strong>subtotal DESC</strong>.",
    "queryEsperada": "SELECT id, cliente_id, cantidad, precio_unitario, (cantidad * precio_unitario) AS subtotal, metodo_pago, fecha_venta\nFROM ventas\nWHERE metodo_pago IN ('Tarjeta', 'PayPal')\n  AND (cantidad * precio_unitario) >= 50.0\n  AND fecha_venta BETWEEN '2023-01-01' AND '2023-06-30'\nORDER BY subtotal DESC;",
    "pistas": [
      "Filtra método con IN ('Tarjeta', 'PayPal').",
      "Aplica subtotal >= 50.0 y rango de fecha con BETWEEN '2023-01-01' AND '2023-06-30'."
    ],
    "explicacion": "Consulta típica de control financiero y auditoría interna que cruza medios de cobro, montos y periodos fiscales.",
    "seccionId": 1
  },
  {
    "id": 49,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 12: Filtrado Multi-criterio y Seguridad",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN",
      "Seguridad"
    ],
    "titulo": "49. Enmascaramiento condicional de datos (Data Masking)",
    "descripcion": "Proyecta el <strong>nombre</strong>, una columna <code>email_contacto</code> que muestre el email real si el cliente está activo (<code>activo = 1</code>) o la leyenda <code>'***CUENTA_INACTIVA***'</code> si está inactivo, además de su <strong>pais</strong> y <strong>activo</strong>, ordenados por <strong>activo DESC, nombre ASC</strong>.",
    "queryEsperada": "SELECT nombre,\n  CASE\n    WHEN activo = 1 THEN email\n    ELSE '***CUENTA_INACTIVA***'\n  END AS email_contacto,\n  pais, activo\nFROM clientes\nORDER BY activo DESC, nombre ASC;",
    "pistas": [
      "Usa CASE WHEN activo = 1 THEN email ELSE '***CUENTA_INACTIVA***' END AS email_contacto.",
      "Ordena por activo DESC, nombre ASC."
    ],
    "explicacion": "Patrón fundamental de privacidad y gobernanza de datos para ocultar información sensible de usuarios dados de baja.",
    "seccionId": 1
  },
  {
    "id": 50,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 13: Consultas Analíticas y Casos Límite",
    "nivel": "Avanzado",
    "tags": [
      "WHERE",
      "ORDER BY"
    ],
    "titulo": "50. Detección de joyas calidad-precio",
    "descripcion": "Identifica los videojuegos de culto con calificación sobresaliente (<code>calificacion >= 9.5</code>), precio accesible (<code>precio <= 30.0</code>) y con existencias en almacén (<code>stock > 0</code>), mostrando <strong>titulo</strong>, <strong>calificacion</strong>, <strong>precio</strong> y <strong>consola</strong>, ordenados por <strong>calificacion DESC, precio ASC</strong>.",
    "queryEsperada": "SELECT titulo, calificacion, precio, consola\nFROM videojuegos\nWHERE calificacion >= 9.5\n  AND precio <= 30.0\n  AND stock > 0\nORDER BY calificacion DESC, precio ASC;",
    "pistas": [
      "Filtra calificacion >= 9.5, precio <= 30.0 y stock > 0.",
      "Ordena con calificacion DESC, precio ASC."
    ],
    "explicacion": "Análisis multivariable que cruza valoraciones de usuarios, precio de venta e inventario disponible.",
    "seccionId": 1
  },
  {
    "id": 51,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 13: Consultas Analíticas y Casos Límite",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN",
      "ROUND"
    ],
    "titulo": "51. Política de descuento diferenciada por plataforma",
    "descripcion": "Calcula el precio promocional según la plataforma: si la consola es <code>'PlayStation 4'</code> aplica un 20% de descuento (<code>ROUND(precio * 0.80, 2)</code>), si es <code>'PC'</code> aplica un 15% (<code>ROUND(precio * 0.85, 2)</code>), y para las demás consolas mantén el precio regular. Muestra <strong>titulo</strong>, <strong>consola</strong>, <strong>precio</strong> y <code>precio_promocional</code>, ordenados por <strong>precio_promocional ASC</strong>.",
    "queryEsperada": "SELECT titulo, consola, precio,\n  CASE\n    WHEN consola = 'PlayStation 4' THEN ROUND(precio * 0.80, 2)\n    WHEN consola = 'PC' THEN ROUND(precio * 0.85, 2)\n    ELSE precio\n  END AS precio_promocional\nFROM videojuegos\nORDER BY precio_promocional ASC;",
    "pistas": [
      "Usa CASE con dos WHEN calculando los descuentos con ROUND(..., 2).",
      "Ordena por precio_promocional ASC."
    ],
    "explicacion": "Implementa reglas de tarificación dinámica directamente en la consulta SQL.",
    "seccionId": 1
  },
  {
    "id": 52,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 13: Consultas Analíticas y Casos Límite",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN"
    ],
    "titulo": "52. Segmentación cronológica por generaciones de consolas",
    "descripcion": "Clasifica cada juego según su año de lanzamiento: <code>'Clásico Temprano'</code> (< 2015), <code>'Generación Previa'</code> (entre 2015 y 2020) y <code>'Nueva Generación'</code> (> 2020). Proyecta <strong>titulo</strong>, <strong>año_lanzamiento</strong> y la columna <code>epoca</code>, ordenados por <strong>año_lanzamiento ASC, titulo ASC</strong>.",
    "queryEsperada": "SELECT titulo, año_lanzamiento,\n  CASE\n    WHEN año_lanzamiento < 2015 THEN 'Clásico Temprano'\n    WHEN año_lanzamiento BETWEEN 2015 AND 2020 THEN 'Generación Previa'\n    ELSE 'Nueva Generación'\n  END AS epoca\nFROM videojuegos\nORDER BY año_lanzamiento ASC, titulo ASC;",
    "pistas": [
      "Aplica CASE con año_lanzamiento < 2015, BETWEEN 2015 AND 2020 y ELSE.",
      "Ordena por año_lanzamiento ASC, titulo ASC."
    ],
    "explicacion": "Agrupa variables continuas en épocas históricas para análisis de catálogo.",
    "seccionId": 1
  },
  {
    "id": 53,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 13: Consultas Analíticas y Casos Límite",
    "nivel": "Avanzado",
    "tags": [
      "WHERE",
      "IN",
      "AND",
      "OR"
    ],
    "titulo": "53. Detección de cuentas prioritarias o en riesgo",
    "descripcion": "Encuentra los clientes que: (pertenezcan a 'Chile', 'Perú' o 'Argentina' y tengan saldo > 0.0) O (estén inactivos con activo = 0 y saldo = 0.0). Muestra <strong>nombre</strong>, <strong>apellido</strong>, <strong>pais</strong>, <strong>saldo_cuenta</strong> y <strong>activo</strong>, ordenados por <strong>pais ASC, saldo_cuenta DESC</strong>.",
    "queryEsperada": "SELECT nombre, apellido, pais, saldo_cuenta, activo\nFROM clientes\nWHERE (pais IN ('Chile', 'Perú', 'Argentina') AND saldo_cuenta > 0.0)\n   OR (activo = 0 AND saldo_cuenta = 0.0)\nORDER BY pais ASC, saldo_cuenta DESC;",
    "pistas": [
      "Encierra ambas ramas disyuntivas entre paréntesis unidas con OR.",
      "Ordena por pais ASC, saldo_cuenta DESC."
    ],
    "explicacion": "Consulta bifurcada que alimenta dos flujos operacionales simultáneos: retención y depuración de cartera.",
    "seccionId": 1
  },
  {
    "id": 54,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 13: Consultas Analíticas y Casos Límite",
    "nivel": "Avanzado",
    "tags": [
      "NOT IN",
      "WHERE"
    ],
    "titulo": "54. Transacciones mayoristas con métodos alternativos",
    "descripcion": "Consulta las ventas que NO hayan sido pagadas con 'Tarjeta' ni 'PayPal' (usando <code>NOT IN</code>) y donde la cantidad adquirida sea estrictamente mayor a 1, proyectando <strong>id</strong>, <strong>videojuego_id</strong>, <strong>cantidad</strong>, <strong>precio_unitario</strong> y <strong>metodo_pago</strong>, ordenadas por <strong>precio_unitario DESC</strong>.",
    "queryEsperada": "SELECT id, videojuego_id, cantidad, precio_unitario, metodo_pago\nFROM ventas\nWHERE metodo_pago NOT IN ('Tarjeta', 'PayPal')\n  AND cantidad > 1\nORDER BY precio_unitario DESC;",
    "pistas": [
      "Filtra método con NOT IN ('Tarjeta', 'PayPal').",
      "Añade cantidad > 1 y ordena por precio_unitario DESC."
    ],
    "explicacion": "Identifica compras al por mayor liquidadas mediante canales financieros no estándar como Cripto o Transferencia.",
    "seccionId": 1
  },
  {
    "id": 55,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 13: Consultas Analíticas y Casos Límite",
    "nivel": "Avanzado",
    "tags": [
      "WHERE",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "55. Podio de honor de Nintendo Switch en oferta",
    "descripcion": "Extrae los <strong>3</strong> videojuegos mejor calificados para <code>'Nintendo Switch'</code> que tengan un precio inferior a <code>60.0</code> dólares, mostrando <strong>titulo</strong>, <strong>consola</strong>, <strong>calificacion</strong> y <strong>precio</strong>.",
    "queryEsperada": "SELECT titulo, consola, calificacion, precio\nFROM videojuegos\nWHERE consola = 'Nintendo Switch'\n  AND precio < 60.0\nORDER BY calificacion DESC\nLIMIT 3;",
    "pistas": [
      "WHERE consola = 'Nintendo Switch' AND precio < 60.0.",
      "ORDER BY calificacion DESC LIMIT 3;"
    ],
    "explicacion": "Cálculo de podio de recomendaciones de alta demanda en una plataforma específica.",
    "seccionId": 1
  },
  {
    "id": 56,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 14: Auditoría de Negocio y El Gran Desafío",
    "nivel": "Avanzado",
    "tags": [
      "WHERE",
      "Fechas"
    ],
    "titulo": "56. Clientes pioneros con saldo remanente",
    "descripcion": "Localiza a los clientes antiguos registrados antes del <code>'2021-01-01'</code> que aún conserven un <strong>saldo_cuenta</strong> mayor a <code>50.0</code> dólares, mostrando <strong>nombre</strong>, <strong>apellido</strong>, <strong>fecha_registro</strong> y <strong>saldo_cuenta</strong>, ordenados cronológicamente por <strong>fecha_registro ASC</strong>.",
    "queryEsperada": "SELECT nombre, apellido, fecha_registro, saldo_cuenta\nFROM clientes\nWHERE fecha_registro < '2021-01-01'\n  AND saldo_cuenta > 50.0\nORDER BY fecha_registro ASC;",
    "pistas": [
      "WHERE fecha_registro < '2021-01-01' AND saldo_cuenta > 50.0.",
      "ORDER BY fecha_registro ASC;"
    ],
    "explicacion": "Análisis de cuentas durmientes o clientes antiguos con pasivo financiero pendiente de redención.",
    "seccionId": 1
  },
  {
    "id": 57,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 14: Auditoría de Negocio y El Gran Desafío",
    "nivel": "Avanzado",
    "tags": [
      "LIKE",
      "NOT IN",
      "BETWEEN"
    ],
    "titulo": "57. Búsqueda combinada: Títulos compuestos fuera de deportes",
    "descripcion": "Obtén el <strong>titulo</strong>, <strong>genero</strong>, <strong>precio</strong> y <strong>calificacion</strong> de los videojuegos cuyo título contenga las palabras <code>'The'</code> o <code>'of'</code>, que NO pertenezcan a los géneros <code>'Deportes'</code> ni <code>'Carreras'</code> y cuyo precio esté entre <code>15.0</code> y <code>70.0</code>, ordenados por <strong>precio DESC</strong>.",
    "queryEsperada": "SELECT titulo, genero, precio, calificacion\nFROM videojuegos\nWHERE (titulo LIKE '%The%' OR titulo LIKE '%of%')\n  AND genero NOT IN ('Deportes', 'Carreras')\n  AND precio BETWEEN 15.0 AND 70.0\nORDER BY precio DESC;",
    "pistas": [
      "Agrupa la búsqueda de título: (titulo LIKE '%The%' OR titulo LIKE '%of%').",
      "Une con genero NOT IN ('Deportes', 'Carreras') y precio BETWEEN 15.0 AND 70.0."
    ],
    "explicacion": "Combina filtrado semántico de nombres, listas de exclusión de categorías y franjas de precio.",
    "seccionId": 1
  },
  {
    "id": 58,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 14: Auditoría de Negocio y El Gran Desafío",
    "nivel": "Avanzado",
    "tags": [
      "LIKE",
      "IN",
      "WHERE"
    ],
    "titulo": "58. Clientes activos por iniciales en mercados hispanos",
    "descripcion": "Encuentra a los clientes cuyo nombre comience por <code>'M'</code>, <code>'L'</code> o <code>'J'</code>, que residan en <code>'México'</code>, <code>'España'</code> o <code>'Colombia'</code> y que estén activos (<code>activo = 1</code>), proyectando <strong>nombre</strong>, <strong>apellido</strong>, <strong>pais</strong> y <strong>email</strong>, ordenados por <strong>nombre ASC</strong>.",
    "queryEsperada": "SELECT nombre, apellido, pais, email\nFROM clientes\nWHERE (nombre LIKE 'M%' OR nombre LIKE 'L%' OR nombre LIKE 'J%')\n  AND pais IN ('México', 'España', 'Colombia')\n  AND activo = 1\nORDER BY nombre ASC;",
    "pistas": [
      "Usa (nombre LIKE 'M%' OR nombre LIKE 'L%' OR nombre LIKE 'J%').",
      "Filtra país con IN y activo = 1, ordenando con ORDER BY nombre ASC."
    ],
    "explicacion": "Segmentación de usuarios para campañas de correo por rangos alfabéticos y mercados objetivo.",
    "seccionId": 1
  },
  {
    "id": 59,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 14: Auditoría de Negocio y El Gran Desafío",
    "nivel": "Avanzado",
    "tags": [
      "CASE WHEN",
      "Aritmética",
      "LIMIT"
    ],
    "titulo": "59. Clasificación de ventas por magnitud de ticket",
    "descripcion": "Proyecta el <strong>id</strong>, <strong>fecha_venta</strong>, <strong>cantidad</strong>, <strong>precio_unitario</strong>, el total calculado <code>(cantidad * precio_unitario) AS total_venta</code> y una columna <code>tipo_ticket</code>: 'Venta Mayor' (>= 100.0), 'Venta Media' (>= 50.0) y 'Venta Menor' en otro caso. Ordena por <strong>total_venta DESC</strong> y toma los <strong>10</strong> mayores registros.",
    "queryEsperada": "SELECT id, fecha_venta, cantidad, precio_unitario,\n  (cantidad * precio_unitario) AS total_venta,\n  CASE\n    WHEN (cantidad * precio_unitario) >= 100.0 THEN 'Venta Mayor'\n    WHEN (cantidad * precio_unitario) >= 50.0 THEN 'Venta Media'\n    ELSE 'Venta Menor'\n  END AS tipo_ticket\nFROM ventas\nORDER BY total_venta DESC\nLIMIT 10;",
    "pistas": [
      "Calcula (cantidad * precio_unitario) AS total_venta.",
      "Usa la misma expresión en el CASE para categorizar y corta con LIMIT 10."
    ],
    "explicacion": "Análisis de distribución de valor de pedidos (AOV - Average Order Value) para toma de decisiones comerciales.",
    "seccionId": 1
  },
  {
    "id": 60,
    "seccion": "Sección 1: Consultas SELECT y Filtrado",
    "modulo": "Módulo 14: Auditoría de Negocio y El Gran Desafío",
    "nivel": "Avanzado",
    "tags": [
      "DISTINCT",
      "CASE WHEN",
      "BETWEEN",
      "IN",
      "LIMIT"
    ],
    "titulo": "60. El Gran Desafío: Informe Maestro de Catálogo",
    "descripcion": "Genera un reporte maestro con registros únicos (<code>DISTINCT</code>) que proyecte: <strong>titulo</strong>, <strong>consola</strong>, <strong>genero</strong>, <strong>precio</strong>, <strong>stock</strong> y una <code>etiqueta_comercial</code> generada con <code>CASE</code> ('AGOTADO' si stock = 0, 'JOYA PREMIUM' si precio >= 60.0 y calificacion >= 9.5, 'OFERTA' si precio < 20.0 y 'REGULAR' para el resto).<br><br>Aplica los siguientes filtros combinados:<br>• Consola en 'PlayStation 5', 'Nintendo Switch' o 'PC'.<br>• Precio entre 10.0 y 70.0.<br>• Género que no contenga 'Deportes'.<br>• Excluir explícitamente juegos que estén agotados con calificación menor a 9.0 con <code>NOT (stock = 0 AND calificacion < 9.0)</code>.<br><br>Ordena por <strong>precio DESC, stock ASC</strong> y limita el reporte a <strong>15</strong> registros.",
    "queryEsperada": "SELECT DISTINCT\n  titulo,\n  consola,\n  genero,\n  precio,\n  stock,\n  CASE\n    WHEN stock = 0 THEN 'AGOTADO'\n    WHEN precio >= 60.0 AND calificacion >= 9.5 THEN 'JOYA PREMIUM'\n    WHEN precio < 20.0 THEN 'OFERTA'\n    ELSE 'REGULAR'\n  END AS etiqueta_comercial\nFROM videojuegos\nWHERE (consola IN ('PlayStation 5', 'Nintendo Switch', 'PC'))\n  AND (precio BETWEEN 10.0 AND 70.0)\n  AND (genero NOT LIKE '%Deportes%')\n  AND NOT (stock = 0 AND calificacion < 9.0)\nORDER BY precio DESC, stock ASC\nLIMIT 15;",
    "pistas": [
      "Inicia con SELECT DISTINCT titulo, consola, genero, precio, stock, CASE ... END AS etiqueta_comercial.",
      "En el WHERE enlaza las 4 condiciones con AND: IN, BETWEEN, NOT LIKE y NOT (...).",
      "Finaliza con ORDER BY precio DESC, stock ASC LIMIT 15;"
    ],
    "explicacion": "El reto definitivo de la Sección 1: combina proyección única, lógica condicional por prioridades, filtros complejos de conjunto, rango y exclusión lógica, ordenación compuesta y truncamiento con límite.",
    "seccionId": 1
  },
  {
    "id": 61,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 1: Fundamentos de INNER JOIN y Alias (AS)",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "AS"
    ],
    "titulo": "1. Primer enlace relacional: Clientes y Ventas",
    "descripcion": "Combina la tabla <code>clientes</code> con <code>ventas</code> mediante un <code>INNER JOIN</code>. Utiliza alias explícitos con la palabra clave <code>AS</code> (<code>clientes AS c</code> y <code>ventas AS vt</code>) sobre la clave foránea <code>vt.cliente_id = c.id</code>. Proyecta el <strong>nombre</strong> y <strong>apellido</strong> del cliente junto a la <strong>fecha_venta</strong> y el <strong>precio_unitario</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, vt.fecha_venta, vt.precio_unitario FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Usa la sintaxis: FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id;",
      "Proyecta los campos prefijando siempre el alias de su tabla correspondiente (c.nombre, c.apellido, vt.fecha_venta, vt.precio_unitario)."
    ],
    "explicacion": "El INNER JOIN combina registros de dos tablas cuando existe coincidencia exacta en la condición de enlace ON. El uso del alias con AS mejora la legibilidad y evita ambigüedad."
  },
  {
    "id": 62,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 1: Fundamentos de INNER JOIN y Alias (AS)",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "AS"
    ],
    "titulo": "2. Enlace de Catálogo y Transacciones",
    "descripcion": "Relaciona <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>INNER JOIN</code> vinculando <code>vt.videojuego_id = v.id</code>. Proyecta el <strong>titulo</strong> del juego, su <strong>consola</strong>, la <strong>cantidad</strong> vendida y el <strong>metodo_pago</strong>.",
    "queryEsperada": "SELECT v.titulo, v.consola, vt.cantidad, vt.metodo_pago FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id;",
    "pistas": [
      "Conecta v.id con vt.videojuego_id en la cláusula ON.",
      "Selecciona v.titulo, v.consola, vt.cantidad, vt.metodo_pago."
    ],
    "explicacion": "Permite contrastar las características del catálogo de videojuegos con las transacciones comerciales efectivas."
  },
  {
    "id": 63,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 1: Fundamentos de INNER JOIN y Alias (AS)",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "Aritmética",
      "AS"
    ],
    "titulo": "3. Cálculo de importe por renglón de venta",
    "descripcion": "Realiza un <code>INNER JOIN</code> entre <code>videojuegos AS v</code> y <code>ventas AS vt</code>. Proyecta el <strong>titulo</strong> del videojuego, la <strong>cantidad</strong>, el <strong>precio_unitario</strong> y calcula el subtotal multiplicando (<code>vt.cantidad * vt.precio_unitario</code>) renombrado explícitamente con <code>AS total_linea</code>.",
    "queryEsperada": "SELECT v.titulo, vt.cantidad, vt.precio_unitario, (vt.cantidad * vt.precio_unitario) AS total_linea FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id;",
    "pistas": [
      "Multiplica vt.cantidad * vt.precio_unitario.",
      "Asigna el alias AS total_linea a la expresión de cálculo."
    ],
    "explicacion": "Los cálculos aritméticos en consultas combinadas permiten generar totales transaccionales sin requerir campos redundantes en la base de datos."
  },
  {
    "id": 64,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 1: Fundamentos de INNER JOIN y Alias (AS)",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "AS"
    ],
    "titulo": "4. Desambiguación explícita de identificadores con AS",
    "descripcion": "Tanto <code>clientes</code> como <code>ventas</code> poseen una columna llamada <code>id</code>. Une ambas tablas con <code>INNER JOIN</code> proyectando el <strong>id del cliente</strong> renombrado como <code>cliente_id</code> y el <strong>id de la venta</strong> renombrado como <code>venta_id</code>, acompañados por el <strong>nombre</strong> del cliente y la <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT c.id AS cliente_id, vt.id AS venta_id, c.nombre, vt.fecha_venta FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Usa c.id AS cliente_id y vt.id AS venta_id.",
      "Prefija siempre el alias antes del punto para resolver cualquier ambigüedad de nombres."
    ],
    "explicacion": "Cuando dos tablas comparten nombres de columnas, es indispensable prefijarlas y renombrarlas con AS para evitar errores de ambigüedad."
  },
  {
    "id": 65,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 1: Fundamentos de INNER JOIN y Alias (AS)",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "WHERE"
    ],
    "titulo": "5. Filtrado por método de pago con Tarjeta",
    "descripcion": "Obtén el <strong>nombre</strong>, <strong>email</strong> y <strong>fecha_venta</strong> de todas las compras pagadas con <code>'Tarjeta'</code> uniendo <code>clientes AS c</code> y <code>ventas AS vt</code> mediante <code>INNER JOIN</code>.",
    "queryEsperada": "SELECT c.nombre, c.email, vt.fecha_venta FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.metodo_pago = 'Tarjeta';",
    "pistas": [
      "Agrega la cláusula WHERE vt.metodo_pago = 'Tarjeta' al final del INNER JOIN.",
      "Proyecta c.nombre, c.email, vt.fecha_venta."
    ],
    "explicacion": "La cláusula WHERE se aplica después del INNER JOIN para filtrar las filas resultantes de la combinación."
  },
  {
    "id": 66,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 1: Fundamentos de INNER JOIN y Alias (AS)",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "WHERE"
    ],
    "titulo": "6. Filtrado de ventas en plataforma PC",
    "descripcion": "Combina <code>videojuegos AS v</code> y <code>ventas AS vt</code> con <code>INNER JOIN</code> para obtener el <strong>titulo</strong>, el <strong>precio</strong> y el <strong>metodo_pago</strong> de todos los videojuegos vendidos para la consola <code>'PC'</code>.",
    "queryEsperada": "SELECT v.titulo, v.precio, vt.metodo_pago FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE v.consola = 'PC';",
    "pistas": [
      "Filtra en el WHERE con: v.consola = 'PC'.",
      "Selecciona v.titulo, v.precio, vt.metodo_pago."
    ],
    "explicacion": "Permite analizar el comportamiento de ventas segmentado por una plataforma de hardware específica."
  },
  {
    "id": 67,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 2: Filtrado y Ordenamiento con INNER JOIN",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "titulo": "7. Compras internacionales de alto valor unitario",
    "descripcion": "Consulta el <strong>nombre</strong>, <strong>pais</strong> y <strong>precio_unitario</strong> de las ventas uniendo <code>clientes AS c</code> y <code>ventas AS vt</code> donde el país del cliente no sea <code>'México'</code> (<code>c.pais <> 'México'</code>) y el precio unitario supere los <code>50.0</code>.",
    "queryEsperada": "SELECT c.nombre, c.pais, vt.precio_unitario FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.pais <> 'México' AND vt.precio_unitario > 50.0;",
    "pistas": [
      "Combina dos predicados en el WHERE con AND.",
      "Usa c.pais <> 'México' y vt.precio_unitario > 50.0."
    ],
    "explicacion": "El filtrado relacional puede cruzar condiciones provenientes simultáneamente de la tabla maestra y de la tabla transaccional."
  },
  {
    "id": 68,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 2: Filtrado y Ordenamiento con INNER JOIN",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "ORDER BY"
    ],
    "titulo": "8. Ventas de títulos aclamados ordenados por calidad",
    "descripcion": "Enlaza <code>videojuegos AS v</code> y <code>ventas AS vt</code> con <code>INNER JOIN</code> para aquellos juegos cuya <strong>calificacion</strong> sea mayor o igual a <code>9.5</code>. Proyecta el <strong>titulo</strong>, la <strong>calificacion</strong> y la <strong>fecha_venta</strong>, ordenando los resultados de forma descendente por <strong>calificacion</strong>.",
    "queryEsperada": "SELECT v.titulo, v.calificacion, vt.fecha_venta FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE v.calificacion >= 9.5 ORDER BY v.calificacion DESC;",
    "pistas": [
      "Filtra WHERE v.calificacion >= 9.5.",
      "Ordena con ORDER BY v.calificacion DESC."
    ],
    "explicacion": "Combina filtrado por reputación de producto y ordenamiento prioritario sobre el resultado vinculado."
  },
  {
    "id": 69,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 2: Filtrado y Ordenamiento con INNER JOIN",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "WHERE"
    ],
    "titulo": "9. Ventas del segundo semestre de 2023",
    "descripcion": "Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>INNER JOIN</code>. Filtra únicamente las ventas ocurridas a partir del 1 de junio de 2023 (<code>vt.fecha_venta >= '2023-06-01'</code>). Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, vt.fecha_venta FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.fecha_venta >= '2023-06-01';",
    "pistas": [
      "Compara las fechas en formato ISO: vt.fecha_venta >= '2023-06-01'.",
      "Selecciona c.nombre, c.apellido, vt.fecha_venta."
    ],
    "explicacion": "El formato ISO-8601 permite filtrar rangos cronológicos en SQLite mediante comparaciones estándar de texto."
  },
  {
    "id": 70,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 2: Filtrado y Ordenamiento con INNER JOIN",
    "nivel": "Básico",
    "tags": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "10. Top 5 compras con mayor volumen de unidades",
    "descripcion": "Muestra el <strong>titulo</strong> del juego, la <strong>cantidad</strong> de unidades y el <strong>precio_unitario</strong> uniendo <code>videojuegos AS v</code> y <code>ventas AS vt</code>. Ordena por <strong>cantidad descendente</strong>, luego por <strong>precio_unitario descendente</strong>, y limita a los primeros <strong>5</strong> registros.",
    "queryEsperada": "SELECT v.titulo, vt.cantidad, vt.precio_unitario FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id ORDER BY vt.cantidad DESC, vt.precio_unitario DESC LIMIT 5;",
    "pistas": [
      "Aplica ORDER BY vt.cantidad DESC, vt.precio_unitario DESC.",
      "Finaliza con LIMIT 5."
    ],
    "explicacion": "Ordenamiento multinivel con límite para identificar las operaciones de mayor volumen transaccional."
  },
  {
    "id": 71,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 3: Introducción a LEFT JOIN y Registros No Coincidentes",
    "nivel": "Básico",
    "tags": [
      "LEFT JOIN",
      "AS"
    ],
    "titulo": "11. Preservación total de clientes con LEFT JOIN",
    "descripcion": "A diferencia de INNER JOIN, <code>LEFT JOIN</code> no descarta clientes sin transacciones. Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> sobre <code>c.id = vt.cliente_id</code>. Proyecta el <strong>nombre</strong>, <strong>apellido</strong>, <strong>pais</strong> y el <strong>id de la venta</strong> renombrado como <code>venta_id</code>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.pais, vt.id AS venta_id FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Sintaxis: FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
      "Observa cómo los clientes sin compras mostrarán NULL en venta_id."
    ],
    "explicacion": "El LEFT JOIN preserva todas las filas de la tabla izquierda (clientes), rellenando con NULL las columnas de la tabla derecha cuando no hay coincidencia."
  },
  {
    "id": 72,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 3: Introducción a LEFT JOIN y Registros No Coincidentes",
    "nivel": "Básico",
    "tags": [
      "LEFT JOIN",
      "AS"
    ],
    "titulo": "12. Auditoría completa de catálogo con LEFT JOIN",
    "descripcion": "Une <code>videojuegos AS v</code> hacia <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Proyecta el <strong>titulo</strong>, la <strong>consola</strong>, el <strong>precio</strong> y el <strong>id de la venta</strong> renombrado como <code>venta_id</code>.",
    "queryEsperada": "SELECT v.titulo, v.consola, v.precio, vt.id AS venta_id FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id;",
    "pistas": [
      "Conecta v.id = vt.videojuego_id en el ON del LEFT JOIN.",
      "Los videojuegos que nunca se han vendido mantendrán venta_id como NULL."
    ],
    "explicacion": "Garantiza que ningún producto del inventario quede omitido del reporte, revelando de inmediato qué títulos carecen de demanda comercial."
  },
  {
    "id": 73,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 3: Introducción a LEFT JOIN y Registros No Coincidentes",
    "nivel": "Básico",
    "tags": [
      "LEFT JOIN"
    ],
    "titulo": "13. Inspección de métodos de pago en LEFT JOIN",
    "descripcion": "Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code>. Proyecta el <strong>nombre</strong> del cliente y el <strong>metodo_pago</strong> de la transacción.",
    "queryEsperada": "SELECT c.nombre, vt.metodo_pago FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Proyecta c.nombre y vt.metodo_pago.",
      "Nota que los clientes sin compras presentan NULL en el campo metodo_pago."
    ],
    "explicacion": "Ilustra cómo los atributos de la tabla secundaria se convierten en NULL para las entidades que no poseen registros asociados."
  },
  {
    "id": 74,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 3: Introducción a LEFT JOIN y Registros No Coincidentes",
    "nivel": "Básico",
    "tags": [
      "LEFT JOIN",
      "WHERE"
    ],
    "titulo": "14. LEFT JOIN con restricción en la tabla izquierda",
    "descripcion": "Aplica <code>LEFT JOIN</code> entre <code>clientes AS c</code> y <code>ventas AS vt</code>, pero filtrando en el <code>WHERE</code> únicamente a los clientes activos (<code>c.activo = 1</code>). Proyecta el <strong>nombre</strong>, <strong>saldo_cuenta</strong> y <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT c.nombre, c.saldo_cuenta, vt.fecha_venta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.activo = 1;",
    "pistas": [
      "Coloca WHERE c.activo = 1.",
      "Proyecta c.nombre, c.saldo_cuenta, vt.fecha_venta."
    ],
    "explicacion": "Filtrar por la tabla preservada en el WHERE reduce el universo de partida antes o después de la unión sin alterar la mecánica del LEFT JOIN."
  },
  {
    "id": 75,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 4: Producto Cartesiano con CROSS JOIN",
    "nivel": "Básico",
    "tags": [
      "CROSS JOIN",
      "LIMIT"
    ],
    "titulo": "15. Matriz de combinaciones: Clientes y Consolas",
    "descripcion": "El <code>CROSS JOIN</code> produce el producto cartesiano combinando cada fila de la primera tabla con cada fila de la segunda. Realiza un <code>CROSS JOIN</code> entre <code>clientes AS c</code> y una subconsulta con las consolas distintas (<code>(SELECT DISTINCT consola FROM videojuegos) AS v</code>). Proyecta el <strong>nombre</strong> del cliente y la <strong>consola</strong>, limitando la consulta a los primeros <strong>6</strong> registros.",
    "queryEsperada": "SELECT c.nombre, v.consola FROM clientes AS c CROSS JOIN (SELECT DISTINCT consola FROM videojuegos) AS v LIMIT 6;",
    "pistas": [
      "Usa la sintaxis: FROM clientes AS c CROSS JOIN (SELECT DISTINCT consola FROM videojuegos) AS v",
      "Añade LIMIT 6 al final."
    ],
    "explicacion": "CROSS JOIN no requiere cláusula ON y genera todas las permutaciones posibles entre dos conjuntos de datos."
  },
  {
    "id": 76,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 4: Producto Cartesiano con CROSS JOIN",
    "nivel": "Básico",
    "tags": [
      "CROSS JOIN",
      "LIMIT"
    ],
    "titulo": "16. Combinaciones teóricas de Clientes y Métodos de Pago",
    "descripcion": "Genera una matriz de posibilidades combinando <code>clientes AS c</code> con los métodos de pago únicos disponibles en ventas (<code>(SELECT DISTINCT metodo_pago FROM ventas WHERE metodo_pago IS NOT NULL) AS m</code>) mediante <code>CROSS JOIN</code>. Proyecta el <strong>nombre</strong> y el <strong>metodo_pago</strong>, limitando a <strong>8</strong> registros.",
    "queryEsperada": "SELECT c.nombre, m.metodo_pago FROM clientes AS c CROSS JOIN (SELECT DISTINCT metodo_pago FROM ventas WHERE metodo_pago IS NOT NULL) AS m LIMIT 8;",
    "pistas": [
      "Cruza clientes AS c con (SELECT DISTINCT metodo_pago FROM ventas WHERE metodo_pago IS NOT NULL) AS m.",
      "Limita con LIMIT 8."
    ],
    "explicacion": "Útil en modelos analíticos para planificar coberturas de mercado y matrices de aceptación de pasarelas de pago."
  },
  {
    "id": 77,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 5: Primeros Pasos con NULL y Funciones de Respaldo",
    "nivel": "Básico",
    "tags": [
      "IS NULL",
      "LEFT JOIN"
    ],
    "titulo": "17. Identificación de valores ausentes con IS NULL",
    "descripcion": "Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Usa la cláusula <code>WHERE vt.id IS NULL</code> para encontrar exclusivamente a los clientes que <strong>no tienen ninguna venta registrada</strong>. Proyecta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>email</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.email FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.id IS NULL;",
    "pistas": [
      "Filtra con WHERE vt.id IS NULL.",
      "Recuerda que nunca se debe usar '= NULL', sino el operador específico 'IS NULL'."
    ],
    "explicacion": "El patrón LEFT JOIN + WHERE right.id IS NULL es la técnica canónica en SQL para aislar registros no coincidentes o huérfanos."
  },
  {
    "id": 78,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 5: Primeros Pasos con NULL y Funciones de Respaldo",
    "nivel": "Básico",
    "tags": [
      "IS NOT NULL",
      "LEFT JOIN"
    ],
    "titulo": "18. Filtrado estricto de transacciones efectivas con IS NOT NULL",
    "descripcion": "Realiza un <code>LEFT JOIN</code> entre <code>videojuegos AS v</code> y <code>ventas AS vt</code>. Asegura que solo se proyecten aquellos videojuegos que <strong>sí tengan ventas</strong> filtrando con <code>WHERE vt.id IS NOT NULL</code>. Proyecta el <strong>titulo</strong> y la <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT v.titulo, vt.fecha_venta FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE vt.id IS NOT NULL;",
    "pistas": [
      "Aplica WHERE vt.id IS NOT NULL.",
      "Proyecta v.titulo y vt.fecha_venta."
    ],
    "explicacion": "El operador IS NOT NULL permite discriminar valores reales de las ausencias generadas por uniones externas."
  },
  {
    "id": 79,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 5: Primeros Pasos con NULL y Funciones de Respaldo",
    "nivel": "Básico",
    "tags": [
      "IFNULL",
      "LEFT JOIN",
      "AS"
    ],
    "titulo": "19. Reemplazo seguro de valores nulos con IFNULL",
    "descripcion": "La función <code>IFNULL(expr, sustituto)</code> de SQLite devuelve el sustituto si la expresión es NULL. Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Proyecta el <strong>nombre</strong> del cliente y aplica <code>IFNULL(vt.id, 0) AS id_venta_segura</code>.",
    "queryEsperada": "SELECT c.nombre, IFNULL(vt.id, 0) AS id_venta_segura FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Escribe IFNULL(vt.id, 0) AS id_venta_segura.",
      "Proyecta también c.nombre."
    ],
    "explicacion": "IFNULL evita devolver valores NULL al frontend o capas intermedias, sustituyéndolos por un valor predeterminado como 0."
  },
  {
    "id": 80,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 5: Primeros Pasos con NULL y Funciones de Respaldo",
    "nivel": "Básico",
    "tags": [
      "COALESCE",
      "LEFT JOIN",
      "AS"
    ],
    "titulo": "20. Manejo estándar de nulos con COALESCE",
    "descripcion": "<code>COALESCE</code> es la función estándar ANSI SQL para reemplazar valores nulos por el primer argumento no nulo. Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Proyecta el <strong>nombre</strong> y <code>COALESCE(vt.metodo_pago, 'Sin Compras') AS metodo_pago_final</code>.",
    "queryEsperada": "SELECT c.nombre, COALESCE(vt.metodo_pago, 'Sin Compras') AS metodo_pago_final FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Aplica COALESCE(vt.metodo_pago, 'Sin Compras') AS metodo_pago_final.",
      "Usa LEFT JOIN para que los clientes sin compras muestren el texto de respaldo."
    ],
    "explicacion": "COALESCE es compatible con todos los motores relacionales (PostgreSQL, MySQL, Oracle, SQLite) y admite múltiples alternativas de respaldo."
  },
  {
    "id": 81,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 6: INNER JOIN de Múltiples Tablas (3 Tablas)",
    "nivel": "Intermedio",
    "tags": [
      "INNER JOIN",
      "AS"
    ],
    "titulo": "21. Enlace triple maestro: Clientes, Ventas y Videojuegos",
    "descripcion": "Combina las tres tablas principales del sistema mediante <code>INNER JOIN</code>: <code>clientes AS c</code> con <code>ventas AS vt</code> (mediante <code>c.id = vt.cliente_id</code>) y <code>ventas AS vt</code> con <code>videojuegos AS v</code> (mediante <code>vt.videojuego_id = v.id</code>). Proyecta el <strong>nombre</strong> y <strong>apellido</strong> del cliente, el <strong>titulo</strong> del videojuego y la <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, vt.fecha_venta FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id;",
    "pistas": [
      "Encadena los dos INNER JOIN consecutivamente: FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id;",
      "Selecciona c.nombre, c.apellido, v.titulo, vt.fecha_venta."
    ],
    "explicacion": "El INNER JOIN de 3 tablas cruza la entidad cliente con la entidad producto a través de la tabla relacional transaccional intermedia ventas."
  },
  {
    "id": 82,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 6: INNER JOIN de Múltiples Tablas (3 Tablas)",
    "nivel": "Intermedio",
    "tags": [
      "INNER JOIN",
      "Aritmética",
      "AS"
    ],
    "titulo": "22. Reporte financiero con cálculo total de compra",
    "descripcion": "Enlaza <code>clientes AS c</code>, <code>ventas AS vt</code> y <code>videojuegos AS v</code> mediante <code>INNER JOIN</code>. Proyecta el <strong>nombre</strong>, el <strong>titulo</strong>, la <strong>cantidad</strong>, el <strong>precio_unitario</strong> y el cálculo redondeado a 2 decimales <code>ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe_total</code>.",
    "queryEsperada": "SELECT c.nombre, v.titulo, vt.cantidad, vt.precio_unitario, ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe_total FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id;",
    "pistas": [
      "Usa ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe_total.",
      "Asegúrate de enlazar c con vt y vt con v."
    ],
    "explicacion": "Genera una línea detallada de factura relacionando comprador, producto e importe monetario efectivo."
  },
  {
    "id": 83,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 6: INNER JOIN de Múltiples Tablas (3 Tablas)",
    "nivel": "Intermedio",
    "tags": [
      "INNER JOIN",
      "WHERE",
      "AND"
    ],
    "titulo": "23. Enlace triple con filtros de país y género",
    "descripcion": "Une las tres tablas con <code>INNER JOIN</code> para obtener las compras realizadas por clientes de <code>'España'</code> que hayan adquirido videojuegos del género <code>'Acción RPG'</code>. Proyecta el <strong>nombre</strong>, <strong>pais</strong>, <strong>titulo</strong> y <strong>genero</strong>.",
    "queryEsperada": "SELECT c.nombre, c.pais, v.titulo, v.genero FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE c.pais = 'España' AND v.genero = 'Acción RPG';",
    "pistas": [
      "Agrega WHERE c.pais = 'España' AND v.genero = 'Acción RPG'.",
      "Proyecta c.nombre, c.pais, v.titulo, v.genero."
    ],
    "explicacion": "El filtrado relacional en consultas multinivel permite responder preguntas de negocio de alta especificidad geográfica y temáticas."
  },
  {
    "id": 84,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 6: INNER JOIN de Múltiples Tablas (3 Tablas)",
    "nivel": "Intermedio",
    "tags": [
      "INNER JOIN",
      "IN"
    ],
    "titulo": "24. Enlace triple con métodos de pago digitales",
    "descripcion": "Une <code>clientes AS c</code>, <code>ventas AS vt</code> y <code>videojuegos AS v</code> con <code>INNER JOIN</code> filtrando únicamente las transacciones pagadas con <code>'PayPal'</code> o <code>'Transferencia'</code> (usando <code>IN</code>). Proyecta el <strong>nombre</strong>, <strong>titulo</strong> y <strong>metodo_pago</strong>.",
    "queryEsperada": "SELECT c.nombre, v.titulo, vt.metodo_pago FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.metodo_pago IN ('PayPal', 'Transferencia');",
    "pistas": [
      "Usa WHERE vt.metodo_pago IN ('PayPal', 'Transferencia').",
      "Selecciona c.nombre, v.titulo, vt.metodo_pago."
    ],
    "explicacion": "Aplica predicados de membresía sobre atributos de enlace transaccional."
  },
  {
    "id": 85,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 6: INNER JOIN de Múltiples Tablas (3 Tablas)",
    "nivel": "Intermedio",
    "tags": [
      "INNER JOIN",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "25. Paginación formal de ventas con enlace triple",
    "descripcion": "Combina las tres tablas con <code>INNER JOIN</code>. Ordena los resultados cronológicamente por <strong>fecha_venta DESC</strong> y aplica paginación para obtener los <strong>5</strong> registros de la segunda página (saltando 5 con <code>OFFSET 5</code>). Proyecta <strong>fecha_venta</strong>, <strong>nombre</strong> y <strong>titulo</strong>.",
    "queryEsperada": "SELECT vt.fecha_venta, c.nombre, v.titulo FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 5 OFFSET 5;",
    "pistas": [
      "Ordena con ORDER BY vt.fecha_venta DESC.",
      "Finaliza con LIMIT 5 OFFSET 5."
    ],
    "explicacion": "Paginación estándar en reportes empresariales con múltiples uniones relacionales."
  },
  {
    "id": 86,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 7: Detección Avanzada de Huérfanos con LEFT JOIN",
    "nivel": "Intermedio",
    "tags": [
      "LEFT JOIN",
      "IS NULL"
    ],
    "titulo": "26. Auditoría de clientes sin actividad comercial",
    "descripcion": "Aplica un <code>LEFT JOIN</code> entre <code>clientes AS c</code> y <code>ventas AS vt</code> sobre <code>c.id = vt.cliente_id</code>. Filtra con <code>WHERE vt.id IS NULL</code> para detectar a los clientes registrados que <strong>nunca han efectuado una compra</strong>. Proyecta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.saldo_cuenta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.id IS NULL;",
    "pistas": [
      "FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id",
      "WHERE vt.id IS NULL aísla exactamente las filas que no tuvieron correspondencia."
    ],
    "explicacion": "Técnica fundamental conocida como 'Anti-Join' para identificar usuarios inactivos o carritos abandonados sin compras."
  },
  {
    "id": 87,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 7: Detección Avanzada de Huérfanos con LEFT JOIN",
    "nivel": "Intermedio",
    "tags": [
      "LEFT JOIN",
      "IS NULL"
    ],
    "titulo": "27. Detección de títulos en inventario sin demanda",
    "descripcion": "Encuentra todos los títulos del catálogo que <strong>jamás han sido vendidos</strong>. Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> y filtra donde <code>vt.id IS NULL</code>. Proyecta el <strong>titulo</strong>, la <strong>consola</strong> y el <strong>precio</strong>.",
    "queryEsperada": "SELECT v.titulo, v.consola, v.precio FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE vt.id IS NULL;",
    "pistas": [
      "FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id",
      "Filtra WHERE vt.id IS NULL."
    ],
    "explicacion": "Permite a los analistas de inventario detectar productos estancados para aplicar promociones o descuentos."
  },
  {
    "id": 88,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 7: Detección Avanzada de Huérfanos con LEFT JOIN",
    "nivel": "Intermedio",
    "tags": [
      "LEFT JOIN",
      "COALESCE",
      "AS"
    ],
    "titulo": "28. Preservación y normalización numérica con COALESCE",
    "descripcion": "Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code>. Proyecta el <strong>nombre</strong> del cliente y la columna calculada <code>COALESCE(vt.cantidad, 0) AS unidades_adquiridas</code> para que los clientes sin compras muestren <code>0</code> en lugar de <code>NULL</code>.",
    "queryEsperada": "SELECT c.nombre, COALESCE(vt.cantidad, 0) AS unidades_adquiridas FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Aplica COALESCE(vt.cantidad, 0) AS unidades_adquiridas.",
      "Usa LEFT JOIN entre clientes AS c y ventas AS vt."
    ],
    "explicacion": "COALESCE reemplaza valores ausentes por cero numérico para garantizar la integridad de reportes y cálculos aguas abajo."
  },
  {
    "id": 89,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 7: Detección Avanzada de Huérfanos con LEFT JOIN",
    "nivel": "Intermedio",
    "tags": [
      "LEFT JOIN",
      "COALESCE",
      "AS"
    ],
    "titulo": "29. Doble LEFT JOIN: Clientes, Ventas y Videojuegos",
    "descripcion": "Encadena un doble <code>LEFT JOIN</code> partiendo de <code>clientes AS c</code> hacia <code>ventas AS vt</code> (<code>c.id = vt.cliente_id</code>) y de <code>ventas AS vt</code> hacia <code>videojuegos AS v</code> (<code>vt.videojuego_id = v.id</code>). Proyecta el <strong>nombre</strong> del cliente y <code>COALESCE(v.titulo, 'Sin Videojuego Comprado') AS titulo_comprado</code>.",
    "queryEsperada": "SELECT c.nombre, COALESCE(v.titulo, 'Sin Videojuego Comprado') AS titulo_comprado FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id LEFT JOIN videojuegos AS v ON vt.videojuego_id = v.id;",
    "pistas": [
      "Encadena: FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id LEFT JOIN videojuegos AS v ON vt.videojuego_id = v.id",
      "Usa COALESCE(v.titulo, 'Sin Videojuego Comprado') AS titulo_comprado."
    ],
    "explicacion": "El encadenamiento de múltiples LEFT JOINs preserva la raíz (clientes) incluso si no existen ventas ni videojuegos asociados."
  },
  {
    "id": 90,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 7: Detección Avanzada de Huérfanos con LEFT JOIN",
    "nivel": "Intermedio",
    "tags": [
      "LEFT JOIN",
      "COALESCE",
      "AS"
    ],
    "titulo": "30. Sustitución de fecha de compra con texto descriptivo",
    "descripcion": "Une <code>clientes AS c</code> con <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Muestra el <strong>nombre</strong>, <strong>apellido</strong> y <code>COALESCE(vt.fecha_venta, 'Sin Actividad') AS estado_fecha</code>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, COALESCE(vt.fecha_venta, 'Sin Actividad') AS estado_fecha FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Aplica COALESCE(vt.fecha_venta, 'Sin Actividad') AS estado_fecha.",
      "Proyecta c.nombre, c.apellido."
    ],
    "explicacion": "Transforma la ausencia de fecha transaccional en un estado explicativo amigable para el usuario final."
  },
  {
    "id": 91,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 8: RIGHT JOIN Nativo en SQLite",
    "nivel": "Intermedio",
    "tags": [
      "RIGHT JOIN",
      "IS NULL",
      "AS"
    ],
    "titulo": "31. Reversión semántica: Catálogo preservado a la derecha",
    "descripcion": "A partir de SQLite 3.39+, <code>RIGHT JOIN</code> está soportado nativamente. Invierte la unión colocando <code>ventas AS vt</code> a la izquierda y <code>videojuegos AS v</code> a la derecha mediante <code>RIGHT JOIN</code> (<code>vt.videojuego_id = v.id</code>). Usa <code>WHERE vt.id IS NULL</code> para hallar los títulos sin ventas. Proyecta el <strong>titulo</strong> del juego y <strong>vt.id AS venta_id</strong>.",
    "queryEsperada": "SELECT v.titulo, vt.id AS venta_id FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.id IS NULL;",
    "pistas": [
      "Usa: FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id",
      "Filtra WHERE vt.id IS NULL."
    ],
    "explicacion": "RIGHT JOIN preserva todas las filas de la tabla de la derecha (videojuegos), dejando en NULL las columnas de la tabla de la izquierda (ventas) si no hay correspondencia."
  },
  {
    "id": 92,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 8: RIGHT JOIN Nativo en SQLite",
    "nivel": "Intermedio",
    "tags": [
      "RIGHT JOIN",
      "IS NULL"
    ],
    "titulo": "32. Clientes preservados a la derecha con RIGHT JOIN",
    "descripcion": "Escribe una consulta con <code>ventas AS vt RIGHT JOIN clientes AS c ON vt.cliente_id = c.id</code> para encontrar a los clientes sin compras mediante <code>WHERE vt.id IS NULL</code>. Proyecta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>email</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.email FROM ventas AS vt RIGHT JOIN clientes AS c ON vt.cliente_id = c.id WHERE vt.id IS NULL;",
    "pistas": [
      "Conecta ventas AS vt RIGHT JOIN clientes AS c ON vt.cliente_id = c.id",
      "WHERE vt.id IS NULL aísla a los clientes que no aparecen en la tabla izquierda ventas."
    ],
    "explicacion": "Demuestra la equivalencia de dirección: 'A LEFT JOIN B' produce el mismo conjunto que 'B RIGHT JOIN A', adaptándose a preferencias sintácticas."
  },
  {
    "id": 93,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 8: RIGHT JOIN Nativo en SQLite",
    "nivel": "Intermedio",
    "tags": [
      "RIGHT JOIN",
      "AS"
    ],
    "titulo": "33. Listado exhaustivo de clientes con RIGHT JOIN",
    "descripcion": "Combina <code>ventas AS vt</code> y <code>clientes AS c</code> mediante <code>RIGHT JOIN</code> (<code>vt.cliente_id = c.id</code>). Proyecta el <strong>nombre</strong>, el <strong>pais</strong> y el <strong>id de la venta</strong> renombrado como <code>venta_id</code>.",
    "queryEsperada": "SELECT c.nombre, c.pais, vt.id AS venta_id FROM ventas AS vt RIGHT JOIN clientes AS c ON vt.cliente_id = c.id;",
    "pistas": [
      "FROM ventas AS vt RIGHT JOIN clientes AS c ON vt.cliente_id = c.id;",
      "Proyecta c.nombre, c.pais, vt.id AS venta_id."
    ],
    "explicacion": "Preserva el 100% de los clientes posicionados a la derecha de la cláusula de unión."
  },
  {
    "id": 94,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 8: RIGHT JOIN Nativo en SQLite",
    "nivel": "Intermedio",
    "tags": [
      "RIGHT JOIN"
    ],
    "titulo": "34. Exploración de consolas y fechas con RIGHT JOIN",
    "descripcion": "Une <code>ventas AS vt</code> y <code>videojuegos AS v</code> mediante <code>RIGHT JOIN</code> sobre <code>vt.videojuego_id = v.id</code>. Proyecta el <strong>titulo</strong>, la <strong>consola</strong> y la <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT v.titulo, v.consola, vt.fecha_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id;",
    "pistas": [
      "Conecta vt y v con RIGHT JOIN.",
      "Proyecta v.titulo, v.consola, vt.fecha_venta."
    ],
    "explicacion": "Permite visualizar el catálogo completo manteniendo visible qué productos han tenido actividad en qué fechas."
  },
  {
    "id": 95,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 9: FULL OUTER JOIN Nativo",
    "nivel": "Intermedio",
    "tags": [
      "FULL OUTER JOIN",
      "IS NULL",
      "OR"
    ],
    "titulo": "35. Conciliación bilateral con FULL OUTER JOIN",
    "descripcion": "<code>FULL OUTER JOIN</code> preserva todas las filas de ambas tablas. Combina <code>clientes AS c</code> y <code>ventas AS vt</code> mediante <code>FULL OUTER JOIN</code> (<code>c.id = vt.cliente_id</code>). Filtra para mostrar <strong>únicamente las discrepancias bilaterales</strong> (donde no hubo coincidencia en alguno de los dos lados: <code>WHERE c.id IS NULL OR vt.id IS NULL</code>). Proyecta <strong>c.nombre</strong>, <strong>vt.id AS venta_id</strong> y <strong>vt.cliente_id</strong>.",
    "queryEsperada": "SELECT c.nombre, vt.id AS venta_id, vt.cliente_id FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.id IS NULL OR vt.id IS NULL;",
    "pistas": [
      "FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id",
      "Filtra WHERE c.id IS NULL OR vt.id IS NULL."
    ],
    "explicacion": "El FULL OUTER JOIN con WHERE c.id IS NULL OR vt.id IS NULL aísla las anomalías de ambas tablas simultáneamente (clientes sin ventas y ventas sin clientes registrados)."
  },
  {
    "id": 96,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 9: FULL OUTER JOIN Nativo",
    "nivel": "Intermedio",
    "tags": [
      "FULL OUTER JOIN",
      "IS NULL",
      "OR"
    ],
    "titulo": "36. Auditoría bilateral de Videojuegos y Ventas",
    "descripcion": "Realiza un <code>FULL OUTER JOIN</code> entre <code>videojuegos AS v</code> y <code>ventas AS vt</code> sobre <code>v.id = vt.videojuego_id</code>. Filtra para hallar registros sin coincidencia en cualquiera de los dos lados (<code>WHERE v.id IS NULL OR vt.id IS NULL</code>). Proyecta <strong>v.titulo</strong>, <strong>vt.id AS venta_id</strong> y <strong>vt.videojuego_id</strong>.",
    "queryEsperada": "SELECT v.titulo, vt.id AS venta_id, vt.videojuego_id FROM videojuegos AS v FULL OUTER JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE v.id IS NULL OR vt.id IS NULL;",
    "pistas": [
      "FROM videojuegos AS v FULL OUTER JOIN ventas AS vt ON v.id = vt.videojuego_id",
      "WHERE v.id IS NULL OR vt.id IS NULL."
    ],
    "explicacion": "Revela juegos que nunca se vendieron y ventas de productos descontinuados o eliminados del catálogo."
  },
  {
    "id": 97,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 9: FULL OUTER JOIN Nativo",
    "nivel": "Intermedio",
    "tags": [
      "FULL OUTER JOIN",
      "COALESCE",
      "AS"
    ],
    "titulo": "37. Conciliación con rótulos de respaldo en FULL OUTER JOIN",
    "descripcion": "Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>FULL OUTER JOIN</code>. Proyecta <code>COALESCE(c.nombre, 'Venta Mostrador Anónima') AS cliente_auditado</code> y el <strong>metodo_pago</strong>.",
    "queryEsperada": "SELECT COALESCE(c.nombre, 'Venta Mostrador Anónima') AS cliente_auditado, vt.metodo_pago FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Usa COALESCE(c.nombre, 'Venta Mostrador Anónima') AS cliente_auditado.",
      "Proyecta vt.metodo_pago."
    ],
    "explicacion": "Normaliza registros huérfanos producidos por uniones externas bilaterales."
  },
  {
    "id": 98,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 10: CROSS JOIN Analítico y Coberturas",
    "nivel": "Intermedio",
    "tags": [
      "CROSS JOIN",
      "WHERE",
      "LIMIT"
    ],
    "titulo": "38. Matriz de clientes colombianos y títulos de Switch",
    "descripcion": "Genera el producto cartesiano entre los clientes de Colombia (<code>(SELECT nombre FROM clientes WHERE pais = 'Colombia') AS c</code>) y los títulos disponibles para <code>'Nintendo Switch'</code> (<code>(SELECT titulo FROM videojuegos WHERE consola = 'Nintendo Switch') AS v</code>) mediante <code>CROSS JOIN</code>. Limita a <strong>6</strong> filas.",
    "queryEsperada": "SELECT c.nombre, v.titulo FROM (SELECT nombre FROM clientes WHERE pais = 'Colombia') AS c CROSS JOIN (SELECT titulo FROM videojuegos WHERE consola = 'Nintendo Switch') AS v LIMIT 6;",
    "pistas": [
      "Cruza ambas subconsultas con CROSS JOIN.",
      "Aplica LIMIT 6."
    ],
    "explicacion": "Crea matrices de recomendación potencial cruzando subconjuntos específicos de usuarios y productos."
  },
  {
    "id": 99,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 10: CROSS JOIN Analítico y Coberturas",
    "nivel": "Intermedio",
    "tags": [
      "CROSS JOIN",
      "LIMIT"
    ],
    "titulo": "39. Matriz de expansión: Países y Desarrolladores",
    "descripcion": "Combina los países únicos registrados en clientes con los desarrolladores únicos en videojuegos mediante <code>CROSS JOIN</code>. Limita el resultado a los primeros <strong>8</strong> registros proyectando <strong>pais</strong> y <strong>desarrollador</strong>.",
    "queryEsperada": "SELECT p.pais, d.desarrollador FROM (SELECT DISTINCT pais FROM clientes) AS p CROSS JOIN (SELECT DISTINCT desarrollador FROM videojuegos) AS d LIMIT 8;",
    "pistas": [
      "Subconsultas: (SELECT DISTINCT pais FROM clientes) AS p y (SELECT DISTINCT desarrollador FROM videojuegos) AS d.",
      "Enlaza con CROSS JOIN y limita a 8."
    ],
    "explicacion": "Genera combinatorias de dimensión geográfica vs proveedores para prospección comercial."
  },
  {
    "id": 100,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 10: CROSS JOIN Analítico y Coberturas",
    "nivel": "Intermedio",
    "tags": [
      "CROSS JOIN",
      "Aritmética",
      "LIMIT"
    ],
    "titulo": "40. Simulación de escenarios de descuento cruzado",
    "descripcion": "Cruza los 3 videojuegos más caros (<code>(SELECT titulo, precio FROM videojuegos ORDER BY precio DESC LIMIT 3) AS v</code>) con una tabla de factores de descuento simulados (<code>(SELECT 0.10 AS tasa, '10% Descuento' AS etiqueta UNION SELECT 0.20, '20% Descuento') AS d</code>) usando <code>CROSS JOIN</code>. Proyecta <strong>v.titulo</strong>, <strong>d.etiqueta</strong> y <code>ROUND(v.precio * (1 - d.tasa), 2) AS precio_promocion</code>.",
    "queryEsperada": "SELECT v.titulo, d.etiqueta, ROUND(v.precio * (1 - d.tasa), 2) AS precio_promocion FROM (SELECT titulo, precio FROM videojuegos ORDER BY precio DESC LIMIT 3) AS v CROSS JOIN (SELECT 0.10 AS tasa, '10% Descuento' AS etiqueta UNION SELECT 0.20, '20% Descuento') AS d;",
    "pistas": [
      "Multiplica v.precio * (1 - d.tasa) y redondea a 2 decimales.",
      "Proyecta v.titulo, d.etiqueta, precio_promocion."
    ],
    "explicacion": "CROSS JOIN es la herramienta idónea para simulaciones 'What-If' y tablas de amortización o listas de precios dinámicas."
  },
  {
    "id": 101,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 11: Condiciones en ON vs Condiciones en WHERE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "ON"
    ],
    "titulo": "41. Preservación con filtro específico en la cláusula ON",
    "descripcion": "En un <code>LEFT JOIN</code>, colocar un filtro en <code>ON</code> condiciona únicamente el enlace de la tabla derecha sin descartar las filas de la tabla izquierda. Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>ON c.id = vt.cliente_id AND vt.metodo_pago = 'Tarjeta'</code>. Proyecta el <strong>nombre</strong>, <strong>apellido</strong> y <strong>metodo_pago</strong>. Observa que todos los clientes permanecen visibles.",
    "queryEsperada": "SELECT c.nombre, c.apellido, vt.metodo_pago FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id AND vt.metodo_pago = 'Tarjeta';",
    "pistas": [
      "Coloca AND vt.metodo_pago = 'Tarjeta' dentro de la cláusula ON, no en el WHERE.",
      "Proyecta c.nombre, c.apellido, vt.metodo_pago."
    ],
    "explicacion": "Al ubicar la condición en el ON del LEFT JOIN, si la venta no fue con tarjeta, la fila del cliente no se descarta: simplemente se rellena con NULL para los campos de venta."
  },
  {
    "id": 102,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 11: Condiciones en ON vs Condiciones en WHERE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "ON"
    ],
    "titulo": "42. Enlace condicional por ventana de fechas en ON",
    "descripcion": "Enlaza <code>clientes AS c</code> y <code>ventas AS vt</code> preservando a todos los clientes, pero emparejando únicamente las compras efectuadas en el segundo semestre de 2023 mediante <code>ON c.id = vt.cliente_id AND vt.fecha_venta >= '2023-06-01'</code>. Proyecta el <strong>nombre</strong>, <strong>saldo_cuenta</strong> y <strong>fecha_venta</strong>.",
    "queryEsperada": "SELECT c.nombre, c.saldo_cuenta, vt.fecha_venta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id AND vt.fecha_venta >= '2023-06-01';",
    "pistas": [
      "Agrega AND vt.fecha_venta >= '2023-06-01' al ON del LEFT JOIN.",
      "Selecciona c.nombre, c.saldo_cuenta, vt.fecha_venta."
    ],
    "explicacion": "Permite auditar qué clientes compraron en un período específico manteniendo a la vista a los que no lo hicieron."
  },
  {
    "id": 103,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 11: Condiciones en ON vs Condiciones en WHERE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "ON"
    ],
    "titulo": "43. Enlace externo condicionado por cantidad en ON",
    "descripcion": "Realiza un <code>LEFT JOIN</code> entre <code>videojuegos AS v</code> y <code>ventas AS vt</code> con la condición <code>ON v.id = vt.videojuego_id AND vt.cantidad > 1</code>. Proyecta el <strong>titulo</strong>, la <strong>consola</strong> y la <strong>cantidad</strong>.",
    "queryEsperada": "SELECT v.titulo, v.consola, vt.cantidad FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id AND vt.cantidad > 1;",
    "pistas": [
      "ON v.id = vt.videojuego_id AND vt.cantidad > 1.",
      "Proyecta v.titulo, v.consola, vt.cantidad."
    ],
    "explicacion": "Muestra el catálogo completo pero solo vincula compras con compras múltiples (cantidad > 1), dejando en NULL aquellas con una sola unidad o sin ventas."
  },
  {
    "id": 104,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 11: Condiciones en ON vs Condiciones en WHERE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "WHERE",
      "AND"
    ],
    "titulo": "44. Filtrado legítimo de la tabla preservada en WHERE",
    "descripcion": "Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Aplica en el <code>WHERE</code> una restricción estricta sobre la tabla izquierda: clientes con saldo mayor a <code>50.0</code> (<code>c.saldo_cuenta > 50.0</code>). Proyecta <strong>c.nombre</strong>, <strong>c.saldo_cuenta</strong> y <strong>vt.id AS venta_id</strong>.",
    "queryEsperada": "SELECT c.nombre, c.saldo_cuenta, vt.id AS venta_id FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.saldo_cuenta > 50.0;",
    "pistas": [
      "Filtra en el WHERE con: c.saldo_cuenta > 50.0.",
      "Proyecta c.nombre, c.saldo_cuenta, vt.id AS venta_id."
    ],
    "explicacion": "Filtrar por la tabla de la izquierda en el WHERE restringe la población base pero mantiene la semántica de LEFT JOIN para la tabla derecha."
  },
  {
    "id": 105,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 11: Condiciones en ON vs Condiciones en WHERE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "WHERE"
    ],
    "titulo": "45. La trampa del WHERE: Degradación de LEFT JOIN a INNER JOIN",
    "descripcion": "Cuando filtras en el <code>WHERE</code> un campo de la tabla derecha exigiendo un valor no nulo (como <code>WHERE vt.metodo_pago = 'Tarjeta'</code>), descartas automáticamente las filas donde dicho campo es NULL, degradando en la práctica el <code>LEFT JOIN</code> a un <code>INNER JOIN</code>. Escribe esta consulta demostrativa proyectando <strong>c.nombre</strong>, <strong>c.apellido</strong> y <strong>vt.metodo_pago</strong>.",
    "queryEsperada": "SELECT c.nombre, c.apellido, vt.metodo_pago FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.metodo_pago = 'Tarjeta';",
    "pistas": [
      "Usa LEFT JOIN pero con WHERE vt.metodo_pago = 'Tarjeta'.",
      "Comprueba que el número de filas coincide con un INNER JOIN."
    ],
    "explicacion": "Error clásico de diseño SQL: aplicar filtros restrictivos sobre la tabla derecha en el WHERE elimina el efecto del LEFT JOIN."
  },
  {
    "id": 106,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 12: Transformaciones Avanzadas de NULL y Expresiones CASE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "CASE WHEN",
      "IS NULL"
    ],
    "titulo": "46. Segmentación de clientes con CASE y comprobación de NULL",
    "descripcion": "Combina <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Crea una columna calculada llamada <code>estatus_cliente</code> mediante <code>CASE</code>: si <code>vt.id IS NULL</code> devolverá <code>'Prospecto sin Compras'</code>, y en caso contrario <code>'Cliente Comprador'</code>. Proyecta <strong>c.nombre</strong>, <strong>c.email</strong> y <strong>estatus_cliente</strong>.",
    "queryEsperada": "SELECT c.nombre, c.email, CASE WHEN vt.id IS NULL THEN 'Prospecto sin Compras' ELSE 'Cliente Comprador' END AS estatus_cliente FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Usa: CASE WHEN vt.id IS NULL THEN 'Prospecto sin Compras' ELSE 'Cliente Comprador' END AS estatus_cliente.",
      "Proyecta c.nombre, c.email."
    ],
    "explicacion": "Permite clasificar cualitativamente a los usuarios en función de si han materializado o no transacciones."
  },
  {
    "id": 107,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 12: Transformaciones Avanzadas de NULL y Expresiones CASE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "CASE WHEN",
      "IS NULL"
    ],
    "titulo": "47. Diagnóstico de rotación de inventario con CASE",
    "descripcion": "Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code>. Proyecta el <strong>titulo</strong>, el <strong>stock</strong> y una columna <code>estado_rotacion</code>: si <code>vt.id IS NULL</code> devolverá <code>'Sin Rotación Comercial'</code>, de lo contrario <code>'Con Ventas Registradas'</code>. Ordena por <strong>v.stock DESC</strong>.",
    "queryEsperada": "SELECT v.titulo, v.stock, CASE WHEN vt.id IS NULL THEN 'Sin Rotación Comercial' ELSE 'Con Ventas Registradas' END AS estado_rotacion FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id ORDER BY v.stock DESC;",
    "pistas": [
      "Aplica CASE WHEN vt.id IS NULL THEN ... ELSE ... END AS estado_rotacion.",
      "Ordena con ORDER BY v.stock DESC."
    ],
    "explicacion": "Transforma la presencia o ausencia de nulos en indicadores de rendimiento de producto (KPIs de rotación)."
  },
  {
    "id": 108,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 12: Transformaciones Avanzadas de NULL y Expresiones CASE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "COALESCE"
    ],
    "titulo": "48. Cascada de respaldo de precios con COALESCE",
    "descripcion": "Enlaza <code>videojuegos AS v</code> con <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Proyecta el <strong>titulo</strong> y una columna <code>precio_aplicado</code> evaluando en cascada: el <strong>precio_unitario</strong> de la venta, si es NULL el <strong>precio</strong> de catálogo de videojuegos, y si ambos fueran NULL un valor predeterminado de <code>0.0</code> (<code>COALESCE(vt.precio_unitario, v.precio, 0.0) AS precio_aplicado</code>).",
    "queryEsperada": "SELECT v.titulo, COALESCE(vt.precio_unitario, v.precio, 0.0) AS precio_aplicado FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id;",
    "pistas": [
      "Pasa los 3 argumentos a COALESCE: vt.precio_unitario, v.precio, 0.0.",
      "Proyecta v.titulo, precio_aplicado."
    ],
    "explicacion": "Demuestra la capacidad de COALESCE para evaluar múltiples niveles jerárquicos de respaldo hasta hallar el primer valor definido."
  },
  {
    "id": 109,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 12: Transformaciones Avanzadas de NULL y Expresiones CASE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "CASE WHEN"
    ],
    "titulo": "49. Clasificación de ticket promedio con control de NULL",
    "descripcion": "Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Genera una columna <code>tipo_ticket</code>: si <code>vt.id IS NULL</code> devolverá <code>'Sin Ticket'</code>, si <code>(vt.cantidad * vt.precio_unitario) >= 60.0</code> devolverá <code>'Ticket Alto'</code>, y en cualquier otro caso <code>'Ticket Estándar'</code>. Proyecta <strong>c.nombre</strong> y <strong>tipo_ticket</strong>.",
    "queryEsperada": "SELECT c.nombre, CASE WHEN vt.id IS NULL THEN 'Sin Ticket' WHEN (vt.cantidad * vt.precio_unitario) >= 60.0 THEN 'Ticket Alto' ELSE 'Ticket Estándar' END AS tipo_ticket FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Estructura el CASE con WHEN vt.id IS NULL primero, luego la condición numérica, y el ELSE al final.",
      "Proyecta c.nombre y tipo_ticket."
    ],
    "explicacion": "El orden en CASE WHEN es crítico: evaluar primero la presencia de nulos previene comparaciones indeseadas con valores ausentes."
  },
  {
    "id": 110,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 12: Transformaciones Avanzadas de NULL y Expresiones CASE",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "IFNULL"
    ],
    "titulo": "50. Concatenación segura y reemplazo con IFNULL",
    "descripcion": "Enlaza <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Proyecta el nombre completo del cliente (<code>c.nombre || ' ' || c.apellido AS cliente</code>) y la columna <code>canal_cobro</code> mediante <code>IFNULL(vt.metodo_pago, 'Pendiente de Asignación')</code>.",
    "queryEsperada": "SELECT (c.nombre || ' ' || c.apellido) AS cliente, IFNULL(vt.metodo_pago, 'Pendiente de Asignación') AS canal_cobro FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Usa el operador de concatenación || para unir nombre y apellido.",
      "Aplica IFNULL(vt.metodo_pago, 'Pendiente de Asignación') AS canal_cobro."
    ],
    "explicacion": "Combina manipulación de cadenas con protección ante valores nulos para reportes finales limpios."
  },
  {
    "id": 111,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 13: Lógica Fina con NULLIF y Ordenamiento de Nulos",
    "nivel": "Avanzado",
    "tags": [
      "NULLIF",
      "LEFT JOIN"
    ],
    "titulo": "51. Eliminación de valores centinela numéricos con NULLIF",
    "descripcion": "La función <code>NULLIF(a, b)</code> devuelve <code>NULL</code> si ambos valores son idénticos. Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Convierte los saldos en cuenta iguales a <code>0.0</code> en valores nulos aplicando <code>NULLIF(c.saldo_cuenta, 0.0) AS saldo_auditado</code>. Proyecta <strong>c.nombre</strong> y <strong>saldo_auditado</strong>.",
    "queryEsperada": "SELECT c.nombre, NULLIF(c.saldo_cuenta, 0.0) AS saldo_auditado FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Escribe: NULLIF(c.saldo_cuenta, 0.0) AS saldo_auditado.",
      "Proyecta c.nombre junto a la columna calculada."
    ],
    "explicacion": "NULLIF es ideal para limpiar datos donde se usaron números centinela (como 0 o -1) para representar la falta real de saldo o información."
  },
  {
    "id": 112,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 13: Lógica Fina con NULLIF y Ordenamiento de Nulos",
    "nivel": "Avanzado",
    "tags": [
      "NULLIF",
      "INNER JOIN"
    ],
    "titulo": "52. Filtrado de canales digitales aislando Efectivo con NULLIF",
    "descripcion": "Une <code>clientes AS c</code> y <code>ventas AS vt</code> con <code>INNER JOIN</code>. Aplica <code>NULLIF(vt.metodo_pago, 'Efectivo') AS canal_digital</code> para convertir 'Efectivo' en NULL. Proyecta <strong>c.nombre</strong>, <strong>vt.precio_unitario</strong> y <strong>canal_digital</strong>.",
    "queryEsperada": "SELECT c.nombre, vt.precio_unitario, NULLIF(vt.metodo_pago, 'Efectivo') AS canal_digital FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Aplica NULLIF(vt.metodo_pago, 'Efectivo') AS canal_digital.",
      "Proyecta c.nombre, vt.precio_unitario."
    ],
    "explicacion": "Transforma valores específicos en NULL para facilitar agregaciones o auditorías que descartan canales no digitales."
  },
  {
    "id": 113,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 13: Lógica Fina con NULLIF y Ordenamiento de Nulos",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "ORDER BY"
    ],
    "titulo": "53. Ordenamiento jerárquico controlando la posición de NULL",
    "descripcion": "En SQLite, por defecto los valores NULL se ordenan como los más pequeños. Realiza un <code>LEFT JOIN</code> entre <code>clientes AS c</code> y <code>ventas AS vt</code>. Fuerza a que los clientes con ventas aparezcan <strong>primero</strong> y los que tengan <code>NULL</code> aparezcan al <strong>final</strong> ordenando por <code>vt.id IS NULL ASC, vt.fecha_venta DESC</code>. Proyecta <strong>c.nombre</strong>, <strong>vt.id AS venta_id</strong> y <strong>vt.fecha_venta</strong>.",
    "queryEsperada": "SELECT c.nombre, vt.id AS venta_id, vt.fecha_venta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id ORDER BY vt.id IS NULL ASC, vt.fecha_venta DESC;",
    "pistas": [
      "En SQLite, 'vt.id IS NULL' devuelve 0 (falso) cuando hay venta y 1 (verdadero) cuando es NULL.",
      "Ordenar por 'vt.id IS NULL ASC' coloca primero los que tienen venta (0) y luego los nulos (1)."
    ],
    "explicacion": "Técnica estándar para controlar con precisión matemática la colocación de valores ausentes en cláusulas ORDER BY."
  },
  {
    "id": 114,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 13: Lógica Fina con NULLIF y Ordenamiento de Nulos",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "NULLIF",
      "COALESCE"
    ],
    "titulo": "54. Prevención de división por cero con NULLIF en uniones",
    "descripcion": "Calcula el ratio de unidades vendidas respecto al stock disponible. Une <code>videojuegos AS v</code> y <code>ventas AS vt</code> con <code>LEFT JOIN</code>. Usa <code>ROUND(COALESCE(vt.cantidad, 0) * 1.0 / NULLIF(v.stock, 0), 4) AS ratio_rotacion</code> para evitar el error de división por cero en títulos con stock 0. Proyecta <strong>v.titulo</strong>, <strong>v.stock</strong> y <strong>ratio_rotacion</strong>.",
    "queryEsperada": "SELECT v.titulo, v.stock, ROUND(COALESCE(vt.cantidad, 0) * 1.0 / NULLIF(v.stock, 0), 4) AS ratio_rotacion FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id;",
    "pistas": [
      "NULLIF(v.stock, 0) convierte el stock 0 en NULL.",
      "Cualquier número dividido entre NULL produce NULL de forma segura en lugar de un error fatal."
    ],
    "explicacion": "Patrón de oro en SQL corporativo para garantizar la resiliencia en cálculos analíticos de ratios."
  },
  {
    "id": 115,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 13: Lógica Fina con NULLIF y Ordenamiento de Nulos",
    "nivel": "Avanzado",
    "tags": [
      "FULL OUTER JOIN",
      "COALESCE"
    ],
    "titulo": "55. Protección bilateral simultánea en FULL OUTER JOIN",
    "descripcion": "Combina <code>clientes AS c</code> y <code>ventas AS vt</code> mediante <code>FULL OUTER JOIN</code> sobre <code>c.id = vt.cliente_id</code>. Aplica <code>COALESCE(c.nombre, 'Sin Cliente Registrado') AS cliente_seguro</code> y <code>COALESCE(vt.metodo_pago, 'Sin Transacción') AS pago_seguro</code>. Proyecta ambas columnas calculadas.",
    "queryEsperada": "SELECT COALESCE(c.nombre, 'Sin Cliente Registrado') AS cliente_seguro, COALESCE(vt.metodo_pago, 'Sin Transacción') AS pago_seguro FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id;",
    "pistas": [
      "Aplica COALESCE a ambos extremos de la unión externa bilateral.",
      "FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id."
    ],
    "explicacion": "Garantiza un dataset 100% normalizado y libre de NULLs crudos en uniones externas bidireccionales."
  },
  {
    "id": 116,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 14: Arquitectura Multi-JOIN y Consultas Maestras",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "WHERE"
    ],
    "titulo": "56. Trazabilidad geográfica completa de clientes colombianos",
    "descripcion": "Realiza un triple enlace partiendo de <code>clientes AS c</code> hacia <code>ventas AS vt</code> con <code>LEFT JOIN</code> (<code>c.id = vt.cliente_id</code>) y hacia <code>videojuegos AS v</code> con <code>LEFT JOIN</code> (<code>vt.videojuego_id = v.id</code>). Filtra para clientes cuyo país sea <code>'Colombia'</code>. Proyecta <strong>c.nombre</strong>, <code>COALESCE(v.titulo, 'Sin Compras') AS juego_comprado</code> y <code>COALESCE(vt.precio_unitario, 0.0) AS precio_pagado</code>.",
    "queryEsperada": "SELECT c.nombre, COALESCE(v.titulo, 'Sin Compras') AS juego_comprado, COALESCE(vt.precio_unitario, 0.0) AS precio_pagado FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id LEFT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE c.pais = 'Colombia';",
    "pistas": [
      "Encadena los dos LEFT JOINs.",
      "Filtra WHERE c.pais = 'Colombia' y usa COALESCE para juego y precio."
    ],
    "explicacion": "Permite auditar el comportamiento de un mercado específico asegurando que incluso los usuarios registrados sin compras figuren en el informe."
  },
  {
    "id": 117,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 14: Arquitectura Multi-JOIN y Consultas Maestras",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "IS NULL"
    ],
    "titulo": "57. Auditoría de catálogo PlayStation sin ventas registradas",
    "descripcion": "Enlaza <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code>. Filtra para encontrar videojuegos de consola que contenga <code>'PlayStation'</code> (<code>v.consola LIKE '%PlayStation%'</code>) o que nunca se hayan vendido (<code>vt.id IS NULL</code>). Proyecta <strong>v.titulo</strong>, <strong>v.consola</strong> y <code>IFNULL(vt.id, 'Sin Venta') AS estado_id</code>.",
    "queryEsperada": "SELECT v.titulo, v.consola, IFNULL(vt.id, 'Sin Venta') AS estado_id FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE v.consola LIKE '%PlayStation%' OR vt.id IS NULL;",
    "pistas": [
      "Filtra con WHERE v.consola LIKE '%PlayStation%' OR vt.id IS NULL.",
      "Proyecta v.titulo, v.consola, IFNULL(vt.id, 'Sin Venta') AS estado_id."
    ],
    "explicacion": "Cruza filtros temáticos de catálogo con detección de ausencias transaccionales."
  },
  {
    "id": 118,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 14: Arquitectura Multi-JOIN y Consultas Maestras",
    "nivel": "Avanzado",
    "tags": [
      "INNER JOIN",
      "Aritmética"
    ],
    "titulo": "58. Proyección financiera de saldo residual tras compra",
    "descripcion": "Une <code>clientes AS c</code>, <code>ventas AS vt</code> y <code>videojuegos AS v</code> mediante <code>INNER JOIN</code>. Calcula el saldo residual estimado que le quedaría al cliente tras pagar la compra: <code>ROUND(c.saldo_cuenta - (vt.cantidad * vt.precio_unitario), 2) AS saldo_remanente</code>. Proyecta <strong>c.nombre</strong>, <strong>v.titulo</strong>, <strong>c.saldo_cuenta</strong> y <strong>saldo_remanente</strong>. Ordena por <strong>saldo_remanente ASC</strong>.",
    "queryEsperada": "SELECT c.nombre, v.titulo, c.saldo_cuenta, ROUND(c.saldo_cuenta - (vt.cantidad * vt.precio_unitario), 2) AS saldo_remanente FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY saldo_remanente ASC;",
    "pistas": [
      "Resta (vt.cantidad * vt.precio_unitario) al saldo_cuenta del cliente.",
      "Ordena por saldo_remanente ASC."
    ],
    "explicacion": "Combina atributos de múltiples tablas en una fórmula de solvencia proyectada para gestión de créditos."
  },
  {
    "id": 119,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 14: Arquitectura Multi-JOIN y Consultas Maestras",
    "nivel": "Avanzado",
    "tags": [
      "FULL OUTER JOIN",
      "ORDER BY"
    ],
    "titulo": "59. Conciliación de catálogo con prioridad de nulos",
    "descripcion": "Aplica <code>FULL OUTER JOIN</code> entre <code>videojuegos AS v</code> y <code>ventas AS vt</code> sobre <code>v.id = vt.videojuego_id</code>. Ordena de modo que las discrepancias (filas donde <code>v.id IS NULL OR vt.id IS NULL</code>) aparezcan en la parte superior del listado mediante <code>ORDER BY (v.id IS NULL OR vt.id IS NULL) DESC, v.precio DESC</code>. Proyecta <strong>v.titulo</strong>, <strong>v.precio</strong> y <strong>vt.id AS venta_id</strong>.",
    "queryEsperada": "SELECT v.titulo, v.precio, vt.id AS venta_id FROM videojuegos AS v FULL OUTER JOIN ventas AS vt ON v.id = vt.videojuego_id ORDER BY (v.id IS NULL OR vt.id IS NULL) DESC, v.precio DESC;",
    "pistas": [
      "Usa FULL OUTER JOIN entre videojuegos AS v y ventas AS vt.",
      "En el ORDER BY coloca la expresión booleana DESC para priorizar las inconsistencias."
    ],
    "explicacion": "Ordenamiento analítico para enfocar auditorías directamente en anomalías de stock y ventas desfasadas."
  },
  {
    "id": 120,
    "seccionId": 2,
    "seccion": "Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
    "modulo": "Módulo 14: Arquitectura Multi-JOIN y Consultas Maestras",
    "nivel": "Avanzado",
    "tags": [
      "LEFT JOIN",
      "COALESCE",
      "CASE WHEN",
      "ORDER BY",
      "LIMIT"
    ],
    "titulo": "60. El Gran Desafío: Matriz Integral de Auditoría Comercial",
    "descripcion": "Diseña la consulta definitiva de la Sección 2 integrando 3 tablas: enlaza <code>clientes AS c</code> con <code>ventas AS vt</code> (<code>c.id = vt.cliente_id</code>) y con <code>videojuegos AS v</code> (<code>vt.videojuego_id = v.id</code>) mediante <code>LEFT JOIN</code>. Proyecta el <strong>nombre</strong> del cliente, <code>COALESCE(v.titulo, 'Sin Videojuego') AS titulo_articulo</code>, <code>COALESCE(vt.cantidad, 0) AS unidades</code>, el importe total <code>ROUND(COALESCE(vt.cantidad * vt.precio_unitario, 0.0), 2) AS total_pagado</code>, y una columna <code>estado_operacion</code>: si <code>vt.id IS NULL</code> debe decir <code>'Inactivo'</code>, de lo contrario <code>'Completado'</code>. Ordena por <code>vt.id IS NULL ASC, total_pagado DESC</code> y aplica paginación para obtener las primeras <strong>10</strong> filas.",
    "queryEsperada": "SELECT c.nombre, COALESCE(v.titulo, 'Sin Videojuego') AS titulo_articulo, COALESCE(vt.cantidad, 0) AS unidades, ROUND(COALESCE(vt.cantidad * vt.precio_unitario, 0.0), 2) AS total_pagado, CASE WHEN vt.id IS NULL THEN 'Inactivo' ELSE 'Completado' END AS estado_operacion FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id LEFT JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.id IS NULL ASC, total_pagado DESC LIMIT 10;",
    "pistas": [
      "Encadena clientes LEFT JOIN ventas LEFT JOIN videojuegos.",
      "Combina COALESCE para el título y total_pagado, y CASE para estado_operacion.",
      "Ordena por vt.id IS NULL ASC, total_pagado DESC LIMIT 10."
    ],
    "explicacion": "Demuestra el dominio completo de uniones externas múltiples, alias de tablas y columnas, control de nulos con COALESCE, lógica condicional con CASE, ordenamiento jerárquico y límites."
  }
];

const EXAMEN_SECCION_1 = {
  "seccionId": 1,
  "titulo": "Examen de Certificación - Sección 1: Consultas SELECT y Filtrado",
  "subtitulo": "Evaluación Teórico-Práctica de Razonamiento en SQL",
  "descripcion": "Este examen evalúa tu comprensión profunda de las cláusulas y operadores de la Sección 1. Consta de 8 preguntas conceptuales no triviales (40 pts) y 4 retos prácticos en tiempo real (60 pts). Puntuación mínima para aprobar: 70%.",
  "preguntasTeoricas": [
    {
      "id": "t1",
      "titulo": "Precedencia de Operadores Lógicos",
      "pregunta": "En una consulta SQL con la cláusula:\n\nWHERE categoria = 'Electrónica' OR stock > 0 AND precio < 50;\n\n¿Cuál es el orden de evaluación del motor en ausencia de paréntesis?",
      "opciones": [
        {
          "id": "A",
          "texto": "Se evalúa estrictamente de izquierda a derecha: primero (categoria = 'Electrónica' OR stock > 0) y el resultado se une con AND precio < 50."
        },
        {
          "id": "B",
          "texto": "El operador AND tiene mayor precedencia natural que OR, evaluándose como: categoria = 'Electrónica' OR (stock > 0 AND precio < 50)."
        },
        {
          "id": "C",
          "texto": "El operador OR siempre se evalúa antes que AND por cortesía en consultas de selección."
        },
        {
          "id": "D",
          "texto": "Provoca un error de sintaxis en el motor porque el estándar SQL prohíbe mezclar AND y OR sin paréntesis."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "En el estándar ANSI SQL (y en SQLite), el operador lógico AND tiene una jerarquía de precedencia superior a OR. Por tanto, el motor evalúa primero la condición combinada por AND. Si el desarrollador deseaba que el OR se evaluara primero, debe usar paréntesis explícitos."
    },
    {
      "id": "t2",
      "titulo": "Lógica Trivalente y Tratamiento de Valores NULL",
      "pregunta": "Si un registro posee comision = NULL, ¿qué resultado produce la condición 'WHERE comision = NULL' y qué sucede con la fila?",
      "opciones": [
        {
          "id": "A",
          "texto": "Produce TRUE porque el valor en la celda es efectivamente NULL."
        },
        {
          "id": "B",
          "texto": "Produce FALSE porque NULL no es comparable con números."
        },
        {
          "id": "C",
          "texto": "Produce UNKNOWN (Desconocido), haciendo que la fila sea descartada ya que WHERE solo acepta registros evaluados a TRUE."
        },
        {
          "id": "D",
          "texto": "Genera una excepción de puntero nulo (NullPointerException) deteniendo la consulta."
        }
      ],
      "correcta": "C",
      "puntos": 5,
      "explicacion": "SQL utiliza lógica trivalente (TRUE, FALSE, UNKNOWN). Toda comparación directa de igualdad (=) o desigualdad (<>) contra NULL resulta en UNKNOWN. La cláusula WHERE descarta tanto FALSE como UNKNOWN. La única forma válida de evaluar nulos es mediante 'IS NULL' o 'IS NOT NULL'."
    },
    {
      "id": "t3",
      "titulo": "La Trampa de NOT IN con Elementos NULL",
      "pregunta": "¿Por qué la sentencia 'SELECT * FROM clientes WHERE pais NOT IN ('México', 'España', NULL);' devuelve 0 filas (conjunto vacío) sin importar los datos existentes?",
      "opciones": [
        {
          "id": "A",
          "texto": "Porque la sintaxis de IN no tolera literales NULL y SQLite aborta la búsqueda."
        },
        {
          "id": "B",
          "texto": "Porque NOT IN (a, b, NULL) se traduce lógicamente como (pais <> 'México') AND (pais <> 'España') AND (pais <> NULL). Al ser (pais <> NULL) siempre UNKNOWN, la conjunción AND nunca puede ser TRUE."
        },
        {
          "id": "C",
          "texto": "Porque el valor NULL al final invalida la memoria caché del motor de base de datos."
        },
        {
          "id": "D",
          "texto": "Porque la presencia de NULL convierte automáticamente la consulta en una agregación de conteo."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "En SQL, 'x NOT IN (a, b, NULL)' equivale a '(x <> a) AND (x <> b) AND (x <> NULL)'. Dado que '(x <> NULL)' evalúa a UNKNOWN, bajo las reglas de la lógica booleana 'TRUE AND UNKNOWN' es UNKNOWN, impidiendo que cualquier fila califique."
    },
    {
      "id": "t4",
      "titulo": "Ciclo de Vida y Orden de Ejecución en SQL",
      "pregunta": "¿Por qué la consulta 'SELECT nombre, (saldo * 1.15) AS saldo_con_interes FROM clientes WHERE saldo_con_interes > 500;' arroja un error de columna inexistente?",
      "opciones": [
        {
          "id": "A",
          "texto": "Los alias generados con AS solo son válidos para renombrar tablas en cláusulas JOIN."
        },
        {
          "id": "B",
          "texto": "El ciclo de ejecución lógica de SQL procesa FROM y WHERE antes que la fase de proyección SELECT, por lo que el alias saldo_con_interes aún no existe cuando el motor evalúa el filtro."
        },
        {
          "id": "C",
          "texto": "En SQL no se pueden realizar operaciones aritméticas de multiplicación decimal en consultas simples."
        },
        {
          "id": "D",
          "texto": "La cláusula WHERE únicamente acepta columnas que cuenten con índices B-Tree creados."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "El orden de ejecución conceptual de SQL es: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT. La cláusula WHERE filtra las filas antes de que SELECT construya la proyección y asigne alias."
    },
    {
      "id": "t5",
      "titulo": "Límites Inclusivos en BETWEEN con Cadenas de Texto",
      "pregunta": "Si ejecutas 'SELECT * FROM clientes WHERE apellido BETWEEN 'A' AND 'C';', ¿aparecerá un cliente cuyo apellido sea 'Castro'?",
      "opciones": [
        {
          "id": "A",
          "texto": "Sí, porque la primera letra de 'Castro' coincide con la letra 'C' del límite superior."
        },
        {
          "id": "B",
          "texto": "No, porque en orden lexicográfico alfabético, cualquier cadena que comience con 'C' y tenga letras posteriores (como 'Ca...') es estrictamente mayor que el carácter individual 'C'."
        },
        {
          "id": "C",
          "texto": "Solo aparecerá si la base de datos está configurada con cotejamiento CASE_INSENSITIVE."
        },
        {
          "id": "D",
          "texto": "Sí, porque BETWEEN expande automáticamente el límite superior como comodín 'C%'."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "En comparaciones alfabéticas, 'C' es un punto de corte exacto. La palabra 'Castro' es lexicográficamente mayor que 'C' (así como 3.01 es mayor que 3.0). Para incluir todos los apellidos que comiencen por C, el límite superior debe ser 'Czz' o 'D'."
    },
    {
      "id": "t6",
      "titulo": "Diferencia entre Comodines LIKE ('_' vs '%')",
      "pregunta": "¿Cuál es la diferencia exacta entre los comodines '_' y '%' en la cláusula LIKE?",
      "opciones": [
        {
          "id": "A",
          "texto": "'_' exige exactamente un único carácter en esa posición, mientras que '%' representa cero, uno o múltiples caracteres arbitrarios."
        },
        {
          "id": "B",
          "texto": "'_' busca solo caracteres numéricos, mientras que '%' busca letras alfabéticas."
        },
        {
          "id": "C",
          "texto": "'%' exige un carácter obligatorio y '_' representa una longitud variable indefinida."
        },
        {
          "id": "D",
          "texto": "Son sinónimos intercambiables según el estándar ANSI SQL."
        }
      ],
      "correcta": "A",
      "puntos": 5,
      "explicacion": "El guion bajo '_' es un comodín posicional de longitud fija (exactamente 1 carácter). El porcentaje '%' es de longitud variable y puede coincidir con cualquier secuencia de longitud cero o más."
    },
    {
      "id": "t7",
      "titulo": "Comportamiento de DISTINCT Multicolumna",
      "pregunta": "En la consulta 'SELECT DISTINCT consola, genero FROM videojuegos;', ¿cuándo descarta una fila el motor?",
      "opciones": [
        {
          "id": "A",
          "texto": "Cuando el valor de la consola ya apareció previamente en otra fila."
        },
        {
          "id": "B",
          "texto": "Cuando el valor del género ya apareció previamente en otra fila."
        },
        {
          "id": "C",
          "texto": "Únicamente cuando la combinación conjunta (la tupla entera 'consola + genero') sea exactamente idéntica a otra fila ya proyectada."
        },
        {
          "id": "D",
          "texto": "Descarta todas las filas excepto la primera si comparten la misma clave primaria."
        }
      ],
      "correcta": "C",
      "puntos": 5,
      "explicacion": "La cláusula DISTINCT opera sobre la totalidad de la lista de proyección, no sobre columnas aisladas. Evalúa la unicidad del conjunto de atributos combinados."
    },
    {
      "id": "t8",
      "titulo": "Mecánica de Paginación con LIMIT y OFFSET",
      "pregunta": "En una tabla con 20 filas ordenadas con 'ORDER BY id ASC', ¿qué registros específicos entrega 'LIMIT 5 OFFSET 10'?",
      "opciones": [
        {
          "id": "A",
          "texto": "Las filas del 1 al 5."
        },
        {
          "id": "B",
          "texto": "Las filas de la posición 5 a la 10."
        },
        {
          "id": "C",
          "texto": "Omite las primeras 10 filas (ids 1 al 10) y retorna las siguientes 5 filas (ids 11 al 15)."
        },
        {
          "id": "D",
          "texto": "Omite 5 filas y retorna las siguientes 10 filas (ids 6 al 15)."
        }
      ],
      "correcta": "C",
      "puntos": 5,
      "explicacion": "OFFSET indica el número de filas a omitir desde el inicio del resultado ordenado. LIMIT indica la cantidad máxima de filas a entregar a continuación."
    }
  ],
  "desafiosPracticos": [
    {
      "id": "p1",
      "titulo": "Reto Práctico 1: Clientes Activos y Solvencia en Mercados Seleccionados",
      "descripcion": "Obtén el <strong>nombre</strong>, <strong>apellido</strong> y <strong>saldo_cuenta</strong> de todos los clientes activos (<code>activo = 1</code>) cuyo país sea <code>'México'</code> o <code>'Colombia'</code> y que posean un saldo estrictamente mayor a <code>20.0</code>. Ordena el resultado por <strong>saldo_cuenta</strong> de forma descendente.",
      "queryEsperada": "SELECT nombre, apellido, saldo_cuenta FROM clientes WHERE activo = 1 AND (pais = 'México' OR pais = 'Colombia') AND saldo_cuenta > 20.0 ORDER BY saldo_cuenta DESC;",
      "puntos": 15
    },
    {
      "id": "p2",
      "titulo": "Reto Práctico 2: Filtro de Precios y Stock sin PlayStation 4",
      "descripcion": "Muestra el <strong>titulo</strong>, <strong>consola</strong>, <strong>precio</strong> y <strong>stock</strong> de los videojuegos cuyo precio esté entre <code>15.0</code> y <code>65.0</code> (usando <code>BETWEEN</code>), cuya consola sea diferente a <code>'PlayStation 4'</code> (<code>consola <> 'PlayStation 4'</code>) y que cuenten con existencias (<code>stock > 0</code>). Ordena por <strong>precio</strong> descendente y limita la consulta a los <strong>4</strong> títulos más caros.",
      "queryEsperada": "SELECT titulo, consola, precio, stock FROM videojuegos WHERE precio BETWEEN 15.0 AND 65.0 AND consola <> 'PlayStation 4' AND stock > 0 ORDER BY precio DESC LIMIT 4;",
      "puntos": 15
    },
    {
      "id": "p3",
      "titulo": "Reto Práctico 3: Búsqueda de Género con Exclusión de Desarrollador",
      "descripcion": "Consulta el <strong>titulo</strong>, <strong>genero</strong> y <strong>desarrollador</strong> de todos los videojuegos cuyo género contenga la palabra <code>'Acción'</code> (usando <code>LIKE '%Acción%'</code>), pero cuyo desarrollador no comience con <code>'Rockstar'</code> (usando <code>NOT LIKE 'Rockstar%'</code>). Ordena los resultados alfabéticamente por <strong>titulo</strong> de forma ascendente.",
      "queryEsperada": "SELECT titulo, genero, desarrollador FROM videojuegos WHERE genero LIKE '%Acción%' AND desarrollador NOT LIKE 'Rockstar%' ORDER BY titulo ASC;",
      "puntos": 15
    },
    {
      "id": "p4",
      "titulo": "Reto Práctico 4: Paginación y Categorización de Precios con CASE",
      "descripcion": "Genera una consulta sobre videojuegos para <code>'PC'</code> o <code>'Nintendo Switch'</code> (usando <code>IN</code>) que proyecte el <strong>titulo</strong>, <strong>precio</strong> y una columna calculada llamada <code>clasificacion_precio</code> mediante <code>CASE</code>: si el precio es menor a <code>20.0</code> devolverá <code>'Económico'</code>, si está entre <code>20.0</code> y <code>50.0</code> (inclusive) devolverá <code>'Medio'</code>, y en cualquier otro caso devolverá <code>'Alto'</code>. Ordena por <strong>precio</strong> descendente y aplica paginación para obtener únicamente los <strong>5</strong> registros de la segunda página (saltando 5 con <code>OFFSET</code>).",
      "queryEsperada": "SELECT titulo, precio, CASE WHEN precio < 20.0 THEN 'Económico' WHEN precio BETWEEN 20.0 AND 50.0 THEN 'Medio' ELSE 'Alto' END AS clasificacion_precio FROM videojuegos WHERE consola IN ('PC', 'Nintendo Switch') ORDER BY precio DESC LIMIT 5 OFFSET 5;",
      "puntos": 15
    }
  ]
};

const EXAMEN_SECCION_2 = {
  "id": "examen-seccion-2",
  "seccionId": 2,
  "titulo": "Examen de Certificación - Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
  "descripcion": "Evaluación rigurosa de <strong>8 preguntas conceptuales (40 pts)</strong> y <strong>4 retos prácticos (60 pts)</strong> sobre INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN y funciones de control de NULL (COALESCE, IFNULL, NULLIF). Aprobación: <strong>70%</strong>.",
  "preguntasTeoricas": [
    {
      "id": "s2_t1",
      "titulo": "Semántica de Filtrado: Cláusula ON vs WHERE en OUTER JOINs",
      "pregunta": "¿Qué ocurre exactamente cuando colocas una condición de filtro sobre la tabla derecha (ej. 'WHERE vt.metodo_pago = \"Tarjeta\"') en un LEFT JOIN en lugar de incluirla dentro de la cláusula ON?",
      "opciones": [
        {
          "id": "A",
          "texto": "La consulta falla con error de sintaxis en el motor relacional."
        },
        {
          "id": "B",
          "texto": "Se descartan las filas donde la tabla derecha era NULL, degradando en la práctica el LEFT JOIN a un INNER JOIN."
        },
        {
          "id": "C",
          "texto": "El motor duplica las filas preservadas para satisfacer ambas condiciones."
        },
        {
          "id": "D",
          "texto": "El resultado es estrictamente idéntico; ON y WHERE son intercambiables en cualquier tipo de JOIN."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "En un LEFT JOIN, las condiciones en ON determinan qué filas de la derecha se emparejan con la izquierda sin eliminar filas de la izquierda. Pero el WHERE se evalúa DESPUÉS de la unión externa; cualquier condición que exija un valor no nulo en la tabla derecha descartará las filas preservadas con NULL, convirtiendo el efecto en un INNER JOIN."
    },
    {
      "id": "s2_t2",
      "titulo": "Comportamiento de Claves Foráneas con NULL en INNER JOIN",
      "pregunta": "Si la tabla 'ventas' contiene una fila donde 'cliente_id' es NULL y se ejecuta 'SELECT * FROM clientes c INNER JOIN ventas v ON c.id = v.cliente_id;', ¿aparece esa venta en el resultado?",
      "opciones": [
        {
          "id": "A",
          "texto": "Sí, se empareja con la fila de clientes donde el id sea 0."
        },
        {
          "id": "B",
          "texto": "Sí, porque el motor asume coincidencia implícita entre valores nulos."
        },
        {
          "id": "C",
          "texto": "No, porque en la lógica trivalente de SQL la expresión 'c.id = NULL' evalúa a UNKNOWN, descartando la fila en un INNER JOIN."
        },
        {
          "id": "D",
          "texto": "Depende de si la clave foránea está indexada físicamente en el motor."
        }
      ],
      "correcta": "C",
      "puntos": 5,
      "explicacion": "En SQL estándar, cualquier comparación de igualdad con NULL ('id = NULL') produce UNKNOWN (ni verdadero ni falso). El INNER JOIN únicamente entrega filas donde la condición del ON evalúe estrictamente a TRUE."
    },
    {
      "id": "s2_t3",
      "titulo": "Equivalencia Direccional de Uniones Externas",
      "pregunta": "Dadas dos tablas A y B, ¿cuál es la relación formal entre 'FROM A LEFT JOIN B ON A.id = B.a_id' y 'FROM B RIGHT JOIN A ON B.a_id = A.id'?",
      "opciones": [
        {
          "id": "A",
          "texto": "Son operaciones completamente distintas que retornan conjuntos de datos incompatibles."
        },
        {
          "id": "B",
          "texto": "Son lógicamente equivalentes y producen el mismo conjunto de filas y correspondencias, cambiando únicamente la tabla preservada según su posición sintáctica."
        },
        {
          "id": "C",
          "texto": "RIGHT JOIN ejecuta siempre más rápido porque el optimizador lee primero la tabla derecha."
        },
        {
          "id": "D",
          "texto": "Solo son equivalentes si no existen valores NULL en ninguna de las dos tablas."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "'A LEFT JOIN B' preserva la tabla A ubicada a la izquierda. 'B RIGHT JOIN A' preserva la tabla A ubicada a la derecha. Ambas operaciones producen exactamente el mismo conjunto de resultados."
    },
    {
      "id": "s2_t4",
      "titulo": "Semántica de FULL OUTER JOIN",
      "pregunta": "En un FULL OUTER JOIN entre la tabla 'clientes' y 'ventas' sobre 'clientes.id = ventas.cliente_id', ¿qué registros están garantizados en el conjunto final?",
      "opciones": [
        {
          "id": "A",
          "texto": "Únicamente los clientes que tienen al menos una venta registrada."
        },
        {
          "id": "B",
          "texto": "Todas las ventas, pero solo los clientes con saldo activo mayor a cero."
        },
        {
          "id": "C",
          "texto": "Todas las coincidencias exactas, más los clientes sin ventas (con campos de venta en NULL), más las ventas sin cliente (con campos de cliente en NULL)."
        },
        {
          "id": "D",
          "texto": "El producto cartesiano completo multiplicado de ambas tablas."
        }
      ],
      "correcta": "C",
      "puntos": 5,
      "explicacion": "FULL OUTER JOIN es la unión inclusiva bilateral: conserva las coincidencias más todas las filas no emparejadas de ambos lados, rellenando las ausencias con NULL."
    },
    {
      "id": "s2_t5",
      "titulo": "Agregación COUNT(*) vs COUNT(columna) tras un LEFT JOIN",
      "pregunta": "Se ejecuta 'SELECT c.nombre, COUNT(*) AS filas, COUNT(vt.id) AS ventas FROM clientes c LEFT JOIN ventas vt ON c.id = vt.cliente_id GROUP BY c.id;'. Para un cliente que nunca ha comprado nada, ¿qué devuelven respectivamente 'filas' y 'ventas'?",
      "opciones": [
        {
          "id": "A",
          "texto": "filas = 0 y ventas = 0."
        },
        {
          "id": "B",
          "texto": "filas = 1 y ventas = 0."
        },
        {
          "id": "C",
          "texto": "filas = 1 y ventas = 1."
        },
        {
          "id": "D",
          "texto": "Ambos devuelven NULL."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "COUNT(*) cuenta el número físico de filas producidas en el grupo (el cliente preservado genera 1 fila con campos derechos en NULL). En cambio, COUNT(vt.id) omite los valores NULL, devolviendo 0 transacciones."
    },
    {
      "id": "s2_t6",
      "titulo": "Diferencia Funcional entre COALESCE e IFNULL",
      "pregunta": "¿Cuál es la diferencia técnica fundamental entre la función COALESCE(...) y la función IFNULL(...)?",
      "opciones": [
        {
          "id": "A",
          "texto": "IFNULL pertenece al estándar ANSI SQL universal, mientras que COALESCE es exclusiva de SQLite."
        },
        {
          "id": "B",
          "texto": "COALESCE es estándar ANSI SQL y acepta un número arbitrario de argumentos (n parámetros en cascada), mientras que IFNULL es una función binaria (exactamente 2 parámetros) de SQLite/MySQL."
        },
        {
          "id": "C",
          "texto": "COALESCE solo opera sobre números y IFNULL solo opera sobre cadenas de texto."
        },
        {
          "id": "D",
          "texto": "IFNULL modifica el archivo físico de la base de datos y COALESCE solo actúa en memoria RAM."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "COALESCE(val1, val2, ..., valN) forma parte de ANSI SQL y evalúa una lista de n parámetros devolviendo el primer no-nulo. IFNULL(a, b) está restringido a 2 argumentos."
    },
    {
      "id": "s2_t7",
      "titulo": "Mecánica y Riesgo del CROSS JOIN (Producto Cartesiano)",
      "pregunta": "Si la tabla 'sucursales' posee 50 registros y la tabla 'turnos' posee 10 registros, ¿cuántas filas entregará la consulta 'SELECT * FROM sucursales CROSS JOIN turnos;' y cuál es su efecto?",
      "opciones": [
        {
          "id": "A",
          "texto": "60 filas (la suma de 50 + 10)."
        },
        {
          "id": "B",
          "texto": "50 filas (el valor máximo entre ambas tablas)."
        },
        {
          "id": "C",
          "texto": "500 filas (50 * 10), combinando cada sucursal con cada uno de los turnos disponibles."
        },
        {
          "id": "D",
          "texto": "5 filas (el cociente de la división entera)."
        }
      ],
      "correcta": "C",
      "puntos": 5,
      "explicacion": "El producto cartesiano combina cada elemento de la tabla A con todos los elementos de la tabla B, produciendo una multiplicación combinatoria estricta de N * M filas."
    },
    {
      "id": "s2_t8",
      "titulo": "Propósito y Mecánica de la Función NULLIF",
      "pregunta": "¿En qué escenario técnico es indispensable emplear la expresión 'NULLIF(divisor, 0)' en una consulta SQL?",
      "opciones": [
        {
          "id": "A",
          "texto": "Para convertir los valores NULL en número cero al realizar una suma."
        },
        {
          "id": "B",
          "texto": "Para prevenir errores de división por cero, ya que al convertir 0 en NULL, la división produce NULL de forma segura en lugar de interrumpir la consulta."
        },
        {
          "id": "C",
          "texto": "Para validar que el divisor sea siempre un número positivo mayor a cero."
        },
        {
          "id": "D",
          "texto": "Para filtrar las filas pares de la tabla."
        }
      ],
      "correcta": "B",
      "puntos": 5,
      "explicacion": "En SQL, la operación x / 0 arroja un error fatal de ejecución. Al usar NULLIF(divisor, 0), si el divisor es 0 se transforma en NULL, y x / NULL retorna NULL de manera segura."
    }
  ],
  "desafiosPracticos": [
    {
      "id": "s2_p1",
      "titulo": "Reto Práctico 1: Reporte Financiero de Ventas con Triple INNER JOIN",
      "descripcion": "Combina <code>clientes AS c</code>, <code>ventas AS vt</code> y <code>videojuegos AS v</code> mediante <code>INNER JOIN</code>. Proyecta el <strong>nombre</strong> y <strong>apellido</strong> del cliente, el <strong>titulo</strong> del juego, la <strong>fecha_venta</strong> y el cálculo <code>ROUND(vt.cantidad * vt.precio_unitario, 2) AS total_linea</code>. Ordena por <strong>fecha_venta DESC</strong> y limita a las primeras <strong>5</strong> transacciones.",
      "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, vt.fecha_venta, ROUND(vt.cantidad * vt.precio_unitario, 2) AS total_linea FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 5;",
      "pistas": [
        "Une c con vt por c.id = vt.cliente_id y vt con v por vt.videojuego_id = v.id.",
        "Usa ROUND(vt.cantidad * vt.precio_unitario, 2) AS total_linea.",
        "Ordena por vt.fecha_venta DESC LIMIT 5."
      ],
      "puntos": 15
    },
    {
      "id": "s2_p2",
      "titulo": "Reto Práctico 2: Auditoría de Clientes sin Compras con LEFT JOIN e IS NULL",
      "descripcion": "Realiza un <code>LEFT JOIN</code> entre <code>clientes AS c</code> y <code>ventas AS vt</code> para aislar a los clientes que <strong>no tienen ninguna compra</strong> en el sistema (<code>WHERE vt.id IS NULL</code>). Proyecta <strong>c.id</strong>, <strong>c.nombre</strong>, <strong>c.apellido</strong>, <strong>c.email</strong> y <strong>c.saldo_cuenta</strong>. Ordena por <strong>c.id ASC</strong>.",
      "queryEsperada": "SELECT c.id, c.nombre, c.apellido, c.email, c.saldo_cuenta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.id IS NULL ORDER BY c.id ASC;",
      "pistas": [
        "FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id",
        "Filtra WHERE vt.id IS NULL.",
        "Ordena por c.id ASC."
      ],
      "puntos": 15
    },
    {
      "id": "s2_p3",
      "titulo": "Reto Práctico 3: Cobertura de Catálogo con RIGHT JOIN y COALESCE",
      "descripcion": "Une <code>ventas AS vt</code> hacia <code>videojuegos AS v</code> mediante <code>RIGHT JOIN</code> (<code>vt.videojuego_id = v.id</code>) para identificar los títulos que <strong>no registran ventas</strong> (<code>WHERE vt.id IS NULL</code>). Proyecta el <strong>titulo</strong>, la <strong>consola</strong>, el <strong>precio</strong> y <code>COALESCE(vt.id, 'Sin Ventas') AS codigo_venta</code>. Ordena por <strong>precio DESC</strong>.",
      "queryEsperada": "SELECT v.titulo, v.consola, v.precio, COALESCE(vt.id, 'Sin Ventas') AS codigo_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.id IS NULL ORDER BY v.precio DESC;",
      "pistas": [
        "FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id",
        "WHERE vt.id IS NULL.",
        "Usa COALESCE(vt.id, 'Sin Ventas') AS codigo_venta y ORDER BY v.precio DESC."
      ],
      "puntos": 15
    },
    {
      "id": "s2_p4",
      "titulo": "Reto Práctico 4: Conciliación Bilateral con FULL OUTER JOIN y Normalización",
      "descripcion": "Realiza un <code>FULL OUTER JOIN</code> entre <code>clientes AS c</code> y <code>ventas AS vt</code> sobre <code>c.id = vt.cliente_id</code>. Filtra únicamente las discrepancias de ambos lados (<code>WHERE c.id IS NULL OR vt.id IS NULL</code>). Proyecta <code>COALESCE(c.nombre, 'Sin Cliente Registrado') AS titular_cliente</code>, <strong>vt.id AS venta_id</strong> y <code>COALESCE(vt.metodo_pago, 'Sin Transacción') AS pasarela_pago</code>.",
      "queryEsperada": "SELECT COALESCE(c.nombre, 'Sin Cliente Registrado') AS titular_cliente, vt.id AS venta_id, COALESCE(vt.metodo_pago, 'Sin Transacción') AS pasarela_pago FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.id IS NULL OR vt.id IS NULL;",
      "pistas": [
        "FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id",
        "Filtra WHERE c.id IS NULL OR vt.id IS NULL.",
        "Aplica COALESCE tanto a c.nombre como a vt.metodo_pago."
      ],
      "puntos": 15
    }
  ]
};

const EXAMENES_CATALOGO = {
  1: EXAMEN_SECCION_1,
  2: EXAMEN_SECCION_2
};

if (typeof window !== "undefined") {
  window.SECCIONES_CATALOGO = SECCIONES_CATALOGO;
  window.BANCO_EJERCICIOS = BANCO_EJERCICIOS;
  window.EXAMEN_SECCION_1 = EXAMEN_SECCION_1;
  window.EXAMEN_SECCION_2 = EXAMEN_SECCION_2;
  window.EXAMENES_CATALOGO = EXAMENES_CATALOGO;
}
