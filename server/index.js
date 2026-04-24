import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const JSON_PATH = path.join(__dirname, "../src/assets/Orders.json");
const CUST_PATH = path.join(__dirname, "../src/assets/Customer.json");

app.post("/api/orders", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  const newOrder = req.body;
  orders.push(newOrder);
  fs.writeFileSync(JSON_PATH, JSON.stringify(orders, null, 2));
  res.json({ success: true, order: newOrder });
});

app.post("/api/customers", (req, res) => {
  const customers = JSON.parse(fs.readFileSync(CUST_PATH, "utf-8"));
  customers.push(req.body);
  fs.writeFileSync(CUST_PATH, JSON.stringify(customers, null, 2));
  res.json({ success: true });
});

// app.listen() selalu paling bawah
app.listen(3001, () => console.log("Server running on port 3001"));