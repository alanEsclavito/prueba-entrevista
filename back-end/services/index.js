import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Function to open a database connection
async function openDb() {
  return open({
    filename: "prueba.db",
    driver: sqlite3.Database,
  });
}

// Main function to perform database operations
async function main() {
  const db = await openDb();

  // Insert a row of data
  //await db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, ['Alice', 30]);

  // Query the database
  const rows = await db.all(`SELECT * FROM users`);
  rows.forEach((row) => {
    console.log(row);
  });

  // Close the database connection
  await db.close();
  return rows;
}

export default main;
