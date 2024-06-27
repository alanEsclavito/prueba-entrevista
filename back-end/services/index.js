import { openDb } from "../utils.js";

const getBooks = async () => {
  const db = await openDb();
  const books = await db.all(`SELECT * FROM Book`);
  await db.close();
  return books;
};

const getSaledAmount = async () => {
  const db = await openDb();
  //Ya que en la tabla de sales estamos añadiendo el campo del total solo hay que sumar
  const saledAmount = await db.get(
    "SELECT SUM(amount) AS total_amount FROM Sale"
  );
  await db.close();
  return saledAmount;
};

const getCostSales = async () => {
  const db = await openDb();
  //Ya que en la tabla de sales estamos añadiendo el campo del total solo hay que sumar
  const saledAmount = await db.get(
    "SELECT SUM(amount) AS total_amount FROM SaleBook"
  );
  await db.close();
  return saledAmount;
};

const getInventory = async () => {
  const db = await openDb();
  const inventory = await db.all(`
    SELECT 
        Book.id,
        Book.title,
        Book.stock,
        Book.price,
        Author.name AS author_name,
        Category.name AS category_name,
        Category.description AS category_description
    FROM 
        Book
    JOIN 
        Author ON Book.author_id = Author.id
    JOIN 
        Category ON Book.category_id = Category.id;
  `);
  await db.close();
  return inventory;
};

const createSale = async (amount, date) => {
  const db = await openDb();
  const result = await db.run("INSERT INTO Sale (amount, date) VALUES (?, ?)", [
    amount,
    date,
  ]);
  await db.close();
  return result;
};

const createSaleBook = async (sale, book, quantity, amount) => {
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO SaleBook (sale_id, book_id, quantity, amount) VALUES (?, ?, ?, ?)",
    [sale, book, quantity, amount]
  );
  await db.close();
  return result;
};

const getBooksBy = async (author, title, category) => {
  const db = await openDb();
  const query = `
    SELECT Book.id, Book.title, Author.name AS author_name, Category.name AS category_name
    FROM Book
    JOIN Author ON Book.author_id = Author.id
    JOIN Category ON Book.category_id = Category.id
    WHERE Author.name LIKE '%' || ? || '%'
       OR Book.title LIKE '%' || ? || '%'
       OR Category.name LIKE '%' || ? || '%';
  `;

  const books = await db.all(query, [author, title, category]);
  await db.close();
  return books;
};

export {
  getBooks,
  getInventory,
  getSaledAmount,
  getCostSales,
  createSale,
  createSaleBook,
  getBooksBy
};
