import express from "express";
import createAndSelect from "./services/index.js";
import cors from "cors";
const app = express();

app.use(cors());

app.use("/", async (req, res) => {
  const rows = await createAndSelect();
  res.send({ data: rows });
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
