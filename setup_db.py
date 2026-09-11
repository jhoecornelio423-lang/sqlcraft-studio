import sqlite3
import os

def crear_base_de_datos():
    db_path = "tienda.db"
    
    # Si la base de datos ya existe, la borramos para recrearla limpia
    if os.path.exists(db_path):
        os.remove(db_path)
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Crear tabla videojuegos
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS videojuegos (
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
    """)
    
    # Crear tabla clientes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        pais TEXT NOT NULL,
        fecha_registro TEXT NOT NULL,
        saldo_cuenta REAL NOT NULL,
        activo INTEGER NOT NULL CHECK (activo IN (0, 1))
    );
    """)
    
    # Insertar datos de videojuegos
    videojuegos_data = [
        ("The Legend of Zelda: Tears of the Kingdom", "Aventura", "Nintendo Switch", 2023, 69.99, 9.6, 25, "Nintendo", "2023-05-12"),
        ("Elden Ring", "Acción RPG", "PlayStation 5", 2022, 59.99, 9.5, 12, "FromSoftware", "2022-02-25"),
        ("Cyberpunk 2077", "Acción RPG", "PC", 2020, 29.99, 7.8, 50, "CD Projekt Red", "2020-12-10"),
        ("Red Dead Redemption 2", "Acción Aventura", "PlayStation 4", 2018, 19.99, 9.7, 30, "Rockstar Games", "2018-10-26"),
        ("Grand Theft Auto V", "Acción", "PlayStation 4", 2013, 14.99, 9.5, 100, "Rockstar North", "2015-04-14"),
        ("Hollow Knight", "Metroidvania", "Nintendo Switch", 2017, 14.99, 9.0, 0, "Team Cherry", "2018-06-12"),
        ("Minecraft", "Sandbox", "PC", 2011, 26.95, 9.0, 150, "Mojang", "2011-11-18"),
        ("Portal 2", "Puzzles", "PC", 2011, 9.99, 9.8, 5, "Valve", "2011-04-18"),
        ("Super Mario Odyssey", "Plataformas", "Nintendo Switch", 2017, 59.99, 9.7, 18, "Nintendo", "2017-10-27"),
        ("The Witcher 3: Wild Hunt", "Acción RPG", "PlayStation 4", 2015, 39.99, 9.8, 40, "CD Projekt Red", "2015-05-19"),
        ("God of War Ragnarok", "Acción Aventura", "PlayStation 5", 2022, 69.99, 9.4, 15, "Santa Monica Studio", "2022-11-09"),
        ("Spider-Man 2", "Acción", "PlayStation 5", 2023, 69.99, 9.0, 20, "Insomniac Games", "2023-10-20"),
        ("Stardew Valley", "Simulación", "PC", 2016, 13.99, 8.9, 80, "ConcernedApe", "2016-02-26"),
        ("Celeste", "Plataformas", "Nintendo Switch", 2018, 19.99, 9.2, 0, "Extremely OK Games", "2018-01-25"),
        ("Hadestown (Hades)", "Roguelike", "PC", 2020, 24.99, 9.3, 35, "Supergiant Games", "2020-09-17"),
        ("Baldur's Gate 3", "Rol", "PC", 2023, 59.99, 9.6, 60, "Larian Studios", "2023-08-03"),
        ("FIFA 23", "Deportes", "PlayStation 5", 2022, 49.99, 7.2, 45, "EA Sports", "2022-09-30"),
        ("Gran Turismo 7", "Carreras", "PlayStation 5", 2022, 59.99, 8.2, 8, "Polyphony Digital", "2022-03-04"),
        ("Doom Eternal", "Disparos", "PC", 2020, 39.99, 9.0, 14, "id Software", "2020-03-20"),
        ("Street Fighter 6", "Lucha", "PlayStation 5", 2023, 59.99, 8.8, 10, "Capcom", "2023-06-02")
    ]
    
    cursor.executemany("""
    INSERT INTO videojuegos (titulo, genero, consola, año_lanzamiento, precio, calificacion, stock, desarrollador, fecha_adicion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, videojuegos_data)
    
    # Insertar datos de clientes
    clientes_data = [
        ("Juan", "Pérez", "juan.perez@email.com", "México", "2021-03-15", 45.50, 1),
        ("María", "Gómez", "maria.gomez@email.com", "España", "2020-11-22", 120.00, 1),
        ("Carlos", "López", "carlos.lopez@email.com", "Argentina", "2022-01-10", 5.00, 1),
        ("Ana", "Martínez", "ana.martinez@email.com", "Colombia", "2023-05-02", 0.00, 0),
        ("Luis", "Rodríguez", "luis.rod@email.com", "México", "2019-08-14", 350.75, 1),
        ("Laura", "Sánchez", "laura.s@email.com", "España", "2021-07-19", 15.20, 1),
        ("Pedro", "Fernández", "pedro.f@email.com", "Chile", "2022-10-05", 85.00, 1),
        ("Sofía", "Diaz", "sofia.diaz@email.com", "México", "2023-02-28", 12.50, 1),
        ("Diego", "Alvarez", "diego.a@email.com", "Perú", "2020-04-12", 0.00, 1),
        ("Elena", "Ruiz", "elena.ruiz@email.com", "España", "2021-12-01", 95.40, 0),
        ("Miguel", "Torres", "miguel.t@email.com", "Colombia", "2022-06-30", 60.00, 1),
        ("Lucía", "Morales", "lucia.m@email.com", "Argentina", "2023-09-15", 110.50, 1),
        ("Javier", "Herrera", "javier.h@email.com", "México", "2018-05-20", 500.00, 1),
        ("Isabel", "Castro", "isabel.c@email.com", "Chile", "2022-03-11", 8.90, 1),
        ("Andrés", "Ortiz", "andres.o@email.com", "Colombia", "2021-09-24", 25.00, 1)
    ]
    
    cursor.executemany("""
    INSERT INTO clientes (nombre, apellido, email, pais, fecha_registro, saldo_cuenta, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, clientes_data)
    
    # Crear tabla ventas (pedidos)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ventas (
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
    """)

    ventas_data = [
        (1, 1, 1, 69.99, "2023-05-15", "Tarjeta"),
        (1, 3, 1, 29.99, "2023-06-20", "PayPal"),
        (2, 2, 1, 59.99, "2023-02-28", "Tarjeta"),
        (2, 6, 2, 14.99, "2023-04-10", "Transferencia"),
        (3, 5, 1, 14.99, "2023-01-18", "Tarjeta"),
        (5, 4, 1, 19.99, "2023-03-12", "PayPal"),
        (5, 11, 1, 69.99, "2023-07-04", "Tarjeta"),
        (5, 16, 1, 59.99, "2023-08-15", "Cripto"),
        (6, 7, 2, 26.95, "2023-02-14", "Tarjeta"),
        (7, 8, 1, 9.99, "2023-05-22", "Transferencia"),
        (8, 9, 1, 59.99, "2023-06-01", "Tarjeta"),
        (8, 13, 1, 13.99, "2023-06-15", "PayPal"),
        (10, 10, 1, 39.99, "2023-03-30", "Tarjeta"),
        (11, 1, 1, 69.99, "2023-05-13", "Tarjeta"),
        (11, 12, 1, 69.99, "2023-10-25", "PayPal"),
        (12, 16, 1, 59.99, "2023-08-10", "Tarjeta"),
        (12, 2, 1, 59.99, "2023-09-05", "Transferencia"),
        (13, 1, 1, 69.99, "2023-05-20", "Tarjeta"),
        (13, 15, 2, 24.99, "2023-07-18", "Cripto"),
        (13, 17, 1, 49.99, "2023-11-02", "Tarjeta"),
        (14, 19, 1, 39.99, "2023-04-05", "PayPal"),
        (15, 20, 1, 59.99, "2023-06-12", "Tarjeta"),
        (1, 16, 1, 59.99, "2023-09-01", "Tarjeta"),
        (2, 9, 1, 59.99, "2023-10-10", "PayPal"),
        (5, 1, 1, 69.99, "2023-11-15", "Tarjeta")
    ]

    cursor.executemany("""
    INSERT INTO ventas (cliente_id, videojuego_id, cantidad, precio_unitario, fecha_venta, metodo_pago)
    VALUES (?, ?, ?, ?, ?, ?);
    """, ventas_data)

    conn.commit()
    conn.close()
    print("Base de datos 'tienda.db' creada exitosamente con datos de prueba.")

if __name__ == "__main__":
    crear_base_de_datos()
