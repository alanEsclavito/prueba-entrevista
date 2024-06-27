import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Create a new database or open an existing one
let db = new sqlite3.Database('./back-end/prueba.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the example.db database.');
});

let cursor = await open({
    filename: './back-end/prueba.db',
    driver: sqlite3.Database
  });

// Create a new table
cursor.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER
)`);

// Insert a new row of data
cursor.run(`INSERT INTO users (name, age) VALUES (?, ?)`, ['Alice', 30], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});


// Close the database connection
cursor.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});
