# 🎮 Examen Exhaustivo de SQL - Nivel Inicial/Intermedio

Este examen está diseñado para poner a prueba tus conocimientos sobre las cláusulas y operadores esenciales de SQL: **SELECT, DISTINCT, WHERE, ORDER BY, operadores lógicos y de comparación, BETWEEN, IN, LIKE, LIMIT y OFFSET**.

La base de datos ya está creada en tu workspace como `tienda.db`. A continuación, se detalla el esquema y cómo puedes ejecutar tus consultas para comprobar los resultados en tiempo real.

---

## 📋 Esquema de la Base de Datos

### Tabla: `videojuegos`
Representa el inventario de videojuegos disponibles en la tienda.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Clave primaria autoincremental |
| `titulo` | `TEXT` | Nombre del videojuego |
| `genero` | `TEXT` | Género del juego (ej. Aventura, Acción RPG) |
| `consola` | `TEXT` | Consola para la que está disponible |
| `año_lanzamiento` | `INTEGER` | Año en que salió al mercado |
| `precio` | `REAL` | Precio de venta en dólares |
| `calificacion` | `REAL` | Calificación promedio (0.0 a 10.0) |
| `stock` | `INTEGER` | Cantidad de unidades físicas disponibles |
| `desarrollador` | `TEXT` | Empresa que desarrolló el juego |
| `fecha_adicion` | `TEXT` | Fecha en que se agregó a la base de datos (YYYY-MM-DD) |

### Tabla: `clientes`
Representa a los usuarios registrados en la plataforma.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Clave primaria autoincremental |
| `nombre` | `TEXT` | Nombre del cliente |
| `apellido` | `TEXT` | Apellido del cliente |
| `email` | `TEXT` | Dirección de correo (único) |
| `pais` | `TEXT` | País de residencia |
| `fecha_registro` | `TEXT` | Fecha de registro en la tienda (YYYY-MM-DD) |
| `saldo_cuenta` | `REAL` | Crédito disponible en su cuenta de la tienda |
| `activo` | `INTEGER` | Estado de la cuenta (1 = Activo, 0 = Inactivo) |

### Tabla: `ventas`
Representa el registro de compras y pedidos realizados por los clientes.

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Clave primaria autoincremental |
| `cliente_id` | `INTEGER` | Clave foránea que referencia a `clientes(id)` |
| `videojuego_id` | `INTEGER` | Clave foránea que referencia a `videojuegos(id)` |
| `cantidad` | `INTEGER` | Número de unidades adquiridas |
| `precio_unitario` | `REAL` | Precio al momento de la venta (USD) |
| `fecha_venta` | `TEXT` | Fecha de la compra (YYYY-MM-DD) |
| `metodo_pago` | `TEXT` | Método utilizado: Tarjeta, PayPal, Transferencia, Cripto |

---

## 🚀 Cómo Ejecutar tus Consultas

Puedes abrir tu terminal de comandos en este directorio y usar la consola interactiva de SQLite, o ejecutar consultas directamente usando un script de Python.

### Opción A: Usando Python en la terminal (Recomendado)
Puedes crear un archivo de prueba (ej. `solucion.py`) o abrir la terminal interactiva de Python y ejecutar:

```python
import sqlite3
import pandas as pd # Opcional, para ver los resultados bonitos en tabla

conn = sqlite3.connect("tienda.db")

# Escribe tu consulta aquí
query = """
SELECT * FROM videojuegos LIMIT 5;
"""

# Ejecutar y mostrar
df = pd.read_sql_query(query, conn)
print(df)
conn.close()
```

### Opción B: Usando SQLite CLI
Si tienes SQLite instalado en tu sistema, abre la terminal en este directorio y escribe:
```bash
sqlite3 tienda.db
```
Una vez dentro, puedes escribir tus consultas directamente (terminadas en `;`). Para salir, escribe `.exit`.

---

## 📝 Ejercicios del Examen

Intenta resolver cada ejercicio por tu cuenta antes de desplegar las respuestas.

### 🟢 Nivel Básico: SELECT, DISTINCT, ORDER BY y LIMIT

#### Ejercicio 1
Obtén únicamente los títulos y los precios de todos los videojuegos disponibles en la tabla `videojuegos`.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, precio 
FROM videojuegos;
```
</details>

#### Ejercicio 2
Obtén una lista única de todas las consolas para las cuales hay videojuegos registrados, sin que se repitan nombres.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT DISTINCT consola 
FROM videojuegos;
```
</details>

#### Ejercicio 3
Listar el nombre y apellido de todos los clientes registrados, ordenados alfabéticamente por su apellido de forma ascendente (de la A a la Z).
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT nombre, apellido 
FROM clientes 
ORDER BY apellido ASC; -- El 'ASC' es opcional ya que es el valor por defecto
```
</details>

#### Ejercicio 4
Muestra los títulos, consolas y precios de los 5 videojuegos más caros de la tienda.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, consola, precio 
FROM videojuegos 
ORDER BY precio DESC 
LIMIT 5;
```
</details>

---

### 🟡 Nivel Intermedio: WHERE, Operadores Lógicos y de Comparación

#### Ejercicio 5
Obtén el título, la consola y el precio de los videojuegos que cuesten exactamente $59.99 o $69.99. Hazlo de dos formas: usando `OR` y usando `IN`.
<details>
<summary>💡 Ver Solución</summary>

**Forma 1 (usando OR):**
```sql
SELECT titulo, consola, precio 
FROM videojuegos 
WHERE precio = 59.99 OR precio = 69.99;
```

**Forma 2 (usando IN):**
```sql
SELECT titulo, consola, precio 
FROM videojuegos 
WHERE precio IN (59.99, 69.99);
```
</details>

#### Ejercicio 6
Busca el nombre, apellido y saldo_cuenta de todos los clientes que sean de 'México' y que tengan un saldo en su cuenta superior a $100.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT nombre, apellido, saldo_cuenta 
FROM clientes 
WHERE pais = 'México' AND saldo_cuenta > 100;
```
</details>

#### Ejercicio 7
Muestra el título, género y calificación de todos los videojuegos que **no** pertenezcan a la consola 'Nintendo Switch' y que tengan una calificación mayor o igual a 9.0.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, genero, calificacion 
FROM videojuegos 
WHERE consola <> 'Nintendo Switch' AND calificacion >= 9.0;
-- También puedes usar != en lugar de <>
```
</details>

#### Ejercicio 8
Obtén los videojuegos (título, año_lanzamiento y desarrollador) cuyo año de lanzamiento esté entre 2015 y 2020 (ambos inclusive), ordenados del más reciente al más antiguo.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, año_lanzamiento, desarrollador 
FROM videojuegos 
WHERE año_lanzamiento BETWEEN 2015 AND 2020 
ORDER BY año_lanzamiento DESC;
```
</details>

---

### 🔴 Nivel Avanzado: LIKE (Comodines), Filtrado Complejo y Paginación

#### Ejercicio 9
Obtén los nombres, apellidos y fecha_registro de todos los clientes que se registraron durante el año 2022. Resuélvelo de dos maneras: una usando `LIKE` y otra usando `BETWEEN`.
<details>
<summary>💡 Ver Solución</summary>

**Forma 1 (usando LIKE):**
```sql
SELECT nombre, apellido, fecha_registro 
FROM clientes 
WHERE fecha_registro LIKE '2022-%';
```

**Forma 2 (usando BETWEEN):**
```sql
SELECT nombre, apellido, fecha_registro 
FROM clientes 
WHERE fecha_registro BETWEEN '2022-01-01' AND '2022-12-31';
```
</details>

#### Ejercicio 10
Obtén el título, género y desarrollador de todos los videojuegos cuyo título empiece con la palabra 'The'.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, genero, desarrollador 
FROM videojuegos 
WHERE titulo LIKE 'The%';
```
</details>

#### Ejercicio 11
Busca a todos los clientes (nombre, apellido y email) cuyo apellido tenga una letra **'o'** en la **segunda posición** (ej. L**ó**pez, G**ó**mez).
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT nombre, apellido, email 
FROM clientes 
WHERE apellido LIKE '_o%'; -- El guion bajo (_) reemplaza exactamente a un carácter
```
</details>

#### Ejercicio 12
Listar el título, desarrollador, precio y stock de los videojuegos que cumplan con todos estos requisitos:
1. Sean desarrollados por 'Nintendo' o 'Rockstar Games' (usa `IN`).
2. Tengan stock disponible en la tienda (stock mayor que 0).
3. Ordenados por precio de menor a mayor.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, desarrollador, precio, stock 
FROM videojuegos 
WHERE desarrollador IN ('Nintendo', 'Rockstar Games') 
  AND stock > 0 
ORDER BY precio ASC;
```
</details>

#### Ejercicio 13
Obtén el **segundo y tercer** videojuego con mejor calificación para la consola 'PlayStation 5'. (Pista: debes ordenar por calificación, omitir el primero y traer los dos siguientes).
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, calificacion 
FROM videojuegos 
WHERE consola = 'PlayStation 5' 
ORDER BY calificacion DESC 
LIMIT 2 OFFSET 1;
```
</details>

#### Ejercicio 14
Obtén una lista de videojuegos que cumplan con alguna de las dos siguientes condiciones (usa paréntesis para agrupar las condiciones lógicas correctamente):
* Condición A: Son del género 'Acción RPG' y su precio es menor a $40.
* Condición B: Son del género 'Plataformas' y tienen una calificación superior a 9.0.
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT titulo, genero, precio, calificacion 
FROM videojuegos 
WHERE (genero = 'Acción RPG' AND precio < 40)
   OR (genero = 'Plataformas' AND calificacion > 9.0);
```
</details>

#### Ejercicio 15
Muestra a los clientes (nombre, apellido, email, pais, saldo_cuenta y activo) que cumplan con todo lo siguiente:
1. Su correo electrónico no sea de dominio corporativo (es decir, debe terminar con `@email.com`).
2. Su cuenta esté activa (`activo = 1`).
3. Su saldo sea estrictamente diferente de cero ($0.00).
<details>
<summary>💡 Ver Solución</summary>

```sql
SELECT nombre, apellido, email, pais, saldo_cuenta, activo 
FROM clientes 
WHERE email LIKE '%@email.com' 
  AND activo = 1 
  AND saldo_cuenta <> 0.00;
  -- También puedes usar saldo_cuenta != 0.00 o saldo_cuenta > 0.00 dependiendo del contexto
```
</details>

---

## 🏆 Siguiente Paso
¡Felicidades por completar el examen! Si lograste resolver la mayoría de los ejercicios:
1. Estás listo para avanzar a **Cláusulas de Agrupación** (`GROUP BY`, `HAVING`) y funciones de agregación (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).
2. Luego podrás aprender sobre **Relaciones y JOINS** (`INNER JOIN`, `LEFT JOIN`, etc.) para conectar múltiples tablas.

Si tienes dudas con alguna consulta o quieres que te explique en profundidad cómo funciona alguna cláusula específica, ¡escríbeme aquí mismo!
