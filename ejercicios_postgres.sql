/*
====================================================================
📝 EXAMEN DE SQL (POSTGRESQL) - PRÁCTICA INTERACTIVA
====================================================================

INSTRUCCIONES:
1. Lee la descripción de cada ejercicio.
2. Escribe tu sentencia SQL justo debajo de cada pregunta (donde dice "Respuesta:").
3. Guarda este archivo cuando termines.
4. Escríbeme en el chat: "Ya terminé los ejercicios, revísalos" y yo leeré este archivo
   directamente de tu espacio de trabajo para corregirlo y darte feedback detallado.

--------------------------------------------------------------------
📋 ESQUEMA DE LA BASE DE DATOS (POSTGRESQL)
--------------------------------------------------------------------

Tabla: videojuegos
  - id: SERIAL (Clave primaria autoincremental)
  - titulo: VARCHAR(100)
  - genero: VARCHAR(50)
  - consola: VARCHAR(50)
  - anio_lanzamiento: INTEGER
  - precio: DECIMAL(6,2)
  - calificacion: DECIMAL(3,1)
  - stock: INTEGER
  - desarrollador: VARCHAR(100)
  - fecha_adicion: DATE

Tabla: clientes
  - id: SERIAL (Clave primaria autoincremental)
  - nombre: VARCHAR(50)
  - apellido: VARCHAR(50)
  - email: VARCHAR(100)
  - pais: VARCHAR(50)
  - fecha_registro: DATE
  - saldo_cuenta: DECIMAL(8,2)
  - activo: BOOLEAN (true/false) -- Nota: En Postgres se usan booleanos verdaderos

====================================================================
*/

-- ------------------------------------------------------------------
-- 🟢 NIVEL BÁSICO: SELECT, DISTINCT, ORDER BY, LIMIT
-- ------------------------------------------------------------------

-- 1. Obtén el título, la consola y el precio de todos los videojuegos.
-- Respuesta:



-- 2. Lista todos los géneros únicos de videojuegos disponibles sin repetir ninguno.
-- Respuesta:



-- 3. Muestra el nombre y apellido de los clientes, ordenados de forma ascendente por el apellido.
-- Respuesta:



-- 4. Obtén los 3 videojuegos con mayor stock disponible en la tienda.
-- Respuesta:



-- ------------------------------------------------------------------
-- 🟡 NIVEL INTERMEDIO: WHERE, BETWEEN, IN, OPERADORES LÓGICOS
-- ------------------------------------------------------------------

-- 5. Muestra el título, precio y consola de los juegos que pertenezcan a la consola 'Nintendo Switch' o 'PlayStation 5'. (Usa el operador IN).
-- Respuesta:



-- 6. Obtén el nombre, apellido, país y saldo_cuenta de los clientes que vivan en 'España' o 'México' y que tengan un saldo superior a 50.00.
-- Respuesta:



-- 7. Obtén el título y la calificación de los videojuegos que tengan una calificación entre 8.5 y 9.5 (ambos inclusive). (Usa BETWEEN).
-- Respuesta:



-- 8. Busca el título, género y consola de los videojuegos que NO sean para la consola 'PC' y que tengan stock disponible (stock > 0).
-- Respuesta:


-- ------------------------------------------------------------------
-- 🔴 NIVEL AVANZADO: LIKE, ILIKE, BOOLEANOS, PAGINACIÓN
-- ------------------------------------------------------------------

-- 9. En PostgreSQL, 'LIKE' distingue entre mayúsculas y minúsculas, mientras que 'ILIKE' las ignora.
--    Busca todos los videojuegos cuyo título contenga la palabra 'zelda' (en minúsculas o mayúsculas) usando ILIKE.
-- Respuesta:



-- 10. Busca a los clientes que tengan un correo con dominio '@email.com' y cuyo apellido empiece con la letra 'M'.
-- Respuesta:



-- 11. Obtén todos los clientes que estén ACTIVOS (activo = true o simplemente activo) y que tengan saldo en su cuenta diferente a 0.00.
-- Respuesta:



-- 12. Muestra los videojuegos cuyo año de lanzamiento sea 2020, 2022 o 2023, ordenados por calificación de mayor a menor.
-- Respuesta:



-- 13. Obtén el cuarto y quinto videojuego más caros del catálogo. (Pista: Usa ORDER BY, LIMIT y OFFSET).
-- Respuesta:



-- 14. Obtén los videojuegos que cumplan con una de estas dos condiciones:
--     - Condición A: Son de género 'Acción' y su calificación es mayor a 9.0.
--     - Condición B: Son de género 'Aventura' y su stock es mayor que 20.
--     (Usa paréntesis para agrupar las condiciones lógicas).
-- Respuesta:



-- 15. Muestra los nombres, apellidos y fecha_registro de los clientes que se registraron entre el '2021-01-01' y el '2022-12-31', ordenados del registro más antiguo al más reciente.
-- Respuesta:


