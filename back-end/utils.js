import sqlite3 from "sqlite3";
import { open } from "sqlite";


const DATABASE_NAME = "library.db"
const openDb = async () => {
    return open({
      filename: DATABASE_NAME,
      driver: sqlite3.Database,
    });
  }

export { DATABASE_NAME, openDb }