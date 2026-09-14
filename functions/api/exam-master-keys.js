/**
 * SQLCraft Studio - Clave Maestra de Respuestas y Calificación de Exámenes (SERVER-SIDE ONLY)
 * Este archivo se ejecuta EXCLUSIVAMENTE en el entorno del servidor (Cloudflare Pages Functions).
 * NUNCA se distribuye ni se descarga en el bundle del navegador.
 */

export const MASTER_EXAM_KEYS = {
  "seccion1": {
    "teoria": {
      "s1_t1": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el álgebra relacional formal, la cláusula SELECT de SQL corresponde a la operación de 'Proyección' (denotada por la letra griega pi, π), la cual extrae columnas específicas (atributos) de una relación descartando el resto."
      },
      "s1_t2": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "SELECT * incrementa el tráfico de red y consumo de E/S de disco, impide optimizaciones donde el índice contiene todas las columnas solicitadas (covering index) y rompe contratos de código si se añaden o reordenan columnas en la base de datos."
      },
      "s1_t3": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Debido al orden de ejecución lógica de SQL (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY), el alias de columna se crea en la fase SELECT y por tanto no existe durante la evaluación previa de WHERE, pero sí está disponible en ORDER BY."
      },
      "s1_t4": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el estándar ANSI SQL, los literales de cadena usan comillas simples ('texto'), mientras que los identificadores de esquema con caracteres especiales o espacios deben delimitarse con comillas dobles (\"Mi Columna\"). SQLite también admite corchetes [ ] y comillas invertidas ` ` por compatibilidad."
      },
      "s1_t5": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Las expresiones aritméticas en la cláusula SELECT son cálculos puramente escalares y efímeros: el motor los evalúa en memoria para cada tupla procesada sin mutar las tablas subyacentes."
      },
      "s1_t6": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador estándar SQL y soportado por SQLite, PostgreSQL y Oracle para concatenar cadenas es la doble pleca '||'. En SQL Server se usa tradicionalmente '+', pero '||' es el estándar relacional."
      },
      "s1_t7": {
        "correcta": "C",
        "puntos": 5,
        "explicacion": "En SQL, NULL representa una incógnita o ausencia de valor. Salvo en funciones especializadas como COALESCE o CONCAT en MySQL, concatenar cualquier valor con NULL produce NULL (propiedad de propagación de nulos)."
      },
      "s1_t8": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "ROUND(x, n) redondea el número de coma flotante x a n posiciones decimales después del punto, evaluando el siguiente dígito para aproximar hacia arriba o hacia abajo."
      },
      "s1_t9": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Cualquier literal (número, texto o fecha) incluido en la lista de SELECT se proyecta como una columna con ese valor constante idéntico para cada fila devuelta por la consulta."
      },
      "s1_t10": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El alias de tabla (table correlation name) provee un calificador abreviado para desambiguar columnas y mejorar la legibilidad y mantenimiento del código relacional."
      },
      "s1_t11": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La palabra clave AS es opcional en SQL estándar para renombrar columnas y tablas (separando simplemente por espacio en blanco). No obstante, emplear 'AS' explícitamente evita ambigüedades accidentales causadas por comas faltantes."
      },
      "s1_t12": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "UPPER() y LOWER() son funciones escalares de transformación de presentación; transforman los caracteres a mayúsculas o minúsculas únicamente para el conjunto de resultados proyectado."
      },
      "s1_t13": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "LENGTH(str) retorna la cantidad de caracteres de una cadena de texto (o número de bytes para objetos BLOB)."
      },
      "s1_t14": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador '%' (módulo) calcula el resto de la división euclidiana entre dos enteros. 17 = 5 * 3 + 2, por lo que el resultado es 2."
      },
      "s1_t15": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El lenguaje SQL estándar y el motor SQLite son case-insensitive para palabras clave (SELECT, from) e identificadores de tablas y columnas ASCII sin comillas."
      },
      "s1_t16": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Cuando ambos operandos son de tipo INTEGER, el operador '/' ejecuta división entera truncada (5 / 2 = 2). Para obtener 2.5, al menos uno de los operandos debe ser de tipo flotante o casteado (ej. 5.0 / 2 o CAST(5 AS REAL) / 2)."
      },
      "s1_t17": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Una consulta puede proyectar la misma columna física tantas veces como sea necesario, ya sea con su nombre original o con alias calculados."
      },
      "s1_t18": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El estándar SQL especifica '--' para comentarios de línea única que se extienden hasta el salto de línea y '/* ... */' para comentarios de bloque multilinea."
      },
      "s1_t19": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el estándar relacional, NULL no es un valor ni una cadena: es un marcador de estado que indica ausencia de información o dato desconocido. Por el contrario, '' es una entidad de texto definida con longitud 0."
      },
      "s1_t20": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "COALESCE(val1, val2, ...) evalúa secuencialmente sus argumentos de izquierda a derecha y devuelve el primer valor que no sea NULL. Si todos son NULL, devuelve NULL."
      },
      "s1_t21": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El orden de procesamiento conceptual es: primero se identifica la fuente de datos (FROM), luego se filtran las filas (WHERE), luego se proyectan y transforman las columnas (SELECT), luego se ordenan las tuplas (ORDER BY) y finalmente se pagina el corte final (LIMIT)."
      },
      "s1_t22": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La cláusula WHERE se ejecuta en la fase de filtrado de filas, mucho antes de que la cláusula SELECT proyecte y asigne nombres de alias a las columnas calculadas."
      },
      "s1_t23": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "CAST(expresión AS tipo_destino) es la sintaxis estándar ANSI SQL implementada en la gran mayoría de motores para conversión de tipos explícita."
      },
      "s1_t24": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Tanto SQLite como PostgreSQL admiten evaluar expresiones escalares puras en la cláusula SELECT sin especificar FROM. En sistemas como Oracle clásico se utilizaba tradicionalmente la tabla dummy DUAL."
      },
      "s1_t25": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La función TYPEOF(X) en SQLite retorna una cadena de texto indicando la clase de almacenamiento de la expresión X: 'null', 'integer', 'real', 'text' o 'blob'."
      },
      "s1_t26": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La cláusula WHERE aplica un predicado lógico booleano de forma individual sobre cada tupla candidata: solo aquellas con resultado TRUE continúan en el pipeline de procesamiento."
      },
      "s1_t27": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La jerarquía estándar de operadores booleanos en SQL es: 1° NOT (negación unaria), 2° AND (conjunción), 3° OR (disyunción). Por ello, 'A OR B AND C' se evalúa como 'A OR (B AND C)'."
      },
      "s1_t28": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Debido a que AND tiene mayor precedencia que OR, el motor evalúa: 'pais = 'México' OR (pais = 'España' AND saldo_cuenta > 100)'. Todos los de México califican, pero de España solo aquellos con saldo > 100."
      },
      "s1_t29": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL, NULL representa un valor desconocido. La igualdad 'X = NULL' se evalúa a UNKNOWN (indeterminado). Como WHERE solo admite tuplas con resultado estrictamente TRUE, la condición descarta todas las filas. Debe emplearse 'IS NULL'."
      },
      "s1_t30": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Los predicados 'IS NULL' e 'IS NOT NULL' son los operadores estándar definidos por ANSI SQL para comprobar el estado nulo sin incurrir en evaluación trivaluada indeterminada."
      },
      "s1_t31": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Por las Leyes de De Morgan: NOT (A AND B) equivale a (NOT A) OR (NOT B). Al negar 'activo = 1' se obtiene 'activo <> 1' y al negar 'saldo_cuenta > 0' se obtiene 'saldo_cuenta <= 0', unidos por OR."
      },
      "s1_t32": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Por la segunda Ley de De Morgan: NOT (A OR B) equivale a (NOT A) AND (NOT B). El cliente no debe ser de México Y tampoco debe ser de Colombia."
      },
      "s1_t33": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "El estándar formal ISO/ANSI SQL es '<>'. La inmensa mayoría de motores modernos (incluyendo SQLite, PostgreSQL y MySQL) admiten también '!=' como sinónimo válido."
      },
      "s1_t34": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En la tabla de verdad trivaluada de SQL: NOT(UNKNOWN) = UNKNOWN. Como la cláusula WHERE únicamente acepta registros cuyo predicado se evalúe a TRUE, los registros con NULL continúan descartados."
      },
      "s1_t35": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El formato ISO-8601 (Año-Mes-Día con ceros a la izquierda) garantiza que el orden alfabético de la cadena coincida exactamente con el orden temporal cronológico real."
      },
      "s1_t36": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Envolver una columna indexada dentro de una función impide que el motor aproveche el índice normal (salvo que exista un índice basado en funciones o una collation adecuada), forzando a calcular la función fila a fila en toda la tabla."
      },
      "s1_t37": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La condición '1 = 0' nunca se cumple, retornando 0 filas instantáneamente. Se utiliza ampliamente en herramientas de desarrollo, ORMs e interfaces para inspeccionar la estructura de tipos y columnas sin transferir datos."
      },
      "s1_t38": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La cláusula COLLATE especifica la regla de cotejo textual. COLLATE NOCASE realiza la comparación ignorando mayúsculas/minúsculas para caracteres ASCII de 7 bits, mientras que COLLATE BINARY compara bytes exactos."
      },
      "s1_t39": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador '>=' es inclusivo (mayor o igual). Si el valor es idéntico al límite evaluado, la condición es verdadera."
      },
      "s1_t40": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQLite los valores lógicos se representan con enteros de afinidad (0 = falso, 1 = verdadero). La condición 'WHERE activo = 1' es completamente portátil y estándar."
      },
      "s1_t41": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El cortocircuito permite detener la evaluación de un predicado compuesto tan pronto como el valor de verdad global está matemáticamente determinado, ahorrando ciclos de CPU."
      },
      "s1_t42": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador lógico AND exige conjunción total: todas y cada una de las condiciones conectadas deben evaluarse como verdaderas para que el registro califique."
      },
      "s1_t43": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "El operador lógico OR representa la disyunción inclusiva: es suficiente con que cualquiera de las expresiones sea verdadera para que la tupla pase el filtro."
      },
      "s1_t44": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Al evaluar tuplas con país NULL: NULL = 'México' da UNKNOWN. NOT(UNKNOWN) da UNKNOWN, por lo que las filas con país NULL no son seleccionadas."
      },
      "s1_t45": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el estándar ANSI SQL, la forma universal y portable de representar una comilla simple dentro de una cadena delimitada por comillas simples es duplicarla ('')."
      },
      "s1_t46": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Usar OR en exclusiones es un error frecuente: si usas OR, un cliente de México califica porque es distinto de España, y uno de España califica porque es distinto de México (seleccionaría a todos). Se debe usar AND."
      },
      "s1_t47": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La cláusula WHERE acepta cualquier expresión escalar válida, incluyendo multiplicaciones, divisiones, sumas o funciones matemáticas."
      },
      "s1_t48": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL relacional, no encontrar filas coincidentes no es un error: la consulta se ejecuta de forma exitosa entregando una relación vacía (cardinalidad cero)."
      },
      "s1_t49": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "WHERE filtra registros tupla a tupla antes de formar grupos. HAVING se evalúa con posterioridad a GROUP BY para descartar grupos completos basándose en condiciones agregadas (como COUNT(*) o AVG())."
      },
      "s1_t50": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La negación estricta de 'menor que (<)' es 'mayor o igual que (>=)'. Si una calificación es exactamente 9.0, no es menor a 9.0, por lo que su negación es verdadera."
      },
      "s1_t51": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador BETWEEN es estrictamente cerrado e inclusivo en ambos extremos: tanto el límite inferior como el superior forman parte del rango válido."
      },
      "s1_t52": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "SQL no reordena los límites. Al expandirse como 'col >= limite1 AND col <= limite2', si limite1 > limite2, ningún número puede ser simultáneamente mayor a 50 y menor a 20, dando 0 filas."
      },
      "s1_t53": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Al negar un intervalo inclusivo [15, 45], califican todos los valores estrictamente inferiores a 15 O estrictamente superiores a 45."
      },
      "s1_t54": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "BETWEEN opera de manera natural sobre tipos de datos cronológicos o cadenas con formato ISO-8601, abarcando de forma inclusiva todas las fechas del rango especificado."
      },
      "s1_t55": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador de pertenencia IN evalúa si el valor de la columna coincide con cualquiera de los elementos de la lista, comportándose como una serie de comparaciones de igualdad unidas por OR."
      },
      "s1_t56": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "NOT IN (1, 2, NULL) se expande como 'id <> 1 AND id <> 2 AND id <> NULL'. Como 'id <> NULL' siempre es UNKNOWN, la conjunción completa nunca puede ser TRUE. Por ello, si una lista en NOT IN contiene NULL, la consulta no retorna nada."
      },
      "s1_t57": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL, el comodín '%' coincide con cualquier secuencia de caracteres de cualquier longitud, incluyendo una cadena de longitud cero (ningún carácter)."
      },
      "s1_t58": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El guion bajo '_' es un comodín posicional estricto: requiere que exista exactamente un carácter arbitrario en esa posición concreta de la cadena."
      },
      "s1_t59": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "'Super%' exige que la cadena inicie con los caracteres 'Super' seguidos de cualquier secuencia posterior (o ninguna)."
      },
      "s1_t60": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "'%@email.com' coincide con cualquier texto previo arbitrario que finalice exactamente con los caracteres '@email.com'."
      },
      "s1_t61": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "'%War%' califica si 'War' está al inicio, en medio o al final del texto, ya que los comodines '%' permiten cero o más caracteres a ambos lados."
      },
      "s1_t62": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Cada guion bajo '_' exige un carácter. Tres guiones consecutivos sin '%' coinciden únicamente con cadenas cuya longitud total sea exactamente de 3 caracteres (ej. 'RPG', 'GTA', 'God')."
      },
      "s1_t63": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Por especificación interna de SQLite, el operador LIKE es insensible a mayúsculas para caracteres del alfabeto latino ASCII ('a' coincide con 'A'). Para forzar sensibilidad se usa el operador GLOB o el pragma case_sensitive_like."
      },
      "s1_t64": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La cláusula estándar ESCAPE 'carácter' define un prefijo de escape. Al escribir '100!%' ESCAPE '!', el motor interpreta el '%' precedido por '!' como un carácter de porcentaje literal."
      },
      "s1_t65": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "NOT LIKE descarta las cadenas que satisfagan el patrón. Aquellos registros donde el campo sea NULL se evalúan a UNKNOWN y también quedan excluidos."
      },
      "s1_t66": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Los índices B-Tree están ordenados de izquierda a derecha. Un prefijo comodín (%texto) impide el uso de búsqueda binaria por rango, obligando a inspeccionar cada fila de la tabla."
      },
      "s1_t67": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "GLOB utiliza la sintaxis de patrones de comodines Unix/shell ('*' para cualquier longitud, '?' para un carácter y '[a-z]' para rangos) y es siempre case-sensitive en SQLite."
      },
      "s1_t68": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El operador AND exige la satisfacción conjunta del predicado de pertenencia a conjunto (IN) y del predicado de rango inclusivo (BETWEEN)."
      },
      "s1_t69": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El primer carácter coincide con '_', el segundo debe ser exactamente 'a', y '%' permite que continúe cualquier texto o nada (ej. 'Halo', 'Mario', 'Dark')."
      },
      "s1_t70": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Una lista de pertenencia con un único valor 'IN (x)' es matemática y semánticamente equivalente a la igualdad estándar '= x'."
      },
      "s1_t71": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Incluso el comodín universal '%' no coincide con NULL. Al evaluar NULL LIKE '%', el resultado es NULL (UNKNOWN), por lo que la fila no califica."
      },
      "s1_t72": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En orden alfabético, cualquier letra añadida después de 'C' hace que la cadena sea mayor que 'C' a solas ('Carlos' > 'C'). Para incluir nombres que comiencen con C se debe usar un límite superior como 'D' o 'Cz'."
      },
      "s1_t73": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "'2023-%' coincide con cualquier fecha que comience con el año 2023 y el guion separador, abarcando todos los meses y días de ese año."
      },
      "s1_t74": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "NOT IN excluye todos los elementos especificados en la lista ('consola <> 'PC' AND consola <> 'Nintendo Switch'')."
      },
      "s1_t75": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La definición formal del estándar SQL para 'x BETWEEN a AND b' es 'x >= a AND x <= b'."
      },
      "s1_t76": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el modelo relacional, las tablas son conjuntos matemáticos no ordenados. La única forma de garantizar un orden determinista en el resultado es mediante la cláusula ORDER BY explícita."
      },
      "s1_t77": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL, la cláusula ORDER BY asume 'ASC' (ascendente) por defecto si se omite el modificador de dirección."
      },
      "s1_t78": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "ORDER BY evalúa los criterios de izquierda a derecha en orden jerárquico de prioridad: el segundo criterio solo entra en juego cuando existen valores idénticos (empates) en el primer criterio."
      },
      "s1_t79": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el pipeline lógico de ejecución SQL: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Como ORDER BY se ejecuta tras SELECT, tiene pleno acceso a los alias definidos en la proyección."
      },
      "s1_t80": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La notación posicional (ORDER BY 2) referencia la 2da columna de la lista SELECT. Aunque es válida, es una mala práctica en producción porque si un desarrollador reordena o añade columnas al SELECT, el criterio de ordenamiento cambia silenciosamente."
      },
      "s1_t81": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQLite, los valores NULL se consideran menores que cualquier otro tipo de dato en comparaciones de ordenamiento. Por tanto, en ORDER BY ASC aparecen primero, y en ORDER BY DESC aparecen al final."
      },
      "s1_t82": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "LIMIT n trunca el cursor de resultados tras haber emitido n filas hacia el cliente o aplicación que realizó la consulta."
      },
      "s1_t83": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "OFFSET m especifica el salto o desplazamiento de filas: el motor salta las primeras m filas del conjunto resultante y empieza a entregar a partir de la fila m + 1."
      },
      "s1_t84": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La fórmula de paginación es OFFSET = (página - 1) * tamaño_página. Para la página 3 con tamaño 10: OFFSET = (3 - 1) * 10 = 20. La cláusula correcta es 'LIMIT 10 OFFSET 20' (omite las 20 primeras filas y entrega las siguientes 10: filas de la 21 a la 30)."
      },
      "s1_t85": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Sin un ORDER BY determinista (preferiblemente con una clave única como desempate), el motor puede entregar las filas en cualquier orden según planes de ejecución internos, corrompiendo la consistencia de la paginación."
      },
      "s1_t86": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "DISTINCT no es una función que afecte a una sola columna: es un calificador de conjunto que opera sobre la totalidad de la lista proyectada en el SELECT, evaluando la unicidad de la tupla completa."
      },
      "s1_t87": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "A diferencia de las comparaciones normales donde NULL = NULL da UNKNOWN, la cláusula DISTINCT del estándar SQL agrupa todos los valores NULL bajo una sola representación única."
      },
      "s1_t88": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Para eliminar duplicados, el motor debe comparar cada fila contra las demás, lo que típicamente involucra un operador de ordenamiento (Sort Unique) o hashing en memoria, penalizando el rendimiento en consultas masivas."
      },
      "s1_t89": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La sintaxis estándar ANSI SQL para la expresión condicional general (Searched CASE) es: 'CASE WHEN condición1 THEN resultado1 [WHEN ... THEN ...] [ELSE resultado_default] END'."
      },
      "s1_t90": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Las cláusulas WHEN se evalúan estrictamente en orden secuencial de arriba hacia abajo. En cuanto una condición resulta verdadera, su expresión THEN correspondiente es devuelta y el resto de los WHEN son ignorados."
      },
      "s1_t91": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el estándar SQL, la cláusula ELSE es opcional en la expresión CASE. Si ninguna condición WHEN es satisfecha y no existe un bloque ELSE, el resultado por defecto es NULL."
      },
      "s1_t92": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Como CASE es una expresión que puede anidarse o estar dentro de funciones escalares, 'END' indica formalmente al analizador sintáctico dónde concluye la estructura condicional."
      },
      "s1_t93": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "ORDER BY CASE WHEN pais = 'México' THEN 1 ELSE 2 END, pais ASC es una técnica estándar de la industria para forzar que ciertos registros prioritarios aparezcan en la cima de la salida."
      },
      "s1_t94": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "En el CASE simple se evalúa una sola expresión base contra valores puntuales de igualdad ('CASE x WHEN v1...'). En el CASE buscado, cada WHEN contiene una condición lógica arbitraria ('CASE WHEN cond1...')."
      },
      "s1_t95": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "LIMIT 0 solicita al motor un corte de 0 filas; se utiliza a menudo para verificar la validez sintáctica de la consulta y obtener metadatos de columnas con consumo mínimo de recursos."
      },
      "s1_t96": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Por herencia de dialectos antiguos, 'LIMIT offset, count' invierte los términos: el primer número es el OFFSET (filas a saltar) y el segundo es el LIMIT (filas a devolver). Es preferible la sintaxis estándar explícita 'LIMIT x OFFSET y'."
      },
      "s1_t97": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Si un país tiene saldos de 10, 50 y 100, al aplicar DISTINCT país queda una sola fila: ordenar por 'saldo_cuenta' es ambiguo. El estándar exige que en 'SELECT DISTINCT col', cualquier columna del ORDER BY esté presente en la lista de proyección."
      },
      "s1_t98": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Al ordenar tipos TEXT o VARCHAR, el motor compara carácter a carácter según la tabla ASCII: el carácter '1' precede al carácter '2', por lo que '10' se posiciona antes que '2'."
      },
      "s1_t99": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En consultas estándar (sin DISTINCT), la cláusula ORDER BY puede calcular expresiones sobre cualquier columna de las tablas origen para definir el ordenamiento, sin obligación de proyectarlas."
      },
      "s1_t100": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El motor primero aplica el WHERE (solo PC), luego ordena por precio descendente (de mayor a menor costo), el OFFSET 3 salta los tres primeros registros (los 3 más caros) y el LIMIT 3 entrega las siguientes 3 tuplas (posiciones 4°, 5° y 6°)."
      }
    },
    "practica": {
      "p1": {
        "queryEsperada": "SELECT c.nombre AS titular, c.apellido, c.saldo_cuenta AS saldo_disponible FROM clientes AS c WHERE c.activo = 1 AND (c.pais = 'México' OR c.pais = 'Colombia') AND c.saldo_cuenta > 20.0 ORDER BY saldo_disponible DESC;",
        "puntos": 15
      },
      "p2": {
        "queryEsperada": "SELECT titulo, consola, precio, stock FROM videojuegos WHERE precio BETWEEN 15.0 AND 65.0 AND consola <> 'PlayStation 4' AND stock > 0 ORDER BY precio DESC LIMIT 4;",
        "puntos": 15
      },
      "p3": {
        "queryEsperada": "SELECT titulo, genero, desarrollador FROM videojuegos WHERE genero LIKE '%Acción%' AND desarrollador NOT LIKE 'Rockstar%' ORDER BY titulo ASC;",
        "puntos": 15
      },
      "p4": {
        "queryEsperada": "SELECT titulo, precio, CASE WHEN precio < 20.0 THEN 'Económico' WHEN precio BETWEEN 20.0 AND 50.0 THEN 'Medio' ELSE 'Alto' END AS clasificacion_precio FROM videojuegos WHERE consola IN ('PC', 'Nintendo Switch') ORDER BY precio DESC LIMIT 5 OFFSET 5;",
        "puntos": 15
      },
      "p5": {
        "queryEsperada": "SELECT id AS clave_cliente, nombre || ' ' || apellido AS nombre_completo, pais, saldo_cuenta FROM clientes WHERE pais IN ('España', 'Argentina', 'Chile') AND saldo_cuenta >= 50.0 ORDER BY pais ASC, saldo_cuenta DESC;",
        "puntos": 15
      },
      "p6": {
        "queryEsperada": "SELECT titulo, consola, precio, stock, ROUND(precio * stock, 2) AS valor_inventario FROM videojuegos WHERE stock > 0 AND (consola = 'PC' OR consola = 'PlayStation 5') ORDER BY valor_inventario DESC LIMIT 6;",
        "puntos": 15
      },
      "p7": {
        "queryEsperada": "SELECT DISTINCT pais FROM clientes WHERE activo = 1 ORDER BY pais ASC;",
        "puntos": 15
      },
      "p8": {
        "queryEsperada": "SELECT titulo, calificacion, precio, desarrollador FROM videojuegos WHERE calificacion >= 9.0 AND (precio < 30.0 OR desarrollador = 'Nintendo') ORDER BY calificacion DESC, precio ASC;",
        "puntos": 15
      },
      "p9": {
        "queryEsperada": "SELECT nombre, email, fecha_registro, saldo_cuenta FROM clientes WHERE fecha_registro >= '2022-01-01' AND (saldo_cuenta = 0.0 OR activo = 0) ORDER BY fecha_registro DESC;",
        "puntos": 15
      },
      "p10": {
        "queryEsperada": "SELECT DISTINCT genero, consola FROM videojuegos WHERE precio <= 40.0 ORDER BY genero ASC, consola ASC;",
        "puntos": 15
      },
      "p11": {
        "queryEsperada": "SELECT titulo, precio, ROUND(precio * 0.85, 2) AS precio_oferta, genero FROM videojuegos WHERE año_lanzamiento IN (2020, 2021, 2022, 2023) AND genero NOT LIKE '%RPG%' ORDER BY precio_oferta DESC LIMIT 5;",
        "puntos": 15
      },
      "p12": {
        "queryEsperada": "SELECT c.id AS id_cliente, c.nombre, c.apellido, c.email FROM clientes AS c WHERE c.email LIKE '%@email.com' AND (c.nombre LIKE 'M%' OR c.nombre LIKE 'L%') ORDER BY c.nombre ASC;",
        "puntos": 15
      },
      "p13": {
        "queryEsperada": "SELECT titulo, consola, stock, CASE WHEN stock = 0 THEN 'Agotado' WHEN stock <= 15 THEN 'Crítico' ELSE 'Suficiente' END AS estado_stock FROM videojuegos WHERE consola <> 'PC' ORDER BY stock ASC, titulo ASC;",
        "puntos": 15
      },
      "p14": {
        "queryEsperada": "SELECT DISTINCT desarrollador FROM videojuegos WHERE calificacion > 9.0 AND precio BETWEEN 20.0 AND 60.0 ORDER BY desarrollador ASC;",
        "puntos": 15
      },
      "p15": {
        "queryEsperada": "SELECT id, nombre, apellido, saldo_cuenta, CASE WHEN saldo_cuenta >= 100.0 THEN 'VIP' WHEN saldo_cuenta >= 20.0 THEN 'Regular' ELSE 'Básico' END AS categoria_cliente FROM clientes WHERE activo = 1 ORDER BY saldo_cuenta DESC LIMIT 8 OFFSET 2;",
        "puntos": 15
      },
      "p16": {
        "queryEsperada": "SELECT titulo, genero, calificacion, año_lanzamiento FROM videojuegos WHERE (año_lanzamiento < 2020 OR calificacion < 9.0) AND stock > 10 ORDER BY año_lanzamiento ASC, calificacion DESC;",
        "puntos": 15
      },
      "p17": {
        "queryEsperada": "SELECT nombre || ' (' || pais || ')' AS cliente_residencia, saldo_cuenta, fecha_registro FROM clientes WHERE pais NOT IN ('México', 'España') AND saldo_cuenta > 0.0 ORDER BY saldo_cuenta DESC;",
        "puntos": 15
      },
      "p18": {
        "queryEsperada": "SELECT titulo, desarrollador, precio FROM videojuegos WHERE titulo LIKE '%The%' AND precio BETWEEN 10.0 AND 70.0 ORDER BY precio ASC;",
        "puntos": 15
      },
      "p19": {
        "queryEsperada": "SELECT c.nombre, c.apellido, c.pais, c.saldo_cuenta FROM clientes AS c WHERE (c.pais = 'México' AND c.saldo_cuenta > 100.0) OR (c.pais = 'España' AND c.saldo_cuenta > 50.0) ORDER BY c.saldo_cuenta DESC;",
        "puntos": 15
      },
      "p20": {
        "queryEsperada": "SELECT titulo, consola, precio, stock FROM videojuegos WHERE genero IN ('Acción', 'Acción RPG', 'Acción Aventura') AND stock BETWEEN 5 AND 50 ORDER BY precio DESC, stock ASC LIMIT 5;",
        "puntos": 15
      },
      "p21": {
        "queryEsperada": "SELECT nombre, email, saldo_cuenta, CASE WHEN activo = 1 THEN 'Habilitado' ELSE 'Suspendido' END AS estado_cuenta FROM clientes WHERE email NOT LIKE 'a%' AND email NOT LIKE 'j%' ORDER BY apellido ASC;",
        "puntos": 15
      },
      "p22": {
        "queryEsperada": "SELECT DISTINCT consola FROM videojuegos WHERE año_lanzamiento >= 2020 AND precio >= 30.0 ORDER BY consola ASC;",
        "puntos": 15
      },
      "p23": {
        "queryEsperada": "SELECT titulo, calificacion, stock, ROUND(precio * 1.16, 2) AS precio_con_iva FROM videojuegos WHERE (consola = 'Nintendo Switch' OR consola = 'PC') AND stock > 0 ORDER BY precio_con_iva DESC LIMIT 7 OFFSET 3;",
        "puntos": 15
      },
      "p24": {
        "queryEsperada": "SELECT c.nombre AS nombre_usuario, c.pais AS pais_origen, c.saldo_cuenta FROM clientes AS c WHERE c.saldo_cuenta NOT BETWEEN 10.0 AND 100.0 ORDER BY c.saldo_cuenta DESC;",
        "puntos": 15
      },
      "p25": {
        "queryEsperada": "SELECT titulo, consola, calificacion, CASE WHEN calificacion >= 9.5 THEN 'Obra Maestra' WHEN calificacion >= 9.0 THEN 'Excelente' ELSE 'Recomendado' END AS distincion FROM videojuegos WHERE precio <= 50.0 AND stock > 0 ORDER BY calificacion DESC, titulo ASC LIMIT 6;",
        "puntos": 15
      }
    }
  },
  "seccion2": {
    "teoria": {
      "s2_t1": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El INNER JOIN entrega únicamente las tuplas coincidentes de ambas relaciones para las cuales el predicado de unión (cláusula ON) se evalúa como verdadero (intersección relacional)."
      },
      "s2_t2": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La cláusula ON define el predicado de cruce; solo las parejas de filas donde la expresión lógica en ON resulta ser TRUE se incluyen en la relación intermedia combinada."
      },
      "s2_t3": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL, la comparación escalar con NULL nunca resulta verdadera ('id = NULL' $\\to$ UNKNOWN). Por ende, cualquier clave foránea nula es excluida automáticamente en un INNER JOIN."
      },
      "s2_t4": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En la sintaxis implícita antigua, la condición de unión se mezcla con los filtros en WHERE. Si se omite la condición de enlace por descuido, se genera un producto cartesiano completo involuntario."
      },
      "s2_t5": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Cuando dos o más tablas en el FROM comparten un nombre de atributo idéntico, el analizador semántico exige calificar la columna (tabla.columna o alias.columna) para resolver la ambigüedad."
      },
      "s2_t6": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Los joins se procesan de forma asociativa por pares de relaciones: el resultado del primer JOIN actúa como una relación virtual que es alimentada al siguiente JOIN."
      },
      "s2_t7": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En una relación 1 a N, cada coincidencia en la tabla foránea genera una nueva tupla en el resultado, multiplicando la fila de la entidad primaria por la cantidad de filas asociadas."
      },
      "s2_t8": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "La cláusula estándar 'USING (col)' es un atajo sintáctico aplicable exclusivamente cuando el atributo de enlace posee exactamente el mismo nombre en ambas tablas (y además consolida la columna en la proyección)."
      },
      "s2_t9": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Aunque la gran mayoría de joins son de igualdad (Equi-Joins), el estándar relacional permite cualquier expresión booleana en el ON, muy común para rangos de fechas o escalas salariales."
      },
      "s2_t10": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Un Self-Join permite relacionar registros de la misma tabla (ej. empleados con sus jefes o comparaciones entre filas hermanas). Requiere asignar alias diferenciados (ej. FROM empleados e1 JOIN empleados e2)."
      },
      "s2_t11": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Sin un índice en la clave foránea, cada tupla de la tabla izquierda requeriría un escaneo completo de la tabla derecha (Nested Loop Scan), elevando la complejidad temporal a $O(M \\times N)$."
      },
      "s2_t12": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "A diferencia de las uniones externas (LEFT/RIGHT JOIN), en un INNER JOIN la cláusula ON y la cláusula WHERE son semánticamente equivalentes para el filtrado: ambas descartan tuplas que no cumplan la condición."
      },
      "s2_t13": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "JOIN expande la proyección combinando atributos de distintas entidades lado a lado (horizontal), mientras que UNION apila tuplas de consultas compatibles una sobre otra (vertical)."
      },
      "s2_t14": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Si no hay ninguna coincidencia, el resultado es 0 filas. Si cada una de las 10 filas coincide con las 20 filas de la otra tabla, el resultado alcanza el producto cartesiano máximo de $10 \\times 20 = 200$ tuplas."
      },
      "s2_t15": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "NATURAL JOIN asume un enlace implícito sobre todas las columnas con nombres idénticos. Si se agrega una columna de auditoría como 'fecha_adicion' a ambas tablas, el join intentará emparejar también por esa fecha, rompiendo la lógica del negocio."
      },
      "s2_t16": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Los tres pilares de optimización física de joins en motores relacionales son Nested Loops (ideal para tablas pequeñas o indexadas), Hash Joins (óptimo para grandes conjuntos no ordenados) y Sort-Merge Joins (para conjuntos previamente ordenados)."
      },
      "s2_t17": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Una vez unidas las relaciones en el pipeline, todas las columnas proyectables coexisten en el contexto de la tupla enriquecida, permitiendo operaciones matemáticas cruzadas entre cualquier atributo del join."
      },
      "s2_t18": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "ORDER BY opera sobre la relación final proyectada y enriquecida por el JOIN, teniendo acceso a todos los atributos de las tablas involucradas en la cláusula FROM."
      },
      "s2_t19": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "La cláusula ON soporta múltiples predicados booleanos unidos por AND u OR, restringiendo el criterio de emparejamiento entre ambas relaciones."
      },
      "s2_t20": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL estándar con tipado fuerte, comparar claves de tipos dispares (INTEGER vs VARCHAR) falla con error de tipos incompatibles a menos que se use CAST. SQLite intenta resolverlo por afinidad de tipos."
      },
      "s2_t21": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Incluir joins de tablas de las que no se extrae información ni se aplican filtros agrega sobrecarga de procesamiento inútil en el plan de ejecución."
      },
      "s2_t22": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El INNER JOIN asegura que solo se seleccionen clientes que tengan al menos una fila en 'ventas', y DISTINCT elimina las repeticiones causadas por clientes con compras múltiples."
      },
      "s2_t23": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La operación de reunión interna (INNER JOIN) es conmutativa ($A \\bowtie B \\equiv B \\bowtie A$) y asociativa en álgebra relacional: el orden físico de declaración no cambia las tuplas emparejadas."
      },
      "s2_t24": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El ordenamiento descendente por fecha_venta coloca la transacción cronológicamente más reciente en la primera posición, y LIMIT 1 extrae ese único registro."
      },
      "s2_t25": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El WHERE actúa como un filtro posterior a las uniones que exige el cumplimiento simultáneo de condiciones pertenecientes a diferentes entidades de la relación cruzada."
      },
      "s2_t26": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El LEFT JOIN preserva la totalidad de las tuplas de la relación izquierda. Si una fila de la izquierda no encuentra ninguna pareja en la derecha según la cláusula ON, se proyecta igualmente rellenando todos los atributos de la derecha con NULL."
      },
      "s2_t27": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En un LEFT JOIN, el WHERE se evalúa DESPUÉS de la unión externa. Al exigir 'vt.metodo_pago = 'Tarjeta'', como las filas preservadas de la izquierda tienen NULL en ese campo y NULL = 'Tarjeta' es UNKNOWN, el WHERE las descarta a todas, destruyendo el efecto de la unión externa y convirtiéndolo en un INNER JOIN."
      },
      "s2_t28": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "El Anti-Join utiliza un LEFT JOIN y filtra con 'WHERE derecha.clave_primaria IS NULL'. Dado que las filas emparejadas tienen un ID válido no nulo, únicamente sobreviven las filas de la izquierda que no tuvieron ninguna coincidencia."
      },
      "s2_t29": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Un RIGHT JOIN preserva la tabla de la derecha. Por tanto, invertir el orden de las tablas en la cláusula FROM convirtiéndolo en un LEFT JOIN produce un resultado relacional idéntico."
      },
      "s2_t30": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "A partir de la versión 3.39.0 (mediados de 2022), SQLite incorporó soporte nativo tanto para RIGHT OUTER JOIN como para FULL OUTER JOIN."
      },
      "s2_t31": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Por definición de la unión externa izquierda, cada una de las 15 filas de 'clientes' tiene garantizada su presencia en la salida, incluso si la tabla 'ventas' estuviese completamente vacía."
      },
      "s2_t32": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El LEFT JOIN solo genera una fila con valores NULL si la fila izquierda no tiene ninguna coincidencia. Si tiene una o más coincidencias, se comporta como un INNER JOIN para ese registro, generando una fila por cada par coincidente."
      },
      "s2_t33": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Este es uno de los errores más comunes en SQL analítico: COUNT(*) cuenta tuplas presentes en el cursor (dando 1 para la fila preservada), mientras que COUNT(columna_derecha) solo cuenta valores no nulos, entregando 0 compras con exactitud."
      },
      "s2_t34": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "COALESCE devuelve el primer valor no nulo. Si la venta no existe (v.metodo_pago es NULL), devuelve la cadena de reemplazo por defecto especificada."
      },
      "s2_t35": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Si encadenas un INNER JOIN sobre una tabla opcional que produjo NULLs en un LEFT previo, el INNER JOIN descarta todas las filas con NULL. Para mantener los clientes sin compras, el segundo enlace debe ser también un LEFT JOIN hacia videojuegos."
      },
      "s2_t36": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En un LEFT JOIN, las condiciones adicionales en el ON restringen qué filas de la derecha son consideradas candidatas a emparejamiento, SIN filtrar ni eliminar filas de la tabla izquierda."
      },
      "s2_t37": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Como RIGHT JOIN preserva todos los videojuegos de la tabla derecha, aquellos títulos sin transacciones tendrán NULL en todas las columnas de 'ventas'. Filtrar con 'WHERE vt.id IS NULL' aísla con exactitud los títulos sin ventas."
      },
      "s2_t38": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL relacional, cualquier consulta que devuelva un conjunto de tuplas es una relación válida, por lo que una subconsulta con alias (derived table) puede enlazarse mediante LEFT JOIN como cualquier tabla base."
      },
      "s2_t39": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Cualquier operador de comparación (<>, =, <) sobre una columna de la tabla derecha que pueda contener NULL descartará las filas preservadas. Si se deseaba conservar a los clientes sin compras, la condición debió escribirse como '(v.metodo_pago <> 'PayPal' OR v.metodo_pago IS NULL)' o colocarse en el ON."
      },
      "s2_t40": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Las uniones externas admiten operadores relacionales no igualitarios en la cláusula ON, manteniendo la semántica de preservar la tabla izquierda si ninguna condición resulta verdadera."
      },
      "s2_t41": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Encadenar LEFT JOINs consecutivos asegura que el flujo conserve a todos los clientes originales a lo largo de toda la cadena de relaciones sin descartar tuplas en pasos intermedios."
      },
      "s2_t42": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Evaluar 'v.id IS NOT NULL' en una expresión CASE tras un LEFT JOIN permite clasificar de forma binaria si la fila de la izquierda encontró o no registros asociados en la tabla derecha."
      },
      "s2_t43": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL, las condiciones de enlace para claves compuestas se declaran en la cláusula ON conectándolas mediante el operador lógico AND."
      },
      "s2_t44": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Al igual que en un INNER JOIN, si una fila de la izquierda tiene múltiples coincidencias, se multiplica por cada coincidencia encontrada ($5 \\times 100 = 500$ filas)."
      },
      "s2_t45": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "IFNULL(x, y) es una función nativa de SQLite equivalente a COALESCE(x, y) que devuelve y si x es NULL, ideal para reportes donde se prefieren ceros en lugar de campos vacíos."
      },
      "s2_t46": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En estructuras jerárquicas recursivas (árboles o organigramas), el nodo raíz no tiene padre/supervisor. Un Self LEFT JOIN permite listar a todos los empleados mostrando el nombre de su jefe o NULL si es el líder máximo."
      },
      "s2_t47": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La presencia de un NULL en una lista de NOT IN anula toda la evaluación retornando conjunto vacío. El Anti-Join con LEFT JOIN es inmune a este problema y suele tener planes de ejecución más eficientes."
      },
      "s2_t48": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El analizador sintáctico de SQL requiere de forma obligatoria la cláusula ON o USING para cualquier JOIN calificado (la única excepción deliberada es CROSS JOIN y NATURAL JOIN)."
      },
      "s2_t49": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Filtrar por la tabla izquierda en el WHERE es completamente válido y no degrada la unión externa: simplemente restringe qué filas de la tabla izquierda participan en la operación."
      },
      "s2_t50": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El LEFT JOIN garantiza que todos los clientes aparezcan; para los que no tienen ventas, SUM() sobre nulos produce NULL, y COALESCE lo convierte limpiamente a 0.0."
      },
      "s2_t51": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El FULL OUTER JOIN es la unión externa total: retiene las tuplas emparejadas, más las tuplas de A sin pareja en B (con campos de B en NULL), más las tuplas de B sin pareja en A (con campos de A en NULL)."
      },
      "s2_t52": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Filtrar por 'c.id IS NULL OR vt.id IS NULL' descarta las filas que sí hicieron match en ambos extremos, aislando exclusivamente las discrepancias de cualquiera de las dos tablas."
      },
      "s2_t53": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La técnica universal de emulación es: (SELECT ... LEFT JOIN ...) UNION (SELECT ... RIGHT JOIN ...). El operador UNION consolida las tuplas de ambos lados y elimina la duplicación de las filas intermedias coincidentes."
      },
      "s2_t54": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "CROSS JOIN calcula el producto cartesiano formal del álgebra relacional: genera todas las combinaciones posibles de tuplas emparejando cada registro de A con cada registro de B."
      },
      "s2_t55": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El CROSS JOIN es ideal para matrices dimensionales (ej. combinar dimensiones 'Mes' y 'Producto' para luego hacer un LEFT JOIN hacia ventas y detectar meses sin ventas sin perder el mes)."
      },
      "s2_t56": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La complejidad espacial del producto cartesiano es cuadrática ($100,000 \\times 100,000 = 10^{10}$). Esta explosión combinatoria es la razón principal por la que los productos cartesianos accidentales son tan destructivos."
      },
      "s2_t57": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Al preservar ambos lados por igual, el FULL OUTER JOIN es simétrico: la pertenencia de las tuplas al conjunto resultado no depende de qué tabla se escribió primero."
      },
      "s2_t58": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Un producto cartesiano (CROSS JOIN) filtrado por igualdad en el WHERE produce exactamente el mismo conjunto de filas que un INNER JOIN con ON."
      },
      "s2_t59": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En un FULL OUTER JOIN, cualquiera de los dos extremos puede ser NULL. COALESCE unifica los dos atributos en una sola columna consolidada no nula."
      },
      "s2_t60": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Usar 'v1.id < v2.id' en un producto cartesiano es la técnica estándar para generar combinaciones matemáticas de 2 elementos ($C(n, 2)$) sin autoreferencias ni permutaciones duplicadas."
      },
      "s2_t61": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "SQLite 3.39.0 implementó soporte nativo completo para las cláusulas RIGHT JOIN y FULL OUTER JOIN según el estándar SQL."
      },
      "s2_t62": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Como las filas huérfanas de A tienen NULL en B.monto y las de B tienen NULL en A.pais, exigir que ambas columnas cumplan valores específicos descarta todos los nulos, eliminando el propósito del FULL OUTER JOIN."
      },
      "s2_t63": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "FULL OUTER JOIN combina los atributos de ambas tablas alineando tuplas según una clave común; UNION ALL simplemente concatena las filas de ambas consultas una tras otra sin cruzar datos."
      },
      "s2_t64": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El producto cartesiano múltiple multiplica sucesivamente las cardinalidades de cada conjunto participante: $10 \\times 5 \\times 4 = 200$ tuplas resultantes."
      },
      "s2_t65": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La conciliación de estados contables requiere detectar de inmediato discrepancias en ambos sentidos de la relación, lo que se obtiene de forma natural con un FULL OUTER JOIN."
      },
      "s2_t66": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Hacer un CROSS JOIN contra una relación de 1 sola fila ($10,000 \\times 1 = 10,000$) es una técnica muy útil para adjuntar un valor constante o agregado global a cada registro individual sin necesidad de funciones ventana."
      },
      "s2_t67": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Si no existen registros en ninguna de las dos relaciones, no hay tuplas que preservar ni emparejar, produciendo un cursor de 0 filas."
      },
      "s2_t68": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Al no haber ninguna coincidencia posible, ninguna fila se empareja. El FULL OUTER JOIN preserva todas las filas de A rellenando B con NULL y todas las de B rellenando A con NULL, dando una cardinalidad total de $|A| + |B|$."
      },
      "s2_t69": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Inspeccionar mediante CASE la presencia de claves no nulas en uno u otro lado permite etiquetar con precisión quirúrgica el estado de emparejamiento de cada tupla resultante."
      },
      "s2_t70": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "A diferencia de un INNER JOIN donde las tuplas no coincidentes se descartan de inmediato, el FULL JOIN requiere mantener tablas de bits o estructuras de rastreo para identificar qué filas de ambos lados quedaron huérfanas."
      },
      "s2_t71": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La explicitud es una de las mayores ventajas de la sintaxis ANSI: 'CROSS JOIN' indica sin lugar a dudas que el producto cartesiano fue diseñado a propósito y no por error de omisión."
      },
      "s2_t72": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Para las claves que coinciden, el FULL OUTER JOIN se comporta exactamente igual que un INNER JOIN, multiplicando las ocurrencias ($2 \\times 3 = 6$ filas emparejadas)."
      },
      "s2_t73": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Un CROSS JOIN contra una tabla de factores de conversión multiplica cada registro por cada factor, permitiendo generar proyecciones multidivisa de forma puramente declarativa."
      },
      "s2_t74": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Si la tabla derecha no contiene registros huérfanos, el FULL JOIN no tiene tuplas adicionales que preservar por el extremo derecho, coincidiendo al 100% con el LEFT JOIN."
      },
      "s2_t75": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El predicado de igualdad en el ON sigue las reglas universales de SQL: NULL no coincide con NULL. Cada fila con clave nula aparece como registro no emparejado de su respectivo lado."
      },
      "s2_t76": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "COALESCE es la función estándar universal para manejo de contingencias nulas: examina los parámetros en orden y entrega el primer valor definido (no nulo) que encuentre."
      },
      "s2_t77": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En SQL, la operación x / 0 arroja un error fatal de ejecución. Al usar NULLIF(divisor, 0), si el divisor es 0 se transforma en NULL, y x / NULL retorna NULL de manera segura."
      },
      "s2_t78": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "NULLIF(x, y) devuelve NULL si x e y son iguales. Si son distintos, devuelve el valor del primer argumento x."
      },
      "s2_t79": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "El estándar SQL define COALESCE formalmente como una abreviatura sintáctica de una expresión CASE que evalúa IS NOT NULL sobre cada operando en orden."
      },
      "s2_t80": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Una incógnita más 100 sigue siendo una incógnita. Por ello, la aritmética en SQL propaga el valor NULL a menos que se utilice COALESCE(saldo_cuenta, 0) + 100."
      },
      "s2_t81": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "IFNULL(a, b) es una función histórica de dos parámetros propia de SQLite y MySQL. COALESCE es la forma estándar universal y portátil que admite $N$ parámetros."
      },
      "s2_t82": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Todas las funciones de agregación (excepto COUNT(*)) ignoran los valores NULL. El promedio suma los valores existentes (60) y divide únicamente entre la cantidad de tuplas no nulas (3), dando 20.0."
      },
      "s2_t83": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En el estándar SQL, la suma de un conjunto donde no existe ningún valor numérico válido produce NULL, no 0. Para asegurar que retorne 0 se debe envolver como 'COALESCE(SUM(col), 0)'."
      },
      "s2_t84": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Las cadenas vacías '' son un dolor de cabeza en analítica porque no son detectadas por IS NULL. NULLIF(col, '') convierte '' en NULL de forma elegante."
      },
      "s2_t85": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Al ordenar de mayor a menor (DESC), asignar temporalmente un número extremadamente negativo a los valores nulos con COALESCE garantiza que queden relegados al final de la lista."
      },
      "s2_t86": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "La regla fundamental del modelo relacional: dos valores desconocidos no son iguales entre sí. NULL = NULL produce UNKNOWN, descartando la tupla del enlace."
      },
      "s2_t87": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "'A IS NOT DISTINCT FROM B' es una comparación nulo-segura (null-safe): retorna TRUE si ambos tienen el mismo valor O si ambos son NULL."
      },
      "s2_t88": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "NOT NULL es una restricción de integridad que prohíbe el valor nulo arrojando un error si se intenta persistir; DEFAULT es un valor de contingencia que se autocompleta cuando no se especifica el dato."
      },
      "s2_t89": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "Es el patrón clásico de saneamiento de presentación en interfaces: reemplazar datos faltantes por textos amigables y legibles para el usuario."
      },
      "s2_t90": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "NULLIF(fecha, '1900-01-01') evalúa si la fecha es igual al valor centinela. De ser así, entrega NULL, normalizando el dato."
      },
      "s2_t91": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "'10 IN (5, 20, NULL)' se expande a '10 = 5 OR 10 = 20 OR 10 = NULL', lo que se simplifica a 'FALSE OR FALSE OR UNKNOWN' = UNKNOWN."
      },
      "s2_t92": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "COALESCE resuelve de forma limpia y legible el anidamiento engorroso de funciones de dos parámetros como IFNULL o NVL."
      },
      "s2_t93": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Al usar COALESCE(c.apellido, ''), si el apellido es nulo se sustituye por una cadena vacía '', impidiendo que la propiedad de propagación de nulos del operador '||' anule el nombre."
      },
      "s2_t94": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Un LEFT JOIN desde la tabla hija (ventas) hacia la tabla padre (clientes) filtrando con 'WHERE c.id IS NULL' detecta instantáneamente huérfanos por violación de integridad referencial."
      },
      "s2_t95": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "En la tabla de verdad de SQL: TRUE AND UNKNOWN = UNKNOWN (depende del valor desconocido). FALSE OR UNKNOWN = UNKNOWN (sigue dependiendo del valor desconocido)."
      },
      "s2_t96": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "En lógica trivaluada: si un término es FALSE en un AND, la conjunción siempre es FALSE. Si un término es TRUE en un OR, la disyunción siempre es TRUE. El valor desconocido no puede alterar el veredicto."
      },
      "s2_t97": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "En SQL estándar, todos los argumentos de COALESCE deben pertenecer a tipos de datos compatibles. Para mezclar texto y números se debe aplicar CAST(precio AS TEXT)."
      },
      "s2_t98": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Tratar los valores nulos con COALESCE en el WHERE evita los efectos colaterales de la lógica trivaluada, forzando un valor numérico por defecto para la comparación."
      },
      "s2_t99": {
        "correcta": "A",
        "puntos": 5,
        "explicacion": "Omitir el ELSE en una expresión CASE produce NULL por defecto cuando ningún WHEN se cumple. Proveer un ELSE garantiza un valor de escape predeterminado."
      },
      "s2_t100": {
        "correcta": "B",
        "puntos": 5,
        "explicacion": "El abuso de valores NULL genera complejidad en el código y riesgos en la lógica de consultas (como en NOT IN). El estándar de la industria exige declarar NOT NULL con DEFAULT salvo en campos verdaderamente opcionales."
      }
    },
    "practica": {
      "s2_p1": {
        "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, vt.fecha_venta, ROUND(vt.cantidad * vt.precio_unitario, 2) AS total_linea FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 5;",
        "puntos": 15
      },
      "s2_p2": {
        "queryEsperada": "SELECT c.id, c.nombre, c.apellido, c.email, c.saldo_cuenta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.id IS NULL ORDER BY c.id ASC;",
        "puntos": 15
      },
      "s2_p3": {
        "queryEsperada": "SELECT v.titulo, v.consola, v.precio, COALESCE(vt.id, 'Sin Ventas') AS codigo_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.id IS NULL ORDER BY v.precio DESC;",
        "puntos": 15
      },
      "s2_p4": {
        "queryEsperada": "SELECT COALESCE(c.nombre, 'Sin Cliente Registrado') AS titular_cliente, vt.id AS venta_id, COALESCE(vt.metodo_pago, 'Sin Transacción') AS pasarela_pago FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.id IS NULL OR vt.id IS NULL;",
        "puntos": 15
      },
      "s2_p5": {
        "queryEsperada": "SELECT c.nombre, c.pais, vt.fecha_venta, vt.metodo_pago, ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.pais IN ('México', 'España') AND vt.metodo_pago = 'Tarjeta' ORDER BY importe DESC LIMIT 6;",
        "puntos": 15
      },
      "s2_p6": {
        "queryEsperada": "SELECT v.titulo, v.genero, v.precio, COALESCE(vt.cantidad, 0) AS unidades_vendidas FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE vt.id IS NULL ORDER BY v.precio DESC;",
        "puntos": 15
      },
      "s2_p7": {
        "queryEsperada": "SELECT c.nombre, c.apellido, c.email, v.titulo, v.consola FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.consola = 'PlayStation 5' ORDER BY c.nombre ASC LIMIT 5;",
        "puntos": 15
      },
      "s2_p8": {
        "queryEsperada": "SELECT DISTINCT c.id, c.nombre, c.apellido, c.saldo_cuenta FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.saldo_cuenta > 50.0 ORDER BY c.saldo_cuenta DESC;",
        "puntos": 15
      },
      "s2_p9": {
        "queryEsperada": "SELECT v.id AS juego_id, v.titulo, v.stock, vt.id AS venta_id, COALESCE(vt.metodo_pago, 'Nunca Vendido') AS estado_transaccion FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE v.stock = 0 ORDER BY v.id ASC;",
        "puntos": 15
      },
      "s2_p10": {
        "queryEsperada": "SELECT c.nombre, v.titulo, vt.fecha_venta, vt.metodo_pago FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.metodo_pago IN ('PayPal', 'Cripto') ORDER BY vt.fecha_venta DESC LIMIT 6;",
        "puntos": 15
      },
      "s2_p11": {
        "queryEsperada": "SELECT c.id AS cliente_num, c.nombre, c.apellido, c.pais, IFNULL(vt.id, 0) AS numero_venta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.activo = 1 AND vt.id IS NULL ORDER BY c.id ASC;",
        "puntos": 15
      },
      "s2_p12": {
        "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, vt.precio_unitario, v.precio AS precio_catalogo FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.precio_unitario >= 50.0 ORDER BY vt.precio_unitario DESC LIMIT 5;",
        "puntos": 15
      },
      "s2_p13": {
        "queryEsperada": "SELECT v.titulo, v.desarrollador, v.calificacion, vt.id AS folio_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.calificacion >= 9.0 AND vt.id IS NULL ORDER BY v.calificacion DESC;",
        "puntos": 15
      },
      "s2_p14": {
        "queryEsperada": "SELECT c.nombre, c.apellido, vt.id AS venta_codigo, vt.fecha_venta, vt.cantidad FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.cantidad >= 2 ORDER BY vt.fecha_venta DESC;",
        "puntos": 15
      },
      "s2_p15": {
        "queryEsperada": "SELECT c.nombre, c.email, COALESCE(v.titulo, 'Sin Videojuego Asociado') AS titulo_comprado FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id LEFT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE c.pais = 'Colombia' ORDER BY c.nombre ASC;",
        "puntos": 15
      },
      "s2_p16": {
        "queryEsperada": "SELECT c.id, c.nombre, v.id AS juego_id, v.titulo FROM clientes AS c CROSS JOIN videojuegos AS v WHERE c.id = 1 AND v.consola = 'Nintendo Switch' ORDER BY v.precio DESC LIMIT 4;",
        "puntos": 15
      },
      "s2_p17": {
        "queryEsperada": "SELECT c.nombre, c.apellido, vt.id AS venta_id, vt.metodo_pago, NULLIF(vt.metodo_pago, 'Tarjeta') AS metodo_alternativo FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id ORDER BY vt.id ASC LIMIT 7;",
        "puntos": 15
      },
      "s2_p18": {
        "queryEsperada": "SELECT v.titulo, v.consola, vt.id AS id_venta, vt.fecha_venta FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id AND vt.fecha_venta >= '2023-06-01' WHERE v.consola = 'PC' ORDER BY v.titulo ASC LIMIT 6;",
        "puntos": 15
      },
      "s2_p19": {
        "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe_total FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.genero LIKE '%RPG%' ORDER BY importe_total DESC LIMIT 5;",
        "puntos": 15
      },
      "s2_p20": {
        "queryEsperada": "SELECT c.id AS id_c, c.nombre, vt.id AS id_v, vt.cliente_id AS cliente_fk FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.id IS NULL ORDER BY vt.id ASC;",
        "puntos": 15
      },
      "s2_p21": {
        "queryEsperada": "SELECT v.titulo, v.precio, c.nombre, c.pais FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id INNER JOIN clientes AS c ON vt.cliente_id = c.id WHERE c.pais = 'Argentina' ORDER BY v.precio DESC;",
        "puntos": 15
      },
      "s2_p22": {
        "queryEsperada": "SELECT c.nombre, c.apellido, c.saldo_cuenta, COALESCE(vt.metodo_pago, 'Sin Compras') AS pasarela FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.saldo_cuenta = 0.0 ORDER BY c.nombre ASC;",
        "puntos": 15
      },
      "s2_p23": {
        "queryEsperada": "SELECT DISTINCT v.titulo, v.consola, v.precio FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE vt.fecha_venta BETWEEN '2023-01-01' AND '2023-06-30' ORDER BY v.precio DESC;",
        "puntos": 15
      },
      "s2_p24": {
        "queryEsperada": "SELECT c.nombre, v.titulo, vt.fecha_venta, CASE WHEN vt.metodo_pago = 'Tarjeta' THEN 'Tradicional' ELSE 'Digital' END AS categoria_pago FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 8;",
        "puntos": 15
      },
      "s2_p25": {
        "queryEsperada": "SELECT v.id AS juego_id, v.titulo, v.consola, v.precio, COALESCE(vt.id, 'No Registrado') AS referencia_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.desarrollador = 'Nintendo' ORDER BY v.precio DESC;",
        "puntos": 15
      }
    }
  }
};
