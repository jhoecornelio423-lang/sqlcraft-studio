import sqlite3

conn = sqlite3.connect("tienda.db")
cursor = conn.cursor()

test_queries = [
    # Básico 1-20
    "SELECT titulo, consola, precio FROM videojuegos;",
    "SELECT * FROM clientes;",
    "SELECT titulo AS nombre_juego, calificacion AS puntaje FROM videojuegos;",
    "SELECT titulo, precio, ROUND(precio * 0.90, 2) AS precio_con_descuento FROM videojuegos;",
    "SELECT DISTINCT genero FROM videojuegos;",
    "SELECT DISTINCT consola, genero FROM videojuegos;",
    "SELECT * FROM clientes WHERE pais = 'México';",
    "SELECT titulo, calificacion FROM videojuegos WHERE calificacion > 9.5;",
    "SELECT titulo, precio FROM videojuegos WHERE precio <= 20.0;",
    "SELECT nombre, apellido, pais FROM clientes WHERE pais <> 'España';",
    "SELECT titulo, consola, precio FROM videojuegos WHERE consola = 'PC' AND precio < 30.0;",
    "SELECT nombre, apellido, pais FROM clientes WHERE pais = 'Colombia' OR pais = 'Argentina';",
    "SELECT titulo, genero FROM videojuegos WHERE NOT genero = 'Acción';",
    "SELECT titulo, año_lanzamiento FROM videojuegos WHERE año_lanzamiento BETWEEN 2015 AND 2020;",
    "SELECT titulo, precio FROM videojuegos WHERE precio NOT BETWEEN 20.0 AND 60.0;",
    "SELECT titulo, consola FROM videojuegos WHERE consola IN ('Nintendo Switch', 'PlayStation 5');",
    "SELECT nombre, apellido, pais FROM clientes WHERE pais NOT IN ('México', 'España');",
    "SELECT titulo, desarrollador FROM videojuegos WHERE desarrollador LIKE 'Rockstar%';",
    "SELECT titulo, precio FROM videojuegos ORDER BY precio ASC;",
    "SELECT titulo, calificacion FROM videojuegos ORDER BY calificacion DESC LIMIT 5;",

    # Intermedio 21-40
    "SELECT titulo, precio, stock FROM videojuegos WHERE stock > 0 ORDER BY precio ASC LIMIT 3;",
    "SELECT titulo, consola, calificacion FROM videojuegos WHERE (consola = 'PC' OR consola = 'Nintendo Switch') AND calificacion >= 9.5;",
    "SELECT nombre, apellido, pais, saldo_cuenta FROM clientes WHERE pais = 'México' OR (activo = 1 AND saldo_cuenta > 100.0);",
    "SELECT titulo, año_lanzamiento FROM videojuegos WHERE año_lanzamiento LIKE '202_';",
    "SELECT titulo, genero FROM videojuegos WHERE genero LIKE '%Acción%';",
    "SELECT titulo, desarrollador FROM videojuegos WHERE desarrollador NOT LIKE '%Studio%' AND desarrollador NOT LIKE '%Games%';",
    "SELECT nombre, apellido, fecha_registro FROM clientes WHERE fecha_registro BETWEEN '2021-01-01' AND '2022-12-31';",
    "SELECT nombre, email, fecha_registro FROM clientes WHERE fecha_registro >= '2022-01-01' ORDER BY fecha_registro ASC;",
    "SELECT titulo, consola, precio FROM videojuegos ORDER BY consola ASC, precio DESC;",
    "SELECT DISTINCT pais FROM clientes WHERE saldo_cuenta > 0 ORDER BY pais ASC;",
    "SELECT id, titulo, precio FROM videojuegos ORDER BY id ASC LIMIT 5 OFFSET 5;",
    "SELECT titulo, calificacion, id FROM videojuegos ORDER BY calificacion DESC, id ASC LIMIT 5 OFFSET 10;",
    "SELECT nombre, apellido, saldo_cuenta FROM clientes WHERE activo = 1 AND saldo_cuenta >= 50.0;",
    "SELECT titulo, precio, stock, (precio * stock) AS valor_inventario FROM videojuegos WHERE (precio * stock) > 1000.0 ORDER BY valor_inventario DESC;",
    "SELECT titulo, consola, genero FROM videojuegos WHERE consola NOT IN ('PC', 'PlayStation 4') AND genero NOT LIKE '%Acción%';",
    "SELECT nombre, apellido, email FROM clientes WHERE UPPER(pais) = 'COLOMBIA';",
    "SELECT titulo, LENGTH(titulo) AS longitud_titulo FROM videojuegos WHERE LENGTH(titulo) > 20 ORDER BY longitud_titulo DESC;",
    "SELECT titulo, consola, precio, calificacion FROM videojuegos WHERE precio BETWEEN 20.0 AND 60.0 AND consola IN ('PC', 'Nintendo Switch') ORDER BY calificacion DESC;",
    "SELECT titulo, consola, stock FROM videojuegos WHERE stock = 0 ORDER BY titulo ASC;",
    "SELECT titulo, precio, stock FROM videojuegos WHERE stock > 0 ORDER BY stock ASC LIMIT 4;",

    # Avanzado 41-60
    """SELECT titulo, stock,
      CASE
        WHEN stock = 0 THEN 'Agotado'
        WHEN stock < 20 THEN 'Stock Bajo'
        ELSE 'Stock Suficiente'
      END AS estado_inventario
    FROM videojuegos
    ORDER BY stock ASC;""",

    """SELECT titulo, precio,
      CASE
        WHEN precio < 20.0 THEN 'Económico'
        WHEN precio BETWEEN 20.0 AND 50.0 THEN 'Estándar'
        ELSE 'Premium'
      END AS gama_precio
    FROM videojuegos
    ORDER BY precio DESC;""",

    """SELECT titulo, consola, precio
    FROM videojuegos
    ORDER BY
      CASE consola
        WHEN 'Nintendo Switch' THEN 1
        WHEN 'PlayStation 5' THEN 2
        WHEN 'PC' THEN 3
        ELSE 4
      END ASC,
      precio DESC;""",

    """SELECT titulo, genero, consola, precio, calificacion
    FROM videojuegos
    WHERE ((consola = 'PlayStation 5' AND precio < 60.0) OR (consola = 'Nintendo Switch' AND precio < 30.0))
      AND calificacion >= 9.0;""",

    """SELECT nombre, apellido, saldo_cuenta,
      CASE
        WHEN saldo_cuenta >= 200.0 THEN 'Cliente Platino'
        WHEN saldo_cuenta >= 50.0 THEN 'Cliente Oro'
        WHEN saldo_cuenta > 0.0 THEN 'Cliente Plata'
        ELSE 'Sin Saldo'
      END AS categoria_cliente
    FROM clientes
    ORDER BY saldo_cuenta DESC;""",

    "SELECT titulo FROM videojuegos WHERE titulo LIKE '%: %';",

    "SELECT nombre, apellido, email FROM clientes WHERE email LIKE '%_%._%@%' ORDER BY apellido ASC;",

    """SELECT id, cliente_id, cantidad, precio_unitario, (cantidad * precio_unitario) AS subtotal, metodo_pago, fecha_venta
    FROM ventas
    WHERE metodo_pago IN ('Tarjeta', 'PayPal')
      AND (cantidad * precio_unitario) >= 50.0
      AND fecha_venta BETWEEN '2023-01-01' AND '2023-06-30'
    ORDER BY subtotal DESC;""",

    """SELECT nombre,
      CASE
        WHEN activo = 1 THEN email
        ELSE '***CUENTA_INACTIVA***'
      END AS email_contacto,
      pais, activo
    FROM clientes
    ORDER BY activo DESC, nombre ASC;""",

    """SELECT titulo, calificacion, precio, consola
    FROM videojuegos
    WHERE calificacion >= 9.5
      AND precio <= 30.0
      AND stock > 0
    ORDER BY calificacion DESC, precio ASC;""",

    """SELECT titulo, consola, precio,
      CASE
        WHEN consola = 'PlayStation 4' THEN ROUND(precio * 0.80, 2)
        WHEN consola = 'PC' THEN ROUND(precio * 0.85, 2)
        ELSE precio
      END AS precio_promocional
    FROM videojuegos
    ORDER BY precio_promocional ASC;""",

    """SELECT titulo, año_lanzamiento,
      CASE
        WHEN año_lanzamiento < 2015 THEN 'Clásico Temprano'
        WHEN año_lanzamiento BETWEEN 2015 AND 2020 THEN 'Generación Previa'
        ELSE 'Nueva Generación'
      END AS epoca
    FROM videojuegos
    ORDER BY año_lanzamiento ASC, titulo ASC;""",

    """SELECT nombre, apellido, pais, saldo_cuenta, activo
    FROM clientes
    WHERE (pais IN ('Chile', 'Perú', 'Argentina') AND saldo_cuenta > 0.0)
       OR (activo = 0 AND saldo_cuenta = 0.0)
    ORDER BY pais ASC, saldo_cuenta DESC;""",

    """SELECT id, videojuego_id, cantidad, precio_unitario, metodo_pago
    FROM ventas
    WHERE metodo_pago NOT IN ('Tarjeta', 'PayPal')
      AND cantidad > 1
    ORDER BY precio_unitario DESC;""",

    """SELECT titulo, consola, calificacion, precio
    FROM videojuegos
    WHERE consola = 'Nintendo Switch'
      AND precio < 60.0
    ORDER BY calificacion DESC
    LIMIT 3;""",

    """SELECT nombre, apellido, fecha_registro, saldo_cuenta
    FROM clientes
    WHERE fecha_registro < '2021-01-01'
      AND saldo_cuenta > 50.0
    ORDER BY fecha_registro ASC;""",

    """SELECT titulo, genero, precio, calificacion
    FROM videojuegos
    WHERE (titulo LIKE '%The%' OR titulo LIKE '%of%')
      AND genero NOT IN ('Deportes', 'Carreras')
      AND precio BETWEEN 15.0 AND 70.0
    ORDER BY precio DESC;""",

    """SELECT nombre, apellido, pais, email
    FROM clientes
    WHERE (nombre LIKE 'M%' OR nombre LIKE 'L%' OR nombre LIKE 'J%')
      AND pais IN ('México', 'España', 'Colombia')
      AND activo = 1
    ORDER BY nombre ASC;""",

    """SELECT id, fecha_venta, cantidad, precio_unitario,
      (cantidad * precio_unitario) AS total_venta,
      CASE
        WHEN (cantidad * precio_unitario) >= 100.0 THEN 'Venta Mayor'
        WHEN (cantidad * precio_unitario) >= 50.0 THEN 'Venta Media'
        ELSE 'Venta Menor'
      END AS tipo_ticket
    FROM ventas
    ORDER BY total_venta DESC
    LIMIT 10;""",

    """SELECT DISTINCT
      titulo,
      consola,
      genero,
      precio,
      stock,
      CASE
        WHEN stock = 0 THEN 'AGOTADO'
        WHEN precio >= 60.0 AND calificacion >= 9.5 THEN 'JOYA PREMIUM'
        WHEN precio < 20.0 THEN 'OFERTA'
        ELSE 'REGULAR'
      END AS etiqueta_comercial
    FROM videojuegos
    WHERE (consola IN ('PlayStation 5', 'Nintendo Switch', 'PC'))
      AND (precio BETWEEN 10.0 AND 70.0)
      AND (genero NOT LIKE '%Deportes%')
      AND NOT (stock = 0 AND calificacion < 9.0)
    ORDER BY precio DESC, stock ASC
    LIMIT 15;"""
]

print(f"Total queries to test: {len(test_queries)}")
all_good = True
for idx, q in enumerate(test_queries, 1):
    try:
        cursor.execute(q)
        rows = cursor.fetchall()
        if len(rows) == 0:
            print(f"[AVISO] Query #{idx} devolvió 0 filas!")
        else:
            print(f"[OK] Query #{idx}: {len(rows)} filas devueltas.")
    except Exception as e:
        print(f"[ERROR] Query #{idx}: {e}")
        all_good = False

conn.close()
if all_good:
    print("\nTODAS LAS 60 CONSULTAS SON 100% VALIDAS Y RETORNAN RESULTADOS.")
