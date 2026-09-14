/**
 * SQLCraft Studio - Certification Exam Banks & Sampling Engine
 * Bancos maestros de certificación por sección (100 teóricas + 25 prácticas por sección)
 * Motor de muestreo estratificado balanceado con persistencia de intento activo
 */

const BANCO_EXAMEN_SECCION_1 = {
  id: "banco-seccion-1",
  seccionId: 1,
  titulo: "Examen de Certificación - Sección 1: Consultas SELECT, Alias (AS) y Filtrado",
  descripcion: "Evaluación rigurosa de <strong>8 preguntas conceptuales (40 pts)</strong> y <strong>4 retos prácticos (60 pts)</strong> seleccionados aleatoriamente de un banco de <strong>125 reactivos</strong>. Aprobación: <strong>70%</strong>.",
  categorias: ["proyeccion", "filtrado", "rangos_conjuntos", "orden_paginacion"],
  bancoTeorico: [
  {
    "id": "s1_t1",
    "categoria": "proyeccion",
    "titulo": "Propósito Relacional de la Cláusula SELECT",
    "pregunta": "¿Qué operación del álgebra relacional ejecuta fundamentalmente la lista de columnas especificada tras la palabra clave 'SELECT' en una consulta sin agregaciones?",
    "opciones": [
      {
        "id": "A",
        "texto": "Selección o restricción horizontal (filtrado de tuplas)."
      },
      {
        "id": "B",
        "texto": "Proyección vertical (aislamiento y transformación de atributos)."
      },
      {
        "id": "C",
        "texto": "Unión disjunta de conjuntos relacionales."
      },
      {
        "id": "D",
        "texto": "Producto cartesiano implícito entre dominios de datos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el álgebra relacional formal, la cláusula SELECT de SQL corresponde a la operación de 'Proyección' (denotada por la letra griega pi, π), la cual extrae columnas específicas (atributos) de una relación descartando el resto."
  },
  {
    "id": "s1_t2",
    "categoria": "proyeccion",
    "titulo": "Impacto de Rendimiento de SELECT * en Producción",
    "pregunta": "¿Por qué la directriz de ingeniería de software desaconseja categóricamente el uso de 'SELECT *' en aplicaciones de producción?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque invalida el analizador léxico del motor y genera fallos de compilación recurrentes."
      },
      {
        "id": "B",
        "texto": "Porque transfiere bytes innecesarios por la red, inhabilita el uso de índices de cobertura (covering indexes) y hace frágil el mapeo si el esquema cambia."
      },
      {
        "id": "C",
        "texto": "Porque convierte automáticamente todas las columnas numéricas a cadenas de texto en el búfer."
      },
      {
        "id": "D",
        "texto": "Porque fuerza un bloqueo exclusivo de tabla (exclusive table lock) durante toda la transacción."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "SELECT * incrementa el tráfico de red y consumo de E/S de disco, impide optimizaciones donde el índice contiene todas las columnas solicitadas (covering index) y rompe contratos de código si se añaden o reordenan columnas en la base de datos."
  },
  {
    "id": "s1_t3",
    "categoria": "proyeccion",
    "titulo": "Mecánica del Alias de Columna con la Cláusula AS",
    "pregunta": "¿Cuándo entra en efecto el alias asignado a una columna mediante la sintaxis 'columna AS nuevo_nombre'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente en el conjunto de resultados final proyectado para el cliente y en cláusulas de presentación posterior como ORDER BY."
      },
      {
        "id": "B",
        "texto": "Inmediatamente en la cláusula WHERE de la misma consulta para filtrar por él."
      },
      {
        "id": "C",
        "texto": "Modifica de forma permanente el nombre de la columna en el catálogo de metadatos de la tabla."
      },
      {
        "id": "D",
        "texto": "En la cláusula FROM para permitir renombrar tablas al vuelo."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Debido al orden de ejecución lógica de SQL (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY), el alias de columna se crea en la fase SELECT y por tanto no existe durante la evaluación previa de WHERE, pero sí está disponible en ORDER BY."
  },
  {
    "id": "s1_t4",
    "categoria": "proyeccion",
    "titulo": "Uso de Identificadores con Espacios o Caracteres Especiales",
    "pregunta": "¿Cuál es la sintaxis estándar ANSI SQL para declarar un alias que contenga espacios en blanco o caracteres especiales (ej. 'Saldo Disponible')?",
    "opciones": [
      {
        "id": "A",
        "texto": "Encerrar el identificador entre comillas simples: AS 'Saldo Disponible'."
      },
      {
        "id": "B",
        "texto": "Encerrar el identificador entre comillas dobles: AS \"Saldo Disponible\"."
      },
      {
        "id": "C",
        "texto": "Prefijar el alias con una barra inclinada: AS /Saldo Disponible/."
      },
      {
        "id": "D",
        "texto": "SQL no permite bajo ninguna circunstancia espacios en nombres de columnas proyectadas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el estándar ANSI SQL, los literales de cadena usan comillas simples ('texto'), mientras que los identificadores de esquema con caracteres especiales o espacios deben delimitarse con comillas dobles (\"Mi Columna\"). SQLite también admite corchetes [ ] y comillas invertidas ` ` por compatibilidad."
  },
  {
    "id": "s1_t5",
    "categoria": "proyeccion",
    "titulo": "Evaluación de Expresiones Aritméticas en SELECT",
    "pregunta": "Si ejecutas 'SELECT precio, precio * 0.15 AS descuento, precio * 1.16 AS total_con_iva FROM videojuegos;', ¿qué afirmación es correcta?",
    "opciones": [
      {
        "id": "A",
        "texto": "Falla porque no se pueden calcular dos columnas derivadas en la misma consulta."
      },
      {
        "id": "B",
        "texto": "Las columnas derivadas se calculan dinámicamente fila a fila en memoria sin alterar los datos persistidos en disco."
      },
      {
        "id": "C",
        "texto": "Se crea automáticamente una vista materializada temporal en la base de datos."
      },
      {
        "id": "D",
        "texto": "La tabla 'videojuegos' actualiza su valor 'precio' en disco con el resultado del IVA."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Las expresiones aritméticas en la cláusula SELECT son cálculos puramente escalares y efímeros: el motor los evalúa en memoria para cada tupla procesada sin mutar las tablas subyacentes."
  },
  {
    "id": "s1_t6",
    "categoria": "proyeccion",
    "titulo": "Concatenación de Cadenas en SQLite y Estándar ANSI",
    "pregunta": "¿Cuál es el operador estándar ANSI y nativo en SQLite para concatenar columnas de texto como nombre y apellido?",
    "opciones": [
      {
        "id": "A",
        "texto": "El signo de suma (+): nombre + ' ' + apellido"
      },
      {
        "id": "B",
        "texto": "El operador de doble barra vertical (||): nombre || ' ' || apellido"
      },
      {
        "id": "C",
        "texto": "La función CONCAT_WS() obligatoria sin operadores."
      },
      {
        "id": "D",
        "texto": "El signo 'ampersand' (&): nombre & ' ' & apellido"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador estándar SQL y soportado por SQLite, PostgreSQL y Oracle para concatenar cadenas es la doble pleca '||'. En SQL Server se usa tradicionalmente '+', pero '||' es el estándar relacional."
  },
  {
    "id": "s1_t7",
    "categoria": "proyeccion",
    "titulo": "Comportamiento de Concatenación con Valores NULL",
    "pregunta": "¿Qué valor produce la expresión 'nombre || NULL' en SQLite bajo el estándar SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Retorna la cadena 'nombre' omitiendo el NULL."
      },
      {
        "id": "B",
        "texto": "Retorna la cadena literal 'nombreNULL'."
      },
      {
        "id": "C",
        "texto": "Retorna NULL, ya que cualquier operación escalar con un operando NULL propaga NULL."
      },
      {
        "id": "D",
        "texto": "Arroja un error en tiempo de ejecución por tipo incompatible."
      }
    ],
    "correcta": "C",
    "puntos": 5,
    "explicacion": "En SQL, NULL representa una incógnita o ausencia de valor. Salvo en funciones especializadas como COALESCE o CONCAT en MySQL, concatenar cualquier valor con NULL produce NULL (propiedad de propagación de nulos)."
  },
  {
    "id": "s1_t8",
    "categoria": "proyeccion",
    "titulo": "Propósito de la Función Escalar ROUND",
    "pregunta": "¿Qué resultado exacto entrega la consulta 'SELECT ROUND(45.6789, 2);'?",
    "opciones": [
      {
        "id": "A",
        "texto": "45.67 (trunca sin redondear)."
      },
      {
        "id": "B",
        "texto": "45.68 (redondea al decimal más próximo con 2 cifras)."
      },
      {
        "id": "C",
        "texto": "46.00."
      },
      {
        "id": "D",
        "texto": "45.6800."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "ROUND(x, n) redondea el número de coma flotante x a n posiciones decimales después del punto, evaluando el siguiente dígito para aproximar hacia arriba o hacia abajo."
  },
  {
    "id": "s1_t9",
    "categoria": "proyeccion",
    "titulo": "Literales Constantes en la Lista de Proyección",
    "pregunta": "¿Qué ocurre si ejecutas 'SELECT 'Activo' AS estado_fijo, id, nombre FROM clientes;'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Falla porque 'Activo' no es una columna de la tabla 'clientes'."
      },
      {
        "id": "B",
        "texto": "Retorna la cadena constante 'Activo' en cada una de las filas recuperadas de la tabla."
      },
      {
        "id": "C",
        "texto": "Filtra la tabla dejando solo las filas cuyo estado sea activo."
      },
      {
        "id": "D",
        "texto": "Crea una nueva columna persistente en la tabla clientes llamada 'estado_fijo'."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Cualquier literal (número, texto o fecha) incluido en la lista de SELECT se proyecta como una columna con ese valor constante idéntico para cada fila devuelta por la consulta."
  },
  {
    "id": "s1_t10",
    "categoria": "proyeccion",
    "titulo": "Alias de Tabla en la Cláusula FROM",
    "pregunta": "En la consulta 'SELECT v.titulo, v.precio FROM videojuegos AS v;', ¿qué rol cumple 'AS v'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Copia la tabla en una tabla temporal llamada 'v'."
      },
      {
        "id": "B",
        "texto": "Asigna un calificador corto que permite referenciar las columnas de forma unívoca y compacta."
      },
      {
        "id": "C",
        "texto": "Ordena la tabla alfabéticamente por la letra v."
      },
      {
        "id": "D",
        "texto": "Restringe la consulta a vistas (views)."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El alias de tabla (table correlation name) provee un calificador abreviado para desambiguar columnas y mejorar la legibilidad y mantenimiento del código relacional."
  },
  {
    "id": "s1_t11",
    "categoria": "proyeccion",
    "titulo": "Opcionalidad de la Palabra Clave AS",
    "pregunta": "¿Es válida en SQL la sintaxis 'SELECT nombre nom, precio p FROM videojuegos v;' omitiendo la palabra clave 'AS'?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, omitir 'AS' siempre produce un error sintáctico estricto en cualquier motor SQL."
      },
      {
        "id": "B",
        "texto": "Sí, es sintácticamente válida tanto para alias de columnas como de tablas, aunque el uso explícito de 'AS' se considera una buena práctica de legibilidad."
      },
      {
        "id": "C",
        "texto": "Es válida para tablas pero estrictamente prohibida para columnas."
      },
      {
        "id": "D",
        "texto": "Solo es válida si se usan identificadores numéricos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La palabra clave AS es opcional en SQL estándar para renombrar columnas y tablas (separando simplemente por espacio en blanco). No obstante, emplear 'AS' explícitamente evita ambigüedades accidentales causadas por comas faltantes."
  },
  {
    "id": "s1_t12",
    "categoria": "proyeccion",
    "titulo": "Uso de Funciones de Texto Escalares: UPPER y LOWER",
    "pregunta": "¿Cuál es el propósito técnico de usar 'UPPER(nombre)' en una lista de selección?",
    "opciones": [
      {
        "id": "A",
        "texto": "Modificar el almacenamiento del campo en la base de datos a mayúsculas sostenidas."
      },
      {
        "id": "B",
        "texto": "Transformar la representación textual a mayúsculas durante la visualización del resultado sin alterar el almacenamiento original."
      },
      {
        "id": "C",
        "texto": "Asegurar que la columna admita únicamente caracteres alfabéticos."
      },
      {
        "id": "D",
        "texto": "Ordenar las filas de forma ascendente automáticamente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "UPPER() y LOWER() son funciones escalares de transformación de presentación; transforman los caracteres a mayúsculas o minúsculas únicamente para el conjunto de resultados proyectado."
  },
  {
    "id": "s1_t13",
    "categoria": "proyeccion",
    "titulo": "Cálculo de Longitud de Cadena con LENGTH",
    "pregunta": "Si un registro contiene 'SQL' en el campo 'titulo', ¿qué entregará 'SELECT LENGTH(titulo) FROM videojuegos;'?",
    "opciones": [
      {
        "id": "A",
        "texto": "El número de bits ocupados en memoria (24)."
      },
      {
        "id": "B",
        "texto": "El número entero 3 (cantidad de caracteres de la cadena)."
      },
      {
        "id": "C",
        "texto": "La posición de la primera letra en el abecedario."
      },
      {
        "id": "D",
        "texto": "Un valor booleano indicando si no está vacía."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "LENGTH(str) retorna la cantidad de caracteres de una cadena de texto (o número de bytes para objetos BLOB)."
  },
  {
    "id": "s1_t14",
    "categoria": "proyeccion",
    "titulo": "Operación Módulo en SQL",
    "pregunta": "¿Qué resultado devuelve la expresión 'SELECT 17 % 5;' en SQLite?",
    "opciones": [
      {
        "id": "A",
        "texto": "3.4 (la división exacta en punto flotante)."
      },
      {
        "id": "B",
        "texto": "2 (el resto o residuo entero de la división 17 entre 5)."
      },
      {
        "id": "C",
        "texto": "3 (el cociente entero)."
      },
      {
        "id": "D",
        "texto": "0.85 (el porcentaje)."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador '%' (módulo) calcula el resto de la división euclidiana entre dos enteros. 17 = 5 * 3 + 2, por lo que el resultado es 2."
  },
  {
    "id": "s1_t15",
    "categoria": "proyeccion",
    "titulo": "Sensibilidad a Mayúsculas en Palabras Clave e Identificadores",
    "pregunta": "¿Cómo interpreta SQLite una consulta escrita como 'select TITULO, Precio from VideoJuegos;'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Falla con error de sintaxis porque SQL requiere mayúsculas estrictas en todas sus sentencias."
      },
      {
        "id": "B",
        "texto": "La ejecuta exitosamente, pues las palabras clave de SQL y los identificadores en SQLite son insensibles a mayúsculas/minúsculas de forma predeterminada."
      },
      {
        "id": "C",
        "texto": "Falla porque el nombre de la tabla debe coincidir exactamente en código ASCII binario."
      },
      {
        "id": "D",
        "texto": "Solo ejecuta las columnas escritas en minúsculas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El lenguaje SQL estándar y el motor SQLite son case-insensitive para palabras clave (SELECT, from) e identificadores de tablas y columnas ASCII sin comillas."
  },
  {
    "id": "s1_t16",
    "categoria": "proyeccion",
    "titulo": "División de Enteros vs Punto Flotante en SQL",
    "pregunta": "¿Qué valor retorna la consulta 'SELECT 5 / 2;' en un motor con tipado aritmético estricto de enteros como SQLite?",
    "opciones": [
      {
        "id": "A",
        "texto": "2.5 en cualquier circunstancia."
      },
      {
        "id": "B",
        "texto": "2 (división entera con truncamiento hacia cero al operar dos operandos enteros)."
      },
      {
        "id": "C",
        "texto": "3 (redondeo hacia arriba)."
      },
      {
        "id": "D",
        "texto": "NULL por pérdida de precisión."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Cuando ambos operandos son de tipo INTEGER, el operador '/' ejecuta división entera truncada (5 / 2 = 2). Para obtener 2.5, al menos uno de los operandos debe ser de tipo flotante o casteado (ej. 5.0 / 2 o CAST(5 AS REAL) / 2)."
  },
  {
    "id": "s1_t17",
    "categoria": "proyeccion",
    "titulo": "Proyección de Columnas Duplicadas en el SELECT",
    "pregunta": "¿Es sintácticamente admisible ejecutar 'SELECT precio, precio AS precio_copia, precio FROM videojuegos;'?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, el motor prohíbe proyectar la misma columna base más de una vez en la misma lista."
      },
      {
        "id": "B",
        "texto": "Sí, el motor relacional proyectará tres columnas con los mismos valores en cada fila sin ningún inconveniente."
      },
      {
        "id": "C",
        "texto": "Solo si la tabla tiene menos de 100 filas."
      },
      {
        "id": "D",
        "texto": "Provoca que el motor sume los tres valores automáticamente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Una consulta puede proyectar la misma columna física tantas veces como sea necesario, ya sea con su nombre original o con alias calculados."
  },
  {
    "id": "s1_t18",
    "categoria": "proyeccion",
    "titulo": "Uso de Comentarios en Consultas SQL",
    "pregunta": "¿Cuáles son las dos formas estándar y válidas de incluir comentarios explicativos en sentencias SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "// para una línea y /* */ para múltiples líneas."
      },
      {
        "id": "B",
        "texto": "-- para una línea y /* */ para bloques de múltiples líneas."
      },
      {
        "id": "C",
        "texto": "# para una línea y <!-- --> para bloques."
      },
      {
        "id": "D",
        "texto": "REM para una línea y ; para bloques."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El estándar SQL especifica '--' para comentarios de línea única que se extienden hasta el salto de línea y '/* ... */' para comentarios de bloque multilinea."
  },
  {
    "id": "s1_t19",
    "categoria": "proyeccion",
    "titulo": "Diferencia Conceptual entre NULL y Cadena Vacía ('')",
    "pregunta": "¿Qué diferencia técnica crítica existe entre un campo con valor NULL y un campo con valor '' (cadena vacía)?",
    "opciones": [
      {
        "id": "A",
        "texto": "Son exactamente equivalentes en memoria en todos los motores de base de datos relacionales."
      },
      {
        "id": "B",
        "texto": "NULL representa ausencia total de valor o valor desconocido (sin memoria alocada de contenido), mientras que '' es una cadena válida de longitud cero."
      },
      {
        "id": "C",
        "texto": "NULL ocupa más espacio de disco que una cadena de 100 caracteres."
      },
      {
        "id": "D",
        "texto": "La cadena vacía '' solo se permite en claves primarias."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el estándar relacional, NULL no es un valor ni una cadena: es un marcador de estado que indica ausencia de información o dato desconocido. Por el contrario, '' es una entidad de texto definida con longitud 0."
  },
  {
    "id": "s1_t20",
    "categoria": "proyeccion",
    "titulo": "Propósito de la Función COALESCE en Proyección",
    "pregunta": "¿Qué entrega la expresión 'COALESCE(columna1, columna2, 'Sin Dato')' en la lista de selección?",
    "opciones": [
      {
        "id": "A",
        "texto": "Concatena los tres valores en una sola cadena."
      },
      {
        "id": "B",
        "texto": "Retorna el primer valor no nulo de la lista evaluada de izquierda a derecha."
      },
      {
        "id": "C",
        "texto": "Retorna verdadero si los tres argumentos son nulos."
      },
      {
        "id": "D",
        "texto": "Calcula el promedio aritmético de las columnas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "COALESCE(val1, val2, ...) evalúa secuencialmente sus argumentos de izquierda a derecha y devuelve el primer valor que no sea NULL. Si todos son NULL, devuelve NULL."
  },
  {
    "id": "s1_t21",
    "categoria": "proyeccion",
    "titulo": "Orden de Ejecución Lógica del Motor SQL",
    "pregunta": "¿En qué orden lógico procesa el motor una consulta compuesta por 'FROM ... WHERE ... SELECT ... ORDER BY ... LIMIT ...'?",
    "opciones": [
      {
        "id": "A",
        "texto": "SELECT -> FROM -> WHERE -> ORDER BY -> LIMIT"
      },
      {
        "id": "B",
        "texto": "FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT"
      },
      {
        "id": "C",
        "texto": "LIMIT -> FROM -> WHERE -> SELECT -> ORDER BY"
      },
      {
        "id": "D",
        "texto": "FROM -> SELECT -> WHERE -> LIMIT -> ORDER BY"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El orden de procesamiento conceptual es: primero se identifica la fuente de datos (FROM), luego se filtran las filas (WHERE), luego se proyectan y transforman las columnas (SELECT), luego se ordenan las tuplas (ORDER BY) y finalmente se pagina el corte final (LIMIT)."
  },
  {
    "id": "s1_t22",
    "categoria": "proyeccion",
    "titulo": "Uso de Alias de Columna en Cláusula WHERE",
    "pregunta": "¿Por qué la consulta 'SELECT precio * 2 AS doble FROM videojuegos WHERE doble > 50;' produce un error en motores SQL estándar?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque no se pueden multiplicar columnas por números pares."
      },
      {
        "id": "B",
        "texto": "Porque la cláusula WHERE se evalúa ANTES que la cláusula SELECT, por lo que el alias 'doble' aún no existe al evaluar el filtro."
      },
      {
        "id": "C",
        "texto": "Porque los alias solo pueden contener letras mayúsculas."
      },
      {
        "id": "D",
        "texto": "Porque el operador mayor que (>) solo admite columnas con clave primaria."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La cláusula WHERE se ejecuta en la fase de filtrado de filas, mucho antes de que la cláusula SELECT proyecte y asigne nombres de alias a las columnas calculadas."
  },
  {
    "id": "s1_t23",
    "categoria": "proyeccion",
    "titulo": "Conversión de Tipos con CAST",
    "pregunta": "¿Cuál es la sintaxis estándar para transformar explícitamente el tipo de dato de una columna o expresión en una consulta SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "CONVERT(columna TO tipo)"
      },
      {
        "id": "B",
        "texto": "CAST(columna AS tipo)"
      },
      {
        "id": "C",
        "texto": "PARSE(columna, tipo)"
      },
      {
        "id": "D",
        "texto": "TYPEOF(columna) = tipo"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "CAST(expresión AS tipo_destino) es la sintaxis estándar ANSI SQL implementada en la gran mayoría de motores para conversión de tipos explícita."
  },
  {
    "id": "s1_t24",
    "categoria": "proyeccion",
    "titulo": "Consulta de Expresiones Puras sin Tabla",
    "pregunta": "¿Qué ocurre si ejecutas 'SELECT 10 + 25;' en SQLite o PostgreSQL (sin cláusula FROM)?",
    "opciones": [
      {
        "id": "A",
        "texto": "Falla de forma mandataria; toda consulta SQL exige una tabla física en la cláusula FROM."
      },
      {
        "id": "B",
        "texto": "Retorna una única fila con una única columna conteniendo el número 35."
      },
      {
        "id": "C",
        "texto": "Crea una tabla en memoria llamada '35'."
      },
      {
        "id": "D",
        "texto": "Requiere la tabla 'DUAL' en SQLite de forma obligatoria."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Tanto SQLite como PostgreSQL admiten evaluar expresiones escalares puras en la cláusula SELECT sin especificar FROM. En sistemas como Oracle clásico se utilizaba tradicionalmente la tabla dummy DUAL."
  },
  {
    "id": "s1_t25",
    "categoria": "proyeccion",
    "titulo": "Extracción del Tipo de Almacenamiento con TYPEOF",
    "pregunta": "¿Qué función de introspección ofrece SQLite en el SELECT para conocer la clase de almacenamiento real de un dato?",
    "opciones": [
      {
        "id": "A",
        "texto": "DATATYPE(columna)"
      },
      {
        "id": "B",
        "texto": "TYPEOF(columna)"
      },
      {
        "id": "C",
        "texto": "STORAGE(columna)"
      },
      {
        "id": "D",
        "texto": "GET_TYPE(columna)"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La función TYPEOF(X) en SQLite retorna una cadena de texto indicando la clase de almacenamiento de la expresión X: 'null', 'integer', 'real', 'text' o 'blob'."
  },
  {
    "id": "s1_t26",
    "categoria": "filtrado",
    "titulo": "Semántica Operacional de la Cláusula WHERE",
    "pregunta": "¿Cómo procesa internamente el motor SQL la condición especificada en una cláusula WHERE?",
    "opciones": [
      {
        "id": "A",
        "texto": "Evalúa la condición globalmente sumando el puntaje de todas las filas."
      },
      {
        "id": "B",
        "texto": "Evalúa el predicado fila a fila; únicamente las tuplas para las cuales la expresión sea booleana verdadera (TRUE) son retenidas en el flujo."
      },
      {
        "id": "C",
        "texto": "Reordena las filas colocando las coincidentes al principio y las no coincidentes al final."
      },
      {
        "id": "D",
        "texto": "Elimina permanentemente del disco duro las filas que no cumplan la condición."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La cláusula WHERE aplica un predicado lógico booleano de forma individual sobre cada tupla candidata: solo aquellas con resultado TRUE continúan en el pipeline de procesamiento."
  },
  {
    "id": "s1_t27",
    "categoria": "filtrado",
    "titulo": "Precedencia de Operadores Lógicos en SQL",
    "pregunta": "En ausencia de paréntesis explícitos, ¿cuál es el orden estricto de precedencia entre los operadores lógicos NOT, AND y OR?",
    "opciones": [
      {
        "id": "A",
        "texto": "OR tiene la máxima prioridad, seguido de AND, y finalmente NOT."
      },
      {
        "id": "B",
        "texto": "NOT tiene la máxima prioridad, seguido de AND, y finalmente OR."
      },
      {
        "id": "C",
        "texto": "Se evalúan estrictamente de izquierda a derecha sin jerarquía."
      },
      {
        "id": "D",
        "texto": "AND y OR tienen la misma prioridad y anulan a NOT."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La jerarquía estándar de operadores booleanos en SQL es: 1° NOT (negación unaria), 2° AND (conjunción), 3° OR (disyunción). Por ello, 'A OR B AND C' se evalúa como 'A OR (B AND C)'."
  },
  {
    "id": "s1_t28",
    "categoria": "filtrado",
    "titulo": "Efecto de la Ambigüedad en Condiciones AND y OR",
    "pregunta": "Dada la condición 'WHERE pais = 'México' OR pais = 'España' AND saldo_cuenta > 100', ¿qué filas califican exactamente?",
    "opciones": [
      {
        "id": "A",
        "texto": "Clientes de México con saldo > 100 o de España con saldo > 100."
      },
      {
        "id": "B",
        "texto": "Cualquier cliente de México (sin importar su saldo), O clientes de España que tengan saldo > 100."
      },
      {
        "id": "C",
        "texto": "Únicamente clientes que residan simultáneamente en ambos países."
      },
      {
        "id": "D",
        "texto": "La consulta arroja un error de sintaxis al mezclar OR con AND sin paréntesis."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Debido a que AND tiene mayor precedencia que OR, el motor evalúa: 'pais = 'México' OR (pais = 'España' AND saldo_cuenta > 100)'. Todos los de México califican, pero de España solo aquellos con saldo > 100."
  },
  {
    "id": "s1_t29",
    "categoria": "filtrado",
    "titulo": "Comparación de Igualdad con Valores NULL",
    "pregunta": "¿Por qué la condición 'WHERE saldo_cuenta = NULL' jamás retornará ninguna fila, incluso si existen registros con valores nulos?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque NULL no se puede almacenar en columnas numéricas."
      },
      {
        "id": "B",
        "texto": "Porque en la lógica trivaluada de SQL, comparar cualquier valor con NULL mediante operadores escalares (=, <>, <, >) produce UNKNOWN (desconocido), no TRUE."
      },
      {
        "id": "C",
        "texto": "Porque la palabra clave NULL debe escribirse obligatoriamente en minúsculas."
      },
      {
        "id": "D",
        "texto": "Porque el motor bloquea la tabla por seguridad de tipos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL, NULL representa un valor desconocido. La igualdad 'X = NULL' se evalúa a UNKNOWN (indeterminado). Como WHERE solo admite tuplas con resultado estrictamente TRUE, la condición descarta todas las filas. Debe emplearse 'IS NULL'."
  },
  {
    "id": "s1_t30",
    "categoria": "filtrado",
    "titulo": "Sintaxis Correcta para Identificar Nulos",
    "pregunta": "¿Cuáles son los únicos operadores sintácticos diseñados específicamente en SQL para evaluar la presencia o ausencia de NULL?",
    "opciones": [
      {
        "id": "A",
        "texto": "= NULL y != NULL"
      },
      {
        "id": "B",
        "texto": "IS NULL e IS NOT NULL"
      },
      {
        "id": "C",
        "texto": "EQUALS(NULL) y NOT_EQUALS(NULL)"
      },
      {
        "id": "D",
        "texto": "HAS NULL y LACKS NULL"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Los predicados 'IS NULL' e 'IS NOT NULL' son los operadores estándar definidos por ANSI SQL para comprobar el estado nulo sin incurrir en evaluación trivaluada indeterminada."
  },
  {
    "id": "s1_t31",
    "categoria": "filtrado",
    "titulo": "Leyes de De Morgan en Negaciones Compuestas (NOT con AND)",
    "pregunta": "¿A qué expresión es lógicamente equivalente la condición 'NOT (activo = 1 AND saldo_cuenta > 0)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "activo = 0 AND saldo_cuenta <= 0"
      },
      {
        "id": "B",
        "texto": "activo <> 1 OR saldo_cuenta <= 0"
      },
      {
        "id": "C",
        "texto": "activo <> 1 AND saldo_cuenta <= 0"
      },
      {
        "id": "D",
        "texto": "NOT activo = 1 AND NOT saldo_cuenta > 0"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Por las Leyes de De Morgan: NOT (A AND B) equivale a (NOT A) OR (NOT B). Al negar 'activo = 1' se obtiene 'activo <> 1' y al negar 'saldo_cuenta > 0' se obtiene 'saldo_cuenta <= 0', unidos por OR."
  },
  {
    "id": "s1_t32",
    "categoria": "filtrado",
    "titulo": "Leyes de De Morgan en Negaciones Compuestas (NOT con OR)",
    "pregunta": "¿A qué expresión es equivalente 'NOT (pais = 'México' OR pais = 'Colombia')'?",
    "opciones": [
      {
        "id": "A",
        "texto": "pais <> 'México' AND pais <> 'Colombia'"
      },
      {
        "id": "B",
        "texto": "pais <> 'México' OR pais <> 'Colombia'"
      },
      {
        "id": "C",
        "texto": "pais = 'México' AND pais = 'Colombia'"
      },
      {
        "id": "D",
        "texto": "pais NOT IN ('México') OR pais NOT IN ('Colombia')"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Por la segunda Ley de De Morgan: NOT (A OR B) equivale a (NOT A) AND (NOT B). El cliente no debe ser de México Y tampoco debe ser de Colombia."
  },
  {
    "id": "s1_t33",
    "categoria": "filtrado",
    "titulo": "Operadores de Desigualdad Estándar",
    "pregunta": "¿Cuáles son las dos formas estándar comúnmente admitidas en SQL para denotar 'distinto de' o 'no igual a'?",
    "opciones": [
      {
        "id": "A",
        "texto": "<> y !="
      },
      {
        "id": "B",
        "texto": "== y =="
      },
      {
        "id": "C",
        "texto": "NOT= y ~= "
      },
      {
        "id": "D",
        "texto": "# y =!"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "El estándar formal ISO/ANSI SQL es '<>'. La inmensa mayoría de motores modernos (incluyendo SQLite, PostgreSQL y MySQL) admiten también '!=' como sinónimo válido."
  },
  {
    "id": "s1_t34",
    "categoria": "filtrado",
    "titulo": "Tratamiento de UNKNOWN en la Lógica Trivaluada",
    "pregunta": "En una tabla con filas donde 'saldo_cuenta' es NULL, ¿qué resultado produce la evaluación de 'WHERE NOT (saldo_cuenta > 50)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "TRUE, porque al no ser mayor a 50, se asume que cumple la condición negada."
      },
      {
        "id": "B",
        "texto": "UNKNOWN (se descarta la fila), porque la negación de UNKNOWN sigue siendo UNKNOWN."
      },
      {
        "id": "C",
        "texto": "Arroja una excepción por evaluar valores nulos con operadores relacionales."
      },
      {
        "id": "D",
        "texto": "Convierte temporalmente el valor a cero."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En la tabla de verdad trivaluada de SQL: NOT(UNKNOWN) = UNKNOWN. Como la cláusula WHERE únicamente acepta registros cuyo predicado se evalúe a TRUE, los registros con NULL continúan descartados."
  },
  {
    "id": "s1_t35",
    "categoria": "filtrado",
    "titulo": "Filtrado de Fechas en Formato ISO-8601",
    "pregunta": "¿Por qué es crucial registrar y filtrar fechas con el estándar 'YYYY-MM-DD' (ej. '2023-05-15') en SQLite?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque es el único formato que consume exactamente 4 bytes."
      },
      {
        "id": "B",
        "texto": "Porque permite comparar cronológicamente fechas usando operadores relacionales directos (<, >, BETWEEN) mediante orden lexicográfico natural de cadenas."
      },
      {
        "id": "C",
        "texto": "Porque SQLite bloquea cualquier consulta con barras inclinadas (/)."
      },
      {
        "id": "D",
        "texto": "Porque previene ataques de inyección SQL automáticamente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El formato ISO-8601 (Año-Mes-Día con ceros a la izquierda) garantiza que el orden alfabético de la cadena coincida exactamente con el orden temporal cronológico real."
  },
  {
    "id": "s1_t36",
    "categoria": "filtrado",
    "titulo": "Uso de Funciones en Columnas dentro del WHERE e Índices",
    "pregunta": "¿Qué impacto tiene escribir 'WHERE UPPER(email) = 'JUAN@EMAIL.COM'' frente a un índice tradicional en la columna 'email'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Acelera la búsqueda al forzar mayúsculas en el búfer de memoria."
      },
      {
        "id": "B",
        "texto": "Inhabilita el uso de índices estándar B-Tree sobre la columna 'email', forzando un escaneo secuencial de toda la tabla (Full Table Scan)."
      },
      {
        "id": "C",
        "texto": "No altera el rendimiento porque SQL optimiza funciones escalares antes de compilar."
      },
      {
        "id": "D",
        "texto": "Convierte la búsqueda en una tabla hash en disco."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Envolver una columna indexada dentro de una función impide que el motor aproveche el índice normal (salvo que exista un índice basado en funciones o una collation adecuada), forzando a calcular la función fila a fila en toda la tabla."
  },
  {
    "id": "s1_t37",
    "categoria": "filtrado",
    "titulo": "Cláusula WHERE con Predicado Siempre Falso (1 = 0)",
    "pregunta": "¿Cuál es la utilidad técnica habitual de ejecutar 'SELECT * FROM videojuegos WHERE 1 = 0;'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Borrar todas las filas de la tabla videojuegos."
      },
      {
        "id": "B",
        "texto": "Obtener únicamente los metadatos y la estructura de columnas de la tabla a costo cero de lectura de datos."
      },
      {
        "id": "C",
        "texto": "Reiniciar la secuencia del AUTOINCREMENT."
      },
      {
        "id": "D",
        "texto": "Comprobar si el motor tiene memoria RAM disponible."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La condición '1 = 0' nunca se cumple, retornando 0 filas instantáneamente. Se utiliza ampliamente en herramientas de desarrollo, ORMs e interfaces para inspeccionar la estructura de tipos y columnas sin transferir datos."
  },
  {
    "id": "s1_t38",
    "categoria": "filtrado",
    "titulo": "Comparación de Cadenas Sensible a Mayúsculas con COLLATE",
    "pregunta": "En SQLite, ¿qué cláusula adicional permite forzar que una comparación de texto en el WHERE sea sensible a mayúsculas o insensible a mayúsculas?",
    "opciones": [
      {
        "id": "A",
        "texto": "CASE_SENSITIVE TRUE / FALSE"
      },
      {
        "id": "B",
        "texto": "COLLATE BINARY (sensible) o COLLATE NOCASE (insensible)"
      },
      {
        "id": "C",
        "texto": "ENCODING 'UTF-8-STRICT'"
      },
      {
        "id": "D",
        "texto": "MODE STRICT_TEXT"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La cláusula COLLATE especifica la regla de cotejo textual. COLLATE NOCASE realiza la comparación ignorando mayúsculas/minúsculas para caracteres ASCII de 7 bits, mientras que COLLATE BINARY compara bytes exactos."
  },
  {
    "id": "s1_t39",
    "categoria": "filtrado",
    "titulo": "Diferencia entre Mayor que (>) y Mayor o Igual (>=)",
    "pregunta": "Si un videojuego cuesta exactamente 20.0, ¿cuál de los siguientes predicados incluirá dicho juego en el resultado?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE precio > 20.0"
      },
      {
        "id": "B",
        "texto": "WHERE precio >= 20.0"
      },
      {
        "id": "C",
        "texto": "WHERE precio < 20.0"
      },
      {
        "id": "D",
        "texto": "Ninguna, los números flotantes no coinciden de forma exacta."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador '>=' es inclusivo (mayor o igual). Si el valor es idéntico al límite evaluado, la condición es verdadera."
  },
  {
    "id": "s1_t40",
    "categoria": "filtrado",
    "titulo": "Filtrado Booleano en SQLite",
    "pregunta": "Dado que SQLite no cuenta con un tipo de datos BOOLEAN nativo aislado (almacena 0 para FALSE y 1 para TRUE), ¿cuál es la forma correcta de filtrar clientes activos?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE activo IS TRUE_BOOLEAN"
      },
      {
        "id": "B",
        "texto": "WHERE activo = 1 (o simplemente WHERE activo en contextos de verdad)"
      },
      {
        "id": "C",
        "texto": "WHERE activo == 'YES'"
      },
      {
        "id": "D",
        "texto": "WHERE activo.to_bool() = 1"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQLite los valores lógicos se representan con enteros de afinidad (0 = falso, 1 = verdadero). La condición 'WHERE activo = 1' es completamente portátil y estándar."
  },
  {
    "id": "s1_t41",
    "categoria": "filtrado",
    "titulo": "Cortocircuito Lógico (Short-Circuit Evaluation)",
    "pregunta": "¿Cómo aprovechan los motores SQL modernos la evaluación de cortocircuito en expresiones lógicas?",
    "opciones": [
      {
        "id": "A",
        "texto": "Interrumpen la ejecución de la consulta si una fila contiene un error tipográfico."
      },
      {
        "id": "B",
        "texto": "En un 'A AND B', si A es falso, el motor no necesita evaluar B; en un 'A OR B', si A es verdadero, el motor no necesita evaluar B."
      },
      {
        "id": "C",
        "texto": "Evalúan siempre todas las expresiones en paralelo sin importar su veredicto."
      },
      {
        "id": "D",
        "texto": "Ejecutan primero las subconsultas más costosas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El cortocircuito permite detener la evaluación de un predicado compuesto tan pronto como el valor de verdad global está matemáticamente determinado, ahorrando ciclos de CPU."
  },
  {
    "id": "s1_t42",
    "categoria": "filtrado",
    "titulo": "Predicados Múltiples con AND",
    "pregunta": "Para que una fila sea seleccionada en 'WHERE cond1 AND cond2 AND cond3', ¿qué condición debe satisfacerse?",
    "opciones": [
      {
        "id": "A",
        "texto": "Basta con que al menos una de las tres condiciones sea verdadera."
      },
      {
        "id": "B",
        "texto": "Las tres condiciones deben evaluarse simultáneamente como TRUE para esa tupla específica."
      },
      {
        "id": "C",
        "texto": "La primera condición debe ser falsa y las restantes verdaderas."
      },
      {
        "id": "D",
        "texto": "Exactamente dos condiciones deben ser verdaderas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador lógico AND exige conjunción total: todas y cada una de las condiciones conectadas deben evaluarse como verdaderas para que el registro califique."
  },
  {
    "id": "s1_t43",
    "categoria": "filtrado",
    "titulo": "Predicados Múltiples con OR",
    "pregunta": "Para que una fila sea seleccionada en 'WHERE cond1 OR cond2 OR cond3', ¿qué condición es suficiente?",
    "opciones": [
      {
        "id": "A",
        "texto": "Que al menos una de las condiciones sea evaluada como TRUE."
      },
      {
        "id": "B",
        "texto": "Que las tres condiciones sean simultáneamente TRUE."
      },
      {
        "id": "C",
        "texto": "Que ninguna condición sea nula."
      },
      {
        "id": "D",
        "texto": "Que cond1 sea falsa para permitir que cond2 opere."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "El operador lógico OR representa la disyunción inclusiva: es suficiente con que cualquiera de las expresiones sea verdadera para que la tupla pase el filtro."
  },
  {
    "id": "s1_t44",
    "categoria": "filtrado",
    "titulo": "Filtrado por Exclusión con NOT",
    "pregunta": "Si ejecutas 'SELECT * FROM clientes WHERE NOT (pais = 'México');', ¿qué registros se devuelven?",
    "opciones": [
      {
        "id": "A",
        "texto": "Todos los clientes cuyo país no sea México, incluyendo aquellos con país NULL."
      },
      {
        "id": "B",
        "texto": "Todos los clientes con un país registrado diferente de 'México'; los registros con país NULL quedan descartados."
      },
      {
        "id": "C",
        "texto": "Únicamente clientes con país México."
      },
      {
        "id": "D",
        "texto": "La consulta arroja un error porque NOT no puede anteceder a un paréntesis."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Al evaluar tuplas con país NULL: NULL = 'México' da UNKNOWN. NOT(UNKNOWN) da UNKNOWN, por lo que las filas con país NULL no son seleccionadas."
  },
  {
    "id": "s1_t45",
    "categoria": "filtrado",
    "titulo": "Comparación con Cadenas que Contienen Comillas Simples",
    "pregunta": "¿Cómo se escapa una comilla simple en un literal de texto SQL, por ejemplo al buscar el título 'Assassin''s Creed'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Con barra invertida: 'Assassin\\'s Creed'"
      },
      {
        "id": "B",
        "texto": "Duplicando la comilla simple: 'Assassin''s Creed'"
      },
      {
        "id": "C",
        "texto": "Con el código HTML: 'Assassin&apos;s Creed'"
      },
      {
        "id": "D",
        "texto": "Usando comillas dobles externas: \"Assassin's Creed\" únicamente"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el estándar ANSI SQL, la forma universal y portable de representar una comilla simple dentro de una cadena delimitada por comillas simples es duplicarla ('')."
  },
  {
    "id": "s1_t46",
    "categoria": "filtrado",
    "titulo": "Filtrado con Múltiples Valores Negados",
    "pregunta": "Deseas excluir a los clientes de 'México' y de 'España'. ¿Cuál es el predicado correcto?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE pais <> 'México' OR pais <> 'España'"
      },
      {
        "id": "B",
        "texto": "WHERE pais <> 'México' AND pais <> 'España'"
      },
      {
        "id": "C",
        "texto": "WHERE pais != ('México', 'España')"
      },
      {
        "id": "D",
        "texto": "WHERE pais NOT ('México' AND 'España')"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Usar OR en exclusiones es un error frecuente: si usas OR, un cliente de México califica porque es distinto de España, y uno de España califica porque es distinto de México (seleccionaría a todos). Se debe usar AND."
  },
  {
    "id": "s1_t47",
    "categoria": "filtrado",
    "titulo": "Uso de Expresiones Matemáticas en el WHERE",
    "pregunta": "¿Es válido escribir 'WHERE precio * stock > 1000' en la cláusula WHERE?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, las operaciones aritméticas están restringidas exclusivamente al SELECT."
      },
      {
        "id": "B",
        "texto": "Sí, el motor evalúa la expresión aritmética para cada tupla y compara el resultado numérico contra 1000."
      },
      {
        "id": "C",
        "texto": "Solo si la columna stock es de tipo REAL."
      },
      {
        "id": "D",
        "texto": "Falla a menos que se use la función MULTIPLY()."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La cláusula WHERE acepta cualquier expresión escalar válida, incluyendo multiplicaciones, divisiones, sumas o funciones matemáticas."
  },
  {
    "id": "s1_t48",
    "categoria": "filtrado",
    "titulo": "Consulta WHERE sin Coincidencias",
    "pregunta": "Si ejecutas una consulta con 'WHERE precio > 100000' y ningún juego alcanza ese precio, ¿qué respuesta entrega el motor relacional?",
    "opciones": [
      {
        "id": "A",
        "texto": "Un error 404 de ejecución SQL."
      },
      {
        "id": "B",
        "texto": "Un conjunto de resultados exitoso pero vacío (0 filas devueltas), con las cabeceras de columnas intactas."
      },
      {
        "id": "C",
        "texto": "Una fila con todas las columnas en valor NULL."
      },
      {
        "id": "D",
        "texto": "El motor cancela la conexión por inactividad."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL relacional, no encontrar filas coincidentes no es un error: la consulta se ejecuta de forma exitosa entregando una relación vacía (cardinalidad cero)."
  },
  {
    "id": "s1_t49",
    "categoria": "filtrado",
    "titulo": "Diferencia Fundamental entre WHERE y HAVING",
    "pregunta": "¿En qué etapa del ciclo de vida de la consulta opera WHERE a diferencia de HAVING?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE opera sobre grupos ya agregados; HAVING opera sobre filas crudas."
      },
      {
        "id": "B",
        "texto": "WHERE filtra filas individuales antes de cualquier agrupación; HAVING filtra grupos consolidados tras la cláusula GROUP BY."
      },
      {
        "id": "C",
        "texto": "WHERE y HAVING son estrictamente idénticos y reemplazables."
      },
      {
        "id": "D",
        "texto": "HAVING solo opera en subconsultas de tipo JOIN."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "WHERE filtra registros tupla a tupla antes de formar grupos. HAVING se evalúa con posterioridad a GROUP BY para descartar grupos completos basándose en condiciones agregadas (como COUNT(*) o AVG())."
  },
  {
    "id": "s1_t50",
    "categoria": "filtrado",
    "titulo": "Operador NOT con Operadores Relacionales",
    "pregunta": "¿A qué expresión equivale sintácticamente 'WHERE NOT (calificacion < 9.0)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE calificacion > 9.0"
      },
      {
        "id": "B",
        "texto": "WHERE calificacion >= 9.0"
      },
      {
        "id": "C",
        "texto": "WHERE calificacion = 9.0"
      },
      {
        "id": "D",
        "texto": "WHERE calificacion <= 9.0"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La negación estricta de 'menor que (<)' es 'mayor o igual que (>=)'. Si una calificación es exactamente 9.0, no es menor a 9.0, por lo que su negación es verdadera."
  },
  {
    "id": "s1_t51",
    "categoria": "rangos_conjuntos",
    "titulo": "Inclusividad de Límites en el Operador BETWEEN",
    "pregunta": "¿Cómo interpreta el motor SQL la condición 'WHERE precio BETWEEN 20.0 AND 50.0' respecto a sus extremos?",
    "opciones": [
      {
        "id": "A",
        "texto": "Excluye el 20.0 e incluye el 50.0."
      },
      {
        "id": "B",
        "texto": "Es inclusivo en ambos límites: equivale exactamente a 'precio >= 20.0 AND precio <= 50.0'."
      },
      {
        "id": "C",
        "texto": "Excluye ambos extremos (estrictamente mayor a 20 y menor a 50)."
      },
      {
        "id": "D",
        "texto": "Incluye el 20.0 pero excluye el 50.0."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador BETWEEN es estrictamente cerrado e inclusivo en ambos extremos: tanto el límite inferior como el superior forman parte del rango válido."
  },
  {
    "id": "s1_t52",
    "categoria": "rangos_conjuntos",
    "titulo": "Orden Obligatorio de Límites en BETWEEN",
    "pregunta": "¿Qué ocurre si por error escribes 'WHERE precio BETWEEN 50.0 AND 20.0' (límite mayor primero)?",
    "opciones": [
      {
        "id": "A",
        "texto": "El motor invierte automáticamente los límites para corregir el rango."
      },
      {
        "id": "B",
        "texto": "No retorna ninguna fila, porque la expresión se evalúa como 'precio >= 50.0 AND precio <= 20.0', lo cual es matemáticamente imposible."
      },
      {
        "id": "C",
        "texto": "Arroja un error de sintaxis 'Invalid Range Limits'."
      },
      {
        "id": "D",
        "texto": "Retorna todos los precios fuera de ese rango."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "SQL no reordena los límites. Al expandirse como 'col >= limite1 AND col <= limite2', si limite1 > limite2, ningún número puede ser simultáneamente mayor a 50 y menor a 20, dando 0 filas."
  },
  {
    "id": "s1_t53",
    "categoria": "rangos_conjuntos",
    "titulo": "Negación de Rango con NOT BETWEEN",
    "pregunta": "¿A qué condición booleana equivale exactamente 'WHERE precio NOT BETWEEN 15.0 AND 45.0'?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE precio < 15.0 OR precio > 45.0"
      },
      {
        "id": "B",
        "texto": "WHERE precio <= 15.0 AND precio >= 45.0"
      },
      {
        "id": "C",
        "texto": "WHERE precio <> 15.0 AND precio <> 45.0"
      },
      {
        "id": "D",
        "texto": "WHERE precio < 15.0 AND precio > 45.0"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Al negar un intervalo inclusivo [15, 45], califican todos los valores estrictamente inferiores a 15 O estrictamente superiores a 45."
  },
  {
    "id": "s1_t54",
    "categoria": "rangos_conjuntos",
    "titulo": "Uso de BETWEEN con Fechas",
    "pregunta": "Si ejecutas 'WHERE fecha_registro BETWEEN '2022-01-01' AND '2022-12-31'', ¿qué registros quedan incluidos?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente registros del primer semestre de 2022."
      },
      {
        "id": "B",
        "texto": "Todos los registros con fecha correspondiente al año 2022 completo (desde el 1 de enero hasta el 31 de diciembre inclusive)."
      },
      {
        "id": "C",
        "texto": "Solo las fechas que caigan en día 1 o 31."
      },
      {
        "id": "D",
        "texto": "Falla porque BETWEEN solo opera sobre números enteros o decimales."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "BETWEEN opera de manera natural sobre tipos de datos cronológicos o cadenas con formato ISO-8601, abarcando de forma inclusiva todas las fechas del rango especificado."
  },
  {
    "id": "s1_t55",
    "categoria": "rangos_conjuntos",
    "titulo": "Semántica del Operador IN",
    "pregunta": "¿A qué expresión expandida equivale la condición 'WHERE pais IN ('México', 'España', 'Colombia')'?",
    "opciones": [
      {
        "id": "A",
        "texto": "pais = 'México' AND pais = 'España' AND pais = 'Colombia'"
      },
      {
        "id": "B",
        "texto": "pais = 'México' OR pais = 'España' OR pais = 'Colombia'"
      },
      {
        "id": "C",
        "texto": "pais LIKE '%México%' OR pais LIKE '%España%'"
      },
      {
        "id": "D",
        "texto": "pais = 'México' XOR pais = 'España'"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador de pertenencia IN evalúa si el valor de la columna coincide con cualquiera de los elementos de la lista, comportándose como una serie de comparaciones de igualdad unidas por OR."
  },
  {
    "id": "s1_t56",
    "categoria": "rangos_conjuntos",
    "titulo": "Peligro Crítico de NULL en el Operador NOT IN",
    "pregunta": "¿Qué ocurre si ejecutas 'WHERE id NOT IN (1, 2, NULL)' en SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Retorna todas las filas cuyo id sea distinto de 1 y 2, ignorando el NULL."
      },
      {
        "id": "B",
        "texto": "Retorna 0 filas (conjunto vacío), porque la presencia de NULL en la lista convierte la conjunción lógica en UNKNOWN para cualquier valor no coincidente."
      },
      {
        "id": "C",
        "texto": "Arroja un error fatal de ejecución por violación de integridad."
      },
      {
        "id": "D",
        "texto": "Solo devuelve las filas donde id sea NULL."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "NOT IN (1, 2, NULL) se expande como 'id <> 1 AND id <> 2 AND id <> NULL'. Como 'id <> NULL' siempre es UNKNOWN, la conjunción completa nunca puede ser TRUE. Por ello, si una lista en NOT IN contiene NULL, la consulta no retorna nada."
  },
  {
    "id": "s1_t57",
    "categoria": "rangos_conjuntos",
    "titulo": "Comodín Porcentaje (%) en el Operador LIKE",
    "pregunta": "¿Qué representa exactamente el símbolo comodín '%' en un patrón del operador LIKE?",
    "opciones": [
      {
        "id": "A",
        "texto": "Exactamente un carácter alfabético."
      },
      {
        "id": "B",
        "texto": "Cero, uno o una secuencia arbitraria de múltiples caracteres."
      },
      {
        "id": "C",
        "texto": "Únicamente dígitos numéricos del 0 al 9."
      },
      {
        "id": "D",
        "texto": "Un salto de línea o retorno de carro."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL, el comodín '%' coincide con cualquier secuencia de caracteres de cualquier longitud, incluyendo una cadena de longitud cero (ningún carácter)."
  },
  {
    "id": "s1_t58",
    "categoria": "rangos_conjuntos",
    "titulo": "Comodín Guión Bajo (_) en el Operador LIKE",
    "pregunta": "¿Qué representa exactamente el símbolo comodín '_' en una búsqueda con LIKE?",
    "opciones": [
      {
        "id": "A",
        "texto": "Cero o más caracteres."
      },
      {
        "id": "B",
        "texto": "Exactamente un único carácter cualquiera."
      },
      {
        "id": "C",
        "texto": "Un espacio en blanco obligatorio."
      },
      {
        "id": "D",
        "texto": "Un carácter no alfanumérico."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El guion bajo '_' es un comodín posicional estricto: requiere que exista exactamente un carácter arbitrario en esa posición concreta de la cadena."
  },
  {
    "id": "s1_t59",
    "categoria": "rangos_conjuntos",
    "titulo": "Búsqueda de Prefijo con LIKE",
    "pregunta": "¿Cuál es el patrón para seleccionar todos los videojuegos cuyo título empiece exactamente con la palabra 'Super'?",
    "opciones": [
      {
        "id": "A",
        "texto": "LIKE '%Super%'"
      },
      {
        "id": "B",
        "texto": "LIKE 'Super%'"
      },
      {
        "id": "C",
        "texto": "LIKE '%Super'"
      },
      {
        "id": "D",
        "texto": "LIKE 'Super_'"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "'Super%' exige que la cadena inicie con los caracteres 'Super' seguidos de cualquier secuencia posterior (o ninguna)."
  },
  {
    "id": "s1_t60",
    "categoria": "rangos_conjuntos",
    "titulo": "Búsqueda de Sufijo con LIKE",
    "pregunta": "¿Cuál es el patrón para buscar clientes cuyo correo electrónico pertenezca al dominio '@email.com'?",
    "opciones": [
      {
        "id": "A",
        "texto": "LIKE '@email.com%'"
      },
      {
        "id": "B",
        "texto": "LIKE '%@email.com'"
      },
      {
        "id": "C",
        "texto": "LIKE '_@email.com_'"
      },
      {
        "id": "D",
        "texto": "IN ('@email.com')"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "'%@email.com' coincide con cualquier texto previo arbitrario que finalice exactamente con los caracteres '@email.com'."
  },
  {
    "id": "s1_t61",
    "categoria": "rangos_conjuntos",
    "titulo": "Búsqueda de Subcadena en Cualquier Posición",
    "pregunta": "¿Qué patrón garantiza localizar cualquier videojuego que contenga la palabra 'War' en cualquier parte de su título?",
    "opciones": [
      {
        "id": "A",
        "texto": "LIKE 'War%'"
      },
      {
        "id": "B",
        "texto": "LIKE '%War%'"
      },
      {
        "id": "C",
        "texto": "LIKE '%War'"
      },
      {
        "id": "D",
        "texto": "LIKE '_War_'"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "'%War%' califica si 'War' está al inicio, en medio o al final del texto, ya que los comodines '%' permiten cero o más caracteres a ambos lados."
  },
  {
    "id": "s1_t62",
    "categoria": "rangos_conjuntos",
    "titulo": "Patrón con Longitud Exacta usando Guiones Bajos",
    "pregunta": "¿Qué cadena coincide con el patrón 'LIKE '___'' (tres guiones bajos consecutivos)?",
    "opciones": [
      {
        "id": "A",
        "texto": "Cualquier texto que tenga al menos tres caracteres."
      },
      {
        "id": "B",
        "texto": "Únicamente textos que tengan exactamente tres caracteres de longitud."
      },
      {
        "id": "C",
        "texto": "Textos que contengan guiones bajos físicos."
      },
      {
        "id": "D",
        "texto": "Cualquier texto de tres palabras."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Cada guion bajo '_' exige un carácter. Tres guiones consecutivos sin '%' coinciden únicamente con cadenas cuya longitud total sea exactamente de 3 caracteres (ej. 'RPG', 'GTA', 'God')."
  },
  {
    "id": "s1_t63",
    "categoria": "rangos_conjuntos",
    "titulo": "Sensibilidad a Mayúsculas de LIKE en SQLite",
    "pregunta": "¿Cómo trata SQLite por defecto el operador LIKE para caracteres ASCII estándar?",
    "opciones": [
      {
        "id": "A",
        "texto": "Es estrictamente sensible a mayúsculas/minúsculas (case-sensitive)."
      },
      {
        "id": "B",
        "texto": "Es insensible a mayúsculas/minúsculas (case-insensitive) para caracteres ASCII de 7 bits."
      },
      {
        "id": "C",
        "texto": "Falla si se mezclan mayúsculas y minúsculas en el patrón."
      },
      {
        "id": "D",
        "texto": "Depende de la configuración del sistema operativo host."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Por especificación interna de SQLite, el operador LIKE es insensible a mayúsculas para caracteres del alfabeto latino ASCII ('a' coincide con 'A'). Para forzar sensibilidad se usa el operador GLOB o el pragma case_sensitive_like."
  },
  {
    "id": "s1_t64",
    "categoria": "rangos_conjuntos",
    "titulo": "Escape de Caracteres Comodín con la Cláusula ESCAPE",
    "pregunta": "Deseas buscar la cadena literal '100%' en una columna de texto. ¿Cómo indicas que el signo '%' es un carácter literal y no un comodín?",
    "opciones": [
      {
        "id": "A",
        "texto": "LIKE '100\\%' sin ninguna otra cláusula."
      },
      {
        "id": "B",
        "texto": "LIKE '100!%' ESCAPE '!'"
      },
      {
        "id": "C",
        "texto": "LIKE '100[%%]'"
      },
      {
        "id": "D",
        "texto": "LIKE_LITERAL('100%')"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La cláusula estándar ESCAPE 'carácter' define un prefijo de escape. Al escribir '100!%' ESCAPE '!', el motor interpreta el '%' precedido por '!' como un carácter de porcentaje literal."
  },
  {
    "id": "s1_t65",
    "categoria": "rangos_conjuntos",
    "titulo": "Operador NOT LIKE",
    "pregunta": "¿Qué resultado entrega 'WHERE desarrollador NOT LIKE 'Nintendo%''?",
    "opciones": [
      {
        "id": "A",
        "texto": "Todos los desarrolladores que comiencen con la palabra Nintendo."
      },
      {
        "id": "B",
        "texto": "Todos los desarrolladores cuyo nombre no inicie con 'Nintendo' (descartando también aquellos cuyo desarrollador sea NULL)."
      },
      {
        "id": "C",
        "texto": "Arroja un error; NOT no puede usarse junto a LIKE."
      },
      {
        "id": "D",
        "texto": "Únicamente desarrolladores independientes sin marca registrada."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "NOT LIKE descarta las cadenas que satisfagan el patrón. Aquellos registros donde el campo sea NULL se evalúan a UNKNOWN y también quedan excluidos."
  },
  {
    "id": "s1_t66",
    "categoria": "rangos_conjuntos",
    "titulo": "Impacto de Índices en LIKE con Comodín Inicial (%texto)",
    "pregunta": "¿Por qué un patrón como 'LIKE '%Zelda'' tiene un impacto severo en el tiempo de respuesta de grandes tablas?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque el motor SQL se bloquea al leer de derecha a izquierda."
      },
      {
        "id": "B",
        "texto": "Porque al comenzar con un comodín '%', el motor no puede determinar el punto de entrada en un índice B-Tree ordenado, forzando un Full Table Scan."
      },
      {
        "id": "C",
        "texto": "Porque requiere que la base de datos esté desnormalizada."
      },
      {
        "id": "D",
        "texto": "Porque el analizador sintáctico lo traduce a múltiples uniones cruzadas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Los índices B-Tree están ordenados de izquierda a derecha. Un prefijo comodín (%texto) impide el uso de búsqueda binaria por rango, obligando a inspeccionar cada fila de la tabla."
  },
  {
    "id": "s1_t67",
    "categoria": "rangos_conjuntos",
    "titulo": "Operador GLOB en SQLite",
    "pregunta": "¿En qué se diferencia el operador GLOB propio de SQLite frente al operador LIKE estándar?",
    "opciones": [
      {
        "id": "A",
        "texto": "GLOB solo busca archivos en el disco duro del servidor."
      },
      {
        "id": "B",
        "texto": "GLOB es estrictamente sensible a mayúsculas/minúsculas y emplea comodines estilo Unix (* en vez de % y ? en vez de _)."
      },
      {
        "id": "C",
        "texto": "GLOB es un sinónimo de REGEXP sin diferencias."
      },
      {
        "id": "D",
        "texto": "GLOB solo opera sobre tipos de datos BLOB."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "GLOB utiliza la sintaxis de patrones de comodines Unix/shell ('*' para cualquier longitud, '?' para un carácter y '[a-z]' para rangos) y es siempre case-sensitive en SQLite."
  },
  {
    "id": "s1_t68",
    "categoria": "rangos_conjuntos",
    "titulo": "Combinación de Operadores IN y BETWEEN",
    "pregunta": "Dada la condición 'WHERE consola IN ('PC', 'PlayStation 5') AND precio BETWEEN 20.0 AND 60.0', ¿qué filas se seleccionan?",
    "opciones": [
      {
        "id": "A",
        "texto": "Juegos de PC de cualquier precio o de PS5 entre 20 y 60."
      },
      {
        "id": "B",
        "texto": "Juegos cuya plataforma sea estrictamente PC o PlayStation 5, y que simultáneamente tengan un precio dentro del rango de 20.0 a 60.0 (ambos inclusive)."
      },
      {
        "id": "C",
        "texto": "Todos los juegos entre 20 y 60 sin importar su consola."
      },
      {
        "id": "D",
        "texto": "Falla porque IN y BETWEEN no pueden combinarse en el mismo WHERE."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El operador AND exige la satisfacción conjunta del predicado de pertenencia a conjunto (IN) y del predicado de rango inclusivo (BETWEEN)."
  },
  {
    "id": "s1_t69",
    "categoria": "rangos_conjuntos",
    "titulo": "Patrón con Comodines Mixtos (% y _)",
    "pregunta": "¿Qué estructura de texto describe el patrón 'LIKE '_a%''?",
    "opciones": [
      {
        "id": "A",
        "texto": "Cualquier texto que empiece con la letra 'a'."
      },
      {
        "id": "B",
        "texto": "Cualquier texto que tenga cualquier carácter en la primera posición, la letra 'a' obligatoria en la segunda posición, y cero o más caracteres posteriores."
      },
      {
        "id": "C",
        "texto": "Textos que contengan únicamente dos letras."
      },
      {
        "id": "D",
        "texto": "Textos que finalicen en 'a'."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El primer carácter coincide con '_', el segundo debe ser exactamente 'a', y '%' permite que continúe cualquier texto o nada (ej. 'Halo', 'Mario', 'Dark')."
  },
  {
    "id": "s1_t70",
    "categoria": "rangos_conjuntos",
    "titulo": "Operador IN con Lista de un Solo Elemento",
    "pregunta": "¿A qué equivale sintáctica y funcionalmente 'WHERE genero IN ('Aventura')'?",
    "opciones": [
      {
        "id": "A",
        "texto": "A un error de sintaxis, ya que IN requiere al menos dos elementos."
      },
      {
        "id": "B",
        "texto": "A la igualdad escalar simple: 'WHERE genero = 'Aventura''."
      },
      {
        "id": "C",
        "texto": "A una búsqueda difusa LIKE '%Aventura%'."
      },
      {
        "id": "D",
        "texto": "A una creación de tabla dinámica."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Una lista de pertenencia con un único valor 'IN (x)' es matemática y semánticamente equivalente a la igualdad estándar '= x'."
  },
  {
    "id": "s1_t71",
    "categoria": "rangos_conjuntos",
    "titulo": "Comportamiento de LIKE con Valores NULL",
    "pregunta": "Si el campo 'desarrollador' de una fila es NULL, ¿qué resultado produce 'WHERE desarrollador LIKE '%''?",
    "opciones": [
      {
        "id": "A",
        "texto": "TRUE, porque el comodín '%' coincide con absolutamente todo, inclusive con valores nulos."
      },
      {
        "id": "B",
        "texto": "UNKNOWN (se descarta la fila), porque cualquier operación LIKE sobre un operando NULL retorna NULL."
      },
      {
        "id": "C",
        "texto": "Arroja un error de coerción de tipos."
      },
      {
        "id": "D",
        "texto": "Convierte el NULL a la cadena 'NULL'."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Incluso el comodín universal '%' no coincide con NULL. Al evaluar NULL LIKE '%', el resultado es NULL (UNKNOWN), por lo que la fila no califica."
  },
  {
    "id": "s1_t72",
    "categoria": "rangos_conjuntos",
    "titulo": "Uso de BETWEEN con Cadenas Alfabéticas",
    "pregunta": "En la consulta 'WHERE nombre BETWEEN 'A' AND 'C'', ¿por qué un cliente llamado 'Carlos' NO queda incluido?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque Carlos empieza con C mayúscula."
      },
      {
        "id": "B",
        "texto": "Porque en orden lexicográfico alfabético estricto, 'Carlos' es mayor que 'C' ('C' < 'Ca' < 'Carlos'), quedando fuera del límite superior 'C'."
      },
      {
        "id": "C",
        "texto": "Porque BETWEEN no funciona con cadenas de texto en SQL."
      },
      {
        "id": "D",
        "texto": "Porque se requieren comillas dobles."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En orden alfabético, cualquier letra añadida después de 'C' hace que la cadena sea mayor que 'C' a solas ('Carlos' > 'C'). Para incluir nombres que comiencen con C se debe usar un límite superior como 'D' o 'Cz'."
  },
  {
    "id": "s1_t73",
    "categoria": "rangos_conjuntos",
    "titulo": "Filtrado por Rango de Años usando LIKE",
    "pregunta": "Si las fechas se almacenan como 'YYYY-MM-DD', ¿cómo puedes filtrar todas las transacciones del año 2023 usando LIKE?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE fecha_venta LIKE '2023'"
      },
      {
        "id": "B",
        "texto": "WHERE fecha_venta LIKE '2023-%'"
      },
      {
        "id": "C",
        "texto": "WHERE fecha_venta LIKE '%2023'"
      },
      {
        "id": "D",
        "texto": "WHERE fecha_venta IN ('2023')"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "'2023-%' coincide con cualquier fecha que comience con el año 2023 y el guion separador, abarcando todos los meses y días de ese año."
  },
  {
    "id": "s1_t74",
    "categoria": "rangos_conjuntos",
    "titulo": "Operador NOT IN con Múltiples Cadenas",
    "pregunta": "¿Qué registros entrega 'WHERE consola NOT IN ('PC', 'Nintendo Switch')'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente juegos de PC."
      },
      {
        "id": "B",
        "texto": "Todos los videojuegos cuya plataforma no sea 'PC' y tampoco sea 'Nintendo Switch'."
      },
      {
        "id": "C",
        "texto": "Juegos que estén en ambas consolas simultáneamente."
      },
      {
        "id": "D",
        "texto": "Juegos con consola en valor NULL."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "NOT IN excluye todos los elementos especificados en la lista ('consola <> 'PC' AND consola <> 'Nintendo Switch'')."
  },
  {
    "id": "s1_t75",
    "categoria": "rangos_conjuntos",
    "titulo": "Equivalencia entre BETWEEN y Comparadores Relacionales",
    "pregunta": "¿Cuál de las siguientes expresiones es exactamente idéntica a 'WHERE stock BETWEEN 10 AND 50'?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE stock > 10 AND stock < 50"
      },
      {
        "id": "B",
        "texto": "WHERE stock >= 10 AND stock <= 50"
      },
      {
        "id": "C",
        "texto": "WHERE stock >= 10 OR stock <= 50"
      },
      {
        "id": "D",
        "texto": "WHERE stock = 10 AND stock = 50"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La definición formal del estándar SQL para 'x BETWEEN a AND b' es 'x >= a AND x <= b'."
  },
  {
    "id": "s1_t76",
    "categoria": "orden_paginacion",
    "titulo": "Garantía de Orden en Conjuntos Relacionales",
    "pregunta": "Según la teoría relacional y el estándar SQL, ¿en qué orden específico entrega las filas una consulta que NO incluye la cláusula ORDER BY?",
    "opciones": [
      {
        "id": "A",
        "texto": "Siempre en el orden de inserción física cronológica de los registros."
      },
      {
        "id": "B",
        "texto": "En ningún orden garantizado (no determinista); las relaciones son conjuntos matemáticos sin orden intrínseco."
      },
      {
        "id": "C",
        "texto": "Siempre ordenadas ascendentemente por la clave primaria."
      },
      {
        "id": "D",
        "texto": "En orden alfabético por la primera columna de texto."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el modelo relacional, las tablas son conjuntos matemáticos no ordenados. La única forma de garantizar un orden determinista en el resultado es mediante la cláusula ORDER BY explícita."
  },
  {
    "id": "s1_t77",
    "categoria": "orden_paginacion",
    "titulo": "Dirección de Ordenamiento Predeterminada",
    "pregunta": "Si especificas 'ORDER BY precio', ¿qué dirección de ordenamiento aplica el motor de forma predeterminada?",
    "opciones": [
      {
        "id": "A",
        "texto": "DESC (descendente, de mayor a menor)."
      },
      {
        "id": "B",
        "texto": "ASC (ascendente, de menor a mayor)."
      },
      {
        "id": "C",
        "texto": "Aleatoria."
      },
      {
        "id": "D",
        "texto": "Depende del signo del primer número encontrado."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL, la cláusula ORDER BY asume 'ASC' (ascendente) por defecto si se omite el modificador de dirección."
  },
  {
    "id": "s1_t78",
    "categoria": "orden_paginacion",
    "titulo": "Ordenamiento Multicriterio Jerárquico",
    "pregunta": "¿Cómo interpreta el motor la cláusula 'ORDER BY pais ASC, saldo_cuenta DESC'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ordena primero por saldo descendente y si hay empates, ordena por país."
      },
      {
        "id": "B",
        "texto": "Ordena alfabéticamente de la A a la Z por país; y para aquellos clientes que pertenezcan al mismo país, los desempata de mayor a menor saldo."
      },
      {
        "id": "C",
        "texto": "Calcula el promedio entre el código del país y el saldo para ordenar."
      },
      {
        "id": "D",
        "texto": "Falla porque los modificadores ASC y DESC no pueden mezclarse."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "ORDER BY evalúa los criterios de izquierda a derecha en orden jerárquico de prioridad: el segundo criterio solo entra en juego cuando existen valores idénticos (empates) en el primer criterio."
  },
  {
    "id": "s1_t79",
    "categoria": "orden_paginacion",
    "titulo": "Ordenamiento por Alias de la Cláusula SELECT",
    "pregunta": "¿Por qué la consulta 'SELECT precio * 1.16 AS precio_final FROM videojuegos ORDER BY precio_final DESC;' es perfectamente válida en SQL estándar?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque el motor reescribe la consulta eliminando el alias."
      },
      {
        "id": "B",
        "texto": "Porque la cláusula ORDER BY se evalúa lógicamente DESPUÉS de la cláusula SELECT, por lo que los alias proyectados ya existen y son conocidos."
      },
      {
        "id": "C",
        "texto": "Solo es válida si la columna original tiene un índice único."
      },
      {
        "id": "D",
        "texto": "Porque ORDER BY solo admite expresiones calculadas y no columnas base."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el pipeline lógico de ejecución SQL: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Como ORDER BY se ejecuta tras SELECT, tiene pleno acceso a los alias definidos en la proyección."
  },
  {
    "id": "s1_t80",
    "categoria": "orden_paginacion",
    "titulo": "Ordenamiento por Posición Ordinal de Columna",
    "pregunta": "¿Qué significa 'ORDER BY 2 DESC' en una consulta 'SELECT id, titulo, precio FROM videojuegos;' y por qué se desaconseja en código productivo?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ordena por el número 2 constante; se desaconseja porque no hace nada."
      },
      {
        "id": "B",
        "texto": "Ordena por la segunda columna proyectada ('titulo') de forma descendente; se desaconseja porque hace al código frágil si alguien altera el orden de las columnas en el SELECT."
      },
      {
        "id": "C",
        "texto": "Ordena duplicando el tiempo de ejecución."
      },
      {
        "id": "D",
        "texto": "Es un error de sintaxis que fue retirado de todos los motores SQL."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La notación posicional (ORDER BY 2) referencia la 2da columna de la lista SELECT. Aunque es válida, es una mala práctica en producción porque si un desarrollador reordena o añade columnas al SELECT, el criterio de ordenamiento cambia silenciosamente."
  },
  {
    "id": "s1_t81",
    "categoria": "orden_paginacion",
    "titulo": "Tratamiento de Valores NULL en ORDER BY",
    "pregunta": "En SQLite, cuando ordenas de forma ascendente ('ORDER BY columna ASC'), ¿dónde se posicionan las filas con valor NULL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Al final del resultado."
      },
      {
        "id": "B",
        "texto": "Al principio de todo el resultado (SQLite considera NULL como el valor más pequeño posible)."
      },
      {
        "id": "C",
        "texto": "Las filas con NULL son descartadas automáticamente de la salida."
      },
      {
        "id": "D",
        "texto": "En posiciones aleatorias en medio de las demás filas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQLite, los valores NULL se consideran menores que cualquier otro tipo de dato en comparaciones de ordenamiento. Por tanto, en ORDER BY ASC aparecen primero, y en ORDER BY DESC aparecen al final."
  },
  {
    "id": "s1_t82",
    "categoria": "orden_paginacion",
    "titulo": "Propósito de la Cláusula LIMIT",
    "pregunta": "¿Cuál es la función técnica de la cláusula 'LIMIT n' en una consulta SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Limitar el consumo de memoria RAM del servidor a n megabytes."
      },
      {
        "id": "B",
        "texto": "Restringir la cantidad máxima de filas devueltas al cliente a un número exacto de n registros."
      },
      {
        "id": "C",
        "texto": "Filtra únicamente las columnas cuyo identificador sea menor que n."
      },
      {
        "id": "D",
        "texto": "Establece un tiempo de espera máximo de n segundos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "LIMIT n trunca el cursor de resultados tras haber emitido n filas hacia el cliente o aplicación que realizó la consulta."
  },
  {
    "id": "s1_t83",
    "categoria": "orden_paginacion",
    "titulo": "Propósito de la Cláusula OFFSET",
    "pregunta": "¿Qué acción realiza la cláusula 'OFFSET m' cuando se utiliza conjuntamente con LIMIT?",
    "opciones": [
      {
        "id": "A",
        "texto": "Añade m filas vacías al inicio de la tabla."
      },
      {
        "id": "B",
        "texto": "Omite o descarta las primeras m filas del conjunto ordenado antes de comenzar a entregar las filas solicitadas por LIMIT."
      },
      {
        "id": "C",
        "texto": "Multiplica los valores de las columnas por m."
      },
      {
        "id": "D",
        "texto": "Aumenta el identificador primario en m unidades."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "OFFSET m especifica el salto o desplazamiento de filas: el motor salta las primeras m filas del conjunto resultante y empieza a entregar a partir de la fila m + 1."
  },
  {
    "id": "s1_t84",
    "categoria": "orden_paginacion",
    "titulo": "Paginación Estándar con LIMIT y OFFSET",
    "pregunta": "Deseas construir una paginación donde cada página muestra 10 filas. ¿Cuál es la cláusula para obtener la página número 3?",
    "opciones": [
      {
        "id": "A",
        "texto": "LIMIT 10 OFFSET 30"
      },
      {
        "id": "B",
        "texto": "LIMIT 10 OFFSET 20"
      },
      {
        "id": "C",
        "texto": "LIMIT 30 OFFSET 10"
      },
      {
        "id": "D",
        "texto": "LIMIT 3 OFFSET 10"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La fórmula de paginación es OFFSET = (página - 1) * tamaño_página. Para la página 3 con tamaño 10: OFFSET = (3 - 1) * 10 = 20. La cláusula correcta es 'LIMIT 10 OFFSET 20' (omite las 20 primeras filas y entrega las siguientes 10: filas de la 21 a la 30)."
  },
  {
    "id": "s1_t85",
    "categoria": "orden_paginacion",
    "titulo": "Riesgo de Paginación sin ORDER BY",
    "pregunta": "¿Por qué es un error grave de arquitectura implementar 'LIMIT n OFFSET m' sin una cláusula ORDER BY?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque SQLite arroja un error de sintaxis mandatario."
      },
      {
        "id": "B",
        "texto": "Porque el orden de las filas devueltas es impredecible y no determinista; un usuario podría ver filas duplicadas o perder filas entre páginas consecutivas."
      },
      {
        "id": "C",
        "texto": "Porque bloquea la base de datos para otros usuarios."
      },
      {
        "id": "D",
        "texto": "Porque no aprovecha la memoria caché del navegador."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Sin un ORDER BY determinista (preferiblemente con una clave única como desempate), el motor puede entregar las filas en cualquier orden según planes de ejecución internos, corrompiendo la consistencia de la paginación."
  },
  {
    "id": "s1_t86",
    "categoria": "orden_paginacion",
    "titulo": "Alcance de la Cláusula DISTINCT",
    "pregunta": "En la consulta 'SELECT DISTINCT consola, genero FROM videojuegos;', ¿sobre qué opera DISTINCT?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente sobre la columna 'consola', ignorando 'genero'."
      },
      {
        "id": "B",
        "texto": "Sobre la combinación conjunta de ambas columnas (la tupla entera 'consola + genero'); solo descarta filas donde ambos valores sean idénticos a otra fila ya proyectada."
      },
      {
        "id": "C",
        "texto": "Sobre la columna 'genero' exclusivamente."
      },
      {
        "id": "D",
        "texto": "Convierte la salida en una sola fila con una matriz."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "DISTINCT no es una función que afecte a una sola columna: es un calificador de conjunto que opera sobre la totalidad de la lista proyectada en el SELECT, evaluando la unicidad de la tupla completa."
  },
  {
    "id": "s1_t87",
    "categoria": "orden_paginacion",
    "titulo": "DISTINCT y Valores NULL",
    "pregunta": "Si una tabla contiene 5 registros con valor NULL en una columna y ejecutas 'SELECT DISTINCT columna FROM tabla;', ¿cuántas filas con valor NULL se proyectarán?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ninguna, DISTINCT elimina todos los valores nulos."
      },
      {
        "id": "B",
        "texto": "Exactamente una única fila con valor NULL, ya que DISTINCT considera a todos los NULLs como duplicados entre sí a efectos de unicidad de conjunto."
      },
      {
        "id": "C",
        "texto": "Las 5 filas con NULL intactas."
      },
      {
        "id": "D",
        "texto": "Arroja una excepción de violación de unicidad."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "A diferencia de las comparaciones normales donde NULL = NULL da UNKNOWN, la cláusula DISTINCT del estándar SQL agrupa todos los valores NULL bajo una sola representación única."
  },
  {
    "id": "s1_t88",
    "categoria": "orden_paginacion",
    "titulo": "Costo de Rendimiento de DISTINCT",
    "pregunta": "¿Qué costo computacional introduce el uso de DISTINCT en grandes volúmenes de datos?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ninguno, el motor lo resuelve en tiempo cero."
      },
      {
        "id": "B",
        "texto": "Exige realizar una operación de ordenamiento temporal (Sort) o una tabla hash en memoria/disco para detectar y descartar duplicados, incrementando el consumo de CPU y memoria."
      },
      {
        "id": "C",
        "texto": "Copia toda la base de datos a un archivo temporal de texto plano."
      },
      {
        "id": "D",
        "texto": "Deshabilita todos los disparadores (triggers) del sistema."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Para eliminar duplicados, el motor debe comparar cada fila contra las demás, lo que típicamente involucra un operador de ordenamiento (Sort Unique) o hashing en memoria, penalizando el rendimiento en consultas masivas."
  },
  {
    "id": "s1_t89",
    "categoria": "orden_paginacion",
    "titulo": "Sintaxis de Expresión Condicional CASE Buscado",
    "pregunta": "¿Cuál es la estructura sintáctica estándar de un bloque CASE buscado en SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "IF condición THEN valor ELSE otro ENDIF"
      },
      {
        "id": "B",
        "texto": "CASE WHEN condición THEN valor ELSE otro END"
      },
      {
        "id": "C",
        "texto": "SWITCH condición CASE valor DEFAULT otro"
      },
      {
        "id": "D",
        "texto": "EVALUATE condición : valor OTHERWISE otro"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La sintaxis estándar ANSI SQL para la expresión condicional general (Searched CASE) es: 'CASE WHEN condición1 THEN resultado1 [WHEN ... THEN ...] [ELSE resultado_default] END'."
  },
  {
    "id": "s1_t90",
    "categoria": "orden_paginacion",
    "titulo": "Orden de Evaluación Secuencial de CASE",
    "pregunta": "Si una fila satisface simultáneamente las condiciones del primer WHEN y del segundo WHEN en una expresión CASE, ¿qué resultado se devuelve?",
    "opciones": [
      {
        "id": "A",
        "texto": "El resultado del segundo WHEN porque sobreescribe al primero."
      },
      {
        "id": "B",
        "texto": "El resultado del primer WHEN que coincida; la evaluación de CASE se detiene inmediatamente tras encontrar el primer acierto (evaluación en cortocircuito)."
      },
      {
        "id": "C",
        "texto": "Una concatenación de ambos resultados."
      },
      {
        "id": "D",
        "texto": "Un error de ambigüedad lógica."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Las cláusulas WHEN se evalúan estrictamente en orden secuencial de arriba hacia abajo. En cuanto una condición resulta verdadera, su expresión THEN correspondiente es devuelta y el resto de los WHEN son ignorados."
  },
  {
    "id": "s1_t91",
    "categoria": "orden_paginacion",
    "titulo": "Omisión de la Cláusula ELSE en CASE",
    "pregunta": "¿Qué valor retorna una expresión CASE si ninguna de sus condiciones WHEN se cumple y se omitió la cláusula ELSE?",
    "opciones": [
      {
        "id": "A",
        "texto": "El número cero (0)."
      },
      {
        "id": "B",
        "texto": "El valor NULL."
      },
      {
        "id": "C",
        "texto": "La cadena vacía ('')."
      },
      {
        "id": "D",
        "texto": "Arroja un error en tiempo de ejecución 'Case Not Found'."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el estándar SQL, la cláusula ELSE es opcional en la expresión CASE. Si ninguna condición WHEN es satisfecha y no existe un bloque ELSE, el resultado por defecto es NULL."
  },
  {
    "id": "s1_t92",
    "categoria": "orden_paginacion",
    "titulo": "Cláusula END Obligatoria en CASE",
    "pregunta": "¿Por qué es obligatoria la palabra clave 'END' al final de una expresión CASE?",
    "opciones": [
      {
        "id": "A",
        "texto": "Para cerrar la transacción de la base de datos."
      },
      {
        "id": "B",
        "texto": "Porque delimita de manera no ambigua el final de la expresión escalar frente a otras columnas o palabras clave de la consulta."
      },
      {
        "id": "C",
        "texto": "Solo es obligatoria si hay más de tres WHEN."
      },
      {
        "id": "D",
        "texto": "Es un requisito exclusivo de SQLite."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Como CASE es una expresión que puede anidarse o estar dentro de funciones escalares, 'END' indica formalmente al analizador sintáctico dónde concluye la estructura condicional."
  },
  {
    "id": "s1_t93",
    "categoria": "orden_paginacion",
    "titulo": "Uso de CASE en Cláusula ORDER BY",
    "pregunta": "¿Es válido emplear una expresión CASE dentro de la cláusula ORDER BY para definir un orden personalizado (ej. dar prioridad a un país específico)?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, ORDER BY solo admite nombres literales de columnas físicas."
      },
      {
        "id": "B",
        "texto": "Sí, permite asignar pesos numéricos condicionales fila a fila para lograr cualquier criterio arbitrario de ordenamiento."
      },
      {
        "id": "C",
        "texto": "Solo si la tabla no tiene claves primarias."
      },
      {
        "id": "D",
        "texto": "Produce un bloqueo de tabla de larga duración."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "ORDER BY CASE WHEN pais = 'México' THEN 1 ELSE 2 END, pais ASC es una técnica estándar de la industria para forzar que ciertos registros prioritarios aparezcan en la cima de la salida."
  },
  {
    "id": "s1_t94",
    "categoria": "orden_paginacion",
    "titulo": "Diferencia entre CASE Simple y CASE Buscado",
    "pregunta": "¿En qué se diferencia 'CASE consola WHEN 'PC' THEN ...' (simple) de 'CASE WHEN precio > 20 THEN ...' (buscado)?",
    "opciones": [
      {
        "id": "A",
        "texto": "El CASE simple solo admite comparaciones de igualdad contra un valor base; el CASE buscado evalúa cualquier predicado booleano complejo independiente en cada WHEN."
      },
      {
        "id": "B",
        "texto": "El CASE simple solo funciona con números."
      },
      {
        "id": "C",
        "texto": "El CASE buscado no admite la cláusula ELSE."
      },
      {
        "id": "D",
        "texto": "Son exactamente equivalentes y no tienen distinción técnica."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "En el CASE simple se evalúa una sola expresión base contra valores puntuales de igualdad ('CASE x WHEN v1...'). En el CASE buscado, cada WHEN contiene una condición lógica arbitraria ('CASE WHEN cond1...')."
  },
  {
    "id": "s1_t95",
    "categoria": "orden_paginacion",
    "titulo": "Cláusula LIMIT con Cero Filas (LIMIT 0)",
    "pregunta": "¿Qué resultado produce la ejecución de 'SELECT * FROM clientes LIMIT 0;'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Devuelve todas las filas de la tabla sin límite."
      },
      {
        "id": "B",
        "texto": "Devuelve cero filas pero incluye la estructura de nombres de columnas proyectadas."
      },
      {
        "id": "C",
        "texto": "Arroja un error de parámetro fuera de rango."
      },
      {
        "id": "D",
        "texto": "Detiene el servicio de la base de datos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "LIMIT 0 solicita al motor un corte de 0 filas; se utiliza a menudo para verificar la validez sintáctica de la consulta y obtener metadatos de columnas con consumo mínimo de recursos."
  },
  {
    "id": "s1_t96",
    "categoria": "orden_paginacion",
    "titulo": "Sintaxis Alternativa de SQLite para Paginación (LIMIT offset, count)",
    "pregunta": "En SQLite y MySQL, ¿cómo interpreta el motor la sintaxis de dos números separados por coma: 'LIMIT 5, 10'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Equivale a LIMIT 5 OFFSET 10."
      },
      {
        "id": "B",
        "texto": "Equivale a LIMIT 10 OFFSET 5 (el primer número es el desplazamiento u OFFSET y el segundo es la cantidad máxima de filas devueltas)."
      },
      {
        "id": "C",
        "texto": "Entrega las filas 5 y 10 exclusivamente."
      },
      {
        "id": "D",
        "texto": "Arroja un error en SQLite."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Por herencia de dialectos antiguos, 'LIMIT offset, count' invierte los términos: el primer número es el OFFSET (filas a saltar) y el segundo es el LIMIT (filas a devolver). Es preferible la sintaxis estándar explícita 'LIMIT x OFFSET y'."
  },
  {
    "id": "s1_t97",
    "categoria": "orden_paginacion",
    "titulo": "Combinación de DISTINCT con ORDER BY",
    "pregunta": "Si ejecutas 'SELECT DISTINCT pais FROM clientes ORDER BY saldo_cuenta DESC;', ¿por qué algunos motores estrictos como PostgreSQL rechazan esta consulta?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque DISTINCT no se puede combinar con ORDER BY bajo ninguna circunstancia."
      },
      {
        "id": "B",
        "texto": "Porque al haber múltiples clientes del mismo país con distintos saldos, es ambiguo cuál saldo utilizar para ordenar el país único consolidado."
      },
      {
        "id": "C",
        "texto": "Porque la columna saldo_cuenta es numérica."
      },
      {
        "id": "D",
        "texto": "Porque PostgreSQL exige que los alias tengan al menos 4 caracteres."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Si un país tiene saldos de 10, 50 y 100, al aplicar DISTINCT país queda una sola fila: ordenar por 'saldo_cuenta' es ambiguo. El estándar exige que en 'SELECT DISTINCT col', cualquier columna del ORDER BY esté presente en la lista de proyección."
  },
  {
    "id": "s1_t98",
    "categoria": "orden_paginacion",
    "titulo": "Ordenamiento Alfabético de Números Almacenados como Texto",
    "pregunta": "Si una columna de texto contiene los valores '1', '10', '2', '20', ¿en qué orden específico los entrega 'ORDER BY columna ASC'?",
    "opciones": [
      {
        "id": "A",
        "texto": "'1', '2', '10', '20' (orden numérico)."
      },
      {
        "id": "B",
        "texto": "'1', '10', '2', '20' (orden lexicográfico carácter por carácter de izquierda a derecha)."
      },
      {
        "id": "C",
        "texto": "'20', '10', '2', '1'."
      },
      {
        "id": "D",
        "texto": "El motor los convierte automáticamente a enteros para ordenar."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Al ordenar tipos TEXT o VARCHAR, el motor compara carácter a carácter según la tabla ASCII: el carácter '1' precede al carácter '2', por lo que '10' se posiciona antes que '2'."
  },
  {
    "id": "s1_t99",
    "categoria": "orden_paginacion",
    "titulo": "Uso de Expresiones Aritméticas dentro de ORDER BY",
    "pregunta": "¿Es válido escribir 'ORDER BY precio * stock DESC' sin haber proyectado esa multiplicación en el SELECT?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, toda expresión usada en ORDER BY debe haber sido proyectada explícitamente en el SELECT."
      },
      {
        "id": "B",
        "texto": "Sí, el estándar SQL permite ordenar por expresiones calculadas basadas en las columnas disponibles en la cláusula FROM, aunque no aparezcan en la proyección final."
      },
      {
        "id": "C",
        "texto": "Solo si la tabla tiene menos de 10 columnas."
      },
      {
        "id": "D",
        "texto": "Solo es válido en vistas precompiladas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En consultas estándar (sin DISTINCT), la cláusula ORDER BY puede calcular expresiones sobre cualquier columna de las tablas origen para definir el ordenamiento, sin obligación de proyectarlas."
  },
  {
    "id": "s1_t100",
    "categoria": "orden_paginacion",
    "titulo": "Filtrado con Paginación: ORDER BY + LIMIT + OFFSET",
    "pregunta": "En una consulta integral con 'WHERE consola = 'PC' ORDER BY precio DESC LIMIT 3 OFFSET 3', ¿qué registros específicos se seleccionan?",
    "opciones": [
      {
        "id": "A",
        "texto": "Los 3 videojuegos de PC más caros de todo el catálogo."
      },
      {
        "id": "B",
        "texto": "Se filtran los juegos de PC, se ordenan del más caro al más barato, se descartan los 3 más caros y se entregan los 3 juegos siguientes (del 4° al 6° más caro)."
      },
      {
        "id": "C",
        "texto": "Cualquier juego entre los registros 3 y 6 de la tabla física."
      },
      {
        "id": "D",
        "texto": "Los 3 juegos más baratos de la plataforma PC."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El motor primero aplica el WHERE (solo PC), luego ordena por precio descendente (de mayor a menor costo), el OFFSET 3 salta los tres primeros registros (los 3 más caros) y el LIMIT 3 entrega las siguientes 3 tuplas (posiciones 4°, 5° y 6°)."
  }
],
  bancoPractico: [
  {
    "id": "p1",
    "titulo": "Reto Práctico 1: Clientes Activos con Alias de Columnas y Tabla (AS)",
    "descripcion": "<p class=\"challenge-goal\">Construye una consulta sobre la tabla de clientes aplicando alias explícitos y condiciones lógicas compuestas:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Tabla <code>clientes</code> con el alias de tabla <code>c</code> (<code>FROM clientes AS c</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre AS titular</code>, <code>c.apellido</code> y <code>c.saldo_cuenta AS saldo_disponible</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes activos (<code>c.activo = 1</code>), de país <code>'México'</code> o <code>'Colombia'</code>, con saldo estrictamente superior a <code>20.0</code> (<code>c.saldo_cuenta > 20.0</code>).</li><li><strong>Ordenamiento:</strong> Ordena de forma descendente por <code>saldo_disponible DESC</code>.</li></ul>",
    "queryEsperada": "SELECT c.nombre AS titular, c.apellido, c.saldo_cuenta AS saldo_disponible FROM clientes AS c WHERE c.activo = 1 AND (c.pais = 'México' OR c.pais = 'Colombia') AND c.saldo_cuenta > 20.0 ORDER BY saldo_disponible DESC;",
    "puntos": 15
  },
  {
    "id": "p2",
    "titulo": "Reto Práctico 2: Filtro de Precios y Stock sin PlayStation 4",
    "descripcion": "<p class=\"challenge-goal\">Filtra el catálogo de videojuegos combinando operadores de rango, exclusión de plataforma y existencias:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>consola</code>, <code>precio</code> y <code>stock</code>.</li><li><strong>Rango de precios:</strong> Precio entre <code>15.0</code> y <code>65.0</code> (usando <code>BETWEEN</code>).</li><li><strong>Exclusión de consola:</strong> Consola diferente a <code>'PlayStation 4'</code> (<code>consola <> 'PlayStation 4'</code>).</li><li><strong>Stock y límite:</strong> Con inventario disponible (<code>stock > 0</code>), ordenado por <code>precio DESC</code> y limitado a los <code>4</code> títulos más costosos.</li></ul>",
    "queryEsperada": "SELECT titulo, consola, precio, stock FROM videojuegos WHERE precio BETWEEN 15.0 AND 65.0 AND consola <> 'PlayStation 4' AND stock > 0 ORDER BY precio DESC LIMIT 4;",
    "puntos": 15
  },
  {
    "id": "p3",
    "titulo": "Reto Práctico 3: Búsqueda de Género con Exclusión de Desarrollador",
    "descripcion": "<p class=\"challenge-goal\">Ejecuta una búsqueda con comodines textuales para incluir un género y excluir un desarrollador específico:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>genero</code> y <code>desarrollador</code>.</li><li><strong>Búsqueda por género:</strong> Títulos cuyo género contenga la palabra <code>'Acción'</code> (usando <code>LIKE '%Acción%'</code>).</li><li><strong>Exclusión por desarrollador:</strong> Desarrolladores que no comiencen con <code>'Rockstar'</code> (usando <code>NOT LIKE 'Rockstar%'</code>).</li><li><strong>Ordenamiento:</strong> Alfabético ascendente por <code>titulo ASC</code>.</li></ul>",
    "queryEsperada": "SELECT titulo, genero, desarrollador FROM videojuegos WHERE genero LIKE '%Acción%' AND desarrollador NOT LIKE 'Rockstar%' ORDER BY titulo ASC;",
    "puntos": 15
  },
  {
    "id": "p4",
    "titulo": "Reto Práctico 4: Paginación y Categorización de Precios con CASE",
    "descripcion": "<p class=\"challenge-goal\">Crea una consulta con expresión condicional CASE y paginación con salto de registros:</p><ul class=\"challenge-req-list\"><li><strong>Filtro de consolas:</strong> Videojuegos para <code>'PC'</code> o <code>'Nintendo Switch'</code> (usando <code>IN</code>).</li><li><strong>Expresión CASE:</strong> Columna calculada con alias <code>clasificacion_precio</code> evaluando:<br>• Si <code>precio < 20.0</code> devolverá <code>'Económico'</code><br>• Si <code>precio BETWEEN 20.0 AND 50.0</code> devolverá <code>'Medio'</code><br>• En cualquier otro caso devolverá <code>'Alto'</code></li><li><strong>Paginación:</strong> Ordena por <code>precio DESC</code> y obtén los <code>5</code> registros de la segunda página (usando <code>LIMIT 5 OFFSET 5</code>).</li></ul>",
    "queryEsperada": "SELECT titulo, precio, CASE WHEN precio < 20.0 THEN 'Económico' WHEN precio BETWEEN 20.0 AND 50.0 THEN 'Medio' ELSE 'Alto' END AS clasificacion_precio FROM videojuegos WHERE consola IN ('PC', 'Nintendo Switch') ORDER BY precio DESC LIMIT 5 OFFSET 5;",
    "puntos": 15
  },
  {
    "id": "p5",
    "titulo": "Reto Práctico 5: Directorio de Clientes con Concatenación y Filtro IN",
    "descripcion": "<p class=\"challenge-goal\">Genera un directorio formateado de clientes en países seleccionados con saldos relevantes:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>id AS clave_cliente</code>, concatenación de nombre y apellido separados por espacio con alias <code>nombre_completo</code> (<code>nombre || ' ' || apellido AS nombre_completo</code>), <code>pais</code> y <code>saldo_cuenta</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes pertenecientes a <code>'España'</code>, <code>'Argentina'</code> o <code>'Chile'</code> (usando <code>IN</code>) y con <code>saldo_cuenta >= 50.0</code>.</li><li><strong>Ordenamiento:</strong> Ordena ascendentemente por <code>pais ASC</code> y en caso de empate, de mayor a menor por <code>saldo_cuenta DESC</code>.</li></ul>",
    "queryEsperada": "SELECT id AS clave_cliente, nombre || ' ' || apellido AS nombre_completo, pais, saldo_cuenta FROM clientes WHERE pais IN ('España', 'Argentina', 'Chile') AND saldo_cuenta >= 50.0 ORDER BY pais ASC, saldo_cuenta DESC;",
    "puntos": 15
  },
  {
    "id": "p6",
    "titulo": "Reto Práctico 6: Valorización de Inventario en Consolas de Nueva Generación",
    "descripcion": "<p class=\"challenge-goal\">Calcula el capital inmovilizado en existencias para plataformas líderes:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>consola</code>, <code>precio</code>, <code>stock</code> y el cálculo redondeado <code>ROUND(precio * stock, 2) AS valor_inventario</code>.</li><li><strong>Filtros obligatorios:</strong> Con existencias en inventario (<code>stock > 0</code>) y cuya plataforma sea <code>'PC'</code> o <code>'PlayStation 5'</code>.</li><li><strong>Ordenamiento y límite:</strong> Ordena de forma descendente por <code>valor_inventario DESC</code> y limita el resultado a los <code>6</code> primeros juegos.</li></ul>",
    "queryEsperada": "SELECT titulo, consola, precio, stock, ROUND(precio * stock, 2) AS valor_inventario FROM videojuegos WHERE stock > 0 AND (consola = 'PC' OR consola = 'PlayStation 5') ORDER BY valor_inventario DESC LIMIT 6;",
    "puntos": 15
  },
  {
    "id": "p7",
    "titulo": "Reto Práctico 7: Cobertura Geográfica de Clientes Activos con DISTINCT",
    "descripcion": "<p class=\"challenge-goal\">Obtén el listado único y consolidado de países con presencia de usuarios habilitados:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>DISTINCT pais</code>.</li><li><strong>Filtro obligatorio:</strong> Únicamente clientes que estén activos en el sistema (<code>activo = 1</code>).</li><li><strong>Ordenamiento:</strong> Alfabético ascendente por <code>pais ASC</code>.</li></ul>",
    "queryEsperada": "SELECT DISTINCT pais FROM clientes WHERE activo = 1 ORDER BY pais ASC;",
    "puntos": 15
  },
  {
    "id": "p8",
    "titulo": "Reto Práctico 8: Joyas de la Crítica con Precio Accesible o Sello Nintendo",
    "descripcion": "<p class=\"challenge-goal\">Identifica videojuegos aclamados por la crítica que cumplan criterios económicos o de desarrollo específico:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>calificacion</code>, <code>precio</code> y <code>desarrollador</code>.</li><li><strong>Filtros obligatorios:</strong> Calificación sobresaliente (<code>calificacion >= 9.0</code>) Y que satisfaga al menos una de estas dos condiciones: precio menor a 30 (<code>precio < 30.0</code>) O desarrollado por <code>'Nintendo'</code>.</li><li><strong>Ordenamiento:</strong> De mayor a menor por <code>calificacion DESC</code> y secundariamente por <code>precio ASC</code>.</li></ul>",
    "queryEsperada": "SELECT titulo, calificacion, precio, desarrollador FROM videojuegos WHERE calificacion >= 9.0 AND (precio < 30.0 OR desarrollador = 'Nintendo') ORDER BY calificacion DESC, precio ASC;",
    "puntos": 15
  },
  {
    "id": "p9",
    "titulo": "Reto Práctico 9: Auditoría de Cuentas Recientes Inactivas o sin Saldo",
    "descripcion": "<p class=\"challenge-goal\">Localiza registros recientes que demandan atención por saldo en cero o cuenta suspendida:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>nombre</code>, <code>email</code>, <code>fecha_registro</code> y <code>saldo_cuenta</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes registrados a partir del año 2022 (<code>fecha_registro >= '2022-01-01'</code>) que además cumplan que su saldo sea cero (<code>saldo_cuenta = 0.0</code>) O estén inactivos (<code>activo = 0</code>).</li><li><strong>Ordenamiento:</strong> De más reciente a más antiguo por <code>fecha_registro DESC</code>.</li></ul>",
    "queryEsperada": "SELECT nombre, email, fecha_registro, saldo_cuenta FROM clientes WHERE fecha_registro >= '2022-01-01' AND (saldo_cuenta = 0.0 OR activo = 0) ORDER BY fecha_registro DESC;",
    "puntos": 15
  },
  {
    "id": "p10",
    "titulo": "Reto Práctico 10: Matriz Única de Géneros y Plataformas Económicas",
    "descripcion": "<p class=\"challenge-goal\">Genera una matriz de combinaciones sin duplicados para títulos con precio módico:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> Tuplas sin duplicados de <code>DISTINCT genero, consola</code>.</li><li><strong>Filtro obligatorio:</strong> Videojuegos con precio menor o igual a 40 (<code>precio <= 40.0</code>).</li><li><strong>Ordenamiento:</strong> Alfabético por <code>genero ASC</code> y secundariamente por <code>consola ASC</code>.</li></ul>",
    "queryEsperada": "SELECT DISTINCT genero, consola FROM videojuegos WHERE precio <= 40.0 ORDER BY genero ASC, consola ASC;",
    "puntos": 15
  },
  {
    "id": "p11",
    "titulo": "Reto Práctico 11: Simulación de Descuento en Títulos Modernos sin RPG",
    "descripcion": "<p class=\"challenge-goal\">Proyecta una campaña promocional del 15% de descuento sobre lanzamientos modernos no pertenecientes al género RPG:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>precio</code>, el precio con descuento redondeado <code>ROUND(precio * 0.85, 2) AS precio_oferta</code> y <code>genero</code>.</li><li><strong>Filtros obligatorios:</strong> Lanzados entre 2020 y 2023 (usando <code>año_lanzamiento IN (2020, 2021, 2022, 2023)</code>) y cuyo género NO contenga 'RPG' (<code>genero NOT LIKE '%RPG%'</code>).</li><li><strong>Ordenamiento y límite:</strong> Ordena por <code>precio_oferta DESC</code> y limita a los <code>5</code> primeros.</li></ul>",
    "queryEsperada": "SELECT titulo, precio, ROUND(precio * 0.85, 2) AS precio_oferta, genero FROM videojuegos WHERE año_lanzamiento IN (2020, 2021, 2022, 2023) AND genero NOT LIKE '%RPG%' ORDER BY precio_oferta DESC LIMIT 5;",
    "puntos": 15
  },
  {
    "id": "p12",
    "titulo": "Reto Práctico 12: Búsqueda de Clientes por Inicial y Dominio de Correo",
    "descripcion": "<p class=\"challenge-goal\">Filtra usuarios específicos combinando coincidencia de subcadenas y comodines iniciales:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Tabla <code>clientes AS c</code>.</li><li><strong>Columnas proyectadas:</strong> <code>c.id AS id_cliente</code>, <code>c.nombre</code>, <code>c.apellido</code> y <code>c.email</code>.</li><li><strong>Filtros obligatorios:</strong> Correo que finalice en <code>'@email.com'</code> (usando <code>LIKE '%@email.com'</code>) y cuyo nombre empiece con la letra <code>'M'</code> o con la letra <code>'L'</code> (usando <code>c.nombre LIKE 'M%' OR c.nombre LIKE 'L%'</code>).</li><li><strong>Ordenamiento:</strong> Alfabético por <code>c.nombre ASC</code>.</li></ul>",
    "queryEsperada": "SELECT c.id AS id_cliente, c.nombre, c.apellido, c.email FROM clientes AS c WHERE c.email LIKE '%@email.com' AND (c.nombre LIKE 'M%' OR c.nombre LIKE 'L%') ORDER BY c.nombre ASC;",
    "puntos": 15
  },
  {
    "id": "p13",
    "titulo": "Reto Práctico 13: Semáforo de Existencias para Títulos de Consola con CASE",
    "descripcion": "<p class=\"challenge-goal\">Etiqueta la disponibilidad en bodega excluyendo la plataforma PC mediante lógica condicional CASE:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>consola</code>, <code>stock</code> y expresión con alias <code>estado_stock</code> evaluando:<br>• Si <code>stock = 0</code> retorna <code>'Agotado'</code><br>• Si <code>stock <= 15</code> retorna <code>'Crítico'</code><br>• En cualquier otro caso retorna <code>'Suficiente'</code></li><li><strong>Filtro obligatorio:</strong> Consola diferente de <code>'PC'</code> (<code>consola <> 'PC'</code>).</li><li><strong>Ordenamiento:</strong> De menor a mayor por <code>stock ASC</code> y alfabético por <code>titulo ASC</code>.</li></ul>",
    "queryEsperada": "SELECT titulo, consola, stock, CASE WHEN stock = 0 THEN 'Agotado' WHEN stock <= 15 THEN 'Crítico' ELSE 'Suficiente' END AS estado_stock FROM videojuegos WHERE consola <> 'PC' ORDER BY stock ASC, titulo ASC;",
    "puntos": 15
  },
  {
    "id": "p14",
    "titulo": "Reto Práctico 14: Desarrolladores de Élite en la Franja Media de Precios",
    "descripcion": "<p class=\"challenge-goal\">Aísla a los estudios de desarrollo de primer nivel que mantienen precios comerciales moderados:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>DISTINCT desarrollador</code>.</li><li><strong>Filtros obligatorios:</strong> Calificación estrictamente superior a 9.0 (<code>calificacion > 9.0</code>) y precio comprendido entre <code>20.0</code> y <code>60.0</code> (usando <code>BETWEEN 20.0 AND 60.0</code>).</li><li><strong>Ordenamiento:</strong> Alfabético ascendente por <code>desarrollador ASC</code>.</li></ul>",
    "queryEsperada": "SELECT DISTINCT desarrollador FROM videojuegos WHERE calificacion > 9.0 AND precio BETWEEN 20.0 AND 60.0 ORDER BY desarrollador ASC;",
    "puntos": 15
  },
  {
    "id": "p15",
    "titulo": "Reto Práctico 15: Segmentación de Clientes Activos con Paginación y Rangos",
    "descripcion": "<p class=\"challenge-goal\">Segmenta la cartera de clientes activos clasificando su poder adquisitivo y extrayendo un bloque específico:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>id</code>, <code>nombre</code>, <code>apellido</code>, <code>saldo_cuenta</code> y expresión con alias <code>categoria_cliente</code>:<br>• Saldo >= 100.0 $\\to$ <code>'VIP'</code><br>• Saldo >= 20.0 $\\to$ <code>'Regular'</code><br>• Resto $\\to$ <code>'Básico'</code></li><li><strong>Filtro obligatorio:</strong> Clientes activos (<code>activo = 1</code>).</li><li><strong>Ordenamiento y paginación:</strong> Ordena de mayor a menor por <code>saldo_cuenta DESC</code> y toma <code>8</code> registros omitiendo los primeros <code>2</code> (usando <code>LIMIT 8 OFFSET 2</code>).</li></ul>",
    "queryEsperada": "SELECT id, nombre, apellido, saldo_cuenta, CASE WHEN saldo_cuenta >= 100.0 THEN 'VIP' WHEN saldo_cuenta >= 20.0 THEN 'Regular' ELSE 'Básico' END AS categoria_cliente FROM clientes WHERE activo = 1 ORDER BY saldo_cuenta DESC LIMIT 8 OFFSET 2;",
    "puntos": 15
  },
  {
    "id": "p16",
    "titulo": "Reto Práctico 16: Catálogo Retrospectivo o de Calificación Moderada",
    "descripcion": "<p class=\"challenge-goal\">Filtra títulos que representen lanzamientos antiguos o calificaciones no superlativas con existencias suficientes:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>genero</code>, <code>calificacion</code> y <code>año_lanzamiento</code>.</li><li><strong>Filtros obligatorios:</strong> Lanzados antes del 2020 (<code>año_lanzamiento < 2020</code>) O con calificación inferior a 9.0 (<code>calificacion < 9.0</code>), requiriendo de forma obligatoria que tengan más de 10 unidades en stock (<code>stock > 10</code>).</li><li><strong>Ordenamiento:</strong> Cronológico por <code>año_lanzamiento ASC</code> y desempate por <code>calificacion DESC</code>.</li></ul>",
    "queryEsperada": "SELECT titulo, genero, calificacion, año_lanzamiento FROM videojuegos WHERE (año_lanzamiento < 2020 OR calificacion < 9.0) AND stock > 10 ORDER BY año_lanzamiento ASC, calificacion DESC;",
    "puntos": 15
  },
  {
    "id": "p17",
    "titulo": "Reto Práctico 17: Residencia Externa de Clientes con Saldo Positivo",
    "descripcion": "<p class=\"challenge-goal\">Excluye los mercados principales para concentrar la visualización en clientes de otras regiones:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> Expresión combinada <code>nombre || ' (' || pais || ')' AS cliente_residencia</code>, <code>saldo_cuenta</code> y <code>fecha_registro</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes que NO residan en México ni en España (usando <code>pais NOT IN ('México', 'España')</code>) y que cuenten con saldo a favor (<code>saldo_cuenta > 0.0</code>).</li><li><strong>Ordenamiento:</strong> De mayor a menor por <code>saldo_cuenta DESC</code>.</li></ul>",
    "queryEsperada": "SELECT nombre || ' (' || pais || ')' AS cliente_residencia, saldo_cuenta, fecha_registro FROM clientes WHERE pais NOT IN ('México', 'España') AND saldo_cuenta > 0.0 ORDER BY saldo_cuenta DESC;",
    "puntos": 15
  },
  {
    "id": "p18",
    "titulo": "Reto Práctico 18: Títulos con Artículo Definido en Rango de Precio Estándar",
    "descripcion": "<p class=\"challenge-goal\">Localiza videojuegos cuyo título contenga el artículo en inglés 'The' dentro de un rango de costo determinado:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>desarrollador</code> y <code>precio</code>.</li><li><strong>Filtros obligatorios:</strong> Título que contenga la palabra <code>'The'</code> (usando <code>LIKE '%The%'</code>) y con precio entre <code>10.0</code> y <code>70.0</code> (usando <code>BETWEEN 10.0 AND 70.0</code>).</li><li><strong>Ordenamiento:</strong> De menor a mayor por <code>precio ASC</code>.</li></ul>",
    "queryEsperada": "SELECT titulo, desarrollador, precio FROM videojuegos WHERE titulo LIKE '%The%' AND precio BETWEEN 10.0 AND 70.0 ORDER BY precio ASC;",
    "puntos": 15
  },
  {
    "id": "p19",
    "titulo": "Reto Práctico 19: Disyunción Compuesta de Clientes de Alto Patrimonio por Región",
    "descripcion": "<p class=\"challenge-goal\">Filtra usuarios según umbrales financieros diferenciados por país:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Tabla <code>clientes AS c</code>.</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>c.pais</code> y <code>c.saldo_cuenta</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes de México con saldo mayor a 100 (<code>c.pais = 'México' AND c.saldo_cuenta > 100.0</code>) O clientes de España con saldo mayor a 50 (<code>c.pais = 'España' AND c.saldo_cuenta > 50.0</code>).</li><li><strong>Ordenamiento:</strong> De mayor a menor saldo por <code>c.saldo_cuenta DESC</code>.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.pais, c.saldo_cuenta FROM clientes AS c WHERE (c.pais = 'México' AND c.saldo_cuenta > 100.0) OR (c.pais = 'España' AND c.saldo_cuenta > 50.0) ORDER BY c.saldo_cuenta DESC;",
    "puntos": 15
  },
  {
    "id": "p20",
    "titulo": "Reto Práctico 20: Títulos de Acción con Stock Controlado",
    "descripcion": "<p class=\"challenge-goal\">Filtra los videojuegos vinculados a la categoría de acción con inventario acotado:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>consola</code>, <code>precio</code> y <code>stock</code>.</li><li><strong>Filtros obligatorios:</strong> Género perteneciente a <code>'Acción'</code>, <code>'Acción RPG'</code> o <code>'Acción Aventura'</code> (usando <code>IN</code>) y con existencias entre <code>5</code> y <code>50</code> unidades (usando <code>BETWEEN 5 AND 50</code>).</li><li><strong>Ordenamiento y límite:</strong> Ordena por <code>precio DESC</code>, desempata por <code>stock ASC</code> y limita a <code>5</code> tuplas.</li></ul>",
    "queryEsperada": "SELECT titulo, consola, precio, stock FROM videojuegos WHERE genero IN ('Acción', 'Acción RPG', 'Acción Aventura') AND stock BETWEEN 5 AND 50 ORDER BY precio DESC, stock ASC LIMIT 5;",
    "puntos": 15
  },
  {
    "id": "p21",
    "titulo": "Reto Práctico 21: Estado de Cuenta y Exclusión de Iniciales de Correo",
    "descripcion": "<p class=\"challenge-goal\">Genera un listado de clientes excluyendo correos que comiencen con determinadas letras:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>nombre</code>, <code>email</code>, <code>saldo_cuenta</code> y expresión con alias <code>estado_cuenta</code>:<br>• Si <code>activo = 1</code> $\\to$ <code>'Habilitado'</code><br>• Si no $\\to$ <code>'Suspendido'</code></li><li><strong>Filtros obligatorios:</strong> Correo que NO empiece con 'a' (<code>email NOT LIKE 'a%'</code>) Y que tampoco empiece con 'j' (<code>email NOT LIKE 'j%'</code>).</li><li><strong>Ordenamiento:</strong> Alfabético por <code>apellido ASC</code>.</li></ul>",
    "queryEsperada": "SELECT nombre, email, saldo_cuenta, CASE WHEN activo = 1 THEN 'Habilitado' ELSE 'Suspendido' END AS estado_cuenta FROM clientes WHERE email NOT LIKE 'a%' AND email NOT LIKE 'j%' ORDER BY apellido ASC;",
    "puntos": 15
  },
  {
    "id": "p22",
    "titulo": "Reto Práctico 22: Consolas con Catálogo Moderno de Precio Estándar",
    "descripcion": "<p class=\"challenge-goal\">Obtén las plataformas que poseen juegos modernos que superen el umbral comercial base:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>DISTINCT consola</code>.</li><li><strong>Filtros obligatorios:</strong> Títulos con año de lanzamiento a partir de 2020 (<code>año_lanzamiento >= 2020</code>) y con precio igual o mayor a 30 (<code>precio >= 30.0</code>).</li><li><strong>Ordenamiento:</strong> Alfabético ascendente por <code>consola ASC</code>.</li></ul>",
    "queryEsperada": "SELECT DISTINCT consola FROM videojuegos WHERE año_lanzamiento >= 2020 AND precio >= 30.0 ORDER BY consola ASC;",
    "puntos": 15
  },
  {
    "id": "p23",
    "titulo": "Reto Práctico 23: Cálculo Fiscal y Paginación en Plataformas Seleccionadas",
    "descripcion": "<p class=\"challenge-goal\">Calcula el importe impositivo (IVA del 16%) y extrae una franja paginada de resultados:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>calificacion</code>, <code>stock</code> y el cálculo redondeado <code>ROUND(precio * 1.16, 2) AS precio_con_iva</code>.</li><li><strong>Filtros obligatorios:</strong> Consola <code>'Nintendo Switch'</code> o <code>'PC'</code> y con existencias disponibles (<code>stock > 0</code>).</li><li><strong>Ordenamiento y paginación:</strong> Ordena por <code>precio_con_iva DESC</code> y extrae <code>7</code> registros saltando los primeros <code>3</code> (usando <code>LIMIT 7 OFFSET 3</code>).</li></ul>",
    "queryEsperada": "SELECT titulo, calificacion, stock, ROUND(precio * 1.16, 2) AS precio_con_iva FROM videojuegos WHERE (consola = 'Nintendo Switch' OR consola = 'PC') AND stock > 0 ORDER BY precio_con_iva DESC LIMIT 7 OFFSET 3;",
    "puntos": 15
  },
  {
    "id": "p24",
    "titulo": "Reto Práctico 24: Segmentación por Exclusión de Rango Salarial Medio",
    "descripcion": "<p class=\"challenge-goal\">Aísla clientes con saldos extremos (muy bajos o muy altos) usando NOT BETWEEN:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Tabla <code>clientes AS c</code>.</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre AS nombre_usuario</code>, <code>c.pais AS pais_origen</code> y <code>c.saldo_cuenta</code>.</li><li><strong>Filtro obligatorio:</strong> Saldo fuera del intervalo medio de 10.0 a 100.0 (usando <code>c.saldo_cuenta NOT BETWEEN 10.0 AND 100.0</code>).</li><li><strong>Ordenamiento:</strong> De mayor a menor por <code>c.saldo_cuenta DESC</code>.</li></ul>",
    "queryEsperada": "SELECT c.nombre AS nombre_usuario, c.pais AS pais_origen, c.saldo_cuenta FROM clientes AS c WHERE c.saldo_cuenta NOT BETWEEN 10.0 AND 100.0 ORDER BY c.saldo_cuenta DESC;",
    "puntos": 15
  },
  {
    "id": "p25",
    "titulo": "Reto Práctico 25: Distinción Editorial de Videojuegos Asequibles",
    "descripcion": "<p class=\"challenge-goal\">Aplica una clasificación editorial condicional según la crítica sobre títulos de precio contenido:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>titulo</code>, <code>consola</code>, <code>calificacion</code> y columna calculada con alias <code>distincion</code> evaluando:<br>• Calificación >= 9.5 $\\to$ <code>'Obra Maestra'</code><br>• Calificación >= 9.0 $\\to$ <code>'Excelente'</code><br>• Cualquier otra $\\to$ <code>'Recomendado'</code></li><li><strong>Filtros obligatorios:</strong> Precio menor o igual a 50.0 (<code>precio <= 50.0</code>) y con existencias disponibles (<code>stock > 0</code>).</li><li><strong>Ordenamiento y límite:</strong> De mayor a menor calificación por <code>calificacion DESC</code>, alfabético por <code>titulo ASC</code> y limitado a los <code>6</code> primeros títulos.</li></ul>",
    "queryEsperada": "SELECT titulo, consola, calificacion, CASE WHEN calificacion >= 9.5 THEN 'Obra Maestra' WHEN calificacion >= 9.0 THEN 'Excelente' ELSE 'Recomendado' END AS distincion FROM videojuegos WHERE precio <= 50.0 AND stock > 0 ORDER BY calificacion DESC, titulo ASC LIMIT 6;",
    "puntos": 15
  }
]
};

const BANCO_EXAMEN_SECCION_2 = {
  id: "banco-seccion-2",
  seccionId: 2,
  titulo: "Examen de Certificación - Sección 2: Combinación de Tablas (JOINs) y Manejo de NULL",
  descripcion: "Evaluación rigurosa de <strong>8 preguntas conceptuales (40 pts)</strong> y <strong>4 retos prácticos (60 pts)</strong> seleccionados aleatoriamente de un banco de <strong>125 reactivos</strong> sobre INNER, LEFT, RIGHT, FULL OUTER y NULL. Aprobación: <strong>70%</strong>.",
  categorias: ["inner_join", "outer_join_asimetrico", "outer_join_bilateral", "funciones_null"],
  bancoTeorico: [
  {
    "id": "s2_t1",
    "categoria": "inner_join",
    "titulo": "Definición Formal del INNER JOIN Relacional",
    "pregunta": "¿Qué operación matemática de la teoría de conjuntos representa conceptualmente un INNER JOIN entre dos tablas A y B?",
    "opciones": [
      {
        "id": "A",
        "texto": "La unión disjunta (A ∪ B) de todas las tuplas de ambas tablas."
      },
      {
        "id": "B",
        "texto": "La intersección relacional (A ∩ B) de tuplas que satisfacen simultáneamente el predicado de enlace especificado."
      },
      {
        "id": "C",
        "texto": "La diferencia de conjuntos (A - B)."
      },
      {
        "id": "D",
        "texto": "La partición horizontal de atributos comunes."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El INNER JOIN entrega únicamente las tuplas coincidentes de ambas relaciones para las cuales el predicado de unión (cláusula ON) se evalúa como verdadero (intersección relacional)."
  },
  {
    "id": "s2_t2",
    "categoria": "inner_join",
    "titulo": "Semántica de la Cláusula ON",
    "pregunta": "¿Cuál es la función técnica estricta de la cláusula ON en un INNER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Crear un índice temporal en disco para acelerar la consulta."
      },
      {
        "id": "B",
        "texto": "Establecer la condición relacional booleana que determina qué filas de la tabla izquierda se emparejan con cuáles de la derecha."
      },
      {
        "id": "C",
        "texto": "Reemplazar los valores nulos con ceros."
      },
      {
        "id": "D",
        "texto": "Limitar el número máximo de columnas proyectadas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La cláusula ON define el predicado de cruce; solo las parejas de filas donde la expresión lógica en ON resulta ser TRUE se incluyen en la relación intermedia combinada."
  },
  {
    "id": "s2_t3",
    "categoria": "inner_join",
    "titulo": "Comportamiento de Claves Foráneas con NULL en INNER JOIN",
    "pregunta": "Si la tabla 'ventas' contiene una fila con 'cliente_id' en NULL, ¿aparece esa venta al ejecutar 'clientes c INNER JOIN ventas v ON c.id = v.cliente_id'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Sí, se empareja con la fila de clientes donde el id sea 0."
      },
      {
        "id": "B",
        "texto": "No, porque 'c.id = NULL' evalúa a UNKNOWN y el INNER JOIN descarta todas las filas sin coincidencia verdadera."
      },
      {
        "id": "C",
        "texto": "Sí, el motor le asigna aleatoriamente un cliente existente."
      },
      {
        "id": "D",
        "texto": "Arroja un error fatal de violación de clave foránea en tiempo de consulta."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL, la comparación escalar con NULL nunca resulta verdadera ('id = NULL' $\\to$ UNKNOWN). Por ende, cualquier clave foránea nula es excluida automáticamente en un INNER JOIN."
  },
  {
    "id": "s2_t4",
    "categoria": "inner_join",
    "titulo": "JOIN Implícito (Sintaxis Antigua ANSI-89) vs Explícito (ANSI-92)",
    "pregunta": "¿Cuál es el riesgo principal de usar la sintaxis implícita 'FROM clientes c, ventas v WHERE c.id = v.cliente_id' en lugar de INNER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Que el motor SQL cobra el doble de memoria RAM por cada consulta."
      },
      {
        "id": "B",
        "texto": "Que si el desarrollador olvida accidentalmente la condición en el WHERE, la consulta se transforma silenciosamente en un CROSS JOIN masivo sin advertencia."
      },
      {
        "id": "C",
        "texto": "Que SQLite bloquea las consultas separadas por comas."
      },
      {
        "id": "D",
        "texto": "Que no permite proyectar columnas de texto."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En la sintaxis implícita antigua, la condición de unión se mezcla con los filtros en WHERE. Si se omite la condición de enlace por descuido, se genera un producto cartesiano completo involuntario."
  },
  {
    "id": "s2_t5",
    "categoria": "inner_join",
    "titulo": "Ambigüedad de Nombres de Columna y Calificación con Alias",
    "pregunta": "Si tanto 'clientes' como 'videojuegos' tienen una columna llamada 'id', ¿por qué 'SELECT id FROM clientes c JOIN ventas v ON c.id = v.cliente_id' produce un error?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque las columnas llamadas 'id' están protegidas contra lectura."
      },
      {
        "id": "B",
        "texto": "Porque el nombre 'id' es ambiguo en la proyección; el motor exige calificarlo explícitamente como 'c.id' o 'v.cliente_id'."
      },
      {
        "id": "C",
        "texto": "Porque solo se pueden proyectar columnas de texto en un JOIN."
      },
      {
        "id": "D",
        "texto": "Porque se debe renombrar la columna física en disco antes de consultar."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Cuando dos o más tablas en el FROM comparten un nombre de atributo idéntico, el analizador semántico exige calificar la columna (tabla.columna o alias.columna) para resolver la ambigüedad."
  },
  {
    "id": "s2_t6",
    "categoria": "inner_join",
    "titulo": "Encadenamiento de Múltiples INNER JOINs",
    "pregunta": "En una consulta que une 3 tablas: 'clientes c JOIN ventas v ON c.id = v.cliente_id JOIN videojuegos j ON v.videojuego_id = j.id', ¿cómo opera el enlace?",
    "opciones": [
      {
        "id": "A",
        "texto": "Las tres tablas se combinan en paralelo dividiendo el conjunto por 3."
      },
      {
        "id": "B",
        "texto": "Se evalúa secuencialmente: primero se unen 'clientes' y 'ventas', y la relación resultante intermedia se une con 'videojuegos' mediante la segunda cláusula ON."
      },
      {
        "id": "C",
        "texto": "Falla porque SQL solo admite unir un máximo de 2 tablas por sentencia."
      },
      {
        "id": "D",
        "texto": "La tabla del centro ('ventas') se borra tras el enlace."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Los joins se procesan de forma asociativa por pares de relaciones: el resultado del primer JOIN actúa como una relación virtual que es alimentada al siguiente JOIN."
  },
  {
    "id": "s2_t7",
    "categoria": "inner_join",
    "titulo": "Multiplicación de Filas por Claves Duplicadas (Cardinalidad N a M)",
    "pregunta": "Si un cliente con id = 1 tiene 5 ventas asociadas en la tabla 'ventas', ¿cuántas filas generará ese cliente en un INNER JOIN entre clientes y ventas?",
    "opciones": [
      {
        "id": "A",
        "texto": "Exactamente 1 fila con las 5 ventas colapsadas en una lista."
      },
      {
        "id": "B",
        "texto": "Exactamente 5 filas, donde los datos del cliente se repiten en cada una de sus transacciones."
      },
      {
        "id": "C",
        "texto": "Cero filas, los duplicados son descartados automáticamente."
      },
      {
        "id": "D",
        "texto": "Arroja un error de integridad relacional."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En una relación 1 a N, cada coincidencia en la tabla foránea genera una nueva tupla en el resultado, multiplicando la fila de la entidad primaria por la cantidad de filas asociadas."
  },
  {
    "id": "s2_t8",
    "categoria": "inner_join",
    "titulo": "Cláusula USING frente a Cláusula ON",
    "pregunta": "¿Bajo qué condición específica es válido emplear 'JOIN tabla USING (columna)' en lugar de 'ON t1.columna = t2.columna'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente cuando ambas columnas tienen nombres estrictamente idénticos en las dos tablas participantes."
      },
      {
        "id": "B",
        "texto": "Siempre, USING es un reemplazo universal de ON sin restricciones de nombres."
      },
      {
        "id": "C",
        "texto": "Solo si la columna es de tipo fecha."
      },
      {
        "id": "D",
        "texto": "Solo cuando la tabla derecha tiene menos de 10 filas."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "La cláusula estándar 'USING (col)' es un atajo sintáctico aplicable exclusivamente cuando el atributo de enlace posee exactamente el mismo nombre en ambas tablas (y además consolida la columna en la proyección)."
  },
  {
    "id": "s2_t9",
    "categoria": "inner_join",
    "titulo": "Joins No Igualitarios (Non-Equi Joins)",
    "pregunta": "¿Es válido en SQL escribir una cláusula ON que emplee operadores distintos al signo de igual (ej. 'ON v.fecha_venta >= c.fecha_registro')?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, las condiciones de enlace en ON exigen estrictamente el operador de igualdad (=)."
      },
      {
        "id": "B",
        "texto": "Sí, la cláusula ON acepta cualquier predicado booleano relacional válido (>=, <, BETWEEN, LIKE), conocido como Non-Equi Join."
      },
      {
        "id": "C",
        "texto": "Solo si se ejecuta dentro de un procedimiento almacenado."
      },
      {
        "id": "D",
        "texto": "Solo si ambas columnas son de tipo INTEGER."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Aunque la gran mayoría de joins son de igualdad (Equi-Joins), el estándar relacional permite cualquier expresión booleana en el ON, muy común para rangos de fechas o escalas salariales."
  },
  {
    "id": "s2_t10",
    "categoria": "inner_join",
    "titulo": "Concepto y Mecánica del Self-Join",
    "pregunta": "¿Qué es un 'Self-Join' y cuál es su requisito sintáctico mandatario?",
    "opciones": [
      {
        "id": "A",
        "texto": "Es un join automático sin escribir código; no tiene requisitos."
      },
      {
        "id": "B",
        "texto": "Es la unión de una tabla consigo misma, y exige de forma obligatoria el uso de alias de tabla distintos para diferenciar ambas instancias."
      },
      {
        "id": "C",
        "texto": "Es un join que solo devuelve la clave primaria."
      },
      {
        "id": "D",
        "texto": "Es una función exclusiva de bases de datos NoSQL."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Un Self-Join permite relacionar registros de la misma tabla (ej. empleados con sus jefes o comparaciones entre filas hermanas). Requiere asignar alias diferenciados (ej. FROM empleados e1 JOIN empleados e2)."
  },
  {
    "id": "s2_t11",
    "categoria": "inner_join",
    "titulo": "Impacto de Índices en Claves Foráneas para INNER JOIN",
    "pregunta": "¿Por qué los administradores de bases de datos indexan sistemáticamente las columnas de clave foránea (como 'cliente_id' en ventas)?",
    "opciones": [
      {
        "id": "A",
        "texto": "Para impedir que se inserten números negativos."
      },
      {
        "id": "B",
        "texto": "Para que el motor resuelva el emparejamiento del JOIN mediante búsquedas rápidas en el árbol B-Tree sin tener que escanear la tabla foránea completa fila por fila."
      },
      {
        "id": "C",
        "texto": "Para convertir los JOINs en vistas estáticas."
      },
      {
        "id": "D",
        "texto": "Porque SQLite exige índices obligatorios en toda columna foránea para poder iniciar."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Sin un índice en la clave foránea, cada tupla de la tabla izquierda requeriría un escaneo completo de la tabla derecha (Nested Loop Scan), elevando la complejidad temporal a $O(M \\times N)$."
  },
  {
    "id": "s2_t12",
    "categoria": "inner_join",
    "titulo": "Filtrado en ON vs Filtrado en WHERE en INNER JOIN",
    "pregunta": "En un INNER JOIN, ¿existe diferencia en el conjunto de resultados final si colocas una condición adicional (ej. 'v.metodo_pago = 'Tarjeta'') en la cláusula ON frente a colocarla en la cláusula WHERE?",
    "opciones": [
      {
        "id": "A",
        "texto": "Sí, en el ON devuelve filas adicionales con valores nulos."
      },
      {
        "id": "B",
        "texto": "No, en un INNER JOIN estricto el resultado final de filas es lógicamente idéntico, ya que ambas condiciones actúan como filtros conjuntivos obligatorios."
      },
      {
        "id": "C",
        "texto": "Sí, colocarla en el ON arroja un error de sintaxis en SQLite."
      },
      {
        "id": "D",
        "texto": "Sí, en el WHERE se ignoran las claves foráneas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "A diferencia de las uniones externas (LEFT/RIGHT JOIN), en un INNER JOIN la cláusula ON y la cláusula WHERE son semánticamente equivalentes para el filtrado: ambas descartan tuplas que no cumplan la condición."
  },
  {
    "id": "s2_t13",
    "categoria": "inner_join",
    "titulo": "Diferencia entre JOIN y UNION",
    "pregunta": "¿Cuál es la distinción arquitectónica fundamental entre la operación JOIN y la operación UNION en SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "JOIN combina tablas horizontalmente (añadiendo columnas); UNION combina consultas verticalmente (añadiendo filas)."
      },
      {
        "id": "B",
        "texto": "JOIN combina verticalmente; UNION combina horizontalmente."
      },
      {
        "id": "C",
        "texto": "JOIN solo admite tablas vacías; UNION solo admite tablas llenas."
      },
      {
        "id": "D",
        "texto": "Son sinónimos idénticos en el estándar relacional."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "JOIN expande la proyección combinando atributos de distintas entidades lado a lado (horizontal), mientras que UNION apila tuplas de consultas compatibles una sobre otra (vertical)."
  },
  {
    "id": "s2_t14",
    "categoria": "inner_join",
    "titulo": "Cardinalidad Mínima y Máxima de un INNER JOIN",
    "pregunta": "Si la tabla A tiene 10 filas y la tabla B tiene 20 filas, ¿cuál es la cardinalidad (número de filas) mínima y máxima que puede devolver 'A INNER JOIN B ON condición'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Mínimo 10, máximo 20."
      },
      {
        "id": "B",
        "texto": "Mínimo 0 filas (si ninguna tupla satisface el ON) y máximo 200 filas (si todas coinciden con todas)."
      },
      {
        "id": "C",
        "texto": "Mínimo 1 fila y máximo 30 filas."
      },
      {
        "id": "D",
        "texto": "Exactamente 10 filas fijas en cualquier caso."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Si no hay ninguna coincidencia, el resultado es 0 filas. Si cada una de las 10 filas coincide con las 20 filas de la otra tabla, el resultado alcanza el producto cartesiano máximo de $10 \\times 20 = 200$ tuplas."
  },
  {
    "id": "s2_t15",
    "categoria": "inner_join",
    "titulo": "Operador NATURAL JOIN y sus Riesgos",
    "pregunta": "¿Cómo funciona 'NATURAL INNER JOIN' y por qué la ingeniería moderna desaconseja su uso en aplicaciones empresariales?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ordena las tablas por orden natural; se desaconseja porque consume mucho ancho de banda."
      },
      {
        "id": "B",
        "texto": "Une automáticamente por todas las columnas que compartan el mismo nombre exacto en ambas tablas; se desaconseja porque si en el futuro se añade una columna inocua con nombre común (ej. 'fecha_creacion'), la consulta cambia su lógica silenciosamente y se rompe."
      },
      {
        "id": "C",
        "texto": "Es una función obsoleta que borra datos duplicados al consultar."
      },
      {
        "id": "D",
        "texto": "Solo funciona con bases de datos en memoria RAM."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "NATURAL JOIN asume un enlace implícito sobre todas las columnas con nombres idénticos. Si se agrega una columna de auditoría como 'fecha_adicion' a ambas tablas, el join intentará emparejar también por esa fecha, rompiendo la lógica del negocio."
  },
  {
    "id": "s2_t16",
    "categoria": "inner_join",
    "titulo": "Algoritmos de Procesamiento de JOINs en Motores Relacionales",
    "pregunta": "¿Cuáles son los tres algoritmos clásicos que emplean los optimizadores de consultas para resolver físicamente un JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "QuickSort, BubbleSort e InsertionSort."
      },
      {
        "id": "B",
        "texto": "Nested Loop Join (bucles anidados), Hash Join (unión por dispersión) y Merge Join (unión por mezcla ordenada)."
      },
      {
        "id": "C",
        "texto": "B-Tree, R-Tree y Hash-Tree."
      },
      {
        "id": "D",
        "texto": "SELECT Join, WHERE Join y FROM Join."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Los tres pilares de optimización física de joins en motores relacionales son Nested Loops (ideal para tablas pequeñas o indexadas), Hash Joins (óptimo para grandes conjuntos no ordenados) y Sort-Merge Joins (para conjuntos previamente ordenados)."
  },
  {
    "id": "s2_t17",
    "categoria": "inner_join",
    "titulo": "Uso de Expresiones Aritméticas Compuestas con Columnas de Varias Tablas",
    "pregunta": "En 'SELECT c.nombre, vt.cantidad * v.precio AS total FROM clientes c JOIN ventas vt ON c.id = vt.cliente_id JOIN videojuegos v ON vt.videojuego_id = v.id', ¿de dónde provienen los operandos del cálculo?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente de la tabla intermedia ventas."
      },
      {
        "id": "B",
        "texto": "De dos tablas distintas ('vt.cantidad' de ventas y 'v.precio' de videojuegos), operadas dinámicamente tupla a tupla tras haberse producido la unión relacional."
      },
      {
        "id": "C",
        "texto": "Falla porque no se pueden multiplicar columnas de tablas diferentes en una misma expresión."
      },
      {
        "id": "D",
        "texto": "Requiere una tabla temporal física intermedia."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Una vez unidas las relaciones en el pipeline, todas las columnas proyectables coexisten en el contexto de la tupla enriquecida, permitiendo operaciones matemáticas cruzadas entre cualquier atributo del join."
  },
  {
    "id": "s2_t18",
    "categoria": "inner_join",
    "titulo": "Cláusula ORDER BY sobre Tablas Cruzadas en INNER JOIN",
    "pregunta": "¿Es válido ordenar los resultados de un INNER JOIN por una columna que pertenece a una tabla, y desempatar por una columna de otra tabla distinta?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, ORDER BY solo puede hacer referencia a columnas de la tabla primaria del FROM."
      },
      {
        "id": "B",
        "texto": "Sí, cualquier columna participante en el JOIN (ej. 'ORDER BY c.pais ASC, v.precio DESC') puede utilizarse como criterio jerárquico de ordenamiento."
      },
      {
        "id": "C",
        "texto": "Solo si ambas columnas tienen el mismo tipo de dato."
      },
      {
        "id": "D",
        "texto": "Produce que la consulta se ejecute dos veces consecutivas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "ORDER BY opera sobre la relación final proyectada y enriquecida por el JOIN, teniendo acceso a todos los atributos de las tablas involucradas en la cláusula FROM."
  },
  {
    "id": "s2_t19",
    "categoria": "inner_join",
    "titulo": "Condiciones Múltiples en la Cláusula ON con AND",
    "pregunta": "¿Qué significado técnico tiene escribir 'ON c.id = vt.cliente_id AND vt.metodo_pago = 'Tarjeta''?",
    "opciones": [
      {
        "id": "A",
        "texto": "Que el join solo unirá a los clientes con ventas cuya forma de pago sea específicamente Tarjeta, descartando cualquier otra venta de la intersección."
      },
      {
        "id": "B",
        "texto": "Que todos los clientes pagan con tarjeta por defecto."
      },
      {
        "id": "C",
        "texto": "Es un error sintáctico; el operador AND está prohibido dentro de la cláusula ON."
      },
      {
        "id": "D",
        "texto": "Crea una vista temporal de pagos."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "La cláusula ON soporta múltiples predicados booleanos unidos por AND u OR, restringiendo el criterio de emparejamiento entre ambas relaciones."
  },
  {
    "id": "s2_t20",
    "categoria": "inner_join",
    "titulo": "Joins entre Tablas de Distintos Tipos en la Clave",
    "pregunta": "Si intentas unir 'ON c.id = v.codigo_texto' donde 'id' es INTEGER y 'codigo_texto' es TEXT, ¿cómo responde un motor relacional estándar?",
    "opciones": [
      {
        "id": "A",
        "texto": "Siempre falla inmediatamente sin ejecutar."
      },
      {
        "id": "B",
        "texto": "En SQLite, debido a la afinidad dinámica de tipos, intenta coercionar y comparar si las representaciones coinciden, pero en motores con tipado estricto (como PostgreSQL) arroja un error exigiendo un CAST explícito."
      },
      {
        "id": "C",
        "texto": "Convierte la base de datos a formato JSON."
      },
      {
        "id": "D",
        "texto": "Ignora la condición y devuelve un producto cartesiano."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL estándar con tipado fuerte, comparar claves de tipos dispares (INTEGER vs VARCHAR) falla con error de tipos incompatibles a menos que se use CAST. SQLite intenta resolverlo por afinidad de tipos."
  },
  {
    "id": "s2_t21",
    "categoria": "inner_join",
    "titulo": "INNER JOIN Redundante o Innecesario",
    "pregunta": "¿Cuándo se considera técnicamente que un INNER JOIN es 'redundante' en una consulta?",
    "opciones": [
      {
        "id": "A",
        "texto": "Cuando se unen tablas que tienen nombres en español."
      },
      {
        "id": "B",
        "texto": "Cuando se une una tabla de la cual no se proyecta ninguna columna en el SELECT ni se utiliza en ninguna condición de filtro o agrupación, consumiendo E/S y CPU innecesariamente."
      },
      {
        "id": "C",
        "texto": "Cuando la tabla contiene claves primarias compuestas."
      },
      {
        "id": "D",
        "texto": "Cuando la consulta tarda menos de 1 milisegundo."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Incluir joins de tablas de las que no se extrae información ni se aplican filtros agrega sobrecarga de procesamiento inútil en el plan de ejecución."
  },
  {
    "id": "s2_t22",
    "categoria": "inner_join",
    "titulo": "Uso de DISTINCT en Consultas con INNER JOIN",
    "pregunta": "Deseas listar los nombres de los clientes que han realizado al menos una compra, sin que sus nombres salgan repetidos si compraron varias veces. ¿Cuál es la consulta idiomática?",
    "opciones": [
      {
        "id": "A",
        "texto": "SELECT c.nombre FROM clientes c;"
      },
      {
        "id": "B",
        "texto": "SELECT DISTINCT c.id, c.nombre FROM clientes c INNER JOIN ventas v ON c.id = v.cliente_id;"
      },
      {
        "id": "C",
        "texto": "SELECT ALL c.nombre FROM clientes c JOIN ventas v ON c.id = v.cliente_id;"
      },
      {
        "id": "D",
        "texto": "SELECT UNIQUE(c.nombre) FROM clientes c;"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El INNER JOIN asegura que solo se seleccionen clientes que tengan al menos una fila en 'ventas', y DISTINCT elimina las repeticiones causadas por clientes con compras múltiples."
  },
  {
    "id": "s2_t23",
    "categoria": "inner_join",
    "titulo": "Orden de las Tablas en la Cláusula FROM en INNER JOIN",
    "pregunta": "¿El resultado de 'FROM clientes c INNER JOIN ventas v ON c.id = v.cliente_id' es lógicamente equivalente a 'FROM ventas v INNER JOIN clientes c ON v.cliente_id = c.id'?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, el orden de las tablas en un INNER JOIN altera por completo las filas devueltas."
      },
      {
        "id": "B",
        "texto": "Sí, el operador INNER JOIN es matemáticamente conmutativo: el conjunto resultante de tuplas coincidentes es exactamente idéntico sin importar el orden."
      },
      {
        "id": "C",
        "texto": "Solo es equivalente si ambas tablas tienen exactamente el mismo número de filas."
      },
      {
        "id": "D",
        "texto": "Falla porque la tabla de ventas siempre debe ir a la izquierda."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La operación de reunión interna (INNER JOIN) es conmutativa ($A \\bowtie B \\equiv B \\bowtie A$) y asociativa en álgebra relacional: el orden físico de declaración no cambia las tuplas emparejadas."
  },
  {
    "id": "s2_t24",
    "categoria": "inner_join",
    "titulo": "Filtro de Desempate en Consultas Cruzadas con LIMIT",
    "pregunta": "Al ejecutar 'SELECT c.nombre, v.titulo FROM clientes c JOIN ventas vt ON c.id = vt.cliente_id JOIN videojuegos v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 1', ¿qué se obtiene?",
    "opciones": [
      {
        "id": "A",
        "texto": "La primera venta registrada históricamente en la base de datos."
      },
      {
        "id": "B",
        "texto": "La transacción más reciente del sistema, con el nombre del cliente y el título del juego adquirido."
      },
      {
        "id": "C",
        "texto": "El cliente con mayor saldo."
      },
      {
        "id": "D",
        "texto": "Un error porque LIMIT no se puede usar con JOINs múltiples."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El ordenamiento descendente por fecha_venta coloca la transacción cronológicamente más reciente en la primera posición, y LIMIT 1 extrae ese único registro."
  },
  {
    "id": "s2_t25",
    "categoria": "inner_join",
    "titulo": "Cláusulas WHERE Adicionales sobre Columnas de Distintas Tablas",
    "pregunta": "Dada la consulta 'clientes c JOIN ventas vt ON c.id = vt.cliente_id JOIN videojuegos v ON vt.videojuego_id = v.id WHERE c.pais = 'México' AND v.precio > 50', ¿qué filas califican?",
    "opciones": [
      {
        "id": "A",
        "texto": "Todas las ventas de México sin importar el precio del juego."
      },
      {
        "id": "B",
        "texto": "Únicamente ventas realizadas por clientes de México donde el videojuego adquirido tenga un precio estrictamente superior a 50."
      },
      {
        "id": "C",
        "texto": "Ventas de cualquier país donde el precio sea mayor a 50."
      },
      {
        "id": "D",
        "texto": "Clientes de México que no hayan comprado nada."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El WHERE actúa como un filtro posterior a las uniones que exige el cumplimiento simultáneo de condiciones pertenecientes a diferentes entidades de la relación cruzada."
  },
  {
    "id": "s2_t26",
    "categoria": "outer_join_asimetrico",
    "titulo": "Definición Formal de LEFT OUTER JOIN",
    "pregunta": "¿Qué garantiza formalmente un LEFT JOIN respecto a las filas de la tabla declarada a la izquierda?",
    "opciones": [
      {
        "id": "A",
        "texto": "Que solo se preservarán si tienen al menos 3 coincidencias a la derecha."
      },
      {
        "id": "B",
        "texto": "Que absolutamente todas las filas de la tabla izquierda se preservarán en el resultado, rellenando con valores NULL las columnas de la tabla derecha cuando no exista coincidencia."
      },
      {
        "id": "C",
        "texto": "Que las filas sin coincidencia se descartan silenciosamente."
      },
      {
        "id": "D",
        "texto": "Que se invertirá el orden de las columnas automáticamente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El LEFT JOIN preserva la totalidad de las tuplas de la relación izquierda. Si una fila de la izquierda no encuentra ninguna pareja en la derecha según la cláusula ON, se proyecta igualmente rellenando todos los atributos de la derecha con NULL."
  },
  {
    "id": "s2_t27",
    "categoria": "outer_join_asimetrico",
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
    "explicacion": "En un LEFT JOIN, el WHERE se evalúa DESPUÉS de la unión externa. Al exigir 'vt.metodo_pago = 'Tarjeta'', como las filas preservadas de la izquierda tienen NULL en ese campo y NULL = 'Tarjeta' es UNKNOWN, el WHERE las descarta a todas, destruyendo el efecto de la unión externa y convirtiéndolo en un INNER JOIN."
  },
  {
    "id": "s2_t28",
    "categoria": "outer_join_asimetrico",
    "titulo": "El Patrón Anti-Join (Detección de Huérfanos)",
    "pregunta": "¿Cuál es la técnica relacional canónica para listar clientes que NO han realizado ninguna compra usando un LEFT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id WHERE v.id IS NULL;"
      },
      {
        "id": "B",
        "texto": "FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id WHERE v.id = 0;"
      },
      {
        "id": "C",
        "texto": "FROM clientes c LEFT JOIN ventas v ON c.id <> v.cliente_id;"
      },
      {
        "id": "D",
        "texto": "FROM clientes c LEFT JOIN ventas v ON c.id = NULL;"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "El Anti-Join utiliza un LEFT JOIN y filtra con 'WHERE derecha.clave_primaria IS NULL'. Dado que las filas emparejadas tienen un ID válido no nulo, únicamente sobreviven las filas de la izquierda que no tuvieron ninguna coincidencia."
  },
  {
    "id": "s2_t29",
    "categoria": "outer_join_asimetrico",
    "titulo": "Simetría entre LEFT JOIN y RIGHT JOIN",
    "pregunta": "¿A qué consulta con LEFT JOIN es estrictamente equivalente 'FROM ventas vt RIGHT JOIN videojuegos v ON vt.videojuego_id = v.id'?",
    "opciones": [
      {
        "id": "A",
        "texto": "FROM ventas vt LEFT JOIN videojuegos v ON vt.videojuego_id = v.id;"
      },
      {
        "id": "B",
        "texto": "FROM videojuegos v LEFT JOIN ventas vt ON v.id = vt.videojuego_id;"
      },
      {
        "id": "C",
        "texto": "FROM videojuegos v INNER JOIN ventas vt ON v.id = vt.videojuego_id;"
      },
      {
        "id": "D",
        "texto": "No existe equivalencia; RIGHT JOIN realiza cálculos matemáticos inversos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Un RIGHT JOIN preserva la tabla de la derecha. Por tanto, invertir el orden de las tablas en la cláusula FROM convirtiéndolo en un LEFT JOIN produce un resultado relacional idéntico."
  },
  {
    "id": "s2_t30",
    "categoria": "outer_join_asimetrico",
    "titulo": "Soporte de RIGHT JOIN en SQLite",
    "pregunta": "¿Qué soporte histórico y actual tiene el motor SQLite para la sintaxis nativa RIGHT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Nunca ha sido soportado y nunca lo será."
      },
      {
        "id": "B",
        "texto": "Históricamente no lo soportaba y requería invertir a LEFT JOIN, pero fue añadido de forma nativa completa a partir de SQLite versión 3.39.0 (junto con FULL OUTER JOIN)."
      },
      {
        "id": "C",
        "texto": "Siempre estuvo soportado desde la versión 1.0."
      },
      {
        "id": "D",
        "texto": "Solo se admite en SQLite para Android."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "A partir de la versión 3.39.0 (mediados de 2022), SQLite incorporó soporte nativo tanto para RIGHT OUTER JOIN como para FULL OUTER JOIN."
  },
  {
    "id": "s2_t31",
    "categoria": "outer_join_asimetrico",
    "titulo": "Cardinalidad Mínima en un LEFT JOIN",
    "pregunta": "Si la tabla 'clientes' tiene 15 filas y ejecutas 'clientes c LEFT JOIN ventas v ON c.id = v.cliente_id', ¿cuál es la cantidad mínima garantizada de filas que entregará la consulta?",
    "opciones": [
      {
        "id": "A",
        "texto": "0 filas."
      },
      {
        "id": "B",
        "texto": "Al menos 15 filas, ya que cada fila de la izquierda debe representarse al menos una vez."
      },
      {
        "id": "C",
        "texto": "Exactamente tantas filas como tenga la tabla ventas."
      },
      {
        "id": "D",
        "texto": "1 fila."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Por definición de la unión externa izquierda, cada una de las 15 filas de 'clientes' tiene garantizada su presencia en la salida, incluso si la tabla 'ventas' estuviese completamente vacía."
  },
  {
    "id": "s2_t32",
    "categoria": "outer_join_asimetrico",
    "titulo": "LEFT JOIN con Múltiples Coincidencias en la Derecha",
    "pregunta": "Si un cliente de la tabla izquierda tiene 4 compras registradas en la tabla derecha, ¿cuántas filas aparecen para ese cliente en el LEFT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Solo 1 fila con las compras agregadas."
      },
      {
        "id": "B",
        "texto": "Aparecen 4 filas (los datos del cliente se replican para cada una de sus compras asociadas)."
      },
      {
        "id": "C",
        "texto": "0 filas."
      },
      {
        "id": "D",
        "texto": "5 filas (las 4 compras más una fila adicional vacía)."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El LEFT JOIN solo genera una fila con valores NULL si la fila izquierda no tiene ninguna coincidencia. Si tiene una o más coincidencias, se comporta como un INNER JOIN para ese registro, generando una fila por cada par coincidente."
  },
  {
    "id": "s2_t33",
    "categoria": "outer_join_asimetrico",
    "titulo": "Impacto de Funciones de Conteo en LEFT JOIN (COUNT(*) vs COUNT(col))",
    "pregunta": "Si ejecutas un LEFT JOIN para contar las compras de un cliente que no tiene compras registradas, ¿qué diferencia existe entre 'COUNT(*)' y 'COUNT(v.id)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ambos devuelven 0."
      },
      {
        "id": "B",
        "texto": "COUNT(*) devolverá 1 (porque cuenta la fila preservada con nulos), mientras que COUNT(v.id) devolverá 0 correctamente (porque ignora los valores NULL)."
      },
      {
        "id": "C",
        "texto": "COUNT(v.id) arroja una excepción de valor nulo."
      },
      {
        "id": "D",
        "texto": "Ambos devuelven NULL."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Este es uno de los errores más comunes en SQL analítico: COUNT(*) cuenta tuplas presentes en el cursor (dando 1 para la fila preservada), mientras que COUNT(columna_derecha) solo cuenta valores no nulos, entregando 0 compras con exactitud."
  },
  {
    "id": "s2_t34",
    "categoria": "outer_join_asimetrico",
    "titulo": "Uso de COALESCE con LEFT JOIN para Sustituir Nulos",
    "pregunta": "En un LEFT JOIN entre clientes y ventas, ¿qué permite lograr la expresión 'COALESCE(v.metodo_pago, 'Sin Compras')'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Borrar a los clientes sin compras del sistema."
      },
      {
        "id": "B",
        "texto": "Reemplazar de forma elegante la visualización del valor NULL generado en la tabla derecha por la etiqueta informativa 'Sin Compras'."
      },
      {
        "id": "C",
        "texto": "Forzar a que todos los clientes compren un producto."
      },
      {
        "id": "D",
        "texto": "Filtrar únicamente a los clientes que pagaron con tarjeta."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "COALESCE devuelve el primer valor no nulo. Si la venta no existe (v.metodo_pago es NULL), devuelve la cadena de reemplazo por defecto especificada."
  },
  {
    "id": "s2_t35",
    "categoria": "outer_join_asimetrico",
    "titulo": "Error Común al Encadenar un INNER JOIN tras un LEFT JOIN",
    "pregunta": "Analiza la consulta: 'FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id INNER JOIN videojuegos j ON v.videojuego_id = j.id'. ¿Qué problema de diseño relacional contiene?",
    "opciones": [
      {
        "id": "A",
        "texto": "La sintaxis es inválida; SQL no admite mezclar un LEFT JOIN con un INNER JOIN."
      },
      {
        "id": "B",
        "texto": "El segundo INNER JOIN exige que 'v.videojuego_id' coincida con 'j.id'; para los clientes sin compras 'v.videojuego_id' es NULL, por lo que el INNER JOIN posterior elimina a todos los clientes que el LEFT JOIN preservó."
      },
      {
        "id": "C",
        "texto": "Causa un bloqueo de tabla permanente."
      },
      {
        "id": "D",
        "texto": "Multiplica todas las filas por 3."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Si encadenas un INNER JOIN sobre una tabla opcional que produjo NULLs en un LEFT previo, el INNER JOIN descarta todas las filas con NULL. Para mantener los clientes sin compras, el segundo enlace debe ser también un LEFT JOIN hacia videojuegos."
  },
  {
    "id": "s2_t36",
    "categoria": "outer_join_asimetrico",
    "titulo": "Condición Fija en Cláusula ON de un LEFT JOIN",
    "pregunta": "¿Qué ocurre si ejecutas 'clientes c LEFT JOIN ventas v ON c.id = v.cliente_id AND v.fecha_venta >= '2023-01-01''?",
    "opciones": [
      {
        "id": "A",
        "texto": "Se descartan los clientes registrados antes de 2023."
      },
      {
        "id": "B",
        "texto": "Todos los clientes se preservan; pero solo se emparejan con ventas que hayan ocurrido en 2023 o después (los clientes sin ventas en 2023 aparecen con campos de venta en NULL)."
      },
      {
        "id": "C",
        "texto": "Falla porque la cláusula ON solo admite igualdades entre claves primarias y foráneas."
      },
      {
        "id": "D",
        "texto": "Devuelve únicamente ventas del año 2022."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En un LEFT JOIN, las condiciones adicionales en el ON restringen qué filas de la derecha son consideradas candidatas a emparejamiento, SIN filtrar ni eliminar filas de la tabla izquierda."
  },
  {
    "id": "s2_t37",
    "categoria": "outer_join_asimetrico",
    "titulo": "Auditoría de Productos Huérfanos sin Movimiento",
    "pregunta": "¿Cómo identificas los videojuegos que jamás han tenido ninguna venta utilizando RIGHT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "FROM ventas vt RIGHT JOIN videojuegos v ON vt.videojuego_id = v.id WHERE vt.id IS NULL;"
      },
      {
        "id": "B",
        "texto": "FROM ventas vt RIGHT JOIN videojuegos v ON vt.videojuego_id = v.id WHERE v.id IS NULL;"
      },
      {
        "id": "C",
        "texto": "FROM ventas vt RIGHT JOIN videojuegos v ON vt.videojuego_id = v.id WHERE vt.id = 0;"
      },
      {
        "id": "D",
        "texto": "FROM ventas vt RIGHT JOIN videojuegos v ON vt.id = v.id;"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Como RIGHT JOIN preserva todos los videojuegos de la tabla derecha, aquellos títulos sin transacciones tendrán NULL en todas las columnas de 'ventas'. Filtrar con 'WHERE vt.id IS NULL' aísla con exactitud los títulos sin ventas."
  },
  {
    "id": "s2_t38",
    "categoria": "outer_join_asimetrico",
    "titulo": "LEFT JOIN con Tablas Derivadas (Subconsultas)",
    "pregunta": "¿Es válido realizar un LEFT JOIN contra el resultado de una subconsulta en la cláusula FROM?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, las uniones externas solo operan contra tablas físicas guardadas en disco."
      },
      {
        "id": "B",
        "texto": "Sí, el estándar SQL admite unir contra cualquier tabla derivada (subconsulta entre paréntesis con su alias asignado)."
      },
      {
        "id": "C",
        "texto": "Solo si la subconsulta no tiene cláusula WHERE."
      },
      {
        "id": "D",
        "texto": "Produce que la subconsulta se convierta en una tabla física permanente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL relacional, cualquier consulta que devuelva un conjunto de tuplas es una relación válida, por lo que una subconsulta con alias (derived table) puede enlazarse mediante LEFT JOIN como cualquier tabla base."
  },
  {
    "id": "s2_t39",
    "categoria": "outer_join_asimetrico",
    "titulo": "Efecto de WHERE col <> 'X' en la Tabla Derecha de un LEFT JOIN",
    "pregunta": "Si ejecutas 'clientes c LEFT JOIN ventas v ON c.id = v.cliente_id WHERE v.metodo_pago <> 'PayPal'', ¿qué ocurre con los clientes sin ninguna venta?",
    "opciones": [
      {
        "id": "A",
        "texto": "Aparecen en el resultado porque no pagaron con PayPal."
      },
      {
        "id": "B",
        "texto": "Quedan descartados de la salida, porque para ellos 'v.metodo_pago' es NULL, y 'NULL <> 'PayPal'' evalúa a UNKNOWN, que WHERE elimina."
      },
      {
        "id": "C",
        "texto": "Se convierten en clientes VIP."
      },
      {
        "id": "D",
        "texto": "La consulta arroja un error de comparación."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Cualquier operador de comparación (<>, =, <) sobre una columna de la tabla derecha que pueda contener NULL descartará las filas preservadas. Si se deseaba conservar a los clientes sin compras, la condición debió escribirse como '(v.metodo_pago <> 'PayPal' OR v.metodo_pago IS NULL)' o colocarse en el ON."
  },
  {
    "id": "s2_t40",
    "categoria": "outer_join_asimetrico",
    "titulo": "LEFT JOIN No Igualitario (Non-Equi Outer Join)",
    "pregunta": "¿Qué ocurre si ejecutas 'clientes c LEFT JOIN promociones p ON c.saldo_cuenta >= p.saldo_minimo'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Falla porque los outer joins exigen obligatoriamente el operador de igualdad."
      },
      {
        "id": "B",
        "texto": "Para cada cliente se buscan promociones que cumplan el umbral de saldo; si un cliente no califica a ninguna promoción, se proyecta con campos de promoción en NULL."
      },
      {
        "id": "C",
        "texto": "Los clientes sin saldo quedan eliminados."
      },
      {
        "id": "D",
        "texto": "Se le asigna la promoción más cara a todos los clientes."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Las uniones externas admiten operadores relacionales no igualitarios en la cláusula ON, manteniendo la semántica de preservar la tabla izquierda si ninguna condición resulta verdadera."
  },
  {
    "id": "s2_t41",
    "categoria": "outer_join_asimetrico",
    "titulo": "Múltiples Tablas Preservadas con Encadenamiento de LEFT JOINs",
    "pregunta": "Para obtener todos los clientes, con sus compras (si tienen) y con el videojuego asociado a cada compra (si la compra existe), ¿cuál es la estructura correcta?",
    "opciones": [
      {
        "id": "A",
        "texto": "FROM clientes c INNER JOIN ventas v ON c.id = v.cliente_id INNER JOIN videojuegos j ON v.videojuego_id = j.id"
      },
      {
        "id": "B",
        "texto": "FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id LEFT JOIN videojuegos j ON v.videojuego_id = j.id"
      },
      {
        "id": "C",
        "texto": "FROM clientes c RIGHT JOIN ventas v ON c.id = v.cliente_id CROSS JOIN videojuegos j"
      },
      {
        "id": "D",
        "texto": "FROM clientes c FULL JOIN ventas v ON c.id = v.cliente_id INNER JOIN videojuegos j ON v.videojuego_id = j.id"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Encadenar LEFT JOINs consecutivos asegura que el flujo conserve a todos los clientes originales a lo largo de toda la cadena de relaciones sin descartar tuplas en pasos intermedios."
  },
  {
    "id": "s2_t42",
    "categoria": "outer_join_asimetrico",
    "titulo": "Uso de Expresiones CASE para Categorizar Nulos en LEFT JOIN",
    "pregunta": "Deseas mostrar una columna 'estado_cliente' con 'Comprador' si el cliente tiene al menos una compra y 'Potencial' si no tiene compras. ¿Cómo se formula?",
    "opciones": [
      {
        "id": "A",
        "texto": "CASE WHEN v.id IS NOT NULL THEN 'Comprador' ELSE 'Potencial' END"
      },
      {
        "id": "B",
        "texto": "IF v.id > 0 'Comprador' ELSE 'Potencial'"
      },
      {
        "id": "C",
        "texto": "COALESCE(v.id, 'Comprador')"
      },
      {
        "id": "D",
        "texto": "NULLIF(v.id, 'Potencial')"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Evaluar 'v.id IS NOT NULL' en una expresión CASE tras un LEFT JOIN permite clasificar de forma binaria si la fila de la izquierda encontró o no registros asociados en la tabla derecha."
  },
  {
    "id": "s2_t43",
    "categoria": "outer_join_asimetrico",
    "titulo": "LEFT JOIN con Clave Primaria Compuesta",
    "pregunta": "¿Cómo se enlazan dos tablas mediante LEFT JOIN si la relación depende de dos columnas conjuntas (ej. serie y número)?",
    "opciones": [
      {
        "id": "A",
        "texto": "ON t1.serie = t2.serie, t1.numero = t2.numero"
      },
      {
        "id": "B",
        "texto": "ON t1.serie = t2.serie AND t1.numero = t2.numero"
      },
      {
        "id": "C",
        "texto": "ON (t1.serie, t1.numero) IN (t2.serie, t2.numero)"
      },
      {
        "id": "D",
        "texto": "USING (serie, numero, ALL)"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En SQL, las condiciones de enlace para claves compuestas se declaran en la cláusula ON conectándolas mediante el operador lógico AND."
  },
  {
    "id": "s2_t44",
    "categoria": "outer_join_asimetrico",
    "titulo": "Cardinalidad Máxima de un LEFT JOIN",
    "pregunta": "Si la tabla izquierda tiene 5 filas y la tabla derecha tiene 100 filas donde todas coinciden con cada fila de la izquierda, ¿cuántas filas devuelve el LEFT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Exactamente 5 filas."
      },
      {
        "id": "B",
        "texto": "500 filas (5 * 100)."
      },
      {
        "id": "C",
        "texto": "105 filas."
      },
      {
        "id": "D",
        "texto": "100 filas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Al igual que en un INNER JOIN, si una fila de la izquierda tiene múltiples coincidencias, se multiplica por cada coincidencia encontrada ($5 \\times 100 = 500$ filas)."
  },
  {
    "id": "s2_t45",
    "categoria": "outer_join_asimetrico",
    "titulo": "Uso de la Función IFNULL en Proyecciones de LEFT JOIN",
    "pregunta": "En SQLite, ¿qué ventaja sintáctica ofrece 'IFNULL(v.cantidad, 0)' en un reporte de inventario con LEFT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Es una función de 2 argumentos más compacta que COALESCE para transformar los valores nulos en el valor cero (0)."
      },
      {
        "id": "B",
        "texto": "Obliga a que el stock nunca baje de cero en disco."
      },
      {
        "id": "C",
        "texto": "Elimina las columnas de la consulta."
      },
      {
        "id": "D",
        "texto": "Convierte números a texto."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "IFNULL(x, y) es una función nativa de SQLite equivalente a COALESCE(x, y) que devuelve y si x es NULL, ideal para reportes donde se prefieren ceros en lugar de campos vacíos."
  },
  {
    "id": "s2_t46",
    "categoria": "outer_join_asimetrico",
    "titulo": "LEFT JOIN contra Sí Mismo (Self Left Join)",
    "pregunta": "¿Para qué caso de uso empresarial se utiliza comúnmente un LEFT JOIN de una tabla contra sí misma?",
    "opciones": [
      {
        "id": "A",
        "texto": "Para duplicar el espacio en disco."
      },
      {
        "id": "B",
        "texto": "Para modelar jerarquías (como empleados y sus supervisores), donde los empleados de máximo rango (como el CEO) no tienen supervisor y se preservan con NULL."
      },
      {
        "id": "C",
        "texto": "Para crear una copia de seguridad en caliente."
      },
      {
        "id": "D",
        "texto": "Para calcular números primos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En estructuras jerárquicas recursivas (árboles o organigramas), el nodo raíz no tiene padre/supervisor. Un Self LEFT JOIN permite listar a todos los empleados mostrando el nombre de su jefe o NULL si es el líder máximo."
  },
  {
    "id": "s2_t47",
    "categoria": "outer_join_asimetrico",
    "titulo": "Comparación entre Anti-Join y Operador NOT IN",
    "pregunta": "¿Por qué un Anti-Join con 'LEFT JOIN ... WHERE derecha.id IS NULL' es más seguro que usar 'WHERE id NOT IN (SELECT cliente_id FROM ventas)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque NOT IN no está soportado en SQLite."
      },
      {
        "id": "B",
        "texto": "Porque si la subconsulta de ventas contiene una sola fila con 'cliente_id' en NULL, la cláusula NOT IN deja de devolver filas por completo, mientras que el Anti-Join maneja los nulos sin romperse."
      },
      {
        "id": "C",
        "texto": "Porque el Anti-Join siempre es más lento."
      },
      {
        "id": "D",
        "texto": "Porque NOT IN solo admite números enteros positivos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La presencia de un NULL en una lista de NOT IN anula toda la evaluación retornando conjunto vacío. El Anti-Join con LEFT JOIN es inmune a este problema y suele tener planes de ejecución más eficientes."
  },
  {
    "id": "s2_t48",
    "categoria": "outer_join_asimetrico",
    "titulo": "LEFT JOIN sin Cláusula ON",
    "pregunta": "¿Es sintácticamente admisible escribir 'SELECT * FROM clientes c LEFT JOIN ventas v;' sin la cláusula ON en SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Sí, el motor asume un INNER JOIN por defecto."
      },
      {
        "id": "B",
        "texto": "No, las uniones explícitas (INNER, LEFT, RIGHT, FULL) exigen obligatoriamente una especificación de emparejamiento mediante ON o USING en la sintaxis SQL estándar."
      },
      {
        "id": "C",
        "texto": "Sí, SQLite inventa las condiciones según los nombres de columna."
      },
      {
        "id": "D",
        "texto": "Solo si la consulta tiene un LIMIT 10."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El analizador sintáctico de SQL requiere de forma obligatoria la cláusula ON o USING para cualquier JOIN calificado (la única excepción deliberada es CROSS JOIN y NATURAL JOIN)."
  },
  {
    "id": "s2_t49",
    "categoria": "outer_join_asimetrico",
    "titulo": "Filtrado en WHERE sobre Columnas de la Tabla Izquierda en LEFT JOIN",
    "pregunta": "En 'clientes c LEFT JOIN ventas v ON c.id = v.cliente_id WHERE c.pais = 'México'', ¿se preserva el efecto del LEFT JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, se degrada a INNER JOIN."
      },
      {
        "id": "B",
        "texto": "Sí, porque el filtro en WHERE opera sobre la tabla izquierda ('clientes'), filtrando los clientes a solo México, y para ellos preserva todas sus ventas o sus nulos correspondientes sin alteración."
      },
      {
        "id": "C",
        "texto": "Arroja un error por mezclar tablas en el WHERE."
      },
      {
        "id": "D",
        "texto": "Descarta a los clientes de México que no hayan comprado."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Filtrar por la tabla izquierda en el WHERE es completamente válido y no degrada la unión externa: simplemente restringe qué filas de la tabla izquierda participan en la operación."
  },
  {
    "id": "s2_t50",
    "categoria": "outer_join_asimetrico",
    "titulo": "Combinación de LEFT JOIN con GROUP BY",
    "pregunta": "Deseas obtener un reporte con cada cliente y el monto total que ha gastado, mostrando 0.0 si no ha comprado nada. ¿Cuál es el patrón correcto?",
    "opciones": [
      {
        "id": "A",
        "texto": "SELECT c.nombre, SUM(v.cantidad * v.precio_unitario) FROM clientes c JOIN ventas v ON c.id = v.cliente_id;"
      },
      {
        "id": "B",
        "texto": "SELECT c.id, c.nombre, COALESCE(SUM(v.cantidad * v.precio_unitario), 0.0) AS total_gastado FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id GROUP BY c.id, c.nombre;"
      },
      {
        "id": "C",
        "texto": "SELECT c.nombre, v.precio_unitario FROM clientes c CROSS JOIN ventas v;"
      },
      {
        "id": "D",
        "texto": "SELECT c.nombre, COUNT(c.id) FROM clientes c GROUP BY c.pais;"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El LEFT JOIN garantiza que todos los clientes aparezcan; para los que no tienen ventas, SUM() sobre nulos produce NULL, y COALESCE lo convierte limpiamente a 0.0."
  },
  {
    "id": "s2_t51",
    "categoria": "outer_join_bilateral",
    "titulo": "Definición Formal de FULL OUTER JOIN",
    "pregunta": "¿Qué resultado garantiza la operación de FULL OUTER JOIN entre dos tablas A y B?",
    "opciones": [
      {
        "id": "A",
        "texto": "Únicamente las filas donde ambas tablas coincidan de forma exacta."
      },
      {
        "id": "B",
        "texto": "La unión bilateral completa: preserva todas las filas de la tabla A y todas las filas de la tabla B, emparejando las coincidentes y rellenando con NULL de cualquier lado donde no haya correspondencia."
      },
      {
        "id": "C",
        "texto": "El producto cartesiano sin condiciones."
      },
      {
        "id": "D",
        "texto": "La eliminación de todas las claves primarias duplicadas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El FULL OUTER JOIN es la unión externa total: retiene las tuplas emparejadas, más las tuplas de A sin pareja en B (con campos de B en NULL), más las tuplas de B sin pareja en A (con campos de A en NULL)."
  },
  {
    "id": "s2_t52",
    "categoria": "outer_join_bilateral",
    "titulo": "Patrón de Conciliación Bilateral (Detección de Discrepancias)",
    "pregunta": "Deseas identificar los registros desalineados de ambos lados en un FULL OUTER JOIN (clientes sin compras Y ventas sin clientes). ¿Cuál es la condición en el WHERE?",
    "opciones": [
      {
        "id": "A",
        "texto": "WHERE c.id IS NULL AND vt.id IS NULL"
      },
      {
        "id": "B",
        "texto": "WHERE c.id IS NULL OR vt.id IS NULL"
      },
      {
        "id": "C",
        "texto": "WHERE c.id <> vt.cliente_id"
      },
      {
        "id": "D",
        "texto": "WHERE c.id = NULL OR vt.id = NULL"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Filtrar por 'c.id IS NULL OR vt.id IS NULL' descarta las filas que sí hicieron match en ambos extremos, aislando exclusivamente las discrepancias de cualquiera de las dos tablas."
  },
  {
    "id": "s2_t53",
    "categoria": "outer_join_bilateral",
    "titulo": "Emulación de FULL OUTER JOIN en Motores Antiguos",
    "pregunta": "¿Cómo se emula tradicionalmente un FULL OUTER JOIN en motores de bases de datos que no lo soportan nativamente?",
    "opciones": [
      {
        "id": "A",
        "texto": "Combinando un CROSS JOIN con un INNER JOIN."
      },
      {
        "id": "B",
        "texto": "Mediante la unión de conjuntos: ejecutar un LEFT JOIN, un UNION (que elimina duplicados) y un RIGHT JOIN (o LEFT JOIN inverso)."
      },
      {
        "id": "C",
        "texto": "Multiplicando las tablas por -1."
      },
      {
        "id": "D",
        "texto": "Creando dos tablas temporales con claves foráneas cruzadas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La técnica universal de emulación es: (SELECT ... LEFT JOIN ...) UNION (SELECT ... RIGHT JOIN ...). El operador UNION consolida las tuplas de ambos lados y elimina la duplicación de las filas intermedias coincidentes."
  },
  {
    "id": "s2_t54",
    "categoria": "outer_join_bilateral",
    "titulo": "Definición y Mecánica del CROSS JOIN",
    "pregunta": "¿Qué resultado matemático produce 'SELECT * FROM tabla_a CROSS JOIN tabla_b;' sin condiciones?",
    "opciones": [
      {
        "id": "A",
        "texto": "La suma de las filas de ambas tablas (A + B)."
      },
      {
        "id": "B",
        "texto": "El producto cartesiano: combina cada fila individual de la tabla_a con todas y cada una de las filas de la tabla_b (cardinalidad Filas_A * Filas_B)."
      },
      {
        "id": "C",
        "texto": "Una sola fila con los nombres de las columnas."
      },
      {
        "id": "D",
        "texto": "Arroja un error porque todo JOIN exige la cláusula ON obligatoriamente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "CROSS JOIN calcula el producto cartesiano formal del álgebra relacional: genera todas las combinaciones posibles de tuplas emparejando cada registro de A con cada registro de B."
  },
  {
    "id": "s2_t55",
    "categoria": "outer_join_bilateral",
    "titulo": "Casos de Uso Legítimos de CROSS JOIN",
    "pregunta": "¿En qué escenario de ingeniería de datos es técnicamente legítimo y útil emplear un CROSS JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Para eliminar registros nulos en una migración."
      },
      {
        "id": "B",
        "texto": "Para generar una cuadrícula completa de combinaciones base, como cruzar todos los meses del año con todas las sucursales para asegurar que no falten filas en un reporte de ventas."
      },
      {
        "id": "C",
        "texto": "Para acelerar las consultas con claves primarias."
      },
      {
        "id": "D",
        "texto": "Para crear copias de seguridad de una sola fila."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El CROSS JOIN es ideal para matrices dimensionales (ej. combinar dimensiones 'Mes' y 'Producto' para luego hacer un LEFT JOIN hacia ventas y detectar meses sin ventas sin perder el mes)."
  },
  {
    "id": "s2_t56",
    "categoria": "outer_join_bilateral",
    "titulo": "Explosión Combinatoria Accidental por CROSS JOIN",
    "pregunta": "Si unes por error dos tablas de 100,000 registros cada una mediante CROSS JOIN, ¿cuántas tuplas intentará generar el motor?",
    "opciones": [
      {
        "id": "A",
        "texto": "200,000 tuplas."
      },
      {
        "id": "B",
        "texto": "10,000,000,000 tuplas (10 mil millones de filas), causando potencialmente saturación de memoria RAM y bloqueo del servidor."
      },
      {
        "id": "C",
        "texto": "1,000,000 de tuplas."
      },
      {
        "id": "D",
        "texto": "El motor cancela automáticamente la consulta antes de procesar 1 fila."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La complejidad espacial del producto cartesiano es cuadrática ($100,000 \\times 100,000 = 10^{10}$). Esta explosión combinatoria es la razón principal por la que los productos cartesianos accidentales son tan destructivos."
  },
  {
    "id": "s2_t57",
    "categoria": "outer_join_bilateral",
    "titulo": "Simetría en FULL OUTER JOIN",
    "pregunta": "¿El resultado de 'A FULL OUTER JOIN B ON condición' es idéntico a 'B FULL OUTER JOIN A ON condición'?",
    "opciones": [
      {
        "id": "A",
        "texto": "No, las columnas y filas cambian de orden lógico."
      },
      {
        "id": "B",
        "texto": "Sí, el FULL OUTER JOIN es completamente conmutativo a nivel de conjunto relacional (salvo el orden posicional de columnas en SELECT *)."
      },
      {
        "id": "C",
        "texto": "Solo si ninguna tabla tiene claves primarias."
      },
      {
        "id": "D",
        "texto": "Falla en SQLite si se invierte el orden."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Al preservar ambos lados por igual, el FULL OUTER JOIN es simétrico: la pertenencia de las tuplas al conjunto resultado no depende de qué tabla se escribió primero."
  },
  {
    "id": "s2_t58",
    "categoria": "outer_join_bilateral",
    "titulo": "CROSS JOIN con Cláusula WHERE Posterior",
    "pregunta": "¿A qué equivale 'FROM clientes c CROSS JOIN ventas v WHERE c.id = v.cliente_id'?",
    "opciones": [
      {
        "id": "A",
        "texto": "A un FULL OUTER JOIN."
      },
      {
        "id": "B",
        "texto": "A un INNER JOIN estándar ('FROM clientes c INNER JOIN ventas v ON c.id = v.cliente_id'), aunque con peor legibilidad."
      },
      {
        "id": "C",
        "texto": "A una subconsulta correlacionada en cascada."
      },
      {
        "id": "D",
        "texto": "A un error de compilación en SQLite."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Un producto cartesiano (CROSS JOIN) filtrado por igualdad en el WHERE produce exactamente el mismo conjunto de filas que un INNER JOIN con ON."
  },
  {
    "id": "s2_t59",
    "categoria": "outer_join_bilateral",
    "titulo": "Uso de COALESCE en Ambas Claves en FULL OUTER JOIN",
    "pregunta": "En un FULL OUTER JOIN entre clientes y ventas, ¿por qué se utiliza 'COALESCE(c.id, v.cliente_id) AS id_unificado' en la proyección?",
    "opciones": [
      {
        "id": "A",
        "texto": "Para convertir los identificadores a texto."
      },
      {
        "id": "B",
        "texto": "Para asegurar que la columna identificadora tenga un valor visible tanto si la fila provino de un cliente sin ventas como si provino de una venta sin cliente registrado."
      },
      {
        "id": "C",
        "texto": "Para evitar que la base de datos se bloquee."
      },
      {
        "id": "D",
        "texto": "Para ordenar de mayor a menor."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En un FULL OUTER JOIN, cualquiera de los dos extremos puede ser NULL. COALESCE unifica los dos atributos en una sola columna consolidada no nula."
  },
  {
    "id": "s2_t60",
    "categoria": "outer_join_bilateral",
    "titulo": "CROSS JOIN de una Tabla Consigo Misma con Filtro de Desigualdad",
    "pregunta": "Si ejecutas 'videojuegos v1 CROSS JOIN videojuegos v2 WHERE v1.id < v2.id', ¿qué parejas de juegos se obtienen?",
    "opciones": [
      {
        "id": "A",
        "texto": "Todas las combinaciones duplicadas."
      },
      {
        "id": "B",
        "texto": "Todas las combinaciones únicas posibles de pares de videojuegos (sin emparejarse un juego consigo mismo y sin pares invertidos repetidos (A, B) y (B, A))."
      },
      {
        "id": "C",
        "texto": "Cero filas."
      },
      {
        "id": "D",
        "texto": "Únicamente los dos videojuegos más baratos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Usar 'v1.id < v2.id' en un producto cartesiano es la técnica estándar para generar combinaciones matemáticas de 2 elementos ($C(n, 2)$) sin autoreferencias ni permutaciones duplicadas."
  },
  {
    "id": "s2_t61",
    "categoria": "outer_join_bilateral",
    "titulo": "Soporte de FULL OUTER JOIN en SQLite Moderno",
    "pregunta": "¿Qué sintaxis nativa admite SQLite a partir de su versión 3.39.0 para uniones bilaterales?",
    "opciones": [
      {
        "id": "A",
        "texto": "FULL JOIN o FULL OUTER JOIN nativo con cláusula ON estándar."
      },
      {
        "id": "B",
        "texto": "Solo admite la palabra clave COMPLETE JOIN."
      },
      {
        "id": "C",
        "texto": "Requiere una extensión en lenguaje C compilada externamente."
      },
      {
        "id": "D",
        "texto": "Solo funciona en bases de datos cifradas."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "SQLite 3.39.0 implementó soporte nativo completo para las cláusulas RIGHT JOIN y FULL OUTER JOIN según el estándar SQL."
  },
  {
    "id": "s2_t62",
    "categoria": "outer_join_bilateral",
    "titulo": "Impacto de Filtros en WHERE sobre FULL OUTER JOIN",
    "pregunta": "Si en un FULL OUTER JOIN entre A y B agregas 'WHERE A.pais = 'México' AND B.monto > 100', ¿qué ocurre con las filas no coincidentes?",
    "opciones": [
      {
        "id": "A",
        "texto": "Se preservan intactas con valores nulos."
      },
      {
        "id": "B",
        "texto": "Ambos lados de la unión externa quedan destruidos, degradando la consulta efectivamente a un INNER JOIN con filtros."
      },
      {
        "id": "C",
        "texto": "El motor duplica las filas mexicanas."
      },
      {
        "id": "D",
        "texto": "Se produce un error de sintaxis en tiempo de ejecución."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Como las filas huérfanas de A tienen NULL en B.monto y las de B tienen NULL en A.pais, exigir que ambas columnas cumplan valores específicos descarta todos los nulos, eliminando el propósito del FULL OUTER JOIN."
  },
  {
    "id": "s2_t63",
    "categoria": "outer_join_bilateral",
    "titulo": "Diferencia entre FULL OUTER JOIN y UNION ALL",
    "pregunta": "¿En qué se diferencia el resultado de un FULL OUTER JOIN frente a un UNION ALL entre dos tablas compatibles?",
    "opciones": [
      {
        "id": "A",
        "texto": "FULL OUTER JOIN empareja horizontalmente columnas de tuplas coincidentes; UNION ALL apila todas las filas verticalmente sin buscar relaciones ni emparejamientos."
      },
      {
        "id": "B",
        "texto": "Son sinónimos idénticos en SQL."
      },
      {
        "id": "C",
        "texto": "UNION ALL solo admite números enteros."
      },
      {
        "id": "D",
        "texto": "FULL OUTER JOIN descarta registros nulos."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "FULL OUTER JOIN combina los atributos de ambas tablas alineando tuplas según una clave común; UNION ALL simplemente concatena las filas de ambas consultas una tras otra sin cruzar datos."
  },
  {
    "id": "s2_t64",
    "categoria": "outer_join_bilateral",
    "titulo": "Cardinalidad en CROSS JOIN de 3 Tablas",
    "pregunta": "Si unes 'tabla1 (10 filas) CROSS JOIN tabla2 (5 filas) CROSS JOIN tabla3 (4 filas)', ¿cuántas filas totales se generan?",
    "opciones": [
      {
        "id": "A",
        "texto": "19 filas (10 + 5 + 4)."
      },
      {
        "id": "B",
        "texto": "200 filas (10 * 5 * 4)."
      },
      {
        "id": "C",
        "texto": "50 filas."
      },
      {
        "id": "D",
        "texto": "100 filas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El producto cartesiano múltiple multiplica sucesivamente las cardinalidades de cada conjunto participante: $10 \\times 5 \\times 4 = 200$ tuplas resultantes."
  },
  {
    "id": "s2_t65",
    "categoria": "outer_join_bilateral",
    "titulo": "Reconciliación Contable con FULL OUTER JOIN",
    "pregunta": "¿Por qué el FULL OUTER JOIN es la herramienta preferida en auditorías y conciliaciones bancarias o de facturación?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque siempre redondea a favor de la empresa."
      },
      {
        "id": "B",
        "texto": "Porque permite visualizar en una sola vista: los pagos bancarios emparejados con facturas, los pagos sin factura asociada y las facturas sin pago registrado."
      },
      {
        "id": "C",
        "texto": "Porque no requiere permisos de administrador."
      },
      {
        "id": "D",
        "texto": "Porque oculta los números de cuenta."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La conciliación de estados contables requiere detectar de inmediato discrepancias en ambos sentidos de la relación, lo que se obtiene de forma natural con un FULL OUTER JOIN."
  },
  {
    "id": "s2_t66",
    "categoria": "outer_join_bilateral",
    "titulo": "CROSS JOIN con Tabla de una Sola Fila",
    "pregunta": "Si cruzas una tabla de 10,000 clientes mediante CROSS JOIN con una subconsulta que devuelve exactamente 1 fila (ej. el promedio general de saldo), ¿cuántas filas se obtienen?",
    "opciones": [
      {
        "id": "A",
        "texto": "1 fila."
      },
      {
        "id": "B",
        "texto": "Exactamente 10,000 filas, donde cada cliente tiene anexado el valor del promedio general para comparar contra su propio saldo."
      },
      {
        "id": "C",
        "texto": "0 filas."
      },
      {
        "id": "D",
        "texto": "10,001 filas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Hacer un CROSS JOIN contra una relación de 1 sola fila ($10,000 \\times 1 = 10,000$) es una técnica muy útil para adjuntar un valor constante o agregado global a cada registro individual sin necesidad de funciones ventana."
  },
  {
    "id": "s2_t67",
    "categoria": "outer_join_bilateral",
    "titulo": "Comportamiento de FULL OUTER JOIN si Ambas Tablas están Vacías",
    "pregunta": "Si la tabla A tiene 0 filas y la tabla B tiene 0 filas, ¿qué entrega 'A FULL OUTER JOIN B ON A.id = B.id'?",
    "opciones": [
      {
        "id": "A",
        "texto": "1 fila con todas las columnas en NULL."
      },
      {
        "id": "B",
        "texto": "0 filas (conjunto vacío)."
      },
      {
        "id": "C",
        "texto": "Un error de división por cero."
      },
      {
        "id": "D",
        "texto": "Una advertencia de base de datos no inicializada."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Si no existen registros en ninguna de las dos relaciones, no hay tuplas que preservar ni emparejar, produciendo un cursor de 0 filas."
  },
  {
    "id": "s2_t68",
    "categoria": "outer_join_bilateral",
    "titulo": "Condición Falsa en Cláusula ON de un FULL OUTER JOIN",
    "pregunta": "Si ejecutas 'A FULL OUTER JOIN B ON 1 = 0' (condición siempre falsa), ¿qué resultado entrega?",
    "opciones": [
      {
        "id": "A",
        "texto": "0 filas."
      },
      {
        "id": "B",
        "texto": "Todas las filas de A con campos de B en NULL, más todas las filas de B con campos de A en NULL (suma de cardinalidades A + B)."
      },
      {
        "id": "C",
        "texto": "Un producto cartesiano completo."
      },
      {
        "id": "D",
        "texto": "Falla por condición inválida."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Al no haber ninguna coincidencia posible, ninguna fila se empareja. El FULL OUTER JOIN preserva todas las filas de A rellenando B con NULL y todas las de B rellenando A con NULL, dando una cardinalidad total de $|A| + |B|$."
  },
  {
    "id": "s2_t69",
    "categoria": "outer_join_bilateral",
    "titulo": "FULL OUTER JOIN con Expresiones CASE Múltiples",
    "pregunta": "¿Cómo puedes clasificar el origen de cada fila en un FULL OUTER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Con TYPEOF(*)."
      },
      {
        "id": "B",
        "texto": "Con CASE WHEN c.id IS NOT NULL AND vt.id IS NOT NULL THEN 'Ambos' WHEN c.id IS NOT NULL THEN 'Solo Cliente' ELSE 'Solo Venta' END."
      },
      {
        "id": "C",
        "texto": "Usando la función ORIGIN()."
      },
      {
        "id": "D",
        "texto": "El motor asigna automáticamente una columna oculta 'join_side'."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Inspeccionar mediante CASE la presencia de claves no nulas en uno u otro lado permite etiquetar con precisión quirúrgica el estado de emparejamiento de cada tupla resultante."
  },
  {
    "id": "s2_t70",
    "categoria": "outer_join_bilateral",
    "titulo": "Rendimiento y Optimización de FULL OUTER JOIN",
    "pregunta": "¿Por qué un FULL OUTER JOIN suele ser más costoso en tiempo de CPU y memoria que un INNER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque se ejecuta obligatoriamente en un solo hilo de procesamiento."
      },
      {
        "id": "B",
        "texto": "Porque exige realizar seguimiento en memoria de todas las tuplas de ambas relaciones que no fueron emparejadas para emitirlas al final del proceso."
      },
      {
        "id": "C",
        "texto": "Porque desactiva la compresión del motor SQLite."
      },
      {
        "id": "D",
        "texto": "Porque obliga a escribir temporalmente a un archivo XML."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "A diferencia de un INNER JOIN donde las tuplas no coincidentes se descartan de inmediato, el FULL JOIN requiere mantener tablas de bits o estructuras de rastreo para identificar qué filas de ambos lados quedaron huérfanas."
  },
  {
    "id": "s2_t71",
    "categoria": "outer_join_bilateral",
    "titulo": "Sustitución de Comas en el FROM por CROSS JOIN Explícito",
    "pregunta": "¿Por qué el estándar ANSI-92 recomienda escribir 'tabla1 CROSS JOIN tabla2' en lugar de 'FROM tabla1, tabla2'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque el uso de comas está deprecado en todos los estándares de programación."
      },
      {
        "id": "B",
        "texto": "Porque documenta explícitamente la intención del desarrollador de generar un producto cartesiano deliberado, diferenciándolo de un INNER JOIN donde se olvidó la cláusula ON."
      },
      {
        "id": "C",
        "texto": "Porque CROSS JOIN comprime las columnas en memoria."
      },
      {
        "id": "D",
        "texto": "Porque las comas no funcionan en navegadores web."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La explicitud es una de las mayores ventajas de la sintaxis ANSI: 'CROSS JOIN' indica sin lugar a dudas que el producto cartesiano fue diseñado a propósito y no por error de omisión."
  },
  {
    "id": "s2_t72",
    "categoria": "outer_join_bilateral",
    "titulo": "FULL OUTER JOIN y Claves Duplicadas",
    "pregunta": "Si un ID aparece 2 veces en la tabla A y 3 veces en la tabla B, ¿cuántas filas emparejadas genera en un FULL OUTER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "5 filas (2 + 3)."
      },
      {
        "id": "B",
        "texto": "6 filas (2 * 3), idéntico al comportamiento del INNER JOIN para claves coincidentes."
      },
      {
        "id": "C",
        "texto": "1 sola fila colapsada."
      },
      {
        "id": "D",
        "texto": "0 filas por ambigüedad."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Para las claves que coinciden, el FULL OUTER JOIN se comporta exactamente igual que un INNER JOIN, multiplicando las ocurrencias ($2 \\times 3 = 6$ filas emparejadas)."
  },
  {
    "id": "s2_t73",
    "categoria": "outer_join_bilateral",
    "titulo": "Uso de CROSS JOIN para Generar Puntuaciones Ponderadas",
    "pregunta": "Si cruzas los videojuegos con una tabla de parámetros que define 3 tipos de cambio de moneda, ¿qué estructura obtienes?",
    "opciones": [
      {
        "id": "A",
        "texto": "Cada juego triplicado, una vez por cada moneda extranjera para calcular su precio convertido en cada divisa."
      },
      {
        "id": "B",
        "texto": "Los juegos convertidos a una sola moneda."
      },
      {
        "id": "C",
        "texto": "Una tabla con tres columnas vacías."
      },
      {
        "id": "D",
        "texto": "Un error de conversión."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Un CROSS JOIN contra una tabla de factores de conversión multiplica cada registro por cada factor, permitiendo generar proyecciones multidivisa de forma puramente declarativa."
  },
  {
    "id": "s2_t74",
    "categoria": "outer_join_bilateral",
    "titulo": "Comparación entre LEFT JOIN y FULL OUTER JOIN",
    "pregunta": "¿En qué único caso un LEFT JOIN entregará exactamente el mismo resultado que un FULL OUTER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Cuando la tabla izquierda está completamente vacía."
      },
      {
        "id": "B",
        "texto": "Cuando no existe ninguna fila huérfana en la tabla derecha (es decir, todas las filas de la tabla derecha tienen al menos una correspondencia en la tabla izquierda)."
      },
      {
        "id": "C",
        "texto": "Cuando ambas tablas tienen más de 1,000 registros."
      },
      {
        "id": "D",
        "texto": "Nunca pueden entregar el mismo resultado."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Si la tabla derecha no contiene registros huérfanos, el FULL JOIN no tiene tuplas adicionales que preservar por el extremo derecho, coincidiendo al 100% con el LEFT JOIN."
  },
  {
    "id": "s2_t75",
    "categoria": "outer_join_bilateral",
    "titulo": "Manejo de Nulos en Claves de Enlace en FULL OUTER JOIN",
    "pregunta": "Si ambas tablas contienen filas con clave primaria o foránea en valor NULL, ¿se emparejan entre sí en un FULL OUTER JOIN?",
    "opciones": [
      {
        "id": "A",
        "texto": "Sí, porque en las uniones externas NULL = NULL se considera verdadero."
      },
      {
        "id": "B",
        "texto": "No, porque 'NULL = NULL' sigue siendo UNKNOWN; las filas con clave NULL se preservan en el resultado de forma independiente como huérfanas de cada lado."
      },
      {
        "id": "C",
        "texto": "Arroja un error de integridad."
      },
      {
        "id": "D",
        "texto": "Se convierten en 0."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El predicado de igualdad en el ON sigue las reglas universales de SQL: NULL no coincide con NULL. Cada fila con clave nula aparece como registro no emparejado de su respectivo lado."
  },
  {
    "id": "s2_t76",
    "categoria": "funciones_null",
    "titulo": "Definición y Propósito Fundamental de COALESCE",
    "pregunta": "¿Cuál es la especificación técnica exacta de la función COALESCE(e1, e2, ..., en) en el estándar ANSI SQL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Concatena todas las expresiones en una sola cadena de texto."
      },
      {
        "id": "B",
        "texto": "Evalúa los argumentos en orden secuencial de izquierda a derecha y retorna el primer argumento cuyo valor no sea NULL; si todos son NULL, retorna NULL."
      },
      {
        "id": "C",
        "texto": "Retorna el valor máximo de la lista."
      },
      {
        "id": "D",
        "texto": "Calcula la varianza estadística de los operandos."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "COALESCE es la función estándar universal para manejo de contingencias nulas: examina los parámetros en orden y entrega el primer valor definido (no nulo) que encuentre."
  },
  {
    "id": "s2_t77",
    "categoria": "funciones_null",
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
  },
  {
    "id": "s2_t78",
    "categoria": "funciones_null",
    "titulo": "Comportamiento Escalar de NULLIF(a, b)",
    "pregunta": "¿Qué resultado exacto entrega la función 'NULLIF(15, 20)' y qué resultado entrega 'NULLIF(15, 15)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Retorna 15 en ambos casos."
      },
      {
        "id": "B",
        "texto": "NULLIF(15, 20) retorna 15 (porque son distintos) y NULLIF(15, 15) retorna NULL (porque son idénticos)."
      },
      {
        "id": "C",
        "texto": "Retorna NULL en ambos casos."
      },
      {
        "id": "D",
        "texto": "Retorna 20 y 0 respectivamente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "NULLIF(x, y) devuelve NULL si x e y son iguales. Si son distintos, devuelve el valor del primer argumento x."
  },
  {
    "id": "s2_t79",
    "categoria": "funciones_null",
    "titulo": "Equivalencia entre COALESCE y Expresión CASE",
    "pregunta": "¿A qué expresión condicional equivale formalmente 'COALESCE(a, b)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "CASE WHEN a IS NOT NULL THEN a ELSE b END"
      },
      {
        "id": "B",
        "texto": "CASE WHEN a = b THEN NULL ELSE a END"
      },
      {
        "id": "C",
        "texto": "IF a == NULL THEN b ELSE a"
      },
      {
        "id": "D",
        "texto": "CASE a WHEN NULL THEN b END"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "El estándar SQL define COALESCE formalmente como una abreviatura sintáctica de una expresión CASE que evalúa IS NOT NULL sobre cada operando en orden."
  },
  {
    "id": "s2_t80",
    "categoria": "funciones_null",
    "titulo": "Propagación de Nulos en Expresiones Aritméticas",
    "pregunta": "Si 'saldo_cuenta' es NULL, ¿qué valor produce la expresión 'saldo_cuenta + 100'?",
    "opciones": [
      {
        "id": "A",
        "texto": "100 (asume que NULL equivale a 0)."
      },
      {
        "id": "B",
        "texto": "NULL (cualquier operación matemática básica con un operando NULL propaga NULL como resultado)."
      },
      {
        "id": "C",
        "texto": "Arroja un error de conversión aritmética."
      },
      {
        "id": "D",
        "texto": "0."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Una incógnita más 100 sigue siendo una incógnita. Por ello, la aritmética en SQL propaga el valor NULL a menos que se utilice COALESCE(saldo_cuenta, 0) + 100."
  },
  {
    "id": "s2_t81",
    "categoria": "funciones_null",
    "titulo": "Diferencia entre IFNULL y COALESCE en SQLite",
    "pregunta": "¿Cuál es la principal diferencia entre la función nativa IFNULL de SQLite y la función estándar COALESCE?",
    "opciones": [
      {
        "id": "A",
        "texto": "IFNULL solo funciona con números; COALESCE solo con textos."
      },
      {
        "id": "B",
        "texto": "IFNULL acepta estrictamente 2 argumentos; COALESCE es estándar ANSI y admite un número ilimitado de argumentos (3 o más)."
      },
      {
        "id": "C",
        "texto": "COALESCE es más lenta porque consulta el disco."
      },
      {
        "id": "D",
        "texto": "IFNULL modifica los datos de la tabla permanentemente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "IFNULL(a, b) es una función histórica de dos parámetros propia de SQLite y MySQL. COALESCE es la forma estándar universal y portátil que admite $N$ parámetros."
  },
  {
    "id": "s2_t82",
    "categoria": "funciones_null",
    "titulo": "Comportamiento de la Función de Agregación AVG con Nulos",
    "pregunta": "Una columna tiene cuatro filas con valores: 10, 20, 30 y NULL. ¿Qué calcula 'SELECT AVG(columna)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "15 (suma 60 y divide entre las 4 filas totales)."
      },
      {
        "id": "B",
        "texto": "20 (suma 60 y divide estrictamente entre las 3 filas no nulas, ignorando el NULL)."
      },
      {
        "id": "C",
        "texto": "NULL (la presencia de un nulo anula el promedio)."
      },
      {
        "id": "D",
        "texto": "60."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Todas las funciones de agregación (excepto COUNT(*)) ignoran los valores NULL. El promedio suma los valores existentes (60) y divide únicamente entre la cantidad de tuplas no nulas (3), dando 20.0."
  },
  {
    "id": "s2_t83",
    "categoria": "funciones_null",
    "titulo": "Comportamiento de la Función SUM con Filas Nulas",
    "pregunta": "¿Qué resultado entrega 'SUM(columna)' si todas las filas evaluadas contienen el valor NULL?",
    "opciones": [
      {
        "id": "A",
        "texto": "0 (cero)."
      },
      {
        "id": "B",
        "texto": "NULL."
      },
      {
        "id": "C",
        "texto": "Arroja una excepción de conjunto vacío."
      },
      {
        "id": "D",
        "texto": "NaN (Not a Number)."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En el estándar SQL, la suma de un conjunto donde no existe ningún valor numérico válido produce NULL, no 0. Para asegurar que retorne 0 se debe envolver como 'COALESCE(SUM(col), 0)'."
  },
  {
    "id": "s2_t84",
    "categoria": "funciones_null",
    "titulo": "Limpieza de Cadenas Vacías usando NULLIF",
    "pregunta": "¿Qué utilidad técnica tiene ejecutar 'NULLIF(email, '')' en una operación de normalización de datos?",
    "opciones": [
      {
        "id": "A",
        "texto": "Elimina el arroba del correo."
      },
      {
        "id": "B",
        "texto": "Transforma las cadenas vacías ('') en un valor NULL genuino, permitiendo que las restricciones de integridad y operadores IS NULL operen de manera homogénea."
      },
      {
        "id": "C",
        "texto": "Borra el correo de la base de datos."
      },
      {
        "id": "D",
        "texto": "Obliga a que el correo tenga mayúsculas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Las cadenas vacías '' son un dolor de cabeza en analítica porque no son detectadas por IS NULL. NULLIF(col, '') convierte '' en NULL de forma elegante."
  },
  {
    "id": "s2_t85",
    "categoria": "funciones_null",
    "titulo": "Uso de COALESCE en Cláusula ORDER BY para Controlar la Posición de Nulos",
    "pregunta": "Deseas ordenar por 'saldo_cuenta DESC', pero quieres que los saldos nulos aparezcan al final de todo en lugar de al principio. ¿Cómo lo logras con COALESCE?",
    "opciones": [
      {
        "id": "A",
        "texto": "ORDER BY COALESCE(saldo_cuenta, -999999) DESC"
      },
      {
        "id": "B",
        "texto": "ORDER BY COALESCE(saldo_cuenta, 999999) DESC"
      },
      {
        "id": "C",
        "texto": "ORDER BY saldo_cuenta NULLIF DESC"
      },
      {
        "id": "D",
        "texto": "ORDER BY saldo_cuenta IS NULL FIRST"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Al ordenar de mayor a menor (DESC), asignar temporalmente un número extremadamente negativo a los valores nulos con COALESCE garantiza que queden relegados al final de la lista."
  },
  {
    "id": "s2_t86",
    "categoria": "funciones_null",
    "titulo": "Lógica Trivaluada en Condiciones de Enlace",
    "pregunta": "¿Por qué dos filas con valor NULL en su clave de enlace no se unen jamás en un 'ON a.clave = b.clave'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Porque las claves foráneas tienen prohibido el tipo NULL."
      },
      {
        "id": "B",
        "texto": "Porque en SQL la igualdad 'NULL = NULL' no es TRUE sino UNKNOWN (dos datos desconocidos no pueden asumirse iguales), y la cláusula ON exige una condición booleana estrictamente verdadera."
      },
      {
        "id": "C",
        "texto": "Porque el motor borra las claves nulas antes del join."
      },
      {
        "id": "D",
        "texto": "Porque SQLite solo compara números pares."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "La regla fundamental del modelo relacional: dos valores desconocidos no son iguales entre sí. NULL = NULL produce UNKNOWN, descartando la tupla del enlace."
  },
  {
    "id": "s2_t87",
    "categoria": "funciones_null",
    "titulo": "Operador IS NOT DISTINCT FROM",
    "pregunta": "¿Qué operador del estándar SQL (disponible en PostgreSQL y SQLite moderno) permite comparar dos columnas considerando que NULL y NULL sí son equivalentes?",
    "opciones": [
      {
        "id": "A",
        "texto": "EQUALS WITH NULLS"
      },
      {
        "id": "B",
        "texto": "IS NOT DISTINCT FROM"
      },
      {
        "id": "C",
        "texto": "COMPARE_SAFE()"
      },
      {
        "id": "D",
        "texto": "== NULL =="
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "'A IS NOT DISTINCT FROM B' es una comparación nulo-segura (null-safe): retorna TRUE si ambos tienen el mismo valor O si ambos son NULL."
  },
  {
    "id": "s2_t88",
    "categoria": "funciones_null",
    "titulo": "Diferencia entre NOT NULL y DEFAULT",
    "pregunta": "En la definición de una tabla, ¿qué diferencia existe entre 'precio REAL NOT NULL' y 'precio REAL DEFAULT 0.0'?",
    "opciones": [
      {
        "id": "A",
        "texto": "NOT NULL impide insertar registros sin valor rechazando la inserción; DEFAULT asigna automáticamente 0.0 si el valor se omite al insertar."
      },
      {
        "id": "B",
        "texto": "Son exactamente idénticos en disco."
      },
      {
        "id": "C",
        "texto": "DEFAULT solo funciona con cadenas de texto."
      },
      {
        "id": "D",
        "texto": "NOT NULL solo se puede usar en claves primarias."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "NOT NULL es una restricción de integridad que prohíbe el valor nulo arrojando un error si se intenta persistir; DEFAULT es un valor de contingencia que se autocompleta cuando no se especifica el dato."
  },
  {
    "id": "s2_t89",
    "categoria": "funciones_null",
    "titulo": "COALESCE con Cadenas y Formateo en JOINs",
    "pregunta": "Si un cliente no tiene teléfono, ¿qué proyectará 'COALESCE(c.telefono, 'No especificado')'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Un número aleatorio de 10 dígitos."
      },
      {
        "id": "B",
        "texto": "La cadena de texto 'No especificado' si c.telefono es NULL, o el número telefónico real si existe."
      },
      {
        "id": "C",
        "texto": "NULL siempre."
      },
      {
        "id": "D",
        "texto": "La longitud del nombre del cliente."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "Es el patrón clásico de saneamiento de presentación en interfaces: reemplazar datos faltantes por textos amigables y legibles para el usuario."
  },
  {
    "id": "s2_t90",
    "categoria": "funciones_null",
    "titulo": "Uso de NULLIF para Evitar Valores Centinela",
    "pregunta": "Un sistema heredado registra las fechas desconocidas como '1900-01-01'. ¿Cómo transformas ese valor centinela en un verdadero NULL?",
    "opciones": [
      {
        "id": "A",
        "texto": "COALESCE(fecha, '1900-01-01')"
      },
      {
        "id": "B",
        "texto": "NULLIF(fecha, '1900-01-01')"
      },
      {
        "id": "C",
        "texto": "IFNULL(fecha, '1900-01-01')"
      },
      {
        "id": "D",
        "texto": "TRIM(fecha, '1900')"
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "NULLIF(fecha, '1900-01-01') evalúa si la fecha es igual al valor centinela. De ser así, entrega NULL, normalizando el dato."
  },
  {
    "id": "s2_t91",
    "categoria": "funciones_null",
    "titulo": "Impacto de Nulos en Operadores IN",
    "pregunta": "¿Qué valor booleano produce la evaluación de '10 IN (5, 20, NULL)'?",
    "opciones": [
      {
        "id": "A",
        "texto": "FALSE."
      },
      {
        "id": "B",
        "texto": "UNKNOWN, porque 10 no es 5 ni 20, pero podría ser igual al valor desconocido representado por NULL."
      },
      {
        "id": "C",
        "texto": "TRUE."
      },
      {
        "id": "D",
        "texto": "Arroja un error de sintaxis."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "'10 IN (5, 20, NULL)' se expande a '10 = 5 OR 10 = 20 OR 10 = NULL', lo que se simplifica a 'FALSE OR FALSE OR UNKNOWN' = UNKNOWN."
  },
  {
    "id": "s2_t92",
    "categoria": "funciones_null",
    "titulo": "Anidamiento de Funciones IFNULL",
    "pregunta": "¿A qué expresión con COALESCE equivale la función anidada 'IFNULL(col1, IFNULL(col2, 'N/A'))'?",
    "opciones": [
      {
        "id": "A",
        "texto": "COALESCE(col1, col2, 'N/A')"
      },
      {
        "id": "B",
        "texto": "COALESCE(col1 + col2, 'N/A')"
      },
      {
        "id": "C",
        "texto": "NULLIF(col1, col2)"
      },
      {
        "id": "D",
        "texto": "CASE WHEN col1 = col2 THEN 'N/A' END"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "COALESCE resuelve de forma limpia y legible el anidamiento engorroso de funciones de dos parámetros como IFNULL o NVL."
  },
  {
    "id": "s2_t93",
    "categoria": "funciones_null",
    "titulo": "Manejo de Nulos en Concatenaciones de SQLite",
    "pregunta": "Si 'c.apellido' es NULL y ejecutas 'c.nombre || ' ' || c.apellido', ¿cómo aseguras que al menos se proyecte el nombre sin que toda la cadena se convierta en NULL?",
    "opciones": [
      {
        "id": "A",
        "texto": "Usando c.nombre || ' ' || COALESCE(c.apellido, '')"
      },
      {
        "id": "B",
        "texto": "Usando NULLIF(c.apellido, '')"
      },
      {
        "id": "C",
        "texto": "SQLite convierte automáticamente los nulos a espacios."
      },
      {
        "id": "D",
        "texto": "Invocando la función STRICT()"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Al usar COALESCE(c.apellido, ''), si el apellido es nulo se sustituye por una cadena vacía '', impidiendo que la propiedad de propagación de nulos del operador '||' anule el nombre."
  },
  {
    "id": "s2_t94",
    "categoria": "funciones_null",
    "titulo": "Detección de Claves Foráneas Huérfanas por Borrado en Cascada Faltante",
    "pregunta": "¿Qué consulta permite localizar registros de ventas cuyo cliente asociado ya no existe en la tabla de clientes?",
    "opciones": [
      {
        "id": "A",
        "texto": "SELECT vt.* FROM ventas vt LEFT JOIN clientes c ON vt.cliente_id = c.id WHERE c.id IS NULL;"
      },
      {
        "id": "B",
        "texto": "SELECT vt.* FROM ventas vt INNER JOIN clientes c ON vt.cliente_id = c.id;"
      },
      {
        "id": "C",
        "texto": "SELECT vt.* FROM ventas vt WHERE vt.cliente_id > 0;"
      },
      {
        "id": "D",
        "texto": "SELECT vt.* FROM ventas vt CROSS JOIN clientes c WHERE c.id = 0;"
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Un LEFT JOIN desde la tabla hija (ventas) hacia la tabla padre (clientes) filtrando con 'WHERE c.id IS NULL' detecta instantáneamente huérfanos por violación de integridad referencial."
  },
  {
    "id": "s2_t95",
    "categoria": "funciones_null",
    "titulo": "Evaluación de Nulos con Operadores Lógicos AND y OR",
    "pregunta": "Según la lógica trivaluada de SQL, ¿cuál es el resultado de 'TRUE AND NULL' y cuál el de 'FALSE OR NULL'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ambos son UNKNOWN (o NULL)."
      },
      {
        "id": "B",
        "texto": "El primero es TRUE y el segundo FALSE."
      },
      {
        "id": "C",
        "texto": "El primero es FALSE y el segundo TRUE."
      },
      {
        "id": "D",
        "texto": "Arrojan un error de tipo lógico."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "En la tabla de verdad de SQL: TRUE AND UNKNOWN = UNKNOWN (depende del valor desconocido). FALSE OR UNKNOWN = UNKNOWN (sigue dependiendo del valor desconocido)."
  },
  {
    "id": "s2_t96",
    "categoria": "funciones_null",
    "titulo": "Evaluación de Nulos con 'FALSE AND NULL' y 'TRUE OR NULL'",
    "pregunta": "¿Qué resultado produce 'FALSE AND NULL' y qué resultado produce 'TRUE OR NULL'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Ambos son UNKNOWN."
      },
      {
        "id": "B",
        "texto": "FALSE AND NULL da FALSE; TRUE OR NULL da TRUE (porque el resultado ya está lógicamente garantizado sin importar qué valor tenga el dato desconocido)."
      },
      {
        "id": "C",
        "texto": "Ambos dan TRUE."
      },
      {
        "id": "D",
        "texto": "Ambos dan NULL."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "En lógica trivaluada: si un término es FALSE en un AND, la conjunción siempre es FALSE. Si un término es TRUE en un OR, la disyunción siempre es TRUE. El valor desconocido no puede alterar el veredicto."
  },
  {
    "id": "s2_t97",
    "categoria": "funciones_null",
    "titulo": "Uso de COALESCE con Valores de Distintos Tipos",
    "pregunta": "Si ejecutas 'SELECT COALESCE(precio, 'Gratuito') FROM videojuegos;', ¿cómo gestiona el motor el tipo de dato resultante?",
    "opciones": [
      {
        "id": "A",
        "texto": "Arroja un error en motores estrictos a menos que se haga CAST de precio a TEXT, mientras que en SQLite coerciona la salida a tipo TEXT dinámico."
      },
      {
        "id": "B",
        "texto": "Convierte la palabra 'Gratuito' al número 0."
      },
      {
        "id": "C",
        "texto": "Elimina la columna de precio."
      },
      {
        "id": "D",
        "texto": "Solo funciona si la tabla tiene menos de 5 filas."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "En SQL estándar, todos los argumentos de COALESCE deben pertenecer a tipos de datos compatibles. Para mezclar texto y números se debe aplicar CAST(precio AS TEXT)."
  },
  {
    "id": "s2_t98",
    "categoria": "funciones_null",
    "titulo": "Filtrado con COALESCE en Cláusula WHERE",
    "pregunta": "¿Qué comportamiento tiene 'WHERE COALESCE(saldo_cuenta, 0) > 50' frente a un registro con saldo en NULL?",
    "opciones": [
      {
        "id": "A",
        "texto": "El NULL se convierte en 0, y como 0 no es mayor que 50, la fila se descarta de forma controlada sin producir estados indeterminados."
      },
      {
        "id": "B",
        "texto": "El cliente se incluye porque el saldo se considera infinito."
      },
      {
        "id": "C",
        "texto": "Modifica el saldo de ese cliente en la base de datos a 0."
      },
      {
        "id": "D",
        "texto": "Falla la consulta."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Tratar los valores nulos con COALESCE en el WHERE evita los efectos colaterales de la lógica trivaluada, forzando un valor numérico por defecto para la comparación."
  },
  {
    "id": "s2_t99",
    "categoria": "funciones_null",
    "titulo": "Manejo de Nulos en la Cláusula CASE con ELSE",
    "pregunta": "En un reporte de ventas con LEFT JOIN, ¿qué asegura la cláusula ELSE en 'CASE WHEN v.id IS NOT NULL THEN 'Con Venta' ELSE 'Sin Registro' END'?",
    "opciones": [
      {
        "id": "A",
        "texto": "Que si v.id es NULL (no cumplió la condición de arriba), se devuelva el texto explícito 'Sin Registro' en lugar de dejar el campo en valor NULL."
      },
      {
        "id": "B",
        "texto": "Que se borre la fila del cursor."
      },
      {
        "id": "C",
        "texto": "Que el resultado sea un número entero."
      },
      {
        "id": "D",
        "texto": "Que se ordene alfabéticamente."
      }
    ],
    "correcta": "A",
    "puntos": 5,
    "explicacion": "Omitir el ELSE en una expresión CASE produce NULL por defecto cuando ningún WHEN se cumple. Proveer un ELSE garantiza un valor de escape predeterminado."
  },
  {
    "id": "s2_t100",
    "categoria": "funciones_null",
    "titulo": "Buenas Prácticas de Arquitectura Relacional respecto a NULL",
    "pregunta": "¿Cuál es la recomendación fundamental de diseño de bases de datos respecto a claves foráneas y columnas de estado?",
    "opciones": [
      {
        "id": "A",
        "texto": "Permitir siempre NULL en todas las columnas sin excepción."
      },
      {
        "id": "B",
        "texto": "Definir restricciones NOT NULL con valores DEFAULT siempre que el atributo sea conceptualmente obligatorio, reservando NULL exclusivamente para datos genuinamente desconocidos o relaciones opcionales."
      },
      {
        "id": "C",
        "texto": "Prohibir el uso de números flotantes."
      },
      {
        "id": "D",
        "texto": "Evitar el uso de claves primarias compuestas."
      }
    ],
    "correcta": "B",
    "puntos": 5,
    "explicacion": "El abuso de valores NULL genera complejidad en el código y riesgos en la lógica de consultas (como en NOT IN). El estándar de la industria exige declarar NOT NULL con DEFAULT salvo en campos verdaderamente opcionales."
  }
],
  bancoPractico: [
  {
    "id": "s2_p1",
    "titulo": "Reto Práctico 1: Reporte Financiero de Ventas con Triple INNER JOIN",
    "descripcion": "<p class=\"challenge-goal\">Genera un reporte de ventas combinando tres tablas relacionales mediante INNER JOIN y calculando el subtotal financiero:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Combina <code>clientes AS c</code> con <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>ventas AS vt</code> con <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>v.titulo</code>, <code>vt.fecha_venta</code> y el cálculo redondeado <code>ROUND(vt.cantidad * vt.precio_unitario, 2) AS total_linea</code>.</li><li><strong>Ordenamiento y límite:</strong> Ordena de forma descendente por <code>vt.fecha_venta DESC</code> y limita el resultado a las primeras <code>5</code> transacciones.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, vt.fecha_venta, ROUND(vt.cantidad * vt.precio_unitario, 2) AS total_linea FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 5;",
    "puntos": 15
  },
  {
    "id": "s2_p2",
    "titulo": "Reto Práctico 2: Auditoría de Clientes sin Compras con LEFT JOIN e IS NULL",
    "descripcion": "<p class=\"challenge-goal\">Identifica a los clientes inactivos sin transacciones registradas usando una exclusión con LEFT JOIN:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Filtro de exclusión:</strong> Conserva exclusivamente los clientes sin compras registradas (<code>WHERE vt.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.id</code>, <code>c.nombre</code>, <code>c.apellido</code>, <code>c.email</code> y <code>c.saldo_cuenta</code>.</li><li><strong>Ordenamiento:</strong> Ordena ascendentemente por identificador de cliente (<code>c.id ASC</code>).</li></ul>",
    "queryEsperada": "SELECT c.id, c.nombre, c.apellido, c.email, c.saldo_cuenta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.id IS NULL ORDER BY c.id ASC;",
    "puntos": 15
  },
  {
    "id": "s2_p3",
    "titulo": "Reto Práctico 3: Cobertura de Catálogo con RIGHT JOIN y COALESCE",
    "descripcion": "<p class=\"challenge-goal\">Audita el catálogo de productos identificando títulos sin ventas registradas mediante RIGHT JOIN y sustitución de nulos:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>ventas AS vt</code> con <code>videojuegos AS v</code> mediante <code>RIGHT JOIN</code> sobre <code>vt.videojuego_id = v.id</code>.</li><li><strong>Filtro de exclusión:</strong> Filtra únicamente los videojuegos que carecen de ventas (<code>WHERE vt.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>v.titulo</code>, <code>v.consola</code>, <code>v.precio</code> y el identificador formateado <code>COALESCE(vt.id, 'Sin Ventas') AS codigo_venta</code>.</li><li><strong>Ordenamiento:</strong> Ordena de forma descendente por <code>v.precio DESC</code>.</li></ul>",
    "queryEsperada": "SELECT v.titulo, v.consola, v.precio, COALESCE(vt.id, 'Sin Ventas') AS codigo_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.id IS NULL ORDER BY v.precio DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p4",
    "titulo": "Reto Práctico 4: Conciliación Bilateral con FULL OUTER JOIN y Normalización",
    "descripcion": "<p class=\"challenge-goal\">Ejecuta una conciliación bilateral identificando registros desalineados en ambas tablas mediante FULL OUTER JOIN:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>FULL OUTER JOIN</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Filtro de discrepancias:</strong> Conserva únicamente registros huérfanos de cualquier extremo (<code>WHERE c.id IS NULL OR vt.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>COALESCE(c.nombre, 'Sin Cliente Registrado') AS titular_cliente</code>, <code>vt.id AS venta_id</code> y <code>COALESCE(vt.metodo_pago, 'Sin Transacción') AS pasarela_pago</code>.</li></ul>",
    "queryEsperada": "SELECT COALESCE(c.nombre, 'Sin Cliente Registrado') AS titular_cliente, vt.id AS venta_id, COALESCE(vt.metodo_pago, 'Sin Transacción') AS pasarela_pago FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.id IS NULL OR vt.id IS NULL;",
    "puntos": 15
  },
  {
    "id": "s2_p5",
    "titulo": "Reto Práctico 5: Cobros con Tarjeta en Mercados Clave con INNER JOIN",
    "descripcion": "<p class=\"challenge-goal\">Filtra las transacciones liquidadas mediante tarjeta de crédito en mercados estratégicos:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.pais</code>, <code>vt.fecha_venta</code>, <code>vt.metodo_pago</code> y el importe calculado <code>ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes de <code>'México'</code> o <code>'España'</code> (usando <code>IN</code>) con método de pago <code>'Tarjeta'</code>.</li><li><strong>Ordenamiento y límite:</strong> Ordena de mayor a menor importe por <code>importe DESC</code> y limita a las primeras <code>6</code> filas.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.pais, vt.fecha_venta, vt.metodo_pago, ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.pais IN ('México', 'España') AND vt.metodo_pago = 'Tarjeta' ORDER BY importe DESC LIMIT 6;",
    "puntos": 15
  },
  {
    "id": "s2_p6",
    "titulo": "Reto Práctico 6: Catálogo Inactivo con LEFT JOIN y Sustitución por Cero",
    "descripcion": "<p class=\"challenge-goal\">Obtén los videojuegos que no presentan ventas reportando cero unidades vendidas:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> sobre <code>v.id = vt.videojuego_id</code>.</li><li><strong>Filtro de exclusión:</strong> Solo títulos sin ventas (<code>WHERE vt.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>v.titulo</code>, <code>v.genero</code>, <code>v.precio</code> y la columna calculada <code>COALESCE(vt.cantidad, 0) AS unidades_vendidas</code>.</li><li><strong>Ordenamiento:</strong> De mayor a menor precio por <code>v.precio DESC</code>.</li></ul>",
    "queryEsperada": "SELECT v.titulo, v.genero, v.precio, COALESCE(vt.cantidad, 0) AS unidades_vendidas FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE vt.id IS NULL ORDER BY v.precio DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p7",
    "titulo": "Reto Práctico 7: Compradores de PlayStation 5 con Triple INNER JOIN",
    "descripcion": "<p class=\"challenge-goal\">Localiza a los usuarios que han adquirido títulos para la plataforma PlayStation 5:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code>, <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>c.email</code>, <code>v.titulo</code> y <code>v.consola</code>.</li><li><strong>Filtro obligatorio:</strong> Consola igual a <code>'PlayStation 5'</code>.</li><li><strong>Ordenamiento y límite:</strong> Alfabético por <code>c.nombre ASC</code> y limitado a las primeras <code>5</code> transacciones.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.email, v.titulo, v.consola FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.consola = 'PlayStation 5' ORDER BY c.nombre ASC LIMIT 5;",
    "puntos": 15
  },
  {
    "id": "s2_p8",
    "titulo": "Reto Práctico 8: Clientes Solventes con Compras Registradas y DISTINCT",
    "descripcion": "<p class=\"challenge-goal\">Lista sin duplicados los clientes compradores que cuenten con saldo relevante:</p><ul class=\"challenge-req-list\"><li><strong>Columnas proyectadas:</strong> <code>DISTINCT c.id, c.nombre, c.apellido, c.saldo_cuenta</code>.</li><li><strong>Origen de datos:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> sobre <code>c.id = vt.cliente_id</code> mediante <code>INNER JOIN</code>.</li><li><strong>Filtro obligatorio:</strong> Saldo estrictamente superior a 50 (<code>c.saldo_cuenta > 50.0</code>).</li><li><strong>Ordenamiento:</strong> De mayor a menor saldo por <code>c.saldo_cuenta DESC</code>.</li></ul>",
    "queryEsperada": "SELECT DISTINCT c.id, c.nombre, c.apellido, c.saldo_cuenta FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.saldo_cuenta > 50.0 ORDER BY c.saldo_cuenta DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p9",
    "titulo": "Reto Práctico 9: Auditoría de Títulos Agotados con LEFT JOIN",
    "descripcion": "<p class=\"challenge-goal\">Analiza la trazabilidad de los videojuegos sin existencias en inventario:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> sobre <code>v.id = vt.videojuego_id</code>.</li><li><strong>Columnas proyectadas:</strong> <code>v.id AS juego_id</code>, <code>v.titulo</code>, <code>v.stock</code>, <code>vt.id AS venta_id</code> y la expresión <code>COALESCE(vt.metodo_pago, 'Nunca Vendido') AS estado_transaccion</code>.</li><li><strong>Filtro obligatorio:</strong> Juegos con inventario agotado (<code>v.stock = 0</code>).</li><li><strong>Ordenamiento:</strong> Ascendente por <code>v.id ASC</code>.</li></ul>",
    "queryEsperada": "SELECT v.id AS juego_id, v.titulo, v.stock, vt.id AS venta_id, COALESCE(vt.metodo_pago, 'Nunca Vendido') AS estado_transaccion FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE v.stock = 0 ORDER BY v.id ASC;",
    "puntos": 15
  },
  {
    "id": "s2_p10",
    "titulo": "Reto Práctico 10: Transacciones con Pasarelas Digitales (PayPal o Cripto)",
    "descripcion": "<p class=\"challenge-goal\">Filtra las ventas completadas mediante pagos alternativos digitales:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code>, <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>) mediante <code>INNER JOIN</code>.</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>v.titulo</code>, <code>vt.fecha_venta</code> y <code>vt.metodo_pago</code>.</li><li><strong>Filtro obligatorio:</strong> Método de pago perteneciente a <code>'PayPal'</code> o <code>'Cripto'</code> (usando <code>IN</code>).</li><li><strong>Ordenamiento y límite:</strong> De más reciente a más antiguo por <code>vt.fecha_venta DESC</code> y limitado a las <code>6</code> primeras filas.</li></ul>",
    "queryEsperada": "SELECT c.nombre, v.titulo, vt.fecha_venta, vt.metodo_pago FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.metodo_pago IN ('PayPal', 'Cripto') ORDER BY vt.fecha_venta DESC LIMIT 6;",
    "puntos": 15
  },
  {
    "id": "s2_p11",
    "titulo": "Reto Práctico 11: Clientes Activos sin Transacciones con IFNULL",
    "descripcion": "<p class=\"challenge-goal\">Localiza a los usuarios habilitados que aún no estrenan su cuenta con compras:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Filtros obligatorios:</strong> Clientes con cuenta habilitada (<code>c.activo = 1</code>) que no tengan compras registradas (<code>vt.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.id AS cliente_num</code>, <code>c.nombre</code>, <code>c.apellido</code>, <code>c.pais</code> y <code>IFNULL(vt.id, 0) AS numero_venta</code>.</li><li><strong>Ordenamiento:</strong> Ascendente por identificador de cliente (<code>c.id ASC</code>).</li></ul>",
    "queryEsperada": "SELECT c.id AS cliente_num, c.nombre, c.apellido, c.pais, IFNULL(vt.id, 0) AS numero_venta FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.activo = 1 AND vt.id IS NULL ORDER BY c.id ASC;",
    "puntos": 15
  },
  {
    "id": "s2_p12",
    "titulo": "Reto Práctico 12: Ventas Premium de Importe Alto con Triple INNER JOIN",
    "descripcion": "<p class=\"challenge-goal\">Genera un informe de transacciones de alto valor unitario:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code>, <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>).</li><li><strong>Filtro obligatorio:</strong> Precio unitario de la venta mayor o igual a 50 (<code>vt.precio_unitario >= 50.0</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>v.titulo</code>, <code>vt.precio_unitario</code> y <code>v.precio AS precio_catalogo</code>.</li><li><strong>Ordenamiento y límite:</strong> De mayor a menor costo por <code>vt.precio_unitario DESC</code> y limitado a las primeras <code>5</code> ventas.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, vt.precio_unitario, v.precio AS precio_catalogo FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE vt.precio_unitario >= 50.0 ORDER BY vt.precio_unitario DESC LIMIT 5;",
    "puntos": 15
  },
  {
    "id": "s2_p13",
    "titulo": "Reto Práctico 13: Obras Sobresalientes sin Salida Comercial con RIGHT JOIN",
    "descripcion": "<p class=\"challenge-goal\">Identifica títulos destacados por la crítica que carecen de ventas registradas:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>ventas AS vt</code> hacia <code>videojuegos AS v</code> mediante <code>RIGHT JOIN</code> sobre <code>vt.videojuego_id = v.id</code>.</li><li><strong>Filtros obligatorios:</strong> Calificación igual o mayor a 9.0 (<code>v.calificacion >= 9.0</code>) y sin compras asociadas (<code>vt.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>v.titulo</code>, <code>v.desarrollador</code>, <code>v.calificacion</code> y <code>vt.id AS folio_venta</code>.</li><li><strong>Ordenamiento:</strong> De mayor a menor calificación por <code>v.calificacion DESC</code>.</li></ul>",
    "queryEsperada": "SELECT v.titulo, v.desarrollador, v.calificacion, vt.id AS folio_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.calificacion >= 9.0 AND vt.id IS NULL ORDER BY v.calificacion DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p14",
    "titulo": "Reto Práctico 14: Compras Múltiples por Volumen con INNER JOIN",
    "descripcion": "<p class=\"challenge-goal\">Extrae las operaciones donde el cliente adquirió más de una copia del producto:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Filtro obligatorio:</strong> Ventas con cantidad mayor o igual a 2 unidades (<code>vt.cantidad >= 2</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>vt.id AS venta_codigo</code>, <code>vt.fecha_venta</code> y <code>vt.cantidad</code>.</li><li><strong>Ordenamiento:</strong> De más reciente a más antigua por <code>vt.fecha_venta DESC</code>.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, vt.id AS venta_codigo, vt.fecha_venta, vt.cantidad FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE vt.cantidad >= 2 ORDER BY vt.fecha_venta DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p15",
    "titulo": "Reto Práctico 15: Trazabilidad Completa de Clientes en Colombia con Doble LEFT JOIN",
    "descripcion": "<p class=\"challenge-goal\">Muestra a todos los clientes de Colombia preservándolos aun si no han comprado ningún juego:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>ventas AS vt</code> con <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>) mediante <code>LEFT JOIN</code> en ambos enlaces.</li><li><strong>Filtro obligatorio:</strong> Clientes de Colombia (<code>c.pais = 'Colombia'</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.email</code> y <code>COALESCE(v.titulo, 'Sin Videojuego Asociado') AS titulo_comprado</code>.</li><li><strong>Ordenamiento:</strong> Alfabético por <code>c.nombre ASC</code>.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.email, COALESCE(v.titulo, 'Sin Videojuego Asociado') AS titulo_comprado FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id LEFT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE c.pais = 'Colombia' ORDER BY c.nombre ASC;",
    "puntos": 15
  },
  {
    "id": "s2_p16",
    "titulo": "Reto Práctico 16: Matriz de Emparejamiento Cruzado con CROSS JOIN",
    "descripcion": "<p class=\"challenge-goal\">Genera una matriz de recomendaciones cruzando a un cliente específico contra el catálogo de Nintendo Switch:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Cruza <code>clientes AS c</code> con <code>videojuegos AS v</code> mediante <code>CROSS JOIN</code>.</li><li><strong>Filtros obligatorios:</strong> Cliente con identificador 1 (<code>c.id = 1</code>) y consola igual a <code>'Nintendo Switch'</code> (<code>v.consola = 'Nintendo Switch'</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.id</code>, <code>c.nombre</code>, <code>v.id AS juego_id</code> y <code>v.titulo</code>.</li><li><strong>Ordenamiento y límite:</strong> De mayor a menor precio por <code>v.precio DESC</code> y limitado a <code>4</code> registros.</li></ul>",
    "queryEsperada": "SELECT c.id, c.nombre, v.id AS juego_id, v.titulo FROM clientes AS c CROSS JOIN videojuegos AS v WHERE c.id = 1 AND v.consola = 'Nintendo Switch' ORDER BY v.precio DESC LIMIT 4;",
    "puntos": 15
  },
  {
    "id": "s2_p17",
    "titulo": "Reto Práctico 17: Supresión de Pasarela Habitual con NULLIF",
    "descripcion": "<p class=\"challenge-goal\">Emplea la función NULLIF para enmascarar transacciones efectuadas con el método convencional de tarjeta:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>vt.id AS venta_id</code>, <code>vt.metodo_pago</code> y el cálculo condicional <code>NULLIF(vt.metodo_pago, 'Tarjeta') AS metodo_alternativo</code>.</li><li><strong>Ordenamiento y límite:</strong> Ascendente por folio de venta <code>vt.id ASC</code> y limitado a las primeras <code>7</code> transacciones.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, vt.id AS venta_id, vt.metodo_pago, NULLIF(vt.metodo_pago, 'Tarjeta') AS metodo_alternativo FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id ORDER BY vt.id ASC LIMIT 7;",
    "puntos": 15
  },
  {
    "id": "s2_p18",
    "titulo": "Reto Práctico 18: Condición Compuesta en Cláusula ON de un LEFT JOIN",
    "descripcion": "<p class=\"challenge-goal\">Preserva todos los títulos de PC emparejándolos únicamente con ventas posteriores a junio de 2023:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> requiriendo en la cláusula ON que <code>v.id = vt.videojuego_id AND vt.fecha_venta >= '2023-06-01'</code>.</li><li><strong>Filtro en WHERE:</strong> Solo títulos de la plataforma <code>'PC'</code> (<code>WHERE v.consola = 'PC'</code>).</li><li><strong>Columnas proyectadas:</strong> <code>v.titulo</code>, <code>v.consola</code>, <code>vt.id AS id_venta</code> y <code>vt.fecha_venta</code>.</li><li><strong>Ordenamiento y límite:</strong> Alfabético por <code>v.titulo ASC</code> y limitado a <code>6</code> filas.</li></ul>",
    "queryEsperada": "SELECT v.titulo, v.consola, vt.id AS id_venta, vt.fecha_venta FROM videojuegos AS v LEFT JOIN ventas AS vt ON v.id = vt.videojuego_id AND vt.fecha_venta >= '2023-06-01' WHERE v.consola = 'PC' ORDER BY v.titulo ASC LIMIT 6;",
    "puntos": 15
  },
  {
    "id": "s2_p19",
    "titulo": "Reto Práctico 19: Ventas del Género RPG con Triple INNER JOIN y Subtotal",
    "descripcion": "<p class=\"challenge-goal\">Calcula los ingresos por compras de videojuegos que incluyan la categoría de rol RPG:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code>, <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>).</li><li><strong>Filtro obligatorio:</strong> Género que contenga <code>'RPG'</code> (usando <code>v.genero LIKE '%RPG%'</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>v.titulo</code> y el subtotal calculado <code>ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe_total</code>.</li><li><strong>Ordenamiento y límite:</strong> De mayor a menor importe por <code>importe_total DESC</code> y limitado a las <code>5</code> transacciones más cuantiosas.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, v.titulo, ROUND(vt.cantidad * vt.precio_unitario, 2) AS importe_total FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.genero LIKE '%RPG%' ORDER BY importe_total DESC LIMIT 5;",
    "puntos": 15
  },
  {
    "id": "s2_p20",
    "titulo": "Reto Práctico 20: Detección de Ventas Huérfanas con FULL OUTER JOIN",
    "descripcion": "<p class=\"challenge-goal\">Localiza transacciones sin cliente asociado en el catálogo relacional:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>FULL OUTER JOIN</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Filtro obligatorio:</strong> Ventas sin cliente vinculado (<code>WHERE c.id IS NULL</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.id AS id_c</code>, <code>c.nombre</code>, <code>vt.id AS id_v</code> y <code>vt.cliente_id AS cliente_fk</code>.</li><li><strong>Ordenamiento:</strong> Ascendente por identificador de venta (<code>vt.id ASC</code>).</li></ul>",
    "queryEsperada": "SELECT c.id AS id_c, c.nombre, vt.id AS id_v, vt.cliente_id AS cliente_fk FROM clientes AS c FULL OUTER JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.id IS NULL ORDER BY vt.id ASC;",
    "puntos": 15
  },
  {
    "id": "s2_p21",
    "titulo": "Reto Práctico 21: Compras Realizadas por Usuarios de Argentina",
    "descripcion": "<p class=\"challenge-goal\">Cruza los videojuegos adquiridos por clientes residentes en Argentina:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> (en <code>v.id = vt.videojuego_id</code>) y <code>ventas AS vt</code> con <code>clientes AS c</code> (en <code>vt.cliente_id = c.id</code>).</li><li><strong>Filtro obligatorio:</strong> País del cliente igual a <code>'Argentina'</code> (<code>c.pais = 'Argentina'</code>).</li><li><strong>Columnas proyectadas:</strong> <code>v.titulo</code>, <code>v.precio</code>, <code>c.nombre</code> y <code>c.pais</code>.</li><li><strong>Ordenamiento:</strong> De mayor a menor costo por <code>v.precio DESC</code>.</li></ul>",
    "queryEsperada": "SELECT v.titulo, v.precio, c.nombre, c.pais FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id INNER JOIN clientes AS c ON vt.cliente_id = c.id WHERE c.pais = 'Argentina' ORDER BY v.precio DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p22",
    "titulo": "Reto Práctico 22: Clientes con Saldo Cero y Estado de Compra con LEFT JOIN",
    "descripcion": "<p class=\"challenge-goal\">Evalúa a los usuarios con saldo en cero identificando su medio de compra si existiera:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>clientes AS c</code> con <code>ventas AS vt</code> mediante <code>LEFT JOIN</code> sobre <code>c.id = vt.cliente_id</code>.</li><li><strong>Filtro obligatorio:</strong> Saldo de la cuenta exactamente en cero (<code>c.saldo_cuenta = 0.0</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>c.apellido</code>, <code>c.saldo_cuenta</code> y <code>COALESCE(vt.metodo_pago, 'Sin Compras') AS pasarela</code>.</li><li><strong>Ordenamiento:</strong> Alfabético por <code>c.nombre ASC</code>.</li></ul>",
    "queryEsperada": "SELECT c.nombre, c.apellido, c.saldo_cuenta, COALESCE(vt.metodo_pago, 'Sin Compras') AS pasarela FROM clientes AS c LEFT JOIN ventas AS vt ON c.id = vt.cliente_id WHERE c.saldo_cuenta = 0.0 ORDER BY c.nombre ASC;",
    "puntos": 15
  },
  {
    "id": "s2_p23",
    "titulo": "Reto Práctico 23: Títulos Vendidos en el Primer Semestre de 2023",
    "descripcion": "<p class=\"challenge-goal\">Obtén el catálogo de videojuegos con transacciones registradas durante el primer semestre del año:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>videojuegos AS v</code> con <code>ventas AS vt</code> sobre <code>v.id = vt.videojuego_id</code>.</li><li><strong>Filtro obligatorio:</strong> Fecha de venta entre el 1 de enero y el 30 de junio de 2023 (usando <code>vt.fecha_venta BETWEEN '2023-01-01' AND '2023-06-30'</code>).</li><li><strong>Columnas proyectadas:</strong> Tuplas únicas de <code>DISTINCT v.titulo, v.consola, v.precio</code>.</li><li><strong>Ordenamiento:</strong> De mayor a menor costo por <code>v.precio DESC</code>.</li></ul>",
    "queryEsperada": "SELECT DISTINCT v.titulo, v.consola, v.precio FROM videojuegos AS v INNER JOIN ventas AS vt ON v.id = vt.videojuego_id WHERE vt.fecha_venta BETWEEN '2023-01-01' AND '2023-06-30' ORDER BY v.precio DESC;",
    "puntos": 15
  },
  {
    "id": "s2_p24",
    "titulo": "Reto Práctico 24: Clasificación Condicional de Pasarela con CASE y Triple JOIN",
    "descripcion": "<p class=\"challenge-goal\">Categoriza el método de cobro en pagos tradicionales o electrónicos:</p><ul class=\"challenge-req-list\"><li><strong>Tablas de origen:</strong> Une <code>clientes AS c</code>, <code>ventas AS vt</code> (en <code>c.id = vt.cliente_id</code>) y <code>videojuegos AS v</code> (en <code>vt.videojuego_id = v.id</code>).</li><li><strong>Columnas proyectadas:</strong> <code>c.nombre</code>, <code>v.titulo</code>, <code>vt.fecha_venta</code> y expresión con alias <code>categoria_pago</code>:<br>• Si <code>vt.metodo_pago = 'Tarjeta'</code> $\\to$ <code>'Tradicional'</code><br>• Si no $\\to$ <code>'Digital'</code></li><li><strong>Ordenamiento y límite:</strong> De más reciente a más antigua por <code>vt.fecha_venta DESC</code> y limitado a las <code>8</code> primeras transacciones.</li></ul>",
    "queryEsperada": "SELECT c.nombre, v.titulo, vt.fecha_venta, CASE WHEN vt.metodo_pago = 'Tarjeta' THEN 'Tradicional' ELSE 'Digital' END AS categoria_pago FROM clientes AS c INNER JOIN ventas AS vt ON c.id = vt.cliente_id INNER JOIN videojuegos AS v ON vt.videojuego_id = v.id ORDER BY vt.fecha_venta DESC LIMIT 8;",
    "puntos": 15
  },
  {
    "id": "s2_p25",
    "titulo": "Reto Práctico 25: Auditoría de Catálogo Nintendo con RIGHT JOIN",
    "descripcion": "<p class=\"challenge-goal\">Verifica las transacciones vinculadas a títulos desarrollados por Nintendo:</p><ul class=\"challenge-req-list\"><li><strong>Origen de datos:</strong> Une <code>ventas AS vt</code> hacia <code>videojuegos AS v</code> mediante <code>RIGHT JOIN</code> sobre <code>vt.videojuego_id = v.id</code>.</li><li><strong>Filtro obligatorio:</strong> Desarrollador igual a <code>'Nintendo'</code> (<code>v.desarrollador = 'Nintendo'</code>).</li><li><strong>Columnas proyectadas:</strong> <code>v.id AS juego_id</code>, <code>v.titulo</code>, <code>v.consola</code>, <code>v.precio</code> y <code>COALESCE(vt.id, 'No Registrado') AS referencia_venta</code>.</li><li><strong>Ordenamiento:</strong> De mayor a menor precio por <code>v.precio DESC</code>.</li></ul>",
    "queryEsperada": "SELECT v.id AS juego_id, v.titulo, v.consola, v.precio, COALESCE(vt.id, 'No Registrado') AS referencia_venta FROM ventas AS vt RIGHT JOIN videojuegos AS v ON vt.videojuego_id = v.id WHERE v.desarrollador = 'Nintendo' ORDER BY v.precio DESC;",
    "puntos": 15
  }
]
};

const BANCOS_EXAMENES = {
  1: BANCO_EXAMEN_SECCION_1,
  2: BANCO_EXAMEN_SECCION_2
};

// Generador de instancia de examen con muestreo estratificado balanceado (2 por categoría + 4 retos prácticos)
function generarInstanciaExamen(seccionId, forzarNuevo = false) {
  const sId = Number(seccionId) || 1;
  const banco = BANCOS_EXAMENES[sId];
  if (!banco) return null;

  const keyTheory = `sqlcraft_exam_s${sId}_sampled_theory`;
  const keyPractical = `sqlcraft_exam_s${sId}_sampled_practical`;

  let selectedTheoryIds = [];
  let selectedPracticalIds = [];

  if (!forzarNuevo) {
    try {
      const savedTh = localStorage.getItem(keyTheory);
      const savedPr = localStorage.getItem(keyPractical);
      if (savedTh) selectedTheoryIds = JSON.parse(savedTh);
      if (savedPr) selectedPracticalIds = JSON.parse(savedPr);
    } catch (e) {}
  }

  // Si no existen IDs válidos guardados o se solicitó forzarNuevo, realizar muestreo estratificado
  if (selectedTheoryIds.length !== 8 || selectedPracticalIds.length !== 4) {
    const sample = (arr, n) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    // Muestreo estratificado: 2 preguntas de cada una de las 4 categorías = 8 preguntas (40 pts)
    selectedTheoryIds = [];
    banco.categorias.forEach(cat => {
      const grupo = banco.bancoTeorico.filter(q => q.categoria === cat);
      const seleccion = sample(grupo, 2).map(q => q.id);
      selectedTheoryIds.push(...seleccion);
    });

    // 4 retos prácticos al azar de los 25 disponibles = 60 pts
    selectedPracticalIds = sample(banco.bancoPractico, 4).map(r => r.id);

    try {
      localStorage.setItem(keyTheory, JSON.stringify(selectedTheoryIds));
      localStorage.setItem(keyPractical, JSON.stringify(selectedPracticalIds));
    } catch (e) {}
  }

  const theoryQuestions = selectedTheoryIds.map(id => banco.bancoTeorico.find(q => q.id === id)).filter(Boolean);
  const practicalChallenges = selectedPracticalIds.map(id => banco.bancoPractico.find(r => r.id === id)).filter(Boolean);

  return {
    id: `examen-seccion-${sId}`,
    seccionId: sId,
    titulo: banco.titulo,
    descripcion: banco.descripcion,
    preguntasTeoricas: theoryQuestions,
    desafiosPracticos: practicalChallenges
  };
}

if (typeof window !== "undefined") {
  window.BANCO_EXAMEN_SECCION_1 = BANCO_EXAMEN_SECCION_1;
  window.BANCO_EXAMEN_SECCION_2 = BANCO_EXAMEN_SECCION_2;
  window.BANCOS_EXAMENES = BANCOS_EXAMENES;
  window.generarInstanciaExamen = generarInstanciaExamen;
}
