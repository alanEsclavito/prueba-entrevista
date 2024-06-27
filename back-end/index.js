import express from "express";
import {
  getBooks,
  getInventory,
  getCostSales,
  getSaledAmount,
  createSale,
  createSaleBook,
  getBooksBy
} from "./services/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/books", async (req, res) => {
  try {
    const {author, title, category} = req.query
    console.log(req.query)
    let rows;
    if (author || title || category) {
      rows = await getBooksBy(author, title, category);
    }
    else {
      rows = await getBooks();
    }
    res.send({ success: true, data: rows });
  } catch (error) {
    console.log(error)
    res.send({ success: false, error });
  }
});

app.get("/api/inventory", async (req, res) => {
  try {
    const rows = await getInventory();
    res.send({ success: true, data: rows });
  } catch (error) {
    res.send({ success: false, error });
  }
});

app.get("/api/earnings", async (req, res) => {
  try {
    const { total_amount: saledAmount } = await getSaledAmount();
    const { total_amount: costAmount } = await getCostSales();
    res.send({ success: true, data: saledAmount - costAmount });
  } catch (error) {
    res.send({ success: false, error });
  }
});

app.post("/api/sale", async (req, res) => {
  try {
    const { date, books, amount } = req.body;
    const { lastID } = await createSale(amount, date);
    for (const book of books) {
      const {id, quantity, amount } = book
      createSaleBook(lastID, id, quantity, amount)
    }
    res.send({ success: true });
  } catch (error) {
    console.log(error)
    res.send({ success: false, error });
  }
});

app.use("*", (req, res) => {
  res.send({ success: false, error: "Not Found" });
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
