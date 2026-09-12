/**
 * SQLCraft Studio - Banco de Ejercicios y Exámenes de Certificación
 * Sección 1: Dominio de Consultas SELECT y Filtrado de Datos
 * 60 Desafíos (20 Básico, 20 Intermedio, 20 Avanzado) + Examen Teórico-Práctico
 */

const SECCIONES_CATALOGO = [
  {
    id: 1,
    titulo: "Sección 1: Consultas SELECT y Filtrado de Datos",
    descripcion: "Fundamentos esenciales de extracción, proyecciones, alias, operadores relacionales y lógicos, rangos, patrones, ordenamiento, límites y expresiones condicionales CASE.",
    totalRetos: 60,
    niveles: {
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
    "explicacion": "La proyección explícita de columnas optimiza la transferencia de red y evita cargar atributos innecesarios."
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
    "explicacion": "SELECT * es ideal para exploración inicial en consolas de desarrollo, aunque en producción se desaconseja por rendimiento."
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
    "explicacion": "Los alias mejoran la legibilidad de las columnas en reportes e integraciones con APIs."
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
    "explicacion": "SQL permite evaluar expresiones aritméticas directamente en la cláusula SELECT sin alterar los datos almacenados en disco."
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
    "explicacion": "DISTINCT filtra las filas redundantes en la proyección asegurando que cada valor retornado sea único."
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
    "explicacion": "Cuando DISTINCT se aplica a múltiples columnas, evalúa la unicidad de la tupla completa, no de cada columna por separado."
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
    "explicacion": "La cláusula WHERE evalúa una condición booleana fila por fila, reteniendo únicamente aquellas donde el resultado es TRUE."
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
    "explicacion": "El operador '>' compara valores numéricos de forma estricta excluyendo el valor frontera."
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
    "explicacion": "El operador '<=' incluye tanto los valores menores como el valor exacto del límite especificado."
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
    "explicacion": "El operador '<>' excluye filas que coincidan exactamente con el valor dado."
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
    "explicacion": "La conjunción lógica AND solo produce TRUE cuando ambas expresiones booleanas son verdaderas."
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
    "explicacion": "El operador OR retorna TRUE si al menos una de las condiciones es verdadera."
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
    "explicacion": "NOT invierte el resultado lógico de una expresión: convierte TRUE en FALSE y viceversa."
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
    "explicacion": "BETWEEN es una sintaxis concisa equivalente a (campo >= min AND campo <= max), incluyendo siempre ambos límites."
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
    "explicacion": "NOT BETWEEN selecciona valores que se encuentren estrictamente por debajo del mínimo o por encima del máximo."
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
    "explicacion": "El operador IN simplifica múltiples cláusulas OR sucesivas sobre una misma columna."
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
    "explicacion": "NOT IN comprueba que el valor evaluado no coincida con ninguno de los elementos del conjunto."
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
    "explicacion": "El operador LIKE permite coincidencias difusas de cadenas. El símbolo % representa cero o más caracteres arbitrarios."
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
    "explicacion": "ORDER BY clasifica las filas del conjunto de resultados. Si se omite la dirección, ASC es el comportamiento predeterminado."
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
    "explicacion": "La combinación de ORDER BY DESC con LIMIT es el patrón estándar en SQL para resolver problemas de 'Top N'."
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
    "explicacion": "Filtra primero las existencias positivas y clasifica el subconjunto resultante para extraer los 3 más accesibles."
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
    "explicacion": "Debido a que AND tiene mayor prioridad que OR, sin paréntesis la consulta devolvería todos los juegos de PC sin importar su calificación."
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
    "explicacion": "Los paréntesis eliminan ambigüedad y documentan explícitamente las reglas de negocio del filtrado."
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
    "explicacion": "A diferencia de '%', el comodín '_' restringe la longitud a exactamente un único símbolo en esa posición."
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
    "explicacion": "El patrón '%palabra%' es la técnica estándar para búsquedas de texto contenido en cualquier parte del campo."
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
    "explicacion": "Para excluir múltiples patrones de subcadena simultáneamente, se encadenan mediante el operador AND."
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
    "explicacion": "El formato estándar ISO-8601 permite ordenar y comparar rangos de fechas de forma natural con BETWEEN."
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
    "explicacion": "Al ordenar fechas en formato ISO de forma ascendente, los registros más antiguos aparecen primero."
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
    "explicacion": "SQL permite clasificar jerárquicamente: si hay empates en la primera columna, se desempata con la segunda."
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
    "explicacion": "Combina DISTINCT para evitar redundancia junto con un filtro de solvencia y ordenación alfabética."
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
    "explicacion": "OFFSET salta N filas iniciales y LIMIT toma las M siguientes, conformando la base de la paginación web."
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
    "explicacion": "Para evitar que la paginación repita u omita filas con valores idénticos, siempre debe incluirse un criterio único de desempate."
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
    "explicacion": "Representación estándar de estados booleanos en motores relacionales combinada con filtros cuantitativos."
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
    "explicacion": "Demuestra la necesidad de repetir la fórmula en la cláusula WHERE debido al orden de evaluación lógica de SQL."
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
    "explicacion": "Depura el catálogo aplicando exclusión categórica de plataformas y exclusión difusa de géneros."
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
    "explicacion": "Normalizar cadenas con UPPER o LOWER previene inconsistencias por diferencias de capitalización en la captura de datos."
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
    "explicacion": "LENGTH calcula el número de caracteres de una cadena para análisis y restricciones de interfaz."
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
    "explicacion": "Combina rangos numéricos continuos con listas discretas y ordenamiento de prioridad."
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
    "explicacion": "Monitoreo crítico de inventario para generar alertas de reposición inmediata."
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
    "explicacion": "Excluye productos agotados y localiza los elementos activos más próximos al desabastecimiento."
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
    "explicacion": "La expresión CASE transforma códigos numéricos en etiquetas de negocio intuitivas sin alterar la tabla física."
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
    "explicacion": "Segmenta analíticamente una variable continua en intervalos cualitativos de negocio."
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
    "explicacion": "El ordenamiento por CASE permite definir ponderaciones arbitrarias que no dependen del orden alfabético natural."
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
    "explicacion": "Construye filtros con diferentes umbrales cuantitativos por categoría antes de aplicar el corte de calidad global."
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
    "explicacion": "El orden de los WHEN en un CASE es fundamental: el motor evalúa secuencialmente y detiene en la primera coincidencia verdadera."
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
    "explicacion": "Patrones específicos con puntuación permiten identificar estructuras textuales particulares en bases de datos relacionales."
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
    "explicacion": "Combina comodines '_' y '%' para auditar la validez sintáctica básica de direcciones de correo."
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
    "explicacion": "Consulta típica de control financiero y auditoría interna que cruza medios de cobro, montos y periodos fiscales."
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
    "explicacion": "Patrón fundamental de privacidad y gobernanza de datos para ocultar información sensible de usuarios dados de baja."
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
    "explicacion": "Análisis multivariable que cruza valoraciones de usuarios, precio de venta e inventario disponible."
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
    "explicacion": "Implementa reglas de tarificación dinámica directamente en la consulta SQL."
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
    "explicacion": "Agrupa variables continuas en épocas históricas para análisis de catálogo."
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
    "explicacion": "Consulta bifurcada que alimenta dos flujos operacionales simultáneos: retención y depuración de cartera."
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
    "explicacion": "Identifica compras al por mayor liquidadas mediante canales financieros no estándar como Cripto o Transferencia."
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
    "explicacion": "Cálculo de podio de recomendaciones de alta demanda en una plataforma específica."
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
    "explicacion": "Análisis de cuentas durmientes o clientes antiguos con pasivo financiero pendiente de redención."
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
    "explicacion": "Combina filtrado semántico de nombres, listas de exclusión de categorías y franjas de precio."
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
    "explicacion": "Segmentación de usuarios para campañas de correo por rangos alfabéticos y mercados objetivo."
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
    "explicacion": "Análisis de distribución de valor de pedidos (AOV - Average Order Value) para toma de decisiones comerciales."
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
    "explicacion": "El reto definitivo de la Sección 1: combina proyección única, lógica condicional por prioridades, filtros complejos de conjunto, rango y exclusión lógica, ordenación compuesta y truncamiento con límite."
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

if (typeof window !== "undefined") {
  window.SECCIONES_CATALOGO = SECCIONES_CATALOGO;
  window.BANCO_EJERCICIOS = BANCO_EJERCICIOS;
  window.EXAMEN_SECCION_1 = EXAMEN_SECCION_1;
}
