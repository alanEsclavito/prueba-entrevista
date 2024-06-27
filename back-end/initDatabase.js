import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { DATABASE_NAME } from "./utils.js";

// Create a new database or open an existing one
new sqlite3.Database(`./back-end/${DATABASE_NAME}`, (error) => {
  if (error) {
    console.log(error.message);
  }
  console.log("Conexión con library existosa");
});

const cursor = await open({
  filename: `./back-end/${DATABASE_NAME}`,
  driver: sqlite3.Database,
});

const createTables = async (db) => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Author (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Category (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT
      );

      CREATE TABLE IF NOT EXISTS Book (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL,
          author_id INTEGER NOT NULL,
          year INTEGER,
          category_id INTEGER NOT NULL,
          stock INTEGER NOT NULL,
          price REAL NOT NULL,
          FOREIGN KEY (author_id) REFERENCES Author(id),
          FOREIGN KEY (category_id) REFERENCES Category(id)
          UNIQUE (title, category_id)
      );

      CREATE TABLE IF NOT EXISTS Sale (
          id INTEGER PRIMARY KEY,
          amount REAL NOT NULL,
          date TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS SaleBook (
          sale_id INTEGER NOT NULL,
          book_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          amount REAL NOT NULL,
          FOREIGN KEY (sale_id) REFERENCES Sale(id),
          FOREIGN KEY (book_id) REFERENCES Book(id),
          PRIMARY KEY (sale_id, book_id)
      );
    `);
    //la primary key de SaleBook es compuesta porque es una tabla "puente"
    //la fecha se guarda como string/text para reducir problemas de compatibilidad con formatos
  } catch (error) {
    console.log(error);
  }
};

const insertInitialData = async (db) => {
  try {
    //primero se llenan tablas sin relación
    //Insertar autores
    await db.run(`INSERT INTO Author (name) VALUES (?)`, [
      "F. Scott Fitzgerald",
    ]);
    await db.run(`INSERT INTO Author (name) VALUES (?)`, ["Carl Sagan"]);
    //Insertar categorias
    await db.run("INSERT INTO Category (name, description) VALUES (?, ?)", [
      "Ficción",
      "Obras de ficción literaria.",
    ]);
    await db.run("INSERT INTO Category (name, description) VALUES (?, ?)", [
      "Ciencia",
      "Libros de temática científica.",
    ]);
    await db.run("INSERT INTO Category (name, description) VALUES (?, ?)", [
      "Historia",
      "Libros relacionados con historia.",
    ]);
    await db.run("INSERT INTO Category (name, description) VALUES (?, ?)", [
      "No Fincción",
      "Libros basados en hechos reales.",
    ]);
    //Llenar tablas con relaciones según como dependan (primero libros luego ventas porque necesita de libros)
    await db.run(
      "INSERT INTO Book (title, author_id, year, category_id, stock, price) VALUES (?, ?, ?, ?, ?, ?)",
      //El autor es el primer insertado y la categoria también es la primera creada, por eso los awaits para garantizar orden
      ["El Gran Gatsby", 1, 1925, 1, 20, 15.99]
    );
    await db.run(
      "INSERT INTO Book (title, author_id, year, category_id, stock, price) VALUES (?, ?, ?, ?, ?, ?)",
      //El autor es el segundo insertado y la categoria es la 4 creada, por eso los awaits para garantizar orden
      ["Cosmos", 2, 1980, 4, 10, 19.99]
    );
    //llenar tabla relación libros-venta
    await db.run(
      "INSERT INTO Sale (amount, date) VALUES (?, ?)",
      //suponiendo que se venden al precio al que esta listado en la tabla
      [15.99 * 3, "2023-10-01"]
    );
    await db.run("INSERT INTO Sale (amount, date) VALUES (?, ?)", [
      19.99 * 2,
      "2023-10-02",
    ]);
    //Llenar tabla enlace
    await db.run(
      "INSERT INTO SaleBook (sale_id, book_id, quantity, amount) VALUES (?, ?, ?, ?)",
      //id primera venta, id primer libro
      [1, 1, 3, 15.99 * 3]
    );
    //Llenar tabla enlace
    await db.run(
      "INSERT INTO SaleBook (sale_id, book_id, quantity, amount) VALUES (?, ?, ?, ?)",
      //id segunda venta, id segundo libro
      [2, 2, 2, 19.99 * 2]
    );
  } catch (error) {
    console.log(error);
  }
};

await createTables(cursor);
await insertInitialData(cursor);

// Close the database connection
cursor.close((error) => {
  if (error) {
    console.log(error.message);
  }
  console.log("Base de datos cerrada y creada con éxito");
});
